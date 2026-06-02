var we = Object.defineProperty;
var be = (n, e, r) => e in n ? we(n, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : n[e] = r;
var ne = (n, e, r) => be(n, typeof e != "symbol" ? e + "" : e, r);
import { openBlock as s, createElementBlock as o, createElementVNode as t, renderSlot as Y, defineComponent as S, createBlock as J, withCtx as X, createVNode as A, unref as b, createTextVNode as K, toDisplayString as h, ref as m, computed as E, createCommentVNode as x, Fragment as R, renderList as L, withDirectives as q, vModelText as se, normalizeClass as N, inject as de, onMounted as G, watch as $e, onUnmounted as xe, withModifiers as ee, normalizeStyle as te, createStaticVNode as Ce, resolveComponent as pe, vModelDynamic as ce, vShow as Me, createApp as Ie, markRaw as y, resolveDynamicComponent as Se } from "vue";
import { defineStore as me, createPinia as Be } from "pinia";
import { RouterView as Te, RouterLink as ve, useRoute as Pe, useRouter as ge, createRouter as je, createWebHistory as Re } from "vue-router";
const B = (n, e) => {
  const r = n.__vccOpts || n;
  for (const [i, u] of e)
    r[i] = u;
  return r;
}, Le = {}, Ee = { class: "app-layout" }, Ae = { class: "app-header" }, Fe = { class: "header-inner" }, Ue = { class: "logo" }, ze = { class: "nav" }, Ne = { class: "app-main" }, De = { class: "app-footer" };
function Ve(n, e) {
  return s(), o("div", Ee, [
    t("header", Ae, [
      t("div", Fe, [
        t("div", Ue, [
          Y(n.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", ze, [
          Y(n.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", Ne, [
      Y(n.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", De, [
      Y(n.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const He = /* @__PURE__ */ B(Le, [["render", Ve], ["__scopeId", "data-v-9f6c6d16"]]), qe = { class: "main-nav" }, Ge = /* @__PURE__ */ S({
  __name: "PhlixApp",
  setup(n) {
    return (e, r) => (s(), J(He, null, {
      nav: X(() => [
        t("nav", qe, [
          A(b(ve), {
            to: "/app",
            class: "nav-link"
          }, {
            default: X(() => [...r[0] || (r[0] = [
              K("Browse", -1)
            ])]),
            _: 1
          }),
          A(b(ve), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: X(() => [...r[1] || (r[1] = [
              K("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: X(() => [
        A(b(Te))
      ]),
      _: 1
    }));
  }
}), Oe = /* @__PURE__ */ B(Ge, [["__scopeId", "data-v-35b5e7c6"]]), Ye = { class: "phlix-placeholder" }, Je = { class: "placeholder-content" }, Ke = /* @__PURE__ */ S({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(n) {
    return (e, r) => (s(), o("div", Ye, [
      t("div", Je, [
        r[0] || (r[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + h(n.appName) + " is initializing", 1)
      ])
    ]));
  }
}), We = /* @__PURE__ */ B(Ke, [["__scopeId", "data-v-bf79ac4c"]]);
class Xe extends Error {
  constructor(e, r, i = null) {
    super(e), this.status = r, this.body = i, this.name = "ApiError";
  }
}
function Qe(n) {
  return n === !0 || n === 1 || n === "1" || n === "true";
}
class oe {
  constructor(e = {}) {
    ne(this, "baseUrl");
    ne(this, "tokens");
    ne(this, "doFetch");
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
  async request(e, r, i = null) {
    const u = () => {
      const _ = {
        "Content-Type": "application/json"
      }, f = this.tokens.getAccessToken();
      f && (_.Authorization = `Bearer ${f}`);
      const d = { method: e, headers: _, credentials: "same-origin" };
      return i !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (d.body = JSON.stringify(i)), d;
    }, g = `${this.baseUrl}${r}`;
    let k = await this.doFetch(g, u());
    return k.status === 401 && await this.refreshToken() && (k = await this.doFetch(g, u())), this.handleResponse(k);
  }
  async handleResponse(e) {
    const u = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const g = this.extractError(u);
      throw new Xe(g, e.status, u);
    }
    return u;
  }
  extractError(e) {
    if (e && typeof e == "object") {
      const r = e;
      if (typeof r.error == "string")
        return r.error;
      if (typeof r.message == "string")
        return r.message;
    }
    return "Request failed";
  }
  async refreshToken() {
    const e = this.tokens.getRefreshToken();
    if (!e)
      return !1;
    try {
      const r = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ refresh_token: e })
      });
      if (!r.ok)
        return !1;
      const i = await r.json();
      return typeof i.access_token != "string" ? !1 : (this.tokens.setAccessToken(i.access_token), typeof i.refresh_token == "string" && this.tokens.setRefreshToken(i.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, r) {
    const i = r ? "?" + new URLSearchParams(r).toString() : "";
    return this.request("GET", e + i);
  }
  async post(e, r) {
    return this.request("POST", e, r ?? null);
  }
  async put(e, r) {
    return this.request("PUT", e, r ?? null);
  }
  async patch(e, r) {
    return this.request("PATCH", e, r ?? null);
  }
  async delete(e) {
    return this.request("DELETE", e);
  }
  isLoggedIn() {
    return this.tokens.getAccessToken() !== null;
  }
  async getCurrentUser() {
    const { user: e } = await this.get("/api/v1/auth/me");
    return { ...e, is_admin: Qe(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const z = new oe(), fe = me("media", () => {
  const n = m([]), e = m(0), r = m(!1), i = m(null), u = m(""), g = m([]), k = m(void 0), _ = m(void 0), f = m([]), d = m([]), a = m("name"), c = m("asc"), w = m(24), l = m(0), p = E(() => l.value + n.value.length < e.value), v = E(() => {
    const $ = {};
    return u.value && ($.search = u.value), g.value.length && ($.genres = g.value), k.value !== void 0 && ($.yearFrom = k.value), _.value !== void 0 && ($.yearTo = _.value), f.value.length && ($.ratings = f.value), d.value.length && ($.types = d.value), $.sort = a.value, $.order = c.value, $.limit = w.value, $.offset = l.value, $;
  }), F = E(() => {
    const $ = /* @__PURE__ */ new Set();
    return n.value.forEach((T) => {
      var I;
      return (I = T.genres) == null ? void 0 : I.forEach((W) => $.add(W));
    }), Array.from($).sort();
  }), P = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], D = ["movie", "series", "episode", "audio", "image"];
  function O($) {
    var W, H, he;
    const T = new URLSearchParams(), I = v.value;
    return I.search && T.set("search", I.search), (W = I.genres) == null || W.forEach((Q) => T.append("genres", Q)), I.yearFrom !== void 0 && T.set("yearFrom", String(I.yearFrom)), I.yearTo !== void 0 && T.set("yearTo", String(I.yearTo)), (H = I.ratings) == null || H.forEach((Q) => T.append("ratings", Q)), (he = I.types) == null || he.forEach((Q) => T.append("types", Q)), I.sort && T.set("sort", I.sort), I.order && T.set("order", I.order), T.set("limit", String(I.limit)), T.set("offset", String(I.offset)), `${$}/api/v1/media?${T.toString()}`;
  }
  async function V($, T = !1) {
    r.value = !0, i.value = null;
    try {
      const I = new oe({ baseUrl: $ }), W = O($), H = await I.get(W);
      T ? n.value = [...n.value, ...H.items] : n.value = H.items, e.value = H.total, l.value = (H.offset ?? 0) + H.items.length;
    } catch (I) {
      i.value = I instanceof Error ? I.message : "Failed to load media";
    } finally {
      r.value = !1;
    }
  }
  async function j($) {
    await V($, !0);
  }
  function M() {
    n.value = [], e.value = 0, l.value = 0, i.value = null;
  }
  function C($) {
    u.value = $, l.value = 0;
  }
  function U($) {
    g.value = $, l.value = 0;
  }
  function re($, T) {
    k.value = $, _.value = T, l.value = 0;
  }
  function _e($) {
    f.value = $, l.value = 0;
  }
  function ke($) {
    d.value = $, l.value = 0;
  }
  function ye($, T) {
    a.value = $, T && (c.value = T), l.value = 0;
  }
  return {
    items: n,
    total: e,
    loading: r,
    error: i,
    search: u,
    selectedGenres: g,
    yearFrom: k,
    yearTo: _,
    selectedRatings: f,
    selectedTypes: d,
    sort: a,
    order: c,
    limit: w,
    offset: l,
    hasMore: p,
    queryParams: v,
    availableGenres: F,
    availableRatings: P,
    availableTypes: D,
    fetchMedia: V,
    loadMore: j,
    reset: M,
    setSearch: C,
    setGenres: U,
    setYearRange: re,
    setRatings: _e,
    setTypes: ke,
    setSort: ye
  };
}), Ze = { class: "media-card" }, et = ["href"], tt = { class: "card-poster" }, nt = ["src", "alt"], st = {
  key: 1,
  class: "poster-placeholder"
}, ot = { class: "placeholder-type" }, rt = { class: "card-overlay" }, at = {
  key: 0,
  class: "card-year"
}, it = {
  key: 1,
  class: "card-rating"
}, lt = { class: "card-info" }, ct = ["title"], dt = {
  key: 0,
  class: "card-genres"
}, ut = /* @__PURE__ */ S({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(n) {
    return (e, r) => {
      var i;
      return s(), o("article", Ze, [
        t("a", {
          href: n.to ?? `/app/player/${n.item.id}`,
          class: "card-link"
        }, [
          t("div", tt, [
            n.item.poster_url ? (s(), o("img", {
              key: 0,
              src: n.item.poster_url,
              alt: n.item.name,
              loading: "lazy"
            }, null, 8, nt)) : (s(), o("div", st, [
              r[0] || (r[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", ot, h(n.item.type), 1)
            ]))
          ]),
          t("div", rt, [
            n.item.year ? (s(), o("span", at, h(n.item.year), 1)) : x("", !0),
            n.item.rating ? (s(), o("span", it, h(n.item.rating), 1)) : x("", !0)
          ]),
          t("div", lt, [
            t("h3", {
              class: "card-title",
              title: n.item.name
            }, h(n.item.name), 9, ct),
            (i = n.item.genres) != null && i.length ? (s(), o("p", dt, h(n.item.genres.slice(0, 2).join(", ")), 1)) : x("", !0)
          ])
        ], 8, et)
      ]);
    };
  }
}), ht = /* @__PURE__ */ B(ut, [["__scopeId", "data-v-e60c8481"]]), vt = { class: "media-grid-container" }, pt = {
  key: 0,
  class: "media-grid-skeleton"
}, mt = {
  key: 1,
  class: "media-grid-empty"
}, gt = {
  key: 2,
  class: "media-grid"
}, ft = /* @__PURE__ */ S({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(n) {
    return (e, r) => (s(), o("div", vt, [
      n.loading ? (s(), o("div", pt, [
        (s(), o(R, null, L(12, (i) => t("div", {
          key: i,
          class: "skeleton-card"
        }, [...r[0] || (r[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : n.items.length === 0 ? (s(), o("div", mt, [...r[1] || (r[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (s(), o("div", gt, [
        (s(!0), o(R, null, L(n.items, (i) => (s(), J(ht, {
          key: i.id,
          item: i
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), _t = /* @__PURE__ */ B(ft, [["__scopeId", "data-v-b7e87216"]]), kt = { class: "filter-bar" }, yt = { class: "filter-search" }, wt = { class: "filter-row" }, bt = { class: "filter-group" }, $t = ["value"], xt = ["value"], Ct = ["value"], Mt = { class: "filter-group" }, It = ["value"], St = ["value"], Bt = ["value"], Tt = ["value"], Pt = { class: "filter-section" }, jt = { class: "filter-chips" }, Rt = ["onClick"], Lt = { class: "filter-section" }, Et = { class: "filter-chips" }, At = ["onClick"], Ft = { class: "filter-section" }, Ut = { class: "filter-chips" }, zt = ["onClick"], Nt = { class: "filter-actions" }, Dt = { class: "result-count" }, Vt = /* @__PURE__ */ S({
  __name: "FilterBar",
  setup(n) {
    const e = fe(), r = m(e.search), i = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function u() {
      e.setSearch(r.value);
    }
    function g(l) {
      const p = e.selectedGenres;
      p.includes(l) ? e.setGenres(p.filter((v) => v !== l)) : e.setGenres([...p, l]);
    }
    function k(l) {
      const p = e.selectedRatings;
      p.includes(l) ? e.setRatings(p.filter((v) => v !== l)) : e.setRatings([...p, l]);
    }
    function _(l) {
      const p = e.selectedTypes;
      p.includes(l) ? e.setTypes(p.filter((v) => v !== l)) : e.setTypes([...p, l]);
    }
    function f(l) {
      const p = l.target;
      e.setSort(p.value);
    }
    function d(l) {
      const p = l.target;
      e.order = p.value;
    }
    const a = (/* @__PURE__ */ new Date()).getFullYear(), c = E(() => {
      const l = [];
      for (let p = a; p >= 1900; p--)
        l.push(p);
      return l;
    });
    function w() {
      r.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (l, p) => (s(), o("div", kt, [
      t("div", yt, [
        q(t("input", {
          "onUpdate:modelValue": p[0] || (p[0] = (v) => r.value = v),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: u
        }, null, 544), [
          [se, r.value]
        ])
      ]),
      t("div", wt, [
        t("div", bt, [
          p[4] || (p[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: b(e).sort,
            onChange: f
          }, [
            (s(), o(R, null, L(i, (v) => t("option", {
              key: v.value,
              value: v.value
            }, h(v.label), 9, xt)), 64))
          ], 40, $t),
          t("select", {
            class: "filter-select order-select",
            value: b(e).order,
            onChange: d
          }, [...p[3] || (p[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, Ct)
        ]),
        t("div", Mt, [
          p[7] || (p[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: b(e).yearFrom ?? "",
            onChange: p[1] || (p[1] = (v) => b(e).setYearRange(
              v.target.value ? Number(v.target.value) : void 0,
              b(e).yearTo
            ))
          }, [
            p[5] || (p[5] = t("option", { value: "" }, "From", -1)),
            (s(!0), o(R, null, L(c.value.slice(0, 50), (v) => (s(), o("option", {
              key: v,
              value: v
            }, h(v), 9, St))), 128))
          ], 40, It),
          t("select", {
            class: "filter-select",
            value: b(e).yearTo ?? "",
            onChange: p[2] || (p[2] = (v) => b(e).setYearRange(
              b(e).yearFrom,
              v.target.value ? Number(v.target.value) : void 0
            ))
          }, [
            p[6] || (p[6] = t("option", { value: "" }, "To", -1)),
            (s(!0), o(R, null, L(c.value.slice(0, 50), (v) => (s(), o("option", {
              key: v,
              value: v
            }, h(v), 9, Tt))), 128))
          ], 40, Bt)
        ])
      ]),
      t("div", Pt, [
        p[8] || (p[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", jt, [
          (s(!0), o(R, null, L(b(e).availableGenres, (v) => (s(), o("button", {
            key: v,
            class: N(["chip", { active: b(e).selectedGenres.includes(v) }]),
            onClick: (F) => g(v)
          }, h(v), 11, Rt))), 128))
        ])
      ]),
      t("div", Lt, [
        p[9] || (p[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", Et, [
          (s(!0), o(R, null, L(b(e).availableRatings, (v) => (s(), o("button", {
            key: v,
            class: N(["chip", { active: b(e).selectedRatings.includes(v) }]),
            onClick: (F) => k(v)
          }, h(v), 11, At))), 128))
        ])
      ]),
      t("div", Ft, [
        p[10] || (p[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Ut, [
          (s(!0), o(R, null, L(b(e).availableTypes, (v) => (s(), o("button", {
            key: v,
            class: N(["chip", { active: b(e).selectedTypes.includes(v) }]),
            onClick: (F) => _(v)
          }, h(v), 11, zt))), 128))
        ])
      ]),
      t("div", Nt, [
        t("button", {
          class: "clear-btn",
          onClick: w
        }, "Clear filters"),
        t("span", Dt, h(b(e).total) + " result" + h(b(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Ht = /* @__PURE__ */ B(Vt, [["__scopeId", "data-v-7089ec0b"]]), qt = { class: "browse-page" }, Gt = { class: "browse-header" }, Ot = { class: "browse-toolbar-extra" }, Yt = {
  key: 0,
  class: "browse-error"
}, Jt = {
  key: 1,
  class: "load-more"
}, Kt = {
  key: 2,
  class: "loading-more"
}, Wt = /* @__PURE__ */ S({
  __name: "BrowsePage",
  setup(n) {
    const e = de("apiBase") ?? E(() => ""), r = fe();
    function i() {
      r.reset(), r.fetchMedia(e.value);
    }
    G(i), $e(e, i);
    function u() {
      r.reset(), r.fetchMedia(e.value);
    }
    function g() {
      r.loadMore(e.value);
    }
    return (k, _) => (s(), o("div", qt, [
      t("div", Gt, [
        _[0] || (_[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", Ot, [
          Y(k.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      A(Ht, { onChange: u }),
      b(r).error ? (s(), o("div", Yt, [
        t("p", null, h(b(r).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: i
        }, "Retry")
      ])) : x("", !0),
      A(_t, {
        items: b(r).items,
        loading: b(r).loading && b(r).items.length === 0
      }, null, 8, ["items", "loading"]),
      b(r).hasMore && !b(r).loading ? (s(), o("div", Jt, [
        t("button", {
          class: "load-more-btn",
          onClick: g
        }, "Load more")
      ])) : x("", !0),
      b(r).loading && b(r).items.length > 0 ? (s(), o("div", Kt, " Loading... ")) : x("", !0)
    ]));
  }
}), Xt = /* @__PURE__ */ B(Wt, [["__scopeId", "data-v-c192afa6"]]), Qt = ["src", "poster"], Zt = { class: "controls-top" }, en = { class: "media-title" }, tn = {
  key: 0,
  class: "media-year"
}, nn = { class: "controls-center" }, sn = { class: "controls-bottom" }, on = { class: "progress-track" }, rn = { class: "controls-row" }, an = { class: "time-display" }, ln = { class: "volume-control" }, cn = ["value"], dn = { class: "speed-control" }, un = ["value"], hn = { class: "time-display" }, vn = /* @__PURE__ */ S({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(n) {
    const e = m(null), r = m(!1), i = m(0), u = m(0), g = m(1), k = m(!1), _ = m(1), f = m(!1), d = m(!0);
    let a = null;
    const c = E(
      () => u.value > 0 ? i.value / u.value * 100 : 0
    );
    function w(M) {
      if (!isFinite(M) || isNaN(M)) return "0:00";
      const C = Math.floor(M / 60), U = Math.floor(M % 60);
      return `${C}:${U.toString().padStart(2, "0")}`;
    }
    function l() {
      e.value && (r.value ? e.value.pause() : e.value.play());
    }
    function p() {
      e.value && (i.value = e.value.currentTime);
    }
    function v() {
      e.value && (u.value = e.value.duration);
    }
    function F(M) {
      const U = M.currentTarget.getBoundingClientRect(), re = (M.clientX - U.left) / U.width;
      e.value && (e.value.currentTime = re * u.value);
    }
    function P(M) {
      const C = parseFloat(M.target.value);
      g.value = C, e.value && (e.value.volume = C), k.value = C === 0;
    }
    function D() {
      k.value = !k.value, e.value && (e.value.muted = k.value);
    }
    function O(M) {
      _.value = M, e.value && (e.value.playbackRate = M);
    }
    function V() {
      var C;
      const M = (C = e.value) == null ? void 0 : C.closest(".player-container");
      M && (document.fullscreenElement ? (document.exitFullscreen(), f.value = !1) : (M.requestFullscreen(), f.value = !0));
    }
    function j() {
      d.value = !0, a && clearTimeout(a), a = setTimeout(() => {
        r.value && (d.value = !1);
      }, 3e3);
    }
    return xe(() => {
      a && clearTimeout(a);
    }), (M, C) => (s(), o("div", {
      class: N(["player-container", { "controls-hidden": !d.value && r.value }]),
      onMousemove: j,
      onClick: l
    }, [
      C[6] || (C[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: n.streamUrl,
        poster: n.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: C[0] || (C[0] = (U) => r.value = !0),
        onPause: C[1] || (C[1] = (U) => r.value = !1),
        onTimeupdate: p,
        onLoadedmetadata: v,
        onClick: ee(l, ["stop"])
      }, null, 40, Qt),
      t("div", {
        class: "player-controls",
        onClick: C[4] || (C[4] = ee(() => {
        }, ["stop"]))
      }, [
        t("div", Zt, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: C[2] || (C[2] = (U) => M.$router.back())
          }, " ← Back "),
          t("span", en, h(n.media.name), 1),
          n.media.year ? (s(), o("span", tn, h(n.media.year), 1)) : x("", !0)
        ]),
        t("div", nn, [
          t("button", {
            class: "play-btn",
            onClick: l
          }, h(r.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", sn, [
          t("div", {
            class: "progress-bar",
            onClick: F
          }, [
            t("div", on, [
              t("div", {
                class: "progress-fill",
                style: te({ width: c.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", rn, [
            t("span", an, h(w(i.value)), 1),
            t("div", ln, [
              t("button", {
                class: "ctrl-btn",
                onClick: D
              }, h(k.value || g.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: k.value ? 0 : g.value,
                class: "volume-slider",
                onInput: P
              }, null, 40, cn)
            ]),
            t("div", dn, [
              t("select", {
                class: "speed-select",
                value: _.value,
                onChange: C[3] || (C[3] = (U) => O(Number(U.target.value)))
              }, [...C[5] || (C[5] = [
                Ce('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, un)
            ]),
            t("span", hn, h(w(u.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: V
            }, h(f.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), pn = /* @__PURE__ */ B(vn, [["__scopeId", "data-v-7a51063f"]]), mn = { class: "player-page" }, gn = {
  key: 0,
  class: "player-loading"
}, fn = {
  key: 1,
  class: "player-error"
}, _n = /* @__PURE__ */ S({
  __name: "PlayerPage",
  setup(n) {
    const e = de("apiBase", E(() => "")), r = Pe(), i = m(null), u = m(""), g = m(!0), k = m(null);
    async function _() {
      const f = r.params.id;
      if (!f) {
        k.value = "No media ID provided", g.value = !1;
        return;
      }
      try {
        const d = new oe({ baseUrl: e.value }), [a, c] = await Promise.all([
          d.get(`/api/v1/media/${f}`),
          d.get(`/api/v1/media/${f}/playback-info`).catch(() => null)
        ]);
        i.value = a, c != null && c.url ? u.value = c.url : u.value = `${e.value}/media/${f}/stream`;
      } catch (d) {
        k.value = d instanceof Error ? d.message : "Failed to load media";
      } finally {
        g.value = !1;
      }
    }
    return G(_), (f, d) => (s(), o("div", mn, [
      g.value ? (s(), o("div", gn, "Loading...")) : k.value ? (s(), o("div", fn, [
        t("p", null, h(k.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: _
        }, "Retry")
      ])) : i.value ? (s(), J(pn, {
        key: 2,
        media: i.value,
        "stream-url": u.value
      }, null, 8, ["media", "stream-url"])) : x("", !0)
    ]));
  }
}), kn = /* @__PURE__ */ B(_n, [["__scopeId", "data-v-d9061b47"]]), ae = "access_token", ie = "refresh_token", le = "user";
class yn {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(ae);
  }
  setAccessToken(e) {
    this.storage.setItem(ae, e);
  }
  getRefreshToken() {
    return this.storage.getItem(ie);
  }
  setRefreshToken(e) {
    this.storage.setItem(ie, e);
  }
  getUser() {
    const e = this.storage.getItem(le);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(le, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(ae), this.storage.removeItem(ie), this.storage.removeItem(le);
  }
}
const ue = me("auth", () => {
  const n = new yn(), e = de("apiBase", ""), r = new oe({ tokenStore: n, baseUrl: e }), i = m(null), u = m(!1), g = m(null), k = E(() => n.getAccessToken() !== null), _ = E(() => {
    var w;
    return ((w = i.value) == null ? void 0 : w.is_admin) === !0;
  });
  async function f(w, l) {
    u.value = !0, g.value = null;
    try {
      const p = await r.post("/api/v1/auth/login", { email: w, password: l });
      return n.setAccessToken(p.access_token), n.setRefreshToken(p.refresh_token), await a(), !0;
    } catch (p) {
      return g.value = p instanceof Error ? p.message : "Login failed", !1;
    } finally {
      u.value = !1;
    }
  }
  async function d(w, l, p) {
    u.value = !0, g.value = null;
    try {
      const v = await r.post("/api/v1/auth/register", { email: w, username: l, password: p });
      return n.setAccessToken(v.access_token), n.setRefreshToken(v.refresh_token), await a(), !0;
    } catch (v) {
      return g.value = v instanceof Error ? v.message : "Registration failed", !1;
    } finally {
      u.value = !1;
    }
  }
  async function a() {
    if (k.value)
      try {
        i.value = await r.getCurrentUser();
      } catch {
        i.value = null, n.clear();
      }
  }
  function c() {
    n.clear(), i.value = null;
  }
  return {
    user: i,
    loading: u,
    error: g,
    isLoggedIn: k,
    isAdmin: _,
    client: r,
    login: f,
    signup: d,
    fetchUser: a,
    logout: c
  };
}), wn = {
  key: 0,
  class: "form-error"
}, bn = { class: "field" }, $n = { class: "field" }, xn = { class: "password-wrapper" }, Cn = ["type"], Mn = ["disabled"], In = { class: "form-footer" }, Sn = /* @__PURE__ */ S({
  __name: "LoginForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const r = e, i = ue(), u = ge(), g = m(""), k = m(""), _ = m(!1);
    async function f() {
      await i.login(g.value, k.value) && (r("success"), u.push("/app"));
    }
    return (d, a) => {
      const c = pe("router-link");
      return s(), o("form", {
        class: "login-form",
        onSubmit: ee(f, ["prevent"])
      }, [
        a[7] || (a[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        b(i).error ? (s(), o("div", wn, h(b(i).error), 1)) : x("", !0),
        t("div", bn, [
          a[3] || (a[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          q(t("input", {
            id: "email",
            "onUpdate:modelValue": a[0] || (a[0] = (w) => g.value = w),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [se, g.value]
          ])
        ]),
        t("div", $n, [
          a[4] || (a[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", xn, [
            q(t("input", {
              id: "password",
              "onUpdate:modelValue": a[1] || (a[1] = (w) => k.value = w),
              type: _.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, Cn), [
              [ce, k.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: a[2] || (a[2] = (w) => _.value = !_.value)
            }, h(_.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: b(i).loading
        }, h(b(i).loading ? "Signing in..." : "Sign in"), 9, Mn),
        t("p", In, [
          a[6] || (a[6] = K(" Don't have an account? ", -1)),
          A(c, {
            to: "/app/signup",
            class: "link"
          }, {
            default: X(() => [...a[5] || (a[5] = [
              K("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Bn = /* @__PURE__ */ B(Sn, [["__scopeId", "data-v-22bc5576"]]), Tn = { class: "auth-page" }, Pn = { class: "auth-card" }, jn = /* @__PURE__ */ S({
  __name: "LoginPage",
  setup(n) {
    return (e, r) => (s(), o("div", Tn, [
      t("div", Pn, [
        A(Bn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Rn = /* @__PURE__ */ B(jn, [["__scopeId", "data-v-9c53ce6a"]]), Ln = {
  key: 0,
  class: "form-error"
}, En = { class: "field" }, An = { class: "field" }, Fn = { class: "field" }, Un = { class: "password-wrapper" }, zn = ["type"], Nn = { class: "field" }, Dn = ["type"], Vn = ["disabled"], Hn = { class: "form-footer" }, qn = /* @__PURE__ */ S({
  __name: "SignupForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const r = e, i = ue(), u = ge(), g = m(""), k = m(""), _ = m(""), f = m(""), d = m(!1), a = m(null);
    async function c() {
      if (a.value = null, _.value.length < 8) {
        a.value = "Password must be at least 8 characters.";
        return;
      }
      if (_.value !== f.value) {
        a.value = "Passwords do not match.";
        return;
      }
      await i.signup(g.value, k.value, _.value) && (r("success"), u.push("/app"));
    }
    return (w, l) => {
      const p = pe("router-link");
      return s(), o("form", {
        class: "signup-form",
        onSubmit: ee(c, ["prevent"])
      }, [
        l[11] || (l[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        b(i).error || a.value ? (s(), o("div", Ln, h(b(i).error || a.value), 1)) : x("", !0),
        t("div", En, [
          l[5] || (l[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          q(t("input", {
            id: "email",
            "onUpdate:modelValue": l[0] || (l[0] = (v) => g.value = v),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [se, g.value]
          ])
        ]),
        t("div", An, [
          l[6] || (l[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          q(t("input", {
            id: "username",
            "onUpdate:modelValue": l[1] || (l[1] = (v) => k.value = v),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [se, k.value]
          ])
        ]),
        t("div", Fn, [
          l[7] || (l[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Un, [
            q(t("input", {
              id: "password",
              "onUpdate:modelValue": l[2] || (l[2] = (v) => _.value = v),
              type: d.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, zn), [
              [ce, _.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: l[3] || (l[3] = (v) => d.value = !d.value)
            }, h(d.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", Nn, [
          l[8] || (l[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          q(t("input", {
            id: "confirm",
            "onUpdate:modelValue": l[4] || (l[4] = (v) => f.value = v),
            type: d.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Dn), [
            [ce, f.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: b(i).loading
        }, h(b(i).loading ? "Creating account..." : "Create account"), 9, Vn),
        t("p", Hn, [
          l[10] || (l[10] = K(" Already have an account? ", -1)),
          A(p, {
            to: "/app/login",
            class: "link"
          }, {
            default: X(() => [...l[9] || (l[9] = [
              K("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Gn = /* @__PURE__ */ B(qn, [["__scopeId", "data-v-d5e42c72"]]), On = { class: "auth-page" }, Yn = { class: "auth-card" }, Jn = /* @__PURE__ */ S({
  __name: "SignupPage",
  setup(n) {
    return (e, r) => (s(), o("div", On, [
      t("div", Yn, [
        A(Gn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Kn = /* @__PURE__ */ B(Jn, [["__scopeId", "data-v-609331e4"]]), Wn = { class: "settings-form" }, Xn = {
  key: 0,
  class: "settings-loading"
}, Qn = {
  key: 1,
  class: "settings-error"
}, Zn = { class: "group-title" }, es = ["for"], ts = { class: "setting-control" }, ns = ["id", "checked", "onChange"], ss = ["id", "value", "onChange"], os = ["id", "value", "onChange"], rs = { class: "settings-actions" }, as = {
  key: 0,
  class: "success-msg"
}, is = ["disabled"], ls = /* @__PURE__ */ S({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(n, { emit: e }) {
    const r = n, i = e, u = ue(), g = m({}), k = m(!0), _ = m(!1), f = m(null), d = m(null), a = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], c = E(
      () => r.groups ? a.filter((P) => r.groups.includes(P)) : a
    );
    async function w() {
      k.value = !0, f.value = null;
      try {
        const P = await u.client.get("/api/v1/users/me/settings");
        g.value = P;
      } catch (P) {
        f.value = P instanceof Error ? P.message : "Failed to load settings";
      } finally {
        k.value = !1;
      }
    }
    async function l() {
      _.value = !0, f.value = null, d.value = null;
      try {
        await u.client.put("/api/v1/users/me/settings", g.value), d.value = "Settings saved.", i("saved", g.value), setTimeout(() => {
          d.value = null;
        }, 3e3);
      } catch (P) {
        f.value = P instanceof Error ? P.message : "Failed to save settings";
      } finally {
        _.value = !1;
      }
    }
    function p(P, D) {
      g.value[P] = D;
    }
    G(w);
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
    }, F = {
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
    return (P, D) => (s(), o("div", Wn, [
      k.value ? (s(), o("div", Xn, "Loading settings...")) : f.value ? (s(), o("div", Qn, h(f.value), 1)) : (s(), o(R, { key: 2 }, [
        (s(!0), o(R, null, L(c.value, (O) => (s(), o("div", {
          key: O,
          class: "settings-group"
        }, [
          t("h3", Zn, h(v[O]), 1),
          (s(), o(R, null, L(F, (V, j) => q(t("div", {
            key: j,
            class: "setting-row"
          }, [
            t("label", {
              for: j,
              class: "setting-label"
            }, h(V.label), 9, es),
            t("div", ts, [
              V.type === "bool" ? (s(), o("input", {
                key: 0,
                id: j,
                type: "checkbox",
                class: "toggle",
                checked: !!g.value[j],
                onChange: (M) => p(j, M.target.checked)
              }, null, 40, ns)) : V.type === "number" ? (s(), o("input", {
                key: 1,
                id: j,
                type: "number",
                class: "input number-input",
                value: g.value[j],
                onChange: (M) => p(j, Number(M.target.value))
              }, null, 40, ss)) : (s(), o("input", {
                key: 2,
                id: j,
                type: "text",
                class: "input",
                value: g.value[j] ?? "",
                onChange: (M) => p(j, M.target.value)
              }, null, 40, os))
            ])
          ]), [
            [Me, j.startsWith(O)]
          ])), 64))
        ]))), 128)),
        t("div", rs, [
          d.value ? (s(), o("div", as, h(d.value), 1)) : x("", !0),
          t("button", {
            class: "save-btn",
            disabled: _.value,
            onClick: l
          }, h(_.value ? "Saving..." : "Save settings"), 9, is)
        ])
      ], 64))
    ]));
  }
}), cs = /* @__PURE__ */ B(ls, [["__scopeId", "data-v-51b588b6"]]), ds = { class: "settings-page" }, us = /* @__PURE__ */ S({
  __name: "SettingsPage",
  setup(n) {
    return (e, r) => (s(), o("div", ds, [
      r[0] || (r[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      A(cs)
    ]));
  }
}), hs = /* @__PURE__ */ B(us, [["__scopeId", "data-v-f9ca8a28"]]);
function vs() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function ps(n) {
  const e = n.routerBase || "/app", r = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: Xt
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: kn
    },
    {
      path: `${e}/login`,
      name: "login",
      component: Rn
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Kn
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: hs
    }
  ];
  return n.extraRoutes && r.push(...n.extraRoutes), r.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: We,
    props: { appName: n.app }
  }), r;
}
function el(n) {
  const e = {
    ...vs(),
    ...n
  }, r = Be(), i = e.routerBase || "/app", u = je({
    history: Re(i),
    routes: ps(e)
  }), g = Ie(Oe);
  return g.provide("apiBase", e.apiBase), g.use(r), g.use(u), g;
}
const ms = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gs(n, e) {
  return s(), o("svg", ms, [...e[0] || (e[0] = [
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
const fs = y({ name: "lucide-play", render: gs }), _s = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ks(n, e) {
  return s(), o("svg", _s, [...e[0] || (e[0] = [
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
const ys = y({ name: "lucide-pause", render: ks }), ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function bs(n, e) {
  return s(), o("svg", ws, [...e[0] || (e[0] = [
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
const $s = y({ name: "lucide-skip-back", render: bs }), xs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Cs(n, e) {
  return s(), o("svg", xs, [...e[0] || (e[0] = [
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
const Ms = y({ name: "lucide-skip-forward", render: Cs }), Is = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ss(n, e) {
  return s(), o("svg", Is, [...e[0] || (e[0] = [
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
const Bs = y({ name: "lucide-rotate-ccw", render: Ss }), Ts = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ps(n, e) {
  return s(), o("svg", Ts, [...e[0] || (e[0] = [
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
const js = y({ name: "lucide-rotate-cw", render: Ps }), Rs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ls(n, e) {
  return s(), o("svg", Rs, [...e[0] || (e[0] = [
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
const Es = y({ name: "lucide-volume-2", render: Ls }), As = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fs(n, e) {
  return s(), o("svg", As, [...e[0] || (e[0] = [
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
const Us = y({ name: "lucide-volume-1", render: Fs }), zs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ns(n, e) {
  return s(), o("svg", zs, [...e[0] || (e[0] = [
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
const Ds = y({ name: "lucide-volume-x", render: Ns }), Vs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Hs(n, e) {
  return s(), o("svg", Vs, [...e[0] || (e[0] = [
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
const qs = y({ name: "lucide-captions", render: Hs }), Gs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Os(n, e) {
  return s(), o("svg", Gs, [...e[0] || (e[0] = [
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
const Ys = y({ name: "lucide-picture-in-picture-2", render: Os }), Js = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ks(n, e) {
  return s(), o("svg", Js, [...e[0] || (e[0] = [
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
const Ws = y({ name: "lucide-rectangle-horizontal", render: Ks }), Xs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qs(n, e) {
  return s(), o("svg", Xs, [...e[0] || (e[0] = [
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
const Zs = y({ name: "lucide-maximize", render: Qs }), eo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function to(n, e) {
  return s(), o("svg", eo, [...e[0] || (e[0] = [
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
const no = y({ name: "lucide-minimize", render: to }), so = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function oo(n, e) {
  return s(), o("svg", so, [...e[0] || (e[0] = [
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
const ro = y({ name: "lucide-maximize-2", render: oo }), ao = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function io(n, e) {
  return s(), o("svg", ao, [...e[0] || (e[0] = [
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
const lo = y({ name: "lucide-cast", render: io }), co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function uo(n, e) {
  return s(), o("svg", co, [...e[0] || (e[0] = [
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
const ho = y({ name: "lucide-settings", render: uo }), vo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function po(n, e) {
  return s(), o("svg", vo, [...e[0] || (e[0] = [
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
const mo = y({ name: "lucide-gauge", render: po }), go = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fo(n, e) {
  return s(), o("svg", go, [...e[0] || (e[0] = [
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
const _o = y({ name: "lucide-film", render: fo }), ko = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function yo(n, e) {
  return s(), o("svg", ko, [...e[0] || (e[0] = [
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
const wo = y({ name: "lucide-image", render: yo }), bo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $o(n, e) {
  return s(), o("svg", bo, [...e[0] || (e[0] = [
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
const xo = y({ name: "lucide-music", render: $o }), Co = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Mo(n, e) {
  return s(), o("svg", Co, [...e[0] || (e[0] = [
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
const Io = y({ name: "lucide-tv", render: Mo }), So = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bo(n, e) {
  return s(), o("svg", So, [...e[0] || (e[0] = [
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
const To = y({ name: "lucide-search", render: Bo }), Po = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function jo(n, e) {
  return s(), o("svg", Po, [...e[0] || (e[0] = [
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
const Ro = y({ name: "lucide-sliders-horizontal", render: jo }), Lo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Eo(n, e) {
  return s(), o("svg", Lo, [...e[0] || (e[0] = [
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
const Ao = y({ name: "lucide-calendar", render: Eo }), Fo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Uo(n, e) {
  return s(), o("svg", Fo, [...e[0] || (e[0] = [
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
const zo = y({ name: "lucide-arrow-up-down", render: Uo }), No = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Do(n, e) {
  return s(), o("svg", No, [...e[0] || (e[0] = [
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
const Vo = y({ name: "lucide-star", render: Do }), Ho = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qo(n, e) {
  return s(), o("svg", Ho, [...e[0] || (e[0] = [
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
const Go = y({ name: "lucide-list", render: qo }), Oo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Yo(n, e) {
  return s(), o("svg", Oo, [...e[0] || (e[0] = [
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
const Jo = y({ name: "lucide-plus", render: Yo }), Ko = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Wo(n, e) {
  return s(), o("svg", Ko, [...e[0] || (e[0] = [
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
const Xo = y({ name: "lucide-info", render: Wo }), Qo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zo(n, e) {
  return s(), o("svg", Qo, [...e[0] || (e[0] = [
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
const er = y({ name: "lucide-x", render: Zo }), tr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function nr(n, e) {
  return s(), o("svg", tr, [...e[0] || (e[0] = [
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
const sr = y({ name: "lucide-check", render: nr }), or = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function rr(n, e) {
  return s(), o("svg", or, [...e[0] || (e[0] = [
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
const ar = y({ name: "lucide-bookmark", render: rr }), ir = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function lr(n, e) {
  return s(), o("svg", ir, [...e[0] || (e[0] = [
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
const cr = y({ name: "lucide-bookmark-plus", render: lr }), dr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ur(n, e) {
  return s(), o("svg", dr, [...e[0] || (e[0] = [
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
const hr = y({ name: "lucide-heart", render: ur }), vr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function pr(n, e) {
  return s(), o("svg", vr, [...e[0] || (e[0] = [
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
const mr = y({ name: "lucide-user", render: pr }), gr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fr(n, e) {
  return s(), o("svg", gr, [...e[0] || (e[0] = [
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
const _r = y({ name: "lucide-log-out", render: fr }), kr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function yr(n, e) {
  return s(), o("svg", kr, [...e[0] || (e[0] = [
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
const wr = y({ name: "lucide-menu", render: yr }), br = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $r(n, e) {
  return s(), o("svg", br, [...e[0] || (e[0] = [
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
const xr = y({ name: "lucide-more-horizontal", render: $r }), Cr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Mr(n, e) {
  return s(), o("svg", Cr, [...e[0] || (e[0] = [
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
const Ir = y({ name: "lucide-eye", render: Mr }), Sr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Br(n, e) {
  return s(), o("svg", Sr, [...e[0] || (e[0] = [
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
const Tr = y({ name: "lucide-eye-off", render: Br }), Pr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function jr(n, e) {
  return s(), o("svg", Pr, [...e[0] || (e[0] = [
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
const Rr = y({ name: "lucide-arrow-left", render: jr }), Lr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Er(n, e) {
  return s(), o("svg", Lr, [...e[0] || (e[0] = [
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
const Ar = y({ name: "lucide-arrow-up", render: Er }), Fr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ur(n, e) {
  return s(), o("svg", Fr, [...e[0] || (e[0] = [
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
const zr = y({ name: "lucide-arrow-down", render: Ur }), Nr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Dr(n, e) {
  return s(), o("svg", Nr, [...e[0] || (e[0] = [
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
const Vr = y({ name: "lucide-chevron-down", render: Dr }), Hr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qr(n, e) {
  return s(), o("svg", Hr, [...e[0] || (e[0] = [
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
const Gr = y({ name: "lucide-chevron-up", render: qr }), Or = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Yr(n, e) {
  return s(), o("svg", Or, [...e[0] || (e[0] = [
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
const Jr = y({ name: "lucide-chevron-left", render: Yr }), Kr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Wr(n, e) {
  return s(), o("svg", Kr, [...e[0] || (e[0] = [
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
const Xr = y({ name: "lucide-chevron-right", render: Wr }), Qr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zr(n, e) {
  return s(), o("svg", Qr, [...e[0] || (e[0] = [
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
const ea = y({ name: "lucide-loader-circle", render: Zr }), ta = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function na(n, e) {
  return s(), o("svg", ta, [...e[0] || (e[0] = [
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
const sa = y({ name: "lucide-circle-alert", render: na }), oa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ra(n, e) {
  return s(), o("svg", oa, [...e[0] || (e[0] = [
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
const aa = y({ name: "lucide-circle-check", render: ra }), ia = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function la(n, e) {
  return s(), o("svg", ia, [...e[0] || (e[0] = [
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
const ca = y({ name: "lucide-circle-x", render: la }), da = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ua(n, e) {
  return s(), o("svg", da, [...e[0] || (e[0] = [
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
const ha = y({ name: "lucide-sun", render: ua }), va = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function pa(n, e) {
  return s(), o("svg", va, [...e[0] || (e[0] = [
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
const ma = y({ name: "lucide-moon", render: pa }), ga = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function fa(n, e) {
  return s(), o("svg", ga, [...e[0] || (e[0] = [
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
const _a = y({ name: "lucide-monitor", render: fa }), Z = /* @__PURE__ */ S({
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
      play: fs,
      pause: ys,
      "skip-back": $s,
      "skip-forward": Ms,
      rewind: Bs,
      forward: js,
      volume: Es,
      "volume-low": Us,
      mute: Ds,
      captions: qs,
      pip: Ys,
      theater: Ws,
      fullscreen: Zs,
      "fullscreen-exit": no,
      expand: ro,
      cast: lo,
      settings: ho,
      speed: mo,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: _o,
      image: wo,
      music: xo,
      tv: Io,
      search: To,
      filter: Ro,
      calendar: Ao,
      sort: zo,
      star: Vo,
      list: Go,
      // actions
      plus: Jo,
      info: Xo,
      x: er,
      check: sr,
      bookmark: ar,
      "bookmark-plus": cr,
      heart: hr,
      user: mr,
      "log-out": _r,
      menu: wr,
      more: xr,
      eye: Ir,
      "eye-off": Tr,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": Rr,
      "arrow-up": Ar,
      "arrow-down": zr,
      "chevron-down": Vr,
      "chevron-up": Gr,
      "chevron-left": Jr,
      "chevron-right": Xr,
      // status / theme
      spinner: ea,
      alert: sa,
      success: aa,
      error: ca,
      sun: ha,
      moon: ma,
      monitor: _a
    }, r = n, i = E(() => e[r.name]), u = E(
      () => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size
    );
    return (g, k) => (s(), J(Se(i.value), {
      class: "phlix-icon",
      style: te(u.value ? { fontSize: u.value } : void 0),
      "stroke-width": n.strokeWidth,
      role: n.label ? "img" : void 0,
      "aria-label": n.label,
      "aria-hidden": n.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), ka = ["type", "disabled", "aria-busy"], ya = {
  key: 0,
  class: "phlix-btn__spinner"
}, wa = { class: "phlix-btn__label" }, ba = /* @__PURE__ */ S({
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
    const e = n, r = E(() => e.disabled || e.loading);
    return (i, u) => (s(), o("button", {
      type: n.type,
      class: N(["phlix-btn", [`phlix-btn--${n.variant}`, `phlix-btn--${n.size}`, { "phlix-btn--block": n.block, "is-loading": n.loading }]]),
      disabled: r.value,
      "aria-busy": n.loading || void 0
    }, [
      n.loading ? (s(), o("span", ya, [
        A(Z, { name: "spinner" })
      ])) : x("", !0),
      n.leftIcon && !n.loading ? (s(), J(Z, {
        key: 1,
        name: n.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0),
      t("span", wa, [
        Y(i.$slots, "default", {}, void 0, !0)
      ]),
      n.rightIcon ? (s(), J(Z, {
        key: 2,
        name: n.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0)
    ], 10, ka));
  }
}), tl = /* @__PURE__ */ B(ba, [["__scopeId", "data-v-8cdee95a"]]), $a = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], xa = /* @__PURE__ */ S({
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
    const e = n, r = E(() => e.disabled || e.loading);
    return (i, u) => (s(), o("button", {
      type: n.type,
      class: N(["phlix-iconbtn", [`phlix-iconbtn--${n.variant}`, `phlix-iconbtn--${n.size}`, { "is-pressed": n.pressed }]]),
      disabled: r.value,
      "aria-label": n.label,
      title: n.label,
      "aria-pressed": n.pressed === void 0 ? void 0 : n.pressed,
      "aria-busy": n.loading || void 0
    }, [
      A(Z, {
        name: n.loading ? "spinner" : n.name,
        class: N({ "phlix-iconbtn__spin": n.loading })
      }, null, 8, ["name", "class"])
    ], 10, $a));
  }
}), nl = /* @__PURE__ */ B(xa, [["__scopeId", "data-v-fc0cd545"]]), Ca = ["role", "aria-label"], Ma = /* @__PURE__ */ S({
  __name: "Badge",
  props: {
    tone: { default: "neutral" },
    size: { default: "sm" },
    mono: { type: Boolean, default: !1 },
    icon: {},
    label: {}
  },
  setup(n) {
    return (e, r) => (s(), o("span", {
      class: N(["phlix-badge", [`phlix-badge--${n.tone}`, `phlix-badge--${n.size}`, { "phlix-badge--mono": n.mono }]]),
      role: n.label ? "img" : void 0,
      "aria-label": n.label
    }, [
      n.icon ? (s(), J(Z, {
        key: 0,
        name: n.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : x("", !0),
      Y(e.$slots, "default", {}, void 0, !0)
    ], 10, Ca));
  }
}), sl = /* @__PURE__ */ B(Ma, [["__scopeId", "data-v-8f8d0fd2"]]), Ia = { class: "library-scan-page" }, Sa = {
  key: 0,
  class: "loading"
}, Ba = {
  key: 1,
  class: "error"
}, Ta = {
  key: 2,
  class: "libraries-list"
}, Pa = { class: "library-info" }, ja = { class: "library-name" }, Ra = { class: "library-type" }, La = { class: "library-paths" }, Ea = { class: "library-meta" }, Aa = { key: 0 }, Fa = {
  key: 0,
  class: "scan-status"
}, Ua = { class: "library-actions" }, za = ["onClick", "disabled"], Na = ["onClick", "disabled"], Da = {
  key: 0,
  class: "empty-state"
}, Va = /* @__PURE__ */ S({
  __name: "LibraryScanPage",
  setup(n) {
    const e = m([]), r = m({}), i = m(!0), u = m(null);
    async function g() {
      try {
        const c = await z.get("/api/v1/libraries");
        e.value = c.libraries || [];
        for (const w of e.value)
          k(w.id);
      } catch (c) {
        u.value = c instanceof Error ? c.message : "Failed to load libraries";
      } finally {
        i.value = !1;
      }
    }
    async function k(c) {
      try {
        const w = await z.get(`/api/v1/libraries/${c}/scan-status`);
        w.job && (r.value[c] = w.job);
      } catch {
      }
    }
    async function _(c) {
      try {
        await z.post(`/api/v1/libraries/${c}/scan`), await k(c);
      } catch (w) {
        u.value = w instanceof Error ? w.message : "Failed to trigger scan";
      }
    }
    async function f(c) {
      try {
        await z.post(`/api/v1/libraries/${c}/rescan`), await k(c);
      } catch (w) {
        u.value = w instanceof Error ? w.message : "Failed to trigger rescan";
      }
    }
    function d(c) {
      return c ? new Date(c).toLocaleString() : "Never";
    }
    function a(c) {
      if (!c) return "";
      switch (c.status) {
        case "queued":
          return "⏳ Queued";
        case "running":
          return "🔄 Running";
        case "completed":
          return "✅ Completed";
        case "failed":
          return `❌ Failed: ${c.error || "Unknown error"}`;
        default:
          return c.status;
      }
    }
    return G(() => {
      g();
    }), (c, w) => (s(), o("div", Ia, [
      w[0] || (w[0] = t("div", { class: "scan-header" }, [
        t("h1", { class: "scan-title" }, "Library Scanner"),
        t("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      i.value ? (s(), o("div", Sa, "Loading libraries...")) : u.value ? (s(), o("div", Ba, h(u.value), 1)) : (s(), o("div", Ta, [
        (s(!0), o(R, null, L(e.value, (l) => {
          var p, v, F, P;
          return s(), o("div", {
            key: l.id,
            class: "library-card"
          }, [
            t("div", Pa, [
              t("h3", ja, h(l.name), 1),
              t("span", Ra, h(l.type), 1),
              t("p", La, h(l.paths.join(", ")), 1),
              t("div", Ea, [
                l.item_count !== void 0 ? (s(), o("span", Aa, h(l.item_count) + " items", 1)) : x("", !0),
                t("span", null, "Last scan: " + h(d(l.last_scan_at)), 1)
              ]),
              r.value[l.id] ? (s(), o("div", Fa, h(a(r.value[l.id])), 1)) : x("", !0)
            ]),
            t("div", Ua, [
              t("button", {
                class: "btn btn-scan",
                onClick: (D) => _(l.id),
                disabled: ((p = r.value[l.id]) == null ? void 0 : p.status) === "running" || ((v = r.value[l.id]) == null ? void 0 : v.status) === "queued"
              }, " Scan ", 8, za),
              t("button", {
                class: "btn btn-rescan",
                onClick: (D) => f(l.id),
                disabled: ((F = r.value[l.id]) == null ? void 0 : F.status) === "running" || ((P = r.value[l.id]) == null ? void 0 : P.status) === "queued"
              }, " Rescan ", 8, Na)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (s(), o("div", Da, " No libraries configured. Add a library to get started. ")) : x("", !0)
      ]))
    ]));
  }
}), ol = /* @__PURE__ */ B(Va, [["__scopeId", "data-v-62b3805e"]]), Ha = { class: "my-servers-page" }, qa = {
  key: 0,
  class: "loading"
}, Ga = {
  key: 1,
  class: "error"
}, Oa = {
  key: 2,
  class: "servers-list"
}, Ya = { class: "server-info" }, Ja = { class: "server-name" }, Ka = { class: "server-url" }, Wa = { class: "server-meta" }, Xa = { key: 0 }, Qa = {
  key: 0,
  class: "empty-state"
}, Za = /* @__PURE__ */ S({
  __name: "MyServersPage",
  setup(n) {
    const e = m([]), r = m(!0), i = m(null);
    async function u() {
      try {
        const _ = await z.get("/api/v1/servers");
        e.value = _.servers || [];
      } catch (_) {
        i.value = _ instanceof Error ? _.message : "Failed to load servers";
      } finally {
        r.value = !1;
      }
    }
    function g(_) {
      switch (_) {
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
    function k(_) {
      return _ ? new Date(_).toLocaleString() : "Never";
    }
    return G(() => {
      u();
    }), (_, f) => (s(), o("div", Ha, [
      f[2] || (f[2] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "My Servers"),
        t("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      r.value ? (s(), o("div", qa, "Loading servers...")) : i.value ? (s(), o("div", Ga, h(i.value), 1)) : (s(), o("div", Oa, [
        (s(!0), o(R, null, L(e.value, (d) => (s(), o("div", {
          key: d.id,
          class: "server-card"
        }, [
          t("div", {
            class: "server-status",
            style: te({ backgroundColor: g(d.status) })
          }, null, 4),
          t("div", Ya, [
            t("h3", Ja, h(d.name), 1),
            t("p", Ka, h(d.url), 1),
            t("div", Wa, [
              t("span", null, h(d.owner), 1),
              d.library_count !== void 0 ? (s(), o("span", Xa, h(d.library_count) + " libraries", 1)) : x("", !0),
              t("span", null, "Last seen: " + h(k(d.last_seen)), 1)
            ])
          ]),
          f[0] || (f[0] = t("div", { class: "server-actions" }, [
            t("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (s(), o("div", Qa, [...f[1] || (f[1] = [
          t("p", null, "No servers connected yet.", -1),
          t("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), rl = /* @__PURE__ */ B(Za, [["__scopeId", "data-v-b9237da4"]]), ei = { class: "federation-page" }, ti = {
  key: 0,
  class: "loading"
}, ni = {
  key: 1,
  class: "error"
}, si = {
  key: 2,
  class: "federation-content"
}, oi = { class: "peers-section" }, ri = { class: "peers-list" }, ai = { class: "peer-info" }, ii = { class: "peer-name" }, li = { class: "peer-url" }, ci = { class: "peer-meta" }, di = { key: 0 }, ui = { class: "peer-actions" }, hi = ["onClick"], vi = {
  key: 1,
  class: "status-badge"
}, pi = {
  key: 0,
  class: "empty-state"
}, mi = { class: "add-peer-section" }, gi = /* @__PURE__ */ S({
  __name: "FederationPage",
  setup(n) {
    const e = m([]), r = m(!0), i = m(null);
    async function u() {
      try {
        const d = await z.get("/api/v1/federation/peers");
        e.value = d.peers || [];
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to load federation peers";
      } finally {
        r.value = !1;
      }
    }
    async function g(d) {
      try {
        await z.post("/api/v1/federation/connect", { url: d }), await u();
      } catch (a) {
        i.value = a instanceof Error ? a.message : "Failed to connect to peer";
      }
    }
    async function k(d) {
      try {
        await z.post(`/api/v1/federation/peers/${d}/disconnect`), await u();
      } catch (a) {
        i.value = a instanceof Error ? a.message : "Failed to disconnect peer";
      }
    }
    function _(d) {
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
    function f(d) {
      return d ? new Date(d).toLocaleString() : "Never";
    }
    return G(() => {
      u();
    }), (d, a) => (s(), o("div", ei, [
      a[5] || (a[5] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Federation"),
        t("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      r.value ? (s(), o("div", ti, "Loading federation peers...")) : i.value ? (s(), o("div", ni, h(i.value), 1)) : (s(), o("div", si, [
        t("div", oi, [
          a[2] || (a[2] = t("h2", { class: "section-title" }, "Connected Peers", -1)),
          t("div", ri, [
            (s(!0), o(R, null, L(e.value, (c) => (s(), o("div", {
              key: c.id,
              class: "peer-card"
            }, [
              t("div", {
                class: "peer-status",
                style: te({ backgroundColor: _(c.status) })
              }, null, 4),
              t("div", ai, [
                t("h3", ii, h(c.name), 1),
                t("p", li, h(c.url), 1),
                t("div", ci, [
                  c.shared_libraries_count !== void 0 ? (s(), o("span", di, h(c.shared_libraries_count) + " shared libraries", 1)) : x("", !0),
                  t("span", null, "Last sync: " + h(f(c.last_sync)), 1)
                ])
              ]),
              t("div", ui, [
                c.status === "connected" ? (s(), o("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (w) => k(c.id)
                }, " Disconnect ", 8, hi)) : c.status === "pending" ? (s(), o("span", vi, "Pending")) : x("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (s(), o("div", pi, [...a[1] || (a[1] = [
              t("p", null, "No federation peers connected.", -1)
            ])])) : x("", !0)
          ])
        ]),
        t("div", mi, [
          a[4] || (a[4] = t("h2", { class: "section-title" }, "Add Peer", -1)),
          t("form", {
            class: "add-peer-form",
            onSubmit: a[0] || (a[0] = ee((c) => g(""), ["prevent"]))
          }, [...a[3] || (a[3] = [
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
}), al = /* @__PURE__ */ B(gi, [["__scopeId", "data-v-91ba2781"]]), fi = { class: "manage-shares-page" }, _i = {
  key: 0,
  class: "loading"
}, ki = {
  key: 1,
  class: "error"
}, yi = {
  key: 2,
  class: "shares-list"
}, wi = { class: "share-info" }, bi = { class: "share-library" }, $i = { class: "share-meta" }, xi = {
  key: 0,
  class: "expired-badge"
}, Ci = { class: "share-dates" }, Mi = { key: 0 }, Ii = { class: "share-actions" }, Si = ["onClick"], Bi = {
  key: 0,
  class: "empty-state"
}, Ti = /* @__PURE__ */ S({
  __name: "ManageSharesPage",
  setup(n) {
    const e = m([]), r = m(!0), i = m(null);
    async function u() {
      try {
        const f = await z.get("/api/v1/shares");
        e.value = f.shares || [];
      } catch (f) {
        i.value = f instanceof Error ? f.message : "Failed to load shares";
      } finally {
        r.value = !1;
      }
    }
    async function g(f) {
      try {
        await z.delete(`/api/v1/shares/${f}`), await u();
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to revoke share";
      }
    }
    function k(f) {
      return new Date(f).toLocaleString();
    }
    function _(f) {
      return f ? new Date(f) < /* @__PURE__ */ new Date() : !1;
    }
    return G(() => {
      u();
    }), (f, d) => (s(), o("div", fi, [
      d[1] || (d[1] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Manage Shares"),
        t("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      r.value ? (s(), o("div", _i, "Loading shares...")) : i.value ? (s(), o("div", ki, h(i.value), 1)) : (s(), o("div", yi, [
        (s(!0), o(R, null, L(e.value, (a) => (s(), o("div", {
          key: a.id,
          class: "share-card"
        }, [
          t("div", wi, [
            t("h3", bi, h(a.library_name), 1),
            t("div", $i, [
              t("span", null, "Shared with: " + h(a.shared_with), 1),
              t("span", {
                class: N(["permission-badge", a.permissions])
              }, h(a.permissions), 3),
              a.expires_at && _(a.expires_at) ? (s(), o("span", xi, "Expired")) : x("", !0)
            ]),
            t("p", Ci, [
              K(" Created: " + h(k(a.created_at)) + " ", 1),
              a.expires_at ? (s(), o("span", Mi, " | Expires: " + h(k(a.expires_at)), 1)) : x("", !0)
            ])
          ]),
          t("div", Ii, [
            t("button", {
              class: "btn btn-danger",
              onClick: (c) => g(a.id)
            }, "Revoke", 8, Si)
          ])
        ]))), 128)),
        e.value.length === 0 ? (s(), o("div", Bi, [...d[0] || (d[0] = [
          t("p", null, "No library shares found.", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), il = /* @__PURE__ */ B(Ti, [["__scopeId", "data-v-bd8771ac"]]), Pi = { class: "audit-logs-page" }, ji = {
  key: 0,
  class: "loading"
}, Ri = {
  key: 1,
  class: "error"
}, Li = {
  key: 2,
  class: "logs-container"
}, Ei = { class: "logs-list" }, Ai = { class: "log-content" }, Fi = { class: "log-header" }, Ui = { class: "log-action" }, zi = { class: "log-actor" }, Ni = { class: "log-time" }, Di = {
  key: 0,
  class: "log-target"
}, Vi = {
  key: 1,
  class: "log-details"
}, Hi = {
  key: 2,
  class: "log-ip"
}, qi = {
  key: 0,
  class: "empty-state"
}, Gi = {
  key: 0,
  class: "pagination"
}, Oi = ["disabled"], Yi = { class: "page-info" }, Ji = ["disabled"], Ki = /* @__PURE__ */ S({
  __name: "AuditLogsPage",
  setup(n) {
    const e = m([]), r = m(!0), i = m(null), u = m(1), g = m(1);
    async function k(a = 1) {
      try {
        r.value = !0;
        const c = await z.get(
          "/api/v1/audit-logs",
          { page: String(a) }
        );
        e.value = c.logs || [], u.value = c.page || 1, g.value = c.total_pages || 1;
      } catch (c) {
        i.value = c instanceof Error ? c.message : "Failed to load audit logs";
      } finally {
        r.value = !1;
      }
    }
    function _(a) {
      return new Date(a).toLocaleString();
    }
    function f(a) {
      return a.includes("create") || a.includes("add") ? "#22c55e" : a.includes("delete") || a.includes("remove") ? "#ef4444" : a.includes("update") || a.includes("edit") ? "#3b82f6" : a.includes("login") || a.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function d(a) {
      return a.includes("create") || a.includes("add") ? "+" : a.includes("delete") || a.includes("remove") ? "-" : a.includes("update") || a.includes("edit") ? "~" : a.includes("login") || a.includes("auth") ? "@" : "#";
    }
    return G(() => {
      k();
    }), (a, c) => (s(), o("div", Pi, [
      c[3] || (c[3] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Audit Logs"),
        t("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      r.value ? (s(), o("div", ji, "Loading audit logs...")) : i.value ? (s(), o("div", Ri, h(i.value), 1)) : (s(), o("div", Li, [
        t("div", Ei, [
          (s(!0), o(R, null, L(e.value, (w) => (s(), o("div", {
            key: w.id,
            class: "log-entry"
          }, [
            t("div", {
              class: "log-icon",
              style: te({ backgroundColor: f(w.action) })
            }, h(d(w.action)), 5),
            t("div", Ai, [
              t("div", Fi, [
                t("span", Ui, h(w.action), 1),
                t("span", zi, h(w.actor), 1),
                t("span", Ni, h(_(w.created_at)), 1)
              ]),
              w.target ? (s(), o("p", Di, "Target: " + h(w.target), 1)) : x("", !0),
              w.details ? (s(), o("p", Vi, h(w.details), 1)) : x("", !0),
              w.ip_address ? (s(), o("span", Hi, "IP: " + h(w.ip_address), 1)) : x("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (s(), o("div", qi, [...c[2] || (c[2] = [
            t("p", null, "No audit logs found.", -1)
          ])])) : x("", !0)
        ]),
        g.value > 1 ? (s(), o("div", Gi, [
          t("button", {
            class: "btn btn-secondary",
            disabled: u.value <= 1,
            onClick: c[0] || (c[0] = (w) => k(u.value - 1))
          }, " Previous ", 8, Oi),
          t("span", Yi, "Page " + h(u.value) + " of " + h(g.value), 1),
          t("button", {
            class: "btn btn-secondary",
            disabled: u.value >= g.value,
            onClick: c[1] || (c[1] = (w) => k(u.value + 1))
          }, " Next ", 8, Ji)
        ])) : x("", !0)
      ]))
    ]));
  }
}), ll = /* @__PURE__ */ B(Ki, [["__scopeId", "data-v-05910fd9"]]);
export {
  oe as ApiClient,
  Xe as ApiError,
  He as AppLayout,
  ll as AuditLogsPage,
  sl as Badge,
  Xt as BrowsePage,
  tl as Button,
  al as FederationPage,
  Ht as FilterBar,
  Z as Icon,
  nl as IconButton,
  ol as LibraryScanPage,
  yn as LocalStorageTokenStore,
  Bn as LoginForm,
  Rn as LoginPage,
  il as ManageSharesPage,
  ht as MediaCard,
  _t as MediaGrid,
  rl as MyServersPage,
  Oe as PhlixApp,
  pn as Player,
  kn as PlayerPage,
  cs as SettingsForm,
  hs as SettingsPage,
  Gn as SignupForm,
  Kn as SignupPage,
  el as createPhlixApp,
  ue as useAuthStore,
  fe as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
