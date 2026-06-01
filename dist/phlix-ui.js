var _e = Object.defineProperty;
var he = (a, e, s) => e in a ? _e(a, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[e] = s;
var J = (a, e, s) => he(a, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as i, createElementBlock as u, createElementVNode as t, renderSlot as z, defineComponent as E, createBlock as ne, withCtx as Y, createVNode as M, unref as _, createTextVNode as j, toDisplayString as y, ref as d, computed as N, createCommentVNode as U, Fragment as F, renderList as A, withDirectives as q, vModelText as X, normalizeClass as K, inject as ue, onMounted as oe, watch as ye, onUnmounted as be, withModifiers as W, normalizeStyle as ke, createStaticVNode as $e, resolveComponent as ce, vModelDynamic as ae, vShow as we, createApp as Te } from "vue";
import { defineStore as de, createPinia as Se } from "pinia";
import { RouterView as Ce, RouterLink as ie, useRoute as Re, useRouter as pe, createRouter as Pe, createWebHistory as xe } from "vue-router";
const x = (a, e) => {
  const s = a.__vccOpts || a;
  for (const [o, p] of e)
    s[o] = p;
  return s;
}, Ee = {}, Ie = { class: "app-layout" }, Fe = { class: "app-header" }, Ue = { class: "header-inner" }, Ae = { class: "logo" }, Me = { class: "nav" }, Ne = { class: "app-main" }, Be = { class: "app-footer" };
function Le(a, e) {
  return i(), u("div", Ie, [
    t("header", Fe, [
      t("div", Ue, [
        t("div", Ae, [
          z(a.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", Me, [
          z(a.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", Ne, [
      z(a.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", Be, [
      z(a.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Ge = /* @__PURE__ */ x(Ee, [["render", Le], ["__scopeId", "data-v-9f6c6d16"]]), qe = { class: "main-nav" }, De = /* @__PURE__ */ E({
  __name: "PhlixApp",
  setup(a) {
    return (e, s) => (i(), ne(Ge, null, {
      nav: Y(() => [
        t("nav", qe, [
          M(_(ie), {
            to: "/app",
            class: "nav-link"
          }, {
            default: Y(() => [...s[0] || (s[0] = [
              j("Browse", -1)
            ])]),
            _: 1
          }),
          M(_(ie), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: Y(() => [...s[1] || (s[1] = [
              j("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: Y(() => [
        M(_(Ce))
      ]),
      _: 1
    }));
  }
}), Ve = /* @__PURE__ */ x(De, [["__scopeId", "data-v-35b5e7c6"]]), Oe = { class: "phlix-placeholder" }, Ye = { class: "placeholder-content" }, je = /* @__PURE__ */ E({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(a) {
    return (e, s) => (i(), u("div", Oe, [
      t("div", Ye, [
        s[0] || (s[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + y(a.appName) + " is initializing", 1)
      ])
    ]));
  }
}), He = /* @__PURE__ */ x(je, [["__scopeId", "data-v-bf79ac4c"]]);
class ze extends Error {
  constructor(e, s, o = null) {
    super(e), this.status = s, this.body = o, this.name = "ApiError";
  }
}
function Je(a) {
  return a === !0 || a === 1 || a === "1" || a === "true";
}
class Q {
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
    const p = () => {
      const g = {
        "Content-Type": "application/json"
      }, h = this.tokens.getAccessToken();
      h && (g.Authorization = `Bearer ${h}`);
      const m = { method: e, headers: g, credentials: "same-origin" };
      return o !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (m.body = JSON.stringify(o)), m;
    }, c = `${this.baseUrl}${s}`;
    let f = await this.doFetch(c, p());
    return f.status === 401 && await this.refreshToken() && (f = await this.doFetch(c, p())), this.handleResponse(f);
  }
  async handleResponse(e) {
    const p = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const c = this.extractError(p);
      throw new ze(c, e.status, p);
    }
    return p;
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
    return { ...e, is_admin: Je(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
new Q();
const ve = de("media", () => {
  const a = d([]), e = d(0), s = d(!1), o = d(null), p = d(""), c = d([]), f = d(void 0), g = d(void 0), h = d([]), m = d([]), v = d("name"), k = d("asc"), S = d(24), n = d(0), l = N(() => n.value + a.value.length < e.value), r = N(() => {
    const b = {};
    return p.value && (b.search = p.value), c.value.length && (b.genres = c.value), f.value !== void 0 && (b.yearFrom = f.value), g.value !== void 0 && (b.yearTo = g.value), h.value.length && (b.ratings = h.value), m.value.length && (b.types = m.value), b.sort = v.value, b.order = k.value, b.limit = S.value, b.offset = n.value, b;
  }), B = N(() => {
    const b = /* @__PURE__ */ new Set();
    return a.value.forEach((C) => {
      var T;
      return (T = C.genres) == null ? void 0 : T.forEach((O) => b.add(O));
    }), Array.from(b).sort();
  }), R = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], V = ["movie", "series", "episode", "audio", "image"];
  function D(b) {
    var O, G, re;
    const C = new URLSearchParams(), T = r.value;
    return T.search && C.set("search", T.search), (O = T.genres) == null || O.forEach((H) => C.append("genres", H)), T.yearFrom !== void 0 && C.set("yearFrom", String(T.yearFrom)), T.yearTo !== void 0 && C.set("yearTo", String(T.yearTo)), (G = T.ratings) == null || G.forEach((H) => C.append("ratings", H)), (re = T.types) == null || re.forEach((H) => C.append("types", H)), T.sort && C.set("sort", T.sort), T.order && C.set("order", T.order), C.set("limit", String(T.limit)), C.set("offset", String(T.offset)), `${b}/api/v1/media?${C.toString()}`;
  }
  async function L(b, C = !1) {
    s.value = !0, o.value = null;
    try {
      const T = new Q({ baseUrl: b }), O = D(b), G = await T.get(O);
      C ? a.value = [...a.value, ...G.items] : a.value = G.items, e.value = G.total, n.value = (G.offset ?? 0) + G.items.length;
    } catch (T) {
      o.value = T instanceof Error ? T.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function P(b) {
    await L(b, !0);
  }
  function w() {
    a.value = [], e.value = 0, n.value = 0, o.value = null;
  }
  function $(b) {
    p.value = b, n.value = 0;
  }
  function I(b) {
    c.value = b, n.value = 0;
  }
  function Z(b, C) {
    f.value = b, g.value = C, n.value = 0;
  }
  function fe(b) {
    h.value = b, n.value = 0;
  }
  function me(b) {
    m.value = b, n.value = 0;
  }
  function ge(b, C) {
    v.value = b, C && (k.value = C), n.value = 0;
  }
  return {
    items: a,
    total: e,
    loading: s,
    error: o,
    search: p,
    selectedGenres: c,
    yearFrom: f,
    yearTo: g,
    selectedRatings: h,
    selectedTypes: m,
    sort: v,
    order: k,
    limit: S,
    offset: n,
    hasMore: l,
    queryParams: r,
    availableGenres: B,
    availableRatings: R,
    availableTypes: V,
    fetchMedia: L,
    loadMore: P,
    reset: w,
    setSearch: $,
    setGenres: I,
    setYearRange: Z,
    setRatings: fe,
    setTypes: me,
    setSort: ge
  };
}), Ke = { class: "media-card" }, Xe = ["href"], We = { class: "card-poster" }, Qe = ["src", "alt"], Ze = {
  key: 1,
  class: "poster-placeholder"
}, et = { class: "placeholder-type" }, tt = { class: "card-overlay" }, st = {
  key: 0,
  class: "card-year"
}, at = {
  key: 1,
  class: "card-rating"
}, nt = { class: "card-info" }, ot = ["title"], lt = {
  key: 0,
  class: "card-genres"
}, rt = /* @__PURE__ */ E({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(a) {
    return (e, s) => {
      var o;
      return i(), u("article", Ke, [
        t("a", {
          href: a.to ?? `/app/player/${a.item.id}`,
          class: "card-link"
        }, [
          t("div", We, [
            a.item.poster_url ? (i(), u("img", {
              key: 0,
              src: a.item.poster_url,
              alt: a.item.name,
              loading: "lazy"
            }, null, 8, Qe)) : (i(), u("div", Ze, [
              s[0] || (s[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", et, y(a.item.type), 1)
            ]))
          ]),
          t("div", tt, [
            a.item.year ? (i(), u("span", st, y(a.item.year), 1)) : U("", !0),
            a.item.rating ? (i(), u("span", at, y(a.item.rating), 1)) : U("", !0)
          ]),
          t("div", nt, [
            t("h3", {
              class: "card-title",
              title: a.item.name
            }, y(a.item.name), 9, ot),
            (o = a.item.genres) != null && o.length ? (i(), u("p", lt, y(a.item.genres.slice(0, 2).join(", ")), 1)) : U("", !0)
          ])
        ], 8, Xe)
      ]);
    };
  }
}), it = /* @__PURE__ */ x(rt, [["__scopeId", "data-v-e60c8481"]]), ut = { class: "media-grid-container" }, ct = {
  key: 0,
  class: "media-grid-skeleton"
}, dt = {
  key: 1,
  class: "media-grid-empty"
}, pt = {
  key: 2,
  class: "media-grid"
}, vt = /* @__PURE__ */ E({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(a) {
    return (e, s) => (i(), u("div", ut, [
      a.loading ? (i(), u("div", ct, [
        (i(), u(F, null, A(12, (o) => t("div", {
          key: o,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : a.items.length === 0 ? (i(), u("div", dt, [...s[1] || (s[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (i(), u("div", pt, [
        (i(!0), u(F, null, A(a.items, (o) => (i(), ne(it, {
          key: o.id,
          item: o
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), ft = /* @__PURE__ */ x(vt, [["__scopeId", "data-v-b7e87216"]]), mt = { class: "filter-bar" }, gt = { class: "filter-search" }, _t = { class: "filter-row" }, ht = { class: "filter-group" }, yt = ["value"], bt = ["value"], kt = ["value"], $t = { class: "filter-group" }, wt = ["value"], Tt = ["value"], St = ["value"], Ct = ["value"], Rt = { class: "filter-section" }, Pt = { class: "filter-chips" }, xt = ["onClick"], Et = { class: "filter-section" }, It = { class: "filter-chips" }, Ft = ["onClick"], Ut = { class: "filter-section" }, At = { class: "filter-chips" }, Mt = ["onClick"], Nt = { class: "filter-actions" }, Bt = { class: "result-count" }, Lt = /* @__PURE__ */ E({
  __name: "FilterBar",
  setup(a) {
    const e = ve(), s = d(e.search), o = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function p() {
      e.setSearch(s.value);
    }
    function c(n) {
      const l = e.selectedGenres;
      l.includes(n) ? e.setGenres(l.filter((r) => r !== n)) : e.setGenres([...l, n]);
    }
    function f(n) {
      const l = e.selectedRatings;
      l.includes(n) ? e.setRatings(l.filter((r) => r !== n)) : e.setRatings([...l, n]);
    }
    function g(n) {
      const l = e.selectedTypes;
      l.includes(n) ? e.setTypes(l.filter((r) => r !== n)) : e.setTypes([...l, n]);
    }
    function h(n) {
      const l = n.target;
      e.setSort(l.value);
    }
    function m(n) {
      const l = n.target;
      e.order = l.value;
    }
    const v = (/* @__PURE__ */ new Date()).getFullYear(), k = N(() => {
      const n = [];
      for (let l = v; l >= 1900; l--)
        n.push(l);
      return n;
    });
    function S() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (n, l) => (i(), u("div", mt, [
      t("div", gt, [
        q(t("input", {
          "onUpdate:modelValue": l[0] || (l[0] = (r) => s.value = r),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: p
        }, null, 544), [
          [X, s.value]
        ])
      ]),
      t("div", _t, [
        t("div", ht, [
          l[4] || (l[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: _(e).sort,
            onChange: h
          }, [
            (i(), u(F, null, A(o, (r) => t("option", {
              key: r.value,
              value: r.value
            }, y(r.label), 9, bt)), 64))
          ], 40, yt),
          t("select", {
            class: "filter-select order-select",
            value: _(e).order,
            onChange: m
          }, [...l[3] || (l[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, kt)
        ]),
        t("div", $t, [
          l[7] || (l[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: _(e).yearFrom ?? "",
            onChange: l[1] || (l[1] = (r) => _(e).setYearRange(
              r.target.value ? Number(r.target.value) : void 0,
              _(e).yearTo
            ))
          }, [
            l[5] || (l[5] = t("option", { value: "" }, "From", -1)),
            (i(!0), u(F, null, A(k.value.slice(0, 50), (r) => (i(), u("option", {
              key: r,
              value: r
            }, y(r), 9, Tt))), 128))
          ], 40, wt),
          t("select", {
            class: "filter-select",
            value: _(e).yearTo ?? "",
            onChange: l[2] || (l[2] = (r) => _(e).setYearRange(
              _(e).yearFrom,
              r.target.value ? Number(r.target.value) : void 0
            ))
          }, [
            l[6] || (l[6] = t("option", { value: "" }, "To", -1)),
            (i(!0), u(F, null, A(k.value.slice(0, 50), (r) => (i(), u("option", {
              key: r,
              value: r
            }, y(r), 9, Ct))), 128))
          ], 40, St)
        ])
      ]),
      t("div", Rt, [
        l[8] || (l[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", Pt, [
          (i(!0), u(F, null, A(_(e).availableGenres, (r) => (i(), u("button", {
            key: r,
            class: K(["chip", { active: _(e).selectedGenres.includes(r) }]),
            onClick: (B) => c(r)
          }, y(r), 11, xt))), 128))
        ])
      ]),
      t("div", Et, [
        l[9] || (l[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", It, [
          (i(!0), u(F, null, A(_(e).availableRatings, (r) => (i(), u("button", {
            key: r,
            class: K(["chip", { active: _(e).selectedRatings.includes(r) }]),
            onClick: (B) => f(r)
          }, y(r), 11, Ft))), 128))
        ])
      ]),
      t("div", Ut, [
        l[10] || (l[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", At, [
          (i(!0), u(F, null, A(_(e).availableTypes, (r) => (i(), u("button", {
            key: r,
            class: K(["chip", { active: _(e).selectedTypes.includes(r) }]),
            onClick: (B) => g(r)
          }, y(r), 11, Mt))), 128))
        ])
      ]),
      t("div", Nt, [
        t("button", {
          class: "clear-btn",
          onClick: S
        }, "Clear filters"),
        t("span", Bt, y(_(e).total) + " result" + y(_(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Gt = /* @__PURE__ */ x(Lt, [["__scopeId", "data-v-7089ec0b"]]), qt = { class: "browse-page" }, Dt = { class: "browse-header" }, Vt = { class: "browse-toolbar-extra" }, Ot = {
  key: 0,
  class: "browse-error"
}, Yt = {
  key: 1,
  class: "load-more"
}, jt = {
  key: 2,
  class: "loading-more"
}, Ht = /* @__PURE__ */ E({
  __name: "BrowsePage",
  setup(a) {
    const e = ue("apiBase") ?? N(() => ""), s = ve();
    function o() {
      s.reset(), s.fetchMedia(e.value);
    }
    oe(o), ye(e, o);
    function p() {
      s.reset(), s.fetchMedia(e.value);
    }
    function c() {
      s.loadMore(e.value);
    }
    return (f, g) => (i(), u("div", qt, [
      t("div", Dt, [
        g[0] || (g[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", Vt, [
          z(f.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      M(Gt, { onChange: p }),
      _(s).error ? (i(), u("div", Ot, [
        t("p", null, y(_(s).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: o
        }, "Retry")
      ])) : U("", !0),
      M(ft, {
        items: _(s).items,
        loading: _(s).loading && _(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      _(s).hasMore && !_(s).loading ? (i(), u("div", Yt, [
        t("button", {
          class: "load-more-btn",
          onClick: c
        }, "Load more")
      ])) : U("", !0),
      _(s).loading && _(s).items.length > 0 ? (i(), u("div", jt, " Loading... ")) : U("", !0)
    ]));
  }
}), zt = /* @__PURE__ */ x(Ht, [["__scopeId", "data-v-c192afa6"]]), Jt = ["src", "poster"], Kt = { class: "controls-top" }, Xt = { class: "media-title" }, Wt = {
  key: 0,
  class: "media-year"
}, Qt = { class: "controls-center" }, Zt = { class: "controls-bottom" }, es = { class: "progress-track" }, ts = { class: "controls-row" }, ss = { class: "time-display" }, as = { class: "volume-control" }, ns = ["value"], os = { class: "speed-control" }, ls = ["value"], rs = { class: "time-display" }, is = /* @__PURE__ */ E({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(a) {
    const e = d(null), s = d(!1), o = d(0), p = d(0), c = d(1), f = d(!1), g = d(1), h = d(!1), m = d(!0);
    let v = null;
    const k = N(
      () => p.value > 0 ? o.value / p.value * 100 : 0
    );
    function S(w) {
      if (!isFinite(w) || isNaN(w)) return "0:00";
      const $ = Math.floor(w / 60), I = Math.floor(w % 60);
      return `${$}:${I.toString().padStart(2, "0")}`;
    }
    function n() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function l() {
      e.value && (o.value = e.value.currentTime);
    }
    function r() {
      e.value && (p.value = e.value.duration);
    }
    function B(w) {
      const I = w.currentTarget.getBoundingClientRect(), Z = (w.clientX - I.left) / I.width;
      e.value && (e.value.currentTime = Z * p.value);
    }
    function R(w) {
      const $ = parseFloat(w.target.value);
      c.value = $, e.value && (e.value.volume = $), f.value = $ === 0;
    }
    function V() {
      f.value = !f.value, e.value && (e.value.muted = f.value);
    }
    function D(w) {
      g.value = w, e.value && (e.value.playbackRate = w);
    }
    function L() {
      var $;
      const w = ($ = e.value) == null ? void 0 : $.closest(".player-container");
      w && (document.fullscreenElement ? (document.exitFullscreen(), h.value = !1) : (w.requestFullscreen(), h.value = !0));
    }
    function P() {
      m.value = !0, v && clearTimeout(v), v = setTimeout(() => {
        s.value && (m.value = !1);
      }, 3e3);
    }
    return be(() => {
      v && clearTimeout(v);
    }), (w, $) => (i(), u("div", {
      class: K(["player-container", { "controls-hidden": !m.value && s.value }]),
      onMousemove: P,
      onClick: n
    }, [
      $[6] || ($[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: a.streamUrl,
        poster: a.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: $[0] || ($[0] = (I) => s.value = !0),
        onPause: $[1] || ($[1] = (I) => s.value = !1),
        onTimeupdate: l,
        onLoadedmetadata: r,
        onClick: W(n, ["stop"])
      }, null, 40, Jt),
      t("div", {
        class: "player-controls",
        onClick: $[4] || ($[4] = W(() => {
        }, ["stop"]))
      }, [
        t("div", Kt, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: $[2] || ($[2] = (I) => w.$router.back())
          }, " ← Back "),
          t("span", Xt, y(a.media.name), 1),
          a.media.year ? (i(), u("span", Wt, y(a.media.year), 1)) : U("", !0)
        ]),
        t("div", Qt, [
          t("button", {
            class: "play-btn",
            onClick: n
          }, y(s.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", Zt, [
          t("div", {
            class: "progress-bar",
            onClick: B
          }, [
            t("div", es, [
              t("div", {
                class: "progress-fill",
                style: ke({ width: k.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", ts, [
            t("span", ss, y(S(o.value)), 1),
            t("div", as, [
              t("button", {
                class: "ctrl-btn",
                onClick: V
              }, y(f.value || c.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: f.value ? 0 : c.value,
                class: "volume-slider",
                onInput: R
              }, null, 40, ns)
            ]),
            t("div", os, [
              t("select", {
                class: "speed-select",
                value: g.value,
                onChange: $[3] || ($[3] = (I) => D(Number(I.target.value)))
              }, [...$[5] || ($[5] = [
                $e('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, ls)
            ]),
            t("span", rs, y(S(p.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: L
            }, y(h.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), us = /* @__PURE__ */ x(is, [["__scopeId", "data-v-7a51063f"]]), cs = { class: "player-page" }, ds = {
  key: 0,
  class: "player-loading"
}, ps = {
  key: 1,
  class: "player-error"
}, vs = /* @__PURE__ */ E({
  __name: "PlayerPage",
  setup(a) {
    const e = ue("apiBase", N(() => "")), s = Re(), o = d(null), p = d(""), c = d(!0), f = d(null);
    async function g() {
      const h = s.params.id;
      if (!h) {
        f.value = "No media ID provided", c.value = !1;
        return;
      }
      try {
        const m = new Q({ baseUrl: e.value }), [v, k] = await Promise.all([
          m.get(`/api/v1/media/${h}`),
          m.get(`/api/v1/media/${h}/playback-info`).catch(() => null)
        ]);
        o.value = v, k != null && k.url ? p.value = k.url : p.value = `${e.value}/media/${h}/stream`;
      } catch (m) {
        f.value = m instanceof Error ? m.message : "Failed to load media";
      } finally {
        c.value = !1;
      }
    }
    return oe(g), (h, m) => (i(), u("div", cs, [
      c.value ? (i(), u("div", ds, "Loading...")) : f.value ? (i(), u("div", ps, [
        t("p", null, y(f.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: g
        }, "Retry")
      ])) : o.value ? (i(), ne(us, {
        key: 2,
        media: o.value,
        "stream-url": p.value
      }, null, 8, ["media", "stream-url"])) : U("", !0)
    ]));
  }
}), fs = /* @__PURE__ */ x(vs, [["__scopeId", "data-v-d9061b47"]]), ee = "access_token", te = "refresh_token", se = "user";
class ms {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(ee);
  }
  setAccessToken(e) {
    this.storage.setItem(ee, e);
  }
  getRefreshToken() {
    return this.storage.getItem(te);
  }
  setRefreshToken(e) {
    this.storage.setItem(te, e);
  }
  getUser() {
    const e = this.storage.getItem(se);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(se, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(ee), this.storage.removeItem(te), this.storage.removeItem(se);
  }
}
const le = de("auth", () => {
  const a = new ms(), e = new Q({ tokenStore: a }), s = d(null), o = d(!1), p = d(null), c = N(() => a.getAccessToken() !== null), f = N(() => {
    var k;
    return ((k = s.value) == null ? void 0 : k.is_admin) === !0;
  });
  async function g(k, S) {
    o.value = !0, p.value = null;
    try {
      const n = await e.post("/api/v1/auth/login", { email: k, password: S });
      return a.setAccessToken(n.access_token), a.setRefreshToken(n.refresh_token), await m(), !0;
    } catch (n) {
      return p.value = n instanceof Error ? n.message : "Login failed", !1;
    } finally {
      o.value = !1;
    }
  }
  async function h(k, S, n) {
    o.value = !0, p.value = null;
    try {
      const l = await e.post("/api/v1/auth/register", { email: k, username: S, password: n });
      return a.setAccessToken(l.access_token), a.setRefreshToken(l.refresh_token), await m(), !0;
    } catch (l) {
      return p.value = l instanceof Error ? l.message : "Registration failed", !1;
    } finally {
      o.value = !1;
    }
  }
  async function m() {
    if (c.value)
      try {
        s.value = await e.getCurrentUser();
      } catch {
        s.value = null, a.clear();
      }
  }
  function v() {
    a.clear(), s.value = null;
  }
  return {
    user: s,
    loading: o,
    error: p,
    isLoggedIn: c,
    isAdmin: f,
    client: e,
    login: g,
    signup: h,
    fetchUser: m,
    logout: v
  };
}), gs = {
  key: 0,
  class: "form-error"
}, _s = { class: "field" }, hs = { class: "field" }, ys = { class: "password-wrapper" }, bs = ["type"], ks = ["disabled"], $s = { class: "form-footer" }, ws = /* @__PURE__ */ E({
  __name: "LoginForm",
  emits: ["success"],
  setup(a, { emit: e }) {
    const s = e, o = le(), p = pe(), c = d(""), f = d(""), g = d(!1);
    async function h() {
      await o.login(c.value, f.value) && (s("success"), p.push("/app"));
    }
    return (m, v) => {
      const k = ce("router-link");
      return i(), u("form", {
        class: "login-form",
        onSubmit: W(h, ["prevent"])
      }, [
        v[7] || (v[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        _(o).error ? (i(), u("div", gs, y(_(o).error), 1)) : U("", !0),
        t("div", _s, [
          v[3] || (v[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          q(t("input", {
            id: "email",
            "onUpdate:modelValue": v[0] || (v[0] = (S) => c.value = S),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [X, c.value]
          ])
        ]),
        t("div", hs, [
          v[4] || (v[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", ys, [
            q(t("input", {
              id: "password",
              "onUpdate:modelValue": v[1] || (v[1] = (S) => f.value = S),
              type: g.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, bs), [
              [ae, f.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: v[2] || (v[2] = (S) => g.value = !g.value)
            }, y(g.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: _(o).loading
        }, y(_(o).loading ? "Signing in..." : "Sign in"), 9, ks),
        t("p", $s, [
          v[6] || (v[6] = j(" Don't have an account? ", -1)),
          M(k, {
            to: "/app/signup",
            class: "link"
          }, {
            default: Y(() => [...v[5] || (v[5] = [
              j("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Ts = /* @__PURE__ */ x(ws, [["__scopeId", "data-v-22bc5576"]]), Ss = { class: "auth-page" }, Cs = { class: "auth-card" }, Rs = /* @__PURE__ */ E({
  __name: "LoginPage",
  setup(a) {
    return (e, s) => (i(), u("div", Ss, [
      t("div", Cs, [
        M(Ts, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Ps = /* @__PURE__ */ x(Rs, [["__scopeId", "data-v-9c53ce6a"]]), xs = {
  key: 0,
  class: "form-error"
}, Es = { class: "field" }, Is = { class: "field" }, Fs = { class: "field" }, Us = { class: "password-wrapper" }, As = ["type"], Ms = { class: "field" }, Ns = ["type"], Bs = ["disabled"], Ls = { class: "form-footer" }, Gs = /* @__PURE__ */ E({
  __name: "SignupForm",
  emits: ["success"],
  setup(a, { emit: e }) {
    const s = e, o = le(), p = pe(), c = d(""), f = d(""), g = d(""), h = d(""), m = d(!1), v = d(null);
    async function k() {
      if (v.value = null, g.value.length < 8) {
        v.value = "Password must be at least 8 characters.";
        return;
      }
      if (g.value !== h.value) {
        v.value = "Passwords do not match.";
        return;
      }
      await o.signup(c.value, f.value, g.value) && (s("success"), p.push("/app"));
    }
    return (S, n) => {
      const l = ce("router-link");
      return i(), u("form", {
        class: "signup-form",
        onSubmit: W(k, ["prevent"])
      }, [
        n[11] || (n[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        _(o).error || v.value ? (i(), u("div", xs, y(_(o).error || v.value), 1)) : U("", !0),
        t("div", Es, [
          n[5] || (n[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          q(t("input", {
            id: "email",
            "onUpdate:modelValue": n[0] || (n[0] = (r) => c.value = r),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [X, c.value]
          ])
        ]),
        t("div", Is, [
          n[6] || (n[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          q(t("input", {
            id: "username",
            "onUpdate:modelValue": n[1] || (n[1] = (r) => f.value = r),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [X, f.value]
          ])
        ]),
        t("div", Fs, [
          n[7] || (n[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Us, [
            q(t("input", {
              id: "password",
              "onUpdate:modelValue": n[2] || (n[2] = (r) => g.value = r),
              type: m.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, As), [
              [ae, g.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: n[3] || (n[3] = (r) => m.value = !m.value)
            }, y(m.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", Ms, [
          n[8] || (n[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          q(t("input", {
            id: "confirm",
            "onUpdate:modelValue": n[4] || (n[4] = (r) => h.value = r),
            type: m.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Ns), [
            [ae, h.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: _(o).loading
        }, y(_(o).loading ? "Creating account..." : "Create account"), 9, Bs),
        t("p", Ls, [
          n[10] || (n[10] = j(" Already have an account? ", -1)),
          M(l, {
            to: "/app/login",
            class: "link"
          }, {
            default: Y(() => [...n[9] || (n[9] = [
              j("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), qs = /* @__PURE__ */ x(Gs, [["__scopeId", "data-v-d5e42c72"]]), Ds = { class: "auth-page" }, Vs = { class: "auth-card" }, Os = /* @__PURE__ */ E({
  __name: "SignupPage",
  setup(a) {
    return (e, s) => (i(), u("div", Ds, [
      t("div", Vs, [
        M(qs, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Ys = /* @__PURE__ */ x(Os, [["__scopeId", "data-v-609331e4"]]), js = { class: "settings-form" }, Hs = {
  key: 0,
  class: "settings-loading"
}, zs = {
  key: 1,
  class: "settings-error"
}, Js = { class: "group-title" }, Ks = ["for"], Xs = { class: "setting-control" }, Ws = ["id", "checked", "onChange"], Qs = ["id", "value", "onChange"], Zs = ["id", "value", "onChange"], ea = { class: "settings-actions" }, ta = {
  key: 0,
  class: "success-msg"
}, sa = ["disabled"], aa = /* @__PURE__ */ E({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(a, { emit: e }) {
    const s = a, o = e, p = le(), c = d({}), f = d(!0), g = d(!1), h = d(null), m = d(null), v = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], k = N(
      () => s.groups ? v.filter((R) => s.groups.includes(R)) : v
    );
    async function S() {
      f.value = !0, h.value = null;
      try {
        const R = await p.client.get("/api/v1/users/me/settings");
        c.value = R;
      } catch (R) {
        h.value = R instanceof Error ? R.message : "Failed to load settings";
      } finally {
        f.value = !1;
      }
    }
    async function n() {
      g.value = !0, h.value = null, m.value = null;
      try {
        await p.client.put("/api/v1/users/me/settings", c.value), m.value = "Settings saved.", o("saved", c.value), setTimeout(() => {
          m.value = null;
        }, 3e3);
      } catch (R) {
        h.value = R instanceof Error ? R.message : "Failed to save settings";
      } finally {
        g.value = !1;
      }
    }
    function l(R, V) {
      c.value[R] = V;
    }
    oe(S);
    const r = {
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
    return (R, V) => (i(), u("div", js, [
      f.value ? (i(), u("div", Hs, "Loading settings...")) : h.value ? (i(), u("div", zs, y(h.value), 1)) : (i(), u(F, { key: 2 }, [
        (i(!0), u(F, null, A(k.value, (D) => (i(), u("div", {
          key: D,
          class: "settings-group"
        }, [
          t("h3", Js, y(r[D]), 1),
          (i(), u(F, null, A(B, (L, P) => q(t("div", {
            key: P,
            class: "setting-row"
          }, [
            t("label", {
              for: P,
              class: "setting-label"
            }, y(L.label), 9, Ks),
            t("div", Xs, [
              L.type === "bool" ? (i(), u("input", {
                key: 0,
                id: P,
                type: "checkbox",
                class: "toggle",
                checked: !!c.value[P],
                onChange: (w) => l(P, w.target.checked)
              }, null, 40, Ws)) : L.type === "number" ? (i(), u("input", {
                key: 1,
                id: P,
                type: "number",
                class: "input number-input",
                value: c.value[P],
                onChange: (w) => l(P, Number(w.target.value))
              }, null, 40, Qs)) : (i(), u("input", {
                key: 2,
                id: P,
                type: "text",
                class: "input",
                value: c.value[P] ?? "",
                onChange: (w) => l(P, w.target.value)
              }, null, 40, Zs))
            ])
          ]), [
            [we, P.startsWith(D)]
          ])), 64))
        ]))), 128)),
        t("div", ea, [
          m.value ? (i(), u("div", ta, y(m.value), 1)) : U("", !0),
          t("button", {
            class: "save-btn",
            disabled: g.value,
            onClick: n
          }, y(g.value ? "Saving..." : "Save settings"), 9, sa)
        ])
      ], 64))
    ]));
  }
}), na = /* @__PURE__ */ x(aa, [["__scopeId", "data-v-51b588b6"]]), oa = { class: "settings-page" }, la = /* @__PURE__ */ E({
  __name: "SettingsPage",
  setup(a) {
    return (e, s) => (i(), u("div", oa, [
      s[0] || (s[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      M(na)
    ]));
  }
}), ra = /* @__PURE__ */ x(la, [["__scopeId", "data-v-f9ca8a28"]]);
function ia() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function ua(a) {
  const e = a.routerBase || "/app", s = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: zt
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: fs
    },
    {
      path: `${e}/login`,
      name: "login",
      component: Ps
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Ys
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: ra
    }
  ];
  return a.extraRoutes && s.push(...a.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: He,
    props: { appName: a.app }
  }), s;
}
function fa(a) {
  const e = {
    ...ia(),
    ...a
  }, s = Se(), o = e.routerBase || "/app", p = Pe({
    history: xe(o),
    routes: ua(e)
  }), c = Te(Ve);
  return c.provide("apiBase", e.apiBase), c.use(s), c.use(p), c;
}
export {
  Q as ApiClient,
  ze as ApiError,
  Ge as AppLayout,
  zt as BrowsePage,
  Gt as FilterBar,
  ms as LocalStorageTokenStore,
  Ts as LoginForm,
  Ps as LoginPage,
  it as MediaCard,
  ft as MediaGrid,
  Ve as PhlixApp,
  us as Player,
  fs as PlayerPage,
  na as SettingsForm,
  ra as SettingsPage,
  qs as SignupForm,
  Ys as SignupPage,
  fa as createPhlixApp,
  le as useAuthStore,
  ve as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
