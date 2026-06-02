var je = Object.defineProperty;
var Re = (n, e, s) => e in n ? je(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var ue = (n, e, s) => Re(n, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as o, createElementBlock as a, createElementVNode as t, renderSlot as N, defineComponent as B, createBlock as K, withCtx as J, createVNode as A, unref as C, createTextVNode as Y, toDisplayString as b, ref as g, computed as P, createCommentVNode as x, Fragment as F, renderList as D, withDirectives as W, vModelText as he, normalizeClass as L, inject as ke, onMounted as Z, watch as oe, onUnmounted as Fe, withModifiers as ae, normalizeStyle as Q, createStaticVNode as De, resolveComponent as Te, vModelDynamic as be, vShow as ye, createApp as ze, markRaw as w, resolveDynamicComponent as Ue, useId as le, onBeforeUnmount as de, nextTick as ne, Teleport as $e, Transition as we, withKeys as Ne, TransitionGroup as qe } from "vue";
import { defineStore as xe, createPinia as He } from "pinia";
import { RouterView as Ge, RouterLink as Me, useRoute as Ke, useRouter as Ee, createRouter as Oe, createWebHistory as Ye } from "vue-router";
const T = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [i, c] of e)
    s[i] = c;
  return s;
}, Xe = {}, Je = { class: "app-layout" }, We = { class: "app-header" }, Qe = { class: "header-inner" }, Ze = { class: "logo" }, et = { class: "nav" }, tt = { class: "app-main" }, nt = { class: "app-footer" };
function st(n, e) {
  return o(), a("div", Je, [
    t("header", We, [
      t("div", Qe, [
        t("div", Ze, [
          N(n.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", et, [
          N(n.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", tt, [
      N(n.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", nt, [
      N(n.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const ot = /* @__PURE__ */ T(Xe, [["render", st], ["__scopeId", "data-v-9f6c6d16"]]), at = { class: "main-nav" }, lt = /* @__PURE__ */ B({
  __name: "PhlixApp",
  setup(n) {
    return (e, s) => (o(), K(ot, null, {
      nav: J(() => [
        t("nav", at, [
          A(C(Me), {
            to: "/app",
            class: "nav-link"
          }, {
            default: J(() => [...s[0] || (s[0] = [
              Y("Browse", -1)
            ])]),
            _: 1
          }),
          A(C(Me), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: J(() => [...s[1] || (s[1] = [
              Y("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: J(() => [
        A(C(Ge))
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ T(lt, [["__scopeId", "data-v-35b5e7c6"]]), rt = { class: "phlix-placeholder" }, ct = { class: "placeholder-content" }, dt = /* @__PURE__ */ B({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(n) {
    return (e, s) => (o(), a("div", rt, [
      t("div", ct, [
        s[0] || (s[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + b(n.appName) + " is initializing", 1)
      ])
    ]));
  }
}), ut = /* @__PURE__ */ T(dt, [["__scopeId", "data-v-bf79ac4c"]]);
class vt extends Error {
  constructor(e, s, i = null) {
    super(e), this.status = s, this.body = i, this.name = "ApiError";
  }
}
function ht(n) {
  return n === !0 || n === 1 || n === "1" || n === "true";
}
class me {
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
  async request(e, s, i = null) {
    const c = () => {
      const p = {
        "Content-Type": "application/json"
      }, _ = this.tokens.getAccessToken();
      _ && (p.Authorization = `Bearer ${_}`);
      const d = { method: e, headers: p, credentials: "same-origin" };
      return i !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (d.body = JSON.stringify(i)), d;
    }, m = `${this.baseUrl}${s}`;
    let r = await this.doFetch(m, c());
    return r.status === 401 && await this.refreshToken() && (r = await this.doFetch(m, c())), this.handleResponse(r);
  }
  async handleResponse(e) {
    const c = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const m = this.extractError(c);
      throw new vt(m, e.status, c);
    }
    return c;
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
      const i = await s.json();
      return typeof i.access_token != "string" ? !1 : (this.tokens.setAccessToken(i.access_token), typeof i.refresh_token == "string" && this.tokens.setRefreshToken(i.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, s) {
    const i = s ? "?" + new URLSearchParams(s).toString() : "";
    return this.request("GET", e + i);
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
const X = new me(), Ve = xe("media", () => {
  const n = g([]), e = g(0), s = g(!1), i = g(null), c = g(""), m = g([]), r = g(void 0), p = g(void 0), _ = g([]), d = g([]), l = g("name"), h = g("asc"), k = g(24), u = g(0), f = P(() => u.value + n.value.length < e.value), v = P(() => {
    const E = {};
    return c.value && (E.search = c.value), m.value.length && (E.genres = m.value), r.value !== void 0 && (E.yearFrom = r.value), p.value !== void 0 && (E.yearTo = p.value), _.value.length && (E.ratings = _.value), d.value.length && (E.types = d.value), E.sort = l.value, E.order = h.value, E.limit = k.value, E.offset = u.value, E;
  }), S = P(() => {
    const E = /* @__PURE__ */ new Set();
    return n.value.forEach((U) => {
      var R;
      return (R = U.genres) == null ? void 0 : R.forEach((ie) => E.add(ie));
    }), Array.from(E).sort();
  }), I = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], q = ["movie", "series", "episode", "audio", "image"];
  function H(E) {
    var ie, te, Se;
    const U = new URLSearchParams(), R = v.value;
    return R.search && U.set("search", R.search), (ie = R.genres) == null || ie.forEach((re) => U.append("genres", re)), R.yearFrom !== void 0 && U.set("yearFrom", String(R.yearFrom)), R.yearTo !== void 0 && U.set("yearTo", String(R.yearTo)), (te = R.ratings) == null || te.forEach((re) => U.append("ratings", re)), (Se = R.types) == null || Se.forEach((re) => U.append("types", re)), R.sort && U.set("sort", R.sort), R.order && U.set("order", R.order), U.set("limit", String(R.limit)), U.set("offset", String(R.offset)), `${E}/api/v1/media?${U.toString()}`;
  }
  async function O(E, U = !1) {
    s.value = !0, i.value = null;
    try {
      const R = new me({ baseUrl: E }), ie = H(E), te = await R.get(ie);
      U ? n.value = [...n.value, ...te.items] : n.value = te.items, e.value = te.total, u.value = (te.offset ?? 0) + te.items.length;
    } catch (R) {
      i.value = R instanceof Error ? R.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function z(E) {
    await O(E, !0);
  }
  function V() {
    n.value = [], e.value = 0, u.value = 0, i.value = null;
  }
  function y(E) {
    c.value = E, u.value = 0;
  }
  function $(E) {
    m.value = E, u.value = 0;
  }
  function M(E, U) {
    r.value = E, p.value = U, u.value = 0;
  }
  function j(E) {
    _.value = E, u.value = 0;
  }
  function ee(E) {
    d.value = E, u.value = 0;
  }
  function pe(E, U) {
    l.value = E, U && (h.value = U), u.value = 0;
  }
  return {
    items: n,
    total: e,
    loading: s,
    error: i,
    search: c,
    selectedGenres: m,
    yearFrom: r,
    yearTo: p,
    selectedRatings: _,
    selectedTypes: d,
    sort: l,
    order: h,
    limit: k,
    offset: u,
    hasMore: f,
    queryParams: v,
    availableGenres: S,
    availableRatings: I,
    availableTypes: q,
    fetchMedia: O,
    loadMore: z,
    reset: V,
    setSearch: y,
    setGenres: $,
    setYearRange: M,
    setRatings: j,
    setTypes: ee,
    setSort: pe
  };
}), mt = { class: "media-card" }, pt = ["href"], ft = { class: "card-poster" }, _t = ["src", "alt"], gt = {
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
}, It = /* @__PURE__ */ B({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(n) {
    return (e, s) => {
      var i;
      return o(), a("article", mt, [
        t("a", {
          href: n.to ?? `/app/player/${n.item.id}`,
          class: "card-link"
        }, [
          t("div", ft, [
            n.item.poster_url ? (o(), a("img", {
              key: 0,
              src: n.item.poster_url,
              alt: n.item.name,
              loading: "lazy"
            }, null, 8, _t)) : (o(), a("div", gt, [
              s[0] || (s[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", bt, b(n.item.type), 1)
            ]))
          ]),
          t("div", kt, [
            n.item.year ? (o(), a("span", yt, b(n.item.year), 1)) : x("", !0),
            n.item.rating ? (o(), a("span", $t, b(n.item.rating), 1)) : x("", !0)
          ]),
          t("div", wt, [
            t("h3", {
              class: "card-title",
              title: n.item.name
            }, b(n.item.name), 9, xt),
            (i = n.item.genres) != null && i.length ? (o(), a("p", Ct, b(n.item.genres.slice(0, 2).join(", ")), 1)) : x("", !0)
          ])
        ], 8, pt)
      ]);
    };
  }
}), St = /* @__PURE__ */ T(It, [["__scopeId", "data-v-e60c8481"]]), Mt = { class: "media-grid-container" }, Bt = {
  key: 0,
  class: "media-grid-skeleton"
}, Tt = {
  key: 1,
  class: "media-grid-empty"
}, Et = {
  key: 2,
  class: "media-grid"
}, Vt = /* @__PURE__ */ B({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(n) {
    return (e, s) => (o(), a("div", Mt, [
      n.loading ? (o(), a("div", Bt, [
        (o(), a(F, null, D(12, (i) => t("div", {
          key: i,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : n.items.length === 0 ? (o(), a("div", Tt, [...s[1] || (s[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (o(), a("div", Et, [
        (o(!0), a(F, null, D(n.items, (i) => (o(), K(St, {
          key: i.id,
          item: i
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), Pt = /* @__PURE__ */ T(Vt, [["__scopeId", "data-v-b7e87216"]]), Lt = { class: "filter-bar" }, At = { class: "filter-search" }, jt = { class: "filter-row" }, Rt = { class: "filter-group" }, Ft = ["value"], Dt = ["value"], zt = ["value"], Ut = { class: "filter-group" }, Nt = ["value"], qt = ["value"], Ht = ["value"], Gt = ["value"], Kt = { class: "filter-section" }, Ot = { class: "filter-chips" }, Yt = ["onClick"], Xt = { class: "filter-section" }, Jt = { class: "filter-chips" }, Wt = ["onClick"], Qt = { class: "filter-section" }, Zt = { class: "filter-chips" }, en = ["onClick"], tn = { class: "filter-actions" }, nn = { class: "result-count" }, sn = /* @__PURE__ */ B({
  __name: "FilterBar",
  setup(n) {
    const e = Ve(), s = g(e.search), i = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function c() {
      e.setSearch(s.value);
    }
    function m(u) {
      const f = e.selectedGenres;
      f.includes(u) ? e.setGenres(f.filter((v) => v !== u)) : e.setGenres([...f, u]);
    }
    function r(u) {
      const f = e.selectedRatings;
      f.includes(u) ? e.setRatings(f.filter((v) => v !== u)) : e.setRatings([...f, u]);
    }
    function p(u) {
      const f = e.selectedTypes;
      f.includes(u) ? e.setTypes(f.filter((v) => v !== u)) : e.setTypes([...f, u]);
    }
    function _(u) {
      const f = u.target;
      e.setSort(f.value);
    }
    function d(u) {
      const f = u.target;
      e.order = f.value;
    }
    const l = (/* @__PURE__ */ new Date()).getFullYear(), h = P(() => {
      const u = [];
      for (let f = l; f >= 1900; f--)
        u.push(f);
      return u;
    });
    function k() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (u, f) => (o(), a("div", Lt, [
      t("div", At, [
        W(t("input", {
          "onUpdate:modelValue": f[0] || (f[0] = (v) => s.value = v),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: c
        }, null, 544), [
          [he, s.value]
        ])
      ]),
      t("div", jt, [
        t("div", Rt, [
          f[4] || (f[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: C(e).sort,
            onChange: _
          }, [
            (o(), a(F, null, D(i, (v) => t("option", {
              key: v.value,
              value: v.value
            }, b(v.label), 9, Dt)), 64))
          ], 40, Ft),
          t("select", {
            class: "filter-select order-select",
            value: C(e).order,
            onChange: d
          }, [...f[3] || (f[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, zt)
        ]),
        t("div", Ut, [
          f[7] || (f[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: C(e).yearFrom ?? "",
            onChange: f[1] || (f[1] = (v) => C(e).setYearRange(
              v.target.value ? Number(v.target.value) : void 0,
              C(e).yearTo
            ))
          }, [
            f[5] || (f[5] = t("option", { value: "" }, "From", -1)),
            (o(!0), a(F, null, D(h.value.slice(0, 50), (v) => (o(), a("option", {
              key: v,
              value: v
            }, b(v), 9, qt))), 128))
          ], 40, Nt),
          t("select", {
            class: "filter-select",
            value: C(e).yearTo ?? "",
            onChange: f[2] || (f[2] = (v) => C(e).setYearRange(
              C(e).yearFrom,
              v.target.value ? Number(v.target.value) : void 0
            ))
          }, [
            f[6] || (f[6] = t("option", { value: "" }, "To", -1)),
            (o(!0), a(F, null, D(h.value.slice(0, 50), (v) => (o(), a("option", {
              key: v,
              value: v
            }, b(v), 9, Gt))), 128))
          ], 40, Ht)
        ])
      ]),
      t("div", Kt, [
        f[8] || (f[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", Ot, [
          (o(!0), a(F, null, D(C(e).availableGenres, (v) => (o(), a("button", {
            key: v,
            class: L(["chip", { active: C(e).selectedGenres.includes(v) }]),
            onClick: (S) => m(v)
          }, b(v), 11, Yt))), 128))
        ])
      ]),
      t("div", Xt, [
        f[9] || (f[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", Jt, [
          (o(!0), a(F, null, D(C(e).availableRatings, (v) => (o(), a("button", {
            key: v,
            class: L(["chip", { active: C(e).selectedRatings.includes(v) }]),
            onClick: (S) => r(v)
          }, b(v), 11, Wt))), 128))
        ])
      ]),
      t("div", Qt, [
        f[10] || (f[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Zt, [
          (o(!0), a(F, null, D(C(e).availableTypes, (v) => (o(), a("button", {
            key: v,
            class: L(["chip", { active: C(e).selectedTypes.includes(v) }]),
            onClick: (S) => p(v)
          }, b(v), 11, en))), 128))
        ])
      ]),
      t("div", tn, [
        t("button", {
          class: "clear-btn",
          onClick: k
        }, "Clear filters"),
        t("span", nn, b(C(e).total) + " result" + b(C(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), on = /* @__PURE__ */ T(sn, [["__scopeId", "data-v-7089ec0b"]]), an = { class: "browse-page" }, ln = { class: "browse-header" }, rn = { class: "browse-toolbar-extra" }, cn = {
  key: 0,
  class: "browse-error"
}, dn = {
  key: 1,
  class: "load-more"
}, un = {
  key: 2,
  class: "loading-more"
}, vn = /* @__PURE__ */ B({
  __name: "BrowsePage",
  setup(n) {
    const e = ke("apiBase") ?? P(() => ""), s = Ve();
    function i() {
      s.reset(), s.fetchMedia(e.value);
    }
    Z(i), oe(e, i);
    function c() {
      s.reset(), s.fetchMedia(e.value);
    }
    function m() {
      s.loadMore(e.value);
    }
    return (r, p) => (o(), a("div", an, [
      t("div", ln, [
        p[0] || (p[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", rn, [
          N(r.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      A(on, { onChange: c }),
      C(s).error ? (o(), a("div", cn, [
        t("p", null, b(C(s).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: i
        }, "Retry")
      ])) : x("", !0),
      A(Pt, {
        items: C(s).items,
        loading: C(s).loading && C(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      C(s).hasMore && !C(s).loading ? (o(), a("div", dn, [
        t("button", {
          class: "load-more-btn",
          onClick: m
        }, "Load more")
      ])) : x("", !0),
      C(s).loading && C(s).items.length > 0 ? (o(), a("div", un, " Loading... ")) : x("", !0)
    ]));
  }
}), hn = /* @__PURE__ */ T(vn, [["__scopeId", "data-v-c192afa6"]]), mn = ["src", "poster"], pn = { class: "controls-top" }, fn = { class: "media-title" }, _n = {
  key: 0,
  class: "media-year"
}, gn = { class: "controls-center" }, bn = { class: "controls-bottom" }, kn = { class: "progress-track" }, yn = { class: "controls-row" }, $n = { class: "time-display" }, wn = { class: "volume-control" }, xn = ["value"], Cn = { class: "speed-control" }, In = ["value"], Sn = { class: "time-display" }, Mn = /* @__PURE__ */ B({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(n) {
    const e = g(null), s = g(!1), i = g(0), c = g(0), m = g(1), r = g(!1), p = g(1), _ = g(!1), d = g(!0);
    let l = null;
    const h = P(
      () => c.value > 0 ? i.value / c.value * 100 : 0
    );
    function k(V) {
      if (!isFinite(V) || isNaN(V)) return "0:00";
      const y = Math.floor(V / 60), $ = Math.floor(V % 60);
      return `${y}:${$.toString().padStart(2, "0")}`;
    }
    function u() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function f() {
      e.value && (i.value = e.value.currentTime);
    }
    function v() {
      e.value && (c.value = e.value.duration);
    }
    function S(V) {
      const $ = V.currentTarget.getBoundingClientRect(), M = (V.clientX - $.left) / $.width;
      e.value && (e.value.currentTime = M * c.value);
    }
    function I(V) {
      const y = parseFloat(V.target.value);
      m.value = y, e.value && (e.value.volume = y), r.value = y === 0;
    }
    function q() {
      r.value = !r.value, e.value && (e.value.muted = r.value);
    }
    function H(V) {
      p.value = V, e.value && (e.value.playbackRate = V);
    }
    function O() {
      var y;
      const V = (y = e.value) == null ? void 0 : y.closest(".player-container");
      V && (document.fullscreenElement ? (document.exitFullscreen(), _.value = !1) : (V.requestFullscreen(), _.value = !0));
    }
    function z() {
      d.value = !0, l && clearTimeout(l), l = setTimeout(() => {
        s.value && (d.value = !1);
      }, 3e3);
    }
    return Fe(() => {
      l && clearTimeout(l);
    }), (V, y) => (o(), a("div", {
      class: L(["player-container", { "controls-hidden": !d.value && s.value }]),
      onMousemove: z,
      onClick: u
    }, [
      y[6] || (y[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: n.streamUrl,
        poster: n.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: y[0] || (y[0] = ($) => s.value = !0),
        onPause: y[1] || (y[1] = ($) => s.value = !1),
        onTimeupdate: f,
        onLoadedmetadata: v,
        onClick: ae(u, ["stop"])
      }, null, 40, mn),
      t("div", {
        class: "player-controls",
        onClick: y[4] || (y[4] = ae(() => {
        }, ["stop"]))
      }, [
        t("div", pn, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: y[2] || (y[2] = ($) => V.$router.back())
          }, " ← Back "),
          t("span", fn, b(n.media.name), 1),
          n.media.year ? (o(), a("span", _n, b(n.media.year), 1)) : x("", !0)
        ]),
        t("div", gn, [
          t("button", {
            class: "play-btn",
            onClick: u
          }, b(s.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", bn, [
          t("div", {
            class: "progress-bar",
            onClick: S
          }, [
            t("div", kn, [
              t("div", {
                class: "progress-fill",
                style: Q({ width: h.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", yn, [
            t("span", $n, b(k(i.value)), 1),
            t("div", wn, [
              t("button", {
                class: "ctrl-btn",
                onClick: q
              }, b(r.value || m.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: r.value ? 0 : m.value,
                class: "volume-slider",
                onInput: I
              }, null, 40, xn)
            ]),
            t("div", Cn, [
              t("select", {
                class: "speed-select",
                value: p.value,
                onChange: y[3] || (y[3] = ($) => H(Number($.target.value)))
              }, [...y[5] || (y[5] = [
                De('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, In)
            ]),
            t("span", Sn, b(k(c.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: O
            }, b(_.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), Bn = /* @__PURE__ */ T(Mn, [["__scopeId", "data-v-7a51063f"]]), Tn = { class: "player-page" }, En = {
  key: 0,
  class: "player-loading"
}, Vn = {
  key: 1,
  class: "player-error"
}, Pn = /* @__PURE__ */ B({
  __name: "PlayerPage",
  setup(n) {
    const e = ke("apiBase", P(() => "")), s = Ke(), i = g(null), c = g(""), m = g(!0), r = g(null);
    async function p() {
      const _ = s.params.id;
      if (!_) {
        r.value = "No media ID provided", m.value = !1;
        return;
      }
      try {
        const d = new me({ baseUrl: e.value }), [l, h] = await Promise.all([
          d.get(`/api/v1/media/${_}`),
          d.get(`/api/v1/media/${_}/playback-info`).catch(() => null)
        ]);
        i.value = l, h != null && h.url ? c.value = h.url : c.value = `${e.value}/media/${_}/stream`;
      } catch (d) {
        r.value = d instanceof Error ? d.message : "Failed to load media";
      } finally {
        m.value = !1;
      }
    }
    return Z(p), (_, d) => (o(), a("div", Tn, [
      m.value ? (o(), a("div", En, "Loading...")) : r.value ? (o(), a("div", Vn, [
        t("p", null, b(r.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: p
        }, "Retry")
      ])) : i.value ? (o(), K(Bn, {
        key: 2,
        media: i.value,
        "stream-url": c.value
      }, null, 8, ["media", "stream-url"])) : x("", !0)
    ]));
  }
}), Ln = /* @__PURE__ */ T(Pn, [["__scopeId", "data-v-d9061b47"]]), fe = "access_token", _e = "refresh_token", ge = "user";
class An {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(fe);
  }
  setAccessToken(e) {
    this.storage.setItem(fe, e);
  }
  getRefreshToken() {
    return this.storage.getItem(_e);
  }
  setRefreshToken(e) {
    this.storage.setItem(_e, e);
  }
  getUser() {
    const e = this.storage.getItem(ge);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(ge, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(fe), this.storage.removeItem(_e), this.storage.removeItem(ge);
  }
}
const Ce = xe("auth", () => {
  const n = new An(), e = ke("apiBase", ""), s = new me({ tokenStore: n, baseUrl: e }), i = g(null), c = g(!1), m = g(null), r = P(() => n.getAccessToken() !== null), p = P(() => {
    var k;
    return ((k = i.value) == null ? void 0 : k.is_admin) === !0;
  });
  async function _(k, u) {
    c.value = !0, m.value = null;
    try {
      const f = await s.post("/api/v1/auth/login", { email: k, password: u });
      return n.setAccessToken(f.access_token), n.setRefreshToken(f.refresh_token), await l(), !0;
    } catch (f) {
      return m.value = f instanceof Error ? f.message : "Login failed", !1;
    } finally {
      c.value = !1;
    }
  }
  async function d(k, u, f) {
    c.value = !0, m.value = null;
    try {
      const v = await s.post("/api/v1/auth/register", { email: k, username: u, password: f });
      return n.setAccessToken(v.access_token), n.setRefreshToken(v.refresh_token), await l(), !0;
    } catch (v) {
      return m.value = v instanceof Error ? v.message : "Registration failed", !1;
    } finally {
      c.value = !1;
    }
  }
  async function l() {
    if (r.value)
      try {
        i.value = await s.getCurrentUser();
      } catch {
        i.value = null, n.clear();
      }
  }
  function h() {
    n.clear(), i.value = null;
  }
  return {
    user: i,
    loading: c,
    error: m,
    isLoggedIn: r,
    isAdmin: p,
    client: s,
    login: _,
    signup: d,
    fetchUser: l,
    logout: h
  };
}), jn = {
  key: 0,
  class: "form-error"
}, Rn = { class: "field" }, Fn = { class: "field" }, Dn = { class: "password-wrapper" }, zn = ["type"], Un = ["disabled"], Nn = { class: "form-footer" }, qn = /* @__PURE__ */ B({
  __name: "LoginForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, i = Ce(), c = Ee(), m = g(""), r = g(""), p = g(!1);
    async function _() {
      await i.login(m.value, r.value) && (s("success"), c.push("/app"));
    }
    return (d, l) => {
      const h = Te("router-link");
      return o(), a("form", {
        class: "login-form",
        onSubmit: ae(_, ["prevent"])
      }, [
        l[7] || (l[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        C(i).error ? (o(), a("div", jn, b(C(i).error), 1)) : x("", !0),
        t("div", Rn, [
          l[3] || (l[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          W(t("input", {
            id: "email",
            "onUpdate:modelValue": l[0] || (l[0] = (k) => m.value = k),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [he, m.value]
          ])
        ]),
        t("div", Fn, [
          l[4] || (l[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Dn, [
            W(t("input", {
              id: "password",
              "onUpdate:modelValue": l[1] || (l[1] = (k) => r.value = k),
              type: p.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, zn), [
              [be, r.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: l[2] || (l[2] = (k) => p.value = !p.value)
            }, b(p.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(i).loading
        }, b(C(i).loading ? "Signing in..." : "Sign in"), 9, Un),
        t("p", Nn, [
          l[6] || (l[6] = Y(" Don't have an account? ", -1)),
          A(h, {
            to: "/app/signup",
            class: "link"
          }, {
            default: J(() => [...l[5] || (l[5] = [
              Y("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Hn = /* @__PURE__ */ T(qn, [["__scopeId", "data-v-22bc5576"]]), Gn = { class: "auth-page" }, Kn = { class: "auth-card" }, On = /* @__PURE__ */ B({
  __name: "LoginPage",
  setup(n) {
    return (e, s) => (o(), a("div", Gn, [
      t("div", Kn, [
        A(Hn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Yn = /* @__PURE__ */ T(On, [["__scopeId", "data-v-9c53ce6a"]]), Xn = {
  key: 0,
  class: "form-error"
}, Jn = { class: "field" }, Wn = { class: "field" }, Qn = { class: "field" }, Zn = { class: "password-wrapper" }, es = ["type"], ts = { class: "field" }, ns = ["type"], ss = ["disabled"], os = { class: "form-footer" }, as = /* @__PURE__ */ B({
  __name: "SignupForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, i = Ce(), c = Ee(), m = g(""), r = g(""), p = g(""), _ = g(""), d = g(!1), l = g(null);
    async function h() {
      if (l.value = null, p.value.length < 8) {
        l.value = "Password must be at least 8 characters.";
        return;
      }
      if (p.value !== _.value) {
        l.value = "Passwords do not match.";
        return;
      }
      await i.signup(m.value, r.value, p.value) && (s("success"), c.push("/app"));
    }
    return (k, u) => {
      const f = Te("router-link");
      return o(), a("form", {
        class: "signup-form",
        onSubmit: ae(h, ["prevent"])
      }, [
        u[11] || (u[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        C(i).error || l.value ? (o(), a("div", Xn, b(C(i).error || l.value), 1)) : x("", !0),
        t("div", Jn, [
          u[5] || (u[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          W(t("input", {
            id: "email",
            "onUpdate:modelValue": u[0] || (u[0] = (v) => m.value = v),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [he, m.value]
          ])
        ]),
        t("div", Wn, [
          u[6] || (u[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          W(t("input", {
            id: "username",
            "onUpdate:modelValue": u[1] || (u[1] = (v) => r.value = v),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [he, r.value]
          ])
        ]),
        t("div", Qn, [
          u[7] || (u[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Zn, [
            W(t("input", {
              id: "password",
              "onUpdate:modelValue": u[2] || (u[2] = (v) => p.value = v),
              type: d.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, es), [
              [be, p.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: u[3] || (u[3] = (v) => d.value = !d.value)
            }, b(d.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", ts, [
          u[8] || (u[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          W(t("input", {
            id: "confirm",
            "onUpdate:modelValue": u[4] || (u[4] = (v) => _.value = v),
            type: d.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, ns), [
            [be, _.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(i).loading
        }, b(C(i).loading ? "Creating account..." : "Create account"), 9, ss),
        t("p", os, [
          u[10] || (u[10] = Y(" Already have an account? ", -1)),
          A(f, {
            to: "/app/login",
            class: "link"
          }, {
            default: J(() => [...u[9] || (u[9] = [
              Y("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), ls = /* @__PURE__ */ T(as, [["__scopeId", "data-v-d5e42c72"]]), is = { class: "auth-page" }, rs = { class: "auth-card" }, cs = /* @__PURE__ */ B({
  __name: "SignupPage",
  setup(n) {
    return (e, s) => (o(), a("div", is, [
      t("div", rs, [
        A(ls, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), ds = /* @__PURE__ */ T(cs, [["__scopeId", "data-v-609331e4"]]), us = { class: "settings-form" }, vs = {
  key: 0,
  class: "settings-loading"
}, hs = {
  key: 1,
  class: "settings-error"
}, ms = { class: "group-title" }, ps = ["for"], fs = { class: "setting-control" }, _s = ["id", "checked", "onChange"], gs = ["id", "value", "onChange"], bs = ["id", "value", "onChange"], ks = { class: "settings-actions" }, ys = {
  key: 0,
  class: "success-msg"
}, $s = ["disabled"], ws = /* @__PURE__ */ B({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(n, { emit: e }) {
    const s = n, i = e, c = Ce(), m = g({}), r = g(!0), p = g(!1), _ = g(null), d = g(null), l = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], h = P(
      () => s.groups ? l.filter((I) => s.groups.includes(I)) : l
    );
    async function k() {
      r.value = !0, _.value = null;
      try {
        const I = await c.client.get("/api/v1/users/me/settings");
        m.value = I;
      } catch (I) {
        _.value = I instanceof Error ? I.message : "Failed to load settings";
      } finally {
        r.value = !1;
      }
    }
    async function u() {
      p.value = !0, _.value = null, d.value = null;
      try {
        await c.client.put("/api/v1/users/me/settings", m.value), d.value = "Settings saved.", i("saved", m.value), setTimeout(() => {
          d.value = null;
        }, 3e3);
      } catch (I) {
        _.value = I instanceof Error ? I.message : "Failed to save settings";
      } finally {
        p.value = !1;
      }
    }
    function f(I, q) {
      m.value[I] = q;
    }
    Z(k);
    const v = {
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
    return (I, q) => (o(), a("div", us, [
      r.value ? (o(), a("div", vs, "Loading settings...")) : _.value ? (o(), a("div", hs, b(_.value), 1)) : (o(), a(F, { key: 2 }, [
        (o(!0), a(F, null, D(h.value, (H) => (o(), a("div", {
          key: H,
          class: "settings-group"
        }, [
          t("h3", ms, b(v[H]), 1),
          (o(), a(F, null, D(S, (O, z) => W(t("div", {
            key: z,
            class: "setting-row"
          }, [
            t("label", {
              for: z,
              class: "setting-label"
            }, b(O.label), 9, ps),
            t("div", fs, [
              O.type === "bool" ? (o(), a("input", {
                key: 0,
                id: z,
                type: "checkbox",
                class: "toggle",
                checked: !!m.value[z],
                onChange: (V) => f(z, V.target.checked)
              }, null, 40, _s)) : O.type === "number" ? (o(), a("input", {
                key: 1,
                id: z,
                type: "number",
                class: "input number-input",
                value: m.value[z],
                onChange: (V) => f(z, Number(V.target.value))
              }, null, 40, gs)) : (o(), a("input", {
                key: 2,
                id: z,
                type: "text",
                class: "input",
                value: m.value[z] ?? "",
                onChange: (V) => f(z, V.target.value)
              }, null, 40, bs))
            ])
          ]), [
            [ye, z.startsWith(H)]
          ])), 64))
        ]))), 128)),
        t("div", ks, [
          d.value ? (o(), a("div", ys, b(d.value), 1)) : x("", !0),
          t("button", {
            class: "save-btn",
            disabled: p.value,
            onClick: u
          }, b(p.value ? "Saving..." : "Save settings"), 9, $s)
        ])
      ], 64))
    ]));
  }
}), xs = /* @__PURE__ */ T(ws, [["__scopeId", "data-v-51b588b6"]]), Cs = { class: "settings-page" }, Is = /* @__PURE__ */ B({
  __name: "SettingsPage",
  setup(n) {
    return (e, s) => (o(), a("div", Cs, [
      s[0] || (s[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      A(xs)
    ]));
  }
}), Ss = /* @__PURE__ */ T(Is, [["__scopeId", "data-v-f9ca8a28"]]);
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
function Bs(n) {
  const e = n.routerBase || "/app", s = [
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
  return n.extraRoutes && s.push(...n.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: ut,
    props: { appName: n.app }
  }), s;
}
function wc(n) {
  const e = {
    ...Ms(),
    ...n
  }, s = He(), i = e.routerBase || "/app", c = Oe({
    history: Ye(i),
    routes: Bs(e)
  }), m = ze(it);
  return m.provide("apiBase", e.apiBase), m.use(s), m.use(c), m;
}
const Ts = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Es(n, e) {
  return o(), a("svg", Ts, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
    }, null, -1)
  ])]);
}
const Vs = w({ name: "lucide-play", render: Es }), Ps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ls(n, e) {
  return o(), a("svg", Ps, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("rect", {
        width: "5",
        height: "18",
        x: "14",
        y: "3",
        rx: "1"
      }),
      t("rect", {
        width: "5",
        height: "18",
        x: "5",
        y: "3",
        rx: "1"
      })
    ], -1)
  ])]);
}
const As = w({ name: "lucide-pause", render: Ls }), js = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Rs(n, e) {
  return o(), a("svg", js, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
    }, null, -1)
  ])]);
}
const Fs = w({ name: "lucide-skip-back", render: Rs }), Ds = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function zs(n, e) {
  return o(), a("svg", Ds, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
    }, null, -1)
  ])]);
}
const Us = w({ name: "lucide-skip-forward", render: zs }), Ns = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qs(n, e) {
  return o(), a("svg", Ns, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }),
      t("path", { d: "M3 3v5h5" })
    ], -1)
  ])]);
}
const Hs = w({ name: "lucide-rotate-ccw", render: qs }), Gs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ks(n, e) {
  return o(), a("svg", Gs, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }),
      t("path", { d: "M21 3v5h-5" })
    ], -1)
  ])]);
}
const Os = w({ name: "lucide-rotate-cw", render: Ks }), Ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xs(n, e) {
  return o(), a("svg", Ys, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
    }, null, -1)
  ])]);
}
const Js = w({ name: "lucide-volume-2", render: Xs }), Ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qs(n, e) {
  return o(), a("svg", Ws, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
    }, null, -1)
  ])]);
}
const Zs = w({ name: "lucide-volume-1", render: Qs }), eo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function to(n, e) {
  return o(), a("svg", eo, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
    }, null, -1)
  ])]);
}
const no = w({ name: "lucide-volume-x", render: to }), so = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function oo(n, e) {
  return o(), a("svg", so, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("rect", {
        width: "18",
        height: "14",
        x: "3",
        y: "5",
        rx: "2",
        ry: "2"
      }),
      t("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })
    ], -1)
  ])]);
}
const ao = w({ name: "lucide-captions", render: oo }), lo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function io(n, e) {
  return o(), a("svg", lo, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }),
      t("rect", {
        width: "10",
        height: "7",
        x: "12",
        y: "13",
        rx: "2"
      })
    ], -1)
  ])]);
}
const ro = w({ name: "lucide-picture-in-picture-2", render: io }), co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function uo(n, e) {
  return o(), a("svg", co, [...e[0] || (e[0] = [
    t("rect", {
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
const vo = w({ name: "lucide-rectangle-horizontal", render: uo }), ho = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function mo(n, e) {
  return o(), a("svg", ho, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
    }, null, -1)
  ])]);
}
const po = w({ name: "lucide-maximize", render: mo }), fo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _o(n, e) {
  return o(), a("svg", fo, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
    }, null, -1)
  ])]);
}
const go = w({ name: "lucide-minimize", render: _o }), bo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ko(n, e) {
  return o(), a("svg", bo, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
    }, null, -1)
  ])]);
}
const yo = w({ name: "lucide-maximize-2", render: ko }), $o = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wo(n, e) {
  return o(), a("svg", $o, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
    }, null, -1)
  ])]);
}
const xo = w({ name: "lucide-cast", render: wo }), Co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Io(n, e) {
  return o(), a("svg", Co, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }),
      t("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ])]);
}
const So = w({ name: "lucide-settings", render: Io }), Mo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bo(n, e) {
  return o(), a("svg", Mo, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
    }, null, -1)
  ])]);
}
const To = w({ name: "lucide-gauge", render: Bo }), Eo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vo(n, e) {
  return o(), a("svg", Eo, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2"
      }),
      t("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })
    ], -1)
  ])]);
}
const Po = w({ name: "lucide-film", render: Vo }), Lo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ao(n, e) {
  return o(), a("svg", Lo, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "3",
        rx: "2",
        ry: "2"
      }),
      t("circle", {
        cx: "9",
        cy: "9",
        r: "2"
      }),
      t("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
    ], -1)
  ])]);
}
const jo = w({ name: "lucide-image", render: Ao }), Ro = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fo(n, e) {
  return o(), a("svg", Ro, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M9 18V5l12-2v13" }),
      t("circle", {
        cx: "6",
        cy: "18",
        r: "3"
      }),
      t("circle", {
        cx: "18",
        cy: "16",
        r: "3"
      })
    ], -1)
  ])]);
}
const Do = w({ name: "lucide-music", render: Fo }), zo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Uo(n, e) {
  return o(), a("svg", zo, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "m17 2l-5 5l-5-5" }),
      t("rect", {
        width: "20",
        height: "15",
        x: "2",
        y: "7",
        rx: "2"
      })
    ], -1)
  ])]);
}
const No = w({ name: "lucide-tv", render: Uo }), qo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ho(n, e) {
  return o(), a("svg", qo, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "m21 21l-4.34-4.34" }),
      t("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      })
    ], -1)
  ])]);
}
const Go = w({ name: "lucide-search", render: Ho }), Ko = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oo(n, e) {
  return o(), a("svg", Ko, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
    }, null, -1)
  ])]);
}
const Yo = w({ name: "lucide-sliders-horizontal", render: Oo }), Xo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Jo(n, e) {
  return o(), a("svg", Xo, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M8 2v4m8-4v4" }),
      t("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2"
      }),
      t("path", { d: "M3 10h18" })
    ], -1)
  ])]);
}
const Wo = w({ name: "lucide-calendar", render: Jo }), Qo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zo(n, e) {
  return o(), a("svg", Qo, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
    }, null, -1)
  ])]);
}
const ea = w({ name: "lucide-arrow-up-down", render: Zo }), ta = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function na(n, e) {
  return o(), a("svg", ta, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
    }, null, -1)
  ])]);
}
const sa = w({ name: "lucide-star", render: na }), oa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function aa(n, e) {
  return o(), a("svg", oa, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
    }, null, -1)
  ])]);
}
const la = w({ name: "lucide-list", render: aa }), ia = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ra(n, e) {
  return o(), a("svg", ia, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 12h14m-7-7v14"
    }, null, -1)
  ])]);
}
const ca = w({ name: "lucide-plus", render: ra }), da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ua(n, e) {
  return o(), a("svg", da, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      t("path", { d: "M12 16v-4m0-4h.01" })
    ], -1)
  ])]);
}
const va = w({ name: "lucide-info", render: ua }), ha = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ma(n, e) {
  return o(), a("svg", ha, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M18 6L6 18M6 6l12 12"
    }, null, -1)
  ])]);
}
const pa = w({ name: "lucide-x", render: ma }), fa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _a(n, e) {
  return o(), a("svg", fa, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20 6L9 17l-5-5"
    }, null, -1)
  ])]);
}
const ga = w({ name: "lucide-check", render: _a }), ba = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ka(n, e) {
  return o(), a("svg", ba, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }, null, -1)
  ])]);
}
const ya = w({ name: "lucide-bookmark", render: ka }), $a = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wa(n, e) {
  return o(), a("svg", $a, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }, null, -1)
  ])]);
}
const xa = w({ name: "lucide-bookmark-plus", render: wa }), Ca = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ia(n, e) {
  return o(), a("svg", Ca, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
    }, null, -1)
  ])]);
}
const Sa = w({ name: "lucide-heart", render: Ia }), Ma = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ba(n, e) {
  return o(), a("svg", Ma, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
      t("circle", {
        cx: "12",
        cy: "7",
        r: "4"
      })
    ], -1)
  ])]);
}
const Ta = w({ name: "lucide-user", render: Ba }), Ea = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Va(n, e) {
  return o(), a("svg", Ea, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }, null, -1)
  ])]);
}
const Pa = w({ name: "lucide-log-out", render: Va }), La = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Aa(n, e) {
  return o(), a("svg", La, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M4 5h16M4 12h16M4 19h16"
    }, null, -1)
  ])]);
}
const ja = w({ name: "lucide-menu", render: Aa }), Ra = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fa(n, e) {
  return o(), a("svg", Ra, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("circle", {
        cx: "12",
        cy: "12",
        r: "1"
      }),
      t("circle", {
        cx: "19",
        cy: "12",
        r: "1"
      }),
      t("circle", {
        cx: "5",
        cy: "12",
        r: "1"
      })
    ], -1)
  ])]);
}
const Da = w({ name: "lucide-more-horizontal", render: Fa }), za = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ua(n, e) {
  return o(), a("svg", za, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }),
      t("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      })
    ], -1)
  ])]);
}
const Na = w({ name: "lucide-eye", render: Ua }), qa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ha(n, e) {
  return o(), a("svg", qa, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }),
      t("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })
    ], -1)
  ])]);
}
const Ga = w({ name: "lucide-eye-off", render: Ha }), Ka = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oa(n, e) {
  return o(), a("svg", Ka, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m12 19l-7-7l7-7m7 7H5"
    }, null, -1)
  ])]);
}
const Ya = w({ name: "lucide-arrow-left", render: Oa }), Xa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ja(n, e) {
  return o(), a("svg", Xa, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m5 12l7-7l7 7m-7 7V5"
    }, null, -1)
  ])]);
}
const Wa = w({ name: "lucide-arrow-up", render: Ja }), Qa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Za(n, e) {
  return o(), a("svg", Qa, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M12 5v14m7-7l-7 7l-7-7"
    }, null, -1)
  ])]);
}
const el = w({ name: "lucide-arrow-down", render: Za }), tl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function nl(n, e) {
  return o(), a("svg", tl, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m6 9l6 6l6-6"
    }, null, -1)
  ])]);
}
const sl = w({ name: "lucide-chevron-down", render: nl }), ol = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function al(n, e) {
  return o(), a("svg", ol, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m18 15l-6-6l-6 6"
    }, null, -1)
  ])]);
}
const ll = w({ name: "lucide-chevron-up", render: al }), il = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function rl(n, e) {
  return o(), a("svg", il, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m15 18l-6-6l6-6"
    }, null, -1)
  ])]);
}
const cl = w({ name: "lucide-chevron-left", render: rl }), dl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ul(n, e) {
  return o(), a("svg", dl, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m9 18l6-6l-6-6"
    }, null, -1)
  ])]);
}
const vl = w({ name: "lucide-chevron-right", render: ul }), hl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ml(n, e) {
  return o(), a("svg", hl, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21 12a9 9 0 1 1-6.219-8.56"
    }, null, -1)
  ])]);
}
const pl = w({ name: "lucide-loader-circle", render: ml }), fl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _l(n, e) {
  return o(), a("svg", fl, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      t("path", { d: "M12 8v4m0 4h.01" })
    ], -1)
  ])]);
}
const gl = w({ name: "lucide-circle-alert", render: _l }), bl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function kl(n, e) {
  return o(), a("svg", bl, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      t("path", { d: "m9 12l2 2l4-4" })
    ], -1)
  ])]);
}
const yl = w({ name: "lucide-circle-check", render: kl }), $l = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wl(n, e) {
  return o(), a("svg", $l, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      }),
      t("path", { d: "m15 9l-6 6m0-6l6 6" })
    ], -1)
  ])]);
}
const xl = w({ name: "lucide-circle-x", render: wl }), Cl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Il(n, e) {
  return o(), a("svg", Cl, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }),
      t("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
    ], -1)
  ])]);
}
const Sl = w({ name: "lucide-sun", render: Il }), Ml = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bl(n, e) {
  return o(), a("svg", Ml, [...e[0] || (e[0] = [
    t("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
    }, null, -1)
  ])]);
}
const Tl = w({ name: "lucide-moon", render: Bl }), El = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vl(n, e) {
  return o(), a("svg", El, [...e[0] || (e[0] = [
    t("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      t("rect", {
        width: "20",
        height: "14",
        x: "2",
        y: "3",
        rx: "2"
      }),
      t("path", { d: "M8 21h8m-4-4v4" })
    ], -1)
  ])]);
}
const Pl = w({ name: "lucide-monitor", render: Vl }), G = /* @__PURE__ */ B({
  __name: "Icon",
  props: {
    name: {},
    size: { default: void 0 },
    label: { default: void 0 },
    strokeWidth: { default: void 0 }
  },
  setup(n) {
    const e = {
      // playback (maps the legacy play/pause/volume/mute/back emoji)
      play: Vs,
      pause: As,
      "skip-back": Fs,
      "skip-forward": Us,
      rewind: Hs,
      forward: Os,
      volume: Js,
      "volume-low": Zs,
      mute: no,
      captions: ao,
      pip: ro,
      theater: vo,
      fullscreen: po,
      "fullscreen-exit": go,
      expand: yo,
      cast: xo,
      settings: So,
      speed: To,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: Po,
      image: jo,
      music: Do,
      tv: No,
      search: Go,
      filter: Yo,
      calendar: Wo,
      sort: ea,
      star: sa,
      list: la,
      // actions
      plus: ca,
      info: va,
      x: pa,
      check: ga,
      bookmark: ya,
      "bookmark-plus": xa,
      heart: Sa,
      user: Ta,
      "log-out": Pa,
      menu: ja,
      more: Da,
      eye: Na,
      "eye-off": Ga,
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
      alert: gl,
      success: yl,
      error: xl,
      sun: Sl,
      moon: Tl,
      monitor: Pl
    }, s = n, i = P(() => e[s.name]), c = P(
      () => s.size === void 0 ? void 0 : typeof s.size == "number" ? `${s.size}px` : s.size
    );
    return (m, r) => (o(), K(Ue(i.value), {
      class: "phlix-icon",
      style: Q(c.value ? { fontSize: c.value } : void 0),
      "stroke-width": n.strokeWidth,
      role: n.label ? "img" : void 0,
      "aria-label": n.label,
      "aria-hidden": n.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), Ll = ["type", "disabled", "aria-busy"], Al = {
  key: 0,
  class: "phlix-btn__spinner"
}, jl = { class: "phlix-btn__label" }, Rl = /* @__PURE__ */ B({
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
  setup(n) {
    const e = n, s = P(() => e.disabled || e.loading);
    return (i, c) => (o(), a("button", {
      type: n.type,
      class: L(["phlix-btn", [`phlix-btn--${n.variant}`, `phlix-btn--${n.size}`, { "phlix-btn--block": n.block, "is-loading": n.loading }]]),
      disabled: s.value,
      "aria-busy": n.loading || void 0
    }, [
      n.loading ? (o(), a("span", Al, [
        A(G, { name: "spinner" })
      ])) : x("", !0),
      n.leftIcon && !n.loading ? (o(), K(G, {
        key: 1,
        name: n.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0),
      t("span", jl, [
        N(i.$slots, "default", {}, void 0, !0)
      ]),
      n.rightIcon ? (o(), K(G, {
        key: 2,
        name: n.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0)
    ], 10, Ll));
  }
}), xc = /* @__PURE__ */ T(Rl, [["__scopeId", "data-v-8cdee95a"]]), Fl = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], Dl = /* @__PURE__ */ B({
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
  setup(n) {
    const e = n, s = P(() => e.disabled || e.loading);
    return (i, c) => (o(), a("button", {
      type: n.type,
      class: L(["phlix-iconbtn", [`phlix-iconbtn--${n.variant}`, `phlix-iconbtn--${n.size}`, { "is-pressed": n.pressed }]]),
      disabled: s.value,
      "aria-label": n.label,
      title: n.label,
      "aria-pressed": n.pressed === void 0 ? void 0 : n.pressed,
      "aria-busy": n.loading || void 0
    }, [
      A(G, {
        name: n.loading ? "spinner" : n.name,
        class: L({ "phlix-iconbtn__spin": n.loading })
      }, null, 8, ["name", "class"])
    ], 10, Fl));
  }
}), Ie = /* @__PURE__ */ T(Dl, [["__scopeId", "data-v-fc0cd545"]]), zl = ["role", "aria-label"], Ul = /* @__PURE__ */ B({
  __name: "Badge",
  props: {
    tone: { default: "neutral" },
    size: { default: "sm" },
    mono: { type: Boolean, default: !1 },
    icon: {},
    label: {}
  },
  setup(n) {
    return (e, s) => (o(), a("span", {
      class: L(["phlix-badge", [`phlix-badge--${n.tone}`, `phlix-badge--${n.size}`, { "phlix-badge--mono": n.mono }]]),
      role: n.label ? "img" : void 0,
      "aria-label": n.label
    }, [
      n.icon ? (o(), K(G, {
        key: 0,
        name: n.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : x("", !0),
      N(e.$slots, "default", {}, void 0, !0)
    ], 10, zl));
  }
}), Cc = /* @__PURE__ */ T(Ul, [["__scopeId", "data-v-8f8d0fd2"]]), Nl = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], ql = /* @__PURE__ */ B({
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
  setup(n, { emit: e }) {
    const s = n, i = e, c = g(null), m = g(!1), r = P(() => {
      const v = s.max - s.min || 1;
      return Math.min(100, Math.max(0, (s.modelValue - s.min) / v * 100));
    }), p = P(
      () => s.formatValue ? s.formatValue(s.modelValue) : String(s.modelValue)
    );
    function _(v) {
      const S = Math.min(s.max, Math.max(s.min, v)), I = Math.round((S - s.min) / s.step), q = s.min + I * s.step;
      return Math.round(q * 1e6) / 1e6;
    }
    function d(v, S = !1) {
      const I = _(v);
      I !== s.modelValue && (i("update:modelValue", I), S && i("change", I));
    }
    function l(v) {
      const S = c.value;
      if (!S) return s.modelValue;
      const I = S.getBoundingClientRect(), q = I.width ? (v - I.left) / I.width : 0;
      return s.min + q * (s.max - s.min);
    }
    function h(v) {
      var S, I;
      s.disabled || ((I = (S = v.currentTarget).setPointerCapture) == null || I.call(S, v.pointerId), m.value = !0, d(l(v.clientX)));
    }
    function k(v) {
      m.value && d(l(v.clientX));
    }
    function u(v) {
      var S, I;
      m.value && (m.value = !1, (I = (S = v.currentTarget).releasePointerCapture) == null || I.call(S, v.pointerId), i("change", s.modelValue));
    }
    function f(v) {
      if (s.disabled) return;
      const S = (s.max - s.min) / 10;
      let I = !0;
      switch (v.key) {
        case "ArrowRight":
        case "ArrowUp":
          d(s.modelValue + s.step, !0);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          d(s.modelValue - s.step, !0);
          break;
        case "PageUp":
          d(s.modelValue + S, !0);
          break;
        case "PageDown":
          d(s.modelValue - S, !0);
          break;
        case "Home":
          d(s.min, !0);
          break;
        case "End":
          d(s.max, !0);
          break;
        default:
          I = !1;
      }
      I && v.preventDefault();
    }
    return (v, S) => (o(), a("div", {
      class: L(["phlix-slider", { "is-disabled": n.disabled }]),
      role: "slider",
      tabindex: n.disabled ? -1 : 0,
      "aria-label": n.label,
      "aria-valuemin": n.min,
      "aria-valuemax": n.max,
      "aria-valuenow": n.modelValue,
      "aria-valuetext": p.value,
      "aria-disabled": n.disabled || void 0,
      "aria-orientation": "horizontal",
      onKeydown: f
    }, [
      t("div", {
        ref_key: "trackEl",
        ref: c,
        class: "phlix-slider__track",
        onPointerdown: h,
        onPointermove: k,
        onPointerup: u
      }, [
        t("div", {
          class: "phlix-slider__fill",
          style: Q({ width: r.value + "%" })
        }, null, 4),
        t("div", {
          class: "phlix-slider__thumb",
          style: Q({ left: r.value + "%" })
        }, null, 4)
      ], 544)
    ], 42, Nl));
  }
}), Ic = /* @__PURE__ */ T(ql, [["__scopeId", "data-v-9ca92975"]]), Hl = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], Gl = ["id"], Kl = /* @__PURE__ */ B({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const s = n, i = e, c = le();
    function m() {
      s.disabled || i("update:modelValue", !s.modelValue);
    }
    return (r, p) => (o(), a("span", {
      class: L(["phlix-switch", { "is-disabled": n.disabled }])
    }, [
      t("button", {
        type: "button",
        role: "switch",
        class: L(["phlix-switch__control", { "is-on": n.modelValue }]),
        "aria-checked": n.modelValue,
        "aria-label": n.label ? void 0 : "Toggle",
        "aria-labelledby": n.label ? C(c) : void 0,
        disabled: n.disabled,
        onClick: m
      }, [...p[0] || (p[0] = [
        t("span", { class: "phlix-switch__thumb" }, null, -1)
      ])], 10, Hl),
      n.label ? (o(), a("label", {
        key: 0,
        id: C(c),
        class: "phlix-switch__label",
        onClick: m
      }, b(n.label), 9, Gl)) : x("", !0)
    ], 2));
  }
}), Sc = /* @__PURE__ */ T(Kl, [["__scopeId", "data-v-4631a106"]]), Ol = ["disabled", "aria-pressed"], Yl = { class: "phlix-chip__label" }, Xl = ["disabled", "aria-label"], Jl = /* @__PURE__ */ B({
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
  setup(n, { emit: e }) {
    const s = n, i = e;
    function c() {
      s.disabled || (s.selected !== void 0 && i("update:selected", !s.selected), i("click"));
    }
    return (m, r) => (o(), a("span", {
      class: L(["phlix-chip", [`phlix-chip--${n.size}`, { "is-selected": n.selected, "is-disabled": n.disabled }]])
    }, [
      t("button", {
        type: "button",
        class: "phlix-chip__main",
        disabled: n.disabled,
        "aria-pressed": n.selected === void 0 ? void 0 : n.selected,
        onClick: c
      }, [
        n.icon ? (o(), K(G, {
          key: 0,
          name: n.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : x("", !0),
        t("span", Yl, [
          N(m.$slots, "default", {}, void 0, !0)
        ])
      ], 8, Ol),
      n.removable ? (o(), a("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: n.disabled,
        "aria-label": n.removeLabel,
        onClick: r[0] || (r[0] = (p) => i("remove"))
      }, [
        A(G, { name: "x" })
      ], 8, Xl)) : x("", !0)
    ], 2));
  }
}), Mc = /* @__PURE__ */ T(Jl, [["__scopeId", "data-v-d6cd193e"]]);
function Pe(n) {
  return n.map(
    (e) => typeof e == "object" ? e : { value: e, label: String(e) }
  );
}
function se(n, e, s) {
  var m;
  const i = n.length;
  if (i === 0) return -1;
  let c = e;
  for (let r = 0; r < i; r++)
    if (c = (c + s + i) % i, !((m = n[c]) != null && m.disabled)) return c;
  return e;
}
function ve(n, e) {
  return e === "first" ? se(n, -1, 1) : se(n, 0, -1);
}
const Wl = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "disabled"], Ql = ["id", "aria-label"], Zl = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], ei = { class: "phlix-select__check" }, ti = /* @__PURE__ */ B({
  __name: "Select",
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "Select…" },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const s = n, i = e, c = P(() => Pe(s.options)), m = le(), r = g(!1), p = g(-1), _ = g(null), d = g(null);
    let l = "", h;
    const k = P(() => c.value.findIndex((y) => y.value === s.modelValue)), u = P(() => {
      var y;
      return ((y = c.value[k.value]) == null ? void 0 : y.label) ?? "";
    }), f = P(() => p.value >= 0 ? `${m}-opt-${p.value}` : void 0);
    function v() {
      s.disabled || r.value || (r.value = !0, p.value = k.value >= 0 ? k.value : ve(c.value, "first"), ne(H));
    }
    function S() {
      r.value = !1;
    }
    function I(y) {
      var M, j;
      const $ = c.value[y];
      !$ || $.disabled || ($.value !== s.modelValue && (i("update:modelValue", $.value), i("change", $.value)), S(), (j = (M = _.value) == null ? void 0 : M.querySelector(".phlix-select__trigger")) == null || j.focus());
    }
    function q(y) {
      p.value = se(c.value, p.value, y), ne(H);
    }
    function H() {
      var $, M;
      const y = ($ = d.value) == null ? void 0 : $.querySelector(".is-active");
      (M = y == null ? void 0 : y.scrollIntoView) == null || M.call(y, { block: "nearest" });
    }
    function O(y) {
      if (!s.disabled)
        switch (y.key) {
          case "ArrowDown":
            y.preventDefault(), r.value ? q(1) : v();
            break;
          case "ArrowUp":
            y.preventDefault(), r.value ? q(-1) : v();
            break;
          case "Home":
            r.value && (y.preventDefault(), p.value = ve(c.value, "first"), ne(H));
            break;
          case "End":
            r.value && (y.preventDefault(), p.value = ve(c.value, "last"), ne(H));
            break;
          case "Enter":
          case " ":
            y.preventDefault(), r.value && p.value >= 0 ? I(p.value) : v();
            break;
          case "Escape":
            r.value && (y.preventDefault(), S());
            break;
          case "Tab":
            S();
            break;
          default:
            y.key.length === 1 && !y.metaKey && !y.ctrlKey && !y.altKey && z(y.key);
        }
    }
    function z(y) {
      r.value || v(), l += y.toLowerCase(), clearTimeout(h), h = setTimeout(() => l = "", 600);
      const $ = c.value.findIndex((M) => !M.disabled && M.label.toLowerCase().startsWith(l));
      $ >= 0 && (p.value = $, ne(H));
    }
    function V(y) {
      r.value && _.value && !_.value.contains(y.target) && S();
    }
    return oe(r, (y) => {
      y ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0);
    }), de(() => {
      document.removeEventListener("pointerdown", V, !0), clearTimeout(h);
    }), (y, $) => (o(), a("div", {
      ref_key: "rootEl",
      ref: _,
      class: L(["phlix-select", { "is-open": r.value, "is-disabled": n.disabled }])
    }, [
      t("button", {
        type: "button",
        class: "phlix-select__trigger",
        "aria-haspopup": "listbox",
        "aria-expanded": r.value,
        "aria-controls": r.value ? `${C(m)}-list` : void 0,
        "aria-activedescendant": r.value ? f.value : void 0,
        "aria-label": n.label,
        disabled: n.disabled,
        onClick: $[0] || ($[0] = (M) => r.value ? S() : v()),
        onKeydown: O
      }, [
        t("span", {
          class: L(["phlix-select__value", { "is-placeholder": k.value < 0 }])
        }, b(k.value >= 0 ? u.value : n.placeholder), 3),
        A(G, {
          name: "chevron-down",
          class: "phlix-select__caret"
        })
      ], 40, Wl),
      W(t("ul", {
        id: `${C(m)}-list`,
        ref_key: "listEl",
        ref: d,
        class: "phlix-select__list",
        role: "listbox",
        "aria-label": n.label
      }, [
        (o(!0), a(F, null, D(c.value, (M, j) => (o(), a("li", {
          id: `${C(m)}-opt-${j}`,
          key: M.value,
          class: L(["phlix-select__option", { "is-active": j === p.value, "is-disabled": M.disabled }]),
          role: "option",
          "aria-selected": M.value === n.modelValue,
          "aria-disabled": M.disabled || void 0,
          onClick: (ee) => I(j),
          onPointermove: (ee) => !M.disabled && (p.value = j)
        }, [
          t("span", ei, [
            M.value === n.modelValue ? (o(), K(G, {
              key: 0,
              name: "check"
            })) : x("", !0)
          ]),
          Y(" " + b(M.label), 1)
        ], 42, Zl))), 128))
      ], 8, Ql), [
        [ye, r.value]
      ])
    ], 2));
  }
}), Bc = /* @__PURE__ */ T(ti, [["__scopeId", "data-v-db34d47a"]]), ni = { class: "phlix-combobox__field" }, si = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "placeholder", "disabled", "value"], oi = ["id", "aria-label"], ai = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], li = { class: "phlix-combobox__check" }, ii = {
  key: 0,
  class: "phlix-combobox__empty",
  role: "presentation"
}, ri = /* @__PURE__ */ B({
  __name: "Combobox",
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "Search…" },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: e }) {
    const s = n, i = e, c = P(() => Pe(s.options)), m = le(), r = g(!1), p = g(-1), _ = g(""), d = g(!1), l = g(null), h = g(null), k = g(null), u = P(() => {
      var $;
      return (($ = c.value.find((M) => M.value === s.modelValue)) == null ? void 0 : $.label) ?? "";
    }), f = P(() => {
      if (!d.value || _.value.trim() === "") return c.value;
      const $ = _.value.toLowerCase();
      return c.value.filter((M) => M.label.toLowerCase().includes($));
    }), v = P(() => p.value >= 0 ? `${m}-opt-${p.value}` : void 0);
    oe(
      () => s.modelValue,
      () => {
        r.value || (_.value = u.value);
      },
      { immediate: !0 }
    );
    function S() {
      s.disabled || r.value || (r.value = !0, p.value = f.value.findIndex(($) => $.value === s.modelValue), p.value < 0 && (p.value = f.value.findIndex(($) => !$.disabled)), ne(O));
    }
    function I() {
      _.value = u.value, d.value = !1, r.value = !1;
    }
    function q($) {
      var j;
      const M = f.value[$];
      !M || M.disabled || (M.value !== s.modelValue && (i("update:modelValue", M.value), i("change", M.value)), _.value = M.label, d.value = !1, r.value = !1, (j = h.value) == null || j.focus());
    }
    function H($) {
      f.value.length !== 0 && (p.value = se(f.value, p.value, $), ne(O));
    }
    function O() {
      var $, M, j;
      (j = (M = ($ = k.value) == null ? void 0 : $.querySelector(".is-active")) == null ? void 0 : M.scrollIntoView) == null || j.call(M, { block: "nearest" });
    }
    function z($) {
      _.value = $.target.value, d.value = !0, r.value = !0, p.value = ve(f.value, "first");
    }
    function V($) {
      if (!s.disabled)
        switch ($.key) {
          case "ArrowDown":
            $.preventDefault(), r.value ? H(1) : S();
            break;
          case "ArrowUp":
            $.preventDefault(), r.value ? H(-1) : S();
            break;
          case "Enter":
            r.value && p.value >= 0 && ($.preventDefault(), q(p.value));
            break;
          case "Escape":
            r.value && ($.preventDefault(), I());
            break;
          case "Tab":
            r.value && I();
            break;
        }
    }
    function y($) {
      r.value && l.value && !l.value.contains($.target) && I();
    }
    return oe(r, ($) => {
      $ ? document.addEventListener("pointerdown", y, !0) : document.removeEventListener("pointerdown", y, !0);
    }), de(() => document.removeEventListener("pointerdown", y, !0)), ($, M) => (o(), a("div", {
      ref_key: "rootEl",
      ref: l,
      class: L(["phlix-combobox", { "is-open": r.value, "is-disabled": n.disabled }])
    }, [
      t("div", ni, [
        A(G, {
          name: "search",
          class: "phlix-combobox__search"
        }),
        t("input", {
          ref_key: "inputEl",
          ref: h,
          class: "phlix-combobox__input",
          type: "text",
          role: "combobox",
          autocomplete: "off",
          "aria-autocomplete": "list",
          "aria-expanded": r.value,
          "aria-controls": r.value ? `${C(m)}-list` : void 0,
          "aria-activedescendant": r.value ? v.value : void 0,
          "aria-label": n.label,
          placeholder: n.placeholder,
          disabled: n.disabled,
          value: _.value,
          onInput: z,
          onFocus: S,
          onKeydown: V
        }, null, 40, si),
        A(G, {
          name: "chevron-down",
          class: "phlix-combobox__caret"
        })
      ]),
      W(t("ul", {
        id: `${C(m)}-list`,
        ref_key: "listEl",
        ref: k,
        class: "phlix-combobox__list",
        role: "listbox",
        "aria-label": n.label
      }, [
        (o(!0), a(F, null, D(f.value, (j, ee) => (o(), a("li", {
          id: `${C(m)}-opt-${ee}`,
          key: j.value,
          class: L(["phlix-combobox__option", { "is-active": ee === p.value, "is-disabled": j.disabled }]),
          role: "option",
          "aria-selected": j.value === n.modelValue,
          "aria-disabled": j.disabled || void 0,
          onClick: (pe) => q(ee),
          onPointermove: (pe) => !j.disabled && (p.value = ee)
        }, [
          t("span", li, [
            j.value === n.modelValue ? (o(), K(G, {
              key: 0,
              name: "check"
            })) : x("", !0)
          ]),
          Y(" " + b(j.label), 1)
        ], 42, ai))), 128)),
        f.value.length === 0 ? (o(), a("li", ii, "No matches")) : x("", !0)
      ], 8, oi), [
        [ye, r.value]
      ])
    ], 2));
  }
}), Tc = /* @__PURE__ */ T(ri, [["__scopeId", "data-v-337aab6e"]]), ci = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
let ce = 0, Le = "";
function di() {
  ce === 0 && (Le = document.body.style.overflow, document.body.style.overflow = "hidden"), ce++;
}
function Be() {
  ce !== 0 && (ce--, ce === 0 && (document.body.style.overflow = Le));
}
function Ae(n, e, s = {}) {
  const i = s.lockScroll ?? !0;
  let c = null, m = !1;
  function r() {
    const l = n.value;
    return l ? Array.from(l.querySelectorAll(ci)).filter(
      (h) => !h.hasAttribute("hidden") && h.getAttribute("aria-hidden") !== "true"
    ) : [];
  }
  function p(l) {
    var v;
    if (!e.value || !n.value) return;
    if (l.key === "Escape") {
      (v = s.onEscape) != null && v.call(s) && l.preventDefault();
      return;
    }
    if (l.key !== "Tab") return;
    const h = r();
    if (h.length === 0) {
      l.preventDefault(), n.value.focus();
      return;
    }
    const k = h[0], u = h[h.length - 1], f = document.activeElement;
    n.value.contains(f) ? l.shiftKey && f === k ? (l.preventDefault(), u.focus()) : !l.shiftKey && f === u && (l.preventDefault(), k.focus()) : (l.preventDefault(), k.focus());
  }
  function _() {
    c = document.activeElement, i && (di(), m = !0), document.addEventListener("keydown", p, !0), ne(() => {
      var h;
      (h = r()[0] ?? n.value) == null || h.focus();
    });
  }
  function d() {
    var l;
    document.removeEventListener("keydown", p, !0), m && (Be(), m = !1), c && document.contains(c) && ((l = c.focus) == null || l.call(c)), c = null;
  }
  oe(e, (l) => l ? _() : d(), { immediate: !0 }), de(() => {
    document.removeEventListener("keydown", p, !0), m && (Be(), m = !1);
  });
}
const ui = ["aria-labelledby"], vi = {
  key: 0,
  class: "phlix-modal__header"
}, hi = ["id"], mi = { class: "phlix-modal__body" }, pi = {
  key: 1,
  class: "phlix-modal__footer"
}, fi = /* @__PURE__ */ B({
  __name: "Modal",
  props: {
    modelValue: { type: Boolean },
    title: {},
    dismissible: { type: Boolean, default: !0 },
    hideClose: { type: Boolean, default: !1 },
    size: { default: "md" }
  },
  emits: ["update:modelValue", "close"],
  setup(n, { emit: e }) {
    const s = n, i = e, c = g(s.modelValue);
    oe(() => s.modelValue, (d) => c.value = d);
    const m = g(null), r = le();
    function p() {
      i("update:modelValue", !1), i("close");
    }
    function _() {
      s.dismissible && p();
    }
    return Ae(m, c, {
      onEscape: () => s.dismissible ? (p(), !0) : !1
    }), (d, l) => (o(), K($e, { to: "body" }, [
      A(we, { name: "phlix-modal" }, {
        default: J(() => [
          n.modelValue ? (o(), a("div", {
            key: 0,
            class: "phlix-modal",
            onPointerdown: ae(_, ["self"])
          }, [
            t("div", {
              ref_key: "panelEl",
              ref: m,
              class: L(["phlix-modal__panel", `phlix-modal__panel--${n.size}`]),
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": n.title ? C(r) : void 0,
              tabindex: "-1"
            }, [
              n.title || !n.hideClose ? (o(), a("header", vi, [
                n.title ? (o(), a("h2", {
                  key: 0,
                  id: C(r),
                  class: "phlix-modal__title"
                }, b(n.title), 9, hi)) : x("", !0),
                n.hideClose ? x("", !0) : (o(), K(Ie, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  class: "phlix-modal__close",
                  onClick: p
                }))
              ])) : x("", !0),
              t("div", mi, [
                N(d.$slots, "default", {}, void 0, !0)
              ]),
              d.$slots.footer ? (o(), a("footer", pi, [
                N(d.$slots, "footer", {}, void 0, !0)
              ])) : x("", !0)
            ], 10, ui)
          ], 32)) : x("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), Ec = /* @__PURE__ */ T(fi, [["__scopeId", "data-v-ad69ec41"]]), _i = ["aria-labelledby"], gi = {
  key: 0,
  class: "phlix-sheet__header"
}, bi = ["id"], ki = { class: "phlix-sheet__body" }, yi = {
  key: 1,
  class: "phlix-sheet__footer"
}, $i = /* @__PURE__ */ B({
  __name: "Sheet",
  props: {
    modelValue: { type: Boolean },
    title: {},
    side: { default: "right" },
    dismissible: { type: Boolean, default: !0 },
    hideClose: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "close"],
  setup(n, { emit: e }) {
    const s = n, i = e, c = g(s.modelValue);
    oe(() => s.modelValue, (d) => c.value = d);
    const m = g(null), r = le();
    function p() {
      i("update:modelValue", !1), i("close");
    }
    function _() {
      s.dismissible && p();
    }
    return Ae(m, c, {
      onEscape: () => s.dismissible ? (p(), !0) : !1
    }), (d, l) => (o(), K($e, { to: "body" }, [
      A(we, {
        name: `phlix-sheet-${n.side}`
      }, {
        default: J(() => [
          n.modelValue ? (o(), a("div", {
            key: 0,
            class: L(["phlix-sheet", `phlix-sheet--${n.side}`]),
            onPointerdown: ae(_, ["self"])
          }, [
            t("aside", {
              ref_key: "panelEl",
              ref: m,
              class: "phlix-sheet__panel",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": n.title ? C(r) : void 0,
              tabindex: "-1"
            }, [
              n.title || !n.hideClose ? (o(), a("header", gi, [
                n.title ? (o(), a("h2", {
                  key: 0,
                  id: C(r),
                  class: "phlix-sheet__title"
                }, b(n.title), 9, bi)) : x("", !0),
                n.hideClose ? x("", !0) : (o(), K(Ie, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  onClick: p
                }))
              ])) : x("", !0),
              t("div", ki, [
                N(d.$slots, "default", {}, void 0, !0)
              ]),
              d.$slots.footer ? (o(), a("footer", yi, [
                N(d.$slots, "footer", {}, void 0, !0)
              ])) : x("", !0)
            ], 8, _i)
          ], 34)) : x("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ]));
  }
}), Vc = /* @__PURE__ */ T($i, [["__scopeId", "data-v-6960f9fb"]]), wi = ["id"], xi = /* @__PURE__ */ B({
  __name: "Tooltip",
  props: {
    text: {},
    placement: { default: "top" },
    delay: { default: 300 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(n) {
    const e = n, s = le(), i = g(!1), c = g(null);
    let m;
    function r() {
      var d;
      return ((d = c.value) == null ? void 0 : d.firstElementChild) ?? null;
    }
    function p() {
      e.disabled || (clearTimeout(m), m = setTimeout(() => {
        var d;
        i.value = !0, (d = r()) == null || d.setAttribute("aria-describedby", s);
      }, e.delay));
    }
    function _() {
      var d;
      clearTimeout(m), i.value = !1, (d = r()) == null || d.removeAttribute("aria-describedby");
    }
    return de(() => clearTimeout(m)), (d, l) => (o(), a("span", {
      ref_key: "wrapEl",
      ref: c,
      class: "phlix-tooltip-wrap",
      onMouseenter: p,
      onMouseleave: _,
      onFocusin: p,
      onFocusout: _,
      onKeydown: Ne(_, ["esc"])
    }, [
      N(d.$slots, "default", {}, void 0, !0),
      A(we, { name: "phlix-tooltip" }, {
        default: J(() => [
          i.value && (n.text || d.$slots.content) ? (o(), a("span", {
            key: 0,
            id: C(s),
            role: "tooltip",
            class: L(["phlix-tooltip", `phlix-tooltip--${n.placement}`])
          }, [
            N(d.$slots, "content", {}, () => [
              Y(b(n.text), 1)
            ], !0)
          ], 10, wi)) : x("", !0)
        ]),
        _: 3
      })
    ], 544));
  }
}), Pc = /* @__PURE__ */ T(xi, [["__scopeId", "data-v-bdb87991"]]), Ci = xe("phlix-toast", () => {
  const n = g([]), e = /* @__PURE__ */ new Map();
  let s = 0;
  function i(l) {
    const h = e.get(l);
    h && (clearTimeout(h), e.delete(l)), n.value = n.value.filter((k) => k.id !== l);
  }
  function c(l) {
    const h = ++s, k = { tone: "neutral", duration: 5e3, ...l, id: h };
    return n.value.push(k), k.duration > 0 && e.set(h, setTimeout(() => i(h), k.duration)), h;
  }
  function m() {
    e.forEach((l) => clearTimeout(l)), e.clear(), n.value = [];
  }
  return { toasts: n, show: c, dismiss: i, clear: m, success: (l, h) => c({ message: l, tone: "success", ...h }), error: (l, h) => c({ message: l, tone: "error", duration: 8e3, ...h }), warning: (l, h) => c({ message: l, tone: "warning", ...h }), info: (l, h) => c({ message: l, tone: "info", ...h }) };
}), Ii = ["role"], Si = { class: "phlix-toast__content" }, Mi = {
  key: 0,
  class: "phlix-toast__title"
}, Bi = { class: "phlix-toast__message" }, Ti = ["onClick"], Ei = /* @__PURE__ */ B({
  __name: "ToastHost",
  props: {
    position: { default: "bottom" }
  },
  setup(n) {
    const e = Ci(), s = {
      neutral: "info",
      success: "success",
      warning: "alert",
      error: "error",
      info: "info"
    }, i = (c) => c.icon ?? s[c.tone];
    return Z(() => {
    }), de(() => {
    }), (c, m) => (o(), K($e, { to: "body" }, [
      t("div", {
        class: L(["phlix-toasts", `phlix-toasts--${n.position}`]),
        role: "region",
        "aria-label": "Notifications"
      }, [
        A(qe, { name: "phlix-toast" }, {
          default: J(() => [
            (o(!0), a(F, null, D(C(e).toasts, (r) => (o(), a("div", {
              key: r.id,
              class: L(["phlix-toast", `phlix-toast--${r.tone}`]),
              role: r.tone === "error" ? "alert" : "status"
            }, [
              A(G, {
                name: i(r),
                class: "phlix-toast__icon"
              }, null, 8, ["name"]),
              t("div", Si, [
                r.title ? (o(), a("p", Mi, b(r.title), 1)) : x("", !0),
                t("p", Bi, b(r.message), 1)
              ]),
              r.action ? (o(), a("button", {
                key: 0,
                type: "button",
                class: "phlix-toast__action",
                onClick: (p) => {
                  r.action.onClick(), C(e).dismiss(r.id);
                }
              }, b(r.action.label), 9, Ti)) : x("", !0),
              A(Ie, {
                name: "x",
                label: "Dismiss",
                size: "sm",
                class: "phlix-toast__close",
                onClick: (p) => C(e).dismiss(r.id)
              }, null, 8, ["onClick"])
            ], 10, Ii))), 128))
          ]),
          _: 1
        })
      ], 2)
    ]));
  }
}), Lc = /* @__PURE__ */ T(Ei, [["__scopeId", "data-v-df4e2232"]]), Vi = {
  key: 0,
  class: "phlix-skel-text",
  "aria-hidden": "true"
}, Pi = /* @__PURE__ */ B({
  __name: "Skeleton",
  props: {
    variant: { default: "rect" },
    width: {},
    height: {},
    radius: {},
    lines: { default: 1 }
  },
  setup(n) {
    return (e, s) => n.variant === "text" ? (o(), a("div", Vi, [
      (o(!0), a(F, null, D(n.lines, (i) => (o(), a("span", {
        key: i,
        class: "phlix-skel phlix-skel--text",
        style: Q({ width: i === n.lines && n.lines > 1 ? "60%" : n.width })
      }, null, 4))), 128))
    ])) : (o(), a("span", {
      key: 1,
      class: L(["phlix-skel", `phlix-skel--${n.variant}`]),
      "aria-hidden": "true",
      style: Q({ width: n.width, height: n.height, borderRadius: n.radius })
    }, null, 6));
  }
}), Ac = /* @__PURE__ */ T(Pi, [["__scopeId", "data-v-c34e4066"]]), Li = ["aria-label"], Ai = /* @__PURE__ */ B({
  __name: "Spinner",
  props: {
    size: {},
    label: { default: "Loading" }
  },
  setup(n) {
    const e = n, s = P(
      () => e.size === void 0 ? void 0 : typeof e.size == "number" ? `${e.size}px` : e.size
    );
    return (i, c) => (o(), a("span", {
      class: "phlix-spinner",
      role: "status",
      "aria-label": n.label,
      style: Q(s.value ? { fontSize: s.value } : void 0)
    }, [
      A(G, {
        name: "spinner",
        class: "phlix-spinner__icon"
      })
    ], 12, Li));
  }
}), jc = /* @__PURE__ */ T(Ai, [["__scopeId", "data-v-2e0507dd"]]), ji = {
  class: "phlix-empty",
  role: "status"
}, Ri = { class: "phlix-empty__icon" }, Fi = { class: "phlix-empty__title" }, Di = {
  key: 0,
  class: "phlix-empty__desc"
}, zi = {
  key: 1,
  class: "phlix-empty__actions"
}, Ui = /* @__PURE__ */ B({
  __name: "EmptyState",
  props: {
    icon: { default: "film" },
    title: {},
    description: {}
  },
  setup(n) {
    return (e, s) => (o(), a("div", ji, [
      t("span", Ri, [
        A(G, { name: n.icon }, null, 8, ["name"])
      ]),
      t("h3", Fi, b(n.title), 1),
      n.description || e.$slots.default ? (o(), a("p", Di, [
        N(e.$slots, "default", {}, () => [
          Y(b(n.description), 1)
        ], !0)
      ])) : x("", !0),
      e.$slots.actions ? (o(), a("div", zi, [
        N(e.$slots, "actions", {}, void 0, !0)
      ])) : x("", !0)
    ]));
  }
}), Rc = /* @__PURE__ */ T(Ui, [["__scopeId", "data-v-9c6d2458"]]), Ni = { class: "phlix-tabs" }, qi = ["aria-label"], Hi = ["id", "aria-selected", "aria-controls", "tabindex", "disabled", "onClick"], Gi = ["id", "aria-labelledby"], Ki = /* @__PURE__ */ B({
  __name: "Tabs",
  props: {
    modelValue: {},
    tabs: {},
    label: {}
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const s = n, i = e, c = le(), m = g(null), r = P(() => s.tabs.findIndex((u) => u.value === s.modelValue)), p = (u) => `${c}-tab-${u}`, _ = (u) => `${c}-panel-${u}`, d = P(() => s.tabs.map((u) => ({ value: u.value, label: u.label, disabled: u.disabled })));
    function l(u) {
      const f = s.tabs.find((v) => v.value === u);
      !f || f.disabled || u !== s.modelValue && i("update:modelValue", u);
    }
    function h(u) {
      var f, v;
      (v = (f = m.value) == null ? void 0 : f.querySelectorAll('[role="tab"]')[u]) == null || v.focus();
    }
    function k(u) {
      let f = -1;
      switch (u.key) {
        case "ArrowRight":
        case "ArrowDown":
          f = se(d.value, r.value, 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          f = se(d.value, r.value, -1);
          break;
        case "Home":
          f = se(d.value, -1, 1);
          break;
        case "End":
          f = se(d.value, 0, -1);
          break;
        default:
          return;
      }
      f >= 0 && (u.preventDefault(), l(s.tabs[f].value), h(f));
    }
    return (u, f) => (o(), a("div", Ni, [
      t("div", {
        ref_key: "listEl",
        ref: m,
        class: "phlix-tabs__list",
        role: "tablist",
        "aria-label": n.label,
        onKeydown: k
      }, [
        (o(!0), a(F, null, D(n.tabs, (v) => (o(), a("button", {
          id: p(v.value),
          key: v.value,
          type: "button",
          role: "tab",
          class: L(["phlix-tabs__tab", { "is-active": v.value === n.modelValue }]),
          "aria-selected": v.value === n.modelValue,
          "aria-controls": _(v.value),
          tabindex: v.value === n.modelValue ? 0 : -1,
          disabled: v.disabled,
          onClick: (S) => l(v.value)
        }, [
          v.icon ? (o(), K(G, {
            key: 0,
            name: v.icon,
            class: "phlix-tabs__icon"
          }, null, 8, ["name"])) : x("", !0),
          Y(" " + b(v.label), 1)
        ], 10, Hi))), 128))
      ], 40, qi),
      n.modelValue ? (o(), a("div", {
        key: 0,
        id: _(n.modelValue),
        class: "phlix-tabs__panel",
        role: "tabpanel",
        "aria-labelledby": p(n.modelValue),
        tabindex: "0"
      }, [
        N(u.$slots, n.modelValue, {}, () => [
          N(u.$slots, "default", {}, void 0, !0)
        ], !0)
      ], 8, Gi)) : x("", !0)
    ]));
  }
}), Fc = /* @__PURE__ */ T(Ki, [["__scopeId", "data-v-95493097"]]), Oi = { class: "phlix-kbd" }, Yi = {
  key: 1,
  class: "phlix-kbd__key"
}, Xi = /* @__PURE__ */ B({
  __name: "Kbd",
  props: {
    keys: {}
  },
  setup(n) {
    const e = n, s = P(() => e.keys === void 0 ? [] : Array.isArray(e.keys) ? e.keys : [e.keys]);
    return (i, c) => (o(), a("span", Oi, [
      s.value.length ? (o(!0), a(F, { key: 0 }, D(s.value, (m, r) => (o(), a("kbd", {
        key: r,
        class: "phlix-kbd__key"
      }, b(m), 1))), 128)) : (o(), a("kbd", Yi, [
        N(i.$slots, "default", {}, void 0, !0)
      ]))
    ]));
  }
}), Dc = /* @__PURE__ */ T(Xi, [["__scopeId", "data-v-5e5c4a8a"]]), Ji = { class: "library-scan-page" }, Wi = {
  key: 0,
  class: "loading"
}, Qi = {
  key: 1,
  class: "error"
}, Zi = {
  key: 2,
  class: "libraries-list"
}, er = { class: "library-info" }, tr = { class: "library-name" }, nr = { class: "library-type" }, sr = { class: "library-paths" }, or = { class: "library-meta" }, ar = { key: 0 }, lr = {
  key: 0,
  class: "scan-status"
}, ir = { class: "library-actions" }, rr = ["onClick", "disabled"], cr = ["onClick", "disabled"], dr = {
  key: 0,
  class: "empty-state"
}, ur = /* @__PURE__ */ B({
  __name: "LibraryScanPage",
  setup(n) {
    const e = g([]), s = g({}), i = g(!0), c = g(null);
    async function m() {
      try {
        const h = await X.get("/api/v1/libraries");
        e.value = h.libraries || [];
        for (const k of e.value)
          r(k.id);
      } catch (h) {
        c.value = h instanceof Error ? h.message : "Failed to load libraries";
      } finally {
        i.value = !1;
      }
    }
    async function r(h) {
      try {
        const k = await X.get(`/api/v1/libraries/${h}/scan-status`);
        k.job && (s.value[h] = k.job);
      } catch {
      }
    }
    async function p(h) {
      try {
        await X.post(`/api/v1/libraries/${h}/scan`), await r(h);
      } catch (k) {
        c.value = k instanceof Error ? k.message : "Failed to trigger scan";
      }
    }
    async function _(h) {
      try {
        await X.post(`/api/v1/libraries/${h}/rescan`), await r(h);
      } catch (k) {
        c.value = k instanceof Error ? k.message : "Failed to trigger rescan";
      }
    }
    function d(h) {
      return h ? new Date(h).toLocaleString() : "Never";
    }
    function l(h) {
      if (!h) return "";
      switch (h.status) {
        case "queued":
          return "⏳ Queued";
        case "running":
          return "🔄 Running";
        case "completed":
          return "✅ Completed";
        case "failed":
          return `❌ Failed: ${h.error || "Unknown error"}`;
        default:
          return h.status;
      }
    }
    return Z(() => {
      m();
    }), (h, k) => (o(), a("div", Ji, [
      k[0] || (k[0] = t("div", { class: "scan-header" }, [
        t("h1", { class: "scan-title" }, "Library Scanner"),
        t("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      i.value ? (o(), a("div", Wi, "Loading libraries...")) : c.value ? (o(), a("div", Qi, b(c.value), 1)) : (o(), a("div", Zi, [
        (o(!0), a(F, null, D(e.value, (u) => {
          var f, v, S, I;
          return o(), a("div", {
            key: u.id,
            class: "library-card"
          }, [
            t("div", er, [
              t("h3", tr, b(u.name), 1),
              t("span", nr, b(u.type), 1),
              t("p", sr, b(u.paths.join(", ")), 1),
              t("div", or, [
                u.item_count !== void 0 ? (o(), a("span", ar, b(u.item_count) + " items", 1)) : x("", !0),
                t("span", null, "Last scan: " + b(d(u.last_scan_at)), 1)
              ]),
              s.value[u.id] ? (o(), a("div", lr, b(l(s.value[u.id])), 1)) : x("", !0)
            ]),
            t("div", ir, [
              t("button", {
                class: "btn btn-scan",
                onClick: (q) => p(u.id),
                disabled: ((f = s.value[u.id]) == null ? void 0 : f.status) === "running" || ((v = s.value[u.id]) == null ? void 0 : v.status) === "queued"
              }, " Scan ", 8, rr),
              t("button", {
                class: "btn btn-rescan",
                onClick: (q) => _(u.id),
                disabled: ((S = s.value[u.id]) == null ? void 0 : S.status) === "running" || ((I = s.value[u.id]) == null ? void 0 : I.status) === "queued"
              }, " Rescan ", 8, cr)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (o(), a("div", dr, " No libraries configured. Add a library to get started. ")) : x("", !0)
      ]))
    ]));
  }
}), zc = /* @__PURE__ */ T(ur, [["__scopeId", "data-v-62b3805e"]]), vr = { class: "my-servers-page" }, hr = {
  key: 0,
  class: "loading"
}, mr = {
  key: 1,
  class: "error"
}, pr = {
  key: 2,
  class: "servers-list"
}, fr = { class: "server-info" }, _r = { class: "server-name" }, gr = { class: "server-url" }, br = { class: "server-meta" }, kr = { key: 0 }, yr = {
  key: 0,
  class: "empty-state"
}, $r = /* @__PURE__ */ B({
  __name: "MyServersPage",
  setup(n) {
    const e = g([]), s = g(!0), i = g(null);
    async function c() {
      try {
        const p = await X.get("/api/v1/servers");
        e.value = p.servers || [];
      } catch (p) {
        i.value = p instanceof Error ? p.message : "Failed to load servers";
      } finally {
        s.value = !1;
      }
    }
    function m(p) {
      switch (p) {
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
    function r(p) {
      return p ? new Date(p).toLocaleString() : "Never";
    }
    return Z(() => {
      c();
    }), (p, _) => (o(), a("div", vr, [
      _[2] || (_[2] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "My Servers"),
        t("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      s.value ? (o(), a("div", hr, "Loading servers...")) : i.value ? (o(), a("div", mr, b(i.value), 1)) : (o(), a("div", pr, [
        (o(!0), a(F, null, D(e.value, (d) => (o(), a("div", {
          key: d.id,
          class: "server-card"
        }, [
          t("div", {
            class: "server-status",
            style: Q({ backgroundColor: m(d.status) })
          }, null, 4),
          t("div", fr, [
            t("h3", _r, b(d.name), 1),
            t("p", gr, b(d.url), 1),
            t("div", br, [
              t("span", null, b(d.owner), 1),
              d.library_count !== void 0 ? (o(), a("span", kr, b(d.library_count) + " libraries", 1)) : x("", !0),
              t("span", null, "Last seen: " + b(r(d.last_seen)), 1)
            ])
          ]),
          _[0] || (_[0] = t("div", { class: "server-actions" }, [
            t("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", yr, [..._[1] || (_[1] = [
          t("p", null, "No servers connected yet.", -1),
          t("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), Uc = /* @__PURE__ */ T($r, [["__scopeId", "data-v-b9237da4"]]), wr = { class: "federation-page" }, xr = {
  key: 0,
  class: "loading"
}, Cr = {
  key: 1,
  class: "error"
}, Ir = {
  key: 2,
  class: "federation-content"
}, Sr = { class: "peers-section" }, Mr = { class: "peers-list" }, Br = { class: "peer-info" }, Tr = { class: "peer-name" }, Er = { class: "peer-url" }, Vr = { class: "peer-meta" }, Pr = { key: 0 }, Lr = { class: "peer-actions" }, Ar = ["onClick"], jr = {
  key: 1,
  class: "status-badge"
}, Rr = {
  key: 0,
  class: "empty-state"
}, Fr = { class: "add-peer-section" }, Dr = /* @__PURE__ */ B({
  __name: "FederationPage",
  setup(n) {
    const e = g([]), s = g(!0), i = g(null);
    async function c() {
      try {
        const d = await X.get("/api/v1/federation/peers");
        e.value = d.peers || [];
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to load federation peers";
      } finally {
        s.value = !1;
      }
    }
    async function m(d) {
      try {
        await X.post("/api/v1/federation/connect", { url: d }), await c();
      } catch (l) {
        i.value = l instanceof Error ? l.message : "Failed to connect to peer";
      }
    }
    async function r(d) {
      try {
        await X.post(`/api/v1/federation/peers/${d}/disconnect`), await c();
      } catch (l) {
        i.value = l instanceof Error ? l.message : "Failed to disconnect peer";
      }
    }
    function p(d) {
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
    function _(d) {
      return d ? new Date(d).toLocaleString() : "Never";
    }
    return Z(() => {
      c();
    }), (d, l) => (o(), a("div", wr, [
      l[5] || (l[5] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Federation"),
        t("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      s.value ? (o(), a("div", xr, "Loading federation peers...")) : i.value ? (o(), a("div", Cr, b(i.value), 1)) : (o(), a("div", Ir, [
        t("div", Sr, [
          l[2] || (l[2] = t("h2", { class: "section-title" }, "Connected Peers", -1)),
          t("div", Mr, [
            (o(!0), a(F, null, D(e.value, (h) => (o(), a("div", {
              key: h.id,
              class: "peer-card"
            }, [
              t("div", {
                class: "peer-status",
                style: Q({ backgroundColor: p(h.status) })
              }, null, 4),
              t("div", Br, [
                t("h3", Tr, b(h.name), 1),
                t("p", Er, b(h.url), 1),
                t("div", Vr, [
                  h.shared_libraries_count !== void 0 ? (o(), a("span", Pr, b(h.shared_libraries_count) + " shared libraries", 1)) : x("", !0),
                  t("span", null, "Last sync: " + b(_(h.last_sync)), 1)
                ])
              ]),
              t("div", Lr, [
                h.status === "connected" ? (o(), a("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (k) => r(h.id)
                }, " Disconnect ", 8, Ar)) : h.status === "pending" ? (o(), a("span", jr, "Pending")) : x("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (o(), a("div", Rr, [...l[1] || (l[1] = [
              t("p", null, "No federation peers connected.", -1)
            ])])) : x("", !0)
          ])
        ]),
        t("div", Fr, [
          l[4] || (l[4] = t("h2", { class: "section-title" }, "Add Peer", -1)),
          t("form", {
            class: "add-peer-form",
            onSubmit: l[0] || (l[0] = ae((h) => m(""), ["prevent"]))
          }, [...l[3] || (l[3] = [
            t("input", {
              type: "url",
              placeholder: "https://other-server.example.com",
              class: "peer-input"
            }, null, -1),
            t("button", {
              type: "submit",
              class: "btn btn-primary"
            }, "Connect", -1)
          ])], 32)
        ])
      ]))
    ]));
  }
}), Nc = /* @__PURE__ */ T(Dr, [["__scopeId", "data-v-91ba2781"]]), zr = { class: "manage-shares-page" }, Ur = {
  key: 0,
  class: "loading"
}, Nr = {
  key: 1,
  class: "error"
}, qr = {
  key: 2,
  class: "shares-list"
}, Hr = { class: "share-info" }, Gr = { class: "share-library" }, Kr = { class: "share-meta" }, Or = {
  key: 0,
  class: "expired-badge"
}, Yr = { class: "share-dates" }, Xr = { key: 0 }, Jr = { class: "share-actions" }, Wr = ["onClick"], Qr = {
  key: 0,
  class: "empty-state"
}, Zr = /* @__PURE__ */ B({
  __name: "ManageSharesPage",
  setup(n) {
    const e = g([]), s = g(!0), i = g(null);
    async function c() {
      try {
        const _ = await X.get("/api/v1/shares");
        e.value = _.shares || [];
      } catch (_) {
        i.value = _ instanceof Error ? _.message : "Failed to load shares";
      } finally {
        s.value = !1;
      }
    }
    async function m(_) {
      try {
        await X.delete(`/api/v1/shares/${_}`), await c();
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to revoke share";
      }
    }
    function r(_) {
      return new Date(_).toLocaleString();
    }
    function p(_) {
      return _ ? new Date(_) < /* @__PURE__ */ new Date() : !1;
    }
    return Z(() => {
      c();
    }), (_, d) => (o(), a("div", zr, [
      d[1] || (d[1] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Manage Shares"),
        t("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      s.value ? (o(), a("div", Ur, "Loading shares...")) : i.value ? (o(), a("div", Nr, b(i.value), 1)) : (o(), a("div", qr, [
        (o(!0), a(F, null, D(e.value, (l) => (o(), a("div", {
          key: l.id,
          class: "share-card"
        }, [
          t("div", Hr, [
            t("h3", Gr, b(l.library_name), 1),
            t("div", Kr, [
              t("span", null, "Shared with: " + b(l.shared_with), 1),
              t("span", {
                class: L(["permission-badge", l.permissions])
              }, b(l.permissions), 3),
              l.expires_at && p(l.expires_at) ? (o(), a("span", Or, "Expired")) : x("", !0)
            ]),
            t("p", Yr, [
              Y(" Created: " + b(r(l.created_at)) + " ", 1),
              l.expires_at ? (o(), a("span", Xr, " | Expires: " + b(r(l.expires_at)), 1)) : x("", !0)
            ])
          ]),
          t("div", Jr, [
            t("button", {
              class: "btn btn-danger",
              onClick: (h) => m(l.id)
            }, "Revoke", 8, Wr)
          ])
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", Qr, [...d[0] || (d[0] = [
          t("p", null, "No library shares found.", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), qc = /* @__PURE__ */ T(Zr, [["__scopeId", "data-v-bd8771ac"]]), ec = { class: "audit-logs-page" }, tc = {
  key: 0,
  class: "loading"
}, nc = {
  key: 1,
  class: "error"
}, sc = {
  key: 2,
  class: "logs-container"
}, oc = { class: "logs-list" }, ac = { class: "log-content" }, lc = { class: "log-header" }, ic = { class: "log-action" }, rc = { class: "log-actor" }, cc = { class: "log-time" }, dc = {
  key: 0,
  class: "log-target"
}, uc = {
  key: 1,
  class: "log-details"
}, vc = {
  key: 2,
  class: "log-ip"
}, hc = {
  key: 0,
  class: "empty-state"
}, mc = {
  key: 0,
  class: "pagination"
}, pc = ["disabled"], fc = { class: "page-info" }, _c = ["disabled"], gc = /* @__PURE__ */ B({
  __name: "AuditLogsPage",
  setup(n) {
    const e = g([]), s = g(!0), i = g(null), c = g(1), m = g(1);
    async function r(l = 1) {
      try {
        s.value = !0;
        const h = await X.get(
          "/api/v1/audit-logs",
          { page: String(l) }
        );
        e.value = h.logs || [], c.value = h.page || 1, m.value = h.total_pages || 1;
      } catch (h) {
        i.value = h instanceof Error ? h.message : "Failed to load audit logs";
      } finally {
        s.value = !1;
      }
    }
    function p(l) {
      return new Date(l).toLocaleString();
    }
    function _(l) {
      return l.includes("create") || l.includes("add") ? "#22c55e" : l.includes("delete") || l.includes("remove") ? "#ef4444" : l.includes("update") || l.includes("edit") ? "#3b82f6" : l.includes("login") || l.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function d(l) {
      return l.includes("create") || l.includes("add") ? "+" : l.includes("delete") || l.includes("remove") ? "-" : l.includes("update") || l.includes("edit") ? "~" : l.includes("login") || l.includes("auth") ? "@" : "#";
    }
    return Z(() => {
      r();
    }), (l, h) => (o(), a("div", ec, [
      h[3] || (h[3] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Audit Logs"),
        t("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      s.value ? (o(), a("div", tc, "Loading audit logs...")) : i.value ? (o(), a("div", nc, b(i.value), 1)) : (o(), a("div", sc, [
        t("div", oc, [
          (o(!0), a(F, null, D(e.value, (k) => (o(), a("div", {
            key: k.id,
            class: "log-entry"
          }, [
            t("div", {
              class: "log-icon",
              style: Q({ backgroundColor: _(k.action) })
            }, b(d(k.action)), 5),
            t("div", ac, [
              t("div", lc, [
                t("span", ic, b(k.action), 1),
                t("span", rc, b(k.actor), 1),
                t("span", cc, b(p(k.created_at)), 1)
              ]),
              k.target ? (o(), a("p", dc, "Target: " + b(k.target), 1)) : x("", !0),
              k.details ? (o(), a("p", uc, b(k.details), 1)) : x("", !0),
              k.ip_address ? (o(), a("span", vc, "IP: " + b(k.ip_address), 1)) : x("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (o(), a("div", hc, [...h[2] || (h[2] = [
            t("p", null, "No audit logs found.", -1)
          ])])) : x("", !0)
        ]),
        m.value > 1 ? (o(), a("div", mc, [
          t("button", {
            class: "btn btn-secondary",
            disabled: c.value <= 1,
            onClick: h[0] || (h[0] = (k) => r(c.value - 1))
          }, " Previous ", 8, pc),
          t("span", fc, "Page " + b(c.value) + " of " + b(m.value), 1),
          t("button", {
            class: "btn btn-secondary",
            disabled: c.value >= m.value,
            onClick: h[1] || (h[1] = (k) => r(c.value + 1))
          }, " Next ", 8, _c)
        ])) : x("", !0)
      ]))
    ]));
  }
}), Hc = /* @__PURE__ */ T(gc, [["__scopeId", "data-v-05910fd9"]]);
export {
  me as ApiClient,
  vt as ApiError,
  ot as AppLayout,
  Hc as AuditLogsPage,
  Cc as Badge,
  hn as BrowsePage,
  xc as Button,
  Mc as Chip,
  Tc as Combobox,
  Rc as EmptyState,
  Nc as FederationPage,
  on as FilterBar,
  G as Icon,
  Ie as IconButton,
  Dc as Kbd,
  zc as LibraryScanPage,
  An as LocalStorageTokenStore,
  Hn as LoginForm,
  Yn as LoginPage,
  qc as ManageSharesPage,
  St as MediaCard,
  Pt as MediaGrid,
  Ec as Modal,
  Uc as MyServersPage,
  it as PhlixApp,
  Bn as Player,
  Ln as PlayerPage,
  Bc as Select,
  xs as SettingsForm,
  Ss as SettingsPage,
  Vc as Sheet,
  ls as SignupForm,
  ds as SignupPage,
  Ac as Skeleton,
  Ic as Slider,
  jc as Spinner,
  Sc as Switch,
  Fc as Tabs,
  Lc as ToastHost,
  Pc as Tooltip,
  wc as createPhlixApp,
  Ce as useAuthStore,
  Ae as useFocusTrap,
  Ve as useMediaStore,
  Ci as useToastStore
};
//# sourceMappingURL=phlix-ui.js.map
