import { n as e } from "./Button-BFaMKqH5.js";
import { t } from "./tokenStore-CGMYSpg6.js";
import { computed as n, inject as r, ref as i } from "vue";
import { defineStore as a } from "pinia";
//#region src/stores/useAuthStore.ts
var o = a("auth", () => {
	let a = new t(), o = new e({
		tokenStore: a,
		baseUrl: r("apiBase", "")
	}), s = i(null), c = i(!1), l = i(null), u = i(a.getAccessToken()), d = n(() => u.value !== null), f = n(() => s.value?.is_admin === !0);
	function p(e, t) {
		a.setAccessToken(e), a.setRefreshToken(t), u.value = e;
	}
	async function m(e, t) {
		c.value = !0, l.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await o.post("/api/v1/auth/login", n);
			return p(r.access_token, r.refresh_token), await g(), !0;
		} catch (e) {
			return l.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			c.value = !1;
		}
	}
	async function h(e, t, n) {
		c.value = !0, l.value = null;
		try {
			let r = await o.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return p(r.access_token, r.refresh_token), await g(), !0;
		} catch (e) {
			return l.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			c.value = !1;
		}
	}
	async function g() {
		if (d.value) try {
			s.value = await o.getCurrentUser();
		} catch {
			s.value = null, a.clear(), u.value = null;
		}
	}
	function _() {
		a.clear(), u.value = null, s.value = null;
	}
	return {
		user: s,
		loading: c,
		error: l,
		isLoggedIn: d,
		isAdmin: f,
		client: o,
		login: m,
		signup: h,
		fetchUser: g,
		logout: _
	};
});
//#endregion
export { o as t };

//# sourceMappingURL=useAuthStore-C0zrA0HV.js.map