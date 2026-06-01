var he = Object.defineProperty;
var ye = (n, e, s) => e in n ? he(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var J = (n, e, s) => ye(n, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as l, createElementBlock as r, createElementVNode as t, renderSlot as z, defineComponent as E, createBlock as le, withCtx as O, createVNode as M, unref as b, createTextVNode as Y, toDisplayString as g, ref as d, computed as N, createCommentVNode as F, Fragment as U, renderList as L, withDirectives as D, vModelText as W, normalizeClass as X, inject as ue, onMounted as Z, watch as be, onUnmounted as ke, withModifiers as Q, normalizeStyle as $e, createStaticVNode as we, resolveComponent as de, vModelDynamic as oe, vShow as Se, createApp as Te } from "vue";
import { defineStore as ve, createPinia as Ce } from "pinia";
import { RouterView as Re, RouterLink as ce, useRoute as Pe, useRouter as pe, createRouter as xe, createWebHistory as Ee } from "vue-router";
const x = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [o, v] of e)
    s[o] = v;
  return s;
}, Fe = {}, Ue = { class: "app-layout" }, Ie = { class: "app-header" }, Ae = { class: "header-inner" }, Le = { class: "logo" }, Me = { class: "nav" }, Ne = { class: "app-main" }, Be = { class: "app-footer" };
function qe(n, e) {
  return l(), r("div", Ue, [
    t("header", Ie, [
      t("div", Ae, [
        t("div", Le, [
          z(n.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", Me, [
          z(n.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", Ne, [
      z(n.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", Be, [
      z(n.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Ge = /* @__PURE__ */ x(Fe, [["render", qe], ["__scopeId", "data-v-9f6c6d16"]]), De = { class: "main-nav" }, Ve = /* @__PURE__ */ E({
  __name: "PhlixApp",
  setup(n) {
    return (e, s) => (l(), le(Ge, null, {
      nav: O(() => [
        t("nav", De, [
          M(b(ce), {
            to: "/app",
            class: "nav-link"
          }, {
            default: O(() => [...s[0] || (s[0] = [
              Y("Browse", -1)
            ])]),
            _: 1
          }),
          M(b(ce), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: O(() => [...s[1] || (s[1] = [
              Y("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: O(() => [
        M(b(Re))
      ]),
      _: 1
    }));
  }
}), je = /* @__PURE__ */ x(Ve, [["__scopeId", "data-v-35b5e7c6"]]), Oe = { class: "phlix-placeholder" }, Ye = { class: "placeholder-content" }, He = /* @__PURE__ */ E({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(n) {
    return (e, s) => (l(), r("div", Oe, [
      t("div", Ye, [
        s[0] || (s[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + g(n.appName) + " is initializing", 1)
      ])
    ]));
  }
}), ze = /* @__PURE__ */ x(He, [["__scopeId", "data-v-bf79ac4c"]]);
class Je extends Error {
  constructor(e, s, o = null) {
    super(e), this.status = s, this.body = o, this.name = "ApiError";
  }
}
function Ke(n) {
  return n === !0 || n === 1 || n === "1" || n === "true";
}
class ee {
  constructor(e = {}) {
    J(this, "baseUrl");
    J(this, "tokens");
    J(this, "doFetch");
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
  async request(e, s, o = null) {
    const v = () => {
      const h = {
        "Content-Type": "application/json"
      }, y = this.tokens.getAccessToken();
      y && (h.Authorization = `Bearer ${y}`);
      const _ = { method: e, headers: h, credentials: "same-origin" };
      return o !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (_.body = JSON.stringify(o)), _;
    }, p = `${this.baseUrl}${s}`;
    let m = await this.doFetch(p, v());
    return m.status === 401 && await this.refreshToken() && (m = await this.doFetch(p, v())), this.handleResponse(m);
  }
  async handleResponse(e) {
    const v = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const p = this.extractError(v);
      throw new Je(p, e.status, v);
    }
    return v;
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
      const o = await s.json();
      return typeof o.access_token != "string" ? !1 : (this.tokens.setAccessToken(o.access_token), typeof o.refresh_token == "string" && this.tokens.setRefreshToken(o.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, s) {
    const o = s ? "?" + new URLSearchParams(s).toString() : "";
    return this.request("GET", e + o);
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
    return { ...e, is_admin: Ke(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const K = new ee(), fe = ve("media", () => {
  const n = d([]), e = d(0), s = d(!1), o = d(null), v = d(""), p = d([]), m = d(void 0), h = d(void 0), y = d([]), _ = d([]), f = d("name"), u = d("asc"), k = d(24), a = d(0), i = N(() => a.value + n.value.length < e.value), c = N(() => {
    const $ = {};
    return v.value && ($.search = v.value), p.value.length && ($.genres = p.value), m.value !== void 0 && ($.yearFrom = m.value), h.value !== void 0 && ($.yearTo = h.value), y.value.length && ($.ratings = y.value), _.value.length && ($.types = _.value), $.sort = f.value, $.order = u.value, $.limit = k.value, $.offset = a.value, $;
  }), I = N(() => {
    const $ = /* @__PURE__ */ new Set();
    return n.value.forEach((C) => {
      var T;
      return (T = C.genres) == null ? void 0 : T.forEach((j) => $.add(j));
    }), Array.from($).sort();
  }), R = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], B = ["movie", "series", "episode", "audio", "image"];
  function V($) {
    var j, G, ie;
    const C = new URLSearchParams(), T = c.value;
    return T.search && C.set("search", T.search), (j = T.genres) == null || j.forEach((H) => C.append("genres", H)), T.yearFrom !== void 0 && C.set("yearFrom", String(T.yearFrom)), T.yearTo !== void 0 && C.set("yearTo", String(T.yearTo)), (G = T.ratings) == null || G.forEach((H) => C.append("ratings", H)), (ie = T.types) == null || ie.forEach((H) => C.append("types", H)), T.sort && C.set("sort", T.sort), T.order && C.set("order", T.order), C.set("limit", String(T.limit)), C.set("offset", String(T.offset)), `${$}/api/v1/media?${C.toString()}`;
  }
  async function q($, C = !1) {
    s.value = !0, o.value = null;
    try {
      const T = new ee({ baseUrl: $ }), j = V($), G = await T.get(j);
      C ? n.value = [...n.value, ...G.items] : n.value = G.items, e.value = G.total, a.value = (G.offset ?? 0) + G.items.length;
    } catch (T) {
      o.value = T instanceof Error ? T.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function P($) {
    await q($, !0);
  }
  function S() {
    n.value = [], e.value = 0, a.value = 0, o.value = null;
  }
  function w($) {
    v.value = $, a.value = 0;
  }
  function A($) {
    p.value = $, a.value = 0;
  }
  function te($, C) {
    m.value = $, h.value = C, a.value = 0;
  }
  function me($) {
    y.value = $, a.value = 0;
  }
  function ge($) {
    _.value = $, a.value = 0;
  }
  function _e($, C) {
    f.value = $, C && (u.value = C), a.value = 0;
  }
  return {
    items: n,
    total: e,
    loading: s,
    error: o,
    search: v,
    selectedGenres: p,
    yearFrom: m,
    yearTo: h,
    selectedRatings: y,
    selectedTypes: _,
    sort: f,
    order: u,
    limit: k,
    offset: a,
    hasMore: i,
    queryParams: c,
    availableGenres: I,
    availableRatings: R,
    availableTypes: B,
    fetchMedia: q,
    loadMore: P,
    reset: S,
    setSearch: w,
    setGenres: A,
    setYearRange: te,
    setRatings: me,
    setTypes: ge,
    setSort: _e
  };
}), Xe = { class: "media-card" }, We = ["href"], Qe = { class: "card-poster" }, Ze = ["src", "alt"], et = {
  key: 1,
  class: "poster-placeholder"
}, tt = { class: "placeholder-type" }, st = { class: "card-overlay" }, at = {
  key: 0,
  class: "card-year"
}, nt = {
  key: 1,
  class: "card-rating"
}, ot = { class: "card-info" }, lt = ["title"], rt = {
  key: 0,
  class: "card-genres"
}, it = /* @__PURE__ */ E({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(n) {
    return (e, s) => {
      var o;
      return l(), r("article", Xe, [
        t("a", {
          href: n.to ?? `/app/player/${n.item.id}`,
          class: "card-link"
        }, [
          t("div", Qe, [
            n.item.poster_url ? (l(), r("img", {
              key: 0,
              src: n.item.poster_url,
              alt: n.item.name,
              loading: "lazy"
            }, null, 8, Ze)) : (l(), r("div", et, [
              s[0] || (s[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", tt, g(n.item.type), 1)
            ]))
          ]),
          t("div", st, [
            n.item.year ? (l(), r("span", at, g(n.item.year), 1)) : F("", !0),
            n.item.rating ? (l(), r("span", nt, g(n.item.rating), 1)) : F("", !0)
          ]),
          t("div", ot, [
            t("h3", {
              class: "card-title",
              title: n.item.name
            }, g(n.item.name), 9, lt),
            (o = n.item.genres) != null && o.length ? (l(), r("p", rt, g(n.item.genres.slice(0, 2).join(", ")), 1)) : F("", !0)
          ])
        ], 8, We)
      ]);
    };
  }
}), ct = /* @__PURE__ */ x(it, [["__scopeId", "data-v-e60c8481"]]), ut = { class: "media-grid-container" }, dt = {
  key: 0,
  class: "media-grid-skeleton"
}, vt = {
  key: 1,
  class: "media-grid-empty"
}, pt = {
  key: 2,
  class: "media-grid"
}, ft = /* @__PURE__ */ E({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(n) {
    return (e, s) => (l(), r("div", ut, [
      n.loading ? (l(), r("div", dt, [
        (l(), r(U, null, L(12, (o) => t("div", {
          key: o,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : n.items.length === 0 ? (l(), r("div", vt, [...s[1] || (s[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (l(), r("div", pt, [
        (l(!0), r(U, null, L(n.items, (o) => (l(), le(ct, {
          key: o.id,
          item: o
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), mt = /* @__PURE__ */ x(ft, [["__scopeId", "data-v-b7e87216"]]), gt = { class: "filter-bar" }, _t = { class: "filter-search" }, ht = { class: "filter-row" }, yt = { class: "filter-group" }, bt = ["value"], kt = ["value"], $t = ["value"], wt = { class: "filter-group" }, St = ["value"], Tt = ["value"], Ct = ["value"], Rt = ["value"], Pt = { class: "filter-section" }, xt = { class: "filter-chips" }, Et = ["onClick"], Ft = { class: "filter-section" }, Ut = { class: "filter-chips" }, It = ["onClick"], At = { class: "filter-section" }, Lt = { class: "filter-chips" }, Mt = ["onClick"], Nt = { class: "filter-actions" }, Bt = { class: "result-count" }, qt = /* @__PURE__ */ E({
  __name: "FilterBar",
  setup(n) {
    const e = fe(), s = d(e.search), o = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function v() {
      e.setSearch(s.value);
    }
    function p(a) {
      const i = e.selectedGenres;
      i.includes(a) ? e.setGenres(i.filter((c) => c !== a)) : e.setGenres([...i, a]);
    }
    function m(a) {
      const i = e.selectedRatings;
      i.includes(a) ? e.setRatings(i.filter((c) => c !== a)) : e.setRatings([...i, a]);
    }
    function h(a) {
      const i = e.selectedTypes;
      i.includes(a) ? e.setTypes(i.filter((c) => c !== a)) : e.setTypes([...i, a]);
    }
    function y(a) {
      const i = a.target;
      e.setSort(i.value);
    }
    function _(a) {
      const i = a.target;
      e.order = i.value;
    }
    const f = (/* @__PURE__ */ new Date()).getFullYear(), u = N(() => {
      const a = [];
      for (let i = f; i >= 1900; i--)
        a.push(i);
      return a;
    });
    function k() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (a, i) => (l(), r("div", gt, [
      t("div", _t, [
        D(t("input", {
          "onUpdate:modelValue": i[0] || (i[0] = (c) => s.value = c),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: v
        }, null, 544), [
          [W, s.value]
        ])
      ]),
      t("div", ht, [
        t("div", yt, [
          i[4] || (i[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: b(e).sort,
            onChange: y
          }, [
            (l(), r(U, null, L(o, (c) => t("option", {
              key: c.value,
              value: c.value
            }, g(c.label), 9, kt)), 64))
          ], 40, bt),
          t("select", {
            class: "filter-select order-select",
            value: b(e).order,
            onChange: _
          }, [...i[3] || (i[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, $t)
        ]),
        t("div", wt, [
          i[7] || (i[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: b(e).yearFrom ?? "",
            onChange: i[1] || (i[1] = (c) => b(e).setYearRange(
              c.target.value ? Number(c.target.value) : void 0,
              b(e).yearTo
            ))
          }, [
            i[5] || (i[5] = t("option", { value: "" }, "From", -1)),
            (l(!0), r(U, null, L(u.value.slice(0, 50), (c) => (l(), r("option", {
              key: c,
              value: c
            }, g(c), 9, Tt))), 128))
          ], 40, St),
          t("select", {
            class: "filter-select",
            value: b(e).yearTo ?? "",
            onChange: i[2] || (i[2] = (c) => b(e).setYearRange(
              b(e).yearFrom,
              c.target.value ? Number(c.target.value) : void 0
            ))
          }, [
            i[6] || (i[6] = t("option", { value: "" }, "To", -1)),
            (l(!0), r(U, null, L(u.value.slice(0, 50), (c) => (l(), r("option", {
              key: c,
              value: c
            }, g(c), 9, Rt))), 128))
          ], 40, Ct)
        ])
      ]),
      t("div", Pt, [
        i[8] || (i[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", xt, [
          (l(!0), r(U, null, L(b(e).availableGenres, (c) => (l(), r("button", {
            key: c,
            class: X(["chip", { active: b(e).selectedGenres.includes(c) }]),
            onClick: (I) => p(c)
          }, g(c), 11, Et))), 128))
        ])
      ]),
      t("div", Ft, [
        i[9] || (i[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", Ut, [
          (l(!0), r(U, null, L(b(e).availableRatings, (c) => (l(), r("button", {
            key: c,
            class: X(["chip", { active: b(e).selectedRatings.includes(c) }]),
            onClick: (I) => m(c)
          }, g(c), 11, It))), 128))
        ])
      ]),
      t("div", At, [
        i[10] || (i[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Lt, [
          (l(!0), r(U, null, L(b(e).availableTypes, (c) => (l(), r("button", {
            key: c,
            class: X(["chip", { active: b(e).selectedTypes.includes(c) }]),
            onClick: (I) => h(c)
          }, g(c), 11, Mt))), 128))
        ])
      ]),
      t("div", Nt, [
        t("button", {
          class: "clear-btn",
          onClick: k
        }, "Clear filters"),
        t("span", Bt, g(b(e).total) + " result" + g(b(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Gt = /* @__PURE__ */ x(qt, [["__scopeId", "data-v-7089ec0b"]]), Dt = { class: "browse-page" }, Vt = { class: "browse-header" }, jt = { class: "browse-toolbar-extra" }, Ot = {
  key: 0,
  class: "browse-error"
}, Yt = {
  key: 1,
  class: "load-more"
}, Ht = {
  key: 2,
  class: "loading-more"
}, zt = /* @__PURE__ */ E({
  __name: "BrowsePage",
  setup(n) {
    const e = ue("apiBase") ?? N(() => ""), s = fe();
    function o() {
      s.reset(), s.fetchMedia(e.value);
    }
    Z(o), be(e, o);
    function v() {
      s.reset(), s.fetchMedia(e.value);
    }
    function p() {
      s.loadMore(e.value);
    }
    return (m, h) => (l(), r("div", Dt, [
      t("div", Vt, [
        h[0] || (h[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", jt, [
          z(m.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      M(Gt, { onChange: v }),
      b(s).error ? (l(), r("div", Ot, [
        t("p", null, g(b(s).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: o
        }, "Retry")
      ])) : F("", !0),
      M(mt, {
        items: b(s).items,
        loading: b(s).loading && b(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      b(s).hasMore && !b(s).loading ? (l(), r("div", Yt, [
        t("button", {
          class: "load-more-btn",
          onClick: p
        }, "Load more")
      ])) : F("", !0),
      b(s).loading && b(s).items.length > 0 ? (l(), r("div", Ht, " Loading... ")) : F("", !0)
    ]));
  }
}), Jt = /* @__PURE__ */ x(zt, [["__scopeId", "data-v-c192afa6"]]), Kt = ["src", "poster"], Xt = { class: "controls-top" }, Wt = { class: "media-title" }, Qt = {
  key: 0,
  class: "media-year"
}, Zt = { class: "controls-center" }, es = { class: "controls-bottom" }, ts = { class: "progress-track" }, ss = { class: "controls-row" }, as = { class: "time-display" }, ns = { class: "volume-control" }, os = ["value"], ls = { class: "speed-control" }, rs = ["value"], is = { class: "time-display" }, cs = /* @__PURE__ */ E({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(n) {
    const e = d(null), s = d(!1), o = d(0), v = d(0), p = d(1), m = d(!1), h = d(1), y = d(!1), _ = d(!0);
    let f = null;
    const u = N(
      () => v.value > 0 ? o.value / v.value * 100 : 0
    );
    function k(S) {
      if (!isFinite(S) || isNaN(S)) return "0:00";
      const w = Math.floor(S / 60), A = Math.floor(S % 60);
      return `${w}:${A.toString().padStart(2, "0")}`;
    }
    function a() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function i() {
      e.value && (o.value = e.value.currentTime);
    }
    function c() {
      e.value && (v.value = e.value.duration);
    }
    function I(S) {
      const A = S.currentTarget.getBoundingClientRect(), te = (S.clientX - A.left) / A.width;
      e.value && (e.value.currentTime = te * v.value);
    }
    function R(S) {
      const w = parseFloat(S.target.value);
      p.value = w, e.value && (e.value.volume = w), m.value = w === 0;
    }
    function B() {
      m.value = !m.value, e.value && (e.value.muted = m.value);
    }
    function V(S) {
      h.value = S, e.value && (e.value.playbackRate = S);
    }
    function q() {
      var w;
      const S = (w = e.value) == null ? void 0 : w.closest(".player-container");
      S && (document.fullscreenElement ? (document.exitFullscreen(), y.value = !1) : (S.requestFullscreen(), y.value = !0));
    }
    function P() {
      _.value = !0, f && clearTimeout(f), f = setTimeout(() => {
        s.value && (_.value = !1);
      }, 3e3);
    }
    return ke(() => {
      f && clearTimeout(f);
    }), (S, w) => (l(), r("div", {
      class: X(["player-container", { "controls-hidden": !_.value && s.value }]),
      onMousemove: P,
      onClick: a
    }, [
      w[6] || (w[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: n.streamUrl,
        poster: n.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: w[0] || (w[0] = (A) => s.value = !0),
        onPause: w[1] || (w[1] = (A) => s.value = !1),
        onTimeupdate: i,
        onLoadedmetadata: c,
        onClick: Q(a, ["stop"])
      }, null, 40, Kt),
      t("div", {
        class: "player-controls",
        onClick: w[4] || (w[4] = Q(() => {
        }, ["stop"]))
      }, [
        t("div", Xt, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: w[2] || (w[2] = (A) => S.$router.back())
          }, " ← Back "),
          t("span", Wt, g(n.media.name), 1),
          n.media.year ? (l(), r("span", Qt, g(n.media.year), 1)) : F("", !0)
        ]),
        t("div", Zt, [
          t("button", {
            class: "play-btn",
            onClick: a
          }, g(s.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", es, [
          t("div", {
            class: "progress-bar",
            onClick: I
          }, [
            t("div", ts, [
              t("div", {
                class: "progress-fill",
                style: $e({ width: u.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", ss, [
            t("span", as, g(k(o.value)), 1),
            t("div", ns, [
              t("button", {
                class: "ctrl-btn",
                onClick: B
              }, g(m.value || p.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: m.value ? 0 : p.value,
                class: "volume-slider",
                onInput: R
              }, null, 40, os)
            ]),
            t("div", ls, [
              t("select", {
                class: "speed-select",
                value: h.value,
                onChange: w[3] || (w[3] = (A) => V(Number(A.target.value)))
              }, [...w[5] || (w[5] = [
                we('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, rs)
            ]),
            t("span", is, g(k(v.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: q
            }, g(y.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), us = /* @__PURE__ */ x(cs, [["__scopeId", "data-v-7a51063f"]]), ds = { class: "player-page" }, vs = {
  key: 0,
  class: "player-loading"
}, ps = {
  key: 1,
  class: "player-error"
}, fs = /* @__PURE__ */ E({
  __name: "PlayerPage",
  setup(n) {
    const e = ue("apiBase", N(() => "")), s = Pe(), o = d(null), v = d(""), p = d(!0), m = d(null);
    async function h() {
      const y = s.params.id;
      if (!y) {
        m.value = "No media ID provided", p.value = !1;
        return;
      }
      try {
        const _ = new ee({ baseUrl: e.value }), [f, u] = await Promise.all([
          _.get(`/api/v1/media/${y}`),
          _.get(`/api/v1/media/${y}/playback-info`).catch(() => null)
        ]);
        o.value = f, u != null && u.url ? v.value = u.url : v.value = `${e.value}/media/${y}/stream`;
      } catch (_) {
        m.value = _ instanceof Error ? _.message : "Failed to load media";
      } finally {
        p.value = !1;
      }
    }
    return Z(h), (y, _) => (l(), r("div", ds, [
      p.value ? (l(), r("div", vs, "Loading...")) : m.value ? (l(), r("div", ps, [
        t("p", null, g(m.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: h
        }, "Retry")
      ])) : o.value ? (l(), le(us, {
        key: 2,
        media: o.value,
        "stream-url": v.value
      }, null, 8, ["media", "stream-url"])) : F("", !0)
    ]));
  }
}), ms = /* @__PURE__ */ x(fs, [["__scopeId", "data-v-d9061b47"]]), se = "access_token", ae = "refresh_token", ne = "user";
class gs {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(se);
  }
  setAccessToken(e) {
    this.storage.setItem(se, e);
  }
  getRefreshToken() {
    return this.storage.getItem(ae);
  }
  setRefreshToken(e) {
    this.storage.setItem(ae, e);
  }
  getUser() {
    const e = this.storage.getItem(ne);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(ne, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(se), this.storage.removeItem(ae), this.storage.removeItem(ne);
  }
}
const re = ve("auth", () => {
  const n = new gs(), e = new ee({ tokenStore: n }), s = d(null), o = d(!1), v = d(null), p = N(() => n.getAccessToken() !== null), m = N(() => {
    var u;
    return ((u = s.value) == null ? void 0 : u.is_admin) === !0;
  });
  async function h(u, k) {
    o.value = !0, v.value = null;
    try {
      const a = await e.post("/api/v1/auth/login", { email: u, password: k });
      return n.setAccessToken(a.access_token), n.setRefreshToken(a.refresh_token), await _(), !0;
    } catch (a) {
      return v.value = a instanceof Error ? a.message : "Login failed", !1;
    } finally {
      o.value = !1;
    }
  }
  async function y(u, k, a) {
    o.value = !0, v.value = null;
    try {
      const i = await e.post("/api/v1/auth/register", { email: u, username: k, password: a });
      return n.setAccessToken(i.access_token), n.setRefreshToken(i.refresh_token), await _(), !0;
    } catch (i) {
      return v.value = i instanceof Error ? i.message : "Registration failed", !1;
    } finally {
      o.value = !1;
    }
  }
  async function _() {
    if (p.value)
      try {
        s.value = await e.getCurrentUser();
      } catch {
        s.value = null, n.clear();
      }
  }
  function f() {
    n.clear(), s.value = null;
  }
  return {
    user: s,
    loading: o,
    error: v,
    isLoggedIn: p,
    isAdmin: m,
    client: e,
    login: h,
    signup: y,
    fetchUser: _,
    logout: f
  };
}), _s = {
  key: 0,
  class: "form-error"
}, hs = { class: "field" }, ys = { class: "field" }, bs = { class: "password-wrapper" }, ks = ["type"], $s = ["disabled"], ws = { class: "form-footer" }, Ss = /* @__PURE__ */ E({
  __name: "LoginForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, o = re(), v = pe(), p = d(""), m = d(""), h = d(!1);
    async function y() {
      await o.login(p.value, m.value) && (s("success"), v.push("/app"));
    }
    return (_, f) => {
      const u = de("router-link");
      return l(), r("form", {
        class: "login-form",
        onSubmit: Q(y, ["prevent"])
      }, [
        f[7] || (f[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        b(o).error ? (l(), r("div", _s, g(b(o).error), 1)) : F("", !0),
        t("div", hs, [
          f[3] || (f[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          D(t("input", {
            id: "email",
            "onUpdate:modelValue": f[0] || (f[0] = (k) => p.value = k),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [W, p.value]
          ])
        ]),
        t("div", ys, [
          f[4] || (f[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", bs, [
            D(t("input", {
              id: "password",
              "onUpdate:modelValue": f[1] || (f[1] = (k) => m.value = k),
              type: h.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, ks), [
              [oe, m.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: f[2] || (f[2] = (k) => h.value = !h.value)
            }, g(h.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: b(o).loading
        }, g(b(o).loading ? "Signing in..." : "Sign in"), 9, $s),
        t("p", ws, [
          f[6] || (f[6] = Y(" Don't have an account? ", -1)),
          M(u, {
            to: "/app/signup",
            class: "link"
          }, {
            default: O(() => [...f[5] || (f[5] = [
              Y("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Ts = /* @__PURE__ */ x(Ss, [["__scopeId", "data-v-22bc5576"]]), Cs = { class: "auth-page" }, Rs = { class: "auth-card" }, Ps = /* @__PURE__ */ E({
  __name: "LoginPage",
  setup(n) {
    return (e, s) => (l(), r("div", Cs, [
      t("div", Rs, [
        M(Ts, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), xs = /* @__PURE__ */ x(Ps, [["__scopeId", "data-v-9c53ce6a"]]), Es = {
  key: 0,
  class: "form-error"
}, Fs = { class: "field" }, Us = { class: "field" }, Is = { class: "field" }, As = { class: "password-wrapper" }, Ls = ["type"], Ms = { class: "field" }, Ns = ["type"], Bs = ["disabled"], qs = { class: "form-footer" }, Gs = /* @__PURE__ */ E({
  __name: "SignupForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, o = re(), v = pe(), p = d(""), m = d(""), h = d(""), y = d(""), _ = d(!1), f = d(null);
    async function u() {
      if (f.value = null, h.value.length < 8) {
        f.value = "Password must be at least 8 characters.";
        return;
      }
      if (h.value !== y.value) {
        f.value = "Passwords do not match.";
        return;
      }
      await o.signup(p.value, m.value, h.value) && (s("success"), v.push("/app"));
    }
    return (k, a) => {
      const i = de("router-link");
      return l(), r("form", {
        class: "signup-form",
        onSubmit: Q(u, ["prevent"])
      }, [
        a[11] || (a[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        b(o).error || f.value ? (l(), r("div", Es, g(b(o).error || f.value), 1)) : F("", !0),
        t("div", Fs, [
          a[5] || (a[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          D(t("input", {
            id: "email",
            "onUpdate:modelValue": a[0] || (a[0] = (c) => p.value = c),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [W, p.value]
          ])
        ]),
        t("div", Us, [
          a[6] || (a[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          D(t("input", {
            id: "username",
            "onUpdate:modelValue": a[1] || (a[1] = (c) => m.value = c),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [W, m.value]
          ])
        ]),
        t("div", Is, [
          a[7] || (a[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", As, [
            D(t("input", {
              id: "password",
              "onUpdate:modelValue": a[2] || (a[2] = (c) => h.value = c),
              type: _.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, Ls), [
              [oe, h.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: a[3] || (a[3] = (c) => _.value = !_.value)
            }, g(_.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", Ms, [
          a[8] || (a[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          D(t("input", {
            id: "confirm",
            "onUpdate:modelValue": a[4] || (a[4] = (c) => y.value = c),
            type: _.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Ns), [
            [oe, y.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: b(o).loading
        }, g(b(o).loading ? "Creating account..." : "Create account"), 9, Bs),
        t("p", qs, [
          a[10] || (a[10] = Y(" Already have an account? ", -1)),
          M(i, {
            to: "/app/login",
            class: "link"
          }, {
            default: O(() => [...a[9] || (a[9] = [
              Y("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Ds = /* @__PURE__ */ x(Gs, [["__scopeId", "data-v-d5e42c72"]]), Vs = { class: "auth-page" }, js = { class: "auth-card" }, Os = /* @__PURE__ */ E({
  __name: "SignupPage",
  setup(n) {
    return (e, s) => (l(), r("div", Vs, [
      t("div", js, [
        M(Ds, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Ys = /* @__PURE__ */ x(Os, [["__scopeId", "data-v-609331e4"]]), Hs = { class: "settings-form" }, zs = {
  key: 0,
  class: "settings-loading"
}, Js = {
  key: 1,
  class: "settings-error"
}, Ks = { class: "group-title" }, Xs = ["for"], Ws = { class: "setting-control" }, Qs = ["id", "checked", "onChange"], Zs = ["id", "value", "onChange"], ea = ["id", "value", "onChange"], ta = { class: "settings-actions" }, sa = {
  key: 0,
  class: "success-msg"
}, aa = ["disabled"], na = /* @__PURE__ */ E({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(n, { emit: e }) {
    const s = n, o = e, v = re(), p = d({}), m = d(!0), h = d(!1), y = d(null), _ = d(null), f = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], u = N(
      () => s.groups ? f.filter((R) => s.groups.includes(R)) : f
    );
    async function k() {
      m.value = !0, y.value = null;
      try {
        const R = await v.client.get("/api/v1/users/me/settings");
        p.value = R;
      } catch (R) {
        y.value = R instanceof Error ? R.message : "Failed to load settings";
      } finally {
        m.value = !1;
      }
    }
    async function a() {
      h.value = !0, y.value = null, _.value = null;
      try {
        await v.client.put("/api/v1/users/me/settings", p.value), _.value = "Settings saved.", o("saved", p.value), setTimeout(() => {
          _.value = null;
        }, 3e3);
      } catch (R) {
        y.value = R instanceof Error ? R.message : "Failed to save settings";
      } finally {
        h.value = !1;
      }
    }
    function i(R, B) {
      p.value[R] = B;
    }
    Z(k);
    const c = {
      transcoding: "Transcoding",
      metadata: "Metadata",
      markers: "Marker Detection",
      subtitles: "Subtitles",
      discovery: "Discovery",
      trickplay: "Trickplay",
      newsletter: "Newsletter",
      "port-forward": "Port Forwarding",
      scrobblers: "Scrobblers"
    }, I = {
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
    return (R, B) => (l(), r("div", Hs, [
      m.value ? (l(), r("div", zs, "Loading settings...")) : y.value ? (l(), r("div", Js, g(y.value), 1)) : (l(), r(U, { key: 2 }, [
        (l(!0), r(U, null, L(u.value, (V) => (l(), r("div", {
          key: V,
          class: "settings-group"
        }, [
          t("h3", Ks, g(c[V]), 1),
          (l(), r(U, null, L(I, (q, P) => D(t("div", {
            key: P,
            class: "setting-row"
          }, [
            t("label", {
              for: P,
              class: "setting-label"
            }, g(q.label), 9, Xs),
            t("div", Ws, [
              q.type === "bool" ? (l(), r("input", {
                key: 0,
                id: P,
                type: "checkbox",
                class: "toggle",
                checked: !!p.value[P],
                onChange: (S) => i(P, S.target.checked)
              }, null, 40, Qs)) : q.type === "number" ? (l(), r("input", {
                key: 1,
                id: P,
                type: "number",
                class: "input number-input",
                value: p.value[P],
                onChange: (S) => i(P, Number(S.target.value))
              }, null, 40, Zs)) : (l(), r("input", {
                key: 2,
                id: P,
                type: "text",
                class: "input",
                value: p.value[P] ?? "",
                onChange: (S) => i(P, S.target.value)
              }, null, 40, ea))
            ])
          ]), [
            [Se, P.startsWith(V)]
          ])), 64))
        ]))), 128)),
        t("div", ta, [
          _.value ? (l(), r("div", sa, g(_.value), 1)) : F("", !0),
          t("button", {
            class: "save-btn",
            disabled: h.value,
            onClick: a
          }, g(h.value ? "Saving..." : "Save settings"), 9, aa)
        ])
      ], 64))
    ]));
  }
}), oa = /* @__PURE__ */ x(na, [["__scopeId", "data-v-51b588b6"]]), la = { class: "settings-page" }, ra = /* @__PURE__ */ E({
  __name: "SettingsPage",
  setup(n) {
    return (e, s) => (l(), r("div", la, [
      s[0] || (s[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      M(oa)
    ]));
  }
}), ia = /* @__PURE__ */ x(ra, [["__scopeId", "data-v-f9ca8a28"]]);
function ca() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function ua(n) {
  const e = n.routerBase || "/app", s = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: Jt
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: ms
    },
    {
      path: `${e}/login`,
      name: "login",
      component: xs
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Ys
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: ia
    }
  ];
  return n.extraRoutes && s.push(...n.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: ze,
    props: { appName: n.app }
  }), s;
}
function Fa(n) {
  const e = {
    ...ca(),
    ...n
  }, s = Ce(), o = e.routerBase || "/app", v = xe({
    history: Ee(o),
    routes: ua(e)
  }), p = Te(je);
  return p.provide("apiBase", e.apiBase), p.use(s), p.use(v), p;
}
const da = { class: "library-scan-page" }, va = {
  key: 0,
  class: "loading"
}, pa = {
  key: 1,
  class: "error"
}, fa = {
  key: 2,
  class: "libraries-list"
}, ma = { class: "library-info" }, ga = { class: "library-name" }, _a = { class: "library-type" }, ha = { class: "library-paths" }, ya = { class: "library-meta" }, ba = { key: 0 }, ka = {
  key: 0,
  class: "scan-status"
}, $a = { class: "library-actions" }, wa = ["onClick", "disabled"], Sa = ["onClick", "disabled"], Ta = {
  key: 0,
  class: "empty-state"
}, Ca = /* @__PURE__ */ E({
  __name: "LibraryScanPage",
  setup(n) {
    const e = d([]), s = d({}), o = d(!0), v = d(null);
    async function p() {
      try {
        const u = await K.get("/api/v1/libraries");
        e.value = u.libraries || [];
        for (const k of e.value)
          m(k.id);
      } catch (u) {
        v.value = u instanceof Error ? u.message : "Failed to load libraries";
      } finally {
        o.value = !1;
      }
    }
    async function m(u) {
      try {
        const k = await K.get(`/api/v1/libraries/${u}/scan-status`);
        k.job && (s.value[u] = k.job);
      } catch {
      }
    }
    async function h(u) {
      try {
        await K.post(`/api/v1/libraries/${u}/scan`), await m(u);
      } catch (k) {
        v.value = k instanceof Error ? k.message : "Failed to trigger scan";
      }
    }
    async function y(u) {
      try {
        await K.post(`/api/v1/libraries/${u}/rescan`), await m(u);
      } catch (k) {
        v.value = k instanceof Error ? k.message : "Failed to trigger rescan";
      }
    }
    function _(u) {
      return u ? new Date(u).toLocaleString() : "Never";
    }
    function f(u) {
      if (!u) return "";
      switch (u.status) {
        case "queued":
          return "⏳ Queued";
        case "running":
          return "🔄 Running";
        case "completed":
          return "✅ Completed";
        case "failed":
          return `❌ Failed: ${u.error || "Unknown error"}`;
        default:
          return u.status;
      }
    }
    return Z(() => {
      p();
    }), (u, k) => (l(), r("div", da, [
      k[0] || (k[0] = t("div", { class: "scan-header" }, [
        t("h1", { class: "scan-title" }, "Library Scanner"),
        t("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      o.value ? (l(), r("div", va, "Loading libraries...")) : v.value ? (l(), r("div", pa, g(v.value), 1)) : (l(), r("div", fa, [
        (l(!0), r(U, null, L(e.value, (a) => {
          var i, c, I, R;
          return l(), r("div", {
            key: a.id,
            class: "library-card"
          }, [
            t("div", ma, [
              t("h3", ga, g(a.name), 1),
              t("span", _a, g(a.type), 1),
              t("p", ha, g(a.paths.join(", ")), 1),
              t("div", ya, [
                a.item_count !== void 0 ? (l(), r("span", ba, g(a.item_count) + " items", 1)) : F("", !0),
                t("span", null, "Last scan: " + g(_(a.last_scan_at)), 1)
              ]),
              s.value[a.id] ? (l(), r("div", ka, g(f(s.value[a.id])), 1)) : F("", !0)
            ]),
            t("div", $a, [
              t("button", {
                class: "btn btn-scan",
                onClick: (B) => h(a.id),
                disabled: ((i = s.value[a.id]) == null ? void 0 : i.status) === "running" || ((c = s.value[a.id]) == null ? void 0 : c.status) === "queued"
              }, " Scan ", 8, wa),
              t("button", {
                class: "btn btn-rescan",
                onClick: (B) => y(a.id),
                disabled: ((I = s.value[a.id]) == null ? void 0 : I.status) === "running" || ((R = s.value[a.id]) == null ? void 0 : R.status) === "queued"
              }, " Rescan ", 8, Sa)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (l(), r("div", Ta, " No libraries configured. Add a library to get started. ")) : F("", !0)
      ]))
    ]));
  }
}), Ua = /* @__PURE__ */ x(Ca, [["__scopeId", "data-v-62b3805e"]]);
export {
  ee as ApiClient,
  Je as ApiError,
  Ge as AppLayout,
  Jt as BrowsePage,
  Gt as FilterBar,
  Ua as LibraryScanPage,
  gs as LocalStorageTokenStore,
  Ts as LoginForm,
  xs as LoginPage,
  ct as MediaCard,
  mt as MediaGrid,
  je as PhlixApp,
  us as Player,
  ms as PlayerPage,
  oa as SettingsForm,
  ia as SettingsPage,
  Ds as SignupForm,
  Ys as SignupPage,
  Fa as createPhlixApp,
  re as useAuthStore,
  fe as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
