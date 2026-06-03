import { a as e, c as t, i as n, l as r, n as i, o as a, r as o, s, t as c, u as l } from "./tokenStore-DfQvvLGI.js";
import { n as u, r as d, t as f } from "./Modal-CoXJKJI4.js";
import { t as p } from "./EmptyState-Oymq15Ey.js";
import { i as m, n as h, r as g, t as _ } from "./Select-B0YIBPe2.js";
import { t as v } from "./Badge-Cmz5FPqw.js";
import { n as y, t as b } from "./cast-CEG1z1w3.js";
import { t as x } from "./Switch-BymhyT_V.js";
import { n as S, t as C } from "./logs-DadTfaTq.js";
import { t as w } from "./dashboard-BTCOCTHQ.js";
import { n as T, r as E, t as D } from "./users-C40iLgkq.js";
import { n as O, r as ee, t as k } from "./webhooks-BBTLnFKm.js";
import { t as te } from "./services-Czm8hsvH.js";
import { t as ne } from "./integrations-DLAG9ISY.js";
import { t as re } from "./backup-IdY_vzc2.js";
import { t as ie } from "./dlnaServer-B5Sg4MkS.js";
import { t as ae } from "./remoteAccess-DVKRpKQ8.js";
import { t as oe } from "./liveTv-Dbjt901v.js";
import { t as se } from "./collections-CH3HLdcd.js";
import { t as ce } from "./history-ByCY8OYj.js";
import { t as le } from "./syncPlay-DPzJkgkK.js";
import { n as ue, t as de } from "./libraries-CXAz_kXs.js";
import { t as fe } from "./settings-m4upFcmH.js";
import { Fragment as A, Teleport as pe, Transition as me, TransitionGroup as he, computed as j, createApp as ge, createBlock as M, createCommentVNode as N, createElementBlock as P, createElementVNode as F, createSlots as _e, createTextVNode as I, createVNode as L, defineComponent as R, inject as z, nextTick as ve, normalizeClass as B, normalizeStyle as V, onBeforeUnmount as H, onMounted as U, openBlock as W, reactive as ye, ref as G, renderList as K, renderSlot as q, resolveComponent as be, resolveDynamicComponent as xe, toDisplayString as J, toRef as Se, unref as Y, useId as X, vModelText as Ce, vShow as we, watch as Z, watchEffect as Te, withCtx as Q, withDirectives as Ee, withKeys as De, withModifiers as Oe } from "vue";
import { createPinia as ke, defineStore as Ae } from "pinia";
import { RouterLink as je, RouterView as Me, createRouter as Ne, createWebHistory as Pe, onBeforeRouteLeave as Fe, useRoute as Ie, useRouter as Le } from "vue-router";
//#region src/app/AppLayout.vue
var Re = {}, ze = { class: "app-layout" }, Be = { class: "app-header" }, Ve = { class: "header-inner" }, He = { class: "logo" }, Ue = { class: "nav" }, We = { class: "app-main" }, Ge = { class: "app-footer" };
function Ke(e, t) {
	return W(), P("div", ze, [
		F("header", Be, [F("div", Ve, [F("div", He, [q(e.$slots, "logo", {}, () => [t[0] ||= F("span", { class: "logo-text" }, "Phlix", -1)], !0)]), F("nav", Ue, [q(e.$slots, "nav", {}, void 0, !0)])])]),
		F("main", We, [q(e.$slots, "default", {}, void 0, !0)]),
		F("footer", Ge, [q(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var qe = /*#__PURE__*/ l(Re, [["render", Ke], ["__scopeId", "data-v-9f6c6d16"]]), Je = { class: "phlix-kbd" }, Ye = {
	key: 1,
	class: "phlix-kbd__key"
}, Xe = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "Kbd",
	props: { keys: {} },
	setup(e) {
		let t = e, n = j(() => t.keys === void 0 ? [] : Array.isArray(t.keys) ? t.keys : [t.keys]);
		return (e, t) => (W(), P("span", Je, [n.value.length ? (W(!0), P(A, { key: 0 }, K(n.value, (e, t) => (W(), P("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, J(e), 1))), 128)) : (W(), P("kbd", Ye, [q(e.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), Ze = "phlix.cmd.recents", Qe = 8;
function $e(e, t) {
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
function et(e, t) {
	if (!e.trim()) return 0;
	let n = $e(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, $e(e, n));
	return t.group && (r = Math.max(r, $e(e, t.group))), r;
}
function tt() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(Ze);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, Qe) : [];
	} catch {
		return [];
	}
}
var nt = Ae("phlix-commands", () => {
	let e = G(/* @__PURE__ */ new Map()), t = G(!1), n = G(""), r = G(tt()), i = j(() => Array.from(e.value.values())), a = j(() => {
		let t = n.value.trim(), a = i.value;
		if (t) return a.map((e) => ({
			c: e,
			s: et(t, e)
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
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, Qe);
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
	return Z(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Ze, JSON.stringify(e));
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
}), rt = {
	size: "md",
	textColor: "#ffffff",
	background: "none",
	edge: "drop-shadow"
}, it = {
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
	captionStyle: { ...rt },
	atmosphere: !0,
	filterPresets: []
};
function at(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var ot = "phlix.prefs";
function st() {
	if (typeof localStorage > "u") return { ...it };
	try {
		let e = localStorage.getItem(ot);
		if (!e) return { ...it };
		let t = JSON.parse(e);
		return {
			...it,
			...t
		};
	} catch {
		return { ...it };
	}
}
function ct() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(ot) !== null;
	} catch {
		return !1;
	}
}
function lt() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var $ = Ae("phlix-prefs", () => {
	let e = st(), t = G(e.theme), n = G(e.accent), r = G(e.density), i = G(e.cardSize), a = G(e.gridDensity), o = G(e.reducedMotion), s = G(e.autoplay), c = G(e.defaultVolume), l = G(e.defaultQuality), u = G(e.defaultSubtitleLang), d = G({
		...rt,
		...e.captionStyle
	}), f = G(e.atmosphere), p = G(e.filterPresets ? [...e.filterPresets] : []), m = G(lt()), h = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (h = window.matchMedia("(prefers-reduced-motion: reduce)"), h.addEventListener?.("change", (e) => m.value = e.matches));
	let g = j(() => o.value === "on" ? !0 : o.value === "off" ? !1 : m.value);
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
			id: at(e),
			name: e.trim(),
			query: t
		}, r = p.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? p.value.splice(r, 1, n) : p.value.push(n), n;
	}
	function y(e) {
		p.value = p.value.filter((t) => t.id !== e);
	}
	Z(_, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(ot, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = it;
		t.value = e.theme, n.value = e.accent, r.value = e.density, i.value = e.cardSize, a.value = e.gridDensity, o.value = e.reducedMotion, s.value = e.autoplay, c.value = e.defaultVolume, l.value = e.defaultQuality, u.value = e.defaultSubtitleLang, d.value = { ...rt }, f.value = e.atmosphere, p.value = [...e.filterPresets];
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
}), ut = { class: "phlix-cmdk__search" }, dt = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], ft = ["id"], pt = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, mt = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], ht = { class: "phlix-cmdk__option-body" }, gt = { class: "phlix-cmdk__option-title" }, _t = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, vt = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, yt = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "CommandPalette",
	setup(e) {
		let t = nt(), n = Le(), i = $(), a = G(null), o = X(), s = G(0);
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
		let d = j(() => {
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
		}), f = j(() => d.value.options.length), p = j(() => f.value ? `${o}-opt-${s.value}` : void 0);
		Z(() => t.query, () => {
			s.value = 0;
		}), Z(f, (e) => {
			s.value > e - 1 && (s.value = Math.max(0, e - 1));
		}), Z(() => t.open, (e) => {
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
			t.closePalette();
		}
		u(a, j(() => t.open), { onEscape: () => (t.closePalette(), !0) });
		function b(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), t.togglePalette());
		}
		let x = z("phlixCommands", []), S = [
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
		], C = null;
		return U(() => {
			C = t.register([...S, ...x]), document.addEventListener("keydown", b);
		}), H(() => {
			C?.(), document.removeEventListener("keydown", b);
		}), (e, n) => (W(), M(pe, { to: "body" }, [L(me, { name: "phlix-cmdk" }, {
			default: Q(() => [Y(t).open ? (W(), P("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: Oe(y, ["self"])
			}, [F("div", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [F("div", ut, [
				L(r, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				F("input", {
					value: Y(t).query,
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
					onInput: n[0] ||= (e) => Y(t).setQuery(e.target.value),
					onKeydown: v
				}, null, 40, dt),
				L(Xe, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), F("ul", {
				id: Y(o),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(W(!0), P(A, null, K(d.value.rows, (e, t) => (W(), P(A, { key: e.kind === "header" ? `h-${e.label}-${t}` : e.item.id }, [e.kind === "header" ? (W(), P("li", pt, J(e.label), 1)) : (W(), P("li", {
				key: 1,
				id: `${Y(o)}-opt-${e.index}`,
				class: B(["phlix-cmdk__option", { "is-active": e.index === s.value }]),
				role: "option",
				"aria-selected": e.index === s.value,
				onClick: (t) => _(e.item),
				onPointermove: (t) => s.value = e.index
			}, [
				L(r, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				F("span", ht, [F("span", gt, J(e.item.title), 1), e.item.subtitle ? (W(), P("span", _t, J(e.item.subtitle), 1)) : N("", !0)]),
				e.item.shortcut ? (W(), M(Xe, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : N("", !0)
			], 42, mt))], 64))), 128)), f.value ? N("", !0) : (W(), P("li", vt, " No matching commands "))], 8, ft)], 512)], 32)) : N("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]), bt = 30, xt = .95, St = 5e3, Ct = "phlix.resume";
function wt() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(Ct);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Tt = Ae("phlix-player", () => {
	let e = $(), t = G(null), n = G(""), r = G([]), i = G(!1), a = G(0), o = G(0), s = G(0), c = G(e.defaultVolume), l = G(!1), u = G(1), d = G(e.defaultQuality), f = G(e.defaultSubtitleLang), p = G(!1), m = G(wt()), h = j(() => o.value > 0 ? a.value / o.value : 0), g = j(() => r.value[0] ?? null), _, v = 0;
	function y(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			v = Date.now();
			try {
				localStorage.setItem(Ct, JSON.stringify(m.value));
			} catch {}
		}, n = Date.now() - v;
		clearTimeout(_), e || n >= St ? t() : _ = setTimeout(t, St - n);
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
		t.value = e, r.streamUrl !== void 0 && (n.value = r.streamUrl), r.resetPosition !== !1 && (a.value = 0, o.value = 0, s.value = 0), le(e);
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
	function ee() {
		l.value = !l.value;
	}
	function k(e) {
		u.value = e;
	}
	function te(e) {
		d.value = e;
	}
	function ne(e) {
		f.value = e;
	}
	function re(e) {
		r.value = [...e];
	}
	function ie(e) {
		r.value.push(e);
	}
	function ae(e) {
		let t = r.value.shift() ?? null;
		return t && w(t, { streamUrl: e?.(t) ?? "" }), t;
	}
	function oe() {
		p.value = !0;
	}
	function se() {
		p.value = !1;
	}
	function ce() {
		t.value && x(t.value.id, a.value, o.value), y(!0), i.value = !1, p.value = !1, t.value = null, n.value = "";
	}
	function le(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function ue() {
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
	function de(e) {
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
	function fe() {
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
		toggleMute: ee,
		setRate: k,
		setQuality: te,
		setSubtitle: ne,
		setQueue: re,
		enqueue: ie,
		next: ae,
		showMiniPlayer: oe,
		hideMiniPlayer: se,
		closePlayer: ce,
		setMediaSessionMetadata: le,
		setMediaPositionState: ue,
		bindMediaSession: de,
		seedFromPreferences: fe
	};
}), Et = {
	key: 0,
	class: "mini",
	role: "region",
	"aria-label": "Mini player"
}, Dt = ["src", "poster"], Ot = { class: "mini__body" }, kt = { class: "mini__title" }, At = { class: "mini__controls" }, jt = ["aria-label"], Mt = {
	class: "mini__progress",
	"aria-hidden": "true"
}, Nt = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "MiniPlayer",
	emits: ["expand"],
	setup(e, { emit: t }) {
		let n = t, i = Tt(), a = G(null), o = j(() => i.miniPlayer && !!i.current && !!i.streamUrl), s = j(() => i.current?.name ?? ""), c = j(() => Math.max(0, Math.min(1, i.progress)));
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
			i.current && n("expand", i.current.id);
		}
		function h() {
			i.closePlayer();
		}
		return Z(() => i.playing, (e) => {
			let t = a.value;
			t && (e && t.paused ? t.play()?.catch(() => {}) : !e && !t.paused && t.pause());
		}), H(() => {
			a.value?.pause?.();
		}), (e, t) => (W(), M(me, { name: "mini" }, {
			default: Q(() => [o.value ? (W(), P("div", Et, [
				F("video", {
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
				}, null, 40, Dt),
				F("div", Ot, [F("p", kt, J(s.value), 1), F("div", At, [
					F("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": Y(i).playing ? "Pause" : "Play",
						onClick: p
					}, [L(r, { name: Y(i).playing ? "pause" : "play" }, null, 8, ["name"])], 8, jt),
					F("button", {
						type: "button",
						class: "mini__btn",
						"aria-label": "Expand to full player",
						onClick: m
					}, [L(r, { name: "expand" })]),
					F("button", {
						type: "button",
						class: "mini__btn mini__btn--close",
						"aria-label": "Close player",
						onClick: h
					}, [L(r, { name: "x" })])
				])]),
				F("div", Mt, [F("div", {
					class: "mini__progress-fill",
					style: V({ transform: `scaleX(${c.value})` })
				}, null, 4)])
			])) : N("", !0)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-c013af7d"]]);
//#endregion
//#region src/composables/color.ts
function Pt(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Ft = (e) => Math.max(0, Math.min(255, Math.round(e))), It = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Ft(e).toString(16).padStart(2, "0")).join("");
function Lt(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function Rt(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var zt = ({ r: e, g: t, b: n }, r) => `rgba(${Ft(e)}, ${Ft(t)}, ${Ft(n)}, ${r})`;
function Bt({ r: e, g: t, b: n }) {
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
function Vt(e) {
	let t = Pt(e);
	if (!t) return null;
	let n = Bt(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": It(t),
		"--accent-hover": It(Lt(t, .12)),
		"--accent-active": It(Rt(t, .12)),
		"--accent-soft": zt(t, .14),
		"--accent-ring": zt(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Ht = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Ut(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? Vt(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Ht) n.style.removeProperty(e);
}
function Wt(e) {
	let t = st();
	e && !ct() && (t.theme = e), Ut(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Gt() {
	let e = $();
	return Te(() => {
		Ut({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var Kt = ["src", "alt"], qt = { class: "brand-wordmark" }, Jt = {
	key: 1,
	class: "brand-tagline"
}, Yt = { class: "main-nav" }, Xt = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "PhlixApp",
	setup(e) {
		Gt();
		let t = nt(), n = Le();
		function i(e) {
			n.push(`${l.value}/player/${e}`);
		}
		let a = z("phlixConfig", null), o = j(() => a?.branding ?? {}), s = j(() => o.value.wordmark ?? "Phlix"), c = j(() => a?.menu ?? []), l = j(() => a?.routerBase ?? "/app");
		function u(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (e, n) => (W(), M(qe, null, {
			logo: Q(() => [L(Y(je), {
				to: l.value,
				class: "brand"
			}, {
				default: Q(() => [
					o.value.logoSrc ? (W(), P("img", {
						key: 0,
						src: o.value.logoSrc,
						alt: o.value.logoAlt ?? s.value,
						class: "brand-logo"
					}, null, 8, Kt)) : N("", !0),
					F("span", qt, J(s.value), 1),
					o.value.tagline ? (W(), P("span", Jt, J(o.value.tagline), 1)) : N("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: Q(() => [F("nav", Yt, [c.value.length ? (W(!0), P(A, { key: 0 }, K(c.value, (e) => (W(), M(xe(e.href ? "a" : Y(je)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? u(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: Q(() => [e.icon ? (W(), M(r, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : N("", !0), I(" " + J(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (W(), P(A, { key: 1 }, [L(Y(je), {
				to: l.value,
				class: "nav-link"
			}, {
				default: Q(() => [...n[1] ||= [I("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), L(Y(je), {
				to: `${l.value}/settings`,
				class: "nav-link"
			}, {
				default: Q(() => [...n[2] ||= [I("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64)), L(d, {
				name: "search",
				label: "Open command palette (⌘K)",
				size: "sm",
				class: "nav-cmdk",
				onClick: n[0] ||= (e) => Y(t).openPalette()
			})])]),
			default: Q(() => [
				L(Y(Me)),
				L(yt),
				L(Nt, { onExpand: i })
			]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-d5a4156b"]]), Zt = { class: "phlix-placeholder" }, Qt = { class: "placeholder-content" }, $t = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (W(), P("div", Zt, [F("div", Qt, [n[0] ||= F("h1", null, "Shared UI loading...", -1), F("p", null, "Phlix " + J(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), en = 6e4, tn = 250;
function nn(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var rn = Ae("media", () => {
	let t = G([]), n = G(0), r = G(!1), i = G(null), a = G(""), o = G([]), s = G(void 0), c = G(void 0), l = G([]), u = G([]), d = G("name"), f = G("asc"), p = G(24), m = G(0), h = j(() => t.value.length < n.value), g = j(() => {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = j(() => {
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
		return !!e && Date.now() - e.ts < en;
	}
	function ee(t, n, r, i) {
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
	function k(e, r) {
		t.value = r ? [...t.value, ...e.items] : e.items, n.value = e.total;
	}
	async function te(e, t = !1) {
		let n = { ...g.value }, a = S(n), o = C.get(a);
		if (O(o)) {
			k(o, t), i.value = null;
			return;
		}
		r.value = !0, i.value = null;
		try {
			let r = await ee(e, n, a, !t);
			if (!t && a !== T) return;
			k(r, t);
		} catch (e) {
			if (nn(e)) return;
			(t || a === T) && (i.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === T) && (r.value = !1);
		}
	}
	function ne(e, t = tn) {
		m.value = 0, clearTimeout(D), D = setTimeout(() => te(e, !1), t);
	}
	async function re(e) {
		r.value || !h.value || (m.value = t.value.length, await te(e, !0));
	}
	async function ie(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = S(n);
		if (!O(C.get(r))) try {
			await ee(e, n, r, !1);
		} catch {}
	}
	function ae() {
		C.clear();
	}
	function oe() {
		clearTimeout(D);
	}
	function se() {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function ce(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function le(e) {
		a.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = ce(e.genres), l.value = ce(e.ratings), u.value = ce(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = i ?? "asc", m.value = 0;
	}
	function ue() {
		t.value = [], n.value = 0, m.value = 0, i.value = null;
	}
	function de(e) {
		a.value = e, m.value = 0;
	}
	function fe(e) {
		o.value = e, m.value = 0;
	}
	function A(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function pe(e) {
		l.value = e, m.value = 0;
	}
	function me(e) {
		u.value = e, m.value = 0;
	}
	function he(e, t) {
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
		fetchMedia: te,
		scheduleFetch: ne,
		loadMore: re,
		prefetch: ie,
		clearCache: ae,
		cancelScheduled: oe,
		toQuery: se,
		applyQuery: le,
		reset: ue,
		setSearch: de,
		setGenres: fe,
		setYearRange: A,
		setRatings: pe,
		setTypes: me,
		setSort: he
	};
}), an = { class: "media-card" }, on = { class: "media-card__poster" }, sn = ["href", "aria-label"], cn = { class: "visually-hidden" }, ln = ["src", "alt"], un = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, dn = { class: "media-card__badges" }, fn = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, pn = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, mn = ["aria-valuenow", "aria-label"], hn = { class: "media-card__overlay" }, gn = { class: "media-card__title" }, _n = { class: "media-card__meta" }, vn = {
	key: 0,
	class: "numeric"
}, yn = {
	key: 1,
	class: "media-card__dot"
}, bn = {
	key: 2,
	class: "media-card__cert"
}, xn = {
	key: 3,
	class: "media-card__dot"
}, Sn = {
	key: 4,
	class: "numeric"
}, Cn = {
	key: 0,
	class: "media-card__genres"
}, wn = { class: "media-card__actions" }, Tn = { class: "media-card__caption" }, En = ["title"], Dn = { class: "media-card__caption-sub numeric" }, On = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let n = e, i = t, a = Tt(), o = j(() => n.to ?? `/app/player/${n.item.id}`), s = G(!1), c = G(null);
		function l() {
			s.value = !0;
		}
		U(() => {
			c.value?.complete && (s.value = !0);
		});
		let u = j(() => {
			let e = n.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= n.newWithinDays * 24 * 60 * 60 * 1e3;
		}), d = j(() => {
			let e = a.resumePositionFor(n.item.id), t = n.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), f = j(() => n.item.genres?.slice(0, 3) ?? []);
		return (t, n) => (W(), P("article", an, [F("div", on, [
			F("a", {
				href: o.value,
				class: "media-card__link",
				"aria-label": e.item.name
			}, [F("span", cn, J(e.item.name), 1)], 8, sn),
			e.item.poster_url ? (W(), P("img", {
				key: 0,
				ref_key: "imgEl",
				ref: c,
				class: B(["media-card__img", { "is-loaded": s.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: l
			}, null, 42, ln)) : (W(), P("div", un, [L(r, { name: e.item.type === "audio" ? "music" : e.item.type === "image" ? "image" : e.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			F("div", dn, [
				u.value ? (W(), P("span", fn, "New")) : N("", !0),
				q(t.$slots, "badges", { item: e.item }, void 0, !0),
				e.quality ? (W(), P("span", pn, J(e.quality), 1)) : N("", !0)
			]),
			d.value > 0 ? (W(), P("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(d.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${e.item.name}`
			}, [F("i", { style: V({ width: `${d.value * 100}%` }) }, null, 4)], 8, mn)) : N("", !0),
			F("div", hn, [
				F("h3", gn, J(e.item.name), 1),
				F("div", _n, [
					e.item.year ? (W(), P("span", vn, J(e.item.year), 1)) : N("", !0),
					e.item.year && (e.item.rating || e.item.runtime) ? (W(), P("span", yn)) : N("", !0),
					e.item.rating ? (W(), P("span", bn, J(e.item.rating), 1)) : N("", !0),
					e.item.rating && e.item.runtime ? (W(), P("span", xn)) : N("", !0),
					e.item.runtime ? (W(), P("span", Sn, J(e.item.runtime) + "m", 1)) : N("", !0)
				]),
				f.value.length ? (W(), P("div", Cn, [(W(!0), P(A, null, K(f.value, (e) => (W(), P("span", { key: e }, J(e), 1))), 128))])) : N("", !0),
				F("div", wn, [
					F("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: n[0] ||= (t) => i("play", e.item)
					}, [L(r, { name: "play" })]),
					F("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: n[1] ||= (t) => i("watchlist", e.item)
					}, [L(r, { name: "bookmark-plus" })]),
					F("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: n[2] ||= (t) => i("info", e.item)
					}, [L(r, { name: "info" })]),
					q(t.$slots, "actions", { item: e.item }, void 0, !0)
				])
			])
		]), F("div", Tn, [F("div", {
			class: "media-card__caption-title",
			title: e.item.name
		}, J(e.item.name), 9, En), F("div", Dn, [
			e.item.year ? (W(), P(A, { key: 0 }, [I(J(e.item.year), 1)], 64)) : N("", !0),
			e.item.year && e.item.runtime ? (W(), P(A, { key: 1 }, [I(" · ")], 64)) : N("", !0),
			e.item.runtime ? (W(), P(A, { key: 2 }, [I(J(e.item.runtime) + "m", 1)], 64)) : N("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), kn = 3 / 2;
function An(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function jn(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function Mn(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * kn + t + n;
}
function Nn(e) {
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
var Pn = { class: "media-grid-root" }, Fn = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, In = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, Ln = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let n = e, i = t, a = $(), o = j(() => n.cardSize ?? a.cardSize ?? 180), s = G(null), c = G(null), l = G(0), u = G(0), d = G(0);
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
		let h = j(() => An(l.value, o.value, 20)), g = j(() => Mn(jn(l.value, h.value, 20))), _ = j(() => l.value > 0 && g.value > 0), v = j(() => Nn({
			scrollTop: d.value,
			viewportHeight: u.value,
			rowHeight: g.value,
			columns: h.value,
			itemCount: n.items.length,
			overscan: n.overscan
		})), y = j(() => {
			if (!_.value) return n.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = v.value, r = [];
			for (let i = e; i < t; i++) r.push({
				item: n.items[i],
				index: i
			});
			return r;
		}), b = j(() => ({ gridTemplateColumns: _.value ? `repeat(${h.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), x = j(() => _.value ? { height: `${v.value.totalHeight}px` } : {}), S = j(() => _.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${v.value.padTop}px)`
		} : {}), C = j(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${o.value}px, 1fr))` })), w = j(() => _.value && d.value > u.value * 1.5);
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
				e.some((e) => e.isIntersecting) && n.hasMore && !n.loading && !n.loadingMore && i("load-more");
			}, { rootMargin: "400px 0px" }), c.value && E.observe(c.value));
		}
		function O() {
			E?.disconnect(), E = null;
		}
		Z(() => c.value, (e) => {
			O(), e && (D(), m());
		});
		let ee = null;
		function k() {
			ee || typeof ResizeObserver > "u" || !s.value || (ee = new ResizeObserver(m), ee.observe(s.value));
		}
		function te() {
			ee?.disconnect(), ee = null;
		}
		return Z(() => s.value, (e) => {
			te(), e && (k(), m());
		}), U(() => {
			f(), typeof window < "u" && (window.addEventListener("scroll", m, { passive: !0 }), window.addEventListener("resize", m, { passive: !0 })), k(), D();
		}), H(() => {
			typeof window < "u" && (window.removeEventListener("scroll", m), window.removeEventListener("resize", m)), p &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(p) : clearTimeout(p), 0), te(), O();
		}), Z(() => n.items.length, () => ve(m)), (t, n) => (W(), P("div", Pn, [e.loading && e.items.length === 0 ? (W(), P("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: V(C.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(W(!0), P(A, null, K(e.skeletonCount, (e) => (W(), P("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...n[0] ||= [
			F("div", { class: "skel-poster" }, null, -1),
			F("div", { class: "skel-title" }, null, -1),
			F("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : e.items.length === 0 ? (W(), P("div", Fn, [q(t.$slots, "empty", {}, () => [
			L(r, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			n[1] ||= F("p", { class: "media-grid-empty__title" }, "No media found", -1),
			n[2] ||= F("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (W(), P(A, { key: 2 }, [
			F("div", {
				ref_key: "sizerEl",
				ref: s,
				class: "media-grid-sizer",
				style: V(x.value)
			}, [F("div", {
				class: "media-grid",
				style: V([b.value, S.value])
			}, [(W(!0), P(A, null, K(y.value, (e) => q(t.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [L(On, {
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
			e.loadingMore ? (W(), P("div", In, [...n[3] ||= [F("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), I(" Loading more… ", -1)]])) : N("", !0),
			e.hasMore && !e.loadingMore ? (W(), P("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: c,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : N("", !0)
		], 64)), L(me, { name: "media-grid-fade" }, {
			default: Q(() => [w.value ? (W(), P("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: T
			}, [L(r, { name: "arrow-up" })])) : N("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), Rn = ["aria-label"], zn = { class: "media-row__head" }, Bn = { class: "media-row__title" }, Vn = {
	key: 0,
	class: "media-row__count numeric"
}, Hn = { class: "media-row__action" }, Un = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, Wn = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, Gn = { class: "media-row__skel-poster" }, Kn = ["aria-label"], qn = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let n = e, r = t, i = j(() => !n.loading && !n.error && n.items.length === 0), a = j(() => n.hideWhenEmpty && i.value);
		return (t, n) => a.value ? N("", !0) : (W(), P("section", {
			key: 0,
			class: "media-row",
			"aria-label": e.title
		}, [F("div", zn, [
			F("h2", Bn, J(e.title), 1),
			e.count == null ? N("", !0) : (W(), P("span", Vn, J(e.count.toLocaleString()), 1)),
			F("div", Hn, [q(t.$slots, "action", {}, void 0, !0)])
		]), e.error ? (W(), P("div", Un, [F("span", null, J(e.error), 1), F("button", {
			type: "button",
			class: "media-row__retry",
			onClick: n[0] ||= (e) => r("retry")
		}, "Retry")])) : e.loading && e.items.length === 0 ? (W(), P("div", Wn, [(W(!0), P(A, null, K(e.skeletonCount, (e) => (W(), P("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [F("div", Gn, [L(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), L(o, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : i.value ? (W(), M(p, {
			key: 2,
			title: e.title,
			description: e.emptyText ?? "Nothing here yet."
		}, {
			default: Q(() => [q(t.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (W(), P("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": e.title
		}, [(W(!0), P(A, null, K(e.items, (t) => (W(), P("li", {
			key: t.id,
			class: "media-row__cell"
		}, [L(On, {
			item: t,
			to: e.cardTo ? e.cardTo(t) : void 0,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, Kn))], 8, Rn));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function Jn(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function Yn(e, t = {}) {
	return `${e}/api/v1/media?${Jn(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var Xn = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
					let t = new e({ baseUrl: i.apiBase }), n = Yn(i.apiBase, {
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
		}), (e, n) => (W(), P("div", {
			ref_key: "rootEl",
			ref: f
		}, [L(qn, {
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
			action: Q(() => [F("button", {
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
}), [["__scopeId", "data-v-fb0faca3"]]), Zn = ["disabled", "aria-pressed"], Qn = { class: "phlix-chip__label" }, $n = ["disabled", "aria-label"], er = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		return (t, n) => (W(), P("span", { class: B(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [F("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: a
		}, [e.icon ? (W(), M(r, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : N("", !0), F("span", Qn, [q(t.$slots, "default", {}, void 0, !0)])], 8, Zn), e.removable ? (W(), P("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => i("remove")
		}, [L(r, { name: "x" })], 8, $n)) : N("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]), tr = { class: "phlix-combobox__field" }, nr = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], rr = ["id", "aria-label"], ir = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], ar = { class: "phlix-combobox__check" }, or = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, sr = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = j(() => m(n.options)), o = X(), s = G(!1), c = G(-1), l = G(""), u = G(!1), d = G(null), f = G(null), p = G(null), _ = j(() => a.value.find((e) => e.value === n.modelValue)?.label ?? ""), v = j(() => {
			if (!u.value || l.value.trim() === "") return a.value;
			let e = l.value.toLowerCase();
			return a.value.filter((t) => t.label.toLowerCase().includes(e));
		}), y = j(() => c.value >= 0 ? `${o}-opt-${c.value}` : void 0);
		Z(() => n.modelValue, () => {
			s.value || (l.value = _.value);
		}, { immediate: !0 });
		function b() {
			n.disabled || s.value || (s.value = !0, c.value = v.value.findIndex((e) => e.value === n.modelValue), c.value < 0 && (c.value = v.value.findIndex((e) => !e.disabled)), ve(w));
		}
		function x() {
			l.value = _.value, u.value = !1, s.value = !1;
		}
		function S(e) {
			let t = v.value[e];
			!t || t.disabled || (t.value !== n.modelValue && (i("update:modelValue", t.value), i("change", t.value)), l.value = t.label, u.value = !1, s.value = !1, f.value?.focus());
		}
		function C(e) {
			v.value.length !== 0 && (c.value = g(v.value, c.value, e), ve(w));
		}
		function w() {
			p.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function T(e) {
			l.value = e.target.value, u.value = !0, s.value = !0, c.value = h(v.value, "first");
		}
		function E(e) {
			if (!n.disabled) switch (e.key) {
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
		return Z(s, (e) => {
			e ? document.addEventListener("pointerdown", D, !0) : document.removeEventListener("pointerdown", D, !0);
		}), H(() => document.removeEventListener("pointerdown", D, !0)), (t, n) => (W(), P("div", {
			ref_key: "rootEl",
			ref: d,
			class: B(["phlix-combobox", {
				"is-open": s.value,
				"is-disabled": e.disabled
			}])
		}, [F("div", tr, [
			L(r, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			F("input", {
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
			}, null, 40, nr),
			L(r, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), Ee(F("ul", {
			id: `${Y(o)}-list`,
			ref_key: "listEl",
			ref: p,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": e.label
		}, [(W(!0), P(A, null, K(v.value, (t, n) => (W(), P("li", {
			id: `${Y(o)}-opt-${n}`,
			key: t.value,
			class: B(["phlix-combobox__option", {
				"is-active": n === c.value,
				"is-disabled": t.disabled
			}]),
			role: "option",
			"aria-selected": t.value === e.modelValue,
			"aria-disabled": t.disabled || void 0,
			onClick: (e) => S(n),
			onPointermove: (e) => !t.disabled && (c.value = n)
		}, [F("span", ar, [t.value === e.modelValue ? (W(), M(r, {
			key: 0,
			name: "check"
		})) : N("", !0)]), I(" " + J(t.label), 1)], 42, ir))), 128)), v.value.length === 0 ? (W(), P("li", or, "No matches")) : N("", !0)], 8, rr), [[we, s.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), cr = { class: "filterbar__main" }, lr = { class: "filterbar__search" }, ur = { class: "filterbar__sort" }, dr = ["aria-label"], fr = ["aria-expanded"], pr = { class: "filterbar__advanced" }, mr = { class: "filterbar__field" }, hr = { class: "filterbar__field" }, gr = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, _r = { class: "filterbar__field" }, vr = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, yr = { class: "filterbar__field" }, br = { class: "filterbar__years" }, xr = { class: "filterbar__field filterbar__presets" }, Sr = { class: "filterbar__chips" }, Cr = {
	key: 0,
	class: "filterbar__presets-empty"
}, wr = {
	key: 0,
	class: "filterbar__preset-save"
}, Tr = ["onKeydown"], Er = ["disabled"], Dr = { class: "filterbar__active" }, Or = {
	class: "filterbar__count",
	"aria-live": "polite"
}, kr = { class: "filterbar__pills" }, Ar = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let n = e, i = t, a = rn(), o = $(), s = [
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
		Z(() => a.search, (e) => {
			e !== c.value.trim() && (c.value = e);
		});
		function u() {
			clearTimeout(l), l = setTimeout(() => {
				a.setSearch(c.value.trim()), i("change");
			}, n.searchDebounce);
		}
		function d() {
			c.value = "", a.setSearch(""), i("change");
		}
		let f = G(null), p = G(0), m = j(() => a.availableGenres.filter((e) => !a.selectedGenres.includes(e)));
		function h(e) {
			if (e == null || e === "") return;
			let t = String(e);
			a.selectedGenres.includes(t) || (a.setGenres([...a.selectedGenres, t]), i("change")), f.value = null, p.value++;
		}
		function g(e) {
			let t = a.selectedRatings;
			a.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		function y(e) {
			let t = a.selectedTypes;
			a.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), i("change");
		}
		let b = j(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), x = j(() => {
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
		let E = j(() => {
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
				remove: () => g(t)
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
		}), D = j(() => E.value.length > 0), O = j(() => a.selectedGenres.length + a.selectedRatings.length + a.selectedTypes.length + (a.yearFrom === void 0 ? 0 : 1) + (a.yearTo === void 0 ? 0 : 1));
		function ee() {
			c.value = "", a.setSearch(""), a.setGenres([]), a.setRatings([]), a.setTypes([]), a.setYearRange(void 0, void 0), i("change");
		}
		let k = G(!1), te = j(() => o.filterPresets), ne = G(!1), re = G("");
		function ie() {
			ne.value = !0, re.value = "";
		}
		function ae() {
			let e = re.value.trim();
			e && (o.saveFilterPreset(e, a.toQuery()), ne.value = !1, re.value = "");
		}
		function oe(e) {
			a.applyQuery(e.query), c.value = a.search, i("change");
		}
		function se(e) {
			o.removeFilterPreset(e.id);
		}
		let ce = G(!1);
		function le() {
			typeof window > "u" || (ce.value = window.scrollY > 24);
		}
		return U(() => {
			n.sticky && typeof window < "u" && (window.addEventListener("scroll", le, { passive: !0 }), le());
		}), H(() => {
			clearTimeout(l), typeof window < "u" && window.removeEventListener("scroll", le);
		}), (t, n) => (W(), P("div", { class: B(["filterbar", {
			"is-sticky": e.sticky,
			"is-stuck": e.sticky && ce.value
		}]) }, [
			F("div", cr, [
				F("label", lr, [
					L(r, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					Ee(F("input", {
						"onUpdate:modelValue": n[0] ||= (e) => c.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: u
					}, null, 544), [[Ce, c.value]]),
					c.value ? (W(), P("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: d
					}, [L(r, { name: "x" })])) : N("", !0)
				]),
				F("div", ur, [L(_, {
					"model-value": Y(a).sort,
					options: s,
					label: "Sort by",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value"]), F("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${Y(a).order === "asc" ? "ascending" : "descending"}`,
					onClick: T
				}, [L(r, { name: Y(a).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, dr)]),
				F("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": k.value,
					onClick: n[1] ||= (e) => k.value = !k.value
				}, [
					L(r, { name: "filter" }),
					n[4] ||= F("span", null, "Filters", -1),
					O.value ? (W(), M(v, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: Q(() => [I(J(O.value), 1)]),
						_: 1
					})) : N("", !0),
					L(r, {
						name: k.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, fr)
			]),
			L(me, { name: "filterbar-panel" }, {
				default: Q(() => [Ee(F("div", pr, [
					F("div", mr, [n[5] ||= F("span", { class: "filterbar__field-label" }, "Genres", -1), (W(), M(sr, {
						key: p.value,
						"model-value": f.value,
						options: m.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": h
					}, null, 8, ["model-value", "options"]))]),
					F("div", hr, [n[6] ||= F("span", { class: "filterbar__field-label" }, "Rating", -1), F("div", gr, [(W(!0), P(A, null, K(Y(a).availableRatings, (e) => (W(), M(er, {
						key: e,
						selected: Y(a).selectedRatings.includes(e),
						"onUpdate:selected": (t) => g(e)
					}, {
						default: Q(() => [I(J(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					F("div", _r, [n[7] ||= F("span", { class: "filterbar__field-label" }, "Type", -1), F("div", vr, [(W(!0), P(A, null, K(Y(a).availableTypes, (e) => (W(), M(er, {
						key: e,
						selected: Y(a).selectedTypes.includes(e),
						"onUpdate:selected": (t) => y(e)
					}, {
						default: Q(() => [I(J(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					F("div", yr, [n[9] ||= F("span", { class: "filterbar__field-label" }, "Year", -1), F("div", br, [
						L(sr, {
							"model-value": Y(a).yearFrom ?? null,
							options: x.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": S
						}, null, 8, ["model-value", "options"]),
						n[8] ||= F("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						L(sr, {
							"model-value": Y(a).yearTo ?? null,
							options: x.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": C
						}, null, 8, ["model-value", "options"])
					])]),
					F("div", xr, [
						n[12] ||= F("span", { class: "filterbar__field-label" }, "Presets", -1),
						F("div", Sr, [(W(!0), P(A, null, K(te.value, (e) => (W(), M(er, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => oe(e),
							onRemove: (t) => se(e)
						}, {
							default: Q(() => [I(J(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), te.value.length ? N("", !0) : (W(), P("span", Cr, "No saved presets"))]),
						ne.value ? (W(), P("div", wr, [Ee(F("input", {
							"onUpdate:modelValue": n[2] ||= (e) => re.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [De(Oe(ae, ["prevent"]), ["enter"]), n[3] ||= De((e) => ne.value = !1, ["esc"])]
						}, null, 40, Tr), [[Ce, re.value]]), F("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ae
						}, [L(r, { name: "check" }), n[10] ||= I(" Save ", -1)])])) : (W(), P("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !D.value,
							onClick: ie
						}, [L(r, { name: "plus" }), n[11] ||= I(" Save current ", -1)], 8, Er))
					])
				], 512), [[we, k.value]])]),
				_: 1
			}),
			F("div", Dr, [F("span", Or, [F("b", null, J(Y(a).total.toLocaleString()), 1), I(" " + J(Y(a).total === 1 ? "title" : "titles"), 1)]), D.value ? (W(), P(A, { key: 0 }, [F("div", kr, [(W(!0), P(A, null, K(E.value, (e) => (W(), M(er, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: Q(() => [I(J(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), F("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: ee
			}, "Clear all")], 64)) : N("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), jr = { class: "browse-page" }, Mr = { class: "browse-toolbar" }, Nr = { class: "browse-header" }, Pr = { class: "browse-count numeric" }, Fr = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, Ir = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "BrowsePage",
	setup(e) {
		let t = z("apiBase", ""), r = j(() => typeof t == "string" ? t : t?.value ?? ""), i = z("phlixConfig", null), a = j(() => i?.homeRows ?? []), o = rn(), s = Tt(), c = n(), l = Le(), u = G(null), d = ye(/* @__PURE__ */ new Map());
		function f(e) {
			e.forEach((e) => d.set(e.id, e));
		}
		Z(() => o.items, (e) => f(e), { immediate: !0 });
		let p = j(() => {
			let e = s.resumeMap;
			return Object.keys(e).map((e) => d.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function m() {
			o.reset(), o.fetchMedia(r.value);
		}
		U(m), Z(r, m);
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
		return (e, t) => (W(), P("div", jr, [
			F("div", Mr, [q(e.$slots, "toolbar-extra", {}, void 0, !0)]),
			p.value.length ? (W(), M(qn, {
				key: 0,
				title: "Continue Watching",
				items: p.value,
				"hide-when-empty": "",
				onPlay: v,
				onWatchlist: y,
				onInfo: b
			}, null, 8, ["items"])) : N("", !0),
			(W(!0), P(A, null, K(a.value, (e) => (W(), M(Xn, {
				key: e.id,
				row: e,
				"api-base": r.value,
				onItemsLoaded: f,
				onSeeAll: S,
				onPlay: v,
				onWatchlist: y,
				onInfo: b
			}, null, 8, ["row", "api-base"]))), 128)),
			F("section", {
				ref_key: "gridSection",
				ref: u,
				class: "browse-library"
			}, [
				F("div", Nr, [t[0] ||= F("h1", { class: "browse-title" }, "Browse", -1), F("span", Pr, J(Y(o).total.toLocaleString()) + " titles", 1)]),
				L(Ar, { onChange: h }),
				Y(o).error ? (W(), P("div", Fr, [F("p", null, J(Y(o).error), 1), F("button", {
					type: "button",
					class: "browse-retry",
					onClick: m
				}, "Retry")])) : N("", !0),
				L(Ln, {
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
}), [["__scopeId", "data-v-214269cb"]]), Lr = { class: "media-detail" }, Rr = { class: "media-detail__bar" }, zr = { class: "media-detail__hero" }, Br = { class: "media-detail__poster" }, Vr = ["src", "alt"], Hr = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Ur = { class: "media-detail__info" }, Wr = { class: "media-detail__title" }, Gr = { class: "media-detail__meta numeric" }, Kr = {
	key: 0,
	class: "media-detail__meta-item"
}, qr = {
	key: 1,
	class: "media-detail__cert"
}, Jr = {
	key: 2,
	class: "media-detail__meta-item"
}, Yr = { class: "media-detail__type" }, Xr = {
	key: 0,
	class: "media-detail__genres"
}, Zr = { class: "media-detail__overview" }, Qr = { class: "media-detail__actions" }, $r = { class: "media-detail__resume-at numeric" }, ei = {
	key: 1,
	class: "media-detail__credits"
}, ti = {
	key: 0,
	class: "media-detail__credit"
}, ni = {
	key: 1,
	class: "media-detail__credit"
}, ri = { class: "media-detail__cast" }, ii = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let n = e, a = t, o = j(() => n.item.type === "audio" ? "music" : n.item.type === "image" ? "image" : n.item.type === "series" ? "tv" : "film"), s = j(() => n.item.actors?.slice(0, 8) ?? []), c = j(() => {
			let e = n.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(r).padStart(2, "0") : String(r);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), l = G(!1), u = G(null);
		function d() {
			l.value = !0;
		}
		return U(() => {
			u.value?.complete && (l.value = !0);
		}), (t, n) => (W(), P("article", Lr, [
			e.item.poster_url ? (W(), P("div", {
				key: 0,
				class: "media-detail__ambient",
				style: V({ backgroundImage: `url(${e.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : N("", !0),
			F("div", Rr, [e.showBack ? (W(), M(i, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: n[0] ||= (e) => a("back")
			}, {
				default: Q(() => [...n[7] ||= [I("Back", -1)]]),
				_: 1
			})) : N("", !0)]),
			F("div", zr, [F("div", Br, [e.item.poster_url ? (W(), P("img", {
				key: 0,
				ref_key: "imgEl",
				ref: u,
				class: B(["media-detail__img", { "is-loaded": l.value }]),
				src: e.item.poster_url,
				alt: e.item.name,
				decoding: "async",
				onLoad: d
			}, null, 42, Vr)) : (W(), P("div", Hr, [L(r, { name: o.value }, null, 8, ["name"])]))]), F("div", Ur, [
				F("h1", Wr, J(e.item.name), 1),
				F("div", Gr, [
					e.item.year ? (W(), P("span", Kr, [L(r, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), I(J(e.item.year), 1)])) : N("", !0),
					e.item.rating ? (W(), P("span", qr, J(e.item.rating), 1)) : N("", !0),
					e.item.runtime ? (W(), P("span", Jr, J(e.item.runtime) + "m", 1)) : N("", !0),
					F("span", Yr, J(e.item.type), 1)
				]),
				e.item.genres?.length ? (W(), P("div", Xr, [(W(!0), P(A, null, K(e.item.genres, (e) => (W(), M(er, {
					key: e,
					size: "sm"
				}, {
					default: Q(() => [I(J(e), 1)]),
					_: 2
				}, 1024))), 128))])) : N("", !0),
				F("p", Zr, J(e.item.overview || "No overview available."), 1),
				F("div", Qr, [
					L(i, {
						variant: "solid",
						"left-icon": "play",
						onClick: n[1] ||= (t) => a("play", e.item)
					}, {
						default: Q(() => [...n[8] ||= [I("Play", -1)]]),
						_: 1
					}),
					c.value ? (W(), M(i, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: n[2] ||= (t) => a("resume", e.item)
					}, {
						default: Q(() => [n[9] ||= I(" Resume ", -1), F("span", $r, J(c.value), 1)]),
						_: 1
					})) : N("", !0),
					L(i, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: n[3] ||= (t) => a("watchlist", e.item)
					}, {
						default: Q(() => [...n[10] ||= [I("Watchlist", -1)]]),
						_: 1
					})
				]),
				e.item.director || s.value.length ? (W(), P("dl", ei, [e.item.director ? (W(), P("div", ti, [n[11] ||= F("dt", null, "Director", -1), F("dd", null, J(e.item.director), 1)])) : N("", !0), s.value.length ? (W(), P("div", ni, [n[12] ||= F("dt", null, "Cast", -1), F("dd", ri, [(W(!0), P(A, null, K(s.value, (e) => (W(), M(er, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: Q(() => [I(J(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : N("", !0)])) : N("", !0)
			])]),
			e.similarLoading || e.similar.length ? (W(), M(qn, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: e.similar,
				loading: e.similarLoading,
				"hide-when-empty": "",
				onPlay: n[4] ||= (e) => a("play", e),
				onWatchlist: n[5] ||= (e) => a("watchlist", e),
				onInfo: n[6] ||= (e) => a("info", e)
			}, null, 8, ["items", "loading"])) : N("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), ai = { class: "media-detail-page" }, oi = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, si = { class: "media-detail-page__loading-hero" }, ci = { class: "media-detail-page__loading-info" }, li = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "MediaDetailPage",
	setup(t) {
		let r = z("apiBase", ""), a = j(() => typeof r == "string" ? r : r?.value ?? ""), s = Ie(), c = Le(), l = Tt(), u = n(), d = G(null), f = G([]), m = G(!0), h = G(!1), g = G(null), _ = j(() => String(s.params.id ?? "")), v = j(() => l.resumePositionFor(_.value)), y = null, b = !1;
		function x(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function S(e, t) {
			let n = t.genres?.[0];
			if (!n) {
				f.value = [];
				return;
			}
			let r = y, i = () => b || r !== y;
			h.value = !0;
			try {
				let o = Yn(a.value, {
					genres: [n],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, r?.signal);
				if (i()) return;
				f.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (i() || x(e)) return;
				f.value = [];
			} finally {
				i() || (h.value = !1);
			}
		}
		async function C() {
			let t = _.value;
			if (y?.abort(), y = typeof AbortController < "u" ? new AbortController() : null, m.value = !0, g.value = null, f.value = [], !t) {
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
		U(C), Z(_, C), H(() => {
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
		return (e, t) => (W(), P("div", ai, [m.value ? (W(), P("div", oi, [F("div", si, [L(o, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), F("div", ci, [
			L(o, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			L(o, {
				variant: "text",
				lines: 4
			}),
			L(o, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : g.value ? (W(), M(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: g.value
		}, {
			actions: Q(() => [L(i, {
				variant: "solid",
				onClick: C
			}, {
				default: Q(() => [...t[0] ||= [I("Retry", -1)]]),
				_: 1
			}), L(i, {
				variant: "ghost",
				onClick: O
			}, {
				default: Q(() => [...t[1] ||= [I("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : d.value ? (W(), M(ii, {
			key: 2,
			item: d.value,
			"resume-seconds": v.value,
			similar: f.value,
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
		])) : N("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]);
//#endregion
//#region src/components/player/format-time.ts
function ui(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var di = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], fi = { class: "scrubber__track" }, pi = ["title"], mi = { class: "scrubber__time numeric" }, hi = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let r = e, i = n, a = G(null), o = G(!1), s = G(!1), c = G(0), l = G(0), u = (e) => Math.min(1, Math.max(0, e)), d = j(() => o.value ? c.value : r.duration > 0 ? u(r.position / r.duration) : 0), f = j(() => r.duration > 0 ? u(r.buffered / r.duration) : 0), p = j(() => (o.value || s.value) && r.duration > 0), m = j(() => o.value ? c.value : l.value), h = j(() => m.value * r.duration), g = j(() => p.value ? r.thumbnailAt?.(h.value) ?? null : null), _ = j(() => g.value ? `url("${g.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), v = j(() => `${Math.min(96, Math.max(4, m.value * 100))}%`), y = j(() => r.duration > 0 ? r.chapters.filter((e) => e.start > 0 && e.start < r.duration).map((e) => ({
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
		}), (t, n) => (W(), P("div", {
			ref_key: "trackEl",
			ref: a,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(e.duration),
			"aria-valuenow": Math.round(e.position),
			"aria-valuetext": Y(ui)(e.position),
			"aria-label": "Seek",
			onPointerdown: x,
			onPointermove: S,
			onPointerup: C,
			onPointercancel: C,
			onPointerenter: w,
			onPointerleave: T,
			onKeydown: E
		}, [F("div", fi, [
			F("div", {
				class: "scrubber__buffered",
				style: V({ width: `${f.value * 100}%` })
			}, null, 4),
			F("div", {
				class: "scrubber__played",
				style: V({ width: `${d.value * 100}%` })
			}, null, 4),
			(W(!0), P(A, null, K(y.value, (e, t) => (W(), P("span", {
				key: t,
				class: "scrubber__tick",
				style: V({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, pi))), 128)),
			F("div", {
				class: B(["scrubber__head", { "is-dragging": o.value }]),
				style: V({ left: `${d.value * 100}%` })
			}, null, 6)
		]), p.value ? (W(), P("div", {
			key: 0,
			class: "scrubber__preview",
			style: V({ left: v.value }),
			"aria-hidden": "true"
		}, [g.value ? (W(), P("div", {
			key: 0,
			class: "scrubber__thumb",
			style: V({ backgroundImage: _.value })
		}, null, 4)) : N("", !0), F("span", mi, J(Y(ui)(h.value)), 1)], 4)) : N("", !0)], 40, di));
	}
}), [["__scopeId", "data-v-b2711211"]]), gi = [
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
], _i = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, vi = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function yi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function bi(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function xi(e, t) {
	switch (e.key) {
		case " ": return yi(e.target) ? !1 : (t.playPause(), !0);
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
function Si(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || bi(n.target) || xi(n, e) && n.preventDefault();
	}
	U(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), H(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var Ci = { class: "shortcuts__head" }, wi = { class: "shortcuts__grid" }, Ti = { class: "shortcuts__keys" }, Ei = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, Di = {
	key: 1,
	class: "shortcuts__key"
}, Oi = { class: "shortcuts__label" }, ki = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => gi }
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = G(null);
		return u(a, Se(n, "open"), {
			lockScroll: !1,
			onEscape: () => (i("close"), !0)
		}), (t, n) => e.open ? (W(), P("div", {
			key: 0,
			class: "shortcuts",
			onClick: n[1] ||= Oe((e) => i("close"), ["self"])
		}, [F("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [F("div", Ci, [n[2] ||= F("h3", { class: "shortcuts__title" }, "Keyboard", -1), L(d, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: n[0] ||= (e) => i("close")
		})]), F("ul", wi, [(W(!0), P(A, null, K(e.shortcuts, (e) => (W(), P("li", {
			key: e.id,
			class: "shortcuts__row"
		}, [F("span", Ti, [(W(!0), P(A, null, K(e.keys, (e, t) => (W(), P(A, { key: t }, [e === "–" ? (W(), P("span", Ei, "–")) : (W(), P("kbd", Di, [Y(_i)[e] ? (W(), M(r, {
			key: 0,
			name: Y(_i)[e],
			label: Y(vi)[e] ?? e
		}, null, 8, ["name", "label"])) : (W(), P(A, { key: 1 }, [I(J(e), 1)], 64))]))], 64))), 128))]), F("span", Oi, J(e.label), 1)]))), 128))])], 512)])) : N("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), Ai = { class: "volume" }, ji = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "VolumeControl",
	setup(e) {
		let t = Tt(), n = $(), r = j(() => t.muted ? 0 : t.volume), i = j(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function a(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return Z(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (W(), P("div", Ai, [L(d, {
			name: i.value,
			label: Y(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => Y(t).toggleMute()
		}, null, 8, ["name", "label"]), L(y, {
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
}), [["__scopeId", "data-v-2768c5e3"]]), Mi = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		], n = Tt(), r = j(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function i(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (W(), M(_, {
			class: "speed-menu",
			"model-value": Y(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": i
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), Ni = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = Tt(), r = $(), i = j(() => t.qualities.length > 0);
		function a(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => i.value ? (W(), M(_, {
			key: 0,
			class: "quality-menu",
			"model-value": Y(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"])) : N("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]);
//#endregion
//#region src/components/player/captions.ts
function Pi(e) {
	if (!e) return [];
	let t = typeof e.length == "number" ? e.length : 0, n = [];
	for (let r = 0; r < t; r++) {
		let t = e[r];
		t != null && n.push(t);
	}
	return n;
}
function Fi(e) {
	return e.kind === "subtitles" || e.kind === "captions";
}
function Ii(e, t) {
	return e.language || e.label || `track-${t}`;
}
function Li(e) {
	if (!e) return "";
	try {
		let t = Intl.DisplayNames;
		if (t) return new t(["en"], { type: "language" }).of(e) ?? e;
	} catch {}
	return e;
}
function Ri(e) {
	return e ? Pi(e.textTracks).filter(Fi).map((e, t) => ({
		index: t,
		language: Ii(e, t),
		label: e.label || Li(e.language) || `Track ${t + 1}`,
		kind: e.kind
	})) : [];
}
function zi(e) {
	let t = e?.audioTracks;
	return Pi(t).map((e, t) => ({
		index: t,
		language: e.language || e.id || `audio-${t}`,
		label: e.label || Li(e.language) || `Audio ${t + 1}`,
		kind: "audio"
	}));
}
function Bi(e, t) {
	return !e || t == null ? null : Pi(e.textTracks).filter(Fi).find((e, n) => Ii(e, n) === t) ?? null;
}
function Vi(e, t) {
	return Bi(e, t) != null;
}
function Hi(e, t) {
	e && Pi(e.textTracks).filter(Fi).forEach((e, n) => {
		try {
			e.mode = Ii(e, n) === t ? "hidden" : "disabled";
		} catch {}
	});
}
function Ui(e, t) {
	let n = e?.audioTracks;
	Pi(n).forEach((e, n) => {
		try {
			e.enabled = n === t;
		} catch {}
	});
}
function Wi(e) {
	let t = e?.audioTracks;
	return Pi(t).findIndex((e) => e.enabled);
}
var Gi = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'",
	nbsp: "\xA0",
	lrm: "‎",
	rlm: "‏"
};
function Ki(e) {
	try {
		return e > 0 && e <= 1114111 ? String.fromCodePoint(e) : "";
	} catch {
		return "";
	}
}
function qi(e) {
	return e.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (e, t) => {
		if (t[0] === "#") {
			let n = t[1]?.toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
			return Number.isFinite(n) && Ki(n) || e;
		}
		let n = t.toLowerCase();
		return Object.prototype.hasOwnProperty.call(Gi, n) ? Gi[n] : e;
	});
}
function Ji(e) {
	return e ? e.replace(/<[^>]*>/g, "").split(/\r?\n/).map((e) => qi(e).trim()).filter((e) => e.length > 0) : [];
}
function Yi(e) {
	if (!e) return [];
	let t = Pi(e.activeCues), n = [];
	for (let e of t) n.push(...Ji(e.text));
	return n;
}
var Xi = {
	sm: .75,
	md: 1,
	lg: 1.35,
	xl: 1.75
}, Zi = [
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
], Qi = [
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
], $i = [
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
], ea = [
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
function ta(e) {
	switch (e) {
		case "semi": return "rgba(0, 0, 0, 0.6)";
		case "solid": return "#000000";
		default: return "transparent";
	}
}
function na(e) {
	switch (e) {
		case "drop-shadow": return "0 2px 6px rgba(0, 0, 0, 0.85)";
		case "outline": return "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 3px rgba(0, 0, 0, 0.9)";
		case "raised": return "1px 1px 0 rgba(0, 0, 0, 0.9), 2px 2px 3px rgba(0, 0, 0, 0.6)";
		default: return "none";
	}
}
function ra(e) {
	return {
		"--cap-scale": String(Xi[e.size] ?? 1),
		"--cap-color": e.textColor,
		"--cap-bg": ta(e.background),
		"--cap-pad": e.background === "none" ? "0" : "0.12em 0.42em",
		"--cap-shadow": na(e.edge)
	};
}
//#endregion
//#region src/components/player/CaptionOverlay.vue
var ia = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "CaptionOverlay",
	props: {
		video: {},
		language: {},
		styleConfig: {},
		lifted: { type: Boolean }
	},
	setup(e, { expose: t }) {
		let n = e, r = G([]), i = j(() => ra(n.styleConfig)), a = null;
		function o() {
			r.value = Yi(a);
		}
		function s() {
			a?.removeEventListener("cuechange", o), a = null;
		}
		function c() {
			s(), Hi(n.video, n.language);
			let e = Bi(n.video, n.language);
			e ? (a = e, e.addEventListener("cuechange", o), r.value = Yi(e)) : r.value = [];
		}
		return Z(() => [n.video, n.language], c, { immediate: !0 }), H(s), t({ lines: r }), (t, n) => r.value.length ? (W(), P("div", {
			key: 0,
			class: B(["player__captions", { "is-lifted": e.lifted }]),
			style: V(i.value)
		}, [(W(!0), P(A, null, K(r.value, (e, t) => (W(), P("p", {
			key: t,
			class: "player__caption-line"
		}, J(e), 1))), 128))], 6)) : N("", !0);
	}
}), [["__scopeId", "data-v-15a0f3c5"]]), aa = ["aria-label", "aria-expanded"], oa = { class: "capmenu__head" }, sa = ["aria-checked", "tabindex"], ca = { class: "capmenu__check" }, la = [
	"aria-checked",
	"tabindex",
	"onClick"
], ua = { class: "capmenu__check" }, da = { class: "capmenu__optlabel" }, fa = [
	"aria-checked",
	"tabindex",
	"onClick"
], pa = { class: "capmenu__check" }, ma = { class: "capmenu__optlabel" }, ha = { class: "capmenu__style" }, ga = { class: "capmenu__field" }, _a = { class: "capmenu__field" }, va = { class: "capmenu__field" }, ya = { class: "capmenu__field" }, ba = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = Tt(), o = $(), s = G(null), c = G(null), l = j(() => a.subtitleLang), f = j(() => n.tracks.some((e) => e.language === l.value)), p = j(() => f.value ? "captions" : "captions-off"), m = j(() => f.value ? n.tracks.findIndex((e) => e.language === l.value) + 1 : 0), h = j(() => n.activeAudio >= 0 ? n.activeAudio : 0);
		function g(e) {
			i("update:open", e);
		}
		function v() {
			g(!1);
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
			let t = x(e, n.tracks.length + 1, m.value);
			t !== null && y(t === 0 ? null : n.tracks[t - 1].language);
		}
		function C(e) {
			let t = x(e, n.audioTracks.length, h.value);
			t !== null && b(n.audioTracks[t].index);
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
		u(c, Se(n, "open"), {
			lockScroll: !1,
			onEscape: () => (v(), !0)
		});
		function O(e) {
			s.value && !s.value.contains(e.target) && v();
		}
		return Z(() => n.open, (e) => {
			typeof document > "u" || (e ? document.addEventListener("pointerdown", O, !0) : document.removeEventListener("pointerdown", O, !0));
		}, { immediate: !0 }), H(() => {
			typeof document < "u" && document.removeEventListener("pointerdown", O, !0);
		}), (t, n) => (W(), P("div", {
			ref_key: "rootEl",
			ref: s,
			class: "capmenu"
		}, [F("button", {
			type: "button",
			class: B(["capmenu__btn", { "is-active": f.value }]),
			"aria-label": f.value ? "Captions (on)" : "Captions (off)",
			"aria-haspopup": "dialog",
			"aria-expanded": e.open,
			onClick: n[0] ||= (t) => g(!e.open)
		}, [L(r, { name: p.value }, null, 8, ["name"])], 10, aa), e.open ? (W(), P("div", {
			key: 0,
			ref_key: "panelEl",
			ref: c,
			class: "capmenu__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Captions and subtitles",
			tabindex: "-1"
		}, [
			F("div", oa, [n[2] ||= F("h3", { class: "capmenu__title" }, "Subtitles", -1), L(d, {
				name: "x",
				label: "Close",
				size: "sm",
				onClick: v
			})]),
			F("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Subtitle track",
				onKeydown: S
			}, [F("button", {
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": !f.value,
				tabindex: m.value === 0 ? 0 : -1,
				onClick: n[1] ||= (e) => y(null)
			}, [F("span", ca, [f.value ? N("", !0) : (W(), M(r, {
				key: 0,
				name: "check"
			}))]), n[3] ||= F("span", { class: "capmenu__optlabel" }, "Off", -1)], 8, sa), (W(!0), P(A, null, K(e.tracks, (e, t) => (W(), P("button", {
				key: e.language,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": l.value === e.language,
				tabindex: m.value === t + 1 ? 0 : -1,
				onClick: (t) => y(e.language)
			}, [F("span", ua, [l.value === e.language ? (W(), M(r, {
				key: 0,
				name: "check"
			})) : N("", !0)]), F("span", da, J(e.label), 1)], 8, la))), 128))], 32),
			e.audioTracks.length > 1 ? (W(), P(A, { key: 0 }, [n[4] ||= F("h3", { class: "capmenu__title capmenu__title--sub" }, "Audio", -1), F("div", {
				class: "capmenu__group",
				role: "radiogroup",
				"aria-label": "Audio track",
				onKeydown: C
			}, [(W(!0), P(A, null, K(e.audioTracks, (t) => (W(), P("button", {
				key: t.index,
				type: "button",
				class: "capmenu__opt",
				role: "radio",
				"aria-checked": e.activeAudio === t.index,
				tabindex: h.value === t.index ? 0 : -1,
				onClick: (e) => b(t.index)
			}, [F("span", pa, [e.activeAudio === t.index ? (W(), M(r, {
				key: 0,
				name: "check"
			})) : N("", !0)]), F("span", ma, J(t.label), 1)], 8, fa))), 128))], 32)], 64)) : N("", !0),
			n[9] ||= F("h3", { class: "capmenu__title capmenu__title--sub" }, "Caption style", -1),
			F("div", ha, [
				F("div", ga, [n[5] ||= F("span", { class: "capmenu__fieldlabel" }, "Size", -1), L(_, {
					"model-value": Y(o).captionStyle.size,
					options: Y(Zi),
					label: "Caption size",
					"onUpdate:modelValue": w
				}, null, 8, ["model-value", "options"])]),
				F("div", _a, [n[6] ||= F("span", { class: "capmenu__fieldlabel" }, "Color", -1), L(_, {
					"model-value": Y(o).captionStyle.textColor,
					options: Y(Qi),
					label: "Caption color",
					"onUpdate:modelValue": T
				}, null, 8, ["model-value", "options"])]),
				F("div", va, [n[7] ||= F("span", { class: "capmenu__fieldlabel" }, "Background", -1), L(_, {
					"model-value": Y(o).captionStyle.background,
					options: Y($i),
					label: "Caption background",
					"onUpdate:modelValue": E
				}, null, 8, ["model-value", "options"])]),
				F("div", ya, [n[8] ||= F("span", { class: "capmenu__fieldlabel" }, "Edge", -1), L(_, {
					"model-value": Y(o).captionStyle.edge,
					options: Y(ea),
					label: "Caption edge",
					"onUpdate:modelValue": D
				}, null, 8, ["model-value", "options"])])
			])
		], 512)) : N("", !0)], 512));
	}
}), [["__scopeId", "data-v-aff48a56"]]), xa = 32, Sa = 18, Ca = 250, wa = (e) => e < 0 ? 0 : e > 255 ? 255 : Math.round(e);
function Ta(e, t, n, r, i, a, o) {
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
		r: wa(d / m),
		g: wa(f / m),
		b: wa(p / m)
	};
}
function Ea(e, t, n) {
	let r = Math.max(1, Math.round(t * .25));
	return {
		left: Ta(e, t, n, 0, 0, r, n),
		right: Ta(e, t, n, t - r, 0, t, n),
		center: Ta(e, t, n, 0, 0, t, n)
	};
}
function Da({ r: e, g: t, b: n }) {
	return `rgb(${e}, ${t}, ${n})`;
}
function Oa({ r: e, g: t, b: n }, r) {
	return `rgba(${e}, ${t}, ${n}, ${r < 0 ? 0 : r > 1 ? 1 : r})`;
}
function ka(e, t = 1) {
	let n = (e) => {
		let n = e * t;
		return n < 0 ? 0 : n > 1 ? 1 : n;
	};
	return [
		`radial-gradient(40% 60% at 12% 30%, ${Oa(e.left, n(.55))}, transparent 70%)`,
		`radial-gradient(45% 55% at 88% 70%, ${Oa(e.right, n(.5))}, transparent 70%)`,
		`radial-gradient(50% 50% at 50% 50%, ${Oa(e.center, n(.3))}, transparent 75%)`
	].join(", ");
}
function Aa(e) {
	return !!e && !e.charging && e.level <= .2;
}
//#endregion
//#region src/components/player/AmbientCanvas.vue
var ja = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
			r.value = Aa(i);
		}
		let o = j(() => n.enabled && !n.reducedMotion && !r.value), s = j(() => Math.min(1, .85 * Math.max(0, n.intensity))), c = G(null), l = null, u = null, d = !1, f = !1;
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
				c.value = ka(Ea(n, 32, 18));
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
		Z(() => [
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
		let T = j(() => {
			let e = { opacity: String(s.value) };
			return c.value && (e.background = c.value), e;
		});
		return t({ sampleNow: m }), (e, t) => (W(), P("div", {
			class: B(["player__ambient", { "is-active": o.value }]),
			style: V(o.value ? T.value : void 0),
			"aria-hidden": "true"
		}, null, 6));
	}
}), [["__scopeId", "data-v-404fe1d9"]]), Ma = {
	class: "resume",
	role: "region",
	"aria-label": "Resume playback"
}, Na = { class: "resume__label" }, Pa = { class: "resume__time numeric" }, Fa = { class: "resume__actions" }, Ia = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "ResumePrompt",
	props: { seconds: {} },
	emits: ["resume", "restart"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, i) => (W(), P("div", Ma, [F("p", Na, [
			i[2] ||= I(" Resume from ", -1),
			F("span", Pa, J(Y(ui)(e.seconds)), 1),
			i[3] ||= I("? ", -1)
		]), F("div", Fa, [F("button", {
			type: "button",
			class: "resume__btn resume__btn--amber",
			onClick: i[0] ||= (e) => n("resume")
		}, [L(r, { name: "play" }), i[4] ||= F("span", null, "Resume", -1)]), F("button", {
			type: "button",
			class: "resume__btn resume__btn--ghost",
			onClick: i[1] ||= (e) => n("restart")
		}, [L(r, { name: "rewind" }), i[5] ||= F("span", null, "Start over", -1)])])]));
	}
}), [["__scopeId", "data-v-766eae6c"]]), La = [
	"mp4",
	"m4v",
	"webm",
	"ogg",
	"ogv",
	"mov"
], Ra = [
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
], za = new Set(Ra);
function Ba(e) {
	if (!e) return "";
	let t = e.split(/[?#]/)[0], n = t.slice(t.lastIndexOf("/") + 1), r = n.lastIndexOf(".");
	return r <= 0 || r === n.length - 1 ? "" : n.slice(r + 1).toLowerCase();
}
function Va(...e) {
	return e.some((e) => za.has(Ba(e)));
}
function Ha(e) {
	let t = e?.error?.code;
	return t === 3 || t === 4;
}
var Ua = 8, Wa = 15, Ga = 2 * Math.PI * 15;
function Ka(e, t, n = Ga) {
	return t > 0 ? n * (1 - Math.max(0, Math.min(1, e / t))) : n;
}
//#endregion
//#region src/components/player/UpNext.vue?vue&type=script&setup=true&lang.ts
var qa = {
	class: "upnext",
	role: "region",
	"aria-label": "Up next"
}, Ja = ["src"], Ya = { class: "upnext__body" }, Xa = { class: "upnext__title" }, Za = {
	key: 0,
	class: "upnext__cd numeric"
}, Qa = { class: "upnext__actions" }, $a = {
	key: 1,
	class: "upnext__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, eo = ["r"], to = [
	"r",
	"stroke-dasharray",
	"stroke-dashoffset"
], no = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = j(() => n.posterUrl ?? n.media.poster_url ?? null), o = j(() => Ka(n.remaining, n.total));
		return (t, n) => (W(), P("aside", qa, [
			a.value ? (W(), P("img", {
				key: 0,
				class: "upnext__thumb",
				src: a.value,
				alt: "",
				loading: "lazy"
			}, null, 8, Ja)) : N("", !0),
			F("div", Ya, [
				n[3] ||= F("p", { class: "upnext__eyebrow" }, "Up next", -1),
				F("h4", Xa, J(e.media.name), 1),
				e.counting ? (W(), P("p", Za, "Starts in " + J(Math.max(0, e.remaining)) + "s", 1)) : N("", !0),
				F("div", Qa, [F("button", {
					type: "button",
					class: "upnext__btn upnext__btn--amber",
					onClick: n[0] ||= (e) => i("play-now")
				}, [L(r, { name: "play" }), n[2] ||= F("span", null, "Play now", -1)]), F("button", {
					type: "button",
					class: "upnext__btn upnext__btn--ghost",
					onClick: n[1] ||= (e) => i("cancel")
				}, "Cancel")])
			]),
			e.counting ? (W(), P("svg", $a, [F("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "rgba(255, 255, 255, 0.2)",
				"stroke-width": "3"
			}, null, 8, eo), F("circle", {
				cx: "18",
				cy: "18",
				r: Y(15),
				fill: "none",
				stroke: "var(--accent)",
				"stroke-width": "3",
				"stroke-linecap": "round",
				"stroke-dasharray": Y(Ga),
				"stroke-dashoffset": o.value,
				transform: "rotate(-90 18 18)"
			}, null, 8, to)])) : N("", !0)
		]));
	}
}), [["__scopeId", "data-v-f81cfb02"]]), ro = {
	class: "transcode",
	role: "alert"
}, io = { class: "transcode__card" }, ao = { class: "transcode__body" }, oo = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "TranscodeNotice",
	props: { title: {} },
	emits: ["back"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, i) => (W(), P("div", ro, [F("div", io, [
			L(r, {
				name: "alert",
				class: "transcode__icon"
			}),
			i[3] ||= F("h3", { class: "transcode__heading" }, "Can’t play this file here", -1),
			F("p", ao, [e.title ? (W(), P(A, { key: 0 }, [I("“" + J(e.title) + "” is", 1)], 64)) : (W(), P(A, { key: 1 }, [I("This title is")], 64)), i[1] ||= I(" in a format your browser can’t play directly (for example MKV or HEVC). Transcoding isn’t available yet. ", -1)]),
			F("button", {
				type: "button",
				class: "transcode__back",
				onClick: i[0] ||= (e) => n("back")
			}, [L(r, { name: "arrow-left" }), i[2] ||= F("span", null, "Go back", -1)])
		])]));
	}
}), [["__scopeId", "data-v-4b751a55"]]), so = { class: "player__stage" }, co = ["src", "poster"], lo = { class: "player__meta" }, uo = { class: "player__meta-text" }, fo = { class: "player__title" }, po = { class: "player__sub numeric" }, mo = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, ho = {
	key: 0,
	class: "player__center"
}, go = ["aria-label"], _o = { class: "player__btnrow" }, vo = ["aria-label"], yo = { class: "player__time numeric" }, bo = ["aria-label", "aria-pressed"], xo = ["aria-label", "aria-pressed"], So = ["aria-label"], Co = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
	setup(e, { emit: t }) {
		let n = e, i = t, a = Tt(), o = $(), s = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], c = G(null), l = G(null), u = G(!0), d = G(!1), f = G(!1), p = G(!1), m = G(!1), h = G(!1), g = G(!1), _ = j(() => m.value ? 1.35 : 1), v = G(Va(n.streamUrl, n.media.path)), y = G(a.resumePositionFor(n.media.id) ?? 0), b = G(!v.value && y.value > 0), x = null, S = G(!1), C = G(8), w, T = j(() => a.upNext);
		function E() {
			v.value = Va(n.streamUrl, n.media.path), y.value = a.resumePositionFor(n.media.id) ?? 0, b.value = !v.value && y.value > 0, x = null, k(), S.value = !1;
		}
		function D(e) {
			let t = c.value;
			t && (t.duration && t.duration > 0 ? t.currentTime = Math.min(t.duration, Math.max(0, e)) : x = Math.max(0, e));
		}
		function O() {
			D(y.value), b.value = !1, c.value?.play()?.catch(() => {});
		}
		function ee() {
			x = null, D(0), a.clearResume(n.media.id), b.value = !1, c.value?.play()?.catch(() => {});
		}
		function k() {
			w &&= (clearInterval(w), void 0);
		}
		function te() {
			C.value = 8, k(), w = setInterval(() => {
				--C.value, C.value <= 0 && (k(), re());
			}, 1e3);
		}
		function ne() {
			a.upNext && (S.value = !0, o.autoplay && te());
		}
		function re() {
			k(), S.value = !1;
			let e = a.next(n.streamUrlFor);
			e && i("play-next", e);
		}
		function ie() {
			k(), S.value = !1;
		}
		function ae() {
			Ha(c.value) && (v.value = !0);
		}
		let oe = G([]), se = G([]), ce = G(-1), le = G(!1), ue = a.subtitleLang, de = j(() => oe.value.some((e) => e.language === a.subtitleLang));
		function fe() {
			let e = c.value;
			oe.value = Ri(e), se.value = zi(e), ce.value = Wi(e);
		}
		function pe() {
			if (de.value) ue = a.subtitleLang, a.setSubtitle(null);
			else {
				let e = ue && oe.value.some((e) => e.language === ue) ? ue : oe.value[0]?.language ?? null;
				a.setSubtitle(e);
			}
			i("captions");
		}
		function me(e) {
			Ui(c.value, e), ce.value = e;
		}
		let he = null, ge, _e = j(() => {
			let e = [];
			n.media.year && e.push({ text: String(n.media.year) }), n.media.rating && e.push({
				text: n.media.rating,
				cert: !0
			}), n.media.runtime && e.push({ text: `${n.media.runtime}m` });
			let t = n.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function R() {
			let e = c.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function z(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function ve() {
			a.play();
		}
		function V() {
			a.pause();
		}
		function ye() {
			let e = c.value;
			e && (a.updateProgress(e.currentTime, e.duration, z(e)), a.setMediaPositionState());
		}
		function q() {
			let e = c.value;
			e && (e.volume = a.volume, e.muted = a.muted, e.playbackRate = a.rate, x !== null && (e.currentTime = e.duration ? Math.min(e.duration, x) : x, x = null), a.updateProgress(e.currentTime, e.duration, z(e)), a.setMediaPositionState(), fe());
		}
		function be() {
			let e = c.value;
			e && a.updateProgress(e.currentTime, e.duration, z(e));
		}
		function xe() {
			let e = c.value;
			e && (Math.abs(e.volume - a.volume) > .001 && a.setVolume(e.volume), e.muted !== a.muted && a.toggleMute());
		}
		function Se() {
			let e = c.value;
			e && e.playbackRate !== a.rate && a.setRate(e.playbackRate);
		}
		function X(e) {
			let t = c.value;
			t && a.duration > 0 && (t.currentTime = Math.min(a.duration, Math.max(0, e)));
		}
		function Ce() {
			f.value = !0, Fe();
		}
		function we() {
			f.value = !1, Fe();
		}
		function Te(e) {
			let t = s.reduce((e, t, n) => Math.abs(t - a.rate) < Math.abs(s[e] - a.rate) ? n : e, 0), n = s[Math.min(s.length - 1, Math.max(0, t + e))];
			a.setRate(n);
		}
		Si({
			playPause: R,
			seekBy: (e) => X(a.position + e),
			frameStep: (e) => {
				a.playing || X(a.position + e / 30);
			},
			volumeBy: (e) => a.setVolume(a.volume + e),
			toggleMute: Q,
			toggleFullscreen: De,
			toggleCaptions: pe,
			toggleTheater: Ee,
			togglePip: Ae,
			seekToPercent: (e) => X(e * a.duration),
			speedStep: Te,
			toggleHelp: () => {
				p.value = !p.value;
			}
		}, { enabled: () => !p.value && !le.value });
		function Q() {
			a.toggleMute();
		}
		function Ee() {
			m.value = !m.value, i("theater", m.value);
		}
		Z(() => a.muted, (e) => {
			let t = c.value;
			t && t.muted !== e && (t.muted = e);
		}), Z(() => a.volume, (e) => {
			let t = c.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), Z(() => a.rate, (e) => {
			let t = c.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function De() {
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
			ge &&= (clearTimeout(ge), void 0);
		}
		function Pe() {
			Ne(), !(!a.playing || f.value) && (ge = setTimeout(() => {
				a.playing && !f.value && (u.value = !1);
			}, n.idleTimeout ?? 3e3));
		}
		function Fe() {
			u.value = !0, Pe();
		}
		Z(() => a.playing, (e) => {
			e ? (b.value = !1, ie(), Pe()) : (Ne(), u.value = !0);
		});
		let Ie = null;
		return U(() => {
			a.setCurrent(n.media, {
				resetPosition: !1,
				streamUrl: n.streamUrl
			}), typeof document < "u" && (document.addEventListener("fullscreenchange", ke), g.value = document.pictureInPictureEnabled === !0), Ie = a.bindMediaSession({
				onPlay: () => void c.value?.play()?.catch(() => {}),
				onPause: () => c.value?.pause(),
				onSeek: (e) => X(e)
			}), he = c.value?.textTracks ?? null, he?.addEventListener?.("addtrack", fe), he?.addEventListener?.("removetrack", fe), fe();
		}), Z(() => n.media, (e) => {
			a.setCurrent(e, {
				resetPosition: !1,
				streamUrl: n.streamUrl
			}), E();
		}), H(() => {
			Ne(), k(), typeof document < "u" && document.removeEventListener("fullscreenchange", ke), Ie?.(), he?.removeEventListener?.("addtrack", fe), he?.removeEventListener?.("removetrack", fe);
		}), (t, n) => (W(), P("div", {
			ref_key: "containerRef",
			ref: l,
			class: B(["player", {
				"is-chrome-hidden": !u.value,
				"is-theater": m.value
			}]),
			onPointermove: Fe,
			onPointerdown: Fe,
			onFocusin: Fe
		}, [L(ja, {
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
		]), F("div", so, [
			F("video", {
				ref_key: "videoRef",
				ref: c,
				class: "player__video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: ve,
				onPause: V,
				onTimeupdate: ye,
				onLoadedmetadata: q,
				onProgress: be,
				onVolumechange: xe,
				onRatechange: Se,
				onEnded: ne,
				onError: ae,
				onEnterpictureinpicture: je,
				onLeavepictureinpicture: Me,
				onClick: R
			}, null, 40, co),
			n[9] ||= F("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			n[10] ||= F("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			F("div", lo, [F("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: n[0] ||= Oe((e) => i("back"), ["stop"])
			}, [L(r, { name: "arrow-left" })]), F("div", uo, [
				n[6] ||= F("p", { class: "player__eyebrow" }, "Now playing", -1),
				F("h2", fo, J(e.media.name), 1),
				F("div", po, [(W(!0), P(A, null, K(_e.value, (e, t) => (W(), P(A, { key: t }, [t > 0 && !e.cert ? (W(), P("span", mo, "·")) : N("", !0), F("span", { class: B({ player__cert: e.cert }) }, J(e.text), 3)], 64))), 128))])
			])]),
			v.value ? N("", !0) : (W(), P("div", ho, [F("button", {
				type: "button",
				class: B(["player__bigplay", { "is-playing": Y(a).playing }]),
				"aria-label": Y(a).playing ? "Pause" : "Play",
				onClick: Oe(R, ["stop"])
			}, [L(r, { name: Y(a).playing ? "pause" : "play" }, null, 8, ["name"])], 10, go)])),
			L(ia, {
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
			v.value ? N("", !0) : (W(), P("div", {
				key: 1,
				class: "player__controls",
				onClick: n[3] ||= Oe(() => {}, ["stop"])
			}, [L(hi, {
				position: Y(a).position,
				duration: Y(a).duration,
				buffered: Y(a).buffered,
				chapters: e.chapters,
				"thumbnail-at": e.thumbnailAt,
				onSeek: X,
				onScrubStart: Ce,
				onScrubEnd: we
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), F("div", _o, [
				F("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": Y(a).playing ? "Pause" : "Play",
					onClick: R
				}, [L(r, { name: Y(a).playing ? "pause" : "play" }, null, 8, ["name"])], 8, vo),
				F("span", yo, [
					I(J(Y(ui)(Y(a).position)), 1),
					n[7] ||= F("span", { class: "player__sep" }, " / ", -1),
					I(J(Y(ui)(Y(a).duration)), 1)
				]),
				n[8] ||= F("span", { class: "player__grow" }, null, -1),
				L(ji),
				L(Mi),
				L(Ni, { qualities: e.qualities }, null, 8, ["qualities"]),
				L(ba, {
					open: le.value,
					"onUpdate:open": n[1] ||= (e) => le.value = e,
					tracks: oe.value,
					"audio-tracks": se.value,
					"active-audio": ce.value,
					onSelectAudio: me
				}, null, 8, [
					"open",
					"tracks",
					"audio-tracks",
					"active-audio"
				]),
				F("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: n[2] ||= (e) => p.value = !0
				}, [L(r, { name: "info" })]),
				g.value ? (W(), P("button", {
					key: 0,
					type: "button",
					class: B(["player__iconbtn", { "is-on": h.value }]),
					"aria-label": h.value ? "Exit picture-in-picture" : "Picture-in-picture",
					"aria-pressed": h.value,
					onClick: Ae
				}, [L(r, { name: "pip" })], 10, bo)) : N("", !0),
				F("button", {
					type: "button",
					class: B(["player__iconbtn", { "is-on": m.value }]),
					"aria-label": m.value ? "Exit theater mode" : "Theater mode",
					"aria-pressed": m.value,
					onClick: Ee
				}, [L(r, { name: "theater" })], 10, xo),
				F("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": d.value ? "Exit fullscreen" : "Fullscreen",
					onClick: De
				}, [L(r, { name: d.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, So)
			])])),
			b.value && !v.value ? (W(), M(Ia, {
				key: 2,
				seconds: y.value,
				onResume: O,
				onRestart: ee
			}, null, 8, ["seconds"])) : N("", !0),
			S.value && T.value && !v.value ? (W(), M(no, {
				key: 3,
				media: T.value,
				remaining: C.value,
				total: Y(8),
				counting: Y(o).autoplay,
				onPlayNow: re,
				onCancel: ie
			}, null, 8, [
				"media",
				"remaining",
				"total",
				"counting"
			])) : N("", !0),
			v.value ? (W(), M(oo, {
				key: 4,
				title: e.media.name,
				onBack: n[4] ||= (e) => i("back")
			}, null, 8, ["title"])) : N("", !0),
			L(ki, {
				open: p.value,
				onClose: n[5] ||= (e) => p.value = !1
			}, null, 8, ["open"])
		])], 34));
	}
}), [["__scopeId", "data-v-853f8f80"]]), wo = { class: "player-page__stage" }, To = {
	key: 0,
	class: "player-page__skeleton",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading player"
}, Eo = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "PlayerPage",
	setup(t) {
		let n = z("apiBase", ""), r = j(() => typeof n == "string" ? n : n?.value ?? ""), a = Ie(), s = Le(), c = Tt(), l = G(null), u = G(""), d = G(!0), f = G(null), m = G(!1), h = j(() => String(a.params.id ?? "")), g = j(() => {
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
				let o = Yn(r.value, {
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
			if (_?.abort(), _ = typeof AbortController < "u" ? new AbortController() : null, d.value = !0, f.value = null, c.hideMiniPlayer(), !t) {
				f.value = "No media id provided", d.value = !1;
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
				f.value = e instanceof Error ? e.message : "Failed to load media", d.value = !1;
			}
		}
		U(S), Z(h, S), Fe(() => {
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
		return (e, t) => (W(), P("div", { class: B(["player-page", { "is-theater": m.value }]) }, [g.value && !d.value && !f.value ? (W(), P("div", {
			key: 0,
			class: "player-page__ambient",
			style: V(g.value),
			"aria-hidden": "true"
		}, null, 4)) : N("", !0), F("div", wo, [d.value ? (W(), P("div", To, [L(o, {
			variant: "rect",
			radius: "var(--radius-xl)",
			height: "100%"
		})])) : f.value ? (W(), M(p, {
			key: 1,
			class: "player-page__error",
			icon: "alert",
			title: "Couldn't play this title",
			description: f.value
		}, {
			actions: Q(() => [L(i, {
				variant: "solid",
				onClick: S
			}, {
				default: Q(() => [...t[0] ||= [I("Retry", -1)]]),
				_: 1
			}), L(i, {
				variant: "ghost",
				onClick: C
			}, {
				default: Q(() => [...t[1] ||= [I("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : l.value ? (W(), M(Co, {
			key: 2,
			media: l.value,
			"stream-url": u.value,
			"stream-url-for": b,
			onBack: C,
			onPlayNext: w,
			onTheater: T
		}, null, 8, ["media", "stream-url"])) : N("", !0)])], 2));
	}
}), [["__scopeId", "data-v-1b6296b1"]]), Do = { class: "authcard" }, Oo = { class: "authcard__body" }, ko = { class: "authcard__head" }, Ao = {
	key: 0,
	class: "authcard__eyebrow"
}, jo = { class: "authcard__brand" }, Mo = ["src", "alt"], No = { class: "authcard__wordmark" }, Po = { class: "authcard__title" }, Fo = {
	key: 1,
	class: "authcard__sub"
}, Io = {
	key: 0,
	class: "authcard__foot"
}, Lo = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "AuthCard",
	props: {
		eyebrow: {},
		title: {},
		subtitle: {}
	},
	setup(e) {
		let t = z("phlixConfig", null), n = j(() => t?.branding ?? {}), r = j(() => n.value.wordmark ?? "Phlix");
		return (t, i) => (W(), P("section", Do, [F("div", Oo, [
			F("header", ko, [
				e.eyebrow ? (W(), P("p", Ao, J(e.eyebrow), 1)) : N("", !0),
				F("div", jo, [n.value.logoSrc ? (W(), P("img", {
					key: 0,
					src: n.value.logoSrc,
					alt: n.value.logoAlt ?? r.value,
					class: "authcard__logo"
				}, null, 8, Mo)) : N("", !0), F("span", No, [I(J(r.value), 1), i[0] ||= F("span", { class: "authcard__dot" }, ".", -1)])]),
				F("h1", Po, J(e.title), 1),
				e.subtitle ? (W(), P("p", Fo, J(e.subtitle), 1)) : N("", !0)
			]),
			q(t.$slots, "default", {}, void 0, !0),
			t.$slots.footer ? (W(), P("div", Io, [q(t.$slots, "footer", {}, void 0, !0)])) : N("", !0)
		])]));
	}
}), [["__scopeId", "data-v-5ddd2bae"]]), Ro = ["for"], zo = { class: "authfield__wrap" }, Bo = [
	"id",
	"name",
	"type",
	"value",
	"placeholder",
	"autocomplete",
	"inputmode",
	"required",
	"minlength",
	"disabled",
	"aria-invalid",
	"aria-describedby"
], Vo = [
	"aria-label",
	"aria-pressed",
	"disabled"
], Ho = ["id"], Uo = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "AuthField",
	props: {
		modelValue: {},
		label: {},
		type: { default: "text" },
		id: {},
		name: {},
		placeholder: {},
		autocomplete: {},
		inputmode: {},
		error: { default: null },
		required: {
			type: Boolean,
			default: !1
		},
		minlength: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = X(), o = j(() => n.id ?? `authfield-${a}`), s = j(() => `${o.value}-msg`), c = G(!1), l = j(() => n.type === "password"), u = j(() => l.value ? c.value ? "text" : "password" : n.type);
		function d(e) {
			i("update:modelValue", e.target.value);
		}
		function f() {
			c.value = !c.value;
		}
		return (t, n) => (W(), P("div", { class: B(["authfield", {
			"is-invalid": !!e.error,
			"has-toggle": l.value
		}]) }, [
			F("label", {
				class: "authfield__label",
				for: o.value
			}, J(e.label), 9, Ro),
			F("div", zo, [F("input", {
				id: o.value,
				class: "authfield__input",
				name: e.name,
				type: u.value,
				value: e.modelValue,
				placeholder: e.placeholder,
				autocomplete: e.autocomplete,
				inputmode: e.inputmode,
				required: e.required,
				minlength: e.minlength,
				disabled: e.disabled,
				"aria-invalid": e.error ? "true" : void 0,
				"aria-describedby": e.error ? s.value : void 0,
				onInput: d
			}, null, 40, Bo), l.value ? (W(), P("button", {
				key: 0,
				type: "button",
				class: "authfield__toggle",
				"aria-label": c.value ? "Hide password" : "Show password",
				"aria-pressed": c.value,
				disabled: e.disabled,
				onClick: f
			}, [L(r, { name: c.value ? "eye-off" : "eye" }, null, 8, ["name"])], 8, Vo)) : N("", !0)]),
			F("p", {
				id: s.value,
				class: "authfield__msg",
				"aria-live": "polite"
			}, J(e.error || ""), 9, Ho)
		], 2));
	}
}), [["__scopeId", "data-v-6ca91c85"]]), Wo = Ae("auth", () => {
	let t = new c(), n = new e({
		tokenStore: t,
		baseUrl: z("apiBase", "")
	}), r = G(null), i = G(!1), a = G(null), o = G(t.getAccessToken()), s = j(() => o.value !== null), l = j(() => r.value?.is_admin === !0);
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
}), Go = {
	key: 0,
	class: "login__banner",
	role: "alert"
}, Ko = { class: "login__oauth" }, qo = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let a = t, o = Wo(), s = n(), c = Le(), l = z("phlixConfig", null), u = j(() => l?.routerBase ?? "/app"), d = j(() => `${u.value}/signup`), f = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, p = G(""), m = G(""), h = G(null), g = G(null);
		function _() {
			return h.value = p.value.trim() ? f.test(p.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", g.value = m.value ? null : "Enter your password.", !h.value && !g.value;
		}
		async function v() {
			_() && (await o.login(p.value.trim(), m.value) ? (a("success"), c.push(u.value)) : s.error(o.error ?? "Sign in failed."));
		}
		return (e, t) => {
			let n = be("RouterLink");
			return W(), M(Lo, {
				eyebrow: "Member access",
				title: "Welcome back",
				subtitle: "Sign in to continue to your cinema."
			}, {
				footer: Q(() => [t[4] ||= I(" New to Phlix? ", -1), L(n, {
					to: d.value,
					class: "login__link"
				}, {
					default: Q(() => [...t[3] ||= [I("Create an account", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: Q(() => [Y(o).error ? (W(), P("p", Go, [L(r, {
					name: "alert",
					class: "login__banner-icon"
				}), F("span", null, J(Y(o).error), 1)])) : N("", !0), F("form", {
					class: "login__form",
					novalidate: "",
					onSubmit: Oe(v, ["prevent"])
				}, [
					L(Uo, {
						modelValue: p.value,
						"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
						label: "Email",
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: "you@example.com",
						error: h.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					L(Uo, {
						modelValue: m.value,
						"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
						label: "Password",
						type: "password",
						autocomplete: "current-password",
						placeholder: "Your password",
						error: g.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					L(i, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: Y(o).loading
					}, {
						default: Q(() => [I(J(Y(o).loading ? "Signing in…" : "Sign in"), 1)]),
						_: 1
					}, 8, ["loading"]),
					e.$slots.oauth ? (W(), P(A, { key: 0 }, [t[2] ||= F("div", { class: "login__divider" }, "or continue with", -1), F("div", Ko, [q(e.$slots, "oauth", {}, void 0, !0)])], 64)) : N("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-b06a8c9c"]]), Jo = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, Yo = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let o = j(() => t.enabled && !n.value), s = j(() => o.value && t.ambient && !!(t.ambientColor || t.ambientImage));
		function c(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let l = j(() => t.ambientImage ? {
			backgroundImage: `url("${c(t.ambientImage)}")`,
			opacity: String(.55 * t.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${t.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${t.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * t.intensity)
		}), u = j(() => ({ opacity: `calc(var(--grain-opacity) * ${t.intensity})` }));
		return (t, n) => (W(), P(A, null, [
			s.value ? (W(), P("div", {
				key: 0,
				class: B(["phlix-backdrop__ambient", { "is-image": !!e.ambientImage }]),
				style: V(l.value),
				"aria-hidden": "true"
			}, null, 6)) : N("", !0),
			o.value && e.vignette ? (W(), P("div", Jo)) : N("", !0),
			o.value && e.grain ? (W(), P("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: V(u.value),
				"aria-hidden": "true"
			}, null, 4)) : N("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), Xo = { class: "auth-page" }, Zo = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, Qo = { class: "auth-page__center" }, $o = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "LoginPage",
	setup(e) {
		let t = $();
		return (e, n) => (W(), P("div", Xo, [
			L(Yo, {
				enabled: Y(t).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			Y(t).atmosphere ? (W(), P("div", Zo)) : N("", !0),
			F("div", Qo, [L(qo, null, _e({ _: 2 }, [e.$slots.oauth ? {
				name: "oauth",
				fn: Q(() => [q(e.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-bd363f07"]]), es = {
	key: 0,
	class: "signup__banner",
	role: "alert"
}, ts = { class: "signup__oauth" }, ns = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let a = t, o = Wo(), s = n(), c = Le(), l = z("phlixConfig", null), u = j(() => l?.routerBase ?? "/app"), d = j(() => `${u.value}/login`), f = /^[^\s@]+@[^\s@]+\.[^\s@]+$/, p = G(""), m = G(""), h = G(""), g = G(""), _ = G(null), v = G(null), y = G(null), b = G(null);
		function x() {
			return _.value = p.value.trim() ? f.test(p.value.trim()) ? null : "Enter a valid email address." : "Enter your email.", v.value = m.value.trim() ? m.value.trim().length < 3 ? "Username must be at least 3 characters." : null : "Choose a username.", y.value = h.value ? h.value.length < 8 ? "Password must be at least 8 characters." : null : "Choose a password.", b.value = g.value === h.value ? null : "Passwords do not match.", !_.value && !v.value && !y.value && !b.value;
		}
		async function S() {
			x() && (await o.signup(p.value.trim(), m.value.trim(), h.value) ? (a("success"), c.push(u.value)) : s.error(o.error ?? "Registration failed."));
		}
		return (e, t) => {
			let n = be("RouterLink");
			return W(), M(Lo, {
				eyebrow: "Now showing",
				title: "Create your account",
				subtitle: "Your private cinema, anywhere."
			}, {
				footer: Q(() => [t[6] ||= I(" Already have an account? ", -1), L(n, {
					to: d.value,
					class: "signup__link"
				}, {
					default: Q(() => [...t[5] ||= [I("Sign in", -1)]]),
					_: 1
				}, 8, ["to"])]),
				default: Q(() => [Y(o).error ? (W(), P("p", es, [L(r, {
					name: "alert",
					class: "signup__banner-icon"
				}), F("span", null, J(Y(o).error), 1)])) : N("", !0), F("form", {
					class: "signup__form",
					novalidate: "",
					onSubmit: Oe(S, ["prevent"])
				}, [
					L(Uo, {
						modelValue: p.value,
						"onUpdate:modelValue": t[0] ||= (e) => p.value = e,
						label: "Email",
						type: "email",
						autocomplete: "email",
						inputmode: "email",
						placeholder: "you@example.com",
						error: _.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					L(Uo, {
						modelValue: m.value,
						"onUpdate:modelValue": t[1] ||= (e) => m.value = e,
						label: "Username",
						type: "text",
						autocomplete: "username",
						placeholder: "Your username",
						error: v.value,
						minlength: 3,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					L(Uo, {
						modelValue: h.value,
						"onUpdate:modelValue": t[2] ||= (e) => h.value = e,
						label: "Password",
						type: "password",
						autocomplete: "new-password",
						placeholder: "At least 8 characters",
						error: y.value,
						minlength: 8,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					L(Uo, {
						modelValue: g.value,
						"onUpdate:modelValue": t[3] ||= (e) => g.value = e,
						label: "Confirm password",
						type: "password",
						autocomplete: "new-password",
						placeholder: "Repeat your password",
						error: b.value,
						required: ""
					}, null, 8, ["modelValue", "error"]),
					L(i, {
						type: "submit",
						variant: "solid",
						size: "lg",
						block: "",
						loading: Y(o).loading
					}, {
						default: Q(() => [I(J(Y(o).loading ? "Creating account…" : "Create account"), 1)]),
						_: 1
					}, 8, ["loading"]),
					e.$slots.oauth ? (W(), P(A, { key: 0 }, [t[4] ||= F("div", { class: "signup__divider" }, "or continue with", -1), F("div", ts, [q(e.$slots, "oauth", {}, void 0, !0)])], 64)) : N("", !0)
				], 32)]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-21a11f2c"]]), rs = { class: "auth-page" }, is = {
	key: 0,
	class: "auth-page__glow",
	"aria-hidden": "true"
}, as = { class: "auth-page__center" }, os = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "SignupPage",
	setup(e) {
		let t = $();
		return (e, n) => (W(), P("div", rs, [
			L(Yo, {
				enabled: Y(t).atmosphere,
				grain: !0,
				vignette: !0
			}, null, 8, ["enabled"]),
			Y(t).atmosphere ? (W(), P("div", is)) : N("", !0),
			F("div", as, [L(ns, null, _e({ _: 2 }, [e.$slots.oauth ? {
				name: "oauth",
				fn: Q(() => [q(e.$slots, "oauth", {}, void 0, !0)]),
				key: "0"
			} : void 0]), 1024)])
		]));
	}
}), [["__scopeId", "data-v-b98af69c"]]), ss = { class: "phlix-tabs" }, cs = ["aria-label"], ls = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], us = ["id", "aria-labelledby"], ds = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, i = t, a = X(), o = G(null), s = j(() => n.tabs.findIndex((e) => e.value === n.modelValue)), c = (e) => `${a}-tab-${e}`, l = (e) => `${a}-panel-${e}`, u = j(() => n.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function d(e) {
			let t = n.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== n.modelValue && i("update:modelValue", e);
		}
		function f(e) {
			o.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function p(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = g(u.value, s.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = g(u.value, s.value, -1);
					break;
				case "Home":
					t = g(u.value, -1, 1);
					break;
				case "End":
					t = g(u.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), d(n.tabs[t].value), f(t));
		}
		return (t, n) => (W(), P("div", ss, [F("div", {
			ref_key: "listEl",
			ref: o,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: p
		}, [(W(!0), P(A, null, K(e.tabs, (t) => (W(), P("button", {
			id: c(t.value),
			key: t.value,
			type: "button",
			role: "tab",
			class: B(["phlix-tabs__tab", { "is-active": t.value === e.modelValue }]),
			"aria-selected": t.value === e.modelValue,
			"aria-controls": l(t.value),
			tabindex: t.value === e.modelValue ? 0 : -1,
			disabled: t.disabled,
			onClick: (e) => d(t.value)
		}, [t.icon ? (W(), M(r, {
			key: 0,
			name: t.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : N("", !0), I(" " + J(t.label), 1)], 10, ls))), 128))], 40, cs), e.modelValue ? (W(), P("div", {
			key: 0,
			id: l(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": c(e.modelValue),
			tabindex: "0"
		}, [q(t.$slots, e.modelValue, {}, () => [q(t.$slots, "default", {}, void 0, !0)], !0)], 8, us)) : N("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), fs = {
	key: 0,
	class: "aps"
}, ps = { class: "aps__group" }, ms = [
	"aria-checked",
	"tabindex",
	"data-theme",
	"onClick"
], hs = { class: "aps__theme-label" }, gs = { class: "aps__group" }, _s = [
	"aria-checked",
	"aria-label",
	"title",
	"tabindex",
	"onClick"
], vs = { class: "aps__group" }, ys = { class: "aps__row" }, bs = { class: "aps__row" }, xs = { class: "aps__row" }, Ss = { class: "aps__label" }, Cs = { class: "aps__value" }, ws = { class: "aps__slider" }, Ts = { class: "aps__group" }, Es = { class: "aps__row aps__row--switch" }, Ds = { class: "aps__row" }, Os = { class: "aps__foot" }, ks = {
	key: 1,
	class: "aps"
}, As = { class: "aps__group" }, js = { class: "aps__row aps__row--switch" }, Ms = { class: "aps__row" }, Ns = { class: "aps__label" }, Ps = { class: "aps__value" }, Fs = { class: "aps__slider" }, Is = { class: "aps__row" }, Ls = { class: "aps__group" }, Rs = { class: "aps__row" }, zs = { class: "aps__row" }, Bs = { class: "aps__row" }, Vs = { class: "aps__row" }, Hs = { class: "aps__row" }, Us = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "AppearanceSettings",
	props: { panel: { default: "appearance" } },
	setup(e) {
		let t = $(), a = n(), o = [
			{
				value: "nocturne",
				label: "Nocturne"
			},
			{
				value: "daylight",
				label: "Daylight"
			},
			{
				value: "midnight",
				label: "Midnight"
			}
		], s = [
			{
				value: null,
				label: "Amber",
				swatch: "var(--amber-500)"
			},
			{
				value: "#e5484d",
				label: "Crimson",
				swatch: "#e5484d"
			},
			{
				value: "#d6409f",
				label: "Magenta",
				swatch: "#d6409f"
			},
			{
				value: "#8e4ec6",
				label: "Violet",
				swatch: "#8e4ec6"
			},
			{
				value: "#4c6ef5",
				label: "Azure",
				swatch: "#4c6ef5"
			},
			{
				value: "#0fa3a3",
				label: "Teal",
				swatch: "#0fa3a3"
			},
			{
				value: "#6cc04a",
				label: "Lime",
				swatch: "#6cc04a"
			}
		], c = [{
			value: "comfortable",
			label: "Comfortable"
		}, {
			value: "compact",
			label: "Compact"
		}], l = [
			{
				value: "cozy",
				label: "Cozy"
			},
			{
				value: "comfy",
				label: "Comfy"
			},
			{
				value: "dense",
				label: "Dense"
			}
		], u = [
			{
				value: "auto",
				label: "Match system"
			},
			{
				value: "on",
				label: "Reduced"
			},
			{
				value: "off",
				label: "Full"
			}
		], d = [
			{
				value: "auto",
				label: "Auto"
			},
			{
				value: "4k",
				label: "4K"
			},
			{
				value: "1080p",
				label: "1080p"
			},
			{
				value: "720p",
				label: "720p"
			},
			{
				value: "480p",
				label: "480p"
			}
		], f = [
			{
				value: "",
				label: "Off"
			},
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
				value: "ja",
				label: "Japanese"
			}
		], p = (e) => `${Math.round(e * 100)}%`, m = (e) => `${e}px`;
		function h(e) {
			t.defaultSubtitleLang = e === "" ? null : String(e);
		}
		function g(e, n) {
			t.captionStyle = {
				...t.captionStyle,
				[e]: n
			};
		}
		let v = j(() => Math.max(0, o.findIndex((e) => e.value === t.theme))), b = j(() => Math.max(0, s.findIndex((e) => e.value === t.accent)));
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
		function C(e) {
			let n = S(e, o.length, v.value);
			n !== null && (t.theme = o[n].value);
		}
		function w(e) {
			let n = S(e, s.length, b.value);
			n !== null && (t.accent = s[n].value);
		}
		let T = G(!1), E;
		function D() {
			if (!T.value) {
				T.value = !0, clearTimeout(E), E = setTimeout(() => T.value = !1, 3500);
				return;
			}
			clearTimeout(E), T.value = !1, t.reset(), a.info("Preferences reset to defaults.");
		}
		return H(() => clearTimeout(E)), (n, a) => e.panel === "appearance" ? (W(), P("div", fs, [
			F("section", ps, [a[13] ||= F("h3", { class: "aps__title" }, "Theme", -1), F("div", {
				class: "aps__themes",
				role: "radiogroup",
				"aria-label": "Theme",
				onKeydown: C
			}, [(W(), P(A, null, K(o, (e, n) => F("button", {
				key: e.value,
				type: "button",
				role: "radio",
				class: B(["aps__theme", { "is-active": Y(t).theme === e.value }]),
				"aria-checked": Y(t).theme === e.value,
				tabindex: v.value === n ? 0 : -1,
				"data-theme": e.value,
				onClick: (n) => Y(t).theme = e.value
			}, [a[12] ||= F("span", { class: "aps__preview" }, [F("span", { class: "aps__preview-bar" }), F("span", { class: "aps__preview-card" })], -1), F("span", hs, [I(J(e.label) + " ", 1), Y(t).theme === e.value ? (W(), M(r, {
				key: 0,
				name: "check",
				class: "aps__theme-check"
			})) : N("", !0)])], 10, ms)), 64))], 32)]),
			F("section", gs, [a[14] ||= F("h3", { class: "aps__title" }, "Accent", -1), F("div", {
				class: "aps__accents",
				role: "radiogroup",
				"aria-label": "Accent color",
				onKeydown: w
			}, [(W(), P(A, null, K(s, (e, n) => F("button", {
				key: e.label,
				type: "button",
				role: "radio",
				class: B(["aps__accent", { "is-active": Y(t).accent === e.value }]),
				"aria-checked": Y(t).accent === e.value,
				"aria-label": e.label,
				title: e.label,
				tabindex: b.value === n ? 0 : -1,
				onClick: (n) => Y(t).accent = e.value
			}, [F("span", {
				class: "aps__accent-dot",
				style: V({ background: e.swatch })
			}, [Y(t).accent === e.value ? (W(), M(r, {
				key: 0,
				name: "check"
			})) : N("", !0)], 4)], 10, _s)), 64))], 32)]),
			F("section", vs, [
				a[18] ||= F("h3", { class: "aps__title" }, "Display", -1),
				F("div", ys, [a[15] ||= F("span", {
					class: "aps__label",
					id: "aps-density"
				}, "Density", -1), L(_, {
					"model-value": Y(t).density,
					options: c,
					label: "Density",
					"onUpdate:modelValue": a[0] ||= (e) => Y(t).density = e
				}, null, 8, ["model-value"])]),
				F("div", bs, [a[16] ||= F("span", { class: "aps__label" }, "Grid density", -1), L(_, {
					"model-value": Y(t).gridDensity,
					options: l,
					label: "Grid density",
					"onUpdate:modelValue": a[1] ||= (e) => Y(t).gridDensity = e
				}, null, 8, ["model-value"])]),
				F("div", xs, [F("span", Ss, [a[17] ||= I("Card size ", -1), F("span", Cs, J(m(Y(t).cardSize)), 1)]), F("div", ws, [L(y, {
					"model-value": Y(t).cardSize,
					min: 120,
					max: 280,
					step: 10,
					label: "Card size",
					"format-value": m,
					"onUpdate:modelValue": a[2] ||= (e) => Y(t).cardSize = e
				}, null, 8, ["model-value"])])])
			]),
			F("section", Ts, [
				a[20] ||= F("h3", { class: "aps__title" }, "Atmosphere", -1),
				F("div", Es, [L(x, {
					"model-value": Y(t).atmosphere,
					label: "Film-grain + ambient glow",
					"onUpdate:modelValue": a[3] ||= (e) => Y(t).atmosphere = e
				}, null, 8, ["model-value"])]),
				F("div", Ds, [a[19] ||= F("span", { class: "aps__label" }, "Motion", -1), L(_, {
					"model-value": Y(t).reducedMotion,
					options: u,
					label: "Motion",
					"onUpdate:modelValue": a[4] ||= (e) => Y(t).reducedMotion = e
				}, null, 8, ["model-value"])])
			]),
			F("div", Os, [L(i, {
				variant: "ghost",
				"left-icon": T.value ? "alert" : "rewind",
				onClick: D
			}, {
				default: Q(() => [I(J(T.value ? "Click again to confirm reset" : "Reset all preferences"), 1)]),
				_: 1
			}, 8, ["left-icon"])])
		])) : (W(), P("div", ks, [F("section", As, [
			a[23] ||= F("h3", { class: "aps__title" }, "Playback", -1),
			F("div", js, [L(x, {
				"model-value": Y(t).autoplay,
				label: "Autoplay next episode",
				"onUpdate:modelValue": a[5] ||= (e) => Y(t).autoplay = e
			}, null, 8, ["model-value"])]),
			F("div", Ms, [F("span", Ns, [a[21] ||= I("Default volume ", -1), F("span", Ps, J(p(Y(t).defaultVolume)), 1)]), F("div", Fs, [L(y, {
				"model-value": Y(t).defaultVolume,
				min: 0,
				max: 1,
				step: .05,
				label: "Default volume",
				"format-value": p,
				"onUpdate:modelValue": a[6] ||= (e) => Y(t).defaultVolume = e
			}, null, 8, ["model-value"])])]),
			F("div", Is, [a[22] ||= F("span", { class: "aps__label" }, "Default quality", -1), L(_, {
				"model-value": Y(t).defaultQuality,
				options: d,
				label: "Default quality",
				"onUpdate:modelValue": a[7] ||= (e) => Y(t).defaultQuality = String(e)
			}, null, 8, ["model-value"])])
		]), F("section", Ls, [
			a[29] ||= F("h3", { class: "aps__title" }, "Subtitles", -1),
			F("div", Rs, [a[24] ||= F("span", { class: "aps__label" }, "Default language", -1), L(_, {
				"model-value": Y(t).defaultSubtitleLang ?? "",
				options: f,
				label: "Default subtitle language",
				"onUpdate:modelValue": h
			}, null, 8, ["model-value"])]),
			F("div", zs, [a[25] ||= F("span", { class: "aps__label" }, "Caption size", -1), L(_, {
				"model-value": Y(t).captionStyle.size,
				options: Y(Zi),
				label: "Caption size",
				"onUpdate:modelValue": a[8] ||= (e) => g("size", e)
			}, null, 8, ["model-value", "options"])]),
			F("div", Bs, [a[26] ||= F("span", { class: "aps__label" }, "Caption color", -1), L(_, {
				"model-value": Y(t).captionStyle.textColor,
				options: Y(Qi),
				label: "Caption color",
				"onUpdate:modelValue": a[9] ||= (e) => g("textColor", String(e))
			}, null, 8, ["model-value", "options"])]),
			F("div", Vs, [a[27] ||= F("span", { class: "aps__label" }, "Caption background", -1), L(_, {
				"model-value": Y(t).captionStyle.background,
				options: Y($i),
				label: "Caption background",
				"onUpdate:modelValue": a[10] ||= (e) => g("background", e)
			}, null, 8, ["model-value", "options"])]),
			F("div", Hs, [a[28] ||= F("span", { class: "aps__label" }, "Caption edge", -1), L(_, {
				"model-value": Y(t).captionStyle.edge,
				options: Y(ea),
				label: "Caption edge",
				"onUpdate:modelValue": a[11] ||= (e) => g("edge", e)
			}, null, 8, ["model-value", "options"])])
		])]));
	}
}), [["__scopeId", "data-v-2a591f61"]]), Ws = { class: "setform" }, Gs = {
	key: 0,
	class: "setform__loading"
}, Ks = { class: "setform__head" }, qs = { class: "setform__title" }, Js = {
	key: 0,
	class: "setform__dirty"
}, Ys = ["for"], Xs = [
	"id",
	"type",
	"value",
	"onInput"
], Zs = { class: "setform__actions" }, Qs = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: r }) {
		let a = e, s = r, c = Wo(), l = n(), u = G({}), d = G({}), f = G(!0), m = G(null), h = G(null), g = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], _ = j(() => a.groups ? g.filter((e) => a.groups.includes(e)) : g), v = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, y = {
			"hwaccel.enabled": {
				label: "Hardware acceleration",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.prefer_hardware": {
				label: "Prefer hardware encoding",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.probe_timeout": {
				label: "HW probe timeout (s)",
				type: "number",
				group: "transcoding"
			},
			"tmdb.api_key": {
				label: "TMDB API Key",
				type: "string",
				group: "metadata"
			},
			"marker_detection.similarity_threshold": {
				label: "Intro similarity threshold",
				type: "number",
				group: "markers"
			},
			"marker_detection.intro_max_duration": {
				label: "Max intro duration (s)",
				type: "number",
				group: "markers"
			},
			"subtitles.enabled": {
				label: "Enable subtitles",
				type: "bool",
				group: "subtitles"
			},
			"subtitles.default_language": {
				label: "Default subtitle language",
				type: "string",
				group: "subtitles"
			},
			"subtitles.burn_in_by_default": {
				label: "Burn in subtitles by default",
				type: "bool",
				group: "subtitles"
			},
			"discovery.discovery_port": {
				label: "Discovery port",
				type: "number",
				group: "discovery"
			},
			"trickplay.enabled": {
				label: "Enable trickplay",
				type: "bool",
				group: "trickplay"
			},
			"trickplay.interval_seconds": {
				label: "Trickplay interval (s)",
				type: "number",
				group: "trickplay"
			},
			"newsletter.enabled": {
				label: "Enable newsletter",
				type: "bool",
				group: "newsletter"
			},
			"newsletter.send_hour": {
				label: "Newsletter send hour",
				type: "number",
				group: "newsletter"
			},
			"port-forward.port_forwarding.upnp_enabled": {
				label: "Enable UPnP",
				type: "bool",
				group: "port-forward"
			},
			"trakt.client_id": {
				label: "Trakt client ID",
				type: "string",
				group: "scrobblers"
			},
			"trakt.client_secret": {
				label: "Trakt client secret",
				type: "string",
				group: "scrobblers"
			},
			"trakt.redirect_uri": {
				label: "Trakt redirect URI",
				type: "string",
				group: "scrobblers"
			}
		};
		function b(e) {
			return Object.keys(y).filter((t) => y[t].group === e);
		}
		function S(e, t) {
			let n = t.target.value;
			if (n === "") return D(e, 0);
			let r = Number(n);
			Number.isFinite(r) && D(e, r);
		}
		function C(e, n) {
			return n === "bool" ? t(e) : n === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function w() {
			f.value = !0, m.value = null;
			try {
				let e = await c.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(y)) t[n] = C(e[n], r.type);
				u.value = t, d.value = structuredClone(t);
			} catch (e) {
				m.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				f.value = !1;
			}
		}
		function T(e) {
			return b(e).some((e) => u.value[e] !== d.value[e]);
		}
		async function E(e) {
			h.value = e;
			try {
				let t = {};
				for (let n of b(e)) t[n] = u.value[n];
				await c.client.put("/api/v1/users/me/settings", t);
				for (let t of b(e)) d.value[t] = u.value[t];
				l.success(`${v[e]} settings saved.`), s("saved", u.value);
			} catch (t) {
				l.error(t instanceof Error ? t.message : `Failed to save ${v[e]} settings`);
			} finally {
				h.value = null;
			}
		}
		function D(e, t) {
			u.value[e] = t;
		}
		return U(w), (e, t) => (W(), P("div", Ws, [f.value ? (W(), P("div", Gs, [(W(), P(A, null, K(3, (e) => L(o, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : m.value ? (W(), M(p, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: m.value
		}, {
			actions: Q(() => [L(i, {
				"left-icon": "rewind",
				onClick: w
			}, {
				default: Q(() => [...t[0] ||= [I("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (W(!0), P(A, { key: 2 }, K(_.value, (e) => (W(), P("section", {
			key: e,
			class: "setform__group"
		}, [
			F("header", Ks, [F("h3", qs, J(v[e]), 1), T(e) ? (W(), P("span", Js, "Unsaved")) : N("", !0)]),
			(W(!0), P(A, null, K(b(e), (e) => (W(), P("div", {
				key: e,
				class: B(["setform__row", { "setform__row--switch": y[e].type === "bool" }])
			}, [y[e].type === "bool" ? (W(), M(x, {
				key: 0,
				"model-value": !!u.value[e],
				label: y[e].label,
				"onUpdate:modelValue": (t) => D(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (W(), P(A, { key: 1 }, [F("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, J(y[e].label), 9, Ys), F("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: y[e].type === "number" ? "number" : "text",
				value: u.value[e] ?? "",
				onInput: (t) => y[e].type === "number" ? S(e, t) : D(e, t.target.value)
			}, null, 40, Xs)], 64))], 2))), 128)),
			F("div", Zs, [L(i, {
				variant: "solid",
				size: "sm",
				disabled: !T(e),
				loading: h.value === e,
				onClick: (t) => E(e)
			}, {
				default: Q(() => [I(" Save " + J(v[e]), 1)]),
				_: 2
			}, 1032, [
				"disabled",
				"loading",
				"onClick"
			])])
		]))), 128))]));
	}
}), [["__scopeId", "data-v-eea8b5b5"]]), $s = { class: "settings-page" }, ec = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "SettingsPage",
	setup(e) {
		let t = [
			{
				value: "appearance",
				label: "Appearance",
				icon: "sun"
			},
			{
				value: "playback",
				label: "Playback",
				icon: "play"
			},
			{
				value: "server",
				label: "Server",
				icon: "settings"
			}
		], n = G("appearance");
		return (e, r) => (W(), P("div", $s, [r[1] ||= F("header", { class: "settings-page__head" }, [F("p", { class: "settings-page__eyebrow" }, "Preferences"), F("h1", { class: "settings-page__title" }, "Settings")], -1), L(ds, {
			modelValue: n.value,
			"onUpdate:modelValue": r[0] ||= (e) => n.value = e,
			tabs: t,
			label: "Settings sections"
		}, {
			appearance: Q(() => [L(Us, { panel: "appearance" })]),
			playback: Q(() => [L(Us, { panel: "playback" })]),
			server: Q(() => [L(Qs)]),
			_: 1
		}, 8, ["modelValue"])]));
	}
}), [["__scopeId", "data-v-1dba1556"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function tc() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function nc(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: Ir
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: li
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: Eo
		},
		{
			path: `${t}/login`,
			name: "login",
			component: $o
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: os
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: ec
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: $t,
		props: { appName: e.app }
	}), n;
}
function rc(e) {
	let t = {
		...tc(),
		...e
	};
	Wt(t.defaultTheme);
	let n = ke();
	t.defaultTheme && !ct() && ($(n).theme = t.defaultTheme);
	let r = Ne({
		history: Pe(t.routerBase || "/app"),
		routes: nc(t)
	}), i = ge(Xt);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/ui/Sheet.vue?vue&type=script&setup=true&lang.ts
var ic = ["aria-labelledby"], ac = {
	key: 0,
	class: "phlix-sheet__header"
}, oc = ["id"], sc = { class: "phlix-sheet__body" }, cc = {
	key: 1,
	class: "phlix-sheet__footer"
}, lc = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		Z(() => n.modelValue, (e) => i.value = e);
		let a = G(null), o = X();
		function s() {
			r("update:modelValue", !1), r("close");
		}
		function c() {
			n.dismissible && s();
		}
		return u(a, i, { onEscape: () => n.dismissible ? (s(), !0) : !1 }), (t, n) => (W(), M(pe, { to: "body" }, [L(me, { name: `phlix-sheet-${e.side}` }, {
			default: Q(() => [e.modelValue ? (W(), P("div", {
				key: 0,
				class: B(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: Oe(c, ["self"])
			}, [F("aside", {
				ref_key: "panelEl",
				ref: a,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? Y(o) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (W(), P("header", ac, [e.title ? (W(), P("h2", {
					key: 0,
					id: Y(o),
					class: "phlix-sheet__title"
				}, J(e.title), 9, oc)) : N("", !0), e.hideClose ? N("", !0) : (W(), M(d, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: s
				}))])) : N("", !0),
				F("div", sc, [q(t.$slots, "default", {}, void 0, !0)]),
				t.$slots.footer ? (W(), P("footer", cc, [q(t.$slots, "footer", {}, void 0, !0)])) : N("", !0)
			], 8, ic)], 34)) : N("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), uc = ["id"], dc = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		let t = e, n = X(), r = G(!1), i = G(null), a;
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
		return H(() => clearTimeout(a)), (t, a) => (W(), P("span", {
			ref_key: "wrapEl",
			ref: i,
			class: "phlix-tooltip-wrap",
			onMouseenter: s,
			onMouseleave: c,
			onFocusin: s,
			onFocusout: c,
			onKeydown: De(c, ["esc"])
		}, [q(t.$slots, "default", {}, void 0, !0), L(me, { name: "phlix-tooltip" }, {
			default: Q(() => [r.value && (e.text || t.$slots.content) ? (W(), P("span", {
				key: 0,
				id: Y(n),
				role: "tooltip",
				class: B(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [q(t.$slots, "content", {}, () => [I(J(e.text), 1)], !0)], 10, uc)) : N("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), fc = ["role"], pc = { class: "phlix-toast__content" }, mc = {
	key: 0,
	class: "phlix-toast__title"
}, hc = { class: "phlix-toast__message" }, gc = ["onClick"], _c = 0, vc = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(e) {
		let t = n(), i = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, a = (e) => e.icon ?? i[e.tone];
		return U(() => {
			_c++;
		}), H(() => {
			_c--;
		}), (n, i) => (W(), M(pe, { to: "body" }, [F("div", {
			class: B(["phlix-toasts", `phlix-toasts--${e.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [L(he, { name: "phlix-toast" }, {
			default: Q(() => [(W(!0), P(A, null, K(Y(t).toasts, (e) => (W(), P("div", {
				key: e.id,
				class: B(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				L(r, {
					name: a(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				F("div", pc, [e.title ? (W(), P("p", mc, J(e.title), 1)) : N("", !0), F("p", hc, J(e.message), 1)]),
				e.action ? (W(), P("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (n) => {
						e.action.onClick(), Y(t).dismiss(e.id);
					}
				}, J(e.action.label), 9, gc)) : N("", !0),
				L(d, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (n) => Y(t).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, fc))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), yc = ["aria-label"], bc = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = j(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, i) => (W(), P("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: V(n.value ? { fontSize: n.value } : void 0)
		}, [L(r, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, yc));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), xc = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		}), (t, a) => (W(), M(xe(e.tag), {
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
			default: Q(() => [q(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Sc = /*#__PURE__*/ l(/* @__PURE__ */ R({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, n) => (W(), M(me, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: Q(() => [q(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]);
//#endregion
//#region src/app/admin.ts
function Cc(e = "/app") {
	let t = `${e}/admin`;
	return [
		{
			path: `${t}/dashboard`,
			name: "admin-dashboard",
			component: () => import("./DashboardPage-hDOg_Ffz.js")
		},
		{
			path: `${t}/users`,
			name: "admin-users",
			component: () => import("./UsersPage-DwP9OL68.js")
		},
		{
			path: `${t}/logs`,
			name: "admin-logs",
			component: () => import("./LogsPage-BlizE1rS.js")
		},
		{
			path: `${t}/webhooks`,
			name: "admin-webhooks",
			component: () => import("./WebhooksPage-BTr8MZyI.js")
		},
		{
			path: `${t}/services`,
			name: "admin-services",
			component: () => import("./ServicesPage-BODlzdR1.js")
		},
		{
			path: `${t}/integrations`,
			name: "admin-integrations",
			component: () => import("./IntegrationsPage-9nIj5Qls.js")
		},
		{
			path: `${t}/backup`,
			name: "admin-backup",
			component: () => import("./BackupPage-Dm-GxF24.js")
		},
		{
			path: `${t}/cast-devices`,
			name: "admin-cast",
			component: () => import("./CastDevicesPage-DX-Mg8L_.js")
		},
		{
			path: `${t}/dlna`,
			name: "admin-dlna",
			component: () => import("./DlnaServerPage-CRtWWFa7.js")
		},
		{
			path: `${t}/remote-access`,
			name: "admin-remote-access",
			component: () => import("./RemoteAccessPage-DnNT8VaX.js")
		},
		{
			path: `${t}/livetv`,
			name: "admin-livetv",
			component: () => import("./LiveTvPage-BOREIUhL.js")
		},
		{
			path: `${t}/collections`,
			name: "admin-collections",
			component: () => import("./CollectionsPage-kjunGkPG.js")
		},
		{
			path: `${t}/history`,
			name: "admin-history",
			component: () => import("./HistoryPage-BgA1aLkA.js")
		},
		{
			path: `${t}/syncplay`,
			name: "admin-syncplay",
			component: () => import("./SyncPlayPage-lmgrssUz.js")
		},
		{
			path: `${t}/libraries`,
			name: "admin-libraries",
			component: () => import("./LibrariesPage-4q2Pgjvf.js")
		},
		{
			path: `${t}/settings`,
			name: "admin-settings",
			component: () => import("./SettingsPage-CEdpjtIn.js")
		}
	];
}
function wc(e = "/app") {
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
var Tc = { class: "library-scan-page" }, Ec = {
	key: 0,
	class: "loading"
}, Dc = {
	key: 1,
	class: "error"
}, Oc = {
	key: 2,
	class: "libraries-list"
}, kc = { class: "library-info" }, Ac = { class: "library-name" }, jc = { class: "library-type" }, Mc = { class: "library-paths" }, Nc = { class: "library-meta" }, Pc = { key: 0 }, Fc = {
	key: 0,
	class: "scan-status"
}, Ic = { class: "library-actions" }, Lc = ["onClick", "disabled"], Rc = ["onClick", "disabled"], zc = {
	key: 0,
	class: "empty-state"
}, Bc = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		}), (e, a) => (W(), P("div", Tc, [a[0] ||= F("div", { class: "scan-header" }, [F("h1", { class: "scan-title" }, "Library Scanner"), F("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), r.value ? (W(), P("div", Ec, "Loading libraries...")) : i.value ? (W(), P("div", Dc, J(i.value), 1)) : (W(), P("div", Oc, [(W(!0), P(A, null, K(t.value, (e) => (W(), P("div", {
			key: e.id,
			class: "library-card"
		}, [F("div", kc, [
			F("h3", Ac, J(e.name), 1),
			F("span", jc, J(e.type), 1),
			F("p", Mc, J(e.paths.join(", ")), 1),
			F("div", Nc, [e.item_count === void 0 ? N("", !0) : (W(), P("span", Pc, J(e.item_count) + " items", 1)), F("span", null, "Last scan: " + J(u(e.last_scan_at)), 1)]),
			n.value[e.id] ? (W(), P("div", Fc, J(d(n.value[e.id])), 1)) : N("", !0)
		]), F("div", Ic, [F("button", {
			class: "btn btn-scan",
			onClick: (t) => c(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Scan ", 8, Lc), F("button", {
			class: "btn btn-rescan",
			onClick: (t) => l(e.id),
			disabled: n.value[e.id]?.status === "running" || n.value[e.id]?.status === "queued"
		}, " Rescan ", 8, Rc)])]))), 128)), t.value.length === 0 ? (W(), P("div", zc, " No libraries configured. Add a library to get started. ")) : N("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), Vc = { class: "my-servers-page" }, Hc = {
	key: 0,
	class: "loading"
}, Uc = {
	key: 1,
	class: "error"
}, Wc = {
	key: 2,
	class: "servers-list"
}, Gc = { class: "server-info" }, Kc = { class: "server-name" }, qc = { class: "server-url" }, Jc = { class: "server-meta" }, Yc = { key: 0 }, Xc = {
	key: 0,
	class: "empty-state"
}, Zc = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		}), (e, i) => (W(), P("div", Vc, [i[2] ||= F("div", { class: "page-header" }, [F("h1", { class: "page-title" }, "My Servers"), F("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), n.value ? (W(), P("div", Hc, "Loading servers...")) : r.value ? (W(), P("div", Uc, J(r.value), 1)) : (W(), P("div", Wc, [(W(!0), P(A, null, K(t.value, (e) => (W(), P("div", {
			key: e.id,
			class: "server-card"
		}, [
			F("div", {
				class: "server-status",
				style: V({ backgroundColor: a(e.status) })
			}, null, 4),
			F("div", Gc, [
				F("h3", Kc, J(e.name), 1),
				F("p", qc, J(e.url), 1),
				F("div", Jc, [
					F("span", null, J(e.owner), 1),
					e.library_count === void 0 ? N("", !0) : (W(), P("span", Yc, J(e.library_count) + " libraries", 1)),
					F("span", null, "Last seen: " + J(o(e.last_seen)), 1)
				])
			]),
			i[0] ||= F("div", { class: "server-actions" }, [F("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), t.value.length === 0 ? (W(), P("div", Xc, [...i[1] ||= [F("p", null, "No servers connected yet.", -1), F("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : N("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), Qc = { class: "federation-page" }, $c = {
	key: 0,
	class: "loading"
}, el = {
	key: 1,
	class: "error"
}, tl = {
	key: 2,
	class: "federation-content"
}, nl = { class: "peers-section" }, rl = { class: "peers-list" }, il = { class: "peer-info" }, al = { class: "peer-name" }, ol = { class: "peer-url" }, sl = { class: "peer-meta" }, cl = { key: 0 }, ll = { class: "peer-actions" }, ul = ["onClick"], dl = {
	key: 1,
	class: "status-badge"
}, fl = {
	key: 0,
	class: "empty-state"
}, pl = { class: "add-peer-section" }, ml = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		}), (e, i) => (W(), P("div", Qc, [i[5] ||= F("div", { class: "page-header" }, [F("h1", { class: "page-title" }, "Federation"), F("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), n.value ? (W(), P("div", $c, "Loading federation peers...")) : r.value ? (W(), P("div", el, J(r.value), 1)) : (W(), P("div", tl, [F("div", nl, [i[2] ||= F("h2", { class: "section-title" }, "Connected Peers", -1), F("div", rl, [(W(!0), P(A, null, K(t.value, (e) => (W(), P("div", {
			key: e.id,
			class: "peer-card"
		}, [
			F("div", {
				class: "peer-status",
				style: V({ backgroundColor: c(e.status) })
			}, null, 4),
			F("div", il, [
				F("h3", al, J(e.name), 1),
				F("p", ol, J(e.url), 1),
				F("div", sl, [e.shared_libraries_count === void 0 ? N("", !0) : (W(), P("span", cl, J(e.shared_libraries_count) + " shared libraries", 1)), F("span", null, "Last sync: " + J(l(e.last_sync)), 1)])
			]),
			F("div", ll, [e.status === "connected" ? (W(), P("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => o(e.id)
			}, " Disconnect ", 8, ul)) : e.status === "pending" ? (W(), P("span", dl, "Pending")) : N("", !0)])
		]))), 128)), t.value.length === 0 ? (W(), P("div", fl, [...i[1] ||= [F("p", null, "No federation peers connected.", -1)]])) : N("", !0)])]), F("div", pl, [i[4] ||= F("h2", { class: "section-title" }, "Add Peer", -1), F("form", {
			class: "add-peer-form",
			onSubmit: i[0] ||= Oe((e) => a(""), ["prevent"])
		}, [...i[3] ||= [F("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), F("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), hl = { class: "manage-shares-page" }, gl = {
	key: 0,
	class: "loading"
}, _l = {
	key: 1,
	class: "error"
}, vl = {
	key: 2,
	class: "shares-list"
}, yl = { class: "share-info" }, bl = { class: "share-library" }, xl = { class: "share-meta" }, Sl = {
	key: 0,
	class: "expired-badge"
}, Cl = { class: "share-dates" }, wl = { key: 0 }, Tl = { class: "share-actions" }, El = ["onClick"], Dl = {
	key: 0,
	class: "empty-state"
}, Ol = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		}), (e, i) => (W(), P("div", hl, [i[1] ||= F("div", { class: "page-header" }, [F("h1", { class: "page-title" }, "Manage Shares"), F("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), n.value ? (W(), P("div", gl, "Loading shares...")) : r.value ? (W(), P("div", _l, J(r.value), 1)) : (W(), P("div", vl, [(W(!0), P(A, null, K(t.value, (e) => (W(), P("div", {
			key: e.id,
			class: "share-card"
		}, [F("div", yl, [
			F("h3", bl, J(e.library_name), 1),
			F("div", xl, [
				F("span", null, "Shared with: " + J(e.shared_with), 1),
				F("span", { class: B(["permission-badge", e.permissions]) }, J(e.permissions), 3),
				e.expires_at && c(e.expires_at) ? (W(), P("span", Sl, "Expired")) : N("", !0)
			]),
			F("p", Cl, [I(" Created: " + J(o(e.created_at)) + " ", 1), e.expires_at ? (W(), P("span", wl, " | Expires: " + J(o(e.expires_at)), 1)) : N("", !0)])
		]), F("div", Tl, [F("button", {
			class: "btn btn-danger",
			onClick: (t) => a(e.id)
		}, "Revoke", 8, El)])]))), 128)), t.value.length === 0 ? (W(), P("div", Dl, [...i[0] ||= [F("p", null, "No library shares found.", -1)]])) : N("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), kl = { class: "audit-logs-page" }, Al = {
	key: 0,
	class: "loading"
}, jl = {
	key: 1,
	class: "error"
}, Ml = {
	key: 2,
	class: "logs-container"
}, Nl = { class: "logs-list" }, Pl = { class: "log-content" }, Fl = { class: "log-header" }, Il = { class: "log-action" }, Ll = { class: "log-actor" }, Rl = { class: "log-time" }, zl = {
	key: 0,
	class: "log-target"
}, Bl = {
	key: 1,
	class: "log-details"
}, Vl = {
	key: 2,
	class: "log-ip"
}, Hl = {
	key: 0,
	class: "empty-state"
}, Ul = {
	key: 0,
	class: "pagination"
}, Wl = ["disabled"], Gl = { class: "page-info" }, Kl = ["disabled"], ql = /*#__PURE__*/ l(/* @__PURE__ */ R({
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
		}), (e, s) => (W(), P("div", kl, [s[3] ||= F("div", { class: "page-header" }, [F("h1", { class: "page-title" }, "Audit Logs"), F("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), n.value ? (W(), P("div", Al, "Loading audit logs...")) : r.value ? (W(), P("div", jl, J(r.value), 1)) : (W(), P("div", Ml, [F("div", Nl, [(W(!0), P(A, null, K(t.value, (e) => (W(), P("div", {
			key: e.id,
			class: "log-entry"
		}, [F("div", {
			class: "log-icon",
			style: V({ backgroundColor: l(e.action) })
		}, J(u(e.action)), 5), F("div", Pl, [
			F("div", Fl, [
				F("span", Il, J(e.action), 1),
				F("span", Ll, J(e.actor), 1),
				F("span", Rl, J(c(e.created_at)), 1)
			]),
			e.target ? (W(), P("p", zl, "Target: " + J(e.target), 1)) : N("", !0),
			e.details ? (W(), P("p", Bl, J(e.details), 1)) : N("", !0),
			e.ip_address ? (W(), P("span", Vl, "IP: " + J(e.ip_address), 1)) : N("", !0)
		])]))), 128)), t.value.length === 0 ? (W(), P("div", Hl, [...s[2] ||= [F("p", null, "No audit logs found.", -1)]])) : N("", !0)]), a.value > 1 ? (W(), P("div", Ul, [
			F("button", {
				class: "btn btn-secondary",
				disabled: i.value <= 1,
				onClick: s[0] ||= (e) => o(i.value - 1)
			}, " Previous ", 8, Wl),
			F("span", Gl, "Page " + J(i.value) + " of " + J(a.value), 1),
			F("button", {
				class: "btn btn-secondary",
				disabled: i.value >= a.value,
				onClick: s[1] ||= (e) => o(i.value + 1)
			}, " Next ", 8, Kl)
		])) : N("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Jl(e, t) {
	let n = rn(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = Z(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = Z(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
export { C as ALL_LOGS, Sa as AMBIENT_SAMPLE_H, Ca as AMBIENT_SAMPLE_INTERVAL_MS, xa as AMBIENT_SAMPLE_W, _i as ARROW_ICONS, vi as ARROW_LABELS, re as AdminBackupApi, b as AdminCastApi, se as AdminCollectionsApi, w as AdminDashboardApi, ie as AdminDlnaServerApi, ce as AdminHistoryApi, ne as AdminIntegrationsApi, de as AdminLibrariesApi, oe as AdminLiveTvApi, S as AdminLogsApi, ae as AdminRemoteAccessApi, te as AdminServicesApi, fe as AdminSettingsApi, le as AdminSyncPlayApi, D as AdminUsersApi, k as AdminWebhooksApi, ja as AmbientCanvas, e as ApiClient, a as ApiError, Yo as AppBackdrop, qe as AppLayout, ql as AuditLogsPage, v as Badge, Ir as BrowsePage, i as Button, $i as CAPTION_BACKGROUND_OPTIONS, Qi as CAPTION_COLOR_OPTIONS, ea as CAPTION_EDGE_OPTIONS, Zi as CAPTION_SIZE_OPTIONS, Xi as CAPTION_SIZE_SCALE, ia as CaptionOverlay, ba as CaptionsMenu, er as Chip, sr as Combobox, yt as CommandPalette, rt as DEFAULT_CAPTION_STYLE, it as DEFAULT_PREFERENCES, La as DIRECT_PLAY_EXTENSIONS, p as EmptyState, ml as FederationPage, Ar as FilterBar, r as Icon, d as IconButton, Xe as Kbd, ue as LIBRARY_TYPES, Bc as LibraryScanPage, c as LocalStorageTokenStore, qo as LoginForm, $o as LoginPage, Ol as ManageSharesPage, On as MediaCard, ii as MediaDetail, li as MediaDetailPage, Ln as MediaGrid, Xn as MediaHomeRow, qn as MediaRow, Nt as MiniPlayer, f as Modal, Zc as MyServersPage, gi as PLAYER_SHORTCUTS, Sc as PageTransition, Xt as PhlixApp, Co as Player, Eo as PlayerPage, Ni as QualityMenu, T as RATING_LABELS, E as RATING_OPTIONS, xt as RESUME_MAX_RATIO, bt as RESUME_MIN_SECONDS, Ia as ResumePrompt, xc as Reveal, O as SUBSCRIBABLE_EVENTS, hi as Scrubber, _ as Select, Qs as SettingsForm, ec as SettingsPage, lc as Sheet, ki as ShortcutsHelp, ns as SignupForm, os as SignupPage, o as Skeleton, y as Slider, Mi as SpeedMenu, bc as Spinner, x as Switch, Ra as TRANSCODE_EXTENSIONS, ds as Tabs, vc as ToastHost, dc as Tooltip, oo as TranscodeNotice, Ua as UPNEXT_COUNTDOWN_SECONDS, Ga as UPNEXT_RING_CIRCUMFERENCE, Wa as UPNEXT_RING_RADIUS, no as UpNext, ji as VolumeControl, ee as WEBHOOK_EVENT_CATEGORIES, Wi as activeAudioIndex, wc as adminMenu, ka as ambientGradient, Ui as applyAudioTrack, Wt as applyStoredThemeEarly, Hi as applyTrackModes, Ta as averageRegion, Jl as bindMediaStoreToRouter, Cc as buildAdminRoutes, Jn as buildMediaQuery, Yn as buildMediaUrl, ra as captionStyleVars, Ji as cleanCueText, rc as createPhlixApp, Vt as deriveAccentVars, na as edgeShadow, Ba as extensionOf, ui as formatTime, $e as fuzzyScore, xi as handleShortcut, Vi as hasActiveCaptions, ct as hasStoredPreferences, Aa as isBatterySaving, Ha as isFatalMediaError, bi as isTypingTarget, zi as listAudioTracks, Ri as listSubtitleTracks, et as matchCommand, Va as needsTranscode, Yi as readActiveCueLines, st as readStoredPreferences, Bi as resolveTextTrack, Da as rgbString, Oa as rgbaString, Ka as ringDashoffset, Ea as sampleAmbient, Wo as useAuthStore, nt as useCommandStore, u as useFocusTrap, Si as useKeyboardShortcuts, rn as useMediaStore, Tt as usePlayerStore, $ as usePreferencesStore, Gt as useTheme, n as useToastStore };

//# sourceMappingURL=phlix-ui.js.map