var ye = Object.defineProperty;
var we = (n, e, s) => e in n ? ye(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var ne = (n, e, s) => we(n, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as o, createElementBlock as r, createElementVNode as t, renderSlot as q, defineComponent as S, createBlock as O, withCtx as Z, createVNode as F, unref as $, createTextVNode as J, toDisplayString as m, ref as f, computed as A, createCommentVNode as x, Fragment as L, renderList as E, withDirectives as G, vModelText as se, normalizeClass as V, inject as de, onMounted as Y, watch as $e, onUnmounted as xe, withModifiers as te, normalizeStyle as W, createStaticVNode as Ce, resolveComponent as me, vModelDynamic as ce, vShow as Me, createApp as Ie, markRaw as y, resolveDynamicComponent as Se, useId as Be } from "vue";
import { defineStore as pe, createPinia as Te } from "pinia";
import { RouterView as Pe, RouterLink as ve, useRoute as je, useRouter as fe, createRouter as Re, createWebHistory as Le } from "vue-router";
const B = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [i, u] of e)
    s[i] = u;
  return s;
}, Ae = {}, Ee = { class: "app-layout" }, Fe = { class: "app-header" }, Ve = { class: "header-inner" }, Ue = { class: "logo" }, ze = { class: "nav" }, De = { class: "app-main" }, Ne = { class: "app-footer" };
function He(n, e) {
  return o(), r("div", Ee, [
    t("header", Fe, [
      t("div", Ve, [
        t("div", Ue, [
          q(n.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", ze, [
          q(n.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", De, [
      q(n.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", Ne, [
      q(n.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const qe = /* @__PURE__ */ B(Ae, [["render", He], ["__scopeId", "data-v-9f6c6d16"]]), Ge = { class: "main-nav" }, Oe = /* @__PURE__ */ S({
  __name: "PhlixApp",
  setup(n) {
    return (e, s) => (o(), O(qe, null, {
      nav: Z(() => [
        t("nav", Ge, [
          F($(ve), {
            to: "/app",
            class: "nav-link"
          }, {
            default: Z(() => [...s[0] || (s[0] = [
              J("Browse", -1)
            ])]),
            _: 1
          }),
          F($(ve), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: Z(() => [...s[1] || (s[1] = [
              J("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: Z(() => [
        F($(Pe))
      ]),
      _: 1
    }));
  }
}), Ye = /* @__PURE__ */ B(Oe, [["__scopeId", "data-v-35b5e7c6"]]), Ke = { class: "phlix-placeholder" }, Xe = { class: "placeholder-content" }, Je = /* @__PURE__ */ S({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(n) {
    return (e, s) => (o(), r("div", Ke, [
      t("div", Xe, [
        s[0] || (s[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + m(n.appName) + " is initializing", 1)
      ])
    ]));
  }
}), We = /* @__PURE__ */ B(Je, [["__scopeId", "data-v-bf79ac4c"]]);
class Qe extends Error {
  constructor(e, s, i = null) {
    super(e), this.status = s, this.body = i, this.name = "ApiError";
  }
}
function Ze(n) {
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
  async request(e, s, i = null) {
    const u = () => {
      const _ = {
        "Content-Type": "application/json"
      }, k = this.tokens.getAccessToken();
      k && (_.Authorization = `Bearer ${k}`);
      const d = { method: e, headers: _, credentials: "same-origin" };
      return i !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (d.body = JSON.stringify(i)), d;
    }, v = `${this.baseUrl}${s}`;
    let g = await this.doFetch(v, u());
    return g.status === 401 && await this.refreshToken() && (g = await this.doFetch(v, u())), this.handleResponse(g);
  }
  async handleResponse(e) {
    const u = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const v = this.extractError(u);
      throw new Qe(v, e.status, u);
    }
    return u;
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
    return { ...e, is_admin: Ze(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const D = new oe(), ge = pe("media", () => {
  const n = f([]), e = f(0), s = f(!1), i = f(null), u = f(""), v = f([]), g = f(void 0), _ = f(void 0), k = f([]), d = f([]), a = f("name"), h = f("asc"), b = f(24), c = f(0), p = A(() => c.value + n.value.length < e.value), l = A(() => {
    const C = {};
    return u.value && (C.search = u.value), v.value.length && (C.genres = v.value), g.value !== void 0 && (C.yearFrom = g.value), _.value !== void 0 && (C.yearTo = _.value), k.value.length && (C.ratings = k.value), d.value.length && (C.types = d.value), C.sort = a.value, C.order = h.value, C.limit = b.value, C.offset = c.value, C;
  }), M = A(() => {
    const C = /* @__PURE__ */ new Set();
    return n.value.forEach((j) => {
      var P;
      return (P = j.genres) == null ? void 0 : P.forEach((Q) => C.add(Q));
    }), Array.from(C).sort();
  }), w = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], U = ["movie", "series", "episode", "audio", "image"];
  function K(C) {
    var Q, H, he;
    const j = new URLSearchParams(), P = l.value;
    return P.search && j.set("search", P.search), (Q = P.genres) == null || Q.forEach((ee) => j.append("genres", ee)), P.yearFrom !== void 0 && j.set("yearFrom", String(P.yearFrom)), P.yearTo !== void 0 && j.set("yearTo", String(P.yearTo)), (H = P.ratings) == null || H.forEach((ee) => j.append("ratings", ee)), (he = P.types) == null || he.forEach((ee) => j.append("types", ee)), P.sort && j.set("sort", P.sort), P.order && j.set("order", P.order), j.set("limit", String(P.limit)), j.set("offset", String(P.offset)), `${C}/api/v1/media?${j.toString()}`;
  }
  async function N(C, j = !1) {
    s.value = !0, i.value = null;
    try {
      const P = new oe({ baseUrl: C }), Q = K(C), H = await P.get(Q);
      j ? n.value = [...n.value, ...H.items] : n.value = H.items, e.value = H.total, c.value = (H.offset ?? 0) + H.items.length;
    } catch (P) {
      i.value = P instanceof Error ? P.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function R(C) {
    await N(C, !0);
  }
  function T() {
    n.value = [], e.value = 0, c.value = 0, i.value = null;
  }
  function I(C) {
    u.value = C, c.value = 0;
  }
  function z(C) {
    v.value = C, c.value = 0;
  }
  function re(C, j) {
    g.value = C, _.value = j, c.value = 0;
  }
  function _e(C) {
    k.value = C, c.value = 0;
  }
  function ke(C) {
    d.value = C, c.value = 0;
  }
  function be(C, j) {
    a.value = C, j && (h.value = j), c.value = 0;
  }
  return {
    items: n,
    total: e,
    loading: s,
    error: i,
    search: u,
    selectedGenres: v,
    yearFrom: g,
    yearTo: _,
    selectedRatings: k,
    selectedTypes: d,
    sort: a,
    order: h,
    limit: b,
    offset: c,
    hasMore: p,
    queryParams: l,
    availableGenres: M,
    availableRatings: w,
    availableTypes: U,
    fetchMedia: N,
    loadMore: R,
    reset: T,
    setSearch: I,
    setGenres: z,
    setYearRange: re,
    setRatings: _e,
    setTypes: ke,
    setSort: be
  };
}), et = { class: "media-card" }, tt = ["href"], nt = { class: "card-poster" }, st = ["src", "alt"], ot = {
  key: 1,
  class: "poster-placeholder"
}, rt = { class: "placeholder-type" }, at = { class: "card-overlay" }, it = {
  key: 0,
  class: "card-year"
}, lt = {
  key: 1,
  class: "card-rating"
}, ct = { class: "card-info" }, dt = ["title"], ut = {
  key: 0,
  class: "card-genres"
}, ht = /* @__PURE__ */ S({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(n) {
    return (e, s) => {
      var i;
      return o(), r("article", et, [
        t("a", {
          href: n.to ?? `/app/player/${n.item.id}`,
          class: "card-link"
        }, [
          t("div", nt, [
            n.item.poster_url ? (o(), r("img", {
              key: 0,
              src: n.item.poster_url,
              alt: n.item.name,
              loading: "lazy"
            }, null, 8, st)) : (o(), r("div", ot, [
              s[0] || (s[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", rt, m(n.item.type), 1)
            ]))
          ]),
          t("div", at, [
            n.item.year ? (o(), r("span", it, m(n.item.year), 1)) : x("", !0),
            n.item.rating ? (o(), r("span", lt, m(n.item.rating), 1)) : x("", !0)
          ]),
          t("div", ct, [
            t("h3", {
              class: "card-title",
              title: n.item.name
            }, m(n.item.name), 9, dt),
            (i = n.item.genres) != null && i.length ? (o(), r("p", ut, m(n.item.genres.slice(0, 2).join(", ")), 1)) : x("", !0)
          ])
        ], 8, tt)
      ]);
    };
  }
}), vt = /* @__PURE__ */ B(ht, [["__scopeId", "data-v-e60c8481"]]), mt = { class: "media-grid-container" }, pt = {
  key: 0,
  class: "media-grid-skeleton"
}, ft = {
  key: 1,
  class: "media-grid-empty"
}, gt = {
  key: 2,
  class: "media-grid"
}, _t = /* @__PURE__ */ S({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(n) {
    return (e, s) => (o(), r("div", mt, [
      n.loading ? (o(), r("div", pt, [
        (o(), r(L, null, E(12, (i) => t("div", {
          key: i,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : n.items.length === 0 ? (o(), r("div", ft, [...s[1] || (s[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (o(), r("div", gt, [
        (o(!0), r(L, null, E(n.items, (i) => (o(), O(vt, {
          key: i.id,
          item: i
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), kt = /* @__PURE__ */ B(_t, [["__scopeId", "data-v-b7e87216"]]), bt = { class: "filter-bar" }, yt = { class: "filter-search" }, wt = { class: "filter-row" }, $t = { class: "filter-group" }, xt = ["value"], Ct = ["value"], Mt = ["value"], It = { class: "filter-group" }, St = ["value"], Bt = ["value"], Tt = ["value"], Pt = ["value"], jt = { class: "filter-section" }, Rt = { class: "filter-chips" }, Lt = ["onClick"], At = { class: "filter-section" }, Et = { class: "filter-chips" }, Ft = ["onClick"], Vt = { class: "filter-section" }, Ut = { class: "filter-chips" }, zt = ["onClick"], Dt = { class: "filter-actions" }, Nt = { class: "result-count" }, Ht = /* @__PURE__ */ S({
  __name: "FilterBar",
  setup(n) {
    const e = ge(), s = f(e.search), i = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function u() {
      e.setSearch(s.value);
    }
    function v(c) {
      const p = e.selectedGenres;
      p.includes(c) ? e.setGenres(p.filter((l) => l !== c)) : e.setGenres([...p, c]);
    }
    function g(c) {
      const p = e.selectedRatings;
      p.includes(c) ? e.setRatings(p.filter((l) => l !== c)) : e.setRatings([...p, c]);
    }
    function _(c) {
      const p = e.selectedTypes;
      p.includes(c) ? e.setTypes(p.filter((l) => l !== c)) : e.setTypes([...p, c]);
    }
    function k(c) {
      const p = c.target;
      e.setSort(p.value);
    }
    function d(c) {
      const p = c.target;
      e.order = p.value;
    }
    const a = (/* @__PURE__ */ new Date()).getFullYear(), h = A(() => {
      const c = [];
      for (let p = a; p >= 1900; p--)
        c.push(p);
      return c;
    });
    function b() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (c, p) => (o(), r("div", bt, [
      t("div", yt, [
        G(t("input", {
          "onUpdate:modelValue": p[0] || (p[0] = (l) => s.value = l),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: u
        }, null, 544), [
          [se, s.value]
        ])
      ]),
      t("div", wt, [
        t("div", $t, [
          p[4] || (p[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: $(e).sort,
            onChange: k
          }, [
            (o(), r(L, null, E(i, (l) => t("option", {
              key: l.value,
              value: l.value
            }, m(l.label), 9, Ct)), 64))
          ], 40, xt),
          t("select", {
            class: "filter-select order-select",
            value: $(e).order,
            onChange: d
          }, [...p[3] || (p[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, Mt)
        ]),
        t("div", It, [
          p[7] || (p[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: $(e).yearFrom ?? "",
            onChange: p[1] || (p[1] = (l) => $(e).setYearRange(
              l.target.value ? Number(l.target.value) : void 0,
              $(e).yearTo
            ))
          }, [
            p[5] || (p[5] = t("option", { value: "" }, "From", -1)),
            (o(!0), r(L, null, E(h.value.slice(0, 50), (l) => (o(), r("option", {
              key: l,
              value: l
            }, m(l), 9, Bt))), 128))
          ], 40, St),
          t("select", {
            class: "filter-select",
            value: $(e).yearTo ?? "",
            onChange: p[2] || (p[2] = (l) => $(e).setYearRange(
              $(e).yearFrom,
              l.target.value ? Number(l.target.value) : void 0
            ))
          }, [
            p[6] || (p[6] = t("option", { value: "" }, "To", -1)),
            (o(!0), r(L, null, E(h.value.slice(0, 50), (l) => (o(), r("option", {
              key: l,
              value: l
            }, m(l), 9, Pt))), 128))
          ], 40, Tt)
        ])
      ]),
      t("div", jt, [
        p[8] || (p[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", Rt, [
          (o(!0), r(L, null, E($(e).availableGenres, (l) => (o(), r("button", {
            key: l,
            class: V(["chip", { active: $(e).selectedGenres.includes(l) }]),
            onClick: (M) => v(l)
          }, m(l), 11, Lt))), 128))
        ])
      ]),
      t("div", At, [
        p[9] || (p[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", Et, [
          (o(!0), r(L, null, E($(e).availableRatings, (l) => (o(), r("button", {
            key: l,
            class: V(["chip", { active: $(e).selectedRatings.includes(l) }]),
            onClick: (M) => g(l)
          }, m(l), 11, Ft))), 128))
        ])
      ]),
      t("div", Vt, [
        p[10] || (p[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Ut, [
          (o(!0), r(L, null, E($(e).availableTypes, (l) => (o(), r("button", {
            key: l,
            class: V(["chip", { active: $(e).selectedTypes.includes(l) }]),
            onClick: (M) => _(l)
          }, m(l), 11, zt))), 128))
        ])
      ]),
      t("div", Dt, [
        t("button", {
          class: "clear-btn",
          onClick: b
        }, "Clear filters"),
        t("span", Nt, m($(e).total) + " result" + m($(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), qt = /* @__PURE__ */ B(Ht, [["__scopeId", "data-v-7089ec0b"]]), Gt = { class: "browse-page" }, Ot = { class: "browse-header" }, Yt = { class: "browse-toolbar-extra" }, Kt = {
  key: 0,
  class: "browse-error"
}, Xt = {
  key: 1,
  class: "load-more"
}, Jt = {
  key: 2,
  class: "loading-more"
}, Wt = /* @__PURE__ */ S({
  __name: "BrowsePage",
  setup(n) {
    const e = de("apiBase") ?? A(() => ""), s = ge();
    function i() {
      s.reset(), s.fetchMedia(e.value);
    }
    Y(i), $e(e, i);
    function u() {
      s.reset(), s.fetchMedia(e.value);
    }
    function v() {
      s.loadMore(e.value);
    }
    return (g, _) => (o(), r("div", Gt, [
      t("div", Ot, [
        _[0] || (_[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", Yt, [
          q(g.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      F(qt, { onChange: u }),
      $(s).error ? (o(), r("div", Kt, [
        t("p", null, m($(s).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: i
        }, "Retry")
      ])) : x("", !0),
      F(kt, {
        items: $(s).items,
        loading: $(s).loading && $(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      $(s).hasMore && !$(s).loading ? (o(), r("div", Xt, [
        t("button", {
          class: "load-more-btn",
          onClick: v
        }, "Load more")
      ])) : x("", !0),
      $(s).loading && $(s).items.length > 0 ? (o(), r("div", Jt, " Loading... ")) : x("", !0)
    ]));
  }
}), Qt = /* @__PURE__ */ B(Wt, [["__scopeId", "data-v-c192afa6"]]), Zt = ["src", "poster"], en = { class: "controls-top" }, tn = { class: "media-title" }, nn = {
  key: 0,
  class: "media-year"
}, sn = { class: "controls-center" }, on = { class: "controls-bottom" }, rn = { class: "progress-track" }, an = { class: "controls-row" }, ln = { class: "time-display" }, cn = { class: "volume-control" }, dn = ["value"], un = { class: "speed-control" }, hn = ["value"], vn = { class: "time-display" }, mn = /* @__PURE__ */ S({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(n) {
    const e = f(null), s = f(!1), i = f(0), u = f(0), v = f(1), g = f(!1), _ = f(1), k = f(!1), d = f(!0);
    let a = null;
    const h = A(
      () => u.value > 0 ? i.value / u.value * 100 : 0
    );
    function b(T) {
      if (!isFinite(T) || isNaN(T)) return "0:00";
      const I = Math.floor(T / 60), z = Math.floor(T % 60);
      return `${I}:${z.toString().padStart(2, "0")}`;
    }
    function c() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function p() {
      e.value && (i.value = e.value.currentTime);
    }
    function l() {
      e.value && (u.value = e.value.duration);
    }
    function M(T) {
      const z = T.currentTarget.getBoundingClientRect(), re = (T.clientX - z.left) / z.width;
      e.value && (e.value.currentTime = re * u.value);
    }
    function w(T) {
      const I = parseFloat(T.target.value);
      v.value = I, e.value && (e.value.volume = I), g.value = I === 0;
    }
    function U() {
      g.value = !g.value, e.value && (e.value.muted = g.value);
    }
    function K(T) {
      _.value = T, e.value && (e.value.playbackRate = T);
    }
    function N() {
      var I;
      const T = (I = e.value) == null ? void 0 : I.closest(".player-container");
      T && (document.fullscreenElement ? (document.exitFullscreen(), k.value = !1) : (T.requestFullscreen(), k.value = !0));
    }
    function R() {
      d.value = !0, a && clearTimeout(a), a = setTimeout(() => {
        s.value && (d.value = !1);
      }, 3e3);
    }
    return xe(() => {
      a && clearTimeout(a);
    }), (T, I) => (o(), r("div", {
      class: V(["player-container", { "controls-hidden": !d.value && s.value }]),
      onMousemove: R,
      onClick: c
    }, [
      I[6] || (I[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: n.streamUrl,
        poster: n.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: I[0] || (I[0] = (z) => s.value = !0),
        onPause: I[1] || (I[1] = (z) => s.value = !1),
        onTimeupdate: p,
        onLoadedmetadata: l,
        onClick: te(c, ["stop"])
      }, null, 40, Zt),
      t("div", {
        class: "player-controls",
        onClick: I[4] || (I[4] = te(() => {
        }, ["stop"]))
      }, [
        t("div", en, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: I[2] || (I[2] = (z) => T.$router.back())
          }, " ← Back "),
          t("span", tn, m(n.media.name), 1),
          n.media.year ? (o(), r("span", nn, m(n.media.year), 1)) : x("", !0)
        ]),
        t("div", sn, [
          t("button", {
            class: "play-btn",
            onClick: c
          }, m(s.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", on, [
          t("div", {
            class: "progress-bar",
            onClick: M
          }, [
            t("div", rn, [
              t("div", {
                class: "progress-fill",
                style: W({ width: h.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", an, [
            t("span", ln, m(b(i.value)), 1),
            t("div", cn, [
              t("button", {
                class: "ctrl-btn",
                onClick: U
              }, m(g.value || v.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: g.value ? 0 : v.value,
                class: "volume-slider",
                onInput: w
              }, null, 40, dn)
            ]),
            t("div", un, [
              t("select", {
                class: "speed-select",
                value: _.value,
                onChange: I[3] || (I[3] = (z) => K(Number(z.target.value)))
              }, [...I[5] || (I[5] = [
                Ce('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, hn)
            ]),
            t("span", vn, m(b(u.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: N
            }, m(k.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), pn = /* @__PURE__ */ B(mn, [["__scopeId", "data-v-7a51063f"]]), fn = { class: "player-page" }, gn = {
  key: 0,
  class: "player-loading"
}, _n = {
  key: 1,
  class: "player-error"
}, kn = /* @__PURE__ */ S({
  __name: "PlayerPage",
  setup(n) {
    const e = de("apiBase", A(() => "")), s = je(), i = f(null), u = f(""), v = f(!0), g = f(null);
    async function _() {
      const k = s.params.id;
      if (!k) {
        g.value = "No media ID provided", v.value = !1;
        return;
      }
      try {
        const d = new oe({ baseUrl: e.value }), [a, h] = await Promise.all([
          d.get(`/api/v1/media/${k}`),
          d.get(`/api/v1/media/${k}/playback-info`).catch(() => null)
        ]);
        i.value = a, h != null && h.url ? u.value = h.url : u.value = `${e.value}/media/${k}/stream`;
      } catch (d) {
        g.value = d instanceof Error ? d.message : "Failed to load media";
      } finally {
        v.value = !1;
      }
    }
    return Y(_), (k, d) => (o(), r("div", fn, [
      v.value ? (o(), r("div", gn, "Loading...")) : g.value ? (o(), r("div", _n, [
        t("p", null, m(g.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: _
        }, "Retry")
      ])) : i.value ? (o(), O(pn, {
        key: 2,
        media: i.value,
        "stream-url": u.value
      }, null, 8, ["media", "stream-url"])) : x("", !0)
    ]));
  }
}), bn = /* @__PURE__ */ B(kn, [["__scopeId", "data-v-d9061b47"]]), ae = "access_token", ie = "refresh_token", le = "user";
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
const ue = pe("auth", () => {
  const n = new yn(), e = de("apiBase", ""), s = new oe({ tokenStore: n, baseUrl: e }), i = f(null), u = f(!1), v = f(null), g = A(() => n.getAccessToken() !== null), _ = A(() => {
    var b;
    return ((b = i.value) == null ? void 0 : b.is_admin) === !0;
  });
  async function k(b, c) {
    u.value = !0, v.value = null;
    try {
      const p = await s.post("/api/v1/auth/login", { email: b, password: c });
      return n.setAccessToken(p.access_token), n.setRefreshToken(p.refresh_token), await a(), !0;
    } catch (p) {
      return v.value = p instanceof Error ? p.message : "Login failed", !1;
    } finally {
      u.value = !1;
    }
  }
  async function d(b, c, p) {
    u.value = !0, v.value = null;
    try {
      const l = await s.post("/api/v1/auth/register", { email: b, username: c, password: p });
      return n.setAccessToken(l.access_token), n.setRefreshToken(l.refresh_token), await a(), !0;
    } catch (l) {
      return v.value = l instanceof Error ? l.message : "Registration failed", !1;
    } finally {
      u.value = !1;
    }
  }
  async function a() {
    if (g.value)
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
    loading: u,
    error: v,
    isLoggedIn: g,
    isAdmin: _,
    client: s,
    login: k,
    signup: d,
    fetchUser: a,
    logout: h
  };
}), wn = {
  key: 0,
  class: "form-error"
}, $n = { class: "field" }, xn = { class: "field" }, Cn = { class: "password-wrapper" }, Mn = ["type"], In = ["disabled"], Sn = { class: "form-footer" }, Bn = /* @__PURE__ */ S({
  __name: "LoginForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, i = ue(), u = fe(), v = f(""), g = f(""), _ = f(!1);
    async function k() {
      await i.login(v.value, g.value) && (s("success"), u.push("/app"));
    }
    return (d, a) => {
      const h = me("router-link");
      return o(), r("form", {
        class: "login-form",
        onSubmit: te(k, ["prevent"])
      }, [
        a[7] || (a[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        $(i).error ? (o(), r("div", wn, m($(i).error), 1)) : x("", !0),
        t("div", $n, [
          a[3] || (a[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          G(t("input", {
            id: "email",
            "onUpdate:modelValue": a[0] || (a[0] = (b) => v.value = b),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [se, v.value]
          ])
        ]),
        t("div", xn, [
          a[4] || (a[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Cn, [
            G(t("input", {
              id: "password",
              "onUpdate:modelValue": a[1] || (a[1] = (b) => g.value = b),
              type: _.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, Mn), [
              [ce, g.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: a[2] || (a[2] = (b) => _.value = !_.value)
            }, m(_.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: $(i).loading
        }, m($(i).loading ? "Signing in..." : "Sign in"), 9, In),
        t("p", Sn, [
          a[6] || (a[6] = J(" Don't have an account? ", -1)),
          F(h, {
            to: "/app/signup",
            class: "link"
          }, {
            default: Z(() => [...a[5] || (a[5] = [
              J("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Tn = /* @__PURE__ */ B(Bn, [["__scopeId", "data-v-22bc5576"]]), Pn = { class: "auth-page" }, jn = { class: "auth-card" }, Rn = /* @__PURE__ */ S({
  __name: "LoginPage",
  setup(n) {
    return (e, s) => (o(), r("div", Pn, [
      t("div", jn, [
        F(Tn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Ln = /* @__PURE__ */ B(Rn, [["__scopeId", "data-v-9c53ce6a"]]), An = {
  key: 0,
  class: "form-error"
}, En = { class: "field" }, Fn = { class: "field" }, Vn = { class: "field" }, Un = { class: "password-wrapper" }, zn = ["type"], Dn = { class: "field" }, Nn = ["type"], Hn = ["disabled"], qn = { class: "form-footer" }, Gn = /* @__PURE__ */ S({
  __name: "SignupForm",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, i = ue(), u = fe(), v = f(""), g = f(""), _ = f(""), k = f(""), d = f(!1), a = f(null);
    async function h() {
      if (a.value = null, _.value.length < 8) {
        a.value = "Password must be at least 8 characters.";
        return;
      }
      if (_.value !== k.value) {
        a.value = "Passwords do not match.";
        return;
      }
      await i.signup(v.value, g.value, _.value) && (s("success"), u.push("/app"));
    }
    return (b, c) => {
      const p = me("router-link");
      return o(), r("form", {
        class: "signup-form",
        onSubmit: te(h, ["prevent"])
      }, [
        c[11] || (c[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        $(i).error || a.value ? (o(), r("div", An, m($(i).error || a.value), 1)) : x("", !0),
        t("div", En, [
          c[5] || (c[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          G(t("input", {
            id: "email",
            "onUpdate:modelValue": c[0] || (c[0] = (l) => v.value = l),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [se, v.value]
          ])
        ]),
        t("div", Fn, [
          c[6] || (c[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          G(t("input", {
            id: "username",
            "onUpdate:modelValue": c[1] || (c[1] = (l) => g.value = l),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [se, g.value]
          ])
        ]),
        t("div", Vn, [
          c[7] || (c[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Un, [
            G(t("input", {
              id: "password",
              "onUpdate:modelValue": c[2] || (c[2] = (l) => _.value = l),
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
              onClick: c[3] || (c[3] = (l) => d.value = !d.value)
            }, m(d.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", Dn, [
          c[8] || (c[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          G(t("input", {
            id: "confirm",
            "onUpdate:modelValue": c[4] || (c[4] = (l) => k.value = l),
            type: d.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Nn), [
            [ce, k.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: $(i).loading
        }, m($(i).loading ? "Creating account..." : "Create account"), 9, Hn),
        t("p", qn, [
          c[10] || (c[10] = J(" Already have an account? ", -1)),
          F(p, {
            to: "/app/login",
            class: "link"
          }, {
            default: Z(() => [...c[9] || (c[9] = [
              J("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), On = /* @__PURE__ */ B(Gn, [["__scopeId", "data-v-d5e42c72"]]), Yn = { class: "auth-page" }, Kn = { class: "auth-card" }, Xn = /* @__PURE__ */ S({
  __name: "SignupPage",
  setup(n) {
    return (e, s) => (o(), r("div", Yn, [
      t("div", Kn, [
        F(On, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Jn = /* @__PURE__ */ B(Xn, [["__scopeId", "data-v-609331e4"]]), Wn = { class: "settings-form" }, Qn = {
  key: 0,
  class: "settings-loading"
}, Zn = {
  key: 1,
  class: "settings-error"
}, es = { class: "group-title" }, ts = ["for"], ns = { class: "setting-control" }, ss = ["id", "checked", "onChange"], os = ["id", "value", "onChange"], rs = ["id", "value", "onChange"], as = { class: "settings-actions" }, is = {
  key: 0,
  class: "success-msg"
}, ls = ["disabled"], cs = /* @__PURE__ */ S({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(n, { emit: e }) {
    const s = n, i = e, u = ue(), v = f({}), g = f(!0), _ = f(!1), k = f(null), d = f(null), a = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], h = A(
      () => s.groups ? a.filter((w) => s.groups.includes(w)) : a
    );
    async function b() {
      g.value = !0, k.value = null;
      try {
        const w = await u.client.get("/api/v1/users/me/settings");
        v.value = w;
      } catch (w) {
        k.value = w instanceof Error ? w.message : "Failed to load settings";
      } finally {
        g.value = !1;
      }
    }
    async function c() {
      _.value = !0, k.value = null, d.value = null;
      try {
        await u.client.put("/api/v1/users/me/settings", v.value), d.value = "Settings saved.", i("saved", v.value), setTimeout(() => {
          d.value = null;
        }, 3e3);
      } catch (w) {
        k.value = w instanceof Error ? w.message : "Failed to save settings";
      } finally {
        _.value = !1;
      }
    }
    function p(w, U) {
      v.value[w] = U;
    }
    Y(b);
    const l = {
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
    return (w, U) => (o(), r("div", Wn, [
      g.value ? (o(), r("div", Qn, "Loading settings...")) : k.value ? (o(), r("div", Zn, m(k.value), 1)) : (o(), r(L, { key: 2 }, [
        (o(!0), r(L, null, E(h.value, (K) => (o(), r("div", {
          key: K,
          class: "settings-group"
        }, [
          t("h3", es, m(l[K]), 1),
          (o(), r(L, null, E(M, (N, R) => G(t("div", {
            key: R,
            class: "setting-row"
          }, [
            t("label", {
              for: R,
              class: "setting-label"
            }, m(N.label), 9, ts),
            t("div", ns, [
              N.type === "bool" ? (o(), r("input", {
                key: 0,
                id: R,
                type: "checkbox",
                class: "toggle",
                checked: !!v.value[R],
                onChange: (T) => p(R, T.target.checked)
              }, null, 40, ss)) : N.type === "number" ? (o(), r("input", {
                key: 1,
                id: R,
                type: "number",
                class: "input number-input",
                value: v.value[R],
                onChange: (T) => p(R, Number(T.target.value))
              }, null, 40, os)) : (o(), r("input", {
                key: 2,
                id: R,
                type: "text",
                class: "input",
                value: v.value[R] ?? "",
                onChange: (T) => p(R, T.target.value)
              }, null, 40, rs))
            ])
          ]), [
            [Me, R.startsWith(K)]
          ])), 64))
        ]))), 128)),
        t("div", as, [
          d.value ? (o(), r("div", is, m(d.value), 1)) : x("", !0),
          t("button", {
            class: "save-btn",
            disabled: _.value,
            onClick: c
          }, m(_.value ? "Saving..." : "Save settings"), 9, ls)
        ])
      ], 64))
    ]));
  }
}), ds = /* @__PURE__ */ B(cs, [["__scopeId", "data-v-51b588b6"]]), us = { class: "settings-page" }, hs = /* @__PURE__ */ S({
  __name: "SettingsPage",
  setup(n) {
    return (e, s) => (o(), r("div", us, [
      s[0] || (s[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      F(ds)
    ]));
  }
}), vs = /* @__PURE__ */ B(hs, [["__scopeId", "data-v-f9ca8a28"]]);
function ms() {
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
  const e = n.routerBase || "/app", s = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: Qt
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: bn
    },
    {
      path: `${e}/login`,
      name: "login",
      component: Ln
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Jn
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: vs
    }
  ];
  return n.extraRoutes && s.push(...n.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: We,
    props: { appName: n.app }
  }), s;
}
function dl(n) {
  const e = {
    ...ms(),
    ...n
  }, s = Te(), i = e.routerBase || "/app", u = Re({
    history: Le(i),
    routes: ps(e)
  }), v = Ie(Ye);
  return v.provide("apiBase", e.apiBase), v.use(s), v.use(u), v;
}
const fs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gs(n, e) {
  return o(), r("svg", fs, [...e[0] || (e[0] = [
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
const _s = y({ name: "lucide-play", render: gs }), ks = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function bs(n, e) {
  return o(), r("svg", ks, [...e[0] || (e[0] = [
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
const ys = y({ name: "lucide-pause", render: bs }), ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $s(n, e) {
  return o(), r("svg", ws, [...e[0] || (e[0] = [
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
const xs = y({ name: "lucide-skip-back", render: $s }), Cs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ms(n, e) {
  return o(), r("svg", Cs, [...e[0] || (e[0] = [
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
const Is = y({ name: "lucide-skip-forward", render: Ms }), Ss = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Bs(n, e) {
  return o(), r("svg", Ss, [...e[0] || (e[0] = [
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
const Ts = y({ name: "lucide-rotate-ccw", render: Bs }), Ps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function js(n, e) {
  return o(), r("svg", Ps, [...e[0] || (e[0] = [
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
const Rs = y({ name: "lucide-rotate-cw", render: js }), Ls = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function As(n, e) {
  return o(), r("svg", Ls, [...e[0] || (e[0] = [
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
const Es = y({ name: "lucide-volume-2", render: As }), Fs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vs(n, e) {
  return o(), r("svg", Fs, [...e[0] || (e[0] = [
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
const Us = y({ name: "lucide-volume-1", render: Vs }), zs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ds(n, e) {
  return o(), r("svg", zs, [...e[0] || (e[0] = [
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
const Ns = y({ name: "lucide-volume-x", render: Ds }), Hs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function qs(n, e) {
  return o(), r("svg", Hs, [...e[0] || (e[0] = [
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
const Gs = y({ name: "lucide-captions", render: qs }), Os = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ys(n, e) {
  return o(), r("svg", Os, [...e[0] || (e[0] = [
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
const Ks = y({ name: "lucide-picture-in-picture-2", render: Ys }), Xs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Js(n, e) {
  return o(), r("svg", Xs, [...e[0] || (e[0] = [
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
const Ws = y({ name: "lucide-rectangle-horizontal", render: Js }), Qs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Zs(n, e) {
  return o(), r("svg", Qs, [...e[0] || (e[0] = [
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
const eo = y({ name: "lucide-maximize", render: Zs }), to = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function no(n, e) {
  return o(), r("svg", to, [...e[0] || (e[0] = [
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
const so = y({ name: "lucide-minimize", render: no }), oo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ro(n, e) {
  return o(), r("svg", oo, [...e[0] || (e[0] = [
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
const ao = y({ name: "lucide-maximize-2", render: ro }), io = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function lo(n, e) {
  return o(), r("svg", io, [...e[0] || (e[0] = [
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
const co = y({ name: "lucide-cast", render: lo }), uo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ho(n, e) {
  return o(), r("svg", uo, [...e[0] || (e[0] = [
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
const vo = y({ name: "lucide-settings", render: ho }), mo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function po(n, e) {
  return o(), r("svg", mo, [...e[0] || (e[0] = [
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
const fo = y({ name: "lucide-gauge", render: po }), go = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _o(n, e) {
  return o(), r("svg", go, [...e[0] || (e[0] = [
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
const ko = y({ name: "lucide-film", render: _o }), bo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function yo(n, e) {
  return o(), r("svg", bo, [...e[0] || (e[0] = [
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
const wo = y({ name: "lucide-image", render: yo }), $o = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function xo(n, e) {
  return o(), r("svg", $o, [...e[0] || (e[0] = [
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
const Co = y({ name: "lucide-music", render: xo }), Mo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Io(n, e) {
  return o(), r("svg", Mo, [...e[0] || (e[0] = [
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
const So = y({ name: "lucide-tv", render: Io }), Bo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function To(n, e) {
  return o(), r("svg", Bo, [...e[0] || (e[0] = [
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
const Po = y({ name: "lucide-search", render: To }), jo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ro(n, e) {
  return o(), r("svg", jo, [...e[0] || (e[0] = [
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
const Lo = y({ name: "lucide-sliders-horizontal", render: Ro }), Ao = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Eo(n, e) {
  return o(), r("svg", Ao, [...e[0] || (e[0] = [
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
const Fo = y({ name: "lucide-calendar", render: Eo }), Vo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Uo(n, e) {
  return o(), r("svg", Vo, [...e[0] || (e[0] = [
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
const zo = y({ name: "lucide-arrow-up-down", render: Uo }), Do = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function No(n, e) {
  return o(), r("svg", Do, [...e[0] || (e[0] = [
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
const Ho = y({ name: "lucide-star", render: No }), qo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Go(n, e) {
  return o(), r("svg", qo, [...e[0] || (e[0] = [
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
const Oo = y({ name: "lucide-list", render: Go }), Yo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ko(n, e) {
  return o(), r("svg", Yo, [...e[0] || (e[0] = [
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
const Xo = y({ name: "lucide-plus", render: Ko }), Jo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Wo(n, e) {
  return o(), r("svg", Jo, [...e[0] || (e[0] = [
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
const Qo = y({ name: "lucide-info", render: Wo }), Zo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function er(n, e) {
  return o(), r("svg", Zo, [...e[0] || (e[0] = [
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
const tr = y({ name: "lucide-x", render: er }), nr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function sr(n, e) {
  return o(), r("svg", nr, [...e[0] || (e[0] = [
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
const or = y({ name: "lucide-check", render: sr }), rr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ar(n, e) {
  return o(), r("svg", rr, [...e[0] || (e[0] = [
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
const ir = y({ name: "lucide-bookmark", render: ar }), lr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function cr(n, e) {
  return o(), r("svg", lr, [...e[0] || (e[0] = [
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
const dr = y({ name: "lucide-bookmark-plus", render: cr }), ur = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function hr(n, e) {
  return o(), r("svg", ur, [...e[0] || (e[0] = [
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
const vr = y({ name: "lucide-heart", render: hr }), mr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function pr(n, e) {
  return o(), r("svg", mr, [...e[0] || (e[0] = [
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
const fr = y({ name: "lucide-user", render: pr }), gr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _r(n, e) {
  return o(), r("svg", gr, [...e[0] || (e[0] = [
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
const kr = y({ name: "lucide-log-out", render: _r }), br = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function yr(n, e) {
  return o(), r("svg", br, [...e[0] || (e[0] = [
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
const wr = y({ name: "lucide-menu", render: yr }), $r = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function xr(n, e) {
  return o(), r("svg", $r, [...e[0] || (e[0] = [
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
const Cr = y({ name: "lucide-more-horizontal", render: xr }), Mr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ir(n, e) {
  return o(), r("svg", Mr, [...e[0] || (e[0] = [
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
const Sr = y({ name: "lucide-eye", render: Ir }), Br = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Tr(n, e) {
  return o(), r("svg", Br, [...e[0] || (e[0] = [
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
const Pr = y({ name: "lucide-eye-off", render: Tr }), jr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Rr(n, e) {
  return o(), r("svg", jr, [...e[0] || (e[0] = [
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
const Lr = y({ name: "lucide-arrow-left", render: Rr }), Ar = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Er(n, e) {
  return o(), r("svg", Ar, [...e[0] || (e[0] = [
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
const Fr = y({ name: "lucide-arrow-up", render: Er }), Vr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ur(n, e) {
  return o(), r("svg", Vr, [...e[0] || (e[0] = [
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
const zr = y({ name: "lucide-arrow-down", render: Ur }), Dr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Nr(n, e) {
  return o(), r("svg", Dr, [...e[0] || (e[0] = [
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
const Hr = y({ name: "lucide-chevron-down", render: Nr }), qr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Gr(n, e) {
  return o(), r("svg", qr, [...e[0] || (e[0] = [
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
const Or = y({ name: "lucide-chevron-up", render: Gr }), Yr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Kr(n, e) {
  return o(), r("svg", Yr, [...e[0] || (e[0] = [
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
const Xr = y({ name: "lucide-chevron-left", render: Kr }), Jr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Wr(n, e) {
  return o(), r("svg", Jr, [...e[0] || (e[0] = [
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
const Qr = y({ name: "lucide-chevron-right", render: Wr }), Zr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ea(n, e) {
  return o(), r("svg", Zr, [...e[0] || (e[0] = [
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
const ta = y({ name: "lucide-loader-circle", render: ea }), na = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function sa(n, e) {
  return o(), r("svg", na, [...e[0] || (e[0] = [
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
const oa = y({ name: "lucide-circle-alert", render: sa }), ra = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function aa(n, e) {
  return o(), r("svg", ra, [...e[0] || (e[0] = [
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
const ia = y({ name: "lucide-circle-check", render: aa }), la = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ca(n, e) {
  return o(), r("svg", la, [...e[0] || (e[0] = [
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
const da = y({ name: "lucide-circle-x", render: ca }), ua = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ha(n, e) {
  return o(), r("svg", ua, [...e[0] || (e[0] = [
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
const va = y({ name: "lucide-sun", render: ha }), ma = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function pa(n, e) {
  return o(), r("svg", ma, [...e[0] || (e[0] = [
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
const fa = y({ name: "lucide-moon", render: pa }), ga = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _a(n, e) {
  return o(), r("svg", ga, [...e[0] || (e[0] = [
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
const ka = y({ name: "lucide-monitor", render: _a }), X = /* @__PURE__ */ S({
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
      play: _s,
      pause: ys,
      "skip-back": xs,
      "skip-forward": Is,
      rewind: Ts,
      forward: Rs,
      volume: Es,
      "volume-low": Us,
      mute: Ns,
      captions: Gs,
      pip: Ks,
      theater: Ws,
      fullscreen: eo,
      "fullscreen-exit": so,
      expand: ao,
      cast: co,
      settings: vo,
      speed: fo,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: ko,
      image: wo,
      music: Co,
      tv: So,
      search: Po,
      filter: Lo,
      calendar: Fo,
      sort: zo,
      star: Ho,
      list: Oo,
      // actions
      plus: Xo,
      info: Qo,
      x: tr,
      check: or,
      bookmark: ir,
      "bookmark-plus": dr,
      heart: vr,
      user: fr,
      "log-out": kr,
      menu: wr,
      more: Cr,
      eye: Sr,
      "eye-off": Pr,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": Lr,
      "arrow-up": Fr,
      "arrow-down": zr,
      "chevron-down": Hr,
      "chevron-up": Or,
      "chevron-left": Xr,
      "chevron-right": Qr,
      // status / theme
      spinner: ta,
      alert: oa,
      success: ia,
      error: da,
      sun: va,
      moon: fa,
      monitor: ka
    }, s = n, i = A(() => e[s.name]), u = A(
      () => s.size === void 0 ? void 0 : typeof s.size == "number" ? `${s.size}px` : s.size
    );
    return (v, g) => (o(), O(Se(i.value), {
      class: "phlix-icon",
      style: W(u.value ? { fontSize: u.value } : void 0),
      "stroke-width": n.strokeWidth,
      role: n.label ? "img" : void 0,
      "aria-label": n.label,
      "aria-hidden": n.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), ba = ["type", "disabled", "aria-busy"], ya = {
  key: 0,
  class: "phlix-btn__spinner"
}, wa = { class: "phlix-btn__label" }, $a = /* @__PURE__ */ S({
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
    const e = n, s = A(() => e.disabled || e.loading);
    return (i, u) => (o(), r("button", {
      type: n.type,
      class: V(["phlix-btn", [`phlix-btn--${n.variant}`, `phlix-btn--${n.size}`, { "phlix-btn--block": n.block, "is-loading": n.loading }]]),
      disabled: s.value,
      "aria-busy": n.loading || void 0
    }, [
      n.loading ? (o(), r("span", ya, [
        F(X, { name: "spinner" })
      ])) : x("", !0),
      n.leftIcon && !n.loading ? (o(), O(X, {
        key: 1,
        name: n.leftIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0),
      t("span", wa, [
        q(i.$slots, "default", {}, void 0, !0)
      ]),
      n.rightIcon ? (o(), O(X, {
        key: 2,
        name: n.rightIcon,
        class: "phlix-btn__icon"
      }, null, 8, ["name"])) : x("", !0)
    ], 10, ba));
  }
}), ul = /* @__PURE__ */ B($a, [["__scopeId", "data-v-8cdee95a"]]), xa = ["type", "disabled", "aria-label", "title", "aria-pressed", "aria-busy"], Ca = /* @__PURE__ */ S({
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
    const e = n, s = A(() => e.disabled || e.loading);
    return (i, u) => (o(), r("button", {
      type: n.type,
      class: V(["phlix-iconbtn", [`phlix-iconbtn--${n.variant}`, `phlix-iconbtn--${n.size}`, { "is-pressed": n.pressed }]]),
      disabled: s.value,
      "aria-label": n.label,
      title: n.label,
      "aria-pressed": n.pressed === void 0 ? void 0 : n.pressed,
      "aria-busy": n.loading || void 0
    }, [
      F(X, {
        name: n.loading ? "spinner" : n.name,
        class: V({ "phlix-iconbtn__spin": n.loading })
      }, null, 8, ["name", "class"])
    ], 10, xa));
  }
}), hl = /* @__PURE__ */ B(Ca, [["__scopeId", "data-v-fc0cd545"]]), Ma = ["role", "aria-label"], Ia = /* @__PURE__ */ S({
  __name: "Badge",
  props: {
    tone: { default: "neutral" },
    size: { default: "sm" },
    mono: { type: Boolean, default: !1 },
    icon: {},
    label: {}
  },
  setup(n) {
    return (e, s) => (o(), r("span", {
      class: V(["phlix-badge", [`phlix-badge--${n.tone}`, `phlix-badge--${n.size}`, { "phlix-badge--mono": n.mono }]]),
      role: n.label ? "img" : void 0,
      "aria-label": n.label
    }, [
      n.icon ? (o(), O(X, {
        key: 0,
        name: n.icon,
        class: "phlix-badge__icon"
      }, null, 8, ["name"])) : x("", !0),
      q(e.$slots, "default", {}, void 0, !0)
    ], 10, Ma));
  }
}), vl = /* @__PURE__ */ B(Ia, [["__scopeId", "data-v-8f8d0fd2"]]), Sa = ["tabindex", "aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-disabled"], Ba = /* @__PURE__ */ S({
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
    const s = n, i = e, u = f(null), v = f(!1), g = A(() => {
      const l = s.max - s.min || 1;
      return Math.min(100, Math.max(0, (s.modelValue - s.min) / l * 100));
    }), _ = A(
      () => s.formatValue ? s.formatValue(s.modelValue) : String(s.modelValue)
    );
    function k(l) {
      const M = Math.min(s.max, Math.max(s.min, l)), w = Math.round((M - s.min) / s.step), U = s.min + w * s.step;
      return Math.round(U * 1e6) / 1e6;
    }
    function d(l, M = !1) {
      const w = k(l);
      w !== s.modelValue && (i("update:modelValue", w), M && i("change", w));
    }
    function a(l) {
      const M = u.value;
      if (!M) return s.modelValue;
      const w = M.getBoundingClientRect(), U = w.width ? (l - w.left) / w.width : 0;
      return s.min + U * (s.max - s.min);
    }
    function h(l) {
      var M, w;
      s.disabled || ((w = (M = l.currentTarget).setPointerCapture) == null || w.call(M, l.pointerId), v.value = !0, d(a(l.clientX)));
    }
    function b(l) {
      v.value && d(a(l.clientX));
    }
    function c(l) {
      var M, w;
      v.value && (v.value = !1, (w = (M = l.currentTarget).releasePointerCapture) == null || w.call(M, l.pointerId), i("change", s.modelValue));
    }
    function p(l) {
      if (s.disabled) return;
      const M = (s.max - s.min) / 10;
      let w = !0;
      switch (l.key) {
        case "ArrowRight":
        case "ArrowUp":
          d(s.modelValue + s.step, !0);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          d(s.modelValue - s.step, !0);
          break;
        case "PageUp":
          d(s.modelValue + M, !0);
          break;
        case "PageDown":
          d(s.modelValue - M, !0);
          break;
        case "Home":
          d(s.min, !0);
          break;
        case "End":
          d(s.max, !0);
          break;
        default:
          w = !1;
      }
      w && l.preventDefault();
    }
    return (l, M) => (o(), r("div", {
      class: V(["phlix-slider", { "is-disabled": n.disabled }]),
      role: "slider",
      tabindex: n.disabled ? -1 : 0,
      "aria-label": n.label,
      "aria-valuemin": n.min,
      "aria-valuemax": n.max,
      "aria-valuenow": n.modelValue,
      "aria-valuetext": _.value,
      "aria-disabled": n.disabled || void 0,
      "aria-orientation": "horizontal",
      onKeydown: p
    }, [
      t("div", {
        ref_key: "trackEl",
        ref: u,
        class: "phlix-slider__track",
        onPointerdown: h,
        onPointermove: b,
        onPointerup: c
      }, [
        t("div", {
          class: "phlix-slider__fill",
          style: W({ width: g.value + "%" })
        }, null, 4),
        t("div", {
          class: "phlix-slider__thumb",
          style: W({ left: g.value + "%" })
        }, null, 4)
      ], 544)
    ], 42, Sa));
  }
}), ml = /* @__PURE__ */ B(Ba, [["__scopeId", "data-v-9ca92975"]]), Ta = ["aria-checked", "aria-label", "aria-labelledby", "disabled"], Pa = ["id"], ja = /* @__PURE__ */ S({
  __name: "Switch",
  props: {
    modelValue: { type: Boolean },
    label: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: e }) {
    const s = n, i = e, u = Be();
    function v() {
      s.disabled || i("update:modelValue", !s.modelValue);
    }
    return (g, _) => (o(), r("span", {
      class: V(["phlix-switch", { "is-disabled": n.disabled }])
    }, [
      t("button", {
        type: "button",
        role: "switch",
        class: V(["phlix-switch__control", { "is-on": n.modelValue }]),
        "aria-checked": n.modelValue,
        "aria-label": n.label ? void 0 : "Toggle",
        "aria-labelledby": n.label ? $(u) : void 0,
        disabled: n.disabled,
        onClick: v
      }, [..._[0] || (_[0] = [
        t("span", { class: "phlix-switch__thumb" }, null, -1)
      ])], 10, Ta),
      n.label ? (o(), r("label", {
        key: 0,
        id: $(u),
        class: "phlix-switch__label",
        onClick: v
      }, m(n.label), 9, Pa)) : x("", !0)
    ], 2));
  }
}), pl = /* @__PURE__ */ B(ja, [["__scopeId", "data-v-4631a106"]]), Ra = ["disabled", "aria-pressed"], La = { class: "phlix-chip__label" }, Aa = ["disabled", "aria-label"], Ea = /* @__PURE__ */ S({
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
    function u() {
      s.disabled || (s.selected !== void 0 && i("update:selected", !s.selected), i("click"));
    }
    return (v, g) => (o(), r("span", {
      class: V(["phlix-chip", [`phlix-chip--${n.size}`, { "is-selected": n.selected, "is-disabled": n.disabled }]])
    }, [
      t("button", {
        type: "button",
        class: "phlix-chip__main",
        disabled: n.disabled,
        "aria-pressed": n.selected === void 0 ? void 0 : n.selected,
        onClick: u
      }, [
        n.icon ? (o(), O(X, {
          key: 0,
          name: n.icon,
          class: "phlix-chip__icon"
        }, null, 8, ["name"])) : x("", !0),
        t("span", La, [
          q(v.$slots, "default", {}, void 0, !0)
        ])
      ], 8, Ra),
      n.removable ? (o(), r("button", {
        key: 0,
        type: "button",
        class: "phlix-chip__remove",
        disabled: n.disabled,
        "aria-label": n.removeLabel,
        onClick: g[0] || (g[0] = (_) => i("remove"))
      }, [
        F(X, { name: "x" })
      ], 8, Aa)) : x("", !0)
    ], 2));
  }
}), fl = /* @__PURE__ */ B(Ea, [["__scopeId", "data-v-d6cd193e"]]), Fa = { class: "library-scan-page" }, Va = {
  key: 0,
  class: "loading"
}, Ua = {
  key: 1,
  class: "error"
}, za = {
  key: 2,
  class: "libraries-list"
}, Da = { class: "library-info" }, Na = { class: "library-name" }, Ha = { class: "library-type" }, qa = { class: "library-paths" }, Ga = { class: "library-meta" }, Oa = { key: 0 }, Ya = {
  key: 0,
  class: "scan-status"
}, Ka = { class: "library-actions" }, Xa = ["onClick", "disabled"], Ja = ["onClick", "disabled"], Wa = {
  key: 0,
  class: "empty-state"
}, Qa = /* @__PURE__ */ S({
  __name: "LibraryScanPage",
  setup(n) {
    const e = f([]), s = f({}), i = f(!0), u = f(null);
    async function v() {
      try {
        const h = await D.get("/api/v1/libraries");
        e.value = h.libraries || [];
        for (const b of e.value)
          g(b.id);
      } catch (h) {
        u.value = h instanceof Error ? h.message : "Failed to load libraries";
      } finally {
        i.value = !1;
      }
    }
    async function g(h) {
      try {
        const b = await D.get(`/api/v1/libraries/${h}/scan-status`);
        b.job && (s.value[h] = b.job);
      } catch {
      }
    }
    async function _(h) {
      try {
        await D.post(`/api/v1/libraries/${h}/scan`), await g(h);
      } catch (b) {
        u.value = b instanceof Error ? b.message : "Failed to trigger scan";
      }
    }
    async function k(h) {
      try {
        await D.post(`/api/v1/libraries/${h}/rescan`), await g(h);
      } catch (b) {
        u.value = b instanceof Error ? b.message : "Failed to trigger rescan";
      }
    }
    function d(h) {
      return h ? new Date(h).toLocaleString() : "Never";
    }
    function a(h) {
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
    return Y(() => {
      v();
    }), (h, b) => (o(), r("div", Fa, [
      b[0] || (b[0] = t("div", { class: "scan-header" }, [
        t("h1", { class: "scan-title" }, "Library Scanner"),
        t("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      i.value ? (o(), r("div", Va, "Loading libraries...")) : u.value ? (o(), r("div", Ua, m(u.value), 1)) : (o(), r("div", za, [
        (o(!0), r(L, null, E(e.value, (c) => {
          var p, l, M, w;
          return o(), r("div", {
            key: c.id,
            class: "library-card"
          }, [
            t("div", Da, [
              t("h3", Na, m(c.name), 1),
              t("span", Ha, m(c.type), 1),
              t("p", qa, m(c.paths.join(", ")), 1),
              t("div", Ga, [
                c.item_count !== void 0 ? (o(), r("span", Oa, m(c.item_count) + " items", 1)) : x("", !0),
                t("span", null, "Last scan: " + m(d(c.last_scan_at)), 1)
              ]),
              s.value[c.id] ? (o(), r("div", Ya, m(a(s.value[c.id])), 1)) : x("", !0)
            ]),
            t("div", Ka, [
              t("button", {
                class: "btn btn-scan",
                onClick: (U) => _(c.id),
                disabled: ((p = s.value[c.id]) == null ? void 0 : p.status) === "running" || ((l = s.value[c.id]) == null ? void 0 : l.status) === "queued"
              }, " Scan ", 8, Xa),
              t("button", {
                class: "btn btn-rescan",
                onClick: (U) => k(c.id),
                disabled: ((M = s.value[c.id]) == null ? void 0 : M.status) === "running" || ((w = s.value[c.id]) == null ? void 0 : w.status) === "queued"
              }, " Rescan ", 8, Ja)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (o(), r("div", Wa, " No libraries configured. Add a library to get started. ")) : x("", !0)
      ]))
    ]));
  }
}), gl = /* @__PURE__ */ B(Qa, [["__scopeId", "data-v-62b3805e"]]), Za = { class: "my-servers-page" }, ei = {
  key: 0,
  class: "loading"
}, ti = {
  key: 1,
  class: "error"
}, ni = {
  key: 2,
  class: "servers-list"
}, si = { class: "server-info" }, oi = { class: "server-name" }, ri = { class: "server-url" }, ai = { class: "server-meta" }, ii = { key: 0 }, li = {
  key: 0,
  class: "empty-state"
}, ci = /* @__PURE__ */ S({
  __name: "MyServersPage",
  setup(n) {
    const e = f([]), s = f(!0), i = f(null);
    async function u() {
      try {
        const _ = await D.get("/api/v1/servers");
        e.value = _.servers || [];
      } catch (_) {
        i.value = _ instanceof Error ? _.message : "Failed to load servers";
      } finally {
        s.value = !1;
      }
    }
    function v(_) {
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
    function g(_) {
      return _ ? new Date(_).toLocaleString() : "Never";
    }
    return Y(() => {
      u();
    }), (_, k) => (o(), r("div", Za, [
      k[2] || (k[2] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "My Servers"),
        t("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      s.value ? (o(), r("div", ei, "Loading servers...")) : i.value ? (o(), r("div", ti, m(i.value), 1)) : (o(), r("div", ni, [
        (o(!0), r(L, null, E(e.value, (d) => (o(), r("div", {
          key: d.id,
          class: "server-card"
        }, [
          t("div", {
            class: "server-status",
            style: W({ backgroundColor: v(d.status) })
          }, null, 4),
          t("div", si, [
            t("h3", oi, m(d.name), 1),
            t("p", ri, m(d.url), 1),
            t("div", ai, [
              t("span", null, m(d.owner), 1),
              d.library_count !== void 0 ? (o(), r("span", ii, m(d.library_count) + " libraries", 1)) : x("", !0),
              t("span", null, "Last seen: " + m(g(d.last_seen)), 1)
            ])
          ]),
          k[0] || (k[0] = t("div", { class: "server-actions" }, [
            t("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (o(), r("div", li, [...k[1] || (k[1] = [
          t("p", null, "No servers connected yet.", -1),
          t("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), _l = /* @__PURE__ */ B(ci, [["__scopeId", "data-v-b9237da4"]]), di = { class: "federation-page" }, ui = {
  key: 0,
  class: "loading"
}, hi = {
  key: 1,
  class: "error"
}, vi = {
  key: 2,
  class: "federation-content"
}, mi = { class: "peers-section" }, pi = { class: "peers-list" }, fi = { class: "peer-info" }, gi = { class: "peer-name" }, _i = { class: "peer-url" }, ki = { class: "peer-meta" }, bi = { key: 0 }, yi = { class: "peer-actions" }, wi = ["onClick"], $i = {
  key: 1,
  class: "status-badge"
}, xi = {
  key: 0,
  class: "empty-state"
}, Ci = { class: "add-peer-section" }, Mi = /* @__PURE__ */ S({
  __name: "FederationPage",
  setup(n) {
    const e = f([]), s = f(!0), i = f(null);
    async function u() {
      try {
        const d = await D.get("/api/v1/federation/peers");
        e.value = d.peers || [];
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to load federation peers";
      } finally {
        s.value = !1;
      }
    }
    async function v(d) {
      try {
        await D.post("/api/v1/federation/connect", { url: d }), await u();
      } catch (a) {
        i.value = a instanceof Error ? a.message : "Failed to connect to peer";
      }
    }
    async function g(d) {
      try {
        await D.post(`/api/v1/federation/peers/${d}/disconnect`), await u();
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
    function k(d) {
      return d ? new Date(d).toLocaleString() : "Never";
    }
    return Y(() => {
      u();
    }), (d, a) => (o(), r("div", di, [
      a[5] || (a[5] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Federation"),
        t("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      s.value ? (o(), r("div", ui, "Loading federation peers...")) : i.value ? (o(), r("div", hi, m(i.value), 1)) : (o(), r("div", vi, [
        t("div", mi, [
          a[2] || (a[2] = t("h2", { class: "section-title" }, "Connected Peers", -1)),
          t("div", pi, [
            (o(!0), r(L, null, E(e.value, (h) => (o(), r("div", {
              key: h.id,
              class: "peer-card"
            }, [
              t("div", {
                class: "peer-status",
                style: W({ backgroundColor: _(h.status) })
              }, null, 4),
              t("div", fi, [
                t("h3", gi, m(h.name), 1),
                t("p", _i, m(h.url), 1),
                t("div", ki, [
                  h.shared_libraries_count !== void 0 ? (o(), r("span", bi, m(h.shared_libraries_count) + " shared libraries", 1)) : x("", !0),
                  t("span", null, "Last sync: " + m(k(h.last_sync)), 1)
                ])
              ]),
              t("div", yi, [
                h.status === "connected" ? (o(), r("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (b) => g(h.id)
                }, " Disconnect ", 8, wi)) : h.status === "pending" ? (o(), r("span", $i, "Pending")) : x("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (o(), r("div", xi, [...a[1] || (a[1] = [
              t("p", null, "No federation peers connected.", -1)
            ])])) : x("", !0)
          ])
        ]),
        t("div", Ci, [
          a[4] || (a[4] = t("h2", { class: "section-title" }, "Add Peer", -1)),
          t("form", {
            class: "add-peer-form",
            onSubmit: a[0] || (a[0] = te((h) => v(""), ["prevent"]))
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
}), kl = /* @__PURE__ */ B(Mi, [["__scopeId", "data-v-91ba2781"]]), Ii = { class: "manage-shares-page" }, Si = {
  key: 0,
  class: "loading"
}, Bi = {
  key: 1,
  class: "error"
}, Ti = {
  key: 2,
  class: "shares-list"
}, Pi = { class: "share-info" }, ji = { class: "share-library" }, Ri = { class: "share-meta" }, Li = {
  key: 0,
  class: "expired-badge"
}, Ai = { class: "share-dates" }, Ei = { key: 0 }, Fi = { class: "share-actions" }, Vi = ["onClick"], Ui = {
  key: 0,
  class: "empty-state"
}, zi = /* @__PURE__ */ S({
  __name: "ManageSharesPage",
  setup(n) {
    const e = f([]), s = f(!0), i = f(null);
    async function u() {
      try {
        const k = await D.get("/api/v1/shares");
        e.value = k.shares || [];
      } catch (k) {
        i.value = k instanceof Error ? k.message : "Failed to load shares";
      } finally {
        s.value = !1;
      }
    }
    async function v(k) {
      try {
        await D.delete(`/api/v1/shares/${k}`), await u();
      } catch (d) {
        i.value = d instanceof Error ? d.message : "Failed to revoke share";
      }
    }
    function g(k) {
      return new Date(k).toLocaleString();
    }
    function _(k) {
      return k ? new Date(k) < /* @__PURE__ */ new Date() : !1;
    }
    return Y(() => {
      u();
    }), (k, d) => (o(), r("div", Ii, [
      d[1] || (d[1] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Manage Shares"),
        t("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      s.value ? (o(), r("div", Si, "Loading shares...")) : i.value ? (o(), r("div", Bi, m(i.value), 1)) : (o(), r("div", Ti, [
        (o(!0), r(L, null, E(e.value, (a) => (o(), r("div", {
          key: a.id,
          class: "share-card"
        }, [
          t("div", Pi, [
            t("h3", ji, m(a.library_name), 1),
            t("div", Ri, [
              t("span", null, "Shared with: " + m(a.shared_with), 1),
              t("span", {
                class: V(["permission-badge", a.permissions])
              }, m(a.permissions), 3),
              a.expires_at && _(a.expires_at) ? (o(), r("span", Li, "Expired")) : x("", !0)
            ]),
            t("p", Ai, [
              J(" Created: " + m(g(a.created_at)) + " ", 1),
              a.expires_at ? (o(), r("span", Ei, " | Expires: " + m(g(a.expires_at)), 1)) : x("", !0)
            ])
          ]),
          t("div", Fi, [
            t("button", {
              class: "btn btn-danger",
              onClick: (h) => v(a.id)
            }, "Revoke", 8, Vi)
          ])
        ]))), 128)),
        e.value.length === 0 ? (o(), r("div", Ui, [...d[0] || (d[0] = [
          t("p", null, "No library shares found.", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), bl = /* @__PURE__ */ B(zi, [["__scopeId", "data-v-bd8771ac"]]), Di = { class: "audit-logs-page" }, Ni = {
  key: 0,
  class: "loading"
}, Hi = {
  key: 1,
  class: "error"
}, qi = {
  key: 2,
  class: "logs-container"
}, Gi = { class: "logs-list" }, Oi = { class: "log-content" }, Yi = { class: "log-header" }, Ki = { class: "log-action" }, Xi = { class: "log-actor" }, Ji = { class: "log-time" }, Wi = {
  key: 0,
  class: "log-target"
}, Qi = {
  key: 1,
  class: "log-details"
}, Zi = {
  key: 2,
  class: "log-ip"
}, el = {
  key: 0,
  class: "empty-state"
}, tl = {
  key: 0,
  class: "pagination"
}, nl = ["disabled"], sl = { class: "page-info" }, ol = ["disabled"], rl = /* @__PURE__ */ S({
  __name: "AuditLogsPage",
  setup(n) {
    const e = f([]), s = f(!0), i = f(null), u = f(1), v = f(1);
    async function g(a = 1) {
      try {
        s.value = !0;
        const h = await D.get(
          "/api/v1/audit-logs",
          { page: String(a) }
        );
        e.value = h.logs || [], u.value = h.page || 1, v.value = h.total_pages || 1;
      } catch (h) {
        i.value = h instanceof Error ? h.message : "Failed to load audit logs";
      } finally {
        s.value = !1;
      }
    }
    function _(a) {
      return new Date(a).toLocaleString();
    }
    function k(a) {
      return a.includes("create") || a.includes("add") ? "#22c55e" : a.includes("delete") || a.includes("remove") ? "#ef4444" : a.includes("update") || a.includes("edit") ? "#3b82f6" : a.includes("login") || a.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function d(a) {
      return a.includes("create") || a.includes("add") ? "+" : a.includes("delete") || a.includes("remove") ? "-" : a.includes("update") || a.includes("edit") ? "~" : a.includes("login") || a.includes("auth") ? "@" : "#";
    }
    return Y(() => {
      g();
    }), (a, h) => (o(), r("div", Di, [
      h[3] || (h[3] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Audit Logs"),
        t("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      s.value ? (o(), r("div", Ni, "Loading audit logs...")) : i.value ? (o(), r("div", Hi, m(i.value), 1)) : (o(), r("div", qi, [
        t("div", Gi, [
          (o(!0), r(L, null, E(e.value, (b) => (o(), r("div", {
            key: b.id,
            class: "log-entry"
          }, [
            t("div", {
              class: "log-icon",
              style: W({ backgroundColor: k(b.action) })
            }, m(d(b.action)), 5),
            t("div", Oi, [
              t("div", Yi, [
                t("span", Ki, m(b.action), 1),
                t("span", Xi, m(b.actor), 1),
                t("span", Ji, m(_(b.created_at)), 1)
              ]),
              b.target ? (o(), r("p", Wi, "Target: " + m(b.target), 1)) : x("", !0),
              b.details ? (o(), r("p", Qi, m(b.details), 1)) : x("", !0),
              b.ip_address ? (o(), r("span", Zi, "IP: " + m(b.ip_address), 1)) : x("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (o(), r("div", el, [...h[2] || (h[2] = [
            t("p", null, "No audit logs found.", -1)
          ])])) : x("", !0)
        ]),
        v.value > 1 ? (o(), r("div", tl, [
          t("button", {
            class: "btn btn-secondary",
            disabled: u.value <= 1,
            onClick: h[0] || (h[0] = (b) => g(u.value - 1))
          }, " Previous ", 8, nl),
          t("span", sl, "Page " + m(u.value) + " of " + m(v.value), 1),
          t("button", {
            class: "btn btn-secondary",
            disabled: u.value >= v.value,
            onClick: h[1] || (h[1] = (b) => g(u.value + 1))
          }, " Next ", 8, ol)
        ])) : x("", !0)
      ]))
    ]));
  }
}), yl = /* @__PURE__ */ B(rl, [["__scopeId", "data-v-05910fd9"]]);
export {
  oe as ApiClient,
  Qe as ApiError,
  qe as AppLayout,
  yl as AuditLogsPage,
  vl as Badge,
  Qt as BrowsePage,
  ul as Button,
  fl as Chip,
  kl as FederationPage,
  qt as FilterBar,
  X as Icon,
  hl as IconButton,
  gl as LibraryScanPage,
  yn as LocalStorageTokenStore,
  Tn as LoginForm,
  Ln as LoginPage,
  bl as ManageSharesPage,
  vt as MediaCard,
  kt as MediaGrid,
  _l as MyServersPage,
  Ye as PhlixApp,
  pn as Player,
  bn as PlayerPage,
  ds as SettingsForm,
  vs as SettingsPage,
  On as SignupForm,
  Jn as SignupPage,
  ml as Slider,
  pl as Switch,
  dl as createPhlixApp,
  ue as useAuthStore,
  ge as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
