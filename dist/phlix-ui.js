var Oe = Object.defineProperty;
var Ke = (t, e, s) => e in t ? Oe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var ve = (t, e, s) => Ke(t, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as o, createElementBlock as a, createElementVNode as n, renderSlot as U, ref as g, computed as P, watch as oe, watchEffect as Ge, defineComponent as M, createBlock as O, withCtx as J, createVNode as R, unref as C, createTextVNode as Q, toDisplayString as k, createCommentVNode as w, Fragment as z, renderList as D, withDirectives as Z, vModelText as fe, normalizeClass as L, inject as Ce, onMounted as W, onUnmounted as qe, withModifiers as ae, normalizeStyle as Y, createStaticVNode as Ye, resolveComponent as Ae, vModelDynamic as xe, vShow as Ie, createApp as Je, markRaw as x, resolveDynamicComponent as Le, onBeforeUnmount as le, useId as ie, nextTick as ne, Teleport as Se, Transition as pe, withKeys as Qe, TransitionGroup as Xe } from "vue";
import { defineStore as ge, createPinia as We } from "pinia";
import { RouterView as Ze, RouterLink as Ee, useRoute as et, useRouter as Re, createRouter as tt, createWebHistory as nt } from "vue-router";
const B = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [l, r] of e)
    s[l] = r;
  return s;
}, st = {}, ot = { class: "app-layout" }, at = { class: "app-header" }, lt = { class: "header-inner" }, it = { class: "logo" }, rt = { class: "nav" }, ct = { class: "app-main" }, dt = { class: "app-footer" };
function ut(t, e) {
  return o(), a("div", ot, [
    n("header", at, [
      n("div", lt, [
        n("div", it, [
          U(t.$slots, "logo", {}, () => [
            e[0] || (e[0] = n("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        n("nav", rt, [
          U(t.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    n("main", ct, [
      U(t.$slots, "default", {}, void 0, !0)
    ]),
    n("footer", dt, [
      U(t.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const vt = /* @__PURE__ */ B(st, [["render", ut], ["__scopeId", "data-v-9f6c6d16"]]), de = {
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
}, je = "phlix.prefs";
function Fe() {
  if (typeof localStorage > "u") return { ...de };
  try {
    const t = localStorage.getItem(je);
    if (!t) return { ...de };
    const e = JSON.parse(t);
    return { ...de, ...e };
  } catch {
    return { ...de };
  }
}
function ht() {
  return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const mt = ge("phlix-prefs", () => {
  var I;
  const t = Fe(), e = g(t.theme), s = g(t.accent), l = g(t.density), r = g(t.cardSize), d = g(t.gridDensity), c = g(t.reducedMotion), h = g(t.autoplay), p = g(t.defaultVolume), u = g(t.defaultQuality), i = g(t.defaultSubtitleLang), v = g(t.atmosphere), b = g(ht());
  let m = null;
  typeof window < "u" && typeof window.matchMedia == "function" && (m = window.matchMedia("(prefers-reduced-motion: reduce)"), (I = m.addEventListener) == null || I.call(m, "change", (E) => b.value = E.matches));
  const _ = P(
    () => c.value === "on" ? !0 : c.value === "off" ? !1 : b.value
  );
  function f() {
    return {
      theme: e.value,
      accent: s.value,
      density: l.value,
      cardSize: r.value,
      gridDensity: d.value,
      reducedMotion: c.value,
      autoplay: h.value,
      defaultVolume: p.value,
      defaultQuality: u.value,
      defaultSubtitleLang: i.value,
      atmosphere: v.value
    };
  }
  oe(
    f,
    (E) => {
      if (!(typeof localStorage > "u"))
        try {
          localStorage.setItem(je, JSON.stringify(E));
        } catch {
        }
    },
    { deep: !0 }
  );
  function S() {
    const E = de;
    e.value = E.theme, s.value = E.accent, l.value = E.density, r.value = E.cardSize, d.value = E.gridDensity, c.value = E.reducedMotion, h.value = E.autoplay, p.value = E.defaultVolume, u.value = E.defaultQuality, i.value = E.defaultSubtitleLang, v.value = E.atmosphere;
  }
  return {
    theme: e,
    accent: s,
    density: l,
    cardSize: r,
    gridDensity: d,
    reducedMotion: c,
    autoplay: h,
    defaultVolume: p,
    defaultQuality: u,
    defaultSubtitleLang: i,
    atmosphere: v,
    systemReduced: b,
    effectiveReducedMotion: _,
    snapshot: f,
    reset: S
  };
});
function ft(t) {
  let e = t.trim().replace(/^#/, "");
  return e.length === 3 && (e = e.split("").map((s) => s + s).join("")), /^[0-9a-fA-F]{6}$/.test(e) ? {
    r: parseInt(e.slice(0, 2), 16),
    g: parseInt(e.slice(2, 4), 16),
    b: parseInt(e.slice(4, 6), 16)
  } : null;
}
const he = (t) => Math.max(0, Math.min(255, Math.round(t))), ke = ({ r: t, g: e, b: s }) => "#" + [t, e, s].map((l) => he(l).toString(16).padStart(2, "0")).join("");
function pt(t, e) {
  return { r: t.r + (255 - t.r) * e, g: t.g + (255 - t.g) * e, b: t.b + (255 - t.b) * e };
}
function gt(t, e) {
  return { r: t.r * (1 - e), g: t.g * (1 - e), b: t.b * (1 - e) };
}
const Ve = ({ r: t, g: e, b: s }, l) => `rgba(${he(t)}, ${he(e)}, ${he(s)}, ${l})`;
function _t({ r: t, g: e, b: s }) {
  const l = [t, e, s].map((r) => {
    const d = r / 255;
    return d <= 0.03928 ? d / 12.92 : ((d + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
}
function bt(t) {
  const e = ft(t);
  if (!e) return null;
  const s = _t(e) > 0.45 ? "#1a1205" : "#fff8ec";
  return {
    "--accent": ke(e),
    "--accent-hover": ke(pt(e, 0.12)),
    "--accent-active": ke(gt(e, 0.12)),
    "--accent-soft": Ve(e, 0.14),
    "--accent-ring": Ve(e, 0.55),
    "--accent-contrast": s
  };
}
const kt = ["--accent", "--accent-hover", "--accent-active", "--accent-soft", "--accent-ring", "--accent-contrast"];
function ze(t, e) {
  if (typeof document > "u") return;
  const s = document.documentElement;
  s.setAttribute("data-theme", t.theme), s.setAttribute("data-density", t.density), e ? s.setAttribute("data-reduced-motion", "true") : s.removeAttribute("data-reduced-motion");
  const l = t.accent ? bt(t.accent) : null;
  if (l)
    for (const [r, d] of Object.entries(l)) s.style.setProperty(r, d);
  else
    for (const r of kt) s.style.removeProperty(r);
}
function yt() {
  const t = Fe(), e = t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  ze(t, e);
}
function wt() {
  const t = mt();
  return Ge(() => {
    ze(
      { theme: t.theme, density: t.density, accent: t.accent },
      t.effectiveReducedMotion
    );
  }), t;
}
const $t = { class: "main-nav" }, xt = /* @__PURE__ */ M({
  __name: "PhlixApp",
  setup(t) {
    return wt(), (e, s) => (o(), O(vt, null, {
      nav: J(() => [
        n("nav", $t, [
          R(C(Ee), {
            to: "/app",
            class: "nav-link"
          }, {
            default: J(() => [...s[0] || (s[0] = [
              Q("Browse", -1)
            ])]),
            _: 1
          }),
          R(C(Ee), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: J(() => [...s[1] || (s[1] = [
              Q("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: J(() => [
        R(C(Ze))
      ]),
      _: 1
    }));
  }
}), Ct = /* @__PURE__ */ B(xt, [["__scopeId", "data-v-4fa58c8a"]]), It = { class: "phlix-placeholder" }, St = { class: "placeholder-content" }, Mt = /* @__PURE__ */ M({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(t) {
    return (e, s) => (o(), a("div", It, [
      n("div", St, [
        s[0] || (s[0] = n("h1", null, "Shared UI loading...", -1)),
        n("p", null, "Phlix " + k(t.appName) + " is initializing", 1)
      ])
    ]));
  }
}), Bt = /* @__PURE__ */ B(Mt, [["__scopeId", "data-v-bf79ac4c"]]);
class Tt extends Error {
  constructor(e, s, l = null) {
    super(e), this.status = s, this.body = l, this.name = "ApiError";
  }
}
function Et(t) {
  return t === !0 || t === 1 || t === "1" || t === "true";
}
class _e {
  constructor(e = {}) {
    ve(this, "baseUrl");
    ve(this, "tokens");
    ve(this, "doFetch");
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
  async request(e, s, l = null) {
    const r = () => {
      const h = {
        "Content-Type": "application/json"
      }, p = this.tokens.getAccessToken();
      p && (h.Authorization = `Bearer ${p}`);
      const u = { method: e, headers: h, credentials: "same-origin" };
      return l !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (u.body = JSON.stringify(l)), u;
    }, d = `${this.baseUrl}${s}`;
    let c = await this.doFetch(d, r());
    return c.status === 401 && await this.refreshToken() && (c = await this.doFetch(d, r())), this.handleResponse(c);
  }
  async handleResponse(e) {
    const r = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const d = this.extractError(r);
      throw new Tt(d, e.status, r);
    }
    return r;
  }
  extractError(e) {
    if (e && typeof e == "object") {
      const s = e;
      if (typeof s.error == "string")
        return s.error;
      if (typeof s.message == "string")
        return s.message;
    }
    return "Request failed";
  }
  async refreshToken() {
    const e = this.tokens.getRefreshToken();
    if (!e)
      return !1;
    try {
      const s = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ refresh_token: e })
      });
      if (!s.ok)
        return !1;
      const l = await s.json();
      return typeof l.access_token != "string" ? !1 : (this.tokens.setAccessToken(l.access_token), typeof l.refresh_token == "string" && this.tokens.setRefreshToken(l.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, s) {
    const l = s ? "?" + new URLSearchParams(s).toString() : "";
    return this.request("GET", e + l);
  }
  async post(e, s) {
    return this.request("POST", e, s ?? null);
  }
  async put(e, s) {
    return this.request("PUT", e, s ?? null);
  }
  async patch(e, s) {
    return this.request("PATCH", e, s ?? null);
  }
  async delete(e) {
    return this.request("DELETE", e);
  }
  isLoggedIn() {
    return this.tokens.getAccessToken() !== null;
  }
  async getCurrentUser() {
    const { user: e } = await this.get("/api/v1/auth/me");
    return { ...e, is_admin: Et(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const X = new _e(), De = ge("media", () => {
  const t = g([]), e = g(0), s = g(!1), l = g(null), r = g(""), d = g([]), c = g(void 0), h = g(void 0), p = g([]), u = g([]), i = g("name"), v = g("asc"), b = g(24), m = g(0), _ = P(() => m.value + t.value.length < e.value), f = P(() => {
    const V = {};
    return r.value && (V.search = r.value), d.value.length && (V.genres = d.value), c.value !== void 0 && (V.yearFrom = c.value), h.value !== void 0 && (V.yearTo = h.value), p.value.length && (V.ratings = p.value), u.value.length && (V.types = u.value), V.sort = i.value, V.order = v.value, V.limit = b.value, V.offset = m.value, V;
  }), S = P(() => {
    const V = /* @__PURE__ */ new Set();
    return t.value.forEach((H) => {
      var F;
      return (F = H.genres) == null ? void 0 : F.forEach((re) => V.add(re));
    }), Array.from(V).sort();
  }), I = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], E = ["movie", "series", "episode", "audio", "image"];
  function K(V) {
    var re, te, Te;
    const H = new URLSearchParams(), F = f.value;
    return F.search && H.set("search", F.search), (re = F.genres) == null || re.forEach((ce) => H.append("genres", ce)), F.yearFrom !== void 0 && H.set("yearFrom", String(F.yearFrom)), F.yearTo !== void 0 && H.set("yearTo", String(F.yearTo)), (te = F.ratings) == null || te.forEach((ce) => H.append("ratings", ce)), (Te = F.types) == null || Te.forEach((ce) => H.append("types", ce)), F.sort && H.set("sort", F.sort), F.order && H.set("order", F.order), H.set("limit", String(F.limit)), H.set("offset", String(F.offset)), `${V}/api/v1/media?${H.toString()}`;
  }
  async function q(V, H = !1) {
    s.value = !0, l.value = null;
    try {
      const F = new _e({ baseUrl: V }), re = K(V), te = await F.get(re);
      H ? t.value = [...t.value, ...te.items] : t.value = te.items, e.value = te.total, m.value = (te.offset ?? 0) + te.items.length;
    } catch (F) {
      l.value = F instanceof Error ? F.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function N(V) {
    await q(V, !0);
  }
  function A() {
    t.value = [], e.value = 0, m.value = 0, l.value = null;
  }
  function y(V) {
    r.value = V, m.value = 0;
  }
  function $(V) {
    d.value = V, m.value = 0;
  }
  function T(V, H) {
    c.value = V, h.value = H, m.value = 0;
  }
  function j(V) {
    p.value = V, m.value = 0;
  }
  function ee(V) {
    u.value = V, m.value = 0;
  }
  function be(V, H) {
    i.value = V, H && (v.value = H), m.value = 0;
  }
  return {
    items: t,
    total: e,
    loading: s,
    error: l,
    search: r,
    selectedGenres: d,
    yearFrom: c,
    yearTo: h,
    selectedRatings: p,
    selectedTypes: u,
    sort: i,
    order: v,
    limit: b,
    offset: m,
    hasMore: _,
    queryParams: f,
    availableGenres: S,
    availableRatings: I,
    availableTypes: E,
    fetchMedia: q,
    loadMore: N,
    reset: A,
    setSearch: y,
    setGenres: $,
    setYearRange: T,
    setRatings: j,
    setTypes: ee,
    setSort: be
  };
}), Vt = { class: "media-card" }, Pt = ["href"], At = { class: "card-poster" }, Lt = ["src", "alt"], Rt = {
  key: 1,
  class: "poster-placeholder"
}, jt = { class: "placeholder-type" }, Ft = { class: "card-overlay" }, zt = {
  key: 0,
  class: "card-year"
}, Dt = {
  key: 1,
  class: "card-rating"
}, Ut = { class: "card-info" }, Nt = ["title"], Ht = {
  key: 0,
  class: "card-genres"
}, Ot = /* @__PURE__ */ M({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(t) {
    return (e, s) => {
      var l;
      return o(), a("article", Vt, [
        n("a", {
          href: t.to ?? `/app/player/${t.item.id}`,
          class: "card-link"
        }, [
          n("div", At, [
            t.item.poster_url ? (o(), a("img", {
              key: 0,
              src: t.item.poster_url,
              alt: t.item.name,
              loading: "lazy"
            }, null, 8, Lt)) : (o(), a("div", Rt, [
              s[0] || (s[0] = n("span", { class: "placeholder-icon" }, "🎬", -1)),
              n("span", jt, k(t.item.type), 1)
            ]))
          ]),
          n("div", Ft, [
            t.item.year ? (o(), a("span", zt, k(t.item.year), 1)) : w("", !0),
            t.item.rating ? (o(), a("span", Dt, k(t.item.rating), 1)) : w("", !0)
          ]),
          n("div", Ut, [
            n("h3", {
              class: "card-title",
              title: t.item.name
            }, k(t.item.name), 9, Nt),
            (l = t.item.genres) != null && l.length ? (o(), a("p", Ht, k(t.item.genres.slice(0, 2).join(", ")), 1)) : w("", !0)
          ])
        ], 8, Pt)
      ]);
    };
  }
}), Kt = /* @__PURE__ */ B(Ot, [["__scopeId", "data-v-e60c8481"]]), Gt = { class: "media-grid-container" }, qt = {
  key: 0,
  class: "media-grid-skeleton"
}, Yt = {
  key: 1,
  class: "media-grid-empty"
}, Jt = {
  key: 2,
  class: "media-grid"
}, Qt = /* @__PURE__ */ M({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(t) {
    return (e, s) => (o(), a("div", Gt, [
      t.loading ? (o(), a("div", qt, [
        (o(), a(z, null, D(12, (l) => n("div", {
          key: l,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          n("div", { class: "skeleton-poster" }, null, -1),
          n("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : t.items.length === 0 ? (o(), a("div", Yt, [...s[1] || (s[1] = [
        n("p", null, "No media found.", -1),
        n("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (o(), a("div", Jt, [
        (o(!0), a(z, null, D(t.items, (l) => (o(), O(Kt, {
          key: l.id,
          item: l
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), Xt = /* @__PURE__ */ B(Qt, [["__scopeId", "data-v-b7e87216"]]), Wt = { class: "filter-bar" }, Zt = { class: "filter-search" }, en = { class: "filter-row" }, tn = { class: "filter-group" }, nn = ["value"], sn = ["value"], on = ["value"], an = { class: "filter-group" }, ln = ["value"], rn = ["value"], cn = ["value"], dn = ["value"], un = { class: "filter-section" }, vn = { class: "filter-chips" }, hn = ["onClick"], mn = { class: "filter-section" }, fn = { class: "filter-chips" }, pn = ["onClick"], gn = { class: "filter-section" }, _n = { class: "filter-chips" }, bn = ["onClick"], kn = { class: "filter-actions" }, yn = { class: "result-count" }, wn = /* @__PURE__ */ M({
  __name: "FilterBar",
  setup(t) {
    const e = De(), s = g(e.search), l = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function r() {
      e.setSearch(s.value);
    }
    function d(m) {
      const _ = e.selectedGenres;
      _.includes(m) ? e.setGenres(_.filter((f) => f !== m)) : e.setGenres([..._, m]);
    }
    function c(m) {
      const _ = e.selectedRatings;
      _.includes(m) ? e.setRatings(_.filter((f) => f !== m)) : e.setRatings([..._, m]);
    }
    function h(m) {
      const _ = e.selectedTypes;
      _.includes(m) ? e.setTypes(_.filter((f) => f !== m)) : e.setTypes([..._, m]);
    }
    function p(m) {
      const _ = m.target;
      e.setSort(_.value);
    }
    function u(m) {
      const _ = m.target;
      e.order = _.value;
    }
    const i = (/* @__PURE__ */ new Date()).getFullYear(), v = P(() => {
      const m = [];
      for (let _ = i; _ >= 1900; _--)
        m.push(_);
      return m;
    });
    function b() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (m, _) => (o(), a("div", Wt, [
      n("div", Zt, [
        Z(n("input", {
          "onUpdate:modelValue": _[0] || (_[0] = (f) => s.value = f),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: r
        }, null, 544), [
          [fe, s.value]
        ])
      ]),
      n("div", en, [
        n("div", tn, [
          _[4] || (_[4] = n("label", { class: "filter-label" }, "Sort", -1)),
          n("select", {
            class: "filter-select",
            value: C(e).sort,
            onChange: p
          }, [
            (o(), a(z, null, D(l, (f) => n("option", {
              key: f.value,
              value: f.value
            }, k(f.label), 9, sn)), 64))
          ], 40, nn),
          n("select", {
            class: "filter-select order-select",
            value: C(e).order,
            onChange: u
          }, [..._[3] || (_[3] = [
            n("option", { value: "asc" }, "↑", -1),
            n("option", { value: "desc" }, "↓", -1)
          ])], 40, on)
        ]),
        n("div", an, [
          _[7] || (_[7] = n("label", { class: "filter-label" }, "Year", -1)),
          n("select", {
            class: "filter-select",
            value: C(e).yearFrom ?? "",
            onChange: _[1] || (_[1] = (f) => C(e).setYearRange(
              f.target.value ? Number(f.target.value) : void 0,
              C(e).yearTo
            ))
          }, [
            _[5] || (_[5] = n("option", { value: "" }, "From", -1)),
            (o(!0), a(z, null, D(v.value.slice(0, 50), (f) => (o(), a("option", {
              key: f,
              value: f
            }, k(f), 9, rn))), 128))
          ], 40, ln),
          n("select", {
            class: "filter-select",
            value: C(e).yearTo ?? "",
            onChange: _[2] || (_[2] = (f) => C(e).setYearRange(
              C(e).yearFrom,
              f.target.value ? Number(f.target.value) : void 0
            ))
          }, [
            _[6] || (_[6] = n("option", { value: "" }, "To", -1)),
            (o(!0), a(z, null, D(v.value.slice(0, 50), (f) => (o(), a("option", {
              key: f,
              value: f
            }, k(f), 9, dn))), 128))
          ], 40, cn)
        ])
      ]),
      n("div", un, [
        _[8] || (_[8] = n("span", { class: "filter-label" }, "Genres", -1)),
        n("div", vn, [
          (o(!0), a(z, null, D(C(e).availableGenres, (f) => (o(), a("button", {
            key: f,
            class: L(["chip", { active: C(e).selectedGenres.includes(f) }]),
            onClick: (S) => d(f)
          }, k(f), 11, hn))), 128))
        ])
      ]),
      n("div", mn, [
        _[9] || (_[9] = n("span", { class: "filter-label" }, "Rating", -1)),
        n("div", fn, [
          (o(!0), a(z, null, D(C(e).availableRatings, (f) => (o(), a("button", {
            key: f,
            class: L(["chip", { active: C(e).selectedRatings.includes(f) }]),
            onClick: (S) => c(f)
          }, k(f), 11, pn))), 128))
        ])
      ]),
      n("div", gn, [
        _[10] || (_[10] = n("span", { class: "filter-label" }, "Type", -1)),
        n("div", _n, [
          (o(!0), a(z, null, D(C(e).availableTypes, (f) => (o(), a("button", {
            key: f,
            class: L(["chip", { active: C(e).selectedTypes.includes(f) }]),
            onClick: (S) => h(f)
          }, k(f), 11, bn))), 128))
        ])
      ]),
      n("div", kn, [
        n("button", {
          class: "clear-btn",
          onClick: b
        }, "Clear filters"),
        n("span", yn, k(C(e).total) + " result" + k(C(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), $n = /* @__PURE__ */ B(wn, [["__scopeId", "data-v-7089ec0b"]]), xn = { class: "browse-page" }, Cn = { class: "browse-header" }, In = { class: "browse-toolbar-extra" }, Sn = {
  key: 0,
  class: "browse-error"
}, Mn = {
  key: 1,
  class: "load-more"
}, Bn = {
  key: 2,
  class: "loading-more"
}, Tn = /* @__PURE__ */ M({
  __name: "BrowsePage",
  setup(t) {
    const e = Ce("apiBase") ?? P(() => ""), s = De();
    function l() {
      s.reset(), s.fetchMedia(e.value);
    }
    W(l), oe(e, l);
    function r() {
      s.reset(), s.fetchMedia(e.value);
    }
    function d() {
      s.loadMore(e.value);
    }
    return (c, h) => (o(), a("div", xn, [
      n("div", Cn, [
        h[0] || (h[0] = n("h1", { class: "browse-title" }, "Browse Media", -1)),
        n("div", In, [
          U(c.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      R($n, { onChange: r }),
      C(s).error ? (o(), a("div", Sn, [
        n("p", null, k(C(s).error), 1),
        n("button", {
          class: "retry-btn",
          onClick: l
        }, "Retry")
      ])) : w("", !0),
      R(Xt, {
        items: C(s).items,
        loading: C(s).loading && C(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      C(s).hasMore && !C(s).loading ? (o(), a("div", Mn, [
        n("button", {
          class: "load-more-btn",
          onClick: d
        }, "Load more")
      ])) : w("", !0),
      C(s).loading && C(s).items.length > 0 ? (o(), a("div", Bn, " Loading... ")) : w("", !0)
    ]));
  }
}), En = /* @__PURE__ */ B(Tn, [["__scopeId", "data-v-c192afa6"]]), Vn = ["src", "poster"], Pn = { class: "controls-top" }, An = { class: "media-title" }, Ln = {
  key: 0,
  class: "media-year"
}, Rn = { class: "controls-center" }, jn = { class: "controls-bottom" }, Fn = { class: "progress-track" }, zn = { class: "controls-row" }, Dn = { class: "time-display" }, Un = { class: "volume-control" }, Nn = ["value"], Hn = { class: "speed-control" }, On = ["value"], Kn = { class: "time-display" }, Gn = /* @__PURE__ */ M({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(t) {
    const e = g(null), s = g(!1), l = g(0), r = g(0), d = g(1), c = g(!1), h = g(1), p = g(!1), u = g(!0);
    let i = null;
    const v = P(
      () => r.value > 0 ? l.value / r.value * 100 : 0
    );
    function b(A) {
      if (!isFinite(A) || isNaN(A)) return "0:00";
      const y = Math.floor(A / 60), $ = Math.floor(A % 60);
      return `${y}:${$.toString().padStart(2, "0")}`;
    }
    function m() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function _() {
      e.value && (l.value = e.value.currentTime);
    }
    function f() {
      e.value && (r.value = e.value.duration);
    }
    function S(A) {
      const $ = A.currentTarget.getBoundingClientRect(), T = (A.clientX - $.left) / $.width;
      e.value && (e.value.currentTime = T * r.value);
    }
    function I(A) {
      const y = parseFloat(A.target.value);
      d.value = y, e.value && (e.value.volume = y), c.value = y === 0;
    }
    function E() {
      c.value = !c.value, e.value && (e.value.muted = c.value);
    }
    function K(A) {
      h.value = A, e.value && (e.value.playbackRate = A);
    }
    function q() {
      var y;
      const A = (y = e.value) == null ? void 0 : y.closest(".player-container");
      A && (document.fullscreenElement ? (document.exitFullscreen(), p.value = !1) : (A.requestFullscreen(), p.value = !0));
    }
    function N() {
      u.value = !0, i && clearTimeout(i), i = setTimeout(() => {
        s.value && (u.value = !1);
      }, 3e3);
    }
    return qe(() => {
      i && clearTimeout(i);
    }), (A, y) => (o(), a("div", {
      class: L(["player-container", { "controls-hidden": !u.value && s.value }]),
      onMousemove: N,
      onClick: m
    }, [
      y[6] || (y[6] = n("div", { class: "player-overlay" }, null, -1)),
      n("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: t.streamUrl,
        poster: t.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: y[0] || (y[0] = ($) => s.value = !0),
        onPause: y[1] || (y[1] = ($) => s.value = !1),
        onTimeupdate: _,
        onLoadedmetadata: f,
        onClick: ae(m, ["stop"])
      }, null, 40, Vn),
      n("div", {
        class: "player-controls",
        onClick: y[4] || (y[4] = ae(() => {
        }, ["stop"]))
      }, [
        n("div", Pn, [
          n("button", {
            class: "ctrl-btn back-btn",
            onClick: y[2] || (y[2] = ($) => A.$router.back())
          }, " ← Back "),
          n("span", An, k(t.media.name), 1),
          t.media.year ? (o(), a("span", Ln, k(t.media.year), 1)) : w("", !0)
        ]),
        n("div", Rn, [
          n("button", {
            class: "play-btn",
            onClick: m
          }, k(s.value ? "❚❚" : "▶"), 1)
        ]),
        n("div", jn, [
          n("div", {
            class: "progress-bar",
            onClick: S
          }, [
            n("div", Fn, [
              n("div", {
                class: "progress-fill",
                style: Y({ width: v.value + "%" })
              }, null, 4)
            ])
          ]),
          n("div", zn, [
            n("span", Dn, k(b(l.value)), 1),
            n("div", Un, [
              n("button", {
                class: "ctrl-btn",
                onClick: E
              }, k(c.value || d.value === 0 ? "🔇" : "🔊"), 1),
              n("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: c.value ? 0 : d.value,
                class: "volume-slider",
                onInput: I
              }, null, 40, Nn)
            ]),
            n("div", Hn, [
              n("select", {
                class: "speed-select",
                value: h.value,
                onChange: y[3] || (y[3] = ($) => K(Number($.target.value)))
              }, [...y[5] || (y[5] = [
                Ye('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, On)
            ]),
            n("span", Kn, k(b(r.value)), 1),
            n("button", {
              class: "ctrl-btn",
              onClick: q
            }, k(p.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), qn = /* @__PURE__ */ B(Gn, [["__scopeId", "data-v-7a51063f"]]), Yn = { class: "player-page" }, Jn = {
  key: 0,
  class: "player-loading"
}, Qn = {
  key: 1,
  class: "player-error"
}, Xn = /* @__PURE__ */ M({
  __name: "PlayerPage",
  setup(t) {
    const e = Ce("apiBase", P(() => "")), s = et(), l = g(null), r = g(""), d = g(!0), c = g(null);
    async function h() {
      const p = s.params.id;
      if (!p) {
        c.value = "No media ID provided", d.value = !1;
        return;
      }
      try {
        const u = new _e({ baseUrl: e.value }), [i, v] = await Promise.all([
          u.get(`/api/v1/media/${p}`),
          u.get(`/api/v1/media/${p}/playback-info`).catch(() => null)
        ]);
        l.value = i, v != null && v.url ? r.value = v.url : r.value = `${e.value}/media/${p}/stream`;
      } catch (u) {
        c.value = u instanceof Error ? u.message : "Failed to load media";
      } finally {
        d.value = !1;
      }
    }
    return W(h), (p, u) => (o(), a("div", Yn, [
      d.value ? (o(), a("div", Jn, "Loading...")) : c.value ? (o(), a("div", Qn, [
        n("p", null, k(c.value), 1),
        n("button", {
          class: "retry-btn",
          onClick: h
        }, "Retry")
      ])) : l.value ? (o(), O(qn, {
        key: 2,
        media: l.value,
        "stream-url": r.value
      }, null, 8, ["media", "stream-url"])) : w("", !0)
    ]));
  }
}), Wn = /* @__PURE__ */ B(Xn, [["__scopeId", "data-v-d9061b47"]]), ye = "access_token", we = "refresh_token", $e = "user";
class Zn {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(ye);
  }
  setAccessToken(e) {
    this.storage.setItem(ye, e);
  }
  getRefreshToken() {
    return this.storage.getItem(we);
  }
  setRefreshToken(e) {
    this.storage.setItem(we, e);
  }
  getUser() {
    const e = this.storage.getItem($e);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem($e, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(ye), this.storage.removeItem(we), this.storage.removeItem($e);
  }
}
const Me = ge("auth", () => {
  const t = new Zn(), e = Ce("apiBase", ""), s = new _e({ tokenStore: t, baseUrl: e }), l = g(null), r = g(!1), d = g(null), c = P(() => t.getAccessToken() !== null), h = P(() => {
    var b;
    return ((b = l.value) == null ? void 0 : b.is_admin) === !0;
  });
  async function p(b, m) {
    r.value = !0, d.value = null;
    try {
      const _ = await s.post("/api/v1/auth/login", { email: b, password: m });
      return t.setAccessToken(_.access_token), t.setRefreshToken(_.refresh_token), await i(), !0;
    } catch (_) {
      return d.value = _ instanceof Error ? _.message : "Login failed", !1;
    } finally {
      r.value = !1;
    }
  }
  async function u(b, m, _) {
    r.value = !0, d.value = null;
    try {
      const f = await s.post("/api/v1/auth/register", { email: b, username: m, password: _ });
      return t.setAccessToken(f.access_token), t.setRefreshToken(f.refresh_token), await i(), !0;
    } catch (f) {
      return d.value = f instanceof Error ? f.message : "Registration failed", !1;
    } finally {
      r.value = !1;
    }
  }
  async function i() {
    if (c.value)
      try {
        l.value = await s.getCurrentUser();
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
    error: d,
    isLoggedIn: c,
    isAdmin: h,
    client: s,
    login: p,
    signup: u,
    fetchUser: i,
    logout: v
  };
}), es = {
  key: 0,
  class: "form-error"
}, ts = { class: "field" }, ns = { class: "field" }, ss = { class: "password-wrapper" }, os = ["type"], as = ["disabled"], ls = { class: "form-footer" }, is = /* @__PURE__ */ M({
  __name: "LoginForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, l = Me(), r = Re(), d = g(""), c = g(""), h = g(!1);
    async function p() {
      await l.login(d.value, c.value) && (s("success"), r.push("/app"));
    }
    return (u, i) => {
      const v = Ae("router-link");
      return o(), a("form", {
        class: "login-form",
        onSubmit: ae(p, ["prevent"])
      }, [
        i[7] || (i[7] = n("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        C(l).error ? (o(), a("div", es, k(C(l).error), 1)) : w("", !0),
        n("div", ts, [
          i[3] || (i[3] = n("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          Z(n("input", {
            id: "email",
            "onUpdate:modelValue": i[0] || (i[0] = (b) => d.value = b),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [fe, d.value]
          ])
        ]),
        n("div", ns, [
          i[4] || (i[4] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", ss, [
            Z(n("input", {
              id: "password",
              "onUpdate:modelValue": i[1] || (i[1] = (b) => c.value = b),
              type: h.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, os), [
              [xe, c.value]
            ]),
            n("button", {
              type: "button",
              class: "toggle-password",
              onClick: i[2] || (i[2] = (b) => h.value = !h.value)
            }, k(h.value ? "🙈" : "👁"), 1)
          ])
        ]),
        n("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(l).loading
        }, k(C(l).loading ? "Signing in..." : "Sign in"), 9, as),
        n("p", ls, [
          i[6] || (i[6] = Q(" Don't have an account? ", -1)),
          R(v, {
            to: "/app/signup",
            class: "link"
          }, {
            default: J(() => [...i[5] || (i[5] = [
              Q("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), rs = /* @__PURE__ */ B(is, [["__scopeId", "data-v-22bc5576"]]), cs = { class: "auth-page" }, ds = { class: "auth-card" }, us = /* @__PURE__ */ M({
  __name: "LoginPage",
  setup(t) {
    return (e, s) => (o(), a("div", cs, [
      n("div", ds, [
        R(rs, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), vs = /* @__PURE__ */ B(us, [["__scopeId", "data-v-9c53ce6a"]]), hs = {
  key: 0,
  class: "form-error"
}, ms = { class: "field" }, fs = { class: "field" }, ps = { class: "field" }, gs = { class: "password-wrapper" }, _s = ["type"], bs = { class: "field" }, ks = ["type"], ys = ["disabled"], ws = { class: "form-footer" }, $s = /* @__PURE__ */ M({
  __name: "SignupForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, l = Me(), r = Re(), d = g(""), c = g(""), h = g(""), p = g(""), u = g(!1), i = g(null);
    async function v() {
      if (i.value = null, h.value.length < 8) {
        i.value = "Password must be at least 8 characters.";
        return;
      }
      if (h.value !== p.value) {
        i.value = "Passwords do not match.";
        return;
      }
      await l.signup(d.value, c.value, h.value) && (s("success"), r.push("/app"));
    }
    return (b, m) => {
      const _ = Ae("router-link");
      return o(), a("form", {
        class: "signup-form",
        onSubmit: ae(v, ["prevent"])
      }, [
        m[11] || (m[11] = n("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        C(l).error || i.value ? (o(), a("div", hs, k(C(l).error || i.value), 1)) : w("", !0),
        n("div", ms, [
          m[5] || (m[5] = n("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          Z(n("input", {
            id: "email",
            "onUpdate:modelValue": m[0] || (m[0] = (f) => d.value = f),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [fe, d.value]
          ])
        ]),
        n("div", fs, [
          m[6] || (m[6] = n("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          Z(n("input", {
            id: "username",
            "onUpdate:modelValue": m[1] || (m[1] = (f) => c.value = f),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [fe, c.value]
          ])
        ]),
        n("div", ps, [
          m[7] || (m[7] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", gs, [
            Z(n("input", {
              id: "password",
              "onUpdate:modelValue": m[2] || (m[2] = (f) => h.value = f),
              type: u.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, _s), [
              [xe, h.value]
            ]),
            n("button", {
              type: "button",
              class: "toggle-password",
              onClick: m[3] || (m[3] = (f) => u.value = !u.value)
            }, k(u.value ? "🙈" : "👁"), 1)
          ])
        ]),
        n("div", bs, [
          m[8] || (m[8] = n("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          Z(n("input", {
            id: "confirm",
            "onUpdate:modelValue": m[4] || (m[4] = (f) => p.value = f),
            type: u.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, ks), [
            [xe, p.value]
          ])
        ]),
        n("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(l).loading
        }, k(C(l).loading ? "Creating account..." : "Create account"), 9, ys),
        n("p", ws, [
          m[10] || (m[10] = Q(" Already have an account? ", -1)),
          R(_, {
            to: "/app/login",
            class: "link"
          }, {
            default: J(() => [...m[9] || (m[9] = [
              Q("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), xs = /* @__PURE__ */ B($s, [["__scopeId", "data-v-d5e42c72"]]), Cs = { class: "auth-page" }, Is = { class: "auth-card" }, Ss = /* @__PURE__ */ M({
  __name: "SignupPage",
  setup(t) {
    return (e, s) => (o(), a("div", Cs, [
      n("div", Is, [
        R(xs, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Ms = /* @__PURE__ */ B(Ss, [["__scopeId", "data-v-609331e4"]]), Bs = { class: "settings-form" }, Ts = {
  key: 0,
  class: "settings-loading"
}, Es = {
  key: 1,
  class: "settings-error"
}, Vs = { class: "group-title" }, Ps = ["for"], As = { class: "setting-control" }, Ls = ["id", "checked", "onChange"], Rs = ["id", "value", "onChange"], js = ["id", "value", "onChange"], Fs = { class: "settings-actions" }, zs = {
  key: 0,
  class: "success-msg"
}, Ds = ["disabled"], Us = /* @__PURE__ */ M({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(t, { emit: e }) {
    const s = t, l = e, r = Me(), d = g({}), c = g(!0), h = g(!1), p = g(null), u = g(null), i = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], v = P(
      () => s.groups ? i.filter((I) => s.groups.includes(I)) : i
    );
    async function b() {
      c.value = !0, p.value = null;
      try {
        const I = await r.client.get("/api/v1/users/me/settings");
        d.value = I;
      } catch (I) {
        p.value = I instanceof Error ? I.message : "Failed to load settings";
      } finally {
        c.value = !1;
      }
    }
    async function m() {
      h.value = !0, p.value = null, u.value = null;
      try {
        await r.client.put("/api/v1/users/me/settings", d.value), u.value = "Settings saved.", l("saved", d.value), setTimeout(() => {
          u.value = null;
        }, 3e3);
      } catch (I) {
        p.value = I instanceof Error ? I.message : "Failed to save settings";
      } finally {
        h.value = !1;
      }
    }
    function _(I, E) {
      d.value[I] = E;
    }
    W(b);
    const f = {
      transcoding: "Transcoding",
      metadata: "Metadata",
      markers: "Marker Detection",
      subtitles: "Subtitles",
      discovery: "Discovery",
      trickplay: "Trickplay",
      newsletter: "Newsletter",
      "port-forward": "Port Forwarding",
      scrobblers: "Scrobblers"
    }, S = {
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
    return (I, E) => (o(), a("div", Bs, [
      c.value ? (o(), a("div", Ts, "Loading settings...")) : p.value ? (o(), a("div", Es, k(p.value), 1)) : (o(), a(z, { key: 2 }, [
        (o(!0), a(z, null, D(v.value, (K) => (o(), a("div", {
          key: K,
          class: "settings-group"
        }, [
          n("h3", Vs, k(f[K]), 1),
          (o(), a(z, null, D(S, (q, N) => Z(n("div", {
            key: N,
            class: "setting-row"
          }, [
            n("label", {
              for: N,
              class: "setting-label"
            }, k(q.label), 9, Ps),
            n("div", As, [
              q.type === "bool" ? (o(), a("input", {
                key: 0,
                id: N,
                type: "checkbox",
                class: "toggle",
                checked: !!d.value[N],
                onChange: (A) => _(N, A.target.checked)
              }, null, 40, Ls)) : q.type === "number" ? (o(), a("input", {
                key: 1,
                id: N,
                type: "number",
                class: "input number-input",
                value: d.value[N],
                onChange: (A) => _(N, Number(A.target.value))
              }, null, 40, Rs)) : (o(), a("input", {
                key: 2,
                id: N,
                type: "text",
                class: "input",
                value: d.value[N] ?? "",
                onChange: (A) => _(N, A.target.value)
              }, null, 40, js))
            ])
          ]), [
            [Ie, N.startsWith(K)]
          ])), 64))
        ]))), 128)),
        n("div", Fs, [
          u.value ? (o(), a("div", zs, k(u.value), 1)) : w("", !0),
          n("button", {
            class: "save-btn",
            disabled: h.value,
            onClick: m
          }, k(h.value ? "Saving..." : "Save settings"), 9, Ds)
        ])
      ], 64))
    ]));
  }
}), Ns = /* @__PURE__ */ B(Us, [["__scopeId", "data-v-51b588b6"]]), Hs = { class: "settings-page" }, Os = /* @__PURE__ */ M({
  __name: "SettingsPage",
  setup(t) {
    return (e, s) => (o(), a("div", Hs, [
      s[0] || (s[0] = n("div", { class: "settings-header" }, [
        n("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      R(Ns)
    ]));
  }
}), Ks = /* @__PURE__ */ B(Os, [["__scopeId", "data-v-f9ca8a28"]]);
function Gs() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function qs(t) {
  const e = t.routerBase || "/app", s = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: En
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: Wn
    },
    {
      path: `${e}/login`,
      name: "login",
      component: vs
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Ms
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: Ks
    }
  ];
  return t.extraRoutes && s.push(...t.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: Bt,
    props: { appName: t.app }
  }), s;
}
function Kc(t) {
  const e = {
    ...Gs(),
    ...t
  };
  yt();
  const s = We(), l = e.routerBase || "/app", r = tt({
    history: nt(l),
    routes: qs(e)
  }), d = Je(Ct);
  return d.provide("apiBase", e.apiBase), d.use(s), d.use(r), d;
}
const Ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Js(t, e) {
  return o(), a("svg", Ys, [...e[0] || (e[0] = [
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
const Qs = x({ name: "lucide-play", render: Js }), Xs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ws(t, e) {
  return o(), a("svg", Xs, [...e[0] || (e[0] = [
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
const Zs = x({ name: "lucide-pause", render: Ws }), eo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function to(t, e) {
  return o(), a("svg", eo, [...e[0] || (e[0] = [
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
const no = x({ name: "lucide-skip-back", render: to }), so = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function oo(t, e) {
  return o(), a("svg", so, [...e[0] || (e[0] = [
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
const ao = x({ name: "lucide-skip-forward", render: oo }), lo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function io(t, e) {
  return o(), a("svg", lo, [...e[0] || (e[0] = [
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
const ro = x({ name: "lucide-rotate-ccw", render: io }), co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function uo(t, e) {
  return o(), a("svg", co, [...e[0] || (e[0] = [
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
const vo = x({ name: "lucide-rotate-cw", render: uo }), ho = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function mo(t, e) {
  return o(), a("svg", ho, [...e[0] || (e[0] = [
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
const fo = x({ name: "lucide-volume-2", render: mo }), po = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function go(t, e) {
  return o(), a("svg", po, [...e[0] || (e[0] = [
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
const _o = x({ name: "lucide-volume-1", render: go }), bo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ko(t, e) {
  return o(), a("svg", bo, [...e[0] || (e[0] = [
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
const yo = x({ name: "lucide-volume-x", render: ko }), wo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $o(t, e) {
  return o(), a("svg", wo, [...e[0] || (e[0] = [
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
const xo = x({ name: "lucide-captions", render: $o }), Co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Io(t, e) {
  return o(), a("svg", Co, [...e[0] || (e[0] = [
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
const So = x({ name: "lucide-picture-in-picture-2", render: Io }), Mo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bo(t, e) {
  return o(), a("svg", Mo, [...e[0] || (e[0] = [
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
const To = x({ name: "lucide-rectangle-horizontal", render: Bo }), Eo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vo(t, e) {
  return o(), a("svg", Eo, [...e[0] || (e[0] = [
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
const Po = x({ name: "lucide-maximize", render: Vo }), Ao = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Lo(t, e) {
  return o(), a("svg", Ao, [...e[0] || (e[0] = [
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
const Ro = x({ name: "lucide-minimize", render: Lo }), jo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fo(t, e) {
  return o(), a("svg", jo, [...e[0] || (e[0] = [
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
const zo = x({ name: "lucide-maximize-2", render: Fo }), Do = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Uo(t, e) {
  return o(), a("svg", Do, [...e[0] || (e[0] = [
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
const No = x({ name: "lucide-cast", render: Uo }), Ho = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oo(t, e) {
  return o(), a("svg", Ho, [...e[0] || (e[0] = [
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
const Ko = x({ name: "lucide-settings", render: Oo }), Go = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qo(t, e) {
  return o(), a("svg", Go, [...e[0] || (e[0] = [
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
const Yo = x({ name: "lucide-gauge", render: qo }), Jo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qo(t, e) {
  return o(), a("svg", Jo, [...e[0] || (e[0] = [
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
const Xo = x({ name: "lucide-film", render: Qo }), Wo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zo(t, e) {
  return o(), a("svg", Wo, [...e[0] || (e[0] = [
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
const ea = x({ name: "lucide-image", render: Zo }), ta = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function na(t, e) {
  return o(), a("svg", ta, [...e[0] || (e[0] = [
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
const sa = x({ name: "lucide-music", render: na }), oa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function aa(t, e) {
  return o(), a("svg", oa, [...e[0] || (e[0] = [
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
const la = x({ name: "lucide-tv", render: aa }), ia = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ra(t, e) {
  return o(), a("svg", ia, [...e[0] || (e[0] = [
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
const ca = x({ name: "lucide-search", render: ra }), da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ua(t, e) {
  return o(), a("svg", da, [...e[0] || (e[0] = [
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
const va = x({ name: "lucide-sliders-horizontal", render: ua }), ha = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ma(t, e) {
  return o(), a("svg", ha, [...e[0] || (e[0] = [
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
const fa = x({ name: "lucide-calendar", render: ma }), pa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ga(t, e) {
  return o(), a("svg", pa, [...e[0] || (e[0] = [
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
const _a = x({ name: "lucide-arrow-up-down", render: ga }), ba = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ka(t, e) {
  return o(), a("svg", ba, [...e[0] || (e[0] = [
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
const ya = x({ name: "lucide-star", render: ka }), wa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $a(t, e) {
  return o(), a("svg", wa, [...e[0] || (e[0] = [
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
const xa = x({ name: "lucide-list", render: $a }), Ca = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ia(t, e) {
  return o(), a("svg", Ca, [...e[0] || (e[0] = [
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
const Sa = x({ name: "lucide-plus", render: Ia }), Ma = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ba(t, e) {
  return o(), a("svg", Ma, [...e[0] || (e[0] = [
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
const Ta = x({ name: "lucide-info", render: Ba }), Ea = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Va(t, e) {
  return o(), a("svg", Ea, [...e[0] || (e[0] = [
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
const Pa = x({ name: "lucide-x", render: Va }), Aa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function La(t, e) {
  return o(), a("svg", Aa, [...e[0] || (e[0] = [
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
const Ra = x({ name: "lucide-check", render: La }), ja = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fa(t, e) {
  return o(), a("svg", ja, [...e[0] || (e[0] = [
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
const za = x({ name: "lucide-bookmark", render: Fa }), Da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ua(t, e) {
  return o(), a("svg", Da, [...e[0] || (e[0] = [
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
const Na = x({ name: "lucide-bookmark-plus", render: Ua }), Ha = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oa(t, e) {
  return o(), a("svg", Ha, [...e[0] || (e[0] = [
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
const Ka = x({ name: "lucide-heart", render: Oa }), Ga = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qa(t, e) {
  return o(), a("svg", Ga, [...e[0] || (e[0] = [
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
const Ya = x({ name: "lucide-user", render: qa }), Ja = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qa(t, e) {
  return o(), a("svg", Ja, [...e[0] || (e[0] = [
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
const Xa = x({ name: "lucide-log-out", render: Qa }), Wa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Za(t, e) {
  return o(), a("svg", Wa, [...e[0] || (e[0] = [
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
const el = x({ name: "lucide-menu", render: Za }), tl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function nl(t, e) {
  return o(), a("svg", tl, [...e[0] || (e[0] = [
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
const sl = x({ name: "lucide-more-horizontal", render: nl }), ol = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function al(t, e) {
  return o(), a("svg", ol, [...e[0] || (e[0] = [
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
const ll = x({ name: "lucide-eye", render: al }), il = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function rl(t, e) {
  return o(), a("svg", il, [...e[0] || (e[0] = [
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
const cl = x({ name: "lucide-eye-off", render: rl }), dl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ul(t, e) {
  return o(), a("svg", dl, [...e[0] || (e[0] = [
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
const vl = x({ name: "lucide-arrow-left", render: ul }), hl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ml(t, e) {
  return o(), a("svg", hl, [...e[0] || (e[0] = [
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
const fl = x({ name: "lucide-arrow-up", render: ml }), pl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gl(t, e) {
  return o(), a("svg", pl, [...e[0] || (e[0] = [
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
const _l = x({ name: "lucide-arrow-down", render: gl }), bl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function kl(t, e) {
  return o(), a("svg", bl, [...e[0] || (e[0] = [
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
const yl = x({ name: "lucide-chevron-down", render: kl }), wl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $l(t, e) {
  return o(), a("svg", wl, [...e[0] || (e[0] = [
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
const xl = x({ name: "lucide-chevron-up", render: $l }), Cl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Il(t, e) {
  return o(), a("svg", Cl, [...e[0] || (e[0] = [
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
const Sl = x({ name: "lucide-chevron-left", render: Il }), Ml = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bl(t, e) {
  return o(), a("svg", Ml, [...e[0] || (e[0] = [
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
const Tl = x({ name: "lucide-chevron-right", render: Bl }), El = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vl(t, e) {
  return o(), a("svg", El, [...e[0] || (e[0] = [
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
const Pl = x({ name: "lucide-loader-circle", render: Vl }), Al = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ll(t, e) {
  return o(), a("svg", Al, [...e[0] || (e[0] = [
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
const Rl = x({ name: "lucide-circle-alert", render: Ll }), jl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fl(t, e) {
  return o(), a("svg", jl, [...e[0] || (e[0] = [
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
const zl = x({ name: "lucide-circle-check", render: Fl }), Dl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ul(t, e) {
  return o(), a("svg", Dl, [...e[0] || (e[0] = [
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
const Nl = x({ name: "lucide-circle-x", render: Ul }), Hl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ol(t, e) {
  return o(), a("svg", Hl, [...e[0] || (e[0] = [
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
const Kl = x({ name: "lucide-sun", render: Ol }), Gl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ql(t, e) {
  return o(), a("svg", Gl, [...e[0] || (e[0] = [
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
const Yl = x({ name: "lucide-moon", render: ql }), Jl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ql(t, e) {
  return o(), a("svg", Jl, [...e[0] || (e[0] = [
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
const Xl = x({ name: "lucide-monitor", render: Ql }), G = /* @__PURE__ */ M({
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
      play: Qs,
      pause: Zs,
      "skip-back": no,
      "skip-forward": ao,
      rewind: ro,
      forward: vo,
      volume: fo,
      "volume-low": _o,
      mute: yo,
      captions: xo,
      pip: So,
      theater: To,
      fullscreen: Po,
      "fullscreen-exit": Ro,
      expand: zo,
      cast: No,
      settings: Ko,
      speed: Yo,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: Xo,
      image: ea,
      music: sa,
      tv: la,
      search: ca,
      filter: va,
      calendar: fa,
      sort: _a,
      star: ya,
      list: xa,
      // actions
      plus: Sa,
      info: Ta,
      x: Pa,
      check: Ra,
      bookmark: za,
      "bookmark-plus": Na,
      heart: Ka,
      user: Ya,
      "log-out": Xa,
      menu: el,
      more: sl,
      eye: ll,
      "eye-off": cl,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": vl,
      "arrow-up": fl,
      "arrow-down": _l,
      "chevron-down": yl,
      "chevron-up": xl,
      "chevron-left": Sl,
      "chevron-right": Tl,
      // status / theme
      spinner: Pl,
      alert: Rl,
      success: zl,
      error: Nl,
      sun: Kl,
      moon: Yl,
      monitor: Xl
    }, s = t, l = P(() => e[s.name]), r = P(
      () => s.size === void 0 ? void 0 : typeof s.size == "number" ? `${s.size}px` : s.size
    );
    return (d, c) => (o(), O(Le(l.value), {
      class: "phlix-icon",
      style: Y(r.value ? { fontSize: r.value } : void 0),
      "stroke-width": t.strokeWidth,
      role: t.label ? "img" : void 0,
      "aria-label": t.label,
      "aria-hidden": t.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), Wl = {
  key: 1,
  class: "phlix-backdrop__vignette",
  "aria-hidden": "true"
}, Zl = /* @__PURE__ */ M({
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
    const e = t, s = g(!1);
    let l = null, r = null;
    const d = () => s.value = !!(l != null && l.matches || r != null && r.matches);
    W(() => {
      var v, b;
      typeof window > "u" || typeof window.matchMedia != "function" || (l = window.matchMedia("(prefers-reduced-motion: reduce)"), r = window.matchMedia("(prefers-reduced-data: reduce)"), d(), (v = l.addEventListener) == null || v.call(l, "change", d), (b = r.addEventListener) == null || b.call(r, "change", d));
    }), le(() => {
      var v, b;
      (v = l == null ? void 0 : l.removeEventListener) == null || v.call(l, "change", d), (b = r == null ? void 0 : r.removeEventListener) == null || b.call(r, "change", d);
    });
    const c = P(() => e.enabled && !s.value), h = P(() => c.value && e.ambient && !!(e.ambientColor || e.ambientImage));
    function p(v) {
      return encodeURI(v).replace(/["'()\s]/g, (b) => `%${b.charCodeAt(0).toString(16)}`);
    }
    const u = P(() => e.ambientImage ? { backgroundImage: `url("${p(e.ambientImage)}")`, opacity: String(0.55 * e.intensity) } : {
      background: `radial-gradient(60% 60% at 25% 12%, ${e.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${e.ambientColor} 55%, transparent), transparent 70%)`,
      opacity: String(0.85 * e.intensity)
    }), i = P(() => ({ opacity: `calc(var(--grain-opacity) * ${e.intensity})` }));
    return (v, b) => (o(), a(z, null, [
      h.value ? (o(), a("div", {
        key: 0,
        class: L(["phlix-backdrop__ambient", { "is-image": !!t.ambientImage }]),
        style: Y(u.value),
        "aria-hidden": "true"
      }, null, 6)) : w("", !0),
      c.value && t.vignette ? (o(), a("div", Wl)) : w("", !0),
      c.value && t.grain ? (o(), a("div", {
        key: 2,
        class: "phlix-backdrop__grain",
        style: Y(i.value),
        "aria-hidden": "true"
      }, null, 4)) : w("", !0)
    ], 64));
  }
}), Gc = /* @__PURE__ */ B(Zl, [["__scopeId", "data-v-c521cafc"]]), ei = ["type", "disabled", "aria-busy"], ti = {
  key: 0,
  class: "phlix-btn__spinner"
}, ni = { class: "phlix-btn__label" }, si = /* @__PURE__ */ M({
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
    const e = t, s = P(() => e.disabled || e.loading);
    return (l, r) => (o(), a("button", {
      type: t.type,
      class: L(["phlix-btn", [`phlix-btn--${t.variant}`, `phlix-btn--${t.size}`, { "phlix-btn--block": t.block, "is-loading": t.loading }]]),
      disabled: s.value,
      "aria-busy": t.loading || void 0
    }, [
      t.loading ? (o(), a("span", ti, [
        R(G, { name: "spinner" })
      ])) : w("", !0),
      t.leftIcon && !t.loading ? (o(), O(G, {
        key: 1,
        name: t.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : w("", !0),
      n("span", ni, [
        U(l.$slots, "default", {}, void 0, !0)
      ]),
      t.rightIcon ? (o(), O(G, {
        key: 2,
        name: t.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : w("", !0)
    ], 10, ei));
  }
}), qc = /* @__PURE__ */ B(si, [["__scopeId", "data-v-8cdee95a"]]), oi = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], ai = /* @__PURE__ */ M({
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
    const e = t, s = P(() => e.disabled || e.loading);
    return (l, r) => (o(), a("button", {
      type: t.type,
      class: L(["phlix-iconbtn", [`phlix-iconbtn--${t.variant}`, `phlix-iconbtn--${t.size}`, { "is-pressed": t.pressed }]]),
      disabled: s.value,
      "aria-label": t.label,
      title: t.label,
      "aria-pressed": t.pressed === void 0 ? void 0 : t.pressed,
      "aria-busy": t.loading || void 0
    }, [
      R(G, {
        name: t.loading ? "spinner" : t.name,
        class: L({ "phlix-iconbtn__spin": t.loading })
      }, null, 8, ["name", "class"])
    ], 10, oi));
  }
}), Be = /* @__PURE__ */ B(ai, [["__scopeId", "data-v-fc0cd545"]]), li = ["role", "aria-label"], ii = /* @__PURE__ */ M({
  __name: "Badge",
  props: {
    tone: { default: "neutral" },
    size: { default: "sm" },
    mono: { type: Boolean, default: !1 },
    icon: {},
    label: {}
  },
  setup(t) {
    return (e, s) => (o(), a("span", {
      class: L(["phlix-badge", [`phlix-badge--${t.tone}`, `phlix-badge--${t.size}`, { "phlix-badge--mono": t.mono }]]),
      role: t.label ? "img" : void 0,
      "aria-label": t.label
    }, [
      t.icon ? (o(), O(G, {
        key: 0,
        name: t.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : w("", !0),
      U(e.$slots, "default", {}, void 0, !0)
    ], 10, li));
  }
}), Yc = /* @__PURE__ */ B(ii, [["__scopeId", "data-v-8f8d0fd2"]]), ri = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], ci = /* @__PURE__ */ M({
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
    const s = t, l = e, r = g(null), d = g(!1), c = P(() => {
      const f = s.max - s.min || 1;
      return Math.min(100, Math.max(0, (s.modelValue - s.min) / f * 100));
    }), h = P(
      () => s.formatValue ? s.formatValue(s.modelValue) : String(s.modelValue)
    );
    function p(f) {
      const S = Math.min(s.max, Math.max(s.min, f)), I = Math.round((S - s.min) / s.step), E = s.min + I * s.step;
      return Math.round(E * 1e6) / 1e6;
    }
    function u(f, S = !1) {
      const I = p(f);
      I !== s.modelValue && (l("update:modelValue", I), S && l("change", I));
    }
    function i(f) {
      const S = r.value;
      if (!S) return s.modelValue;
      const I = S.getBoundingClientRect(), E = I.width ? (f - I.left) / I.width : 0;
      return s.min + E * (s.max - s.min);
    }
    function v(f) {
      var S, I;
      s.disabled || ((I = (S = f.currentTarget).setPointerCapture) == null || I.call(S, f.pointerId), d.value = !0, u(i(f.clientX)));
    }
    function b(f) {
      d.value && u(i(f.clientX));
    }
    function m(f) {
      var S, I;
      d.value && (d.value = !1, (I = (S = f.currentTarget).releasePointerCapture) == null || I.call(S, f.pointerId), l("change", s.modelValue));
    }
    function _(f) {
      if (s.disabled) return;
      const S = (s.max - s.min) / 10;
      let I = !0;
      switch (f.key) {
        case "ArrowRight":
        case "ArrowUp":
          u(s.modelValue + s.step, !0);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          u(s.modelValue - s.step, !0);
          break;
        case "PageUp":
          u(s.modelValue + S, !0);
          break;
        case "PageDown":
          u(s.modelValue - S, !0);
          break;
        case "Home":
          u(s.min, !0);
          break;
        case "End":
          u(s.max, !0);
          break;
        default:
          I = !1;
      }
      I && f.preventDefault();
    }
    return (f, S) => (o(), a("div", {
      class: L(["phlix-slider", { "is-disabled": t.disabled }]),
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
        onPointermove: b,
        onPointerup: m
      }, [
        n("div", {
          class: "phlix-slider__fill",
          style: Y({ width: c.value + "%" })
        }, null, 4),
        n("div", {
          class: "phlix-slider__thumb",
          style: Y({ left: c.value + "%" })
        }, null, 4)
      ], 544)
    ], 42, ri));
  }
}), Jc = /* @__PURE__ */ B(ci, [["__scopeId", "data-v-9ca92975"]]), di = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], ui = ["id"], vi = /* @__PURE__ */ M({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const s = t, l = e, r = ie();
    function d() {
      s.disabled || l("update:modelValue", !s.modelValue);
    }
    return (c, h) => (o(), a("span", {
      class: L(["phlix-switch", { "is-disabled": t.disabled }])
    }, [
      n("button", {
        type: "button",
        role: "switch",
        class: L(["phlix-switch__control", { "is-on": t.modelValue }]),
        "aria-checked": t.modelValue,
        "aria-label": t.label ? void 0 : "Toggle",
        "aria-labelledby": t.label ? C(r) : void 0,
        disabled: t.disabled,
        onClick: d
      }, [...h[0] || (h[0] = [
        n("span", { class: "phlix-switch__thumb" }, null, -1)
      ])], 10, di),
      t.label ? (o(), a("label", {
        key: 0,
        id: C(r),
        class: "phlix-switch__label",
        onClick: d
      }, k(t.label), 9, ui)) : w("", !0)
    ], 2));
  }
}), Qc = /* @__PURE__ */ B(vi, [["__scopeId", "data-v-4631a106"]]), hi = ["disabled", "aria-pressed"], mi = { class: "phlix-chip__label" }, fi = ["disabled", "aria-label"], pi = /* @__PURE__ */ M({
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
    const s = t, l = e;
    function r() {
      s.disabled || (s.selected !== void 0 && l("update:selected", !s.selected), l("click"));
    }
    return (d, c) => (o(), a("span", {
      class: L(["phlix-chip", [`phlix-chip--${t.size}`, { "is-selected": t.selected, "is-disabled": t.disabled }]])
    }, [
      n("button", {
        type: "button",
        class: "phlix-chip__main",
        disabled: t.disabled,
        "aria-pressed": t.selected === void 0 ? void 0 : t.selected,
        onClick: r
      }, [
        t.icon ? (o(), O(G, {
          key: 0,
          name: t.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : w("", !0),
        n("span", mi, [
          U(d.$slots, "default", {}, void 0, !0)
        ])
      ], 8, hi),
      t.removable ? (o(), a("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: t.disabled,
        "aria-label": t.removeLabel,
        onClick: c[0] || (c[0] = (h) => l("remove"))
      }, [
        R(G, { name: "x" })
      ], 8, fi)) : w("", !0)
    ], 2));
  }
}), Xc = /* @__PURE__ */ B(pi, [["__scopeId", "data-v-d6cd193e"]]);
function Ue(t) {
  return t.map(
    (e) => typeof e == "object" ? e : { value: e, label: String(e) }
  );
}
function se(t, e, s) {
  var d;
  const l = t.length;
  if (l === 0) return -1;
  let r = e;
  for (let c = 0; c < l; c++)
    if (r = (r + s + l) % l, !((d = t[r]) != null && d.disabled)) return r;
  return e;
}
function me(t, e) {
  return e === "first" ? se(t, -1, 1) : se(t, 0, -1);
}
const gi = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "disabled"], _i = ["id", "aria-label"], bi = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], ki = { class: "phlix-select__check" }, yi = /* @__PURE__ */ M({
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
    const s = t, l = e, r = P(() => Ue(s.options)), d = ie(), c = g(!1), h = g(-1), p = g(null), u = g(null);
    let i = "", v;
    const b = P(() => r.value.findIndex((y) => y.value === s.modelValue)), m = P(() => {
      var y;
      return ((y = r.value[b.value]) == null ? void 0 : y.label) ?? "";
    }), _ = P(() => h.value >= 0 ? `${d}-opt-${h.value}` : void 0);
    function f() {
      s.disabled || c.value || (c.value = !0, h.value = b.value >= 0 ? b.value : me(r.value, "first"), ne(K));
    }
    function S() {
      c.value = !1;
    }
    function I(y) {
      var T, j;
      const $ = r.value[y];
      !$ || $.disabled || ($.value !== s.modelValue && (l("update:modelValue", $.value), l("change", $.value)), S(), (j = (T = p.value) == null ? void 0 : T.querySelector(".phlix-select__trigger")) == null || j.focus());
    }
    function E(y) {
      h.value = se(r.value, h.value, y), ne(K);
    }
    function K() {
      var $, T;
      const y = ($ = u.value) == null ? void 0 : $.querySelector(".is-active");
      (T = y == null ? void 0 : y.scrollIntoView) == null || T.call(y, { block: "nearest" });
    }
    function q(y) {
      if (!s.disabled)
        switch (y.key) {
          case "ArrowDown":
            y.preventDefault(), c.value ? E(1) : f();
            break;
          case "ArrowUp":
            y.preventDefault(), c.value ? E(-1) : f();
            break;
          case "Home":
            c.value && (y.preventDefault(), h.value = me(r.value, "first"), ne(K));
            break;
          case "End":
            c.value && (y.preventDefault(), h.value = me(r.value, "last"), ne(K));
            break;
          case "Enter":
          case " ":
            y.preventDefault(), c.value && h.value >= 0 ? I(h.value) : f();
            break;
          case "Escape":
            c.value && (y.preventDefault(), S());
            break;
          case "Tab":
            S();
            break;
          default:
            y.key.length === 1 && !y.metaKey && !y.ctrlKey && !y.altKey && N(y.key);
        }
    }
    function N(y) {
      c.value || f(), i += y.toLowerCase(), clearTimeout(v), v = setTimeout(() => i = "", 600);
      const $ = r.value.findIndex((T) => !T.disabled && T.label.toLowerCase().startsWith(i));
      $ >= 0 && (h.value = $, ne(K));
    }
    function A(y) {
      c.value && p.value && !p.value.contains(y.target) && S();
    }
    return oe(c, (y) => {
      y ? document.addEventListener("pointerdown", A, !0) : document.removeEventListener("pointerdown", A, !0);
    }), le(() => {
      document.removeEventListener("pointerdown", A, !0), clearTimeout(v);
    }), (y, $) => (o(), a("div", {
      ref_key: "rootEl",
      ref: p,
      class: L(["phlix-select", { "is-open": c.value, "is-disabled": t.disabled }])
    }, [
      n("button", {
        type: "button",
        class: "phlix-select__trigger",
        "aria-haspopup": "listbox",
        "aria-expanded": c.value,
        "aria-controls": c.value ? `${C(d)}-list` : void 0,
        "aria-activedescendant": c.value ? _.value : void 0,
        "aria-label": t.label,
        disabled: t.disabled,
        onClick: $[0] || ($[0] = (T) => c.value ? S() : f()),
        onKeydown: q
      }, [
        n("span", {
          class: L(["phlix-select__value", { "is-placeholder": b.value < 0 }])
        }, k(b.value >= 0 ? m.value : t.placeholder), 3),
        R(G, {
          name: "chevron-down",
          class: "phlix-select__caret"
        })
      ], 40, gi),
      Z(n("ul", {
        id: `${C(d)}-list`,
        ref_key: "listEl",
        ref: u,
        class: "phlix-select__list",
        role: "listbox",
        "aria-label": t.label
      }, [
        (o(!0), a(z, null, D(r.value, (T, j) => (o(), a("li", {
          id: `${C(d)}-opt-${j}`,
          key: T.value,
          class: L(["phlix-select__option", { "is-active": j === h.value, "is-disabled": T.disabled }]),
          role: "option",
          "aria-selected": T.value === t.modelValue,
          "aria-disabled": T.disabled || void 0,
          onClick: (ee) => I(j),
          onPointermove: (ee) => !T.disabled && (h.value = j)
        }, [
          n("span", ki, [
            T.value === t.modelValue ? (o(), O(G, {
              key: 0,
              name: "check"
            })) : w("", !0)
          ]),
          Q(" " + k(T.label), 1)
        ], 42, bi))), 128))
      ], 8, _i), [
        [Ie, c.value]
      ])
    ], 2));
  }
}), Wc = /* @__PURE__ */ B(yi, [["__scopeId", "data-v-db34d47a"]]), wi = { class: "phlix-combobox__field" }, $i = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "placeholder", "disabled", "value"], xi = ["id", "aria-label"], Ci = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], Ii = { class: "phlix-combobox__check" }, Si = {
  key: 0,
  class: "phlix-combobox__empty",
  role: "presentation"
}, Mi = /* @__PURE__ */ M({
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
    const s = t, l = e, r = P(() => Ue(s.options)), d = ie(), c = g(!1), h = g(-1), p = g(""), u = g(!1), i = g(null), v = g(null), b = g(null), m = P(() => {
      var $;
      return (($ = r.value.find((T) => T.value === s.modelValue)) == null ? void 0 : $.label) ?? "";
    }), _ = P(() => {
      if (!u.value || p.value.trim() === "") return r.value;
      const $ = p.value.toLowerCase();
      return r.value.filter((T) => T.label.toLowerCase().includes($));
    }), f = P(() => h.value >= 0 ? `${d}-opt-${h.value}` : void 0);
    oe(
      () => s.modelValue,
      () => {
        c.value || (p.value = m.value);
      },
      { immediate: !0 }
    );
    function S() {
      s.disabled || c.value || (c.value = !0, h.value = _.value.findIndex(($) => $.value === s.modelValue), h.value < 0 && (h.value = _.value.findIndex(($) => !$.disabled)), ne(q));
    }
    function I() {
      p.value = m.value, u.value = !1, c.value = !1;
    }
    function E($) {
      var j;
      const T = _.value[$];
      !T || T.disabled || (T.value !== s.modelValue && (l("update:modelValue", T.value), l("change", T.value)), p.value = T.label, u.value = !1, c.value = !1, (j = v.value) == null || j.focus());
    }
    function K($) {
      _.value.length !== 0 && (h.value = se(_.value, h.value, $), ne(q));
    }
    function q() {
      var $, T, j;
      (j = (T = ($ = b.value) == null ? void 0 : $.querySelector(".is-active")) == null ? void 0 : T.scrollIntoView) == null || j.call(T, { block: "nearest" });
    }
    function N($) {
      p.value = $.target.value, u.value = !0, c.value = !0, h.value = me(_.value, "first");
    }
    function A($) {
      if (!s.disabled)
        switch ($.key) {
          case "ArrowDown":
            $.preventDefault(), c.value ? K(1) : S();
            break;
          case "ArrowUp":
            $.preventDefault(), c.value ? K(-1) : S();
            break;
          case "Enter":
            c.value && h.value >= 0 && ($.preventDefault(), E(h.value));
            break;
          case "Escape":
            c.value && ($.preventDefault(), I());
            break;
          case "Tab":
            c.value && I();
            break;
        }
    }
    function y($) {
      c.value && i.value && !i.value.contains($.target) && I();
    }
    return oe(c, ($) => {
      $ ? document.addEventListener("pointerdown", y, !0) : document.removeEventListener("pointerdown", y, !0);
    }), le(() => document.removeEventListener("pointerdown", y, !0)), ($, T) => (o(), a("div", {
      ref_key: "rootEl",
      ref: i,
      class: L(["phlix-combobox", { "is-open": c.value, "is-disabled": t.disabled }])
    }, [
      n("div", wi, [
        R(G, {
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
          "aria-controls": c.value ? `${C(d)}-list` : void 0,
          "aria-activedescendant": c.value ? f.value : void 0,
          "aria-label": t.label,
          placeholder: t.placeholder,
          disabled: t.disabled,
          value: p.value,
          onInput: N,
          onFocus: S,
          onKeydown: A
        }, null, 40, $i),
        R(G, {
          name: "chevron-down",
          class: "phlix-combobox__caret"
        })
      ]),
      Z(n("ul", {
        id: `${C(d)}-list`,
        ref_key: "listEl",
        ref: b,
        class: "phlix-combobox__list",
        role: "listbox",
        "aria-label": t.label
      }, [
        (o(!0), a(z, null, D(_.value, (j, ee) => (o(), a("li", {
          id: `${C(d)}-opt-${ee}`,
          key: j.value,
          class: L(["phlix-combobox__option", { "is-active": ee === h.value, "is-disabled": j.disabled }]),
          role: "option",
          "aria-selected": j.value === t.modelValue,
          "aria-disabled": j.disabled || void 0,
          onClick: (be) => E(ee),
          onPointermove: (be) => !j.disabled && (h.value = ee)
        }, [
          n("span", Ii, [
            j.value === t.modelValue ? (o(), O(G, {
              key: 0,
              name: "check"
            })) : w("", !0)
          ]),
          Q(" " + k(j.label), 1)
        ], 42, Ci))), 128)),
        _.value.length === 0 ? (o(), a("li", Si, "No matches")) : w("", !0)
      ], 8, xi), [
        [Ie, c.value]
      ])
    ], 2));
  }
}), Zc = /* @__PURE__ */ B(Mi, [["__scopeId", "data-v-337aab6e"]]), Bi = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
let ue = 0, Ne = "";
function Ti() {
  ue === 0 && (Ne = document.body.style.overflow, document.body.style.overflow = "hidden"), ue++;
}
function Pe() {
  ue !== 0 && (ue--, ue === 0 && (document.body.style.overflow = Ne));
}
function He(t, e, s = {}) {
  const l = s.lockScroll ?? !0;
  let r = null, d = !1;
  function c() {
    const i = t.value;
    return i ? Array.from(i.querySelectorAll(Bi)).filter(
      (v) => !v.hasAttribute("hidden") && v.getAttribute("aria-hidden") !== "true"
    ) : [];
  }
  function h(i) {
    var f;
    if (!e.value || !t.value) return;
    if (i.key === "Escape") {
      (f = s.onEscape) != null && f.call(s) && i.preventDefault();
      return;
    }
    if (i.key !== "Tab") return;
    const v = c();
    if (v.length === 0) {
      i.preventDefault(), t.value.focus();
      return;
    }
    const b = v[0], m = v[v.length - 1], _ = document.activeElement;
    t.value.contains(_) ? i.shiftKey && _ === b ? (i.preventDefault(), m.focus()) : !i.shiftKey && _ === m && (i.preventDefault(), b.focus()) : (i.preventDefault(), b.focus());
  }
  function p() {
    r = document.activeElement, l && (Ti(), d = !0), document.addEventListener("keydown", h, !0), ne(() => {
      var v;
      (v = c()[0] ?? t.value) == null || v.focus();
    });
  }
  function u() {
    var i;
    document.removeEventListener("keydown", h, !0), d && (Pe(), d = !1), r && document.contains(r) && ((i = r.focus) == null || i.call(r)), r = null;
  }
  oe(e, (i) => i ? p() : u(), { immediate: !0 }), le(() => {
    document.removeEventListener("keydown", h, !0), d && (Pe(), d = !1);
  });
}
const Ei = ["aria-labelledby"], Vi = {
  key: 0,
  class: "phlix-modal__header"
}, Pi = ["id"], Ai = { class: "phlix-modal__body" }, Li = {
  key: 1,
  class: "phlix-modal__footer"
}, Ri = /* @__PURE__ */ M({
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
    const s = t, l = e, r = g(s.modelValue);
    oe(() => s.modelValue, (u) => r.value = u);
    const d = g(null), c = ie();
    function h() {
      l("update:modelValue", !1), l("close");
    }
    function p() {
      s.dismissible && h();
    }
    return He(d, r, {
      onEscape: () => s.dismissible ? (h(), !0) : !1
    }), (u, i) => (o(), O(Se, { to: "body" }, [
      R(pe, { name: "phlix-modal" }, {
        default: J(() => [
          t.modelValue ? (o(), a("div", {
            key: 0,
            class: "phlix-modal",
            onPointerdown: ae(p, ["self"])
          }, [
            n("div", {
              ref_key: "panelEl",
              ref: d,
              class: L(["phlix-modal__panel", `phlix-modal__panel--${t.size}`]),
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": t.title ? C(c) : void 0,
              tabindex: "-1"
            }, [
              t.title || !t.hideClose ? (o(), a("header", Vi, [
                t.title ? (o(), a("h2", {
                  key: 0,
                  id: C(c),
                  class: "phlix-modal__title"
                }, k(t.title), 9, Pi)) : w("", !0),
                t.hideClose ? w("", !0) : (o(), O(Be, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  class: "phlix-modal__close",
                  onClick: h
                }))
              ])) : w("", !0),
              n("div", Ai, [
                U(u.$slots, "default", {}, void 0, !0)
              ]),
              u.$slots.footer ? (o(), a("footer", Li, [
                U(u.$slots, "footer", {}, void 0, !0)
              ])) : w("", !0)
            ], 10, Ei)
          ], 32)) : w("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), ed = /* @__PURE__ */ B(Ri, [["__scopeId", "data-v-ad69ec41"]]), ji = ["aria-labelledby"], Fi = {
  key: 0,
  class: "phlix-sheet__header"
}, zi = ["id"], Di = { class: "phlix-sheet__body" }, Ui = {
  key: 1,
  class: "phlix-sheet__footer"
}, Ni = /* @__PURE__ */ M({
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
    const s = t, l = e, r = g(s.modelValue);
    oe(() => s.modelValue, (u) => r.value = u);
    const d = g(null), c = ie();
    function h() {
      l("update:modelValue", !1), l("close");
    }
    function p() {
      s.dismissible && h();
    }
    return He(d, r, {
      onEscape: () => s.dismissible ? (h(), !0) : !1
    }), (u, i) => (o(), O(Se, { to: "body" }, [
      R(pe, {
        name: `phlix-sheet-${t.side}`
      }, {
        default: J(() => [
          t.modelValue ? (o(), a("div", {
            key: 0,
            class: L(["phlix-sheet", `phlix-sheet--${t.side}`]),
            onPointerdown: ae(p, ["self"])
          }, [
            n("aside", {
              ref_key: "panelEl",
              ref: d,
              class: "phlix-sheet__panel",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": t.title ? C(c) : void 0,
              tabindex: "-1"
            }, [
              t.title || !t.hideClose ? (o(), a("header", Fi, [
                t.title ? (o(), a("h2", {
                  key: 0,
                  id: C(c),
                  class: "phlix-sheet__title"
                }, k(t.title), 9, zi)) : w("", !0),
                t.hideClose ? w("", !0) : (o(), O(Be, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  onClick: h
                }))
              ])) : w("", !0),
              n("div", Di, [
                U(u.$slots, "default", {}, void 0, !0)
              ]),
              u.$slots.footer ? (o(), a("footer", Ui, [
                U(u.$slots, "footer", {}, void 0, !0)
              ])) : w("", !0)
            ], 8, ji)
          ], 34)) : w("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ]));
  }
}), td = /* @__PURE__ */ B(Ni, [["__scopeId", "data-v-6960f9fb"]]), Hi = ["id"], Oi = /* @__PURE__ */ M({
  __name: "Tooltip",
  props: {
    text: {},
    placement: { default: "top" },
    delay: { default: 300 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, s = ie(), l = g(!1), r = g(null);
    let d;
    function c() {
      var u;
      return ((u = r.value) == null ? void 0 : u.firstElementChild) ?? null;
    }
    function h() {
      e.disabled || (clearTimeout(d), d = setTimeout(() => {
        var u;
        l.value = !0, (u = c()) == null || u.setAttribute("aria-describedby", s);
      }, e.delay));
    }
    function p() {
      var u;
      clearTimeout(d), l.value = !1, (u = c()) == null || u.removeAttribute("aria-describedby");
    }
    return le(() => clearTimeout(d)), (u, i) => (o(), a("span", {
      ref_key: "wrapEl",
      ref: r,
      class: "phlix-tooltip-wrap",
      onMouseenter: h,
      onMouseleave: p,
      onFocusin: h,
      onFocusout: p,
      onKeydown: Qe(p, ["esc"])
    }, [
      U(u.$slots, "default", {}, void 0, !0),
      R(pe, { name: "phlix-tooltip" }, {
        default: J(() => [
          l.value && (t.text || u.$slots.content) ? (o(), a("span", {
            key: 0,
            id: C(s),
            role: "tooltip",
            class: L(["phlix-tooltip", `phlix-tooltip--${t.placement}`])
          }, [
            U(u.$slots, "content", {}, () => [
              Q(k(t.text), 1)
            ], !0)
          ], 10, Hi)) : w("", !0)
        ]),
        _: 3
      })
    ], 544));
  }
}), nd = /* @__PURE__ */ B(Oi, [["__scopeId", "data-v-bdb87991"]]), Ki = ge("phlix-toast", () => {
  const t = g([]), e = /* @__PURE__ */ new Map();
  let s = 0;
  function l(i) {
    const v = e.get(i);
    v && (clearTimeout(v), e.delete(i)), t.value = t.value.filter((b) => b.id !== i);
  }
  function r(i) {
    const v = ++s, b = { tone: "neutral", duration: 5e3, ...i, id: v };
    return t.value.push(b), b.duration > 0 && e.set(v, setTimeout(() => l(v), b.duration)), v;
  }
  function d() {
    e.forEach((i) => clearTimeout(i)), e.clear(), t.value = [];
  }
  return { toasts: t, show: r, dismiss: l, clear: d, success: (i, v) => r({ message: i, tone: "success", ...v }), error: (i, v) => r({ message: i, tone: "error", duration: 8e3, ...v }), warning: (i, v) => r({ message: i, tone: "warning", ...v }), info: (i, v) => r({ message: i, tone: "info", ...v }) };
}), Gi = ["role"], qi = { class: "phlix-toast__content" }, Yi = {
  key: 0,
  class: "phlix-toast__title"
}, Ji = { class: "phlix-toast__message" }, Qi = ["onClick"], Xi = /* @__PURE__ */ M({
  __name: "ToastHost",
  props: {
    position: { default: "bottom" }
  },
  setup(t) {
    const e = Ki(), s = {
      neutral: "info",
      success: "success",
      warning: "alert",
      error: "error",
      info: "info"
    }, l = (r) => r.icon ?? s[r.tone];
    return W(() => {
    }), le(() => {
    }), (r, d) => (o(), O(Se, { to: "body" }, [
      n("div", {
        class: L(["phlix-toasts", `phlix-toasts--${t.position}`]),
        role: "region",
        "aria-label": "Notifications"
      }, [
        R(Xe, { name: "phlix-toast" }, {
          default: J(() => [
            (o(!0), a(z, null, D(C(e).toasts, (c) => (o(), a("div", {
              key: c.id,
              class: L(["phlix-toast", `phlix-toast--${c.tone}`]),
              role: c.tone === "error" ? "alert" : "status"
            }, [
              R(G, {
                name: l(c),
                class: "phlix-toast__icon"
              }, null, 8, ["name"]),
              n("div", qi, [
                c.title ? (o(), a("p", Yi, k(c.title), 1)) : w("", !0),
                n("p", Ji, k(c.message), 1)
              ]),
              c.action ? (o(), a("button", {
                key: 0,
                type: "button",
                class: "phlix-toast__action",
                onClick: (h) => {
                  c.action.onClick(), C(e).dismiss(c.id);
                }
              }, k(c.action.label), 9, Qi)) : w("", !0),
              R(Be, {
                name: "x",
                label: "Dismiss",
                size: "sm",
                class: "phlix-toast__close",
                onClick: (h) => C(e).dismiss(c.id)
              }, null, 8, ["onClick"])
            ], 10, Gi))), 128))
          ]),
          _: 1
        })
      ], 2)
    ]));
  }
}), sd = /* @__PURE__ */ B(Xi, [["__scopeId", "data-v-df4e2232"]]), Wi = {
  key: 0,
  class: "phlix-skel-text",
  "aria-hidden": "true"
}, Zi = /* @__PURE__ */ M({
  __name: "Skeleton",
  props: {
    variant: { default: "rect" },
    width: {},
    height: {},
    radius: {},
    lines: { default: 1 }
  },
  setup(t) {
    return (e, s) => t.variant === "text" ? (o(), a("div", Wi, [
      (o(!0), a(z, null, D(t.lines, (l) => (o(), a("span", {
        key: l,
        class: "phlix-skel phlix-skel--text",
        style: Y({ width: l === t.lines && t.lines > 1 ? "60%" : t.width })
      }, null, 4))), 128))
    ])) : (o(), a("span", {
      key: 1,
      class: L(["phlix-skel", `phlix-skel--${t.variant}`]),
      "aria-hidden": "true",
      style: Y({ width: t.width, height: t.height, borderRadius: t.radius })
    }, null, 6));
  }
}), od = /* @__PURE__ */ B(Zi, [["__scopeId", "data-v-c34e4066"]]), er = ["aria-label"], tr = /* @__PURE__ */ M({
  __name: "Spinner",
  props: {
    size: {},
    label: { default: "Loading" }
  },
  setup(t) {
    const e = t, s = P(
      () => e.size === void 0 ? void 0 : typeof e.size == "number" ? `${e.size}px` : e.size
    );
    return (l, r) => (o(), a("span", {
      class: "phlix-spinner",
      role: "status",
      "aria-label": t.label,
      style: Y(s.value ? { fontSize: s.value } : void 0)
    }, [
      R(G, {
        name: "spinner",
        class: "phlix-spinner__icon"
      })
    ], 12, er));
  }
}), ad = /* @__PURE__ */ B(tr, [["__scopeId", "data-v-2e0507dd"]]), nr = {
  class: "phlix-empty",
  role: "status"
}, sr = { class: "phlix-empty__icon" }, or = { class: "phlix-empty__title" }, ar = {
  key: 0,
  class: "phlix-empty__desc"
}, lr = {
  key: 1,
  class: "phlix-empty__actions"
}, ir = /* @__PURE__ */ M({
  __name: "EmptyState",
  props: {
    icon: { default: "film" },
    title: {},
    description: {}
  },
  setup(t) {
    return (e, s) => (o(), a("div", nr, [
      n("span", sr, [
        R(G, { name: t.icon }, null, 8, ["name"])
      ]),
      n("h3", or, k(t.title), 1),
      t.description || e.$slots.default ? (o(), a("p", ar, [
        U(e.$slots, "default", {}, () => [
          Q(k(t.description), 1)
        ], !0)
      ])) : w("", !0),
      e.$slots.actions ? (o(), a("div", lr, [
        U(e.$slots, "actions", {}, void 0, !0)
      ])) : w("", !0)
    ]));
  }
}), ld = /* @__PURE__ */ B(ir, [["__scopeId", "data-v-9c6d2458"]]), rr = { class: "phlix-tabs" }, cr = ["aria-label"], dr = ["id", "aria-selected", "aria-controls", "tabindex", "disabled", "onClick"], ur = ["id", "aria-labelledby"], vr = /* @__PURE__ */ M({
  __name: "Tabs",
  props: {
    modelValue: {},
    tabs: {},
    label: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const s = t, l = e, r = ie(), d = g(null), c = P(() => s.tabs.findIndex((m) => m.value === s.modelValue)), h = (m) => `${r}-tab-${m}`, p = (m) => `${r}-panel-${m}`, u = P(() => s.tabs.map((m) => ({ value: m.value, label: m.label, disabled: m.disabled })));
    function i(m) {
      const _ = s.tabs.find((f) => f.value === m);
      !_ || _.disabled || m !== s.modelValue && l("update:modelValue", m);
    }
    function v(m) {
      var _, f;
      (f = (_ = d.value) == null ? void 0 : _.querySelectorAll('[role="tab"]')[m]) == null || f.focus();
    }
    function b(m) {
      let _ = -1;
      switch (m.key) {
        case "ArrowRight":
        case "ArrowDown":
          _ = se(u.value, c.value, 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          _ = se(u.value, c.value, -1);
          break;
        case "Home":
          _ = se(u.value, -1, 1);
          break;
        case "End":
          _ = se(u.value, 0, -1);
          break;
        default:
          return;
      }
      _ >= 0 && (m.preventDefault(), i(s.tabs[_].value), v(_));
    }
    return (m, _) => (o(), a("div", rr, [
      n("div", {
        ref_key: "listEl",
        ref: d,
        class: "phlix-tabs__list",
        role: "tablist",
        "aria-label": t.label,
        onKeydown: b
      }, [
        (o(!0), a(z, null, D(t.tabs, (f) => (o(), a("button", {
          id: h(f.value),
          key: f.value,
          type: "button",
          role: "tab",
          class: L(["phlix-tabs__tab", { "is-active": f.value === t.modelValue }]),
          "aria-selected": f.value === t.modelValue,
          "aria-controls": p(f.value),
          tabindex: f.value === t.modelValue ? 0 : -1,
          disabled: f.disabled,
          onClick: (S) => i(f.value)
        }, [
          f.icon ? (o(), O(G, {
            key: 0,
            name: f.icon,
            class: "phlix-tabs__icon"
          }, null, 8, ["name"])) : w("", !0),
          Q(" " + k(f.label), 1)
        ], 10, dr))), 128))
      ], 40, cr),
      t.modelValue ? (o(), a("div", {
        key: 0,
        id: p(t.modelValue),
        class: "phlix-tabs__panel",
        role: "tabpanel",
        "aria-labelledby": h(t.modelValue),
        tabindex: "0"
      }, [
        U(m.$slots, t.modelValue, {}, () => [
          U(m.$slots, "default", {}, void 0, !0)
        ], !0)
      ], 8, ur)) : w("", !0)
    ]));
  }
}), id = /* @__PURE__ */ B(vr, [["__scopeId", "data-v-95493097"]]), hr = { class: "phlix-kbd" }, mr = {
  key: 1,
  class: "phlix-kbd__key"
}, fr = /* @__PURE__ */ M({
  __name: "Kbd",
  props: {
    keys: {}
  },
  setup(t) {
    const e = t, s = P(() => e.keys === void 0 ? [] : Array.isArray(e.keys) ? e.keys : [e.keys]);
    return (l, r) => (o(), a("span", hr, [
      s.value.length ? (o(!0), a(z, { key: 0 }, D(s.value, (d, c) => (o(), a("kbd", {
        key: c,
        class: "phlix-kbd__key"
      }, k(d), 1))), 128)) : (o(), a("kbd", mr, [
        U(l.$slots, "default", {}, void 0, !0)
      ]))
    ]));
  }
}), rd = /* @__PURE__ */ B(fr, [["__scopeId", "data-v-5e5c4a8a"]]), pr = /* @__PURE__ */ M({
  __name: "Reveal",
  props: {
    tag: { default: "div" },
    delay: { default: 0 },
    y: { default: 12 },
    whenVisible: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, s = g(null), l = g(!1), r = g(!1);
    let d = null;
    const c = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return W(() => {
      if (c) {
        l.value = !0;
        return;
      }
      e.whenVisible && typeof IntersectionObserver < "u" ? (d = new IntersectionObserver(
        (h) => {
          h.some((p) => p.isIntersecting) && (l.value = !0, d == null || d.disconnect(), d = null);
        },
        { threshold: 0.1 }
      ), s.value && d.observe(s.value)) : requestAnimationFrame(() => requestAnimationFrame(() => l.value = !0));
    }), le(() => {
      d == null || d.disconnect(), d = null;
    }), (h, p) => (o(), O(Le(t.tag), {
      ref_key: "el",
      ref: s,
      class: L(["phlix-reveal", { "is-revealed": l.value, "is-settled": r.value }]),
      style: Y({ "--reveal-delay": `${t.delay}ms`, "--reveal-y": `${t.y}px` }),
      onTransitionend: p[0] || (p[0] = (u) => r.value = !0)
    }, {
      default: J(() => [
        U(h.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 40, ["class", "style"]));
  }
}), cd = /* @__PURE__ */ B(pr, [["__scopeId", "data-v-162397f9"]]), gr = /* @__PURE__ */ M({
  __name: "PageTransition",
  props: {
    mode: { default: "fade" }
  },
  setup(t) {
    return (e, s) => (o(), O(pe, {
      name: `phlix-page-${t.mode}`,
      mode: "out-in"
    }, {
      default: J(() => [
        U(e.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 8, ["name"]));
  }
}), dd = /* @__PURE__ */ B(gr, [["__scopeId", "data-v-dafe74d0"]]), _r = { class: "library-scan-page" }, br = {
  key: 0,
  class: "loading"
}, kr = {
  key: 1,
  class: "error"
}, yr = {
  key: 2,
  class: "libraries-list"
}, wr = { class: "library-info" }, $r = { class: "library-name" }, xr = { class: "library-type" }, Cr = { class: "library-paths" }, Ir = { class: "library-meta" }, Sr = { key: 0 }, Mr = {
  key: 0,
  class: "scan-status"
}, Br = { class: "library-actions" }, Tr = ["onClick", "disabled"], Er = ["onClick", "disabled"], Vr = {
  key: 0,
  class: "empty-state"
}, Pr = /* @__PURE__ */ M({
  __name: "LibraryScanPage",
  setup(t) {
    const e = g([]), s = g({}), l = g(!0), r = g(null);
    async function d() {
      try {
        const v = await X.get("/api/v1/libraries");
        e.value = v.libraries || [];
        for (const b of e.value)
          c(b.id);
      } catch (v) {
        r.value = v instanceof Error ? v.message : "Failed to load libraries";
      } finally {
        l.value = !1;
      }
    }
    async function c(v) {
      try {
        const b = await X.get(`/api/v1/libraries/${v}/scan-status`);
        b.job && (s.value[v] = b.job);
      } catch {
      }
    }
    async function h(v) {
      try {
        await X.post(`/api/v1/libraries/${v}/scan`), await c(v);
      } catch (b) {
        r.value = b instanceof Error ? b.message : "Failed to trigger scan";
      }
    }
    async function p(v) {
      try {
        await X.post(`/api/v1/libraries/${v}/rescan`), await c(v);
      } catch (b) {
        r.value = b instanceof Error ? b.message : "Failed to trigger rescan";
      }
    }
    function u(v) {
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
    return W(() => {
      d();
    }), (v, b) => (o(), a("div", _r, [
      b[0] || (b[0] = n("div", { class: "scan-header" }, [
        n("h1", { class: "scan-title" }, "Library Scanner"),
        n("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      l.value ? (o(), a("div", br, "Loading libraries...")) : r.value ? (o(), a("div", kr, k(r.value), 1)) : (o(), a("div", yr, [
        (o(!0), a(z, null, D(e.value, (m) => {
          var _, f, S, I;
          return o(), a("div", {
            key: m.id,
            class: "library-card"
          }, [
            n("div", wr, [
              n("h3", $r, k(m.name), 1),
              n("span", xr, k(m.type), 1),
              n("p", Cr, k(m.paths.join(", ")), 1),
              n("div", Ir, [
                m.item_count !== void 0 ? (o(), a("span", Sr, k(m.item_count) + " items", 1)) : w("", !0),
                n("span", null, "Last scan: " + k(u(m.last_scan_at)), 1)
              ]),
              s.value[m.id] ? (o(), a("div", Mr, k(i(s.value[m.id])), 1)) : w("", !0)
            ]),
            n("div", Br, [
              n("button", {
                class: "btn btn-scan",
                onClick: (E) => h(m.id),
                disabled: ((_ = s.value[m.id]) == null ? void 0 : _.status) === "running" || ((f = s.value[m.id]) == null ? void 0 : f.status) === "queued"
              }, " Scan ", 8, Tr),
              n("button", {
                class: "btn btn-rescan",
                onClick: (E) => p(m.id),
                disabled: ((S = s.value[m.id]) == null ? void 0 : S.status) === "running" || ((I = s.value[m.id]) == null ? void 0 : I.status) === "queued"
              }, " Rescan ", 8, Er)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (o(), a("div", Vr, " No libraries configured. Add a library to get started. ")) : w("", !0)
      ]))
    ]));
  }
}), ud = /* @__PURE__ */ B(Pr, [["__scopeId", "data-v-62b3805e"]]), Ar = { class: "my-servers-page" }, Lr = {
  key: 0,
  class: "loading"
}, Rr = {
  key: 1,
  class: "error"
}, jr = {
  key: 2,
  class: "servers-list"
}, Fr = { class: "server-info" }, zr = { class: "server-name" }, Dr = { class: "server-url" }, Ur = { class: "server-meta" }, Nr = { key: 0 }, Hr = {
  key: 0,
  class: "empty-state"
}, Or = /* @__PURE__ */ M({
  __name: "MyServersPage",
  setup(t) {
    const e = g([]), s = g(!0), l = g(null);
    async function r() {
      try {
        const h = await X.get("/api/v1/servers");
        e.value = h.servers || [];
      } catch (h) {
        l.value = h instanceof Error ? h.message : "Failed to load servers";
      } finally {
        s.value = !1;
      }
    }
    function d(h) {
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
    return W(() => {
      r();
    }), (h, p) => (o(), a("div", Ar, [
      p[2] || (p[2] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "My Servers"),
        n("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      s.value ? (o(), a("div", Lr, "Loading servers...")) : l.value ? (o(), a("div", Rr, k(l.value), 1)) : (o(), a("div", jr, [
        (o(!0), a(z, null, D(e.value, (u) => (o(), a("div", {
          key: u.id,
          class: "server-card"
        }, [
          n("div", {
            class: "server-status",
            style: Y({ backgroundColor: d(u.status) })
          }, null, 4),
          n("div", Fr, [
            n("h3", zr, k(u.name), 1),
            n("p", Dr, k(u.url), 1),
            n("div", Ur, [
              n("span", null, k(u.owner), 1),
              u.library_count !== void 0 ? (o(), a("span", Nr, k(u.library_count) + " libraries", 1)) : w("", !0),
              n("span", null, "Last seen: " + k(c(u.last_seen)), 1)
            ])
          ]),
          p[0] || (p[0] = n("div", { class: "server-actions" }, [
            n("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", Hr, [...p[1] || (p[1] = [
          n("p", null, "No servers connected yet.", -1),
          n("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : w("", !0)
      ]))
    ]));
  }
}), vd = /* @__PURE__ */ B(Or, [["__scopeId", "data-v-b9237da4"]]), Kr = { class: "federation-page" }, Gr = {
  key: 0,
  class: "loading"
}, qr = {
  key: 1,
  class: "error"
}, Yr = {
  key: 2,
  class: "federation-content"
}, Jr = { class: "peers-section" }, Qr = { class: "peers-list" }, Xr = { class: "peer-info" }, Wr = { class: "peer-name" }, Zr = { class: "peer-url" }, ec = { class: "peer-meta" }, tc = { key: 0 }, nc = { class: "peer-actions" }, sc = ["onClick"], oc = {
  key: 1,
  class: "status-badge"
}, ac = {
  key: 0,
  class: "empty-state"
}, lc = { class: "add-peer-section" }, ic = /* @__PURE__ */ M({
  __name: "FederationPage",
  setup(t) {
    const e = g([]), s = g(!0), l = g(null);
    async function r() {
      try {
        const u = await X.get("/api/v1/federation/peers");
        e.value = u.peers || [];
      } catch (u) {
        l.value = u instanceof Error ? u.message : "Failed to load federation peers";
      } finally {
        s.value = !1;
      }
    }
    async function d(u) {
      try {
        await X.post("/api/v1/federation/connect", { url: u }), await r();
      } catch (i) {
        l.value = i instanceof Error ? i.message : "Failed to connect to peer";
      }
    }
    async function c(u) {
      try {
        await X.post(`/api/v1/federation/peers/${u}/disconnect`), await r();
      } catch (i) {
        l.value = i instanceof Error ? i.message : "Failed to disconnect peer";
      }
    }
    function h(u) {
      switch (u) {
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
    function p(u) {
      return u ? new Date(u).toLocaleString() : "Never";
    }
    return W(() => {
      r();
    }), (u, i) => (o(), a("div", Kr, [
      i[5] || (i[5] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Federation"),
        n("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      s.value ? (o(), a("div", Gr, "Loading federation peers...")) : l.value ? (o(), a("div", qr, k(l.value), 1)) : (o(), a("div", Yr, [
        n("div", Jr, [
          i[2] || (i[2] = n("h2", { class: "section-title" }, "Connected Peers", -1)),
          n("div", Qr, [
            (o(!0), a(z, null, D(e.value, (v) => (o(), a("div", {
              key: v.id,
              class: "peer-card"
            }, [
              n("div", {
                class: "peer-status",
                style: Y({ backgroundColor: h(v.status) })
              }, null, 4),
              n("div", Xr, [
                n("h3", Wr, k(v.name), 1),
                n("p", Zr, k(v.url), 1),
                n("div", ec, [
                  v.shared_libraries_count !== void 0 ? (o(), a("span", tc, k(v.shared_libraries_count) + " shared libraries", 1)) : w("", !0),
                  n("span", null, "Last sync: " + k(p(v.last_sync)), 1)
                ])
              ]),
              n("div", nc, [
                v.status === "connected" ? (o(), a("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (b) => c(v.id)
                }, " Disconnect ", 8, sc)) : v.status === "pending" ? (o(), a("span", oc, "Pending")) : w("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (o(), a("div", ac, [...i[1] || (i[1] = [
              n("p", null, "No federation peers connected.", -1)
            ])])) : w("", !0)
          ])
        ]),
        n("div", lc, [
          i[4] || (i[4] = n("h2", { class: "section-title" }, "Add Peer", -1)),
          n("form", {
            class: "add-peer-form",
            onSubmit: i[0] || (i[0] = ae((v) => d(""), ["prevent"]))
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
}), hd = /* @__PURE__ */ B(ic, [["__scopeId", "data-v-91ba2781"]]), rc = { class: "manage-shares-page" }, cc = {
  key: 0,
  class: "loading"
}, dc = {
  key: 1,
  class: "error"
}, uc = {
  key: 2,
  class: "shares-list"
}, vc = { class: "share-info" }, hc = { class: "share-library" }, mc = { class: "share-meta" }, fc = {
  key: 0,
  class: "expired-badge"
}, pc = { class: "share-dates" }, gc = { key: 0 }, _c = { class: "share-actions" }, bc = ["onClick"], kc = {
  key: 0,
  class: "empty-state"
}, yc = /* @__PURE__ */ M({
  __name: "ManageSharesPage",
  setup(t) {
    const e = g([]), s = g(!0), l = g(null);
    async function r() {
      try {
        const p = await X.get("/api/v1/shares");
        e.value = p.shares || [];
      } catch (p) {
        l.value = p instanceof Error ? p.message : "Failed to load shares";
      } finally {
        s.value = !1;
      }
    }
    async function d(p) {
      try {
        await X.delete(`/api/v1/shares/${p}`), await r();
      } catch (u) {
        l.value = u instanceof Error ? u.message : "Failed to revoke share";
      }
    }
    function c(p) {
      return new Date(p).toLocaleString();
    }
    function h(p) {
      return p ? new Date(p) < /* @__PURE__ */ new Date() : !1;
    }
    return W(() => {
      r();
    }), (p, u) => (o(), a("div", rc, [
      u[1] || (u[1] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Manage Shares"),
        n("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      s.value ? (o(), a("div", cc, "Loading shares...")) : l.value ? (o(), a("div", dc, k(l.value), 1)) : (o(), a("div", uc, [
        (o(!0), a(z, null, D(e.value, (i) => (o(), a("div", {
          key: i.id,
          class: "share-card"
        }, [
          n("div", vc, [
            n("h3", hc, k(i.library_name), 1),
            n("div", mc, [
              n("span", null, "Shared with: " + k(i.shared_with), 1),
              n("span", {
                class: L(["permission-badge", i.permissions])
              }, k(i.permissions), 3),
              i.expires_at && h(i.expires_at) ? (o(), a("span", fc, "Expired")) : w("", !0)
            ]),
            n("p", pc, [
              Q(" Created: " + k(c(i.created_at)) + " ", 1),
              i.expires_at ? (o(), a("span", gc, " | Expires: " + k(c(i.expires_at)), 1)) : w("", !0)
            ])
          ]),
          n("div", _c, [
            n("button", {
              class: "btn btn-danger",
              onClick: (v) => d(i.id)
            }, "Revoke", 8, bc)
          ])
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", kc, [...u[0] || (u[0] = [
          n("p", null, "No library shares found.", -1)
        ])])) : w("", !0)
      ]))
    ]));
  }
}), md = /* @__PURE__ */ B(yc, [["__scopeId", "data-v-bd8771ac"]]), wc = { class: "audit-logs-page" }, $c = {
  key: 0,
  class: "loading"
}, xc = {
  key: 1,
  class: "error"
}, Cc = {
  key: 2,
  class: "logs-container"
}, Ic = { class: "logs-list" }, Sc = { class: "log-content" }, Mc = { class: "log-header" }, Bc = { class: "log-action" }, Tc = { class: "log-actor" }, Ec = { class: "log-time" }, Vc = {
  key: 0,
  class: "log-target"
}, Pc = {
  key: 1,
  class: "log-details"
}, Ac = {
  key: 2,
  class: "log-ip"
}, Lc = {
  key: 0,
  class: "empty-state"
}, Rc = {
  key: 0,
  class: "pagination"
}, jc = ["disabled"], Fc = { class: "page-info" }, zc = ["disabled"], Dc = /* @__PURE__ */ M({
  __name: "AuditLogsPage",
  setup(t) {
    const e = g([]), s = g(!0), l = g(null), r = g(1), d = g(1);
    async function c(i = 1) {
      try {
        s.value = !0;
        const v = await X.get(
          "/api/v1/audit-logs",
          { page: String(i) }
        );
        e.value = v.logs || [], r.value = v.page || 1, d.value = v.total_pages || 1;
      } catch (v) {
        l.value = v instanceof Error ? v.message : "Failed to load audit logs";
      } finally {
        s.value = !1;
      }
    }
    function h(i) {
      return new Date(i).toLocaleString();
    }
    function p(i) {
      return i.includes("create") || i.includes("add") ? "#22c55e" : i.includes("delete") || i.includes("remove") ? "#ef4444" : i.includes("update") || i.includes("edit") ? "#3b82f6" : i.includes("login") || i.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function u(i) {
      return i.includes("create") || i.includes("add") ? "+" : i.includes("delete") || i.includes("remove") ? "-" : i.includes("update") || i.includes("edit") ? "~" : i.includes("login") || i.includes("auth") ? "@" : "#";
    }
    return W(() => {
      c();
    }), (i, v) => (o(), a("div", wc, [
      v[3] || (v[3] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Audit Logs"),
        n("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      s.value ? (o(), a("div", $c, "Loading audit logs...")) : l.value ? (o(), a("div", xc, k(l.value), 1)) : (o(), a("div", Cc, [
        n("div", Ic, [
          (o(!0), a(z, null, D(e.value, (b) => (o(), a("div", {
            key: b.id,
            class: "log-entry"
          }, [
            n("div", {
              class: "log-icon",
              style: Y({ backgroundColor: p(b.action) })
            }, k(u(b.action)), 5),
            n("div", Sc, [
              n("div", Mc, [
                n("span", Bc, k(b.action), 1),
                n("span", Tc, k(b.actor), 1),
                n("span", Ec, k(h(b.created_at)), 1)
              ]),
              b.target ? (o(), a("p", Vc, "Target: " + k(b.target), 1)) : w("", !0),
              b.details ? (o(), a("p", Pc, k(b.details), 1)) : w("", !0),
              b.ip_address ? (o(), a("span", Ac, "IP: " + k(b.ip_address), 1)) : w("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (o(), a("div", Lc, [...v[2] || (v[2] = [
            n("p", null, "No audit logs found.", -1)
          ])])) : w("", !0)
        ]),
        d.value > 1 ? (o(), a("div", Rc, [
          n("button", {
            class: "btn btn-secondary",
            disabled: r.value <= 1,
            onClick: v[0] || (v[0] = (b) => c(r.value - 1))
          }, " Previous ", 8, jc),
          n("span", Fc, "Page " + k(r.value) + " of " + k(d.value), 1),
          n("button", {
            class: "btn btn-secondary",
            disabled: r.value >= d.value,
            onClick: v[1] || (v[1] = (b) => c(r.value + 1))
          }, " Next ", 8, zc)
        ])) : w("", !0)
      ]))
    ]));
  }
}), fd = /* @__PURE__ */ B(Dc, [["__scopeId", "data-v-05910fd9"]]);
export {
  _e as ApiClient,
  Tt as ApiError,
  Gc as AppBackdrop,
  vt as AppLayout,
  fd as AuditLogsPage,
  Yc as Badge,
  En as BrowsePage,
  qc as Button,
  Xc as Chip,
  Zc as Combobox,
  de as DEFAULT_PREFERENCES,
  ld as EmptyState,
  hd as FederationPage,
  $n as FilterBar,
  G as Icon,
  Be as IconButton,
  rd as Kbd,
  ud as LibraryScanPage,
  Zn as LocalStorageTokenStore,
  rs as LoginForm,
  vs as LoginPage,
  md as ManageSharesPage,
  Kt as MediaCard,
  Xt as MediaGrid,
  ed as Modal,
  vd as MyServersPage,
  dd as PageTransition,
  Ct as PhlixApp,
  qn as Player,
  Wn as PlayerPage,
  cd as Reveal,
  Wc as Select,
  Ns as SettingsForm,
  Ks as SettingsPage,
  td as Sheet,
  xs as SignupForm,
  Ms as SignupPage,
  od as Skeleton,
  Jc as Slider,
  ad as Spinner,
  Qc as Switch,
  id as Tabs,
  sd as ToastHost,
  nd as Tooltip,
  yt as applyStoredThemeEarly,
  Kc as createPhlixApp,
  bt as deriveAccentVars,
  Fe as readStoredPreferences,
  Me as useAuthStore,
  He as useFocusTrap,
  De as useMediaStore,
  mt as usePreferencesStore,
  wt as useTheme,
  Ki as useToastStore
};
//# sourceMappingURL=phlix-ui.js.map
