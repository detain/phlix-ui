var ye = Object.defineProperty;
var be = (l, t, s) => t in l ? ye(l, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : l[t] = s;
var Q = (l, t, s) => be(l, typeof t != "symbol" ? t + "" : t, s);
import { openBlock as a, createElementBlock as n, createElementVNode as e, renderSlot as K, defineComponent as E, createBlock as re, withCtx as z, createVNode as N, unref as $, createTextVNode as Y, toDisplayString as d, ref as p, computed as D, createCommentVNode as w, Fragment as L, renderList as I, withDirectives as V, vModelText as Z, normalizeClass as X, inject as de, onMounted as j, watch as $e, onUnmounted as ke, withModifiers as W, normalizeStyle as ee, createStaticVNode as we, resolveComponent as ve, vModelDynamic as le, vShow as Se, createApp as Ce } from "vue";
import { defineStore as pe, createPinia as Te } from "pinia";
import { RouterView as Pe, RouterLink as ue, useRoute as xe, useRouter as _e, createRouter as Re, createWebHistory as Ee } from "vue-router";
const x = (l, t) => {
  const s = l.__vccOpts || l;
  for (const [i, v] of t)
    s[i] = v;
  return s;
}, Fe = {}, Le = { class: "app-layout" }, Ie = { class: "app-header" }, Ae = { class: "header-inner" }, Me = { class: "logo" }, Ue = { class: "nav" }, Ne = { class: "app-main" }, De = { class: "app-footer" };
function Be(l, t) {
  return a(), n("div", Le, [
    e("header", Ie, [
      e("div", Ae, [
        e("div", Me, [
          K(l.$slots, "logo", {}, () => [
            t[0] || (t[0] = e("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        e("nav", Ue, [
          K(l.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    e("main", Ne, [
      K(l.$slots, "default", {}, void 0, !0)
    ]),
    e("footer", De, [
      K(l.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const qe = /* @__PURE__ */ x(Fe, [["render", Be], ["__scopeId", "data-v-9f6c6d16"]]), Ge = { class: "main-nav" }, Ve = /* @__PURE__ */ E({
  __name: "PhlixApp",
  setup(l) {
    return (t, s) => (a(), re(qe, null, {
      nav: z(() => [
        e("nav", Ge, [
          N($(ue), {
            to: "/app",
            class: "nav-link"
          }, {
            default: z(() => [...s[0] || (s[0] = [
              Y("Browse", -1)
            ])]),
            _: 1
          }),
          N($(ue), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: z(() => [...s[1] || (s[1] = [
              Y("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: z(() => [
        N($(Pe))
      ]),
      _: 1
    }));
  }
}), je = /* @__PURE__ */ x(Ve, [["__scopeId", "data-v-35b5e7c6"]]), Oe = { class: "phlix-placeholder" }, Ye = { class: "placeholder-content" }, He = /* @__PURE__ */ E({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(l) {
    return (t, s) => (a(), n("div", Oe, [
      e("div", Ye, [
        s[0] || (s[0] = e("h1", null, "Shared UI loading...", -1)),
        e("p", null, "Phlix " + d(l.appName) + " is initializing", 1)
      ])
    ]));
  }
}), ze = /* @__PURE__ */ x(He, [["__scopeId", "data-v-bf79ac4c"]]);
class Je extends Error {
  constructor(t, s, i = null) {
    super(t), this.status = s, this.body = i, this.name = "ApiError";
  }
}
function Ke(l) {
  return l === !0 || l === 1 || l === "1" || l === "true";
}
class te {
  constructor(t = {}) {
    Q(this, "baseUrl");
    Q(this, "tokens");
    Q(this, "doFetch");
    this.baseUrl = t.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = t.tokenStore ?? {
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
    }, this.doFetch = t.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }
  async request(t, s, i = null) {
    const v = () => {
      const h = {
        "Content-Type": "application/json"
      }, f = this.tokens.getAccessToken();
      f && (h.Authorization = `Bearer ${f}`);
      const u = { method: t, headers: h, credentials: "same-origin" };
      return i !== null && (t === "POST" || t === "PUT" || t === "PATCH") && (u.body = JSON.stringify(i)), u;
    }, m = `${this.baseUrl}${s}`;
    let y = await this.doFetch(m, v());
    return y.status === 401 && await this.refreshToken() && (y = await this.doFetch(m, v())), this.handleResponse(y);
  }
  async handleResponse(t) {
    const v = (t.headers.get("content-type") ?? "").includes("application/json") ? await t.json() : await t.text();
    if (!t.ok) {
      const m = this.extractError(v);
      throw new Je(m, t.status, v);
    }
    return v;
  }
  extractError(t) {
    if (t && typeof t == "object") {
      const s = t;
      if (typeof s.error == "string")
        return s.error;
      if (typeof s.message == "string")
        return s.message;
    }
    return "Request failed";
  }
  async refreshToken() {
    const t = this.tokens.getRefreshToken();
    if (!t)
      return !1;
    try {
      const s = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ refresh_token: t })
      });
      if (!s.ok)
        return !1;
      const i = await s.json();
      return typeof i.access_token != "string" ? !1 : (this.tokens.setAccessToken(i.access_token), typeof i.refresh_token == "string" && this.tokens.setRefreshToken(i.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(t, s) {
    const i = s ? "?" + new URLSearchParams(s).toString() : "";
    return this.request("GET", t + i);
  }
  async post(t, s) {
    return this.request("POST", t, s ?? null);
  }
  async put(t, s) {
    return this.request("PUT", t, s ?? null);
  }
  async patch(t, s) {
    return this.request("PATCH", t, s ?? null);
  }
  async delete(t) {
    return this.request("DELETE", t);
  }
  isLoggedIn() {
    return this.tokens.getAccessToken() !== null;
  }
  async getCurrentUser() {
    const { user: t } = await this.get("/api/v1/auth/me");
    return { ...t, is_admin: Ke(t.is_admin) };
  }
  logout(t = !0) {
    this.tokens.clear(), t && typeof window < "u" && (window.location.href = "/login");
  }
}
const U = new te(), fe = pe("media", () => {
  const l = p([]), t = p(0), s = p(!1), i = p(null), v = p(""), m = p([]), y = p(void 0), h = p(void 0), f = p([]), u = p([]), o = p("name"), c = p("asc"), b = p(24), r = p(0), _ = D(() => r.value + l.value.length < t.value), g = D(() => {
    const k = {};
    return v.value && (k.search = v.value), m.value.length && (k.genres = m.value), y.value !== void 0 && (k.yearFrom = y.value), h.value !== void 0 && (k.yearTo = h.value), f.value.length && (k.ratings = f.value), u.value.length && (k.types = u.value), k.sort = o.value, k.order = c.value, k.limit = b.value, k.offset = r.value, k;
  }), A = D(() => {
    const k = /* @__PURE__ */ new Set();
    return l.value.forEach((P) => {
      var T;
      return (T = P.genres) == null ? void 0 : T.forEach((H) => k.add(H));
    }), Array.from(k).sort();
  }), R = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], B = ["movie", "series", "episode", "audio", "image"];
  function O(k) {
    var H, G, ce;
    const P = new URLSearchParams(), T = g.value;
    return T.search && P.set("search", T.search), (H = T.genres) == null || H.forEach((J) => P.append("genres", J)), T.yearFrom !== void 0 && P.set("yearFrom", String(T.yearFrom)), T.yearTo !== void 0 && P.set("yearTo", String(T.yearTo)), (G = T.ratings) == null || G.forEach((J) => P.append("ratings", J)), (ce = T.types) == null || ce.forEach((J) => P.append("types", J)), T.sort && P.set("sort", T.sort), T.order && P.set("order", T.order), P.set("limit", String(T.limit)), P.set("offset", String(T.offset)), `${k}/api/v1/media?${P.toString()}`;
  }
  async function q(k, P = !1) {
    s.value = !0, i.value = null;
    try {
      const T = new te({ baseUrl: k }), H = O(k), G = await T.get(H);
      P ? l.value = [...l.value, ...G.items] : l.value = G.items, t.value = G.total, r.value = (G.offset ?? 0) + G.items.length;
    } catch (T) {
      i.value = T instanceof Error ? T.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function F(k) {
    await q(k, !0);
  }
  function C() {
    l.value = [], t.value = 0, r.value = 0, i.value = null;
  }
  function S(k) {
    v.value = k, r.value = 0;
  }
  function M(k) {
    m.value = k, r.value = 0;
  }
  function se(k, P) {
    y.value = k, h.value = P, r.value = 0;
  }
  function ge(k) {
    f.value = k, r.value = 0;
  }
  function me(k) {
    u.value = k, r.value = 0;
  }
  function he(k, P) {
    o.value = k, P && (c.value = P), r.value = 0;
  }
  return {
    items: l,
    total: t,
    loading: s,
    error: i,
    search: v,
    selectedGenres: m,
    yearFrom: y,
    yearTo: h,
    selectedRatings: f,
    selectedTypes: u,
    sort: o,
    order: c,
    limit: b,
    offset: r,
    hasMore: _,
    queryParams: g,
    availableGenres: A,
    availableRatings: R,
    availableTypes: B,
    fetchMedia: q,
    loadMore: F,
    reset: C,
    setSearch: S,
    setGenres: M,
    setYearRange: se,
    setRatings: ge,
    setTypes: me,
    setSort: he
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
  setup(l) {
    return (t, s) => {
      var i;
      return a(), n("article", Xe, [
        e("a", {
          href: l.to ?? `/app/player/${l.item.id}`,
          class: "card-link"
        }, [
          e("div", Qe, [
            l.item.poster_url ? (a(), n("img", {
              key: 0,
              src: l.item.poster_url,
              alt: l.item.name,
              loading: "lazy"
            }, null, 8, Ze)) : (a(), n("div", et, [
              s[0] || (s[0] = e("span", { class: "placeholder-icon" }, "🎬", -1)),
              e("span", tt, d(l.item.type), 1)
            ]))
          ]),
          e("div", st, [
            l.item.year ? (a(), n("span", at, d(l.item.year), 1)) : w("", !0),
            l.item.rating ? (a(), n("span", nt, d(l.item.rating), 1)) : w("", !0)
          ]),
          e("div", ot, [
            e("h3", {
              class: "card-title",
              title: l.item.name
            }, d(l.item.name), 9, lt),
            (i = l.item.genres) != null && i.length ? (a(), n("p", rt, d(l.item.genres.slice(0, 2).join(", ")), 1)) : w("", !0)
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
}, _t = /* @__PURE__ */ E({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(l) {
    return (t, s) => (a(), n("div", ut, [
      l.loading ? (a(), n("div", dt, [
        (a(), n(L, null, I(12, (i) => e("div", {
          key: i,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          e("div", { class: "skeleton-poster" }, null, -1),
          e("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : l.items.length === 0 ? (a(), n("div", vt, [...s[1] || (s[1] = [
        e("p", null, "No media found.", -1),
        e("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (a(), n("div", pt, [
        (a(!0), n(L, null, I(l.items, (i) => (a(), re(ct, {
          key: i.id,
          item: i
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), ft = /* @__PURE__ */ x(_t, [["__scopeId", "data-v-b7e87216"]]), gt = { class: "filter-bar" }, mt = { class: "filter-search" }, ht = { class: "filter-row" }, yt = { class: "filter-group" }, bt = ["value"], $t = ["value"], kt = ["value"], wt = { class: "filter-group" }, St = ["value"], Ct = ["value"], Tt = ["value"], Pt = ["value"], xt = { class: "filter-section" }, Rt = { class: "filter-chips" }, Et = ["onClick"], Ft = { class: "filter-section" }, Lt = { class: "filter-chips" }, It = ["onClick"], At = { class: "filter-section" }, Mt = { class: "filter-chips" }, Ut = ["onClick"], Nt = { class: "filter-actions" }, Dt = { class: "result-count" }, Bt = /* @__PURE__ */ E({
  __name: "FilterBar",
  setup(l) {
    const t = fe(), s = p(t.search), i = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function v() {
      t.setSearch(s.value);
    }
    function m(r) {
      const _ = t.selectedGenres;
      _.includes(r) ? t.setGenres(_.filter((g) => g !== r)) : t.setGenres([..._, r]);
    }
    function y(r) {
      const _ = t.selectedRatings;
      _.includes(r) ? t.setRatings(_.filter((g) => g !== r)) : t.setRatings([..._, r]);
    }
    function h(r) {
      const _ = t.selectedTypes;
      _.includes(r) ? t.setTypes(_.filter((g) => g !== r)) : t.setTypes([..._, r]);
    }
    function f(r) {
      const _ = r.target;
      t.setSort(_.value);
    }
    function u(r) {
      const _ = r.target;
      t.order = _.value;
    }
    const o = (/* @__PURE__ */ new Date()).getFullYear(), c = D(() => {
      const r = [];
      for (let _ = o; _ >= 1900; _--)
        r.push(_);
      return r;
    });
    function b() {
      s.value = "", t.search = "", t.setGenres([]), t.setYearRange(void 0, void 0), t.setRatings([]), t.setTypes([]), t.setSort("name");
    }
    return (r, _) => (a(), n("div", gt, [
      e("div", mt, [
        V(e("input", {
          "onUpdate:modelValue": _[0] || (_[0] = (g) => s.value = g),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: v
        }, null, 544), [
          [Z, s.value]
        ])
      ]),
      e("div", ht, [
        e("div", yt, [
          _[4] || (_[4] = e("label", { class: "filter-label" }, "Sort", -1)),
          e("select", {
            class: "filter-select",
            value: $(t).sort,
            onChange: f
          }, [
            (a(), n(L, null, I(i, (g) => e("option", {
              key: g.value,
              value: g.value
            }, d(g.label), 9, $t)), 64))
          ], 40, bt),
          e("select", {
            class: "filter-select order-select",
            value: $(t).order,
            onChange: u
          }, [..._[3] || (_[3] = [
            e("option", { value: "asc" }, "↑", -1),
            e("option", { value: "desc" }, "↓", -1)
          ])], 40, kt)
        ]),
        e("div", wt, [
          _[7] || (_[7] = e("label", { class: "filter-label" }, "Year", -1)),
          e("select", {
            class: "filter-select",
            value: $(t).yearFrom ?? "",
            onChange: _[1] || (_[1] = (g) => $(t).setYearRange(
              g.target.value ? Number(g.target.value) : void 0,
              $(t).yearTo
            ))
          }, [
            _[5] || (_[5] = e("option", { value: "" }, "From", -1)),
            (a(!0), n(L, null, I(c.value.slice(0, 50), (g) => (a(), n("option", {
              key: g,
              value: g
            }, d(g), 9, Ct))), 128))
          ], 40, St),
          e("select", {
            class: "filter-select",
            value: $(t).yearTo ?? "",
            onChange: _[2] || (_[2] = (g) => $(t).setYearRange(
              $(t).yearFrom,
              g.target.value ? Number(g.target.value) : void 0
            ))
          }, [
            _[6] || (_[6] = e("option", { value: "" }, "To", -1)),
            (a(!0), n(L, null, I(c.value.slice(0, 50), (g) => (a(), n("option", {
              key: g,
              value: g
            }, d(g), 9, Pt))), 128))
          ], 40, Tt)
        ])
      ]),
      e("div", xt, [
        _[8] || (_[8] = e("span", { class: "filter-label" }, "Genres", -1)),
        e("div", Rt, [
          (a(!0), n(L, null, I($(t).availableGenres, (g) => (a(), n("button", {
            key: g,
            class: X(["chip", { active: $(t).selectedGenres.includes(g) }]),
            onClick: (A) => m(g)
          }, d(g), 11, Et))), 128))
        ])
      ]),
      e("div", Ft, [
        _[9] || (_[9] = e("span", { class: "filter-label" }, "Rating", -1)),
        e("div", Lt, [
          (a(!0), n(L, null, I($(t).availableRatings, (g) => (a(), n("button", {
            key: g,
            class: X(["chip", { active: $(t).selectedRatings.includes(g) }]),
            onClick: (A) => y(g)
          }, d(g), 11, It))), 128))
        ])
      ]),
      e("div", At, [
        _[10] || (_[10] = e("span", { class: "filter-label" }, "Type", -1)),
        e("div", Mt, [
          (a(!0), n(L, null, I($(t).availableTypes, (g) => (a(), n("button", {
            key: g,
            class: X(["chip", { active: $(t).selectedTypes.includes(g) }]),
            onClick: (A) => h(g)
          }, d(g), 11, Ut))), 128))
        ])
      ]),
      e("div", Nt, [
        e("button", {
          class: "clear-btn",
          onClick: b
        }, "Clear filters"),
        e("span", Dt, d($(t).total) + " result" + d($(t).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), qt = /* @__PURE__ */ x(Bt, [["__scopeId", "data-v-7089ec0b"]]), Gt = { class: "browse-page" }, Vt = { class: "browse-header" }, jt = { class: "browse-toolbar-extra" }, Ot = {
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
  setup(l) {
    const t = de("apiBase") ?? D(() => ""), s = fe();
    function i() {
      s.reset(), s.fetchMedia(t.value);
    }
    j(i), $e(t, i);
    function v() {
      s.reset(), s.fetchMedia(t.value);
    }
    function m() {
      s.loadMore(t.value);
    }
    return (y, h) => (a(), n("div", Gt, [
      e("div", Vt, [
        h[0] || (h[0] = e("h1", { class: "browse-title" }, "Browse Media", -1)),
        e("div", jt, [
          K(y.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      N(qt, { onChange: v }),
      $(s).error ? (a(), n("div", Ot, [
        e("p", null, d($(s).error), 1),
        e("button", {
          class: "retry-btn",
          onClick: i
        }, "Retry")
      ])) : w("", !0),
      N(ft, {
        items: $(s).items,
        loading: $(s).loading && $(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      $(s).hasMore && !$(s).loading ? (a(), n("div", Yt, [
        e("button", {
          class: "load-more-btn",
          onClick: m
        }, "Load more")
      ])) : w("", !0),
      $(s).loading && $(s).items.length > 0 ? (a(), n("div", Ht, " Loading... ")) : w("", !0)
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
  setup(l) {
    const t = p(null), s = p(!1), i = p(0), v = p(0), m = p(1), y = p(!1), h = p(1), f = p(!1), u = p(!0);
    let o = null;
    const c = D(
      () => v.value > 0 ? i.value / v.value * 100 : 0
    );
    function b(C) {
      if (!isFinite(C) || isNaN(C)) return "0:00";
      const S = Math.floor(C / 60), M = Math.floor(C % 60);
      return `${S}:${M.toString().padStart(2, "0")}`;
    }
    function r() {
      t.value && (s.value ? t.value.pause() : t.value.play());
    }
    function _() {
      t.value && (i.value = t.value.currentTime);
    }
    function g() {
      t.value && (v.value = t.value.duration);
    }
    function A(C) {
      const M = C.currentTarget.getBoundingClientRect(), se = (C.clientX - M.left) / M.width;
      t.value && (t.value.currentTime = se * v.value);
    }
    function R(C) {
      const S = parseFloat(C.target.value);
      m.value = S, t.value && (t.value.volume = S), y.value = S === 0;
    }
    function B() {
      y.value = !y.value, t.value && (t.value.muted = y.value);
    }
    function O(C) {
      h.value = C, t.value && (t.value.playbackRate = C);
    }
    function q() {
      var S;
      const C = (S = t.value) == null ? void 0 : S.closest(".player-container");
      C && (document.fullscreenElement ? (document.exitFullscreen(), f.value = !1) : (C.requestFullscreen(), f.value = !0));
    }
    function F() {
      u.value = !0, o && clearTimeout(o), o = setTimeout(() => {
        s.value && (u.value = !1);
      }, 3e3);
    }
    return ke(() => {
      o && clearTimeout(o);
    }), (C, S) => (a(), n("div", {
      class: X(["player-container", { "controls-hidden": !u.value && s.value }]),
      onMousemove: F,
      onClick: r
    }, [
      S[6] || (S[6] = e("div", { class: "player-overlay" }, null, -1)),
      e("video", {
        ref_key: "videoRef",
        ref: t,
        class: "player-video",
        src: l.streamUrl,
        poster: l.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: S[0] || (S[0] = (M) => s.value = !0),
        onPause: S[1] || (S[1] = (M) => s.value = !1),
        onTimeupdate: _,
        onLoadedmetadata: g,
        onClick: W(r, ["stop"])
      }, null, 40, Kt),
      e("div", {
        class: "player-controls",
        onClick: S[4] || (S[4] = W(() => {
        }, ["stop"]))
      }, [
        e("div", Xt, [
          e("button", {
            class: "ctrl-btn back-btn",
            onClick: S[2] || (S[2] = (M) => C.$router.back())
          }, " ← Back "),
          e("span", Wt, d(l.media.name), 1),
          l.media.year ? (a(), n("span", Qt, d(l.media.year), 1)) : w("", !0)
        ]),
        e("div", Zt, [
          e("button", {
            class: "play-btn",
            onClick: r
          }, d(s.value ? "❚❚" : "▶"), 1)
        ]),
        e("div", es, [
          e("div", {
            class: "progress-bar",
            onClick: A
          }, [
            e("div", ts, [
              e("div", {
                class: "progress-fill",
                style: ee({ width: c.value + "%" })
              }, null, 4)
            ])
          ]),
          e("div", ss, [
            e("span", as, d(b(i.value)), 1),
            e("div", ns, [
              e("button", {
                class: "ctrl-btn",
                onClick: B
              }, d(y.value || m.value === 0 ? "🔇" : "🔊"), 1),
              e("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: y.value ? 0 : m.value,
                class: "volume-slider",
                onInput: R
              }, null, 40, os)
            ]),
            e("div", ls, [
              e("select", {
                class: "speed-select",
                value: h.value,
                onChange: S[3] || (S[3] = (M) => O(Number(M.target.value)))
              }, [...S[5] || (S[5] = [
                we('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, rs)
            ]),
            e("span", is, d(b(v.value)), 1),
            e("button", {
              class: "ctrl-btn",
              onClick: q
            }, d(f.value ? "⤓" : "⤢"), 1)
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
}, _s = /* @__PURE__ */ E({
  __name: "PlayerPage",
  setup(l) {
    const t = de("apiBase", D(() => "")), s = xe(), i = p(null), v = p(""), m = p(!0), y = p(null);
    async function h() {
      const f = s.params.id;
      if (!f) {
        y.value = "No media ID provided", m.value = !1;
        return;
      }
      try {
        const u = new te({ baseUrl: t.value }), [o, c] = await Promise.all([
          u.get(`/api/v1/media/${f}`),
          u.get(`/api/v1/media/${f}/playback-info`).catch(() => null)
        ]);
        i.value = o, c != null && c.url ? v.value = c.url : v.value = `${t.value}/media/${f}/stream`;
      } catch (u) {
        y.value = u instanceof Error ? u.message : "Failed to load media";
      } finally {
        m.value = !1;
      }
    }
    return j(h), (f, u) => (a(), n("div", ds, [
      m.value ? (a(), n("div", vs, "Loading...")) : y.value ? (a(), n("div", ps, [
        e("p", null, d(y.value), 1),
        e("button", {
          class: "retry-btn",
          onClick: h
        }, "Retry")
      ])) : i.value ? (a(), re(us, {
        key: 2,
        media: i.value,
        "stream-url": v.value
      }, null, 8, ["media", "stream-url"])) : w("", !0)
    ]));
  }
}), fs = /* @__PURE__ */ x(_s, [["__scopeId", "data-v-d9061b47"]]), ae = "access_token", ne = "refresh_token", oe = "user";
class gs {
  constructor(t = window.localStorage) {
    this.storage = t;
  }
  getAccessToken() {
    return this.storage.getItem(ae);
  }
  setAccessToken(t) {
    this.storage.setItem(ae, t);
  }
  getRefreshToken() {
    return this.storage.getItem(ne);
  }
  setRefreshToken(t) {
    this.storage.setItem(ne, t);
  }
  getUser() {
    const t = this.storage.getItem(oe);
    if (t === null) return null;
    try {
      return JSON.parse(t);
    } catch {
      return null;
    }
  }
  setUser(t) {
    this.storage.setItem(oe, JSON.stringify(t));
  }
  clear() {
    this.storage.removeItem(ae), this.storage.removeItem(ne), this.storage.removeItem(oe);
  }
}
const ie = pe("auth", () => {
  const l = new gs(), t = new te({ tokenStore: l }), s = p(null), i = p(!1), v = p(null), m = D(() => l.getAccessToken() !== null), y = D(() => {
    var c;
    return ((c = s.value) == null ? void 0 : c.is_admin) === !0;
  });
  async function h(c, b) {
    i.value = !0, v.value = null;
    try {
      const r = await t.post("/api/v1/auth/login", { email: c, password: b });
      return l.setAccessToken(r.access_token), l.setRefreshToken(r.refresh_token), await u(), !0;
    } catch (r) {
      return v.value = r instanceof Error ? r.message : "Login failed", !1;
    } finally {
      i.value = !1;
    }
  }
  async function f(c, b, r) {
    i.value = !0, v.value = null;
    try {
      const _ = await t.post("/api/v1/auth/register", { email: c, username: b, password: r });
      return l.setAccessToken(_.access_token), l.setRefreshToken(_.refresh_token), await u(), !0;
    } catch (_) {
      return v.value = _ instanceof Error ? _.message : "Registration failed", !1;
    } finally {
      i.value = !1;
    }
  }
  async function u() {
    if (m.value)
      try {
        s.value = await t.getCurrentUser();
      } catch {
        s.value = null, l.clear();
      }
  }
  function o() {
    l.clear(), s.value = null;
  }
  return {
    user: s,
    loading: i,
    error: v,
    isLoggedIn: m,
    isAdmin: y,
    client: t,
    login: h,
    signup: f,
    fetchUser: u,
    logout: o
  };
}), ms = {
  key: 0,
  class: "form-error"
}, hs = { class: "field" }, ys = { class: "field" }, bs = { class: "password-wrapper" }, $s = ["type"], ks = ["disabled"], ws = { class: "form-footer" }, Ss = /* @__PURE__ */ E({
  __name: "LoginForm",
  emits: ["success"],
  setup(l, { emit: t }) {
    const s = t, i = ie(), v = _e(), m = p(""), y = p(""), h = p(!1);
    async function f() {
      await i.login(m.value, y.value) && (s("success"), v.push("/app"));
    }
    return (u, o) => {
      const c = ve("router-link");
      return a(), n("form", {
        class: "login-form",
        onSubmit: W(f, ["prevent"])
      }, [
        o[7] || (o[7] = e("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        $(i).error ? (a(), n("div", ms, d($(i).error), 1)) : w("", !0),
        e("div", hs, [
          o[3] || (o[3] = e("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          V(e("input", {
            id: "email",
            "onUpdate:modelValue": o[0] || (o[0] = (b) => m.value = b),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [Z, m.value]
          ])
        ]),
        e("div", ys, [
          o[4] || (o[4] = e("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          e("div", bs, [
            V(e("input", {
              id: "password",
              "onUpdate:modelValue": o[1] || (o[1] = (b) => y.value = b),
              type: h.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, $s), [
              [le, y.value]
            ]),
            e("button", {
              type: "button",
              class: "toggle-password",
              onClick: o[2] || (o[2] = (b) => h.value = !h.value)
            }, d(h.value ? "🙈" : "👁"), 1)
          ])
        ]),
        e("button", {
          type: "submit",
          class: "submit-btn",
          disabled: $(i).loading
        }, d($(i).loading ? "Signing in..." : "Sign in"), 9, ks),
        e("p", ws, [
          o[6] || (o[6] = Y(" Don't have an account? ", -1)),
          N(c, {
            to: "/app/signup",
            class: "link"
          }, {
            default: z(() => [...o[5] || (o[5] = [
              Y("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Cs = /* @__PURE__ */ x(Ss, [["__scopeId", "data-v-22bc5576"]]), Ts = { class: "auth-page" }, Ps = { class: "auth-card" }, xs = /* @__PURE__ */ E({
  __name: "LoginPage",
  setup(l) {
    return (t, s) => (a(), n("div", Ts, [
      e("div", Ps, [
        N(Cs, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Rs = /* @__PURE__ */ x(xs, [["__scopeId", "data-v-9c53ce6a"]]), Es = {
  key: 0,
  class: "form-error"
}, Fs = { class: "field" }, Ls = { class: "field" }, Is = { class: "field" }, As = { class: "password-wrapper" }, Ms = ["type"], Us = { class: "field" }, Ns = ["type"], Ds = ["disabled"], Bs = { class: "form-footer" }, qs = /* @__PURE__ */ E({
  __name: "SignupForm",
  emits: ["success"],
  setup(l, { emit: t }) {
    const s = t, i = ie(), v = _e(), m = p(""), y = p(""), h = p(""), f = p(""), u = p(!1), o = p(null);
    async function c() {
      if (o.value = null, h.value.length < 8) {
        o.value = "Password must be at least 8 characters.";
        return;
      }
      if (h.value !== f.value) {
        o.value = "Passwords do not match.";
        return;
      }
      await i.signup(m.value, y.value, h.value) && (s("success"), v.push("/app"));
    }
    return (b, r) => {
      const _ = ve("router-link");
      return a(), n("form", {
        class: "signup-form",
        onSubmit: W(c, ["prevent"])
      }, [
        r[11] || (r[11] = e("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        $(i).error || o.value ? (a(), n("div", Es, d($(i).error || o.value), 1)) : w("", !0),
        e("div", Fs, [
          r[5] || (r[5] = e("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          V(e("input", {
            id: "email",
            "onUpdate:modelValue": r[0] || (r[0] = (g) => m.value = g),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [Z, m.value]
          ])
        ]),
        e("div", Ls, [
          r[6] || (r[6] = e("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          V(e("input", {
            id: "username",
            "onUpdate:modelValue": r[1] || (r[1] = (g) => y.value = g),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [Z, y.value]
          ])
        ]),
        e("div", Is, [
          r[7] || (r[7] = e("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          e("div", As, [
            V(e("input", {
              id: "password",
              "onUpdate:modelValue": r[2] || (r[2] = (g) => h.value = g),
              type: u.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, Ms), [
              [le, h.value]
            ]),
            e("button", {
              type: "button",
              class: "toggle-password",
              onClick: r[3] || (r[3] = (g) => u.value = !u.value)
            }, d(u.value ? "🙈" : "👁"), 1)
          ])
        ]),
        e("div", Us, [
          r[8] || (r[8] = e("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          V(e("input", {
            id: "confirm",
            "onUpdate:modelValue": r[4] || (r[4] = (g) => f.value = g),
            type: u.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Ns), [
            [le, f.value]
          ])
        ]),
        e("button", {
          type: "submit",
          class: "submit-btn",
          disabled: $(i).loading
        }, d($(i).loading ? "Creating account..." : "Create account"), 9, Ds),
        e("p", Bs, [
          r[10] || (r[10] = Y(" Already have an account? ", -1)),
          N(_, {
            to: "/app/login",
            class: "link"
          }, {
            default: z(() => [...r[9] || (r[9] = [
              Y("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), Gs = /* @__PURE__ */ x(qs, [["__scopeId", "data-v-d5e42c72"]]), Vs = { class: "auth-page" }, js = { class: "auth-card" }, Os = /* @__PURE__ */ E({
  __name: "SignupPage",
  setup(l) {
    return (t, s) => (a(), n("div", Vs, [
      e("div", js, [
        N(Gs, { onSuccess: () => {
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
  setup(l, { emit: t }) {
    const s = l, i = t, v = ie(), m = p({}), y = p(!0), h = p(!1), f = p(null), u = p(null), o = [
      "transcoding",
      "metadata",
      "markers",
      "subtitles",
      "discovery",
      "trickplay",
      "newsletter",
      "port-forward",
      "scrobblers"
    ], c = D(
      () => s.groups ? o.filter((R) => s.groups.includes(R)) : o
    );
    async function b() {
      y.value = !0, f.value = null;
      try {
        const R = await v.client.get("/api/v1/users/me/settings");
        m.value = R;
      } catch (R) {
        f.value = R instanceof Error ? R.message : "Failed to load settings";
      } finally {
        y.value = !1;
      }
    }
    async function r() {
      h.value = !0, f.value = null, u.value = null;
      try {
        await v.client.put("/api/v1/users/me/settings", m.value), u.value = "Settings saved.", i("saved", m.value), setTimeout(() => {
          u.value = null;
        }, 3e3);
      } catch (R) {
        f.value = R instanceof Error ? R.message : "Failed to save settings";
      } finally {
        h.value = !1;
      }
    }
    function _(R, B) {
      m.value[R] = B;
    }
    j(b);
    const g = {
      transcoding: "Transcoding",
      metadata: "Metadata",
      markers: "Marker Detection",
      subtitles: "Subtitles",
      discovery: "Discovery",
      trickplay: "Trickplay",
      newsletter: "Newsletter",
      "port-forward": "Port Forwarding",
      scrobblers: "Scrobblers"
    }, A = {
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
    return (R, B) => (a(), n("div", Hs, [
      y.value ? (a(), n("div", zs, "Loading settings...")) : f.value ? (a(), n("div", Js, d(f.value), 1)) : (a(), n(L, { key: 2 }, [
        (a(!0), n(L, null, I(c.value, (O) => (a(), n("div", {
          key: O,
          class: "settings-group"
        }, [
          e("h3", Ks, d(g[O]), 1),
          (a(), n(L, null, I(A, (q, F) => V(e("div", {
            key: F,
            class: "setting-row"
          }, [
            e("label", {
              for: F,
              class: "setting-label"
            }, d(q.label), 9, Xs),
            e("div", Ws, [
              q.type === "bool" ? (a(), n("input", {
                key: 0,
                id: F,
                type: "checkbox",
                class: "toggle",
                checked: !!m.value[F],
                onChange: (C) => _(F, C.target.checked)
              }, null, 40, Qs)) : q.type === "number" ? (a(), n("input", {
                key: 1,
                id: F,
                type: "number",
                class: "input number-input",
                value: m.value[F],
                onChange: (C) => _(F, Number(C.target.value))
              }, null, 40, Zs)) : (a(), n("input", {
                key: 2,
                id: F,
                type: "text",
                class: "input",
                value: m.value[F] ?? "",
                onChange: (C) => _(F, C.target.value)
              }, null, 40, ea))
            ])
          ]), [
            [Se, F.startsWith(O)]
          ])), 64))
        ]))), 128)),
        e("div", ta, [
          u.value ? (a(), n("div", sa, d(u.value), 1)) : w("", !0),
          e("button", {
            class: "save-btn",
            disabled: h.value,
            onClick: r
          }, d(h.value ? "Saving..." : "Save settings"), 9, aa)
        ])
      ], 64))
    ]));
  }
}), oa = /* @__PURE__ */ x(na, [["__scopeId", "data-v-51b588b6"]]), la = { class: "settings-page" }, ra = /* @__PURE__ */ E({
  __name: "SettingsPage",
  setup(l) {
    return (t, s) => (a(), n("div", la, [
      s[0] || (s[0] = e("div", { class: "settings-header" }, [
        e("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      N(oa)
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
function ua(l) {
  const t = l.routerBase || "/app", s = [
    {
      path: `${t}/`,
      redirect: t
    },
    {
      path: t,
      name: "browse",
      component: Jt
    },
    {
      path: `${t}/player/:id`,
      name: "player",
      component: fs
    },
    {
      path: `${t}/login`,
      name: "login",
      component: Rs
    },
    {
      path: `${t}/signup`,
      name: "signup",
      component: Ys
    },
    {
      path: `${t}/settings`,
      name: "settings",
      component: ia
    }
  ];
  return l.extraRoutes && s.push(...l.extraRoutes), s.push({
    path: `${t}/:pathMatch(.*)*`,
    name: "catchall",
    component: ze,
    props: { appName: l.app }
  }), s;
}
function Bn(l) {
  const t = {
    ...ca(),
    ...l
  }, s = Te(), i = t.routerBase || "/app", v = Re({
    history: Ee(i),
    routes: ua(t)
  }), m = Ce(je);
  return m.provide("apiBase", t.apiBase), m.use(s), m.use(v), m;
}
const da = { class: "library-scan-page" }, va = {
  key: 0,
  class: "loading"
}, pa = {
  key: 1,
  class: "error"
}, _a = {
  key: 2,
  class: "libraries-list"
}, fa = { class: "library-info" }, ga = { class: "library-name" }, ma = { class: "library-type" }, ha = { class: "library-paths" }, ya = { class: "library-meta" }, ba = { key: 0 }, $a = {
  key: 0,
  class: "scan-status"
}, ka = { class: "library-actions" }, wa = ["onClick", "disabled"], Sa = ["onClick", "disabled"], Ca = {
  key: 0,
  class: "empty-state"
}, Ta = /* @__PURE__ */ E({
  __name: "LibraryScanPage",
  setup(l) {
    const t = p([]), s = p({}), i = p(!0), v = p(null);
    async function m() {
      try {
        const c = await U.get("/api/v1/libraries");
        t.value = c.libraries || [];
        for (const b of t.value)
          y(b.id);
      } catch (c) {
        v.value = c instanceof Error ? c.message : "Failed to load libraries";
      } finally {
        i.value = !1;
      }
    }
    async function y(c) {
      try {
        const b = await U.get(`/api/v1/libraries/${c}/scan-status`);
        b.job && (s.value[c] = b.job);
      } catch {
      }
    }
    async function h(c) {
      try {
        await U.post(`/api/v1/libraries/${c}/scan`), await y(c);
      } catch (b) {
        v.value = b instanceof Error ? b.message : "Failed to trigger scan";
      }
    }
    async function f(c) {
      try {
        await U.post(`/api/v1/libraries/${c}/rescan`), await y(c);
      } catch (b) {
        v.value = b instanceof Error ? b.message : "Failed to trigger rescan";
      }
    }
    function u(c) {
      return c ? new Date(c).toLocaleString() : "Never";
    }
    function o(c) {
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
    return j(() => {
      m();
    }), (c, b) => (a(), n("div", da, [
      b[0] || (b[0] = e("div", { class: "scan-header" }, [
        e("h1", { class: "scan-title" }, "Library Scanner"),
        e("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      i.value ? (a(), n("div", va, "Loading libraries...")) : v.value ? (a(), n("div", pa, d(v.value), 1)) : (a(), n("div", _a, [
        (a(!0), n(L, null, I(t.value, (r) => {
          var _, g, A, R;
          return a(), n("div", {
            key: r.id,
            class: "library-card"
          }, [
            e("div", fa, [
              e("h3", ga, d(r.name), 1),
              e("span", ma, d(r.type), 1),
              e("p", ha, d(r.paths.join(", ")), 1),
              e("div", ya, [
                r.item_count !== void 0 ? (a(), n("span", ba, d(r.item_count) + " items", 1)) : w("", !0),
                e("span", null, "Last scan: " + d(u(r.last_scan_at)), 1)
              ]),
              s.value[r.id] ? (a(), n("div", $a, d(o(s.value[r.id])), 1)) : w("", !0)
            ]),
            e("div", ka, [
              e("button", {
                class: "btn btn-scan",
                onClick: (B) => h(r.id),
                disabled: ((_ = s.value[r.id]) == null ? void 0 : _.status) === "running" || ((g = s.value[r.id]) == null ? void 0 : g.status) === "queued"
              }, " Scan ", 8, wa),
              e("button", {
                class: "btn btn-rescan",
                onClick: (B) => f(r.id),
                disabled: ((A = s.value[r.id]) == null ? void 0 : A.status) === "running" || ((R = s.value[r.id]) == null ? void 0 : R.status) === "queued"
              }, " Rescan ", 8, Sa)
            ])
          ]);
        }), 128)),
        t.value.length === 0 ? (a(), n("div", Ca, " No libraries configured. Add a library to get started. ")) : w("", !0)
      ]))
    ]));
  }
}), qn = /* @__PURE__ */ x(Ta, [["__scopeId", "data-v-62b3805e"]]), Pa = { class: "my-servers-page" }, xa = {
  key: 0,
  class: "loading"
}, Ra = {
  key: 1,
  class: "error"
}, Ea = {
  key: 2,
  class: "servers-list"
}, Fa = { class: "server-info" }, La = { class: "server-name" }, Ia = { class: "server-url" }, Aa = { class: "server-meta" }, Ma = { key: 0 }, Ua = {
  key: 0,
  class: "empty-state"
}, Na = /* @__PURE__ */ E({
  __name: "MyServersPage",
  setup(l) {
    const t = p([]), s = p(!0), i = p(null);
    async function v() {
      try {
        const h = await U.get("/api/v1/servers");
        t.value = h.servers || [];
      } catch (h) {
        i.value = h instanceof Error ? h.message : "Failed to load servers";
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
    function y(h) {
      return h ? new Date(h).toLocaleString() : "Never";
    }
    return j(() => {
      v();
    }), (h, f) => (a(), n("div", Pa, [
      f[2] || (f[2] = e("div", { class: "page-header" }, [
        e("h1", { class: "page-title" }, "My Servers"),
        e("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      s.value ? (a(), n("div", xa, "Loading servers...")) : i.value ? (a(), n("div", Ra, d(i.value), 1)) : (a(), n("div", Ea, [
        (a(!0), n(L, null, I(t.value, (u) => (a(), n("div", {
          key: u.id,
          class: "server-card"
        }, [
          e("div", {
            class: "server-status",
            style: ee({ backgroundColor: m(u.status) })
          }, null, 4),
          e("div", Fa, [
            e("h3", La, d(u.name), 1),
            e("p", Ia, d(u.url), 1),
            e("div", Aa, [
              e("span", null, d(u.owner), 1),
              u.library_count !== void 0 ? (a(), n("span", Ma, d(u.library_count) + " libraries", 1)) : w("", !0),
              e("span", null, "Last seen: " + d(y(u.last_seen)), 1)
            ])
          ]),
          f[0] || (f[0] = e("div", { class: "server-actions" }, [
            e("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        t.value.length === 0 ? (a(), n("div", Ua, [...f[1] || (f[1] = [
          e("p", null, "No servers connected yet.", -1),
          e("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : w("", !0)
      ]))
    ]));
  }
}), Gn = /* @__PURE__ */ x(Na, [["__scopeId", "data-v-b9237da4"]]), Da = { class: "federation-page" }, Ba = {
  key: 0,
  class: "loading"
}, qa = {
  key: 1,
  class: "error"
}, Ga = {
  key: 2,
  class: "federation-content"
}, Va = { class: "peers-section" }, ja = { class: "peers-list" }, Oa = { class: "peer-info" }, Ya = { class: "peer-name" }, Ha = { class: "peer-url" }, za = { class: "peer-meta" }, Ja = { key: 0 }, Ka = { class: "peer-actions" }, Xa = ["onClick"], Wa = {
  key: 1,
  class: "status-badge"
}, Qa = {
  key: 0,
  class: "empty-state"
}, Za = { class: "add-peer-section" }, en = /* @__PURE__ */ E({
  __name: "FederationPage",
  setup(l) {
    const t = p([]), s = p(!0), i = p(null);
    async function v() {
      try {
        const u = await U.get("/api/v1/federation/peers");
        t.value = u.peers || [];
      } catch (u) {
        i.value = u instanceof Error ? u.message : "Failed to load federation peers";
      } finally {
        s.value = !1;
      }
    }
    async function m(u) {
      try {
        await U.post("/api/v1/federation/connect", { url: u }), await v();
      } catch (o) {
        i.value = o instanceof Error ? o.message : "Failed to connect to peer";
      }
    }
    async function y(u) {
      try {
        await U.post(`/api/v1/federation/peers/${u}/disconnect`), await v();
      } catch (o) {
        i.value = o instanceof Error ? o.message : "Failed to disconnect peer";
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
    function f(u) {
      return u ? new Date(u).toLocaleString() : "Never";
    }
    return j(() => {
      v();
    }), (u, o) => (a(), n("div", Da, [
      o[5] || (o[5] = e("div", { class: "page-header" }, [
        e("h1", { class: "page-title" }, "Federation"),
        e("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      s.value ? (a(), n("div", Ba, "Loading federation peers...")) : i.value ? (a(), n("div", qa, d(i.value), 1)) : (a(), n("div", Ga, [
        e("div", Va, [
          o[2] || (o[2] = e("h2", { class: "section-title" }, "Connected Peers", -1)),
          e("div", ja, [
            (a(!0), n(L, null, I(t.value, (c) => (a(), n("div", {
              key: c.id,
              class: "peer-card"
            }, [
              e("div", {
                class: "peer-status",
                style: ee({ backgroundColor: h(c.status) })
              }, null, 4),
              e("div", Oa, [
                e("h3", Ya, d(c.name), 1),
                e("p", Ha, d(c.url), 1),
                e("div", za, [
                  c.shared_libraries_count !== void 0 ? (a(), n("span", Ja, d(c.shared_libraries_count) + " shared libraries", 1)) : w("", !0),
                  e("span", null, "Last sync: " + d(f(c.last_sync)), 1)
                ])
              ]),
              e("div", Ka, [
                c.status === "connected" ? (a(), n("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (b) => y(c.id)
                }, " Disconnect ", 8, Xa)) : c.status === "pending" ? (a(), n("span", Wa, "Pending")) : w("", !0)
              ])
            ]))), 128)),
            t.value.length === 0 ? (a(), n("div", Qa, [...o[1] || (o[1] = [
              e("p", null, "No federation peers connected.", -1)
            ])])) : w("", !0)
          ])
        ]),
        e("div", Za, [
          o[4] || (o[4] = e("h2", { class: "section-title" }, "Add Peer", -1)),
          e("form", {
            class: "add-peer-form",
            onSubmit: o[0] || (o[0] = W((c) => m(""), ["prevent"]))
          }, [...o[3] || (o[3] = [
            e("input", {
              type: "url",
              placeholder: "https://other-server.example.com",
              class: "peer-input"
            }, null, -1),
            e("button", {
              type: "submit",
              class: "btn btn-primary"
            }, "Connect", -1)
          ])], 32)
        ])
      ]))
    ]));
  }
}), Vn = /* @__PURE__ */ x(en, [["__scopeId", "data-v-91ba2781"]]), tn = { class: "manage-shares-page" }, sn = {
  key: 0,
  class: "loading"
}, an = {
  key: 1,
  class: "error"
}, nn = {
  key: 2,
  class: "shares-list"
}, on = { class: "share-info" }, ln = { class: "share-library" }, rn = { class: "share-meta" }, cn = {
  key: 0,
  class: "expired-badge"
}, un = { class: "share-dates" }, dn = { key: 0 }, vn = { class: "share-actions" }, pn = ["onClick"], _n = {
  key: 0,
  class: "empty-state"
}, fn = /* @__PURE__ */ E({
  __name: "ManageSharesPage",
  setup(l) {
    const t = p([]), s = p(!0), i = p(null);
    async function v() {
      try {
        const f = await U.get("/api/v1/shares");
        t.value = f.shares || [];
      } catch (f) {
        i.value = f instanceof Error ? f.message : "Failed to load shares";
      } finally {
        s.value = !1;
      }
    }
    async function m(f) {
      try {
        await U.delete(`/api/v1/shares/${f}`), await v();
      } catch (u) {
        i.value = u instanceof Error ? u.message : "Failed to revoke share";
      }
    }
    function y(f) {
      return new Date(f).toLocaleString();
    }
    function h(f) {
      return f ? new Date(f) < /* @__PURE__ */ new Date() : !1;
    }
    return j(() => {
      v();
    }), (f, u) => (a(), n("div", tn, [
      u[1] || (u[1] = e("div", { class: "page-header" }, [
        e("h1", { class: "page-title" }, "Manage Shares"),
        e("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      s.value ? (a(), n("div", sn, "Loading shares...")) : i.value ? (a(), n("div", an, d(i.value), 1)) : (a(), n("div", nn, [
        (a(!0), n(L, null, I(t.value, (o) => (a(), n("div", {
          key: o.id,
          class: "share-card"
        }, [
          e("div", on, [
            e("h3", ln, d(o.library_name), 1),
            e("div", rn, [
              e("span", null, "Shared with: " + d(o.shared_with), 1),
              e("span", {
                class: X(["permission-badge", o.permissions])
              }, d(o.permissions), 3),
              o.expires_at && h(o.expires_at) ? (a(), n("span", cn, "Expired")) : w("", !0)
            ]),
            e("p", un, [
              Y(" Created: " + d(y(o.created_at)) + " ", 1),
              o.expires_at ? (a(), n("span", dn, " | Expires: " + d(y(o.expires_at)), 1)) : w("", !0)
            ])
          ]),
          e("div", vn, [
            e("button", {
              class: "btn btn-danger",
              onClick: (c) => m(o.id)
            }, "Revoke", 8, pn)
          ])
        ]))), 128)),
        t.value.length === 0 ? (a(), n("div", _n, [...u[0] || (u[0] = [
          e("p", null, "No library shares found.", -1)
        ])])) : w("", !0)
      ]))
    ]));
  }
}), jn = /* @__PURE__ */ x(fn, [["__scopeId", "data-v-bd8771ac"]]), gn = { class: "audit-logs-page" }, mn = {
  key: 0,
  class: "loading"
}, hn = {
  key: 1,
  class: "error"
}, yn = {
  key: 2,
  class: "logs-container"
}, bn = { class: "logs-list" }, $n = { class: "log-content" }, kn = { class: "log-header" }, wn = { class: "log-action" }, Sn = { class: "log-actor" }, Cn = { class: "log-time" }, Tn = {
  key: 0,
  class: "log-target"
}, Pn = {
  key: 1,
  class: "log-details"
}, xn = {
  key: 2,
  class: "log-ip"
}, Rn = {
  key: 0,
  class: "empty-state"
}, En = {
  key: 0,
  class: "pagination"
}, Fn = ["disabled"], Ln = { class: "page-info" }, In = ["disabled"], An = /* @__PURE__ */ E({
  __name: "AuditLogsPage",
  setup(l) {
    const t = p([]), s = p(!0), i = p(null), v = p(1), m = p(1);
    async function y(o = 1) {
      try {
        s.value = !0;
        const c = await U.get(
          "/api/v1/audit-logs",
          { page: String(o) }
        );
        t.value = c.logs || [], v.value = c.page || 1, m.value = c.total_pages || 1;
      } catch (c) {
        i.value = c instanceof Error ? c.message : "Failed to load audit logs";
      } finally {
        s.value = !1;
      }
    }
    function h(o) {
      return new Date(o).toLocaleString();
    }
    function f(o) {
      return o.includes("create") || o.includes("add") ? "#22c55e" : o.includes("delete") || o.includes("remove") ? "#ef4444" : o.includes("update") || o.includes("edit") ? "#3b82f6" : o.includes("login") || o.includes("auth") ? "#8b5cf6" : "#6b7280";
    }
    function u(o) {
      return o.includes("create") || o.includes("add") ? "+" : o.includes("delete") || o.includes("remove") ? "-" : o.includes("update") || o.includes("edit") ? "~" : o.includes("login") || o.includes("auth") ? "@" : "#";
    }
    return j(() => {
      y();
    }), (o, c) => (a(), n("div", gn, [
      c[3] || (c[3] = e("div", { class: "page-header" }, [
        e("h1", { class: "page-title" }, "Audit Logs"),
        e("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      s.value ? (a(), n("div", mn, "Loading audit logs...")) : i.value ? (a(), n("div", hn, d(i.value), 1)) : (a(), n("div", yn, [
        e("div", bn, [
          (a(!0), n(L, null, I(t.value, (b) => (a(), n("div", {
            key: b.id,
            class: "log-entry"
          }, [
            e("div", {
              class: "log-icon",
              style: ee({ backgroundColor: f(b.action) })
            }, d(u(b.action)), 5),
            e("div", $n, [
              e("div", kn, [
                e("span", wn, d(b.action), 1),
                e("span", Sn, d(b.actor), 1),
                e("span", Cn, d(h(b.created_at)), 1)
              ]),
              b.target ? (a(), n("p", Tn, "Target: " + d(b.target), 1)) : w("", !0),
              b.details ? (a(), n("p", Pn, d(b.details), 1)) : w("", !0),
              b.ip_address ? (a(), n("span", xn, "IP: " + d(b.ip_address), 1)) : w("", !0)
            ])
          ]))), 128)),
          t.value.length === 0 ? (a(), n("div", Rn, [...c[2] || (c[2] = [
            e("p", null, "No audit logs found.", -1)
          ])])) : w("", !0)
        ]),
        m.value > 1 ? (a(), n("div", En, [
          e("button", {
            class: "btn btn-secondary",
            disabled: v.value <= 1,
            onClick: c[0] || (c[0] = (b) => y(v.value - 1))
          }, " Previous ", 8, Fn),
          e("span", Ln, "Page " + d(v.value) + " of " + d(m.value), 1),
          e("button", {
            class: "btn btn-secondary",
            disabled: v.value >= m.value,
            onClick: c[1] || (c[1] = (b) => y(v.value + 1))
          }, " Next ", 8, In)
        ])) : w("", !0)
      ]))
    ]));
  }
}), On = /* @__PURE__ */ x(An, [["__scopeId", "data-v-05910fd9"]]);
export {
  te as ApiClient,
  Je as ApiError,
  qe as AppLayout,
  On as AuditLogsPage,
  Jt as BrowsePage,
  Vn as FederationPage,
  qt as FilterBar,
  qn as LibraryScanPage,
  gs as LocalStorageTokenStore,
  Cs as LoginForm,
  Rs as LoginPage,
  jn as ManageSharesPage,
  ct as MediaCard,
  ft as MediaGrid,
  Gn as MyServersPage,
  je as PhlixApp,
  us as Player,
  fs as PlayerPage,
  oa as SettingsForm,
  ia as SettingsPage,
  Gs as SignupForm,
  Ys as SignupPage,
  Bn as createPhlixApp,
  ie as useAuthStore,
  fe as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
