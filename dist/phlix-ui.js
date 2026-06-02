import { a as e, c as t, d as n, f as r, i, l as a, n as o, o as s, p as c, r as l, s as u, t as d, u as f } from "./tokenStore-qhLkSDAW.js";
import { n as p, t as m } from "./Badge-dkNW5XAf.js";
import { t as h } from "./Switch-B8ixCL5a.js";
import { Fragment as g, Teleport as _, Transition as v, TransitionGroup as y, computed as b, createApp as x, createBlock as S, createCommentVNode as C, createElementBlock as w, createElementVNode as T, createTextVNode as E, createVNode as D, defineComponent as O, inject as k, nextTick as A, normalizeClass as j, normalizeStyle as M, onBeforeUnmount as N, onMounted as P, openBlock as F, reactive as I, ref as L, renderList as R, renderSlot as z, resolveComponent as B, resolveDynamicComponent as ee, toDisplayString as V, toRef as te, unref as H, useId as U, vModelDynamic as W, vModelText as G, vShow as ne, watch as K, watchEffect as q, withCtx as J, withDirectives as Y, withKeys as re, withModifiers as X } from "vue";
import { createPinia as ie, defineStore as ae } from "pinia";
import { RouterLink as oe, RouterView as Z, createRouter as se, createWebHistory as ce, useRoute as le, useRouter as ue } from "vue-router";
//#region \0rolldown/runtime.js
var de = Object.defineProperty, fe = (e, t) => {
	let n = {};
	for (var r in e) de(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || de(n, Symbol.toStringTag, { value: "Module" }), n;
}, pe = {}, me = { class: "app-layout" }, he = { class: "app-header" }, ge = { class: "header-inner" }, _e = { class: "logo" }, ve = { class: "nav" }, ye = { class: "app-main" }, be = { class: "app-footer" };
function xe(e, t) {
	return F(), w("div", me, [
		T("header", he, [T("div", ge, [T("div", _e, [z(e.$slots, "logo", {}, () => [t[0] ||= T("span", { class: "logo-text" }, "Phlix", -1)], !0)]), T("nav", ve, [z(e.$slots, "nav", {}, void 0, !0)])])]),
		T("main", ye, [z(e.$slots, "default", {}, void 0, !0)]),
		T("footer", be, [z(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var Se = /*#__PURE__*/ c(pe, [["render", xe], ["__scopeId", "data-v-9f6c6d16"]]), Ce = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Q = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let t = e, n = b(() => t.disabled || t.loading);
		return (t, i) => (F(), w("button", {
			type: e.type,
			class: j(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [D(r, {
			name: e.loading ? "spinner" : e.name,
			class: j({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, Ce));
	}
}), [["__scopeId", "data-v-fc0cd545"]]), we = { class: "phlix-kbd" }, Te = {
	key: 1,
	class: "phlix-kbd__key"
}, Ee = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = b(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (F(), w("span", we, [n.value.length ? (F(!0), w(g, { key: 0 }, R(n.value, (e, t) => (F(), w("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, V(e), 1))), 128)) : (F(), w("kbd", Te, [z(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), De = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Oe = 0, ke = "";
function Ae() {
	Oe === 0 && (ke = document.body.style.overflow, document.body.style.overflow = "hidden"), Oe++;
}
function je() {
	Oe !== 0 && (Oe--, Oe === 0 && (document.body.style.overflow = ke));
}
function Me(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(De)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		i = document.activeElement, r && (Ae(), a = !0), document.addEventListener("keydown", s, !0), A(() => {
			(o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		document.removeEventListener("keydown", s, !0), a &&= (je(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	K(t, (e) => e ? c() : l(), { immediate: !0 }), N(() => {
		document.removeEventListener("keydown", s, !0), a &&= (je(), !1);
	});
}
//#endregion
//#region src/stores/useCommandStore.ts
var Ne = "phlix.cmd.recents", Pe = 8;
function Fe(e, t) {
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
function Ie(e, t) {
	if (!e.trim()) return 0;
	let n = Fe(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, Fe(e, n));
	return t.group && (r = Math.max(r, Fe(e, t.group))), r;
}
function Le() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(Ne);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, Pe) : [];
	} catch {
		return [];
	}
}
var Re = ae("phlix-commands", () => {
	let e = L(/* @__PURE__ */ new Map()), t = L(!1), n = L(""), r = L(Le()), i = b(() => Array.from(e.value.values())), a = b(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: Ie(t, e)
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
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, Pe);
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
			localStorage.setItem(Ne, JSON.stringify(e));
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
}), ze = {
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
function Be(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var Ve = "phlix.prefs";
function He() {
	if (typeof localStorage > "u") return { ...ze };
	try {
		let e = localStorage.getItem(Ve);
		if (!e) return { ...ze };
		let t = JSON.parse(e);
		return {
			...ze,
			...t
		};
	} catch {
		return { ...ze };
	}
}
function Ue() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(Ve) !== null;
	} catch {
		return !1;
	}
}
function We() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var Ge = ae("phlix-prefs", () => {
	let e = He(), t = L(e.theme), n = L(e.accent), r = L(e.density), i = L(e.cardSize), a = L(e.gridDensity), o = L(e.reducedMotion), s = L(e.autoplay), c = L(e.defaultVolume), l = L(e.defaultQuality), u = L(e.defaultSubtitleLang), d = L(e.atmosphere), f = L(e.filterPresets ? [...e.filterPresets] : []), p = L(We()), m = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (m = window.matchMedia("(prefers-reduced-motion: reduce)"), m.addEventListener?.("change", (e) => p.value = e.matches));
	let h = b(() => o.value === "on" ? !0 : o.value === "off" ? !1 : p.value);
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
			id: Be(e),
			name: e.trim(),
			query: t
		}, r = f.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? f.value.splice(r, 1, n) : f.value.push(n), n;
	}
	function v(e) {
		f.value = f.value.filter((t) => t.id !== e);
	}
	K(g, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Ve, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function y() {
		let e = ze;
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
}), Ke = { class: "phlix-cmdk__search" }, qe = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], Je = ["id"], Ye = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, Xe = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], Ze = { class: "phlix-cmdk__option-body" }, Qe = { class: "phlix-cmdk__option-title" }, $e = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, et = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, tt = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "CommandPalette",
	setup(e) {
		let t = Re(), n = ue(), i = Ge(), a = L(null), o = U(), s = L(0);
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
		let u = b(() => {
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
		}), d = b(() => u.value.options.length), f = b(() => d.value ? `${o}-opt-${s.value}` : void 0);
		K(() => t.query, () => {
			s.value = 0;
		}), K(d, (e) => {
			s.value > e - 1 && (s.value = Math.max(0, e - 1));
		}), K(() => t.open, (e) => {
			e && (s.value = 0);
		});
		function p() {
			typeof document > "u" || document.getElementById(`${o}-opt-${s.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function m(e) {
			let t = d.value;
			t && (s.value = (s.value + e + t) % t, p());
		}
		function h() {
			let e = u.value.options[s.value];
			e && e.run();
		}
		function y(e) {
			e.run();
		}
		function x(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), m(1);
					break;
				case "ArrowUp":
					e.preventDefault(), m(-1);
					break;
				case "Home":
					e.preventDefault(), s.value = 0, p();
					break;
				case "End":
					e.preventDefault(), s.value = Math.max(0, d.value - 1), p();
					break;
				case "Enter":
					e.preventDefault(), h();
					break;
			}
		}
		function E() {
			t.closePalette();
		}
		Me(a, b(() => t.open), { onEscape: () => (t.closePalette(), !0) });
		function O(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), t.togglePalette());
		}
		let A = k("phlixCommands", []), M = [
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
		], I = null;
		return P(() => {
			I = t.register([...M, ...A]), document.addEventListener("keydown", O);
		}), N(() => {
			I?.(), document.removeEventListener("keydown", O);
		}), (e, n) => (F(), S(_, { to: "body" }, [D(v, { name: "phlix-cmdk" }, {
			default: J(() => [H(t).open ? (F(), w("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: X(E, ["self"])
			}, [T("div", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [T("div", Ke, [
				D(r, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				T("input", {
					value: H(t).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": H(o),
					"aria-activedescendant": f.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: n[0] ||= (e) => H(t).setQuery(e.target.value),
					onKeydown: x
				}, null, 40, qe),
				D(Ee, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), T("ul", {
				id: H(o),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(F(!0), w(g, null, R(u.value.rows, (e, t) => (F(), w(g, { key: e.kind === "header" ? `h-${e.label}-${t}` : e.item.id }, [e.kind === "header" ? (F(), w("li", Ye, V(e.label), 1)) : (F(), w("li", {
				key: 1,
				id: `${H(o)}-opt-${e.index}`,
				class: j(["phlix-cmdk__option", { "is-active": e.index === s.value }]),
				role: "option",
				"aria-selected": e.index === s.value,
				onClick: (t) => y(e.item),
				onPointermove: (t) => s.value = e.index
			}, [
				D(r, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				T("span", Ze, [T("span", Qe, V(e.item.title), 1), e.item.subtitle ? (F(), w("span", $e, V(e.item.subtitle), 1)) : C("", !0)]),
				e.item.shortcut ? (F(), S(Ee, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : C("", !0)
			], 42, Xe))], 64))), 128)), d.value ? C("", !0) : (F(), w("li", et, " No matching commands "))], 8, Je)], 512)], 32)) : C("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]);
//#endregion
//#region src/composables/color.ts
function nt(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var rt = (e) => Math.max(0, Math.min(255, Math.round(e))), it = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => rt(e).toString(16).padStart(2, "0")).join("");
function at(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function ot(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var st = ({ r: e, g: t, b: n }, r) => `rgba(${rt(e)}, ${rt(t)}, ${rt(n)}, ${r})`;
function ct({ r: e, g: t, b: n }) {
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
function lt(e) {
	let t = nt(e);
	if (!t) return null;
	let n = ct(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": it(t),
		"--accent-hover": it(at(t, .12)),
		"--accent-active": it(ot(t, .12)),
		"--accent-soft": st(t, .14),
		"--accent-ring": st(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var ut = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function dt(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? lt(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of ut) n.style.removeProperty(e);
}
function ft(e) {
	let t = He();
	e && !Ue() && (t.theme = e), dt(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function pt() {
	let e = Ge();
	return q(() => {
		dt({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var mt = ["src", "alt"], ht = { class: "brand-wordmark" }, gt = {
	key: 1,
	class: "brand-tagline"
}, _t = { class: "main-nav" }, vt = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "PhlixApp",
	setup(e) {
		pt();
		let t = Re(), n = k("phlixConfig", null), i = b(() => n?.branding ?? {}), a = b(() => i.value.wordmark ?? "Phlix"), o = b(() => n?.menu ?? []), s = b(() => n?.routerBase ?? "/app");
		function c(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, n) => (F(), S(Se, null, {
			logo: J(() => [D(H(oe), {
				to: s.value,
				class: "brand"
			}, {
				default: J(() => [
					i.value.logoSrc ? (F(), w("img", {
						key: 0,
						src: i.value.logoSrc,
						alt: i.value.logoAlt ?? a.value,
						class: "brand-logo"
					}, null, 8, mt)) : C("", !0),
					T("span", ht, V(a.value), 1),
					i.value.tagline ? (F(), w("span", gt, V(i.value.tagline), 1)) : C("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: J(() => [T("nav", _t, [o.value.length ? (F(!0), w(g, { key: 0 }, R(o.value, (e) => (F(), S(ee(e.href ? "a" : H(oe)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? c(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: J(() => [e.icon ? (F(), S(r, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : C("", !0), E(" " + V(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (F(), w(g, { key: 1 }, [D(H(oe), {
				to: s.value,
				class: "nav-link"
			}, {
				default: J(() => [...n[1] ||= [E("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), D(H(oe), {
				to: `${s.value}/settings`,
				class: "nav-link"
			}, {
				default: J(() => [...n[2] ||= [E("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64)), D(Q, {
				name: "search",
				label: "Open command palette (⌘K)",
				size: "sm",
				class: "nav-cmdk",
				onClick: n[0] ||= (e) => H(t).openPalette()
			})])]),
			default: J(() => [D(H(Z)), D(tt)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-78cfb9e9"]]), yt = { class: "phlix-placeholder" }, bt = { class: "placeholder-content" }, xt = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (F(), w("div", yt, [T("div", bt, [n[0] ||= T("h1", null, "Shared UI loading...", -1), T("p", null, "Phlix " + V(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), St = 6e4, Ct = 250;
function wt(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var Tt = ae("media", () => {
	let e = L([]), t = L(0), n = L(!1), r = L(null), i = L(""), o = L([]), s = L(void 0), c = L(void 0), l = L([]), u = L([]), d = L("name"), f = L("asc"), p = L(24), m = L(0), h = b(() => e.value.length < t.value), g = b(() => {
		let e = {};
		return i.value && (e.search = i.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = b(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
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
		return !!e && Date.now() - e.ts < St;
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
			if (wt(e)) return;
			(t || a === E) && (r.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === E) && (n.value = !1);
		}
	}
	function N(e, t = Ct) {
		m.value = 0, clearTimeout(O), O = setTimeout(() => M(e, !1), t);
	}
	async function P(t) {
		n.value || !h.value || (m.value = e.value.length, await M(t, !0));
	}
	async function F(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = C(n);
		if (!k(w.get(r))) try {
			await A(e, n, r, !1);
		} catch {}
	}
	function I() {
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
	function ee(e) {
		i.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = B(e.genres), l.value = B(e.ratings), u.value = B(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, a = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = a ?? "asc", m.value = 0;
	}
	function V() {
		e.value = [], t.value = 0, m.value = 0, r.value = null;
	}
	function te(e) {
		i.value = e, m.value = 0;
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
	function ne(e, t) {
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
		availableGenres: _,
		availableRatings: v,
		availableTypes: y,
		fetchMedia: M,
		scheduleFetch: N,
		loadMore: P,
		prefetch: F,
		clearCache: I,
		cancelScheduled: R,
		toQuery: z,
		applyQuery: ee,
		reset: V,
		setSearch: te,
		setGenres: H,
		setYearRange: U,
		setRatings: W,
		setTypes: G,
		setSort: ne
	};
}), Et = 30, Dt = .95, Ot = 5e3, kt = "phlix.resume";
function At() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(kt);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var jt = ae("phlix-player", () => {
	let e = Ge(), t = L(null), n = L([]), r = L(!1), i = L(0), a = L(0), o = L(0), s = L(e.defaultVolume), c = L(!1), l = L(1), u = L(e.defaultQuality), d = L(e.defaultSubtitleLang), f = L(!1), p = L(At()), m = b(() => a.value > 0 ? i.value / a.value : 0), h = b(() => n.value[0] ?? null), g, _ = 0;
	function v(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			_ = Date.now();
			try {
				localStorage.setItem(kt, JSON.stringify(p.value));
			} catch {}
		}, n = Date.now() - _;
		clearTimeout(g), e || n >= Ot ? t() : g = setTimeout(t, Ot - n);
	}
	function y(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function x(e, t, n) {
		y(t, n) ? p.value[e] = Math.floor(t) : delete p.value[e], v();
	}
	function S(e) {
		return e ? p.value[e] ?? null : null;
	}
	function C(e) {
		delete p.value[e], v(!0);
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
		r.value = !1, t.value && x(t.value.id, i.value, a.value), v(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
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
	function P(e) {
		n.value.push(e);
	}
	function F() {
		let e = n.value.shift() ?? null;
		return e && w(e), e;
	}
	function I() {
		f.value = !0;
	}
	function R() {
		f.value = !1;
	}
	function z() {
		t.value && x(t.value.id, i.value, a.value), v(!0), r.value = !1, f.value = !1, t.value = null;
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
	function ee(e) {
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
		enqueue: P,
		next: F,
		showMiniPlayer: I,
		hideMiniPlayer: R,
		closePlayer: z,
		setMediaSessionMetadata: B,
		bindMediaSession: ee,
		seedFromPreferences: V
	};
}), Mt = { class: "media-card" }, Nt = { class: "media-card__poster" }, Pt = ["href", "aria-label"], Ft = { class: "visually-hidden" }, It = ["src", "alt"], Lt = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Rt = { class: "media-card__badges" }, zt = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Bt = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Vt = ["aria-valuenow", "aria-label"], Ht = { class: "media-card__overlay" }, Ut = { class: "media-card__title" }, Wt = { class: "media-card__meta" }, Gt = {
	key: 0,
	class: "numeric"
}, Kt = {
	key: 1,
	class: "media-card__dot"
}, qt = {
	key: 2,
	class: "media-card__cert"
}, Jt = {
	key: 3,
	class: "media-card__dot"
}, Yt = {
	key: 4,
	class: "numeric"
}, Xt = {
	key: 0,
	class: "media-card__genres"
}, Zt = { class: "media-card__actions" }, Qt = { class: "media-card__caption" }, $t = ["title"], en = { class: "media-card__caption-sub numeric" }, tn = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, i = t, a = jt(), o = b(() => n.to ?? `/app/player/${n.item.id}`), s = L(!1), c = L(null);
		function l() {
			s.value = !0;
		}
		P(() => {
			c.value?.complete && (s.value = !0);
		});
		let u = b(() => {
			let e = n.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= n.newWithinDays * 24 * 60 * 60 * 1e3;
		}), d = b(() => {
			let e = a.resumePositionFor(n.item.id), t = n.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), f = b(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (F(), w("article", Mt, [T("div", Nt, [
			T("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [T("span", Ft, V(e.item.name), 1)], 8, Pt),
			e.item.poster_url ? (F(), w("img", {
				key: 0,
				ref_key: "imgEl",
				ref: c,
				class: j(["media-card__img", { "is-loaded": s.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: l
			}, null, 42, It)) : (F(), w("div", Lt, [D(r, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			T("div", Rt, [
				u.value ? (F(), w("span", zt, "New")) : C("", !0),
				z(t.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (F(), w("span", Bt, V(e.quality), 1)) : C("", !0)
			]),
			d.value > 0 ? (F(), w("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [T("i", { style: M({ width: `${d.value * 100}%` }) }, null, 4)], 8, Vt)) : C("", !0),
			T("div", Ht, [
				T("h3", Ut, V(e.item.name), 1),
				T("div", Wt, [
					e.item.year ? (F(), w("span", Gt, V(e.item.year), 1)) : C("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (F(), w("span", Kt)) : C("", !0),
					e.item.rating ? (F(), w("span", qt, V(e.item.rating), 1)) : C("", !0),
					e.item.rating && e.item.runtime ? (F(), w("span", Jt)) : C("", !0),
					e.item.runtime ? (F(), w("span", Yt, V(e.item.runtime) + "m", 1)) : C("", !0)
				]),
				f.value.length ? (F(), w("div", Xt, [(F(!0), w(g, null, R(f.value, (e) => (F(), w("span", { key: e }, V(e), 1))), 128))])) : C("", !0),
				T("div", Zt, [
					T("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: n[0] ||= (t) => i("play", e.item)
					}, [D(r, { name: "play" })]),
					T("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: n[1] ||= (t) => i("watchlist", e.item)
					}, [D(r, { name: "bookmark-plus" })]),
					T("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: n[2] ||= (t) => i("info", e.item)
					}, [D(r, { name: "info" })]),
					z(t.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), T("div", Qt, [T("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, V(e.item.name), 9, $t), T("div", en, [
			e.item.year ? (F(), w(g, { key: 0 }, [E(V(e.item.year), 1)], 64)) : C("", !0),
			e.item.year && e.item.runtime ? (F(), w(g, { key: 1 }, [E(" · ")], 64)) : C("", !0),
			e.item.runtime ? (F(), w(g, { key: 2 }, [E(V(e.item.runtime) + "m", 1)], 64)) : C("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), nn = 3 / 2;
function rn(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function an(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function on(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * nn + t + n;
}
function sn(e) {
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
var cn = { class: "media-grid-root" }, ln = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, un = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, dn = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, i = t, a = Ge(), o = b(() => n.cardSize ?? a.cardSize ?? 180), s = L(null), c = L(null), l = L(0), u = L(0), d = L(0);
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
		let h = b(() => rn(l.value, o.value, 20)), _ = b(() => on(an(l.value, h.value, 20))), y = b(() => l.value > 0 && _.value > 0), x = b(() => sn({
			scrollTop: d.value,
			viewportHeight: u.value,
			rowHeight: _.value,
			columns: h.value,
			itemCount: n.items.length,
			overscan: n.overscan
		})), S = b(() => {
			if (!y.value) return n.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = x.value, r = [];
			for (let i = e; i < t; i++) r.push({
				item: n.items[i],
				index: i
			});
			return r;
		}), O = b(() => ({ gridTemplateColumns: y.value ? `repeat(${h.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), k = b(() => y.value ? { height: `${x.value.totalHeight}px` } : {}), j = b(() => y.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${x.value.padTop}px)`
		} : {}), I = b(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), B = b(() => y.value && d.value > u.value * 1.5);
		function ee() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let V = null;
		function te() {
			V || typeof IntersectionObserver > "u" || (V = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && n.hasMore && !n.loading && !n.loadingMore && i("load-more");
			}, { rootMargin: "400px 0px" }), c.value && V.observe(c.value));
		}
		function H() {
			V?.disconnect(), V = null;
		}
		K(() => c.value, (e) => {
			H(), e && (te(), m());
		});
		let U = null;
		function W() {
			U || typeof ResizeObserver > "u" || !s.value || (U = new ResizeObserver(m), U.observe(s.value));
		}
		function G() {
			U?.disconnect(), U = null;
		}
		return K(() => s.value, (e) => {
			G(), e && (W(), m());
		}), P(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("resize", m, { passive: !0 })), W(), te();
		}), N(() => {
			typeof window < "u" && (window.removeEventListener("scroll", m), window.removeEventListener("resize", m)), p &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), 0), G(), H();
		}), K(() => n.items.length, () => A(m)), (t, n) => (F(), w("div", cn, [e.loading && e.items.length === 0 ? (F(), w("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: M(I.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(F(!0), w(g, null, R(e.skeletonCount, (e) => (F(), w("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...n[0] ||= [
			T("div", { class: "skel-poster" }, null, -1),
			T("div", { class: "skel-title" }, null, -1),
			T("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (F(), w("div", ln, [z(t.$slots, "empty", {}, () => [
			D(r, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			n[1] ||= T("p", { class: "media-grid-empty__title" }, "No media found", -1),
			n[2] ||= T("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (F(), w(g, { key: 2 }, [
			T("div", {
				ref_key: "sizerEl",
				ref: s,
				class: "media-grid-sizer",
				style: M(k.value)
			}, [T("div", {
				class: "media-grid",
				style: M([O.value, j.value])
			}, [(F(!0), w(g, null, R(S.value, (e) => z(t.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [D(tn, {
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
			e.loadingMore ? (F(), w("div", un, [...n[3] ||= [T("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), E(" Loading more… ", -1)]])) : C("", !0),
			e.hasMore && !e.loadingMore ? (F(), w("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: c,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : C("", !0)
		], 64)), D(v, { name: "media-grid-fade" }, {
			default: J(() => [B.value ? (F(), w("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: ee
			}, [D(r, { name: "arrow-up" })])) : C("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), fn = ["aria-label"], pn = { class: "media-row__head" }, mn = { class: "media-row__title" }, hn = {
	key: 0,
	class: "media-row__count numeric"
}, gn = { class: "media-row__action" }, _n = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, vn = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, yn = { class: "media-row__skel-poster" }, bn = ["aria-label"], xn = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, r = t, i = b(() => !n.loading && !n.error && n.items.length === 0), a = b(() => n.hideWhenEmpty && i.value);
		return (t, n) => a.value ? C("", !0) : (F(), w("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [T("div", pn, [
			T("h2", mn, V(e.title), 1),
			e.count == null ? C("", !0) : (F(), w("span", hn, V(e.count.toLocaleString()), 1)),
			T("div", gn, [z(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (F(), w("div", _n, [T("span", null, V(e.error), 1), T("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (F(), w("div", vn, [(F(!0), w(g, null, R(e.skeletonCount, (e) => (F(), w("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [T("div", yn, [D(u, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), D(u, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : i.value ? (F(), S(p, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: J(() => [z(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (F(), w("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(F(!0), w(g, null, R(e.items, (t) => (F(), w("li", {
			key: t.id,
			class: "media-row__cell"
		}, [D(tn, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, bn))], 8, fn));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function Sn(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function Cn(e, t = {}) {
	return `${e}/api/v1/media?${Sn(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var wn = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let r = e, i = n, o = t(), s = L([]), c = L(null), l = L(!1), u = L(null), d = L(!1), f = L(null), p = null, m = null, h = !1;
		function g(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function _() {
			if (!l.value) {
				l.value = !0, u.value = null, m = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new a({ baseUrl: r.apiBase }), t = Cn(r.apiBase, {
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
		return P(v), N(() => {
			h = !0, m?.abort(), m = null, p?.disconnect(), p = null;
		}), (t, n) => (F(), w("div", {
			ref_key: "rootEl",
			ref: f
		}, [D(xn, {
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
			action: J(() => [T("button", {
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
}), [["__scopeId", "data-v-fb0faca3"]]), Tn = ["disabled", "aria-pressed"], En = { class: "phlix-chip__label" }, Dn = ["disabled", "aria-label"], On = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		return (t, n) => (F(), w("span", { class: j(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [T("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (F(), S(r, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : C("", !0), T("span", En, [z(t.$slots, "default", {}, void 0, !0)])], 8, Tn), e.removable ? (F(), w("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => i("remove")
		}, [D(r, { name: "x" })], 8, Dn)) : C("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), kn = { class: "phlix-combobox__field" }, An = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], jn = ["id", "aria-label"], Mn = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Nn = { class: "phlix-combobox__check" }, Pn = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, Fn = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let a = t, o = n, c = b(() => s(a.options)), l = U(), u = L(!1), d = L(-1), f = L(""), p = L(!1), m = L(null), h = L(null), _ = L(null), v = b(() => c.value.find((e) => e.value === a.modelValue)?.label ?? ""), y = b(() => {
			if (!p.value || f.value.trim() === "") return c.value;
			let e = f.value.toLowerCase();
			return c.value.filter((t) => t.label.toLowerCase().includes(e));
		}), x = b(() => d.value >= 0 ? `${l}-opt-${d.value}` : void 0);
		K(() => a.modelValue, () => {
			u.value || (f.value = v.value);
		}, { immediate: !0 });
		function O() {
			a.disabled || u.value || (u.value = !0, d.value = y.value.findIndex((e) => e.value === a.modelValue), d.value < 0 && (d.value = y.value.findIndex((e) => !e.disabled)), A(I));
		}
		function k() {
			f.value = v.value, p.value = !1, u.value = !1;
		}
		function M(e) {
			let t = y.value[e];
			!t || t.disabled || (t.value !== a.modelValue && (o("update:modelValue", t.value), o("change", t.value)), f.value = t.label, p.value = !1, u.value = !1, h.value?.focus());
		}
		function P(t) {
			y.value.length !== 0 && (d.value = e(y.value, d.value, t), A(I));
		}
		function I() {
			_.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function z(e) {
			f.value = e.target.value, p.value = !0, u.value = !0, d.value = i(y.value, "first");
		}
		function B(e) {
			if (!a.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), u.value ? P(1) : O();
					break;
				case "ArrowUp":
					e.preventDefault(), u.value ? P(-1) : O();
					break;
				case "Enter":
					u.value && d.value >= 0 && (e.preventDefault(), M(d.value));
					break;
				case "Escape":
					u.value && (e.preventDefault(), k());
					break;
				case "Tab":
					u.value && k();
					break;
			}
		}
		function ee(e) {
			u.value && m.value && !m.value.contains(e.target) && k();
		}
		return K(u, (e) => {
			e ? document.addEventListener("pointerdown", ee, !0) : document.removeEventListener("pointerdown", ee, !0);
		}), N(() => document.removeEventListener("pointerdown", ee, !0)), (e, n) => (F(), w("div", {
			ref_key: "rootEl",
			ref: m,
			class: j(["phlix-combobox", {
				"is-open": u.value,
				"is-disabled": t.disabled
			}])
		}, [T("div", kn, [
			D(r, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			T("input", {
				ref_key: "inputEl",
				ref: h,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": u.value,
				"aria-controls": u.value ? `${H(l)}-list` : void 0,
				"aria-activedescendant": u.value ? x.value : void 0,
				"aria-label": t.label,
				placeholder: t.placeholder,
				disabled: t.disabled,
				value: f.value,
				onInput: z,
				onFocus: O,
				onKeydown: B
			}, null, 40, An),
			D(r, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Y(T("ul", {
			id: `${H(l)}-list`,
			ref_key: "listEl",
			ref: _,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": t.label
		}, [(F(!0), w(g, null, R(y.value, (e, n) => (F(), w("li", {
			id: `${H(l)}-opt-${n}`,
			key: e.value,
			class: j(["phlix-combobox__option", {
				"is-active": n === d.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => M(n),
			onPointermove: (t) => !e.disabled && (d.value = n)
		}, [T("span", Nn, [e.value === t.modelValue ? (F(), S(r, {
			key: 0,
			name: "check"
		})) : C("", !0)]), E(" " + V(e.label), 1)], 42, Mn))), 128)), y.value.length === 0 ? (F(), w("li", Pn, "No matches")) : C("", !0)], 8, jn), [[ne, u.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), In = { class: "filterbar__main" }, Ln = { class: "filterbar__search" }, Rn = { class: "filterbar__sort" }, zn = ["aria-label"], Bn = ["aria-expanded"], Vn = { class: "filterbar__advanced" }, Hn = { class: "filterbar__field" }, Un = { class: "filterbar__field" }, Wn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, Gn = { class: "filterbar__field" }, Kn = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, qn = { class: "filterbar__field" }, Jn = { class: "filterbar__years" }, Yn = { class: "filterbar__field filterbar__presets" }, Xn = { class: "filterbar__chips" }, Zn = {
	key: 0,
	class: "filterbar__presets-empty"
}, Qn = {
	key: 0,
	class: "filterbar__preset-save"
}, $n = ["onKeydown"], er = ["disabled"], tr = { class: "filterbar__active" }, nr = {
	class: "filterbar__count",
	"aria-live": "polite"
}, rr = { class: "filterbar__pills" }, ir = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, i = t, a = Tt(), o = Ge(), s = [
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
		], c = L(a.search), u;
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
		let p = L(null), h = L(0), _ = b(() => a.availableGenres.filter((e) => !a.selectedGenres.includes(e)));
		function y(e) {
			if (e == null || e === "") return;
			let t = String(e);
			a.selectedGenres.includes(t) || (a.setGenres([...a.selectedGenres, t]), i("change")), p.value = null, h.value++;
		}
		function x(e) {
			let t = a.selectedRatings;
			a.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		function O(e) {
			let t = a.selectedTypes;
			a.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		let k = b(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), A = b(() => {
			let e = [];
			for (let t = k.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function M(e) {
			a.setYearRange(e == null || e === "" ? void 0 : Number(e), a.yearTo), i("change");
		}
		function I(e) {
			a.setYearRange(a.yearFrom, e == null || e === "" ? void 0 : Number(e)), i("change");
		}
		function z(e) {
			a.setSort(e), i("change");
		}
		function B() {
			a.order = a.order === "asc" ? "desc" : "asc", a.offset = 0, i("change");
		}
		let ee = b(() => {
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
				remove: () => x(t)
			})), a.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => O(t)
			})), a.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${a.yearFrom}`,
				remove: () => M(null)
			}), a.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${a.yearTo}`,
				remove: () => I(null)
			}), e;
		}), te = b(() => ee.value.length > 0), U = b(() => a.selectedGenres.length + a.selectedRatings.length + a.selectedTypes.length + (a.yearFrom === void 0 ? 0 : 1) + (a.yearTo === void 0 ? 0 : 1));
		function W() {
			c.value = "", a.setSearch(""), a.setGenres([]), a.setRatings([]), a.setTypes([]), a.setYearRange(void 0, void 0), i("change");
		}
		let q = L(!1), ie = b(() => o.filterPresets), ae = L(!1), oe = L("");
		function Z() {
			ae.value = !0, oe.value = "";
		}
		function se() {
			let e = oe.value.trim();
			e && (o.saveFilterPreset(e, a.toQuery()), ae.value = !1, oe.value = "");
		}
		function ce(e) {
			a.applyQuery(e.query), c.value = a.search, i("change");
		}
		function le(e) {
			o.removeFilterPreset(e.id);
		}
		let ue = L(!1);
		function de() {
			typeof window > "u" || (ue.value = window.scrollY > 24);
		}
		return P(() => {
			n.sticky && typeof window < "u" && (window.addEventListener("scroll", de, { passive: !0 }), de());
		}), N(() => {
			clearTimeout(u), typeof window < "u" && window.removeEventListener("scroll", de);
		}), (t, n) => (F(), w("div", { class: j(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ue.value
		}]) }, [
			T("div", In, [
				T("label", Ln, [
					D(r, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					Y(T("input", {
						"onUpdate:modelValue": n[0] ||= (e) => c.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: d
					}, null, 544), [[G, c.value]]),
					c.value ? (F(), w("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: f
					}, [D(r, { name: "x" })])) : C("", !0)
				]),
				T("div", Rn, [D(l, {
					"model-value": H(a).sort,
					options: s,
					label: "Sort by",
					"onUpdate:modelValue": z
				}, null, 8, ["model-value"]), T("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${H(a).order === "asc" ? "ascending" : "descending"}`,
					onClick: B
				}, [D(r, { name: H(a).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, zn)]),
				T("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": q.value,
					onClick: n[1] ||= (e) => q.value = !q.value
				}, [
					D(r, { name: "filter" }),
					n[4] ||= T("span", null, "Filters", -1),
					U.value ? (F(), S(m, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: J(() => [E(V(U.value), 1)]),
						_: 1
					})) : C("", !0),
					D(r, {
						name: q.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, Bn)
			]),
			D(v, { name: "filterbar-panel" }, {
				default: J(() => [Y(T("div", Vn, [
					T("div", Hn, [n[5] ||= T("span", { class: "filterbar__field-label" }, "Genres", -1), (F(), S(Fn, {
						key: h.value,
						"model-value": p.value,
						options: _.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": y
					}, null, 8, ["model-value", "options"]))]),
					T("div", Un, [n[6] ||= T("span", { class: "filterbar__field-label" }, "Rating", -1), T("div", Wn, [(F(!0), w(g, null, R(H(a).availableRatings, (e) => (F(), S(On, {
						key: e,
						selected: H(a).selectedRatings.includes(e),
						"onUpdate:selected": (t) => x(e)
					}, {
						default: J(() => [E(V(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					T("div", Gn, [n[7] ||= T("span", { class: "filterbar__field-label" }, "Type", -1), T("div", Kn, [(F(!0), w(g, null, R(H(a).availableTypes, (e) => (F(), S(On, {
						key: e,
						selected: H(a).selectedTypes.includes(e),
						"onUpdate:selected": (t) => O(e)
					}, {
						default: J(() => [E(V(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					T("div", qn, [n[9] ||= T("span", { class: "filterbar__field-label" }, "Year", -1), T("div", Jn, [
						D(Fn, {
							"model-value": H(a).yearFrom ?? null,
							options: A.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": M
						}, null, 8, ["model-value", "options"]),
						n[8] ||= T("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						D(Fn, {
							"model-value": H(a).yearTo ?? null,
							options: A.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": I
						}, null, 8, ["model-value", "options"])
					])]),
					T("div", Yn, [
						n[12] ||= T("span", { class: "filterbar__field-label" }, "Presets", -1),
						T("div", Xn, [(F(!0), w(g, null, R(ie.value, (e) => (F(), S(On, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => ce(e),
							onRemove: (t) => le(e)
						}, {
							default: J(() => [E(V(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ie.value.length ? C("", !0) : (F(), w("span", Zn, "No saved presets"))]),
						ae.value ? (F(), w("div", Qn, [Y(T("input", {
							"onUpdate:modelValue": n[2] ||= (e) => oe.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [re(X(se, ["prevent"]), ["enter"]), n[3] ||= re((e) => ae.value = !1, ["esc"])]
						}, null, 40, $n), [[G, oe.value]]), T("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: se
						}, [D(r, { name: "check" }), n[10] ||= E(" Save ", -1)])])) : (F(), w("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !te.value,
							onClick: Z
						}, [D(r, { name: "plus" }), n[11] ||= E(" Save current ", -1)], 8, er))
					])
				], 512), [[ne, q.value]])]),
				_: 1
			}),
			T("div", tr, [T("span", nr, [T("b", null, V(H(a).total.toLocaleString()), 1), E(" " + V(H(a).total === 1 ? "title" : "titles"), 1)]), te.value ? (F(), w(g, { key: 0 }, [T("div", rr, [(F(!0), w(g, null, R(ee.value, (e) => (F(), S(On, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: J(() => [E(V(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), T("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: W
			}, "Clear all")], 64)) : C("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), ar = { class: "browse-page" }, or = { class: "browse-toolbar" }, sr = { class: "browse-header" }, cr = { class: "browse-count numeric" }, lr = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, ur = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "BrowsePage",
	setup(e) {
		let n = k("apiBase", ""), r = b(() => typeof n == "string" ? n : n?.value ?? ""), i = k("phlixConfig", null), a = b(() => i?.homeRows ?? []), o = Tt(), s = jt(), c = t(), l = ue(), u = L(null), d = I(/* @__PURE__ */ new Map());
		function f(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		K(() => o.items, (e) => f(e), { immediate: !0 });
		let p = b(() => {
			let e = s.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function m() {
			o.reset(), o.fetchMedia(r.value);
		}
		P(m), K(r, m);
		function h() {
			o.reset(), o.fetchMedia(r.value);
		}
		function _() {
			o.loadMore(r.value);
		}
		function v(e, t) {
			l?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function y(e) {
			v("player", e.id);
		}
		function x(e) {
			c.success(`Added "${e.name}" to your list`);
		}
		function E(e) {
			l?.hasRoute("media") ? v("media", e.id) : c.info(`Details for "${e.name}" are coming soon`);
		}
		function O() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function A(e) {
			o.applyQuery(e.query ?? {}), m(), u.value?.scrollIntoView?.({
				behavior: O() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (e, t) => (F(), w("div", ar, [
			T("div", or, [z(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			p.value.length ? (F(), S(xn, {
				key: 0,
				title: "Continue Watching",
				items: p.value,
				"hide-when-empty": "",
				onPlay: y,
				onWatchlist: x,
				onInfo: E
			}, null, 8, ["items"])) : C("", !0),
			(F(!0), w(g, null, R(a.value, (e) => (F(), S(wn, {
				key: e.id,
				row: e,
				"api-base": r.value,
				onItemsLoaded: f,
				onSeeAll: A,
				onPlay: y,
				onWatchlist: x,
				onInfo: E
			}, null, 8, ["row", "api-base"]))), 128)),
			T("section", {
				ref_key: "gridSection",
				ref: u,
				class: "browse-library"
			}, [
				T("div", sr, [t[0] ||= T("h1", { class: "browse-title" }, "Browse", -1), T("span", cr, V(H(o).total.toLocaleString()) + " titles", 1)]),
				D(ir, { onChange: h }),
				H(o).error ? (F(), w("div", lr, [T("p", null, V(H(o).error), 1), T("button", {
					type: "button",
					class: "browse-retry",
					onClick: m
				}, "Retry")])) : C("", !0),
				D(dn, {
					items: H(o).items,
					loading: H(o).loading && H(o).items.length === 0,
					"loading-more": H(o).loading && H(o).items.length > 0,
					"has-more": H(o).hasMore,
					onLoadMore: _,
					onPlay: y,
					onWatchlist: x,
					onInfo: E
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-214269cb"]]), dr = { class: "media-detail" }, fr = { class: "media-detail__bar" }, pr = { class: "media-detail__hero" }, mr = { class: "media-detail__poster" }, hr = ["src", "alt"], gr = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, _r = { class: "media-detail__info" }, vr = { class: "media-detail__title" }, yr = { class: "media-detail__meta numeric" }, br = {
	key: 0,
	class: "media-detail__meta-item"
}, xr = {
	key: 1,
	class: "media-detail__cert"
}, Sr = {
	key: 2,
	class: "media-detail__meta-item"
}, Cr = { class: "media-detail__type" }, wr = {
	key: 0,
	class: "media-detail__genres"
}, Tr = { class: "media-detail__overview" }, Er = { class: "media-detail__actions" }, Dr = { class: "media-detail__resume-at numeric" }, Or = {
	key: 1,
	class: "media-detail__credits"
}, kr = {
	key: 0,
	class: "media-detail__credit"
}, Ar = {
	key: 1,
	class: "media-detail__credit"
}, jr = { class: "media-detail__cast" }, Mr = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, i = t, a = b(() => n.item.type === "audio" ? "music" : n.item.type === "image" ? "image" : n.item.type === "series" ? "tv" : "film"), s = b(() => n.item.actors?.slice(0, 8) ?? []), c = b(() => {
			let e = n.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(r).padStart(2, "0") : String(r);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), l = L(!1), u = L(null);
		function d() {
			l.value = !0;
		}
		return P(() => {
			u.value?.complete && (l.value = !0);
		}), (t, n) => (F(), w("article", dr, [
			e.item.poster_url ? (F(), w("div", {
				key: 0,
				class: "media-detail__ambient",
				style: M({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : C("", !0),
			T("div", fr, [e.showBack ? (F(), S(o, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => i("back")
			}, {
				default: J(() => [...n[7] ||= [E("Back", -1)]]),
				_: 1
			})) : C("", !0)]),
			T("div", pr, [T("div", mr, [e.item.poster_url ? (F(), w("img", {
				key: 0,
				ref_key: "imgEl",
				ref: u,
				class: j(["media-detail__img", { "is-loaded": l.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: d
			}, null, 42, hr)) : (F(), w("div", gr, [D(r, { name: a.value }, null, 8, ["name"])]))]), T("div", _r, [
				T("h1", vr, V(e.item.name), 1),
				T("div", yr, [
					e.item.year ? (F(), w("span", br, [D(r, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), E(V(e.item.year), 1)])) : C("", !0),
					e.item.rating ? (F(), w("span", xr, V(e.item.rating), 1)) : C("", !0),
					e.item.runtime ? (F(), w("span", Sr, V(e.item.runtime) + "m", 1)) : C("", !0),
					T("span", Cr, V(e.item.type), 1)
				]),
				e.item.genres?.length ? (F(), w("div", wr, [(F(!0), w(g, null, R(e.item.genres, (e) => (F(), S(On, {
					key: e,
					size: "sm"
				}, {
					default: J(() => [E(V(e), 1)]),
					_: 2
				}, 1024))), 128))])) : C("", !0),
				T("p", Tr, V(e.item.overview || "No overview available."), 1),
				T("div", Er, [
					D(o, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => i("play", e.item)
					}, {
						default: J(() => [...n[8] ||= [E("Play", -1)]]),
						_: 1
					}),
					c.value ? (F(), S(o, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => i("resume", e.item)
					}, {
						default: J(() => [n[9] ||= E(" Resume ", -1), T("span", Dr, V(c.value), 1)]),
						_: 1
					})) : C("", !0),
					D(o, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: n[3] ||= (t) => i("watchlist", e.item)
					}, {
						default: J(() => [...n[10] ||= [E("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || s.value.length ? (F(), w("dl", Or, [e.item.director ? (F(), w("div", kr, [n[11] ||= T("dt", null, "Director", -1), T("dd", null, V(e.item.director), 1)])) : C("", !0), s.value.length ? (F(), w("div", Ar, [n[12] ||= T("dt", null, "Cast", -1), T("dd", jr, [(F(!0), w(g, null, R(s.value, (e) => (F(), S(On, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: J(() => [E(V(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : C("", !0)])) : C("", !0)
			])]),
			e.similarLoading || e.similar.length ? (F(), S(xn, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: n[4] ||= (e) => i("play", e),
				onWatchlist: n[5] ||= (e) => i("watchlist", e),
				onInfo: n[6] ||= (e) => i("info", e)
			}, null, 8, ["items", "loading"])) : C("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), Nr = { class: "media-detail-page" }, Pr = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, Fr = { class: "media-detail-page__loading-hero" }, Ir = { class: "media-detail-page__loading-info" }, Lr = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "MediaDetailPage",
	setup(e) {
		let n = k("apiBase", ""), r = b(() => typeof n == "string" ? n : n?.value ?? ""), i = le(), s = ue(), c = jt(), l = t(), d = L(null), f = L([]), m = L(!0), h = L(!1), g = L(null), _ = b(() => String(i.params.id ?? "")), v = b(() => c.resumePositionFor(_.value)), y = null, x = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function A(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				f.value = [];
				return;
			}
			let i = y, a = () => x || i !== y;
			h.value = !0;
			try {
				let o = Cn(r.value, {
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
				a() || (h.value = !1);
			}
		}
		async function j() {
			let e = _.value;
			if (y?.abort(), y = typeof AbortController < "u" ? new AbortController() : null, m.value = !0, g.value = null, f.value = [], !e) {
				g.value = "No media id provided", m.value = !1;
				return;
			}
			try {
				let t = new a({ baseUrl: r.value }), n = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, y?.signal);
				if (x) return;
				d.value = n, m.value = !1, A(t, n);
			} catch (e) {
				if (x || O(e)) return;
				g.value = e instanceof Error ? e.message : "Failed to load title", m.value = !1;
			}
		}
		P(j), K(_, j), N(() => {
			x = !0, y?.abort(), y = null;
		});
		function M(e, t) {
			s?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function I(e) {
			M("player", e.id);
		}
		function R(e) {
			l.success(`Added "${e.name}" to your list`);
		}
		function z(e) {
			M("media", e.id);
		}
		function B() {
			s?.back();
		}
		return (e, t) => (F(), w("div", Nr, [m.value ? (F(), w("div", Pr, [T("div", Fr, [D(u, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), T("div", Ir, [
			D(u, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			D(u, {
				variant: "text",
				lines: 4
			}),
			D(u, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : g.value ? (F(), S(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: g.value
		}, {
			actions: J(() => [D(o, {
				variant: "solid",
				onClick: j
			}, {
				default: J(() => [...t[0] ||= [E("Retry", -1)]]),
				_: 1
			}), D(o, {
				variant: "ghost",
				onClick: B
			}, {
				default: J(() => [...t[1] ||= [E("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : d.value ? (F(), S(Mr, {
			key: 2,
			item: d.value,
			"resume-seconds": v.value,
			similar: f.value,
			"similar-loading": h.value,
			onPlay: I,
			onResume: I,
			onWatchlist: R,
			onInfo: z,
			onBack: B
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : C("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]);
//#endregion
//#region src/components/player/format-time.ts
function Rr(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var zr = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], Br = { class: "scrubber__track" }, Vr = ["title"], Hr = { class: "scrubber__time numeric" }, Ur = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let r = e, i = n, a = L(null), o = L(!1), s = L(!1), c = L(0), l = L(0), u = (e) => Math.min(1, Math.max(0, e)), d = b(() => o.value ? c.value : r.duration > 0 ? u(r.position / r.duration) : 0), f = b(() => r.duration > 0 ? u(r.buffered / r.duration) : 0), p = b(() => (o.value || s.value) && r.duration > 0), m = b(() => o.value ? c.value : l.value), h = b(() => m.value * r.duration), _ = b(() => p.value ? r.thumbnailAt?.(h.value) ?? null : null), v = b(() => _.value ? `url("${_.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), y = b(() => `${Math.min(96, Math.max(4, m.value * 100))}%`), x = b(() => r.duration > 0 ? r.chapters.filter((e) => e.start > 0 && e.start < r.duration).map((e) => ({
			...e,
			ratio: e.start / r.duration
		})) : []);
		function S(e) {
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
			let t = S(e);
			c.value = t, i("scrub-start"), i("seek", t * r.duration), e.preventDefault();
		}
		function D(e) {
			let t = S(e);
			l.value = t, o.value && (c.value = t, i("seek", t * r.duration));
		}
		function O(e) {
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
		function N(e) {
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
		}), (t, n) => (F(), w("div", {
			ref_key: "trackEl",
			ref: a,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": H(Rr)(e.position),
			"aria-label": "Seek",
			onPointerdown: E,
			onPointermove: D,
			onPointerup: O,
			onPointercancel: O,
			onPointerenter: k,
			onPointerleave: A,
			onKeydown: N
		}, [T("div", Br, [
			T("div", {
				class: "scrubber__buffered",
				style: M({ width: `${f.value * 100}%` })
			}, null, 4),
			T("div", {
				class: "scrubber__played",
				style: M({ width: `${d.value * 100}%` })
			}, null, 4),
			(F(!0), w(g, null, R(x.value, (e, t) => (F(), w("span", {
				key: t,
				class: "scrubber__tick",
				style: M({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, Vr))), 128)),
			T("div", {
				class: j(["scrubber__head", { "is-dragging": o.value }]),
				style: M({ left: `${d.value * 100}%` })
			}, null, 6)
		]), p.value ? (F(), w("div", {
			key: 0,
			class: "scrubber__preview",
			style: M({ left: y.value }),
			"aria-hidden": "true"
		}, [_.value ? (F(), w("div", {
			key: 0,
			class: "scrubber__thumb",
			style: M({ backgroundImage: v.value })
		}, null, 4)) : C("", !0), T("span", Hr, V(H(Rr)(h.value)), 1)], 4)) : C("", !0)], 40, zr));
	}
}), [["__scopeId", "data-v-b2711211"]]), Wr = [
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
], Gr = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, Kr = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function qr(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function Jr(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function Yr(e, t) {
	switch (e.key) {
		case " ": return qr(e.target) ? !1 : (t.playPause(), !0);
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
function Xr(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || Jr(n.target) || Yr(n, e) && n.preventDefault();
	}
	P(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), N(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Zr = { class: "shortcuts__head" }, Qr = { class: "shortcuts__grid" }, $r = { class: "shortcuts__keys" }, ei = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, ti = {
	key: 1,
	class: "shortcuts__key"
}, ni = { class: "shortcuts__label" }, ri = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => Wr }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = L(null);
		return Me(a, te(n, "open"), {
			lockScroll: !1,
			onEscape: () => (i("close"), !0)
		}), (t, n) => e.open ? (F(), w("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= X((e) => i("close"), ["self"])
		}, [T("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [T("div", Zr, [n[2] ||= T("h3", { class: "shortcuts__title" }, "Keyboard", -1), D(Q, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: n[0] ||= (e) => i("close")
		})]), T("ul", Qr, [(F(!0), w(g, null, R(e.shortcuts, (e) => (F(), w("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [T("span", $r, [(F(!0), w(g, null, R(e.keys, (e, t) => (F(), w(g, { key: t }, [e === "–" ? (F(), w("span", ei, "–")) : (F(), w("kbd", ti, [H(Gr)[e] ? (F(), S(r, {
			key: 0,
			name: H(Gr)[e],
			label: H(Kr)[e] ?? e
		}, null, 8, ["name", "label"])) : (F(), w(g, { key: 1 }, [E(V(e), 1)], 64))]))], 64))), 128))]), T("span", ni, V(e.label), 1)]))), 128))])], 512)])) : C("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), ii = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], ai = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, r = t, i = L(null), a = L(!1), o = b(() => {
			let e = n.max - n.min || 1;
			return Math.min(100, Math.max(0, (n.modelValue - n.min) / e * 100));
		}), s = b(() => n.formatValue ? n.formatValue(n.modelValue) : String(n.modelValue));
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
		return (t, n) => (F(), w("div", {
			class: j(["phlix-slider", { "is-disabled": e.disabled }]),
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
		}, [T("div", {
			ref_key: "trackEl",
			ref: i,
			class: "phlix-slider__track",
			onPointerdown: d,
			onPointermove: f,
			onPointerup: p
		}, [T("div", {
			class: "phlix-slider__fill",
			style: M({ width: o.value + "%" })
		}, null, 4), T("div", {
			class: "phlix-slider__thumb",
			style: M({ left: o.value + "%" })
		}, null, 4)], 544)], 42, ii));
	}
}), [["__scopeId", "data-v-9ca92975"]]), oi = { class: "volume" }, si = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "VolumeControl",
	setup(e) {
		let t = jt(), n = Ge(), r = b(() => t.muted ? 0 : t.volume), i = b(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return K(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (F(), w("div", oi, [D(Q, {
			name: i.value,
			label: H(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => H(t).toggleMute()
		}, null, 8, ["name", "label"]), D(ai, {
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
}), [["__scopeId", "data-v-2768c5e3"]]), ci = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		], n = jt(), r = b(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (F(), S(l, {
			class: "speed-menu",
			"model-value": H(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), li = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = jt(), r = Ge(), i = b(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (F(), S(l, {
			key: 0,
			class: "quality-menu",
			"model-value": H(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"])) : C("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]), ui = ["src", "poster"], di = { class: "player__meta" }, fi = { class: "player__meta-text" }, pi = { class: "player__title" }, mi = { class: "player__sub numeric" }, hi = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, gi = { class: "player__center" }, _i = ["aria-label"], vi = { class: "player__btnrow" }, yi = ["aria-label"], bi = { class: "player__time numeric" }, xi = ["aria-label"], Si = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, i = t, a = jt(), o = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], s = L(null), c = L(null), l = L(!0), u = L(!1), d = L(!1), f = L(!1), p, m = b(() => {
			let e = [];
			n.media.year && e.push({ text: String(n.media.year) }), n.media.rating && e.push({
				text: n.media.rating,
				cert: !0
			}), n.media.runtime && e.push({ text: `${n.media.runtime}m` });
			let t = n.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function h() {
			let e = s.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function _(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function v() {
			a.play();
		}
		function y() {
			a.pause();
		}
		function x() {
			let e = s.value;
			e && a.updateProgress(e.currentTime, e.duration, _(e));
		}
		function S() {
			let e = s.value;
			e && (e.volume = a.volume, e.muted = a.muted, e.playbackRate = a.rate, a.updateProgress(e.currentTime, e.duration, _(e)));
		}
		function O() {
			let e = s.value;
			e && a.updateProgress(e.currentTime, e.duration, _(e));
		}
		function k() {
			let e = s.value;
			e && (Math.abs(e.volume - a.volume) > .001 && a.setVolume(e.volume), e.muted !== a.muted && a.toggleMute());
		}
		function A() {
			let e = s.value;
			e && e.playbackRate !== a.rate && a.setRate(e.playbackRate);
		}
		function M(e) {
			let t = s.value;
			t && a.duration > 0 && (t.currentTime = Math.min(a.duration, Math.max(0, e)));
		}
		function I() {
			d.value = !0, ne();
		}
		function z() {
			d.value = !1, ne();
		}
		function B(e) {
			let t = o.reduce((e, t, n) => Math.abs(t - a.rate) < Math.abs(o[e] - a.rate) ? n : e, 0), n = o[Math.min(o.length - 1, Math.max(0, t + e))];
			a.setRate(n);
		}
		Xr({
			playPause: h,
			seekBy: (e) => M(a.position + e),
			frameStep: (e) => {
				a.playing || M(a.position + e / 30);
			},
			volumeBy: (e) => a.setVolume(a.volume + e),
			toggleMute: ee,
			toggleFullscreen: te,
			toggleCaptions: () => i("captions"),
			toggleTheater: () => i("theater"),
			togglePip: () => i("pip"),
			seekToPercent: (e) => M(e * a.duration),
			speedStep: B,
			toggleHelp: () => {
				f.value = !f.value;
			}
		}, { enabled: () => !f.value });
		function ee() {
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
		function te() {
			if (typeof document > "u") return;
			let e = c.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function U() {
			u.value = typeof document < "u" && !!document.fullscreenElement;
		}
		function W() {
			p &&= (clearTimeout(p), void 0);
		}
		function G() {
			W(), !(!a.playing || d.value) && (p = setTimeout(() => {
				a.playing && !d.value && (l.value = !1);
			}, n.idleTimeout ?? 3e3));
		}
		function ne() {
			l.value = !0, G();
		}
		return K(() => a.playing, (e) => {
			e ? G() : (W(), l.value = !0);
		}), P(() => {
			a.setCurrent(n.media, { resetPosition: !1 }), typeof document < "u" && document.addEventListener("fullscreenchange", U);
		}), K(() => n.media, (e) => a.setCurrent(e, { resetPosition: !1 })), N(() => {
			W(), typeof document < "u" && document.removeEventListener("fullscreenchange", U);
		}), (t, n) => (F(), w("div", {
			ref_key: "containerRef",
			ref: c,
			class: j(["player", { "is-chrome-hidden": !l.value }]),
			onPointermove: ne,
			onPointerdown: ne,
			onFocusin: ne
		}, [
			T("video", {
				ref_key: "videoRef",
				ref: s,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: v,
				onPause: y,
				onTimeupdate: x,
				onLoadedmetadata: S,
				onProgress: O,
				onVolumechange: k,
				onRatechange: A,
				onClick: h
			}, null, 40, ui),
			n[7] ||= T("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[8] ||= T("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			T("div", di, [T("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: n[0] ||= X((e) => i("back"), ["stop"])
			}, [D(r, { name: "arrow-left" })]), T("div", fi, [
				n[4] ||= T("p", { class: "player__eyebrow" }, "Now playing", -1),
				T("h2", pi, V(e.media.name), 1),
				T("div", mi, [(F(!0), w(g, null, R(m.value, (e, t) => (F(), w(g, { key: t }, [t > 0 && !e.cert ? (F(), w("span", hi, "·")) : C("", !0), T("span", { class: j({ player__cert: e.cert }) }, V(e.text), 3)], 64))), 128))])
			])]),
			T("div", gi, [T("button", {
				type: "button",
				class: j(["player__bigplay", { "is-playing": H(a).playing }]),
				"aria-label": H(a).playing ? "Pause" : "Play",
				onClick: X(h, ["stop"])
			}, [D(r, { name: H(a).playing ? "pause" : "play" }, null, 8, ["name"])], 10, _i)]),
			T("div", {
				class: "player__controls",
				onClick: n[2] ||= X(() => {}, ["stop"])
			}, [D(Ur, {
				position: H(a).position,
				duration: H(a).duration,
				buffered: H(a).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: M,
				onScrubStart: I,
				onScrubEnd: z
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), T("div", vi, [
				T("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": H(a).playing ? "Pause" : "Play",
					onClick: h
				}, [D(r, { name: H(a).playing ? "pause" : "play" }, null, 8, ["name"])], 8, yi),
				T("span", bi, [
					E(V(H(Rr)(H(a).position)), 1),
					n[5] ||= T("span", { class: "player__sep" }, " / ", -1),
					E(V(H(Rr)(H(a).duration)), 1)
				]),
				n[6] ||= T("span", { class: "player__grow" }, null, -1),
				D(si),
				D(ci),
				D(li, { qualities: e.qualities }, null, 8, ["qualities"]),
				T("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: n[1] ||= (e) => f.value = !0
				}, [D(r, { name: "info" })]),
				T("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": u.value ? "Exit fullscreen" : "Fullscreen",
					onClick: te
				}, [D(r, { name: u.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, xi)
			])]),
			D(ri, {
				open: f.value,
				onClose: n[3] ||= (e) => f.value = !1
			}, null, 8, ["open"])
		], 34));
	}
}), [["__scopeId", "data-v-a83f0d9d"]]), Ci = { class: "player-page" }, wi = {
	key: 0,
	class: "player-loading"
}, Ti = {
	key: 1,
	class: "player-error"
}, Ei = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "PlayerPage",
	setup(e) {
		let t = k("apiBase", b(() => "")), n = le(), r = L(null), i = L(""), o = L(!0), s = L(null);
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
		return P(c), (e, t) => (F(), w("div", Ci, [o.value ? (F(), w("div", wi, "Loading...")) : s.value ? (F(), w("div", Ti, [T("p", null, V(s.value), 1), T("button", {
			class: "retry-btn",
			onClick: c
		}, "Retry")])) : r.value ? (F(), S(Si, {
			key: 2,
			media: r.value,
			"stream-url": i.value
		}, null, 8, ["media", "stream-url"])) : C("", !0)]));
	}
}), [["__scopeId", "data-v-d9061b47"]]), Di = ae("auth", () => {
	let e = new d(), t = new a({
		tokenStore: e,
		baseUrl: k("apiBase", "")
	}), n = L(null), r = L(!1), i = L(null), o = L(e.getAccessToken()), s = b(() => o.value !== null), c = b(() => n.value?.is_admin === !0);
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
}), Oi = {
	key: 0,
	class: "form-error"
}, ki = { class: "field" }, Ai = { class: "field" }, ji = { class: "password-wrapper" }, Mi = ["type"], Ni = ["disabled"], Pi = { class: "form-footer" }, Fi = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Di(), i = ue(), a = L(""), o = L(""), s = L(!1);
		async function c() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = B("router-link");
			return F(), w("form", {
				class: "login-form",
				onSubmit: X(c, ["prevent"])
			}, [
				t[7] ||= T("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				H(r).error ? (F(), w("div", Oi, V(H(r).error), 1)) : C("", !0),
				T("div", ki, [t[3] ||= T("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Y(T("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[G, a.value]])]),
				T("div", Ai, [t[4] ||= T("label", {
					for: "password",
					class: "label"
				}, "Password", -1), T("div", ji, [Y(T("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: s.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, Mi), [[W, o.value]]), T("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => s.value = !s.value
				}, V(s.value ? "🙈" : "👁"), 1)])]),
				T("button", {
					type: "submit",
					class: "submit-btn",
					disabled: H(r).loading
				}, V(H(r).loading ? "Signing in..." : "Sign in"), 9, Ni),
				T("p", Pi, [t[6] ||= E(" Don't have an account? ", -1), D(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: J(() => [...t[5] ||= [E("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), Ii = { class: "auth-page" }, Li = { class: "auth-card" }, Ri = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (F(), w("div", Ii, [T("div", Li, [D(Fi, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), zi = {
	key: 0,
	class: "form-error"
}, Bi = { class: "field" }, Vi = { class: "field" }, Hi = { class: "field" }, Ui = { class: "password-wrapper" }, Wi = ["type"], Gi = { class: "field" }, Ki = ["type"], qi = ["disabled"], Ji = { class: "form-footer" }, Yi = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Di(), i = ue(), a = L(""), o = L(""), s = L(""), c = L(""), l = L(!1), u = L(null);
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
			let n = B("router-link");
			return F(), w("form", {
				class: "signup-form",
				onSubmit: X(d, ["prevent"])
			}, [
				t[11] ||= T("h2", { class: "form-title" }, "Create your Phlix account", -1),
				H(r).error || u.value ? (F(), w("div", zi, V(H(r).error || u.value), 1)) : C("", !0),
				T("div", Bi, [t[5] ||= T("label", {
					for: "email",
					class: "label"
				}, "Email", -1), Y(T("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[G, a.value]])]),
				T("div", Vi, [t[6] ||= T("label", {
					for: "username",
					class: "label"
				}, "Username", -1), Y(T("input", {
					id: "username",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: "text",
					class: "input",
					placeholder: "Your username",
					required: "",
					autocomplete: "username",
					minlength: "3"
				}, null, 512), [[G, o.value]])]),
				T("div", Hi, [t[7] ||= T("label", {
					for: "password",
					class: "label"
				}, "Password", -1), T("div", Ui, [Y(T("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => s.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, Wi), [[W, s.value]]), T("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => l.value = !l.value
				}, V(l.value ? "🙈" : "👁"), 1)])]),
				T("div", Gi, [t[8] ||= T("label", {
					for: "confirm",
					class: "label"
				}, "Confirm password", -1), Y(T("input", {
					id: "confirm",
					"onUpdate:modelValue": t[4] ||= (e) => c.value = e,
					type: l.value ? "text" : "password",
					class: "input",
					placeholder: "Repeat your password",
					required: "",
					autocomplete: "new-password"
				}, null, 8, Ki), [[W, c.value]])]),
				T("button", {
					type: "submit",
					class: "submit-btn",
					disabled: H(r).loading
				}, V(H(r).loading ? "Creating account..." : "Create account"), 9, qi),
				T("p", Ji, [t[10] ||= E(" Already have an account? ", -1), D(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: J(() => [...t[9] ||= [E("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), Xi = { class: "auth-page" }, Zi = { class: "auth-card" }, Qi = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (F(), w("div", Xi, [T("div", Zi, [D(Yi, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), $i = { class: "settings-form" }, ea = {
	key: 0,
	class: "settings-loading"
}, ta = {
	key: 1,
	class: "settings-error"
}, na = { class: "group-title" }, ra = ["for"], ia = { class: "setting-control" }, aa = [
	"id",
	"checked",
	"onChange"
], oa = [
	"id",
	"value",
	"onChange"
], sa = [
	"id",
	"value",
	"onChange"
], ca = { class: "settings-actions" }, la = {
	key: 0,
	class: "success-msg"
}, ua = ["disabled"], da = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Di(), a = L({}), o = L(!0), s = L(!1), c = L(null), l = L(null), u = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], d = b(() => n.groups ? u.filter((e) => n.groups.includes(e)) : u);
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
		P(f);
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
		}, _ = {
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
		return (e, t) => (F(), w("div", $i, [o.value ? (F(), w("div", ea, "Loading settings...")) : c.value ? (F(), w("div", ta, V(c.value), 1)) : (F(), w(g, { key: 2 }, [(F(!0), w(g, null, R(d.value, (e) => (F(), w("div", {
			key: e,
			class: "settings-group"
		}, [T("h3", na, V(h[e]), 1), (F(), w(g, null, R(_, (t, n) => Y(T("div", {
			key: n,
			class: "setting-row"
		}, [T("label", {
			for: n,
			class: "setting-label"
		}, V(t.label), 9, ra), T("div", ia, [t.type === "bool" ? (F(), w("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!a.value[n],
			onChange: (e) => m(n, e.target.checked)
		}, null, 40, aa)) : t.type === "number" ? (F(), w("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: a.value[n],
			onChange: (e) => m(n, Number(e.target.value))
		}, null, 40, oa)) : (F(), w("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: a.value[n] ?? "",
			onChange: (e) => m(n, e.target.value)
		}, null, 40, sa))])]), [[ne, n.startsWith(e)]])), 64))]))), 128)), T("div", ca, [l.value ? (F(), w("div", la, V(l.value), 1)) : C("", !0), T("button", {
			class: "save-btn",
			disabled: s.value,
			onClick: p
		}, V(s.value ? "Saving..." : "Save settings"), 9, ua)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), fa = { class: "settings-page" }, pa = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (F(), w("div", fa, [t[0] ||= T("div", { class: "settings-header" }, [T("h1", { class: "settings-title" }, "Settings")], -1), D(da)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function ma() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function ha(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: ur
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: Lr
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: Ei
		},
		{
			path: `${t}/login`,
			name: "login",
			component: Ri
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: Qi
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: pa
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: xt,
		props: { appName: e.app }
	}), n;
}
function ga(e) {
	let t = {
		...ma(),
		...e
	};
	ft(t.defaultTheme);
	let n = ie();
	t.defaultTheme && !Ue() && (Ge(n).theme = t.defaultTheme);
	let r = se({
		history: ce(t.routerBase || "/app"),
		routes: ha(t)
	}), i = x(vt);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var _a = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, va = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let t = e, n = L(!1), r = null, i = null, a = () => n.value = !!(r?.matches || i?.matches);
		P(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (r = window.matchMedia("(prefers-reduced-motion: reduce)"), i = window.matchMedia("(prefers-reduced-data: reduce)"), a(), r.addEventListener?.("change", a), i.addEventListener?.("change", a));
		}), N(() => {
			r?.removeEventListener?.("change", a), i?.removeEventListener?.("change", a);
		});
		let o = b(() => t.enabled && !n.value), s = b(() => o.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function c(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let l = b(() => t.ambientImage ? {
			backgroundImage: `url("${c(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), u = b(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, n) => (F(), w(g, null, [
			s.value ? (F(), w("div", {
				key: 0,
				class: j(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: M(l.value),
				"aria-hidden": "true"
			}, null, 6)) : C("", !0),
			o.value && e.vignette ? (F(), w("div", _a)) : C("", !0),
			o.value && e.grain ? (F(), w("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: M(u.value),
				"aria-hidden": "true"
			}, null, 4)) : C("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), ya = ["aria-labelledby"], ba = {
	key: 0,
	class: "phlix-modal__header"
}, xa = ["id"], Sa = { class: "phlix-modal__body" }, Ca = {
	key: 1,
	class: "phlix-modal__footer"
}, wa = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, r = t, i = L(n.modelValue);
		K(() => n.modelValue, (e) => i.value = e);
		let a = L(null), o = U();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return Me(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (F(), S(_, { to: "body" }, [D(v, { name: "phlix-modal" }, {
			default: J(() => [e.modelValue ? (F(), w("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: X(c, ["self"])
			}, [T("div", {
				ref_key: "panelEl",
				ref: a,
				class: j(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? H(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (F(), w("header", ba, [e.title ? (F(), w("h2", {
					key: 0,
					id: H(o),
					class: "phlix-modal__title"
				}, V(e.title), 9, xa)) : C("", !0), e.hideClose ? C("", !0) : (F(), S(Q, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					class: "phlix-modal__close",
					onClick: s
				}))])) : C("", !0),
				T("div", Sa, [z(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (F(), w("footer", Ca, [z(t.$slots, "footer", {}, void 0, !0)])) : C("", !0)
			], 10, ya)], 32)) : C("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-ad69ec41"]]), Ta = ["aria-labelledby"], Ea = {
	key: 0,
	class: "phlix-sheet__header"
}, Da = ["id"], Oa = { class: "phlix-sheet__body" }, ka = {
	key: 1,
	class: "phlix-sheet__footer"
}, Aa = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let n = e, r = t, i = L(n.modelValue);
		K(() => n.modelValue, (e) => i.value = e);
		let a = L(null), o = U();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return Me(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (F(), S(_, { to: "body" }, [D(v, { name: `phlix-sheet-${e.side}` }, {
			default: J(() => [e.modelValue ? (F(), w("div", {
				key: 0,
				class: j(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: X(c, ["self"])
			}, [T("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? H(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (F(), w("header", Ea, [e.title ? (F(), w("h2", {
					key: 0,
					id: H(o),
					class: "phlix-sheet__title"
				}, V(e.title), 9, Da)) : C("", !0), e.hideClose ? C("", !0) : (F(), S(Q, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : C("", !0),
				T("div", Oa, [z(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (F(), w("footer", ka, [z(t.$slots, "footer", {}, void 0, !0)])) : C("", !0)
			], 8, Ta)], 34)) : C("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), ja = ["id"], Ma = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let t = e, n = U(), r = L(!1), i = L(null), a;
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
		return N(() => clearTimeout(a)), (t, a) => (F(), w("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: re(c, ["esc"])
		}, [z(t.$slots, "default", {}, void 0, !0), D(v, { name: "phlix-tooltip" }, {
			default: J(() => [r.value && (e.text || t.$slots.content) ? (F(), w("span", {
				key: 0,
				id: H(n),
				role: "tooltip",
				class: j(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [z(t.$slots, "content", {}, () => [E(V(e.text), 1)], !0)], 10, ja)) : C("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Na = ["role"], Pa = { class: "phlix-toast__content" }, Fa = {
	key: 0,
	class: "phlix-toast__title"
}, Ia = { class: "phlix-toast__message" }, La = ["onClick"], Ra = 0, za = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		return P(() => {
			Ra++;
		}), N(() => {
			Ra--;
		}), (t, i) => (F(), S(_, { to: "body" }, [T("div", {
			class: j(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [D(y, { name: "phlix-toast" }, {
			default: J(() => [(F(!0), w(g, null, R(H(n).toasts, (e) => (F(), w("div", {
				key: e.id,
				class: j(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				D(r, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				T("div", Pa, [e.title ? (F(), w("p", Fa, V(e.title), 1)) : C("", !0), T("p", Ia, V(e.message), 1)]),
				e.action ? (F(), w("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), H(n).dismiss(e.id);
					}
				}, V(e.action.label), 9, La)) : C("", !0),
				D(Q, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => H(n).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, Na))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), Ba = ["aria-label"], Va = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = b(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, i) => (F(), w("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: M(n.value ? { fontSize: n.value } : void 0)
		}, [D(r, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Ba));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Ha = { class: "phlix-tabs" }, Ua = ["aria-label"], Wa = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], Ga = ["id", "aria-labelledby"], Ka = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: n }) {
		let i = t, a = n, o = U(), s = L(null), c = b(() => i.tabs.findIndex((e) => e.value === i.modelValue)), l = (e) => `${o}-tab-${e}`, u = (e) => `${o}-panel-${e}`, d = b(() => i.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function f(e) {
			let t = i.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== i.modelValue && a("update:modelValue", e);
		}
		function p(e) {
			s.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function m(t) {
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
			n >= 0 && (t.preventDefault(), f(i.tabs[n].value), p(n));
		}
		return (e, n) => (F(), w("div", Ha, [T("div", {
			ref_key: "listEl",
			ref: s,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": t.label,
			onKeydown: m
		}, [(F(!0), w(g, null, R(t.tabs, (e) => (F(), w("button", {
			id: l(e.value),
			key: e.value,
			type: "button",
			role: "tab",
			class: j(["phlix-tabs__tab", { "is-active": e.value === t.modelValue }]),
			"aria-selected": e.value === t.modelValue,
			"aria-controls": u(e.value),
			tabindex: e.value === t.modelValue ? 0 : -1,
			disabled: e.disabled,
			onClick: (t) => f(e.value)
		}, [e.icon ? (F(), S(r, {
			key: 0,
			name: e.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : C("", !0), E(" " + V(e.label), 1)], 10, Wa))), 128))], 40, Ua), t.modelValue ? (F(), w("div", {
			key: 0,
			id: u(t.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": l(t.modelValue),
			tabindex: "0"
		}, [z(e.$slots, t.modelValue, {}, () => [z(e.$slots, "default", {}, void 0, !0)], !0)], 8, Ga)) : C("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), qa = /*#__PURE__*/ c(/* @__PURE__ */ O({
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
		let t = e, n = L(null), r = L(!1), i = L(!1), a = null, o = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return P(() => {
			if (o) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), N(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (F(), S(ee(e.tag), {
			ref_key: "el",
			ref: n,
			class: j(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: M({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: J(() => [z(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Ja = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (F(), S(v, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: J(() => [z(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Ya = "__all__", Xa = class {
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
}, Za = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, Qa = { class: "admin-logs__controls" }, $a = { class: "admin-logs__field" }, eo = { class: "admin-logs__field" }, to = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, no = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, ro = 5e3, io = /*@__PURE__*/ O({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let n = [
			200,
			500,
			1e3,
			2e3
		], r = e, i = k("apiBase", ""), s = b(() => typeof i == "string" ? i : i?.value ?? ""), c = new Xa(r.client ?? new a({
			baseUrl: s.value,
			tokenStore: new d()
		})), f = t(), p = L([]), m = L(""), g = L(200), _ = L([]), v = L(!1), y = L(!1), x = L(null), S = null, O = b(() => p.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: Ya,
			label: "All logs (combined)"
		}, ...p.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), j = b(() => n.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function M() {
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
					let t = e === "__all__" ? await c.tailAll(g.value) : await c.tail(e, g.value);
					_.value = t.lines, v.value = t.truncated, A(() => {
						x.value && (x.value.scrollTop = x.value.scrollHeight);
					});
				} catch (e) {
					f.error(e instanceof Error ? e.message : "Failed to read log.");
				} finally {
					y.value = !1;
				}
			}
		}
		function R() {
			S !== null && (clearInterval(S), S = null);
		}
		function z() {
			R(), B.value && m.value !== "" && (S = setInterval(() => void I(), ro));
		}
		let B = L(!1);
		return K([m, g], () => void I()), K([
			B,
			m,
			g
		], z), P(M), N(R), (e, t) => (F(), w("section", Za, [
			t[6] ||= T("header", { class: "admin-logs__head" }, [T("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			T("div", Qa, [
				T("label", $a, [t[3] ||= T("span", { class: "admin-logs__label" }, "File", -1), D(l, {
					modelValue: m.value,
					"onUpdate:modelValue": t[0] ||= (e) => m.value = e,
					options: O.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				T("label", eo, [t[4] ||= T("span", { class: "admin-logs__label" }, "Lines", -1), D(l, {
					"model-value": g.value,
					options: j.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => g.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				D(o, {
					variant: "outline",
					size: "sm",
					loading: y.value,
					disabled: m.value === "",
					onClick: I
				}, {
					default: J(() => [...t[5] ||= [E(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				D(h, {
					modelValue: B.value,
					"onUpdate:modelValue": t[2] ||= (e) => B.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			v.value ? (F(), w("p", to, " Showing the most recent " + V(g.value) + " lines (" + V(m.value === H("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : C("", !0),
			y.value && _.value.length === 0 ? (F(), w("div", no, [D(u, {
				variant: "text",
				lines: 8
			})])) : (F(), w("pre", {
				key: 2,
				ref_key: "preEl",
				ref: x,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, V(_.value.length === 0 ? "(no output)" : _.value.join("\n")), 513))
		]));
	}
}), ao = /* @__PURE__ */ fe({ default: () => oo }), oo = /*#__PURE__*/ c(io, [["__scopeId", "data-v-a9b0d206"]]);
//#endregion
//#region src/api/admin/dashboard.ts
function $(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function so(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function co(e) {
	return Array.isArray(e) ? e : [];
}
function lo(e) {
	return {
		session_id: $(e.session_id ?? e.stream_id),
		user_id: $(e.user_id),
		user_name: $(e.user_name ?? e.username),
		media_item_id: $(e.media_item_id),
		media_title: $(e.media_title),
		media_type: $(e.media_type),
		progress_percent: so(e.progress_percent),
		started_at: $(e.started_at)
	};
}
function uo(e) {
	return {
		user_id: $(e.user_id),
		user_name: $(e.user_name ?? e.username),
		total_watch_time_seconds: so(e.total_watch_time_seconds ?? e.total_watch_time),
		play_count: so(e.play_count),
		last_seen: $(e.last_seen)
	};
}
function fo(e) {
	return {
		media_item_id: $(e.media_item_id),
		media_title: $(e.media_title ?? e.title),
		media_type: $(e.media_type ?? e.type),
		play_count: so(e.play_count),
		total_duration_seconds: so(e.total_duration_seconds ?? e.total_duration),
		last_played_at: $(e.last_played_at)
	};
}
function po(e) {
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
var mo = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getNowPlaying() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/now-playing");
		return co(e).map(lo);
	}
	async getTopUsers(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-users", Object.keys(n).length ? n : void 0);
		return co(r).map(uo);
	}
	async getTopMedia(e, t) {
		let n = {};
		e !== void 0 && (n.limit = String(e)), t !== void 0 && (n.days = String(t));
		let { data: r } = await this.client.get("/api/v1/admin/dashboard/top-media", Object.keys(n).length ? n : void 0);
		return co(r).map(fo);
	}
	async getStorage() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/storage");
		return Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [];
	}
	async getActivity(e) {
		let t = e === void 0 ? void 0 : { limit: String(e) }, { data: n } = await this.client.get("/api/v1/admin/dashboard/activity", t);
		return co(n).map(po);
	}
}, ho = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, go = { class: "admin-dash__head" }, _o = { class: "admin-dash__grid" }, vo = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, yo = { class: "admin-dash__card-head" }, bo = {
	key: 0,
	class: "admin-dash__skel"
}, xo = {
	key: 2,
	class: "admin-dash__np-list",
	role: "list"
}, So = { class: "admin-dash__np-info" }, Co = { class: "admin-dash__np-user" }, wo = ["title"], To = { class: "admin-dash__np-progress" }, Eo = ["aria-valuenow"], Do = { class: "admin-dash__np-pct" }, Oo = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, ko = {
	key: 0,
	class: "admin-dash__skel"
}, Ao = {
	key: 2,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, jo = { class: "admin-dash__rank" }, Mo = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, No = {
	key: 0,
	class: "admin-dash__skel"
}, Po = {
	key: 2,
	class: "admin-dash__media-list",
	role: "list"
}, Fo = { class: "admin-dash__media-rank" }, Io = { class: "admin-dash__media-info" }, Lo = ["title"], Ro = { class: "admin-dash__media-stats" }, zo = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, Bo = {
	key: 0,
	class: "admin-dash__skel"
}, Vo = { class: "admin-dash__storage-grid" }, Ho = { class: "admin-dash__storage-count" }, Uo = { class: "admin-dash__storage-size" }, Wo = {
	key: 0,
	class: "admin-dash__storage-note"
}, Go = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, Ko = {
	key: 0,
	class: "admin-dash__skel"
}, qo = {
	key: 2,
	class: "admin-dash__activity"
}, Jo = {
	class: "admin-dash__activity-list",
	role: "list"
}, Yo = { class: "admin-dash__activity-user" }, Xo = ["title"], Zo = ["datetime", "title"], Qo = 20, $o = 3e4, es = /*@__PURE__*/ O({
	__name: "DashboardPage",
	props: { client: {} },
	setup(e) {
		let n = e, r = k("apiBase", ""), i = b(() => typeof r == "string" ? r : r?.value ?? ""), s = new mo(n.client ?? new a({
			baseUrl: i.value,
			tokenStore: new d()
		})), c = t();
		function f(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function h(e) {
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
		function _(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		function v(e) {
			switch ((e ?? "").toLowerCase()) {
				case "movie": return "accent";
				case "series": return "success";
				case "photo": return "warning";
				case "audiobook": return "info";
				default: return "neutral";
			}
		}
		function y(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let x = [
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
		], O = L(30), A = L([]), j = L([]), I = L([]), z = L([]), B = L([]), ee = L(!0), te = L(!0), H = L(!0), U = L(!0), W = L(!0), G = L(!1), ne = L(!0), q = b(() => z.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function Y() {
			try {
				A.value = await s.getNowPlaying();
			} catch {
				c.error("Failed to load now playing.");
			} finally {
				ee.value = !1;
			}
		}
		async function re(e) {
			te.value = !0;
			try {
				j.value = await s.getTopUsers(10, e);
			} catch {
				c.error("Failed to load top users.");
			} finally {
				te.value = !1;
			}
		}
		async function X(e) {
			H.value = !0;
			try {
				I.value = await s.getTopMedia(10, e);
			} catch {
				c.error("Failed to load top media.");
			} finally {
				H.value = !1;
			}
		}
		async function ie() {
			try {
				z.value = await s.getStorage();
			} catch {
				c.error("Failed to load storage.");
			} finally {
				U.value = !1;
			}
		}
		async function ae(e, t = !1) {
			t ? G.value = !0 : W.value = !0;
			try {
				let n = await s.getActivity(e);
				t ? B.value = [...B.value, ...n] : B.value = n, ne.value = n.length === Qo;
			} catch {
				c.error("Failed to load activity.");
			} finally {
				W.value = !1, G.value = !1;
			}
		}
		function oe() {
			ae(B.value.length + Qo, !0);
		}
		let Z = null;
		return K(O, (e) => {
			re(e), X(e);
		}), P(() => {
			Y(), ie(), ae(Qo), re(O.value), X(O.value), Z = setInterval(() => {
				s.getNowPlaying().then((e) => {
					A.value = e;
				}).catch(() => {});
			}, $o);
		}), N(() => {
			Z !== null && (clearInterval(Z), Z = null);
		}), (e, t) => (F(), w("section", ho, [T("header", go, [t[1] ||= T("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), D(l, {
			"model-value": O.value,
			options: x,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => O.value = Number(e)
		}, null, 8, ["model-value"])]), T("div", _o, [
			T("section", vo, [T("header", yo, [t[2] ||= T("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), A.value.length > 0 ? (F(), S(m, {
				key: 0,
				tone: "accent",
				label: `${A.value.length} active sessions`
			}, {
				default: J(() => [E(V(A.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : C("", !0)]), ee.value ? (F(), w("div", bo, [D(u, {
				variant: "text",
				lines: 4
			})])) : A.value.length === 0 ? (F(), S(p, {
				key: 1,
				icon: "play",
				title: "No active sessions"
			})) : (F(), w("ul", xo, [(F(!0), w(g, null, R(A.value, (e) => (F(), w("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [T("div", So, [
				T("span", Co, V(e.user_name), 1),
				T("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, V(e.media_title), 9, wo),
				D(m, { tone: v(e.media_type) }, {
					default: J(() => [E(V(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), T("div", To, [T("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [T("div", {
				class: "admin-dash__bar-fill",
				style: M({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, Eo), T("span", Do, V(e.progress_percent) + "%", 1)])]))), 128))]))]),
			T("section", Oo, [t[4] ||= T("header", { class: "admin-dash__card-head" }, [T("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), te.value ? (F(), w("div", ko, [D(u, {
				variant: "text",
				lines: 4
			})])) : j.value.length === 0 ? (F(), S(p, {
				key: 1,
				icon: "user",
				title: "No user data yet"
			})) : (F(), w("table", Ao, [t[3] ||= T("thead", null, [T("tr", null, [
				T("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				T("th", { scope: "col" }, "User"),
				T("th", { scope: "col" }, "Watch Time"),
				T("th", { scope: "col" }, "Plays")
			])], -1), T("tbody", null, [(F(!0), w(g, null, R(j.value, (e, t) => (F(), w("tr", { key: e.user_id }, [
				T("td", jo, V(t + 1), 1),
				T("td", null, V(e.user_name), 1),
				T("td", null, V(f(e.total_watch_time_seconds)), 1),
				T("td", null, V(e.play_count), 1)
			]))), 128))])]))]),
			T("section", Mo, [t[5] ||= T("header", { class: "admin-dash__card-head" }, [T("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), H.value ? (F(), w("div", No, [D(u, {
				variant: "text",
				lines: 4
			})])) : I.value.length === 0 ? (F(), S(p, {
				key: 1,
				icon: "film",
				title: "No media data yet"
			})) : (F(), w("ol", Po, [(F(!0), w(g, null, R(I.value, (e, t) => (F(), w("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				T("span", Fo, V(t + 1), 1),
				T("div", Io, [T("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, V(e.media_title), 9, Lo), D(m, { tone: v(e.media_type) }, {
					default: J(() => [E(V(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				T("div", Ro, [T("span", null, V(e.play_count) + " plays", 1), T("span", null, V(f(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			T("section", zo, [t[6] ||= T("header", { class: "admin-dash__card-head" }, [T("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), U.value ? (F(), w("div", Bo, [D(u, {
				variant: "text",
				lines: 3
			})])) : z.value.length === 0 ? (F(), S(p, {
				key: 1,
				icon: "image",
				title: "No storage data"
			})) : (F(), w(g, { key: 2 }, [T("div", Vo, [(F(!0), w(g, null, R(z.value, (e) => (F(), w("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				D(m, { tone: v(e.media_type) }, {
					default: J(() => [E(V(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				T("div", Ho, V(e.item_count.toLocaleString()) + " items", 1),
				T("div", Uo, V(h(e.total_bytes)), 1)
			]))), 128))]), q.value > 0 ? (F(), w("p", Wo, " Transcode cache: " + V(h(q.value)), 1)) : C("", !0)], 64))]),
			T("section", Go, [t[8] ||= T("header", { class: "admin-dash__card-head" }, [T("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), W.value ? (F(), w("div", Ko, [D(u, {
				variant: "text",
				lines: 5
			})])) : B.value.length === 0 ? (F(), S(p, {
				key: 1,
				icon: "list",
				title: "No recent activity"
			})) : (F(), w("div", qo, [T("ul", Jo, [(F(!0), w(g, null, R(B.value, (e) => (F(), w("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				D(m, { tone: y(e.event_type) }, {
					default: J(() => [E(V(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				T("span", Yo, V(e.user_name), 1),
				T("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, V(e.media_title), 9, Xo),
				T("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, V(_(e.created_at)), 9, Zo)
			]))), 128))]), ne.value ? (F(), S(o, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: G.value,
				onClick: oe
			}, {
				default: J(() => [...t[7] ||= [E(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : C("", !0)]))])
		])]));
	}
}), ts = /* @__PURE__ */ fe({ default: () => ns }), ns = /*#__PURE__*/ c(es, [["__scopeId", "data-v-71c5a6ca"]]), rs = {
	0: "G — General Audiences",
	1: "PG — Parental Guidance",
	2: "PG-13 — Parents Strongly Cautioned",
	3: "R — Restricted",
	4: "NC-17 — No One 17 & Under",
	5: "X — Adult",
	6: "UNRATED — Unrated Content"
}, is = Object.entries(rs).map(([e, t]) => ({
	value: Number(e),
	label: t
})), as = class {
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
}, os = {
	class: "admin-users",
	"aria-labelledby": "users-heading"
}, ss = { class: "admin-users__head" }, cs = {
	key: 0,
	class: "admin-users__skel"
}, ls = {
	key: 2,
	class: "admin-users__table",
	"aria-label": "Users"
}, us = { class: "admin-users__date" }, ds = { class: "admin-users__actions" }, fs = { class: "admin-users__field" }, ps = { class: "admin-users__field" }, ms = { class: "admin-users__field" }, hs = { class: "admin-users__label" }, gs = ["placeholder", "required"], _s = { key: 0 }, vs = { class: "admin-users__field" }, ys = { class: "admin-users__password-row" }, bs = ["value"], xs = {
	key: 1,
	role: "status",
	"aria-live": "polite"
}, Ss = {
	key: 0,
	class: "admin-users__skel"
}, Cs = { class: "admin-users__profiles-toolbar" }, ws = {
	key: 1,
	class: "admin-users__table",
	"aria-label": "Profiles"
}, Ts = { class: "admin-users__actions" }, Es = {
	key: 2,
	class: "admin-users__subform"
}, Ds = { class: "admin-users__subform-title" }, Os = { class: "admin-users__field" }, ks = { class: "admin-users__field" }, As = { class: "admin-users__subform-actions" }, js = {
	key: 3,
	class: "admin-users__subform"
}, Ms = { class: "admin-users__subform-actions" }, Ns = {
	key: 4,
	class: "admin-users__subform"
}, Ps = { class: "admin-users__subform-title" }, Fs = { class: "admin-users__field" }, Is = { class: "admin-users__subform-actions" }, Ls = 5, Rs = /*@__PURE__*/ O({
	__name: "UsersPage",
	props: { client: {} },
	setup(e) {
		let n = e, r = k("apiBase", ""), i = b(() => typeof r == "string" ? r : r?.value ?? ""), s = new as(n.client ?? new a({
			baseUrl: i.value,
			tokenStore: new d()
		})), c = t();
		function f(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let _ = b(() => is.map((e) => ({
			value: e.value,
			label: e.label
		}))), v = L([]), y = L(!0);
		async function x() {
			y.value = !0;
			try {
				v.value = await s.list();
			} catch (e) {
				c.error(f(e, "Failed to load users."));
			} finally {
				y.value = !1;
			}
		}
		let O = L(!1), A = L(null), j = L(""), M = L(""), N = L(""), I = L(!1), z = L(!1), B = b(() => A.value ? `Edit user — ${A.value.username}` : "Add user");
		function ee() {
			A.value = null, j.value = "", M.value = "", N.value = "", I.value = !1, O.value = !0;
		}
		function te(e) {
			A.value = e, j.value = e.username, M.value = e.email, N.value = "", I.value = e.is_admin === 1, O.value = !0;
		}
		function H() {
			O.value = !1, A.value = null;
		}
		async function U() {
			if (!j.value.trim() || !M.value.trim()) {
				c.error("Username and email are required.");
				return;
			}
			let e = A.value;
			if (!e && !N.value) {
				c.error("Password is required for new users.");
				return;
			}
			if (!e && N.value.length < 8) {
				c.error("Password must be at least 8 characters.");
				return;
			}
			z.value = !0;
			try {
				if (e) {
					let t = {
						username: j.value,
						email: M.value
					};
					N.value && (t.password = N.value), await s.update(e.id, t);
					let n = +!!I.value;
					e.is_admin !== n && await s.setAdmin(e.id, I.value), c.success("User updated.");
				} else {
					let e = {
						username: j.value,
						email: M.value,
						password: N.value,
						is_admin: I.value
					};
					await s.create(e), c.success("User created.");
				}
				H(), await x();
			} catch (e) {
				c.error(f(e, "Failed to save user."));
			} finally {
				z.value = !1;
			}
		}
		let W = L(null);
		async function ne() {
			let e = W.value;
			if (e) try {
				await s.remove(e.id), c.success("User deleted."), W.value = null, await x();
			} catch (e) {
				c.error(f(e, "Failed to delete user.")), W.value = null;
			}
		}
		async function K(e, t) {
			try {
				await s.setAdmin(e.id, t), c.success(t ? "User promoted to admin." : "Admin status removed."), await x();
			} catch (e) {
				c.error(f(e, "Failed to update admin status."));
			}
		}
		let q = L(null), re = L(null);
		async function ie(e) {
			q.value = e, re.value = null;
			try {
				re.value = await s.resetPassword(e.id);
			} catch (e) {
				c.error(f(e, "Failed to reset password.")), q.value = null;
			}
		}
		function ae() {
			q.value = null, re.value = null;
		}
		async function oe() {
			let e = re.value;
			if (e) try {
				await navigator.clipboard.writeText(e.new_password), c.success("Password copied to clipboard.");
			} catch {
				c.error("Could not copy to clipboard.");
			}
		}
		let Z = L(null), se = L([]), ce = L(!1), le = b(() => Z.value ? `Profiles — ${Z.value.username}` : "Profiles"), ue = b({
			get: () => Z.value !== null,
			set: (e) => {
				e || me();
			}
		}), de = b(() => se.value.length >= Ls);
		async function fe(e) {
			ce.value = !0;
			try {
				se.value = await s.listProfiles(e);
			} catch (e) {
				c.error(f(e, "Failed to load profiles."));
			} finally {
				ce.value = !1;
			}
		}
		async function pe(e) {
			Z.value = e, await fe(e.id);
		}
		function me() {
			Z.value = null, se.value = [], Se(), Q.value = null, ke();
		}
		let he = L(!1), ge = L(null), _e = L(""), ve = L(0), ye = L(!1);
		function be() {
			ge.value = null, _e.value = "", ve.value = 0, he.value = !0;
		}
		function xe(e) {
			ge.value = e, _e.value = e.name, ve.value = e.rating, he.value = !0;
		}
		function Se() {
			he.value = !1, ge.value = null, _e.value = "", ve.value = 0;
		}
		async function Ce() {
			let e = Z.value;
			if (e) {
				if (!_e.value.trim()) {
					c.error("Profile name is required.");
					return;
				}
				ye.value = !0;
				try {
					if (ge.value) {
						let e = {
							name: _e.value,
							rating: ve.value
						};
						await s.updateProfile(ge.value.id, e), c.success("Profile updated.");
					} else {
						if (de.value) {
							c.error("Maximum 5 profiles allowed.");
							return;
						}
						let t = {
							name: _e.value,
							rating: ve.value
						};
						await s.createProfile(e.id, t), c.success("Profile created.");
					}
					Se(), await fe(e.id);
				} catch (e) {
					c.error(f(e, "Failed to save profile."));
				} finally {
					ye.value = !1;
				}
			}
		}
		let Q = L(null);
		async function we() {
			let e = Z.value, t = Q.value;
			if (!(!e || !t)) try {
				await s.removeProfile(t.id), c.success("Profile deleted."), Q.value = null, await fe(e.id);
			} catch (e) {
				c.error(f(e, "Failed to delete profile.")), Q.value = null;
			}
		}
		let Te = L(null), Ee = L(""), De = L(!1);
		function Oe(e) {
			Te.value = e, Ee.value = "";
		}
		function ke() {
			Te.value = null, Ee.value = "";
		}
		async function Ae() {
			let e = Z.value, t = Te.value;
			if (!(!e || !t)) {
				if (!/^\d{4}$/.test(Ee.value) && !/^\d{6}$/.test(Ee.value)) {
					c.error("PIN must be 4 or 6 digits.");
					return;
				}
				De.value = !0;
				try {
					await s.setPin(t.id, Ee.value), c.success("PIN set."), ke(), await fe(e.id);
				} catch (e) {
					c.error(f(e, "Failed to set PIN."));
				} finally {
					De.value = !1;
				}
			}
		}
		async function je(e) {
			let t = Z.value;
			if (t) try {
				await s.clearPin(e.id), c.success("PIN cleared."), await fe(t.id);
			} catch (e) {
				c.error(f(e, "Failed to clear PIN."));
			}
		}
		function Me(e) {
			return rs[e] ?? rs[6];
		}
		return P(x), (e, t) => (F(), w("section", os, [
			T("header", ss, [t[13] ||= T("h1", {
				id: "users-heading",
				class: "admin-users__title"
			}, "Users", -1), D(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: ee
			}, {
				default: J(() => [...t[12] ||= [E("Add user", -1)]]),
				_: 1
			})]),
			y.value ? (F(), w("div", cs, [D(u, {
				variant: "text",
				lines: 6
			})])) : v.value.length === 0 ? (F(), S(p, {
				key: 1,
				icon: "user",
				title: "No users yet"
			}, {
				actions: J(() => [D(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: ee
				}, {
					default: J(() => [...t[14] ||= [E("Add user", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (F(), w("table", ls, [t[19] ||= T("thead", null, [T("tr", null, [
				T("th", { scope: "col" }, "Username"),
				T("th", { scope: "col" }, "Email"),
				T("th", { scope: "col" }, "Role"),
				T("th", { scope: "col" }, "Created"),
				T("th", {
					scope: "col",
					class: "admin-users__actions-col"
				}, "Actions")
			])], -1), T("tbody", null, [(F(!0), w(g, null, R(v.value, (e) => (F(), w("tr", { key: e.id }, [
				T("td", null, V(e.username), 1),
				T("td", null, V(e.email), 1),
				T("td", null, [D(m, { tone: e.is_admin ? "accent" : "neutral" }, {
					default: J(() => [E(V(e.is_admin ? "Admin" : "User"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				T("td", us, V(e.created_at.slice(0, 10)), 1),
				T("td", null, [T("div", ds, [
					D(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.username}`,
						onClick: (t) => te(e)
					}, {
						default: J(() => [...t[15] ||= [E(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					D(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `${e.is_admin ? "Demote" : "Promote"} ${e.username}`,
						onClick: (t) => K(e, e.is_admin !== 1)
					}, {
						default: J(() => [E(V(e.is_admin ? "Demote" : "Set Admin"), 1)]),
						_: 2
					}, 1032, ["aria-label", "onClick"]),
					D(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Reset password for ${e.username}`,
						onClick: (t) => ie(e)
					}, {
						default: J(() => [...t[16] ||= [E(" Reset Password ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					D(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Manage profiles for ${e.username}`,
						onClick: (t) => pe(e)
					}, {
						default: J(() => [...t[17] ||= [E(" Profiles ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					D(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.username}`,
						onClick: (t) => W.value = e
					}, {
						default: J(() => [...t[18] ||= [E(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			D(wa, {
				modelValue: O.value,
				"onUpdate:modelValue": t[4] ||= (e) => O.value = e,
				title: B.value,
				onClose: H
			}, {
				footer: J(() => [D(o, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: J(() => [...t[22] ||= [E("Cancel", -1)]]),
					_: 1
				}), D(o, {
					variant: "solid",
					size: "sm",
					loading: z.value,
					onClick: U
				}, {
					default: J(() => [E(V(A.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: J(() => [T("form", {
					class: "admin-users__form",
					onSubmit: X(U, ["prevent"])
				}, [
					T("label", fs, [t[20] ||= T("span", { class: "admin-users__label" }, "Username", -1), Y(T("input", {
						"onUpdate:modelValue": t[0] ||= (e) => j.value = e,
						type: "text",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[G, j.value]])]),
					T("label", ps, [t[21] ||= T("span", { class: "admin-users__label" }, "Email", -1), Y(T("input", {
						"onUpdate:modelValue": t[1] ||= (e) => M.value = e,
						type: "email",
						class: "admin-users__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[G, M.value]])]),
					T("label", ms, [T("span", hs, V(A.value ? "Password (leave blank to keep current)" : "Password"), 1), Y(T("input", {
						"onUpdate:modelValue": t[2] ||= (e) => N.value = e,
						type: "password",
						class: "admin-users__input",
						autocomplete: "new-password",
						placeholder: A.value ? "(unchanged)" : void 0,
						required: !A.value
					}, null, 8, gs), [[G, N.value]])]),
					D(h, {
						modelValue: I.value,
						"onUpdate:modelValue": t[3] ||= (e) => I.value = e,
						label: "Admin"
					}, null, 8, ["modelValue"])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			D(wa, {
				"model-value": W.value !== null,
				title: "Delete user",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => W.value = null
			}, {
				footer: J(() => [D(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => W.value = null
				}, {
					default: J(() => [...t[25] ||= [E("Cancel", -1)]]),
					_: 1
				}), D(o, {
					variant: "solid",
					size: "sm",
					onClick: ne
				}, {
					default: J(() => [...t[26] ||= [E("Delete", -1)]]),
					_: 1
				})]),
				default: J(() => [T("p", null, [
					t[23] ||= E(" Delete user ", -1),
					T("strong", null, V(W.value?.username), 1),
					t[24] ||= E("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			D(wa, {
				"model-value": q.value !== null,
				title: q.value ? `Reset password — ${q.value.username}` : "Reset password",
				"onUpdate:modelValue": ae
			}, {
				footer: J(() => [D(o, {
					variant: "solid",
					size: "sm",
					onClick: ae
				}, {
					default: J(() => [...t[31] ||= [E("Close", -1)]]),
					_: 1
				})]),
				default: J(() => [re.value ? (F(), w("div", _s, [T("p", null, V(re.value.message), 1), T("label", vs, [t[28] ||= T("span", { class: "admin-users__label" }, "New password", -1), T("div", ys, [T("input", {
					value: re.value.new_password,
					type: "text",
					class: "admin-users__input",
					readonly: "",
					"aria-readonly": "true"
				}, null, 8, bs), D(o, {
					variant: "outline",
					size: "sm",
					onClick: oe
				}, {
					default: J(() => [...t[27] ||= [E("Copy", -1)]]),
					_: 1
				})])])])) : (F(), w("p", xs, [
					t[29] ||= E(" Resetting password for ", -1),
					T("strong", null, V(q.value?.username), 1),
					t[30] ||= E("… ", -1)
				]))]),
				_: 1
			}, 8, ["model-value", "title"]),
			D(wa, {
				modelValue: ue.value,
				"onUpdate:modelValue": t[11] ||= (e) => ue.value = e,
				title: le.value,
				size: "lg"
			}, {
				default: J(() => [ce.value ? (F(), w("div", Ss, [D(u, {
					variant: "text",
					lines: 4
				})])) : (F(), w(g, { key: 1 }, [
					T("div", Cs, [D(o, {
						variant: "outline",
						size: "sm",
						"left-icon": "plus",
						disabled: de.value,
						"aria-label": "Add profile",
						onClick: be
					}, {
						default: J(() => [E(" Add profile" + V(de.value ? " (max 5)" : ""), 1)]),
						_: 1
					}, 8, ["disabled"])]),
					se.value.length === 0 ? (F(), S(p, {
						key: 0,
						icon: "user",
						title: "No profiles yet"
					})) : (F(), w("table", ws, [t[36] ||= T("thead", null, [T("tr", null, [
						T("th", { scope: "col" }, "Name"),
						T("th", { scope: "col" }, "Rating"),
						T("th", { scope: "col" }, "PIN"),
						T("th", {
							scope: "col",
							class: "admin-users__actions-col"
						}, "Actions")
					])], -1), T("tbody", null, [(F(!0), w(g, null, R(se.value, (e) => (F(), w("tr", { key: e.id }, [
						T("td", null, V(e.name), 1),
						T("td", null, [D(m, { tone: "info" }, {
							default: J(() => [E(V(Me(e.rating)), 1)]),
							_: 2
						}, 1024)]),
						T("td", null, [D(m, { tone: e.pin_hash === null ? "neutral" : "success" }, {
							default: J(() => [E(V(e.pin_hash === null ? "No PIN" : "Has PIN"), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						T("td", null, [T("div", Ts, [
							D(o, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Edit profile ${e.name}`,
								onClick: (t) => xe(e)
							}, {
								default: J(() => [...t[32] ||= [E(" Edit ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							D(o, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Set PIN for ${e.name}`,
								onClick: (t) => Oe(e)
							}, {
								default: J(() => [...t[33] ||= [E(" Set PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"]),
							e.pin_hash === null ? C("", !0) : (F(), S(o, {
								key: 0,
								variant: "ghost",
								size: "sm",
								"aria-label": `Clear PIN for ${e.name}`,
								onClick: (t) => je(e)
							}, {
								default: J(() => [...t[34] ||= [E(" Clear PIN ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])),
							D(o, {
								variant: "ghost",
								size: "sm",
								"aria-label": `Delete profile ${e.name}`,
								onClick: (t) => Q.value = e
							}, {
								default: J(() => [...t[35] ||= [E(" Delete ", -1)]]),
								_: 1
							}, 8, ["aria-label", "onClick"])
						])])
					]))), 128))])])),
					he.value ? (F(), w("div", Es, [T("h3", Ds, V(ge.value ? "Edit profile" : "Add profile"), 1), T("form", {
						class: "admin-users__form",
						onSubmit: X(Ce, ["prevent"])
					}, [
						T("label", Os, [t[37] ||= T("span", { class: "admin-users__label" }, "Name", -1), Y(T("input", {
							"onUpdate:modelValue": t[7] ||= (e) => _e.value = e,
							type: "text",
							class: "admin-users__input",
							autocomplete: "off",
							required: ""
						}, null, 512), [[G, _e.value]])]),
						T("label", ks, [t[38] ||= T("span", { class: "admin-users__label" }, "Rating", -1), D(l, {
							"model-value": ve.value,
							options: _.value,
							label: "Rating",
							"onUpdate:modelValue": t[8] ||= (e) => ve.value = Number(e)
						}, null, 8, ["model-value", "options"])]),
						T("div", As, [D(o, {
							variant: "ghost",
							size: "sm",
							onClick: Se
						}, {
							default: J(() => [...t[39] ||= [E("Cancel", -1)]]),
							_: 1
						}), D(o, {
							variant: "solid",
							size: "sm",
							loading: ye.value,
							onClick: Ce
						}, {
							default: J(() => [E(V(ge.value ? "Save" : "Create"), 1)]),
							_: 1
						}, 8, ["loading"])])
					], 32)])) : C("", !0),
					Q.value ? (F(), w("div", js, [T("p", null, [
						t[40] ||= E(" Delete profile ", -1),
						T("strong", null, V(Q.value.name), 1),
						t[41] ||= E("? This cannot be undone. ", -1)
					]), T("div", Ms, [D(o, {
						variant: "ghost",
						size: "sm",
						onClick: t[9] ||= (e) => Q.value = null
					}, {
						default: J(() => [...t[42] ||= [E("Cancel", -1)]]),
						_: 1
					}), D(o, {
						variant: "solid",
						size: "sm",
						onClick: we
					}, {
						default: J(() => [...t[43] ||= [E("Delete", -1)]]),
						_: 1
					})])])) : C("", !0),
					Te.value ? (F(), w("div", Ns, [T("h3", Ps, "Set PIN — " + V(Te.value.name), 1), T("form", {
						class: "admin-users__form",
						onSubmit: X(Ae, ["prevent"])
					}, [T("label", Fs, [t[44] ||= T("span", { class: "admin-users__label" }, "PIN (4 or 6 digits)", -1), Y(T("input", {
						"onUpdate:modelValue": t[10] ||= (e) => Ee.value = e,
						type: "password",
						class: "admin-users__input",
						inputmode: "numeric",
						autocomplete: "off",
						placeholder: "1234 or 123456",
						required: ""
					}, null, 512), [[G, Ee.value]])]), T("div", Is, [D(o, {
						variant: "ghost",
						size: "sm",
						onClick: ke
					}, {
						default: J(() => [...t[45] ||= [E("Cancel", -1)]]),
						_: 1
					}), D(o, {
						variant: "solid",
						size: "sm",
						loading: De.value,
						onClick: Ae
					}, {
						default: J(() => [...t[46] ||= [E("Set PIN", -1)]]),
						_: 1
					}, 8, ["loading"])])], 32)])) : C("", !0)
				], 64))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), zs = /* @__PURE__ */ fe({ default: () => Bs }), Bs = /*#__PURE__*/ c(Rs, [["__scopeId", "data-v-4c2f9520"]]);
//#endregion
//#region src/app/admin.ts
function Vs(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => Promise.resolve().then(() => ts)
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => Promise.resolve().then(() => zs)
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => Promise.resolve().then(() => ao)
		}
	];
}
function Hs(e = "/app") {
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
			}
		]
	}];
}
//#endregion
//#region src/pages/LibraryScanPage.vue?vue&type=script&setup=true&lang.ts
var Us = { class: "library-scan-page" }, Ws = {
	key: 0,
	class: "loading"
}, Gs = {
	key: 1,
	class: "error"
}, Ks = {
	key: 2,
	class: "libraries-list"
}, qs = { class: "library-info" }, Js = { class: "library-name" }, Ys = { class: "library-type" }, Xs = { class: "library-paths" }, Zs = { class: "library-meta" }, Qs = { key: 0 }, $s = {
	key: 0,
	class: "scan-status"
}, ec = { class: "library-actions" }, tc = ["onClick", "disabled"], nc = ["onClick", "disabled"], rc = {
	key: 0,
	class: "empty-state"
}, ic = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "LibraryScanPage",
	setup(e) {
		let t = L([]), r = L({}), i = L(!0), a = L(null);
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
		return P(() => {
			o();
		}), (e, n) => (F(), w("div", Us, [n[0] ||= T("div", { class: "scan-header" }, [T("h1", { class: "scan-title" }, "Library Scanner"), T("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), i.value ? (F(), w("div", Ws, "Loading libraries...")) : a.value ? (F(), w("div", Gs, V(a.value), 1)) : (F(), w("div", Ks, [(F(!0), w(g, null, R(t.value, (e) => (F(), w("div", {
			key: e.id,
			class: "library-card"
		}, [T("div", qs, [
			T("h3", Js, V(e.name), 1),
			T("span", Ys, V(e.type), 1),
			T("p", Xs, V(e.paths.join(", ")), 1),
			T("div", Zs, [e.item_count === void 0 ? C("", !0) : (F(), w("span", Qs, V(e.item_count) + " items", 1)), T("span", null, "Last scan: " + V(u(e.last_scan_at)), 1)]),
			r.value[e.id] ? (F(), w("div", $s, V(d(r.value[e.id])), 1)) : C("", !0)
		]), T("div", ec, [T("button", {
			class: "btn btn-scan",
			onClick: (t) => c(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Scan ", 8, tc), T("button", {
			class: "btn btn-rescan",
			onClick: (t) => l(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Rescan ", 8, nc)])]))), 128)), t.value.length === 0 ? (F(), w("div", rc, " No libraries configured. Add a library to get started. ")) : C("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), ac = { class: "my-servers-page" }, oc = {
	key: 0,
	class: "loading"
}, sc = {
	key: 1,
	class: "error"
}, cc = {
	key: 2,
	class: "servers-list"
}, lc = { class: "server-info" }, uc = { class: "server-name" }, dc = { class: "server-url" }, fc = { class: "server-meta" }, pc = { key: 0 }, mc = {
	key: 0,
	class: "empty-state"
}, hc = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "MyServersPage",
	setup(e) {
		let t = L([]), r = L(!0), i = L(null);
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
		return P(() => {
			a();
		}), (e, n) => (F(), w("div", ac, [n[2] ||= T("div", { class: "page-header" }, [T("h1", { class: "page-title" }, "My Servers"), T("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), r.value ? (F(), w("div", oc, "Loading servers...")) : i.value ? (F(), w("div", sc, V(i.value), 1)) : (F(), w("div", cc, [(F(!0), w(g, null, R(t.value, (e) => (F(), w("div", {
			key: e.id,
			class: "server-card"
		}, [
			T("div", {
				class: "server-status",
				style: M({ backgroundColor: o(e.status) })
			}, null, 4),
			T("div", lc, [
				T("h3", uc, V(e.name), 1),
				T("p", dc, V(e.url), 1),
				T("div", fc, [
					T("span", null, V(e.owner), 1),
					e.library_count === void 0 ? C("", !0) : (F(), w("span", pc, V(e.library_count) + " libraries", 1)),
					T("span", null, "Last seen: " + V(s(e.last_seen)), 1)
				])
			]),
			n[0] ||= T("div", { class: "server-actions" }, [T("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), t.value.length === 0 ? (F(), w("div", mc, [...n[1] ||= [T("p", null, "No servers connected yet.", -1), T("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : C("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), gc = { class: "federation-page" }, _c = {
	key: 0,
	class: "loading"
}, vc = {
	key: 1,
	class: "error"
}, yc = {
	key: 2,
	class: "federation-content"
}, bc = { class: "peers-section" }, xc = { class: "peers-list" }, Sc = { class: "peer-info" }, Cc = { class: "peer-name" }, wc = { class: "peer-url" }, Tc = { class: "peer-meta" }, Ec = { key: 0 }, Dc = { class: "peer-actions" }, Oc = ["onClick"], kc = {
	key: 1,
	class: "status-badge"
}, Ac = {
	key: 0,
	class: "empty-state"
}, jc = { class: "add-peer-section" }, Mc = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "FederationPage",
	setup(e) {
		let t = L([]), r = L(!0), i = L(null);
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
		return P(() => {
			a();
		}), (e, n) => (F(), w("div", gc, [n[5] ||= T("div", { class: "page-header" }, [T("h1", { class: "page-title" }, "Federation"), T("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), r.value ? (F(), w("div", _c, "Loading federation peers...")) : i.value ? (F(), w("div", vc, V(i.value), 1)) : (F(), w("div", yc, [T("div", bc, [n[2] ||= T("h2", { class: "section-title" }, "Connected Peers", -1), T("div", xc, [(F(!0), w(g, null, R(t.value, (e) => (F(), w("div", {
			key: e.id,
			class: "peer-card"
		}, [
			T("div", {
				class: "peer-status",
				style: M({ backgroundColor: c(e.status) })
			}, null, 4),
			T("div", Sc, [
				T("h3", Cc, V(e.name), 1),
				T("p", wc, V(e.url), 1),
				T("div", Tc, [e.shared_libraries_count === void 0 ? C("", !0) : (F(), w("span", Ec, V(e.shared_libraries_count) + " shared libraries", 1)), T("span", null, "Last sync: " + V(l(e.last_sync)), 1)])
			]),
			T("div", Dc, [e.status === "connected" ? (F(), w("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => s(e.id)
			}, " Disconnect ", 8, Oc)) : e.status === "pending" ? (F(), w("span", kc, "Pending")) : C("", !0)])
		]))), 128)), t.value.length === 0 ? (F(), w("div", Ac, [...n[1] ||= [T("p", null, "No federation peers connected.", -1)]])) : C("", !0)])]), T("div", jc, [n[4] ||= T("h2", { class: "section-title" }, "Add Peer", -1), T("form", {
			class: "add-peer-form",
			onSubmit: n[0] ||= X((e) => o(""), ["prevent"])
		}, [...n[3] ||= [T("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), T("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), Nc = { class: "manage-shares-page" }, Pc = {
	key: 0,
	class: "loading"
}, Fc = {
	key: 1,
	class: "error"
}, Ic = {
	key: 2,
	class: "shares-list"
}, Lc = { class: "share-info" }, Rc = { class: "share-library" }, zc = { class: "share-meta" }, Bc = {
	key: 0,
	class: "expired-badge"
}, Vc = { class: "share-dates" }, Hc = { key: 0 }, Uc = { class: "share-actions" }, Wc = ["onClick"], Gc = {
	key: 0,
	class: "empty-state"
}, Kc = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "ManageSharesPage",
	setup(e) {
		let t = L([]), r = L(!0), i = L(null);
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
		return P(() => {
			a();
		}), (e, n) => (F(), w("div", Nc, [n[1] ||= T("div", { class: "page-header" }, [T("h1", { class: "page-title" }, "Manage Shares"), T("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), r.value ? (F(), w("div", Pc, "Loading shares...")) : i.value ? (F(), w("div", Fc, V(i.value), 1)) : (F(), w("div", Ic, [(F(!0), w(g, null, R(t.value, (e) => (F(), w("div", {
			key: e.id,
			class: "share-card"
		}, [T("div", Lc, [
			T("h3", Rc, V(e.library_name), 1),
			T("div", zc, [
				T("span", null, "Shared with: " + V(e.shared_with), 1),
				T("span", { class: j(["permission-badge", e.permissions]) }, V(e.permissions), 3),
				e.expires_at && c(e.expires_at) ? (F(), w("span", Bc, "Expired")) : C("", !0)
			]),
			T("p", Vc, [E(" Created: " + V(s(e.created_at)) + " ", 1), e.expires_at ? (F(), w("span", Hc, " | Expires: " + V(s(e.expires_at)), 1)) : C("", !0)])
		]), T("div", Uc, [T("button", {
			class: "btn btn-danger",
			onClick: (t) => o(e.id)
		}, "Revoke", 8, Wc)])]))), 128)), t.value.length === 0 ? (F(), w("div", Gc, [...n[0] ||= [T("p", null, "No library shares found.", -1)]])) : C("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), qc = { class: "audit-logs-page" }, Jc = {
	key: 0,
	class: "loading"
}, Yc = {
	key: 1,
	class: "error"
}, Xc = {
	key: 2,
	class: "logs-container"
}, Zc = { class: "logs-list" }, Qc = { class: "log-content" }, $c = { class: "log-header" }, el = { class: "log-action" }, tl = { class: "log-actor" }, nl = { class: "log-time" }, rl = {
	key: 0,
	class: "log-target"
}, il = {
	key: 1,
	class: "log-details"
}, al = {
	key: 2,
	class: "log-ip"
}, ol = {
	key: 0,
	class: "empty-state"
}, sl = {
	key: 0,
	class: "pagination"
}, cl = ["disabled"], ll = { class: "page-info" }, ul = ["disabled"], dl = /*#__PURE__*/ c(/* @__PURE__ */ O({
	__name: "AuditLogsPage",
	setup(e) {
		let t = L([]), r = L(!0), i = L(null), a = L(1), o = L(1);
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
		return P(() => {
			s();
		}), (e, n) => (F(), w("div", qc, [n[3] ||= T("div", { class: "page-header" }, [T("h1", { class: "page-title" }, "Audit Logs"), T("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), r.value ? (F(), w("div", Jc, "Loading audit logs...")) : i.value ? (F(), w("div", Yc, V(i.value), 1)) : (F(), w("div", Xc, [T("div", Zc, [(F(!0), w(g, null, R(t.value, (e) => (F(), w("div", {
			key: e.id,
			class: "log-entry"
		}, [T("div", {
			class: "log-icon",
			style: M({ backgroundColor: l(e.action) })
		}, V(u(e.action)), 5), T("div", Qc, [
			T("div", $c, [
				T("span", el, V(e.action), 1),
				T("span", tl, V(e.actor), 1),
				T("span", nl, V(c(e.created_at)), 1)
			]),
			e.target ? (F(), w("p", rl, "Target: " + V(e.target), 1)) : C("", !0),
			e.details ? (F(), w("p", il, V(e.details), 1)) : C("", !0),
			e.ip_address ? (F(), w("span", al, "IP: " + V(e.ip_address), 1)) : C("", !0)
		])]))), 128)), t.value.length === 0 ? (F(), w("div", ol, [...n[2] ||= [T("p", null, "No audit logs found.", -1)]])) : C("", !0)]), o.value > 1 ? (F(), w("div", sl, [
			T("button", {
				class: "btn btn-secondary",
				disabled: a.value <= 1,
				onClick: n[0] ||= (e) => s(a.value - 1)
			}, " Previous ", 8, cl),
			T("span", ll, "Page " + V(a.value) + " of " + V(o.value), 1),
			T("button", {
				class: "btn btn-secondary",
				disabled: a.value >= o.value,
				onClick: n[1] ||= (e) => s(a.value + 1)
			}, " Next ", 8, ul)
		])) : C("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function fl(e, t) {
	let n = Tt(), r = !1;
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
export { Ya as ALL_LOGS, Gr as ARROW_ICONS, Kr as ARROW_LABELS, mo as AdminDashboardApi, ns as AdminDashboardPage, Xa as AdminLogsApi, oo as AdminLogsPage, as as AdminUsersApi, Bs as AdminUsersPage, a as ApiClient, f as ApiError, va as AppBackdrop, Se as AppLayout, dl as AuditLogsPage, m as Badge, ur as BrowsePage, o as Button, On as Chip, Fn as Combobox, tt as CommandPalette, ze as DEFAULT_PREFERENCES, p as EmptyState, Mc as FederationPage, ir as FilterBar, r as Icon, Q as IconButton, Ee as Kbd, ic as LibraryScanPage, d as LocalStorageTokenStore, Fi as LoginForm, Ri as LoginPage, Kc as ManageSharesPage, tn as MediaCard, Mr as MediaDetail, Lr as MediaDetailPage, dn as MediaGrid, wn as MediaHomeRow, xn as MediaRow, wa as Modal, hc as MyServersPage, Wr as PLAYER_SHORTCUTS, Ja as PageTransition, vt as PhlixApp, Si as Player, Ei as PlayerPage, li as QualityMenu, rs as RATING_LABELS, is as RATING_OPTIONS, Dt as RESUME_MAX_RATIO, Et as RESUME_MIN_SECONDS, qa as Reveal, Ur as Scrubber, l as Select, da as SettingsForm, pa as SettingsPage, Aa as Sheet, ri as ShortcutsHelp, Yi as SignupForm, Qi as SignupPage, u as Skeleton, ai as Slider, ci as SpeedMenu, Va as Spinner, h as Switch, Ka as Tabs, za as ToastHost, Ma as Tooltip, si as VolumeControl, Hs as adminMenu, ft as applyStoredThemeEarly, fl as bindMediaStoreToRouter, Vs as buildAdminRoutes, Sn as buildMediaQuery, Cn as buildMediaUrl, ga as createPhlixApp, lt as deriveAccentVars, Rr as formatTime, Fe as fuzzyScore, Yr as handleShortcut, Ue as hasStoredPreferences, Jr as isTypingTarget, Ie as matchCommand, He as readStoredPreferences, Di as useAuthStore, Re as useCommandStore, Me as useFocusTrap, Xr as useKeyboardShortcuts, Tt as useMediaStore, jt as usePlayerStore, Ge as usePreferencesStore, pt as useTheme, t as useToastStore };

//# sourceMappingURL=phlix-ui.js.map