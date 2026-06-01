var ge = Object.defineProperty;
var _e = (a, e, s) => e in a ? ge(a, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[e] = s;
var j = (a, e, s) => _e(a, typeof e != "symbol" ? e + "" : e, s);
import { openBlock as i, createElementBlock as u, createElementVNode as t, renderSlot as O, defineComponent as P, createBlock as oe, withCtx as q, createVNode as U, unref as f, createTextVNode as G, toDisplayString as y, ref as c, computed as I, createCommentVNode as E, Fragment as A, renderList as B, withDirectives as M, vModelText as z, normalizeClass as D, inject as re, onMounted as ie, watch as ye, onUnmounted as be, withModifiers as H, normalizeStyle as ke, createStaticVNode as $e, resolveComponent as ue, vModelDynamic as ae, createApp as we } from "vue";
import { defineStore as ce, createPinia as Te } from "pinia";
import { RouterView as Se, RouterLink as le, useRoute as Ce, useRouter as de, createRouter as Re, createWebHistory as Pe } from "vue-router";
const R = (a, e) => {
  const s = a.__vccOpts || a;
  for (const [n, d] of e)
    s[n] = d;
  return s;
}, xe = {}, Ee = { class: "app-layout" }, Ue = { class: "app-header" }, Ie = { class: "header-inner" }, Fe = { class: "logo" }, Ae = { class: "nav" }, Be = { class: "app-main" }, Me = { class: "app-footer" };
function Ne(a, e) {
  return i(), u("div", Ee, [
    t("header", Ue, [
      t("div", Ie, [
        t("div", Fe, [
          O(a.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", Ae, [
          O(a.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", Be, [
      O(a.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", Me, [
      O(a.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Le = /* @__PURE__ */ R(xe, [["render", Ne], ["__scopeId", "data-v-9f6c6d16"]]), qe = { class: "main-nav" }, Ge = /* @__PURE__ */ P({
  __name: "PhlixApp",
  setup(a) {
    return (e, s) => (i(), oe(Le, null, {
      nav: q(() => [
        t("nav", qe, [
          U(f(le), {
            to: "/app",
            class: "nav-link"
          }, {
            default: q(() => [...s[0] || (s[0] = [
              G("Browse", -1)
            ])]),
            _: 1
          }),
          U(f(le), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: q(() => [...s[1] || (s[1] = [
              G("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: q(() => [
        U(f(Se))
      ]),
      _: 1
    }));
  }
}), Ve = /* @__PURE__ */ R(Ge, [["__scopeId", "data-v-35b5e7c6"]]), Oe = { class: "phlix-placeholder" }, Ye = { class: "placeholder-content" }, je = /* @__PURE__ */ P({
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
}), De = /* @__PURE__ */ R(je, [["__scopeId", "data-v-bf79ac4c"]]);
class ze extends Error {
  constructor(e, s, n = null) {
    super(e), this.status = s, this.body = n, this.name = "ApiError";
  }
}
function He(a) {
  return a === !0 || a === 1 || a === "1" || a === "true";
}
class J {
  constructor(e = {}) {
    j(this, "baseUrl");
    j(this, "tokens");
    j(this, "doFetch");
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
  async request(e, s, n = null) {
    const d = () => {
      const g = {
        "Content-Type": "application/json"
      }, b = this.tokens.getAccessToken();
      b && (g.Authorization = `Bearer ${b}`);
      const _ = { method: e, headers: g, credentials: "same-origin" };
      return n !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (_.body = JSON.stringify(n)), _;
    }, p = `${this.baseUrl}${s}`;
    let m = await this.doFetch(p, d());
    return m.status === 401 && await this.refreshToken() && (m = await this.doFetch(p, d())), this.handleResponse(m);
  }
  async handleResponse(e) {
    const d = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const p = this.extractError(d);
      throw new ze(p, e.status, d);
    }
    return d;
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
      const n = await s.json();
      return typeof n.access_token != "string" ? !1 : (this.tokens.setAccessToken(n.access_token), typeof n.refresh_token == "string" && this.tokens.setRefreshToken(n.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, s) {
    const n = s ? "?" + new URLSearchParams(s).toString() : "";
    return this.request("GET", e + n);
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
    return { ...e, is_admin: He(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
new J();
const ve = ce("media", () => {
  const a = c([]), e = c(0), s = c(!1), n = c(null), d = c(""), p = c([]), m = c(void 0), g = c(void 0), b = c([]), _ = c([]), v = c("name"), $ = c("asc"), C = c(24), o = c(0), l = I(() => o.value + a.value.length < e.value), r = I(() => {
    const h = {};
    return d.value && (h.search = d.value), p.value.length && (h.genres = p.value), m.value !== void 0 && (h.yearFrom = m.value), g.value !== void 0 && (h.yearTo = g.value), b.value.length && (h.ratings = b.value), _.value.length && (h.types = _.value), h.sort = v.value, h.order = $.value, h.limit = C.value, h.offset = o.value, h;
  }), N = I(() => {
    const h = /* @__PURE__ */ new Set();
    return a.value.forEach((T) => {
      var w;
      return (w = T.genres) == null ? void 0 : w.forEach((L) => h.add(L));
    }), Array.from(h).sort();
  }), K = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], X = ["movie", "series", "episode", "audio", "image"];
  function Q(h) {
    var L, F, ne;
    const T = new URLSearchParams(), w = r.value;
    return w.search && T.set("search", w.search), (L = w.genres) == null || L.forEach((V) => T.append("genres", V)), w.yearFrom !== void 0 && T.set("yearFrom", String(w.yearFrom)), w.yearTo !== void 0 && T.set("yearTo", String(w.yearTo)), (F = w.ratings) == null || F.forEach((V) => T.append("ratings", V)), (ne = w.types) == null || ne.forEach((V) => T.append("types", V)), w.sort && T.set("sort", w.sort), w.order && T.set("order", w.order), T.set("limit", String(w.limit)), T.set("offset", String(w.offset)), `${h}/api/v1/media?${T.toString()}`;
  }
  async function Y(h, T = !1) {
    s.value = !0, n.value = null;
    try {
      const w = new J({ baseUrl: h }), L = Q(h), F = await w.get(L);
      T ? a.value = [...a.value, ...F.items] : a.value = F.items, e.value = F.total, o.value = (F.offset ?? 0) + F.items.length;
    } catch (w) {
      n.value = w instanceof Error ? w.message : "Failed to load media";
    } finally {
      s.value = !1;
    }
  }
  async function W(h) {
    await Y(h, !0);
  }
  function S() {
    a.value = [], e.value = 0, o.value = 0, n.value = null;
  }
  function k(h) {
    d.value = h, o.value = 0;
  }
  function x(h) {
    p.value = h, o.value = 0;
  }
  function Z(h, T) {
    m.value = h, g.value = T, o.value = 0;
  }
  function fe(h) {
    b.value = h, o.value = 0;
  }
  function me(h) {
    _.value = h, o.value = 0;
  }
  function he(h, T) {
    v.value = h, T && ($.value = T), o.value = 0;
  }
  return {
    items: a,
    total: e,
    loading: s,
    error: n,
    search: d,
    selectedGenres: p,
    yearFrom: m,
    yearTo: g,
    selectedRatings: b,
    selectedTypes: _,
    sort: v,
    order: $,
    limit: C,
    offset: o,
    hasMore: l,
    queryParams: r,
    availableGenres: N,
    availableRatings: K,
    availableTypes: X,
    fetchMedia: Y,
    loadMore: W,
    reset: S,
    setSearch: k,
    setGenres: x,
    setYearRange: Z,
    setRatings: fe,
    setTypes: me,
    setSort: he
  };
}), Je = { class: "media-card" }, Ke = ["href"], Xe = { class: "card-poster" }, Qe = ["src", "alt"], We = {
  key: 1,
  class: "poster-placeholder"
}, Ze = { class: "placeholder-type" }, et = { class: "card-overlay" }, tt = {
  key: 0,
  class: "card-year"
}, st = {
  key: 1,
  class: "card-rating"
}, at = { class: "card-info" }, ot = ["title"], nt = {
  key: 0,
  class: "card-genres"
}, lt = /* @__PURE__ */ P({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(a) {
    return (e, s) => {
      var n;
      return i(), u("article", Je, [
        t("a", {
          href: a.to ?? `/app/player/${a.item.id}`,
          class: "card-link"
        }, [
          t("div", Xe, [
            a.item.poster_url ? (i(), u("img", {
              key: 0,
              src: a.item.poster_url,
              alt: a.item.name,
              loading: "lazy"
            }, null, 8, Qe)) : (i(), u("div", We, [
              s[0] || (s[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", Ze, y(a.item.type), 1)
            ]))
          ]),
          t("div", et, [
            a.item.year ? (i(), u("span", tt, y(a.item.year), 1)) : E("", !0),
            a.item.rating ? (i(), u("span", st, y(a.item.rating), 1)) : E("", !0)
          ]),
          t("div", at, [
            t("h3", {
              class: "card-title",
              title: a.item.name
            }, y(a.item.name), 9, ot),
            (n = a.item.genres) != null && n.length ? (i(), u("p", nt, y(a.item.genres.slice(0, 2).join(", ")), 1)) : E("", !0)
          ])
        ], 8, Ke)
      ]);
    };
  }
}), rt = /* @__PURE__ */ R(lt, [["__scopeId", "data-v-e60c8481"]]), it = { class: "media-grid-container" }, ut = {
  key: 0,
  class: "media-grid-skeleton"
}, ct = {
  key: 1,
  class: "media-grid-empty"
}, dt = {
  key: 2,
  class: "media-grid"
}, vt = /* @__PURE__ */ P({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(a) {
    return (e, s) => (i(), u("div", it, [
      a.loading ? (i(), u("div", ut, [
        (i(), u(A, null, B(12, (n) => t("div", {
          key: n,
          class: "skeleton-card"
        }, [...s[0] || (s[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : a.items.length === 0 ? (i(), u("div", ct, [...s[1] || (s[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (i(), u("div", dt, [
        (i(!0), u(A, null, B(a.items, (n) => (i(), oe(rt, {
          key: n.id,
          item: n
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), pt = /* @__PURE__ */ R(vt, [["__scopeId", "data-v-b7e87216"]]), ft = { class: "filter-bar" }, mt = { class: "filter-search" }, ht = { class: "filter-row" }, gt = { class: "filter-group" }, _t = ["value"], yt = ["value"], bt = ["value"], kt = { class: "filter-group" }, $t = ["value"], wt = ["value"], Tt = ["value"], St = ["value"], Ct = { class: "filter-section" }, Rt = { class: "filter-chips" }, Pt = ["onClick"], xt = { class: "filter-section" }, Et = { class: "filter-chips" }, Ut = ["onClick"], It = { class: "filter-section" }, Ft = { class: "filter-chips" }, At = ["onClick"], Bt = { class: "filter-actions" }, Mt = { class: "result-count" }, Nt = /* @__PURE__ */ P({
  __name: "FilterBar",
  setup(a) {
    const e = ve(), s = c(e.search), n = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function d() {
      e.setSearch(s.value);
    }
    function p(o) {
      const l = e.selectedGenres;
      l.includes(o) ? e.setGenres(l.filter((r) => r !== o)) : e.setGenres([...l, o]);
    }
    function m(o) {
      const l = e.selectedRatings;
      l.includes(o) ? e.setRatings(l.filter((r) => r !== o)) : e.setRatings([...l, o]);
    }
    function g(o) {
      const l = e.selectedTypes;
      l.includes(o) ? e.setTypes(l.filter((r) => r !== o)) : e.setTypes([...l, o]);
    }
    function b(o) {
      const l = o.target;
      e.setSort(l.value);
    }
    function _(o) {
      const l = o.target;
      e.order = l.value;
    }
    const v = (/* @__PURE__ */ new Date()).getFullYear(), $ = I(() => {
      const o = [];
      for (let l = v; l >= 1900; l--)
        o.push(l);
      return o;
    });
    function C() {
      s.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (o, l) => (i(), u("div", ft, [
      t("div", mt, [
        M(t("input", {
          "onUpdate:modelValue": l[0] || (l[0] = (r) => s.value = r),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: d
        }, null, 544), [
          [z, s.value]
        ])
      ]),
      t("div", ht, [
        t("div", gt, [
          l[4] || (l[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: f(e).sort,
            onChange: b
          }, [
            (i(), u(A, null, B(n, (r) => t("option", {
              key: r.value,
              value: r.value
            }, y(r.label), 9, yt)), 64))
          ], 40, _t),
          t("select", {
            class: "filter-select order-select",
            value: f(e).order,
            onChange: _
          }, [...l[3] || (l[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, bt)
        ]),
        t("div", kt, [
          l[7] || (l[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: f(e).yearFrom ?? "",
            onChange: l[1] || (l[1] = (r) => f(e).setYearRange(
              r.target.value ? Number(r.target.value) : void 0,
              f(e).yearTo
            ))
          }, [
            l[5] || (l[5] = t("option", { value: "" }, "From", -1)),
            (i(!0), u(A, null, B($.value.slice(0, 50), (r) => (i(), u("option", {
              key: r,
              value: r
            }, y(r), 9, wt))), 128))
          ], 40, $t),
          t("select", {
            class: "filter-select",
            value: f(e).yearTo ?? "",
            onChange: l[2] || (l[2] = (r) => f(e).setYearRange(
              f(e).yearFrom,
              r.target.value ? Number(r.target.value) : void 0
            ))
          }, [
            l[6] || (l[6] = t("option", { value: "" }, "To", -1)),
            (i(!0), u(A, null, B($.value.slice(0, 50), (r) => (i(), u("option", {
              key: r,
              value: r
            }, y(r), 9, St))), 128))
          ], 40, Tt)
        ])
      ]),
      t("div", Ct, [
        l[8] || (l[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", Rt, [
          (i(!0), u(A, null, B(f(e).availableGenres, (r) => (i(), u("button", {
            key: r,
            class: D(["chip", { active: f(e).selectedGenres.includes(r) }]),
            onClick: (N) => p(r)
          }, y(r), 11, Pt))), 128))
        ])
      ]),
      t("div", xt, [
        l[9] || (l[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", Et, [
          (i(!0), u(A, null, B(f(e).availableRatings, (r) => (i(), u("button", {
            key: r,
            class: D(["chip", { active: f(e).selectedRatings.includes(r) }]),
            onClick: (N) => m(r)
          }, y(r), 11, Ut))), 128))
        ])
      ]),
      t("div", It, [
        l[10] || (l[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Ft, [
          (i(!0), u(A, null, B(f(e).availableTypes, (r) => (i(), u("button", {
            key: r,
            class: D(["chip", { active: f(e).selectedTypes.includes(r) }]),
            onClick: (N) => g(r)
          }, y(r), 11, At))), 128))
        ])
      ]),
      t("div", Bt, [
        t("button", {
          class: "clear-btn",
          onClick: C
        }, "Clear filters"),
        t("span", Mt, y(f(e).total) + " result" + y(f(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Lt = /* @__PURE__ */ R(Nt, [["__scopeId", "data-v-7089ec0b"]]), qt = { class: "browse-page" }, Gt = { class: "browse-header" }, Vt = { class: "browse-toolbar-extra" }, Ot = {
  key: 0,
  class: "browse-error"
}, Yt = {
  key: 1,
  class: "load-more"
}, jt = {
  key: 2,
  class: "loading-more"
}, Dt = /* @__PURE__ */ P({
  __name: "BrowsePage",
  setup(a) {
    const e = re("apiBase") ?? I(() => ""), s = ve();
    function n() {
      s.reset(), s.fetchMedia(e.value);
    }
    ie(n), ye(e, n);
    function d() {
      s.reset(), s.fetchMedia(e.value);
    }
    function p() {
      s.loadMore(e.value);
    }
    return (m, g) => (i(), u("div", qt, [
      t("div", Gt, [
        g[0] || (g[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", Vt, [
          O(m.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      U(Lt, { onChange: d }),
      f(s).error ? (i(), u("div", Ot, [
        t("p", null, y(f(s).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: n
        }, "Retry")
      ])) : E("", !0),
      U(pt, {
        items: f(s).items,
        loading: f(s).loading && f(s).items.length === 0
      }, null, 8, ["items", "loading"]),
      f(s).hasMore && !f(s).loading ? (i(), u("div", Yt, [
        t("button", {
          class: "load-more-btn",
          onClick: p
        }, "Load more")
      ])) : E("", !0),
      f(s).loading && f(s).items.length > 0 ? (i(), u("div", jt, " Loading... ")) : E("", !0)
    ]));
  }
}), zt = /* @__PURE__ */ R(Dt, [["__scopeId", "data-v-c192afa6"]]), Ht = ["src", "poster"], Jt = { class: "controls-top" }, Kt = { class: "media-title" }, Xt = {
  key: 0,
  class: "media-year"
}, Qt = { class: "controls-center" }, Wt = { class: "controls-bottom" }, Zt = { class: "progress-track" }, es = { class: "controls-row" }, ts = { class: "time-display" }, ss = { class: "volume-control" }, as = ["value"], os = { class: "speed-control" }, ns = ["value"], ls = { class: "time-display" }, rs = /* @__PURE__ */ P({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(a) {
    const e = c(null), s = c(!1), n = c(0), d = c(0), p = c(1), m = c(!1), g = c(1), b = c(!1), _ = c(!0);
    let v = null;
    const $ = I(
      () => d.value > 0 ? n.value / d.value * 100 : 0
    );
    function C(S) {
      if (!isFinite(S) || isNaN(S)) return "0:00";
      const k = Math.floor(S / 60), x = Math.floor(S % 60);
      return `${k}:${x.toString().padStart(2, "0")}`;
    }
    function o() {
      e.value && (s.value ? e.value.pause() : e.value.play());
    }
    function l() {
      e.value && (n.value = e.value.currentTime);
    }
    function r() {
      e.value && (d.value = e.value.duration);
    }
    function N(S) {
      const x = S.currentTarget.getBoundingClientRect(), Z = (S.clientX - x.left) / x.width;
      e.value && (e.value.currentTime = Z * d.value);
    }
    function K(S) {
      const k = parseFloat(S.target.value);
      p.value = k, e.value && (e.value.volume = k), m.value = k === 0;
    }
    function X() {
      m.value = !m.value, e.value && (e.value.muted = m.value);
    }
    function Q(S) {
      g.value = S, e.value && (e.value.playbackRate = S);
    }
    function Y() {
      var k;
      const S = (k = e.value) == null ? void 0 : k.closest(".player-container");
      S && (document.fullscreenElement ? (document.exitFullscreen(), b.value = !1) : (S.requestFullscreen(), b.value = !0));
    }
    function W() {
      _.value = !0, v && clearTimeout(v), v = setTimeout(() => {
        s.value && (_.value = !1);
      }, 3e3);
    }
    return be(() => {
      v && clearTimeout(v);
    }), (S, k) => (i(), u("div", {
      class: D(["player-container", { "controls-hidden": !_.value && s.value }]),
      onMousemove: W,
      onClick: o
    }, [
      k[6] || (k[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: a.streamUrl,
        poster: a.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: k[0] || (k[0] = (x) => s.value = !0),
        onPause: k[1] || (k[1] = (x) => s.value = !1),
        onTimeupdate: l,
        onLoadedmetadata: r,
        onClick: H(o, ["stop"])
      }, null, 40, Ht),
      t("div", {
        class: "player-controls",
        onClick: k[4] || (k[4] = H(() => {
        }, ["stop"]))
      }, [
        t("div", Jt, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: k[2] || (k[2] = (x) => S.$router.back())
          }, " ← Back "),
          t("span", Kt, y(a.media.name), 1),
          a.media.year ? (i(), u("span", Xt, y(a.media.year), 1)) : E("", !0)
        ]),
        t("div", Qt, [
          t("button", {
            class: "play-btn",
            onClick: o
          }, y(s.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", Wt, [
          t("div", {
            class: "progress-bar",
            onClick: N
          }, [
            t("div", Zt, [
              t("div", {
                class: "progress-fill",
                style: ke({ width: $.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", es, [
            t("span", ts, y(C(n.value)), 1),
            t("div", ss, [
              t("button", {
                class: "ctrl-btn",
                onClick: X
              }, y(m.value || p.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: m.value ? 0 : p.value,
                class: "volume-slider",
                onInput: K
              }, null, 40, as)
            ]),
            t("div", os, [
              t("select", {
                class: "speed-select",
                value: g.value,
                onChange: k[3] || (k[3] = (x) => Q(Number(x.target.value)))
              }, [...k[5] || (k[5] = [
                $e('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, ns)
            ]),
            t("span", ls, y(C(d.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: Y
            }, y(b.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), is = /* @__PURE__ */ R(rs, [["__scopeId", "data-v-7a51063f"]]), us = { class: "player-page" }, cs = {
  key: 0,
  class: "player-loading"
}, ds = {
  key: 1,
  class: "player-error"
}, vs = /* @__PURE__ */ P({
  __name: "PlayerPage",
  setup(a) {
    const e = re("apiBase", I(() => "")), s = Ce(), n = c(null), d = c(""), p = c(!0), m = c(null);
    async function g() {
      const b = s.params.id;
      if (!b) {
        m.value = "No media ID provided", p.value = !1;
        return;
      }
      try {
        const _ = new J({ baseUrl: e.value }), [v, $] = await Promise.all([
          _.get(`/api/v1/media/${b}`),
          _.get(`/api/v1/media/${b}/playback-info`).catch(() => null)
        ]);
        n.value = v, $ != null && $.url ? d.value = $.url : d.value = `${e.value}/media/${b}/stream`;
      } catch (_) {
        m.value = _ instanceof Error ? _.message : "Failed to load media";
      } finally {
        p.value = !1;
      }
    }
    return ie(g), (b, _) => (i(), u("div", us, [
      p.value ? (i(), u("div", cs, "Loading...")) : m.value ? (i(), u("div", ds, [
        t("p", null, y(m.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: g
        }, "Retry")
      ])) : n.value ? (i(), oe(is, {
        key: 2,
        media: n.value,
        "stream-url": d.value
      }, null, 8, ["media", "stream-url"])) : E("", !0)
    ]));
  }
}), ps = /* @__PURE__ */ R(vs, [["__scopeId", "data-v-d9061b47"]]), ee = "access_token", te = "refresh_token", se = "user";
class fs {
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
const pe = ce("auth", () => {
  const a = new fs(), e = new J({ tokenStore: a }), s = c(null), n = c(!1), d = c(null), p = I(() => a.getAccessToken() !== null), m = I(() => {
    var $;
    return (($ = s.value) == null ? void 0 : $.is_admin) === !0;
  });
  async function g($, C) {
    n.value = !0, d.value = null;
    try {
      const o = await e.post("/api/v1/auth/login", { email: $, password: C });
      return a.setAccessToken(o.access_token), a.setRefreshToken(o.refresh_token), await _(), !0;
    } catch (o) {
      return d.value = o instanceof Error ? o.message : "Login failed", !1;
    } finally {
      n.value = !1;
    }
  }
  async function b($, C, o) {
    n.value = !0, d.value = null;
    try {
      const l = await e.post("/api/v1/auth/register", { email: $, username: C, password: o });
      return a.setAccessToken(l.access_token), a.setRefreshToken(l.refresh_token), await _(), !0;
    } catch (l) {
      return d.value = l instanceof Error ? l.message : "Registration failed", !1;
    } finally {
      n.value = !1;
    }
  }
  async function _() {
    if (p.value)
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
    loading: n,
    error: d,
    isLoggedIn: p,
    isAdmin: m,
    client: e,
    login: g,
    signup: b,
    fetchUser: _,
    logout: v
  };
}), ms = {
  key: 0,
  class: "form-error"
}, hs = { class: "field" }, gs = { class: "field" }, _s = { class: "password-wrapper" }, ys = ["type"], bs = ["disabled"], ks = { class: "form-footer" }, $s = /* @__PURE__ */ P({
  __name: "LoginForm",
  emits: ["success"],
  setup(a, { emit: e }) {
    const s = e, n = pe(), d = de(), p = c(""), m = c(""), g = c(!1);
    async function b() {
      await n.login(p.value, m.value) && (s("success"), d.push("/app"));
    }
    return (_, v) => {
      const $ = ue("router-link");
      return i(), u("form", {
        class: "login-form",
        onSubmit: H(b, ["prevent"])
      }, [
        v[7] || (v[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        f(n).error ? (i(), u("div", ms, y(f(n).error), 1)) : E("", !0),
        t("div", hs, [
          v[3] || (v[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          M(t("input", {
            id: "email",
            "onUpdate:modelValue": v[0] || (v[0] = (C) => p.value = C),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [z, p.value]
          ])
        ]),
        t("div", gs, [
          v[4] || (v[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", _s, [
            M(t("input", {
              id: "password",
              "onUpdate:modelValue": v[1] || (v[1] = (C) => m.value = C),
              type: g.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, ys), [
              [ae, m.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: v[2] || (v[2] = (C) => g.value = !g.value)
            }, y(g.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: f(n).loading
        }, y(f(n).loading ? "Signing in..." : "Sign in"), 9, bs),
        t("p", ks, [
          v[6] || (v[6] = G(" Don't have an account? ", -1)),
          U($, {
            to: "/app/signup",
            class: "link"
          }, {
            default: q(() => [...v[5] || (v[5] = [
              G("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), ws = /* @__PURE__ */ R($s, [["__scopeId", "data-v-22bc5576"]]), Ts = { class: "auth-page" }, Ss = { class: "auth-card" }, Cs = /* @__PURE__ */ P({
  __name: "LoginPage",
  setup(a) {
    return (e, s) => (i(), u("div", Ts, [
      t("div", Ss, [
        U(ws, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Rs = /* @__PURE__ */ R(Cs, [["__scopeId", "data-v-9c53ce6a"]]), Ps = {
  key: 0,
  class: "form-error"
}, xs = { class: "field" }, Es = { class: "field" }, Us = { class: "field" }, Is = { class: "password-wrapper" }, Fs = ["type"], As = { class: "field" }, Bs = ["type"], Ms = ["disabled"], Ns = { class: "form-footer" }, Ls = /* @__PURE__ */ P({
  __name: "SignupForm",
  emits: ["success"],
  setup(a, { emit: e }) {
    const s = e, n = pe(), d = de(), p = c(""), m = c(""), g = c(""), b = c(""), _ = c(!1), v = c(null);
    async function $() {
      if (v.value = null, g.value.length < 8) {
        v.value = "Password must be at least 8 characters.";
        return;
      }
      if (g.value !== b.value) {
        v.value = "Passwords do not match.";
        return;
      }
      await n.signup(p.value, m.value, g.value) && (s("success"), d.push("/app"));
    }
    return (C, o) => {
      const l = ue("router-link");
      return i(), u("form", {
        class: "signup-form",
        onSubmit: H($, ["prevent"])
      }, [
        o[11] || (o[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        f(n).error || v.value ? (i(), u("div", Ps, y(f(n).error || v.value), 1)) : E("", !0),
        t("div", xs, [
          o[5] || (o[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          M(t("input", {
            id: "email",
            "onUpdate:modelValue": o[0] || (o[0] = (r) => p.value = r),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [z, p.value]
          ])
        ]),
        t("div", Es, [
          o[6] || (o[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          M(t("input", {
            id: "username",
            "onUpdate:modelValue": o[1] || (o[1] = (r) => m.value = r),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [z, m.value]
          ])
        ]),
        t("div", Us, [
          o[7] || (o[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Is, [
            M(t("input", {
              id: "password",
              "onUpdate:modelValue": o[2] || (o[2] = (r) => g.value = r),
              type: _.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, Fs), [
              [ae, g.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: o[3] || (o[3] = (r) => _.value = !_.value)
            }, y(_.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", As, [
          o[8] || (o[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          M(t("input", {
            id: "confirm",
            "onUpdate:modelValue": o[4] || (o[4] = (r) => b.value = r),
            type: _.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Bs), [
            [ae, b.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: f(n).loading
        }, y(f(n).loading ? "Creating account..." : "Create account"), 9, Ms),
        t("p", Ns, [
          o[10] || (o[10] = G(" Already have an account? ", -1)),
          U(l, {
            to: "/app/login",
            class: "link"
          }, {
            default: q(() => [...o[9] || (o[9] = [
              G("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), qs = /* @__PURE__ */ R(Ls, [["__scopeId", "data-v-d5e42c72"]]), Gs = { class: "auth-page" }, Vs = { class: "auth-card" }, Os = /* @__PURE__ */ P({
  __name: "SignupPage",
  setup(a) {
    return (e, s) => (i(), u("div", Gs, [
      t("div", Vs, [
        U(qs, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Ys = /* @__PURE__ */ R(Os, [["__scopeId", "data-v-609331e4"]]);
function js() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function Ds(a) {
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
      component: ps
    },
    {
      path: `${e}/login`,
      name: "login",
      component: Rs
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Ys
    }
  ];
  return a.extraRoutes && s.push(...a.extraRoutes), s.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: De,
    props: { appName: a.app }
  }), s;
}
function Xs(a) {
  const e = {
    ...js(),
    ...a
  }, s = Te(), n = e.routerBase || "/app", d = Re({
    history: Pe(n),
    routes: Ds(e)
  }), p = we(Ve);
  return p.provide("apiBase", e.apiBase), p.use(s), p.use(d), p;
}
export {
  J as ApiClient,
  ze as ApiError,
  Le as AppLayout,
  zt as BrowsePage,
  Lt as FilterBar,
  fs as LocalStorageTokenStore,
  ws as LoginForm,
  Rs as LoginPage,
  rt as MediaCard,
  pt as MediaGrid,
  Ve as PhlixApp,
  is as Player,
  ps as PlayerPage,
  qs as SignupForm,
  Ys as SignupPage,
  Xs as createPhlixApp,
  pe as useAuthStore,
  ve as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
