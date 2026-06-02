var Re = Object.defineProperty;
var Fe = (t, e, s) => e in t ? Re(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var ue = (t, e, s) => Fe(t, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as o, createElementBlock as a, createElementVNode as n, renderSlot as D, defineComponent as S, createBlock as G, withCtx as X, createVNode as A, unref as C, createTextVNode as J, toDisplayString as k, ref as _, computed as V, createCommentVNode as $, Fragment as F, renderList as z, withDirectives as Z, vModelText as he, normalizeClass as L, inject as ye, onMounted as Q, watch as oe, onUnmounted as ze, withModifiers as ae, normalizeStyle as Y, createStaticVNode as De, resolveComponent as Te, vModelDynamic as ke, vShow as $e, createApp as Ue, markRaw as x, resolveDynamicComponent as Ee, onBeforeUnmount as le, useId as ie, nextTick as ne, Teleport as we, Transition as me, withKeys as Ne, TransitionGroup as He } from "vue";
import { defineStore as xe, createPinia as Ge } from "pinia";
import { RouterView as Ke, RouterLink as Me, useRoute as Oe, useRouter as Ve, createRouter as qe, createWebHistory as Ye } from "vue-router";
const M = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [l, r] of e)
    s[l] = r;
  return s;
}, Xe = {}, Je = { class: "app-layout" }, We = { class: "app-header" }, Qe = { class: "header-inner" }, Ze = { class: "logo" }, et = { class: "nav" }, tt = { class: "app-main" }, nt = { class: "app-footer" };
function st(t, e) {
  return o(), a("div", Je, [
    n("header", We, [
      n("div", Qe, [
        n("div", Ze, [
          D(t.$slots, "logo", {}, () => [
            e[0] || (e[0] = n("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        n("nav", et, [
          D(t.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    n("main", tt, [
      D(t.$slots, "default", {}, void 0, !0)
    ]),
    n("footer", nt, [
      D(t.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const ot = /* @__PURE__ */ M(Xe, [["render", st], ["__scopeId", "data-v-9f6c6d16"]]), at = { class: "main-nav" }, lt = /* @__PURE__ */ S({
  __name: "PhlixApp",
  setup(t) {
    return (e, s) => (o(), G(ot, null, {
      nav: X(() => [
        n("nav", at, [
          A(C(Me), {
            to: "/app",
            class: "nav-link"
          }, {
            default: X(() => [...s[0] || (s[0] = [
              J("Browse", -1)
            ])]),
            _: 1
          }),
          A(C(Me), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: X(() => [...s[1] || (s[1] = [
              J("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: X(() => [
        A(C(Ke))
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ M(lt, [["__scopeId", "data-v-35b5e7c6"]]), rt = { class: "phlix-placeholder" }, ct = { class: "placeholder-content" }, dt = /* @__PURE__ */ S({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(t) {
    return (e, s) => (o(), a("div", rt, [
      n("div", ct, [
        s[0] || (s[0] = n("h1", null, "Shared UI loading...", -1)),
        n("p", null, "Phlix " + k(t.appName) + " is initializing", 1)
      ])
    ]));
  }
}), ut = /* @__PURE__ */ M(dt, [["__scopeId", "data-v-bf79ac4c"]]);
class vt extends Error {
  constructor(e, s, l = null) {
    super(e), this.status = s, this.body = l, this.name = "ApiError";
  }
}
function ht(t) {
  return t === !0 || t === 1 || t === "1" || t === "true";
}
class pe {
  constructor(e = {}) {
    ue(this, "baseUrl");
    ue(this, "tokens");
    ue(this, "doFetch");
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
      }, f = this.tokens.getAccessToken();
      f && (h.Authorization = `Bearer ${f}`);
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
      throw new vt(d, e.status, r);
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
    return { ...e, is_admin: ht(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const W = new pe(), Pe = xe("media", () => {
  const t = _([]), e = _(0), s = _(!1), l = _(null), r = _(""), d = _([]), c = _(void 0), h = _(void 0), f = _([]), u = _([]), i = _("name"), v = _("asc"), b = _(24), m = _(0), g = V(() => m.value + t.value.length < e.value), p = V(() => {
    const E = {};
    return r.value && (E.search = r.value), d.value.length && (E.genres = d.value), c.value !== void 0 && (E.yearFrom = c.value), h.value !== void 0 && (E.yearTo = h.value), f.value.length && (E.ratings = f.value), u.value.length && (E.types = u.value), E.sort = i.value, E.order = v.value, E.limit = b.value, E.offset = m.value, E;
  }), B = V(() => {
    const E = /* @__PURE__ */ new Set();
    return t.value.forEach((N) => {
      var R;
      return (R = N.genres) == null ? void 0 : R.forEach((re) => E.add(re));
    }), Array.from(E).sort();
  }), I = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], H = ["movie", "series", "episode", "audio", "image"];
  function K(E) {
    var re, te, Se;
    const N = new URLSearchParams(), R = p.value;
    return R.search && N.set("search", R.search), (re = R.genres) == null || re.forEach((ce) => N.append("genres", ce)), R.yearFrom !== void 0 && N.set("yearFrom", String(R.yearFrom)), R.yearTo !== void 0 && N.set("yearTo", String(R.yearTo)), (te = R.ratings) == null || te.forEach((ce) => N.append("ratings", ce)), (Se = R.types) == null || Se.forEach((ce) => N.append("types", ce)), R.sort && N.set("sort", R.sort), R.order && N.set("order", R.order), N.set("limit", String(R.limit)), N.set("offset", String(R.offset)), `${E}/api/v1/media?${N.toString()}`;
  }
  async function q(E, N = !1) {
    s.value = !0, l.value = null;
    try {
      const R = new pe({ baseUrl: E }), re = K(E), te = await R.get(re);
      N ? t.value = [...t.value, ...te.items] : t.value = te.items, e.value = te.total, m.value = (te.offset ?? 0) + te.items.length;
    } catch (R) {
      l.value = R instanceof Error ? R.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function U(E) {
    await q(E, !0);
  }
  function P() {
    t.value = [], e.value = 0, m.value = 0, l.value = null;
  }
  function y(E) {
    r.value = E, m.value = 0;
  }
  function w(E) {
    d.value = E, m.value = 0;
  }
  function T(E, N) {
    c.value = E, h.value = N, m.value = 0;
  }
  function j(E) {
    f.value = E, m.value = 0;
  }
  function ee(E) {
    u.value = E, m.value = 0;
  }
  function fe(E, N) {
    i.value = E, N && (v.value = N), m.value = 0;
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
    selectedRatings: f,
    selectedTypes: u,
    sort: i,
    order: v,
    limit: b,
    offset: m,
    hasMore: g,
    queryParams: p,
    availableGenres: B,
    availableRatings: I,
    availableTypes: H,
    fetchMedia: q,
    loadMore: U,
    reset: P,
    setSearch: y,
    setGenres: w,
    setYearRange: T,
    setRatings: j,
    setTypes: ee,
    setSort: fe
  };
}), mt = { class: "media-card" }, pt = ["href"], ft = { class: "card-poster" }, gt = ["src", "alt"], _t = {
  key: 1,
  class: "poster-placeholder"
}, bt = { class: "placeholder-type" }, kt = { class: "card-overlay" }, yt = {
  key: 0,
  class: "card-year"
}, $t = {
  key: 1,
  class: "card-rating"
}, wt = { class: "card-info" }, xt = ["title"], Ct = {
  key: 0,
  class: "card-genres"
}, It = /* @__PURE__ */ S({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(t) {
    return (e, s) => {
      var l;
      return o(), a("article", mt, [
        n("a", {
          href: t.to ?? `/app/player/${t.item.id}`,
          class: "card-link"
        }, [
          n("div", ft, [
            t.item.poster_url ? (o(), a("img", {
              key: 0,
              src: t.item.poster_url,
              alt: t.item.name,
              loading: "lazy"
            }, null, 8, gt)) : (o(), a("div", _t, [
              s[0] || (s[0] = n("span", { class: "placeholder-icon" }, "🎬", -1)),
              n("span", bt, k(t.item.type), 1)
            ]))
          ]),
          n("div", kt, [
            t.item.year ? (o(), a("span", yt, k(t.item.year), 1)) : $("", !0),
            t.item.rating ? (o(), a("span", $t, k(t.item.rating), 1)) : $("", !0)
          ]),
          n("div", wt, [
            n("h3", {
              class: "card-title",
              title: t.item.name
            }, k(t.item.name), 9, xt),
            (l = t.item.genres) != null && l.length ? (o(), a("p", Ct, k(t.item.genres.slice(0, 2).join(", ")), 1)) : $("", !0)
          ])
        ], 8, pt)
      ]);
    };
  }
}), St = /* @__PURE__ */ M(It, [["__scopeId", "data-v-e60c8481"]]), Mt = { class: "media-grid-container" }, Bt = {
  key: 0,
  class: "media-grid-skeleton"
}, Tt = {
  key: 1,
  class: "media-grid-empty"
}, Et = {
  key: 2,
  class: "media-grid"
}, Vt = /* @__PURE__ */ S({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(t) {
    return (e, s) => (o(), a("div", Mt, [
      t.loading ? (o(), a("div", Bt, [
        (o(), a(F, null, z(12, (l) => n("div", {
          key: l,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          n("div", { class: "skeleton-poster" }, null, -1),
          n("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : t.items.length === 0 ? (o(), a("div", Tt, [...s[1] || (s[1] = [
        n("p", null, "No media found.", -1),
        n("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (o(), a("div", Et, [
        (o(!0), a(F, null, z(t.items, (l) => (o(), G(St, {
          key: l.id,
          item: l
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), Pt = /* @__PURE__ */ M(Vt, [["__scopeId", "data-v-b7e87216"]]), Lt = { class: "filter-bar" }, At = { class: "filter-search" }, jt = { class: "filter-row" }, Rt = { class: "filter-group" }, Ft = ["value"], zt = ["value"], Dt = ["value"], Ut = { class: "filter-group" }, Nt = ["value"], Ht = ["value"], Gt = ["value"], Kt = ["value"], Ot = { class: "filter-section" }, qt = { class: "filter-chips" }, Yt = ["onClick"], Xt = { class: "filter-section" }, Jt = { class: "filter-chips" }, Wt = ["onClick"], Qt = { class: "filter-section" }, Zt = { class: "filter-chips" }, en = ["onClick"], tn = { class: "filter-actions" }, nn = { class: "result-count" }, sn = /* @__PURE__ */ S({
  __name: "FilterBar",
  setup(t) {
    const e = Pe(), s = _(e.search), l = [
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
      const g = e.selectedGenres;
      g.includes(m) ? e.setGenres(g.filter((p) => p !== m)) : e.setGenres([...g, m]);
    }
    function c(m) {
      const g = e.selectedRatings;
      g.includes(m) ? e.setRatings(g.filter((p) => p !== m)) : e.setRatings([...g, m]);
    }
    function h(m) {
      const g = e.selectedTypes;
      g.includes(m) ? e.setTypes(g.filter((p) => p !== m)) : e.setTypes([...g, m]);
    }
    function f(m) {
      const g = m.target;
      e.setSort(g.value);
    }
    function u(m) {
      const g = m.target;
      e.order = g.value;
    }
    const i = (/* @__PURE__ */ new Date()).getFullYear(), v = V(() => {
      const m = [];
      for (let g = i; g >= 1900; g--)
        m.push(g);
      return m;
    });
    function b() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (m, g) => (o(), a("div", Lt, [
      n("div", At, [
        Z(n("input", {
          "onUpdate:modelValue": g[0] || (g[0] = (p) => s.value = p),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: r
        }, null, 544), [
          [he, s.value]
        ])
      ]),
      n("div", jt, [
        n("div", Rt, [
          g[4] || (g[4] = n("label", { class: "filter-label" }, "Sort", -1)),
          n("select", {
            class: "filter-select",
            value: C(e).sort,
            onChange: f
          }, [
            (o(), a(F, null, z(l, (p) => n("option", {
              key: p.value,
              value: p.value
            }, k(p.label), 9, zt)), 64))
          ], 40, Ft),
          n("select", {
            class: "filter-select order-select",
            value: C(e).order,
            onChange: u
          }, [...g[3] || (g[3] = [
            n("option", { value: "asc" }, "↑", -1),
            n("option", { value: "desc" }, "↓", -1)
          ])], 40, Dt)
        ]),
        n("div", Ut, [
          g[7] || (g[7] = n("label", { class: "filter-label" }, "Year", -1)),
          n("select", {
            class: "filter-select",
            value: C(e).yearFrom ?? "",
            onChange: g[1] || (g[1] = (p) => C(e).setYearRange(
              p.target.value ? Number(p.target.value) : void 0,
              C(e).yearTo
            ))
          }, [
            g[5] || (g[5] = n("option", { value: "" }, "From", -1)),
            (o(!0), a(F, null, z(v.value.slice(0, 50), (p) => (o(), a("option", {
              key: p,
              value: p
            }, k(p), 9, Ht))), 128))
          ], 40, Nt),
          n("select", {
            class: "filter-select",
            value: C(e).yearTo ?? "",
            onChange: g[2] || (g[2] = (p) => C(e).setYearRange(
              C(e).yearFrom,
              p.target.value ? Number(p.target.value) : void 0
            ))
          }, [
            g[6] || (g[6] = n("option", { value: "" }, "To", -1)),
            (o(!0), a(F, null, z(v.value.slice(0, 50), (p) => (o(), a("option", {
              key: p,
              value: p
            }, k(p), 9, Kt))), 128))
          ], 40, Gt)
        ])
      ]),
      n("div", Ot, [
        g[8] || (g[8] = n("span", { class: "filter-label" }, "Genres", -1)),
        n("div", qt, [
          (o(!0), a(F, null, z(C(e).availableGenres, (p) => (o(), a("button", {
            key: p,
            class: L(["chip", { active: C(e).selectedGenres.includes(p) }]),
            onClick: (B) => d(p)
          }, k(p), 11, Yt))), 128))
        ])
      ]),
      n("div", Xt, [
        g[9] || (g[9] = n("span", { class: "filter-label" }, "Rating", -1)),
        n("div", Jt, [
          (o(!0), a(F, null, z(C(e).availableRatings, (p) => (o(), a("button", {
            key: p,
            class: L(["chip", { active: C(e).selectedRatings.includes(p) }]),
            onClick: (B) => c(p)
          }, k(p), 11, Wt))), 128))
        ])
      ]),
      n("div", Qt, [
        g[10] || (g[10] = n("span", { class: "filter-label" }, "Type", -1)),
        n("div", Zt, [
          (o(!0), a(F, null, z(C(e).availableTypes, (p) => (o(), a("button", {
            key: p,
            class: L(["chip", { active: C(e).selectedTypes.includes(p) }]),
            onClick: (B) => h(p)
          }, k(p), 11, en))), 128))
        ])
      ]),
      n("div", tn, [
        n("button", {
          class: "clear-btn",
          onClick: b
        }, "Clear filters"),
        n("span", nn, k(C(e).total) + " result" + k(C(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), on = /* @__PURE__ */ M(sn, [["__scopeId", "data-v-7089ec0b"]]), an = { class: "browse-page" }, ln = { class: "browse-header" }, rn = { class: "browse-toolbar-extra" }, cn = {
  key: 0,
  class: "browse-error"
}, dn = {
  key: 1,
  class: "load-more"
}, un = {
  key: 2,
  class: "loading-more"
}, vn = /* @__PURE__ */ S({
  __name: "BrowsePage",
  setup(t) {
    const e = ye("apiBase") ?? V(() => ""), s = Pe();
    function l() {
      s.reset(), s.fetchMedia(e.value);
    }
    Q(l), oe(e, l);
    function r() {
      s.reset(), s.fetchMedia(e.value);
    }
    function d() {
      s.loadMore(e.value);
    }
    return (c, h) => (o(), a("div", an, [
      n("div", ln, [
        h[0] || (h[0] = n("h1", { class: "browse-title" }, "Browse Media", -1)),
        n("div", rn, [
          D(c.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      A(on, { onChange: r }),
      C(s).error ? (o(), a("div", cn, [
        n("p", null, k(C(s).error), 1),
        n("button", {
          class: "retry-btn",
          onClick: l
        }, "Retry")
      ])) : $("", !0),
      A(Pt, {
        items: C(s).items,
        loading: C(s).loading && C(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      C(s).hasMore && !C(s).loading ? (o(), a("div", dn, [
        n("button", {
          class: "load-more-btn",
          onClick: d
        }, "Load more")
      ])) : $("", !0),
      C(s).loading && C(s).items.length > 0 ? (o(), a("div", un, " Loading... ")) : $("", !0)
    ]));
  }
}), hn = /* @__PURE__ */ M(vn, [["__scopeId", "data-v-c192afa6"]]), mn = ["src", "poster"], pn = { class: "controls-top" }, fn = { class: "media-title" }, gn = {
  key: 0,
  class: "media-year"
}, _n = { class: "controls-center" }, bn = { class: "controls-bottom" }, kn = { class: "progress-track" }, yn = { class: "controls-row" }, $n = { class: "time-display" }, wn = { class: "volume-control" }, xn = ["value"], Cn = { class: "speed-control" }, In = ["value"], Sn = { class: "time-display" }, Mn = /* @__PURE__ */ S({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(t) {
    const e = _(null), s = _(!1), l = _(0), r = _(0), d = _(1), c = _(!1), h = _(1), f = _(!1), u = _(!0);
    let i = null;
    const v = V(
      () => r.value > 0 ? l.value / r.value * 100 : 0
    );
    function b(P) {
      if (!isFinite(P) || isNaN(P)) return "0:00";
      const y = Math.floor(P / 60), w = Math.floor(P % 60);
      return `${y}:${w.toString().padStart(2, "0")}`;
    }
    function m() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function g() {
      e.value && (l.value = e.value.currentTime);
    }
    function p() {
      e.value && (r.value = e.value.duration);
    }
    function B(P) {
      const w = P.currentTarget.getBoundingClientRect(), T = (P.clientX - w.left) / w.width;
      e.value && (e.value.currentTime = T * r.value);
    }
    function I(P) {
      const y = parseFloat(P.target.value);
      d.value = y, e.value && (e.value.volume = y), c.value = y === 0;
    }
    function H() {
      c.value = !c.value, e.value && (e.value.muted = c.value);
    }
    function K(P) {
      h.value = P, e.value && (e.value.playbackRate = P);
    }
    function q() {
      var y;
      const P = (y = e.value) == null ? void 0 : y.closest(".player-container");
      P && (document.fullscreenElement ? (document.exitFullscreen(), f.value = !1) : (P.requestFullscreen(), f.value = !0));
    }
    function U() {
      u.value = !0, i && clearTimeout(i), i = setTimeout(() => {
        s.value && (u.value = !1);
      }, 3e3);
    }
    return ze(() => {
      i && clearTimeout(i);
    }), (P, y) => (o(), a("div", {
      class: L(["player-container", { "controls-hidden": !u.value && s.value }]),
      onMousemove: U,
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
        onPlay: y[0] || (y[0] = (w) => s.value = !0),
        onPause: y[1] || (y[1] = (w) => s.value = !1),
        onTimeupdate: g,
        onLoadedmetadata: p,
        onClick: ae(m, ["stop"])
      }, null, 40, mn),
      n("div", {
        class: "player-controls",
        onClick: y[4] || (y[4] = ae(() => {
        }, ["stop"]))
      }, [
        n("div", pn, [
          n("button", {
            class: "ctrl-btn back-btn",
            onClick: y[2] || (y[2] = (w) => P.$router.back())
          }, " ← Back "),
          n("span", fn, k(t.media.name), 1),
          t.media.year ? (o(), a("span", gn, k(t.media.year), 1)) : $("", !0)
        ]),
        n("div", _n, [
          n("button", {
            class: "play-btn",
            onClick: m
          }, k(s.value ? "❚❚" : "▶"), 1)
        ]),
        n("div", bn, [
          n("div", {
            class: "progress-bar",
            onClick: B
          }, [
            n("div", kn, [
              n("div", {
                class: "progress-fill",
                style: Y({ width: v.value + "%" })
              }, null, 4)
            ])
          ]),
          n("div", yn, [
            n("span", $n, k(b(l.value)), 1),
            n("div", wn, [
              n("button", {
                class: "ctrl-btn",
                onClick: H
              }, k(c.value || d.value === 0 ? "🔇" : "🔊"), 1),
              n("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: c.value ? 0 : d.value,
                class: "volume-slider",
                onInput: I
              }, null, 40, xn)
            ]),
            n("div", Cn, [
              n("select", {
                class: "speed-select",
                value: h.value,
                onChange: y[3] || (y[3] = (w) => K(Number(w.target.value)))
              }, [...y[5] || (y[5] = [
                De('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, In)
            ]),
            n("span", Sn, k(b(r.value)), 1),
            n("button", {
              class: "ctrl-btn",
              onClick: q
            }, k(f.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), Bn = /* @__PURE__ */ M(Mn, [["__scopeId", "data-v-7a51063f"]]), Tn = { class: "player-page" }, En = {
  key: 0,
  class: "player-loading"
}, Vn = {
  key: 1,
  class: "player-error"
}, Pn = /* @__PURE__ */ S({
  __name: "PlayerPage",
  setup(t) {
    const e = ye("apiBase", V(() => "")), s = Oe(), l = _(null), r = _(""), d = _(!0), c = _(null);
    async function h() {
      const f = s.params.id;
      if (!f) {
        c.value = "No media ID provided", d.value = !1;
        return;
      }
      try {
        const u = new pe({ baseUrl: e.value }), [i, v] = await Promise.all([
          u.get(`/api/v1/media/${f}`),
          u.get(`/api/v1/media/${f}/playback-info`).catch(() => null)
        ]);
        l.value = i, v != null && v.url ? r.value = v.url : r.value = `${e.value}/media/${f}/stream`;
      } catch (u) {
        c.value = u instanceof Error ? u.message : "Failed to load media";
      } finally {
        d.value = !1;
      }
    }
    return Q(h), (f, u) => (o(), a("div", Tn, [
      d.value ? (o(), a("div", En, "Loading...")) : c.value ? (o(), a("div", Vn, [
        n("p", null, k(c.value), 1),
        n("button", {
          class: "retry-btn",
          onClick: h
        }, "Retry")
      ])) : l.value ? (o(), G(Bn, {
        key: 2,
        media: l.value,
        "stream-url": r.value
      }, null, 8, ["media", "stream-url"])) : $("", !0)
    ]));
  }
}), Ln = /* @__PURE__ */ M(Pn, [["__scopeId", "data-v-d9061b47"]]), ge = "access_token", _e = "refresh_token", be = "user";
class An {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(ge);
  }
  setAccessToken(e) {
    this.storage.setItem(ge, e);
  }
  getRefreshToken() {
    return this.storage.getItem(_e);
  }
  setRefreshToken(e) {
    this.storage.setItem(_e, e);
  }
  getUser() {
    const e = this.storage.getItem(be);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(be, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(ge), this.storage.removeItem(_e), this.storage.removeItem(be);
  }
}
const Ce = xe("auth", () => {
  const t = new An(), e = ye("apiBase", ""), s = new pe({ tokenStore: t, baseUrl: e }), l = _(null), r = _(!1), d = _(null), c = V(() => t.getAccessToken() !== null), h = V(() => {
    var b;
    return ((b = l.value) == null ? void 0 : b.is_admin) === !0;
  });
  async function f(b, m) {
    r.value = !0, d.value = null;
    try {
      const g = await s.post("/api/v1/auth/login", { email: b, password: m });
      return t.setAccessToken(g.access_token), t.setRefreshToken(g.refresh_token), await i(), !0;
    } catch (g) {
      return d.value = g instanceof Error ? g.message : "Login failed", !1;
    } finally {
      r.value = !1;
    }
  }
  async function u(b, m, g) {
    r.value = !0, d.value = null;
    try {
      const p = await s.post("/api/v1/auth/register", { email: b, username: m, password: g });
      return t.setAccessToken(p.access_token), t.setRefreshToken(p.refresh_token), await i(), !0;
    } catch (p) {
      return d.value = p instanceof Error ? p.message : "Registration failed", !1;
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
    login: f,
    signup: u,
    fetchUser: i,
    logout: v
  };
}), jn = {
  key: 0,
  class: "form-error"
}, Rn = { class: "field" }, Fn = { class: "field" }, zn = { class: "password-wrapper" }, Dn = ["type"], Un = ["disabled"], Nn = { class: "form-footer" }, Hn = /* @__PURE__ */ S({
  __name: "LoginForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, l = Ce(), r = Ve(), d = _(""), c = _(""), h = _(!1);
    async function f() {
      await l.login(d.value, c.value) && (s("success"), r.push("/app"));
    }
    return (u, i) => {
      const v = Te("router-link");
      return o(), a("form", {
        class: "login-form",
        onSubmit: ae(f, ["prevent"])
      }, [
        i[7] || (i[7] = n("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        C(l).error ? (o(), a("div", jn, k(C(l).error), 1)) : $("", !0),
        n("div", Rn, [
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
            [he, d.value]
          ])
        ]),
        n("div", Fn, [
          i[4] || (i[4] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", zn, [
            Z(n("input", {
              id: "password",
              "onUpdate:modelValue": i[1] || (i[1] = (b) => c.value = b),
              type: h.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, Dn), [
              [ke, c.value]
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
        }, k(C(l).loading ? "Signing in..." : "Sign in"), 9, Un),
        n("p", Nn, [
          i[6] || (i[6] = J(" Don't have an account? ", -1)),
          A(v, {
            to: "/app/signup",
            class: "link"
          }, {
            default: X(() => [...i[5] || (i[5] = [
              J("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Gn = /* @__PURE__ */ M(Hn, [["__scopeId", "data-v-22bc5576"]]), Kn = { class: "auth-page" }, On = { class: "auth-card" }, qn = /* @__PURE__ */ S({
  __name: "LoginPage",
  setup(t) {
    return (e, s) => (o(), a("div", Kn, [
      n("div", On, [
        A(Gn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Yn = /* @__PURE__ */ M(qn, [["__scopeId", "data-v-9c53ce6a"]]), Xn = {
  key: 0,
  class: "form-error"
}, Jn = { class: "field" }, Wn = { class: "field" }, Qn = { class: "field" }, Zn = { class: "password-wrapper" }, es = ["type"], ts = { class: "field" }, ns = ["type"], ss = ["disabled"], os = { class: "form-footer" }, as = /* @__PURE__ */ S({
  __name: "SignupForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, l = Ce(), r = Ve(), d = _(""), c = _(""), h = _(""), f = _(""), u = _(!1), i = _(null);
    async function v() {
      if (i.value = null, h.value.length < 8) {
        i.value = "Password must be at least 8 characters.";
        return;
      }
      if (h.value !== f.value) {
        i.value = "Passwords do not match.";
        return;
      }
      await l.signup(d.value, c.value, h.value) && (s("success"), r.push("/app"));
    }
    return (b, m) => {
      const g = Te("router-link");
      return o(), a("form", {
        class: "signup-form",
        onSubmit: ae(v, ["prevent"])
      }, [
        m[11] || (m[11] = n("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        C(l).error || i.value ? (o(), a("div", Xn, k(C(l).error || i.value), 1)) : $("", !0),
        n("div", Jn, [
          m[5] || (m[5] = n("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          Z(n("input", {
            id: "email",
            "onUpdate:modelValue": m[0] || (m[0] = (p) => d.value = p),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [he, d.value]
          ])
        ]),
        n("div", Wn, [
          m[6] || (m[6] = n("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          Z(n("input", {
            id: "username",
            "onUpdate:modelValue": m[1] || (m[1] = (p) => c.value = p),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [he, c.value]
          ])
        ]),
        n("div", Qn, [
          m[7] || (m[7] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", Zn, [
            Z(n("input", {
              id: "password",
              "onUpdate:modelValue": m[2] || (m[2] = (p) => h.value = p),
              type: u.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, es), [
              [ke, h.value]
            ]),
            n("button", {
              type: "button",
              class: "toggle-password",
              onClick: m[3] || (m[3] = (p) => u.value = !u.value)
            }, k(u.value ? "🙈" : "👁"), 1)
          ])
        ]),
        n("div", ts, [
          m[8] || (m[8] = n("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          Z(n("input", {
            id: "confirm",
            "onUpdate:modelValue": m[4] || (m[4] = (p) => f.value = p),
            type: u.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, ns), [
            [ke, f.value]
          ])
        ]),
        n("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(l).loading
        }, k(C(l).loading ? "Creating account..." : "Create account"), 9, ss),
        n("p", os, [
          m[10] || (m[10] = J(" Already have an account? ", -1)),
          A(g, {
            to: "/app/login",
            class: "link"
          }, {
            default: X(() => [...m[9] || (m[9] = [
              J("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), ls = /* @__PURE__ */ M(as, [["__scopeId", "data-v-d5e42c72"]]), is = { class: "auth-page" }, rs = { class: "auth-card" }, cs = /* @__PURE__ */ S({
  __name: "SignupPage",
  setup(t) {
    return (e, s) => (o(), a("div", is, [
      n("div", rs, [
        A(ls, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), ds = /* @__PURE__ */ M(cs, [["__scopeId", "data-v-609331e4"]]), us = { class: "settings-form" }, vs = {
  key: 0,
  class: "settings-loading"
}, hs = {
  key: 1,
  class: "settings-error"
}, ms = { class: "group-title" }, ps = ["for"], fs = { class: "setting-control" }, gs = ["id", "checked", "onChange"], _s = ["id", "value", "onChange"], bs = ["id", "value", "onChange"], ks = { class: "settings-actions" }, ys = {
  key: 0,
  class: "success-msg"
}, $s = ["disabled"], ws = /* @__PURE__ */ S({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(t, { emit: e }) {
    const s = t, l = e, r = Ce(), d = _({}), c = _(!0), h = _(!1), f = _(null), u = _(null), i = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], v = V(
      () => s.groups ? i.filter((I) => s.groups.includes(I)) : i
    );
    async function b() {
      c.value = !0, f.value = null;
      try {
        const I = await r.client.get("/api/v1/users/me/settings");
        d.value = I;
      } catch (I) {
        f.value = I instanceof Error ? I.message : "Failed to load settings";
      } finally {
        c.value = !1;
      }
    }
    async function m() {
      h.value = !0, f.value = null, u.value = null;
      try {
        await r.client.put("/api/v1/users/me/settings", d.value), u.value = "Settings saved.", l("saved", d.value), setTimeout(() => {
          u.value = null;
        }, 3e3);
      } catch (I) {
        f.value = I instanceof Error ? I.message : "Failed to save settings";
      } finally {
        h.value = !1;
      }
    }
    function g(I, H) {
      d.value[I] = H;
    }
    Q(b);
    const p = {
      transcoding: "Transcoding",
      metadata: "Metadata",
      markers: "Marker Detection",
      subtitles: "Subtitles",
      discovery: "Discovery",
      trickplay: "Trickplay",
      newsletter: "Newsletter",
      "port-forward": "Port Forwarding",
      scrobblers: "Scrobblers"
    }, B = {
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
    return (I, H) => (o(), a("div", us, [
      c.value ? (o(), a("div", vs, "Loading settings...")) : f.value ? (o(), a("div", hs, k(f.value), 1)) : (o(), a(F, { key: 2 }, [
        (o(!0), a(F, null, z(v.value, (K) => (o(), a("div", {
          key: K,
          class: "settings-group"
        }, [
          n("h3", ms, k(p[K]), 1),
          (o(), a(F, null, z(B, (q, U) => Z(n("div", {
            key: U,
            class: "setting-row"
          }, [
            n("label", {
              for: U,
              class: "setting-label"
            }, k(q.label), 9, ps),
            n("div", fs, [
              q.type === "bool" ? (o(), a("input", {
                key: 0,
                id: U,
                type: "checkbox",
                class: "toggle",
                checked: !!d.value[U],
                onChange: (P) => g(U, P.target.checked)
              }, null, 40, gs)) : q.type === "number" ? (o(), a("input", {
                key: 1,
                id: U,
                type: "number",
                class: "input number-input",
                value: d.value[U],
                onChange: (P) => g(U, Number(P.target.value))
              }, null, 40, _s)) : (o(), a("input", {
                key: 2,
                id: U,
                type: "text",
                class: "input",
                value: d.value[U] ?? "",
                onChange: (P) => g(U, P.target.value)
              }, null, 40, bs))
            ])
          ]), [
            [$e, U.startsWith(K)]
          ])), 64))
        ]))), 128)),
        n("div", ks, [
          u.value ? (o(), a("div", ys, k(u.value), 1)) : $("", !0),
          n("button", {
            class: "save-btn",
            disabled: h.value,
            onClick: m
          }, k(h.value ? "Saving..." : "Save settings"), 9, $s)
        ])
      ], 64))
    ]));
  }
}), xs = /* @__PURE__ */ M(ws, [["__scopeId", "data-v-51b588b6"]]), Cs = { class: "settings-page" }, Is = /* @__PURE__ */ S({
  __name: "SettingsPage",
  setup(t) {
    return (e, s) => (o(), a("div", Cs, [
      s[0] || (s[0] = n("div", { class: "settings-header" }, [
        n("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      A(xs)
    ]));
  }
}), Ss = /* @__PURE__ */ M(Is, [["__scopeId", "data-v-f9ca8a28"]]);
function Ms() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function Bs(t) {
  const e = t.routerBase || "/app", s = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: hn
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: Ln
    },
    {
      path: `${e}/login`,
      name: "login",
      component: Yn
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: ds
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: Ss
    }
  ];
  return t.extraRoutes && s.push(...t.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: ut,
    props: { appName: t.app }
  }), s;
}
function Sc(t) {
  const e = {
    ...Ms(),
    ...t
  }, s = Ge(), l = e.routerBase || "/app", r = qe({
    history: Ye(l),
    routes: Bs(e)
  }), d = Ue(it);
  return d.provide("apiBase", e.apiBase), d.use(s), d.use(r), d;
}
const Ts = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Es(t, e) {
  return o(), a("svg", Ts, [...e[0] || (e[0] = [
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
const Vs = x({ name: "lucide-play", render: Es }), Ps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ls(t, e) {
  return o(), a("svg", Ps, [...e[0] || (e[0] = [
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
const As = x({ name: "lucide-pause", render: Ls }), js = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Rs(t, e) {
  return o(), a("svg", js, [...e[0] || (e[0] = [
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
const Fs = x({ name: "lucide-skip-back", render: Rs }), zs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ds(t, e) {
  return o(), a("svg", zs, [...e[0] || (e[0] = [
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
const Us = x({ name: "lucide-skip-forward", render: Ds }), Ns = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Hs(t, e) {
  return o(), a("svg", Ns, [...e[0] || (e[0] = [
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
const Gs = x({ name: "lucide-rotate-ccw", render: Hs }), Ks = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Os(t, e) {
  return o(), a("svg", Ks, [...e[0] || (e[0] = [
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
const qs = x({ name: "lucide-rotate-cw", render: Os }), Ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xs(t, e) {
  return o(), a("svg", Ys, [...e[0] || (e[0] = [
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
const Js = x({ name: "lucide-volume-2", render: Xs }), Ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qs(t, e) {
  return o(), a("svg", Ws, [...e[0] || (e[0] = [
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
const Zs = x({ name: "lucide-volume-1", render: Qs }), eo = {
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
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
    }, null, -1)
  ])]);
}
const no = x({ name: "lucide-volume-x", render: to }), so = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function oo(t, e) {
  return o(), a("svg", so, [...e[0] || (e[0] = [
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
const ao = x({ name: "lucide-captions", render: oo }), lo = {
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
const ro = x({ name: "lucide-picture-in-picture-2", render: io }), co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function uo(t, e) {
  return o(), a("svg", co, [...e[0] || (e[0] = [
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
const vo = x({ name: "lucide-rectangle-horizontal", render: uo }), ho = {
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
      d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
    }, null, -1)
  ])]);
}
const po = x({ name: "lucide-maximize", render: mo }), fo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function go(t, e) {
  return o(), a("svg", fo, [...e[0] || (e[0] = [
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
const _o = x({ name: "lucide-minimize", render: go }), bo = {
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
      d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
    }, null, -1)
  ])]);
}
const yo = x({ name: "lucide-maximize-2", render: ko }), $o = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wo(t, e) {
  return o(), a("svg", $o, [...e[0] || (e[0] = [
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
const xo = x({ name: "lucide-cast", render: wo }), Co = {
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
      n("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
      n("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ])]);
}
const So = x({ name: "lucide-settings", render: Io }), Mo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bo(t, e) {
  return o(), a("svg", Mo, [...e[0] || (e[0] = [
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
const To = x({ name: "lucide-gauge", render: Bo }), Eo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vo(t, e) {
  return o(), a("svg", Eo, [...e[0] || (e[0] = [
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
const Po = x({ name: "lucide-film", render: Vo }), Lo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ao(t, e) {
  return o(), a("svg", Lo, [...e[0] || (e[0] = [
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
const jo = x({ name: "lucide-image", render: Ao }), Ro = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fo(t, e) {
  return o(), a("svg", Ro, [...e[0] || (e[0] = [
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
const zo = x({ name: "lucide-music", render: Fo }), Do = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Uo(t, e) {
  return o(), a("svg", Do, [...e[0] || (e[0] = [
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
const No = x({ name: "lucide-tv", render: Uo }), Ho = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Go(t, e) {
  return o(), a("svg", Ho, [...e[0] || (e[0] = [
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
const Ko = x({ name: "lucide-search", render: Go }), Oo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qo(t, e) {
  return o(), a("svg", Oo, [...e[0] || (e[0] = [
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
const Yo = x({ name: "lucide-sliders-horizontal", render: qo }), Xo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Jo(t, e) {
  return o(), a("svg", Xo, [...e[0] || (e[0] = [
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
const Wo = x({ name: "lucide-calendar", render: Jo }), Qo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zo(t, e) {
  return o(), a("svg", Qo, [...e[0] || (e[0] = [
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
const ea = x({ name: "lucide-arrow-up-down", render: Zo }), ta = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function na(t, e) {
  return o(), a("svg", ta, [...e[0] || (e[0] = [
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
const sa = x({ name: "lucide-star", render: na }), oa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function aa(t, e) {
  return o(), a("svg", oa, [...e[0] || (e[0] = [
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
const la = x({ name: "lucide-list", render: aa }), ia = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ra(t, e) {
  return o(), a("svg", ia, [...e[0] || (e[0] = [
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
const ca = x({ name: "lucide-plus", render: ra }), da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ua(t, e) {
  return o(), a("svg", da, [...e[0] || (e[0] = [
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
const va = x({ name: "lucide-info", render: ua }), ha = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ma(t, e) {
  return o(), a("svg", ha, [...e[0] || (e[0] = [
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
const pa = x({ name: "lucide-x", render: ma }), fa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ga(t, e) {
  return o(), a("svg", fa, [...e[0] || (e[0] = [
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
const _a = x({ name: "lucide-check", render: ga }), ba = {
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
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }, null, -1)
  ])]);
}
const ya = x({ name: "lucide-bookmark", render: ka }), $a = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wa(t, e) {
  return o(), a("svg", $a, [...e[0] || (e[0] = [
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
const xa = x({ name: "lucide-bookmark-plus", render: wa }), Ca = {
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
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
    }, null, -1)
  ])]);
}
const Sa = x({ name: "lucide-heart", render: Ia }), Ma = {
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
      n("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
      n("circle", {
        cx: "12",
        cy: "7",
        r: "4"
      })
    ], -1)
  ])]);
}
const Ta = x({ name: "lucide-user", render: Ba }), Ea = {
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
      d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }, null, -1)
  ])]);
}
const Pa = x({ name: "lucide-log-out", render: Va }), La = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Aa(t, e) {
  return o(), a("svg", La, [...e[0] || (e[0] = [
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
const ja = x({ name: "lucide-menu", render: Aa }), Ra = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fa(t, e) {
  return o(), a("svg", Ra, [...e[0] || (e[0] = [
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
const za = x({ name: "lucide-more-horizontal", render: Fa }), Da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ua(t, e) {
  return o(), a("svg", Da, [...e[0] || (e[0] = [
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
const Na = x({ name: "lucide-eye", render: Ua }), Ha = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ga(t, e) {
  return o(), a("svg", Ha, [...e[0] || (e[0] = [
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
const Ka = x({ name: "lucide-eye-off", render: Ga }), Oa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qa(t, e) {
  return o(), a("svg", Oa, [...e[0] || (e[0] = [
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
const Ya = x({ name: "lucide-arrow-left", render: qa }), Xa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ja(t, e) {
  return o(), a("svg", Xa, [...e[0] || (e[0] = [
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
const Wa = x({ name: "lucide-arrow-up", render: Ja }), Qa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Za(t, e) {
  return o(), a("svg", Qa, [...e[0] || (e[0] = [
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
const el = x({ name: "lucide-arrow-down", render: Za }), tl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function nl(t, e) {
  return o(), a("svg", tl, [...e[0] || (e[0] = [
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
const sl = x({ name: "lucide-chevron-down", render: nl }), ol = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function al(t, e) {
  return o(), a("svg", ol, [...e[0] || (e[0] = [
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
const ll = x({ name: "lucide-chevron-up", render: al }), il = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function rl(t, e) {
  return o(), a("svg", il, [...e[0] || (e[0] = [
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
const cl = x({ name: "lucide-chevron-left", render: rl }), dl = {
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
      d: "m9 18l6-6l-6-6"
    }, null, -1)
  ])]);
}
const vl = x({ name: "lucide-chevron-right", render: ul }), hl = {
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
      d: "M21 12a9 9 0 1 1-6.219-8.56"
    }, null, -1)
  ])]);
}
const pl = x({ name: "lucide-loader-circle", render: ml }), fl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gl(t, e) {
  return o(), a("svg", fl, [...e[0] || (e[0] = [
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
const _l = x({ name: "lucide-circle-alert", render: gl }), bl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function kl(t, e) {
  return o(), a("svg", bl, [...e[0] || (e[0] = [
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
const yl = x({ name: "lucide-circle-check", render: kl }), $l = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wl(t, e) {
  return o(), a("svg", $l, [...e[0] || (e[0] = [
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
const xl = x({ name: "lucide-circle-x", render: wl }), Cl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Il(t, e) {
  return o(), a("svg", Cl, [...e[0] || (e[0] = [
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
const Sl = x({ name: "lucide-sun", render: Il }), Ml = {
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
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
    }, null, -1)
  ])]);
}
const Tl = x({ name: "lucide-moon", render: Bl }), El = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vl(t, e) {
  return o(), a("svg", El, [...e[0] || (e[0] = [
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
const Pl = x({ name: "lucide-monitor", render: Vl }), O = /* @__PURE__ */ S({
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
      play: Vs,
      pause: As,
      "skip-back": Fs,
      "skip-forward": Us,
      rewind: Gs,
      forward: qs,
      volume: Js,
      "volume-low": Zs,
      mute: no,
      captions: ao,
      pip: ro,
      theater: vo,
      fullscreen: po,
      "fullscreen-exit": _o,
      expand: yo,
      cast: xo,
      settings: So,
      speed: To,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: Po,
      image: jo,
      music: zo,
      tv: No,
      search: Ko,
      filter: Yo,
      calendar: Wo,
      sort: ea,
      star: sa,
      list: la,
      // actions
      plus: ca,
      info: va,
      x: pa,
      check: _a,
      bookmark: ya,
      "bookmark-plus": xa,
      heart: Sa,
      user: Ta,
      "log-out": Pa,
      menu: ja,
      more: za,
      eye: Na,
      "eye-off": Ka,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": Ya,
      "arrow-up": Wa,
      "arrow-down": el,
      "chevron-down": sl,
      "chevron-up": ll,
      "chevron-left": cl,
      "chevron-right": vl,
      // status / theme
      spinner: pl,
      alert: _l,
      success: yl,
      error: xl,
      sun: Sl,
      moon: Tl,
      monitor: Pl
    }, s = t, l = V(() => e[s.name]), r = V(
      () => s.size === void 0 ? void 0 : typeof s.size == "number" ? `${s.size}px` : s.size
    );
    return (d, c) => (o(), G(Ee(l.value), {
      class: "phlix-icon",
      style: Y(r.value ? { fontSize: r.value } : void 0),
      "stroke-width": t.strokeWidth,
      role: t.label ? "img" : void 0,
      "aria-label": t.label,
      "aria-hidden": t.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), Ll = {
  key: 1,
  class: "phlix-backdrop__vignette",
  "aria-hidden": "true"
}, Al = /* @__PURE__ */ S({
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
    const e = t, s = _(!1);
    let l = null, r = null;
    const d = () => s.value = !!(l != null && l.matches || r != null && r.matches);
    Q(() => {
      var v, b;
      typeof window > "u" || typeof window.matchMedia != "function" || (l = window.matchMedia("(prefers-reduced-motion: reduce)"), r = window.matchMedia("(prefers-reduced-data: reduce)"), d(), (v = l.addEventListener) == null || v.call(l, "change", d), (b = r.addEventListener) == null || b.call(r, "change", d));
    }), le(() => {
      var v, b;
      (v = l == null ? void 0 : l.removeEventListener) == null || v.call(l, "change", d), (b = r == null ? void 0 : r.removeEventListener) == null || b.call(r, "change", d);
    });
    const c = V(() => e.enabled && !s.value), h = V(() => c.value && e.ambient && !!(e.ambientColor || e.ambientImage));
    function f(v) {
      return encodeURI(v).replace(/["'()\s]/g, (b) => `%${b.charCodeAt(0).toString(16)}`);
    }
    const u = V(() => e.ambientImage ? { backgroundImage: `url("${f(e.ambientImage)}")`, opacity: String(0.55 * e.intensity) } : {
      background: `radial-gradient(60% 60% at 25% 12%, ${e.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${e.ambientColor} 55%, transparent), transparent 70%)`,
      opacity: String(0.85 * e.intensity)
    }), i = V(() => ({ opacity: `calc(var(--grain-opacity) * ${e.intensity})` }));
    return (v, b) => (o(), a(F, null, [
      h.value ? (o(), a("div", {
        key: 0,
        class: L(["phlix-backdrop__ambient", { "is-image": !!t.ambientImage }]),
        style: Y(u.value),
        "aria-hidden": "true"
      }, null, 6)) : $("", !0),
      c.value && t.vignette ? (o(), a("div", Ll)) : $("", !0),
      c.value && t.grain ? (o(), a("div", {
        key: 2,
        class: "phlix-backdrop__grain",
        style: Y(i.value),
        "aria-hidden": "true"
      }, null, 4)) : $("", !0)
    ], 64));
  }
}), Mc = /* @__PURE__ */ M(Al, [["__scopeId", "data-v-c521cafc"]]), jl = ["type", "disabled", "aria-busy"], Rl = {
  key: 0,
  class: "phlix-btn__spinner"
}, Fl = { class: "phlix-btn__label" }, zl = /* @__PURE__ */ S({
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
    const e = t, s = V(() => e.disabled || e.loading);
    return (l, r) => (o(), a("button", {
      type: t.type,
      class: L(["phlix-btn", [`phlix-btn--${t.variant}`, `phlix-btn--${t.size}`, { "phlix-btn--block": t.block, "is-loading": t.loading }]]),
      disabled: s.value,
      "aria-busy": t.loading || void 0
    }, [
      t.loading ? (o(), a("span", Rl, [
        A(O, { name: "spinner" })
      ])) : $("", !0),
      t.leftIcon && !t.loading ? (o(), G(O, {
        key: 1,
        name: t.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : $("", !0),
      n("span", Fl, [
        D(l.$slots, "default", {}, void 0, !0)
      ]),
      t.rightIcon ? (o(), G(O, {
        key: 2,
        name: t.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : $("", !0)
    ], 10, jl));
  }
}), Bc = /* @__PURE__ */ M(zl, [["__scopeId", "data-v-8cdee95a"]]), Dl = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], Ul = /* @__PURE__ */ S({
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
    const e = t, s = V(() => e.disabled || e.loading);
    return (l, r) => (o(), a("button", {
      type: t.type,
      class: L(["phlix-iconbtn", [`phlix-iconbtn--${t.variant}`, `phlix-iconbtn--${t.size}`, { "is-pressed": t.pressed }]]),
      disabled: s.value,
      "aria-label": t.label,
      title: t.label,
      "aria-pressed": t.pressed === void 0 ? void 0 : t.pressed,
      "aria-busy": t.loading || void 0
    }, [
      A(O, {
        name: t.loading ? "spinner" : t.name,
        class: L({ "phlix-iconbtn__spin": t.loading })
      }, null, 8, ["name", "class"])
    ], 10, Dl));
  }
}), Ie = /* @__PURE__ */ M(Ul, [["__scopeId", "data-v-fc0cd545"]]), Nl = ["role", "aria-label"], Hl = /* @__PURE__ */ S({
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
      t.icon ? (o(), G(O, {
        key: 0,
        name: t.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : $("", !0),
      D(e.$slots, "default", {}, void 0, !0)
    ], 10, Nl));
  }
}), Tc = /* @__PURE__ */ M(Hl, [["__scopeId", "data-v-8f8d0fd2"]]), Gl = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], Kl = /* @__PURE__ */ S({
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
    const s = t, l = e, r = _(null), d = _(!1), c = V(() => {
      const p = s.max - s.min || 1;
      return Math.min(100, Math.max(0, (s.modelValue - s.min) / p * 100));
    }), h = V(
      () => s.formatValue ? s.formatValue(s.modelValue) : String(s.modelValue)
    );
    function f(p) {
      const B = Math.min(s.max, Math.max(s.min, p)), I = Math.round((B - s.min) / s.step), H = s.min + I * s.step;
      return Math.round(H * 1e6) / 1e6;
    }
    function u(p, B = !1) {
      const I = f(p);
      I !== s.modelValue && (l("update:modelValue", I), B && l("change", I));
    }
    function i(p) {
      const B = r.value;
      if (!B) return s.modelValue;
      const I = B.getBoundingClientRect(), H = I.width ? (p - I.left) / I.width : 0;
      return s.min + H * (s.max - s.min);
    }
    function v(p) {
      var B, I;
      s.disabled || ((I = (B = p.currentTarget).setPointerCapture) == null || I.call(B, p.pointerId), d.value = !0, u(i(p.clientX)));
    }
    function b(p) {
      d.value && u(i(p.clientX));
    }
    function m(p) {
      var B, I;
      d.value && (d.value = !1, (I = (B = p.currentTarget).releasePointerCapture) == null || I.call(B, p.pointerId), l("change", s.modelValue));
    }
    function g(p) {
      if (s.disabled) return;
      const B = (s.max - s.min) / 10;
      let I = !0;
      switch (p.key) {
        case "ArrowRight":
        case "ArrowUp":
          u(s.modelValue + s.step, !0);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          u(s.modelValue - s.step, !0);
          break;
        case "PageUp":
          u(s.modelValue + B, !0);
          break;
        case "PageDown":
          u(s.modelValue - B, !0);
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
      I && p.preventDefault();
    }
    return (p, B) => (o(), a("div", {
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
      onKeydown: g
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
    ], 42, Gl));
  }
}), Ec = /* @__PURE__ */ M(Kl, [["__scopeId", "data-v-9ca92975"]]), Ol = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], ql = ["id"], Yl = /* @__PURE__ */ S({
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
      ])], 10, Ol),
      t.label ? (o(), a("label", {
        key: 0,
        id: C(r),
        class: "phlix-switch__label",
        onClick: d
      }, k(t.label), 9, ql)) : $("", !0)
    ], 2));
  }
}), Vc = /* @__PURE__ */ M(Yl, [["__scopeId", "data-v-4631a106"]]), Xl = ["disabled", "aria-pressed"], Jl = { class: "phlix-chip__label" }, Wl = ["disabled", "aria-label"], Ql = /* @__PURE__ */ S({
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
        t.icon ? (o(), G(O, {
          key: 0,
          name: t.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : $("", !0),
        n("span", Jl, [
          D(d.$slots, "default", {}, void 0, !0)
        ])
      ], 8, Xl),
      t.removable ? (o(), a("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: t.disabled,
        "aria-label": t.removeLabel,
        onClick: c[0] || (c[0] = (h) => l("remove"))
      }, [
        A(O, { name: "x" })
      ], 8, Wl)) : $("", !0)
    ], 2));
  }
}), Pc = /* @__PURE__ */ M(Ql, [["__scopeId", "data-v-d6cd193e"]]);
function Le(t) {
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
function ve(t, e) {
  return e === "first" ? se(t, -1, 1) : se(t, 0, -1);
}
const Zl = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "disabled"], ei = ["id", "aria-label"], ti = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], ni = { class: "phlix-select__check" }, si = /* @__PURE__ */ S({
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
    const s = t, l = e, r = V(() => Le(s.options)), d = ie(), c = _(!1), h = _(-1), f = _(null), u = _(null);
    let i = "", v;
    const b = V(() => r.value.findIndex((y) => y.value === s.modelValue)), m = V(() => {
      var y;
      return ((y = r.value[b.value]) == null ? void 0 : y.label) ?? "";
    }), g = V(() => h.value >= 0 ? `${d}-opt-${h.value}` : void 0);
    function p() {
      s.disabled || c.value || (c.value = !0, h.value = b.value >= 0 ? b.value : ve(r.value, "first"), ne(K));
    }
    function B() {
      c.value = !1;
    }
    function I(y) {
      var T, j;
      const w = r.value[y];
      !w || w.disabled || (w.value !== s.modelValue && (l("update:modelValue", w.value), l("change", w.value)), B(), (j = (T = f.value) == null ? void 0 : T.querySelector(".phlix-select__trigger")) == null || j.focus());
    }
    function H(y) {
      h.value = se(r.value, h.value, y), ne(K);
    }
    function K() {
      var w, T;
      const y = (w = u.value) == null ? void 0 : w.querySelector(".is-active");
      (T = y == null ? void 0 : y.scrollIntoView) == null || T.call(y, { block: "nearest" });
    }
    function q(y) {
      if (!s.disabled)
        switch (y.key) {
          case "ArrowDown":
            y.preventDefault(), c.value ? H(1) : p();
            break;
          case "ArrowUp":
            y.preventDefault(), c.value ? H(-1) : p();
            break;
          case "Home":
            c.value && (y.preventDefault(), h.value = ve(r.value, "first"), ne(K));
            break;
          case "End":
            c.value && (y.preventDefault(), h.value = ve(r.value, "last"), ne(K));
            break;
          case "Enter":
          case " ":
            y.preventDefault(), c.value && h.value >= 0 ? I(h.value) : p();
            break;
          case "Escape":
            c.value && (y.preventDefault(), B());
            break;
          case "Tab":
            B();
            break;
          default:
            y.key.length === 1 && !y.metaKey && !y.ctrlKey && !y.altKey && U(y.key);
        }
    }
    function U(y) {
      c.value || p(), i += y.toLowerCase(), clearTimeout(v), v = setTimeout(() => i = "", 600);
      const w = r.value.findIndex((T) => !T.disabled && T.label.toLowerCase().startsWith(i));
      w >= 0 && (h.value = w, ne(K));
    }
    function P(y) {
      c.value && f.value && !f.value.contains(y.target) && B();
    }
    return oe(c, (y) => {
      y ? document.addEventListener("pointerdown", P, !0) : document.removeEventListener("pointerdown", P, !0);
    }), le(() => {
      document.removeEventListener("pointerdown", P, !0), clearTimeout(v);
    }), (y, w) => (o(), a("div", {
      ref_key: "rootEl",
      ref: f,
      class: L(["phlix-select", { "is-open": c.value, "is-disabled": t.disabled }])
    }, [
      n("button", {
        type: "button",
        class: "phlix-select__trigger",
        "aria-haspopup": "listbox",
        "aria-expanded": c.value,
        "aria-controls": c.value ? `${C(d)}-list` : void 0,
        "aria-activedescendant": c.value ? g.value : void 0,
        "aria-label": t.label,
        disabled: t.disabled,
        onClick: w[0] || (w[0] = (T) => c.value ? B() : p()),
        onKeydown: q
      }, [
        n("span", {
          class: L(["phlix-select__value", { "is-placeholder": b.value < 0 }])
        }, k(b.value >= 0 ? m.value : t.placeholder), 3),
        A(O, {
          name: "chevron-down",
          class: "phlix-select__caret"
        })
      ], 40, Zl),
      Z(n("ul", {
        id: `${C(d)}-list`,
        ref_key: "listEl",
        ref: u,
        class: "phlix-select__list",
        role: "listbox",
        "aria-label": t.label
      }, [
        (o(!0), a(F, null, z(r.value, (T, j) => (o(), a("li", {
          id: `${C(d)}-opt-${j}`,
          key: T.value,
          class: L(["phlix-select__option", { "is-active": j === h.value, "is-disabled": T.disabled }]),
          role: "option",
          "aria-selected": T.value === t.modelValue,
          "aria-disabled": T.disabled || void 0,
          onClick: (ee) => I(j),
          onPointermove: (ee) => !T.disabled && (h.value = j)
        }, [
          n("span", ni, [
            T.value === t.modelValue ? (o(), G(O, {
              key: 0,
              name: "check"
            })) : $("", !0)
          ]),
          J(" " + k(T.label), 1)
        ], 42, ti))), 128))
      ], 8, ei), [
        [$e, c.value]
      ])
    ], 2));
  }
}), Lc = /* @__PURE__ */ M(si, [["__scopeId", "data-v-db34d47a"]]), oi = { class: "phlix-combobox__field" }, ai = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "placeholder", "disabled", "value"], li = ["id", "aria-label"], ii = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], ri = { class: "phlix-combobox__check" }, ci = {
  key: 0,
  class: "phlix-combobox__empty",
  role: "presentation"
}, di = /* @__PURE__ */ S({
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
    const s = t, l = e, r = V(() => Le(s.options)), d = ie(), c = _(!1), h = _(-1), f = _(""), u = _(!1), i = _(null), v = _(null), b = _(null), m = V(() => {
      var w;
      return ((w = r.value.find((T) => T.value === s.modelValue)) == null ? void 0 : w.label) ?? "";
    }), g = V(() => {
      if (!u.value || f.value.trim() === "") return r.value;
      const w = f.value.toLowerCase();
      return r.value.filter((T) => T.label.toLowerCase().includes(w));
    }), p = V(() => h.value >= 0 ? `${d}-opt-${h.value}` : void 0);
    oe(
      () => s.modelValue,
      () => {
        c.value || (f.value = m.value);
      },
      { immediate: !0 }
    );
    function B() {
      s.disabled || c.value || (c.value = !0, h.value = g.value.findIndex((w) => w.value === s.modelValue), h.value < 0 && (h.value = g.value.findIndex((w) => !w.disabled)), ne(q));
    }
    function I() {
      f.value = m.value, u.value = !1, c.value = !1;
    }
    function H(w) {
      var j;
      const T = g.value[w];
      !T || T.disabled || (T.value !== s.modelValue && (l("update:modelValue", T.value), l("change", T.value)), f.value = T.label, u.value = !1, c.value = !1, (j = v.value) == null || j.focus());
    }
    function K(w) {
      g.value.length !== 0 && (h.value = se(g.value, h.value, w), ne(q));
    }
    function q() {
      var w, T, j;
      (j = (T = (w = b.value) == null ? void 0 : w.querySelector(".is-active")) == null ? void 0 : T.scrollIntoView) == null || j.call(T, { block: "nearest" });
    }
    function U(w) {
      f.value = w.target.value, u.value = !0, c.value = !0, h.value = ve(g.value, "first");
    }
    function P(w) {
      if (!s.disabled)
        switch (w.key) {
          case "ArrowDown":
            w.preventDefault(), c.value ? K(1) : B();
            break;
          case "ArrowUp":
            w.preventDefault(), c.value ? K(-1) : B();
            break;
          case "Enter":
            c.value && h.value >= 0 && (w.preventDefault(), H(h.value));
            break;
          case "Escape":
            c.value && (w.preventDefault(), I());
            break;
          case "Tab":
            c.value && I();
            break;
        }
    }
    function y(w) {
      c.value && i.value && !i.value.contains(w.target) && I();
    }
    return oe(c, (w) => {
      w ? document.addEventListener("pointerdown", y, !0) : document.removeEventListener("pointerdown", y, !0);
    }), le(() => document.removeEventListener("pointerdown", y, !0)), (w, T) => (o(), a("div", {
      ref_key: "rootEl",
      ref: i,
      class: L(["phlix-combobox", { "is-open": c.value, "is-disabled": t.disabled }])
    }, [
      n("div", oi, [
        A(O, {
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
          "aria-activedescendant": c.value ? p.value : void 0,
          "aria-label": t.label,
          placeholder: t.placeholder,
          disabled: t.disabled,
          value: f.value,
          onInput: U,
          onFocus: B,
          onKeydown: P
        }, null, 40, ai),
        A(O, {
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
        (o(!0), a(F, null, z(g.value, (j, ee) => (o(), a("li", {
          id: `${C(d)}-opt-${ee}`,
          key: j.value,
          class: L(["phlix-combobox__option", { "is-active": ee === h.value, "is-disabled": j.disabled }]),
          role: "option",
          "aria-selected": j.value === t.modelValue,
          "aria-disabled": j.disabled || void 0,
          onClick: (fe) => H(ee),
          onPointermove: (fe) => !j.disabled && (h.value = ee)
        }, [
          n("span", ri, [
            j.value === t.modelValue ? (o(), G(O, {
              key: 0,
              name: "check"
            })) : $("", !0)
          ]),
          J(" " + k(j.label), 1)
        ], 42, ii))), 128)),
        g.value.length === 0 ? (o(), a("li", ci, "No matches")) : $("", !0)
      ], 8, li), [
        [$e, c.value]
      ])
    ], 2));
  }
}), Ac = /* @__PURE__ */ M(di, [["__scopeId", "data-v-337aab6e"]]), ui = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
let de = 0, Ae = "";
function vi() {
  de === 0 && (Ae = document.body.style.overflow, document.body.style.overflow = "hidden"), de++;
}
function Be() {
  de !== 0 && (de--, de === 0 && (document.body.style.overflow = Ae));
}
function je(t, e, s = {}) {
  const l = s.lockScroll ?? !0;
  let r = null, d = !1;
  function c() {
    const i = t.value;
    return i ? Array.from(i.querySelectorAll(ui)).filter(
      (v) => !v.hasAttribute("hidden") && v.getAttribute("aria-hidden") !== "true"
    ) : [];
  }
  function h(i) {
    var p;
    if (!e.value || !t.value) return;
    if (i.key === "Escape") {
      (p = s.onEscape) != null && p.call(s) && i.preventDefault();
      return;
    }
    if (i.key !== "Tab") return;
    const v = c();
    if (v.length === 0) {
      i.preventDefault(), t.value.focus();
      return;
    }
    const b = v[0], m = v[v.length - 1], g = document.activeElement;
    t.value.contains(g) ? i.shiftKey && g === b ? (i.preventDefault(), m.focus()) : !i.shiftKey && g === m && (i.preventDefault(), b.focus()) : (i.preventDefault(), b.focus());
  }
  function f() {
    r = document.activeElement, l && (vi(), d = !0), document.addEventListener("keydown", h, !0), ne(() => {
      var v;
      (v = c()[0] ?? t.value) == null || v.focus();
    });
  }
  function u() {
    var i;
    document.removeEventListener("keydown", h, !0), d && (Be(), d = !1), r && document.contains(r) && ((i = r.focus) == null || i.call(r)), r = null;
  }
  oe(e, (i) => i ? f() : u(), { immediate: !0 }), le(() => {
    document.removeEventListener("keydown", h, !0), d && (Be(), d = !1);
  });
}
const hi = ["aria-labelledby"], mi = {
  key: 0,
  class: "phlix-modal__header"
}, pi = ["id"], fi = { class: "phlix-modal__body" }, gi = {
  key: 1,
  class: "phlix-modal__footer"
}, _i = /* @__PURE__ */ S({
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
    const s = t, l = e, r = _(s.modelValue);
    oe(() => s.modelValue, (u) => r.value = u);
    const d = _(null), c = ie();
    function h() {
      l("update:modelValue", !1), l("close");
    }
    function f() {
      s.dismissible && h();
    }
    return je(d, r, {
      onEscape: () => s.dismissible ? (h(), !0) : !1
    }), (u, i) => (o(), G(we, { to: "body" }, [
      A(me, { name: "phlix-modal" }, {
        default: X(() => [
          t.modelValue ? (o(), a("div", {
            key: 0,
            class: "phlix-modal",
            onPointerdown: ae(f, ["self"])
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
              t.title || !t.hideClose ? (o(), a("header", mi, [
                t.title ? (o(), a("h2", {
                  key: 0,
                  id: C(c),
                  class: "phlix-modal__title"
                }, k(t.title), 9, pi)) : $("", !0),
                t.hideClose ? $("", !0) : (o(), G(Ie, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  class: "phlix-modal__close",
                  onClick: h
                }))
              ])) : $("", !0),
              n("div", fi, [
                D(u.$slots, "default", {}, void 0, !0)
              ]),
              u.$slots.footer ? (o(), a("footer", gi, [
                D(u.$slots, "footer", {}, void 0, !0)
              ])) : $("", !0)
            ], 10, hi)
          ], 32)) : $("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), jc = /* @__PURE__ */ M(_i, [["__scopeId", "data-v-ad69ec41"]]), bi = ["aria-labelledby"], ki = {
  key: 0,
  class: "phlix-sheet__header"
}, yi = ["id"], $i = { class: "phlix-sheet__body" }, wi = {
  key: 1,
  class: "phlix-sheet__footer"
}, xi = /* @__PURE__ */ S({
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
    const s = t, l = e, r = _(s.modelValue);
    oe(() => s.modelValue, (u) => r.value = u);
    const d = _(null), c = ie();
    function h() {
      l("update:modelValue", !1), l("close");
    }
    function f() {
      s.dismissible && h();
    }
    return je(d, r, {
      onEscape: () => s.dismissible ? (h(), !0) : !1
    }), (u, i) => (o(), G(we, { to: "body" }, [
      A(me, {
        name: `phlix-sheet-${t.side}`
      }, {
        default: X(() => [
          t.modelValue ? (o(), a("div", {
            key: 0,
            class: L(["phlix-sheet", `phlix-sheet--${t.side}`]),
            onPointerdown: ae(f, ["self"])
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
              t.title || !t.hideClose ? (o(), a("header", ki, [
                t.title ? (o(), a("h2", {
                  key: 0,
                  id: C(c),
                  class: "phlix-sheet__title"
                }, k(t.title), 9, yi)) : $("", !0),
                t.hideClose ? $("", !0) : (o(), G(Ie, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  onClick: h
                }))
              ])) : $("", !0),
              n("div", $i, [
                D(u.$slots, "default", {}, void 0, !0)
              ]),
              u.$slots.footer ? (o(), a("footer", wi, [
                D(u.$slots, "footer", {}, void 0, !0)
              ])) : $("", !0)
            ], 8, bi)
          ], 34)) : $("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ]));
  }
}), Rc = /* @__PURE__ */ M(xi, [["__scopeId", "data-v-6960f9fb"]]), Ci = ["id"], Ii = /* @__PURE__ */ S({
  __name: "Tooltip",
  props: {
    text: {},
    placement: { default: "top" },
    delay: { default: 300 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, s = ie(), l = _(!1), r = _(null);
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
    function f() {
      var u;
      clearTimeout(d), l.value = !1, (u = c()) == null || u.removeAttribute("aria-describedby");
    }
    return le(() => clearTimeout(d)), (u, i) => (o(), a("span", {
      ref_key: "wrapEl",
      ref: r,
      class: "phlix-tooltip-wrap",
      onMouseenter: h,
      onMouseleave: f,
      onFocusin: h,
      onFocusout: f,
      onKeydown: Ne(f, ["esc"])
    }, [
      D(u.$slots, "default", {}, void 0, !0),
      A(me, { name: "phlix-tooltip" }, {
        default: X(() => [
          l.value && (t.text || u.$slots.content) ? (o(), a("span", {
            key: 0,
            id: C(s),
            role: "tooltip",
            class: L(["phlix-tooltip", `phlix-tooltip--${t.placement}`])
          }, [
            D(u.$slots, "content", {}, () => [
              J(k(t.text), 1)
            ], !0)
          ], 10, Ci)) : $("", !0)
        ]),
        _: 3
      })
    ], 544));
  }
}), Fc = /* @__PURE__ */ M(Ii, [["__scopeId", "data-v-bdb87991"]]), Si = xe("phlix-toast", () => {
  const t = _([]), e = /* @__PURE__ */ new Map();
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
}), Mi = ["role"], Bi = { class: "phlix-toast__content" }, Ti = {
  key: 0,
  class: "phlix-toast__title"
}, Ei = { class: "phlix-toast__message" }, Vi = ["onClick"], Pi = /* @__PURE__ */ S({
  __name: "ToastHost",
  props: {
    position: { default: "bottom" }
  },
  setup(t) {
    const e = Si(), s = {
      neutral: "info",
      success: "success",
      warning: "alert",
      error: "error",
      info: "info"
    }, l = (r) => r.icon ?? s[r.tone];
    return Q(() => {
    }), le(() => {
    }), (r, d) => (o(), G(we, { to: "body" }, [
      n("div", {
        class: L(["phlix-toasts", `phlix-toasts--${t.position}`]),
        role: "region",
        "aria-label": "Notifications"
      }, [
        A(He, { name: "phlix-toast" }, {
          default: X(() => [
            (o(!0), a(F, null, z(C(e).toasts, (c) => (o(), a("div", {
              key: c.id,
              class: L(["phlix-toast", `phlix-toast--${c.tone}`]),
              role: c.tone === "error" ? "alert" : "status"
            }, [
              A(O, {
                name: l(c),
                class: "phlix-toast__icon"
              }, null, 8, ["name"]),
              n("div", Bi, [
                c.title ? (o(), a("p", Ti, k(c.title), 1)) : $("", !0),
                n("p", Ei, k(c.message), 1)
              ]),
              c.action ? (o(), a("button", {
                key: 0,
                type: "button",
                class: "phlix-toast__action",
                onClick: (h) => {
                  c.action.onClick(), C(e).dismiss(c.id);
                }
              }, k(c.action.label), 9, Vi)) : $("", !0),
              A(Ie, {
                name: "x",
                label: "Dismiss",
                size: "sm",
                class: "phlix-toast__close",
                onClick: (h) => C(e).dismiss(c.id)
              }, null, 8, ["onClick"])
            ], 10, Mi))), 128))
          ]),
          _: 1
        })
      ], 2)
    ]));
  }
}), zc = /* @__PURE__ */ M(Pi, [["__scopeId", "data-v-df4e2232"]]), Li = {
  key: 0,
  class: "phlix-skel-text",
  "aria-hidden": "true"
}, Ai = /* @__PURE__ */ S({
  __name: "Skeleton",
  props: {
    variant: { default: "rect" },
    width: {},
    height: {},
    radius: {},
    lines: { default: 1 }
  },
  setup(t) {
    return (e, s) => t.variant === "text" ? (o(), a("div", Li, [
      (o(!0), a(F, null, z(t.lines, (l) => (o(), a("span", {
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
}), Dc = /* @__PURE__ */ M(Ai, [["__scopeId", "data-v-c34e4066"]]), ji = ["aria-label"], Ri = /* @__PURE__ */ S({
  __name: "Spinner",
  props: {
    size: {},
    label: { default: "Loading" }
  },
  setup(t) {
    const e = t, s = V(
      () => e.size === void 0 ? void 0 : typeof e.size == "number" ? `${e.size}px` : e.size
    );
    return (l, r) => (o(), a("span", {
      class: "phlix-spinner",
      role: "status",
      "aria-label": t.label,
      style: Y(s.value ? { fontSize: s.value } : void 0)
    }, [
      A(O, {
        name: "spinner",
        class: "phlix-spinner__icon"
      })
    ], 12, ji));
  }
}), Uc = /* @__PURE__ */ M(Ri, [["__scopeId", "data-v-2e0507dd"]]), Fi = {
  class: "phlix-empty",
  role: "status"
}, zi = { class: "phlix-empty__icon" }, Di = { class: "phlix-empty__title" }, Ui = {
  key: 0,
  class: "phlix-empty__desc"
}, Ni = {
  key: 1,
  class: "phlix-empty__actions"
}, Hi = /* @__PURE__ */ S({
  __name: "EmptyState",
  props: {
    icon: { default: "film" },
    title: {},
    description: {}
  },
  setup(t) {
    return (e, s) => (o(), a("div", Fi, [
      n("span", zi, [
        A(O, { name: t.icon }, null, 8, ["name"])
      ]),
      n("h3", Di, k(t.title), 1),
      t.description || e.$slots.default ? (o(), a("p", Ui, [
        D(e.$slots, "default", {}, () => [
          J(k(t.description), 1)
        ], !0)
      ])) : $("", !0),
      e.$slots.actions ? (o(), a("div", Ni, [
        D(e.$slots, "actions", {}, void 0, !0)
      ])) : $("", !0)
    ]));
  }
}), Nc = /* @__PURE__ */ M(Hi, [["__scopeId", "data-v-9c6d2458"]]), Gi = { class: "phlix-tabs" }, Ki = ["aria-label"], Oi = ["id", "aria-selected", "aria-controls", "tabindex", "disabled", "onClick"], qi = ["id", "aria-labelledby"], Yi = /* @__PURE__ */ S({
  __name: "Tabs",
  props: {
    modelValue: {},
    tabs: {},
    label: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const s = t, l = e, r = ie(), d = _(null), c = V(() => s.tabs.findIndex((m) => m.value === s.modelValue)), h = (m) => `${r}-tab-${m}`, f = (m) => `${r}-panel-${m}`, u = V(() => s.tabs.map((m) => ({ value: m.value, label: m.label, disabled: m.disabled })));
    function i(m) {
      const g = s.tabs.find((p) => p.value === m);
      !g || g.disabled || m !== s.modelValue && l("update:modelValue", m);
    }
    function v(m) {
      var g, p;
      (p = (g = d.value) == null ? void 0 : g.querySelectorAll('[role="tab"]')[m]) == null || p.focus();
    }
    function b(m) {
      let g = -1;
      switch (m.key) {
        case "ArrowRight":
        case "ArrowDown":
          g = se(u.value, c.value, 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          g = se(u.value, c.value, -1);
          break;
        case "Home":
          g = se(u.value, -1, 1);
          break;
        case "End":
          g = se(u.value, 0, -1);
          break;
        default:
          return;
      }
      g >= 0 && (m.preventDefault(), i(s.tabs[g].value), v(g));
    }
    return (m, g) => (o(), a("div", Gi, [
      n("div", {
        ref_key: "listEl",
        ref: d,
        class: "phlix-tabs__list",
        role: "tablist",
        "aria-label": t.label,
        onKeydown: b
      }, [
        (o(!0), a(F, null, z(t.tabs, (p) => (o(), a("button", {
          id: h(p.value),
          key: p.value,
          type: "button",
          role: "tab",
          class: L(["phlix-tabs__tab", { "is-active": p.value === t.modelValue }]),
          "aria-selected": p.value === t.modelValue,
          "aria-controls": f(p.value),
          tabindex: p.value === t.modelValue ? 0 : -1,
          disabled: p.disabled,
          onClick: (B) => i(p.value)
        }, [
          p.icon ? (o(), G(O, {
            key: 0,
            name: p.icon,
            class: "phlix-tabs__icon"
          }, null, 8, ["name"])) : $("", !0),
          J(" " + k(p.label), 1)
        ], 10, Oi))), 128))
      ], 40, Ki),
      t.modelValue ? (o(), a("div", {
        key: 0,
        id: f(t.modelValue),
        class: "phlix-tabs__panel",
        role: "tabpanel",
        "aria-labelledby": h(t.modelValue),
        tabindex: "0"
      }, [
        D(m.$slots, t.modelValue, {}, () => [
          D(m.$slots, "default", {}, void 0, !0)
        ], !0)
      ], 8, qi)) : $("", !0)
    ]));
  }
}), Hc = /* @__PURE__ */ M(Yi, [["__scopeId", "data-v-95493097"]]), Xi = { class: "phlix-kbd" }, Ji = {
  key: 1,
  class: "phlix-kbd__key"
}, Wi = /* @__PURE__ */ S({
  __name: "Kbd",
  props: {
    keys: {}
  },
  setup(t) {
    const e = t, s = V(() => e.keys === void 0 ? [] : Array.isArray(e.keys) ? e.keys : [e.keys]);
    return (l, r) => (o(), a("span", Xi, [
      s.value.length ? (o(!0), a(F, { key: 0 }, z(s.value, (d, c) => (o(), a("kbd", {
        key: c,
        class: "phlix-kbd__key"
      }, k(d), 1))), 128)) : (o(), a("kbd", Ji, [
        D(l.$slots, "default", {}, void 0, !0)
      ]))
    ]));
  }
}), Gc = /* @__PURE__ */ M(Wi, [["__scopeId", "data-v-5e5c4a8a"]]), Qi = /* @__PURE__ */ S({
  __name: "Reveal",
  props: {
    tag: { default: "div" },
    delay: { default: 0 },
    y: { default: 12 },
    whenVisible: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, s = _(null), l = _(!1), r = _(!1);
    let d = null;
    const c = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return Q(() => {
      if (c) {
        l.value = !0;
        return;
      }
      e.whenVisible && typeof IntersectionObserver < "u" ? (d = new IntersectionObserver(
        (h) => {
          h.some((f) => f.isIntersecting) && (l.value = !0, d == null || d.disconnect(), d = null);
        },
        { threshold: 0.1 }
      ), s.value && d.observe(s.value)) : requestAnimationFrame(() => requestAnimationFrame(() => l.value = !0));
    }), le(() => {
      d == null || d.disconnect(), d = null;
    }), (h, f) => (o(), G(Ee(t.tag), {
      ref_key: "el",
      ref: s,
      class: L(["phlix-reveal", { "is-revealed": l.value, "is-settled": r.value }]),
      style: Y({ "--reveal-delay": `${t.delay}ms`, "--reveal-y": `${t.y}px` }),
      onTransitionend: f[0] || (f[0] = (u) => r.value = !0)
    }, {
      default: X(() => [
        D(h.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 40, ["class", "style"]));
  }
}), Kc = /* @__PURE__ */ M(Qi, [["__scopeId", "data-v-162397f9"]]), Zi = /* @__PURE__ */ S({
  __name: "PageTransition",
  props: {
    mode: { default: "fade" }
  },
  setup(t) {
    return (e, s) => (o(), G(me, {
      name: `phlix-page-${t.mode}`,
      mode: "out-in"
    }, {
      default: X(() => [
        D(e.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 8, ["name"]));
  }
}), Oc = /* @__PURE__ */ M(Zi, [["__scopeId", "data-v-dafe74d0"]]), er = { class: "library-scan-page" }, tr = {
  key: 0,
  class: "loading"
}, nr = {
  key: 1,
  class: "error"
}, sr = {
  key: 2,
  class: "libraries-list"
}, or = { class: "library-info" }, ar = { class: "library-name" }, lr = { class: "library-type" }, ir = { class: "library-paths" }, rr = { class: "library-meta" }, cr = { key: 0 }, dr = {
  key: 0,
  class: "scan-status"
}, ur = { class: "library-actions" }, vr = ["onClick", "disabled"], hr = ["onClick", "disabled"], mr = {
  key: 0,
  class: "empty-state"
}, pr = /* @__PURE__ */ S({
  __name: "LibraryScanPage",
  setup(t) {
    const e = _([]), s = _({}), l = _(!0), r = _(null);
    async function d() {
      try {
        const v = await W.get("/api/v1/libraries");
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
        const b = await W.get(`/api/v1/libraries/${v}/scan-status`);
        b.job && (s.value[v] = b.job);
      } catch {
      }
    }
    async function h(v) {
      try {
        await W.post(`/api/v1/libraries/${v}/scan`), await c(v);
      } catch (b) {
        r.value = b instanceof Error ? b.message : "Failed to trigger scan";
      }
    }
    async function f(v) {
      try {
        await W.post(`/api/v1/libraries/${v}/rescan`), await c(v);
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
    return Q(() => {
      d();
    }), (v, b) => (o(), a("div", er, [
      b[0] || (b[0] = n("div", { class: "scan-header" }, [
        n("h1", { class: "scan-title" }, "Library Scanner"),
        n("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      l.value ? (o(), a("div", tr, "Loading libraries...")) : r.value ? (o(), a("div", nr, k(r.value), 1)) : (o(), a("div", sr, [
        (o(!0), a(F, null, z(e.value, (m) => {
          var g, p, B, I;
          return o(), a("div", {
            key: m.id,
            class: "library-card"
          }, [
            n("div", or, [
              n("h3", ar, k(m.name), 1),
              n("span", lr, k(m.type), 1),
              n("p", ir, k(m.paths.join(", ")), 1),
              n("div", rr, [
                m.item_count !== void 0 ? (o(), a("span", cr, k(m.item_count) + " items", 1)) : $("", !0),
                n("span", null, "Last scan: " + k(u(m.last_scan_at)), 1)
              ]),
              s.value[m.id] ? (o(), a("div", dr, k(i(s.value[m.id])), 1)) : $("", !0)
            ]),
            n("div", ur, [
              n("button", {
                class: "btn btn-scan",
                onClick: (H) => h(m.id),
                disabled: ((g = s.value[m.id]) == null ? void 0 : g.status) === "running" || ((p = s.value[m.id]) == null ? void 0 : p.status) === "queued"
              }, " Scan ", 8, vr),
              n("button", {
                class: "btn btn-rescan",
                onClick: (H) => f(m.id),
                disabled: ((B = s.value[m.id]) == null ? void 0 : B.status) === "running" || ((I = s.value[m.id]) == null ? void 0 : I.status) === "queued"
              }, " Rescan ", 8, hr)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (o(), a("div", mr, " No libraries configured. Add a library to get started. ")) : $("", !0)
      ]))
    ]));
  }
}), qc = /* @__PURE__ */ M(pr, [["__scopeId", "data-v-62b3805e"]]), fr = { class: "my-servers-page" }, gr = {
  key: 0,
  class: "loading"
}, _r = {
  key: 1,
  class: "error"
}, br = {
  key: 2,
  class: "servers-list"
}, kr = { class: "server-info" }, yr = { class: "server-name" }, $r = { class: "server-url" }, wr = { class: "server-meta" }, xr = { key: 0 }, Cr = {
  key: 0,
  class: "empty-state"
}, Ir = /* @__PURE__ */ S({
  __name: "MyServersPage",
  setup(t) {
    const e = _([]), s = _(!0), l = _(null);
    async function r() {
      try {
        const h = await W.get("/api/v1/servers");
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
    return Q(() => {
      r();
    }), (h, f) => (o(), a("div", fr, [
      f[2] || (f[2] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "My Servers"),
        n("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      s.value ? (o(), a("div", gr, "Loading servers...")) : l.value ? (o(), a("div", _r, k(l.value), 1)) : (o(), a("div", br, [
        (o(!0), a(F, null, z(e.value, (u) => (o(), a("div", {
          key: u.id,
          class: "server-card"
        }, [
          n("div", {
            class: "server-status",
            style: Y({ backgroundColor: d(u.status) })
          }, null, 4),
          n("div", kr, [
            n("h3", yr, k(u.name), 1),
            n("p", $r, k(u.url), 1),
            n("div", wr, [
              n("span", null, k(u.owner), 1),
              u.library_count !== void 0 ? (o(), a("span", xr, k(u.library_count) + " libraries", 1)) : $("", !0),
              n("span", null, "Last seen: " + k(c(u.last_seen)), 1)
            ])
          ]),
          f[0] || (f[0] = n("div", { class: "server-actions" }, [
            n("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", Cr, [...f[1] || (f[1] = [
          n("p", null, "No servers connected yet.", -1),
          n("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : $("", !0)
      ]))
    ]));
  }
}), Yc = /* @__PURE__ */ M(Ir, [["__scopeId", "data-v-b9237da4"]]), Sr = { class: "federation-page" }, Mr = {
  key: 0,
  class: "loading"
}, Br = {
  key: 1,
  class: "error"
}, Tr = {
  key: 2,
  class: "federation-content"
}, Er = { class: "peers-section" }, Vr = { class: "peers-list" }, Pr = { class: "peer-info" }, Lr = { class: "peer-name" }, Ar = { class: "peer-url" }, jr = { class: "peer-meta" }, Rr = { key: 0 }, Fr = { class: "peer-actions" }, zr = ["onClick"], Dr = {
  key: 1,
  class: "status-badge"
}, Ur = {
  key: 0,
  class: "empty-state"
}, Nr = { class: "add-peer-section" }, Hr = /* @__PURE__ */ S({
  __name: "FederationPage",
  setup(t) {
    const e = _([]), s = _(!0), l = _(null);
    async function r() {
      try {
        const u = await W.get("/api/v1/federation/peers");
        e.value = u.peers || [];
      } catch (u) {
        l.value = u instanceof Error ? u.message : "Failed to load federation peers";
      } finally {
        s.value = !1;
      }
    }
    async function d(u) {
      try {
        await W.post("/api/v1/federation/connect", { url: u }), await r();
      } catch (i) {
        l.value = i instanceof Error ? i.message : "Failed to connect to peer";
      }
    }
    async function c(u) {
      try {
        await W.post(`/api/v1/federation/peers/${u}/disconnect`), await r();
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
    function f(u) {
      return u ? new Date(u).toLocaleString() : "Never";
    }
    return Q(() => {
      r();
    }), (u, i) => (o(), a("div", Sr, [
      i[5] || (i[5] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Federation"),
        n("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      s.value ? (o(), a("div", Mr, "Loading federation peers...")) : l.value ? (o(), a("div", Br, k(l.value), 1)) : (o(), a("div", Tr, [
        n("div", Er, [
          i[2] || (i[2] = n("h2", { class: "section-title" }, "Connected Peers", -1)),
          n("div", Vr, [
            (o(!0), a(F, null, z(e.value, (v) => (o(), a("div", {
              key: v.id,
              class: "peer-card"
            }, [
              n("div", {
                class: "peer-status",
                style: Y({ backgroundColor: h(v.status) })
              }, null, 4),
              n("div", Pr, [
                n("h3", Lr, k(v.name), 1),
                n("p", Ar, k(v.url), 1),
                n("div", jr, [
                  v.shared_libraries_count !== void 0 ? (o(), a("span", Rr, k(v.shared_libraries_count) + " shared libraries", 1)) : $("", !0),
                  n("span", null, "Last sync: " + k(f(v.last_sync)), 1)
                ])
              ]),
              n("div", Fr, [
                v.status === "connected" ? (o(), a("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (b) => c(v.id)
                }, " Disconnect ", 8, zr)) : v.status === "pending" ? (o(), a("span", Dr, "Pending")) : $("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (o(), a("div", Ur, [...i[1] || (i[1] = [
              n("p", null, "No federation peers connected.", -1)
            ])])) : $("", !0)
          ])
        ]),
        n("div", Nr, [
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
}), Xc = /* @__PURE__ */ M(Hr, [["__scopeId", "data-v-91ba2781"]]), Gr = { class: "manage-shares-page" }, Kr = {
  key: 0,
  class: "loading"
}, Or = {
  key: 1,
  class: "error"
}, qr = {
  key: 2,
  class: "shares-list"
}, Yr = { class: "share-info" }, Xr = { class: "share-library" }, Jr = { class: "share-meta" }, Wr = {
  key: 0,
  class: "expired-badge"
}, Qr = { class: "share-dates" }, Zr = { key: 0 }, ec = { class: "share-actions" }, tc = ["onClick"], nc = {
  key: 0,
  class: "empty-state"
}, sc = /* @__PURE__ */ S({
  __name: "ManageSharesPage",
  setup(t) {
    const e = _([]), s = _(!0), l = _(null);
    async function r() {
      try {
        const f = await W.get("/api/v1/shares");
        e.value = f.shares || [];
      } catch (f) {
        l.value = f instanceof Error ? f.message : "Failed to load shares";
      } finally {
        s.value = !1;
      }
    }
    async function d(f) {
      try {
        await W.delete(`/api/v1/shares/${f}`), await r();
      } catch (u) {
        l.value = u instanceof Error ? u.message : "Failed to revoke share";
      }
    }
    function c(f) {
      return new Date(f).toLocaleString();
    }
    function h(f) {
      return f ? new Date(f) < /* @__PURE__ */ new Date() : !1;
    }
    return Q(() => {
      r();
    }), (f, u) => (o(), a("div", Gr, [
      u[1] || (u[1] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Manage Shares"),
        n("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      s.value ? (o(), a("div", Kr, "Loading shares...")) : l.value ? (o(), a("div", Or, k(l.value), 1)) : (o(), a("div", qr, [
        (o(!0), a(F, null, z(e.value, (i) => (o(), a("div", {
          key: i.id,
          class: "share-card"
        }, [
          n("div", Yr, [
            n("h3", Xr, k(i.library_name), 1),
            n("div", Jr, [
              n("span", null, "Shared with: " + k(i.shared_with), 1),
              n("span", {
                class: L(["permission-badge", i.permissions])
              }, k(i.permissions), 3),
              i.expires_at && h(i.expires_at) ? (o(), a("span", Wr, "Expired")) : $("", !0)
            ]),
            n("p", Qr, [
              J(" Created: " + k(c(i.created_at)) + " ", 1),
              i.expires_at ? (o(), a("span", Zr, " | Expires: " + k(c(i.expires_at)), 1)) : $("", !0)
            ])
          ]),
          n("div", ec, [
            n("button", {
              class: "btn btn-danger",
              onClick: (v) => d(i.id)
            }, "Revoke", 8, tc)
          ])
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", nc, [...u[0] || (u[0] = [
          n("p", null, "No library shares found.", -1)
        ])])) : $("", !0)
      ]))
    ]));
  }
}), Jc = /* @__PURE__ */ M(sc, [["__scopeId", "data-v-bd8771ac"]]), oc = { class: "audit-logs-page" }, ac = {
  key: 0,
  class: "loading"
}, lc = {
  key: 1,
  class: "error"
}, ic = {
  key: 2,
  class: "logs-container"
}, rc = { class: "logs-list" }, cc = { class: "log-content" }, dc = { class: "log-header" }, uc = { class: "log-action" }, vc = { class: "log-actor" }, hc = { class: "log-time" }, mc = {
  key: 0,
  class: "log-target"
}, pc = {
  key: 1,
  class: "log-details"
}, fc = {
  key: 2,
  class: "log-ip"
}, gc = {
  key: 0,
  class: "empty-state"
}, _c = {
  key: 0,
  class: "pagination"
}, bc = ["disabled"], kc = { class: "page-info" }, yc = ["disabled"], $c = /* @__PURE__ */ S({
  __name: "AuditLogsPage",
  setup(t) {
    const e = _([]), s = _(!0), l = _(null), r = _(1), d = _(1);
    async function c(i = 1) {
      try {
        s.value = !0;
        const v = await W.get(
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
    function f(i) {
      return i.includes("create") || i.includes("add") ? "#22c55e" : i.includes("delete") || i.includes("remove") ? "#ef4444" : i.includes("update") || i.includes("edit") ? "#3b82f6" : i.includes("login") || i.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function u(i) {
      return i.includes("create") || i.includes("add") ? "+" : i.includes("delete") || i.includes("remove") ? "-" : i.includes("update") || i.includes("edit") ? "~" : i.includes("login") || i.includes("auth") ? "@" : "#";
    }
    return Q(() => {
      c();
    }), (i, v) => (o(), a("div", oc, [
      v[3] || (v[3] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Audit Logs"),
        n("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      s.value ? (o(), a("div", ac, "Loading audit logs...")) : l.value ? (o(), a("div", lc, k(l.value), 1)) : (o(), a("div", ic, [
        n("div", rc, [
          (o(!0), a(F, null, z(e.value, (b) => (o(), a("div", {
            key: b.id,
            class: "log-entry"
          }, [
            n("div", {
              class: "log-icon",
              style: Y({ backgroundColor: f(b.action) })
            }, k(u(b.action)), 5),
            n("div", cc, [
              n("div", dc, [
                n("span", uc, k(b.action), 1),
                n("span", vc, k(b.actor), 1),
                n("span", hc, k(h(b.created_at)), 1)
              ]),
              b.target ? (o(), a("p", mc, "Target: " + k(b.target), 1)) : $("", !0),
              b.details ? (o(), a("p", pc, k(b.details), 1)) : $("", !0),
              b.ip_address ? (o(), a("span", fc, "IP: " + k(b.ip_address), 1)) : $("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (o(), a("div", gc, [...v[2] || (v[2] = [
            n("p", null, "No audit logs found.", -1)
          ])])) : $("", !0)
        ]),
        d.value > 1 ? (o(), a("div", _c, [
          n("button", {
            class: "btn btn-secondary",
            disabled: r.value <= 1,
            onClick: v[0] || (v[0] = (b) => c(r.value - 1))
          }, " Previous ", 8, bc),
          n("span", kc, "Page " + k(r.value) + " of " + k(d.value), 1),
          n("button", {
            class: "btn btn-secondary",
            disabled: r.value >= d.value,
            onClick: v[1] || (v[1] = (b) => c(r.value + 1))
          }, " Next ", 8, yc)
        ])) : $("", !0)
      ]))
    ]));
  }
}), Wc = /* @__PURE__ */ M($c, [["__scopeId", "data-v-05910fd9"]]);
export {
  pe as ApiClient,
  vt as ApiError,
  Mc as AppBackdrop,
  ot as AppLayout,
  Wc as AuditLogsPage,
  Tc as Badge,
  hn as BrowsePage,
  Bc as Button,
  Pc as Chip,
  Ac as Combobox,
  Nc as EmptyState,
  Xc as FederationPage,
  on as FilterBar,
  O as Icon,
  Ie as IconButton,
  Gc as Kbd,
  qc as LibraryScanPage,
  An as LocalStorageTokenStore,
  Gn as LoginForm,
  Yn as LoginPage,
  Jc as ManageSharesPage,
  St as MediaCard,
  Pt as MediaGrid,
  jc as Modal,
  Yc as MyServersPage,
  Oc as PageTransition,
  it as PhlixApp,
  Bn as Player,
  Ln as PlayerPage,
  Kc as Reveal,
  Lc as Select,
  xs as SettingsForm,
  Ss as SettingsPage,
  Rc as Sheet,
  ls as SignupForm,
  ds as SignupPage,
  Dc as Skeleton,
  Ec as Slider,
  Uc as Spinner,
  Vc as Switch,
  Hc as Tabs,
  zc as ToastHost,
  Fc as Tooltip,
  Sc as createPhlixApp,
  Ce as useAuthStore,
  je as useFocusTrap,
  Pe as useMediaStore,
  Si as useToastStore
};
//# sourceMappingURL=phlix-ui.js.map
