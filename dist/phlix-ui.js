var R = Object.defineProperty;
var A = (s, e, t) => e in s ? R(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var i = (s, e, t) => A(s, typeof e != "symbol" ? e + "" : e, t);
import { openBlock as m, createElementBlock as v, createElementVNode as n, renderSlot as c, defineComponent as E, createBlock as P, withCtx as l, createVNode as h, unref as d, createTextVNode as w, toDisplayString as x, createApp as I } from "vue";
import { createPinia as U } from "pinia";
import { RouterView as $, RouterLink as S, createRouter as N, createWebHistory as C } from "vue-router";
const k = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [r, o] of e)
    t[r] = o;
  return t;
}, B = {}, O = { class: "app-layout" }, q = { class: "app-header" }, L = { class: "header-inner" }, j = { class: "logo" }, F = { class: "nav" }, H = { class: "app-main" }, J = { class: "app-footer" };
function K(s, e) {
  return m(), v("div", O, [
    n("header", q, [
      n("div", L, [
        n("div", j, [
          c(s.$slots, "logo", {}, () => [
            e[0] || (e[0] = n("span", { class: "logo-text" }, "Phlix", -1))
          ], !0)
        ]),
        n("nav", F, [
          c(s.$slots, "nav", {}, void 0, !0)
        ])
      ])
    ]),
    n("main", H, [
      c(s.$slots, "default", {}, void 0, !0)
    ]),
    n("footer", J, [
      c(s.$slots, "footer", {}, void 0, !0)
    ])
  ]);
}
const V = /* @__PURE__ */ k(B, [["render", K], ["__scopeId", "data-v-9f6c6d16"]]), z = { class: "main-nav" }, Y = /* @__PURE__ */ E({
  __name: "PhlixApp",
  setup(s) {
    return (e, t) => (m(), P(V, null, {
      nav: l(() => [
        n("nav", z, [
          h(d(S), {
            to: "/app",
            class: "nav-link"
          }, {
            default: l(() => [...t[0] || (t[0] = [
              w("Browse", -1)
            ])]),
            _: 1
          }),
          h(d(S), {
            to: "/app/settings",
            class: "nav-link"
          }, {
            default: l(() => [...t[1] || (t[1] = [
              w("Settings", -1)
            ])]),
            _: 1
          })
        ])
      ]),
      default: l(() => [
        h(d($))
      ]),
      _: 1
    }));
  }
}), D = /* @__PURE__ */ k(Y, [["__scopeId", "data-v-35b5e7c6"]]), X = { class: "phlix-placeholder" }, G = { class: "placeholder-content" }, M = /* @__PURE__ */ E({
  __name: "Placeholder",
  props: {
    appName: {}
  },
  setup(s) {
    return (e, t) => (m(), v("div", X, [
      n("div", G, [
        t[0] || (t[0] = n("h1", null, "Shared UI loading...", -1)),
        n("p", null, "Phlix " + x(s.appName) + " is initializing", 1)
      ])
    ]));
  }
}), b = /* @__PURE__ */ k(M, [["__scopeId", "data-v-bf79ac4c"]]);
function W() {
  return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
    app: "server",
    apiBase: "",
    routerBase: "/app",
    menu: [],
    extraRoutes: [],
    features: {}
  };
}
function Q(s) {
  const e = s.routerBase || "/app", t = [
    {
      path: `${e}/`,
      redirect: e
    },
    {
      path: e,
      name: "browse",
      component: b,
      props: { appName: s.app }
    }
  ];
  return s.extraRoutes && t.push(...s.extraRoutes), t.push({
    path: `${e}/:pathMatch(.*)*`,
    name: "catchall",
    component: b,
    props: { appName: s.app }
  }), t;
}
function ae(s) {
  const e = {
    ...W(),
    ...s
  }, t = U(), r = e.routerBase || "/app", o = N({
    history: C(r),
    routes: Q(e)
  }), a = I(D);
  return a.use(t), a.use(o), a;
}
class Z extends Error {
  constructor(e, t, r = null) {
    super(e), this.status = t, this.body = r, this.name = "ApiError";
  }
}
function ee(s) {
  return s === !0 || s === 1 || s === "1" || s === "true";
}
class te {
  constructor(e = {}) {
    i(this, "baseUrl");
    i(this, "tokens");
    i(this, "doFetch");
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
  async request(e, t, r = null) {
    const o = () => {
      const p = {
        "Content-Type": "application/json"
      }, y = this.tokens.getAccessToken();
      y && (p.Authorization = `Bearer ${y}`);
      const T = { method: e, headers: p, credentials: "same-origin" };
      return r !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (T.body = JSON.stringify(r)), T;
    }, a = `${this.baseUrl}${t}`;
    let u = await this.doFetch(a, o());
    return u.status === 401 && await this.refreshToken() && (u = await this.doFetch(a, o())), this.handleResponse(u);
  }
  async handleResponse(e) {
    const o = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
    if (!e.ok) {
      const a = this.extractError(o);
      throw new Z(a, e.status, o);
    }
    return o;
  }
  extractError(e) {
    if (e && typeof e == "object") {
      const t = e;
      if (typeof t.error == "string")
        return t.error;
      if (typeof t.message == "string")
        return t.message;
    }
    return "Request failed";
  }
  async refreshToken() {
    const e = this.tokens.getRefreshToken();
    if (!e)
      return !1;
    try {
      const t = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ refresh_token: e })
      });
      if (!t.ok)
        return !1;
      const r = await t.json();
      return typeof r.access_token != "string" ? !1 : (this.tokens.setAccessToken(r.access_token), typeof r.refresh_token == "string" && this.tokens.setRefreshToken(r.refresh_token), !0);
    } catch {
      return !1;
    }
  }
  async get(e, t) {
    const r = t ? "?" + new URLSearchParams(t).toString() : "";
    return this.request("GET", e + r);
  }
  async post(e, t) {
    return this.request("POST", e, t ?? null);
  }
  async put(e, t) {
    return this.request("PUT", e, t ?? null);
  }
  async patch(e, t) {
    return this.request("PATCH", e, t ?? null);
  }
  async delete(e) {
    return this.request("DELETE", e);
  }
  isLoggedIn() {
    return this.tokens.getAccessToken() !== null;
  }
  async getCurrentUser() {
    const { user: e } = await this.get("/api/v1/auth/me");
    return { ...e, is_admin: ee(e.is_admin) };
  }
  logout(e = !0) {
    this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
  }
}
new te();
const f = "access_token", _ = "refresh_token", g = "user";
class ie {
  constructor(e = window.localStorage) {
    this.storage = e;
  }
  getAccessToken() {
    return this.storage.getItem(f);
  }
  setAccessToken(e) {
    this.storage.setItem(f, e);
  }
  getRefreshToken() {
    return this.storage.getItem(_);
  }
  setRefreshToken(e) {
    this.storage.setItem(_, e);
  }
  getUser() {
    const e = this.storage.getItem(g);
    if (e === null) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  }
  setUser(e) {
    this.storage.setItem(g, JSON.stringify(e));
  }
  clear() {
    this.storage.removeItem(f), this.storage.removeItem(_), this.storage.removeItem(g);
  }
}
export {
  te as ApiClient,
  Z as ApiError,
  V as AppLayout,
  ie as LocalStorageTokenStore,
  D as PhlixApp,
  ae as createPhlixApp
};
//# sourceMappingURL=phlix-ui.js.map
