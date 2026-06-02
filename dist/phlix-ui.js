var Be = Object.defineProperty;
var Te = (n, e, s) => e in n ? Be(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var le = (n, e, s) => Te(n, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as o, createElementBlock as a, createElementVNode as t, renderSlot as Q, defineComponent as P, createBlock as Y, withCtx as se, createVNode as q, unref as C, createTextVNode as X, toDisplayString as b, ref as g, computed as L, createCommentVNode as S, Fragment as D, renderList as z, withDirectives as K, vModelText as ie, normalizeClass as U, inject as ge, onMounted as Z, watch as ce, onUnmounted as Pe, withModifiers as ae, normalizeStyle as te, createStaticVNode as Ee, resolveComponent as $e, vModelDynamic as fe, vShow as _e, createApp as Le, markRaw as $, resolveDynamicComponent as Ve, useId as be, onBeforeUnmount as xe, nextTick as ee } from "vue";
import { defineStore as Ce, createPinia as je } from "pinia";
import { RouterView as Ae, RouterLink as we, useRoute as Re, useRouter as Ie, createRouter as Fe, createWebHistory as De } from "vue-router";
const E = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [l, c] of e)
    s[l] = c;
  return s;
}, Ue = {}, ze = { class: "app-layout" }, Ne = { class: "app-header" }, qe = { class: "header-inner" }, He = { class: "logo" }, Ge = { class: "nav" }, Oe = { class: "app-main" }, Ke = { class: "app-footer" };
function Ye(n, e) {
  return o(), a("div", ze, [
    t("header", Ne, [
      t("div", qe, [
        t("div", He, [
          Q(n.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", Ge, [
          Q(n.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", Oe, [
      Q(n.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", Ke, [
      Q(n.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Xe = /* @__PURE__ */ E(Ue, [["render", Ye], ["__scopeId", "data-v-9f6c6d16"]]), Je = { class: "main-nav" }, We = /* @__PURE__ */ P({
  __name: "PhlixApp",
  setup(n) {
    return (e, s) => (o(), Y(Xe, null, {
      nav: se(() => [
        t("nav", Je, [
          q(C(we), {
            to: "/app",
            class: "nav-link"
          }, {
            default: se(() => [...s[0] || (s[0] = [
              X("Browse", -1)
            ])]),
            _: 1
          }),
          q(C(we), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: se(() => [...s[1] || (s[1] = [
              X("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: se(() => [
        q(C(Ae))
      ]),
      _: 1
    }));
  }
}), Qe = /* @__PURE__ */ E(We, [["__scopeId", "data-v-35b5e7c6"]]), Ze = { class: "phlix-placeholder" }, et = { class: "placeholder-content" }, tt = /* @__PURE__ */ P({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(n) {
    return (e, s) => (o(), a("div", Ze, [
      t("div", et, [
        s[0] || (s[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + b(n.appName) + " is initializing", 1)
      ])
    ]));
  }
}), nt = /* @__PURE__ */ E(tt, [["__scopeId", "data-v-bf79ac4c"]]);
class st extends Error {
  constructor(e, s, l = null) {
    super(e), this.status = s, this.body = l, this.name = "ApiError";
  }
}
function ot(n) {
  return n === !0 || n === 1 || n === "1" || n === "true";
}
class ue {
  constructor(e = {}) {
    le(this, "baseUrl");
    le(this, "tokens");
    le(this, "doFetch");
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
    const c = () => {
      const h = {
        "Content-Type": "application/json"
      }, _ = this.tokens.getAccessToken();
      _ && (h.Authorization = `Bearer ${_}`);
      const u = { method: e, headers: h, credentials: "same-origin" };
      return l !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (u.body = JSON.stringify(l)), u;
    }, m = `${this.baseUrl}${s}`;
    let i = await this.doFetch(m, c());
    return i.status === 401 && await this.refreshToken() && (i = await this.doFetch(m, c())), this.handleResponse(i);
  }
  async handleResponse(e) {
    const c = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const m = this.extractError(c);
      throw new st(m, e.status, c);
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
    return { ...e, is_admin: ot(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const O = new ue(), Me = Ce("media", () => {
  const n = g([]), e = g(0), s = g(!1), l = g(null), c = g(""), m = g([]), i = g(void 0), h = g(void 0), _ = g([]), u = g([]), r = g("name"), p = g("asc"), y = g(24), v = g(0), f = L(() => v.value + n.value.length < e.value), d = L(() => {
    const B = {};
    return c.value && (B.search = c.value), m.value.length && (B.genres = m.value), i.value !== void 0 && (B.yearFrom = i.value), h.value !== void 0 && (B.yearTo = h.value), _.value.length && (B.ratings = _.value), u.value.length && (B.types = u.value), B.sort = r.value, B.order = p.value, B.limit = y.value, B.offset = v.value, B;
  }), I = L(() => {
    const B = /* @__PURE__ */ new Set();
    return n.value.forEach((R) => {
      var j;
      return (j = R.genres) == null ? void 0 : j.forEach((ne) => B.add(ne));
    }), Array.from(B).sort();
  }), x = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], F = ["movie", "series", "episode", "audio", "image"];
  function N(B) {
    var ne, W, ye;
    const R = new URLSearchParams(), j = d.value;
    return j.search && R.set("search", j.search), (ne = j.genres) == null || ne.forEach((oe) => R.append("genres", oe)), j.yearFrom !== void 0 && R.set("yearFrom", String(j.yearFrom)), j.yearTo !== void 0 && R.set("yearTo", String(j.yearTo)), (W = j.ratings) == null || W.forEach((oe) => R.append("ratings", oe)), (ye = j.types) == null || ye.forEach((oe) => R.append("types", oe)), j.sort && R.set("sort", j.sort), j.order && R.set("order", j.order), R.set("limit", String(j.limit)), R.set("offset", String(j.offset)), `${B}/api/v1/media?${R.toString()}`;
  }
  async function H(B, R = !1) {
    s.value = !0, l.value = null;
    try {
      const j = new ue({ baseUrl: B }), ne = N(B), W = await j.get(ne);
      R ? n.value = [...n.value, ...W.items] : n.value = W.items, e.value = W.total, v.value = (W.offset ?? 0) + W.items.length;
    } catch (j) {
      l.value = j instanceof Error ? j.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function A(B) {
    await H(B, !0);
  }
  function T() {
    n.value = [], e.value = 0, v.value = 0, l.value = null;
  }
  function k(B) {
    c.value = B, v.value = 0;
  }
  function w(B) {
    m.value = B, v.value = 0;
  }
  function M(B, R) {
    i.value = B, h.value = R, v.value = 0;
  }
  function V(B) {
    _.value = B, v.value = 0;
  }
  function J(B) {
    u.value = B, v.value = 0;
  }
  function ve(B, R) {
    r.value = B, R && (p.value = R), v.value = 0;
  }
  return {
    items: n,
    total: e,
    loading: s,
    error: l,
    search: c,
    selectedGenres: m,
    yearFrom: i,
    yearTo: h,
    selectedRatings: _,
    selectedTypes: u,
    sort: r,
    order: p,
    limit: y,
    offset: v,
    hasMore: f,
    queryParams: d,
    availableGenres: I,
    availableRatings: x,
    availableTypes: F,
    fetchMedia: H,
    loadMore: A,
    reset: T,
    setSearch: k,
    setGenres: w,
    setYearRange: M,
    setRatings: V,
    setTypes: J,
    setSort: ve
  };
}), at = { class: "media-card" }, lt = ["href"], rt = { class: "card-poster" }, it = ["src", "alt"], ct = {
  key: 1,
  class: "poster-placeholder"
}, dt = { class: "placeholder-type" }, ut = { class: "card-overlay" }, vt = {
  key: 0,
  class: "card-year"
}, ht = {
  key: 1,
  class: "card-rating"
}, mt = { class: "card-info" }, pt = ["title"], ft = {
  key: 0,
  class: "card-genres"
}, gt = /* @__PURE__ */ P({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(n) {
    return (e, s) => {
      var l;
      return o(), a("article", at, [
        t("a", {
          href: n.to ?? `/app/player/${n.item.id}`,
          class: "card-link"
        }, [
          t("div", rt, [
            n.item.poster_url ? (o(), a("img", {
              key: 0,
              src: n.item.poster_url,
              alt: n.item.name,
              loading: "lazy"
            }, null, 8, it)) : (o(), a("div", ct, [
              s[0] || (s[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", dt, b(n.item.type), 1)
            ]))
          ]),
          t("div", ut, [
            n.item.year ? (o(), a("span", vt, b(n.item.year), 1)) : S("", !0),
            n.item.rating ? (o(), a("span", ht, b(n.item.rating), 1)) : S("", !0)
          ]),
          t("div", mt, [
            t("h3", {
              class: "card-title",
              title: n.item.name
            }, b(n.item.name), 9, pt),
            (l = n.item.genres) != null && l.length ? (o(), a("p", ft, b(n.item.genres.slice(0, 2).join(", ")), 1)) : S("", !0)
          ])
        ], 8, lt)
      ]);
    };
  }
}), _t = /* @__PURE__ */ E(gt, [["__scopeId", "data-v-e60c8481"]]), bt = { class: "media-grid-container" }, kt = {
  key: 0,
  class: "media-grid-skeleton"
}, yt = {
  key: 1,
  class: "media-grid-empty"
}, wt = {
  key: 2,
  class: "media-grid"
}, $t = /* @__PURE__ */ P({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(n) {
    return (e, s) => (o(), a("div", bt, [
      n.loading ? (o(), a("div", kt, [
        (o(), a(D, null, z(12, (l) => t("div", {
          key: l,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : n.items.length === 0 ? (o(), a("div", yt, [...s[1] || (s[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (o(), a("div", wt, [
        (o(!0), a(D, null, z(n.items, (l) => (o(), Y(_t, {
          key: l.id,
          item: l
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), xt = /* @__PURE__ */ E($t, [["__scopeId", "data-v-b7e87216"]]), Ct = { class: "filter-bar" }, It = { class: "filter-search" }, Mt = { class: "filter-row" }, St = { class: "filter-group" }, Bt = ["value"], Tt = ["value"], Pt = ["value"], Et = { class: "filter-group" }, Lt = ["value"], Vt = ["value"], jt = ["value"], At = ["value"], Rt = { class: "filter-section" }, Ft = { class: "filter-chips" }, Dt = ["onClick"], Ut = { class: "filter-section" }, zt = { class: "filter-chips" }, Nt = ["onClick"], qt = { class: "filter-section" }, Ht = { class: "filter-chips" }, Gt = ["onClick"], Ot = { class: "filter-actions" }, Kt = { class: "result-count" }, Yt = /* @__PURE__ */ P({
  __name: "FilterBar",
  setup(n) {
    const e = Me(), s = g(e.search), l = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function c() {
      e.setSearch(s.value);
    }
    function m(v) {
      const f = e.selectedGenres;
      f.includes(v) ? e.setGenres(f.filter((d) => d !== v)) : e.setGenres([...f, v]);
    }
    function i(v) {
      const f = e.selectedRatings;
      f.includes(v) ? e.setRatings(f.filter((d) => d !== v)) : e.setRatings([...f, v]);
    }
    function h(v) {
      const f = e.selectedTypes;
      f.includes(v) ? e.setTypes(f.filter((d) => d !== v)) : e.setTypes([...f, v]);
    }
    function _(v) {
      const f = v.target;
      e.setSort(f.value);
    }
    function u(v) {
      const f = v.target;
      e.order = f.value;
    }
    const r = (/* @__PURE__ */ new Date()).getFullYear(), p = L(() => {
      const v = [];
      for (let f = r; f >= 1900; f--)
        v.push(f);
      return v;
    });
    function y() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (v, f) => (o(), a("div", Ct, [
      t("div", It, [
        K(t("input", {
          "onUpdate:modelValue": f[0] || (f[0] = (d) => s.value = d),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: c
        }, null, 544), [
          [ie, s.value]
        ])
      ]),
      t("div", Mt, [
        t("div", St, [
          f[4] || (f[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: C(e).sort,
            onChange: _
          }, [
            (o(), a(D, null, z(l, (d) => t("option", {
              key: d.value,
              value: d.value
            }, b(d.label), 9, Tt)), 64))
          ], 40, Bt),
          t("select", {
            class: "filter-select order-select",
            value: C(e).order,
            onChange: u
          }, [...f[3] || (f[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, Pt)
        ]),
        t("div", Et, [
          f[7] || (f[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: C(e).yearFrom ?? "",
            onChange: f[1] || (f[1] = (d) => C(e).setYearRange(
              d.target.value ? Number(d.target.value) : void 0,
              C(e).yearTo
            ))
          }, [
            f[5] || (f[5] = t("option", { value: "" }, "From", -1)),
            (o(!0), a(D, null, z(p.value.slice(0, 50), (d) => (o(), a("option", {
              key: d,
              value: d
            }, b(d), 9, Vt))), 128))
          ], 40, Lt),
          t("select", {
            class: "filter-select",
            value: C(e).yearTo ?? "",
            onChange: f[2] || (f[2] = (d) => C(e).setYearRange(
              C(e).yearFrom,
              d.target.value ? Number(d.target.value) : void 0
            ))
          }, [
            f[6] || (f[6] = t("option", { value: "" }, "To", -1)),
            (o(!0), a(D, null, z(p.value.slice(0, 50), (d) => (o(), a("option", {
              key: d,
              value: d
            }, b(d), 9, At))), 128))
          ], 40, jt)
        ])
      ]),
      t("div", Rt, [
        f[8] || (f[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", Ft, [
          (o(!0), a(D, null, z(C(e).availableGenres, (d) => (o(), a("button", {
            key: d,
            class: U(["chip", { active: C(e).selectedGenres.includes(d) }]),
            onClick: (I) => m(d)
          }, b(d), 11, Dt))), 128))
        ])
      ]),
      t("div", Ut, [
        f[9] || (f[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", zt, [
          (o(!0), a(D, null, z(C(e).availableRatings, (d) => (o(), a("button", {
            key: d,
            class: U(["chip", { active: C(e).selectedRatings.includes(d) }]),
            onClick: (I) => i(d)
          }, b(d), 11, Nt))), 128))
        ])
      ]),
      t("div", qt, [
        f[10] || (f[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Ht, [
          (o(!0), a(D, null, z(C(e).availableTypes, (d) => (o(), a("button", {
            key: d,
            class: U(["chip", { active: C(e).selectedTypes.includes(d) }]),
            onClick: (I) => h(d)
          }, b(d), 11, Gt))), 128))
        ])
      ]),
      t("div", Ot, [
        t("button", {
          class: "clear-btn",
          onClick: y
        }, "Clear filters"),
        t("span", Kt, b(C(e).total) + " result" + b(C(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Xt = /* @__PURE__ */ E(Yt, [["__scopeId", "data-v-7089ec0b"]]), Jt = { class: "browse-page" }, Wt = { class: "browse-header" }, Qt = { class: "browse-toolbar-extra" }, Zt = {
  key: 0,
  class: "browse-error"
}, en = {
  key: 1,
  class: "load-more"
}, tn = {
  key: 2,
  class: "loading-more"
}, nn = /* @__PURE__ */ P({
  __name: "BrowsePage",
  setup(n) {
    const e = ge("apiBase") ?? L(() => ""), s = Me();
    function l() {
      s.reset(), s.fetchMedia(e.value);
    }
    Z(l), ce(e, l);
    function c() {
      s.reset(), s.fetchMedia(e.value);
    }
    function m() {
      s.loadMore(e.value);
    }
    return (i, h) => (o(), a("div", Jt, [
      t("div", Wt, [
        h[0] || (h[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", Qt, [
          Q(i.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      q(Xt, { onChange: c }),
      C(s).error ? (o(), a("div", Zt, [
        t("p", null, b(C(s).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: l
        }, "Retry")
      ])) : S("", !0),
      q(xt, {
        items: C(s).items,
        loading: C(s).loading && C(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      C(s).hasMore && !C(s).loading ? (o(), a("div", en, [
        t("button", {
          class: "load-more-btn",
          onClick: m
        }, "Load more")
      ])) : S("", !0),
      C(s).loading && C(s).items.length > 0 ? (o(), a("div", tn, " Loading... ")) : S("", !0)
    ]));
  }
}), sn = /* @__PURE__ */ E(nn, [["__scopeId", "data-v-c192afa6"]]), on = ["src", "poster"], an = { class: "controls-top" }, ln = { class: "media-title" }, rn = {
  key: 0,
  class: "media-year"
}, cn = { class: "controls-center" }, dn = { class: "controls-bottom" }, un = { class: "progress-track" }, vn = { class: "controls-row" }, hn = { class: "time-display" }, mn = { class: "volume-control" }, pn = ["value"], fn = { class: "speed-control" }, gn = ["value"], _n = { class: "time-display" }, bn = /* @__PURE__ */ P({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(n) {
    const e = g(null), s = g(!1), l = g(0), c = g(0), m = g(1), i = g(!1), h = g(1), _ = g(!1), u = g(!0);
    let r = null;
    const p = L(
      () => c.value > 0 ? l.value / c.value * 100 : 0
    );
    function y(T) {
      if (!isFinite(T) || isNaN(T)) return "0:00";
      const k = Math.floor(T / 60), w = Math.floor(T % 60);
      return `${k}:${w.toString().padStart(2, "0")}`;
    }
    function v() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function f() {
      e.value && (l.value = e.value.currentTime);
    }
    function d() {
      e.value && (c.value = e.value.duration);
    }
    function I(T) {
      const w = T.currentTarget.getBoundingClientRect(), M = (T.clientX - w.left) / w.width;
      e.value && (e.value.currentTime = M * c.value);
    }
    function x(T) {
      const k = parseFloat(T.target.value);
      m.value = k, e.value && (e.value.volume = k), i.value = k === 0;
    }
    function F() {
      i.value = !i.value, e.value && (e.value.muted = i.value);
    }
    function N(T) {
      h.value = T, e.value && (e.value.playbackRate = T);
    }
    function H() {
      var k;
      const T = (k = e.value) == null ? void 0 : k.closest(".player-container");
      T && (document.fullscreenElement ? (document.exitFullscreen(), _.value = !1) : (T.requestFullscreen(), _.value = !0));
    }
    function A() {
      u.value = !0, r && clearTimeout(r), r = setTimeout(() => {
        s.value && (u.value = !1);
      }, 3e3);
    }
    return Pe(() => {
      r && clearTimeout(r);
    }), (T, k) => (o(), a("div", {
      class: U(["player-container", { "controls-hidden": !u.value && s.value }]),
      onMousemove: A,
      onClick: v
    }, [
      k[6] || (k[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: n.streamUrl,
        poster: n.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: k[0] || (k[0] = (w) => s.value = !0),
        onPause: k[1] || (k[1] = (w) => s.value = !1),
        onTimeupdate: f,
        onLoadedmetadata: d,
        onClick: ae(v, ["stop"])
      }, null, 40, on),
      t("div", {
        class: "player-controls",
        onClick: k[4] || (k[4] = ae(() => {
        }, ["stop"]))
      }, [
        t("div", an, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: k[2] || (k[2] = (w) => T.$router.back())
          }, " ← Back "),
          t("span", ln, b(n.media.name), 1),
          n.media.year ? (o(), a("span", rn, b(n.media.year), 1)) : S("", !0)
        ]),
        t("div", cn, [
          t("button", {
            class: "play-btn",
            onClick: v
          }, b(s.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", dn, [
          t("div", {
            class: "progress-bar",
            onClick: I
          }, [
            t("div", un, [
              t("div", {
                class: "progress-fill",
                style: te({ width: p.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", vn, [
            t("span", hn, b(y(l.value)), 1),
            t("div", mn, [
              t("button", {
                class: "ctrl-btn",
                onClick: F
              }, b(i.value || m.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: i.value ? 0 : m.value,
                class: "volume-slider",
                onInput: x
              }, null, 40, pn)
            ]),
            t("div", fn, [
              t("select", {
                class: "speed-select",
                value: h.value,
                onChange: k[3] || (k[3] = (w) => N(Number(w.target.value)))
              }, [...k[5] || (k[5] = [
                Ee('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, gn)
            ]),
            t("span", _n, b(y(c.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: H
            }, b(_.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), kn = /* @__PURE__ */ E(bn, [["__scopeId", "data-v-7a51063f"]]), yn = { class: "player-page" }, wn = {
  key: 0,
  class: "player-loading"
}, $n = {
  key: 1,
  class: "player-error"
}, xn = /* @__PURE__ */ P({
  __name: "PlayerPage",
  setup(n) {
    const e = ge("apiBase", L(() => "")), s = Re(), l = g(null), c = g(""), m = g(!0), i = g(null);
    async function h() {
      const _ = s.params.id;
      if (!_) {
        i.value = "No media ID provided", m.value = !1;
        return;
      }
      try {
        const u = new ue({ baseUrl: e.value }), [r, p] = await Promise.all([
          u.get(`/api/v1/media/${_}`),
          u.get(`/api/v1/media/${_}/playback-info`).catch(() => null)
        ]);
        l.value = r, p != null && p.url ? c.value = p.url : c.value = `${e.value}/media/${_}/stream`;
      } catch (u) {
        i.value = u instanceof Error ? u.message : "Failed to load media";
      } finally {
        m.value = !1;
      }
    }
    return Z(h), (_, u) => (o(), a("div", yn, [
      m.value ? (o(), a("div", wn, "Loading...")) : i.value ? (o(), a("div", $n, [
        t("p", null, b(i.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: h
        }, "Retry")
      ])) : l.value ? (o(), Y(kn, {
        key: 2,
        media: l.value,
        "stream-url": c.value
      }, null, 8, ["media", "stream-url"])) : S("", !0)
    ]));
  }
}), Cn = /* @__PURE__ */ E(xn, [["__scopeId", "data-v-d9061b47"]]), he = "access_token", me = "refresh_token", pe = "user";
class In {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(he);
  }
  setAccessToken(e) {
    this.storage.setItem(he, e);
  }
  getRefreshToken() {
    return this.storage.getItem(me);
  }
  setRefreshToken(e) {
    this.storage.setItem(me, e);
  }
  getUser() {
    const e = this.storage.getItem(pe);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(pe, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(he), this.storage.removeItem(me), this.storage.removeItem(pe);
  }
}
const ke = Ce("auth", () => {
  const n = new In(), e = ge("apiBase", ""), s = new ue({ tokenStore: n, baseUrl: e }), l = g(null), c = g(!1), m = g(null), i = L(() => n.getAccessToken() !== null), h = L(() => {
    var y;
    return ((y = l.value) == null ? void 0 : y.is_admin) === !0;
  });
  async function _(y, v) {
    c.value = !0, m.value = null;
    try {
      const f = await s.post("/api/v1/auth/login", { email: y, password: v });
      return n.setAccessToken(f.access_token), n.setRefreshToken(f.refresh_token), await r(), !0;
    } catch (f) {
      return m.value = f instanceof Error ? f.message : "Login failed", !1;
    } finally {
      c.value = !1;
    }
  }
  async function u(y, v, f) {
    c.value = !0, m.value = null;
    try {
      const d = await s.post("/api/v1/auth/register", { email: y, username: v, password: f });
      return n.setAccessToken(d.access_token), n.setRefreshToken(d.refresh_token), await r(), !0;
    } catch (d) {
      return m.value = d instanceof Error ? d.message : "Registration failed", !1;
    } finally {
      c.value = !1;
    }
  }
  async function r() {
    if (i.value)
      try {
        l.value = await s.getCurrentUser();
      } catch {
        l.value = null, n.clear();
      }
  }
  function p() {
    n.clear(), l.value = null;
  }
  return {
    user: l,
    loading: c,
    error: m,
    isLoggedIn: i,
    isAdmin: h,
    client: s,
    login: _,
    signup: u,
    fetchUser: r,
    logout: p
  };
}), Mn = {
  key: 0,
  class: "form-error"
}, Sn = { class: "field" }, Bn = { class: "field" }, Tn = { class: "password-wrapper" }, Pn = ["type"], En = ["disabled"], Ln = { class: "form-footer" }, Vn = /* @__PURE__ */ P({
  __name: "LoginForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = ke(), c = Ie(), m = g(""), i = g(""), h = g(!1);
    async function _() {
      await l.login(m.value, i.value) && (s("success"), c.push("/app"));
    }
    return (u, r) => {
      const p = $e("router-link");
      return o(), a("form", {
        class: "login-form",
        onSubmit: ae(_, ["prevent"])
      }, [
        r[7] || (r[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        C(l).error ? (o(), a("div", Mn, b(C(l).error), 1)) : S("", !0),
        t("div", Sn, [
          r[3] || (r[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          K(t("input", {
            id: "email",
            "onUpdate:modelValue": r[0] || (r[0] = (y) => m.value = y),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [ie, m.value]
          ])
        ]),
        t("div", Bn, [
          r[4] || (r[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Tn, [
            K(t("input", {
              id: "password",
              "onUpdate:modelValue": r[1] || (r[1] = (y) => i.value = y),
              type: h.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, Pn), [
              [fe, i.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: r[2] || (r[2] = (y) => h.value = !h.value)
            }, b(h.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(l).loading
        }, b(C(l).loading ? "Signing in..." : "Sign in"), 9, En),
        t("p", Ln, [
          r[6] || (r[6] = X(" Don't have an account? ", -1)),
          q(p, {
            to: "/app/signup",
            class: "link"
          }, {
            default: se(() => [...r[5] || (r[5] = [
              X("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), jn = /* @__PURE__ */ E(Vn, [["__scopeId", "data-v-22bc5576"]]), An = { class: "auth-page" }, Rn = { class: "auth-card" }, Fn = /* @__PURE__ */ P({
  __name: "LoginPage",
  setup(n) {
    return (e, s) => (o(), a("div", An, [
      t("div", Rn, [
        q(jn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Dn = /* @__PURE__ */ E(Fn, [["__scopeId", "data-v-9c53ce6a"]]), Un = {
  key: 0,
  class: "form-error"
}, zn = { class: "field" }, Nn = { class: "field" }, qn = { class: "field" }, Hn = { class: "password-wrapper" }, Gn = ["type"], On = { class: "field" }, Kn = ["type"], Yn = ["disabled"], Xn = { class: "form-footer" }, Jn = /* @__PURE__ */ P({
  __name: "SignupForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = ke(), c = Ie(), m = g(""), i = g(""), h = g(""), _ = g(""), u = g(!1), r = g(null);
    async function p() {
      if (r.value = null, h.value.length < 8) {
        r.value = "Password must be at least 8 characters.";
        return;
      }
      if (h.value !== _.value) {
        r.value = "Passwords do not match.";
        return;
      }
      await l.signup(m.value, i.value, h.value) && (s("success"), c.push("/app"));
    }
    return (y, v) => {
      const f = $e("router-link");
      return o(), a("form", {
        class: "signup-form",
        onSubmit: ae(p, ["prevent"])
      }, [
        v[11] || (v[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        C(l).error || r.value ? (o(), a("div", Un, b(C(l).error || r.value), 1)) : S("", !0),
        t("div", zn, [
          v[5] || (v[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          K(t("input", {
            id: "email",
            "onUpdate:modelValue": v[0] || (v[0] = (d) => m.value = d),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [ie, m.value]
          ])
        ]),
        t("div", Nn, [
          v[6] || (v[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          K(t("input", {
            id: "username",
            "onUpdate:modelValue": v[1] || (v[1] = (d) => i.value = d),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [ie, i.value]
          ])
        ]),
        t("div", qn, [
          v[7] || (v[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Hn, [
            K(t("input", {
              id: "password",
              "onUpdate:modelValue": v[2] || (v[2] = (d) => h.value = d),
              type: u.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, Gn), [
              [fe, h.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: v[3] || (v[3] = (d) => u.value = !u.value)
            }, b(u.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", On, [
          v[8] || (v[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          K(t("input", {
            id: "confirm",
            "onUpdate:modelValue": v[4] || (v[4] = (d) => _.value = d),
            type: u.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Kn), [
            [fe, _.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(l).loading
        }, b(C(l).loading ? "Creating account..." : "Create account"), 9, Yn),
        t("p", Xn, [
          v[10] || (v[10] = X(" Already have an account? ", -1)),
          q(f, {
            to: "/app/login",
            class: "link"
          }, {
            default: se(() => [...v[9] || (v[9] = [
              X("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Wn = /* @__PURE__ */ E(Jn, [["__scopeId", "data-v-d5e42c72"]]), Qn = { class: "auth-page" }, Zn = { class: "auth-card" }, es = /* @__PURE__ */ P({
  __name: "SignupPage",
  setup(n) {
    return (e, s) => (o(), a("div", Qn, [
      t("div", Zn, [
        q(Wn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), ts = /* @__PURE__ */ E(es, [["__scopeId", "data-v-609331e4"]]), ns = { class: "settings-form" }, ss = {
  key: 0,
  class: "settings-loading"
}, os = {
  key: 1,
  class: "settings-error"
}, as = { class: "group-title" }, ls = ["for"], rs = { class: "setting-control" }, is = ["id", "checked", "onChange"], cs = ["id", "value", "onChange"], ds = ["id", "value", "onChange"], us = { class: "settings-actions" }, vs = {
  key: 0,
  class: "success-msg"
}, hs = ["disabled"], ms = /* @__PURE__ */ P({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(n, { emit: e }) {
    const s = n, l = e, c = ke(), m = g({}), i = g(!0), h = g(!1), _ = g(null), u = g(null), r = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], p = L(
      () => s.groups ? r.filter((x) => s.groups.includes(x)) : r
    );
    async function y() {
      i.value = !0, _.value = null;
      try {
        const x = await c.client.get("/api/v1/users/me/settings");
        m.value = x;
      } catch (x) {
        _.value = x instanceof Error ? x.message : "Failed to load settings";
      } finally {
        i.value = !1;
      }
    }
    async function v() {
      h.value = !0, _.value = null, u.value = null;
      try {
        await c.client.put("/api/v1/users/me/settings", m.value), u.value = "Settings saved.", l("saved", m.value), setTimeout(() => {
          u.value = null;
        }, 3e3);
      } catch (x) {
        _.value = x instanceof Error ? x.message : "Failed to save settings";
      } finally {
        h.value = !1;
      }
    }
    function f(x, F) {
      m.value[x] = F;
    }
    Z(y);
    const d = {
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
    return (x, F) => (o(), a("div", ns, [
      i.value ? (o(), a("div", ss, "Loading settings...")) : _.value ? (o(), a("div", os, b(_.value), 1)) : (o(), a(D, { key: 2 }, [
        (o(!0), a(D, null, z(p.value, (N) => (o(), a("div", {
          key: N,
          class: "settings-group"
        }, [
          t("h3", as, b(d[N]), 1),
          (o(), a(D, null, z(I, (H, A) => K(t("div", {
            key: A,
            class: "setting-row"
          }, [
            t("label", {
              for: A,
              class: "setting-label"
            }, b(H.label), 9, ls),
            t("div", rs, [
              H.type === "bool" ? (o(), a("input", {
                key: 0,
                id: A,
                type: "checkbox",
                class: "toggle",
                checked: !!m.value[A],
                onChange: (T) => f(A, T.target.checked)
              }, null, 40, is)) : H.type === "number" ? (o(), a("input", {
                key: 1,
                id: A,
                type: "number",
                class: "input number-input",
                value: m.value[A],
                onChange: (T) => f(A, Number(T.target.value))
              }, null, 40, cs)) : (o(), a("input", {
                key: 2,
                id: A,
                type: "text",
                class: "input",
                value: m.value[A] ?? "",
                onChange: (T) => f(A, T.target.value)
              }, null, 40, ds))
            ])
          ]), [
            [_e, A.startsWith(N)]
          ])), 64))
        ]))), 128)),
        t("div", us, [
          u.value ? (o(), a("div", vs, b(u.value), 1)) : S("", !0),
          t("button", {
            class: "save-btn",
            disabled: h.value,
            onClick: v
          }, b(h.value ? "Saving..." : "Save settings"), 9, hs)
        ])
      ], 64))
    ]));
  }
}), ps = /* @__PURE__ */ E(ms, [["__scopeId", "data-v-51b588b6"]]), fs = { class: "settings-page" }, gs = /* @__PURE__ */ P({
  __name: "SettingsPage",
  setup(n) {
    return (e, s) => (o(), a("div", fs, [
      s[0] || (s[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      q(ps)
    ]));
  }
}), _s = /* @__PURE__ */ E(gs, [["__scopeId", "data-v-f9ca8a28"]]);
function bs() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function ks(n) {
  const e = n.routerBase || "/app", s = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: sn
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: Cn
    },
    {
      path: `${e}/login`,
      name: "login",
      component: Dn
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: ts
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: _s
    }
  ];
  return n.extraRoutes && s.push(...n.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: nt,
    props: { appName: n.app }
  }), s;
}
function Mi(n) {
  const e = {
    ...bs(),
    ...n
  }, s = je(), l = e.routerBase || "/app", c = Fe({
    history: De(l),
    routes: ks(e)
  }), m = Le(Qe);
  return m.provide("apiBase", e.apiBase), m.use(s), m.use(c), m;
}
const ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ws(n, e) {
  return o(), a("svg", ys, [...e[0] || (e[0] = [
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
const $s = $({ name: "lucide-play", render: ws }), xs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Cs(n, e) {
  return o(), a("svg", xs, [...e[0] || (e[0] = [
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
const Is = $({ name: "lucide-pause", render: Cs }), Ms = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ss(n, e) {
  return o(), a("svg", Ms, [...e[0] || (e[0] = [
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
const Bs = $({ name: "lucide-skip-back", render: Ss }), Ts = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ps(n, e) {
  return o(), a("svg", Ts, [...e[0] || (e[0] = [
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
const Es = $({ name: "lucide-skip-forward", render: Ps }), Ls = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vs(n, e) {
  return o(), a("svg", Ls, [...e[0] || (e[0] = [
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
const js = $({ name: "lucide-rotate-ccw", render: Vs }), As = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Rs(n, e) {
  return o(), a("svg", As, [...e[0] || (e[0] = [
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
const Fs = $({ name: "lucide-rotate-cw", render: Rs }), Ds = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Us(n, e) {
  return o(), a("svg", Ds, [...e[0] || (e[0] = [
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
const zs = $({ name: "lucide-volume-2", render: Us }), Ns = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qs(n, e) {
  return o(), a("svg", Ns, [...e[0] || (e[0] = [
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
const Hs = $({ name: "lucide-volume-1", render: qs }), Gs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Os(n, e) {
  return o(), a("svg", Gs, [...e[0] || (e[0] = [
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
const Ks = $({ name: "lucide-volume-x", render: Os }), Ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xs(n, e) {
  return o(), a("svg", Ys, [...e[0] || (e[0] = [
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
const Js = $({ name: "lucide-captions", render: Xs }), Ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qs(n, e) {
  return o(), a("svg", Ws, [...e[0] || (e[0] = [
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
const Zs = $({ name: "lucide-picture-in-picture-2", render: Qs }), eo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function to(n, e) {
  return o(), a("svg", eo, [...e[0] || (e[0] = [
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
const no = $({ name: "lucide-rectangle-horizontal", render: to }), so = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function oo(n, e) {
  return o(), a("svg", so, [...e[0] || (e[0] = [
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
const ao = $({ name: "lucide-maximize", render: oo }), lo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ro(n, e) {
  return o(), a("svg", lo, [...e[0] || (e[0] = [
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
const io = $({ name: "lucide-minimize", render: ro }), co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function uo(n, e) {
  return o(), a("svg", co, [...e[0] || (e[0] = [
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
const vo = $({ name: "lucide-maximize-2", render: uo }), ho = {
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
      d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
    }, null, -1)
  ])]);
}
const po = $({ name: "lucide-cast", render: mo }), fo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function go(n, e) {
  return o(), a("svg", fo, [...e[0] || (e[0] = [
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
const _o = $({ name: "lucide-settings", render: go }), bo = {
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
      d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
    }, null, -1)
  ])]);
}
const yo = $({ name: "lucide-gauge", render: ko }), wo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $o(n, e) {
  return o(), a("svg", wo, [...e[0] || (e[0] = [
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
const xo = $({ name: "lucide-film", render: $o }), Co = {
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
const Mo = $({ name: "lucide-image", render: Io }), So = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bo(n, e) {
  return o(), a("svg", So, [...e[0] || (e[0] = [
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
const To = $({ name: "lucide-music", render: Bo }), Po = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Eo(n, e) {
  return o(), a("svg", Po, [...e[0] || (e[0] = [
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
const Lo = $({ name: "lucide-tv", render: Eo }), Vo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function jo(n, e) {
  return o(), a("svg", Vo, [...e[0] || (e[0] = [
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
const Ao = $({ name: "lucide-search", render: jo }), Ro = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fo(n, e) {
  return o(), a("svg", Ro, [...e[0] || (e[0] = [
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
const Do = $({ name: "lucide-sliders-horizontal", render: Fo }), Uo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function zo(n, e) {
  return o(), a("svg", Uo, [...e[0] || (e[0] = [
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
const No = $({ name: "lucide-calendar", render: zo }), qo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ho(n, e) {
  return o(), a("svg", qo, [...e[0] || (e[0] = [
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
const Go = $({ name: "lucide-arrow-up-down", render: Ho }), Oo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ko(n, e) {
  return o(), a("svg", Oo, [...e[0] || (e[0] = [
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
const Yo = $({ name: "lucide-star", render: Ko }), Xo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Jo(n, e) {
  return o(), a("svg", Xo, [...e[0] || (e[0] = [
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
const Wo = $({ name: "lucide-list", render: Jo }), Qo = {
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
      d: "M5 12h14m-7-7v14"
    }, null, -1)
  ])]);
}
const ea = $({ name: "lucide-plus", render: Zo }), ta = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function na(n, e) {
  return o(), a("svg", ta, [...e[0] || (e[0] = [
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
const sa = $({ name: "lucide-info", render: na }), oa = {
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
      d: "M18 6L6 18M6 6l12 12"
    }, null, -1)
  ])]);
}
const la = $({ name: "lucide-x", render: aa }), ra = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ia(n, e) {
  return o(), a("svg", ra, [...e[0] || (e[0] = [
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
const ca = $({ name: "lucide-check", render: ia }), da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ua(n, e) {
  return o(), a("svg", da, [...e[0] || (e[0] = [
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
const va = $({ name: "lucide-bookmark", render: ua }), ha = {
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
      d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
    }, null, -1)
  ])]);
}
const pa = $({ name: "lucide-bookmark-plus", render: ma }), fa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ga(n, e) {
  return o(), a("svg", fa, [...e[0] || (e[0] = [
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
const _a = $({ name: "lucide-heart", render: ga }), ba = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ka(n, e) {
  return o(), a("svg", ba, [...e[0] || (e[0] = [
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
const ya = $({ name: "lucide-user", render: ka }), wa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $a(n, e) {
  return o(), a("svg", wa, [...e[0] || (e[0] = [
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
const xa = $({ name: "lucide-log-out", render: $a }), Ca = {
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
      d: "M4 5h16M4 12h16M4 19h16"
    }, null, -1)
  ])]);
}
const Ma = $({ name: "lucide-menu", render: Ia }), Sa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ba(n, e) {
  return o(), a("svg", Sa, [...e[0] || (e[0] = [
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
const Ta = $({ name: "lucide-more-horizontal", render: Ba }), Pa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ea(n, e) {
  return o(), a("svg", Pa, [...e[0] || (e[0] = [
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
const La = $({ name: "lucide-eye", render: Ea }), Va = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ja(n, e) {
  return o(), a("svg", Va, [...e[0] || (e[0] = [
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
const Aa = $({ name: "lucide-eye-off", render: ja }), Ra = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fa(n, e) {
  return o(), a("svg", Ra, [...e[0] || (e[0] = [
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
const Da = $({ name: "lucide-arrow-left", render: Fa }), Ua = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function za(n, e) {
  return o(), a("svg", Ua, [...e[0] || (e[0] = [
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
const Na = $({ name: "lucide-arrow-up", render: za }), qa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ha(n, e) {
  return o(), a("svg", qa, [...e[0] || (e[0] = [
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
const Ga = $({ name: "lucide-arrow-down", render: Ha }), Oa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ka(n, e) {
  return o(), a("svg", Oa, [...e[0] || (e[0] = [
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
const Ya = $({ name: "lucide-chevron-down", render: Ka }), Xa = {
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
      d: "m18 15l-6-6l-6 6"
    }, null, -1)
  ])]);
}
const Wa = $({ name: "lucide-chevron-up", render: Ja }), Qa = {
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
      d: "m15 18l-6-6l6-6"
    }, null, -1)
  ])]);
}
const el = $({ name: "lucide-chevron-left", render: Za }), tl = {
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
      d: "m9 18l6-6l-6-6"
    }, null, -1)
  ])]);
}
const sl = $({ name: "lucide-chevron-right", render: nl }), ol = {
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
      d: "M21 12a9 9 0 1 1-6.219-8.56"
    }, null, -1)
  ])]);
}
const ll = $({ name: "lucide-loader-circle", render: al }), rl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function il(n, e) {
  return o(), a("svg", rl, [...e[0] || (e[0] = [
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
const cl = $({ name: "lucide-circle-alert", render: il }), dl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ul(n, e) {
  return o(), a("svg", dl, [...e[0] || (e[0] = [
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
const vl = $({ name: "lucide-circle-check", render: ul }), hl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ml(n, e) {
  return o(), a("svg", hl, [...e[0] || (e[0] = [
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
const pl = $({ name: "lucide-circle-x", render: ml }), fl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gl(n, e) {
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
        r: "4"
      }),
      t("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
    ], -1)
  ])]);
}
const _l = $({ name: "lucide-sun", render: gl }), bl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function kl(n, e) {
  return o(), a("svg", bl, [...e[0] || (e[0] = [
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
const yl = $({ name: "lucide-moon", render: kl }), wl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $l(n, e) {
  return o(), a("svg", wl, [...e[0] || (e[0] = [
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
const xl = $({ name: "lucide-monitor", render: $l }), G = /* @__PURE__ */ P({
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
      play: $s,
      pause: Is,
      "skip-back": Bs,
      "skip-forward": Es,
      rewind: js,
      forward: Fs,
      volume: zs,
      "volume-low": Hs,
      mute: Ks,
      captions: Js,
      pip: Zs,
      theater: no,
      fullscreen: ao,
      "fullscreen-exit": io,
      expand: vo,
      cast: po,
      settings: _o,
      speed: yo,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: xo,
      image: Mo,
      music: To,
      tv: Lo,
      search: Ao,
      filter: Do,
      calendar: No,
      sort: Go,
      star: Yo,
      list: Wo,
      // actions
      plus: ea,
      info: sa,
      x: la,
      check: ca,
      bookmark: va,
      "bookmark-plus": pa,
      heart: _a,
      user: ya,
      "log-out": xa,
      menu: Ma,
      more: Ta,
      eye: La,
      "eye-off": Aa,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": Da,
      "arrow-up": Na,
      "arrow-down": Ga,
      "chevron-down": Ya,
      "chevron-up": Wa,
      "chevron-left": el,
      "chevron-right": sl,
      // status / theme
      spinner: ll,
      alert: cl,
      success: vl,
      error: pl,
      sun: _l,
      moon: yl,
      monitor: xl
    }, s = n, l = L(() => e[s.name]), c = L(
      () => s.size === void 0 ? void 0 : typeof s.size == "number" ? `${s.size}px` : s.size
    );
    return (m, i) => (o(), Y(Ve(l.value), {
      class: "phlix-icon",
      style: te(c.value ? { fontSize: c.value } : void 0),
      "stroke-width": n.strokeWidth,
      role: n.label ? "img" : void 0,
      "aria-label": n.label,
      "aria-hidden": n.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), Cl = ["type", "disabled", "aria-busy"], Il = {
  key: 0,
  class: "phlix-btn__spinner"
}, Ml = { class: "phlix-btn__label" }, Sl = /* @__PURE__ */ P({
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
    const e = n, s = L(() => e.disabled || e.loading);
    return (l, c) => (o(), a("button", {
      type: n.type,
      class: U(["phlix-btn", [`phlix-btn--${n.variant}`, `phlix-btn--${n.size}`, { "phlix-btn--block": n.block, "is-loading": n.loading }]]),
      disabled: s.value,
      "aria-busy": n.loading || void 0
    }, [
      n.loading ? (o(), a("span", Il, [
        q(G, { name: "spinner" })
      ])) : S("", !0),
      n.leftIcon && !n.loading ? (o(), Y(G, {
        key: 1,
        name: n.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : S("", !0),
      t("span", Ml, [
        Q(l.$slots, "default", {}, void 0, !0)
      ]),
      n.rightIcon ? (o(), Y(G, {
        key: 2,
        name: n.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : S("", !0)
    ], 10, Cl));
  }
}), Si = /* @__PURE__ */ E(Sl, [["__scopeId", "data-v-8cdee95a"]]), Bl = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], Tl = /* @__PURE__ */ P({
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
    const e = n, s = L(() => e.disabled || e.loading);
    return (l, c) => (o(), a("button", {
      type: n.type,
      class: U(["phlix-iconbtn", [`phlix-iconbtn--${n.variant}`, `phlix-iconbtn--${n.size}`, { "is-pressed": n.pressed }]]),
      disabled: s.value,
      "aria-label": n.label,
      title: n.label,
      "aria-pressed": n.pressed === void 0 ? void 0 : n.pressed,
      "aria-busy": n.loading || void 0
    }, [
      q(G, {
        name: n.loading ? "spinner" : n.name,
        class: U({ "phlix-iconbtn__spin": n.loading })
      }, null, 8, ["name", "class"])
    ], 10, Bl));
  }
}), Bi = /* @__PURE__ */ E(Tl, [["__scopeId", "data-v-fc0cd545"]]), Pl = ["role", "aria-label"], El = /* @__PURE__ */ P({
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
      class: U(["phlix-badge", [`phlix-badge--${n.tone}`, `phlix-badge--${n.size}`, { "phlix-badge--mono": n.mono }]]),
      role: n.label ? "img" : void 0,
      "aria-label": n.label
    }, [
      n.icon ? (o(), Y(G, {
        key: 0,
        name: n.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : S("", !0),
      Q(e.$slots, "default", {}, void 0, !0)
    ], 10, Pl));
  }
}), Ti = /* @__PURE__ */ E(El, [["__scopeId", "data-v-8f8d0fd2"]]), Ll = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], Vl = /* @__PURE__ */ P({
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
    const s = n, l = e, c = g(null), m = g(!1), i = L(() => {
      const d = s.max - s.min || 1;
      return Math.min(100, Math.max(0, (s.modelValue - s.min) / d * 100));
    }), h = L(
      () => s.formatValue ? s.formatValue(s.modelValue) : String(s.modelValue)
    );
    function _(d) {
      const I = Math.min(s.max, Math.max(s.min, d)), x = Math.round((I - s.min) / s.step), F = s.min + x * s.step;
      return Math.round(F * 1e6) / 1e6;
    }
    function u(d, I = !1) {
      const x = _(d);
      x !== s.modelValue && (l("update:modelValue", x), I && l("change", x));
    }
    function r(d) {
      const I = c.value;
      if (!I) return s.modelValue;
      const x = I.getBoundingClientRect(), F = x.width ? (d - x.left) / x.width : 0;
      return s.min + F * (s.max - s.min);
    }
    function p(d) {
      var I, x;
      s.disabled || ((x = (I = d.currentTarget).setPointerCapture) == null || x.call(I, d.pointerId), m.value = !0, u(r(d.clientX)));
    }
    function y(d) {
      m.value && u(r(d.clientX));
    }
    function v(d) {
      var I, x;
      m.value && (m.value = !1, (x = (I = d.currentTarget).releasePointerCapture) == null || x.call(I, d.pointerId), l("change", s.modelValue));
    }
    function f(d) {
      if (s.disabled) return;
      const I = (s.max - s.min) / 10;
      let x = !0;
      switch (d.key) {
        case "ArrowRight":
        case "ArrowUp":
          u(s.modelValue + s.step, !0);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          u(s.modelValue - s.step, !0);
          break;
        case "PageUp":
          u(s.modelValue + I, !0);
          break;
        case "PageDown":
          u(s.modelValue - I, !0);
          break;
        case "Home":
          u(s.min, !0);
          break;
        case "End":
          u(s.max, !0);
          break;
        default:
          x = !1;
      }
      x && d.preventDefault();
    }
    return (d, I) => (o(), a("div", {
      class: U(["phlix-slider", { "is-disabled": n.disabled }]),
      role: "slider",
      tabindex: n.disabled ? -1 : 0,
      "aria-label": n.label,
      "aria-valuemin": n.min,
      "aria-valuemax": n.max,
      "aria-valuenow": n.modelValue,
      "aria-valuetext": h.value,
      "aria-disabled": n.disabled || void 0,
      "aria-orientation": "horizontal",
      onKeydown: f
    }, [
      t("div", {
        ref_key: "trackEl",
        ref: c,
        class: "phlix-slider__track",
        onPointerdown: p,
        onPointermove: y,
        onPointerup: v
      }, [
        t("div", {
          class: "phlix-slider__fill",
          style: te({ width: i.value + "%" })
        }, null, 4),
        t("div", {
          class: "phlix-slider__thumb",
          style: te({ left: i.value + "%" })
        }, null, 4)
      ], 544)
    ], 42, Ll));
  }
}), Pi = /* @__PURE__ */ E(Vl, [["__scopeId", "data-v-9ca92975"]]), jl = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], Al = ["id"], Rl = /* @__PURE__ */ P({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const s = n, l = e, c = be();
    function m() {
      s.disabled || l("update:modelValue", !s.modelValue);
    }
    return (i, h) => (o(), a("span", {
      class: U(["phlix-switch", { "is-disabled": n.disabled }])
    }, [
      t("button", {
        type: "button",
        role: "switch",
        class: U(["phlix-switch__control", { "is-on": n.modelValue }]),
        "aria-checked": n.modelValue,
        "aria-label": n.label ? void 0 : "Toggle",
        "aria-labelledby": n.label ? C(c) : void 0,
        disabled: n.disabled,
        onClick: m
      }, [...h[0] || (h[0] = [
        t("span", { class: "phlix-switch__thumb" }, null, -1)
      ])], 10, jl),
      n.label ? (o(), a("label", {
        key: 0,
        id: C(c),
        class: "phlix-switch__label",
        onClick: m
      }, b(n.label), 9, Al)) : S("", !0)
    ], 2));
  }
}), Ei = /* @__PURE__ */ E(Rl, [["__scopeId", "data-v-4631a106"]]), Fl = ["disabled", "aria-pressed"], Dl = { class: "phlix-chip__label" }, Ul = ["disabled", "aria-label"], zl = /* @__PURE__ */ P({
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
    const s = n, l = e;
    function c() {
      s.disabled || (s.selected !== void 0 && l("update:selected", !s.selected), l("click"));
    }
    return (m, i) => (o(), a("span", {
      class: U(["phlix-chip", [`phlix-chip--${n.size}`, { "is-selected": n.selected, "is-disabled": n.disabled }]])
    }, [
      t("button", {
        type: "button",
        class: "phlix-chip__main",
        disabled: n.disabled,
        "aria-pressed": n.selected === void 0 ? void 0 : n.selected,
        onClick: c
      }, [
        n.icon ? (o(), Y(G, {
          key: 0,
          name: n.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : S("", !0),
        t("span", Dl, [
          Q(m.$slots, "default", {}, void 0, !0)
        ])
      ], 8, Fl),
      n.removable ? (o(), a("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: n.disabled,
        "aria-label": n.removeLabel,
        onClick: i[0] || (i[0] = (h) => l("remove"))
      }, [
        q(G, { name: "x" })
      ], 8, Ul)) : S("", !0)
    ], 2));
  }
}), Li = /* @__PURE__ */ E(zl, [["__scopeId", "data-v-d6cd193e"]]);
function Se(n) {
  return n.map(
    (e) => typeof e == "object" ? e : { value: e, label: String(e) }
  );
}
function de(n, e, s) {
  var m;
  const l = n.length;
  if (l === 0) return -1;
  let c = e;
  for (let i = 0; i < l; i++)
    if (c = (c + s + l) % l, !((m = n[c]) != null && m.disabled)) return c;
  return e;
}
function re(n, e) {
  return e === "first" ? de(n, -1, 1) : de(n, 0, -1);
}
const Nl = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "disabled"], ql = ["id", "aria-label"], Hl = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], Gl = { class: "phlix-select__check" }, Ol = /* @__PURE__ */ P({
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
    const s = n, l = e, c = L(() => Se(s.options)), m = be(), i = g(!1), h = g(-1), _ = g(null), u = g(null);
    let r = "", p;
    const y = L(() => c.value.findIndex((k) => k.value === s.modelValue)), v = L(() => {
      var k;
      return ((k = c.value[y.value]) == null ? void 0 : k.label) ?? "";
    }), f = L(() => h.value >= 0 ? `${m}-opt-${h.value}` : void 0);
    function d() {
      s.disabled || i.value || (i.value = !0, h.value = y.value >= 0 ? y.value : re(c.value, "first"), ee(N));
    }
    function I() {
      i.value = !1;
    }
    function x(k) {
      var M, V;
      const w = c.value[k];
      !w || w.disabled || (w.value !== s.modelValue && (l("update:modelValue", w.value), l("change", w.value)), I(), (V = (M = _.value) == null ? void 0 : M.querySelector(".phlix-select__trigger")) == null || V.focus());
    }
    function F(k) {
      h.value = de(c.value, h.value, k), ee(N);
    }
    function N() {
      var w, M;
      const k = (w = u.value) == null ? void 0 : w.querySelector(".is-active");
      (M = k == null ? void 0 : k.scrollIntoView) == null || M.call(k, { block: "nearest" });
    }
    function H(k) {
      if (!s.disabled)
        switch (k.key) {
          case "ArrowDown":
            k.preventDefault(), i.value ? F(1) : d();
            break;
          case "ArrowUp":
            k.preventDefault(), i.value ? F(-1) : d();
            break;
          case "Home":
            i.value && (k.preventDefault(), h.value = re(c.value, "first"), ee(N));
            break;
          case "End":
            i.value && (k.preventDefault(), h.value = re(c.value, "last"), ee(N));
            break;
          case "Enter":
          case " ":
            k.preventDefault(), i.value && h.value >= 0 ? x(h.value) : d();
            break;
          case "Escape":
            i.value && (k.preventDefault(), I());
            break;
          case "Tab":
            I();
            break;
          default:
            k.key.length === 1 && !k.metaKey && !k.ctrlKey && !k.altKey && A(k.key);
        }
    }
    function A(k) {
      i.value || d(), r += k.toLowerCase(), clearTimeout(p), p = setTimeout(() => r = "", 600);
      const w = c.value.findIndex((M) => !M.disabled && M.label.toLowerCase().startsWith(r));
      w >= 0 && (h.value = w, ee(N));
    }
    function T(k) {
      i.value && _.value && !_.value.contains(k.target) && I();
    }
    return ce(i, (k) => {
      k ? document.addEventListener("pointerdown", T, !0) : document.removeEventListener("pointerdown", T, !0);
    }), xe(() => {
      document.removeEventListener("pointerdown", T, !0), clearTimeout(p);
    }), (k, w) => (o(), a("div", {
      ref_key: "rootEl",
      ref: _,
      class: U(["phlix-select", { "is-open": i.value, "is-disabled": n.disabled }])
    }, [
      t("button", {
        type: "button",
        class: "phlix-select__trigger",
        "aria-haspopup": "listbox",
        "aria-expanded": i.value,
        "aria-controls": i.value ? `${C(m)}-list` : void 0,
        "aria-activedescendant": i.value ? f.value : void 0,
        "aria-label": n.label,
        disabled: n.disabled,
        onClick: w[0] || (w[0] = (M) => i.value ? I() : d()),
        onKeydown: H
      }, [
        t("span", {
          class: U(["phlix-select__value", { "is-placeholder": y.value < 0 }])
        }, b(y.value >= 0 ? v.value : n.placeholder), 3),
        q(G, {
          name: "chevron-down",
          class: "phlix-select__caret"
        })
      ], 40, Nl),
      K(t("ul", {
        id: `${C(m)}-list`,
        ref_key: "listEl",
        ref: u,
        class: "phlix-select__list",
        role: "listbox",
        "aria-label": n.label
      }, [
        (o(!0), a(D, null, z(c.value, (M, V) => (o(), a("li", {
          id: `${C(m)}-opt-${V}`,
          key: M.value,
          class: U(["phlix-select__option", { "is-active": V === h.value, "is-disabled": M.disabled }]),
          role: "option",
          "aria-selected": M.value === n.modelValue,
          "aria-disabled": M.disabled || void 0,
          onClick: (J) => x(V),
          onPointermove: (J) => !M.disabled && (h.value = V)
        }, [
          t("span", Gl, [
            M.value === n.modelValue ? (o(), Y(G, {
              key: 0,
              name: "check"
            })) : S("", !0)
          ]),
          X(" " + b(M.label), 1)
        ], 42, Hl))), 128))
      ], 8, ql), [
        [_e, i.value]
      ])
    ], 2));
  }
}), Vi = /* @__PURE__ */ E(Ol, [["__scopeId", "data-v-db34d47a"]]), Kl = { class: "phlix-combobox__field" }, Yl = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "placeholder", "disabled", "value"], Xl = ["id", "aria-label"], Jl = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], Wl = { class: "phlix-combobox__check" }, Ql = {
  key: 0,
  class: "phlix-combobox__empty",
  role: "presentation"
}, Zl = /* @__PURE__ */ P({
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
    const s = n, l = e, c = L(() => Se(s.options)), m = be(), i = g(!1), h = g(-1), _ = g(""), u = g(!1), r = g(null), p = g(null), y = g(null), v = L(() => {
      var w;
      return ((w = c.value.find((M) => M.value === s.modelValue)) == null ? void 0 : w.label) ?? "";
    }), f = L(() => {
      if (!u.value || _.value.trim() === "") return c.value;
      const w = _.value.toLowerCase();
      return c.value.filter((M) => M.label.toLowerCase().includes(w));
    }), d = L(() => h.value >= 0 ? `${m}-opt-${h.value}` : void 0);
    ce(
      () => s.modelValue,
      () => {
        i.value || (_.value = v.value);
      },
      { immediate: !0 }
    );
    function I() {
      s.disabled || i.value || (i.value = !0, h.value = f.value.findIndex((w) => w.value === s.modelValue), h.value < 0 && (h.value = f.value.findIndex((w) => !w.disabled)), ee(H));
    }
    function x() {
      _.value = v.value, u.value = !1, i.value = !1;
    }
    function F(w) {
      var V;
      const M = f.value[w];
      !M || M.disabled || (M.value !== s.modelValue && (l("update:modelValue", M.value), l("change", M.value)), _.value = M.label, u.value = !1, i.value = !1, (V = p.value) == null || V.focus());
    }
    function N(w) {
      f.value.length !== 0 && (h.value = de(f.value, h.value, w), ee(H));
    }
    function H() {
      var w, M, V;
      (V = (M = (w = y.value) == null ? void 0 : w.querySelector(".is-active")) == null ? void 0 : M.scrollIntoView) == null || V.call(M, { block: "nearest" });
    }
    function A(w) {
      _.value = w.target.value, u.value = !0, i.value = !0, h.value = re(f.value, "first");
    }
    function T(w) {
      if (!s.disabled)
        switch (w.key) {
          case "ArrowDown":
            w.preventDefault(), i.value ? N(1) : I();
            break;
          case "ArrowUp":
            w.preventDefault(), i.value ? N(-1) : I();
            break;
          case "Enter":
            i.value && h.value >= 0 && (w.preventDefault(), F(h.value));
            break;
          case "Escape":
            i.value && (w.preventDefault(), x());
            break;
          case "Tab":
            i.value && x();
            break;
        }
    }
    function k(w) {
      i.value && r.value && !r.value.contains(w.target) && x();
    }
    return ce(i, (w) => {
      w ? document.addEventListener("pointerdown", k, !0) : document.removeEventListener("pointerdown", k, !0);
    }), xe(() => document.removeEventListener("pointerdown", k, !0)), (w, M) => (o(), a("div", {
      ref_key: "rootEl",
      ref: r,
      class: U(["phlix-combobox", { "is-open": i.value, "is-disabled": n.disabled }])
    }, [
      t("div", Kl, [
        q(G, {
          name: "search",
          class: "phlix-combobox__search"
        }),
        t("input", {
          ref_key: "inputEl",
          ref: p,
          class: "phlix-combobox__input",
          type: "text",
          role: "combobox",
          autocomplete: "off",
          "aria-autocomplete": "list",
          "aria-expanded": i.value,
          "aria-controls": i.value ? `${C(m)}-list` : void 0,
          "aria-activedescendant": i.value ? d.value : void 0,
          "aria-label": n.label,
          placeholder: n.placeholder,
          disabled: n.disabled,
          value: _.value,
          onInput: A,
          onFocus: I,
          onKeydown: T
        }, null, 40, Yl),
        q(G, {
          name: "chevron-down",
          class: "phlix-combobox__caret"
        })
      ]),
      K(t("ul", {
        id: `${C(m)}-list`,
        ref_key: "listEl",
        ref: y,
        class: "phlix-combobox__list",
        role: "listbox",
        "aria-label": n.label
      }, [
        (o(!0), a(D, null, z(f.value, (V, J) => (o(), a("li", {
          id: `${C(m)}-opt-${J}`,
          key: V.value,
          class: U(["phlix-combobox__option", { "is-active": J === h.value, "is-disabled": V.disabled }]),
          role: "option",
          "aria-selected": V.value === n.modelValue,
          "aria-disabled": V.disabled || void 0,
          onClick: (ve) => F(J),
          onPointermove: (ve) => !V.disabled && (h.value = J)
        }, [
          t("span", Wl, [
            V.value === n.modelValue ? (o(), Y(G, {
              key: 0,
              name: "check"
            })) : S("", !0)
          ]),
          X(" " + b(V.label), 1)
        ], 42, Jl))), 128)),
        f.value.length === 0 ? (o(), a("li", Ql, "No matches")) : S("", !0)
      ], 8, Xl), [
        [_e, i.value]
      ])
    ], 2));
  }
}), ji = /* @__PURE__ */ E(Zl, [["__scopeId", "data-v-337aab6e"]]), er = { class: "library-scan-page" }, tr = {
  key: 0,
  class: "loading"
}, nr = {
  key: 1,
  class: "error"
}, sr = {
  key: 2,
  class: "libraries-list"
}, or = { class: "library-info" }, ar = { class: "library-name" }, lr = { class: "library-type" }, rr = { class: "library-paths" }, ir = { class: "library-meta" }, cr = { key: 0 }, dr = {
  key: 0,
  class: "scan-status"
}, ur = { class: "library-actions" }, vr = ["onClick", "disabled"], hr = ["onClick", "disabled"], mr = {
  key: 0,
  class: "empty-state"
}, pr = /* @__PURE__ */ P({
  __name: "LibraryScanPage",
  setup(n) {
    const e = g([]), s = g({}), l = g(!0), c = g(null);
    async function m() {
      try {
        const p = await O.get("/api/v1/libraries");
        e.value = p.libraries || [];
        for (const y of e.value)
          i(y.id);
      } catch (p) {
        c.value = p instanceof Error ? p.message : "Failed to load libraries";
      } finally {
        l.value = !1;
      }
    }
    async function i(p) {
      try {
        const y = await O.get(`/api/v1/libraries/${p}/scan-status`);
        y.job && (s.value[p] = y.job);
      } catch {
      }
    }
    async function h(p) {
      try {
        await O.post(`/api/v1/libraries/${p}/scan`), await i(p);
      } catch (y) {
        c.value = y instanceof Error ? y.message : "Failed to trigger scan";
      }
    }
    async function _(p) {
      try {
        await O.post(`/api/v1/libraries/${p}/rescan`), await i(p);
      } catch (y) {
        c.value = y instanceof Error ? y.message : "Failed to trigger rescan";
      }
    }
    function u(p) {
      return p ? new Date(p).toLocaleString() : "Never";
    }
    function r(p) {
      if (!p) return "";
      switch (p.status) {
        case "queued":
          return "⏳ Queued";
        case "running":
          return "🔄 Running";
        case "completed":
          return "✅ Completed";
        case "failed":
          return `❌ Failed: ${p.error || "Unknown error"}`;
        default:
          return p.status;
      }
    }
    return Z(() => {
      m();
    }), (p, y) => (o(), a("div", er, [
      y[0] || (y[0] = t("div", { class: "scan-header" }, [
        t("h1", { class: "scan-title" }, "Library Scanner"),
        t("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      l.value ? (o(), a("div", tr, "Loading libraries...")) : c.value ? (o(), a("div", nr, b(c.value), 1)) : (o(), a("div", sr, [
        (o(!0), a(D, null, z(e.value, (v) => {
          var f, d, I, x;
          return o(), a("div", {
            key: v.id,
            class: "library-card"
          }, [
            t("div", or, [
              t("h3", ar, b(v.name), 1),
              t("span", lr, b(v.type), 1),
              t("p", rr, b(v.paths.join(", ")), 1),
              t("div", ir, [
                v.item_count !== void 0 ? (o(), a("span", cr, b(v.item_count) + " items", 1)) : S("", !0),
                t("span", null, "Last scan: " + b(u(v.last_scan_at)), 1)
              ]),
              s.value[v.id] ? (o(), a("div", dr, b(r(s.value[v.id])), 1)) : S("", !0)
            ]),
            t("div", ur, [
              t("button", {
                class: "btn btn-scan",
                onClick: (F) => h(v.id),
                disabled: ((f = s.value[v.id]) == null ? void 0 : f.status) === "running" || ((d = s.value[v.id]) == null ? void 0 : d.status) === "queued"
              }, " Scan ", 8, vr),
              t("button", {
                class: "btn btn-rescan",
                onClick: (F) => _(v.id),
                disabled: ((I = s.value[v.id]) == null ? void 0 : I.status) === "running" || ((x = s.value[v.id]) == null ? void 0 : x.status) === "queued"
              }, " Rescan ", 8, hr)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (o(), a("div", mr, " No libraries configured. Add a library to get started. ")) : S("", !0)
      ]))
    ]));
  }
}), Ai = /* @__PURE__ */ E(pr, [["__scopeId", "data-v-62b3805e"]]), fr = { class: "my-servers-page" }, gr = {
  key: 0,
  class: "loading"
}, _r = {
  key: 1,
  class: "error"
}, br = {
  key: 2,
  class: "servers-list"
}, kr = { class: "server-info" }, yr = { class: "server-name" }, wr = { class: "server-url" }, $r = { class: "server-meta" }, xr = { key: 0 }, Cr = {
  key: 0,
  class: "empty-state"
}, Ir = /* @__PURE__ */ P({
  __name: "MyServersPage",
  setup(n) {
    const e = g([]), s = g(!0), l = g(null);
    async function c() {
      try {
        const h = await O.get("/api/v1/servers");
        e.value = h.servers || [];
      } catch (h) {
        l.value = h instanceof Error ? h.message : "Failed to load servers";
      } finally {
        s.value = !1;
      }
    }
    function m(h) {
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
    function i(h) {
      return h ? new Date(h).toLocaleString() : "Never";
    }
    return Z(() => {
      c();
    }), (h, _) => (o(), a("div", fr, [
      _[2] || (_[2] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "My Servers"),
        t("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      s.value ? (o(), a("div", gr, "Loading servers...")) : l.value ? (o(), a("div", _r, b(l.value), 1)) : (o(), a("div", br, [
        (o(!0), a(D, null, z(e.value, (u) => (o(), a("div", {
          key: u.id,
          class: "server-card"
        }, [
          t("div", {
            class: "server-status",
            style: te({ backgroundColor: m(u.status) })
          }, null, 4),
          t("div", kr, [
            t("h3", yr, b(u.name), 1),
            t("p", wr, b(u.url), 1),
            t("div", $r, [
              t("span", null, b(u.owner), 1),
              u.library_count !== void 0 ? (o(), a("span", xr, b(u.library_count) + " libraries", 1)) : S("", !0),
              t("span", null, "Last seen: " + b(i(u.last_seen)), 1)
            ])
          ]),
          _[0] || (_[0] = t("div", { class: "server-actions" }, [
            t("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", Cr, [..._[1] || (_[1] = [
          t("p", null, "No servers connected yet.", -1),
          t("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : S("", !0)
      ]))
    ]));
  }
}), Ri = /* @__PURE__ */ E(Ir, [["__scopeId", "data-v-b9237da4"]]), Mr = { class: "federation-page" }, Sr = {
  key: 0,
  class: "loading"
}, Br = {
  key: 1,
  class: "error"
}, Tr = {
  key: 2,
  class: "federation-content"
}, Pr = { class: "peers-section" }, Er = { class: "peers-list" }, Lr = { class: "peer-info" }, Vr = { class: "peer-name" }, jr = { class: "peer-url" }, Ar = { class: "peer-meta" }, Rr = { key: 0 }, Fr = { class: "peer-actions" }, Dr = ["onClick"], Ur = {
  key: 1,
  class: "status-badge"
}, zr = {
  key: 0,
  class: "empty-state"
}, Nr = { class: "add-peer-section" }, qr = /* @__PURE__ */ P({
  __name: "FederationPage",
  setup(n) {
    const e = g([]), s = g(!0), l = g(null);
    async function c() {
      try {
        const u = await O.get("/api/v1/federation/peers");
        e.value = u.peers || [];
      } catch (u) {
        l.value = u instanceof Error ? u.message : "Failed to load federation peers";
      } finally {
        s.value = !1;
      }
    }
    async function m(u) {
      try {
        await O.post("/api/v1/federation/connect", { url: u }), await c();
      } catch (r) {
        l.value = r instanceof Error ? r.message : "Failed to connect to peer";
      }
    }
    async function i(u) {
      try {
        await O.post(`/api/v1/federation/peers/${u}/disconnect`), await c();
      } catch (r) {
        l.value = r instanceof Error ? r.message : "Failed to disconnect peer";
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
    function _(u) {
      return u ? new Date(u).toLocaleString() : "Never";
    }
    return Z(() => {
      c();
    }), (u, r) => (o(), a("div", Mr, [
      r[5] || (r[5] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Federation"),
        t("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      s.value ? (o(), a("div", Sr, "Loading federation peers...")) : l.value ? (o(), a("div", Br, b(l.value), 1)) : (o(), a("div", Tr, [
        t("div", Pr, [
          r[2] || (r[2] = t("h2", { class: "section-title" }, "Connected Peers", -1)),
          t("div", Er, [
            (o(!0), a(D, null, z(e.value, (p) => (o(), a("div", {
              key: p.id,
              class: "peer-card"
            }, [
              t("div", {
                class: "peer-status",
                style: te({ backgroundColor: h(p.status) })
              }, null, 4),
              t("div", Lr, [
                t("h3", Vr, b(p.name), 1),
                t("p", jr, b(p.url), 1),
                t("div", Ar, [
                  p.shared_libraries_count !== void 0 ? (o(), a("span", Rr, b(p.shared_libraries_count) + " shared libraries", 1)) : S("", !0),
                  t("span", null, "Last sync: " + b(_(p.last_sync)), 1)
                ])
              ]),
              t("div", Fr, [
                p.status === "connected" ? (o(), a("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (y) => i(p.id)
                }, " Disconnect ", 8, Dr)) : p.status === "pending" ? (o(), a("span", Ur, "Pending")) : S("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (o(), a("div", zr, [...r[1] || (r[1] = [
              t("p", null, "No federation peers connected.", -1)
            ])])) : S("", !0)
          ])
        ]),
        t("div", Nr, [
          r[4] || (r[4] = t("h2", { class: "section-title" }, "Add Peer", -1)),
          t("form", {
            class: "add-peer-form",
            onSubmit: r[0] || (r[0] = ae((p) => m(""), ["prevent"]))
          }, [...r[3] || (r[3] = [
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
}), Fi = /* @__PURE__ */ E(qr, [["__scopeId", "data-v-91ba2781"]]), Hr = { class: "manage-shares-page" }, Gr = {
  key: 0,
  class: "loading"
}, Or = {
  key: 1,
  class: "error"
}, Kr = {
  key: 2,
  class: "shares-list"
}, Yr = { class: "share-info" }, Xr = { class: "share-library" }, Jr = { class: "share-meta" }, Wr = {
  key: 0,
  class: "expired-badge"
}, Qr = { class: "share-dates" }, Zr = { key: 0 }, ei = { class: "share-actions" }, ti = ["onClick"], ni = {
  key: 0,
  class: "empty-state"
}, si = /* @__PURE__ */ P({
  __name: "ManageSharesPage",
  setup(n) {
    const e = g([]), s = g(!0), l = g(null);
    async function c() {
      try {
        const _ = await O.get("/api/v1/shares");
        e.value = _.shares || [];
      } catch (_) {
        l.value = _ instanceof Error ? _.message : "Failed to load shares";
      } finally {
        s.value = !1;
      }
    }
    async function m(_) {
      try {
        await O.delete(`/api/v1/shares/${_}`), await c();
      } catch (u) {
        l.value = u instanceof Error ? u.message : "Failed to revoke share";
      }
    }
    function i(_) {
      return new Date(_).toLocaleString();
    }
    function h(_) {
      return _ ? new Date(_) < /* @__PURE__ */ new Date() : !1;
    }
    return Z(() => {
      c();
    }), (_, u) => (o(), a("div", Hr, [
      u[1] || (u[1] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Manage Shares"),
        t("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      s.value ? (o(), a("div", Gr, "Loading shares...")) : l.value ? (o(), a("div", Or, b(l.value), 1)) : (o(), a("div", Kr, [
        (o(!0), a(D, null, z(e.value, (r) => (o(), a("div", {
          key: r.id,
          class: "share-card"
        }, [
          t("div", Yr, [
            t("h3", Xr, b(r.library_name), 1),
            t("div", Jr, [
              t("span", null, "Shared with: " + b(r.shared_with), 1),
              t("span", {
                class: U(["permission-badge", r.permissions])
              }, b(r.permissions), 3),
              r.expires_at && h(r.expires_at) ? (o(), a("span", Wr, "Expired")) : S("", !0)
            ]),
            t("p", Qr, [
              X(" Created: " + b(i(r.created_at)) + " ", 1),
              r.expires_at ? (o(), a("span", Zr, " | Expires: " + b(i(r.expires_at)), 1)) : S("", !0)
            ])
          ]),
          t("div", ei, [
            t("button", {
              class: "btn btn-danger",
              onClick: (p) => m(r.id)
            }, "Revoke", 8, ti)
          ])
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", ni, [...u[0] || (u[0] = [
          t("p", null, "No library shares found.", -1)
        ])])) : S("", !0)
      ]))
    ]));
  }
}), Di = /* @__PURE__ */ E(si, [["__scopeId", "data-v-bd8771ac"]]), oi = { class: "audit-logs-page" }, ai = {
  key: 0,
  class: "loading"
}, li = {
  key: 1,
  class: "error"
}, ri = {
  key: 2,
  class: "logs-container"
}, ii = { class: "logs-list" }, ci = { class: "log-content" }, di = { class: "log-header" }, ui = { class: "log-action" }, vi = { class: "log-actor" }, hi = { class: "log-time" }, mi = {
  key: 0,
  class: "log-target"
}, pi = {
  key: 1,
  class: "log-details"
}, fi = {
  key: 2,
  class: "log-ip"
}, gi = {
  key: 0,
  class: "empty-state"
}, _i = {
  key: 0,
  class: "pagination"
}, bi = ["disabled"], ki = { class: "page-info" }, yi = ["disabled"], wi = /* @__PURE__ */ P({
  __name: "AuditLogsPage",
  setup(n) {
    const e = g([]), s = g(!0), l = g(null), c = g(1), m = g(1);
    async function i(r = 1) {
      try {
        s.value = !0;
        const p = await O.get(
          "/api/v1/audit-logs",
          { page: String(r) }
        );
        e.value = p.logs || [], c.value = p.page || 1, m.value = p.total_pages || 1;
      } catch (p) {
        l.value = p instanceof Error ? p.message : "Failed to load audit logs";
      } finally {
        s.value = !1;
      }
    }
    function h(r) {
      return new Date(r).toLocaleString();
    }
    function _(r) {
      return r.includes("create") || r.includes("add") ? "#22c55e" : r.includes("delete") || r.includes("remove") ? "#ef4444" : r.includes("update") || r.includes("edit") ? "#3b82f6" : r.includes("login") || r.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function u(r) {
      return r.includes("create") || r.includes("add") ? "+" : r.includes("delete") || r.includes("remove") ? "-" : r.includes("update") || r.includes("edit") ? "~" : r.includes("login") || r.includes("auth") ? "@" : "#";
    }
    return Z(() => {
      i();
    }), (r, p) => (o(), a("div", oi, [
      p[3] || (p[3] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Audit Logs"),
        t("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      s.value ? (o(), a("div", ai, "Loading audit logs...")) : l.value ? (o(), a("div", li, b(l.value), 1)) : (o(), a("div", ri, [
        t("div", ii, [
          (o(!0), a(D, null, z(e.value, (y) => (o(), a("div", {
            key: y.id,
            class: "log-entry"
          }, [
            t("div", {
              class: "log-icon",
              style: te({ backgroundColor: _(y.action) })
            }, b(u(y.action)), 5),
            t("div", ci, [
              t("div", di, [
                t("span", ui, b(y.action), 1),
                t("span", vi, b(y.actor), 1),
                t("span", hi, b(h(y.created_at)), 1)
              ]),
              y.target ? (o(), a("p", mi, "Target: " + b(y.target), 1)) : S("", !0),
              y.details ? (o(), a("p", pi, b(y.details), 1)) : S("", !0),
              y.ip_address ? (o(), a("span", fi, "IP: " + b(y.ip_address), 1)) : S("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (o(), a("div", gi, [...p[2] || (p[2] = [
            t("p", null, "No audit logs found.", -1)
          ])])) : S("", !0)
        ]),
        m.value > 1 ? (o(), a("div", _i, [
          t("button", {
            class: "btn btn-secondary",
            disabled: c.value <= 1,
            onClick: p[0] || (p[0] = (y) => i(c.value - 1))
          }, " Previous ", 8, bi),
          t("span", ki, "Page " + b(c.value) + " of " + b(m.value), 1),
          t("button", {
            class: "btn btn-secondary",
            disabled: c.value >= m.value,
            onClick: p[1] || (p[1] = (y) => i(c.value + 1))
          }, " Next ", 8, yi)
        ])) : S("", !0)
      ]))
    ]));
  }
}), Ui = /* @__PURE__ */ E(wi, [["__scopeId", "data-v-05910fd9"]]);
export {
  ue as ApiClient,
  st as ApiError,
  Xe as AppLayout,
  Ui as AuditLogsPage,
  Ti as Badge,
  sn as BrowsePage,
  Si as Button,
  Li as Chip,
  ji as Combobox,
  Fi as FederationPage,
  Xt as FilterBar,
  G as Icon,
  Bi as IconButton,
  Ai as LibraryScanPage,
  In as LocalStorageTokenStore,
  jn as LoginForm,
  Dn as LoginPage,
  Di as ManageSharesPage,
  _t as MediaCard,
  xt as MediaGrid,
  Ri as MyServersPage,
  Qe as PhlixApp,
  kn as Player,
  Cn as PlayerPage,
  Vi as Select,
  ps as SettingsForm,
  _s as SettingsPage,
  Wn as SignupForm,
  ts as SignupPage,
  Pi as Slider,
  Ei as Switch,
  Mi as createPhlixApp,
  ke as useAuthStore,
  Me as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
