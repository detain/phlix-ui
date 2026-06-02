import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createStaticVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, markRaw as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, onUnmounted as x, openBlock as S, ref as C, renderList as w, renderSlot as T, resolveComponent as E, resolveDynamicComponent as D, toDisplayString as O, unref as k, useId as A, vModelDynamic as j, vModelText as M, vShow as N, watch as P, watchEffect as F, withCtx as I, withDirectives as L, withKeys as R, withModifiers as z } from "vue";
import { createPinia as B, defineStore as V } from "pinia";
import { RouterLink as H, RouterView as U, createRouter as ee, createWebHistory as te, useRoute as ne, useRouter as re } from "vue-router";
//#region \0plugin-vue:export-helper
var W = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ie = {}, ae = { class: "app-layout" }, oe = { class: "app-header" }, se = { class: "header-inner" }, ce = { class: "logo" }, le = { class: "nav" }, ue = { class: "app-main" }, de = { class: "app-footer" };
function fe(e, t) {
	return S(), c("div", ae, [
		l("header", oe, [l("div", se, [l("div", ce, [T(e.$slots, "logo", {}, () => [t[0] ||= l("span", { class: "logo-text" }, "Phlix", -1)], !0)]), l("nav", le, [T(e.$slots, "nav", {}, void 0, !0)])])]),
		l("main", ue, [T(e.$slots, "default", {}, void 0, !0)]),
		l("footer", de, [T(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var pe = /*#__PURE__*/ W(ie, [["render", fe], ["__scopeId", "data-v-9f6c6d16"]]), G = {
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
	atmosphere: !0
}, me = "phlix.prefs";
function he() {
	if (typeof localStorage > "u") return { ...G };
	try {
		let e = localStorage.getItem(me);
		if (!e) return { ...G };
		let t = JSON.parse(e);
		return {
			...G,
			...t
		};
	} catch {
		return { ...G };
	}
}
function ge() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var _e = V("phlix-prefs", () => {
	let e = he(), t = C(e.theme), n = C(e.accent), r = C(e.density), a = C(e.cardSize), o = C(e.gridDensity), s = C(e.reducedMotion), c = C(e.autoplay), l = C(e.defaultVolume), u = C(e.defaultQuality), d = C(e.defaultSubtitleLang), f = C(e.atmosphere), p = C(ge()), m = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (m = window.matchMedia("(prefers-reduced-motion: reduce)"), m.addEventListener?.("change", (e) => p.value = e.matches));
	let h = i(() => s.value === "on" ? !0 : s.value === "off" ? !1 : p.value);
	function g() {
		return {
			theme: t.value,
			accent: n.value,
			density: r.value,
			cardSize: a.value,
			gridDensity: o.value,
			reducedMotion: s.value,
			autoplay: c.value,
			defaultVolume: l.value,
			defaultQuality: u.value,
			defaultSubtitleLang: d.value,
			atmosphere: f.value
		};
	}
	P(g, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(me, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function _() {
		let e = G;
		t.value = e.theme, n.value = e.accent, r.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.reducedMotion, c.value = e.autoplay, l.value = e.defaultVolume, u.value = e.defaultQuality, d.value = e.defaultSubtitleLang, f.value = e.atmosphere;
	}
	return {
		theme: t,
		accent: n,
		density: r,
		cardSize: a,
		gridDensity: o,
		reducedMotion: s,
		autoplay: c,
		defaultVolume: l,
		defaultQuality: u,
		defaultSubtitleLang: d,
		atmosphere: f,
		systemReduced: p,
		effectiveReducedMotion: h,
		snapshot: g,
		reset: _
	};
});
//#endregion
//#region src/composables/color.ts
function ve(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var K = (e) => Math.max(0, Math.min(255, Math.round(e))), ye = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => K(e).toString(16).padStart(2, "0")).join("");
function be(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function xe(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var Se = ({ r: e, g: t, b: n }, r) => `rgba(${K(e)}, ${K(t)}, ${K(n)}, ${r})`;
function Ce({ r: e, g: t, b: n }) {
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
function we(e) {
	let t = ve(e);
	if (!t) return null;
	let n = Ce(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": ye(t),
		"--accent-hover": ye(be(t, .12)),
		"--accent-active": ye(xe(t, .12)),
		"--accent-soft": Se(t, .14),
		"--accent-ring": Se(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var Te = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function Ee(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? we(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of Te) n.style.removeProperty(e);
}
function De() {
	let e = he();
	Ee(e, e.reducedMotion === "on" ? !0 : e.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function Oe() {
	let e = _e();
	return F(() => {
		Ee({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var ke = { class: "main-nav" }, Ae = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "PhlixApp",
	setup(e) {
		return Oe(), (e, t) => (S(), o(pe, null, {
			nav: I(() => [l("nav", ke, [f(k(H), {
				to: "/app",
				class: "nav-link"
			}, {
				default: I(() => [...t[0] ||= [d("Browse", -1)]]),
				_: 1
			}), f(k(H), {
				to: "/app/settings",
				class: "nav-link"
			}, {
				default: I(() => [...t[1] ||= [d("Settings", -1)]]),
				_: 1
			})])]),
			default: I(() => [f(k(U))]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-4fa58c8a"]]), je = { class: "phlix-placeholder" }, Me = { class: "placeholder-content" }, Ne = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (S(), c("div", je, [l("div", Me, [n[0] ||= l("h1", null, "Shared UI loading...", -1), l("p", null, "Phlix " + O(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), Pe = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
};
function Fe(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
var q = class {
	baseUrl;
	tokens;
	doFetch;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? {
			getAccessToken: () => null,
			setAccessToken: () => {},
			getRefreshToken: () => null,
			setRefreshToken: () => {},
			getUser: () => null,
			setUser: () => {},
			clear: () => {}
		}, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis);
	}
	async request(e, t, n = null, r) {
		let i = () => {
			let t = { "Content-Type": "application/json" }, i = this.tokens.getAccessToken();
			i && (t.Authorization = `Bearer ${i}`);
			let a = {
				method: e,
				headers: t,
				credentials: "same-origin"
			};
			return r && (a.signal = r), n !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (a.body = JSON.stringify(n)), a;
		}, a = `${this.baseUrl}${t}`, o = await this.doFetch(a, i());
		return o.status === 401 && await this.refreshToken() && (o = await this.doFetch(a, i())), this.handleResponse(o);
	}
	async handleResponse(e) {
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new Pe(this.extractError(t), e.status, t);
		return t;
	}
	extractError(e) {
		if (e && typeof e == "object") {
			let t = e;
			if (typeof t.error == "string") return t.error;
			if (typeof t.message == "string") return t.message;
		}
		return "Request failed";
	}
	async refreshToken() {
		let e = this.tokens.getRefreshToken();
		if (!e) return !1;
		try {
			let t = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({ refresh_token: e })
			});
			if (!t.ok) return !1;
			let n = await t.json();
			return typeof n.access_token == "string" ? (this.tokens.setAccessToken(n.access_token), typeof n.refresh_token == "string" && this.tokens.setRefreshToken(n.refresh_token), !0) : !1;
		} catch {
			return !1;
		}
	}
	async get(e, t, n) {
		let r = t ? "?" + new URLSearchParams(t).toString() : "";
		return this.request("GET", e + r, null, n);
	}
	async post(e, t) {
		return this.request("POST", e, t ?? null);
	}
	async put(e, t) {
		return this.request("PUT", e, t ?? null);
	}
	async patch(e, t) {
		return this.request("PATCH", e, t ?? null);
	}
	async delete(e) {
		return this.request("DELETE", e);
	}
	isLoggedIn() {
		return this.tokens.getAccessToken() !== null;
	}
	async getCurrentUser() {
		let { user: e } = await this.get("/api/v1/auth/me");
		return {
			...e,
			is_admin: Fe(e.is_admin)
		};
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
	}
}, J = new q(), Ie = 6e4, Le = 250;
function Re(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var Y = V("media", () => {
	let e = C([]), t = C(0), n = C(!1), r = C(null), a = C(""), o = C([]), s = C(void 0), c = C(void 0), l = C([]), u = C([]), d = C("name"), f = C("asc"), p = C(24), m = C(0), h = i(() => e.value.length < t.value), g = i(() => {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = i(() => {
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
	function b(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings", e)), e.types?.forEach((e) => t.append("types", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function x(e, t) {
		return `${e}/api/v1/media?${b(t).toString()}`;
	}
	function S(e) {
		return b(e).toString();
	}
	let w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = null, D = null, O;
	function k(e) {
		return !!e && Date.now() - e.ts < Ie;
	}
	function A(e, t, n, r) {
		r && (D && n !== E && D.abort(), E = n);
		let i = T.get(n);
		if (i) return r && (D = i.controller), i.promise;
		let a = new AbortController();
		r && (D = a);
		let o = new q({ baseUrl: e }).get(x(e, t), void 0, a.signal).then((e) => (w.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			T.delete(n);
		});
		return T.set(n, {
			promise: o,
			controller: a
		}), o;
	}
	function j(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total;
	}
	async function M(e, t = !1) {
		let i = { ...g.value }, a = S(i), o = w.get(a);
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
			if (Re(e)) return;
			(t || a === E) && (r.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === E) && (n.value = !1);
		}
	}
	function N(e, t = Le) {
		m.value = 0, clearTimeout(O), O = setTimeout(() => M(e, !1), t);
	}
	async function P(t) {
		n.value || !h.value || (m.value = e.value.length, await M(t, !0));
	}
	async function F(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = S(n);
		if (!k(w.get(r))) try {
			await A(e, n, r, !1);
		} catch {}
	}
	function I() {
		w.clear();
	}
	function L() {
		clearTimeout(O);
	}
	function R() {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function z(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function B(e) {
		a.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = z(e.genres), l.value = z(e.ratings), u.value = z(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = i ?? "asc", m.value = 0;
	}
	function V() {
		e.value = [], t.value = 0, m.value = 0, r.value = null;
	}
	function H(e) {
		a.value = e, m.value = 0;
	}
	function U(e) {
		o.value = e, m.value = 0;
	}
	function ee(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function te(e) {
		l.value = e, m.value = 0;
	}
	function ne(e) {
		u.value = e, m.value = 0;
	}
	function re(e, t) {
		d.value = e, t && (f.value = t), m.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: r,
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
		fetchMedia: M,
		scheduleFetch: N,
		loadMore: P,
		prefetch: F,
		clearCache: I,
		cancelScheduled: L,
		toQuery: R,
		applyQuery: B,
		reset: V,
		setSearch: H,
		setGenres: U,
		setYearRange: ee,
		setRatings: te,
		setTypes: ne,
		setSort: re
	};
}), ze = { class: "media-card" }, Be = ["href"], Ve = { class: "card-poster" }, He = ["src", "alt"], Ue = {
	key: 1,
	class: "poster-placeholder"
}, We = { class: "placeholder-type" }, Ge = { class: "card-overlay" }, Ke = {
	key: 0,
	class: "card-year"
}, qe = {
	key: 1,
	class: "card-rating"
}, Je = { class: "card-info" }, Ye = ["title"], Xe = {
	key: 0,
	class: "card-genres"
}, Ze = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "MediaCard",
	props: {
		item: {},
		to: {}
	},
	setup(e) {
		return (t, n) => (S(), c("article", ze, [l("a", {
			href: e.to ?? `/app/player/${e.item.id}`,
			class: "card-link"
		}, [
			l("div", Ve, [e.item.poster_url ? (S(), c("img", {
				key: 0,
				src: e.item.poster_url,
				alt: e.item.name,
				loading: "lazy"
			}, null, 8, He)) : (S(), c("div", Ue, [n[0] ||= l("span", { class: "placeholder-icon" }, "🎬", -1), l("span", We, O(e.item.type), 1)]))]),
			l("div", Ge, [e.item.year ? (S(), c("span", Ke, O(e.item.year), 1)) : s("", !0), e.item.rating ? (S(), c("span", qe, O(e.item.rating), 1)) : s("", !0)]),
			l("div", Je, [l("h3", {
				class: "card-title",
				title: e.item.name
			}, O(e.item.name), 9, Ye), e.item.genres?.length ? (S(), c("p", Xe, O(e.item.genres.slice(0, 2).join(", ")), 1)) : s("", !0)])
		], 8, Be)]));
	}
}), [["__scopeId", "data-v-e60c8481"]]), Qe = { class: "media-grid-container" }, $e = {
	key: 0,
	class: "media-grid-skeleton"
}, et = {
	key: 1,
	class: "media-grid-empty"
}, tt = {
	key: 2,
	class: "media-grid"
}, nt = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "MediaGrid",
	props: {
		items: {},
		loading: { type: Boolean }
	},
	setup(t) {
		return (n, r) => (S(), c("div", Qe, [t.loading ? (S(), c("div", $e, [(S(), c(e, null, w(12, (e) => l("div", {
			key: e,
			class: "skeleton-card"
		}, [...r[0] ||= [l("div", { class: "skeleton-poster" }, null, -1), l("div", { class: "skeleton-title" }, null, -1)]])), 64))])) : t.items.length === 0 ? (S(), c("div", et, [...r[1] ||= [l("p", null, "No media found.", -1), l("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)]])) : (S(), c("div", tt, [(S(!0), c(e, null, w(t.items, (e) => (S(), o(Ze, {
			key: e.id,
			item: e
		}, null, 8, ["item"]))), 128))]))]));
	}
}), [["__scopeId", "data-v-b7e87216"]]), rt = { class: "filter-bar" }, it = { class: "filter-search" }, at = { class: "filter-row" }, ot = { class: "filter-group" }, st = ["value"], ct = ["value"], lt = ["value"], ut = { class: "filter-group" }, dt = ["value"], ft = ["value"], pt = ["value"], mt = ["value"], ht = { class: "filter-section" }, gt = { class: "filter-chips" }, _t = ["onClick"], vt = { class: "filter-section" }, yt = { class: "filter-chips" }, bt = ["onClick"], xt = { class: "filter-section" }, St = { class: "filter-chips" }, Ct = ["onClick"], wt = { class: "filter-actions" }, Tt = { class: "result-count" }, Et = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "FilterBar",
	setup(t) {
		let n = Y(), r = C(n.search), a = [
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
				label: "Date Added"
			},
			{
				value: "runtime",
				label: "Runtime"
			}
		];
		function o() {
			n.setSearch(r.value);
		}
		function s(e) {
			let t = n.selectedGenres;
			t.includes(e) ? n.setGenres(t.filter((t) => t !== e)) : n.setGenres([...t, e]);
		}
		function u(e) {
			let t = n.selectedRatings;
			t.includes(e) ? n.setRatings(t.filter((t) => t !== e)) : n.setRatings([...t, e]);
		}
		function d(e) {
			let t = n.selectedTypes;
			t.includes(e) ? n.setTypes(t.filter((t) => t !== e)) : n.setTypes([...t, e]);
		}
		function f(e) {
			let t = e.target;
			n.setSort(t.value);
		}
		function p(e) {
			n.order = e.target.value;
		}
		let m = (/* @__PURE__ */ new Date()).getFullYear(), h = i(() => {
			let e = [];
			for (let t = m; t >= 1900; t--) e.push(t);
			return e;
		});
		function g() {
			r.value = "", n.search = "", n.setGenres([]), n.setYearRange(void 0, void 0), n.setRatings([]), n.setTypes([]), n.setSort("name");
		}
		return (t, i) => (S(), c("div", rt, [
			l("div", it, [L(l("input", {
				"onUpdate:modelValue": i[0] ||= (e) => r.value = e,
				type: "search",
				placeholder: "Search media...",
				class: "search-input",
				onInput: o
			}, null, 544), [[M, r.value]])]),
			l("div", at, [l("div", ot, [
				i[4] ||= l("label", { class: "filter-label" }, "Sort", -1),
				l("select", {
					class: "filter-select",
					value: k(n).sort,
					onChange: f
				}, [(S(), c(e, null, w(a, (e) => l("option", {
					key: e.value,
					value: e.value
				}, O(e.label), 9, ct)), 64))], 40, st),
				l("select", {
					class: "filter-select order-select",
					value: k(n).order,
					onChange: p
				}, [...i[3] ||= [l("option", { value: "asc" }, "↑", -1), l("option", { value: "desc" }, "↓", -1)]], 40, lt)
			]), l("div", ut, [
				i[7] ||= l("label", { class: "filter-label" }, "Year", -1),
				l("select", {
					class: "filter-select",
					value: k(n).yearFrom ?? "",
					onChange: i[1] ||= (e) => k(n).setYearRange(e.target.value ? Number(e.target.value) : void 0, k(n).yearTo)
				}, [i[5] ||= l("option", { value: "" }, "From", -1), (S(!0), c(e, null, w(h.value.slice(0, 50), (e) => (S(), c("option", {
					key: e,
					value: e
				}, O(e), 9, ft))), 128))], 40, dt),
				l("select", {
					class: "filter-select",
					value: k(n).yearTo ?? "",
					onChange: i[2] ||= (e) => k(n).setYearRange(k(n).yearFrom, e.target.value ? Number(e.target.value) : void 0)
				}, [i[6] ||= l("option", { value: "" }, "To", -1), (S(!0), c(e, null, w(h.value.slice(0, 50), (e) => (S(), c("option", {
					key: e,
					value: e
				}, O(e), 9, mt))), 128))], 40, pt)
			])]),
			l("div", ht, [i[8] ||= l("span", { class: "filter-label" }, "Genres", -1), l("div", gt, [(S(!0), c(e, null, w(k(n).availableGenres, (e) => (S(), c("button", {
				key: e,
				class: _(["chip", { active: k(n).selectedGenres.includes(e) }]),
				onClick: (t) => s(e)
			}, O(e), 11, _t))), 128))])]),
			l("div", vt, [i[9] ||= l("span", { class: "filter-label" }, "Rating", -1), l("div", yt, [(S(!0), c(e, null, w(k(n).availableRatings, (e) => (S(), c("button", {
				key: e,
				class: _(["chip", { active: k(n).selectedRatings.includes(e) }]),
				onClick: (t) => u(e)
			}, O(e), 11, bt))), 128))])]),
			l("div", xt, [i[10] ||= l("span", { class: "filter-label" }, "Type", -1), l("div", St, [(S(!0), c(e, null, w(k(n).availableTypes, (e) => (S(), c("button", {
				key: e,
				class: _(["chip", { active: k(n).selectedTypes.includes(e) }]),
				onClick: (t) => d(e)
			}, O(e), 11, Ct))), 128))])]),
			l("div", wt, [l("button", {
				class: "clear-btn",
				onClick: g
			}, "Clear filters"), l("span", Tt, O(k(n).total) + " result" + O(k(n).total === 1 ? "" : "s"), 1)])
		]));
	}
}), [["__scopeId", "data-v-7089ec0b"]]), Dt = { class: "browse-page" }, Ot = { class: "browse-header" }, kt = { class: "browse-toolbar-extra" }, At = {
	key: 0,
	class: "browse-error"
}, jt = {
	key: 1,
	class: "load-more"
}, Mt = {
	key: 2,
	class: "loading-more"
}, Nt = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "BrowsePage",
	setup(e) {
		let t = m("apiBase") ?? i(() => ""), n = Y();
		function r() {
			n.reset(), n.fetchMedia(t.value);
		}
		b(r), P(t, r);
		function a() {
			n.reset(), n.fetchMedia(t.value);
		}
		function o() {
			n.loadMore(t.value);
		}
		return (e, t) => (S(), c("div", Dt, [
			l("div", Ot, [t[0] ||= l("h1", { class: "browse-title" }, "Browse Media", -1), l("div", kt, [T(e.$slots, "toolbar-extra", {}, void 0, !0)])]),
			f(Et, { onChange: a }),
			k(n).error ? (S(), c("div", At, [l("p", null, O(k(n).error), 1), l("button", {
				class: "retry-btn",
				onClick: r
			}, "Retry")])) : s("", !0),
			f(nt, {
				items: k(n).items,
				loading: k(n).loading && k(n).items.length === 0
			}, null, 8, ["items", "loading"]),
			k(n).hasMore && !k(n).loading ? (S(), c("div", jt, [l("button", {
				class: "load-more-btn",
				onClick: o
			}, "Load more")])) : s("", !0),
			k(n).loading && k(n).items.length > 0 ? (S(), c("div", Mt, " Loading... ")) : s("", !0)
		]));
	}
}), [["__scopeId", "data-v-c192afa6"]]), Pt = ["src", "poster"], Ft = { class: "controls-top" }, It = { class: "media-title" }, Lt = {
	key: 0,
	class: "media-year"
}, Rt = { class: "controls-center" }, zt = { class: "controls-bottom" }, Bt = { class: "progress-track" }, Vt = { class: "controls-row" }, Ht = { class: "time-display" }, Ut = { class: "volume-control" }, Wt = ["value"], Gt = { class: "speed-control" }, Kt = ["value"], qt = { class: "time-display" }, Jt = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {}
	},
	setup(e) {
		let t = C(null), n = C(!1), r = C(0), a = C(0), o = C(1), d = C(!1), f = C(1), p = C(!1), m = C(!0), h = null, g = i(() => a.value > 0 ? r.value / a.value * 100 : 0);
		function y(e) {
			return !isFinite(e) || isNaN(e) ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function b() {
			t.value && (n.value ? t.value.pause() : t.value.play());
		}
		function w() {
			t.value && (r.value = t.value.currentTime);
		}
		function T() {
			t.value && (a.value = t.value.duration);
		}
		function E(e) {
			let n = e.currentTarget.getBoundingClientRect(), r = (e.clientX - n.left) / n.width;
			t.value && (t.value.currentTime = r * a.value);
		}
		function D(e) {
			let n = parseFloat(e.target.value);
			o.value = n, t.value && (t.value.volume = n), d.value = n === 0;
		}
		function k() {
			d.value = !d.value, t.value && (t.value.muted = d.value);
		}
		function A(e) {
			f.value = e, t.value && (t.value.playbackRate = e);
		}
		function j() {
			let e = t.value?.closest(".player-container");
			e && (document.fullscreenElement ? (document.exitFullscreen(), p.value = !1) : (e.requestFullscreen(), p.value = !0));
		}
		function M() {
			m.value = !0, h && clearTimeout(h), h = setTimeout(() => {
				n.value && (m.value = !1);
			}, 3e3);
		}
		return x(() => {
			h && clearTimeout(h);
		}), (i, h) => (S(), c("div", {
			class: _(["player-container", { "controls-hidden": !m.value && n.value }]),
			onMousemove: M,
			onClick: b
		}, [
			h[6] ||= l("div", { class: "player-overlay" }, null, -1),
			l("video", {
				ref_key: "videoRef",
				ref: t,
				class: "player-video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				onPlay: h[0] ||= (e) => n.value = !0,
				onPause: h[1] ||= (e) => n.value = !1,
				onTimeupdate: w,
				onLoadedmetadata: T,
				onClick: z(b, ["stop"])
			}, null, 40, Pt),
			l("div", {
				class: "player-controls",
				onClick: h[4] ||= z(() => {}, ["stop"])
			}, [
				l("div", Ft, [
					l("button", {
						class: "ctrl-btn back-btn",
						onClick: h[2] ||= (e) => i.$router.back()
					}, " ← Back "),
					l("span", It, O(e.media.name), 1),
					e.media.year ? (S(), c("span", Lt, O(e.media.year), 1)) : s("", !0)
				]),
				l("div", Rt, [l("button", {
					class: "play-btn",
					onClick: b
				}, O(n.value ? "❚❚" : "▶"), 1)]),
				l("div", zt, [l("div", {
					class: "progress-bar",
					onClick: E
				}, [l("div", Bt, [l("div", {
					class: "progress-fill",
					style: v({ width: g.value + "%" })
				}, null, 4)])]), l("div", Vt, [
					l("span", Ht, O(y(r.value)), 1),
					l("div", Ut, [l("button", {
						class: "ctrl-btn",
						onClick: k
					}, O(d.value || o.value === 0 ? "🔇" : "🔊"), 1), l("input", {
						type: "range",
						min: "0",
						max: "1",
						step: "0.05",
						value: d.value ? 0 : o.value,
						class: "volume-slider",
						onInput: D
					}, null, 40, Wt)]),
					l("div", Gt, [l("select", {
						class: "speed-select",
						value: f.value,
						onChange: h[3] ||= (e) => A(Number(e.target.value))
					}, [...h[5] ||= [u("<option value=\"0.5\" data-v-7a51063f>0.5×</option><option value=\"0.75\" data-v-7a51063f>0.75×</option><option value=\"1\" data-v-7a51063f>1×</option><option value=\"1.25\" data-v-7a51063f>1.25×</option><option value=\"1.5\" data-v-7a51063f>1.5×</option><option value=\"2\" data-v-7a51063f>2×</option>", 6)]], 40, Kt)]),
					l("span", qt, O(y(a.value)), 1),
					l("button", {
						class: "ctrl-btn",
						onClick: j
					}, O(p.value ? "⤓" : "⤢"), 1)
				])])
			])
		], 34));
	}
}), [["__scopeId", "data-v-7a51063f"]]), Yt = { class: "player-page" }, Xt = {
	key: 0,
	class: "player-loading"
}, Zt = {
	key: 1,
	class: "player-error"
}, Qt = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "PlayerPage",
	setup(e) {
		let t = m("apiBase", i(() => "")), n = ne(), r = C(null), a = C(""), u = C(!0), d = C(null);
		async function f() {
			let e = n.params.id;
			if (!e) {
				d.value = "No media ID provided", u.value = !1;
				return;
			}
			try {
				let n = new q({ baseUrl: t.value }), [i, o] = await Promise.all([n.get(`/api/v1/media/${e}`), n.get(`/api/v1/media/${e}/playback-info`).catch(() => null)]);
				r.value = i, o?.url ? a.value = o.url : a.value = `${t.value}/media/${e}/stream`;
			} catch (e) {
				d.value = e instanceof Error ? e.message : "Failed to load media";
			} finally {
				u.value = !1;
			}
		}
		return b(f), (e, t) => (S(), c("div", Yt, [u.value ? (S(), c("div", Xt, "Loading...")) : d.value ? (S(), c("div", Zt, [l("p", null, O(d.value), 1), l("button", {
			class: "retry-btn",
			onClick: f
		}, "Retry")])) : r.value ? (S(), o(Jt, {
			key: 2,
			media: r.value,
			"stream-url": a.value
		}, null, 8, ["media", "stream-url"])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-d9061b47"]]), $t = "access_token", en = "refresh_token", tn = "user", nn = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem($t);
	}
	setAccessToken(e) {
		this.storage.setItem($t, e);
	}
	getRefreshToken() {
		return this.storage.getItem(en);
	}
	setRefreshToken(e) {
		this.storage.setItem(en, e);
	}
	getUser() {
		let e = this.storage.getItem(tn);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(tn, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem($t), this.storage.removeItem(en), this.storage.removeItem(tn);
	}
}, X = V("auth", () => {
	let e = new nn(), t = new q({
		tokenStore: e,
		baseUrl: m("apiBase", "")
	}), n = C(null), r = C(!1), a = C(null), o = C(e.getAccessToken()), s = i(() => o.value !== null), c = i(() => n.value?.is_admin === !0);
	function l(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), o.value = t;
	}
	async function u(e, n) {
		r.value = !0, a.value = null;
		try {
			let r = await t.post("/api/v1/auth/login", {
				email: e,
				password: n
			});
			return l(r.access_token, r.refresh_token), await f(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function d(e, n, i) {
		r.value = !0, a.value = null;
		try {
			let r = await t.post("/api/v1/auth/register", {
				email: e,
				username: n,
				password: i
			});
			return l(r.access_token, r.refresh_token), await f(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function f() {
		if (s.value) try {
			n.value = await t.getCurrentUser();
		} catch {
			n.value = null, e.clear(), o.value = null;
		}
	}
	function p() {
		e.clear(), o.value = null, n.value = null;
	}
	return {
		user: n,
		loading: r,
		error: a,
		isLoggedIn: s,
		isAdmin: c,
		client: t,
		login: u,
		signup: d,
		fetchUser: f,
		logout: p
	};
}), rn = {
	key: 0,
	class: "form-error"
}, an = { class: "field" }, on = { class: "field" }, sn = { class: "password-wrapper" }, cn = ["type"], ln = ["disabled"], un = { class: "form-footer" }, dn = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = X(), i = re(), a = C(""), o = C(""), u = C(!1);
		async function p() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = E("router-link");
			return S(), c("form", {
				class: "login-form",
				onSubmit: z(p, ["prevent"])
			}, [
				t[7] ||= l("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				k(r).error ? (S(), c("div", rn, O(k(r).error), 1)) : s("", !0),
				l("div", an, [t[3] ||= l("label", {
					for: "email",
					class: "label"
				}, "Email", -1), L(l("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[M, a.value]])]),
				l("div", on, [t[4] ||= l("label", {
					for: "password",
					class: "label"
				}, "Password", -1), l("div", sn, [L(l("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: u.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, cn), [[j, o.value]]), l("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => u.value = !u.value
				}, O(u.value ? "🙈" : "👁"), 1)])]),
				l("button", {
					type: "submit",
					class: "submit-btn",
					disabled: k(r).loading
				}, O(k(r).loading ? "Signing in..." : "Sign in"), 9, ln),
				l("p", un, [t[6] ||= d(" Don't have an account? ", -1), f(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: I(() => [...t[5] ||= [d("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), fn = { class: "auth-page" }, pn = { class: "auth-card" }, mn = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (S(), c("div", fn, [l("div", pn, [f(dn, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), hn = {
	key: 0,
	class: "form-error"
}, gn = { class: "field" }, _n = { class: "field" }, vn = { class: "field" }, yn = { class: "password-wrapper" }, bn = ["type"], xn = { class: "field" }, Sn = ["type"], Cn = ["disabled"], wn = { class: "form-footer" }, Tn = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = X(), i = re(), a = C(""), o = C(""), u = C(""), p = C(""), m = C(!1), h = C(null);
		async function g() {
			if (h.value = null, u.value.length < 8) {
				h.value = "Password must be at least 8 characters.";
				return;
			}
			if (u.value !== p.value) {
				h.value = "Passwords do not match.";
				return;
			}
			await r.signup(a.value, o.value, u.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = E("router-link");
			return S(), c("form", {
				class: "signup-form",
				onSubmit: z(g, ["prevent"])
			}, [
				t[11] ||= l("h2", { class: "form-title" }, "Create your Phlix account", -1),
				k(r).error || h.value ? (S(), c("div", hn, O(k(r).error || h.value), 1)) : s("", !0),
				l("div", gn, [t[5] ||= l("label", {
					for: "email",
					class: "label"
				}, "Email", -1), L(l("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[M, a.value]])]),
				l("div", _n, [t[6] ||= l("label", {
					for: "username",
					class: "label"
				}, "Username", -1), L(l("input", {
					id: "username",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: "text",
					class: "input",
					placeholder: "Your username",
					required: "",
					autocomplete: "username",
					minlength: "3"
				}, null, 512), [[M, o.value]])]),
				l("div", vn, [t[7] ||= l("label", {
					for: "password",
					class: "label"
				}, "Password", -1), l("div", yn, [L(l("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => u.value = e,
					type: m.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, bn), [[j, u.value]]), l("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => m.value = !m.value
				}, O(m.value ? "🙈" : "👁"), 1)])]),
				l("div", xn, [t[8] ||= l("label", {
					for: "confirm",
					class: "label"
				}, "Confirm password", -1), L(l("input", {
					id: "confirm",
					"onUpdate:modelValue": t[4] ||= (e) => p.value = e,
					type: m.value ? "text" : "password",
					class: "input",
					placeholder: "Repeat your password",
					required: "",
					autocomplete: "new-password"
				}, null, 8, Sn), [[j, p.value]])]),
				l("button", {
					type: "submit",
					class: "submit-btn",
					disabled: k(r).loading
				}, O(k(r).loading ? "Creating account..." : "Create account"), 9, Cn),
				l("p", wn, [t[10] ||= d(" Already have an account? ", -1), f(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: I(() => [...t[9] ||= [d("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), En = { class: "auth-page" }, Dn = { class: "auth-card" }, On = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (S(), c("div", En, [l("div", Dn, [f(Tn, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), kn = { class: "settings-form" }, An = {
	key: 0,
	class: "settings-loading"
}, jn = {
	key: 1,
	class: "settings-error"
}, Mn = { class: "group-title" }, Nn = ["for"], Pn = { class: "setting-control" }, Fn = [
	"id",
	"checked",
	"onChange"
], In = [
	"id",
	"value",
	"onChange"
], Ln = [
	"id",
	"value",
	"onChange"
], Rn = { class: "settings-actions" }, zn = {
	key: 0,
	class: "success-msg"
}, Bn = ["disabled"], Vn = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = X(), u = C({}), d = C(!0), f = C(!1), p = C(null), m = C(null), h = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], g = i(() => r.groups ? h.filter((e) => r.groups.includes(e)) : h);
		async function _() {
			d.value = !0, p.value = null;
			try {
				u.value = await o.client.get("/api/v1/users/me/settings");
			} catch (e) {
				p.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				d.value = !1;
			}
		}
		async function v() {
			f.value = !0, p.value = null, m.value = null;
			try {
				await o.client.put("/api/v1/users/me/settings", u.value), m.value = "Settings saved.", a("saved", u.value), setTimeout(() => {
					m.value = null;
				}, 3e3);
			} catch (e) {
				p.value = e instanceof Error ? e.message : "Failed to save settings";
			} finally {
				f.value = !1;
			}
		}
		function y(e, t) {
			u.value[e] = t;
		}
		b(_);
		let x = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, T = {
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
		return (t, n) => (S(), c("div", kn, [d.value ? (S(), c("div", An, "Loading settings...")) : p.value ? (S(), c("div", jn, O(p.value), 1)) : (S(), c(e, { key: 2 }, [(S(!0), c(e, null, w(g.value, (t) => (S(), c("div", {
			key: t,
			class: "settings-group"
		}, [l("h3", Mn, O(x[t]), 1), (S(), c(e, null, w(T, (e, n) => L(l("div", {
			key: n,
			class: "setting-row"
		}, [l("label", {
			for: n,
			class: "setting-label"
		}, O(e.label), 9, Nn), l("div", Pn, [e.type === "bool" ? (S(), c("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!u.value[n],
			onChange: (e) => y(n, e.target.checked)
		}, null, 40, Fn)) : e.type === "number" ? (S(), c("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: u.value[n],
			onChange: (e) => y(n, Number(e.target.value))
		}, null, 40, In)) : (S(), c("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: u.value[n] ?? "",
			onChange: (e) => y(n, e.target.value)
		}, null, 40, Ln))])]), [[N, n.startsWith(t)]])), 64))]))), 128)), l("div", Rn, [m.value ? (S(), c("div", zn, O(m.value), 1)) : s("", !0), l("button", {
			class: "save-btn",
			disabled: f.value,
			onClick: v
		}, O(f.value ? "Saving..." : "Save settings"), 9, Bn)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), Hn = { class: "settings-page" }, Un = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (S(), c("div", Hn, [t[0] ||= l("div", { class: "settings-header" }, [l("h1", { class: "settings-title" }, "Settings")], -1), f(Vn)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function Wn() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function Gn(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: Nt
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: Qt
		},
		{
			path: `${t}/login`,
			name: "login",
			component: mn
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: On
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: Un
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: Ne,
		props: { appName: e.app }
	}), n;
}
function Kn(e) {
	let t = {
		...Wn(),
		...e
	};
	De();
	let n = B(), r = ee({
		history: te(t.routerBase || "/app"),
		routes: Gn(t)
	}), i = a(Ae);
	return i.provide("apiBase", t.apiBase), i.use(n), i.use(r), i;
}
//#endregion
//#region ~icons/lucide/play
var qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jn(e, t) {
	return S(), c("svg", qn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var Yn = h({
	name: "lucide-play",
	render: Jn
}), Xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zn(e, t) {
	return S(), c("svg", Xn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), l("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var Qn = h({
	name: "lucide-pause",
	render: Zn
}), $n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function er(e, t) {
	return S(), c("svg", $n, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var tr = h({
	name: "lucide-skip-back",
	render: er
}), nr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rr(e, t) {
	return S(), c("svg", nr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var ir = h({
	name: "lucide-skip-forward",
	render: rr
}), ar = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function or(e, t) {
	return S(), c("svg", ar, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), l("path", { d: "M3 3v5h5" })], -1)]]);
}
var sr = h({
	name: "lucide-rotate-ccw",
	render: or
}), cr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lr(e, t) {
	return S(), c("svg", cr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), l("path", { d: "M21 3v5h-5" })], -1)]]);
}
var ur = h({
	name: "lucide-rotate-cw",
	render: lr
}), dr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fr(e, t) {
	return S(), c("svg", dr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var pr = h({
	name: "lucide-volume-2",
	render: fr
}), mr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hr(e, t) {
	return S(), c("svg", mr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var gr = h({
	name: "lucide-volume-1",
	render: hr
}), _r = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vr(e, t) {
	return S(), c("svg", _r, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var yr = h({
	name: "lucide-volume-x",
	render: vr
}), br = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xr(e, t) {
	return S(), c("svg", br, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), l("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var Sr = h({
	name: "lucide-captions",
	render: xr
}), Cr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wr(e, t) {
	return S(), c("svg", Cr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), l("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var Tr = h({
	name: "lucide-picture-in-picture-2",
	render: wr
}), Er = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dr(e, t) {
	return S(), c("svg", Er, [...t[0] ||= [l("rect", {
		width: "20",
		height: "12",
		x: "2",
		y: "6",
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		rx: "2"
	}, null, -1)]]);
}
var Or = h({
	name: "lucide-rectangle-horizontal",
	render: Dr
}), kr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ar(e, t) {
	return S(), c("svg", kr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var jr = h({
	name: "lucide-maximize",
	render: Ar
}), Mr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nr(e, t) {
	return S(), c("svg", Mr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var Pr = h({
	name: "lucide-minimize",
	render: Nr
}), Fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ir(e, t) {
	return S(), c("svg", Fr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var Lr = h({
	name: "lucide-maximize-2",
	render: Ir
}), Rr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zr(e, t) {
	return S(), c("svg", Rr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var Br = h({
	name: "lucide-cast",
	render: zr
}), Vr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Hr(e, t) {
	return S(), c("svg", Vr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), l("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var Ur = h({
	name: "lucide-settings",
	render: Hr
}), Wr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gr(e, t) {
	return S(), c("svg", Wr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Kr = h({
	name: "lucide-gauge",
	render: Gr
}), qr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jr(e, t) {
	return S(), c("svg", qr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), l("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var Yr = h({
	name: "lucide-film",
	render: Jr
}), Xr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zr(e, t) {
	return S(), c("svg", Xr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		l("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		l("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var Qr = h({
	name: "lucide-image",
	render: Zr
}), $r = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ei(e, t) {
	return S(), c("svg", $r, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("path", { d: "M9 18V5l12-2v13" }),
		l("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		l("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var ti = h({
	name: "lucide-music",
	render: ei
}), ni = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ri(e, t) {
	return S(), c("svg", ni, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "m17 2l-5 5l-5-5" }), l("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var ii = h({
	name: "lucide-tv",
	render: ri
}), ai = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oi(e, t) {
	return S(), c("svg", ai, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "m21 21l-4.34-4.34" }), l("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var si = h({
	name: "lucide-search",
	render: oi
}), ci = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function li(e, t) {
	return S(), c("svg", ci, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var ui = h({
	name: "lucide-sliders-horizontal",
	render: li
}), di = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fi(e, t) {
	return S(), c("svg", di, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("path", { d: "M8 2v4m8-4v4" }),
		l("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		l("path", { d: "M3 10h18" })
	], -1)]]);
}
var pi = h({
	name: "lucide-calendar",
	render: fi
}), mi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hi(e, t) {
	return S(), c("svg", mi, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var gi = h({
	name: "lucide-arrow-up-down",
	render: hi
}), _i = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vi(e, t) {
	return S(), c("svg", _i, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var yi = h({
	name: "lucide-star",
	render: vi
}), bi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xi(e, t) {
	return S(), c("svg", bi, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var Si = h({
	name: "lucide-list",
	render: xi
}), Ci = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wi(e, t) {
	return S(), c("svg", Ci, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var Ti = h({
	name: "lucide-plus",
	render: wi
}), Ei = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Di(e, t) {
	return S(), c("svg", Ei, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var Oi = h({
	name: "lucide-info",
	render: Di
}), ki = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ai(e, t) {
	return S(), c("svg", ki, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var ji = h({
	name: "lucide-x",
	render: Ai
}), Mi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ni(e, t) {
	return S(), c("svg", Mi, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var Pi = h({
	name: "lucide-check",
	render: Ni
}), Fi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ii(e, t) {
	return S(), c("svg", Fi, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Li = h({
	name: "lucide-bookmark",
	render: Ii
}), Ri = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zi(e, t) {
	return S(), c("svg", Ri, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Bi = h({
	name: "lucide-bookmark-plus",
	render: zi
}), Vi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Hi(e, t) {
	return S(), c("svg", Vi, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Ui = h({
	name: "lucide-heart",
	render: Hi
}), Wi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gi(e, t) {
	return S(), c("svg", Wi, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), l("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Ki = h({
	name: "lucide-user",
	render: Gi
}), qi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ji(e, t) {
	return S(), c("svg", qi, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Yi = h({
	name: "lucide-log-out",
	render: Ji
}), Xi = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zi(e, t) {
	return S(), c("svg", Xi, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Qi = h({
	name: "lucide-menu",
	render: Zi
}), $i = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ea(e, t) {
	return S(), c("svg", $i, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		l("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		l("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var ta = h({
	name: "lucide-more-horizontal",
	render: ea
}), na = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ra(e, t) {
	return S(), c("svg", na, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), l("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var ia = h({
	name: "lucide-eye",
	render: ra
}), aa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oa(e, t) {
	return S(), c("svg", aa, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), l("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var sa = h({
	name: "lucide-eye-off",
	render: oa
}), ca = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function la(e, t) {
	return S(), c("svg", ca, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var ua = h({
	name: "lucide-arrow-left",
	render: la
}), da = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fa(e, t) {
	return S(), c("svg", da, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var pa = h({
	name: "lucide-arrow-up",
	render: fa
}), ma = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ha(e, t) {
	return S(), c("svg", ma, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var ga = h({
	name: "lucide-arrow-down",
	render: ha
}), _a = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function va(e, t) {
	return S(), c("svg", _a, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var ya = h({
	name: "lucide-chevron-down",
	render: va
}), ba = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xa(e, t) {
	return S(), c("svg", ba, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var Sa = h({
	name: "lucide-chevron-up",
	render: xa
}), Ca = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wa(e, t) {
	return S(), c("svg", Ca, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Ta = h({
	name: "lucide-chevron-left",
	render: wa
}), Ea = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Da(e, t) {
	return S(), c("svg", Ea, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Oa = h({
	name: "lucide-chevron-right",
	render: Da
}), ka = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Aa(e, t) {
	return S(), c("svg", ka, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var ja = h({
	name: "lucide-loader-circle",
	render: Aa
}), Ma = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Na(e, t) {
	return S(), c("svg", Ma, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var Pa = h({
	name: "lucide-circle-alert",
	render: Na
}), Fa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ia(e, t) {
	return S(), c("svg", Fa, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var La = h({
	name: "lucide-circle-check",
	render: Ia
}), Ra = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function za(e, t) {
	return S(), c("svg", Ra, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var Ba = h({
	name: "lucide-circle-x",
	render: za
}), Va = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ha(e, t) {
	return S(), c("svg", Va, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), l("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var Ua = h({
	name: "lucide-sun",
	render: Ha
}), Wa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ga(e, t) {
	return S(), c("svg", Wa, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Ka = h({
	name: "lucide-moon",
	render: Ga
}), qa = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ja(e, t) {
	return S(), c("svg", qa, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), l("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var Ya = h({
	name: "lucide-monitor",
	render: Ja
}), Z = /* @__PURE__ */ p({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = {
			play: Yn,
			pause: Qn,
			"skip-back": tr,
			"skip-forward": ir,
			rewind: sr,
			forward: ur,
			volume: pr,
			"volume-low": gr,
			mute: yr,
			captions: Sr,
			pip: Tr,
			theater: Or,
			fullscreen: jr,
			"fullscreen-exit": Pr,
			expand: Lr,
			cast: Br,
			settings: Ur,
			speed: Kr,
			film: Yr,
			image: Qr,
			music: ti,
			tv: ii,
			search: si,
			filter: ui,
			calendar: pi,
			sort: gi,
			star: yi,
			list: Si,
			plus: Ti,
			info: Oi,
			x: ji,
			check: Pi,
			bookmark: Li,
			"bookmark-plus": Bi,
			heart: Ui,
			user: Ki,
			"log-out": Yi,
			menu: Qi,
			more: ta,
			eye: ia,
			"eye-off": sa,
			"arrow-left": ua,
			"arrow-up": pa,
			"arrow-down": ga,
			"chevron-down": ya,
			"chevron-up": Sa,
			"chevron-left": Ta,
			"chevron-right": Oa,
			spinner: ja,
			alert: Pa,
			success: La,
			error: Ba,
			sun: Ua,
			moon: Ka,
			monitor: Ya
		}, n = e, r = i(() => t[n.name]), a = i(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (t, n) => (S(), o(D(r.value), {
			class: "phlix-icon",
			style: v(a.value ? { fontSize: a.value } : void 0),
			"stroke-width": e.strokeWidth,
			role: e.label ? "img" : void 0,
			"aria-label": e.label,
			"aria-hidden": e.label ? void 0 : "true",
			focusable: "false"
		}, null, 8, [
			"style",
			"stroke-width",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
}), Xa = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, Za = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
	setup(t) {
		let n = t, r = C(!1), a = null, o = null, l = () => r.value = !!(a?.matches || o?.matches);
		b(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (a = window.matchMedia("(prefers-reduced-motion: reduce)"), o = window.matchMedia("(prefers-reduced-data: reduce)"), l(), a.addEventListener?.("change", l), o.addEventListener?.("change", l));
		}), y(() => {
			a?.removeEventListener?.("change", l), o?.removeEventListener?.("change", l);
		});
		let u = i(() => n.enabled && !r.value), d = i(() => u.value && n.ambient && !!(n.ambientColor || n.ambientImage));
		function f(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let p = i(() => n.ambientImage ? {
			backgroundImage: `url("${f(n.ambientImage)}")`,
			opacity: String(.55 * n.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${n.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${n.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * n.intensity)
		}), m = i(() => ({ opacity: `calc(var(--grain-opacity) * ${n.intensity})` }));
		return (n, r) => (S(), c(e, null, [
			d.value ? (S(), c("div", {
				key: 0,
				class: _(["phlix-backdrop__ambient", { "is-image": !!t.ambientImage }]),
				style: v(p.value),
				"aria-hidden": "true"
			}, null, 6)) : s("", !0),
			u.value && t.vignette ? (S(), c("div", Xa)) : s("", !0),
			u.value && t.grain ? (S(), c("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: v(m.value),
				"aria-hidden": "true"
			}, null, 4)) : s("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), Qa = [
	"type",
	"disabled",
	"aria-busy"
], $a = {
	key: 0,
	class: "phlix-btn__spinner"
}, eo = { class: "phlix-btn__label" }, to = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Button",
	props: {
		variant: { default: "solid" },
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
		block: {
			type: Boolean,
			default: !1
		},
		leftIcon: {},
		rightIcon: {}
	},
	setup(e) {
		let t = e, n = i(() => t.disabled || t.loading);
		return (t, r) => (S(), c("button", {
			type: e.type,
			class: _(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: n.value,
			"aria-busy": e.loading || void 0
		}, [
			e.loading ? (S(), c("span", $a, [f(Z, { name: "spinner" })])) : s("", !0),
			e.leftIcon && !e.loading ? (S(), o(Z, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : s("", !0),
			l("span", eo, [T(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (S(), o(Z, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : s("", !0)
		], 10, Qa));
	}
}), [["__scopeId", "data-v-8cdee95a"]]), no = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], ro = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		let t = e, n = i(() => t.disabled || t.loading);
		return (t, r) => (S(), c("button", {
			type: e.type,
			class: _(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [f(Z, {
			name: e.loading ? "spinner" : e.name,
			class: _({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, no));
	}
}), [["__scopeId", "data-v-fc0cd545"]]), io = ["role", "aria-label"], ao = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		return (t, n) => (S(), c("span", {
			class: _(["phlix-badge", [
				`phlix-badge--${e.tone}`,
				`phlix-badge--${e.size}`,
				{ "phlix-badge--mono": e.mono }
			]]),
			role: e.label ? "img" : void 0,
			"aria-label": e.label
		}, [e.icon ? (S(), o(Z, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : s("", !0), T(t.$slots, "default", {}, void 0, !0)], 10, io));
	}
}), [["__scopeId", "data-v-8f8d0fd2"]]), oo = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], so = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		let n = e, r = t, a = C(null), o = C(!1), s = i(() => {
			let e = n.max - n.min || 1;
			return Math.min(100, Math.max(0, (n.modelValue - n.min) / e * 100));
		}), u = i(() => n.formatValue ? n.formatValue(n.modelValue) : String(n.modelValue));
		function d(e) {
			let t = Math.min(n.max, Math.max(n.min, e)), r = Math.round((t - n.min) / n.step), i = n.min + r * n.step;
			return Math.round(i * 1e6) / 1e6;
		}
		function f(e, t = !1) {
			let i = d(e);
			i !== n.modelValue && (r("update:modelValue", i), t && r("change", i));
		}
		function p(e) {
			let t = a.value;
			if (!t) return n.modelValue;
			let r = t.getBoundingClientRect(), i = r.width ? (e - r.left) / r.width : 0;
			return n.min + i * (n.max - n.min);
		}
		function m(e) {
			n.disabled || (e.currentTarget.setPointerCapture?.(e.pointerId), o.value = !0, f(p(e.clientX)));
		}
		function h(e) {
			o.value && f(p(e.clientX));
		}
		function g(e) {
			o.value && (o.value = !1, e.currentTarget.releasePointerCapture?.(e.pointerId), r("change", n.modelValue));
		}
		function y(e) {
			if (n.disabled) return;
			let t = (n.max - n.min) / 10, r = !0;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowUp":
					f(n.modelValue + n.step, !0);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					f(n.modelValue - n.step, !0);
					break;
				case "PageUp":
					f(n.modelValue + t, !0);
					break;
				case "PageDown":
					f(n.modelValue - t, !0);
					break;
				case "Home":
					f(n.min, !0);
					break;
				case "End":
					f(n.max, !0);
					break;
				default: r = !1;
			}
			r && e.preventDefault();
		}
		return (t, n) => (S(), c("div", {
			class: _(["phlix-slider", { "is-disabled": e.disabled }]),
			role: "slider",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": e.modelValue,
			"aria-valuetext": u.value,
			"aria-disabled": e.disabled || void 0,
			"aria-orientation": "horizontal",
			onKeydown: y
		}, [l("div", {
			ref_key: "trackEl",
			ref: a,
			class: "phlix-slider__track",
			onPointerdown: m,
			onPointermove: h,
			onPointerup: g
		}, [l("div", {
			class: "phlix-slider__fill",
			style: v({ width: s.value + "%" })
		}, null, 4), l("div", {
			class: "phlix-slider__thumb",
			style: v({ left: s.value + "%" })
		}, null, 4)], 544)], 42, oo));
	}
}), [["__scopeId", "data-v-9ca92975"]]), co = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], lo = ["id"], uo = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		let n = e, r = t, i = A();
		function a() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (S(), c("span", { class: _(["phlix-switch", { "is-disabled": e.disabled }]) }, [l("button", {
			type: "button",
			role: "switch",
			class: _(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? k(i) : void 0,
			disabled: e.disabled,
			onClick: a
		}, [...n[0] ||= [l("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, co), e.label ? (S(), c("label", {
			key: 0,
			id: k(i),
			class: "phlix-switch__label",
			onClick: a
		}, O(e.label), 9, lo)) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-4631a106"]]), fo = ["disabled", "aria-pressed"], po = { class: "phlix-chip__label" }, mo = ["disabled", "aria-label"], ho = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		let n = e, r = t;
		function i() {
			n.disabled || (n.selected !== void 0 && r("update:selected", !n.selected), r("click"));
		}
		return (t, n) => (S(), c("span", { class: _(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [l("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: i
		}, [e.icon ? (S(), o(Z, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : s("", !0), l("span", po, [T(t.$slots, "default", {}, void 0, !0)])], 8, fo), e.removable ? (S(), c("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [f(Z, { name: "x" })], 8, mo)) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]);
//#endregion
//#region src/components/ui/listbox.ts
function go(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function Q(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function _o(e, t) {
	return t === "first" ? Q(e, -1, 1) : Q(e, 0, -1);
}
//#endregion
//#region src/components/ui/Select.vue?vue&type=script&setup=true&lang.ts
var vo = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], yo = ["id", "aria-label"], bo = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], xo = { class: "phlix-select__check" }, So = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Select",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Select…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => go(r.options)), p = A(), m = C(!1), h = C(-1), v = C(null), b = C(null), x = "", T, E = i(() => u.value.findIndex((e) => e.value === r.modelValue)), D = i(() => u.value[E.value]?.label ?? ""), j = i(() => h.value >= 0 ? `${p}-opt-${h.value}` : void 0);
		function M() {
			r.disabled || m.value || (m.value = !0, h.value = E.value >= 0 ? E.value : _o(u.value, "first"), g(z));
		}
		function F() {
			m.value = !1;
		}
		function I(e) {
			let t = u.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (a("update:modelValue", t.value), a("change", t.value)), F(), v.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function R(e) {
			h.value = Q(u.value, h.value, e), g(z);
		}
		function z() {
			(b.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function B(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), m.value ? R(1) : M();
					break;
				case "ArrowUp":
					e.preventDefault(), m.value ? R(-1) : M();
					break;
				case "Home":
					m.value && (e.preventDefault(), h.value = _o(u.value, "first"), g(z));
					break;
				case "End":
					m.value && (e.preventDefault(), h.value = _o(u.value, "last"), g(z));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), m.value && h.value >= 0 ? I(h.value) : M();
					break;
				case "Escape":
					m.value && (e.preventDefault(), F());
					break;
				case "Tab":
					F();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && V(e.key);
			}
		}
		function V(e) {
			m.value || M(), x += e.toLowerCase(), clearTimeout(T), T = setTimeout(() => x = "", 600);
			let t = u.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(x));
			t >= 0 && (h.value = t, g(z));
		}
		function H(e) {
			m.value && v.value && !v.value.contains(e.target) && F();
		}
		return P(m, (e) => {
			e ? document.addEventListener("pointerdown", H, !0) : document.removeEventListener("pointerdown", H, !0);
		}), y(() => {
			document.removeEventListener("pointerdown", H, !0), clearTimeout(T);
		}), (n, r) => (S(), c("div", {
			ref_key: "rootEl",
			ref: v,
			class: _(["phlix-select", {
				"is-open": m.value,
				"is-disabled": t.disabled
			}])
		}, [l("button", {
			type: "button",
			class: "phlix-select__trigger",
			"aria-haspopup": "listbox",
			"aria-expanded": m.value,
			"aria-controls": m.value ? `${k(p)}-list` : void 0,
			"aria-activedescendant": m.value ? j.value : void 0,
			"aria-label": t.label,
			disabled: t.disabled,
			onClick: r[0] ||= (e) => m.value ? F() : M(),
			onKeydown: B
		}, [l("span", { class: _(["phlix-select__value", { "is-placeholder": E.value < 0 }]) }, O(E.value >= 0 ? D.value : t.placeholder), 3), f(Z, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, vo), L(l("ul", {
			id: `${k(p)}-list`,
			ref_key: "listEl",
			ref: b,
			class: "phlix-select__list",
			role: "listbox",
			"aria-label": t.label
		}, [(S(!0), c(e, null, w(u.value, (e, n) => (S(), c("li", {
			id: `${k(p)}-opt-${n}`,
			key: e.value,
			class: _(["phlix-select__option", {
				"is-active": n === h.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => I(n),
			onPointermove: (t) => !e.disabled && (h.value = n)
		}, [l("span", xo, [e.value === t.modelValue ? (S(), o(Z, {
			key: 0,
			name: "check"
		})) : s("", !0)]), d(" " + O(e.label), 1)], 42, bo))), 128))], 8, yo), [[N, m.value]])], 2));
	}
}), [["__scopeId", "data-v-db34d47a"]]), Co = { class: "phlix-combobox__field" }, wo = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], To = ["id", "aria-label"], Eo = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Do = { class: "phlix-combobox__check" }, Oo = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, ko = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		let r = t, a = n, u = i(() => go(r.options)), p = A(), m = C(!1), h = C(-1), v = C(""), b = C(!1), x = C(null), T = C(null), E = C(null), D = i(() => u.value.find((e) => e.value === r.modelValue)?.label ?? ""), j = i(() => {
			if (!b.value || v.value.trim() === "") return u.value;
			let e = v.value.toLowerCase();
			return u.value.filter((t) => t.label.toLowerCase().includes(e));
		}), M = i(() => h.value >= 0 ? `${p}-opt-${h.value}` : void 0);
		P(() => r.modelValue, () => {
			m.value || (v.value = D.value);
		}, { immediate: !0 });
		function F() {
			r.disabled || m.value || (m.value = !0, h.value = j.value.findIndex((e) => e.value === r.modelValue), h.value < 0 && (h.value = j.value.findIndex((e) => !e.disabled)), g(B));
		}
		function I() {
			v.value = D.value, b.value = !1, m.value = !1;
		}
		function R(e) {
			let t = j.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (a("update:modelValue", t.value), a("change", t.value)), v.value = t.label, b.value = !1, m.value = !1, T.value?.focus());
		}
		function z(e) {
			j.value.length !== 0 && (h.value = Q(j.value, h.value, e), g(B));
		}
		function B() {
			E.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function V(e) {
			v.value = e.target.value, b.value = !0, m.value = !0, h.value = _o(j.value, "first");
		}
		function H(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), m.value ? z(1) : F();
					break;
				case "ArrowUp":
					e.preventDefault(), m.value ? z(-1) : F();
					break;
				case "Enter":
					m.value && h.value >= 0 && (e.preventDefault(), R(h.value));
					break;
				case "Escape":
					m.value && (e.preventDefault(), I());
					break;
				case "Tab":
					m.value && I();
					break;
			}
		}
		function U(e) {
			m.value && x.value && !x.value.contains(e.target) && I();
		}
		return P(m, (e) => {
			e ? document.addEventListener("pointerdown", U, !0) : document.removeEventListener("pointerdown", U, !0);
		}), y(() => document.removeEventListener("pointerdown", U, !0)), (n, r) => (S(), c("div", {
			ref_key: "rootEl",
			ref: x,
			class: _(["phlix-combobox", {
				"is-open": m.value,
				"is-disabled": t.disabled
			}])
		}, [l("div", Co, [
			f(Z, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			l("input", {
				ref_key: "inputEl",
				ref: T,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": m.value,
				"aria-controls": m.value ? `${k(p)}-list` : void 0,
				"aria-activedescendant": m.value ? M.value : void 0,
				"aria-label": t.label,
				placeholder: t.placeholder,
				disabled: t.disabled,
				value: v.value,
				onInput: V,
				onFocus: F,
				onKeydown: H
			}, null, 40, wo),
			f(Z, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), L(l("ul", {
			id: `${k(p)}-list`,
			ref_key: "listEl",
			ref: E,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": t.label
		}, [(S(!0), c(e, null, w(j.value, (e, n) => (S(), c("li", {
			id: `${k(p)}-opt-${n}`,
			key: e.value,
			class: _(["phlix-combobox__option", {
				"is-active": n === h.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => R(n),
			onPointermove: (t) => !e.disabled && (h.value = n)
		}, [l("span", Do, [e.value === t.modelValue ? (S(), o(Z, {
			key: 0,
			name: "check"
		})) : s("", !0)]), d(" " + O(e.label), 1)], 42, Eo))), 128)), j.value.length === 0 ? (S(), c("li", Oo, "No matches")) : s("", !0)], 8, To), [[N, m.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), Ao = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), $ = 0, jo = "";
function Mo() {
	$ === 0 && (jo = document.body.style.overflow, document.body.style.overflow = "hidden"), $++;
}
function No() {
	$ !== 0 && ($--, $ === 0 && (document.body.style.overflow = jo));
}
function Po(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(Ao)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
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
		i = document.activeElement, r && (Mo(), a = !0), document.addEventListener("keydown", s, !0), g(() => {
			(o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		document.removeEventListener("keydown", s, !0), a &&= (No(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	P(t, (e) => e ? c() : l(), { immediate: !0 }), y(() => {
		document.removeEventListener("keydown", s, !0), a &&= (No(), !1);
	});
}
//#endregion
//#region src/components/ui/Modal.vue?vue&type=script&setup=true&lang.ts
var Fo = ["aria-labelledby"], Io = {
	key: 0,
	class: "phlix-modal__header"
}, Lo = ["id"], Ro = { class: "phlix-modal__body" }, zo = {
	key: 1,
	class: "phlix-modal__footer"
}, Bo = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
	setup(e, { emit: r }) {
		let i = e, a = r, u = C(i.modelValue);
		P(() => i.modelValue, (e) => u.value = e);
		let d = C(null), p = A();
		function m() {
			a("update:modelValue", !1), a("close");
		}
		function h() {
			i.dismissible && m();
		}
		return Po(d, u, { onEscape: () => i.dismissible ? (m(), !0) : !1 }), (r, i) => (S(), o(t, { to: "body" }, [f(n, { name: "phlix-modal" }, {
			default: I(() => [e.modelValue ? (S(), c("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: z(h, ["self"])
			}, [l("div", {
				ref_key: "panelEl",
				ref: d,
				class: _(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? k(p) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (S(), c("header", Io, [e.title ? (S(), c("h2", {
					key: 0,
					id: k(p),
					class: "phlix-modal__title"
				}, O(e.title), 9, Lo)) : s("", !0), e.hideClose ? s("", !0) : (S(), o(ro, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					class: "phlix-modal__close",
					onClick: m
				}))])) : s("", !0),
				l("div", Ro, [T(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (S(), c("footer", zo, [T(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 10, Fo)], 32)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-ad69ec41"]]), Vo = ["aria-labelledby"], Ho = {
	key: 0,
	class: "phlix-sheet__header"
}, Uo = ["id"], Wo = { class: "phlix-sheet__body" }, Go = {
	key: 1,
	class: "phlix-sheet__footer"
}, Ko = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
	setup(e, { emit: r }) {
		let i = e, a = r, u = C(i.modelValue);
		P(() => i.modelValue, (e) => u.value = e);
		let d = C(null), p = A();
		function m() {
			a("update:modelValue", !1), a("close");
		}
		function h() {
			i.dismissible && m();
		}
		return Po(d, u, { onEscape: () => i.dismissible ? (m(), !0) : !1 }), (r, i) => (S(), o(t, { to: "body" }, [f(n, { name: `phlix-sheet-${e.side}` }, {
			default: I(() => [e.modelValue ? (S(), c("div", {
				key: 0,
				class: _(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: z(h, ["self"])
			}, [l("aside", {
				ref_key: "panelEl",
				ref: d,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? k(p) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (S(), c("header", Ho, [e.title ? (S(), c("h2", {
					key: 0,
					id: k(p),
					class: "phlix-sheet__title"
				}, O(e.title), 9, Uo)) : s("", !0), e.hideClose ? s("", !0) : (S(), o(ro, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: m
				}))])) : s("", !0),
				l("div", Wo, [T(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (S(), c("footer", Go, [T(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 8, Vo)], 34)) : s("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), qo = ["id"], Jo = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		let t = e, r = A(), i = C(!1), a = C(null), o;
		function l() {
			return a.value?.firstElementChild ?? null;
		}
		function u() {
			t.disabled || (clearTimeout(o), o = setTimeout(() => {
				i.value = !0, l()?.setAttribute("aria-describedby", r);
			}, t.delay));
		}
		function p() {
			clearTimeout(o), i.value = !1, l()?.removeAttribute("aria-describedby");
		}
		return y(() => clearTimeout(o)), (t, o) => (S(), c("span", {
			ref_key: "wrapEl",
			ref: a,
			class: "phlix-tooltip-wrap",
			onMouseenter: u,
			onMouseleave: p,
			onFocusin: u,
			onFocusout: p,
			onKeydown: R(p, ["esc"])
		}, [T(t.$slots, "default", {}, void 0, !0), f(n, { name: "phlix-tooltip" }, {
			default: I(() => [i.value && (e.text || t.$slots.content) ? (S(), c("span", {
				key: 0,
				id: k(r),
				role: "tooltip",
				class: _(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [T(t.$slots, "content", {}, () => [d(O(e.text), 1)], !0)], 10, qo)) : s("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Yo = V("phlix-toast", () => {
	let e = C([]), t = /* @__PURE__ */ new Map(), n = 0;
	function r(n) {
		let r = t.get(n);
		r && (clearTimeout(r), t.delete(n)), e.value = e.value.filter((e) => e.id !== n);
	}
	function i(i) {
		let a = ++n, o = {
			tone: "neutral",
			duration: 5e3,
			...i,
			id: a
		};
		return e.value.push(o), o.duration > 0 && t.set(a, setTimeout(() => r(a), o.duration)), a;
	}
	function a() {
		t.forEach((e) => clearTimeout(e)), t.clear(), e.value = [];
	}
	return {
		toasts: e,
		show: i,
		dismiss: r,
		clear: a,
		success: (e, t) => i({
			message: e,
			tone: "success",
			...t
		}),
		error: (e, t) => i({
			message: e,
			tone: "error",
			duration: 8e3,
			...t
		}),
		warning: (e, t) => i({
			message: e,
			tone: "warning",
			...t
		}),
		info: (e, t) => i({
			message: e,
			tone: "info",
			...t
		})
	};
}), Xo = ["role"], Zo = { class: "phlix-toast__content" }, Qo = {
	key: 0,
	class: "phlix-toast__title"
}, $o = { class: "phlix-toast__message" }, es = ["onClick"], ts = 0, ns = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(n) {
		let i = Yo(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, u = (e) => e.icon ?? a[e.tone];
		return b(() => {
			ts++;
		}), y(() => {
			ts--;
		}), (a, d) => (S(), o(t, { to: "body" }, [l("div", {
			class: _(["phlix-toasts", `phlix-toasts--${n.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [f(r, { name: "phlix-toast" }, {
			default: I(() => [(S(!0), c(e, null, w(k(i).toasts, (e) => (S(), c("div", {
				key: e.id,
				class: _(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				f(Z, {
					name: u(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				l("div", Zo, [e.title ? (S(), c("p", Qo, O(e.title), 1)) : s("", !0), l("p", $o, O(e.message), 1)]),
				e.action ? (S(), c("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), k(i).dismiss(e.id);
					}
				}, O(e.action.label), 9, es)) : s("", !0),
				f(ro, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => k(i).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, Xo))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), rs = {
	key: 0,
	class: "phlix-skel-text",
	"aria-hidden": "true"
}, is = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Skeleton",
	props: {
		variant: { default: "rect" },
		width: {},
		height: {},
		radius: {},
		lines: { default: 1 }
	},
	setup(t) {
		return (n, r) => t.variant === "text" ? (S(), c("div", rs, [(S(!0), c(e, null, w(t.lines, (e) => (S(), c("span", {
			key: e,
			class: "phlix-skel phlix-skel--text",
			style: v({ width: e === t.lines && t.lines > 1 ? "60%" : t.width })
		}, null, 4))), 128))])) : (S(), c("span", {
			key: 1,
			class: _(["phlix-skel", `phlix-skel--${t.variant}`]),
			"aria-hidden": "true",
			style: v({
				width: t.width,
				height: t.height,
				borderRadius: t.radius
			})
		}, null, 6));
	}
}), [["__scopeId", "data-v-c34e4066"]]), as = ["aria-label"], os = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = i(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (S(), c("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: v(n.value ? { fontSize: n.value } : void 0)
		}, [f(Z, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, as));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), ss = {
	class: "phlix-empty",
	role: "status"
}, cs = { class: "phlix-empty__icon" }, ls = { class: "phlix-empty__title" }, us = {
	key: 0,
	class: "phlix-empty__desc"
}, ds = {
	key: 1,
	class: "phlix-empty__actions"
}, fs = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (S(), c("div", ss, [
			l("span", cs, [f(Z, { name: e.icon }, null, 8, ["name"])]),
			l("h3", ls, O(e.title), 1),
			e.description || t.$slots.default ? (S(), c("p", us, [T(t.$slots, "default", {}, () => [d(O(e.description), 1)], !0)])) : s("", !0),
			t.$slots.actions ? (S(), c("div", ds, [T(t.$slots, "actions", {}, void 0, !0)])) : s("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]), ps = { class: "phlix-tabs" }, ms = ["aria-label"], hs = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], gs = ["id", "aria-labelledby"], _s = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = A(), f = C(null), p = i(() => r.tabs.findIndex((e) => e.value === r.modelValue)), m = (e) => `${u}-tab-${e}`, h = (e) => `${u}-panel-${e}`, g = i(() => r.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function v(e) {
			let t = r.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== r.modelValue && a("update:modelValue", e);
		}
		function y(e) {
			f.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function b(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = Q(g.value, p.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = Q(g.value, p.value, -1);
					break;
				case "Home":
					t = Q(g.value, -1, 1);
					break;
				case "End":
					t = Q(g.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), v(r.tabs[t].value), y(t));
		}
		return (n, r) => (S(), c("div", ps, [l("div", {
			ref_key: "listEl",
			ref: f,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": t.label,
			onKeydown: b
		}, [(S(!0), c(e, null, w(t.tabs, (e) => (S(), c("button", {
			id: m(e.value),
			key: e.value,
			type: "button",
			role: "tab",
			class: _(["phlix-tabs__tab", { "is-active": e.value === t.modelValue }]),
			"aria-selected": e.value === t.modelValue,
			"aria-controls": h(e.value),
			tabindex: e.value === t.modelValue ? 0 : -1,
			disabled: e.disabled,
			onClick: (t) => v(e.value)
		}, [e.icon ? (S(), o(Z, {
			key: 0,
			name: e.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : s("", !0), d(" " + O(e.label), 1)], 10, hs))), 128))], 40, ms), t.modelValue ? (S(), c("div", {
			key: 0,
			id: h(t.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": m(t.modelValue),
			tabindex: "0"
		}, [T(n.$slots, t.modelValue, {}, () => [T(n.$slots, "default", {}, void 0, !0)], !0)], 8, gs)) : s("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), vs = { class: "phlix-kbd" }, ys = {
	key: 1,
	class: "phlix-kbd__key"
}, bs = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "Kbd",
	props: { keys: {} },
	setup(t) {
		let n = t, r = i(() => n.keys === void 0 ? [] : Array.isArray(n.keys) ? n.keys : [n.keys]);
		return (t, n) => (S(), c("span", vs, [r.value.length ? (S(!0), c(e, { key: 0 }, w(r.value, (e, t) => (S(), c("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, O(e), 1))), 128)) : (S(), c("kbd", ys, [T(t.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), xs = /*#__PURE__*/ W(/* @__PURE__ */ p({
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
		let t = e, n = C(null), r = C(!1), i = C(!1), a = null, s = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return b(() => {
			if (s) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), y(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (S(), o(D(e.tag), {
			ref_key: "el",
			ref: n,
			class: _(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: v({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: I(() => [T(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Ss = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, r) => (S(), o(n, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: I(() => [T(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Cs = { class: "library-scan-page" }, ws = {
	key: 0,
	class: "loading"
}, Ts = {
	key: 1,
	class: "error"
}, Es = {
	key: 2,
	class: "libraries-list"
}, Ds = { class: "library-info" }, Os = { class: "library-name" }, ks = { class: "library-type" }, As = { class: "library-paths" }, js = { class: "library-meta" }, Ms = { key: 0 }, Ns = {
	key: 0,
	class: "scan-status"
}, Ps = { class: "library-actions" }, Fs = ["onClick", "disabled"], Is = ["onClick", "disabled"], Ls = {
	key: 0,
	class: "empty-state"
}, Rs = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "LibraryScanPage",
	setup(t) {
		let n = C([]), r = C({}), i = C(!0), a = C(null);
		async function o() {
			try {
				n.value = (await J.get("/api/v1/libraries")).libraries || [];
				for (let e of n.value) u(e.id);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to load libraries";
			} finally {
				i.value = !1;
			}
		}
		async function u(e) {
			try {
				let t = await J.get(`/api/v1/libraries/${e}/scan-status`);
				t.job && (r.value[e] = t.job);
			} catch {}
		}
		async function d(e) {
			try {
				await J.post(`/api/v1/libraries/${e}/scan`), await u(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger scan";
			}
		}
		async function f(e) {
			try {
				await J.post(`/api/v1/libraries/${e}/rescan`), await u(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger rescan";
			}
		}
		function p(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function m(e) {
			if (!e) return "";
			switch (e.status) {
				case "queued": return "⏳ Queued";
				case "running": return "🔄 Running";
				case "completed": return "✅ Completed";
				case "failed": return `❌ Failed: ${e.error || "Unknown error"}`;
				default: return e.status;
			}
		}
		return b(() => {
			o();
		}), (t, o) => (S(), c("div", Cs, [o[0] ||= l("div", { class: "scan-header" }, [l("h1", { class: "scan-title" }, "Library Scanner"), l("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), i.value ? (S(), c("div", ws, "Loading libraries...")) : a.value ? (S(), c("div", Ts, O(a.value), 1)) : (S(), c("div", Es, [(S(!0), c(e, null, w(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "library-card"
		}, [l("div", Ds, [
			l("h3", Os, O(e.name), 1),
			l("span", ks, O(e.type), 1),
			l("p", As, O(e.paths.join(", ")), 1),
			l("div", js, [e.item_count === void 0 ? s("", !0) : (S(), c("span", Ms, O(e.item_count) + " items", 1)), l("span", null, "Last scan: " + O(p(e.last_scan_at)), 1)]),
			r.value[e.id] ? (S(), c("div", Ns, O(m(r.value[e.id])), 1)) : s("", !0)
		]), l("div", Ps, [l("button", {
			class: "btn btn-scan",
			onClick: (t) => d(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Scan ", 8, Fs), l("button", {
			class: "btn btn-rescan",
			onClick: (t) => f(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Rescan ", 8, Is)])]))), 128)), n.value.length === 0 ? (S(), c("div", Ls, " No libraries configured. Add a library to get started. ")) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), zs = { class: "my-servers-page" }, Bs = {
	key: 0,
	class: "loading"
}, Vs = {
	key: 1,
	class: "error"
}, Hs = {
	key: 2,
	class: "servers-list"
}, Us = { class: "server-info" }, Ws = { class: "server-name" }, Gs = { class: "server-url" }, Ks = { class: "server-meta" }, qs = { key: 0 }, Js = {
	key: 0,
	class: "empty-state"
}, Ys = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "MyServersPage",
	setup(t) {
		let n = C([]), r = C(!0), i = C(null);
		async function a() {
			try {
				n.value = (await J.get("/api/v1/servers")).servers || [];
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
		function u(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return b(() => {
			a();
		}), (t, a) => (S(), c("div", zs, [a[2] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "My Servers"), l("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), r.value ? (S(), c("div", Bs, "Loading servers...")) : i.value ? (S(), c("div", Vs, O(i.value), 1)) : (S(), c("div", Hs, [(S(!0), c(e, null, w(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "server-card"
		}, [
			l("div", {
				class: "server-status",
				style: v({ backgroundColor: o(e.status) })
			}, null, 4),
			l("div", Us, [
				l("h3", Ws, O(e.name), 1),
				l("p", Gs, O(e.url), 1),
				l("div", Ks, [
					l("span", null, O(e.owner), 1),
					e.library_count === void 0 ? s("", !0) : (S(), c("span", qs, O(e.library_count) + " libraries", 1)),
					l("span", null, "Last seen: " + O(u(e.last_seen)), 1)
				])
			]),
			a[0] ||= l("div", { class: "server-actions" }, [l("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), n.value.length === 0 ? (S(), c("div", Js, [...a[1] ||= [l("p", null, "No servers connected yet.", -1), l("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), Xs = { class: "federation-page" }, Zs = {
	key: 0,
	class: "loading"
}, Qs = {
	key: 1,
	class: "error"
}, $s = {
	key: 2,
	class: "federation-content"
}, ec = { class: "peers-section" }, tc = { class: "peers-list" }, nc = { class: "peer-info" }, rc = { class: "peer-name" }, ic = { class: "peer-url" }, ac = { class: "peer-meta" }, oc = { key: 0 }, sc = { class: "peer-actions" }, cc = ["onClick"], lc = {
	key: 1,
	class: "status-badge"
}, uc = {
	key: 0,
	class: "empty-state"
}, dc = { class: "add-peer-section" }, fc = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "FederationPage",
	setup(t) {
		let n = C([]), r = C(!0), i = C(null);
		async function a() {
			try {
				n.value = (await J.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load federation peers";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await J.post("/api/v1/federation/connect", { url: e }), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to connect to peer";
			}
		}
		async function u(e) {
			try {
				await J.post(`/api/v1/federation/peers/${e}/disconnect`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to disconnect peer";
			}
		}
		function d(e) {
			switch (e) {
				case "connected": return "#22c55e";
				case "disconnected": return "#ef4444";
				case "pending": return "#eab308";
				default: return "#6b7280";
			}
		}
		function f(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return b(() => {
			a();
		}), (t, a) => (S(), c("div", Xs, [a[5] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Federation"), l("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), r.value ? (S(), c("div", Zs, "Loading federation peers...")) : i.value ? (S(), c("div", Qs, O(i.value), 1)) : (S(), c("div", $s, [l("div", ec, [a[2] ||= l("h2", { class: "section-title" }, "Connected Peers", -1), l("div", tc, [(S(!0), c(e, null, w(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "peer-card"
		}, [
			l("div", {
				class: "peer-status",
				style: v({ backgroundColor: d(e.status) })
			}, null, 4),
			l("div", nc, [
				l("h3", rc, O(e.name), 1),
				l("p", ic, O(e.url), 1),
				l("div", ac, [e.shared_libraries_count === void 0 ? s("", !0) : (S(), c("span", oc, O(e.shared_libraries_count) + " shared libraries", 1)), l("span", null, "Last sync: " + O(f(e.last_sync)), 1)])
			]),
			l("div", sc, [e.status === "connected" ? (S(), c("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => u(e.id)
			}, " Disconnect ", 8, cc)) : e.status === "pending" ? (S(), c("span", lc, "Pending")) : s("", !0)])
		]))), 128)), n.value.length === 0 ? (S(), c("div", uc, [...a[1] ||= [l("p", null, "No federation peers connected.", -1)]])) : s("", !0)])]), l("div", dc, [a[4] ||= l("h2", { class: "section-title" }, "Add Peer", -1), l("form", {
			class: "add-peer-form",
			onSubmit: a[0] ||= z((e) => o(""), ["prevent"])
		}, [...a[3] ||= [l("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), l("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), pc = { class: "manage-shares-page" }, mc = {
	key: 0,
	class: "loading"
}, hc = {
	key: 1,
	class: "error"
}, gc = {
	key: 2,
	class: "shares-list"
}, _c = { class: "share-info" }, vc = { class: "share-library" }, yc = { class: "share-meta" }, bc = {
	key: 0,
	class: "expired-badge"
}, xc = { class: "share-dates" }, Sc = { key: 0 }, Cc = { class: "share-actions" }, wc = ["onClick"], Tc = {
	key: 0,
	class: "empty-state"
}, Ec = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "ManageSharesPage",
	setup(t) {
		let n = C([]), r = C(!0), i = C(null);
		async function a() {
			try {
				n.value = (await J.get("/api/v1/shares")).shares || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load shares";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await J.delete(`/api/v1/shares/${e}`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to revoke share";
			}
		}
		function u(e) {
			return new Date(e).toLocaleString();
		}
		function f(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		return b(() => {
			a();
		}), (t, a) => (S(), c("div", pc, [a[1] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Manage Shares"), l("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), r.value ? (S(), c("div", mc, "Loading shares...")) : i.value ? (S(), c("div", hc, O(i.value), 1)) : (S(), c("div", gc, [(S(!0), c(e, null, w(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "share-card"
		}, [l("div", _c, [
			l("h3", vc, O(e.library_name), 1),
			l("div", yc, [
				l("span", null, "Shared with: " + O(e.shared_with), 1),
				l("span", { class: _(["permission-badge", e.permissions]) }, O(e.permissions), 3),
				e.expires_at && f(e.expires_at) ? (S(), c("span", bc, "Expired")) : s("", !0)
			]),
			l("p", xc, [d(" Created: " + O(u(e.created_at)) + " ", 1), e.expires_at ? (S(), c("span", Sc, " | Expires: " + O(u(e.expires_at)), 1)) : s("", !0)])
		]), l("div", Cc, [l("button", {
			class: "btn btn-danger",
			onClick: (t) => o(e.id)
		}, "Revoke", 8, wc)])]))), 128)), n.value.length === 0 ? (S(), c("div", Tc, [...a[0] ||= [l("p", null, "No library shares found.", -1)]])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), Dc = { class: "audit-logs-page" }, Oc = {
	key: 0,
	class: "loading"
}, kc = {
	key: 1,
	class: "error"
}, Ac = {
	key: 2,
	class: "logs-container"
}, jc = { class: "logs-list" }, Mc = { class: "log-content" }, Nc = { class: "log-header" }, Pc = { class: "log-action" }, Fc = { class: "log-actor" }, Ic = { class: "log-time" }, Lc = {
	key: 0,
	class: "log-target"
}, Rc = {
	key: 1,
	class: "log-details"
}, zc = {
	key: 2,
	class: "log-ip"
}, Bc = {
	key: 0,
	class: "empty-state"
}, Vc = {
	key: 0,
	class: "pagination"
}, Hc = ["disabled"], Uc = { class: "page-info" }, Wc = ["disabled"], Gc = /*#__PURE__*/ W(/* @__PURE__ */ p({
	__name: "AuditLogsPage",
	setup(t) {
		let n = C([]), r = C(!0), i = C(null), a = C(1), o = C(1);
		async function u(e = 1) {
			try {
				r.value = !0;
				let t = await J.get("/api/v1/audit-logs", { page: String(e) });
				n.value = t.logs || [], a.value = t.page || 1, o.value = t.total_pages || 1;
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load audit logs";
			} finally {
				r.value = !1;
			}
		}
		function d(e) {
			return new Date(e).toLocaleString();
		}
		function f(e) {
			return e.includes("create") || e.includes("add") ? "#22c55e" : e.includes("delete") || e.includes("remove") ? "#ef4444" : e.includes("update") || e.includes("edit") ? "#3b82f6" : e.includes("login") || e.includes("auth") ? "#8b5cf6" : "#6b7280";
		}
		function p(e) {
			return e.includes("create") || e.includes("add") ? "+" : e.includes("delete") || e.includes("remove") ? "-" : e.includes("update") || e.includes("edit") ? "~" : e.includes("login") || e.includes("auth") ? "@" : "#";
		}
		return b(() => {
			u();
		}), (t, m) => (S(), c("div", Dc, [m[3] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Audit Logs"), l("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), r.value ? (S(), c("div", Oc, "Loading audit logs...")) : i.value ? (S(), c("div", kc, O(i.value), 1)) : (S(), c("div", Ac, [l("div", jc, [(S(!0), c(e, null, w(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "log-entry"
		}, [l("div", {
			class: "log-icon",
			style: v({ backgroundColor: f(e.action) })
		}, O(p(e.action)), 5), l("div", Mc, [
			l("div", Nc, [
				l("span", Pc, O(e.action), 1),
				l("span", Fc, O(e.actor), 1),
				l("span", Ic, O(d(e.created_at)), 1)
			]),
			e.target ? (S(), c("p", Lc, "Target: " + O(e.target), 1)) : s("", !0),
			e.details ? (S(), c("p", Rc, O(e.details), 1)) : s("", !0),
			e.ip_address ? (S(), c("span", zc, "IP: " + O(e.ip_address), 1)) : s("", !0)
		])]))), 128)), n.value.length === 0 ? (S(), c("div", Bc, [...m[2] ||= [l("p", null, "No audit logs found.", -1)]])) : s("", !0)]), o.value > 1 ? (S(), c("div", Vc, [
			l("button", {
				class: "btn btn-secondary",
				disabled: a.value <= 1,
				onClick: m[0] ||= (e) => u(a.value - 1)
			}, " Previous ", 8, Hc),
			l("span", Uc, "Page " + O(a.value) + " of " + O(o.value), 1),
			l("button", {
				class: "btn btn-secondary",
				disabled: a.value >= o.value,
				onClick: m[1] ||= (e) => u(a.value + 1)
			}, " Next ", 8, Wc)
		])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function Kc(e, t) {
	let n = Y(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = P(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = P(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
export { q as ApiClient, Pe as ApiError, Za as AppBackdrop, pe as AppLayout, Gc as AuditLogsPage, ao as Badge, Nt as BrowsePage, to as Button, ho as Chip, ko as Combobox, G as DEFAULT_PREFERENCES, fs as EmptyState, fc as FederationPage, Et as FilterBar, Z as Icon, ro as IconButton, bs as Kbd, Rs as LibraryScanPage, nn as LocalStorageTokenStore, dn as LoginForm, mn as LoginPage, Ec as ManageSharesPage, Ze as MediaCard, nt as MediaGrid, Bo as Modal, Ys as MyServersPage, Ss as PageTransition, Ae as PhlixApp, Jt as Player, Qt as PlayerPage, xs as Reveal, So as Select, Vn as SettingsForm, Un as SettingsPage, Ko as Sheet, Tn as SignupForm, On as SignupPage, is as Skeleton, so as Slider, os as Spinner, uo as Switch, _s as Tabs, ns as ToastHost, Jo as Tooltip, De as applyStoredThemeEarly, Kc as bindMediaStoreToRouter, Kn as createPhlixApp, we as deriveAccentVars, he as readStoredPreferences, X as useAuthStore, Po as useFocusTrap, Y as useMediaStore, _e as usePreferencesStore, Oe as useTheme, Yo as useToastStore };

//# sourceMappingURL=phlix-ui.js.map