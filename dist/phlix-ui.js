var ie = Object.defineProperty;
var le = (s, e, t) => e in s ? ie(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var G = (s, e, t) => le(s, typeof e != "symbol" ? e + "" : e, t);
import { openBlock as l, createElementBlock as u, createElementVNode as n, renderSlot as I, defineComponent as P, createBlock as V, withCtx as M, createVNode as F, unref as d, createTextVNode as H, toDisplayString as m, ref as g, computed as B, createCommentVNode as E, Fragment as $, renderList as w, withDirectives as ce, vModelText as ue, normalizeClass as L, inject as de, onMounted as he, watch as fe, createApp as ve } from "vue";
import { defineStore as pe, createPinia as ge } from "pinia";
import { RouterView as me, RouterLink as J, createRouter as _e, createWebHistory as ye } from "vue-router";
const R = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, v] of e)
    t[r] = v;
  return t;
}, ke = {}, be = { class: "app-layout" }, Te = { class: "app-header" }, $e = { class: "header-inner" }, we = { class: "logo" }, Re = { class: "nav" }, Se = { class: "app-main" }, Ce = { class: "app-footer" };
function Ee(s, e) {
  return l(), u("div", be, [
    n("header", Te, [
      n("div", $e, [
        n("div", we, [
          I(s.$slots, "logo", {}, () => [
            e[0] || (e[0] = n("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        n("nav", Re, [
          I(s.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    n("main", Se, [
      I(s.$slots, "default", {}, void 0, !0)
    ]),
    n("footer", Ce, [
      I(s.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Pe = /* @__PURE__ */ R(ke, [["render", Ee], ["__scopeId", "data-v-9f6c6d16"]]), xe = { class: "main-nav" }, Ae = /* @__PURE__ */ P({
  __name: "PhlixApp",
  setup(s) {
    return (e, t) => (l(), V(Pe, null, {
      nav: M(() => [
        n("nav", xe, [
          F(d(J), {
            to: "/app",
            class: "nav-link"
          }, {
            default: M(() => [...t[0] || (t[0] = [
              H("Browse", -1)
            ])]),
            _: 1
          }),
          F(d(J), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: M(() => [...t[1] || (t[1] = [
              H("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: M(() => [
        F(d(me))
      ]),
      _: 1
    }));
  }
}), Ie = /* @__PURE__ */ R(Ae, [["__scopeId", "data-v-35b5e7c6"]]), Fe = { class: "phlix-placeholder" }, Be = { class: "placeholder-content" }, Ne = /* @__PURE__ */ P({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(s) {
    return (e, t) => (l(), u("div", Fe, [
      n("div", Be, [
        t[0] || (t[0] = n("h1", null, "Shared UI loading...", -1)),
        n("p", null, "Phlix " + m(s.appName) + " is initializing", 1)
      ])
    ]));
  }
}), Ue = /* @__PURE__ */ R(Ne, [["__scopeId", "data-v-bf79ac4c"]]);
class Ge extends Error {
  constructor(e, t, r = null) {
    super(e), this.status = t, this.body = r, this.name = "ApiError";
  }
}
function Me(s) {
  return s === !0 || s === 1 || s === "1" || s === "true";
}
class z {
  constructor(e = {}) {
    G(this, "baseUrl");
    G(this, "tokens");
    G(this, "doFetch");
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
  async request(e, t, r = null) {
    const v = () => {
      const _ = {
        "Content-Type": "application/json"
      }, k = this.tokens.getAccessToken();
      k && (_.Authorization = `Bearer ${k}`);
      const b = { method: e, headers: _, credentials: "same-origin" };
      return r !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (b.body = JSON.stringify(r)), b;
    }, p = `${this.baseUrl}${t}`;
    let y = await this.doFetch(p, v());
    return y.status === 401 && await this.refreshToken() && (y = await this.doFetch(p, v())), this.handleResponse(y);
  }
  async handleResponse(e) {
    const v = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const p = this.extractError(v);
      throw new Ge(p, e.status, v);
    }
    return v;
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
      const r = await t.json();
      return typeof r.access_token != "string" ? !1 : (this.tokens.setAccessToken(r.access_token), typeof r.refresh_token == "string" && this.tokens.setRefreshToken(r.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, t) {
    const r = t ? "?" + new URLSearchParams(t).toString() : "";
    return this.request("GET", e + r);
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
    return { ...e, is_admin: Me(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
new z();
const K = pe("media", () => {
  const s = g([]), e = g(0), t = g(!1), r = g(null), v = g(""), p = g([]), y = g(void 0), _ = g(void 0), k = g([]), b = g([]), x = g("name"), S = g("asc"), N = g(24), c = g(0), o = B(() => c.value + s.value.length < e.value), a = B(() => {
    const i = {};
    return v.value && (i.search = v.value), p.value.length && (i.genres = p.value), y.value !== void 0 && (i.yearFrom = y.value), _.value !== void 0 && (i.yearTo = _.value), k.value.length && (i.ratings = k.value), b.value.length && (i.types = b.value), i.sort = x.value, i.order = S.value, i.limit = N.value, i.offset = c.value, i;
  }), U = B(() => {
    const i = /* @__PURE__ */ new Set();
    return s.value.forEach((f) => {
      var h;
      return (h = f.genres) == null ? void 0 : h.forEach((C) => i.add(C));
    }), Array.from(i).sort();
  }), X = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], Q = ["movie", "series", "episode", "audio", "image"];
  function W(i) {
    var C, T, D;
    const f = new URLSearchParams(), h = a.value;
    return h.search && f.set("search", h.search), (C = h.genres) == null || C.forEach((A) => f.append("genres", A)), h.yearFrom !== void 0 && f.set("yearFrom", String(h.yearFrom)), h.yearTo !== void 0 && f.set("yearTo", String(h.yearTo)), (T = h.ratings) == null || T.forEach((A) => f.append("ratings", A)), (D = h.types) == null || D.forEach((A) => f.append("types", A)), h.sort && f.set("sort", h.sort), h.order && f.set("order", h.order), f.set("limit", String(h.limit)), f.set("offset", String(h.offset)), `${i}/api/v1/media?${f.toString()}`;
  }
  async function q(i, f = !1) {
    t.value = !0, r.value = null;
    try {
      const h = new z({ baseUrl: i }), C = W(i), T = await h.get(C);
      f ? s.value = [...s.value, ...T.items] : s.value = T.items, e.value = T.total, c.value = (T.offset ?? 0) + T.items.length;
    } catch (h) {
      r.value = h instanceof Error ? h.message : "Failed to load media";
    } finally {
      t.value = !1;
    }
  }
  async function Z(i) {
    await q(i, !0);
  }
  function ee() {
    s.value = [], e.value = 0, c.value = 0, r.value = null;
  }
  function te(i) {
    v.value = i, c.value = 0;
  }
  function se(i) {
    p.value = i, c.value = 0;
  }
  function ne(i, f) {
    y.value = i, _.value = f, c.value = 0;
  }
  function oe(i) {
    k.value = i, c.value = 0;
  }
  function ae(i) {
    b.value = i, c.value = 0;
  }
  function re(i, f) {
    x.value = i, f && (S.value = f), c.value = 0;
  }
  return {
    items: s,
    total: e,
    loading: t,
    error: r,
    search: v,
    selectedGenres: p,
    yearFrom: y,
    yearTo: _,
    selectedRatings: k,
    selectedTypes: b,
    sort: x,
    order: S,
    limit: N,
    offset: c,
    hasMore: o,
    queryParams: a,
    availableGenres: U,
    availableRatings: X,
    availableTypes: Q,
    fetchMedia: q,
    loadMore: Z,
    reset: ee,
    setSearch: te,
    setGenres: se,
    setYearRange: ne,
    setRatings: oe,
    setTypes: ae,
    setSort: re
  };
}), Le = { class: "media-card" }, Oe = ["href"], Ye = { class: "card-poster" }, je = ["src", "alt"], qe = {
  key: 1,
  class: "poster-placeholder"
}, De = { class: "placeholder-type" }, He = { class: "card-overlay" }, Je = {
  key: 0,
  class: "card-year"
}, Ve = {
  key: 1,
  class: "card-rating"
}, ze = { class: "card-info" }, Ke = ["title"], Xe = {
  key: 0,
  class: "card-genres"
}, Qe = /* @__PURE__ */ P({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(s) {
    return (e, t) => {
      var r;
      return l(), u("article", Le, [
        n("a", {
          href: s.to ?? `/app/player/${s.item.id}`,
          class: "card-link"
        }, [
          n("div", Ye, [
            s.item.poster_url ? (l(), u("img", {
              key: 0,
              src: s.item.poster_url,
              alt: s.item.name,
              loading: "lazy"
            }, null, 8, je)) : (l(), u("div", qe, [
              t[0] || (t[0] = n("span", { class: "placeholder-icon" }, "🎬", -1)),
              n("span", De, m(s.item.type), 1)
            ]))
          ]),
          n("div", He, [
            s.item.year ? (l(), u("span", Je, m(s.item.year), 1)) : E("", !0),
            s.item.rating ? (l(), u("span", Ve, m(s.item.rating), 1)) : E("", !0)
          ]),
          n("div", ze, [
            n("h3", {
              class: "card-title",
              title: s.item.name
            }, m(s.item.name), 9, Ke),
            (r = s.item.genres) != null && r.length ? (l(), u("p", Xe, m(s.item.genres.slice(0, 2).join(", ")), 1)) : E("", !0)
          ])
        ], 8, Oe)
      ]);
    };
  }
}), We = /* @__PURE__ */ R(Qe, [["__scopeId", "data-v-e60c8481"]]), Ze = { class: "media-grid-container" }, et = {
  key: 0,
  class: "media-grid-skeleton"
}, tt = {
  key: 1,
  class: "media-grid-empty"
}, st = {
  key: 2,
  class: "media-grid"
}, nt = /* @__PURE__ */ P({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(s) {
    return (e, t) => (l(), u("div", Ze, [
      s.loading ? (l(), u("div", et, [
        (l(), u($, null, w(12, (r) => n("div", {
          key: r,
          class: "skeleton-card"
        }, [...t[0] || (t[0] = [
          n("div", { class: "skeleton-poster" }, null, -1),
          n("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : s.items.length === 0 ? (l(), u("div", tt, [...t[1] || (t[1] = [
        n("p", null, "No media found.", -1),
        n("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (l(), u("div", st, [
        (l(!0), u($, null, w(s.items, (r) => (l(), V(We, {
          key: r.id,
          item: r
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), ot = /* @__PURE__ */ R(nt, [["__scopeId", "data-v-b7e87216"]]), at = { class: "filter-bar" }, rt = { class: "filter-search" }, it = { class: "filter-row" }, lt = { class: "filter-group" }, ct = ["value"], ut = ["value"], dt = ["value"], ht = { class: "filter-group" }, ft = ["value"], vt = ["value"], pt = ["value"], gt = ["value"], mt = { class: "filter-section" }, _t = { class: "filter-chips" }, yt = ["onClick"], kt = { class: "filter-section" }, bt = { class: "filter-chips" }, Tt = ["onClick"], $t = { class: "filter-section" }, wt = { class: "filter-chips" }, Rt = ["onClick"], St = { class: "filter-actions" }, Ct = { class: "result-count" }, Et = /* @__PURE__ */ P({
  __name: "FilterBar",
  setup(s) {
    const e = K(), t = g(e.search), r = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function v() {
      e.setSearch(t.value);
    }
    function p(c) {
      const o = e.selectedGenres;
      o.includes(c) ? e.setGenres(o.filter((a) => a !== c)) : e.setGenres([...o, c]);
    }
    function y(c) {
      const o = e.selectedRatings;
      o.includes(c) ? e.setRatings(o.filter((a) => a !== c)) : e.setRatings([...o, c]);
    }
    function _(c) {
      const o = e.selectedTypes;
      o.includes(c) ? e.setTypes(o.filter((a) => a !== c)) : e.setTypes([...o, c]);
    }
    function k(c) {
      const o = c.target;
      e.setSort(o.value);
    }
    function b(c) {
      const o = c.target;
      e.order = o.value;
    }
    const x = (/* @__PURE__ */ new Date()).getFullYear(), S = B(() => {
      const c = [];
      for (let o = x; o >= 1900; o--)
        c.push(o);
      return c;
    });
    function N() {
      t.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (c, o) => (l(), u("div", at, [
      n("div", rt, [
        ce(n("input", {
          "onUpdate:modelValue": o[0] || (o[0] = (a) => t.value = a),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: v
        }, null, 544), [
          [ue, t.value]
        ])
      ]),
      n("div", it, [
        n("div", lt, [
          o[4] || (o[4] = n("label", { class: "filter-label" }, "Sort", -1)),
          n("select", {
            class: "filter-select",
            value: d(e).sort,
            onChange: k
          }, [
            (l(), u($, null, w(r, (a) => n("option", {
              key: a.value,
              value: a.value
            }, m(a.label), 9, ut)), 64))
          ], 40, ct),
          n("select", {
            class: "filter-select order-select",
            value: d(e).order,
            onChange: b
          }, [...o[3] || (o[3] = [
            n("option", { value: "asc" }, "↑", -1),
            n("option", { value: "desc" }, "↓", -1)
          ])], 40, dt)
        ]),
        n("div", ht, [
          o[7] || (o[7] = n("label", { class: "filter-label" }, "Year", -1)),
          n("select", {
            class: "filter-select",
            value: d(e).yearFrom ?? "",
            onChange: o[1] || (o[1] = (a) => d(e).setYearRange(
              a.target.value ? Number(a.target.value) : void 0,
              d(e).yearTo
            ))
          }, [
            o[5] || (o[5] = n("option", { value: "" }, "From", -1)),
            (l(!0), u($, null, w(S.value.slice(0, 50), (a) => (l(), u("option", {
              key: a,
              value: a
            }, m(a), 9, vt))), 128))
          ], 40, ft),
          n("select", {
            class: "filter-select",
            value: d(e).yearTo ?? "",
            onChange: o[2] || (o[2] = (a) => d(e).setYearRange(
              d(e).yearFrom,
              a.target.value ? Number(a.target.value) : void 0
            ))
          }, [
            o[6] || (o[6] = n("option", { value: "" }, "To", -1)),
            (l(!0), u($, null, w(S.value.slice(0, 50), (a) => (l(), u("option", {
              key: a,
              value: a
            }, m(a), 9, gt))), 128))
          ], 40, pt)
        ])
      ]),
      n("div", mt, [
        o[8] || (o[8] = n("span", { class: "filter-label" }, "Genres", -1)),
        n("div", _t, [
          (l(!0), u($, null, w(d(e).availableGenres, (a) => (l(), u("button", {
            key: a,
            class: L(["chip", { active: d(e).selectedGenres.includes(a) }]),
            onClick: (U) => p(a)
          }, m(a), 11, yt))), 128))
        ])
      ]),
      n("div", kt, [
        o[9] || (o[9] = n("span", { class: "filter-label" }, "Rating", -1)),
        n("div", bt, [
          (l(!0), u($, null, w(d(e).availableRatings, (a) => (l(), u("button", {
            key: a,
            class: L(["chip", { active: d(e).selectedRatings.includes(a) }]),
            onClick: (U) => y(a)
          }, m(a), 11, Tt))), 128))
        ])
      ]),
      n("div", $t, [
        o[10] || (o[10] = n("span", { class: "filter-label" }, "Type", -1)),
        n("div", wt, [
          (l(!0), u($, null, w(d(e).availableTypes, (a) => (l(), u("button", {
            key: a,
            class: L(["chip", { active: d(e).selectedTypes.includes(a) }]),
            onClick: (U) => _(a)
          }, m(a), 11, Rt))), 128))
        ])
      ]),
      n("div", St, [
        n("button", {
          class: "clear-btn",
          onClick: N
        }, "Clear filters"),
        n("span", Ct, m(d(e).total) + " result" + m(d(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Pt = /* @__PURE__ */ R(Et, [["__scopeId", "data-v-7089ec0b"]]), xt = { class: "browse-page" }, At = { class: "browse-header" }, It = { class: "browse-toolbar-extra" }, Ft = {
  key: 0,
  class: "browse-error"
}, Bt = {
  key: 1,
  class: "load-more"
}, Nt = {
  key: 2,
  class: "loading-more"
}, Ut = /* @__PURE__ */ P({
  __name: "BrowsePage",
  setup(s) {
    const e = de("apiBase") ?? B(() => ""), t = K();
    function r() {
      t.reset(), t.fetchMedia(e.value);
    }
    he(r), fe(e, r);
    function v() {
      t.reset(), t.fetchMedia(e.value);
    }
    function p() {
      t.loadMore(e.value);
    }
    return (y, _) => (l(), u("div", xt, [
      n("div", At, [
        _[0] || (_[0] = n("h1", { class: "browse-title" }, "Browse Media", -1)),
        n("div", It, [
          I(y.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      F(Pt, { onChange: v }),
      d(t).error ? (l(), u("div", Ft, [
        n("p", null, m(d(t).error), 1),
        n("button", {
          class: "retry-btn",
          onClick: r
        }, "Retry")
      ])) : E("", !0),
      F(ot, {
        items: d(t).items,
        loading: d(t).loading && d(t).items.length === 0
      }, null, 8, ["items", "loading"]),
      d(t).hasMore && !d(t).loading ? (l(), u("div", Bt, [
        n("button", {
          class: "load-more-btn",
          onClick: p
        }, "Load more")
      ])) : E("", !0),
      d(t).loading && d(t).items.length > 0 ? (l(), u("div", Nt, " Loading... ")) : E("", !0)
    ]));
  }
}), Gt = /* @__PURE__ */ R(Ut, [["__scopeId", "data-v-c192afa6"]]);
function Mt() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function Lt(s) {
  const e = s.routerBase || "/app", t = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: Gt
    }
  ];
  return s.extraRoutes && t.push(...s.extraRoutes), t.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: Ue,
    props: { appName: s.app }
  }), t;
}
function Dt(s) {
  const e = {
    ...Mt(),
    ...s
  }, t = ge(), r = e.routerBase || "/app", v = _e({
    history: ye(r),
    routes: Lt(e)
  }), p = ve(Ie);
  return p.provide("apiBase", e.apiBase), p.use(t), p.use(v), p;
}
const O = "access_token", Y = "refresh_token", j = "user";
class Ht {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(O);
  }
  setAccessToken(e) {
    this.storage.setItem(O, e);
  }
  getRefreshToken() {
    return this.storage.getItem(Y);
  }
  setRefreshToken(e) {
    this.storage.setItem(Y, e);
  }
  getUser() {
    const e = this.storage.getItem(j);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(j, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(O), this.storage.removeItem(Y), this.storage.removeItem(j);
  }
}
export {
  z as ApiClient,
  Ge as ApiError,
  Pe as AppLayout,
  Gt as BrowsePage,
  Pt as FilterBar,
  Ht as LocalStorageTokenStore,
  We as MediaCard,
  ot as MediaGrid,
  Ie as PhlixApp,
  Dt as createPhlixApp,
  K as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
