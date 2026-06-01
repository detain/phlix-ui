var ue = Object.defineProperty;
var de = (a, e, t) => e in a ? ue(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var q = (a, e, t) => de(a, typeof e != "symbol" ? e + "" : e, t);
import { openBlock as r, createElementBlock as c, createElementVNode as s, renderSlot as G, defineComponent as x, createBlock as W, withCtx as Y, createVNode as L, unref as v, createTextVNode as te, toDisplayString as _, ref as f, computed as B, createCommentVNode as I, Fragment as E, renderList as F, withDirectives as ve, vModelText as fe, normalizeClass as j, inject as oe, onMounted as ne, watch as pe, onUnmounted as he, withModifiers as se, normalizeStyle as me, createStaticVNode as ge, createApp as _e } from "vue";
import { defineStore as ye, createPinia as ke } from "pinia";
import { RouterView as be, RouterLink as ae, useRoute as $e, createRouter as Te, createWebHistory as we } from "vue-router";
const S = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [l, d] of e)
    t[l] = d;
  return t;
}, Ce = {}, Re = { class: "app-layout" }, Se = { class: "app-header" }, Pe = { class: "header-inner" }, Ee = { class: "logo" }, Fe = { class: "nav" }, Ie = { class: "app-main" }, xe = { class: "app-footer" };
function Ue(a, e) {
  return r(), c("div", Re, [
    s("header", Se, [
      s("div", Pe, [
        s("div", Ee, [
          G(a.$slots, "logo", {}, () => [
            e[0] || (e[0] = s("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        s("nav", Fe, [
          G(a.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    s("main", Ie, [
      G(a.$slots, "default", {}, void 0, !0)
    ]),
    s("footer", xe, [
      G(a.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Be = /* @__PURE__ */ S(Ce, [["render", Ue], ["__scopeId", "data-v-9f6c6d16"]]), Ne = { class: "main-nav" }, Ae = /* @__PURE__ */ x({
  __name: "PhlixApp",
  setup(a) {
    return (e, t) => (r(), W(Be, null, {
      nav: Y(() => [
        s("nav", Ne, [
          L(v(ae), {
            to: "/app",
            class: "nav-link"
          }, {
            default: Y(() => [...t[0] || (t[0] = [
              te("Browse", -1)
            ])]),
            _: 1
          }),
          L(v(ae), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: Y(() => [...t[1] || (t[1] = [
              te("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: Y(() => [
        L(v(be))
      ]),
      _: 1
    }));
  }
}), Me = /* @__PURE__ */ S(Ae, [["__scopeId", "data-v-35b5e7c6"]]), Ge = { class: "phlix-placeholder" }, Le = { class: "placeholder-content" }, Oe = /* @__PURE__ */ x({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(a) {
    return (e, t) => (r(), c("div", Ge, [
      s("div", Le, [
        t[0] || (t[0] = s("h1", null, "Shared UI loading...", -1)),
        s("p", null, "Phlix " + _(a.appName) + " is initializing", 1)
      ])
    ]));
  }
}), qe = /* @__PURE__ */ S(Oe, [["__scopeId", "data-v-bf79ac4c"]]);
class Ye extends Error {
  constructor(e, t, l = null) {
    super(e), this.status = t, this.body = l, this.name = "ApiError";
  }
}
function je(a) {
  return a === !0 || a === 1 || a === "1" || a === "true";
}
class Z {
  constructor(e = {}) {
    q(this, "baseUrl");
    q(this, "tokens");
    q(this, "doFetch");
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
  async request(e, t, l = null) {
    const d = () => {
      const b = {
        "Content-Type": "application/json"
      }, $ = this.tokens.getAccessToken();
      $ && (b.Authorization = `Bearer ${$}`);
      const y = { method: e, headers: b, credentials: "same-origin" };
      return l !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (y.body = JSON.stringify(l)), y;
    }, p = `${this.baseUrl}${t}`;
    let m = await this.doFetch(p, d());
    return m.status === 401 && await this.refreshToken() && (m = await this.doFetch(p, d())), this.handleResponse(m);
  }
  async handleResponse(e) {
    const d = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const p = this.extractError(d);
      throw new Ye(p, e.status, d);
    }
    return d;
  }
  extractError(e) {
    if (e && typeof e == "object") {
      const t = e;
      if (typeof t.error == "string")
        return t.error;
      if (typeof t.message == "string")
        return t.message;
    }
    return "Request failed";
  }
  async refreshToken() {
    const e = this.tokens.getRefreshToken();
    if (!e)
      return !1;
    try {
      const t = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ refresh_token: e })
      });
      if (!t.ok)
        return !1;
      const l = await t.json();
      return typeof l.access_token != "string" ? !1 : (this.tokens.setAccessToken(l.access_token), typeof l.refresh_token == "string" && this.tokens.setRefreshToken(l.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, t) {
    const l = t ? "?" + new URLSearchParams(t).toString() : "";
    return this.request("GET", e + l);
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
    const { user: e } = await this.get("/api/v1/auth/me");
    return { ...e, is_admin: je(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
new Z();
const le = ye("media", () => {
  const a = f([]), e = f(0), t = f(!1), l = f(null), d = f(""), p = f([]), m = f(void 0), b = f(void 0), $ = f([]), y = f([]), w = f("name"), C = f("asc"), U = f(24), i = f(0), o = B(() => i.value + a.value.length < e.value), n = B(() => {
    const u = {};
    return d.value && (u.search = d.value), p.value.length && (u.genres = p.value), m.value !== void 0 && (u.yearFrom = m.value), b.value !== void 0 && (u.yearTo = b.value), $.value.length && (u.ratings = $.value), y.value.length && (u.types = y.value), u.sort = w.value, u.order = C.value, u.limit = U.value, u.offset = i.value, u;
  }), N = B(() => {
    const u = /* @__PURE__ */ new Set();
    return a.value.forEach((k) => {
      var g;
      return (g = k.genres) == null ? void 0 : g.forEach((A) => u.add(A));
    }), Array.from(u).sort();
  }), V = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], D = ["movie", "series", "episode", "audio", "image"];
  function z(u) {
    var A, P, ee;
    const k = new URLSearchParams(), g = n.value;
    return g.search && k.set("search", g.search), (A = g.genres) == null || A.forEach((M) => k.append("genres", M)), g.yearFrom !== void 0 && k.set("yearFrom", String(g.yearFrom)), g.yearTo !== void 0 && k.set("yearTo", String(g.yearTo)), (P = g.ratings) == null || P.forEach((M) => k.append("ratings", M)), (ee = g.types) == null || ee.forEach((M) => k.append("types", M)), g.sort && k.set("sort", g.sort), g.order && k.set("order", g.order), k.set("limit", String(g.limit)), k.set("offset", String(g.offset)), `${u}/api/v1/media?${k.toString()}`;
  }
  async function O(u, k = !1) {
    t.value = !0, l.value = null;
    try {
      const g = new Z({ baseUrl: u }), A = z(u), P = await g.get(A);
      k ? a.value = [...a.value, ...P.items] : a.value = P.items, e.value = P.total, i.value = (P.offset ?? 0) + P.items.length;
    } catch (g) {
      l.value = g instanceof Error ? g.message : "Failed to load media";
    } finally {
      t.value = !1;
    }
  }
  async function H(u) {
    await O(u, !0);
  }
  function T() {
    a.value = [], e.value = 0, i.value = 0, l.value = null;
  }
  function h(u) {
    d.value = u, i.value = 0;
  }
  function R(u) {
    p.value = u, i.value = 0;
  }
  function J(u, k) {
    m.value = u, b.value = k, i.value = 0;
  }
  function re(u) {
    $.value = u, i.value = 0;
  }
  function ie(u) {
    y.value = u, i.value = 0;
  }
  function ce(u, k) {
    w.value = u, k && (C.value = k), i.value = 0;
  }
  return {
    items: a,
    total: e,
    loading: t,
    error: l,
    search: d,
    selectedGenres: p,
    yearFrom: m,
    yearTo: b,
    selectedRatings: $,
    selectedTypes: y,
    sort: w,
    order: C,
    limit: U,
    offset: i,
    hasMore: o,
    queryParams: n,
    availableGenres: N,
    availableRatings: V,
    availableTypes: D,
    fetchMedia: O,
    loadMore: H,
    reset: T,
    setSearch: h,
    setGenres: R,
    setYearRange: J,
    setRatings: re,
    setTypes: ie,
    setSort: ce
  };
}), Ve = { class: "media-card" }, De = ["href"], ze = { class: "card-poster" }, He = ["src", "alt"], Je = {
  key: 1,
  class: "poster-placeholder"
}, Ke = { class: "placeholder-type" }, Xe = { class: "card-overlay" }, Qe = {
  key: 0,
  class: "card-year"
}, We = {
  key: 1,
  class: "card-rating"
}, Ze = { class: "card-info" }, et = ["title"], tt = {
  key: 0,
  class: "card-genres"
}, st = /* @__PURE__ */ x({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(a) {
    return (e, t) => {
      var l;
      return r(), c("article", Ve, [
        s("a", {
          href: a.to ?? `/app/player/${a.item.id}`,
          class: "card-link"
        }, [
          s("div", ze, [
            a.item.poster_url ? (r(), c("img", {
              key: 0,
              src: a.item.poster_url,
              alt: a.item.name,
              loading: "lazy"
            }, null, 8, He)) : (r(), c("div", Je, [
              t[0] || (t[0] = s("span", { class: "placeholder-icon" }, "🎬", -1)),
              s("span", Ke, _(a.item.type), 1)
            ]))
          ]),
          s("div", Xe, [
            a.item.year ? (r(), c("span", Qe, _(a.item.year), 1)) : I("", !0),
            a.item.rating ? (r(), c("span", We, _(a.item.rating), 1)) : I("", !0)
          ]),
          s("div", Ze, [
            s("h3", {
              class: "card-title",
              title: a.item.name
            }, _(a.item.name), 9, et),
            (l = a.item.genres) != null && l.length ? (r(), c("p", tt, _(a.item.genres.slice(0, 2).join(", ")), 1)) : I("", !0)
          ])
        ], 8, De)
      ]);
    };
  }
}), at = /* @__PURE__ */ S(st, [["__scopeId", "data-v-e60c8481"]]), ot = { class: "media-grid-container" }, nt = {
  key: 0,
  class: "media-grid-skeleton"
}, lt = {
  key: 1,
  class: "media-grid-empty"
}, rt = {
  key: 2,
  class: "media-grid"
}, it = /* @__PURE__ */ x({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (r(), c("div", ot, [
      a.loading ? (r(), c("div", nt, [
        (r(), c(E, null, F(12, (l) => s("div", {
          key: l,
          class: "skeleton-card"
        }, [...t[0] || (t[0] = [
          s("div", { class: "skeleton-poster" }, null, -1),
          s("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : a.items.length === 0 ? (r(), c("div", lt, [...t[1] || (t[1] = [
        s("p", null, "No media found.", -1),
        s("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (r(), c("div", rt, [
        (r(!0), c(E, null, F(a.items, (l) => (r(), W(at, {
          key: l.id,
          item: l
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), ct = /* @__PURE__ */ S(it, [["__scopeId", "data-v-b7e87216"]]), ut = { class: "filter-bar" }, dt = { class: "filter-search" }, vt = { class: "filter-row" }, ft = { class: "filter-group" }, pt = ["value"], ht = ["value"], mt = ["value"], gt = { class: "filter-group" }, _t = ["value"], yt = ["value"], kt = ["value"], bt = ["value"], $t = { class: "filter-section" }, Tt = { class: "filter-chips" }, wt = ["onClick"], Ct = { class: "filter-section" }, Rt = { class: "filter-chips" }, St = ["onClick"], Pt = { class: "filter-section" }, Et = { class: "filter-chips" }, Ft = ["onClick"], It = { class: "filter-actions" }, xt = { class: "result-count" }, Ut = /* @__PURE__ */ x({
  __name: "FilterBar",
  setup(a) {
    const e = le(), t = f(e.search), l = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function d() {
      e.setSearch(t.value);
    }
    function p(i) {
      const o = e.selectedGenres;
      o.includes(i) ? e.setGenres(o.filter((n) => n !== i)) : e.setGenres([...o, i]);
    }
    function m(i) {
      const o = e.selectedRatings;
      o.includes(i) ? e.setRatings(o.filter((n) => n !== i)) : e.setRatings([...o, i]);
    }
    function b(i) {
      const o = e.selectedTypes;
      o.includes(i) ? e.setTypes(o.filter((n) => n !== i)) : e.setTypes([...o, i]);
    }
    function $(i) {
      const o = i.target;
      e.setSort(o.value);
    }
    function y(i) {
      const o = i.target;
      e.order = o.value;
    }
    const w = (/* @__PURE__ */ new Date()).getFullYear(), C = B(() => {
      const i = [];
      for (let o = w; o >= 1900; o--)
        i.push(o);
      return i;
    });
    function U() {
      t.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (i, o) => (r(), c("div", ut, [
      s("div", dt, [
        ve(s("input", {
          "onUpdate:modelValue": o[0] || (o[0] = (n) => t.value = n),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: d
        }, null, 544), [
          [fe, t.value]
        ])
      ]),
      s("div", vt, [
        s("div", ft, [
          o[4] || (o[4] = s("label", { class: "filter-label" }, "Sort", -1)),
          s("select", {
            class: "filter-select",
            value: v(e).sort,
            onChange: $
          }, [
            (r(), c(E, null, F(l, (n) => s("option", {
              key: n.value,
              value: n.value
            }, _(n.label), 9, ht)), 64))
          ], 40, pt),
          s("select", {
            class: "filter-select order-select",
            value: v(e).order,
            onChange: y
          }, [...o[3] || (o[3] = [
            s("option", { value: "asc" }, "↑", -1),
            s("option", { value: "desc" }, "↓", -1)
          ])], 40, mt)
        ]),
        s("div", gt, [
          o[7] || (o[7] = s("label", { class: "filter-label" }, "Year", -1)),
          s("select", {
            class: "filter-select",
            value: v(e).yearFrom ?? "",
            onChange: o[1] || (o[1] = (n) => v(e).setYearRange(
              n.target.value ? Number(n.target.value) : void 0,
              v(e).yearTo
            ))
          }, [
            o[5] || (o[5] = s("option", { value: "" }, "From", -1)),
            (r(!0), c(E, null, F(C.value.slice(0, 50), (n) => (r(), c("option", {
              key: n,
              value: n
            }, _(n), 9, yt))), 128))
          ], 40, _t),
          s("select", {
            class: "filter-select",
            value: v(e).yearTo ?? "",
            onChange: o[2] || (o[2] = (n) => v(e).setYearRange(
              v(e).yearFrom,
              n.target.value ? Number(n.target.value) : void 0
            ))
          }, [
            o[6] || (o[6] = s("option", { value: "" }, "To", -1)),
            (r(!0), c(E, null, F(C.value.slice(0, 50), (n) => (r(), c("option", {
              key: n,
              value: n
            }, _(n), 9, bt))), 128))
          ], 40, kt)
        ])
      ]),
      s("div", $t, [
        o[8] || (o[8] = s("span", { class: "filter-label" }, "Genres", -1)),
        s("div", Tt, [
          (r(!0), c(E, null, F(v(e).availableGenres, (n) => (r(), c("button", {
            key: n,
            class: j(["chip", { active: v(e).selectedGenres.includes(n) }]),
            onClick: (N) => p(n)
          }, _(n), 11, wt))), 128))
        ])
      ]),
      s("div", Ct, [
        o[9] || (o[9] = s("span", { class: "filter-label" }, "Rating", -1)),
        s("div", Rt, [
          (r(!0), c(E, null, F(v(e).availableRatings, (n) => (r(), c("button", {
            key: n,
            class: j(["chip", { active: v(e).selectedRatings.includes(n) }]),
            onClick: (N) => m(n)
          }, _(n), 11, St))), 128))
        ])
      ]),
      s("div", Pt, [
        o[10] || (o[10] = s("span", { class: "filter-label" }, "Type", -1)),
        s("div", Et, [
          (r(!0), c(E, null, F(v(e).availableTypes, (n) => (r(), c("button", {
            key: n,
            class: j(["chip", { active: v(e).selectedTypes.includes(n) }]),
            onClick: (N) => b(n)
          }, _(n), 11, Ft))), 128))
        ])
      ]),
      s("div", It, [
        s("button", {
          class: "clear-btn",
          onClick: U
        }, "Clear filters"),
        s("span", xt, _(v(e).total) + " result" + _(v(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Bt = /* @__PURE__ */ S(Ut, [["__scopeId", "data-v-7089ec0b"]]), Nt = { class: "browse-page" }, At = { class: "browse-header" }, Mt = { class: "browse-toolbar-extra" }, Gt = {
  key: 0,
  class: "browse-error"
}, Lt = {
  key: 1,
  class: "load-more"
}, Ot = {
  key: 2,
  class: "loading-more"
}, qt = /* @__PURE__ */ x({
  __name: "BrowsePage",
  setup(a) {
    const e = oe("apiBase") ?? B(() => ""), t = le();
    function l() {
      t.reset(), t.fetchMedia(e.value);
    }
    ne(l), pe(e, l);
    function d() {
      t.reset(), t.fetchMedia(e.value);
    }
    function p() {
      t.loadMore(e.value);
    }
    return (m, b) => (r(), c("div", Nt, [
      s("div", At, [
        b[0] || (b[0] = s("h1", { class: "browse-title" }, "Browse Media", -1)),
        s("div", Mt, [
          G(m.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      L(Bt, { onChange: d }),
      v(t).error ? (r(), c("div", Gt, [
        s("p", null, _(v(t).error), 1),
        s("button", {
          class: "retry-btn",
          onClick: l
        }, "Retry")
      ])) : I("", !0),
      L(ct, {
        items: v(t).items,
        loading: v(t).loading && v(t).items.length === 0
      }, null, 8, ["items", "loading"]),
      v(t).hasMore && !v(t).loading ? (r(), c("div", Lt, [
        s("button", {
          class: "load-more-btn",
          onClick: p
        }, "Load more")
      ])) : I("", !0),
      v(t).loading && v(t).items.length > 0 ? (r(), c("div", Ot, " Loading... ")) : I("", !0)
    ]));
  }
}), Yt = /* @__PURE__ */ S(qt, [["__scopeId", "data-v-c192afa6"]]), jt = ["src", "poster"], Vt = { class: "controls-top" }, Dt = { class: "media-title" }, zt = {
  key: 0,
  class: "media-year"
}, Ht = { class: "controls-center" }, Jt = { class: "controls-bottom" }, Kt = { class: "progress-track" }, Xt = { class: "controls-row" }, Qt = { class: "time-display" }, Wt = { class: "volume-control" }, Zt = ["value"], es = { class: "speed-control" }, ts = ["value"], ss = { class: "time-display" }, as = /* @__PURE__ */ x({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(a) {
    const e = f(null), t = f(!1), l = f(0), d = f(0), p = f(1), m = f(!1), b = f(1), $ = f(!1), y = f(!0);
    let w = null;
    const C = B(
      () => d.value > 0 ? l.value / d.value * 100 : 0
    );
    function U(T) {
      if (!isFinite(T) || isNaN(T)) return "0:00";
      const h = Math.floor(T / 60), R = Math.floor(T % 60);
      return `${h}:${R.toString().padStart(2, "0")}`;
    }
    function i() {
      e.value && (t.value ? e.value.pause() : e.value.play());
    }
    function o() {
      e.value && (l.value = e.value.currentTime);
    }
    function n() {
      e.value && (d.value = e.value.duration);
    }
    function N(T) {
      const R = T.currentTarget.getBoundingClientRect(), J = (T.clientX - R.left) / R.width;
      e.value && (e.value.currentTime = J * d.value);
    }
    function V(T) {
      const h = parseFloat(T.target.value);
      p.value = h, e.value && (e.value.volume = h), m.value = h === 0;
    }
    function D() {
      m.value = !m.value, e.value && (e.value.muted = m.value);
    }
    function z(T) {
      b.value = T, e.value && (e.value.playbackRate = T);
    }
    function O() {
      var h;
      const T = (h = e.value) == null ? void 0 : h.closest(".player-container");
      T && (document.fullscreenElement ? (document.exitFullscreen(), $.value = !1) : (T.requestFullscreen(), $.value = !0));
    }
    function H() {
      y.value = !0, w && clearTimeout(w), w = setTimeout(() => {
        t.value && (y.value = !1);
      }, 3e3);
    }
    return he(() => {
      w && clearTimeout(w);
    }), (T, h) => (r(), c("div", {
      class: j(["player-container", { "controls-hidden": !y.value && t.value }]),
      onMousemove: H,
      onClick: i
    }, [
      h[6] || (h[6] = s("div", { class: "player-overlay" }, null, -1)),
      s("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: a.streamUrl,
        poster: a.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: h[0] || (h[0] = (R) => t.value = !0),
        onPause: h[1] || (h[1] = (R) => t.value = !1),
        onTimeupdate: o,
        onLoadedmetadata: n,
        onClick: se(i, ["stop"])
      }, null, 40, jt),
      s("div", {
        class: "player-controls",
        onClick: h[4] || (h[4] = se(() => {
        }, ["stop"]))
      }, [
        s("div", Vt, [
          s("button", {
            class: "ctrl-btn back-btn",
            onClick: h[2] || (h[2] = (R) => T.$router.back())
          }, " ← Back "),
          s("span", Dt, _(a.media.name), 1),
          a.media.year ? (r(), c("span", zt, _(a.media.year), 1)) : I("", !0)
        ]),
        s("div", Ht, [
          s("button", {
            class: "play-btn",
            onClick: i
          }, _(t.value ? "❚❚" : "▶"), 1)
        ]),
        s("div", Jt, [
          s("div", {
            class: "progress-bar",
            onClick: N
          }, [
            s("div", Kt, [
              s("div", {
                class: "progress-fill",
                style: me({ width: C.value + "%" })
              }, null, 4)
            ])
          ]),
          s("div", Xt, [
            s("span", Qt, _(U(l.value)), 1),
            s("div", Wt, [
              s("button", {
                class: "ctrl-btn",
                onClick: D
              }, _(m.value || p.value === 0 ? "🔇" : "🔊"), 1),
              s("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: m.value ? 0 : p.value,
                class: "volume-slider",
                onInput: V
              }, null, 40, Zt)
            ]),
            s("div", es, [
              s("select", {
                class: "speed-select",
                value: b.value,
                onChange: h[3] || (h[3] = (R) => z(Number(R.target.value)))
              }, [...h[5] || (h[5] = [
                ge('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, ts)
            ]),
            s("span", ss, _(U(d.value)), 1),
            s("button", {
              class: "ctrl-btn",
              onClick: O
            }, _($.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), os = /* @__PURE__ */ S(as, [["__scopeId", "data-v-7a51063f"]]), ns = { class: "player-page" }, ls = {
  key: 0,
  class: "player-loading"
}, rs = {
  key: 1,
  class: "player-error"
}, is = /* @__PURE__ */ x({
  __name: "PlayerPage",
  setup(a) {
    const e = oe("apiBase", B(() => "")), t = $e(), l = f(null), d = f(""), p = f(!0), m = f(null);
    async function b() {
      const $ = t.params.id;
      if (!$) {
        m.value = "No media ID provided", p.value = !1;
        return;
      }
      try {
        const y = new Z({ baseUrl: e.value }), [w, C] = await Promise.all([
          y.get(`/api/v1/media/${$}`),
          y.get(`/api/v1/media/${$}/playback-info`).catch(() => null)
        ]);
        l.value = w, C != null && C.url ? d.value = C.url : d.value = `${e.value}/media/${$}/stream`;
      } catch (y) {
        m.value = y instanceof Error ? y.message : "Failed to load media";
      } finally {
        p.value = !1;
      }
    }
    return ne(b), ($, y) => (r(), c("div", ns, [
      p.value ? (r(), c("div", ls, "Loading...")) : m.value ? (r(), c("div", rs, [
        s("p", null, _(m.value), 1),
        s("button", {
          class: "retry-btn",
          onClick: b
        }, "Retry")
      ])) : l.value ? (r(), W(os, {
        key: 2,
        media: l.value,
        "stream-url": d.value
      }, null, 8, ["media", "stream-url"])) : I("", !0)
    ]));
  }
}), cs = /* @__PURE__ */ S(is, [["__scopeId", "data-v-d9061b47"]]);
function us() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function ds(a) {
  const e = a.routerBase || "/app", t = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: Yt
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: cs
    }
  ];
  return a.extraRoutes && t.push(...a.extraRoutes), t.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: qe,
    props: { appName: a.app }
  }), t;
}
function ms(a) {
  const e = {
    ...us(),
    ...a
  }, t = ke(), l = e.routerBase || "/app", d = Te({
    history: we(l),
    routes: ds(e)
  }), p = _e(Me);
  return p.provide("apiBase", e.apiBase), p.use(t), p.use(d), p;
}
const K = "access_token", X = "refresh_token", Q = "user";
class gs {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(K);
  }
  setAccessToken(e) {
    this.storage.setItem(K, e);
  }
  getRefreshToken() {
    return this.storage.getItem(X);
  }
  setRefreshToken(e) {
    this.storage.setItem(X, e);
  }
  getUser() {
    const e = this.storage.getItem(Q);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(Q, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(K), this.storage.removeItem(X), this.storage.removeItem(Q);
  }
}
export {
  Z as ApiClient,
  Ye as ApiError,
  Be as AppLayout,
  Yt as BrowsePage,
  Bt as FilterBar,
  gs as LocalStorageTokenStore,
  at as MediaCard,
  ct as MediaGrid,
  Me as PhlixApp,
  os as Player,
  cs as PlayerPage,
  ms as createPhlixApp,
  le as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
