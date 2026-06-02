var rt = Object.defineProperty;
var ct = (t, e, o) => e in t ? rt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var he = (t, e, o) => ct(t, typeof e != "symbol" ? e + "" : e, o);
import { openBlock as s, createElementBlock as a, createElementVNode as n, renderSlot as H, ref as g, computed as L, watch as oe, watchEffect as ut, defineComponent as B, createBlock as K, withCtx as W, createVNode as F, unref as S, createTextVNode as q, toDisplayString as k, createCommentVNode as x, Fragment as D, renderList as N, withDirectives as ne, vModelText as pe, normalizeClass as R, inject as Me, onMounted as te, onUnmounted as dt, withModifiers as ie, normalizeStyle as J, createStaticVNode as vt, resolveComponent as De, vModelDynamic as Ie, vShow as Te, createApp as ht, markRaw as C, resolveDynamicComponent as ze, onBeforeUnmount as re, useId as ce, nextTick as ae, Teleport as Ee, Transition as ge, withKeys as ft, TransitionGroup as mt } from "vue";
import { defineStore as _e, createPinia as pt } from "pinia";
import { RouterView as gt, RouterLink as Re, useRoute as _t, useRouter as Ue, createRouter as bt, createWebHistory as yt } from "vue-router";
const A = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [l, r] of e)
    o[l] = r;
  return o;
}, kt = {}, wt = { class: "app-layout" }, $t = { class: "app-header" }, xt = { class: "header-inner" }, Ct = { class: "logo" }, St = { class: "nav" }, It = { class: "app-main" }, Mt = { class: "app-footer" };
function Tt(t, e) {
  return s(), a("div", wt, [
    n("header", $t, [
      n("div", xt, [
        n("div", Ct, [
          H(t.$slots, "logo", {}, () => [
            e[0] || (e[0] = n("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        n("nav", St, [
          H(t.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    n("main", It, [
      H(t.$slots, "default", {}, void 0, !0)
    ]),
    n("footer", Mt, [
      H(t.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Et = /* @__PURE__ */ A(kt, [["render", Tt], ["__scopeId", "data-v-9f6c6d16"]]), ue = {
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
}, Ne = "phlix.prefs";
function He() {
  if (typeof localStorage > "u") return { ...ue };
  try {
    const t = localStorage.getItem(Ne);
    if (!t) return { ...ue };
    const e = JSON.parse(t);
    return { ...ue, ...e };
  } catch {
    return { ...ue };
  }
}
function Bt() {
  return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const At = _e("phlix-prefs", () => {
  var I;
  const t = He(), e = g(t.theme), o = g(t.accent), l = g(t.density), r = g(t.cardSize), u = g(t.gridDensity), c = g(t.reducedMotion), h = g(t.autoplay), p = g(t.defaultVolume), d = g(t.defaultQuality), i = g(t.defaultSubtitleLang), v = g(t.atmosphere), y = g(Bt());
  let f = null;
  typeof window < "u" && typeof window.matchMedia == "function" && (f = window.matchMedia("(prefers-reduced-motion: reduce)"), (I = f.addEventListener) == null || I.call(f, "change", (V) => y.value = V.matches));
  const _ = L(
    () => c.value === "on" ? !0 : c.value === "off" ? !1 : y.value
  );
  function m() {
    return {
      theme: e.value,
      accent: o.value,
      density: l.value,
      cardSize: r.value,
      gridDensity: u.value,
      reducedMotion: c.value,
      autoplay: h.value,
      defaultVolume: p.value,
      defaultQuality: d.value,
      defaultSubtitleLang: i.value,
      atmosphere: v.value
    };
  }
  oe(
    m,
    (V) => {
      if (!(typeof localStorage > "u"))
        try {
          localStorage.setItem(Ne, JSON.stringify(V));
        } catch {
        }
    },
    { deep: !0 }
  );
  function M() {
    const V = ue;
    e.value = V.theme, o.value = V.accent, l.value = V.density, r.value = V.cardSize, u.value = V.gridDensity, c.value = V.reducedMotion, h.value = V.autoplay, p.value = V.defaultVolume, d.value = V.defaultQuality, i.value = V.defaultSubtitleLang, v.value = V.atmosphere;
  }
  return {
    theme: e,
    accent: o,
    density: l,
    cardSize: r,
    gridDensity: u,
    reducedMotion: c,
    autoplay: h,
    defaultVolume: p,
    defaultQuality: d,
    defaultSubtitleLang: i,
    atmosphere: v,
    systemReduced: y,
    effectiveReducedMotion: _,
    snapshot: m,
    reset: M
  };
});
function Vt(t) {
  let e = t.trim().replace(/^#/, "");
  return e.length === 3 && (e = e.split("").map((o) => o + o).join("")), /^[0-9a-fA-F]{6}$/.test(e) ? {
    r: parseInt(e.slice(0, 2), 16),
    g: parseInt(e.slice(2, 4), 16),
    b: parseInt(e.slice(4, 6), 16)
  } : null;
}
const fe = (t) => Math.max(0, Math.min(255, Math.round(t))), $e = ({ r: t, g: e, b: o }) => "#" + [t, e, o].map((l) => fe(l).toString(16).padStart(2, "0")).join("");
function Pt(t, e) {
  return { r: t.r + (255 - t.r) * e, g: t.g + (255 - t.g) * e, b: t.b + (255 - t.b) * e };
}
function Lt(t, e) {
  return { r: t.r * (1 - e), g: t.g * (1 - e), b: t.b * (1 - e) };
}
const je = ({ r: t, g: e, b: o }, l) => `rgba(${fe(t)}, ${fe(e)}, ${fe(o)}, ${l})`;
function Rt({ r: t, g: e, b: o }) {
  const l = [t, e, o].map((r) => {
    const u = r / 255;
    return u <= 0.03928 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
}
function jt(t) {
  const e = Vt(t);
  if (!e) return null;
  const o = Rt(e) > 0.45 ? "#1a1205" : "#fff8ec";
  return {
    "--accent": $e(e),
    "--accent-hover": $e(Pt(e, 0.12)),
    "--accent-active": $e(Lt(e, 0.12)),
    "--accent-soft": je(e, 0.14),
    "--accent-ring": je(e, 0.55),
    "--accent-contrast": o
  };
}
const Ft = ["--accent", "--accent-hover", "--accent-active", "--accent-soft", "--accent-ring", "--accent-contrast"];
function Oe(t, e) {
  if (typeof document > "u") return;
  const o = document.documentElement;
  o.setAttribute("data-theme", t.theme), o.setAttribute("data-density", t.density), e ? o.setAttribute("data-reduced-motion", "true") : o.removeAttribute("data-reduced-motion");
  const l = t.accent ? jt(t.accent) : null;
  if (l)
    for (const [r, u] of Object.entries(l)) o.style.setProperty(r, u);
  else
    for (const r of Ft) o.style.removeProperty(r);
}
function Dt() {
  const t = He(), e = t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  Oe(t, e);
}
function zt() {
  const t = At();
  return ut(() => {
    Oe(
      { theme: t.theme, density: t.density, accent: t.accent },
      t.effectiveReducedMotion
    );
  }), t;
}
const Ut = { class: "main-nav" }, Nt = /* @__PURE__ */ B({
  __name: "PhlixApp",
  setup(t) {
    return zt(), (e, o) => (s(), K(Et, null, {
      nav: W(() => [
        n("nav", Ut, [
          F(S(Re), {
            to: "/app",
            class: "nav-link"
          }, {
            default: W(() => [...o[0] || (o[0] = [
              q("Browse", -1)
            ])]),
            _: 1
          }),
          F(S(Re), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: W(() => [...o[1] || (o[1] = [
              q("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: W(() => [
        F(S(gt))
      ]),
      _: 1
    }));
  }
}), Ht = /* @__PURE__ */ A(Nt, [["__scopeId", "data-v-4fa58c8a"]]), Ot = { class: "phlix-placeholder" }, Kt = { class: "placeholder-content" }, Gt = /* @__PURE__ */ B({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(t) {
    return (e, o) => (s(), a("div", Ot, [
      n("div", Kt, [
        o[0] || (o[0] = n("h1", null, "Shared UI loading...", -1)),
        n("p", null, "Phlix " + k(t.appName) + " is initializing", 1)
      ])
    ]));
  }
}), Qt = /* @__PURE__ */ A(Gt, [["__scopeId", "data-v-bf79ac4c"]]);
class Yt extends Error {
  constructor(e, o, l = null) {
    super(e), this.status = o, this.body = l, this.name = "ApiError";
  }
}
function Jt(t) {
  return t === !0 || t === 1 || t === "1" || t === "true";
}
class be {
  constructor(e = {}) {
    he(this, "baseUrl");
    he(this, "tokens");
    he(this, "doFetch");
    this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? {
      getAccessToken: () => null,
      setAccessToken: () => {
      },
      getRefreshToken: () => null,
      setRefreshToken: () => {
      },
      getUser: () => null,
      setUser: () => {
      },
      clear: () => {
      }
    }, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }
  async request(e, o, l = null, r) {
    const u = () => {
      const p = {
        "Content-Type": "application/json"
      }, d = this.tokens.getAccessToken();
      d && (p.Authorization = `Bearer ${d}`);
      const i = { method: e, headers: p, credentials: "same-origin" };
      return r && (i.signal = r), l !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (i.body = JSON.stringify(l)), i;
    }, c = `${this.baseUrl}${o}`;
    let h = await this.doFetch(c, u());
    return h.status === 401 && await this.refreshToken() && (h = await this.doFetch(c, u())), this.handleResponse(h);
  }
  async handleResponse(e) {
    const r = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const u = this.extractError(r);
      throw new Yt(u, e.status, r);
    }
    return r;
  }
  extractError(e) {
    if (e && typeof e == "object") {
      const o = e;
      if (typeof o.error == "string")
        return o.error;
      if (typeof o.message == "string")
        return o.message;
    }
    return "Request failed";
  }
  async refreshToken() {
    const e = this.tokens.getRefreshToken();
    if (!e)
      return !1;
    try {
      const o = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ refresh_token: e })
      });
      if (!o.ok)
        return !1;
      const l = await o.json();
      return typeof l.access_token != "string" ? !1 : (this.tokens.setAccessToken(l.access_token), typeof l.refresh_token == "string" && this.tokens.setRefreshToken(l.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, o, l) {
    const r = o ? "?" + new URLSearchParams(o).toString() : "";
    return this.request("GET", e + r, null, l);
  }
  async post(e, o) {
    return this.request("POST", e, o ?? null);
  }
  async put(e, o) {
    return this.request("PUT", e, o ?? null);
  }
  async patch(e, o) {
    return this.request("PATCH", e, o ?? null);
  }
  async delete(e) {
    return this.request("DELETE", e);
  }
  isLoggedIn() {
    return this.tokens.getAccessToken() !== null;
  }
  async getCurrentUser() {
    const { user: e } = await this.get("/api/v1/auth/me");
    return { ...e, is_admin: Jt(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const ee = new be(), Xt = 6e4, Wt = 250;
function qt(t) {
  return typeof t == "object" && t !== null && t.name === "AbortError";
}
const Be = _e("media", () => {
  const t = g([]), e = g(0), o = g(!1), l = g(null), r = g(""), u = g([]), c = g(void 0), h = g(void 0), p = g([]), d = g([]), i = g("name"), v = g("asc"), y = g(24), f = g(0), _ = L(() => t.value.length < e.value), m = L(() => {
    const b = {};
    return r.value && (b.search = r.value), u.value.length && (b.genres = u.value), c.value !== void 0 && (b.yearFrom = c.value), h.value !== void 0 && (b.yearTo = h.value), p.value.length && (b.ratings = p.value), d.value.length && (b.types = d.value), b.sort = i.value, b.order = v.value, b.limit = y.value, b.offset = f.value, b;
  }), M = L(() => {
    const b = /* @__PURE__ */ new Set();
    return t.value.forEach((E) => {
      var U;
      return (U = E.genres) == null ? void 0 : U.forEach((O) => b.add(O));
    }), Array.from(b).sort();
  }), I = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], V = ["movie", "series", "episode", "audio", "image"];
  function G(b) {
    var U, O, Z;
    const E = new URLSearchParams();
    return b.search && E.set("search", b.search), (U = b.genres) == null || U.forEach((Y) => E.append("genres", Y)), b.yearFrom !== void 0 && E.set("yearFrom", String(b.yearFrom)), b.yearTo !== void 0 && E.set("yearTo", String(b.yearTo)), (O = b.ratings) == null || O.forEach((Y) => E.append("ratings", Y)), (Z = b.types) == null || Z.forEach((Y) => E.append("types", Y)), b.sort && E.set("sort", b.sort), b.order && E.set("order", b.order), E.set("limit", String(b.limit)), E.set("offset", String(b.offset)), E;
  }
  function X(b, E) {
    return `${b}/api/v1/media?${G(E).toString()}`;
  }
  function z(b) {
    return G(b).toString();
  }
  const P = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map();
  let $ = null, T = null, j;
  function se(b) {
    return !!b && Date.now() - b.ts < Xt;
  }
  function ve(b, E, U, O) {
    O && (T && U !== $ && T.abort(), $ = U);
    const Z = w.get(U);
    if (Z)
      return O && (T = Z.controller), Z.promise;
    const Y = new AbortController();
    O && (T = Y);
    const Le = new be({ baseUrl: b }).get(X(b, E), void 0, Y.signal).then((we) => (P.set(U, { items: we.items, total: we.total, ts: Date.now() }), we)).finally(() => {
      w.delete(U);
    });
    return w.set(U, { promise: Le, controller: Y }), Le;
  }
  function Pe(b, E) {
    t.value = E ? [...t.value, ...b.items] : b.items, e.value = b.total;
  }
  async function ye(b, E = !1) {
    const U = { ...m.value }, O = z(U), Z = P.get(O);
    if (se(Z)) {
      Pe(Z, E), l.value = null;
      return;
    }
    o.value = !0, l.value = null;
    try {
      const Y = await ve(b, U, O, !E);
      if (!E && O !== $) return;
      Pe(Y, E);
    } catch (Y) {
      if (qt(Y)) return;
      (E || O === $) && (l.value = Y instanceof Error ? Y.message : "Failed to load media");
    } finally {
      (E || O === $) && (o.value = !1);
    }
  }
  function Ye(b, E = Wt) {
    f.value = 0, clearTimeout(j), j = setTimeout(() => ye(b, !1), E);
  }
  async function Je(b) {
    o.value || !_.value || (f.value = t.value.length, await ye(b, !0));
  }
  async function Xe(b, E = {}) {
    const U = { ...m.value, ...E }, O = z(U);
    if (!se(P.get(O)))
      try {
        await ve(b, U, O, !1);
      } catch {
      }
  }
  function We() {
    P.clear();
  }
  function qe() {
    clearTimeout(j);
  }
  function Ze() {
    const b = {};
    return r.value && (b.search = r.value), u.value.length && (b.genres = [...u.value]), c.value !== void 0 && (b.yearFrom = String(c.value)), h.value !== void 0 && (b.yearTo = String(h.value)), p.value.length && (b.ratings = [...p.value]), d.value.length && (b.types = [...d.value]), i.value !== "name" && (b.sort = i.value), v.value !== "asc" && (b.order = v.value), b;
  }
  function ke(b) {
    return b == null ? [] : Array.isArray(b) ? b.filter((E) => E != null) : [b];
  }
  function et(b) {
    r.value = (Array.isArray(b.search) ? b.search[0] : b.search) ?? "", u.value = ke(b.genres), p.value = ke(b.ratings), d.value = ke(b.types);
    const E = Array.isArray(b.yearFrom) ? b.yearFrom[0] : b.yearFrom, U = Array.isArray(b.yearTo) ? b.yearTo[0] : b.yearTo;
    c.value = E ? Number(E) : void 0, h.value = U ? Number(U) : void 0;
    const O = Array.isArray(b.sort) ? b.sort[0] : b.sort, Z = Array.isArray(b.order) ? b.order[0] : b.order;
    i.value = O ?? "name", v.value = Z ?? "asc", f.value = 0;
  }
  function tt() {
    t.value = [], e.value = 0, f.value = 0, l.value = null;
  }
  function nt(b) {
    r.value = b, f.value = 0;
  }
  function ot(b) {
    u.value = b, f.value = 0;
  }
  function st(b, E) {
    c.value = b, h.value = E, f.value = 0;
  }
  function at(b) {
    p.value = b, f.value = 0;
  }
  function lt(b) {
    d.value = b, f.value = 0;
  }
  function it(b, E) {
    i.value = b, E && (v.value = E), f.value = 0;
  }
  return {
    items: t,
    total: e,
    loading: o,
    error: l,
    search: r,
    selectedGenres: u,
    yearFrom: c,
    yearTo: h,
    selectedRatings: p,
    selectedTypes: d,
    sort: i,
    order: v,
    limit: y,
    offset: f,
    hasMore: _,
    queryParams: m,
    availableGenres: M,
    availableRatings: I,
    availableTypes: V,
    fetchMedia: ye,
    scheduleFetch: Ye,
    loadMore: Je,
    prefetch: Xe,
    clearCache: We,
    cancelScheduled: qe,
    toQuery: Ze,
    applyQuery: et,
    reset: tt,
    setSearch: nt,
    setGenres: ot,
    setYearRange: st,
    setRatings: at,
    setTypes: lt,
    setSort: it
  };
}), Zt = { class: "media-card" }, en = ["href"], tn = { class: "card-poster" }, nn = ["src", "alt"], on = {
  key: 1,
  class: "poster-placeholder"
}, sn = { class: "placeholder-type" }, an = { class: "card-overlay" }, ln = {
  key: 0,
  class: "card-year"
}, rn = {
  key: 1,
  class: "card-rating"
}, cn = { class: "card-info" }, un = ["title"], dn = {
  key: 0,
  class: "card-genres"
}, vn = /* @__PURE__ */ B({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(t) {
    return (e, o) => {
      var l;
      return s(), a("article", Zt, [
        n("a", {
          href: t.to ?? `/app/player/${t.item.id}`,
          class: "card-link"
        }, [
          n("div", tn, [
            t.item.poster_url ? (s(), a("img", {
              key: 0,
              src: t.item.poster_url,
              alt: t.item.name,
              loading: "lazy"
            }, null, 8, nn)) : (s(), a("div", on, [
              o[0] || (o[0] = n("span", { class: "placeholder-icon" }, "🎬", -1)),
              n("span", sn, k(t.item.type), 1)
            ]))
          ]),
          n("div", an, [
            t.item.year ? (s(), a("span", ln, k(t.item.year), 1)) : x("", !0),
            t.item.rating ? (s(), a("span", rn, k(t.item.rating), 1)) : x("", !0)
          ]),
          n("div", cn, [
            n("h3", {
              class: "card-title",
              title: t.item.name
            }, k(t.item.name), 9, un),
            (l = t.item.genres) != null && l.length ? (s(), a("p", dn, k(t.item.genres.slice(0, 2).join(", ")), 1)) : x("", !0)
          ])
        ], 8, en)
      ]);
    };
  }
}), hn = /* @__PURE__ */ A(vn, [["__scopeId", "data-v-e60c8481"]]), fn = { class: "media-grid-container" }, mn = {
  key: 0,
  class: "media-grid-skeleton"
}, pn = {
  key: 1,
  class: "media-grid-empty"
}, gn = {
  key: 2,
  class: "media-grid"
}, _n = /* @__PURE__ */ B({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(t) {
    return (e, o) => (s(), a("div", fn, [
      t.loading ? (s(), a("div", mn, [
        (s(), a(D, null, N(12, (l) => n("div", {
          key: l,
          class: "skeleton-card"
        }, [...o[0] || (o[0] = [
          n("div", { class: "skeleton-poster" }, null, -1),
          n("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : t.items.length === 0 ? (s(), a("div", pn, [...o[1] || (o[1] = [
        n("p", null, "No media found.", -1),
        n("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (s(), a("div", gn, [
        (s(!0), a(D, null, N(t.items, (l) => (s(), K(hn, {
          key: l.id,
          item: l
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), bn = /* @__PURE__ */ A(_n, [["__scopeId", "data-v-b7e87216"]]), yn = { class: "filter-bar" }, kn = { class: "filter-search" }, wn = { class: "filter-row" }, $n = { class: "filter-group" }, xn = ["value"], Cn = ["value"], Sn = ["value"], In = { class: "filter-group" }, Mn = ["value"], Tn = ["value"], En = ["value"], Bn = ["value"], An = { class: "filter-section" }, Vn = { class: "filter-chips" }, Pn = ["onClick"], Ln = { class: "filter-section" }, Rn = { class: "filter-chips" }, jn = ["onClick"], Fn = { class: "filter-section" }, Dn = { class: "filter-chips" }, zn = ["onClick"], Un = { class: "filter-actions" }, Nn = { class: "result-count" }, Hn = /* @__PURE__ */ B({
  __name: "FilterBar",
  setup(t) {
    const e = Be(), o = g(e.search), l = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function r() {
      e.setSearch(o.value);
    }
    function u(f) {
      const _ = e.selectedGenres;
      _.includes(f) ? e.setGenres(_.filter((m) => m !== f)) : e.setGenres([..._, f]);
    }
    function c(f) {
      const _ = e.selectedRatings;
      _.includes(f) ? e.setRatings(_.filter((m) => m !== f)) : e.setRatings([..._, f]);
    }
    function h(f) {
      const _ = e.selectedTypes;
      _.includes(f) ? e.setTypes(_.filter((m) => m !== f)) : e.setTypes([..._, f]);
    }
    function p(f) {
      const _ = f.target;
      e.setSort(_.value);
    }
    function d(f) {
      const _ = f.target;
      e.order = _.value;
    }
    const i = (/* @__PURE__ */ new Date()).getFullYear(), v = L(() => {
      const f = [];
      for (let _ = i; _ >= 1900; _--)
        f.push(_);
      return f;
    });
    function y() {
      o.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (f, _) => (s(), a("div", yn, [
      n("div", kn, [
        ne(n("input", {
          "onUpdate:modelValue": _[0] || (_[0] = (m) => o.value = m),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: r
        }, null, 544), [
          [pe, o.value]
        ])
      ]),
      n("div", wn, [
        n("div", $n, [
          _[4] || (_[4] = n("label", { class: "filter-label" }, "Sort", -1)),
          n("select", {
            class: "filter-select",
            value: S(e).sort,
            onChange: p
          }, [
            (s(), a(D, null, N(l, (m) => n("option", {
              key: m.value,
              value: m.value
            }, k(m.label), 9, Cn)), 64))
          ], 40, xn),
          n("select", {
            class: "filter-select order-select",
            value: S(e).order,
            onChange: d
          }, [..._[3] || (_[3] = [
            n("option", { value: "asc" }, "↑", -1),
            n("option", { value: "desc" }, "↓", -1)
          ])], 40, Sn)
        ]),
        n("div", In, [
          _[7] || (_[7] = n("label", { class: "filter-label" }, "Year", -1)),
          n("select", {
            class: "filter-select",
            value: S(e).yearFrom ?? "",
            onChange: _[1] || (_[1] = (m) => S(e).setYearRange(
              m.target.value ? Number(m.target.value) : void 0,
              S(e).yearTo
            ))
          }, [
            _[5] || (_[5] = n("option", { value: "" }, "From", -1)),
            (s(!0), a(D, null, N(v.value.slice(0, 50), (m) => (s(), a("option", {
              key: m,
              value: m
            }, k(m), 9, Tn))), 128))
          ], 40, Mn),
          n("select", {
            class: "filter-select",
            value: S(e).yearTo ?? "",
            onChange: _[2] || (_[2] = (m) => S(e).setYearRange(
              S(e).yearFrom,
              m.target.value ? Number(m.target.value) : void 0
            ))
          }, [
            _[6] || (_[6] = n("option", { value: "" }, "To", -1)),
            (s(!0), a(D, null, N(v.value.slice(0, 50), (m) => (s(), a("option", {
              key: m,
              value: m
            }, k(m), 9, Bn))), 128))
          ], 40, En)
        ])
      ]),
      n("div", An, [
        _[8] || (_[8] = n("span", { class: "filter-label" }, "Genres", -1)),
        n("div", Vn, [
          (s(!0), a(D, null, N(S(e).availableGenres, (m) => (s(), a("button", {
            key: m,
            class: R(["chip", { active: S(e).selectedGenres.includes(m) }]),
            onClick: (M) => u(m)
          }, k(m), 11, Pn))), 128))
        ])
      ]),
      n("div", Ln, [
        _[9] || (_[9] = n("span", { class: "filter-label" }, "Rating", -1)),
        n("div", Rn, [
          (s(!0), a(D, null, N(S(e).availableRatings, (m) => (s(), a("button", {
            key: m,
            class: R(["chip", { active: S(e).selectedRatings.includes(m) }]),
            onClick: (M) => c(m)
          }, k(m), 11, jn))), 128))
        ])
      ]),
      n("div", Fn, [
        _[10] || (_[10] = n("span", { class: "filter-label" }, "Type", -1)),
        n("div", Dn, [
          (s(!0), a(D, null, N(S(e).availableTypes, (m) => (s(), a("button", {
            key: m,
            class: R(["chip", { active: S(e).selectedTypes.includes(m) }]),
            onClick: (M) => h(m)
          }, k(m), 11, zn))), 128))
        ])
      ]),
      n("div", Un, [
        n("button", {
          class: "clear-btn",
          onClick: y
        }, "Clear filters"),
        n("span", Nn, k(S(e).total) + " result" + k(S(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), On = /* @__PURE__ */ A(Hn, [["__scopeId", "data-v-7089ec0b"]]), Kn = { class: "browse-page" }, Gn = { class: "browse-header" }, Qn = { class: "browse-toolbar-extra" }, Yn = {
  key: 0,
  class: "browse-error"
}, Jn = {
  key: 1,
  class: "load-more"
}, Xn = {
  key: 2,
  class: "loading-more"
}, Wn = /* @__PURE__ */ B({
  __name: "BrowsePage",
  setup(t) {
    const e = Me("apiBase") ?? L(() => ""), o = Be();
    function l() {
      o.reset(), o.fetchMedia(e.value);
    }
    te(l), oe(e, l);
    function r() {
      o.reset(), o.fetchMedia(e.value);
    }
    function u() {
      o.loadMore(e.value);
    }
    return (c, h) => (s(), a("div", Kn, [
      n("div", Gn, [
        h[0] || (h[0] = n("h1", { class: "browse-title" }, "Browse Media", -1)),
        n("div", Qn, [
          H(c.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      F(On, { onChange: r }),
      S(o).error ? (s(), a("div", Yn, [
        n("p", null, k(S(o).error), 1),
        n("button", {
          class: "retry-btn",
          onClick: l
        }, "Retry")
      ])) : x("", !0),
      F(bn, {
        items: S(o).items,
        loading: S(o).loading && S(o).items.length === 0
      }, null, 8, ["items", "loading"]),
      S(o).hasMore && !S(o).loading ? (s(), a("div", Jn, [
        n("button", {
          class: "load-more-btn",
          onClick: u
        }, "Load more")
      ])) : x("", !0),
      S(o).loading && S(o).items.length > 0 ? (s(), a("div", Xn, " Loading... ")) : x("", !0)
    ]));
  }
}), qn = /* @__PURE__ */ A(Wn, [["__scopeId", "data-v-c192afa6"]]), Zn = ["src", "poster"], eo = { class: "controls-top" }, to = { class: "media-title" }, no = {
  key: 0,
  class: "media-year"
}, oo = { class: "controls-center" }, so = { class: "controls-bottom" }, ao = { class: "progress-track" }, lo = { class: "controls-row" }, io = { class: "time-display" }, ro = { class: "volume-control" }, co = ["value"], uo = { class: "speed-control" }, vo = ["value"], ho = { class: "time-display" }, fo = /* @__PURE__ */ B({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(t) {
    const e = g(null), o = g(!1), l = g(0), r = g(0), u = g(1), c = g(!1), h = g(1), p = g(!1), d = g(!0);
    let i = null;
    const v = L(
      () => r.value > 0 ? l.value / r.value * 100 : 0
    );
    function y(P) {
      if (!isFinite(P) || isNaN(P)) return "0:00";
      const w = Math.floor(P / 60), $ = Math.floor(P % 60);
      return `${w}:${$.toString().padStart(2, "0")}`;
    }
    function f() {
      e.value && (o.value ? e.value.pause() : e.value.play());
    }
    function _() {
      e.value && (l.value = e.value.currentTime);
    }
    function m() {
      e.value && (r.value = e.value.duration);
    }
    function M(P) {
      const $ = P.currentTarget.getBoundingClientRect(), T = (P.clientX - $.left) / $.width;
      e.value && (e.value.currentTime = T * r.value);
    }
    function I(P) {
      const w = parseFloat(P.target.value);
      u.value = w, e.value && (e.value.volume = w), c.value = w === 0;
    }
    function V() {
      c.value = !c.value, e.value && (e.value.muted = c.value);
    }
    function G(P) {
      h.value = P, e.value && (e.value.playbackRate = P);
    }
    function X() {
      var w;
      const P = (w = e.value) == null ? void 0 : w.closest(".player-container");
      P && (document.fullscreenElement ? (document.exitFullscreen(), p.value = !1) : (P.requestFullscreen(), p.value = !0));
    }
    function z() {
      d.value = !0, i && clearTimeout(i), i = setTimeout(() => {
        o.value && (d.value = !1);
      }, 3e3);
    }
    return dt(() => {
      i && clearTimeout(i);
    }), (P, w) => (s(), a("div", {
      class: R(["player-container", { "controls-hidden": !d.value && o.value }]),
      onMousemove: z,
      onClick: f
    }, [
      w[6] || (w[6] = n("div", { class: "player-overlay" }, null, -1)),
      n("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: t.streamUrl,
        poster: t.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: w[0] || (w[0] = ($) => o.value = !0),
        onPause: w[1] || (w[1] = ($) => o.value = !1),
        onTimeupdate: _,
        onLoadedmetadata: m,
        onClick: ie(f, ["stop"])
      }, null, 40, Zn),
      n("div", {
        class: "player-controls",
        onClick: w[4] || (w[4] = ie(() => {
        }, ["stop"]))
      }, [
        n("div", eo, [
          n("button", {
            class: "ctrl-btn back-btn",
            onClick: w[2] || (w[2] = ($) => P.$router.back())
          }, " ← Back "),
          n("span", to, k(t.media.name), 1),
          t.media.year ? (s(), a("span", no, k(t.media.year), 1)) : x("", !0)
        ]),
        n("div", oo, [
          n("button", {
            class: "play-btn",
            onClick: f
          }, k(o.value ? "❚❚" : "▶"), 1)
        ]),
        n("div", so, [
          n("div", {
            class: "progress-bar",
            onClick: M
          }, [
            n("div", ao, [
              n("div", {
                class: "progress-fill",
                style: J({ width: v.value + "%" })
              }, null, 4)
            ])
          ]),
          n("div", lo, [
            n("span", io, k(y(l.value)), 1),
            n("div", ro, [
              n("button", {
                class: "ctrl-btn",
                onClick: V
              }, k(c.value || u.value === 0 ? "🔇" : "🔊"), 1),
              n("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: c.value ? 0 : u.value,
                class: "volume-slider",
                onInput: I
              }, null, 40, co)
            ]),
            n("div", uo, [
              n("select", {
                class: "speed-select",
                value: h.value,
                onChange: w[3] || (w[3] = ($) => G(Number($.target.value)))
              }, [...w[5] || (w[5] = [
                vt('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, vo)
            ]),
            n("span", ho, k(y(r.value)), 1),
            n("button", {
              class: "ctrl-btn",
              onClick: X
            }, k(p.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), mo = /* @__PURE__ */ A(fo, [["__scopeId", "data-v-7a51063f"]]), po = { class: "player-page" }, go = {
  key: 0,
  class: "player-loading"
}, _o = {
  key: 1,
  class: "player-error"
}, bo = /* @__PURE__ */ B({
  __name: "PlayerPage",
  setup(t) {
    const e = Me("apiBase", L(() => "")), o = _t(), l = g(null), r = g(""), u = g(!0), c = g(null);
    async function h() {
      const p = o.params.id;
      if (!p) {
        c.value = "No media ID provided", u.value = !1;
        return;
      }
      try {
        const d = new be({ baseUrl: e.value }), [i, v] = await Promise.all([
          d.get(`/api/v1/media/${p}`),
          d.get(`/api/v1/media/${p}/playback-info`).catch(() => null)
        ]);
        l.value = i, v != null && v.url ? r.value = v.url : r.value = `${e.value}/media/${p}/stream`;
      } catch (d) {
        c.value = d instanceof Error ? d.message : "Failed to load media";
      } finally {
        u.value = !1;
      }
    }
    return te(h), (p, d) => (s(), a("div", po, [
      u.value ? (s(), a("div", go, "Loading...")) : c.value ? (s(), a("div", _o, [
        n("p", null, k(c.value), 1),
        n("button", {
          class: "retry-btn",
          onClick: h
        }, "Retry")
      ])) : l.value ? (s(), K(mo, {
        key: 2,
        media: l.value,
        "stream-url": r.value
      }, null, 8, ["media", "stream-url"])) : x("", !0)
    ]));
  }
}), yo = /* @__PURE__ */ A(bo, [["__scopeId", "data-v-d9061b47"]]), xe = "access_token", Ce = "refresh_token", Se = "user";
class ko {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(xe);
  }
  setAccessToken(e) {
    this.storage.setItem(xe, e);
  }
  getRefreshToken() {
    return this.storage.getItem(Ce);
  }
  setRefreshToken(e) {
    this.storage.setItem(Ce, e);
  }
  getUser() {
    const e = this.storage.getItem(Se);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(Se, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(xe), this.storage.removeItem(Ce), this.storage.removeItem(Se);
  }
}
const Ae = _e("auth", () => {
  const t = new ko(), e = Me("apiBase", ""), o = new be({ tokenStore: t, baseUrl: e }), l = g(null), r = g(!1), u = g(null), c = L(() => t.getAccessToken() !== null), h = L(() => {
    var y;
    return ((y = l.value) == null ? void 0 : y.is_admin) === !0;
  });
  async function p(y, f) {
    r.value = !0, u.value = null;
    try {
      const _ = await o.post("/api/v1/auth/login", { email: y, password: f });
      return t.setAccessToken(_.access_token), t.setRefreshToken(_.refresh_token), await i(), !0;
    } catch (_) {
      return u.value = _ instanceof Error ? _.message : "Login failed", !1;
    } finally {
      r.value = !1;
    }
  }
  async function d(y, f, _) {
    r.value = !0, u.value = null;
    try {
      const m = await o.post("/api/v1/auth/register", { email: y, username: f, password: _ });
      return t.setAccessToken(m.access_token), t.setRefreshToken(m.refresh_token), await i(), !0;
    } catch (m) {
      return u.value = m instanceof Error ? m.message : "Registration failed", !1;
    } finally {
      r.value = !1;
    }
  }
  async function i() {
    if (c.value)
      try {
        l.value = await o.getCurrentUser();
      } catch {
        l.value = null, t.clear();
      }
  }
  function v() {
    t.clear(), l.value = null;
  }
  return {
    user: l,
    loading: r,
    error: u,
    isLoggedIn: c,
    isAdmin: h,
    client: o,
    login: p,
    signup: d,
    fetchUser: i,
    logout: v
  };
}), wo = {
  key: 0,
  class: "form-error"
}, $o = { class: "field" }, xo = { class: "field" }, Co = { class: "password-wrapper" }, So = ["type"], Io = ["disabled"], Mo = { class: "form-footer" }, To = /* @__PURE__ */ B({
  __name: "LoginForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const o = e, l = Ae(), r = Ue(), u = g(""), c = g(""), h = g(!1);
    async function p() {
      await l.login(u.value, c.value) && (o("success"), r.push("/app"));
    }
    return (d, i) => {
      const v = De("router-link");
      return s(), a("form", {
        class: "login-form",
        onSubmit: ie(p, ["prevent"])
      }, [
        i[7] || (i[7] = n("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        S(l).error ? (s(), a("div", wo, k(S(l).error), 1)) : x("", !0),
        n("div", $o, [
          i[3] || (i[3] = n("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          ne(n("input", {
            id: "email",
            "onUpdate:modelValue": i[0] || (i[0] = (y) => u.value = y),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [pe, u.value]
          ])
        ]),
        n("div", xo, [
          i[4] || (i[4] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", Co, [
            ne(n("input", {
              id: "password",
              "onUpdate:modelValue": i[1] || (i[1] = (y) => c.value = y),
              type: h.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, So), [
              [Ie, c.value]
            ]),
            n("button", {
              type: "button",
              class: "toggle-password",
              onClick: i[2] || (i[2] = (y) => h.value = !h.value)
            }, k(h.value ? "🙈" : "👁"), 1)
          ])
        ]),
        n("button", {
          type: "submit",
          class: "submit-btn",
          disabled: S(l).loading
        }, k(S(l).loading ? "Signing in..." : "Sign in"), 9, Io),
        n("p", Mo, [
          i[6] || (i[6] = q(" Don't have an account? ", -1)),
          F(v, {
            to: "/app/signup",
            class: "link"
          }, {
            default: W(() => [...i[5] || (i[5] = [
              q("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Eo = /* @__PURE__ */ A(To, [["__scopeId", "data-v-22bc5576"]]), Bo = { class: "auth-page" }, Ao = { class: "auth-card" }, Vo = /* @__PURE__ */ B({
  __name: "LoginPage",
  setup(t) {
    return (e, o) => (s(), a("div", Bo, [
      n("div", Ao, [
        F(Eo, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Po = /* @__PURE__ */ A(Vo, [["__scopeId", "data-v-9c53ce6a"]]), Lo = {
  key: 0,
  class: "form-error"
}, Ro = { class: "field" }, jo = { class: "field" }, Fo = { class: "field" }, Do = { class: "password-wrapper" }, zo = ["type"], Uo = { class: "field" }, No = ["type"], Ho = ["disabled"], Oo = { class: "form-footer" }, Ko = /* @__PURE__ */ B({
  __name: "SignupForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const o = e, l = Ae(), r = Ue(), u = g(""), c = g(""), h = g(""), p = g(""), d = g(!1), i = g(null);
    async function v() {
      if (i.value = null, h.value.length < 8) {
        i.value = "Password must be at least 8 characters.";
        return;
      }
      if (h.value !== p.value) {
        i.value = "Passwords do not match.";
        return;
      }
      await l.signup(u.value, c.value, h.value) && (o("success"), r.push("/app"));
    }
    return (y, f) => {
      const _ = De("router-link");
      return s(), a("form", {
        class: "signup-form",
        onSubmit: ie(v, ["prevent"])
      }, [
        f[11] || (f[11] = n("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        S(l).error || i.value ? (s(), a("div", Lo, k(S(l).error || i.value), 1)) : x("", !0),
        n("div", Ro, [
          f[5] || (f[5] = n("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          ne(n("input", {
            id: "email",
            "onUpdate:modelValue": f[0] || (f[0] = (m) => u.value = m),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [pe, u.value]
          ])
        ]),
        n("div", jo, [
          f[6] || (f[6] = n("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          ne(n("input", {
            id: "username",
            "onUpdate:modelValue": f[1] || (f[1] = (m) => c.value = m),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [pe, c.value]
          ])
        ]),
        n("div", Fo, [
          f[7] || (f[7] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", Do, [
            ne(n("input", {
              id: "password",
              "onUpdate:modelValue": f[2] || (f[2] = (m) => h.value = m),
              type: d.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, zo), [
              [Ie, h.value]
            ]),
            n("button", {
              type: "button",
              class: "toggle-password",
              onClick: f[3] || (f[3] = (m) => d.value = !d.value)
            }, k(d.value ? "🙈" : "👁"), 1)
          ])
        ]),
        n("div", Uo, [
          f[8] || (f[8] = n("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          ne(n("input", {
            id: "confirm",
            "onUpdate:modelValue": f[4] || (f[4] = (m) => p.value = m),
            type: d.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, No), [
            [Ie, p.value]
          ])
        ]),
        n("button", {
          type: "submit",
          class: "submit-btn",
          disabled: S(l).loading
        }, k(S(l).loading ? "Creating account..." : "Create account"), 9, Ho),
        n("p", Oo, [
          f[10] || (f[10] = q(" Already have an account? ", -1)),
          F(_, {
            to: "/app/login",
            class: "link"
          }, {
            default: W(() => [...f[9] || (f[9] = [
              q("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Go = /* @__PURE__ */ A(Ko, [["__scopeId", "data-v-d5e42c72"]]), Qo = { class: "auth-page" }, Yo = { class: "auth-card" }, Jo = /* @__PURE__ */ B({
  __name: "SignupPage",
  setup(t) {
    return (e, o) => (s(), a("div", Qo, [
      n("div", Yo, [
        F(Go, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Xo = /* @__PURE__ */ A(Jo, [["__scopeId", "data-v-609331e4"]]), Wo = { class: "settings-form" }, qo = {
  key: 0,
  class: "settings-loading"
}, Zo = {
  key: 1,
  class: "settings-error"
}, es = { class: "group-title" }, ts = ["for"], ns = { class: "setting-control" }, os = ["id", "checked", "onChange"], ss = ["id", "value", "onChange"], as = ["id", "value", "onChange"], ls = { class: "settings-actions" }, is = {
  key: 0,
  class: "success-msg"
}, rs = ["disabled"], cs = /* @__PURE__ */ B({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = Ae(), u = g({}), c = g(!0), h = g(!1), p = g(null), d = g(null), i = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], v = L(
      () => o.groups ? i.filter((I) => o.groups.includes(I)) : i
    );
    async function y() {
      c.value = !0, p.value = null;
      try {
        const I = await r.client.get("/api/v1/users/me/settings");
        u.value = I;
      } catch (I) {
        p.value = I instanceof Error ? I.message : "Failed to load settings";
      } finally {
        c.value = !1;
      }
    }
    async function f() {
      h.value = !0, p.value = null, d.value = null;
      try {
        await r.client.put("/api/v1/users/me/settings", u.value), d.value = "Settings saved.", l("saved", u.value), setTimeout(() => {
          d.value = null;
        }, 3e3);
      } catch (I) {
        p.value = I instanceof Error ? I.message : "Failed to save settings";
      } finally {
        h.value = !1;
      }
    }
    function _(I, V) {
      u.value[I] = V;
    }
    te(y);
    const m = {
      transcoding: "Transcoding",
      metadata: "Metadata",
      markers: "Marker Detection",
      subtitles: "Subtitles",
      discovery: "Discovery",
      trickplay: "Trickplay",
      newsletter: "Newsletter",
      "port-forward": "Port Forwarding",
      scrobblers: "Scrobblers"
    }, M = {
      "hwaccel.enabled": { label: "Hardware acceleration", type: "bool" },
      "hwaccel.prefer_hardware": { label: "Prefer hardware encoding", type: "bool" },
      "hwaccel.probe_timeout": { label: "HW probe timeout (s)", type: "number" },
      "tmdb.api_key": { label: "TMDB API Key", type: "string" },
      "marker_detection.similarity_threshold": { label: "Intro similarity threshold", type: "number" },
      "marker_detection.intro_max_duration": { label: "Max intro duration (s)", type: "number" },
      "subtitles.enabled": { label: "Enable subtitles", type: "bool" },
      "subtitles.default_language": { label: "Default subtitle language", type: "string" },
      "subtitles.burn_in_by_default": { label: "Burn in subtitles by default", type: "bool" },
      "discovery.discovery_port": { label: "Discovery port", type: "number" },
      "trickplay.enabled": { label: "Enable trickplay", type: "bool" },
      "trickplay.interval_seconds": { label: "Trickplay interval (s)", type: "number" },
      "newsletter.enabled": { label: "Enable newsletter", type: "bool" },
      "newsletter.send_hour": { label: "Newsletter send hour", type: "number" },
      "port-forward.port_forwarding.upnp_enabled": { label: "Enable UPnP", type: "bool" },
      "trakt.client_id": { label: "Trakt client ID", type: "string" },
      "trakt.client_secret": { label: "Trakt client secret", type: "string" },
      "trakt.redirect_uri": { label: "Trakt redirect URI", type: "string" }
    };
    return (I, V) => (s(), a("div", Wo, [
      c.value ? (s(), a("div", qo, "Loading settings...")) : p.value ? (s(), a("div", Zo, k(p.value), 1)) : (s(), a(D, { key: 2 }, [
        (s(!0), a(D, null, N(v.value, (G) => (s(), a("div", {
          key: G,
          class: "settings-group"
        }, [
          n("h3", es, k(m[G]), 1),
          (s(), a(D, null, N(M, (X, z) => ne(n("div", {
            key: z,
            class: "setting-row"
          }, [
            n("label", {
              for: z,
              class: "setting-label"
            }, k(X.label), 9, ts),
            n("div", ns, [
              X.type === "bool" ? (s(), a("input", {
                key: 0,
                id: z,
                type: "checkbox",
                class: "toggle",
                checked: !!u.value[z],
                onChange: (P) => _(z, P.target.checked)
              }, null, 40, os)) : X.type === "number" ? (s(), a("input", {
                key: 1,
                id: z,
                type: "number",
                class: "input number-input",
                value: u.value[z],
                onChange: (P) => _(z, Number(P.target.value))
              }, null, 40, ss)) : (s(), a("input", {
                key: 2,
                id: z,
                type: "text",
                class: "input",
                value: u.value[z] ?? "",
                onChange: (P) => _(z, P.target.value)
              }, null, 40, as))
            ])
          ]), [
            [Te, z.startsWith(G)]
          ])), 64))
        ]))), 128)),
        n("div", ls, [
          d.value ? (s(), a("div", is, k(d.value), 1)) : x("", !0),
          n("button", {
            class: "save-btn",
            disabled: h.value,
            onClick: f
          }, k(h.value ? "Saving..." : "Save settings"), 9, rs)
        ])
      ], 64))
    ]));
  }
}), us = /* @__PURE__ */ A(cs, [["__scopeId", "data-v-51b588b6"]]), ds = { class: "settings-page" }, vs = /* @__PURE__ */ B({
  __name: "SettingsPage",
  setup(t) {
    return (e, o) => (s(), a("div", ds, [
      o[0] || (o[0] = n("div", { class: "settings-header" }, [
        n("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      F(us)
    ]));
  }
}), hs = /* @__PURE__ */ A(vs, [["__scopeId", "data-v-f9ca8a28"]]);
function fs() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function ms(t) {
  const e = t.routerBase || "/app", o = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: qn
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: yo
    },
    {
      path: `${e}/login`,
      name: "login",
      component: Po
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Xo
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: hs
    }
  ];
  return t.extraRoutes && o.push(...t.extraRoutes), o.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: Qt,
    props: { appName: t.app }
  }), o;
}
function hu(t) {
  const e = {
    ...fs(),
    ...t
  };
  Dt();
  const o = pt(), l = e.routerBase || "/app", r = bt({
    history: yt(l),
    routes: ms(e)
  }), u = ht(Ht);
  return u.provide("apiBase", e.apiBase), u.use(o), u.use(r), u;
}
const ps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gs(t, e) {
  return s(), a("svg", ps, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
    }, null, -1)
  ])]);
}
const _s = C({ name: "lucide-play", render: gs }), bs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ys(t, e) {
  return s(), a("svg", bs, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("rect", {
        width: "5",
        height: "18",
        x: "14",
        y: "3",
        rx: "1"
      }),
      n("rect", {
        width: "5",
        height: "18",
        x: "5",
        y: "3",
        rx: "1"
      })
    ], -1)
  ])]);
}
const ks = C({ name: "lucide-pause", render: ys }), ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $s(t, e) {
  return s(), a("svg", ws, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
    }, null, -1)
  ])]);
}
const xs = C({ name: "lucide-skip-back", render: $s }), Cs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ss(t, e) {
  return s(), a("svg", Cs, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
    }, null, -1)
  ])]);
}
const Is = C({ name: "lucide-skip-forward", render: Ss }), Ms = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ts(t, e) {
  return s(), a("svg", Ms, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }),
      n("path", { d: "M3 3v5h5" })
    ], -1)
  ])]);
}
const Es = C({ name: "lucide-rotate-ccw", render: Ts }), Bs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function As(t, e) {
  return s(), a("svg", Bs, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }),
      n("path", { d: "M21 3v5h-5" })
    ], -1)
  ])]);
}
const Vs = C({ name: "lucide-rotate-cw", render: As }), Ps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ls(t, e) {
  return s(), a("svg", Ps, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
    }, null, -1)
  ])]);
}
const Rs = C({ name: "lucide-volume-2", render: Ls }), js = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fs(t, e) {
  return s(), a("svg", js, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
    }, null, -1)
  ])]);
}
const Ds = C({ name: "lucide-volume-1", render: Fs }), zs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Us(t, e) {
  return s(), a("svg", zs, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
    }, null, -1)
  ])]);
}
const Ns = C({ name: "lucide-volume-x", render: Us }), Hs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Os(t, e) {
  return s(), a("svg", Hs, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("rect", {
        width: "18",
        height: "14",
        x: "3",
        y: "5",
        rx: "2",
        ry: "2"
      }),
      n("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })
    ], -1)
  ])]);
}
const Ks = C({ name: "lucide-captions", render: Os }), Gs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qs(t, e) {
  return s(), a("svg", Gs, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }),
      n("rect", {
        width: "10",
        height: "7",
        x: "12",
        y: "13",
        rx: "2"
      })
    ], -1)
  ])]);
}
const Ys = C({ name: "lucide-picture-in-picture-2", render: Qs }), Js = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xs(t, e) {
  return s(), a("svg", Js, [...e[0] || (e[0] = [
    n("rect", {
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
    }, null, -1)
  ])]);
}
const Ws = C({ name: "lucide-rectangle-horizontal", render: Xs }), qs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zs(t, e) {
  return s(), a("svg", qs, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
    }, null, -1)
  ])]);
}
const ea = C({ name: "lucide-maximize", render: Zs }), ta = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function na(t, e) {
  return s(), a("svg", ta, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
    }, null, -1)
  ])]);
}
const oa = C({ name: "lucide-minimize", render: na }), sa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function aa(t, e) {
  return s(), a("svg", sa, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
    }, null, -1)
  ])]);
}
const la = C({ name: "lucide-maximize-2", render: aa }), ia = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ra(t, e) {
  return s(), a("svg", ia, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
    }, null, -1)
  ])]);
}
const ca = C({ name: "lucide-cast", render: ra }), ua = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function da(t, e) {
  return s(), a("svg", ua, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
      n("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ])]);
}
const va = C({ name: "lucide-settings", render: da }), ha = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fa(t, e) {
  return s(), a("svg", ha, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
    }, null, -1)
  ])]);
}
const ma = C({ name: "lucide-gauge", render: fa }), pa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ga(t, e) {
  return s(), a("svg", pa, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      n("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })
    ], -1)
  ])]);
}
const _a = C({ name: "lucide-film", render: ga }), ba = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ya(t, e) {
  return s(), a("svg", ba, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        ry: "2"
      }),
      n("circle", {
        cx: "9",
        cy: "9",
        r: "2"
      }),
      n("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
    ], -1)
  ])]);
}
const ka = C({ name: "lucide-image", render: ya }), wa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $a(t, e) {
  return s(), a("svg", wa, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M9 18V5l12-2v13" }),
      n("circle", {
        cx: "6",
        cy: "18",
        r: "3"
      }),
      n("circle", {
        cx: "18",
        cy: "16",
        r: "3"
      })
    ], -1)
  ])]);
}
const xa = C({ name: "lucide-music", render: $a }), Ca = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Sa(t, e) {
  return s(), a("svg", Ca, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "m17 2l-5 5l-5-5" }),
      n("rect", {
        width: "20",
        height: "15",
        x: "2",
        y: "7",
        rx: "2"
      })
    ], -1)
  ])]);
}
const Ia = C({ name: "lucide-tv", render: Sa }), Ma = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ta(t, e) {
  return s(), a("svg", Ma, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "m21 21l-4.34-4.34" }),
      n("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      })
    ], -1)
  ])]);
}
const Ea = C({ name: "lucide-search", render: Ta }), Ba = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Aa(t, e) {
  return s(), a("svg", Ba, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
    }, null, -1)
  ])]);
}
const Va = C({ name: "lucide-sliders-horizontal", render: Aa }), Pa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function La(t, e) {
  return s(), a("svg", Pa, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M8 2v4m8-4v4" }),
      n("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2"
      }),
      n("path", { d: "M3 10h18" })
    ], -1)
  ])]);
}
const Ra = C({ name: "lucide-calendar", render: La }), ja = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fa(t, e) {
  return s(), a("svg", ja, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
    }, null, -1)
  ])]);
}
const Da = C({ name: "lucide-arrow-up-down", render: Fa }), za = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ua(t, e) {
  return s(), a("svg", za, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
    }, null, -1)
  ])]);
}
const Na = C({ name: "lucide-star", render: Ua }), Ha = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oa(t, e) {
  return s(), a("svg", Ha, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
    }, null, -1)
  ])]);
}
const Ka = C({ name: "lucide-list", render: Oa }), Ga = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qa(t, e) {
  return s(), a("svg", Ga, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 12h14m-7-7v14"
    }, null, -1)
  ])]);
}
const Ya = C({ name: "lucide-plus", render: Qa }), Ja = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xa(t, e) {
  return s(), a("svg", Ja, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      n("path", { d: "M12 16v-4m0-4h.01" })
    ], -1)
  ])]);
}
const Wa = C({ name: "lucide-info", render: Xa }), qa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Za(t, e) {
  return s(), a("svg", qa, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M18 6L6 18M6 6l12 12"
    }, null, -1)
  ])]);
}
const el = C({ name: "lucide-x", render: Za }), tl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function nl(t, e) {
  return s(), a("svg", tl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20 6L9 17l-5-5"
    }, null, -1)
  ])]);
}
const ol = C({ name: "lucide-check", render: nl }), sl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function al(t, e) {
  return s(), a("svg", sl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }, null, -1)
  ])]);
}
const ll = C({ name: "lucide-bookmark", render: al }), il = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function rl(t, e) {
  return s(), a("svg", il, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }, null, -1)
  ])]);
}
const cl = C({ name: "lucide-bookmark-plus", render: rl }), ul = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function dl(t, e) {
  return s(), a("svg", ul, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
    }, null, -1)
  ])]);
}
const vl = C({ name: "lucide-heart", render: dl }), hl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fl(t, e) {
  return s(), a("svg", hl, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
      n("circle", {
        cx: "12",
        cy: "7",
        r: "4"
      })
    ], -1)
  ])]);
}
const ml = C({ name: "lucide-user", render: fl }), pl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gl(t, e) {
  return s(), a("svg", pl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }, null, -1)
  ])]);
}
const _l = C({ name: "lucide-log-out", render: gl }), bl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function yl(t, e) {
  return s(), a("svg", bl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 5h16M4 12h16M4 19h16"
    }, null, -1)
  ])]);
}
const kl = C({ name: "lucide-menu", render: yl }), wl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $l(t, e) {
  return s(), a("svg", wl, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      }),
      n("circle", {
        cx: "19",
        cy: "12",
        r: "1"
      }),
      n("circle", {
        cx: "5",
        cy: "12",
        r: "1"
      })
    ], -1)
  ])]);
}
const xl = C({ name: "lucide-more-horizontal", render: $l }), Cl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Sl(t, e) {
  return s(), a("svg", Cl, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }),
      n("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ])]);
}
const Il = C({ name: "lucide-eye", render: Sl }), Ml = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Tl(t, e) {
  return s(), a("svg", Ml, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }),
      n("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })
    ], -1)
  ])]);
}
const El = C({ name: "lucide-eye-off", render: Tl }), Bl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Al(t, e) {
  return s(), a("svg", Bl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m12 19l-7-7l7-7m7 7H5"
    }, null, -1)
  ])]);
}
const Vl = C({ name: "lucide-arrow-left", render: Al }), Pl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ll(t, e) {
  return s(), a("svg", Pl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m5 12l7-7l7 7m-7 7V5"
    }, null, -1)
  ])]);
}
const Rl = C({ name: "lucide-arrow-up", render: Ll }), jl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fl(t, e) {
  return s(), a("svg", jl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 5v14m7-7l-7 7l-7-7"
    }, null, -1)
  ])]);
}
const Dl = C({ name: "lucide-arrow-down", render: Fl }), zl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ul(t, e) {
  return s(), a("svg", zl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 9l6 6l6-6"
    }, null, -1)
  ])]);
}
const Nl = C({ name: "lucide-chevron-down", render: Ul }), Hl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ol(t, e) {
  return s(), a("svg", Hl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m18 15l-6-6l-6 6"
    }, null, -1)
  ])]);
}
const Kl = C({ name: "lucide-chevron-up", render: Ol }), Gl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ql(t, e) {
  return s(), a("svg", Gl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m15 18l-6-6l6-6"
    }, null, -1)
  ])]);
}
const Yl = C({ name: "lucide-chevron-left", render: Ql }), Jl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xl(t, e) {
  return s(), a("svg", Jl, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m9 18l6-6l-6-6"
    }, null, -1)
  ])]);
}
const Wl = C({ name: "lucide-chevron-right", render: Xl }), ql = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zl(t, e) {
  return s(), a("svg", ql, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 12a9 9 0 1 1-6.219-8.56"
    }, null, -1)
  ])]);
}
const ei = C({ name: "lucide-loader-circle", render: Zl }), ti = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ni(t, e) {
  return s(), a("svg", ti, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      n("path", { d: "M12 8v4m0 4h.01" })
    ], -1)
  ])]);
}
const oi = C({ name: "lucide-circle-alert", render: ni }), si = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ai(t, e) {
  return s(), a("svg", si, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      n("path", { d: "m9 12l2 2l4-4" })
    ], -1)
  ])]);
}
const li = C({ name: "lucide-circle-check", render: ai }), ii = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ri(t, e) {
  return s(), a("svg", ii, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      n("path", { d: "m15 9l-6 6m0-6l6 6" })
    ], -1)
  ])]);
}
const ci = C({ name: "lucide-circle-x", render: ri }), ui = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function di(t, e) {
  return s(), a("svg", ui, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }),
      n("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
    ], -1)
  ])]);
}
const vi = C({ name: "lucide-sun", render: di }), hi = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fi(t, e) {
  return s(), a("svg", hi, [...e[0] || (e[0] = [
    n("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
    }, null, -1)
  ])]);
}
const mi = C({ name: "lucide-moon", render: fi }), pi = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gi(t, e) {
  return s(), a("svg", pi, [...e[0] || (e[0] = [
    n("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      n("rect", {
        width: "20",
        height: "14",
        x: "2",
        y: "3",
        rx: "2"
      }),
      n("path", { d: "M8 21h8m-4-4v4" })
    ], -1)
  ])]);
}
const _i = C({ name: "lucide-monitor", render: gi }), Q = /* @__PURE__ */ B({
  __name: "Icon",
  props: {
    name: {},
    size: { default: void 0 },
    label: { default: void 0 },
    strokeWidth: { default: void 0 }
  },
  setup(t) {
    const e = {
      // playback (maps the legacy play/pause/volume/mute/back emoji)
      play: _s,
      pause: ks,
      "skip-back": xs,
      "skip-forward": Is,
      rewind: Es,
      forward: Vs,
      volume: Rs,
      "volume-low": Ds,
      mute: Ns,
      captions: Ks,
      pip: Ys,
      theater: Ws,
      fullscreen: ea,
      "fullscreen-exit": oa,
      expand: la,
      cast: ca,
      settings: va,
      speed: ma,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: _a,
      image: ka,
      music: xa,
      tv: Ia,
      search: Ea,
      filter: Va,
      calendar: Ra,
      sort: Da,
      star: Na,
      list: Ka,
      // actions
      plus: Ya,
      info: Wa,
      x: el,
      check: ol,
      bookmark: ll,
      "bookmark-plus": cl,
      heart: vl,
      user: ml,
      "log-out": _l,
      menu: kl,
      more: xl,
      eye: Il,
      "eye-off": El,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": Vl,
      "arrow-up": Rl,
      "arrow-down": Dl,
      "chevron-down": Nl,
      "chevron-up": Kl,
      "chevron-left": Yl,
      "chevron-right": Wl,
      // status / theme
      spinner: ei,
      alert: oi,
      success: li,
      error: ci,
      sun: vi,
      moon: mi,
      monitor: _i
    }, o = t, l = L(() => e[o.name]), r = L(
      () => o.size === void 0 ? void 0 : typeof o.size == "number" ? `${o.size}px` : o.size
    );
    return (u, c) => (s(), K(ze(l.value), {
      class: "phlix-icon",
      style: J(r.value ? { fontSize: r.value } : void 0),
      "stroke-width": t.strokeWidth,
      role: t.label ? "img" : void 0,
      "aria-label": t.label,
      "aria-hidden": t.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), bi = {
  key: 1,
  class: "phlix-backdrop__vignette",
  "aria-hidden": "true"
}, yi = /* @__PURE__ */ B({
  __name: "AppBackdrop",
  props: {
    enabled: { type: Boolean, default: !0 },
    grain: { type: Boolean, default: !0 },
    vignette: { type: Boolean, default: !0 },
    ambient: { type: Boolean, default: !1 },
    ambientColor: {},
    ambientImage: {},
    intensity: { default: 1 }
  },
  setup(t) {
    const e = t, o = g(!1);
    let l = null, r = null;
    const u = () => o.value = !!(l != null && l.matches || r != null && r.matches);
    te(() => {
      var v, y;
      typeof window > "u" || typeof window.matchMedia != "function" || (l = window.matchMedia("(prefers-reduced-motion: reduce)"), r = window.matchMedia("(prefers-reduced-data: reduce)"), u(), (v = l.addEventListener) == null || v.call(l, "change", u), (y = r.addEventListener) == null || y.call(r, "change", u));
    }), re(() => {
      var v, y;
      (v = l == null ? void 0 : l.removeEventListener) == null || v.call(l, "change", u), (y = r == null ? void 0 : r.removeEventListener) == null || y.call(r, "change", u);
    });
    const c = L(() => e.enabled && !o.value), h = L(() => c.value && e.ambient && !!(e.ambientColor || e.ambientImage));
    function p(v) {
      return encodeURI(v).replace(/["'()\s]/g, (y) => `%${y.charCodeAt(0).toString(16)}`);
    }
    const d = L(() => e.ambientImage ? { backgroundImage: `url("${p(e.ambientImage)}")`, opacity: String(0.55 * e.intensity) } : {
      background: `radial-gradient(60% 60% at 25% 12%, ${e.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${e.ambientColor} 55%, transparent), transparent 70%)`,
      opacity: String(0.85 * e.intensity)
    }), i = L(() => ({ opacity: `calc(var(--grain-opacity) * ${e.intensity})` }));
    return (v, y) => (s(), a(D, null, [
      h.value ? (s(), a("div", {
        key: 0,
        class: R(["phlix-backdrop__ambient", { "is-image": !!t.ambientImage }]),
        style: J(d.value),
        "aria-hidden": "true"
      }, null, 6)) : x("", !0),
      c.value && t.vignette ? (s(), a("div", bi)) : x("", !0),
      c.value && t.grain ? (s(), a("div", {
        key: 2,
        class: "phlix-backdrop__grain",
        style: J(i.value),
        "aria-hidden": "true"
      }, null, 4)) : x("", !0)
    ], 64));
  }
}), fu = /* @__PURE__ */ A(yi, [["__scopeId", "data-v-c521cafc"]]), ki = ["type", "disabled", "aria-busy"], wi = {
  key: 0,
  class: "phlix-btn__spinner"
}, $i = { class: "phlix-btn__label" }, xi = /* @__PURE__ */ B({
  __name: "Button",
  props: {
    variant: { default: "solid" },
    size: { default: "md" },
    type: { default: "button" },
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 },
    leftIcon: {},
    rightIcon: {}
  },
  setup(t) {
    const e = t, o = L(() => e.disabled || e.loading);
    return (l, r) => (s(), a("button", {
      type: t.type,
      class: R(["phlix-btn", [`phlix-btn--${t.variant}`, `phlix-btn--${t.size}`, { "phlix-btn--block": t.block, "is-loading": t.loading }]]),
      disabled: o.value,
      "aria-busy": t.loading || void 0
    }, [
      t.loading ? (s(), a("span", wi, [
        F(Q, { name: "spinner" })
      ])) : x("", !0),
      t.leftIcon && !t.loading ? (s(), K(Q, {
        key: 1,
        name: t.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0),
      n("span", $i, [
        H(l.$slots, "default", {}, void 0, !0)
      ]),
      t.rightIcon ? (s(), K(Q, {
        key: 2,
        name: t.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0)
    ], 10, ki));
  }
}), mu = /* @__PURE__ */ A(xi, [["__scopeId", "data-v-8cdee95a"]]), Ci = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], Si = /* @__PURE__ */ B({
  __name: "IconButton",
  props: {
    name: {},
    label: {},
    variant: { default: "ghost" },
    size: { default: "md" },
    type: { default: "button" },
    loading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    pressed: { type: Boolean, default: void 0 }
  },
  setup(t) {
    const e = t, o = L(() => e.disabled || e.loading);
    return (l, r) => (s(), a("button", {
      type: t.type,
      class: R(["phlix-iconbtn", [`phlix-iconbtn--${t.variant}`, `phlix-iconbtn--${t.size}`, { "is-pressed": t.pressed }]]),
      disabled: o.value,
      "aria-label": t.label,
      title: t.label,
      "aria-pressed": t.pressed === void 0 ? void 0 : t.pressed,
      "aria-busy": t.loading || void 0
    }, [
      F(Q, {
        name: t.loading ? "spinner" : t.name,
        class: R({ "phlix-iconbtn__spin": t.loading })
      }, null, 8, ["name", "class"])
    ], 10, Ci));
  }
}), Ve = /* @__PURE__ */ A(Si, [["__scopeId", "data-v-fc0cd545"]]), Ii = ["role", "aria-label"], Mi = /* @__PURE__ */ B({
  __name: "Badge",
  props: {
    tone: { default: "neutral" },
    size: { default: "sm" },
    mono: { type: Boolean, default: !1 },
    icon: {},
    label: {}
  },
  setup(t) {
    return (e, o) => (s(), a("span", {
      class: R(["phlix-badge", [`phlix-badge--${t.tone}`, `phlix-badge--${t.size}`, { "phlix-badge--mono": t.mono }]]),
      role: t.label ? "img" : void 0,
      "aria-label": t.label
    }, [
      t.icon ? (s(), K(Q, {
        key: 0,
        name: t.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : x("", !0),
      H(e.$slots, "default", {}, void 0, !0)
    ], 10, Ii));
  }
}), pu = /* @__PURE__ */ A(Mi, [["__scopeId", "data-v-8f8d0fd2"]]), Ti = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], Ei = /* @__PURE__ */ B({
  __name: "Slider",
  props: {
    modelValue: {},
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    disabled: { type: Boolean, default: !1 },
    label: {},
    formatValue: {}
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = g(null), u = g(!1), c = L(() => {
      const m = o.max - o.min || 1;
      return Math.min(100, Math.max(0, (o.modelValue - o.min) / m * 100));
    }), h = L(
      () => o.formatValue ? o.formatValue(o.modelValue) : String(o.modelValue)
    );
    function p(m) {
      const M = Math.min(o.max, Math.max(o.min, m)), I = Math.round((M - o.min) / o.step), V = o.min + I * o.step;
      return Math.round(V * 1e6) / 1e6;
    }
    function d(m, M = !1) {
      const I = p(m);
      I !== o.modelValue && (l("update:modelValue", I), M && l("change", I));
    }
    function i(m) {
      const M = r.value;
      if (!M) return o.modelValue;
      const I = M.getBoundingClientRect(), V = I.width ? (m - I.left) / I.width : 0;
      return o.min + V * (o.max - o.min);
    }
    function v(m) {
      var M, I;
      o.disabled || ((I = (M = m.currentTarget).setPointerCapture) == null || I.call(M, m.pointerId), u.value = !0, d(i(m.clientX)));
    }
    function y(m) {
      u.value && d(i(m.clientX));
    }
    function f(m) {
      var M, I;
      u.value && (u.value = !1, (I = (M = m.currentTarget).releasePointerCapture) == null || I.call(M, m.pointerId), l("change", o.modelValue));
    }
    function _(m) {
      if (o.disabled) return;
      const M = (o.max - o.min) / 10;
      let I = !0;
      switch (m.key) {
        case "ArrowRight":
        case "ArrowUp":
          d(o.modelValue + o.step, !0);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          d(o.modelValue - o.step, !0);
          break;
        case "PageUp":
          d(o.modelValue + M, !0);
          break;
        case "PageDown":
          d(o.modelValue - M, !0);
          break;
        case "Home":
          d(o.min, !0);
          break;
        case "End":
          d(o.max, !0);
          break;
        default:
          I = !1;
      }
      I && m.preventDefault();
    }
    return (m, M) => (s(), a("div", {
      class: R(["phlix-slider", { "is-disabled": t.disabled }]),
      role: "slider",
      tabindex: t.disabled ? -1 : 0,
      "aria-label": t.label,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": t.modelValue,
      "aria-valuetext": h.value,
      "aria-disabled": t.disabled || void 0,
      "aria-orientation": "horizontal",
      onKeydown: _
    }, [
      n("div", {
        ref_key: "trackEl",
        ref: r,
        class: "phlix-slider__track",
        onPointerdown: v,
        onPointermove: y,
        onPointerup: f
      }, [
        n("div", {
          class: "phlix-slider__fill",
          style: J({ width: c.value + "%" })
        }, null, 4),
        n("div", {
          class: "phlix-slider__thumb",
          style: J({ left: c.value + "%" })
        }, null, 4)
      ], 544)
    ], 42, Ti));
  }
}), gu = /* @__PURE__ */ A(Ei, [["__scopeId", "data-v-9ca92975"]]), Bi = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], Ai = ["id"], Vi = /* @__PURE__ */ B({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = ce();
    function u() {
      o.disabled || l("update:modelValue", !o.modelValue);
    }
    return (c, h) => (s(), a("span", {
      class: R(["phlix-switch", { "is-disabled": t.disabled }])
    }, [
      n("button", {
        type: "button",
        role: "switch",
        class: R(["phlix-switch__control", { "is-on": t.modelValue }]),
        "aria-checked": t.modelValue,
        "aria-label": t.label ? void 0 : "Toggle",
        "aria-labelledby": t.label ? S(r) : void 0,
        disabled: t.disabled,
        onClick: u
      }, [...h[0] || (h[0] = [
        n("span", { class: "phlix-switch__thumb" }, null, -1)
      ])], 10, Bi),
      t.label ? (s(), a("label", {
        key: 0,
        id: S(r),
        class: "phlix-switch__label",
        onClick: u
      }, k(t.label), 9, Ai)) : x("", !0)
    ], 2));
  }
}), _u = /* @__PURE__ */ A(Vi, [["__scopeId", "data-v-4631a106"]]), Pi = ["disabled", "aria-pressed"], Li = { class: "phlix-chip__label" }, Ri = ["disabled", "aria-label"], ji = /* @__PURE__ */ B({
  __name: "Chip",
  props: {
    selected: { type: Boolean, default: void 0 },
    removable: { type: Boolean, default: !1 },
    icon: {},
    size: { default: "sm" },
    disabled: { type: Boolean, default: !1 },
    removeLabel: { default: "Remove" }
  },
  emits: ["update:selected", "click", "remove"],
  setup(t, { emit: e }) {
    const o = t, l = e;
    function r() {
      o.disabled || (o.selected !== void 0 && l("update:selected", !o.selected), l("click"));
    }
    return (u, c) => (s(), a("span", {
      class: R(["phlix-chip", [`phlix-chip--${t.size}`, { "is-selected": t.selected, "is-disabled": t.disabled }]])
    }, [
      n("button", {
        type: "button",
        class: "phlix-chip__main",
        disabled: t.disabled,
        "aria-pressed": t.selected === void 0 ? void 0 : t.selected,
        onClick: r
      }, [
        t.icon ? (s(), K(Q, {
          key: 0,
          name: t.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : x("", !0),
        n("span", Li, [
          H(u.$slots, "default", {}, void 0, !0)
        ])
      ], 8, Pi),
      t.removable ? (s(), a("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: t.disabled,
        "aria-label": t.removeLabel,
        onClick: c[0] || (c[0] = (h) => l("remove"))
      }, [
        F(Q, { name: "x" })
      ], 8, Ri)) : x("", !0)
    ], 2));
  }
}), bu = /* @__PURE__ */ A(ji, [["__scopeId", "data-v-d6cd193e"]]);
function Ke(t) {
  return t.map(
    (e) => typeof e == "object" ? e : { value: e, label: String(e) }
  );
}
function le(t, e, o) {
  var u;
  const l = t.length;
  if (l === 0) return -1;
  let r = e;
  for (let c = 0; c < l; c++)
    if (r = (r + o + l) % l, !((u = t[r]) != null && u.disabled)) return r;
  return e;
}
function me(t, e) {
  return e === "first" ? le(t, -1, 1) : le(t, 0, -1);
}
const Fi = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "disabled"], Di = ["id", "aria-label"], zi = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], Ui = { class: "phlix-select__check" }, Ni = /* @__PURE__ */ B({
  __name: "Select",
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "Select…" },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = L(() => Ke(o.options)), u = ce(), c = g(!1), h = g(-1), p = g(null), d = g(null);
    let i = "", v;
    const y = L(() => r.value.findIndex((w) => w.value === o.modelValue)), f = L(() => {
      var w;
      return ((w = r.value[y.value]) == null ? void 0 : w.label) ?? "";
    }), _ = L(() => h.value >= 0 ? `${u}-opt-${h.value}` : void 0);
    function m() {
      o.disabled || c.value || (c.value = !0, h.value = y.value >= 0 ? y.value : me(r.value, "first"), ae(G));
    }
    function M() {
      c.value = !1;
    }
    function I(w) {
      var T, j;
      const $ = r.value[w];
      !$ || $.disabled || ($.value !== o.modelValue && (l("update:modelValue", $.value), l("change", $.value)), M(), (j = (T = p.value) == null ? void 0 : T.querySelector(".phlix-select__trigger")) == null || j.focus());
    }
    function V(w) {
      h.value = le(r.value, h.value, w), ae(G);
    }
    function G() {
      var $, T;
      const w = ($ = d.value) == null ? void 0 : $.querySelector(".is-active");
      (T = w == null ? void 0 : w.scrollIntoView) == null || T.call(w, { block: "nearest" });
    }
    function X(w) {
      if (!o.disabled)
        switch (w.key) {
          case "ArrowDown":
            w.preventDefault(), c.value ? V(1) : m();
            break;
          case "ArrowUp":
            w.preventDefault(), c.value ? V(-1) : m();
            break;
          case "Home":
            c.value && (w.preventDefault(), h.value = me(r.value, "first"), ae(G));
            break;
          case "End":
            c.value && (w.preventDefault(), h.value = me(r.value, "last"), ae(G));
            break;
          case "Enter":
          case " ":
            w.preventDefault(), c.value && h.value >= 0 ? I(h.value) : m();
            break;
          case "Escape":
            c.value && (w.preventDefault(), M());
            break;
          case "Tab":
            M();
            break;
          default:
            w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && z(w.key);
        }
    }
    function z(w) {
      c.value || m(), i += w.toLowerCase(), clearTimeout(v), v = setTimeout(() => i = "", 600);
      const $ = r.value.findIndex((T) => !T.disabled && T.label.toLowerCase().startsWith(i));
      $ >= 0 && (h.value = $, ae(G));
    }
    function P(w) {
      c.value && p.value && !p.value.contains(w.target) && M();
    }
    return oe(c, (w) => {
      w ? document.addEventListener("pointerdown", P, !0) : document.removeEventListener("pointerdown", P, !0);
    }), re(() => {
      document.removeEventListener("pointerdown", P, !0), clearTimeout(v);
    }), (w, $) => (s(), a("div", {
      ref_key: "rootEl",
      ref: p,
      class: R(["phlix-select", { "is-open": c.value, "is-disabled": t.disabled }])
    }, [
      n("button", {
        type: "button",
        class: "phlix-select__trigger",
        "aria-haspopup": "listbox",
        "aria-expanded": c.value,
        "aria-controls": c.value ? `${S(u)}-list` : void 0,
        "aria-activedescendant": c.value ? _.value : void 0,
        "aria-label": t.label,
        disabled: t.disabled,
        onClick: $[0] || ($[0] = (T) => c.value ? M() : m()),
        onKeydown: X
      }, [
        n("span", {
          class: R(["phlix-select__value", { "is-placeholder": y.value < 0 }])
        }, k(y.value >= 0 ? f.value : t.placeholder), 3),
        F(Q, {
          name: "chevron-down",
          class: "phlix-select__caret"
        })
      ], 40, Fi),
      ne(n("ul", {
        id: `${S(u)}-list`,
        ref_key: "listEl",
        ref: d,
        class: "phlix-select__list",
        role: "listbox",
        "aria-label": t.label
      }, [
        (s(!0), a(D, null, N(r.value, (T, j) => (s(), a("li", {
          id: `${S(u)}-opt-${j}`,
          key: T.value,
          class: R(["phlix-select__option", { "is-active": j === h.value, "is-disabled": T.disabled }]),
          role: "option",
          "aria-selected": T.value === t.modelValue,
          "aria-disabled": T.disabled || void 0,
          onClick: (se) => I(j),
          onPointermove: (se) => !T.disabled && (h.value = j)
        }, [
          n("span", Ui, [
            T.value === t.modelValue ? (s(), K(Q, {
              key: 0,
              name: "check"
            })) : x("", !0)
          ]),
          q(" " + k(T.label), 1)
        ], 42, zi))), 128))
      ], 8, Di), [
        [Te, c.value]
      ])
    ], 2));
  }
}), yu = /* @__PURE__ */ A(Ni, [["__scopeId", "data-v-db34d47a"]]), Hi = { class: "phlix-combobox__field" }, Oi = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "placeholder", "disabled", "value"], Ki = ["id", "aria-label"], Gi = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], Qi = { class: "phlix-combobox__check" }, Yi = {
  key: 0,
  class: "phlix-combobox__empty",
  role: "presentation"
}, Ji = /* @__PURE__ */ B({
  __name: "Combobox",
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "Search…" },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = L(() => Ke(o.options)), u = ce(), c = g(!1), h = g(-1), p = g(""), d = g(!1), i = g(null), v = g(null), y = g(null), f = L(() => {
      var $;
      return (($ = r.value.find((T) => T.value === o.modelValue)) == null ? void 0 : $.label) ?? "";
    }), _ = L(() => {
      if (!d.value || p.value.trim() === "") return r.value;
      const $ = p.value.toLowerCase();
      return r.value.filter((T) => T.label.toLowerCase().includes($));
    }), m = L(() => h.value >= 0 ? `${u}-opt-${h.value}` : void 0);
    oe(
      () => o.modelValue,
      () => {
        c.value || (p.value = f.value);
      },
      { immediate: !0 }
    );
    function M() {
      o.disabled || c.value || (c.value = !0, h.value = _.value.findIndex(($) => $.value === o.modelValue), h.value < 0 && (h.value = _.value.findIndex(($) => !$.disabled)), ae(X));
    }
    function I() {
      p.value = f.value, d.value = !1, c.value = !1;
    }
    function V($) {
      var j;
      const T = _.value[$];
      !T || T.disabled || (T.value !== o.modelValue && (l("update:modelValue", T.value), l("change", T.value)), p.value = T.label, d.value = !1, c.value = !1, (j = v.value) == null || j.focus());
    }
    function G($) {
      _.value.length !== 0 && (h.value = le(_.value, h.value, $), ae(X));
    }
    function X() {
      var $, T, j;
      (j = (T = ($ = y.value) == null ? void 0 : $.querySelector(".is-active")) == null ? void 0 : T.scrollIntoView) == null || j.call(T, { block: "nearest" });
    }
    function z($) {
      p.value = $.target.value, d.value = !0, c.value = !0, h.value = me(_.value, "first");
    }
    function P($) {
      if (!o.disabled)
        switch ($.key) {
          case "ArrowDown":
            $.preventDefault(), c.value ? G(1) : M();
            break;
          case "ArrowUp":
            $.preventDefault(), c.value ? G(-1) : M();
            break;
          case "Enter":
            c.value && h.value >= 0 && ($.preventDefault(), V(h.value));
            break;
          case "Escape":
            c.value && ($.preventDefault(), I());
            break;
          case "Tab":
            c.value && I();
            break;
        }
    }
    function w($) {
      c.value && i.value && !i.value.contains($.target) && I();
    }
    return oe(c, ($) => {
      $ ? document.addEventListener("pointerdown", w, !0) : document.removeEventListener("pointerdown", w, !0);
    }), re(() => document.removeEventListener("pointerdown", w, !0)), ($, T) => (s(), a("div", {
      ref_key: "rootEl",
      ref: i,
      class: R(["phlix-combobox", { "is-open": c.value, "is-disabled": t.disabled }])
    }, [
      n("div", Hi, [
        F(Q, {
          name: "search",
          class: "phlix-combobox__search"
        }),
        n("input", {
          ref_key: "inputEl",
          ref: v,
          class: "phlix-combobox__input",
          type: "text",
          role: "combobox",
          autocomplete: "off",
          "aria-autocomplete": "list",
          "aria-expanded": c.value,
          "aria-controls": c.value ? `${S(u)}-list` : void 0,
          "aria-activedescendant": c.value ? m.value : void 0,
          "aria-label": t.label,
          placeholder: t.placeholder,
          disabled: t.disabled,
          value: p.value,
          onInput: z,
          onFocus: M,
          onKeydown: P
        }, null, 40, Oi),
        F(Q, {
          name: "chevron-down",
          class: "phlix-combobox__caret"
        })
      ]),
      ne(n("ul", {
        id: `${S(u)}-list`,
        ref_key: "listEl",
        ref: y,
        class: "phlix-combobox__list",
        role: "listbox",
        "aria-label": t.label
      }, [
        (s(!0), a(D, null, N(_.value, (j, se) => (s(), a("li", {
          id: `${S(u)}-opt-${se}`,
          key: j.value,
          class: R(["phlix-combobox__option", { "is-active": se === h.value, "is-disabled": j.disabled }]),
          role: "option",
          "aria-selected": j.value === t.modelValue,
          "aria-disabled": j.disabled || void 0,
          onClick: (ve) => V(se),
          onPointermove: (ve) => !j.disabled && (h.value = se)
        }, [
          n("span", Qi, [
            j.value === t.modelValue ? (s(), K(Q, {
              key: 0,
              name: "check"
            })) : x("", !0)
          ]),
          q(" " + k(j.label), 1)
        ], 42, Gi))), 128)),
        _.value.length === 0 ? (s(), a("li", Yi, "No matches")) : x("", !0)
      ], 8, Ki), [
        [Te, c.value]
      ])
    ], 2));
  }
}), ku = /* @__PURE__ */ A(Ji, [["__scopeId", "data-v-337aab6e"]]), Xi = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
let de = 0, Ge = "";
function Wi() {
  de === 0 && (Ge = document.body.style.overflow, document.body.style.overflow = "hidden"), de++;
}
function Fe() {
  de !== 0 && (de--, de === 0 && (document.body.style.overflow = Ge));
}
function Qe(t, e, o = {}) {
  const l = o.lockScroll ?? !0;
  let r = null, u = !1;
  function c() {
    const i = t.value;
    return i ? Array.from(i.querySelectorAll(Xi)).filter(
      (v) => !v.hasAttribute("hidden") && v.getAttribute("aria-hidden") !== "true"
    ) : [];
  }
  function h(i) {
    var m;
    if (!e.value || !t.value) return;
    if (i.key === "Escape") {
      (m = o.onEscape) != null && m.call(o) && i.preventDefault();
      return;
    }
    if (i.key !== "Tab") return;
    const v = c();
    if (v.length === 0) {
      i.preventDefault(), t.value.focus();
      return;
    }
    const y = v[0], f = v[v.length - 1], _ = document.activeElement;
    t.value.contains(_) ? i.shiftKey && _ === y ? (i.preventDefault(), f.focus()) : !i.shiftKey && _ === f && (i.preventDefault(), y.focus()) : (i.preventDefault(), y.focus());
  }
  function p() {
    r = document.activeElement, l && (Wi(), u = !0), document.addEventListener("keydown", h, !0), ae(() => {
      var v;
      (v = c()[0] ?? t.value) == null || v.focus();
    });
  }
  function d() {
    var i;
    document.removeEventListener("keydown", h, !0), u && (Fe(), u = !1), r && document.contains(r) && ((i = r.focus) == null || i.call(r)), r = null;
  }
  oe(e, (i) => i ? p() : d(), { immediate: !0 }), re(() => {
    document.removeEventListener("keydown", h, !0), u && (Fe(), u = !1);
  });
}
const qi = ["aria-labelledby"], Zi = {
  key: 0,
  class: "phlix-modal__header"
}, er = ["id"], tr = { class: "phlix-modal__body" }, nr = {
  key: 1,
  class: "phlix-modal__footer"
}, or = /* @__PURE__ */ B({
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    dismissible: { type: Boolean, default: !0 },
    hideClose: { type: Boolean, default: !1 },
    size: { default: "md" }
  },
  emits: ["update:modelValue", "close"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = g(o.modelValue);
    oe(() => o.modelValue, (d) => r.value = d);
    const u = g(null), c = ce();
    function h() {
      l("update:modelValue", !1), l("close");
    }
    function p() {
      o.dismissible && h();
    }
    return Qe(u, r, {
      onEscape: () => o.dismissible ? (h(), !0) : !1
    }), (d, i) => (s(), K(Ee, { to: "body" }, [
      F(ge, { name: "phlix-modal" }, {
        default: W(() => [
          t.modelValue ? (s(), a("div", {
            key: 0,
            class: "phlix-modal",
            onPointerdown: ie(p, ["self"])
          }, [
            n("div", {
              ref_key: "panelEl",
              ref: u,
              class: R(["phlix-modal__panel", `phlix-modal__panel--${t.size}`]),
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": t.title ? S(c) : void 0,
              tabindex: "-1"
            }, [
              t.title || !t.hideClose ? (s(), a("header", Zi, [
                t.title ? (s(), a("h2", {
                  key: 0,
                  id: S(c),
                  class: "phlix-modal__title"
                }, k(t.title), 9, er)) : x("", !0),
                t.hideClose ? x("", !0) : (s(), K(Ve, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  class: "phlix-modal__close",
                  onClick: h
                }))
              ])) : x("", !0),
              n("div", tr, [
                H(d.$slots, "default", {}, void 0, !0)
              ]),
              d.$slots.footer ? (s(), a("footer", nr, [
                H(d.$slots, "footer", {}, void 0, !0)
              ])) : x("", !0)
            ], 10, qi)
          ], 32)) : x("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), wu = /* @__PURE__ */ A(or, [["__scopeId", "data-v-ad69ec41"]]), sr = ["aria-labelledby"], ar = {
  key: 0,
  class: "phlix-sheet__header"
}, lr = ["id"], ir = { class: "phlix-sheet__body" }, rr = {
  key: 1,
  class: "phlix-sheet__footer"
}, cr = /* @__PURE__ */ B({
  __name: "Sheet",
  props: {
    modelValue: { type: Boolean },
    title: {},
    side: { default: "right" },
    dismissible: { type: Boolean, default: !0 },
    hideClose: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "close"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = g(o.modelValue);
    oe(() => o.modelValue, (d) => r.value = d);
    const u = g(null), c = ce();
    function h() {
      l("update:modelValue", !1), l("close");
    }
    function p() {
      o.dismissible && h();
    }
    return Qe(u, r, {
      onEscape: () => o.dismissible ? (h(), !0) : !1
    }), (d, i) => (s(), K(Ee, { to: "body" }, [
      F(ge, {
        name: `phlix-sheet-${t.side}`
      }, {
        default: W(() => [
          t.modelValue ? (s(), a("div", {
            key: 0,
            class: R(["phlix-sheet", `phlix-sheet--${t.side}`]),
            onPointerdown: ie(p, ["self"])
          }, [
            n("aside", {
              ref_key: "panelEl",
              ref: u,
              class: "phlix-sheet__panel",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": t.title ? S(c) : void 0,
              tabindex: "-1"
            }, [
              t.title || !t.hideClose ? (s(), a("header", ar, [
                t.title ? (s(), a("h2", {
                  key: 0,
                  id: S(c),
                  class: "phlix-sheet__title"
                }, k(t.title), 9, lr)) : x("", !0),
                t.hideClose ? x("", !0) : (s(), K(Ve, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  onClick: h
                }))
              ])) : x("", !0),
              n("div", ir, [
                H(d.$slots, "default", {}, void 0, !0)
              ]),
              d.$slots.footer ? (s(), a("footer", rr, [
                H(d.$slots, "footer", {}, void 0, !0)
              ])) : x("", !0)
            ], 8, sr)
          ], 34)) : x("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ]));
  }
}), $u = /* @__PURE__ */ A(cr, [["__scopeId", "data-v-6960f9fb"]]), ur = ["id"], dr = /* @__PURE__ */ B({
  __name: "Tooltip",
  props: {
    text: {},
    placement: { default: "top" },
    delay: { default: 300 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, o = ce(), l = g(!1), r = g(null);
    let u;
    function c() {
      var d;
      return ((d = r.value) == null ? void 0 : d.firstElementChild) ?? null;
    }
    function h() {
      e.disabled || (clearTimeout(u), u = setTimeout(() => {
        var d;
        l.value = !0, (d = c()) == null || d.setAttribute("aria-describedby", o);
      }, e.delay));
    }
    function p() {
      var d;
      clearTimeout(u), l.value = !1, (d = c()) == null || d.removeAttribute("aria-describedby");
    }
    return re(() => clearTimeout(u)), (d, i) => (s(), a("span", {
      ref_key: "wrapEl",
      ref: r,
      class: "phlix-tooltip-wrap",
      onMouseenter: h,
      onMouseleave: p,
      onFocusin: h,
      onFocusout: p,
      onKeydown: ft(p, ["esc"])
    }, [
      H(d.$slots, "default", {}, void 0, !0),
      F(ge, { name: "phlix-tooltip" }, {
        default: W(() => [
          l.value && (t.text || d.$slots.content) ? (s(), a("span", {
            key: 0,
            id: S(o),
            role: "tooltip",
            class: R(["phlix-tooltip", `phlix-tooltip--${t.placement}`])
          }, [
            H(d.$slots, "content", {}, () => [
              q(k(t.text), 1)
            ], !0)
          ], 10, ur)) : x("", !0)
        ]),
        _: 3
      })
    ], 544));
  }
}), xu = /* @__PURE__ */ A(dr, [["__scopeId", "data-v-bdb87991"]]), vr = _e("phlix-toast", () => {
  const t = g([]), e = /* @__PURE__ */ new Map();
  let o = 0;
  function l(i) {
    const v = e.get(i);
    v && (clearTimeout(v), e.delete(i)), t.value = t.value.filter((y) => y.id !== i);
  }
  function r(i) {
    const v = ++o, y = { tone: "neutral", duration: 5e3, ...i, id: v };
    return t.value.push(y), y.duration > 0 && e.set(v, setTimeout(() => l(v), y.duration)), v;
  }
  function u() {
    e.forEach((i) => clearTimeout(i)), e.clear(), t.value = [];
  }
  return { toasts: t, show: r, dismiss: l, clear: u, success: (i, v) => r({ message: i, tone: "success", ...v }), error: (i, v) => r({ message: i, tone: "error", duration: 8e3, ...v }), warning: (i, v) => r({ message: i, tone: "warning", ...v }), info: (i, v) => r({ message: i, tone: "info", ...v }) };
}), hr = ["role"], fr = { class: "phlix-toast__content" }, mr = {
  key: 0,
  class: "phlix-toast__title"
}, pr = { class: "phlix-toast__message" }, gr = ["onClick"], _r = /* @__PURE__ */ B({
  __name: "ToastHost",
  props: {
    position: { default: "bottom" }
  },
  setup(t) {
    const e = vr(), o = {
      neutral: "info",
      success: "success",
      warning: "alert",
      error: "error",
      info: "info"
    }, l = (r) => r.icon ?? o[r.tone];
    return te(() => {
    }), re(() => {
    }), (r, u) => (s(), K(Ee, { to: "body" }, [
      n("div", {
        class: R(["phlix-toasts", `phlix-toasts--${t.position}`]),
        role: "region",
        "aria-label": "Notifications"
      }, [
        F(mt, { name: "phlix-toast" }, {
          default: W(() => [
            (s(!0), a(D, null, N(S(e).toasts, (c) => (s(), a("div", {
              key: c.id,
              class: R(["phlix-toast", `phlix-toast--${c.tone}`]),
              role: c.tone === "error" ? "alert" : "status"
            }, [
              F(Q, {
                name: l(c),
                class: "phlix-toast__icon"
              }, null, 8, ["name"]),
              n("div", fr, [
                c.title ? (s(), a("p", mr, k(c.title), 1)) : x("", !0),
                n("p", pr, k(c.message), 1)
              ]),
              c.action ? (s(), a("button", {
                key: 0,
                type: "button",
                class: "phlix-toast__action",
                onClick: (h) => {
                  c.action.onClick(), S(e).dismiss(c.id);
                }
              }, k(c.action.label), 9, gr)) : x("", !0),
              F(Ve, {
                name: "x",
                label: "Dismiss",
                size: "sm",
                class: "phlix-toast__close",
                onClick: (h) => S(e).dismiss(c.id)
              }, null, 8, ["onClick"])
            ], 10, hr))), 128))
          ]),
          _: 1
        })
      ], 2)
    ]));
  }
}), Cu = /* @__PURE__ */ A(_r, [["__scopeId", "data-v-df4e2232"]]), br = {
  key: 0,
  class: "phlix-skel-text",
  "aria-hidden": "true"
}, yr = /* @__PURE__ */ B({
  __name: "Skeleton",
  props: {
    variant: { default: "rect" },
    width: {},
    height: {},
    radius: {},
    lines: { default: 1 }
  },
  setup(t) {
    return (e, o) => t.variant === "text" ? (s(), a("div", br, [
      (s(!0), a(D, null, N(t.lines, (l) => (s(), a("span", {
        key: l,
        class: "phlix-skel phlix-skel--text",
        style: J({ width: l === t.lines && t.lines > 1 ? "60%" : t.width })
      }, null, 4))), 128))
    ])) : (s(), a("span", {
      key: 1,
      class: R(["phlix-skel", `phlix-skel--${t.variant}`]),
      "aria-hidden": "true",
      style: J({ width: t.width, height: t.height, borderRadius: t.radius })
    }, null, 6));
  }
}), Su = /* @__PURE__ */ A(yr, [["__scopeId", "data-v-c34e4066"]]), kr = ["aria-label"], wr = /* @__PURE__ */ B({
  __name: "Spinner",
  props: {
    size: {},
    label: { default: "Loading" }
  },
  setup(t) {
    const e = t, o = L(
      () => e.size === void 0 ? void 0 : typeof e.size == "number" ? `${e.size}px` : e.size
    );
    return (l, r) => (s(), a("span", {
      class: "phlix-spinner",
      role: "status",
      "aria-label": t.label,
      style: J(o.value ? { fontSize: o.value } : void 0)
    }, [
      F(Q, {
        name: "spinner",
        class: "phlix-spinner__icon"
      })
    ], 12, kr));
  }
}), Iu = /* @__PURE__ */ A(wr, [["__scopeId", "data-v-2e0507dd"]]), $r = {
  class: "phlix-empty",
  role: "status"
}, xr = { class: "phlix-empty__icon" }, Cr = { class: "phlix-empty__title" }, Sr = {
  key: 0,
  class: "phlix-empty__desc"
}, Ir = {
  key: 1,
  class: "phlix-empty__actions"
}, Mr = /* @__PURE__ */ B({
  __name: "EmptyState",
  props: {
    icon: { default: "film" },
    title: {},
    description: {}
  },
  setup(t) {
    return (e, o) => (s(), a("div", $r, [
      n("span", xr, [
        F(Q, { name: t.icon }, null, 8, ["name"])
      ]),
      n("h3", Cr, k(t.title), 1),
      t.description || e.$slots.default ? (s(), a("p", Sr, [
        H(e.$slots, "default", {}, () => [
          q(k(t.description), 1)
        ], !0)
      ])) : x("", !0),
      e.$slots.actions ? (s(), a("div", Ir, [
        H(e.$slots, "actions", {}, void 0, !0)
      ])) : x("", !0)
    ]));
  }
}), Mu = /* @__PURE__ */ A(Mr, [["__scopeId", "data-v-9c6d2458"]]), Tr = { class: "phlix-tabs" }, Er = ["aria-label"], Br = ["id", "aria-selected", "aria-controls", "tabindex", "disabled", "onClick"], Ar = ["id", "aria-labelledby"], Vr = /* @__PURE__ */ B({
  __name: "Tabs",
  props: {
    modelValue: {},
    tabs: {},
    label: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const o = t, l = e, r = ce(), u = g(null), c = L(() => o.tabs.findIndex((f) => f.value === o.modelValue)), h = (f) => `${r}-tab-${f}`, p = (f) => `${r}-panel-${f}`, d = L(() => o.tabs.map((f) => ({ value: f.value, label: f.label, disabled: f.disabled })));
    function i(f) {
      const _ = o.tabs.find((m) => m.value === f);
      !_ || _.disabled || f !== o.modelValue && l("update:modelValue", f);
    }
    function v(f) {
      var _, m;
      (m = (_ = u.value) == null ? void 0 : _.querySelectorAll('[role="tab"]')[f]) == null || m.focus();
    }
    function y(f) {
      let _ = -1;
      switch (f.key) {
        case "ArrowRight":
        case "ArrowDown":
          _ = le(d.value, c.value, 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          _ = le(d.value, c.value, -1);
          break;
        case "Home":
          _ = le(d.value, -1, 1);
          break;
        case "End":
          _ = le(d.value, 0, -1);
          break;
        default:
          return;
      }
      _ >= 0 && (f.preventDefault(), i(o.tabs[_].value), v(_));
    }
    return (f, _) => (s(), a("div", Tr, [
      n("div", {
        ref_key: "listEl",
        ref: u,
        class: "phlix-tabs__list",
        role: "tablist",
        "aria-label": t.label,
        onKeydown: y
      }, [
        (s(!0), a(D, null, N(t.tabs, (m) => (s(), a("button", {
          id: h(m.value),
          key: m.value,
          type: "button",
          role: "tab",
          class: R(["phlix-tabs__tab", { "is-active": m.value === t.modelValue }]),
          "aria-selected": m.value === t.modelValue,
          "aria-controls": p(m.value),
          tabindex: m.value === t.modelValue ? 0 : -1,
          disabled: m.disabled,
          onClick: (M) => i(m.value)
        }, [
          m.icon ? (s(), K(Q, {
            key: 0,
            name: m.icon,
            class: "phlix-tabs__icon"
          }, null, 8, ["name"])) : x("", !0),
          q(" " + k(m.label), 1)
        ], 10, Br))), 128))
      ], 40, Er),
      t.modelValue ? (s(), a("div", {
        key: 0,
        id: p(t.modelValue),
        class: "phlix-tabs__panel",
        role: "tabpanel",
        "aria-labelledby": h(t.modelValue),
        tabindex: "0"
      }, [
        H(f.$slots, t.modelValue, {}, () => [
          H(f.$slots, "default", {}, void 0, !0)
        ], !0)
      ], 8, Ar)) : x("", !0)
    ]));
  }
}), Tu = /* @__PURE__ */ A(Vr, [["__scopeId", "data-v-95493097"]]), Pr = { class: "phlix-kbd" }, Lr = {
  key: 1,
  class: "phlix-kbd__key"
}, Rr = /* @__PURE__ */ B({
  __name: "Kbd",
  props: {
    keys: {}
  },
  setup(t) {
    const e = t, o = L(() => e.keys === void 0 ? [] : Array.isArray(e.keys) ? e.keys : [e.keys]);
    return (l, r) => (s(), a("span", Pr, [
      o.value.length ? (s(!0), a(D, { key: 0 }, N(o.value, (u, c) => (s(), a("kbd", {
        key: c,
        class: "phlix-kbd__key"
      }, k(u), 1))), 128)) : (s(), a("kbd", Lr, [
        H(l.$slots, "default", {}, void 0, !0)
      ]))
    ]));
  }
}), Eu = /* @__PURE__ */ A(Rr, [["__scopeId", "data-v-5e5c4a8a"]]), jr = /* @__PURE__ */ B({
  __name: "Reveal",
  props: {
    tag: { default: "div" },
    delay: { default: 0 },
    y: { default: 12 },
    whenVisible: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, o = g(null), l = g(!1), r = g(!1);
    let u = null;
    const c = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return te(() => {
      if (c) {
        l.value = !0;
        return;
      }
      e.whenVisible && typeof IntersectionObserver < "u" ? (u = new IntersectionObserver(
        (h) => {
          h.some((p) => p.isIntersecting) && (l.value = !0, u == null || u.disconnect(), u = null);
        },
        { threshold: 0.1 }
      ), o.value && u.observe(o.value)) : requestAnimationFrame(() => requestAnimationFrame(() => l.value = !0));
    }), re(() => {
      u == null || u.disconnect(), u = null;
    }), (h, p) => (s(), K(ze(t.tag), {
      ref_key: "el",
      ref: o,
      class: R(["phlix-reveal", { "is-revealed": l.value, "is-settled": r.value }]),
      style: J({ "--reveal-delay": `${t.delay}ms`, "--reveal-y": `${t.y}px` }),
      onTransitionend: p[0] || (p[0] = (d) => r.value = !0)
    }, {
      default: W(() => [
        H(h.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 40, ["class", "style"]));
  }
}), Bu = /* @__PURE__ */ A(jr, [["__scopeId", "data-v-162397f9"]]), Fr = /* @__PURE__ */ B({
  __name: "PageTransition",
  props: {
    mode: { default: "fade" }
  },
  setup(t) {
    return (e, o) => (s(), K(ge, {
      name: `phlix-page-${t.mode}`,
      mode: "out-in"
    }, {
      default: W(() => [
        H(e.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 8, ["name"]));
  }
}), Au = /* @__PURE__ */ A(Fr, [["__scopeId", "data-v-dafe74d0"]]), Dr = { class: "library-scan-page" }, zr = {
  key: 0,
  class: "loading"
}, Ur = {
  key: 1,
  class: "error"
}, Nr = {
  key: 2,
  class: "libraries-list"
}, Hr = { class: "library-info" }, Or = { class: "library-name" }, Kr = { class: "library-type" }, Gr = { class: "library-paths" }, Qr = { class: "library-meta" }, Yr = { key: 0 }, Jr = {
  key: 0,
  class: "scan-status"
}, Xr = { class: "library-actions" }, Wr = ["onClick", "disabled"], qr = ["onClick", "disabled"], Zr = {
  key: 0,
  class: "empty-state"
}, ec = /* @__PURE__ */ B({
  __name: "LibraryScanPage",
  setup(t) {
    const e = g([]), o = g({}), l = g(!0), r = g(null);
    async function u() {
      try {
        const v = await ee.get("/api/v1/libraries");
        e.value = v.libraries || [];
        for (const y of e.value)
          c(y.id);
      } catch (v) {
        r.value = v instanceof Error ? v.message : "Failed to load libraries";
      } finally {
        l.value = !1;
      }
    }
    async function c(v) {
      try {
        const y = await ee.get(`/api/v1/libraries/${v}/scan-status`);
        y.job && (o.value[v] = y.job);
      } catch {
      }
    }
    async function h(v) {
      try {
        await ee.post(`/api/v1/libraries/${v}/scan`), await c(v);
      } catch (y) {
        r.value = y instanceof Error ? y.message : "Failed to trigger scan";
      }
    }
    async function p(v) {
      try {
        await ee.post(`/api/v1/libraries/${v}/rescan`), await c(v);
      } catch (y) {
        r.value = y instanceof Error ? y.message : "Failed to trigger rescan";
      }
    }
    function d(v) {
      return v ? new Date(v).toLocaleString() : "Never";
    }
    function i(v) {
      if (!v) return "";
      switch (v.status) {
        case "queued":
          return "⏳ Queued";
        case "running":
          return "🔄 Running";
        case "completed":
          return "✅ Completed";
        case "failed":
          return `❌ Failed: ${v.error || "Unknown error"}`;
        default:
          return v.status;
      }
    }
    return te(() => {
      u();
    }), (v, y) => (s(), a("div", Dr, [
      y[0] || (y[0] = n("div", { class: "scan-header" }, [
        n("h1", { class: "scan-title" }, "Library Scanner"),
        n("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      l.value ? (s(), a("div", zr, "Loading libraries...")) : r.value ? (s(), a("div", Ur, k(r.value), 1)) : (s(), a("div", Nr, [
        (s(!0), a(D, null, N(e.value, (f) => {
          var _, m, M, I;
          return s(), a("div", {
            key: f.id,
            class: "library-card"
          }, [
            n("div", Hr, [
              n("h3", Or, k(f.name), 1),
              n("span", Kr, k(f.type), 1),
              n("p", Gr, k(f.paths.join(", ")), 1),
              n("div", Qr, [
                f.item_count !== void 0 ? (s(), a("span", Yr, k(f.item_count) + " items", 1)) : x("", !0),
                n("span", null, "Last scan: " + k(d(f.last_scan_at)), 1)
              ]),
              o.value[f.id] ? (s(), a("div", Jr, k(i(o.value[f.id])), 1)) : x("", !0)
            ]),
            n("div", Xr, [
              n("button", {
                class: "btn btn-scan",
                onClick: (V) => h(f.id),
                disabled: ((_ = o.value[f.id]) == null ? void 0 : _.status) === "running" || ((m = o.value[f.id]) == null ? void 0 : m.status) === "queued"
              }, " Scan ", 8, Wr),
              n("button", {
                class: "btn btn-rescan",
                onClick: (V) => p(f.id),
                disabled: ((M = o.value[f.id]) == null ? void 0 : M.status) === "running" || ((I = o.value[f.id]) == null ? void 0 : I.status) === "queued"
              }, " Rescan ", 8, qr)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (s(), a("div", Zr, " No libraries configured. Add a library to get started. ")) : x("", !0)
      ]))
    ]));
  }
}), Vu = /* @__PURE__ */ A(ec, [["__scopeId", "data-v-62b3805e"]]), tc = { class: "my-servers-page" }, nc = {
  key: 0,
  class: "loading"
}, oc = {
  key: 1,
  class: "error"
}, sc = {
  key: 2,
  class: "servers-list"
}, ac = { class: "server-info" }, lc = { class: "server-name" }, ic = { class: "server-url" }, rc = { class: "server-meta" }, cc = { key: 0 }, uc = {
  key: 0,
  class: "empty-state"
}, dc = /* @__PURE__ */ B({
  __name: "MyServersPage",
  setup(t) {
    const e = g([]), o = g(!0), l = g(null);
    async function r() {
      try {
        const h = await ee.get("/api/v1/servers");
        e.value = h.servers || [];
      } catch (h) {
        l.value = h instanceof Error ? h.message : "Failed to load servers";
      } finally {
        o.value = !1;
      }
    }
    function u(h) {
      switch (h) {
        case "online":
          return "#22c55e";
        case "offline":
          return "#ef4444";
        case "connecting":
          return "#eab308";
        default:
          return "#6b7280";
      }
    }
    function c(h) {
      return h ? new Date(h).toLocaleString() : "Never";
    }
    return te(() => {
      r();
    }), (h, p) => (s(), a("div", tc, [
      p[2] || (p[2] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "My Servers"),
        n("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      o.value ? (s(), a("div", nc, "Loading servers...")) : l.value ? (s(), a("div", oc, k(l.value), 1)) : (s(), a("div", sc, [
        (s(!0), a(D, null, N(e.value, (d) => (s(), a("div", {
          key: d.id,
          class: "server-card"
        }, [
          n("div", {
            class: "server-status",
            style: J({ backgroundColor: u(d.status) })
          }, null, 4),
          n("div", ac, [
            n("h3", lc, k(d.name), 1),
            n("p", ic, k(d.url), 1),
            n("div", rc, [
              n("span", null, k(d.owner), 1),
              d.library_count !== void 0 ? (s(), a("span", cc, k(d.library_count) + " libraries", 1)) : x("", !0),
              n("span", null, "Last seen: " + k(c(d.last_seen)), 1)
            ])
          ]),
          p[0] || (p[0] = n("div", { class: "server-actions" }, [
            n("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (s(), a("div", uc, [...p[1] || (p[1] = [
          n("p", null, "No servers connected yet.", -1),
          n("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), Pu = /* @__PURE__ */ A(dc, [["__scopeId", "data-v-b9237da4"]]), vc = { class: "federation-page" }, hc = {
  key: 0,
  class: "loading"
}, fc = {
  key: 1,
  class: "error"
}, mc = {
  key: 2,
  class: "federation-content"
}, pc = { class: "peers-section" }, gc = { class: "peers-list" }, _c = { class: "peer-info" }, bc = { class: "peer-name" }, yc = { class: "peer-url" }, kc = { class: "peer-meta" }, wc = { key: 0 }, $c = { class: "peer-actions" }, xc = ["onClick"], Cc = {
  key: 1,
  class: "status-badge"
}, Sc = {
  key: 0,
  class: "empty-state"
}, Ic = { class: "add-peer-section" }, Mc = /* @__PURE__ */ B({
  __name: "FederationPage",
  setup(t) {
    const e = g([]), o = g(!0), l = g(null);
    async function r() {
      try {
        const d = await ee.get("/api/v1/federation/peers");
        e.value = d.peers || [];
      } catch (d) {
        l.value = d instanceof Error ? d.message : "Failed to load federation peers";
      } finally {
        o.value = !1;
      }
    }
    async function u(d) {
      try {
        await ee.post("/api/v1/federation/connect", { url: d }), await r();
      } catch (i) {
        l.value = i instanceof Error ? i.message : "Failed to connect to peer";
      }
    }
    async function c(d) {
      try {
        await ee.post(`/api/v1/federation/peers/${d}/disconnect`), await r();
      } catch (i) {
        l.value = i instanceof Error ? i.message : "Failed to disconnect peer";
      }
    }
    function h(d) {
      switch (d) {
        case "connected":
          return "#22c55e";
        case "disconnected":
          return "#ef4444";
        case "pending":
          return "#eab308";
        default:
          return "#6b7280";
      }
    }
    function p(d) {
      return d ? new Date(d).toLocaleString() : "Never";
    }
    return te(() => {
      r();
    }), (d, i) => (s(), a("div", vc, [
      i[5] || (i[5] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Federation"),
        n("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      o.value ? (s(), a("div", hc, "Loading federation peers...")) : l.value ? (s(), a("div", fc, k(l.value), 1)) : (s(), a("div", mc, [
        n("div", pc, [
          i[2] || (i[2] = n("h2", { class: "section-title" }, "Connected Peers", -1)),
          n("div", gc, [
            (s(!0), a(D, null, N(e.value, (v) => (s(), a("div", {
              key: v.id,
              class: "peer-card"
            }, [
              n("div", {
                class: "peer-status",
                style: J({ backgroundColor: h(v.status) })
              }, null, 4),
              n("div", _c, [
                n("h3", bc, k(v.name), 1),
                n("p", yc, k(v.url), 1),
                n("div", kc, [
                  v.shared_libraries_count !== void 0 ? (s(), a("span", wc, k(v.shared_libraries_count) + " shared libraries", 1)) : x("", !0),
                  n("span", null, "Last sync: " + k(p(v.last_sync)), 1)
                ])
              ]),
              n("div", $c, [
                v.status === "connected" ? (s(), a("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (y) => c(v.id)
                }, " Disconnect ", 8, xc)) : v.status === "pending" ? (s(), a("span", Cc, "Pending")) : x("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (s(), a("div", Sc, [...i[1] || (i[1] = [
              n("p", null, "No federation peers connected.", -1)
            ])])) : x("", !0)
          ])
        ]),
        n("div", Ic, [
          i[4] || (i[4] = n("h2", { class: "section-title" }, "Add Peer", -1)),
          n("form", {
            class: "add-peer-form",
            onSubmit: i[0] || (i[0] = ie((v) => u(""), ["prevent"]))
          }, [...i[3] || (i[3] = [
            n("input", {
              type: "url",
              placeholder: "https://other-server.example.com",
              class: "peer-input"
            }, null, -1),
            n("button", {
              type: "submit",
              class: "btn btn-primary"
            }, "Connect", -1)
          ])], 32)
        ])
      ]))
    ]));
  }
}), Lu = /* @__PURE__ */ A(Mc, [["__scopeId", "data-v-91ba2781"]]), Tc = { class: "manage-shares-page" }, Ec = {
  key: 0,
  class: "loading"
}, Bc = {
  key: 1,
  class: "error"
}, Ac = {
  key: 2,
  class: "shares-list"
}, Vc = { class: "share-info" }, Pc = { class: "share-library" }, Lc = { class: "share-meta" }, Rc = {
  key: 0,
  class: "expired-badge"
}, jc = { class: "share-dates" }, Fc = { key: 0 }, Dc = { class: "share-actions" }, zc = ["onClick"], Uc = {
  key: 0,
  class: "empty-state"
}, Nc = /* @__PURE__ */ B({
  __name: "ManageSharesPage",
  setup(t) {
    const e = g([]), o = g(!0), l = g(null);
    async function r() {
      try {
        const p = await ee.get("/api/v1/shares");
        e.value = p.shares || [];
      } catch (p) {
        l.value = p instanceof Error ? p.message : "Failed to load shares";
      } finally {
        o.value = !1;
      }
    }
    async function u(p) {
      try {
        await ee.delete(`/api/v1/shares/${p}`), await r();
      } catch (d) {
        l.value = d instanceof Error ? d.message : "Failed to revoke share";
      }
    }
    function c(p) {
      return new Date(p).toLocaleString();
    }
    function h(p) {
      return p ? new Date(p) < /* @__PURE__ */ new Date() : !1;
    }
    return te(() => {
      r();
    }), (p, d) => (s(), a("div", Tc, [
      d[1] || (d[1] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Manage Shares"),
        n("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      o.value ? (s(), a("div", Ec, "Loading shares...")) : l.value ? (s(), a("div", Bc, k(l.value), 1)) : (s(), a("div", Ac, [
        (s(!0), a(D, null, N(e.value, (i) => (s(), a("div", {
          key: i.id,
          class: "share-card"
        }, [
          n("div", Vc, [
            n("h3", Pc, k(i.library_name), 1),
            n("div", Lc, [
              n("span", null, "Shared with: " + k(i.shared_with), 1),
              n("span", {
                class: R(["permission-badge", i.permissions])
              }, k(i.permissions), 3),
              i.expires_at && h(i.expires_at) ? (s(), a("span", Rc, "Expired")) : x("", !0)
            ]),
            n("p", jc, [
              q(" Created: " + k(c(i.created_at)) + " ", 1),
              i.expires_at ? (s(), a("span", Fc, " | Expires: " + k(c(i.expires_at)), 1)) : x("", !0)
            ])
          ]),
          n("div", Dc, [
            n("button", {
              class: "btn btn-danger",
              onClick: (v) => u(i.id)
            }, "Revoke", 8, zc)
          ])
        ]))), 128)),
        e.value.length === 0 ? (s(), a("div", Uc, [...d[0] || (d[0] = [
          n("p", null, "No library shares found.", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), Ru = /* @__PURE__ */ A(Nc, [["__scopeId", "data-v-bd8771ac"]]), Hc = { class: "audit-logs-page" }, Oc = {
  key: 0,
  class: "loading"
}, Kc = {
  key: 1,
  class: "error"
}, Gc = {
  key: 2,
  class: "logs-container"
}, Qc = { class: "logs-list" }, Yc = { class: "log-content" }, Jc = { class: "log-header" }, Xc = { class: "log-action" }, Wc = { class: "log-actor" }, qc = { class: "log-time" }, Zc = {
  key: 0,
  class: "log-target"
}, eu = {
  key: 1,
  class: "log-details"
}, tu = {
  key: 2,
  class: "log-ip"
}, nu = {
  key: 0,
  class: "empty-state"
}, ou = {
  key: 0,
  class: "pagination"
}, su = ["disabled"], au = { class: "page-info" }, lu = ["disabled"], iu = /* @__PURE__ */ B({
  __name: "AuditLogsPage",
  setup(t) {
    const e = g([]), o = g(!0), l = g(null), r = g(1), u = g(1);
    async function c(i = 1) {
      try {
        o.value = !0;
        const v = await ee.get(
          "/api/v1/audit-logs",
          { page: String(i) }
        );
        e.value = v.logs || [], r.value = v.page || 1, u.value = v.total_pages || 1;
      } catch (v) {
        l.value = v instanceof Error ? v.message : "Failed to load audit logs";
      } finally {
        o.value = !1;
      }
    }
    function h(i) {
      return new Date(i).toLocaleString();
    }
    function p(i) {
      return i.includes("create") || i.includes("add") ? "#22c55e" : i.includes("delete") || i.includes("remove") ? "#ef4444" : i.includes("update") || i.includes("edit") ? "#3b82f6" : i.includes("login") || i.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function d(i) {
      return i.includes("create") || i.includes("add") ? "+" : i.includes("delete") || i.includes("remove") ? "-" : i.includes("update") || i.includes("edit") ? "~" : i.includes("login") || i.includes("auth") ? "@" : "#";
    }
    return te(() => {
      c();
    }), (i, v) => (s(), a("div", Hc, [
      v[3] || (v[3] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Audit Logs"),
        n("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      o.value ? (s(), a("div", Oc, "Loading audit logs...")) : l.value ? (s(), a("div", Kc, k(l.value), 1)) : (s(), a("div", Gc, [
        n("div", Qc, [
          (s(!0), a(D, null, N(e.value, (y) => (s(), a("div", {
            key: y.id,
            class: "log-entry"
          }, [
            n("div", {
              class: "log-icon",
              style: J({ backgroundColor: p(y.action) })
            }, k(d(y.action)), 5),
            n("div", Yc, [
              n("div", Jc, [
                n("span", Xc, k(y.action), 1),
                n("span", Wc, k(y.actor), 1),
                n("span", qc, k(h(y.created_at)), 1)
              ]),
              y.target ? (s(), a("p", Zc, "Target: " + k(y.target), 1)) : x("", !0),
              y.details ? (s(), a("p", eu, k(y.details), 1)) : x("", !0),
              y.ip_address ? (s(), a("span", tu, "IP: " + k(y.ip_address), 1)) : x("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (s(), a("div", nu, [...v[2] || (v[2] = [
            n("p", null, "No audit logs found.", -1)
          ])])) : x("", !0)
        ]),
        u.value > 1 ? (s(), a("div", ou, [
          n("button", {
            class: "btn btn-secondary",
            disabled: r.value <= 1,
            onClick: v[0] || (v[0] = (y) => c(r.value - 1))
          }, " Previous ", 8, su),
          n("span", au, "Page " + k(r.value) + " of " + k(u.value), 1),
          n("button", {
            class: "btn btn-secondary",
            disabled: r.value >= u.value,
            onClick: v[1] || (v[1] = (y) => c(r.value + 1))
          }, " Next ", 8, lu)
        ])) : x("", !0)
      ]))
    ]));
  }
}), ju = /* @__PURE__ */ A(iu, [["__scopeId", "data-v-05910fd9"]]);
function Fu(t, e) {
  const o = Be();
  let l = !1;
  o.applyQuery(t.currentRoute.value.query), o.fetchMedia(e);
  const r = oe(
    () => JSON.stringify(o.toQuery()),
    () => {
      l || (l = !0, t.replace({ query: o.toQuery() }).finally(() => {
        l = !1;
      }), o.scheduleFetch(e));
    }
  ), u = oe(
    () => t.currentRoute.value.query,
    (c) => {
      l || JSON.stringify(c) === JSON.stringify(o.toQuery()) || (l = !0, o.applyQuery(c), l = !1, o.fetchMedia(e));
    }
  );
  return () => {
    r(), u(), o.cancelScheduled();
  };
}
export {
  be as ApiClient,
  Yt as ApiError,
  fu as AppBackdrop,
  Et as AppLayout,
  ju as AuditLogsPage,
  pu as Badge,
  qn as BrowsePage,
  mu as Button,
  bu as Chip,
  ku as Combobox,
  ue as DEFAULT_PREFERENCES,
  Mu as EmptyState,
  Lu as FederationPage,
  On as FilterBar,
  Q as Icon,
  Ve as IconButton,
  Eu as Kbd,
  Vu as LibraryScanPage,
  ko as LocalStorageTokenStore,
  Eo as LoginForm,
  Po as LoginPage,
  Ru as ManageSharesPage,
  hn as MediaCard,
  bn as MediaGrid,
  wu as Modal,
  Pu as MyServersPage,
  Au as PageTransition,
  Ht as PhlixApp,
  mo as Player,
  yo as PlayerPage,
  Bu as Reveal,
  yu as Select,
  us as SettingsForm,
  hs as SettingsPage,
  $u as Sheet,
  Go as SignupForm,
  Xo as SignupPage,
  Su as Skeleton,
  gu as Slider,
  Iu as Spinner,
  _u as Switch,
  Tu as Tabs,
  Cu as ToastHost,
  xu as Tooltip,
  Dt as applyStoredThemeEarly,
  Fu as bindMediaStoreToRouter,
  hu as createPhlixApp,
  jt as deriveAccentVars,
  He as readStoredPreferences,
  Ae as useAuthStore,
  Qe as useFocusTrap,
  Be as useMediaStore,
  At as usePreferencesStore,
  zt as useTheme,
  vr as useToastStore
};
//# sourceMappingURL=phlix-ui.js.map
