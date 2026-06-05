import { n as e } from "./Button-BwQkyEkr.js";
import { t } from "./tokenStore-CGMYSpg6.js";
import { computed as n, inject as r, ref as i } from "vue";
import { defineStore as a } from "pinia";
//#region src/stores/useAuthStore.ts
var o = a("auth", () => {
	let a = new t(), o = new e({
		tokenStore: a,
		baseUrl: r("apiBase", "")
	}), s = i(null), c = i(!1), l = i(null), u = i(a.getAccessToken()), d = i(!1), f = null, p = n(() => u.value !== null), m = n(() => s.value?.is_admin === !0);
	function h(e, t) {
		a.setAccessToken(e), a.setRefreshToken(t), u.value = e;
	}
	async function g(e, t) {
		c.value = !0, l.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await o.post("/api/v1/auth/login", n);
			return h(r.access_token, r.refresh_token), await v(), p.value;
		} catch (e) {
			return l.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			c.value = !1;
		}
	}
	async function _(e, t, n) {
		c.value = !0, l.value = null;
		try {
			let r = await o.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return h(r.access_token, r.refresh_token), await v(), p.value;
		} catch (e) {
			return l.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			c.value = !1;
		}
	}
	async function v() {
		if (p.value) try {
			s.value = await o.getCurrentUser();
		} catch {
			s.value = null, a.clear(), u.value = null;
		}
	}
	async function y() {
		if (!d.value) return f === null && (f = v().finally(() => {
			d.value = !0;
		})), f;
	}
	function b() {
		a.clear(), u.value = null, s.value = null;
	}
	return {
		user: s,
		loading: c,
		error: l,
		isLoggedIn: p,
		isAdmin: m,
		client: o,
		login: g,
		signup: _,
		fetchUser: v,
		init: y,
		logout: b
	};
});
//#endregion
export { o as t };

//# sourceMappingURL=useAuthStore-DdW4mkuI.js.map