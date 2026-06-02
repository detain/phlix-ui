var Ae = Object.defineProperty;
var Re = (n, e, o) => e in n ? Ae(n, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : n[e] = o;
var ce = (n, e, o) => Re(n, typeof e != "symbol" ? e + "" : e, o);
import { openBlock as s, createElementBlock as a, createElementVNode as t, renderSlot as H, defineComponent as E, createBlock as G, withCtx as W, createVNode as D, unref as x, createTextVNode as J, toDisplayString as b, ref as g, computed as V, createCommentVNode as C, Fragment as z, renderList as N, withDirectives as X, vModelText as ue, normalizeClass as A, inject as ke, onMounted as te, watch as ne, onUnmounted as Fe, withModifiers as oe, normalizeStyle as se, createStaticVNode as De, resolveComponent as Me, vModelDynamic as be, vShow as ye, createApp as Ue, markRaw as $, resolveDynamicComponent as ze, useId as le, onBeforeUnmount as he, nextTick as ee, Teleport as Se, Transition as we, withKeys as Ne } from "vue";
import { defineStore as Be, createPinia as qe } from "pinia";
import { RouterView as He, RouterLink as Ce, useRoute as Ge, useRouter as Te, createRouter as Ke, createWebHistory as Oe } from "vue-router";
const P = (n, e) => {
  const o = n.__vccOpts || n;
  for (const [r, d] of e)
    o[r] = d;
  return o;
}, Ye = {}, Xe = { class: "app-layout" }, Je = { class: "app-header" }, We = { class: "header-inner" }, Qe = { class: "logo" }, Ze = { class: "nav" }, et = { class: "app-main" }, tt = { class: "app-footer" };
function nt(n, e) {
  return s(), a("div", Xe, [
    t("header", Je, [
      t("div", We, [
        t("div", Qe, [
          H(n.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", Ze, [
          H(n.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", et, [
      H(n.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", tt, [
      H(n.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const ot = /* @__PURE__ */ P(Ye, [["render", nt], ["__scopeId", "data-v-9f6c6d16"]]), st = { class: "main-nav" }, at = /* @__PURE__ */ E({
  __name: "PhlixApp",
  setup(n) {
    return (e, o) => (s(), G(ot, null, {
      nav: W(() => [
        t("nav", st, [
          D(x(Ce), {
            to: "/app",
            class: "nav-link"
          }, {
            default: W(() => [...o[0] || (o[0] = [
              J("Browse", -1)
            ])]),
            _: 1
          }),
          D(x(Ce), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: W(() => [...o[1] || (o[1] = [
              J("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: W(() => [
        D(x(He))
      ]),
      _: 1
    }));
  }
}), lt = /* @__PURE__ */ P(at, [["__scopeId", "data-v-35b5e7c6"]]), rt = { class: "phlix-placeholder" }, it = { class: "placeholder-content" }, ct = /* @__PURE__ */ E({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(n) {
    return (e, o) => (s(), a("div", rt, [
      t("div", it, [
        o[0] || (o[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + b(n.appName) + " is initializing", 1)
      ])
    ]));
  }
}), dt = /* @__PURE__ */ P(ct, [["__scopeId", "data-v-bf79ac4c"]]);
class ut extends Error {
  constructor(e, o, r = null) {
    super(e), this.status = o, this.body = r, this.name = "ApiError";
  }
}
function vt(n) {
  return n === !0 || n === 1 || n === "1" || n === "true";
}
class me {
  constructor(e = {}) {
    ce(this, "baseUrl");
    ce(this, "tokens");
    ce(this, "doFetch");
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
  async request(e, o, r = null) {
    const d = () => {
      const u = {
        "Content-Type": "application/json"
      }, f = this.tokens.getAccessToken();
      f && (u.Authorization = `Bearer ${f}`);
      const i = { method: e, headers: u, credentials: "same-origin" };
      return r !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (i.body = JSON.stringify(r)), i;
    }, v = `${this.baseUrl}${o}`;
    let c = await this.doFetch(v, d());
    return c.status === 401 && await this.refreshToken() && (c = await this.doFetch(v, d())), this.handleResponse(c);
  }
  async handleResponse(e) {
    const d = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const v = this.extractError(d);
      throw new ut(v, e.status, d);
    }
    return d;
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
      const r = await o.json();
      return typeof r.access_token != "string" ? !1 : (this.tokens.setAccessToken(r.access_token), typeof r.refresh_token == "string" && this.tokens.setRefreshToken(r.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, o) {
    const r = o ? "?" + new URLSearchParams(o).toString() : "";
    return this.request("GET", e + r);
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
    return { ...e, is_admin: vt(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const Y = new me(), Ee = Be("media", () => {
  const n = g([]), e = g(0), o = g(!1), r = g(null), d = g(""), v = g([]), c = g(void 0), u = g(void 0), f = g([]), i = g([]), l = g("name"), m = g("asc"), k = g(24), p = g(0), _ = V(() => p.value + n.value.length < e.value), h = V(() => {
    const B = {};
    return d.value && (B.search = d.value), v.value.length && (B.genres = v.value), c.value !== void 0 && (B.yearFrom = c.value), u.value !== void 0 && (B.yearTo = u.value), f.value.length && (B.ratings = f.value), i.value.length && (B.types = i.value), B.sort = l.value, B.order = m.value, B.limit = k.value, B.offset = p.value, B;
  }), M = V(() => {
    const B = /* @__PURE__ */ new Set();
    return n.value.forEach((F) => {
      var j;
      return (j = F.genres) == null ? void 0 : j.forEach((ae) => B.add(ae));
    }), Array.from(B).sort();
  }), I = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], U = ["movie", "series", "episode", "audio", "image"];
  function q(B) {
    var ae, Z, xe;
    const F = new URLSearchParams(), j = h.value;
    return j.search && F.set("search", j.search), (ae = j.genres) == null || ae.forEach((re) => F.append("genres", re)), j.yearFrom !== void 0 && F.set("yearFrom", String(j.yearFrom)), j.yearTo !== void 0 && F.set("yearTo", String(j.yearTo)), (Z = j.ratings) == null || Z.forEach((re) => F.append("ratings", re)), (xe = j.types) == null || xe.forEach((re) => F.append("types", re)), j.sort && F.set("sort", j.sort), j.order && F.set("order", j.order), F.set("limit", String(j.limit)), F.set("offset", String(j.offset)), `${B}/api/v1/media?${F.toString()}`;
  }
  async function K(B, F = !1) {
    o.value = !0, r.value = null;
    try {
      const j = new me({ baseUrl: B }), ae = q(B), Z = await j.get(ae);
      F ? n.value = [...n.value, ...Z.items] : n.value = Z.items, e.value = Z.total, p.value = (Z.offset ?? 0) + Z.items.length;
    } catch (j) {
      r.value = j instanceof Error ? j.message : "Failed to load media";
    } finally {
      o.value = !1;
    }
  }
  async function R(B) {
    await K(B, !0);
  }
  function T() {
    n.value = [], e.value = 0, p.value = 0, r.value = null;
  }
  function y(B) {
    d.value = B, p.value = 0;
  }
  function w(B) {
    v.value = B, p.value = 0;
  }
  function S(B, F) {
    c.value = B, u.value = F, p.value = 0;
  }
  function L(B) {
    f.value = B, p.value = 0;
  }
  function Q(B) {
    i.value = B, p.value = 0;
  }
  function pe(B, F) {
    l.value = B, F && (m.value = F), p.value = 0;
  }
  return {
    items: n,
    total: e,
    loading: o,
    error: r,
    search: d,
    selectedGenres: v,
    yearFrom: c,
    yearTo: u,
    selectedRatings: f,
    selectedTypes: i,
    sort: l,
    order: m,
    limit: k,
    offset: p,
    hasMore: _,
    queryParams: h,
    availableGenres: M,
    availableRatings: I,
    availableTypes: U,
    fetchMedia: K,
    loadMore: R,
    reset: T,
    setSearch: y,
    setGenres: w,
    setYearRange: S,
    setRatings: L,
    setTypes: Q,
    setSort: pe
  };
}), ht = { class: "media-card" }, mt = ["href"], pt = { class: "card-poster" }, ft = ["src", "alt"], gt = {
  key: 1,
  class: "poster-placeholder"
}, _t = { class: "placeholder-type" }, bt = { class: "card-overlay" }, kt = {
  key: 0,
  class: "card-year"
}, yt = {
  key: 1,
  class: "card-rating"
}, wt = { class: "card-info" }, $t = ["title"], xt = {
  key: 0,
  class: "card-genres"
}, Ct = /* @__PURE__ */ E({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(n) {
    return (e, o) => {
      var r;
      return s(), a("article", ht, [
        t("a", {
          href: n.to ?? `/app/player/${n.item.id}`,
          class: "card-link"
        }, [
          t("div", pt, [
            n.item.poster_url ? (s(), a("img", {
              key: 0,
              src: n.item.poster_url,
              alt: n.item.name,
              loading: "lazy"
            }, null, 8, ft)) : (s(), a("div", gt, [
              o[0] || (o[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", _t, b(n.item.type), 1)
            ]))
          ]),
          t("div", bt, [
            n.item.year ? (s(), a("span", kt, b(n.item.year), 1)) : C("", !0),
            n.item.rating ? (s(), a("span", yt, b(n.item.rating), 1)) : C("", !0)
          ]),
          t("div", wt, [
            t("h3", {
              class: "card-title",
              title: n.item.name
            }, b(n.item.name), 9, $t),
            (r = n.item.genres) != null && r.length ? (s(), a("p", xt, b(n.item.genres.slice(0, 2).join(", ")), 1)) : C("", !0)
          ])
        ], 8, mt)
      ]);
    };
  }
}), It = /* @__PURE__ */ P(Ct, [["__scopeId", "data-v-e60c8481"]]), Mt = { class: "media-grid-container" }, St = {
  key: 0,
  class: "media-grid-skeleton"
}, Bt = {
  key: 1,
  class: "media-grid-empty"
}, Tt = {
  key: 2,
  class: "media-grid"
}, Et = /* @__PURE__ */ E({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(n) {
    return (e, o) => (s(), a("div", Mt, [
      n.loading ? (s(), a("div", St, [
        (s(), a(z, null, N(12, (r) => t("div", {
          key: r,
          class: "skeleton-card"
        }, [...o[0] || (o[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : n.items.length === 0 ? (s(), a("div", Bt, [...o[1] || (o[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (s(), a("div", Tt, [
        (s(!0), a(z, null, N(n.items, (r) => (s(), G(It, {
          key: r.id,
          item: r
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), Pt = /* @__PURE__ */ P(Et, [["__scopeId", "data-v-b7e87216"]]), Vt = { class: "filter-bar" }, Lt = { class: "filter-search" }, jt = { class: "filter-row" }, At = { class: "filter-group" }, Rt = ["value"], Ft = ["value"], Dt = ["value"], Ut = { class: "filter-group" }, zt = ["value"], Nt = ["value"], qt = ["value"], Ht = ["value"], Gt = { class: "filter-section" }, Kt = { class: "filter-chips" }, Ot = ["onClick"], Yt = { class: "filter-section" }, Xt = { class: "filter-chips" }, Jt = ["onClick"], Wt = { class: "filter-section" }, Qt = { class: "filter-chips" }, Zt = ["onClick"], en = { class: "filter-actions" }, tn = { class: "result-count" }, nn = /* @__PURE__ */ E({
  __name: "FilterBar",
  setup(n) {
    const e = Ee(), o = g(e.search), r = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function d() {
      e.setSearch(o.value);
    }
    function v(p) {
      const _ = e.selectedGenres;
      _.includes(p) ? e.setGenres(_.filter((h) => h !== p)) : e.setGenres([..._, p]);
    }
    function c(p) {
      const _ = e.selectedRatings;
      _.includes(p) ? e.setRatings(_.filter((h) => h !== p)) : e.setRatings([..._, p]);
    }
    function u(p) {
      const _ = e.selectedTypes;
      _.includes(p) ? e.setTypes(_.filter((h) => h !== p)) : e.setTypes([..._, p]);
    }
    function f(p) {
      const _ = p.target;
      e.setSort(_.value);
    }
    function i(p) {
      const _ = p.target;
      e.order = _.value;
    }
    const l = (/* @__PURE__ */ new Date()).getFullYear(), m = V(() => {
      const p = [];
      for (let _ = l; _ >= 1900; _--)
        p.push(_);
      return p;
    });
    function k() {
      o.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (p, _) => (s(), a("div", Vt, [
      t("div", Lt, [
        X(t("input", {
          "onUpdate:modelValue": _[0] || (_[0] = (h) => o.value = h),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: d
        }, null, 544), [
          [ue, o.value]
        ])
      ]),
      t("div", jt, [
        t("div", At, [
          _[4] || (_[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: x(e).sort,
            onChange: f
          }, [
            (s(), a(z, null, N(r, (h) => t("option", {
              key: h.value,
              value: h.value
            }, b(h.label), 9, Ft)), 64))
          ], 40, Rt),
          t("select", {
            class: "filter-select order-select",
            value: x(e).order,
            onChange: i
          }, [..._[3] || (_[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, Dt)
        ]),
        t("div", Ut, [
          _[7] || (_[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: x(e).yearFrom ?? "",
            onChange: _[1] || (_[1] = (h) => x(e).setYearRange(
              h.target.value ? Number(h.target.value) : void 0,
              x(e).yearTo
            ))
          }, [
            _[5] || (_[5] = t("option", { value: "" }, "From", -1)),
            (s(!0), a(z, null, N(m.value.slice(0, 50), (h) => (s(), a("option", {
              key: h,
              value: h
            }, b(h), 9, Nt))), 128))
          ], 40, zt),
          t("select", {
            class: "filter-select",
            value: x(e).yearTo ?? "",
            onChange: _[2] || (_[2] = (h) => x(e).setYearRange(
              x(e).yearFrom,
              h.target.value ? Number(h.target.value) : void 0
            ))
          }, [
            _[6] || (_[6] = t("option", { value: "" }, "To", -1)),
            (s(!0), a(z, null, N(m.value.slice(0, 50), (h) => (s(), a("option", {
              key: h,
              value: h
            }, b(h), 9, Ht))), 128))
          ], 40, qt)
        ])
      ]),
      t("div", Gt, [
        _[8] || (_[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", Kt, [
          (s(!0), a(z, null, N(x(e).availableGenres, (h) => (s(), a("button", {
            key: h,
            class: A(["chip", { active: x(e).selectedGenres.includes(h) }]),
            onClick: (M) => v(h)
          }, b(h), 11, Ot))), 128))
        ])
      ]),
      t("div", Yt, [
        _[9] || (_[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", Xt, [
          (s(!0), a(z, null, N(x(e).availableRatings, (h) => (s(), a("button", {
            key: h,
            class: A(["chip", { active: x(e).selectedRatings.includes(h) }]),
            onClick: (M) => c(h)
          }, b(h), 11, Jt))), 128))
        ])
      ]),
      t("div", Wt, [
        _[10] || (_[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Qt, [
          (s(!0), a(z, null, N(x(e).availableTypes, (h) => (s(), a("button", {
            key: h,
            class: A(["chip", { active: x(e).selectedTypes.includes(h) }]),
            onClick: (M) => u(h)
          }, b(h), 11, Zt))), 128))
        ])
      ]),
      t("div", en, [
        t("button", {
          class: "clear-btn",
          onClick: k
        }, "Clear filters"),
        t("span", tn, b(x(e).total) + " result" + b(x(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), on = /* @__PURE__ */ P(nn, [["__scopeId", "data-v-7089ec0b"]]), sn = { class: "browse-page" }, an = { class: "browse-header" }, ln = { class: "browse-toolbar-extra" }, rn = {
  key: 0,
  class: "browse-error"
}, cn = {
  key: 1,
  class: "load-more"
}, dn = {
  key: 2,
  class: "loading-more"
}, un = /* @__PURE__ */ E({
  __name: "BrowsePage",
  setup(n) {
    const e = ke("apiBase") ?? V(() => ""), o = Ee();
    function r() {
      o.reset(), o.fetchMedia(e.value);
    }
    te(r), ne(e, r);
    function d() {
      o.reset(), o.fetchMedia(e.value);
    }
    function v() {
      o.loadMore(e.value);
    }
    return (c, u) => (s(), a("div", sn, [
      t("div", an, [
        u[0] || (u[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", ln, [
          H(c.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      D(on, { onChange: d }),
      x(o).error ? (s(), a("div", rn, [
        t("p", null, b(x(o).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: r
        }, "Retry")
      ])) : C("", !0),
      D(Pt, {
        items: x(o).items,
        loading: x(o).loading && x(o).items.length === 0
      }, null, 8, ["items", "loading"]),
      x(o).hasMore && !x(o).loading ? (s(), a("div", cn, [
        t("button", {
          class: "load-more-btn",
          onClick: v
        }, "Load more")
      ])) : C("", !0),
      x(o).loading && x(o).items.length > 0 ? (s(), a("div", dn, " Loading... ")) : C("", !0)
    ]));
  }
}), vn = /* @__PURE__ */ P(un, [["__scopeId", "data-v-c192afa6"]]), hn = ["src", "poster"], mn = { class: "controls-top" }, pn = { class: "media-title" }, fn = {
  key: 0,
  class: "media-year"
}, gn = { class: "controls-center" }, _n = { class: "controls-bottom" }, bn = { class: "progress-track" }, kn = { class: "controls-row" }, yn = { class: "time-display" }, wn = { class: "volume-control" }, $n = ["value"], xn = { class: "speed-control" }, Cn = ["value"], In = { class: "time-display" }, Mn = /* @__PURE__ */ E({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(n) {
    const e = g(null), o = g(!1), r = g(0), d = g(0), v = g(1), c = g(!1), u = g(1), f = g(!1), i = g(!0);
    let l = null;
    const m = V(
      () => d.value > 0 ? r.value / d.value * 100 : 0
    );
    function k(T) {
      if (!isFinite(T) || isNaN(T)) return "0:00";
      const y = Math.floor(T / 60), w = Math.floor(T % 60);
      return `${y}:${w.toString().padStart(2, "0")}`;
    }
    function p() {
      e.value && (o.value ? e.value.pause() : e.value.play());
    }
    function _() {
      e.value && (r.value = e.value.currentTime);
    }
    function h() {
      e.value && (d.value = e.value.duration);
    }
    function M(T) {
      const w = T.currentTarget.getBoundingClientRect(), S = (T.clientX - w.left) / w.width;
      e.value && (e.value.currentTime = S * d.value);
    }
    function I(T) {
      const y = parseFloat(T.target.value);
      v.value = y, e.value && (e.value.volume = y), c.value = y === 0;
    }
    function U() {
      c.value = !c.value, e.value && (e.value.muted = c.value);
    }
    function q(T) {
      u.value = T, e.value && (e.value.playbackRate = T);
    }
    function K() {
      var y;
      const T = (y = e.value) == null ? void 0 : y.closest(".player-container");
      T && (document.fullscreenElement ? (document.exitFullscreen(), f.value = !1) : (T.requestFullscreen(), f.value = !0));
    }
    function R() {
      i.value = !0, l && clearTimeout(l), l = setTimeout(() => {
        o.value && (i.value = !1);
      }, 3e3);
    }
    return Fe(() => {
      l && clearTimeout(l);
    }), (T, y) => (s(), a("div", {
      class: A(["player-container", { "controls-hidden": !i.value && o.value }]),
      onMousemove: R,
      onClick: p
    }, [
      y[6] || (y[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: n.streamUrl,
        poster: n.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: y[0] || (y[0] = (w) => o.value = !0),
        onPause: y[1] || (y[1] = (w) => o.value = !1),
        onTimeupdate: _,
        onLoadedmetadata: h,
        onClick: oe(p, ["stop"])
      }, null, 40, hn),
      t("div", {
        class: "player-controls",
        onClick: y[4] || (y[4] = oe(() => {
        }, ["stop"]))
      }, [
        t("div", mn, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: y[2] || (y[2] = (w) => T.$router.back())
          }, " ← Back "),
          t("span", pn, b(n.media.name), 1),
          n.media.year ? (s(), a("span", fn, b(n.media.year), 1)) : C("", !0)
        ]),
        t("div", gn, [
          t("button", {
            class: "play-btn",
            onClick: p
          }, b(o.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", _n, [
          t("div", {
            class: "progress-bar",
            onClick: M
          }, [
            t("div", bn, [
              t("div", {
                class: "progress-fill",
                style: se({ width: m.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", kn, [
            t("span", yn, b(k(r.value)), 1),
            t("div", wn, [
              t("button", {
                class: "ctrl-btn",
                onClick: U
              }, b(c.value || v.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: c.value ? 0 : v.value,
                class: "volume-slider",
                onInput: I
              }, null, 40, $n)
            ]),
            t("div", xn, [
              t("select", {
                class: "speed-select",
                value: u.value,
                onChange: y[3] || (y[3] = (w) => q(Number(w.target.value)))
              }, [...y[5] || (y[5] = [
                De('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, Cn)
            ]),
            t("span", In, b(k(d.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: K
            }, b(f.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), Sn = /* @__PURE__ */ P(Mn, [["__scopeId", "data-v-7a51063f"]]), Bn = { class: "player-page" }, Tn = {
  key: 0,
  class: "player-loading"
}, En = {
  key: 1,
  class: "player-error"
}, Pn = /* @__PURE__ */ E({
  __name: "PlayerPage",
  setup(n) {
    const e = ke("apiBase", V(() => "")), o = Ge(), r = g(null), d = g(""), v = g(!0), c = g(null);
    async function u() {
      const f = o.params.id;
      if (!f) {
        c.value = "No media ID provided", v.value = !1;
        return;
      }
      try {
        const i = new me({ baseUrl: e.value }), [l, m] = await Promise.all([
          i.get(`/api/v1/media/${f}`),
          i.get(`/api/v1/media/${f}/playback-info`).catch(() => null)
        ]);
        r.value = l, m != null && m.url ? d.value = m.url : d.value = `${e.value}/media/${f}/stream`;
      } catch (i) {
        c.value = i instanceof Error ? i.message : "Failed to load media";
      } finally {
        v.value = !1;
      }
    }
    return te(u), (f, i) => (s(), a("div", Bn, [
      v.value ? (s(), a("div", Tn, "Loading...")) : c.value ? (s(), a("div", En, [
        t("p", null, b(c.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: u
        }, "Retry")
      ])) : r.value ? (s(), G(Sn, {
        key: 2,
        media: r.value,
        "stream-url": d.value
      }, null, 8, ["media", "stream-url"])) : C("", !0)
    ]));
  }
}), Vn = /* @__PURE__ */ P(Pn, [["__scopeId", "data-v-d9061b47"]]), fe = "access_token", ge = "refresh_token", _e = "user";
class Ln {
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
    return this.storage.getItem(ge);
  }
  setRefreshToken(e) {
    this.storage.setItem(ge, e);
  }
  getUser() {
    const e = this.storage.getItem(_e);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(_e, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(fe), this.storage.removeItem(ge), this.storage.removeItem(_e);
  }
}
const $e = Be("auth", () => {
  const n = new Ln(), e = ke("apiBase", ""), o = new me({ tokenStore: n, baseUrl: e }), r = g(null), d = g(!1), v = g(null), c = V(() => n.getAccessToken() !== null), u = V(() => {
    var k;
    return ((k = r.value) == null ? void 0 : k.is_admin) === !0;
  });
  async function f(k, p) {
    d.value = !0, v.value = null;
    try {
      const _ = await o.post("/api/v1/auth/login", { email: k, password: p });
      return n.setAccessToken(_.access_token), n.setRefreshToken(_.refresh_token), await l(), !0;
    } catch (_) {
      return v.value = _ instanceof Error ? _.message : "Login failed", !1;
    } finally {
      d.value = !1;
    }
  }
  async function i(k, p, _) {
    d.value = !0, v.value = null;
    try {
      const h = await o.post("/api/v1/auth/register", { email: k, username: p, password: _ });
      return n.setAccessToken(h.access_token), n.setRefreshToken(h.refresh_token), await l(), !0;
    } catch (h) {
      return v.value = h instanceof Error ? h.message : "Registration failed", !1;
    } finally {
      d.value = !1;
    }
  }
  async function l() {
    if (c.value)
      try {
        r.value = await o.getCurrentUser();
      } catch {
        r.value = null, n.clear();
      }
  }
  function m() {
    n.clear(), r.value = null;
  }
  return {
    user: r,
    loading: d,
    error: v,
    isLoggedIn: c,
    isAdmin: u,
    client: o,
    login: f,
    signup: i,
    fetchUser: l,
    logout: m
  };
}), jn = {
  key: 0,
  class: "form-error"
}, An = { class: "field" }, Rn = { class: "field" }, Fn = { class: "password-wrapper" }, Dn = ["type"], Un = ["disabled"], zn = { class: "form-footer" }, Nn = /* @__PURE__ */ E({
  __name: "LoginForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, r = $e(), d = Te(), v = g(""), c = g(""), u = g(!1);
    async function f() {
      await r.login(v.value, c.value) && (o("success"), d.push("/app"));
    }
    return (i, l) => {
      const m = Me("router-link");
      return s(), a("form", {
        class: "login-form",
        onSubmit: oe(f, ["prevent"])
      }, [
        l[7] || (l[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        x(r).error ? (s(), a("div", jn, b(x(r).error), 1)) : C("", !0),
        t("div", An, [
          l[3] || (l[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          X(t("input", {
            id: "email",
            "onUpdate:modelValue": l[0] || (l[0] = (k) => v.value = k),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [ue, v.value]
          ])
        ]),
        t("div", Rn, [
          l[4] || (l[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Fn, [
            X(t("input", {
              id: "password",
              "onUpdate:modelValue": l[1] || (l[1] = (k) => c.value = k),
              type: u.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, Dn), [
              [be, c.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: l[2] || (l[2] = (k) => u.value = !u.value)
            }, b(u.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: x(r).loading
        }, b(x(r).loading ? "Signing in..." : "Sign in"), 9, Un),
        t("p", zn, [
          l[6] || (l[6] = J(" Don't have an account? ", -1)),
          D(m, {
            to: "/app/signup",
            class: "link"
          }, {
            default: W(() => [...l[5] || (l[5] = [
              J("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), qn = /* @__PURE__ */ P(Nn, [["__scopeId", "data-v-22bc5576"]]), Hn = { class: "auth-page" }, Gn = { class: "auth-card" }, Kn = /* @__PURE__ */ E({
  __name: "LoginPage",
  setup(n) {
    return (e, o) => (s(), a("div", Hn, [
      t("div", Gn, [
        D(qn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), On = /* @__PURE__ */ P(Kn, [["__scopeId", "data-v-9c53ce6a"]]), Yn = {
  key: 0,
  class: "form-error"
}, Xn = { class: "field" }, Jn = { class: "field" }, Wn = { class: "field" }, Qn = { class: "password-wrapper" }, Zn = ["type"], eo = { class: "field" }, to = ["type"], no = ["disabled"], oo = { class: "form-footer" }, so = /* @__PURE__ */ E({
  __name: "SignupForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const o = e, r = $e(), d = Te(), v = g(""), c = g(""), u = g(""), f = g(""), i = g(!1), l = g(null);
    async function m() {
      if (l.value = null, u.value.length < 8) {
        l.value = "Password must be at least 8 characters.";
        return;
      }
      if (u.value !== f.value) {
        l.value = "Passwords do not match.";
        return;
      }
      await r.signup(v.value, c.value, u.value) && (o("success"), d.push("/app"));
    }
    return (k, p) => {
      const _ = Me("router-link");
      return s(), a("form", {
        class: "signup-form",
        onSubmit: oe(m, ["prevent"])
      }, [
        p[11] || (p[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        x(r).error || l.value ? (s(), a("div", Yn, b(x(r).error || l.value), 1)) : C("", !0),
        t("div", Xn, [
          p[5] || (p[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          X(t("input", {
            id: "email",
            "onUpdate:modelValue": p[0] || (p[0] = (h) => v.value = h),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [ue, v.value]
          ])
        ]),
        t("div", Jn, [
          p[6] || (p[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          X(t("input", {
            id: "username",
            "onUpdate:modelValue": p[1] || (p[1] = (h) => c.value = h),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [ue, c.value]
          ])
        ]),
        t("div", Wn, [
          p[7] || (p[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Qn, [
            X(t("input", {
              id: "password",
              "onUpdate:modelValue": p[2] || (p[2] = (h) => u.value = h),
              type: i.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, Zn), [
              [be, u.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: p[3] || (p[3] = (h) => i.value = !i.value)
            }, b(i.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", eo, [
          p[8] || (p[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          X(t("input", {
            id: "confirm",
            "onUpdate:modelValue": p[4] || (p[4] = (h) => f.value = h),
            type: i.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, to), [
            [be, f.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: x(r).loading
        }, b(x(r).loading ? "Creating account..." : "Create account"), 9, no),
        t("p", oo, [
          p[10] || (p[10] = J(" Already have an account? ", -1)),
          D(_, {
            to: "/app/login",
            class: "link"
          }, {
            default: W(() => [...p[9] || (p[9] = [
              J("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), ao = /* @__PURE__ */ P(so, [["__scopeId", "data-v-d5e42c72"]]), lo = { class: "auth-page" }, ro = { class: "auth-card" }, io = /* @__PURE__ */ E({
  __name: "SignupPage",
  setup(n) {
    return (e, o) => (s(), a("div", lo, [
      t("div", ro, [
        D(ao, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), co = /* @__PURE__ */ P(io, [["__scopeId", "data-v-609331e4"]]), uo = { class: "settings-form" }, vo = {
  key: 0,
  class: "settings-loading"
}, ho = {
  key: 1,
  class: "settings-error"
}, mo = { class: "group-title" }, po = ["for"], fo = { class: "setting-control" }, go = ["id", "checked", "onChange"], _o = ["id", "value", "onChange"], bo = ["id", "value", "onChange"], ko = { class: "settings-actions" }, yo = {
  key: 0,
  class: "success-msg"
}, wo = ["disabled"], $o = /* @__PURE__ */ E({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(n, { emit: e }) {
    const o = n, r = e, d = $e(), v = g({}), c = g(!0), u = g(!1), f = g(null), i = g(null), l = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], m = V(
      () => o.groups ? l.filter((I) => o.groups.includes(I)) : l
    );
    async function k() {
      c.value = !0, f.value = null;
      try {
        const I = await d.client.get("/api/v1/users/me/settings");
        v.value = I;
      } catch (I) {
        f.value = I instanceof Error ? I.message : "Failed to load settings";
      } finally {
        c.value = !1;
      }
    }
    async function p() {
      u.value = !0, f.value = null, i.value = null;
      try {
        await d.client.put("/api/v1/users/me/settings", v.value), i.value = "Settings saved.", r("saved", v.value), setTimeout(() => {
          i.value = null;
        }, 3e3);
      } catch (I) {
        f.value = I instanceof Error ? I.message : "Failed to save settings";
      } finally {
        u.value = !1;
      }
    }
    function _(I, U) {
      v.value[I] = U;
    }
    te(k);
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
    return (I, U) => (s(), a("div", uo, [
      c.value ? (s(), a("div", vo, "Loading settings...")) : f.value ? (s(), a("div", ho, b(f.value), 1)) : (s(), a(z, { key: 2 }, [
        (s(!0), a(z, null, N(m.value, (q) => (s(), a("div", {
          key: q,
          class: "settings-group"
        }, [
          t("h3", mo, b(h[q]), 1),
          (s(), a(z, null, N(M, (K, R) => X(t("div", {
            key: R,
            class: "setting-row"
          }, [
            t("label", {
              for: R,
              class: "setting-label"
            }, b(K.label), 9, po),
            t("div", fo, [
              K.type === "bool" ? (s(), a("input", {
                key: 0,
                id: R,
                type: "checkbox",
                class: "toggle",
                checked: !!v.value[R],
                onChange: (T) => _(R, T.target.checked)
              }, null, 40, go)) : K.type === "number" ? (s(), a("input", {
                key: 1,
                id: R,
                type: "number",
                class: "input number-input",
                value: v.value[R],
                onChange: (T) => _(R, Number(T.target.value))
              }, null, 40, _o)) : (s(), a("input", {
                key: 2,
                id: R,
                type: "text",
                class: "input",
                value: v.value[R] ?? "",
                onChange: (T) => _(R, T.target.value)
              }, null, 40, bo))
            ])
          ]), [
            [ye, R.startsWith(q)]
          ])), 64))
        ]))), 128)),
        t("div", ko, [
          i.value ? (s(), a("div", yo, b(i.value), 1)) : C("", !0),
          t("button", {
            class: "save-btn",
            disabled: u.value,
            onClick: p
          }, b(u.value ? "Saving..." : "Save settings"), 9, wo)
        ])
      ], 64))
    ]));
  }
}), xo = /* @__PURE__ */ P($o, [["__scopeId", "data-v-51b588b6"]]), Co = { class: "settings-page" }, Io = /* @__PURE__ */ E({
  __name: "SettingsPage",
  setup(n) {
    return (e, o) => (s(), a("div", Co, [
      o[0] || (o[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      D(xo)
    ]));
  }
}), Mo = /* @__PURE__ */ P(Io, [["__scopeId", "data-v-f9ca8a28"]]);
function So() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function Bo(n) {
  const e = n.routerBase || "/app", o = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: vn
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: Vn
    },
    {
      path: `${e}/login`,
      name: "login",
      component: On
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: co
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: Mo
    }
  ];
  return n.extraRoutes && o.push(...n.extraRoutes), o.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: dt,
    props: { appName: n.app }
  }), o;
}
function Wi(n) {
  const e = {
    ...So(),
    ...n
  }, o = qe(), r = e.routerBase || "/app", d = Ke({
    history: Oe(r),
    routes: Bo(e)
  }), v = Ue(lt);
  return v.provide("apiBase", e.apiBase), v.use(o), v.use(d), v;
}
const To = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Eo(n, e) {
  return s(), a("svg", To, [...e[0] || (e[0] = [
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
const Po = $({ name: "lucide-play", render: Eo }), Vo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Lo(n, e) {
  return s(), a("svg", Vo, [...e[0] || (e[0] = [
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
const jo = $({ name: "lucide-pause", render: Lo }), Ao = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ro(n, e) {
  return s(), a("svg", Ao, [...e[0] || (e[0] = [
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
const Fo = $({ name: "lucide-skip-back", render: Ro }), Do = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Uo(n, e) {
  return s(), a("svg", Do, [...e[0] || (e[0] = [
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
const zo = $({ name: "lucide-skip-forward", render: Uo }), No = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qo(n, e) {
  return s(), a("svg", No, [...e[0] || (e[0] = [
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
const Ho = $({ name: "lucide-rotate-ccw", render: qo }), Go = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ko(n, e) {
  return s(), a("svg", Go, [...e[0] || (e[0] = [
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
const Oo = $({ name: "lucide-rotate-cw", render: Ko }), Yo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xo(n, e) {
  return s(), a("svg", Yo, [...e[0] || (e[0] = [
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
const Jo = $({ name: "lucide-volume-2", render: Xo }), Wo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qo(n, e) {
  return s(), a("svg", Wo, [...e[0] || (e[0] = [
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
const Zo = $({ name: "lucide-volume-1", render: Qo }), es = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ts(n, e) {
  return s(), a("svg", es, [...e[0] || (e[0] = [
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
const ns = $({ name: "lucide-volume-x", render: ts }), os = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ss(n, e) {
  return s(), a("svg", os, [...e[0] || (e[0] = [
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
const as = $({ name: "lucide-captions", render: ss }), ls = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function rs(n, e) {
  return s(), a("svg", ls, [...e[0] || (e[0] = [
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
const is = $({ name: "lucide-picture-in-picture-2", render: rs }), cs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ds(n, e) {
  return s(), a("svg", cs, [...e[0] || (e[0] = [
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
const us = $({ name: "lucide-rectangle-horizontal", render: ds }), vs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function hs(n, e) {
  return s(), a("svg", vs, [...e[0] || (e[0] = [
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
const ms = $({ name: "lucide-maximize", render: hs }), ps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fs(n, e) {
  return s(), a("svg", ps, [...e[0] || (e[0] = [
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
const gs = $({ name: "lucide-minimize", render: fs }), _s = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function bs(n, e) {
  return s(), a("svg", _s, [...e[0] || (e[0] = [
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
const ks = $({ name: "lucide-maximize-2", render: bs }), ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ws(n, e) {
  return s(), a("svg", ys, [...e[0] || (e[0] = [
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
const $s = $({ name: "lucide-cast", render: ws }), xs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Cs(n, e) {
  return s(), a("svg", xs, [...e[0] || (e[0] = [
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
const Is = $({ name: "lucide-settings", render: Cs }), Ms = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ss(n, e) {
  return s(), a("svg", Ms, [...e[0] || (e[0] = [
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
const Bs = $({ name: "lucide-gauge", render: Ss }), Ts = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Es(n, e) {
  return s(), a("svg", Ts, [...e[0] || (e[0] = [
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
const Ps = $({ name: "lucide-film", render: Es }), Vs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ls(n, e) {
  return s(), a("svg", Vs, [...e[0] || (e[0] = [
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
const js = $({ name: "lucide-image", render: Ls }), As = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Rs(n, e) {
  return s(), a("svg", As, [...e[0] || (e[0] = [
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
const Fs = $({ name: "lucide-music", render: Rs }), Ds = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Us(n, e) {
  return s(), a("svg", Ds, [...e[0] || (e[0] = [
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
const zs = $({ name: "lucide-tv", render: Us }), Ns = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qs(n, e) {
  return s(), a("svg", Ns, [...e[0] || (e[0] = [
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
const Hs = $({ name: "lucide-search", render: qs }), Gs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ks(n, e) {
  return s(), a("svg", Gs, [...e[0] || (e[0] = [
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
const Os = $({ name: "lucide-sliders-horizontal", render: Ks }), Ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xs(n, e) {
  return s(), a("svg", Ys, [...e[0] || (e[0] = [
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
const Js = $({ name: "lucide-calendar", render: Xs }), Ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qs(n, e) {
  return s(), a("svg", Ws, [...e[0] || (e[0] = [
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
const Zs = $({ name: "lucide-arrow-up-down", render: Qs }), ea = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ta(n, e) {
  return s(), a("svg", ea, [...e[0] || (e[0] = [
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
const na = $({ name: "lucide-star", render: ta }), oa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function sa(n, e) {
  return s(), a("svg", oa, [...e[0] || (e[0] = [
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
const aa = $({ name: "lucide-list", render: sa }), la = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ra(n, e) {
  return s(), a("svg", la, [...e[0] || (e[0] = [
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
const ia = $({ name: "lucide-plus", render: ra }), ca = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function da(n, e) {
  return s(), a("svg", ca, [...e[0] || (e[0] = [
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
const ua = $({ name: "lucide-info", render: da }), va = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ha(n, e) {
  return s(), a("svg", va, [...e[0] || (e[0] = [
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
const ma = $({ name: "lucide-x", render: ha }), pa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fa(n, e) {
  return s(), a("svg", pa, [...e[0] || (e[0] = [
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
const ga = $({ name: "lucide-check", render: fa }), _a = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ba(n, e) {
  return s(), a("svg", _a, [...e[0] || (e[0] = [
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
const ka = $({ name: "lucide-bookmark", render: ba }), ya = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wa(n, e) {
  return s(), a("svg", ya, [...e[0] || (e[0] = [
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
const $a = $({ name: "lucide-bookmark-plus", render: wa }), xa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ca(n, e) {
  return s(), a("svg", xa, [...e[0] || (e[0] = [
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
const Ia = $({ name: "lucide-heart", render: Ca }), Ma = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Sa(n, e) {
  return s(), a("svg", Ma, [...e[0] || (e[0] = [
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
const Ba = $({ name: "lucide-user", render: Sa }), Ta = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ea(n, e) {
  return s(), a("svg", Ta, [...e[0] || (e[0] = [
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
const Pa = $({ name: "lucide-log-out", render: Ea }), Va = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function La(n, e) {
  return s(), a("svg", Va, [...e[0] || (e[0] = [
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
const ja = $({ name: "lucide-menu", render: La }), Aa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ra(n, e) {
  return s(), a("svg", Aa, [...e[0] || (e[0] = [
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
const Fa = $({ name: "lucide-more-horizontal", render: Ra }), Da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ua(n, e) {
  return s(), a("svg", Da, [...e[0] || (e[0] = [
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
const za = $({ name: "lucide-eye", render: Ua }), Na = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qa(n, e) {
  return s(), a("svg", Na, [...e[0] || (e[0] = [
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
const Ha = $({ name: "lucide-eye-off", render: qa }), Ga = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ka(n, e) {
  return s(), a("svg", Ga, [...e[0] || (e[0] = [
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
const Oa = $({ name: "lucide-arrow-left", render: Ka }), Ya = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xa(n, e) {
  return s(), a("svg", Ya, [...e[0] || (e[0] = [
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
const Ja = $({ name: "lucide-arrow-up", render: Xa }), Wa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qa(n, e) {
  return s(), a("svg", Wa, [...e[0] || (e[0] = [
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
const Za = $({ name: "lucide-arrow-down", render: Qa }), el = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function tl(n, e) {
  return s(), a("svg", el, [...e[0] || (e[0] = [
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
const nl = $({ name: "lucide-chevron-down", render: tl }), ol = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function sl(n, e) {
  return s(), a("svg", ol, [...e[0] || (e[0] = [
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
const al = $({ name: "lucide-chevron-up", render: sl }), ll = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function rl(n, e) {
  return s(), a("svg", ll, [...e[0] || (e[0] = [
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
const il = $({ name: "lucide-chevron-left", render: rl }), cl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function dl(n, e) {
  return s(), a("svg", cl, [...e[0] || (e[0] = [
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
const ul = $({ name: "lucide-chevron-right", render: dl }), vl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function hl(n, e) {
  return s(), a("svg", vl, [...e[0] || (e[0] = [
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
const ml = $({ name: "lucide-loader-circle", render: hl }), pl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fl(n, e) {
  return s(), a("svg", pl, [...e[0] || (e[0] = [
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
const gl = $({ name: "lucide-circle-alert", render: fl }), _l = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function bl(n, e) {
  return s(), a("svg", _l, [...e[0] || (e[0] = [
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
const kl = $({ name: "lucide-circle-check", render: bl }), yl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function wl(n, e) {
  return s(), a("svg", yl, [...e[0] || (e[0] = [
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
const $l = $({ name: "lucide-circle-x", render: wl }), xl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Cl(n, e) {
  return s(), a("svg", xl, [...e[0] || (e[0] = [
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
const Il = $({ name: "lucide-sun", render: Cl }), Ml = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Sl(n, e) {
  return s(), a("svg", Ml, [...e[0] || (e[0] = [
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
const Bl = $({ name: "lucide-moon", render: Sl }), Tl = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function El(n, e) {
  return s(), a("svg", Tl, [...e[0] || (e[0] = [
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
const Pl = $({ name: "lucide-monitor", render: El }), O = /* @__PURE__ */ E({
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
      play: Po,
      pause: jo,
      "skip-back": Fo,
      "skip-forward": zo,
      rewind: Ho,
      forward: Oo,
      volume: Jo,
      "volume-low": Zo,
      mute: ns,
      captions: as,
      pip: is,
      theater: us,
      fullscreen: ms,
      "fullscreen-exit": gs,
      expand: ks,
      cast: $s,
      settings: Is,
      speed: Bs,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: Ps,
      image: js,
      music: Fs,
      tv: zs,
      search: Hs,
      filter: Os,
      calendar: Js,
      sort: Zs,
      star: na,
      list: aa,
      // actions
      plus: ia,
      info: ua,
      x: ma,
      check: ga,
      bookmark: ka,
      "bookmark-plus": $a,
      heart: Ia,
      user: Ba,
      "log-out": Pa,
      menu: ja,
      more: Fa,
      eye: za,
      "eye-off": Ha,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": Oa,
      "arrow-up": Ja,
      "arrow-down": Za,
      "chevron-down": nl,
      "chevron-up": al,
      "chevron-left": il,
      "chevron-right": ul,
      // status / theme
      spinner: ml,
      alert: gl,
      success: kl,
      error: $l,
      sun: Il,
      moon: Bl,
      monitor: Pl
    }, o = n, r = V(() => e[o.name]), d = V(
      () => o.size === void 0 ? void 0 : typeof o.size == "number" ? `${o.size}px` : o.size
    );
    return (v, c) => (s(), G(ze(r.value), {
      class: "phlix-icon",
      style: se(d.value ? { fontSize: d.value } : void 0),
      "stroke-width": n.strokeWidth,
      role: n.label ? "img" : void 0,
      "aria-label": n.label,
      "aria-hidden": n.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), Vl = ["type", "disabled", "aria-busy"], Ll = {
  key: 0,
  class: "phlix-btn__spinner"
}, jl = { class: "phlix-btn__label" }, Al = /* @__PURE__ */ E({
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
    const e = n, o = V(() => e.disabled || e.loading);
    return (r, d) => (s(), a("button", {
      type: n.type,
      class: A(["phlix-btn", [`phlix-btn--${n.variant}`, `phlix-btn--${n.size}`, { "phlix-btn--block": n.block, "is-loading": n.loading }]]),
      disabled: o.value,
      "aria-busy": n.loading || void 0
    }, [
      n.loading ? (s(), a("span", Ll, [
        D(O, { name: "spinner" })
      ])) : C("", !0),
      n.leftIcon && !n.loading ? (s(), G(O, {
        key: 1,
        name: n.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : C("", !0),
      t("span", jl, [
        H(r.$slots, "default", {}, void 0, !0)
      ]),
      n.rightIcon ? (s(), G(O, {
        key: 2,
        name: n.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : C("", !0)
    ], 10, Vl));
  }
}), Qi = /* @__PURE__ */ P(Al, [["__scopeId", "data-v-8cdee95a"]]), Rl = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], Fl = /* @__PURE__ */ E({
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
    const e = n, o = V(() => e.disabled || e.loading);
    return (r, d) => (s(), a("button", {
      type: n.type,
      class: A(["phlix-iconbtn", [`phlix-iconbtn--${n.variant}`, `phlix-iconbtn--${n.size}`, { "is-pressed": n.pressed }]]),
      disabled: o.value,
      "aria-label": n.label,
      title: n.label,
      "aria-pressed": n.pressed === void 0 ? void 0 : n.pressed,
      "aria-busy": n.loading || void 0
    }, [
      D(O, {
        name: n.loading ? "spinner" : n.name,
        class: A({ "phlix-iconbtn__spin": n.loading })
      }, null, 8, ["name", "class"])
    ], 10, Rl));
  }
}), Pe = /* @__PURE__ */ P(Fl, [["__scopeId", "data-v-fc0cd545"]]), Dl = ["role", "aria-label"], Ul = /* @__PURE__ */ E({
  __name: "Badge",
  props: {
    tone: { default: "neutral" },
    size: { default: "sm" },
    mono: { type: Boolean, default: !1 },
    icon: {},
    label: {}
  },
  setup(n) {
    return (e, o) => (s(), a("span", {
      class: A(["phlix-badge", [`phlix-badge--${n.tone}`, `phlix-badge--${n.size}`, { "phlix-badge--mono": n.mono }]]),
      role: n.label ? "img" : void 0,
      "aria-label": n.label
    }, [
      n.icon ? (s(), G(O, {
        key: 0,
        name: n.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : C("", !0),
      H(e.$slots, "default", {}, void 0, !0)
    ], 10, Dl));
  }
}), Zi = /* @__PURE__ */ P(Ul, [["__scopeId", "data-v-8f8d0fd2"]]), zl = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], Nl = /* @__PURE__ */ E({
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
    const o = n, r = e, d = g(null), v = g(!1), c = V(() => {
      const h = o.max - o.min || 1;
      return Math.min(100, Math.max(0, (o.modelValue - o.min) / h * 100));
    }), u = V(
      () => o.formatValue ? o.formatValue(o.modelValue) : String(o.modelValue)
    );
    function f(h) {
      const M = Math.min(o.max, Math.max(o.min, h)), I = Math.round((M - o.min) / o.step), U = o.min + I * o.step;
      return Math.round(U * 1e6) / 1e6;
    }
    function i(h, M = !1) {
      const I = f(h);
      I !== o.modelValue && (r("update:modelValue", I), M && r("change", I));
    }
    function l(h) {
      const M = d.value;
      if (!M) return o.modelValue;
      const I = M.getBoundingClientRect(), U = I.width ? (h - I.left) / I.width : 0;
      return o.min + U * (o.max - o.min);
    }
    function m(h) {
      var M, I;
      o.disabled || ((I = (M = h.currentTarget).setPointerCapture) == null || I.call(M, h.pointerId), v.value = !0, i(l(h.clientX)));
    }
    function k(h) {
      v.value && i(l(h.clientX));
    }
    function p(h) {
      var M, I;
      v.value && (v.value = !1, (I = (M = h.currentTarget).releasePointerCapture) == null || I.call(M, h.pointerId), r("change", o.modelValue));
    }
    function _(h) {
      if (o.disabled) return;
      const M = (o.max - o.min) / 10;
      let I = !0;
      switch (h.key) {
        case "ArrowRight":
        case "ArrowUp":
          i(o.modelValue + o.step, !0);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          i(o.modelValue - o.step, !0);
          break;
        case "PageUp":
          i(o.modelValue + M, !0);
          break;
        case "PageDown":
          i(o.modelValue - M, !0);
          break;
        case "Home":
          i(o.min, !0);
          break;
        case "End":
          i(o.max, !0);
          break;
        default:
          I = !1;
      }
      I && h.preventDefault();
    }
    return (h, M) => (s(), a("div", {
      class: A(["phlix-slider", { "is-disabled": n.disabled }]),
      role: "slider",
      tabindex: n.disabled ? -1 : 0,
      "aria-label": n.label,
      "aria-valuemin": n.min,
      "aria-valuemax": n.max,
      "aria-valuenow": n.modelValue,
      "aria-valuetext": u.value,
      "aria-disabled": n.disabled || void 0,
      "aria-orientation": "horizontal",
      onKeydown: _
    }, [
      t("div", {
        ref_key: "trackEl",
        ref: d,
        class: "phlix-slider__track",
        onPointerdown: m,
        onPointermove: k,
        onPointerup: p
      }, [
        t("div", {
          class: "phlix-slider__fill",
          style: se({ width: c.value + "%" })
        }, null, 4),
        t("div", {
          class: "phlix-slider__thumb",
          style: se({ left: c.value + "%" })
        }, null, 4)
      ], 544)
    ], 42, zl));
  }
}), ec = /* @__PURE__ */ P(Nl, [["__scopeId", "data-v-9ca92975"]]), ql = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], Hl = ["id"], Gl = /* @__PURE__ */ E({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const o = n, r = e, d = le();
    function v() {
      o.disabled || r("update:modelValue", !o.modelValue);
    }
    return (c, u) => (s(), a("span", {
      class: A(["phlix-switch", { "is-disabled": n.disabled }])
    }, [
      t("button", {
        type: "button",
        role: "switch",
        class: A(["phlix-switch__control", { "is-on": n.modelValue }]),
        "aria-checked": n.modelValue,
        "aria-label": n.label ? void 0 : "Toggle",
        "aria-labelledby": n.label ? x(d) : void 0,
        disabled: n.disabled,
        onClick: v
      }, [...u[0] || (u[0] = [
        t("span", { class: "phlix-switch__thumb" }, null, -1)
      ])], 10, ql),
      n.label ? (s(), a("label", {
        key: 0,
        id: x(d),
        class: "phlix-switch__label",
        onClick: v
      }, b(n.label), 9, Hl)) : C("", !0)
    ], 2));
  }
}), tc = /* @__PURE__ */ P(Gl, [["__scopeId", "data-v-4631a106"]]), Kl = ["disabled", "aria-pressed"], Ol = { class: "phlix-chip__label" }, Yl = ["disabled", "aria-label"], Xl = /* @__PURE__ */ E({
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
    const o = n, r = e;
    function d() {
      o.disabled || (o.selected !== void 0 && r("update:selected", !o.selected), r("click"));
    }
    return (v, c) => (s(), a("span", {
      class: A(["phlix-chip", [`phlix-chip--${n.size}`, { "is-selected": n.selected, "is-disabled": n.disabled }]])
    }, [
      t("button", {
        type: "button",
        class: "phlix-chip__main",
        disabled: n.disabled,
        "aria-pressed": n.selected === void 0 ? void 0 : n.selected,
        onClick: d
      }, [
        n.icon ? (s(), G(O, {
          key: 0,
          name: n.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : C("", !0),
        t("span", Ol, [
          H(v.$slots, "default", {}, void 0, !0)
        ])
      ], 8, Kl),
      n.removable ? (s(), a("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: n.disabled,
        "aria-label": n.removeLabel,
        onClick: c[0] || (c[0] = (u) => r("remove"))
      }, [
        D(O, { name: "x" })
      ], 8, Yl)) : C("", !0)
    ], 2));
  }
}), nc = /* @__PURE__ */ P(Xl, [["__scopeId", "data-v-d6cd193e"]]);
function Ve(n) {
  return n.map(
    (e) => typeof e == "object" ? e : { value: e, label: String(e) }
  );
}
function ve(n, e, o) {
  var v;
  const r = n.length;
  if (r === 0) return -1;
  let d = e;
  for (let c = 0; c < r; c++)
    if (d = (d + o + r) % r, !((v = n[d]) != null && v.disabled)) return d;
  return e;
}
function de(n, e) {
  return e === "first" ? ve(n, -1, 1) : ve(n, 0, -1);
}
const Jl = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "disabled"], Wl = ["id", "aria-label"], Ql = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], Zl = { class: "phlix-select__check" }, er = /* @__PURE__ */ E({
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
    const o = n, r = e, d = V(() => Ve(o.options)), v = le(), c = g(!1), u = g(-1), f = g(null), i = g(null);
    let l = "", m;
    const k = V(() => d.value.findIndex((y) => y.value === o.modelValue)), p = V(() => {
      var y;
      return ((y = d.value[k.value]) == null ? void 0 : y.label) ?? "";
    }), _ = V(() => u.value >= 0 ? `${v}-opt-${u.value}` : void 0);
    function h() {
      o.disabled || c.value || (c.value = !0, u.value = k.value >= 0 ? k.value : de(d.value, "first"), ee(q));
    }
    function M() {
      c.value = !1;
    }
    function I(y) {
      var S, L;
      const w = d.value[y];
      !w || w.disabled || (w.value !== o.modelValue && (r("update:modelValue", w.value), r("change", w.value)), M(), (L = (S = f.value) == null ? void 0 : S.querySelector(".phlix-select__trigger")) == null || L.focus());
    }
    function U(y) {
      u.value = ve(d.value, u.value, y), ee(q);
    }
    function q() {
      var w, S;
      const y = (w = i.value) == null ? void 0 : w.querySelector(".is-active");
      (S = y == null ? void 0 : y.scrollIntoView) == null || S.call(y, { block: "nearest" });
    }
    function K(y) {
      if (!o.disabled)
        switch (y.key) {
          case "ArrowDown":
            y.preventDefault(), c.value ? U(1) : h();
            break;
          case "ArrowUp":
            y.preventDefault(), c.value ? U(-1) : h();
            break;
          case "Home":
            c.value && (y.preventDefault(), u.value = de(d.value, "first"), ee(q));
            break;
          case "End":
            c.value && (y.preventDefault(), u.value = de(d.value, "last"), ee(q));
            break;
          case "Enter":
          case " ":
            y.preventDefault(), c.value && u.value >= 0 ? I(u.value) : h();
            break;
          case "Escape":
            c.value && (y.preventDefault(), M());
            break;
          case "Tab":
            M();
            break;
          default:
            y.key.length === 1 && !y.metaKey && !y.ctrlKey && !y.altKey && R(y.key);
        }
    }
    function R(y) {
      c.value || h(), l += y.toLowerCase(), clearTimeout(m), m = setTimeout(() => l = "", 600);
      const w = d.value.findIndex((S) => !S.disabled && S.label.toLowerCase().startsWith(l));
      w >= 0 && (u.value = w, ee(q));
    }
    function T(y) {
      c.value && f.value && !f.value.contains(y.target) && M();
    }
    return ne(c, (y) => {
      y ? document.addEventListener("pointerdown", T, !0) : document.removeEventListener("pointerdown", T, !0);
    }), he(() => {
      document.removeEventListener("pointerdown", T, !0), clearTimeout(m);
    }), (y, w) => (s(), a("div", {
      ref_key: "rootEl",
      ref: f,
      class: A(["phlix-select", { "is-open": c.value, "is-disabled": n.disabled }])
    }, [
      t("button", {
        type: "button",
        class: "phlix-select__trigger",
        "aria-haspopup": "listbox",
        "aria-expanded": c.value,
        "aria-controls": c.value ? `${x(v)}-list` : void 0,
        "aria-activedescendant": c.value ? _.value : void 0,
        "aria-label": n.label,
        disabled: n.disabled,
        onClick: w[0] || (w[0] = (S) => c.value ? M() : h()),
        onKeydown: K
      }, [
        t("span", {
          class: A(["phlix-select__value", { "is-placeholder": k.value < 0 }])
        }, b(k.value >= 0 ? p.value : n.placeholder), 3),
        D(O, {
          name: "chevron-down",
          class: "phlix-select__caret"
        })
      ], 40, Jl),
      X(t("ul", {
        id: `${x(v)}-list`,
        ref_key: "listEl",
        ref: i,
        class: "phlix-select__list",
        role: "listbox",
        "aria-label": n.label
      }, [
        (s(!0), a(z, null, N(d.value, (S, L) => (s(), a("li", {
          id: `${x(v)}-opt-${L}`,
          key: S.value,
          class: A(["phlix-select__option", { "is-active": L === u.value, "is-disabled": S.disabled }]),
          role: "option",
          "aria-selected": S.value === n.modelValue,
          "aria-disabled": S.disabled || void 0,
          onClick: (Q) => I(L),
          onPointermove: (Q) => !S.disabled && (u.value = L)
        }, [
          t("span", Zl, [
            S.value === n.modelValue ? (s(), G(O, {
              key: 0,
              name: "check"
            })) : C("", !0)
          ]),
          J(" " + b(S.label), 1)
        ], 42, Ql))), 128))
      ], 8, Wl), [
        [ye, c.value]
      ])
    ], 2));
  }
}), oc = /* @__PURE__ */ P(er, [["__scopeId", "data-v-db34d47a"]]), tr = { class: "phlix-combobox__field" }, nr = ["aria-expanded", "aria-controls", "aria-activedescendant", "aria-label", "placeholder", "disabled", "value"], or = ["id", "aria-label"], sr = ["id", "aria-selected", "aria-disabled", "onClick", "onPointermove"], ar = { class: "phlix-combobox__check" }, lr = {
  key: 0,
  class: "phlix-combobox__empty",
  role: "presentation"
}, rr = /* @__PURE__ */ E({
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
    const o = n, r = e, d = V(() => Ve(o.options)), v = le(), c = g(!1), u = g(-1), f = g(""), i = g(!1), l = g(null), m = g(null), k = g(null), p = V(() => {
      var w;
      return ((w = d.value.find((S) => S.value === o.modelValue)) == null ? void 0 : w.label) ?? "";
    }), _ = V(() => {
      if (!i.value || f.value.trim() === "") return d.value;
      const w = f.value.toLowerCase();
      return d.value.filter((S) => S.label.toLowerCase().includes(w));
    }), h = V(() => u.value >= 0 ? `${v}-opt-${u.value}` : void 0);
    ne(
      () => o.modelValue,
      () => {
        c.value || (f.value = p.value);
      },
      { immediate: !0 }
    );
    function M() {
      o.disabled || c.value || (c.value = !0, u.value = _.value.findIndex((w) => w.value === o.modelValue), u.value < 0 && (u.value = _.value.findIndex((w) => !w.disabled)), ee(K));
    }
    function I() {
      f.value = p.value, i.value = !1, c.value = !1;
    }
    function U(w) {
      var L;
      const S = _.value[w];
      !S || S.disabled || (S.value !== o.modelValue && (r("update:modelValue", S.value), r("change", S.value)), f.value = S.label, i.value = !1, c.value = !1, (L = m.value) == null || L.focus());
    }
    function q(w) {
      _.value.length !== 0 && (u.value = ve(_.value, u.value, w), ee(K));
    }
    function K() {
      var w, S, L;
      (L = (S = (w = k.value) == null ? void 0 : w.querySelector(".is-active")) == null ? void 0 : S.scrollIntoView) == null || L.call(S, { block: "nearest" });
    }
    function R(w) {
      f.value = w.target.value, i.value = !0, c.value = !0, u.value = de(_.value, "first");
    }
    function T(w) {
      if (!o.disabled)
        switch (w.key) {
          case "ArrowDown":
            w.preventDefault(), c.value ? q(1) : M();
            break;
          case "ArrowUp":
            w.preventDefault(), c.value ? q(-1) : M();
            break;
          case "Enter":
            c.value && u.value >= 0 && (w.preventDefault(), U(u.value));
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
      c.value && l.value && !l.value.contains(w.target) && I();
    }
    return ne(c, (w) => {
      w ? document.addEventListener("pointerdown", y, !0) : document.removeEventListener("pointerdown", y, !0);
    }), he(() => document.removeEventListener("pointerdown", y, !0)), (w, S) => (s(), a("div", {
      ref_key: "rootEl",
      ref: l,
      class: A(["phlix-combobox", { "is-open": c.value, "is-disabled": n.disabled }])
    }, [
      t("div", tr, [
        D(O, {
          name: "search",
          class: "phlix-combobox__search"
        }),
        t("input", {
          ref_key: "inputEl",
          ref: m,
          class: "phlix-combobox__input",
          type: "text",
          role: "combobox",
          autocomplete: "off",
          "aria-autocomplete": "list",
          "aria-expanded": c.value,
          "aria-controls": c.value ? `${x(v)}-list` : void 0,
          "aria-activedescendant": c.value ? h.value : void 0,
          "aria-label": n.label,
          placeholder: n.placeholder,
          disabled: n.disabled,
          value: f.value,
          onInput: R,
          onFocus: M,
          onKeydown: T
        }, null, 40, nr),
        D(O, {
          name: "chevron-down",
          class: "phlix-combobox__caret"
        })
      ]),
      X(t("ul", {
        id: `${x(v)}-list`,
        ref_key: "listEl",
        ref: k,
        class: "phlix-combobox__list",
        role: "listbox",
        "aria-label": n.label
      }, [
        (s(!0), a(z, null, N(_.value, (L, Q) => (s(), a("li", {
          id: `${x(v)}-opt-${Q}`,
          key: L.value,
          class: A(["phlix-combobox__option", { "is-active": Q === u.value, "is-disabled": L.disabled }]),
          role: "option",
          "aria-selected": L.value === n.modelValue,
          "aria-disabled": L.disabled || void 0,
          onClick: (pe) => U(Q),
          onPointermove: (pe) => !L.disabled && (u.value = Q)
        }, [
          t("span", ar, [
            L.value === n.modelValue ? (s(), G(O, {
              key: 0,
              name: "check"
            })) : C("", !0)
          ]),
          J(" " + b(L.label), 1)
        ], 42, sr))), 128)),
        _.value.length === 0 ? (s(), a("li", lr, "No matches")) : C("", !0)
      ], 8, or), [
        [ye, c.value]
      ])
    ], 2));
  }
}), sc = /* @__PURE__ */ P(rr, [["__scopeId", "data-v-337aab6e"]]), ir = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
let ie = 0, Le = "";
function cr() {
  ie === 0 && (Le = document.body.style.overflow, document.body.style.overflow = "hidden"), ie++;
}
function Ie() {
  ie !== 0 && (ie--, ie === 0 && (document.body.style.overflow = Le));
}
function je(n, e, o = {}) {
  const r = o.lockScroll ?? !0;
  let d = null, v = !1;
  function c() {
    const l = n.value;
    return l ? Array.from(l.querySelectorAll(ir)).filter(
      (m) => !m.hasAttribute("hidden") && m.getAttribute("aria-hidden") !== "true"
    ) : [];
  }
  function u(l) {
    var h;
    if (!e.value || !n.value) return;
    if (l.key === "Escape") {
      (h = o.onEscape) != null && h.call(o) && l.preventDefault();
      return;
    }
    if (l.key !== "Tab") return;
    const m = c();
    if (m.length === 0) {
      l.preventDefault(), n.value.focus();
      return;
    }
    const k = m[0], p = m[m.length - 1], _ = document.activeElement;
    n.value.contains(_) ? l.shiftKey && _ === k ? (l.preventDefault(), p.focus()) : !l.shiftKey && _ === p && (l.preventDefault(), k.focus()) : (l.preventDefault(), k.focus());
  }
  function f() {
    d = document.activeElement, r && (cr(), v = !0), document.addEventListener("keydown", u, !0), ee(() => {
      var m;
      (m = c()[0] ?? n.value) == null || m.focus();
    });
  }
  function i() {
    var l;
    document.removeEventListener("keydown", u, !0), v && (Ie(), v = !1), d && document.contains(d) && ((l = d.focus) == null || l.call(d)), d = null;
  }
  ne(e, (l) => l ? f() : i(), { immediate: !0 }), he(() => {
    document.removeEventListener("keydown", u, !0), v && (Ie(), v = !1);
  });
}
const dr = ["aria-labelledby"], ur = {
  key: 0,
  class: "phlix-modal__header"
}, vr = ["id"], hr = { class: "phlix-modal__body" }, mr = {
  key: 1,
  class: "phlix-modal__footer"
}, pr = /* @__PURE__ */ E({
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
    const o = n, r = e, d = g(o.modelValue);
    ne(() => o.modelValue, (i) => d.value = i);
    const v = g(null), c = le();
    function u() {
      r("update:modelValue", !1), r("close");
    }
    function f() {
      o.dismissible && u();
    }
    return je(v, d, {
      onEscape: () => o.dismissible ? (u(), !0) : !1
    }), (i, l) => (s(), G(Se, { to: "body" }, [
      D(we, { name: "phlix-modal" }, {
        default: W(() => [
          n.modelValue ? (s(), a("div", {
            key: 0,
            class: "phlix-modal",
            onPointerdown: oe(f, ["self"])
          }, [
            t("div", {
              ref_key: "panelEl",
              ref: v,
              class: A(["phlix-modal__panel", `phlix-modal__panel--${n.size}`]),
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": n.title ? x(c) : void 0,
              tabindex: "-1"
            }, [
              n.title || !n.hideClose ? (s(), a("header", ur, [
                n.title ? (s(), a("h2", {
                  key: 0,
                  id: x(c),
                  class: "phlix-modal__title"
                }, b(n.title), 9, vr)) : C("", !0),
                n.hideClose ? C("", !0) : (s(), G(Pe, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  class: "phlix-modal__close",
                  onClick: u
                }))
              ])) : C("", !0),
              t("div", hr, [
                H(i.$slots, "default", {}, void 0, !0)
              ]),
              i.$slots.footer ? (s(), a("footer", mr, [
                H(i.$slots, "footer", {}, void 0, !0)
              ])) : C("", !0)
            ], 10, dr)
          ], 32)) : C("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), ac = /* @__PURE__ */ P(pr, [["__scopeId", "data-v-ad69ec41"]]), fr = ["aria-labelledby"], gr = {
  key: 0,
  class: "phlix-sheet__header"
}, _r = ["id"], br = { class: "phlix-sheet__body" }, kr = {
  key: 1,
  class: "phlix-sheet__footer"
}, yr = /* @__PURE__ */ E({
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
    const o = n, r = e, d = g(o.modelValue);
    ne(() => o.modelValue, (i) => d.value = i);
    const v = g(null), c = le();
    function u() {
      r("update:modelValue", !1), r("close");
    }
    function f() {
      o.dismissible && u();
    }
    return je(v, d, {
      onEscape: () => o.dismissible ? (u(), !0) : !1
    }), (i, l) => (s(), G(Se, { to: "body" }, [
      D(we, {
        name: `phlix-sheet-${n.side}`
      }, {
        default: W(() => [
          n.modelValue ? (s(), a("div", {
            key: 0,
            class: A(["phlix-sheet", `phlix-sheet--${n.side}`]),
            onPointerdown: oe(f, ["self"])
          }, [
            t("aside", {
              ref_key: "panelEl",
              ref: v,
              class: "phlix-sheet__panel",
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": n.title ? x(c) : void 0,
              tabindex: "-1"
            }, [
              n.title || !n.hideClose ? (s(), a("header", gr, [
                n.title ? (s(), a("h2", {
                  key: 0,
                  id: x(c),
                  class: "phlix-sheet__title"
                }, b(n.title), 9, _r)) : C("", !0),
                n.hideClose ? C("", !0) : (s(), G(Pe, {
                  key: 1,
                  name: "x",
                  label: "Close",
                  size: "sm",
                  onClick: u
                }))
              ])) : C("", !0),
              t("div", br, [
                H(i.$slots, "default", {}, void 0, !0)
              ]),
              i.$slots.footer ? (s(), a("footer", kr, [
                H(i.$slots, "footer", {}, void 0, !0)
              ])) : C("", !0)
            ], 8, fr)
          ], 34)) : C("", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ]));
  }
}), lc = /* @__PURE__ */ P(yr, [["__scopeId", "data-v-6960f9fb"]]), wr = ["id"], $r = /* @__PURE__ */ E({
  __name: "Tooltip",
  props: {
    text: {},
    placement: { default: "top" },
    delay: { default: 300 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(n) {
    const e = n, o = le(), r = g(!1), d = g(null);
    let v;
    function c() {
      var i;
      return ((i = d.value) == null ? void 0 : i.firstElementChild) ?? null;
    }
    function u() {
      e.disabled || (clearTimeout(v), v = setTimeout(() => {
        var i;
        r.value = !0, (i = c()) == null || i.setAttribute("aria-describedby", o);
      }, e.delay));
    }
    function f() {
      var i;
      clearTimeout(v), r.value = !1, (i = c()) == null || i.removeAttribute("aria-describedby");
    }
    return he(() => clearTimeout(v)), (i, l) => (s(), a("span", {
      ref_key: "wrapEl",
      ref: d,
      class: "phlix-tooltip-wrap",
      onMouseenter: u,
      onMouseleave: f,
      onFocusin: u,
      onFocusout: f,
      onKeydown: Ne(f, ["esc"])
    }, [
      H(i.$slots, "default", {}, void 0, !0),
      D(we, { name: "phlix-tooltip" }, {
        default: W(() => [
          r.value && (n.text || i.$slots.content) ? (s(), a("span", {
            key: 0,
            id: x(o),
            role: "tooltip",
            class: A(["phlix-tooltip", `phlix-tooltip--${n.placement}`])
          }, [
            H(i.$slots, "content", {}, () => [
              J(b(n.text), 1)
            ], !0)
          ], 10, wr)) : C("", !0)
        ]),
        _: 3
      })
    ], 544));
  }
}), rc = /* @__PURE__ */ P($r, [["__scopeId", "data-v-bdb87991"]]), xr = { class: "library-scan-page" }, Cr = {
  key: 0,
  class: "loading"
}, Ir = {
  key: 1,
  class: "error"
}, Mr = {
  key: 2,
  class: "libraries-list"
}, Sr = { class: "library-info" }, Br = { class: "library-name" }, Tr = { class: "library-type" }, Er = { class: "library-paths" }, Pr = { class: "library-meta" }, Vr = { key: 0 }, Lr = {
  key: 0,
  class: "scan-status"
}, jr = { class: "library-actions" }, Ar = ["onClick", "disabled"], Rr = ["onClick", "disabled"], Fr = {
  key: 0,
  class: "empty-state"
}, Dr = /* @__PURE__ */ E({
  __name: "LibraryScanPage",
  setup(n) {
    const e = g([]), o = g({}), r = g(!0), d = g(null);
    async function v() {
      try {
        const m = await Y.get("/api/v1/libraries");
        e.value = m.libraries || [];
        for (const k of e.value)
          c(k.id);
      } catch (m) {
        d.value = m instanceof Error ? m.message : "Failed to load libraries";
      } finally {
        r.value = !1;
      }
    }
    async function c(m) {
      try {
        const k = await Y.get(`/api/v1/libraries/${m}/scan-status`);
        k.job && (o.value[m] = k.job);
      } catch {
      }
    }
    async function u(m) {
      try {
        await Y.post(`/api/v1/libraries/${m}/scan`), await c(m);
      } catch (k) {
        d.value = k instanceof Error ? k.message : "Failed to trigger scan";
      }
    }
    async function f(m) {
      try {
        await Y.post(`/api/v1/libraries/${m}/rescan`), await c(m);
      } catch (k) {
        d.value = k instanceof Error ? k.message : "Failed to trigger rescan";
      }
    }
    function i(m) {
      return m ? new Date(m).toLocaleString() : "Never";
    }
    function l(m) {
      if (!m) return "";
      switch (m.status) {
        case "queued":
          return "⏳ Queued";
        case "running":
          return "🔄 Running";
        case "completed":
          return "✅ Completed";
        case "failed":
          return `❌ Failed: ${m.error || "Unknown error"}`;
        default:
          return m.status;
      }
    }
    return te(() => {
      v();
    }), (m, k) => (s(), a("div", xr, [
      k[0] || (k[0] = t("div", { class: "scan-header" }, [
        t("h1", { class: "scan-title" }, "Library Scanner"),
        t("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      r.value ? (s(), a("div", Cr, "Loading libraries...")) : d.value ? (s(), a("div", Ir, b(d.value), 1)) : (s(), a("div", Mr, [
        (s(!0), a(z, null, N(e.value, (p) => {
          var _, h, M, I;
          return s(), a("div", {
            key: p.id,
            class: "library-card"
          }, [
            t("div", Sr, [
              t("h3", Br, b(p.name), 1),
              t("span", Tr, b(p.type), 1),
              t("p", Er, b(p.paths.join(", ")), 1),
              t("div", Pr, [
                p.item_count !== void 0 ? (s(), a("span", Vr, b(p.item_count) + " items", 1)) : C("", !0),
                t("span", null, "Last scan: " + b(i(p.last_scan_at)), 1)
              ]),
              o.value[p.id] ? (s(), a("div", Lr, b(l(o.value[p.id])), 1)) : C("", !0)
            ]),
            t("div", jr, [
              t("button", {
                class: "btn btn-scan",
                onClick: (U) => u(p.id),
                disabled: ((_ = o.value[p.id]) == null ? void 0 : _.status) === "running" || ((h = o.value[p.id]) == null ? void 0 : h.status) === "queued"
              }, " Scan ", 8, Ar),
              t("button", {
                class: "btn btn-rescan",
                onClick: (U) => f(p.id),
                disabled: ((M = o.value[p.id]) == null ? void 0 : M.status) === "running" || ((I = o.value[p.id]) == null ? void 0 : I.status) === "queued"
              }, " Rescan ", 8, Rr)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (s(), a("div", Fr, " No libraries configured. Add a library to get started. ")) : C("", !0)
      ]))
    ]));
  }
}), ic = /* @__PURE__ */ P(Dr, [["__scopeId", "data-v-62b3805e"]]), Ur = { class: "my-servers-page" }, zr = {
  key: 0,
  class: "loading"
}, Nr = {
  key: 1,
  class: "error"
}, qr = {
  key: 2,
  class: "servers-list"
}, Hr = { class: "server-info" }, Gr = { class: "server-name" }, Kr = { class: "server-url" }, Or = { class: "server-meta" }, Yr = { key: 0 }, Xr = {
  key: 0,
  class: "empty-state"
}, Jr = /* @__PURE__ */ E({
  __name: "MyServersPage",
  setup(n) {
    const e = g([]), o = g(!0), r = g(null);
    async function d() {
      try {
        const u = await Y.get("/api/v1/servers");
        e.value = u.servers || [];
      } catch (u) {
        r.value = u instanceof Error ? u.message : "Failed to load servers";
      } finally {
        o.value = !1;
      }
    }
    function v(u) {
      switch (u) {
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
    function c(u) {
      return u ? new Date(u).toLocaleString() : "Never";
    }
    return te(() => {
      d();
    }), (u, f) => (s(), a("div", Ur, [
      f[2] || (f[2] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "My Servers"),
        t("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      o.value ? (s(), a("div", zr, "Loading servers...")) : r.value ? (s(), a("div", Nr, b(r.value), 1)) : (s(), a("div", qr, [
        (s(!0), a(z, null, N(e.value, (i) => (s(), a("div", {
          key: i.id,
          class: "server-card"
        }, [
          t("div", {
            class: "server-status",
            style: se({ backgroundColor: v(i.status) })
          }, null, 4),
          t("div", Hr, [
            t("h3", Gr, b(i.name), 1),
            t("p", Kr, b(i.url), 1),
            t("div", Or, [
              t("span", null, b(i.owner), 1),
              i.library_count !== void 0 ? (s(), a("span", Yr, b(i.library_count) + " libraries", 1)) : C("", !0),
              t("span", null, "Last seen: " + b(c(i.last_seen)), 1)
            ])
          ]),
          f[0] || (f[0] = t("div", { class: "server-actions" }, [
            t("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (s(), a("div", Xr, [...f[1] || (f[1] = [
          t("p", null, "No servers connected yet.", -1),
          t("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : C("", !0)
      ]))
    ]));
  }
}), cc = /* @__PURE__ */ P(Jr, [["__scopeId", "data-v-b9237da4"]]), Wr = { class: "federation-page" }, Qr = {
  key: 0,
  class: "loading"
}, Zr = {
  key: 1,
  class: "error"
}, ei = {
  key: 2,
  class: "federation-content"
}, ti = { class: "peers-section" }, ni = { class: "peers-list" }, oi = { class: "peer-info" }, si = { class: "peer-name" }, ai = { class: "peer-url" }, li = { class: "peer-meta" }, ri = { key: 0 }, ii = { class: "peer-actions" }, ci = ["onClick"], di = {
  key: 1,
  class: "status-badge"
}, ui = {
  key: 0,
  class: "empty-state"
}, vi = { class: "add-peer-section" }, hi = /* @__PURE__ */ E({
  __name: "FederationPage",
  setup(n) {
    const e = g([]), o = g(!0), r = g(null);
    async function d() {
      try {
        const i = await Y.get("/api/v1/federation/peers");
        e.value = i.peers || [];
      } catch (i) {
        r.value = i instanceof Error ? i.message : "Failed to load federation peers";
      } finally {
        o.value = !1;
      }
    }
    async function v(i) {
      try {
        await Y.post("/api/v1/federation/connect", { url: i }), await d();
      } catch (l) {
        r.value = l instanceof Error ? l.message : "Failed to connect to peer";
      }
    }
    async function c(i) {
      try {
        await Y.post(`/api/v1/federation/peers/${i}/disconnect`), await d();
      } catch (l) {
        r.value = l instanceof Error ? l.message : "Failed to disconnect peer";
      }
    }
    function u(i) {
      switch (i) {
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
    function f(i) {
      return i ? new Date(i).toLocaleString() : "Never";
    }
    return te(() => {
      d();
    }), (i, l) => (s(), a("div", Wr, [
      l[5] || (l[5] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Federation"),
        t("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      o.value ? (s(), a("div", Qr, "Loading federation peers...")) : r.value ? (s(), a("div", Zr, b(r.value), 1)) : (s(), a("div", ei, [
        t("div", ti, [
          l[2] || (l[2] = t("h2", { class: "section-title" }, "Connected Peers", -1)),
          t("div", ni, [
            (s(!0), a(z, null, N(e.value, (m) => (s(), a("div", {
              key: m.id,
              class: "peer-card"
            }, [
              t("div", {
                class: "peer-status",
                style: se({ backgroundColor: u(m.status) })
              }, null, 4),
              t("div", oi, [
                t("h3", si, b(m.name), 1),
                t("p", ai, b(m.url), 1),
                t("div", li, [
                  m.shared_libraries_count !== void 0 ? (s(), a("span", ri, b(m.shared_libraries_count) + " shared libraries", 1)) : C("", !0),
                  t("span", null, "Last sync: " + b(f(m.last_sync)), 1)
                ])
              ]),
              t("div", ii, [
                m.status === "connected" ? (s(), a("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (k) => c(m.id)
                }, " Disconnect ", 8, ci)) : m.status === "pending" ? (s(), a("span", di, "Pending")) : C("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (s(), a("div", ui, [...l[1] || (l[1] = [
              t("p", null, "No federation peers connected.", -1)
            ])])) : C("", !0)
          ])
        ]),
        t("div", vi, [
          l[4] || (l[4] = t("h2", { class: "section-title" }, "Add Peer", -1)),
          t("form", {
            class: "add-peer-form",
            onSubmit: l[0] || (l[0] = oe((m) => v(""), ["prevent"]))
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
}), dc = /* @__PURE__ */ P(hi, [["__scopeId", "data-v-91ba2781"]]), mi = { class: "manage-shares-page" }, pi = {
  key: 0,
  class: "loading"
}, fi = {
  key: 1,
  class: "error"
}, gi = {
  key: 2,
  class: "shares-list"
}, _i = { class: "share-info" }, bi = { class: "share-library" }, ki = { class: "share-meta" }, yi = {
  key: 0,
  class: "expired-badge"
}, wi = { class: "share-dates" }, $i = { key: 0 }, xi = { class: "share-actions" }, Ci = ["onClick"], Ii = {
  key: 0,
  class: "empty-state"
}, Mi = /* @__PURE__ */ E({
  __name: "ManageSharesPage",
  setup(n) {
    const e = g([]), o = g(!0), r = g(null);
    async function d() {
      try {
        const f = await Y.get("/api/v1/shares");
        e.value = f.shares || [];
      } catch (f) {
        r.value = f instanceof Error ? f.message : "Failed to load shares";
      } finally {
        o.value = !1;
      }
    }
    async function v(f) {
      try {
        await Y.delete(`/api/v1/shares/${f}`), await d();
      } catch (i) {
        r.value = i instanceof Error ? i.message : "Failed to revoke share";
      }
    }
    function c(f) {
      return new Date(f).toLocaleString();
    }
    function u(f) {
      return f ? new Date(f) < /* @__PURE__ */ new Date() : !1;
    }
    return te(() => {
      d();
    }), (f, i) => (s(), a("div", mi, [
      i[1] || (i[1] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Manage Shares"),
        t("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      o.value ? (s(), a("div", pi, "Loading shares...")) : r.value ? (s(), a("div", fi, b(r.value), 1)) : (s(), a("div", gi, [
        (s(!0), a(z, null, N(e.value, (l) => (s(), a("div", {
          key: l.id,
          class: "share-card"
        }, [
          t("div", _i, [
            t("h3", bi, b(l.library_name), 1),
            t("div", ki, [
              t("span", null, "Shared with: " + b(l.shared_with), 1),
              t("span", {
                class: A(["permission-badge", l.permissions])
              }, b(l.permissions), 3),
              l.expires_at && u(l.expires_at) ? (s(), a("span", yi, "Expired")) : C("", !0)
            ]),
            t("p", wi, [
              J(" Created: " + b(c(l.created_at)) + " ", 1),
              l.expires_at ? (s(), a("span", $i, " | Expires: " + b(c(l.expires_at)), 1)) : C("", !0)
            ])
          ]),
          t("div", xi, [
            t("button", {
              class: "btn btn-danger",
              onClick: (m) => v(l.id)
            }, "Revoke", 8, Ci)
          ])
        ]))), 128)),
        e.value.length === 0 ? (s(), a("div", Ii, [...i[0] || (i[0] = [
          t("p", null, "No library shares found.", -1)
        ])])) : C("", !0)
      ]))
    ]));
  }
}), uc = /* @__PURE__ */ P(Mi, [["__scopeId", "data-v-bd8771ac"]]), Si = { class: "audit-logs-page" }, Bi = {
  key: 0,
  class: "loading"
}, Ti = {
  key: 1,
  class: "error"
}, Ei = {
  key: 2,
  class: "logs-container"
}, Pi = { class: "logs-list" }, Vi = { class: "log-content" }, Li = { class: "log-header" }, ji = { class: "log-action" }, Ai = { class: "log-actor" }, Ri = { class: "log-time" }, Fi = {
  key: 0,
  class: "log-target"
}, Di = {
  key: 1,
  class: "log-details"
}, Ui = {
  key: 2,
  class: "log-ip"
}, zi = {
  key: 0,
  class: "empty-state"
}, Ni = {
  key: 0,
  class: "pagination"
}, qi = ["disabled"], Hi = { class: "page-info" }, Gi = ["disabled"], Ki = /* @__PURE__ */ E({
  __name: "AuditLogsPage",
  setup(n) {
    const e = g([]), o = g(!0), r = g(null), d = g(1), v = g(1);
    async function c(l = 1) {
      try {
        o.value = !0;
        const m = await Y.get(
          "/api/v1/audit-logs",
          { page: String(l) }
        );
        e.value = m.logs || [], d.value = m.page || 1, v.value = m.total_pages || 1;
      } catch (m) {
        r.value = m instanceof Error ? m.message : "Failed to load audit logs";
      } finally {
        o.value = !1;
      }
    }
    function u(l) {
      return new Date(l).toLocaleString();
    }
    function f(l) {
      return l.includes("create") || l.includes("add") ? "#22c55e" : l.includes("delete") || l.includes("remove") ? "#ef4444" : l.includes("update") || l.includes("edit") ? "#3b82f6" : l.includes("login") || l.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function i(l) {
      return l.includes("create") || l.includes("add") ? "+" : l.includes("delete") || l.includes("remove") ? "-" : l.includes("update") || l.includes("edit") ? "~" : l.includes("login") || l.includes("auth") ? "@" : "#";
    }
    return te(() => {
      c();
    }), (l, m) => (s(), a("div", Si, [
      m[3] || (m[3] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Audit Logs"),
        t("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      o.value ? (s(), a("div", Bi, "Loading audit logs...")) : r.value ? (s(), a("div", Ti, b(r.value), 1)) : (s(), a("div", Ei, [
        t("div", Pi, [
          (s(!0), a(z, null, N(e.value, (k) => (s(), a("div", {
            key: k.id,
            class: "log-entry"
          }, [
            t("div", {
              class: "log-icon",
              style: se({ backgroundColor: f(k.action) })
            }, b(i(k.action)), 5),
            t("div", Vi, [
              t("div", Li, [
                t("span", ji, b(k.action), 1),
                t("span", Ai, b(k.actor), 1),
                t("span", Ri, b(u(k.created_at)), 1)
              ]),
              k.target ? (s(), a("p", Fi, "Target: " + b(k.target), 1)) : C("", !0),
              k.details ? (s(), a("p", Di, b(k.details), 1)) : C("", !0),
              k.ip_address ? (s(), a("span", Ui, "IP: " + b(k.ip_address), 1)) : C("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (s(), a("div", zi, [...m[2] || (m[2] = [
            t("p", null, "No audit logs found.", -1)
          ])])) : C("", !0)
        ]),
        v.value > 1 ? (s(), a("div", Ni, [
          t("button", {
            class: "btn btn-secondary",
            disabled: d.value <= 1,
            onClick: m[0] || (m[0] = (k) => c(d.value - 1))
          }, " Previous ", 8, qi),
          t("span", Hi, "Page " + b(d.value) + " of " + b(v.value), 1),
          t("button", {
            class: "btn btn-secondary",
            disabled: d.value >= v.value,
            onClick: m[1] || (m[1] = (k) => c(d.value + 1))
          }, " Next ", 8, Gi)
        ])) : C("", !0)
      ]))
    ]));
  }
}), vc = /* @__PURE__ */ P(Ki, [["__scopeId", "data-v-05910fd9"]]);
export {
  me as ApiClient,
  ut as ApiError,
  ot as AppLayout,
  vc as AuditLogsPage,
  Zi as Badge,
  vn as BrowsePage,
  Qi as Button,
  nc as Chip,
  sc as Combobox,
  dc as FederationPage,
  on as FilterBar,
  O as Icon,
  Pe as IconButton,
  ic as LibraryScanPage,
  Ln as LocalStorageTokenStore,
  qn as LoginForm,
  On as LoginPage,
  uc as ManageSharesPage,
  It as MediaCard,
  Pt as MediaGrid,
  ac as Modal,
  cc as MyServersPage,
  lt as PhlixApp,
  Sn as Player,
  Vn as PlayerPage,
  oc as Select,
  xo as SettingsForm,
  Mo as SettingsPage,
  lc as Sheet,
  ao as SignupForm,
  co as SignupPage,
  ec as Slider,
  tc as Switch,
  rc as Tooltip,
  Wi as createPhlixApp,
  $e as useAuthStore,
  je as useFocusTrap,
  Ee as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
