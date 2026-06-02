var Re = Object.defineProperty;
var Fe = (t, e, s) => e in t ? Re(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var ue = (t, e, s) => Fe(t, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as o, createElementBlock as a, createElementVNode as n, renderSlot as z, defineComponent as M, createBlock as H, withCtx as Y, createVNode as A, unref as C, createTextVNode as X, toDisplayString as b, ref as g, computed as P, createCommentVNode as x, Fragment as F, renderList as D, withDirectives as Q, vModelText as he, normalizeClass as L, inject as ye, onMounted as Z, watch as oe, onUnmounted as De, withModifiers as ae, normalizeStyle as W, createStaticVNode as ze, resolveComponent as Te, vModelDynamic as ke, vShow as $e, createApp as Ue, markRaw as w, resolveDynamicComponent as Ee, useId as le, onBeforeUnmount as re, nextTick as ne, Teleport as we, Transition as me, withKeys as Ne, TransitionGroup as qe } from "vue";
import { defineStore as xe, createPinia as He } from "pinia";
import { RouterView as Ge, RouterLink as Me, useRoute as Ke, useRouter as Ve, createRouter as Oe, createWebHistory as Ye } from "vue-router";
const B = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, c] of e)
    s[i] = c;
  return s;
}, Xe = {}, Je = { class: "app-layout" }, We = { class: "app-header" }, Qe = { class: "header-inner" }, Ze = { class: "logo" }, et = { class: "nav" }, tt = { class: "app-main" }, nt = { class: "app-footer" };
function st(t, e) {
  return o(), a("div", Je, [
    n("header", We, [
      n("div", Qe, [
        n("div", Ze, [
          z(t.$slots, "logo", {}, () => [
            e[0] || (e[0] = n("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        n("nav", et, [
          z(t.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    n("main", tt, [
      z(t.$slots, "default", {}, void 0, !0)
    ]),
    n("footer", nt, [
      z(t.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const ot = /* @__PURE__ */ B(Xe, [["render", st], ["__scopeId", "data-v-9f6c6d16"]]), at = { class: "main-nav" }, lt = /* @__PURE__ */ M({
  __name: "PhlixApp",
  setup(t) {
    return (e, s) => (o(), H(ot, null, {
      nav: Y(() => [
        n("nav", at, [
          A(C(Me), {
            to: "/app",
            class: "nav-link"
          }, {
            default: Y(() => [...s[0] || (s[0] = [
              X("Browse", -1)
            ])]),
            _: 1
          }),
          A(C(Me), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: Y(() => [...s[1] || (s[1] = [
              X("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: Y(() => [
        A(C(Ge))
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ B(lt, [["__scopeId", "data-v-35b5e7c6"]]), rt = { class: "phlix-placeholder" }, ct = { class: "placeholder-content" }, dt = /* @__PURE__ */ M({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(t) {
    return (e, s) => (o(), a("div", rt, [
      n("div", ct, [
        s[0] || (s[0] = n("h1", null, "Shared UI loading...", -1)),
        n("p", null, "Phlix " + b(t.appName) + " is initializing", 1)
      ])
    ]));
  }
}), ut = /* @__PURE__ */ B(dt, [["__scopeId", "data-v-bf79ac4c"]]);
class vt extends Error {
  constructor(e, s, i = null) {
    super(e), this.status = s, this.body = i, this.name = "ApiError";
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
  async request(e, s, i = null) {
    const c = () => {
      const m = {
        "Content-Type": "application/json"
      }, _ = this.tokens.getAccessToken();
      _ && (m.Authorization = `Bearer ${_}`);
      const d = { method: e, headers: m, credentials: "same-origin" };
      return i !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (d.body = JSON.stringify(i)), d;
    }, u = `${this.baseUrl}${s}`;
    let r = await this.doFetch(u, c());
    return r.status === 401 && await this.refreshToken() && (r = await this.doFetch(u, c())), this.handleResponse(r);
  }
  async handleResponse(e) {
    const c = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const u = this.extractError(c);
      throw new vt(u, e.status, c);
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
const J = new pe(), Pe = xe("media", () => {
  const t = g([]), e = g(0), s = g(!1), i = g(null), c = g(""), u = g([]), r = g(void 0), m = g(void 0), _ = g([]), d = g([]), l = g("name"), p = g("asc"), k = g(24), v = g(0), f = P(() => v.value + t.value.length < e.value), h = P(() => {
    const E = {};
    return c.value && (E.search = c.value), u.value.length && (E.genres = u.value), r.value !== void 0 && (E.yearFrom = r.value), m.value !== void 0 && (E.yearTo = m.value), _.value.length && (E.ratings = _.value), d.value.length && (E.types = d.value), E.sort = l.value, E.order = p.value, E.limit = k.value, E.offset = v.value, E;
  }), S = P(() => {
    const E = /* @__PURE__ */ new Set();
    return t.value.forEach((N) => {
      var R;
      return (R = N.genres) == null ? void 0 : R.forEach((ie) => E.add(ie));
    }), Array.from(E).sort();
  }), I = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], q = ["movie", "series", "episode", "audio", "image"];
  function G(E) {
    var ie, te, Se;
    const N = new URLSearchParams(), R = h.value;
    return R.search && N.set("search", R.search), (ie = R.genres) == null || ie.forEach((ce) => N.append("genres", ce)), R.yearFrom !== void 0 && N.set("yearFrom", String(R.yearFrom)), R.yearTo !== void 0 && N.set("yearTo", String(R.yearTo)), (te = R.ratings) == null || te.forEach((ce) => N.append("ratings", ce)), (Se = R.types) == null || Se.forEach((ce) => N.append("types", ce)), R.sort && N.set("sort", R.sort), R.order && N.set("order", R.order), N.set("limit", String(R.limit)), N.set("offset", String(R.offset)), `${E}/api/v1/media?${N.toString()}`;
  }
  async function O(E, N = !1) {
    s.value = !0, i.value = null;
    try {
      const R = new pe({ baseUrl: E }), ie = G(E), te = await R.get(ie);
      N ? t.value = [...t.value, ...te.items] : t.value = te.items, e.value = te.total, v.value = (te.offset ?? 0) + te.items.length;
    } catch (R) {
      i.value = R instanceof Error ? R.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function U(E) {
    await O(E, !0);
  }
  function V() {
    t.value = [], e.value = 0, v.value = 0, i.value = null;
  }
  function y(E) {
    c.value = E, v.value = 0;
  }
  function $(E) {
    u.value = E, v.value = 0;
  }
  function T(E, N) {
    r.value = E, m.value = N, v.value = 0;
  }
  function j(E) {
    _.value = E, v.value = 0;
  }
  function ee(E) {
    d.value = E, v.value = 0;
  }
  function fe(E, N) {
    l.value = E, N && (p.value = N), v.value = 0;
  }
  return {
    items: t,
    total: e,
    loading: s,
    error: i,
    search: c,
    selectedGenres: u,
    yearFrom: r,
    yearTo: m,
    selectedRatings: _,
    selectedTypes: d,
    sort: l,
    order: p,
    limit: k,
    offset: v,
    hasMore: f,
    queryParams: h,
    availableGenres: S,
    availableRatings: I,
    availableTypes: q,
    fetchMedia: O,
    loadMore: U,
    reset: V,
    setSearch: y,
    setGenres: $,
    setYearRange: T,
    setRatings: j,
    setTypes: ee,
    setSort: fe
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
}, It = /* @__PURE__ */ M({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(t) {
    return (e, s) => {
      var i;
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
            }, null, 8, _t)) : (o(), a("div", gt, [
              s[0] || (s[0] = n("span", { class: "placeholder-icon" }, "🎬", -1)),
              n("span", bt, b(t.item.type), 1)
            ]))
          ]),
          n("div", kt, [
            t.item.year ? (o(), a("span", yt, b(t.item.year), 1)) : x("", !0),
            t.item.rating ? (o(), a("span", $t, b(t.item.rating), 1)) : x("", !0)
          ]),
          n("div", wt, [
            n("h3", {
              class: "card-title",
              title: t.item.name
            }, b(t.item.name), 9, xt),
            (i = t.item.genres) != null && i.length ? (o(), a("p", Ct, b(t.item.genres.slice(0, 2).join(", ")), 1)) : x("", !0)
          ])
        ], 8, pt)
      ]);
    };
  }
}), St = /* @__PURE__ */ B(It, [["__scopeId", "data-v-e60c8481"]]), Mt = { class: "media-grid-container" }, Bt = {
  key: 0,
  class: "media-grid-skeleton"
}, Tt = {
  key: 1,
  class: "media-grid-empty"
}, Et = {
  key: 2,
  class: "media-grid"
}, Vt = /* @__PURE__ */ M({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(t) {
    return (e, s) => (o(), a("div", Mt, [
      t.loading ? (o(), a("div", Bt, [
        (o(), a(F, null, D(12, (i) => n("div", {
          key: i,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          n("div", { class: "skeleton-poster" }, null, -1),
          n("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : t.items.length === 0 ? (o(), a("div", Tt, [...s[1] || (s[1] = [
        n("p", null, "No media found.", -1),
        n("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (o(), a("div", Et, [
        (o(!0), a(F, null, D(t.items, (i) => (o(), H(St, {
          key: i.id,
          item: i
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), Pt = /* @__PURE__ */ B(Vt, [["__scopeId", "data-v-b7e87216"]]), Lt = { class: "filter-bar" }, At = { class: "filter-search" }, jt = { class: "filter-row" }, Rt = { class: "filter-group" }, Ft = ["value"], Dt = ["value"], zt = ["value"], Ut = { class: "filter-group" }, Nt = ["value"], qt = ["value"], Ht = ["value"], Gt = ["value"], Kt = { class: "filter-section" }, Ot = { class: "filter-chips" }, Yt = ["onClick"], Xt = { class: "filter-section" }, Jt = { class: "filter-chips" }, Wt = ["onClick"], Qt = { class: "filter-section" }, Zt = { class: "filter-chips" }, en = ["onClick"], tn = { class: "filter-actions" }, nn = { class: "result-count" }, sn = /* @__PURE__ */ M({
  __name: "FilterBar",
  setup(t) {
    const e = Pe(), s = g(e.search), i = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function c() {
      e.setSearch(s.value);
    }
    function u(v) {
      const f = e.selectedGenres;
      f.includes(v) ? e.setGenres(f.filter((h) => h !== v)) : e.setGenres([...f, v]);
    }
    function r(v) {
      const f = e.selectedRatings;
      f.includes(v) ? e.setRatings(f.filter((h) => h !== v)) : e.setRatings([...f, v]);
    }
    function m(v) {
      const f = e.selectedTypes;
      f.includes(v) ? e.setTypes(f.filter((h) => h !== v)) : e.setTypes([...f, v]);
    }
    function _(v) {
      const f = v.target;
      e.setSort(f.value);
    }
    function d(v) {
      const f = v.target;
      e.order = f.value;
    }
    const l = (/* @__PURE__ */ new Date()).getFullYear(), p = P(() => {
      const v = [];
      for (let f = l; f >= 1900; f--)
        v.push(f);
      return v;
    });
    function k() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (v, f) => (o(), a("div", Lt, [
      n("div", At, [
        Q(n("input", {
          "onUpdate:modelValue": f[0] || (f[0] = (h) => s.value = h),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: c
        }, null, 544), [
          [he, s.value]
        ])
      ]),
      n("div", jt, [
        n("div", Rt, [
          f[4] || (f[4] = n("label", { class: "filter-label" }, "Sort", -1)),
          n("select", {
            class: "filter-select",
            value: C(e).sort,
            onChange: _
          }, [
            (o(), a(F, null, D(i, (h) => n("option", {
              key: h.value,
              value: h.value
            }, b(h.label), 9, Dt)), 64))
          ], 40, Ft),
          n("select", {
            class: "filter-select order-select",
            value: C(e).order,
            onChange: d
          }, [...f[3] || (f[3] = [
            n("option", { value: "asc" }, "↑", -1),
            n("option", { value: "desc" }, "↓", -1)
          ])], 40, zt)
        ]),
        n("div", Ut, [
          f[7] || (f[7] = n("label", { class: "filter-label" }, "Year", -1)),
          n("select", {
            class: "filter-select",
            value: C(e).yearFrom ?? "",
            onChange: f[1] || (f[1] = (h) => C(e).setYearRange(
              h.target.value ? Number(h.target.value) : void 0,
              C(e).yearTo
            ))
          }, [
            f[5] || (f[5] = n("option", { value: "" }, "From", -1)),
            (o(!0), a(F, null, D(p.value.slice(0, 50), (h) => (o(), a("option", {
              key: h,
              value: h
            }, b(h), 9, qt))), 128))
          ], 40, Nt),
          n("select", {
            class: "filter-select",
            value: C(e).yearTo ?? "",
            onChange: f[2] || (f[2] = (h) => C(e).setYearRange(
              C(e).yearFrom,
              h.target.value ? Number(h.target.value) : void 0
            ))
          }, [
            f[6] || (f[6] = n("option", { value: "" }, "To", -1)),
            (o(!0), a(F, null, D(p.value.slice(0, 50), (h) => (o(), a("option", {
              key: h,
              value: h
            }, b(h), 9, Gt))), 128))
          ], 40, Ht)
        ])
      ]),
      n("div", Kt, [
        f[8] || (f[8] = n("span", { class: "filter-label" }, "Genres", -1)),
        n("div", Ot, [
          (o(!0), a(F, null, D(C(e).availableGenres, (h) => (o(), a("button", {
            key: h,
            class: L(["chip", { active: C(e).selectedGenres.includes(h) }]),
            onClick: (S) => u(h)
          }, b(h), 11, Yt))), 128))
        ])
      ]),
      n("div", Xt, [
        f[9] || (f[9] = n("span", { class: "filter-label" }, "Rating", -1)),
        n("div", Jt, [
          (o(!0), a(F, null, D(C(e).availableRatings, (h) => (o(), a("button", {
            key: h,
            class: L(["chip", { active: C(e).selectedRatings.includes(h) }]),
            onClick: (S) => r(h)
          }, b(h), 11, Wt))), 128))
        ])
      ]),
      n("div", Qt, [
        f[10] || (f[10] = n("span", { class: "filter-label" }, "Type", -1)),
        n("div", Zt, [
          (o(!0), a(F, null, D(C(e).availableTypes, (h) => (o(), a("button", {
            key: h,
            class: L(["chip", { active: C(e).selectedTypes.includes(h) }]),
            onClick: (S) => m(h)
          }, b(h), 11, en))), 128))
        ])
      ]),
      n("div", tn, [
        n("button", {
          class: "clear-btn",
          onClick: k
        }, "Clear filters"),
        n("span", nn, b(C(e).total) + " result" + b(C(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), on = /* @__PURE__ */ B(sn, [["__scopeId", "data-v-7089ec0b"]]), an = { class: "browse-page" }, ln = { class: "browse-header" }, rn = { class: "browse-toolbar-extra" }, cn = {
  key: 0,
  class: "browse-error"
}, dn = {
  key: 1,
  class: "load-more"
}, un = {
  key: 2,
  class: "loading-more"
}, vn = /* @__PURE__ */ M({
  __name: "BrowsePage",
  setup(t) {
    const e = ye("apiBase") ?? P(() => ""), s = Pe();
    function i() {
      s.reset(), s.fetchMedia(e.value);
    }
    Z(i), oe(e, i);
    function c() {
      s.reset(), s.fetchMedia(e.value);
    }
    function u() {
      s.loadMore(e.value);
    }
    return (r, m) => (o(), a("div", an, [
      n("div", ln, [
        m[0] || (m[0] = n("h1", { class: "browse-title" }, "Browse Media", -1)),
        n("div", rn, [
          z(r.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      A(on, { onChange: c }),
      C(s).error ? (o(), a("div", cn, [
        n("p", null, b(C(s).error), 1),
        n("button", {
          class: "retry-btn",
          onClick: i
        }, "Retry")
      ])) : x("", !0),
      A(Pt, {
        items: C(s).items,
        loading: C(s).loading && C(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      C(s).hasMore && !C(s).loading ? (o(), a("div", dn, [
        n("button", {
          class: "load-more-btn",
          onClick: u
        }, "Load more")
      ])) : x("", !0),
      C(s).loading && C(s).items.length > 0 ? (o(), a("div", un, " Loading... ")) : x("", !0)
    ]));
  }
}), hn = /* @__PURE__ */ B(vn, [["__scopeId", "data-v-c192afa6"]]), mn = ["src", "poster"], pn = { class: "controls-top" }, fn = { class: "media-title" }, _n = {
  key: 0,
  class: "media-year"
}, gn = { class: "controls-center" }, bn = { class: "controls-bottom" }, kn = { class: "progress-track" }, yn = { class: "controls-row" }, $n = { class: "time-display" }, wn = { class: "volume-control" }, xn = ["value"], Cn = { class: "speed-control" }, In = ["value"], Sn = { class: "time-display" }, Mn = /* @__PURE__ */ M({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(t) {
    const e = g(null), s = g(!1), i = g(0), c = g(0), u = g(1), r = g(!1), m = g(1), _ = g(!1), d = g(!0);
    let l = null;
    const p = P(
      () => c.value > 0 ? i.value / c.value * 100 : 0
    );
    function k(V) {
      if (!isFinite(V) || isNaN(V)) return "0:00";
      const y = Math.floor(V / 60), $ = Math.floor(V % 60);
      return `${y}:${$.toString().padStart(2, "0")}`;
    }
    function v() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function f() {
      e.value && (i.value = e.value.currentTime);
    }
    function h() {
      e.value && (c.value = e.value.duration);
    }
    function S(V) {
      const $ = V.currentTarget.getBoundingClientRect(), T = (V.clientX - $.left) / $.width;
      e.value && (e.value.currentTime = T * c.value);
    }
    function I(V) {
      const y = parseFloat(V.target.value);
      u.value = y, e.value && (e.value.volume = y), r.value = y === 0;
    }
    function q() {
      r.value = !r.value, e.value && (e.value.muted = r.value);
    }
    function G(V) {
      m.value = V, e.value && (e.value.playbackRate = V);
    }
    function O() {
      var y;
      const V = (y = e.value) == null ? void 0 : y.closest(".player-container");
      V && (document.fullscreenElement ? (document.exitFullscreen(), _.value = !1) : (V.requestFullscreen(), _.value = !0));
    }
    function U() {
      d.value = !0, l && clearTimeout(l), l = setTimeout(() => {
        s.value && (d.value = !1);
      }, 3e3);
    }
    return De(() => {
      l && clearTimeout(l);
    }), (V, y) => (o(), a("div", {
      class: L(["player-container", { "controls-hidden": !d.value && s.value }]),
      onMousemove: U,
      onClick: v
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
        onTimeupdate: f,
        onLoadedmetadata: h,
        onClick: ae(v, ["stop"])
      }, null, 40, mn),
      n("div", {
        class: "player-controls",
        onClick: y[4] || (y[4] = ae(() => {
        }, ["stop"]))
      }, [
        n("div", pn, [
          n("button", {
            class: "ctrl-btn back-btn",
            onClick: y[2] || (y[2] = ($) => V.$router.back())
          }, " ← Back "),
          n("span", fn, b(t.media.name), 1),
          t.media.year ? (o(), a("span", _n, b(t.media.year), 1)) : x("", !0)
        ]),
        n("div", gn, [
          n("button", {
            class: "play-btn",
            onClick: v
          }, b(s.value ? "❚❚" : "▶"), 1)
        ]),
        n("div", bn, [
          n("div", {
            class: "progress-bar",
            onClick: S
          }, [
            n("div", kn, [
              n("div", {
                class: "progress-fill",
                style: W({ width: p.value + "%" })
              }, null, 4)
            ])
          ]),
          n("div", yn, [
            n("span", $n, b(k(i.value)), 1),
            n("div", wn, [
              n("button", {
                class: "ctrl-btn",
                onClick: q
              }, b(r.value || u.value === 0 ? "🔇" : "🔊"), 1),
              n("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: r.value ? 0 : u.value,
                class: "volume-slider",
                onInput: I
              }, null, 40, xn)
            ]),
            n("div", Cn, [
              n("select", {
                class: "speed-select",
                value: m.value,
                onChange: y[3] || (y[3] = ($) => G(Number($.target.value)))
              }, [...y[5] || (y[5] = [
                ze('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, In)
            ]),
            n("span", Sn, b(k(c.value)), 1),
            n("button", {
              class: "ctrl-btn",
              onClick: O
            }, b(_.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), Bn = /* @__PURE__ */ B(Mn, [["__scopeId", "data-v-7a51063f"]]), Tn = { class: "player-page" }, En = {
  key: 0,
  class: "player-loading"
}, Vn = {
  key: 1,
  class: "player-error"
}, Pn = /* @__PURE__ */ M({
  __name: "PlayerPage",
  setup(t) {
    const e = ye("apiBase", P(() => "")), s = Ke(), i = g(null), c = g(""), u = g(!0), r = g(null);
    async function m() {
      const _ = s.params.id;
      if (!_) {
        r.value = "No media ID provided", u.value = !1;
        return;
      }
      try {
        const d = new pe({ baseUrl: e.value }), [l, p] = await Promise.all([
          d.get(`/api/v1/media/${_}`),
          d.get(`/api/v1/media/${_}/playback-info`).catch(() => null)
        ]);
        i.value = l, p != null && p.url ? c.value = p.url : c.value = `${e.value}/media/${_}/stream`;
      } catch (d) {
        r.value = d instanceof Error ? d.message : "Failed to load media";
      } finally {
        u.value = !1;
      }
    }
    return Z(m), (_, d) => (o(), a("div", Tn, [
      u.value ? (o(), a("div", En, "Loading...")) : r.value ? (o(), a("div", Vn, [
        n("p", null, b(r.value), 1),
        n("button", {
          class: "retry-btn",
          onClick: m
        }, "Retry")
      ])) : i.value ? (o(), H(Bn, {
        key: 2,
        media: i.value,
        "stream-url": c.value
      }, null, 8, ["media", "stream-url"])) : x("", !0)
    ]));
  }
}), Ln = /* @__PURE__ */ B(Pn, [["__scopeId", "data-v-d9061b47"]]), _e = "access_token", ge = "refresh_token", be = "user";
class An {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(_e);
  }
  setAccessToken(e) {
    this.storage.setItem(_e, e);
  }
  getRefreshToken() {
    return this.storage.getItem(ge);
  }
  setRefreshToken(e) {
    this.storage.setItem(ge, e);
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
    this.storage.removeItem(_e), this.storage.removeItem(ge), this.storage.removeItem(be);
  }
}
const Ce = xe("auth", () => {
  const t = new An(), e = ye("apiBase", ""), s = new pe({ tokenStore: t, baseUrl: e }), i = g(null), c = g(!1), u = g(null), r = P(() => t.getAccessToken() !== null), m = P(() => {
    var k;
    return ((k = i.value) == null ? void 0 : k.is_admin) === !0;
  });
  async function _(k, v) {
    c.value = !0, u.value = null;
    try {
      const f = await s.post("/api/v1/auth/login", { email: k, password: v });
      return t.setAccessToken(f.access_token), t.setRefreshToken(f.refresh_token), await l(), !0;
    } catch (f) {
      return u.value = f instanceof Error ? f.message : "Login failed", !1;
    } finally {
      c.value = !1;
    }
  }
  async function d(k, v, f) {
    c.value = !0, u.value = null;
    try {
      const h = await s.post("/api/v1/auth/register", { email: k, username: v, password: f });
      return t.setAccessToken(h.access_token), t.setRefreshToken(h.refresh_token), await l(), !0;
    } catch (h) {
      return u.value = h instanceof Error ? h.message : "Registration failed", !1;
    } finally {
      c.value = !1;
    }
  }
  async function l() {
    if (r.value)
      try {
        i.value = await s.getCurrentUser();
      } catch {
        i.value = null, t.clear();
      }
  }
  function p() {
    t.clear(), i.value = null;
  }
  return {
    user: i,
    loading: c,
    error: u,
    isLoggedIn: r,
    isAdmin: m,
    client: s,
    login: _,
    signup: d,
    fetchUser: l,
    logout: p
  };
}), jn = {
  key: 0,
  class: "form-error"
}, Rn = { class: "field" }, Fn = { class: "field" }, Dn = { class: "password-wrapper" }, zn = ["type"], Un = ["disabled"], Nn = { class: "form-footer" }, qn = /* @__PURE__ */ M({
  __name: "LoginForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, i = Ce(), c = Ve(), u = g(""), r = g(""), m = g(!1);
    async function _() {
      await i.login(u.value, r.value) && (s("success"), c.push("/app"));
    }
    return (d, l) => {
      const p = Te("router-link");
      return o(), a("form", {
        class: "login-form",
        onSubmit: ae(_, ["prevent"])
      }, [
        l[7] || (l[7] = n("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        C(i).error ? (o(), a("div", jn, b(C(i).error), 1)) : x("", !0),
        n("div", Rn, [
          l[3] || (l[3] = n("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          Q(n("input", {
            id: "email",
            "onUpdate:modelValue": l[0] || (l[0] = (k) => u.value = k),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [he, u.value]
          ])
        ]),
        n("div", Fn, [
          l[4] || (l[4] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", Dn, [
            Q(n("input", {
              id: "password",
              "onUpdate:modelValue": l[1] || (l[1] = (k) => r.value = k),
              type: m.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, zn), [
              [ke, r.value]
            ]),
            n("button", {
              type: "button",
              class: "toggle-password",
              onClick: l[2] || (l[2] = (k) => m.value = !m.value)
            }, b(m.value ? "🙈" : "👁"), 1)
          ])
        ]),
        n("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(i).loading
        }, b(C(i).loading ? "Signing in..." : "Sign in"), 9, Un),
        n("p", Nn, [
          l[6] || (l[6] = X(" Don't have an account? ", -1)),
          A(p, {
            to: "/app/signup",
            class: "link"
          }, {
            default: Y(() => [...l[5] || (l[5] = [
              X("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Hn = /* @__PURE__ */ B(qn, [["__scopeId", "data-v-22bc5576"]]), Gn = { class: "auth-page" }, Kn = { class: "auth-card" }, On = /* @__PURE__ */ M({
  __name: "LoginPage",
  setup(t) {
    return (e, s) => (o(), a("div", Gn, [
      n("div", Kn, [
        A(Hn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Yn = /* @__PURE__ */ B(On, [["__scopeId", "data-v-9c53ce6a"]]), Xn = {
  key: 0,
  class: "form-error"
}, Jn = { class: "field" }, Wn = { class: "field" }, Qn = { class: "field" }, Zn = { class: "password-wrapper" }, es = ["type"], ts = { class: "field" }, ns = ["type"], ss = ["disabled"], os = { class: "form-footer" }, as = /* @__PURE__ */ M({
  __name: "SignupForm",
  emits: ["success"],
  setup(t, { emit: e }) {
    const s = e, i = Ce(), c = Ve(), u = g(""), r = g(""), m = g(""), _ = g(""), d = g(!1), l = g(null);
    async function p() {
      if (l.value = null, m.value.length < 8) {
        l.value = "Password must be at least 8 characters.";
        return;
      }
      if (m.value !== _.value) {
        l.value = "Passwords do not match.";
        return;
      }
      await i.signup(u.value, r.value, m.value) && (s("success"), c.push("/app"));
    }
    return (k, v) => {
      const f = Te("router-link");
      return o(), a("form", {
        class: "signup-form",
        onSubmit: ae(p, ["prevent"])
      }, [
        v[11] || (v[11] = n("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        C(i).error || l.value ? (o(), a("div", Xn, b(C(i).error || l.value), 1)) : x("", !0),
        n("div", Jn, [
          v[5] || (v[5] = n("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          Q(n("input", {
            id: "email",
            "onUpdate:modelValue": v[0] || (v[0] = (h) => u.value = h),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [he, u.value]
          ])
        ]),
        n("div", Wn, [
          v[6] || (v[6] = n("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          Q(n("input", {
            id: "username",
            "onUpdate:modelValue": v[1] || (v[1] = (h) => r.value = h),
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
        n("div", Qn, [
          v[7] || (v[7] = n("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          n("div", Zn, [
            Q(n("input", {
              id: "password",
              "onUpdate:modelValue": v[2] || (v[2] = (h) => m.value = h),
              type: d.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, es), [
              [ke, m.value]
            ]),
            n("button", {
              type: "button",
              class: "toggle-password",
              onClick: v[3] || (v[3] = (h) => d.value = !d.value)
            }, b(d.value ? "🙈" : "👁"), 1)
          ])
        ]),
        n("div", ts, [
          v[8] || (v[8] = n("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          Q(n("input", {
            id: "confirm",
            "onUpdate:modelValue": v[4] || (v[4] = (h) => _.value = h),
            type: d.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, ns), [
            [ke, _.value]
          ])
        ]),
        n("button", {
          type: "submit",
          class: "submit-btn",
          disabled: C(i).loading
        }, b(C(i).loading ? "Creating account..." : "Create account"), 9, ss),
        n("p", os, [
          v[10] || (v[10] = X(" Already have an account? ", -1)),
          A(f, {
            to: "/app/login",
            class: "link"
          }, {
            default: Y(() => [...v[9] || (v[9] = [
              X("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), ls = /* @__PURE__ */ B(as, [["__scopeId", "data-v-d5e42c72"]]), is = { class: "auth-page" }, rs = { class: "auth-card" }, cs = /* @__PURE__ */ M({
  __name: "SignupPage",
  setup(t) {
    return (e, s) => (o(), a("div", is, [
      n("div", rs, [
        A(ls, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), ds = /* @__PURE__ */ B(cs, [["__scopeId", "data-v-609331e4"]]), us = { class: "settings-form" }, vs = {
  key: 0,
  class: "settings-loading"
}, hs = {
  key: 1,
  class: "settings-error"
}, ms = { class: "group-title" }, ps = ["for"], fs = { class: "setting-control" }, _s = ["id", "checked", "onChange"], gs = ["id", "value", "onChange"], bs = ["id", "value", "onChange"], ks = { class: "settings-actions" }, ys = {
  key: 0,
  class: "success-msg"
}, $s = ["disabled"], ws = /* @__PURE__ */ M({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(t, { emit: e }) {
    const s = t, i = e, c = Ce(), u = g({}), r = g(!0), m = g(!1), _ = g(null), d = g(null), l = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], p = P(
      () => s.groups ? l.filter((I) => s.groups.includes(I)) : l
    );
    async function k() {
      r.value = !0, _.value = null;
      try {
        const I = await c.client.get("/api/v1/users/me/settings");
        u.value = I;
      } catch (I) {
        _.value = I instanceof Error ? I.message : "Failed to load settings";
      } finally {
        r.value = !1;
      }
    }
    async function v() {
      m.value = !0, _.value = null, d.value = null;
      try {
        await c.client.put("/api/v1/users/me/settings", u.value), d.value = "Settings saved.", i("saved", u.value), setTimeout(() => {
          d.value = null;
        }, 3e3);
      } catch (I) {
        _.value = I instanceof Error ? I.message : "Failed to save settings";
      } finally {
        m.value = !1;
      }
    }
    function f(I, q) {
      u.value[I] = q;
    }
    Z(k);
    const h = {
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
        (o(!0), a(F, null, D(p.value, (G) => (o(), a("div", {
          key: G,
          class: "settings-group"
        }, [
          n("h3", ms, b(h[G]), 1),
          (o(), a(F, null, D(S, (O, U) => Q(n("div", {
            key: U,
            class: "setting-row"
          }, [
            n("label", {
              for: U,
              class: "setting-label"
            }, b(O.label), 9, ps),
            n("div", fs, [
              O.type === "bool" ? (o(), a("input", {
                key: 0,
                id: U,
                type: "checkbox",
                class: "toggle",
                checked: !!u.value[U],
                onChange: (V) => f(U, V.target.checked)
              }, null, 40, _s)) : O.type === "number" ? (o(), a("input", {
                key: 1,
                id: U,
                type: "number",
                class: "input number-input",
                value: u.value[U],
                onChange: (V) => f(U, Number(V.target.value))
              }, null, 40, gs)) : (o(), a("input", {
                key: 2,
                id: U,
                type: "text",
                class: "input",
                value: u.value[U] ?? "",
                onChange: (V) => f(U, V.target.value)
              }, null, 40, bs))
            ])
          ]), [
            [$e, U.startsWith(G)]
          ])), 64))
        ]))), 128)),
        n("div", ks, [
          d.value ? (o(), a("div", ys, b(d.value), 1)) : x("", !0),
          n("button", {
            class: "save-btn",
            disabled: m.value,
            onClick: v
          }, b(m.value ? "Saving..." : "Save settings"), 9, $s)
        ])
      ], 64))
    ]));
  }
}), xs = /* @__PURE__ */ B(ws, [["__scopeId", "data-v-51b588b6"]]), Cs = { class: "settings-page" }, Is = /* @__PURE__ */ M({
  __name: "SettingsPage",
  setup(t) {
    return (e, s) => (o(), a("div", Cs, [
      s[0] || (s[0] = n("div", { class: "settings-header" }, [
        n("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      A(xs)
    ]));
  }
}), Ss = /* @__PURE__ */ B(Is, [["__scopeId", "data-v-f9ca8a28"]]);
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
function Cc(t) {
  const e = {
    ...Ms(),
    ...t
  }, s = He(), i = e.routerBase || "/app", c = Oe({
    history: Ye(i),
    routes: Bs(e)
  }), u = Ue(it);
  return u.provide("apiBase", e.apiBase), u.use(s), u.use(c), u;
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
const Vs = w({ name: "lucide-play", render: Es }), Ps = {
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
const As = w({ name: "lucide-pause", render: Ls }), js = {
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
const Fs = w({ name: "lucide-skip-back", render: Rs }), Ds = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function zs(t, e) {
  return o(), a("svg", Ds, [...e[0] || (e[0] = [
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
const Us = w({ name: "lucide-skip-forward", render: zs }), Ns = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qs(t, e) {
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
const Hs = w({ name: "lucide-rotate-ccw", render: qs }), Gs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ks(t, e) {
  return o(), a("svg", Gs, [...e[0] || (e[0] = [
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
const Os = w({ name: "lucide-rotate-cw", render: Ks }), Ys = {
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
const Js = w({ name: "lucide-volume-2", render: Xs }), Ws = {
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
const Zs = w({ name: "lucide-volume-1", render: Qs }), eo = {
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
const no = w({ name: "lucide-volume-x", render: to }), so = {
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
const ao = w({ name: "lucide-captions", render: oo }), lo = {
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
const ro = w({ name: "lucide-picture-in-picture-2", render: io }), co = {
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
const vo = w({ name: "lucide-rectangle-horizontal", render: uo }), ho = {
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
const po = w({ name: "lucide-maximize", render: mo }), fo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _o(t, e) {
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
const go = w({ name: "lucide-minimize", render: _o }), bo = {
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
const yo = w({ name: "lucide-maximize-2", render: ko }), $o = {
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
const xo = w({ name: "lucide-cast", render: wo }), Co = {
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
const So = w({ name: "lucide-settings", render: Io }), Mo = {
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
const To = w({ name: "lucide-gauge", render: Bo }), Eo = {
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
const Po = w({ name: "lucide-film", render: Vo }), Lo = {
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
const jo = w({ name: "lucide-image", render: Ao }), Ro = {
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
const Do = w({ name: "lucide-music", render: Fo }), zo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Uo(t, e) {
  return o(), a("svg", zo, [...e[0] || (e[0] = [
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
const No = w({ name: "lucide-tv", render: Uo }), qo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ho(t, e) {
  return o(), a("svg", qo, [...e[0] || (e[0] = [
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
const Go = w({ name: "lucide-search", render: Ho }), Ko = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oo(t, e) {
  return o(), a("svg", Ko, [...e[0] || (e[0] = [
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
const Yo = w({ name: "lucide-sliders-horizontal", render: Oo }), Xo = {
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
const Wo = w({ name: "lucide-calendar", render: Jo }), Qo = {
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
const ea = w({ name: "lucide-arrow-up-down", render: Zo }), ta = {
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
const sa = w({ name: "lucide-star", render: na }), oa = {
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
const la = w({ name: "lucide-list", render: aa }), ia = {
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
const ca = w({ name: "lucide-plus", render: ra }), da = {
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
const va = w({ name: "lucide-info", render: ua }), ha = {
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
const pa = w({ name: "lucide-x", render: ma }), fa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _a(t, e) {
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
const ga = w({ name: "lucide-check", render: _a }), ba = {
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
const ya = w({ name: "lucide-bookmark", render: ka }), $a = {
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
const xa = w({ name: "lucide-bookmark-plus", render: wa }), Ca = {
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
const Sa = w({ name: "lucide-heart", render: Ia }), Ma = {
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
const Ta = w({ name: "lucide-user", render: Ba }), Ea = {
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
const Pa = w({ name: "lucide-log-out", render: Va }), La = {
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
const ja = w({ name: "lucide-menu", render: Aa }), Ra = {
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
const Da = w({ name: "lucide-more-horizontal", render: Fa }), za = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ua(t, e) {
  return o(), a("svg", za, [...e[0] || (e[0] = [
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
const Na = w({ name: "lucide-eye", render: Ua }), qa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ha(t, e) {
  return o(), a("svg", qa, [...e[0] || (e[0] = [
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
const Ga = w({ name: "lucide-eye-off", render: Ha }), Ka = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oa(t, e) {
  return o(), a("svg", Ka, [...e[0] || (e[0] = [
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
const Ya = w({ name: "lucide-arrow-left", render: Oa }), Xa = {
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
const Wa = w({ name: "lucide-arrow-up", render: Ja }), Qa = {
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
const el = w({ name: "lucide-arrow-down", render: Za }), tl = {
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
const sl = w({ name: "lucide-chevron-down", render: nl }), ol = {
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
const ll = w({ name: "lucide-chevron-up", render: al }), il = {
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
const cl = w({ name: "lucide-chevron-left", render: rl }), dl = {
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
const vl = w({ name: "lucide-chevron-right", render: ul }), hl = {
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
const pl = w({ name: "lucide-loader-circle", render: ml }), fl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _l(t, e) {
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
const gl = w({ name: "lucide-circle-alert", render: _l }), bl = {
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
const yl = w({ name: "lucide-circle-check", render: kl }), $l = {
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
const xl = w({ name: "lucide-circle-x", render: wl }), Cl = {
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
const Sl = w({ name: "lucide-sun", render: Il }), Ml = {
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
const Tl = w({ name: "lucide-moon", render: Bl }), El = {
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
const Pl = w({ name: "lucide-monitor", render: Vl }), K = /* @__PURE__ */ M({
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
    }, s = t, i = P(() => e[s.name]), c = P(
      () => s.size === void 0 ? void 0 : typeof s.size == "number" ? `${s.size}px` : s.size
    );
    return (u, r) => (o(), H(Ee(i.value), {
      class: "phlix-icon",
      style: W(c.value ? { fontSize: c.value } : void 0),
      "stroke-width": t.strokeWidth,
      role: t.label ? "img" : void 0,
      "aria-label": t.label,
      "aria-hidden": t.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), Ll = ["type", "disabled", "aria-busy"], Al = {
  key: 0,
  class: "phlix-btn__spinner"
}, jl = { class: "phlix-btn__label" }, Rl = /* @__PURE__ */ M({
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
    return (i, c) => (o(), a("button", {
      type: t.type,
      class: L(["phlix-btn", [`phlix-btn--${t.variant}`, `phlix-btn--${t.size}`, { "phlix-btn--block": t.block, "is-loading": t.loading }]]),
      disabled: s.value,
      "aria-busy": t.loading || void 0
    }, [
      t.loading ? (o(), a("span", Al, [
        A(K, { name: "spinner" })
      ])) : x("", !0),
      t.leftIcon && !t.loading ? (o(), H(K, {
        key: 1,
        name: t.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0),
      n("span", jl, [
        z(i.$slots, "default", {}, void 0, !0)
      ]),
      t.rightIcon ? (o(), H(K, {
        key: 2,
        name: t.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0)
    ], 10, Ll));
  }
}), Ic = /* @__PURE__ */ B(Rl, [["__scopeId", "data-v-8cdee95a"]]), Fl = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], Dl = /* @__PURE__ */ M({
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
    return (i, c) => (o(), a("button", {
      type: t.type,
      class: L(["phlix-iconbtn", [`phlix-iconbtn--${t.variant}`, `phlix-iconbtn--${t.size}`, { "is-pressed": t.pressed }]]),
      disabled: s.value,
      "aria-label": t.label,
      title: t.label,
      "aria-pressed": t.pressed === void 0 ? void 0 : t.pressed,
      "aria-busy": t.loading || void 0
    }, [
      A(K, {
        name: t.loading ? "spinner" : t.name,
        class: L({ "phlix-iconbtn__spin": t.loading })
      }, null, 8, ["name", "class"])
    ], 10, Fl));
  }
}), Ie = /* @__PURE__ */ B(Dl, [["__scopeId", "data-v-fc0cd545"]]), zl = ["role", "aria-label"], Ul = /* @__PURE__ */ M({
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
      t.icon ? (o(), H(K, {
        key: 0,
        name: t.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : x("", !0),
      z(e.$slots, "default", {}, void 0, !0)
    ], 10, zl));
  }
}), Sc = /* @__PURE__ */ B(Ul, [["__scopeId", "data-v-8f8d0fd2"]]), Nl = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], ql = /* @__PURE__ */ M({
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
    const s = t, i = e, c = g(null), u = g(!1), r = P(() => {
      const h = s.max - s.min || 1;
      return Math.min(100, Math.max(0, (s.modelValue - s.min) / h * 100));
    }), m = P(
      () => s.formatValue ? s.formatValue(s.modelValue) : String(s.modelValue)
    );
    function _(h) {
      const S = Math.min(s.max, Math.max(s.min, h)), I = Math.round((S - s.min) / s.step), q = s.min + I * s.step;
      return Math.round(q * 1e6) / 1e6;
    }
    function d(h, S = !1) {
      const I = _(h);
      I !== s.modelValue && (i("update:modelValue", I), S && i("change", I));
    }
    function l(h) {
      const S = c.value;
      if (!S) return s.modelValue;
      const I = S.getBoundingClientRect(), q = I.width ? (h - I.left) / I.width : 0;
      return s.min + q * (s.max - s.min);
    }
    function p(h) {
      var S, I;
      s.disabled || ((I = (S = h.currentTarget).setPointerCapture) == null || I.call(S, h.pointerId), u.value = !0, d(l(h.clientX)));
    }
    function k(h) {
      u.value && d(l(h.clientX));
    }
    function v(h) {
      var S, I;
      u.value && (u.value = !1, (I = (S = h.currentTarget).releasePointerCapture) == null || I.call(S, h.pointerId), i("change", s.modelValue));
    }
    function f(h) {
      if (s.disabled) return;
      const S = (s.max - s.min) / 10;
      let I = !0;
      switch (h.key) {
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
      I && h.preventDefault();
    }
    return (h, S) => (o(), a("div", {
      class: L(["phlix-slider", { "is-disabled": t.disabled }]),
      role: "slider",
      tabindex: t.disabled ? -1 : 0,
      "aria-label": t.label,
      "aria-valuemin": t.min,
      "aria-valuemax": t.max,
      "aria-valuenow": t.modelValue,
      "aria-valuetext": m.value,
      "aria-disabled": t.disabled || void 0,
      "aria-orientation": "horizontal",
      onKeydown: f
    }, [
      n("div", {
        ref_key: "trackEl",
        ref: c,
        class: "phlix-slider__track",
        onPointerdown: p,
        onPointermove: k,
        onPointerup: v
      }, [
        n("div", {
          class: "phlix-slider__fill",
          style: W({ width: r.value + "%" })
        }, null, 4),
        n("div", {
          class: "phlix-slider__thumb",
          style: W({ left: r.value + "%" })
        }, null, 4)
      ], 544)
    ], 42, Nl));
  }
}), Mc = /* @__PURE__ */ B(ql, [["__scopeId", "data-v-9ca92975"]]), Hl = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], Gl = ["id"], Kl = /* @__PURE__ */ M({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const s = t, i = e, c = le();
    function u() {
      s.disabled || i("update:modelValue", !s.modelValue);
    }
    return (r, m) => (o(), a("span", {
      class: L(["phlix-switch", { "is-disabled": t.disabled }])
    }, [
      n("button", {
        type: "button",
        role: "switch",
        class: L(["phlix-switch__control", { "is-on": t.modelValue }]),
        "aria-checked": t.modelValue,
        "aria-label": t.label ? void 0 : "Toggle",
        "aria-labelledby": t.label ? C(c) : void 0,
        disabled: t.disabled,
        onClick: u
      }, [...m[0] || (m[0] = [
        n("span", { class: "phlix-switch__thumb" }, null, -1)
      ])], 10, Hl),
      t.label ? (o(), a("label", {
        key: 0,
        id: C(c),
        class: "phlix-switch__label",
        onClick: u
      }, b(t.label), 9, Gl)) : x("", !0)
    ], 2));
  }
}), Bc = /* @__PURE__ */ B(Kl, [["__scopeId", "data-v-4631a106"]]), Ol = ["disabled", "aria-pressed"], Yl = { class: "phlix-chip__label" }, Xl = ["disabled", "aria-label"], Jl = /* @__PURE__ */ M({
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
    const s = t, i = e;
    function c() {
      s.disabled || (s.selected !== void 0 && i("update:selected", !s.selected), i("click"));
    }
    return (u, r) => (o(), a("span", {
      class: L(["phlix-chip", [`phlix-chip--${t.size}`, { "is-selected": t.selected, "is-disabled": t.disabled }]])
    }, [
      n("button", {
        type: "button",
        class: "phlix-chip__main",
        disabled: t.disabled,
        "aria-pressed": t.selected === void 0 ? void 0 : t.selected,
        onClick: c
      }, [
        t.icon ? (o(), H(K, {
          key: 0,
          name: t.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : x("", !0),
        n("span", Yl, [
          z(u.$slots, "default", {}, void 0, !0)
        ])
      ], 8, Ol),
      t.removable ? (o(), a("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: t.disabled,
        "aria-label": t.removeLabel,
        onClick: r[0] || (r[0] = (m) => i("remove"))
      }, [
        A(K, { name: "x" })
      ], 8, Xl)) : x("", !0)
    ], 2));
  }
}), Tc = /* @__PURE__ */ B(Jl, [["__scopeId", "data-v-d6cd193e"]]);
function Le(t) {
  return t.map(
    (e) => typeof e == "object" ? e : { value: e, label: String(e) }
  );
}
function se(t, e, s) {
  var u;
  const i = t.length;
  if (i === 0) return -1;
  let c = e;
  for (let r = 0; r < i; r++)
    if (c = (c + s + i) % i, !((u = t[c]) != null && u.disabled)) return c;
  return e;
}
function ve(t, e) {
  return e === "first" ? se(t, -1, 1) : se(t, 0, -1);
}
const Wl = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "disabled"], Ql = ["id", "aria-label"], Zl = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], ei = { class: "phlix-select__check" }, ti = /* @__PURE__ */ M({
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
    const s = t, i = e, c = P(() => Le(s.options)), u = le(), r = g(!1), m = g(-1), _ = g(null), d = g(null);
    let l = "", p;
    const k = P(() => c.value.findIndex((y) => y.value === s.modelValue)), v = P(() => {
      var y;
      return ((y = c.value[k.value]) == null ? void 0 : y.label) ?? "";
    }), f = P(() => m.value >= 0 ? `${u}-opt-${m.value}` : void 0);
    function h() {
      s.disabled || r.value || (r.value = !0, m.value = k.value >= 0 ? k.value : ve(c.value, "first"), ne(G));
    }
    function S() {
      r.value = !1;
    }
    function I(y) {
      var T, j;
      const $ = c.value[y];
      !$ || $.disabled || ($.value !== s.modelValue && (i("update:modelValue", $.value), i("change", $.value)), S(), (j = (T = _.value) == null ? void 0 : T.querySelector(".phlix-select__trigger")) == null || j.focus());
    }
    function q(y) {
      m.value = se(c.value, m.value, y), ne(G);
    }
    function G() {
      var $, T;
      const y = ($ = d.value) == null ? void 0 : $.querySelector(".is-active");
      (T = y == null ? void 0 : y.scrollIntoView) == null || T.call(y, { block: "nearest" });
    }
    function O(y) {
      if (!s.disabled)
        switch (y.key) {
          case "ArrowDown":
            y.preventDefault(), r.value ? q(1) : h();
            break;
          case "ArrowUp":
            y.preventDefault(), r.value ? q(-1) : h();
            break;
          case "Home":
            r.value && (y.preventDefault(), m.value = ve(c.value, "first"), ne(G));
            break;
          case "End":
            r.value && (y.preventDefault(), m.value = ve(c.value, "last"), ne(G));
            break;
          case "Enter":
          case " ":
            y.preventDefault(), r.value && m.value >= 0 ? I(m.value) : h();
            break;
          case "Escape":
            r.value && (y.preventDefault(), S());
            break;
          case "Tab":
            S();
            break;
          default:
            y.key.length === 1 && !y.metaKey && !y.ctrlKey && !y.altKey && U(y.key);
        }
    }
    function U(y) {
      r.value || h(), l += y.toLowerCase(), clearTimeout(p), p = setTimeout(() => l = "", 600);
      const $ = c.value.findIndex((T) => !T.disabled && T.label.toLowerCase().startsWith(l));
      $ >= 0 && (m.value = $, ne(G));
    }
    function V(y) {
      r.value && _.value && !_.value.contains(y.target) && S();
    }
    return oe(r, (y) => {
      y ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0);
    }), re(() => {
      document.removeEventListener("pointerdown", V, !0), clearTimeout(p);
    }), (y, $) => (o(), a("div", {
      ref_key: "rootEl",
      ref: _,
      class: L(["phlix-select", { "is-open": r.value, "is-disabled": t.disabled }])
    }, [
      n("button", {
        type: "button",
        class: "phlix-select__trigger",
        "aria-haspopup": "listbox",
        "aria-expanded": r.value,
        "aria-controls": r.value ? `${C(u)}-list` : void 0,
        "aria-activedescendant": r.value ? f.value : void 0,
        "aria-label": t.label,
        disabled: t.disabled,
        onClick: $[0] || ($[0] = (T) => r.value ? S() : h()),
        onKeydown: O
      }, [
        n("span", {
          class: L(["phlix-select__value", { "is-placeholder": k.value < 0 }])
        }, b(k.value >= 0 ? v.value : t.placeholder), 3),
        A(K, {
          name: "chevron-down",
          class: "phlix-select__caret"
        })
      ], 40, Wl),
      Q(n("ul", {
        id: `${C(u)}-list`,
        ref_key: "listEl",
        ref: d,
        class: "phlix-select__list",
        role: "listbox",
        "aria-label": t.label
      }, [
        (o(!0), a(F, null, D(c.value, (T, j) => (o(), a("li", {
          id: `${C(u)}-opt-${j}`,
          key: T.value,
          class: L(["phlix-select__option", { "is-active": j === m.value, "is-disabled": T.disabled }]),
          role: "option",
          "aria-selected": T.value === t.modelValue,
          "aria-disabled": T.disabled || void 0,
          onClick: (ee) => I(j),
          onPointermove: (ee) => !T.disabled && (m.value = j)
        }, [
          n("span", ei, [
            T.value === t.modelValue ? (o(), H(K, {
              key: 0,
              name: "check"
            })) : x("", !0)
          ]),
          X(" " + b(T.label), 1)
        ], 42, Zl))), 128))
      ], 8, Ql), [
        [$e, r.value]
      ])
    ], 2));
  }
}), Ec = /* @__PURE__ */ B(ti, [["__scopeId", "data-v-db34d47a"]]), ni = { class: "phlix-combobox__field" }, si = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "placeholder", "disabled", "value"], oi = ["id", "aria-label"], ai = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], li = { class: "phlix-combobox__check" }, ii = {
  key: 0,
  class: "phlix-combobox__empty",
  role: "presentation"
}, ri = /* @__PURE__ */ M({
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
    const s = t, i = e, c = P(() => Le(s.options)), u = le(), r = g(!1), m = g(-1), _ = g(""), d = g(!1), l = g(null), p = g(null), k = g(null), v = P(() => {
      var $;
      return (($ = c.value.find((T) => T.value === s.modelValue)) == null ? void 0 : $.label) ?? "";
    }), f = P(() => {
      if (!d.value || _.value.trim() === "") return c.value;
      const $ = _.value.toLowerCase();
      return c.value.filter((T) => T.label.toLowerCase().includes($));
    }), h = P(() => m.value >= 0 ? `${u}-opt-${m.value}` : void 0);
    oe(
      () => s.modelValue,
      () => {
        r.value || (_.value = v.value);
      },
      { immediate: !0 }
    );
    function S() {
      s.disabled || r.value || (r.value = !0, m.value = f.value.findIndex(($) => $.value === s.modelValue), m.value < 0 && (m.value = f.value.findIndex(($) => !$.disabled)), ne(O));
    }
    function I() {
      _.value = v.value, d.value = !1, r.value = !1;
    }
    function q($) {
      var j;
      const T = f.value[$];
      !T || T.disabled || (T.value !== s.modelValue && (i("update:modelValue", T.value), i("change", T.value)), _.value = T.label, d.value = !1, r.value = !1, (j = p.value) == null || j.focus());
    }
    function G($) {
      f.value.length !== 0 && (m.value = se(f.value, m.value, $), ne(O));
    }
    function O() {
      var $, T, j;
      (j = (T = ($ = k.value) == null ? void 0 : $.querySelector(".is-active")) == null ? void 0 : T.scrollIntoView) == null || j.call(T, { block: "nearest" });
    }
    function U($) {
      _.value = $.target.value, d.value = !0, r.value = !0, m.value = ve(f.value, "first");
    }
    function V($) {
      if (!s.disabled)
        switch ($.key) {
          case "ArrowDown":
            $.preventDefault(), r.value ? G(1) : S();
            break;
          case "ArrowUp":
            $.preventDefault(), r.value ? G(-1) : S();
            break;
          case "Enter":
            r.value && m.value >= 0 && ($.preventDefault(), q(m.value));
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
    }), re(() => document.removeEventListener("pointerdown", y, !0)), ($, T) => (o(), a("div", {
      ref_key: "rootEl",
      ref: l,
      class: L(["phlix-combobox", { "is-open": r.value, "is-disabled": t.disabled }])
    }, [
      n("div", ni, [
        A(K, {
          name: "search",
          class: "phlix-combobox__search"
        }),
        n("input", {
          ref_key: "inputEl",
          ref: p,
          class: "phlix-combobox__input",
          type: "text",
          role: "combobox",
          autocomplete: "off",
          "aria-autocomplete": "list",
          "aria-expanded": r.value,
          "aria-controls": r.value ? `${C(u)}-list` : void 0,
          "aria-activedescendant": r.value ? h.value : void 0,
          "aria-label": t.label,
          placeholder: t.placeholder,
          disabled: t.disabled,
          value: _.value,
          onInput: U,
          onFocus: S,
          onKeydown: V
        }, null, 40, si),
        A(K, {
          name: "chevron-down",
          class: "phlix-combobox__caret"
        })
      ]),
      Q(n("ul", {
        id: `${C(u)}-list`,
        ref_key: "listEl",
        ref: k,
        class: "phlix-combobox__list",
        role: "listbox",
        "aria-label": t.label
      }, [
        (o(!0), a(F, null, D(f.value, (j, ee) => (o(), a("li", {
          id: `${C(u)}-opt-${ee}`,
          key: j.value,
          class: L(["phlix-combobox__option", { "is-active": ee === m.value, "is-disabled": j.disabled }]),
          role: "option",
          "aria-selected": j.value === t.modelValue,
          "aria-disabled": j.disabled || void 0,
          onClick: (fe) => q(ee),
          onPointermove: (fe) => !j.disabled && (m.value = ee)
        }, [
          n("span", li, [
            j.value === t.modelValue ? (o(), H(K, {
              key: 0,
              name: "check"
            })) : x("", !0)
          ]),
          X(" " + b(j.label), 1)
        ], 42, ai))), 128)),
        f.value.length === 0 ? (o(), a("li", ii, "No matches")) : x("", !0)
      ], 8, oi), [
        [$e, r.value]
      ])
    ], 2));
  }
}), Vc = /* @__PURE__ */ B(ri, [["__scopeId", "data-v-337aab6e"]]), ci = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
let de = 0, Ae = "";
function di() {
  de === 0 && (Ae = document.body.style.overflow, document.body.style.overflow = "hidden"), de++;
}
function Be() {
  de !== 0 && (de--, de === 0 && (document.body.style.overflow = Ae));
}
function je(t, e, s = {}) {
  const i = s.lockScroll ?? !0;
  let c = null, u = !1;
  function r() {
    const l = t.value;
    return l ? Array.from(l.querySelectorAll(ci)).filter(
      (p) => !p.hasAttribute("hidden") && p.getAttribute("aria-hidden") !== "true"
    ) : [];
  }
  function m(l) {
    var h;
    if (!e.value || !t.value) return;
    if (l.key === "Escape") {
      (h = s.onEscape) != null && h.call(s) && l.preventDefault();
      return;
    }
    if (l.key !== "Tab") return;
    const p = r();
    if (p.length === 0) {
      l.preventDefault(), t.value.focus();
      return;
    }
    const k = p[0], v = p[p.length - 1], f = document.activeElement;
    t.value.contains(f) ? l.shiftKey && f === k ? (l.preventDefault(), v.focus()) : !l.shiftKey && f === v && (l.preventDefault(), k.focus()) : (l.preventDefault(), k.focus());
  }
  function _() {
    c = document.activeElement, i && (di(), u = !0), document.addEventListener("keydown", m, !0), ne(() => {
      var p;
      (p = r()[0] ?? t.value) == null || p.focus();
    });
  }
  function d() {
    var l;
    document.removeEventListener("keydown", m, !0), u && (Be(), u = !1), c && document.contains(c) && ((l = c.focus) == null || l.call(c)), c = null;
  }
  oe(e, (l) => l ? _() : d(), { immediate: !0 }), re(() => {
    document.removeEventListener("keydown", m, !0), u && (Be(), u = !1);
  });
}
const ui = ["aria-labelledby"], vi = {
  key: 0,
  class: "phlix-modal__header"
}, hi = ["id"], mi = { class: "phlix-modal__body" }, pi = {
  key: 1,
  class: "phlix-modal__footer"
}, fi = /* @__PURE__ */ M({
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
    const s = t, i = e, c = g(s.modelValue);
    oe(() => s.modelValue, (d) => c.value = d);
    const u = g(null), r = le();
    function m() {
      i("update:modelValue", !1), i("close");
    }
    function _() {
      s.dismissible && m();
    }
    return je(u, c, {
      onEscape: () => s.dismissible ? (m(), !0) : !1
    }), (d, l) => (o(), H(we, { to: "body" }, [
      A(me, { name: "phlix-modal" }, {
        default: Y(() => [
          t.modelValue ? (o(), a("div", {
            key: 0,
            class: "phlix-modal",
            onPointerdown: ae(_, ["self"])
          }, [
            n("div", {
              ref_key: "panelEl",
              ref: u,
              class: L(["phlix-modal__panel", `phlix-modal__panel--${t.size}`]),
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": t.title ? C(r) : void 0,
              tabindex: "-1"
            }, [
              t.title || !t.hideClose ? (o(), a("header", vi, [
                t.title ? (o(), a("h2", {
                  key: 0,
                  id: C(r),
                  class: "phlix-modal__title"
                }, b(t.title), 9, hi)) : x("", !0),
                t.hideClose ? x("", !0) : (o(), H(Ie, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  class: "phlix-modal__close",
                  onClick: m
                }))
              ])) : x("", !0),
              n("div", mi, [
                z(d.$slots, "default", {}, void 0, !0)
              ]),
              d.$slots.footer ? (o(), a("footer", pi, [
                z(d.$slots, "footer", {}, void 0, !0)
              ])) : x("", !0)
            ], 10, ui)
          ], 32)) : x("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), Pc = /* @__PURE__ */ B(fi, [["__scopeId", "data-v-ad69ec41"]]), _i = ["aria-labelledby"], gi = {
  key: 0,
  class: "phlix-sheet__header"
}, bi = ["id"], ki = { class: "phlix-sheet__body" }, yi = {
  key: 1,
  class: "phlix-sheet__footer"
}, $i = /* @__PURE__ */ M({
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
    const s = t, i = e, c = g(s.modelValue);
    oe(() => s.modelValue, (d) => c.value = d);
    const u = g(null), r = le();
    function m() {
      i("update:modelValue", !1), i("close");
    }
    function _() {
      s.dismissible && m();
    }
    return je(u, c, {
      onEscape: () => s.dismissible ? (m(), !0) : !1
    }), (d, l) => (o(), H(we, { to: "body" }, [
      A(me, {
        name: `phlix-sheet-${t.side}`
      }, {
        default: Y(() => [
          t.modelValue ? (o(), a("div", {
            key: 0,
            class: L(["phlix-sheet", `phlix-sheet--${t.side}`]),
            onPointerdown: ae(_, ["self"])
          }, [
            n("aside", {
              ref_key: "panelEl",
              ref: u,
              class: "phlix-sheet__panel",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": t.title ? C(r) : void 0,
              tabindex: "-1"
            }, [
              t.title || !t.hideClose ? (o(), a("header", gi, [
                t.title ? (o(), a("h2", {
                  key: 0,
                  id: C(r),
                  class: "phlix-sheet__title"
                }, b(t.title), 9, bi)) : x("", !0),
                t.hideClose ? x("", !0) : (o(), H(Ie, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  onClick: m
                }))
              ])) : x("", !0),
              n("div", ki, [
                z(d.$slots, "default", {}, void 0, !0)
              ]),
              d.$slots.footer ? (o(), a("footer", yi, [
                z(d.$slots, "footer", {}, void 0, !0)
              ])) : x("", !0)
            ], 8, _i)
          ], 34)) : x("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ]));
  }
}), Lc = /* @__PURE__ */ B($i, [["__scopeId", "data-v-6960f9fb"]]), wi = ["id"], xi = /* @__PURE__ */ M({
  __name: "Tooltip",
  props: {
    text: {},
    placement: { default: "top" },
    delay: { default: 300 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, s = le(), i = g(!1), c = g(null);
    let u;
    function r() {
      var d;
      return ((d = c.value) == null ? void 0 : d.firstElementChild) ?? null;
    }
    function m() {
      e.disabled || (clearTimeout(u), u = setTimeout(() => {
        var d;
        i.value = !0, (d = r()) == null || d.setAttribute("aria-describedby", s);
      }, e.delay));
    }
    function _() {
      var d;
      clearTimeout(u), i.value = !1, (d = r()) == null || d.removeAttribute("aria-describedby");
    }
    return re(() => clearTimeout(u)), (d, l) => (o(), a("span", {
      ref_key: "wrapEl",
      ref: c,
      class: "phlix-tooltip-wrap",
      onMouseenter: m,
      onMouseleave: _,
      onFocusin: m,
      onFocusout: _,
      onKeydown: Ne(_, ["esc"])
    }, [
      z(d.$slots, "default", {}, void 0, !0),
      A(me, { name: "phlix-tooltip" }, {
        default: Y(() => [
          i.value && (t.text || d.$slots.content) ? (o(), a("span", {
            key: 0,
            id: C(s),
            role: "tooltip",
            class: L(["phlix-tooltip", `phlix-tooltip--${t.placement}`])
          }, [
            z(d.$slots, "content", {}, () => [
              X(b(t.text), 1)
            ], !0)
          ], 10, wi)) : x("", !0)
        ]),
        _: 3
      })
    ], 544));
  }
}), Ac = /* @__PURE__ */ B(xi, [["__scopeId", "data-v-bdb87991"]]), Ci = xe("phlix-toast", () => {
  const t = g([]), e = /* @__PURE__ */ new Map();
  let s = 0;
  function i(l) {
    const p = e.get(l);
    p && (clearTimeout(p), e.delete(l)), t.value = t.value.filter((k) => k.id !== l);
  }
  function c(l) {
    const p = ++s, k = { tone: "neutral", duration: 5e3, ...l, id: p };
    return t.value.push(k), k.duration > 0 && e.set(p, setTimeout(() => i(p), k.duration)), p;
  }
  function u() {
    e.forEach((l) => clearTimeout(l)), e.clear(), t.value = [];
  }
  return { toasts: t, show: c, dismiss: i, clear: u, success: (l, p) => c({ message: l, tone: "success", ...p }), error: (l, p) => c({ message: l, tone: "error", duration: 8e3, ...p }), warning: (l, p) => c({ message: l, tone: "warning", ...p }), info: (l, p) => c({ message: l, tone: "info", ...p }) };
}), Ii = ["role"], Si = { class: "phlix-toast__content" }, Mi = {
  key: 0,
  class: "phlix-toast__title"
}, Bi = { class: "phlix-toast__message" }, Ti = ["onClick"], Ei = /* @__PURE__ */ M({
  __name: "ToastHost",
  props: {
    position: { default: "bottom" }
  },
  setup(t) {
    const e = Ci(), s = {
      neutral: "info",
      success: "success",
      warning: "alert",
      error: "error",
      info: "info"
    }, i = (c) => c.icon ?? s[c.tone];
    return Z(() => {
    }), re(() => {
    }), (c, u) => (o(), H(we, { to: "body" }, [
      n("div", {
        class: L(["phlix-toasts", `phlix-toasts--${t.position}`]),
        role: "region",
        "aria-label": "Notifications"
      }, [
        A(qe, { name: "phlix-toast" }, {
          default: Y(() => [
            (o(!0), a(F, null, D(C(e).toasts, (r) => (o(), a("div", {
              key: r.id,
              class: L(["phlix-toast", `phlix-toast--${r.tone}`]),
              role: r.tone === "error" ? "alert" : "status"
            }, [
              A(K, {
                name: i(r),
                class: "phlix-toast__icon"
              }, null, 8, ["name"]),
              n("div", Si, [
                r.title ? (o(), a("p", Mi, b(r.title), 1)) : x("", !0),
                n("p", Bi, b(r.message), 1)
              ]),
              r.action ? (o(), a("button", {
                key: 0,
                type: "button",
                class: "phlix-toast__action",
                onClick: (m) => {
                  r.action.onClick(), C(e).dismiss(r.id);
                }
              }, b(r.action.label), 9, Ti)) : x("", !0),
              A(Ie, {
                name: "x",
                label: "Dismiss",
                size: "sm",
                class: "phlix-toast__close",
                onClick: (m) => C(e).dismiss(r.id)
              }, null, 8, ["onClick"])
            ], 10, Ii))), 128))
          ]),
          _: 1
        })
      ], 2)
    ]));
  }
}), jc = /* @__PURE__ */ B(Ei, [["__scopeId", "data-v-df4e2232"]]), Vi = {
  key: 0,
  class: "phlix-skel-text",
  "aria-hidden": "true"
}, Pi = /* @__PURE__ */ M({
  __name: "Skeleton",
  props: {
    variant: { default: "rect" },
    width: {},
    height: {},
    radius: {},
    lines: { default: 1 }
  },
  setup(t) {
    return (e, s) => t.variant === "text" ? (o(), a("div", Vi, [
      (o(!0), a(F, null, D(t.lines, (i) => (o(), a("span", {
        key: i,
        class: "phlix-skel phlix-skel--text",
        style: W({ width: i === t.lines && t.lines > 1 ? "60%" : t.width })
      }, null, 4))), 128))
    ])) : (o(), a("span", {
      key: 1,
      class: L(["phlix-skel", `phlix-skel--${t.variant}`]),
      "aria-hidden": "true",
      style: W({ width: t.width, height: t.height, borderRadius: t.radius })
    }, null, 6));
  }
}), Rc = /* @__PURE__ */ B(Pi, [["__scopeId", "data-v-c34e4066"]]), Li = ["aria-label"], Ai = /* @__PURE__ */ M({
  __name: "Spinner",
  props: {
    size: {},
    label: { default: "Loading" }
  },
  setup(t) {
    const e = t, s = P(
      () => e.size === void 0 ? void 0 : typeof e.size == "number" ? `${e.size}px` : e.size
    );
    return (i, c) => (o(), a("span", {
      class: "phlix-spinner",
      role: "status",
      "aria-label": t.label,
      style: W(s.value ? { fontSize: s.value } : void 0)
    }, [
      A(K, {
        name: "spinner",
        class: "phlix-spinner__icon"
      })
    ], 12, Li));
  }
}), Fc = /* @__PURE__ */ B(Ai, [["__scopeId", "data-v-2e0507dd"]]), ji = {
  class: "phlix-empty",
  role: "status"
}, Ri = { class: "phlix-empty__icon" }, Fi = { class: "phlix-empty__title" }, Di = {
  key: 0,
  class: "phlix-empty__desc"
}, zi = {
  key: 1,
  class: "phlix-empty__actions"
}, Ui = /* @__PURE__ */ M({
  __name: "EmptyState",
  props: {
    icon: { default: "film" },
    title: {},
    description: {}
  },
  setup(t) {
    return (e, s) => (o(), a("div", ji, [
      n("span", Ri, [
        A(K, { name: t.icon }, null, 8, ["name"])
      ]),
      n("h3", Fi, b(t.title), 1),
      t.description || e.$slots.default ? (o(), a("p", Di, [
        z(e.$slots, "default", {}, () => [
          X(b(t.description), 1)
        ], !0)
      ])) : x("", !0),
      e.$slots.actions ? (o(), a("div", zi, [
        z(e.$slots, "actions", {}, void 0, !0)
      ])) : x("", !0)
    ]));
  }
}), Dc = /* @__PURE__ */ B(Ui, [["__scopeId", "data-v-9c6d2458"]]), Ni = { class: "phlix-tabs" }, qi = ["aria-label"], Hi = ["id", "aria-selected", "aria-controls", "tabindex", "disabled", "onClick"], Gi = ["id", "aria-labelledby"], Ki = /* @__PURE__ */ M({
  __name: "Tabs",
  props: {
    modelValue: {},
    tabs: {},
    label: {}
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const s = t, i = e, c = le(), u = g(null), r = P(() => s.tabs.findIndex((v) => v.value === s.modelValue)), m = (v) => `${c}-tab-${v}`, _ = (v) => `${c}-panel-${v}`, d = P(() => s.tabs.map((v) => ({ value: v.value, label: v.label, disabled: v.disabled })));
    function l(v) {
      const f = s.tabs.find((h) => h.value === v);
      !f || f.disabled || v !== s.modelValue && i("update:modelValue", v);
    }
    function p(v) {
      var f, h;
      (h = (f = u.value) == null ? void 0 : f.querySelectorAll('[role="tab"]')[v]) == null || h.focus();
    }
    function k(v) {
      let f = -1;
      switch (v.key) {
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
      f >= 0 && (v.preventDefault(), l(s.tabs[f].value), p(f));
    }
    return (v, f) => (o(), a("div", Ni, [
      n("div", {
        ref_key: "listEl",
        ref: u,
        class: "phlix-tabs__list",
        role: "tablist",
        "aria-label": t.label,
        onKeydown: k
      }, [
        (o(!0), a(F, null, D(t.tabs, (h) => (o(), a("button", {
          id: m(h.value),
          key: h.value,
          type: "button",
          role: "tab",
          class: L(["phlix-tabs__tab", { "is-active": h.value === t.modelValue }]),
          "aria-selected": h.value === t.modelValue,
          "aria-controls": _(h.value),
          tabindex: h.value === t.modelValue ? 0 : -1,
          disabled: h.disabled,
          onClick: (S) => l(h.value)
        }, [
          h.icon ? (o(), H(K, {
            key: 0,
            name: h.icon,
            class: "phlix-tabs__icon"
          }, null, 8, ["name"])) : x("", !0),
          X(" " + b(h.label), 1)
        ], 10, Hi))), 128))
      ], 40, qi),
      t.modelValue ? (o(), a("div", {
        key: 0,
        id: _(t.modelValue),
        class: "phlix-tabs__panel",
        role: "tabpanel",
        "aria-labelledby": m(t.modelValue),
        tabindex: "0"
      }, [
        z(v.$slots, t.modelValue, {}, () => [
          z(v.$slots, "default", {}, void 0, !0)
        ], !0)
      ], 8, Gi)) : x("", !0)
    ]));
  }
}), zc = /* @__PURE__ */ B(Ki, [["__scopeId", "data-v-95493097"]]), Oi = { class: "phlix-kbd" }, Yi = {
  key: 1,
  class: "phlix-kbd__key"
}, Xi = /* @__PURE__ */ M({
  __name: "Kbd",
  props: {
    keys: {}
  },
  setup(t) {
    const e = t, s = P(() => e.keys === void 0 ? [] : Array.isArray(e.keys) ? e.keys : [e.keys]);
    return (i, c) => (o(), a("span", Oi, [
      s.value.length ? (o(!0), a(F, { key: 0 }, D(s.value, (u, r) => (o(), a("kbd", {
        key: r,
        class: "phlix-kbd__key"
      }, b(u), 1))), 128)) : (o(), a("kbd", Yi, [
        z(i.$slots, "default", {}, void 0, !0)
      ]))
    ]));
  }
}), Uc = /* @__PURE__ */ B(Xi, [["__scopeId", "data-v-5e5c4a8a"]]), Ji = /* @__PURE__ */ M({
  __name: "Reveal",
  props: {
    tag: { default: "div" },
    delay: { default: 0 },
    y: { default: 12 },
    whenVisible: { type: Boolean, default: !1 }
  },
  setup(t) {
    const e = t, s = g(null), i = g(!1), c = g(!1);
    let u = null;
    const r = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return Z(() => {
      if (r) {
        i.value = !0;
        return;
      }
      e.whenVisible && typeof IntersectionObserver < "u" ? (u = new IntersectionObserver(
        (m) => {
          m.some((_) => _.isIntersecting) && (i.value = !0, u == null || u.disconnect(), u = null);
        },
        { threshold: 0.1 }
      ), s.value && u.observe(s.value)) : requestAnimationFrame(() => requestAnimationFrame(() => i.value = !0));
    }), re(() => {
      u == null || u.disconnect(), u = null;
    }), (m, _) => (o(), H(Ee(t.tag), {
      ref_key: "el",
      ref: s,
      class: L(["phlix-reveal", { "is-revealed": i.value, "is-settled": c.value }]),
      style: W({ "--reveal-delay": `${t.delay}ms`, "--reveal-y": `${t.y}px` }),
      onTransitionend: _[0] || (_[0] = (d) => c.value = !0)
    }, {
      default: Y(() => [
        z(m.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 40, ["class", "style"]));
  }
}), Nc = /* @__PURE__ */ B(Ji, [["__scopeId", "data-v-162397f9"]]), Wi = /* @__PURE__ */ M({
  __name: "PageTransition",
  props: {
    mode: { default: "fade" }
  },
  setup(t) {
    return (e, s) => (o(), H(me, {
      name: `phlix-page-${t.mode}`,
      mode: "out-in"
    }, {
      default: Y(() => [
        z(e.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 8, ["name"]));
  }
}), qc = /* @__PURE__ */ B(Wi, [["__scopeId", "data-v-dafe74d0"]]), Qi = { class: "library-scan-page" }, Zi = {
  key: 0,
  class: "loading"
}, er = {
  key: 1,
  class: "error"
}, tr = {
  key: 2,
  class: "libraries-list"
}, nr = { class: "library-info" }, sr = { class: "library-name" }, or = { class: "library-type" }, ar = { class: "library-paths" }, lr = { class: "library-meta" }, ir = { key: 0 }, rr = {
  key: 0,
  class: "scan-status"
}, cr = { class: "library-actions" }, dr = ["onClick", "disabled"], ur = ["onClick", "disabled"], vr = {
  key: 0,
  class: "empty-state"
}, hr = /* @__PURE__ */ M({
  __name: "LibraryScanPage",
  setup(t) {
    const e = g([]), s = g({}), i = g(!0), c = g(null);
    async function u() {
      try {
        const p = await J.get("/api/v1/libraries");
        e.value = p.libraries || [];
        for (const k of e.value)
          r(k.id);
      } catch (p) {
        c.value = p instanceof Error ? p.message : "Failed to load libraries";
      } finally {
        i.value = !1;
      }
    }
    async function r(p) {
      try {
        const k = await J.get(`/api/v1/libraries/${p}/scan-status`);
        k.job && (s.value[p] = k.job);
      } catch {
      }
    }
    async function m(p) {
      try {
        await J.post(`/api/v1/libraries/${p}/scan`), await r(p);
      } catch (k) {
        c.value = k instanceof Error ? k.message : "Failed to trigger scan";
      }
    }
    async function _(p) {
      try {
        await J.post(`/api/v1/libraries/${p}/rescan`), await r(p);
      } catch (k) {
        c.value = k instanceof Error ? k.message : "Failed to trigger rescan";
      }
    }
    function d(p) {
      return p ? new Date(p).toLocaleString() : "Never";
    }
    function l(p) {
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
      u();
    }), (p, k) => (o(), a("div", Qi, [
      k[0] || (k[0] = n("div", { class: "scan-header" }, [
        n("h1", { class: "scan-title" }, "Library Scanner"),
        n("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      i.value ? (o(), a("div", Zi, "Loading libraries...")) : c.value ? (o(), a("div", er, b(c.value), 1)) : (o(), a("div", tr, [
        (o(!0), a(F, null, D(e.value, (v) => {
          var f, h, S, I;
          return o(), a("div", {
            key: v.id,
            class: "library-card"
          }, [
            n("div", nr, [
              n("h3", sr, b(v.name), 1),
              n("span", or, b(v.type), 1),
              n("p", ar, b(v.paths.join(", ")), 1),
              n("div", lr, [
                v.item_count !== void 0 ? (o(), a("span", ir, b(v.item_count) + " items", 1)) : x("", !0),
                n("span", null, "Last scan: " + b(d(v.last_scan_at)), 1)
              ]),
              s.value[v.id] ? (o(), a("div", rr, b(l(s.value[v.id])), 1)) : x("", !0)
            ]),
            n("div", cr, [
              n("button", {
                class: "btn btn-scan",
                onClick: (q) => m(v.id),
                disabled: ((f = s.value[v.id]) == null ? void 0 : f.status) === "running" || ((h = s.value[v.id]) == null ? void 0 : h.status) === "queued"
              }, " Scan ", 8, dr),
              n("button", {
                class: "btn btn-rescan",
                onClick: (q) => _(v.id),
                disabled: ((S = s.value[v.id]) == null ? void 0 : S.status) === "running" || ((I = s.value[v.id]) == null ? void 0 : I.status) === "queued"
              }, " Rescan ", 8, ur)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (o(), a("div", vr, " No libraries configured. Add a library to get started. ")) : x("", !0)
      ]))
    ]));
  }
}), Hc = /* @__PURE__ */ B(hr, [["__scopeId", "data-v-62b3805e"]]), mr = { class: "my-servers-page" }, pr = {
  key: 0,
  class: "loading"
}, fr = {
  key: 1,
  class: "error"
}, _r = {
  key: 2,
  class: "servers-list"
}, gr = { class: "server-info" }, br = { class: "server-name" }, kr = { class: "server-url" }, yr = { class: "server-meta" }, $r = { key: 0 }, wr = {
  key: 0,
  class: "empty-state"
}, xr = /* @__PURE__ */ M({
  __name: "MyServersPage",
  setup(t) {
    const e = g([]), s = g(!0), i = g(null);
    async function c() {
      try {
        const m = await J.get("/api/v1/servers");
        e.value = m.servers || [];
      } catch (m) {
        i.value = m instanceof Error ? m.message : "Failed to load servers";
      } finally {
        s.value = !1;
      }
    }
    function u(m) {
      switch (m) {
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
    function r(m) {
      return m ? new Date(m).toLocaleString() : "Never";
    }
    return Z(() => {
      c();
    }), (m, _) => (o(), a("div", mr, [
      _[2] || (_[2] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "My Servers"),
        n("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      s.value ? (o(), a("div", pr, "Loading servers...")) : i.value ? (o(), a("div", fr, b(i.value), 1)) : (o(), a("div", _r, [
        (o(!0), a(F, null, D(e.value, (d) => (o(), a("div", {
          key: d.id,
          class: "server-card"
        }, [
          n("div", {
            class: "server-status",
            style: W({ backgroundColor: u(d.status) })
          }, null, 4),
          n("div", gr, [
            n("h3", br, b(d.name), 1),
            n("p", kr, b(d.url), 1),
            n("div", yr, [
              n("span", null, b(d.owner), 1),
              d.library_count !== void 0 ? (o(), a("span", $r, b(d.library_count) + " libraries", 1)) : x("", !0),
              n("span", null, "Last seen: " + b(r(d.last_seen)), 1)
            ])
          ]),
          _[0] || (_[0] = n("div", { class: "server-actions" }, [
            n("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", wr, [..._[1] || (_[1] = [
          n("p", null, "No servers connected yet.", -1),
          n("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), Gc = /* @__PURE__ */ B(xr, [["__scopeId", "data-v-b9237da4"]]), Cr = { class: "federation-page" }, Ir = {
  key: 0,
  class: "loading"
}, Sr = {
  key: 1,
  class: "error"
}, Mr = {
  key: 2,
  class: "federation-content"
}, Br = { class: "peers-section" }, Tr = { class: "peers-list" }, Er = { class: "peer-info" }, Vr = { class: "peer-name" }, Pr = { class: "peer-url" }, Lr = { class: "peer-meta" }, Ar = { key: 0 }, jr = { class: "peer-actions" }, Rr = ["onClick"], Fr = {
  key: 1,
  class: "status-badge"
}, Dr = {
  key: 0,
  class: "empty-state"
}, zr = { class: "add-peer-section" }, Ur = /* @__PURE__ */ M({
  __name: "FederationPage",
  setup(t) {
    const e = g([]), s = g(!0), i = g(null);
    async function c() {
      try {
        const d = await J.get("/api/v1/federation/peers");
        e.value = d.peers || [];
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to load federation peers";
      } finally {
        s.value = !1;
      }
    }
    async function u(d) {
      try {
        await J.post("/api/v1/federation/connect", { url: d }), await c();
      } catch (l) {
        i.value = l instanceof Error ? l.message : "Failed to connect to peer";
      }
    }
    async function r(d) {
      try {
        await J.post(`/api/v1/federation/peers/${d}/disconnect`), await c();
      } catch (l) {
        i.value = l instanceof Error ? l.message : "Failed to disconnect peer";
      }
    }
    function m(d) {
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
    }), (d, l) => (o(), a("div", Cr, [
      l[5] || (l[5] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Federation"),
        n("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      s.value ? (o(), a("div", Ir, "Loading federation peers...")) : i.value ? (o(), a("div", Sr, b(i.value), 1)) : (o(), a("div", Mr, [
        n("div", Br, [
          l[2] || (l[2] = n("h2", { class: "section-title" }, "Connected Peers", -1)),
          n("div", Tr, [
            (o(!0), a(F, null, D(e.value, (p) => (o(), a("div", {
              key: p.id,
              class: "peer-card"
            }, [
              n("div", {
                class: "peer-status",
                style: W({ backgroundColor: m(p.status) })
              }, null, 4),
              n("div", Er, [
                n("h3", Vr, b(p.name), 1),
                n("p", Pr, b(p.url), 1),
                n("div", Lr, [
                  p.shared_libraries_count !== void 0 ? (o(), a("span", Ar, b(p.shared_libraries_count) + " shared libraries", 1)) : x("", !0),
                  n("span", null, "Last sync: " + b(_(p.last_sync)), 1)
                ])
              ]),
              n("div", jr, [
                p.status === "connected" ? (o(), a("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (k) => r(p.id)
                }, " Disconnect ", 8, Rr)) : p.status === "pending" ? (o(), a("span", Fr, "Pending")) : x("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (o(), a("div", Dr, [...l[1] || (l[1] = [
              n("p", null, "No federation peers connected.", -1)
            ])])) : x("", !0)
          ])
        ]),
        n("div", zr, [
          l[4] || (l[4] = n("h2", { class: "section-title" }, "Add Peer", -1)),
          n("form", {
            class: "add-peer-form",
            onSubmit: l[0] || (l[0] = ae((p) => u(""), ["prevent"]))
          }, [...l[3] || (l[3] = [
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
}), Kc = /* @__PURE__ */ B(Ur, [["__scopeId", "data-v-91ba2781"]]), Nr = { class: "manage-shares-page" }, qr = {
  key: 0,
  class: "loading"
}, Hr = {
  key: 1,
  class: "error"
}, Gr = {
  key: 2,
  class: "shares-list"
}, Kr = { class: "share-info" }, Or = { class: "share-library" }, Yr = { class: "share-meta" }, Xr = {
  key: 0,
  class: "expired-badge"
}, Jr = { class: "share-dates" }, Wr = { key: 0 }, Qr = { class: "share-actions" }, Zr = ["onClick"], ec = {
  key: 0,
  class: "empty-state"
}, tc = /* @__PURE__ */ M({
  __name: "ManageSharesPage",
  setup(t) {
    const e = g([]), s = g(!0), i = g(null);
    async function c() {
      try {
        const _ = await J.get("/api/v1/shares");
        e.value = _.shares || [];
      } catch (_) {
        i.value = _ instanceof Error ? _.message : "Failed to load shares";
      } finally {
        s.value = !1;
      }
    }
    async function u(_) {
      try {
        await J.delete(`/api/v1/shares/${_}`), await c();
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to revoke share";
      }
    }
    function r(_) {
      return new Date(_).toLocaleString();
    }
    function m(_) {
      return _ ? new Date(_) < /* @__PURE__ */ new Date() : !1;
    }
    return Z(() => {
      c();
    }), (_, d) => (o(), a("div", Nr, [
      d[1] || (d[1] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Manage Shares"),
        n("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      s.value ? (o(), a("div", qr, "Loading shares...")) : i.value ? (o(), a("div", Hr, b(i.value), 1)) : (o(), a("div", Gr, [
        (o(!0), a(F, null, D(e.value, (l) => (o(), a("div", {
          key: l.id,
          class: "share-card"
        }, [
          n("div", Kr, [
            n("h3", Or, b(l.library_name), 1),
            n("div", Yr, [
              n("span", null, "Shared with: " + b(l.shared_with), 1),
              n("span", {
                class: L(["permission-badge", l.permissions])
              }, b(l.permissions), 3),
              l.expires_at && m(l.expires_at) ? (o(), a("span", Xr, "Expired")) : x("", !0)
            ]),
            n("p", Jr, [
              X(" Created: " + b(r(l.created_at)) + " ", 1),
              l.expires_at ? (o(), a("span", Wr, " | Expires: " + b(r(l.expires_at)), 1)) : x("", !0)
            ])
          ]),
          n("div", Qr, [
            n("button", {
              class: "btn btn-danger",
              onClick: (p) => u(l.id)
            }, "Revoke", 8, Zr)
          ])
        ]))), 128)),
        e.value.length === 0 ? (o(), a("div", ec, [...d[0] || (d[0] = [
          n("p", null, "No library shares found.", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), Oc = /* @__PURE__ */ B(tc, [["__scopeId", "data-v-bd8771ac"]]), nc = { class: "audit-logs-page" }, sc = {
  key: 0,
  class: "loading"
}, oc = {
  key: 1,
  class: "error"
}, ac = {
  key: 2,
  class: "logs-container"
}, lc = { class: "logs-list" }, ic = { class: "log-content" }, rc = { class: "log-header" }, cc = { class: "log-action" }, dc = { class: "log-actor" }, uc = { class: "log-time" }, vc = {
  key: 0,
  class: "log-target"
}, hc = {
  key: 1,
  class: "log-details"
}, mc = {
  key: 2,
  class: "log-ip"
}, pc = {
  key: 0,
  class: "empty-state"
}, fc = {
  key: 0,
  class: "pagination"
}, _c = ["disabled"], gc = { class: "page-info" }, bc = ["disabled"], kc = /* @__PURE__ */ M({
  __name: "AuditLogsPage",
  setup(t) {
    const e = g([]), s = g(!0), i = g(null), c = g(1), u = g(1);
    async function r(l = 1) {
      try {
        s.value = !0;
        const p = await J.get(
          "/api/v1/audit-logs",
          { page: String(l) }
        );
        e.value = p.logs || [], c.value = p.page || 1, u.value = p.total_pages || 1;
      } catch (p) {
        i.value = p instanceof Error ? p.message : "Failed to load audit logs";
      } finally {
        s.value = !1;
      }
    }
    function m(l) {
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
    }), (l, p) => (o(), a("div", nc, [
      p[3] || (p[3] = n("div", { class: "page-header" }, [
        n("h1", { class: "page-title" }, "Audit Logs"),
        n("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      s.value ? (o(), a("div", sc, "Loading audit logs...")) : i.value ? (o(), a("div", oc, b(i.value), 1)) : (o(), a("div", ac, [
        n("div", lc, [
          (o(!0), a(F, null, D(e.value, (k) => (o(), a("div", {
            key: k.id,
            class: "log-entry"
          }, [
            n("div", {
              class: "log-icon",
              style: W({ backgroundColor: _(k.action) })
            }, b(d(k.action)), 5),
            n("div", ic, [
              n("div", rc, [
                n("span", cc, b(k.action), 1),
                n("span", dc, b(k.actor), 1),
                n("span", uc, b(m(k.created_at)), 1)
              ]),
              k.target ? (o(), a("p", vc, "Target: " + b(k.target), 1)) : x("", !0),
              k.details ? (o(), a("p", hc, b(k.details), 1)) : x("", !0),
              k.ip_address ? (o(), a("span", mc, "IP: " + b(k.ip_address), 1)) : x("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (o(), a("div", pc, [...p[2] || (p[2] = [
            n("p", null, "No audit logs found.", -1)
          ])])) : x("", !0)
        ]),
        u.value > 1 ? (o(), a("div", fc, [
          n("button", {
            class: "btn btn-secondary",
            disabled: c.value <= 1,
            onClick: p[0] || (p[0] = (k) => r(c.value - 1))
          }, " Previous ", 8, _c),
          n("span", gc, "Page " + b(c.value) + " of " + b(u.value), 1),
          n("button", {
            class: "btn btn-secondary",
            disabled: c.value >= u.value,
            onClick: p[1] || (p[1] = (k) => r(c.value + 1))
          }, " Next ", 8, bc)
        ])) : x("", !0)
      ]))
    ]));
  }
}), Yc = /* @__PURE__ */ B(kc, [["__scopeId", "data-v-05910fd9"]]);
export {
  pe as ApiClient,
  vt as ApiError,
  ot as AppLayout,
  Yc as AuditLogsPage,
  Sc as Badge,
  hn as BrowsePage,
  Ic as Button,
  Tc as Chip,
  Vc as Combobox,
  Dc as EmptyState,
  Kc as FederationPage,
  on as FilterBar,
  K as Icon,
  Ie as IconButton,
  Uc as Kbd,
  Hc as LibraryScanPage,
  An as LocalStorageTokenStore,
  Hn as LoginForm,
  Yn as LoginPage,
  Oc as ManageSharesPage,
  St as MediaCard,
  Pt as MediaGrid,
  Pc as Modal,
  Gc as MyServersPage,
  qc as PageTransition,
  it as PhlixApp,
  Bn as Player,
  Ln as PlayerPage,
  Nc as Reveal,
  Ec as Select,
  xs as SettingsForm,
  Ss as SettingsPage,
  Lc as Sheet,
  ls as SignupForm,
  ds as SignupPage,
  Rc as Skeleton,
  Mc as Slider,
  Fc as Spinner,
  Bc as Switch,
  zc as Tabs,
  jc as ToastHost,
  Ac as Tooltip,
  Cc as createPhlixApp,
  Ce as useAuthStore,
  je as useFocusTrap,
  Pe as useMediaStore,
  Ci as useToastStore
};
//# sourceMappingURL=phlix-ui.js.map
