var we = Object.defineProperty;
var ye = (o, e, r) => e in o ? we(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r;
var ee = (o, e, r) => ye(o, typeof e != "symbol" ? e + "" : e, r);
import { openBlock as n, createElementBlock as s, createElementVNode as t, renderSlot as W, defineComponent as B, createBlock as ne, withCtx as J, createVNode as N, unref as $, createTextVNode as O, toDisplayString as d, ref as m, computed as E, createCommentVNode as x, Fragment as R, renderList as L, withDirectives as H, vModelText as te, normalizeClass as X, inject as ce, onMounted as q, watch as $e, onUnmounted as be, withModifiers as Q, normalizeStyle as Z, createStaticVNode as xe, resolveComponent as he, vModelDynamic as le, vShow as Ce, createApp as Me, markRaw as w, resolveDynamicComponent as Se } from "vue";
import { defineStore as pe, createPinia as Ie } from "pinia";
import { RouterView as Be, RouterLink as ve, useRoute as Te, useRouter as me, createRouter as Pe, createWebHistory as je } from "vue-router";
const T = (o, e) => {
  const r = o.__vccOpts || o;
  for (const [i, v] of e)
    r[i] = v;
  return r;
}, Re = {}, Le = { class: "app-layout" }, Ee = { class: "app-header" }, Ae = { class: "header-inner" }, Fe = { class: "logo" }, Ue = { class: "nav" }, Ne = { class: "app-main" }, De = { class: "app-footer" };
function ze(o, e) {
  return n(), s("div", Le, [
    t("header", Ee, [
      t("div", Ae, [
        t("div", Fe, [
          W(o.$slots, "logo", {}, () => [
            e[0] || (e[0] = t("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        t("nav", Ue, [
          W(o.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    t("main", Ne, [
      W(o.$slots, "default", {}, void 0, !0)
    ]),
    t("footer", De, [
      W(o.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const Ve = /* @__PURE__ */ T(Re, [["render", ze], ["__scopeId", "data-v-9f6c6d16"]]), He = { class: "main-nav" }, qe = /* @__PURE__ */ B({
  __name: "PhlixApp",
  setup(o) {
    return (e, r) => (n(), ne(Ve, null, {
      nav: J(() => [
        t("nav", He, [
          N($(ve), {
            to: "/app",
            class: "nav-link"
          }, {
            default: J(() => [...r[0] || (r[0] = [
              O("Browse", -1)
            ])]),
            _: 1
          }),
          N($(ve), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: J(() => [...r[1] || (r[1] = [
              O("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: J(() => [
        N($(Be))
      ]),
      _: 1
    }));
  }
}), Ge = /* @__PURE__ */ T(qe, [["__scopeId", "data-v-35b5e7c6"]]), Oe = { class: "phlix-placeholder" }, Ye = { class: "placeholder-content" }, Je = /* @__PURE__ */ B({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(o) {
    return (e, r) => (n(), s("div", Oe, [
      t("div", Ye, [
        r[0] || (r[0] = t("h1", null, "Shared UI loading...", -1)),
        t("p", null, "Phlix " + d(o.appName) + " is initializing", 1)
      ])
    ]));
  }
}), Ke = /* @__PURE__ */ T(Je, [["__scopeId", "data-v-bf79ac4c"]]);
class We extends Error {
  constructor(e, r, i = null) {
    super(e), this.status = r, this.body = i, this.name = "ApiError";
  }
}
function Xe(o) {
  return o === !0 || o === 1 || o === "1" || o === "true";
}
class se {
  constructor(e = {}) {
    ee(this, "baseUrl");
    ee(this, "tokens");
    ee(this, "doFetch");
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
    const v = () => {
      const _ = {
        "Content-Type": "application/json"
      }, f = this.tokens.getAccessToken();
      f && (_.Authorization = `Bearer ${f}`);
      const u = { method: e, headers: _, credentials: "same-origin" };
      return i !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (u.body = JSON.stringify(i)), u;
    }, g = `${this.baseUrl}${r}`;
    let k = await this.doFetch(g, v());
    return k.status === 401 && await this.refreshToken() && (k = await this.doFetch(g, v())), this.handleResponse(k);
  }
  async handleResponse(e) {
    const v = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const g = this.extractError(v);
      throw new We(g, e.status, v);
    }
    return v;
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
    return { ...e, is_admin: Xe(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
const U = new se(), ge = pe("media", () => {
  const o = m([]), e = m(0), r = m(!1), i = m(null), v = m(""), g = m([]), k = m(void 0), _ = m(void 0), f = m([]), u = m([]), a = m("name"), c = m("asc"), y = m(24), l = m(0), p = E(() => l.value + o.value.length < e.value), h = E(() => {
    const b = {};
    return v.value && (b.search = v.value), g.value.length && (b.genres = g.value), k.value !== void 0 && (b.yearFrom = k.value), _.value !== void 0 && (b.yearTo = _.value), f.value.length && (b.ratings = f.value), u.value.length && (b.types = u.value), b.sort = a.value, b.order = c.value, b.limit = y.value, b.offset = l.value, b;
  }), A = E(() => {
    const b = /* @__PURE__ */ new Set();
    return o.value.forEach((I) => {
      var S;
      return (S = I.genres) == null ? void 0 : S.forEach((Y) => b.add(Y));
    }), Array.from(b).sort();
  }), P = ["G", "PG", "PG-13", "R", "NC-17", "X", "UNRATED"], D = ["movie", "series", "episode", "audio", "image"];
  function G(b) {
    var Y, V, de;
    const I = new URLSearchParams(), S = h.value;
    return S.search && I.set("search", S.search), (Y = S.genres) == null || Y.forEach((K) => I.append("genres", K)), S.yearFrom !== void 0 && I.set("yearFrom", String(S.yearFrom)), S.yearTo !== void 0 && I.set("yearTo", String(S.yearTo)), (V = S.ratings) == null || V.forEach((K) => I.append("ratings", K)), (de = S.types) == null || de.forEach((K) => I.append("types", K)), S.sort && I.set("sort", S.sort), S.order && I.set("order", S.order), I.set("limit", String(S.limit)), I.set("offset", String(S.offset)), `${b}/api/v1/media?${I.toString()}`;
  }
  async function z(b, I = !1) {
    r.value = !0, i.value = null;
    try {
      const S = new se({ baseUrl: b }), Y = G(b), V = await S.get(Y);
      I ? o.value = [...o.value, ...V.items] : o.value = V.items, e.value = V.total, l.value = (V.offset ?? 0) + V.items.length;
    } catch (S) {
      i.value = S instanceof Error ? S.message : "Failed to load media";
    } finally {
      r.value = !1;
    }
  }
  async function j(b) {
    await z(b, !0);
  }
  function M() {
    o.value = [], e.value = 0, l.value = 0, i.value = null;
  }
  function C(b) {
    v.value = b, l.value = 0;
  }
  function F(b) {
    g.value = b, l.value = 0;
  }
  function oe(b, I) {
    k.value = b, _.value = I, l.value = 0;
  }
  function fe(b) {
    f.value = b, l.value = 0;
  }
  function _e(b) {
    u.value = b, l.value = 0;
  }
  function ke(b, I) {
    a.value = b, I && (c.value = I), l.value = 0;
  }
  return {
    items: o,
    total: e,
    loading: r,
    error: i,
    search: v,
    selectedGenres: g,
    yearFrom: k,
    yearTo: _,
    selectedRatings: f,
    selectedTypes: u,
    sort: a,
    order: c,
    limit: y,
    offset: l,
    hasMore: p,
    queryParams: h,
    availableGenres: A,
    availableRatings: P,
    availableTypes: D,
    fetchMedia: z,
    loadMore: j,
    reset: M,
    setSearch: C,
    setGenres: F,
    setYearRange: oe,
    setRatings: fe,
    setTypes: _e,
    setSort: ke
  };
}), Qe = { class: "media-card" }, Ze = ["href"], et = { class: "card-poster" }, tt = ["src", "alt"], nt = {
  key: 1,
  class: "poster-placeholder"
}, st = { class: "placeholder-type" }, ot = { class: "card-overlay" }, rt = {
  key: 0,
  class: "card-year"
}, at = {
  key: 1,
  class: "card-rating"
}, it = { class: "card-info" }, lt = ["title"], ct = {
  key: 0,
  class: "card-genres"
}, ut = /* @__PURE__ */ B({
  __name: "MediaCard",
  props: {
    item: {},
    to: {}
  },
  setup(o) {
    return (e, r) => {
      var i;
      return n(), s("article", Qe, [
        t("a", {
          href: o.to ?? `/app/player/${o.item.id}`,
          class: "card-link"
        }, [
          t("div", et, [
            o.item.poster_url ? (n(), s("img", {
              key: 0,
              src: o.item.poster_url,
              alt: o.item.name,
              loading: "lazy"
            }, null, 8, tt)) : (n(), s("div", nt, [
              r[0] || (r[0] = t("span", { class: "placeholder-icon" }, "🎬", -1)),
              t("span", st, d(o.item.type), 1)
            ]))
          ]),
          t("div", ot, [
            o.item.year ? (n(), s("span", rt, d(o.item.year), 1)) : x("", !0),
            o.item.rating ? (n(), s("span", at, d(o.item.rating), 1)) : x("", !0)
          ]),
          t("div", it, [
            t("h3", {
              class: "card-title",
              title: o.item.name
            }, d(o.item.name), 9, lt),
            (i = o.item.genres) != null && i.length ? (n(), s("p", ct, d(o.item.genres.slice(0, 2).join(", ")), 1)) : x("", !0)
          ])
        ], 8, Ze)
      ]);
    };
  }
}), dt = /* @__PURE__ */ T(ut, [["__scopeId", "data-v-e60c8481"]]), vt = { class: "media-grid-container" }, ht = {
  key: 0,
  class: "media-grid-skeleton"
}, pt = {
  key: 1,
  class: "media-grid-empty"
}, mt = {
  key: 2,
  class: "media-grid"
}, gt = /* @__PURE__ */ B({
  __name: "MediaGrid",
  props: {
    items: {},
    loading: { type: Boolean }
  },
  setup(o) {
    return (e, r) => (n(), s("div", vt, [
      o.loading ? (n(), s("div", ht, [
        (n(), s(R, null, L(12, (i) => t("div", {
          key: i,
          class: "skeleton-card"
        }, [...r[0] || (r[0] = [
          t("div", { class: "skeleton-poster" }, null, -1),
          t("div", { class: "skeleton-title" }, null, -1)
        ])])), 64))
      ])) : o.items.length === 0 ? (n(), s("div", pt, [...r[1] || (r[1] = [
        t("p", null, "No media found.", -1),
        t("p", { class: "empty-hint" }, "Try adjusting your filters.", -1)
      ])])) : (n(), s("div", mt, [
        (n(!0), s(R, null, L(o.items, (i) => (n(), ne(dt, {
          key: i.id,
          item: i
        }, null, 8, ["item"]))), 128))
      ]))
    ]));
  }
}), ft = /* @__PURE__ */ T(gt, [["__scopeId", "data-v-b7e87216"]]), _t = { class: "filter-bar" }, kt = { class: "filter-search" }, wt = { class: "filter-row" }, yt = { class: "filter-group" }, $t = ["value"], bt = ["value"], xt = ["value"], Ct = { class: "filter-group" }, Mt = ["value"], St = ["value"], It = ["value"], Bt = ["value"], Tt = { class: "filter-section" }, Pt = { class: "filter-chips" }, jt = ["onClick"], Rt = { class: "filter-section" }, Lt = { class: "filter-chips" }, Et = ["onClick"], At = { class: "filter-section" }, Ft = { class: "filter-chips" }, Ut = ["onClick"], Nt = { class: "filter-actions" }, Dt = { class: "result-count" }, zt = /* @__PURE__ */ B({
  __name: "FilterBar",
  setup(o) {
    const e = ge(), r = m(e.search), i = [
      { value: "name", label: "Name" },
      { value: "year", label: "Year" },
      { value: "rating", label: "Rating" },
      { value: "date_added", label: "Date Added" },
      { value: "runtime", label: "Runtime" }
    ];
    function v() {
      e.setSearch(r.value);
    }
    function g(l) {
      const p = e.selectedGenres;
      p.includes(l) ? e.setGenres(p.filter((h) => h !== l)) : e.setGenres([...p, l]);
    }
    function k(l) {
      const p = e.selectedRatings;
      p.includes(l) ? e.setRatings(p.filter((h) => h !== l)) : e.setRatings([...p, l]);
    }
    function _(l) {
      const p = e.selectedTypes;
      p.includes(l) ? e.setTypes(p.filter((h) => h !== l)) : e.setTypes([...p, l]);
    }
    function f(l) {
      const p = l.target;
      e.setSort(p.value);
    }
    function u(l) {
      const p = l.target;
      e.order = p.value;
    }
    const a = (/* @__PURE__ */ new Date()).getFullYear(), c = E(() => {
      const l = [];
      for (let p = a; p >= 1900; p--)
        l.push(p);
      return l;
    });
    function y() {
      r.value = "", e.search = "", e.setGenres([]), e.setYearRange(void 0, void 0), e.setRatings([]), e.setTypes([]), e.setSort("name");
    }
    return (l, p) => (n(), s("div", _t, [
      t("div", kt, [
        H(t("input", {
          "onUpdate:modelValue": p[0] || (p[0] = (h) => r.value = h),
          type: "search",
          placeholder: "Search media...",
          class: "search-input",
          onInput: v
        }, null, 544), [
          [te, r.value]
        ])
      ]),
      t("div", wt, [
        t("div", yt, [
          p[4] || (p[4] = t("label", { class: "filter-label" }, "Sort", -1)),
          t("select", {
            class: "filter-select",
            value: $(e).sort,
            onChange: f
          }, [
            (n(), s(R, null, L(i, (h) => t("option", {
              key: h.value,
              value: h.value
            }, d(h.label), 9, bt)), 64))
          ], 40, $t),
          t("select", {
            class: "filter-select order-select",
            value: $(e).order,
            onChange: u
          }, [...p[3] || (p[3] = [
            t("option", { value: "asc" }, "↑", -1),
            t("option", { value: "desc" }, "↓", -1)
          ])], 40, xt)
        ]),
        t("div", Ct, [
          p[7] || (p[7] = t("label", { class: "filter-label" }, "Year", -1)),
          t("select", {
            class: "filter-select",
            value: $(e).yearFrom ?? "",
            onChange: p[1] || (p[1] = (h) => $(e).setYearRange(
              h.target.value ? Number(h.target.value) : void 0,
              $(e).yearTo
            ))
          }, [
            p[5] || (p[5] = t("option", { value: "" }, "From", -1)),
            (n(!0), s(R, null, L(c.value.slice(0, 50), (h) => (n(), s("option", {
              key: h,
              value: h
            }, d(h), 9, St))), 128))
          ], 40, Mt),
          t("select", {
            class: "filter-select",
            value: $(e).yearTo ?? "",
            onChange: p[2] || (p[2] = (h) => $(e).setYearRange(
              $(e).yearFrom,
              h.target.value ? Number(h.target.value) : void 0
            ))
          }, [
            p[6] || (p[6] = t("option", { value: "" }, "To", -1)),
            (n(!0), s(R, null, L(c.value.slice(0, 50), (h) => (n(), s("option", {
              key: h,
              value: h
            }, d(h), 9, Bt))), 128))
          ], 40, It)
        ])
      ]),
      t("div", Tt, [
        p[8] || (p[8] = t("span", { class: "filter-label" }, "Genres", -1)),
        t("div", Pt, [
          (n(!0), s(R, null, L($(e).availableGenres, (h) => (n(), s("button", {
            key: h,
            class: X(["chip", { active: $(e).selectedGenres.includes(h) }]),
            onClick: (A) => g(h)
          }, d(h), 11, jt))), 128))
        ])
      ]),
      t("div", Rt, [
        p[9] || (p[9] = t("span", { class: "filter-label" }, "Rating", -1)),
        t("div", Lt, [
          (n(!0), s(R, null, L($(e).availableRatings, (h) => (n(), s("button", {
            key: h,
            class: X(["chip", { active: $(e).selectedRatings.includes(h) }]),
            onClick: (A) => k(h)
          }, d(h), 11, Et))), 128))
        ])
      ]),
      t("div", At, [
        p[10] || (p[10] = t("span", { class: "filter-label" }, "Type", -1)),
        t("div", Ft, [
          (n(!0), s(R, null, L($(e).availableTypes, (h) => (n(), s("button", {
            key: h,
            class: X(["chip", { active: $(e).selectedTypes.includes(h) }]),
            onClick: (A) => _(h)
          }, d(h), 11, Ut))), 128))
        ])
      ]),
      t("div", Nt, [
        t("button", {
          class: "clear-btn",
          onClick: y
        }, "Clear filters"),
        t("span", Dt, d($(e).total) + " result" + d($(e).total !== 1 ? "s" : ""), 1)
      ])
    ]));
  }
}), Vt = /* @__PURE__ */ T(zt, [["__scopeId", "data-v-7089ec0b"]]), Ht = { class: "browse-page" }, qt = { class: "browse-header" }, Gt = { class: "browse-toolbar-extra" }, Ot = {
  key: 0,
  class: "browse-error"
}, Yt = {
  key: 1,
  class: "load-more"
}, Jt = {
  key: 2,
  class: "loading-more"
}, Kt = /* @__PURE__ */ B({
  __name: "BrowsePage",
  setup(o) {
    const e = ce("apiBase") ?? E(() => ""), r = ge();
    function i() {
      r.reset(), r.fetchMedia(e.value);
    }
    q(i), $e(e, i);
    function v() {
      r.reset(), r.fetchMedia(e.value);
    }
    function g() {
      r.loadMore(e.value);
    }
    return (k, _) => (n(), s("div", Ht, [
      t("div", qt, [
        _[0] || (_[0] = t("h1", { class: "browse-title" }, "Browse Media", -1)),
        t("div", Gt, [
          W(k.$slots, "toolbar-extra", {}, void 0, !0)
        ])
      ]),
      N(Vt, { onChange: v }),
      $(r).error ? (n(), s("div", Ot, [
        t("p", null, d($(r).error), 1),
        t("button", {
          class: "retry-btn",
          onClick: i
        }, "Retry")
      ])) : x("", !0),
      N(ft, {
        items: $(r).items,
        loading: $(r).loading && $(r).items.length === 0
      }, null, 8, ["items", "loading"]),
      $(r).hasMore && !$(r).loading ? (n(), s("div", Yt, [
        t("button", {
          class: "load-more-btn",
          onClick: g
        }, "Load more")
      ])) : x("", !0),
      $(r).loading && $(r).items.length > 0 ? (n(), s("div", Jt, " Loading... ")) : x("", !0)
    ]));
  }
}), Wt = /* @__PURE__ */ T(Kt, [["__scopeId", "data-v-c192afa6"]]), Xt = ["src", "poster"], Qt = { class: "controls-top" }, Zt = { class: "media-title" }, en = {
  key: 0,
  class: "media-year"
}, tn = { class: "controls-center" }, nn = { class: "controls-bottom" }, sn = { class: "progress-track" }, on = { class: "controls-row" }, rn = { class: "time-display" }, an = { class: "volume-control" }, ln = ["value"], cn = { class: "speed-control" }, un = ["value"], dn = { class: "time-display" }, vn = /* @__PURE__ */ B({
  __name: "Player",
  props: {
    media: {},
    streamUrl: {}
  },
  setup(o) {
    const e = m(null), r = m(!1), i = m(0), v = m(0), g = m(1), k = m(!1), _ = m(1), f = m(!1), u = m(!0);
    let a = null;
    const c = E(
      () => v.value > 0 ? i.value / v.value * 100 : 0
    );
    function y(M) {
      if (!isFinite(M) || isNaN(M)) return "0:00";
      const C = Math.floor(M / 60), F = Math.floor(M % 60);
      return `${C}:${F.toString().padStart(2, "0")}`;
    }
    function l() {
      e.value && (r.value ? e.value.pause() : e.value.play());
    }
    function p() {
      e.value && (i.value = e.value.currentTime);
    }
    function h() {
      e.value && (v.value = e.value.duration);
    }
    function A(M) {
      const F = M.currentTarget.getBoundingClientRect(), oe = (M.clientX - F.left) / F.width;
      e.value && (e.value.currentTime = oe * v.value);
    }
    function P(M) {
      const C = parseFloat(M.target.value);
      g.value = C, e.value && (e.value.volume = C), k.value = C === 0;
    }
    function D() {
      k.value = !k.value, e.value && (e.value.muted = k.value);
    }
    function G(M) {
      _.value = M, e.value && (e.value.playbackRate = M);
    }
    function z() {
      var C;
      const M = (C = e.value) == null ? void 0 : C.closest(".player-container");
      M && (document.fullscreenElement ? (document.exitFullscreen(), f.value = !1) : (M.requestFullscreen(), f.value = !0));
    }
    function j() {
      u.value = !0, a && clearTimeout(a), a = setTimeout(() => {
        r.value && (u.value = !1);
      }, 3e3);
    }
    return be(() => {
      a && clearTimeout(a);
    }), (M, C) => (n(), s("div", {
      class: X(["player-container", { "controls-hidden": !u.value && r.value }]),
      onMousemove: j,
      onClick: l
    }, [
      C[6] || (C[6] = t("div", { class: "player-overlay" }, null, -1)),
      t("video", {
        ref_key: "videoRef",
        ref: e,
        class: "player-video",
        src: o.streamUrl,
        poster: o.media.poster_url ?? void 0,
        preload: "metadata",
        onPlay: C[0] || (C[0] = (F) => r.value = !0),
        onPause: C[1] || (C[1] = (F) => r.value = !1),
        onTimeupdate: p,
        onLoadedmetadata: h,
        onClick: Q(l, ["stop"])
      }, null, 40, Xt),
      t("div", {
        class: "player-controls",
        onClick: C[4] || (C[4] = Q(() => {
        }, ["stop"]))
      }, [
        t("div", Qt, [
          t("button", {
            class: "ctrl-btn back-btn",
            onClick: C[2] || (C[2] = (F) => M.$router.back())
          }, " ← Back "),
          t("span", Zt, d(o.media.name), 1),
          o.media.year ? (n(), s("span", en, d(o.media.year), 1)) : x("", !0)
        ]),
        t("div", tn, [
          t("button", {
            class: "play-btn",
            onClick: l
          }, d(r.value ? "❚❚" : "▶"), 1)
        ]),
        t("div", nn, [
          t("div", {
            class: "progress-bar",
            onClick: A
          }, [
            t("div", sn, [
              t("div", {
                class: "progress-fill",
                style: Z({ width: c.value + "%" })
              }, null, 4)
            ])
          ]),
          t("div", on, [
            t("span", rn, d(y(i.value)), 1),
            t("div", an, [
              t("button", {
                class: "ctrl-btn",
                onClick: D
              }, d(k.value || g.value === 0 ? "🔇" : "🔊"), 1),
              t("input", {
                type: "range",
                min: "0",
                max: "1",
                step: "0.05",
                value: k.value ? 0 : g.value,
                class: "volume-slider",
                onInput: P
              }, null, 40, ln)
            ]),
            t("div", cn, [
              t("select", {
                class: "speed-select",
                value: _.value,
                onChange: C[3] || (C[3] = (F) => G(Number(F.target.value)))
              }, [...C[5] || (C[5] = [
                xe('<option value="0.5" data-v-7a51063f>0.5×</option><option value="0.75" data-v-7a51063f>0.75×</option><option value="1" data-v-7a51063f>1×</option><option value="1.25" data-v-7a51063f>1.25×</option><option value="1.5" data-v-7a51063f>1.5×</option><option value="2" data-v-7a51063f>2×</option>', 6)
              ])], 40, un)
            ]),
            t("span", dn, d(y(v.value)), 1),
            t("button", {
              class: "ctrl-btn",
              onClick: z
            }, d(f.value ? "⤓" : "⤢"), 1)
          ])
        ])
      ])
    ], 34));
  }
}), hn = /* @__PURE__ */ T(vn, [["__scopeId", "data-v-7a51063f"]]), pn = { class: "player-page" }, mn = {
  key: 0,
  class: "player-loading"
}, gn = {
  key: 1,
  class: "player-error"
}, fn = /* @__PURE__ */ B({
  __name: "PlayerPage",
  setup(o) {
    const e = ce("apiBase", E(() => "")), r = Te(), i = m(null), v = m(""), g = m(!0), k = m(null);
    async function _() {
      const f = r.params.id;
      if (!f) {
        k.value = "No media ID provided", g.value = !1;
        return;
      }
      try {
        const u = new se({ baseUrl: e.value }), [a, c] = await Promise.all([
          u.get(`/api/v1/media/${f}`),
          u.get(`/api/v1/media/${f}/playback-info`).catch(() => null)
        ]);
        i.value = a, c != null && c.url ? v.value = c.url : v.value = `${e.value}/media/${f}/stream`;
      } catch (u) {
        k.value = u instanceof Error ? u.message : "Failed to load media";
      } finally {
        g.value = !1;
      }
    }
    return q(_), (f, u) => (n(), s("div", pn, [
      g.value ? (n(), s("div", mn, "Loading...")) : k.value ? (n(), s("div", gn, [
        t("p", null, d(k.value), 1),
        t("button", {
          class: "retry-btn",
          onClick: _
        }, "Retry")
      ])) : i.value ? (n(), ne(hn, {
        key: 2,
        media: i.value,
        "stream-url": v.value
      }, null, 8, ["media", "stream-url"])) : x("", !0)
    ]));
  }
}), _n = /* @__PURE__ */ T(fn, [["__scopeId", "data-v-d9061b47"]]), re = "access_token", ae = "refresh_token", ie = "user";
class kn {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(re);
  }
  setAccessToken(e) {
    this.storage.setItem(re, e);
  }
  getRefreshToken() {
    return this.storage.getItem(ae);
  }
  setRefreshToken(e) {
    this.storage.setItem(ae, e);
  }
  getUser() {
    const e = this.storage.getItem(ie);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(ie, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(re), this.storage.removeItem(ae), this.storage.removeItem(ie);
  }
}
const ue = pe("auth", () => {
  const o = new kn(), e = ce("apiBase", ""), r = new se({ tokenStore: o, baseUrl: e }), i = m(null), v = m(!1), g = m(null), k = E(() => o.getAccessToken() !== null), _ = E(() => {
    var y;
    return ((y = i.value) == null ? void 0 : y.is_admin) === !0;
  });
  async function f(y, l) {
    v.value = !0, g.value = null;
    try {
      const p = await r.post("/api/v1/auth/login", { email: y, password: l });
      return o.setAccessToken(p.access_token), o.setRefreshToken(p.refresh_token), await a(), !0;
    } catch (p) {
      return g.value = p instanceof Error ? p.message : "Login failed", !1;
    } finally {
      v.value = !1;
    }
  }
  async function u(y, l, p) {
    v.value = !0, g.value = null;
    try {
      const h = await r.post("/api/v1/auth/register", { email: y, username: l, password: p });
      return o.setAccessToken(h.access_token), o.setRefreshToken(h.refresh_token), await a(), !0;
    } catch (h) {
      return g.value = h instanceof Error ? h.message : "Registration failed", !1;
    } finally {
      v.value = !1;
    }
  }
  async function a() {
    if (k.value)
      try {
        i.value = await r.getCurrentUser();
      } catch {
        i.value = null, o.clear();
      }
  }
  function c() {
    o.clear(), i.value = null;
  }
  return {
    user: i,
    loading: v,
    error: g,
    isLoggedIn: k,
    isAdmin: _,
    client: r,
    login: f,
    signup: u,
    fetchUser: a,
    logout: c
  };
}), wn = {
  key: 0,
  class: "form-error"
}, yn = { class: "field" }, $n = { class: "field" }, bn = { class: "password-wrapper" }, xn = ["type"], Cn = ["disabled"], Mn = { class: "form-footer" }, Sn = /* @__PURE__ */ B({
  __name: "LoginForm",
  emits: ["success"],
  setup(o, { emit: e }) {
    const r = e, i = ue(), v = me(), g = m(""), k = m(""), _ = m(!1);
    async function f() {
      await i.login(g.value, k.value) && (r("success"), v.push("/app"));
    }
    return (u, a) => {
      const c = he("router-link");
      return n(), s("form", {
        class: "login-form",
        onSubmit: Q(f, ["prevent"])
      }, [
        a[7] || (a[7] = t("h2", { class: "form-title" }, "Sign in to Phlix", -1)),
        $(i).error ? (n(), s("div", wn, d($(i).error), 1)) : x("", !0),
        t("div", yn, [
          a[3] || (a[3] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          H(t("input", {
            id: "email",
            "onUpdate:modelValue": a[0] || (a[0] = (y) => g.value = y),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [te, g.value]
          ])
        ]),
        t("div", $n, [
          a[4] || (a[4] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", bn, [
            H(t("input", {
              id: "password",
              "onUpdate:modelValue": a[1] || (a[1] = (y) => k.value = y),
              type: _.value ? "text" : "password",
              class: "input",
              placeholder: "Your password",
              required: "",
              autocomplete: "current-password"
            }, null, 8, xn), [
              [le, k.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: a[2] || (a[2] = (y) => _.value = !_.value)
            }, d(_.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: $(i).loading
        }, d($(i).loading ? "Signing in..." : "Sign in"), 9, Cn),
        t("p", Mn, [
          a[6] || (a[6] = O(" Don't have an account? ", -1)),
          N(c, {
            to: "/app/signup",
            class: "link"
          }, {
            default: J(() => [...a[5] || (a[5] = [
              O("Sign up", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), In = /* @__PURE__ */ T(Sn, [["__scopeId", "data-v-22bc5576"]]), Bn = { class: "auth-page" }, Tn = { class: "auth-card" }, Pn = /* @__PURE__ */ B({
  __name: "LoginPage",
  setup(o) {
    return (e, r) => (n(), s("div", Bn, [
      t("div", Tn, [
        N(In, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), jn = /* @__PURE__ */ T(Pn, [["__scopeId", "data-v-9c53ce6a"]]), Rn = {
  key: 0,
  class: "form-error"
}, Ln = { class: "field" }, En = { class: "field" }, An = { class: "field" }, Fn = { class: "password-wrapper" }, Un = ["type"], Nn = { class: "field" }, Dn = ["type"], zn = ["disabled"], Vn = { class: "form-footer" }, Hn = /* @__PURE__ */ B({
  __name: "SignupForm",
  emits: ["success"],
  setup(o, { emit: e }) {
    const r = e, i = ue(), v = me(), g = m(""), k = m(""), _ = m(""), f = m(""), u = m(!1), a = m(null);
    async function c() {
      if (a.value = null, _.value.length < 8) {
        a.value = "Password must be at least 8 characters.";
        return;
      }
      if (_.value !== f.value) {
        a.value = "Passwords do not match.";
        return;
      }
      await i.signup(g.value, k.value, _.value) && (r("success"), v.push("/app"));
    }
    return (y, l) => {
      const p = he("router-link");
      return n(), s("form", {
        class: "signup-form",
        onSubmit: Q(c, ["prevent"])
      }, [
        l[11] || (l[11] = t("h2", { class: "form-title" }, "Create your Phlix account", -1)),
        $(i).error || a.value ? (n(), s("div", Rn, d($(i).error || a.value), 1)) : x("", !0),
        t("div", Ln, [
          l[5] || (l[5] = t("label", {
            for: "email",
            class: "label"
          }, "Email", -1)),
          H(t("input", {
            id: "email",
            "onUpdate:modelValue": l[0] || (l[0] = (h) => g.value = h),
            type: "email",
            class: "input",
            placeholder: "you@example.com",
            required: "",
            autocomplete: "email"
          }, null, 512), [
            [te, g.value]
          ])
        ]),
        t("div", En, [
          l[6] || (l[6] = t("label", {
            for: "username",
            class: "label"
          }, "Username", -1)),
          H(t("input", {
            id: "username",
            "onUpdate:modelValue": l[1] || (l[1] = (h) => k.value = h),
            type: "text",
            class: "input",
            placeholder: "Your username",
            required: "",
            autocomplete: "username",
            minlength: "3"
          }, null, 512), [
            [te, k.value]
          ])
        ]),
        t("div", An, [
          l[7] || (l[7] = t("label", {
            for: "password",
            class: "label"
          }, "Password", -1)),
          t("div", Fn, [
            H(t("input", {
              id: "password",
              "onUpdate:modelValue": l[2] || (l[2] = (h) => _.value = h),
              type: u.value ? "text" : "password",
              class: "input",
              placeholder: "At least 8 characters",
              required: "",
              autocomplete: "new-password",
              minlength: "8"
            }, null, 8, Un), [
              [le, _.value]
            ]),
            t("button", {
              type: "button",
              class: "toggle-password",
              onClick: l[3] || (l[3] = (h) => u.value = !u.value)
            }, d(u.value ? "🙈" : "👁"), 1)
          ])
        ]),
        t("div", Nn, [
          l[8] || (l[8] = t("label", {
            for: "confirm",
            class: "label"
          }, "Confirm password", -1)),
          H(t("input", {
            id: "confirm",
            "onUpdate:modelValue": l[4] || (l[4] = (h) => f.value = h),
            type: u.value ? "text" : "password",
            class: "input",
            placeholder: "Repeat your password",
            required: "",
            autocomplete: "new-password"
          }, null, 8, Dn), [
            [le, f.value]
          ])
        ]),
        t("button", {
          type: "submit",
          class: "submit-btn",
          disabled: $(i).loading
        }, d($(i).loading ? "Creating account..." : "Create account"), 9, zn),
        t("p", Vn, [
          l[10] || (l[10] = O(" Already have an account? ", -1)),
          N(p, {
            to: "/app/login",
            class: "link"
          }, {
            default: J(() => [...l[9] || (l[9] = [
              O("Sign in", -1)
            ])]),
            _: 1
          })
        ])
      ], 32);
    };
  }
}), qn = /* @__PURE__ */ T(Hn, [["__scopeId", "data-v-d5e42c72"]]), Gn = { class: "auth-page" }, On = { class: "auth-card" }, Yn = /* @__PURE__ */ B({
  __name: "SignupPage",
  setup(o) {
    return (e, r) => (n(), s("div", Gn, [
      t("div", On, [
        N(qn, { onSuccess: () => {
        } })
      ])
    ]));
  }
}), Jn = /* @__PURE__ */ T(Yn, [["__scopeId", "data-v-609331e4"]]), Kn = { class: "settings-form" }, Wn = {
  key: 0,
  class: "settings-loading"
}, Xn = {
  key: 1,
  class: "settings-error"
}, Qn = { class: "group-title" }, Zn = ["for"], es = { class: "setting-control" }, ts = ["id", "checked", "onChange"], ns = ["id", "value", "onChange"], ss = ["id", "value", "onChange"], os = { class: "settings-actions" }, rs = {
  key: 0,
  class: "success-msg"
}, as = ["disabled"], is = /* @__PURE__ */ B({
  __name: "SettingsForm",
  props: {
    groups: {}
  },
  emits: ["saved"],
  setup(o, { emit: e }) {
    const r = o, i = e, v = ue(), g = m({}), k = m(!0), _ = m(!1), f = m(null), u = m(null), a = [
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
    async function y() {
      k.value = !0, f.value = null;
      try {
        const P = await v.client.get("/api/v1/users/me/settings");
        g.value = P;
      } catch (P) {
        f.value = P instanceof Error ? P.message : "Failed to load settings";
      } finally {
        k.value = !1;
      }
    }
    async function l() {
      _.value = !0, f.value = null, u.value = null;
      try {
        await v.client.put("/api/v1/users/me/settings", g.value), u.value = "Settings saved.", i("saved", g.value), setTimeout(() => {
          u.value = null;
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
    q(y);
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
    return (P, D) => (n(), s("div", Kn, [
      k.value ? (n(), s("div", Wn, "Loading settings...")) : f.value ? (n(), s("div", Xn, d(f.value), 1)) : (n(), s(R, { key: 2 }, [
        (n(!0), s(R, null, L(c.value, (G) => (n(), s("div", {
          key: G,
          class: "settings-group"
        }, [
          t("h3", Qn, d(h[G]), 1),
          (n(), s(R, null, L(A, (z, j) => H(t("div", {
            key: j,
            class: "setting-row"
          }, [
            t("label", {
              for: j,
              class: "setting-label"
            }, d(z.label), 9, Zn),
            t("div", es, [
              z.type === "bool" ? (n(), s("input", {
                key: 0,
                id: j,
                type: "checkbox",
                class: "toggle",
                checked: !!g.value[j],
                onChange: (M) => p(j, M.target.checked)
              }, null, 40, ts)) : z.type === "number" ? (n(), s("input", {
                key: 1,
                id: j,
                type: "number",
                class: "input number-input",
                value: g.value[j],
                onChange: (M) => p(j, Number(M.target.value))
              }, null, 40, ns)) : (n(), s("input", {
                key: 2,
                id: j,
                type: "text",
                class: "input",
                value: g.value[j] ?? "",
                onChange: (M) => p(j, M.target.value)
              }, null, 40, ss))
            ])
          ]), [
            [Ce, j.startsWith(G)]
          ])), 64))
        ]))), 128)),
        t("div", os, [
          u.value ? (n(), s("div", rs, d(u.value), 1)) : x("", !0),
          t("button", {
            class: "save-btn",
            disabled: _.value,
            onClick: l
          }, d(_.value ? "Saving..." : "Save settings"), 9, as)
        ])
      ], 64))
    ]));
  }
}), ls = /* @__PURE__ */ T(is, [["__scopeId", "data-v-51b588b6"]]), cs = { class: "settings-page" }, us = /* @__PURE__ */ B({
  __name: "SettingsPage",
  setup(o) {
    return (e, r) => (n(), s("div", cs, [
      r[0] || (r[0] = t("div", { class: "settings-header" }, [
        t("h1", { class: "settings-title" }, "Settings")
      ], -1)),
      N(ls)
    ]));
  }
}), ds = /* @__PURE__ */ T(us, [["__scopeId", "data-v-f9ca8a28"]]);
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
function hs(o) {
  const e = o.routerBase || "/app", r = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: Wt
    },
    {
      path: `${e}/player/:id`,
      name: "player",
      component: _n
    },
    {
      path: `${e}/login`,
      name: "login",
      component: jn
    },
    {
      path: `${e}/signup`,
      name: "signup",
      component: Jn
    },
    {
      path: `${e}/settings`,
      name: "settings",
      component: ds
    }
  ];
  return o.extraRoutes && r.push(...o.extraRoutes), r.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: Ke,
    props: { appName: o.app }
  }), r;
}
function Gi(o) {
  const e = {
    ...vs(),
    ...o
  }, r = Ie(), i = e.routerBase || "/app", v = Pe({
    history: je(i),
    routes: hs(e)
  }), g = Me(Ge);
  return g.provide("apiBase", e.apiBase), g.use(r), g.use(v), g;
}
const ps = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ms(o, e) {
  return n(), s("svg", ps, [...e[0] || (e[0] = [
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
const gs = w({ name: "lucide-play", render: ms }), fs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function _s(o, e) {
  return n(), s("svg", fs, [...e[0] || (e[0] = [
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
const ks = w({ name: "lucide-pause", render: _s }), ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ys(o, e) {
  return n(), s("svg", ws, [...e[0] || (e[0] = [
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
const $s = w({ name: "lucide-skip-back", render: ys }), bs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function xs(o, e) {
  return n(), s("svg", bs, [...e[0] || (e[0] = [
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
const Cs = w({ name: "lucide-skip-forward", render: xs }), Ms = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ss(o, e) {
  return n(), s("svg", Ms, [...e[0] || (e[0] = [
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
const Is = w({ name: "lucide-rotate-ccw", render: Ss }), Bs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ts(o, e) {
  return n(), s("svg", Bs, [...e[0] || (e[0] = [
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
const Ps = w({ name: "lucide-rotate-cw", render: Ts }), js = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Rs(o, e) {
  return n(), s("svg", js, [...e[0] || (e[0] = [
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
const Ls = w({ name: "lucide-volume-2", render: Rs }), Es = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function As(o, e) {
  return n(), s("svg", Es, [...e[0] || (e[0] = [
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
const Fs = w({ name: "lucide-volume-1", render: As }), Us = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ns(o, e) {
  return n(), s("svg", Us, [...e[0] || (e[0] = [
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
const Ds = w({ name: "lucide-volume-x", render: Ns }), zs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Vs(o, e) {
  return n(), s("svg", zs, [...e[0] || (e[0] = [
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
const Hs = w({ name: "lucide-captions", render: Vs }), qs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Gs(o, e) {
  return n(), s("svg", qs, [...e[0] || (e[0] = [
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
const Os = w({ name: "lucide-picture-in-picture-2", render: Gs }), Ys = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Js(o, e) {
  return n(), s("svg", Ys, [...e[0] || (e[0] = [
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
const Ks = w({ name: "lucide-rectangle-horizontal", render: Js }), Ws = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Xs(o, e) {
  return n(), s("svg", Ws, [...e[0] || (e[0] = [
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
const Qs = w({ name: "lucide-maximize", render: Xs }), Zs = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function eo(o, e) {
  return n(), s("svg", Zs, [...e[0] || (e[0] = [
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
const to = w({ name: "lucide-minimize", render: eo }), no = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function so(o, e) {
  return n(), s("svg", no, [...e[0] || (e[0] = [
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
const oo = w({ name: "lucide-maximize-2", render: so }), ro = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ao(o, e) {
  return n(), s("svg", ro, [...e[0] || (e[0] = [
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
const io = w({ name: "lucide-cast", render: ao }), lo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function co(o, e) {
  return n(), s("svg", lo, [...e[0] || (e[0] = [
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
const uo = w({ name: "lucide-settings", render: co }), vo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ho(o, e) {
  return n(), s("svg", vo, [...e[0] || (e[0] = [
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
const po = w({ name: "lucide-gauge", render: ho }), mo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function go(o, e) {
  return n(), s("svg", mo, [...e[0] || (e[0] = [
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
const fo = w({ name: "lucide-film", render: go }), _o = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ko(o, e) {
  return n(), s("svg", _o, [...e[0] || (e[0] = [
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
const wo = w({ name: "lucide-image", render: ko }), yo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $o(o, e) {
  return n(), s("svg", yo, [...e[0] || (e[0] = [
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
const bo = w({ name: "lucide-music", render: $o }), xo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Co(o, e) {
  return n(), s("svg", xo, [...e[0] || (e[0] = [
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
const Mo = w({ name: "lucide-tv", render: Co }), So = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Io(o, e) {
  return n(), s("svg", So, [...e[0] || (e[0] = [
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
const Bo = w({ name: "lucide-search", render: Io }), To = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Po(o, e) {
  return n(), s("svg", To, [...e[0] || (e[0] = [
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
const jo = w({ name: "lucide-sliders-horizontal", render: Po }), Ro = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Lo(o, e) {
  return n(), s("svg", Ro, [...e[0] || (e[0] = [
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
const Eo = w({ name: "lucide-calendar", render: Lo }), Ao = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fo(o, e) {
  return n(), s("svg", Ao, [...e[0] || (e[0] = [
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
const Uo = w({ name: "lucide-arrow-up-down", render: Fo }), No = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Do(o, e) {
  return n(), s("svg", No, [...e[0] || (e[0] = [
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
const zo = w({ name: "lucide-star", render: Do }), Vo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ho(o, e) {
  return n(), s("svg", Vo, [...e[0] || (e[0] = [
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
const qo = w({ name: "lucide-list", render: Ho }), Go = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Oo(o, e) {
  return n(), s("svg", Go, [...e[0] || (e[0] = [
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
const Yo = w({ name: "lucide-plus", render: Oo }), Jo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ko(o, e) {
  return n(), s("svg", Jo, [...e[0] || (e[0] = [
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
const Wo = w({ name: "lucide-info", render: Ko }), Xo = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qo(o, e) {
  return n(), s("svg", Xo, [...e[0] || (e[0] = [
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
const Zo = w({ name: "lucide-x", render: Qo }), er = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function tr(o, e) {
  return n(), s("svg", er, [...e[0] || (e[0] = [
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
const nr = w({ name: "lucide-check", render: tr }), sr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function or(o, e) {
  return n(), s("svg", sr, [...e[0] || (e[0] = [
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
const rr = w({ name: "lucide-bookmark", render: or }), ar = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ir(o, e) {
  return n(), s("svg", ar, [...e[0] || (e[0] = [
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
const lr = w({ name: "lucide-bookmark-plus", render: ir }), cr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ur(o, e) {
  return n(), s("svg", cr, [...e[0] || (e[0] = [
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
const dr = w({ name: "lucide-heart", render: ur }), vr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function hr(o, e) {
  return n(), s("svg", vr, [...e[0] || (e[0] = [
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
const pr = w({ name: "lucide-user", render: hr }), mr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function gr(o, e) {
  return n(), s("svg", mr, [...e[0] || (e[0] = [
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
const fr = w({ name: "lucide-log-out", render: gr }), _r = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function kr(o, e) {
  return n(), s("svg", _r, [...e[0] || (e[0] = [
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
const wr = w({ name: "lucide-menu", render: kr }), yr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function $r(o, e) {
  return n(), s("svg", yr, [...e[0] || (e[0] = [
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
const br = w({ name: "lucide-more-horizontal", render: $r }), xr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Cr(o, e) {
  return n(), s("svg", xr, [...e[0] || (e[0] = [
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
const Mr = w({ name: "lucide-eye", render: Cr }), Sr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Ir(o, e) {
  return n(), s("svg", Sr, [...e[0] || (e[0] = [
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
const Br = w({ name: "lucide-eye-off", render: Ir }), Tr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Pr(o, e) {
  return n(), s("svg", Tr, [...e[0] || (e[0] = [
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
const jr = w({ name: "lucide-arrow-left", render: Pr }), Rr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Lr(o, e) {
  return n(), s("svg", Rr, [...e[0] || (e[0] = [
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
const Er = w({ name: "lucide-arrow-up", render: Lr }), Ar = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Fr(o, e) {
  return n(), s("svg", Ar, [...e[0] || (e[0] = [
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
const Ur = w({ name: "lucide-arrow-down", render: Fr }), Nr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Dr(o, e) {
  return n(), s("svg", Nr, [...e[0] || (e[0] = [
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
const zr = w({ name: "lucide-chevron-down", render: Dr }), Vr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Hr(o, e) {
  return n(), s("svg", Vr, [...e[0] || (e[0] = [
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
const qr = w({ name: "lucide-chevron-up", render: Hr }), Gr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Or(o, e) {
  return n(), s("svg", Gr, [...e[0] || (e[0] = [
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
const Yr = w({ name: "lucide-chevron-left", render: Or }), Jr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Kr(o, e) {
  return n(), s("svg", Jr, [...e[0] || (e[0] = [
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
const Wr = w({ name: "lucide-chevron-right", render: Kr }), Xr = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function Qr(o, e) {
  return n(), s("svg", Xr, [...e[0] || (e[0] = [
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
const Zr = w({ name: "lucide-loader-circle", render: Qr }), ea = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ta(o, e) {
  return n(), s("svg", ea, [...e[0] || (e[0] = [
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
const na = w({ name: "lucide-circle-alert", render: ta }), sa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function oa(o, e) {
  return n(), s("svg", sa, [...e[0] || (e[0] = [
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
const ra = w({ name: "lucide-circle-check", render: oa }), aa = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ia(o, e) {
  return n(), s("svg", aa, [...e[0] || (e[0] = [
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
const la = w({ name: "lucide-circle-x", render: ia }), ca = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ua(o, e) {
  return n(), s("svg", ca, [...e[0] || (e[0] = [
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
const da = w({ name: "lucide-sun", render: ua }), va = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ha(o, e) {
  return n(), s("svg", va, [...e[0] || (e[0] = [
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
const pa = w({ name: "lucide-moon", render: ha }), ma = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function ga(o, e) {
  return n(), s("svg", ma, [...e[0] || (e[0] = [
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
const fa = w({ name: "lucide-monitor", render: ga }), Oi = /* @__PURE__ */ B({
  __name: "Icon",
  props: {
    name: {},
    size: { default: void 0 },
    label: { default: void 0 },
    strokeWidth: { default: void 0 }
  },
  setup(o) {
    const e = {
      // playback (maps the legacy play/pause/volume/mute/back emoji)
      play: gs,
      pause: ks,
      "skip-back": $s,
      "skip-forward": Cs,
      rewind: Is,
      forward: Ps,
      volume: Ls,
      "volume-low": Fs,
      mute: Ds,
      captions: Hs,
      pip: Os,
      theater: Ks,
      fullscreen: Qs,
      "fullscreen-exit": to,
      expand: oo,
      cast: io,
      settings: uo,
      speed: po,
      // media (replaces the legacy film-clapper emoji placeholder)
      film: fo,
      image: wo,
      music: bo,
      tv: Mo,
      search: Bo,
      filter: jo,
      calendar: Eo,
      sort: Uo,
      star: zo,
      list: qo,
      // actions
      plus: Yo,
      info: Wo,
      x: Zo,
      check: nr,
      bookmark: rr,
      "bookmark-plus": lr,
      heart: dr,
      user: pr,
      "log-out": fr,
      menu: wr,
      more: br,
      eye: Mr,
      "eye-off": Br,
      // arrows / chevrons (replaces the legacy arrow emoji)
      "arrow-left": jr,
      "arrow-up": Er,
      "arrow-down": Ur,
      "chevron-down": zr,
      "chevron-up": qr,
      "chevron-left": Yr,
      "chevron-right": Wr,
      // status / theme
      spinner: Zr,
      alert: na,
      success: ra,
      error: la,
      sun: da,
      moon: pa,
      monitor: fa
    }, r = o, i = E(() => e[r.name]), v = E(
      () => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size
    );
    return (g, k) => (n(), ne(Se(i.value), {
      class: "phlix-icon",
      style: Z(v.value ? { fontSize: v.value } : void 0),
      "stroke-width": o.strokeWidth,
      role: o.label ? "img" : void 0,
      "aria-label": o.label,
      "aria-hidden": o.label ? void 0 : "true",
      focusable: "false"
    }, null, 8, ["style", "stroke-width", "role", "aria-label", "aria-hidden"]));
  }
}), _a = { class: "library-scan-page" }, ka = {
  key: 0,
  class: "loading"
}, wa = {
  key: 1,
  class: "error"
}, ya = {
  key: 2,
  class: "libraries-list"
}, $a = { class: "library-info" }, ba = { class: "library-name" }, xa = { class: "library-type" }, Ca = { class: "library-paths" }, Ma = { class: "library-meta" }, Sa = { key: 0 }, Ia = {
  key: 0,
  class: "scan-status"
}, Ba = { class: "library-actions" }, Ta = ["onClick", "disabled"], Pa = ["onClick", "disabled"], ja = {
  key: 0,
  class: "empty-state"
}, Ra = /* @__PURE__ */ B({
  __name: "LibraryScanPage",
  setup(o) {
    const e = m([]), r = m({}), i = m(!0), v = m(null);
    async function g() {
      try {
        const c = await U.get("/api/v1/libraries");
        e.value = c.libraries || [];
        for (const y of e.value)
          k(y.id);
      } catch (c) {
        v.value = c instanceof Error ? c.message : "Failed to load libraries";
      } finally {
        i.value = !1;
      }
    }
    async function k(c) {
      try {
        const y = await U.get(`/api/v1/libraries/${c}/scan-status`);
        y.job && (r.value[c] = y.job);
      } catch {
      }
    }
    async function _(c) {
      try {
        await U.post(`/api/v1/libraries/${c}/scan`), await k(c);
      } catch (y) {
        v.value = y instanceof Error ? y.message : "Failed to trigger scan";
      }
    }
    async function f(c) {
      try {
        await U.post(`/api/v1/libraries/${c}/rescan`), await k(c);
      } catch (y) {
        v.value = y instanceof Error ? y.message : "Failed to trigger rescan";
      }
    }
    function u(c) {
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
    return q(() => {
      g();
    }), (c, y) => (n(), s("div", _a, [
      y[0] || (y[0] = t("div", { class: "scan-header" }, [
        t("h1", { class: "scan-title" }, "Library Scanner"),
        t("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")
      ], -1)),
      i.value ? (n(), s("div", ka, "Loading libraries...")) : v.value ? (n(), s("div", wa, d(v.value), 1)) : (n(), s("div", ya, [
        (n(!0), s(R, null, L(e.value, (l) => {
          var p, h, A, P;
          return n(), s("div", {
            key: l.id,
            class: "library-card"
          }, [
            t("div", $a, [
              t("h3", ba, d(l.name), 1),
              t("span", xa, d(l.type), 1),
              t("p", Ca, d(l.paths.join(", ")), 1),
              t("div", Ma, [
                l.item_count !== void 0 ? (n(), s("span", Sa, d(l.item_count) + " items", 1)) : x("", !0),
                t("span", null, "Last scan: " + d(u(l.last_scan_at)), 1)
              ]),
              r.value[l.id] ? (n(), s("div", Ia, d(a(r.value[l.id])), 1)) : x("", !0)
            ]),
            t("div", Ba, [
              t("button", {
                class: "btn btn-scan",
                onClick: (D) => _(l.id),
                disabled: ((p = r.value[l.id]) == null ? void 0 : p.status) === "running" || ((h = r.value[l.id]) == null ? void 0 : h.status) === "queued"
              }, " Scan ", 8, Ta),
              t("button", {
                class: "btn btn-rescan",
                onClick: (D) => f(l.id),
                disabled: ((A = r.value[l.id]) == null ? void 0 : A.status) === "running" || ((P = r.value[l.id]) == null ? void 0 : P.status) === "queued"
              }, " Rescan ", 8, Pa)
            ])
          ]);
        }), 128)),
        e.value.length === 0 ? (n(), s("div", ja, " No libraries configured. Add a library to get started. ")) : x("", !0)
      ]))
    ]));
  }
}), Yi = /* @__PURE__ */ T(Ra, [["__scopeId", "data-v-62b3805e"]]), La = { class: "my-servers-page" }, Ea = {
  key: 0,
  class: "loading"
}, Aa = {
  key: 1,
  class: "error"
}, Fa = {
  key: 2,
  class: "servers-list"
}, Ua = { class: "server-info" }, Na = { class: "server-name" }, Da = { class: "server-url" }, za = { class: "server-meta" }, Va = { key: 0 }, Ha = {
  key: 0,
  class: "empty-state"
}, qa = /* @__PURE__ */ B({
  __name: "MyServersPage",
  setup(o) {
    const e = m([]), r = m(!0), i = m(null);
    async function v() {
      try {
        const _ = await U.get("/api/v1/servers");
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
    return q(() => {
      v();
    }), (_, f) => (n(), s("div", La, [
      f[2] || (f[2] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "My Servers"),
        t("p", { class: "page-subtitle" }, "Manage your connected media servers")
      ], -1)),
      r.value ? (n(), s("div", Ea, "Loading servers...")) : i.value ? (n(), s("div", Aa, d(i.value), 1)) : (n(), s("div", Fa, [
        (n(!0), s(R, null, L(e.value, (u) => (n(), s("div", {
          key: u.id,
          class: "server-card"
        }, [
          t("div", {
            class: "server-status",
            style: Z({ backgroundColor: g(u.status) })
          }, null, 4),
          t("div", Ua, [
            t("h3", Na, d(u.name), 1),
            t("p", Da, d(u.url), 1),
            t("div", za, [
              t("span", null, d(u.owner), 1),
              u.library_count !== void 0 ? (n(), s("span", Va, d(u.library_count) + " libraries", 1)) : x("", !0),
              t("span", null, "Last seen: " + d(k(u.last_seen)), 1)
            ])
          ]),
          f[0] || (f[0] = t("div", { class: "server-actions" }, [
            t("button", { class: "btn btn-primary" }, "Manage")
          ], -1))
        ]))), 128)),
        e.value.length === 0 ? (n(), s("div", Ha, [...f[1] || (f[1] = [
          t("p", null, "No servers connected yet.", -1),
          t("button", { class: "btn btn-primary" }, "Add Server", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), Ji = /* @__PURE__ */ T(qa, [["__scopeId", "data-v-b9237da4"]]), Ga = { class: "federation-page" }, Oa = {
  key: 0,
  class: "loading"
}, Ya = {
  key: 1,
  class: "error"
}, Ja = {
  key: 2,
  class: "federation-content"
}, Ka = { class: "peers-section" }, Wa = { class: "peers-list" }, Xa = { class: "peer-info" }, Qa = { class: "peer-name" }, Za = { class: "peer-url" }, ei = { class: "peer-meta" }, ti = { key: 0 }, ni = { class: "peer-actions" }, si = ["onClick"], oi = {
  key: 1,
  class: "status-badge"
}, ri = {
  key: 0,
  class: "empty-state"
}, ai = { class: "add-peer-section" }, ii = /* @__PURE__ */ B({
  __name: "FederationPage",
  setup(o) {
    const e = m([]), r = m(!0), i = m(null);
    async function v() {
      try {
        const u = await U.get("/api/v1/federation/peers");
        e.value = u.peers || [];
      } catch (u) {
        i.value = u instanceof Error ? u.message : "Failed to load federation peers";
      } finally {
        r.value = !1;
      }
    }
    async function g(u) {
      try {
        await U.post("/api/v1/federation/connect", { url: u }), await v();
      } catch (a) {
        i.value = a instanceof Error ? a.message : "Failed to connect to peer";
      }
    }
    async function k(u) {
      try {
        await U.post(`/api/v1/federation/peers/${u}/disconnect`), await v();
      } catch (a) {
        i.value = a instanceof Error ? a.message : "Failed to disconnect peer";
      }
    }
    function _(u) {
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
    return q(() => {
      v();
    }), (u, a) => (n(), s("div", Ga, [
      a[5] || (a[5] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Federation"),
        t("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")
      ], -1)),
      r.value ? (n(), s("div", Oa, "Loading federation peers...")) : i.value ? (n(), s("div", Ya, d(i.value), 1)) : (n(), s("div", Ja, [
        t("div", Ka, [
          a[2] || (a[2] = t("h2", { class: "section-title" }, "Connected Peers", -1)),
          t("div", Wa, [
            (n(!0), s(R, null, L(e.value, (c) => (n(), s("div", {
              key: c.id,
              class: "peer-card"
            }, [
              t("div", {
                class: "peer-status",
                style: Z({ backgroundColor: _(c.status) })
              }, null, 4),
              t("div", Xa, [
                t("h3", Qa, d(c.name), 1),
                t("p", Za, d(c.url), 1),
                t("div", ei, [
                  c.shared_libraries_count !== void 0 ? (n(), s("span", ti, d(c.shared_libraries_count) + " shared libraries", 1)) : x("", !0),
                  t("span", null, "Last sync: " + d(f(c.last_sync)), 1)
                ])
              ]),
              t("div", ni, [
                c.status === "connected" ? (n(), s("button", {
                  key: 0,
                  class: "btn btn-secondary",
                  onClick: (y) => k(c.id)
                }, " Disconnect ", 8, si)) : c.status === "pending" ? (n(), s("span", oi, "Pending")) : x("", !0)
              ])
            ]))), 128)),
            e.value.length === 0 ? (n(), s("div", ri, [...a[1] || (a[1] = [
              t("p", null, "No federation peers connected.", -1)
            ])])) : x("", !0)
          ])
        ]),
        t("div", ai, [
          a[4] || (a[4] = t("h2", { class: "section-title" }, "Add Peer", -1)),
          t("form", {
            class: "add-peer-form",
            onSubmit: a[0] || (a[0] = Q((c) => g(""), ["prevent"]))
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
}), Ki = /* @__PURE__ */ T(ii, [["__scopeId", "data-v-91ba2781"]]), li = { class: "manage-shares-page" }, ci = {
  key: 0,
  class: "loading"
}, ui = {
  key: 1,
  class: "error"
}, di = {
  key: 2,
  class: "shares-list"
}, vi = { class: "share-info" }, hi = { class: "share-library" }, pi = { class: "share-meta" }, mi = {
  key: 0,
  class: "expired-badge"
}, gi = { class: "share-dates" }, fi = { key: 0 }, _i = { class: "share-actions" }, ki = ["onClick"], wi = {
  key: 0,
  class: "empty-state"
}, yi = /* @__PURE__ */ B({
  __name: "ManageSharesPage",
  setup(o) {
    const e = m([]), r = m(!0), i = m(null);
    async function v() {
      try {
        const f = await U.get("/api/v1/shares");
        e.value = f.shares || [];
      } catch (f) {
        i.value = f instanceof Error ? f.message : "Failed to load shares";
      } finally {
        r.value = !1;
      }
    }
    async function g(f) {
      try {
        await U.delete(`/api/v1/shares/${f}`), await v();
      } catch (u) {
        i.value = u instanceof Error ? u.message : "Failed to revoke share";
      }
    }
    function k(f) {
      return new Date(f).toLocaleString();
    }
    function _(f) {
      return f ? new Date(f) < /* @__PURE__ */ new Date() : !1;
    }
    return q(() => {
      v();
    }), (f, u) => (n(), s("div", li, [
      u[1] || (u[1] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Manage Shares"),
        t("p", { class: "page-subtitle" }, "View and manage your shared libraries")
      ], -1)),
      r.value ? (n(), s("div", ci, "Loading shares...")) : i.value ? (n(), s("div", ui, d(i.value), 1)) : (n(), s("div", di, [
        (n(!0), s(R, null, L(e.value, (a) => (n(), s("div", {
          key: a.id,
          class: "share-card"
        }, [
          t("div", vi, [
            t("h3", hi, d(a.library_name), 1),
            t("div", pi, [
              t("span", null, "Shared with: " + d(a.shared_with), 1),
              t("span", {
                class: X(["permission-badge", a.permissions])
              }, d(a.permissions), 3),
              a.expires_at && _(a.expires_at) ? (n(), s("span", mi, "Expired")) : x("", !0)
            ]),
            t("p", gi, [
              O(" Created: " + d(k(a.created_at)) + " ", 1),
              a.expires_at ? (n(), s("span", fi, " | Expires: " + d(k(a.expires_at)), 1)) : x("", !0)
            ])
          ]),
          t("div", _i, [
            t("button", {
              class: "btn btn-danger",
              onClick: (c) => g(a.id)
            }, "Revoke", 8, ki)
          ])
        ]))), 128)),
        e.value.length === 0 ? (n(), s("div", wi, [...u[0] || (u[0] = [
          t("p", null, "No library shares found.", -1)
        ])])) : x("", !0)
      ]))
    ]));
  }
}), Wi = /* @__PURE__ */ T(yi, [["__scopeId", "data-v-bd8771ac"]]), $i = { class: "audit-logs-page" }, bi = {
  key: 0,
  class: "loading"
}, xi = {
  key: 1,
  class: "error"
}, Ci = {
  key: 2,
  class: "logs-container"
}, Mi = { class: "logs-list" }, Si = { class: "log-content" }, Ii = { class: "log-header" }, Bi = { class: "log-action" }, Ti = { class: "log-actor" }, Pi = { class: "log-time" }, ji = {
  key: 0,
  class: "log-target"
}, Ri = {
  key: 1,
  class: "log-details"
}, Li = {
  key: 2,
  class: "log-ip"
}, Ei = {
  key: 0,
  class: "empty-state"
}, Ai = {
  key: 0,
  class: "pagination"
}, Fi = ["disabled"], Ui = { class: "page-info" }, Ni = ["disabled"], Di = /* @__PURE__ */ B({
  __name: "AuditLogsPage",
  setup(o) {
    const e = m([]), r = m(!0), i = m(null), v = m(1), g = m(1);
    async function k(a = 1) {
      try {
        r.value = !0;
        const c = await U.get(
          "/api/v1/audit-logs",
          { page: String(a) }
        );
        e.value = c.logs || [], v.value = c.page || 1, g.value = c.total_pages || 1;
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
    function u(a) {
      return a.includes("create") || a.includes("add") ? "+" : a.includes("delete") || a.includes("remove") ? "-" : a.includes("update") || a.includes("edit") ? "~" : a.includes("login") || a.includes("auth") ? "@" : "#";
    }
    return q(() => {
      k();
    }), (a, c) => (n(), s("div", $i, [
      c[3] || (c[3] = t("div", { class: "page-header" }, [
        t("h1", { class: "page-title" }, "Audit Logs"),
        t("p", { class: "page-subtitle" }, "View system activity and user actions")
      ], -1)),
      r.value ? (n(), s("div", bi, "Loading audit logs...")) : i.value ? (n(), s("div", xi, d(i.value), 1)) : (n(), s("div", Ci, [
        t("div", Mi, [
          (n(!0), s(R, null, L(e.value, (y) => (n(), s("div", {
            key: y.id,
            class: "log-entry"
          }, [
            t("div", {
              class: "log-icon",
              style: Z({ backgroundColor: f(y.action) })
            }, d(u(y.action)), 5),
            t("div", Si, [
              t("div", Ii, [
                t("span", Bi, d(y.action), 1),
                t("span", Ti, d(y.actor), 1),
                t("span", Pi, d(_(y.created_at)), 1)
              ]),
              y.target ? (n(), s("p", ji, "Target: " + d(y.target), 1)) : x("", !0),
              y.details ? (n(), s("p", Ri, d(y.details), 1)) : x("", !0),
              y.ip_address ? (n(), s("span", Li, "IP: " + d(y.ip_address), 1)) : x("", !0)
            ])
          ]))), 128)),
          e.value.length === 0 ? (n(), s("div", Ei, [...c[2] || (c[2] = [
            t("p", null, "No audit logs found.", -1)
          ])])) : x("", !0)
        ]),
        g.value > 1 ? (n(), s("div", Ai, [
          t("button", {
            class: "btn btn-secondary",
            disabled: v.value <= 1,
            onClick: c[0] || (c[0] = (y) => k(v.value - 1))
          }, " Previous ", 8, Fi),
          t("span", Ui, "Page " + d(v.value) + " of " + d(g.value), 1),
          t("button", {
            class: "btn btn-secondary",
            disabled: v.value >= g.value,
            onClick: c[1] || (c[1] = (y) => k(v.value + 1))
          }, " Next ", 8, Ni)
        ])) : x("", !0)
      ]))
    ]));
  }
}), Xi = /* @__PURE__ */ T(Di, [["__scopeId", "data-v-05910fd9"]]);
export {
  se as ApiClient,
  We as ApiError,
  Ve as AppLayout,
  Xi as AuditLogsPage,
  Wt as BrowsePage,
  Ki as FederationPage,
  Vt as FilterBar,
  Oi as Icon,
  Yi as LibraryScanPage,
  kn as LocalStorageTokenStore,
  In as LoginForm,
  jn as LoginPage,
  Wi as ManageSharesPage,
  dt as MediaCard,
  ft as MediaGrid,
  Ji as MyServersPage,
  Ge as PhlixApp,
  hn as Player,
  _n as PlayerPage,
  ls as SettingsForm,
  ds as SettingsPage,
  qn as SignupForm,
  Jn as SignupPage,
  Gi as createPhlixApp,
  ue as useAuthStore,
  ge as useMediaStore
};
//# sourceMappingURL=phlix-ui.js.map
