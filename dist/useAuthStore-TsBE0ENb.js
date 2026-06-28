import { c as e, t } from "./client-7SOKWho6.js";
import { t as n } from "./useApiBase-CV_r-Kk4.js";
import { computed as r, ref as i, watch as a } from "vue";
import { defineStore as o } from "pinia";
//#region src/stores/useAuthStore.ts
var s = o("auth", () => {
	let o = new e(), s = n(), c = new t({
		tokenStore: o,
		baseUrl: s.value
	});
	a(s, (e) => c.setBaseUrl(e));
	let l = i(null), u = i(!1), d = i(null), f = i(o.getAccessToken()), p = i(!1), m = null, h = r(() => f.value !== null), g = r(() => l.value?.is_admin === !0);
	function _(e, t) {
		o.setAccessToken(e), o.setRefreshToken(t), f.value = e;
	}
	async function v(e, t) {
		u.value = !0, d.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await c.post("/api/v1/auth/login", n);
			return _(r.access_token, r.refresh_token), await b(), h.value;
		} catch (e) {
			return d.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			u.value = !1;
		}
	}
	async function y(e, t, n) {
		u.value = !0, d.value = null;
		try {
			let r = await c.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return _(r.access_token, r.refresh_token), await b(), h.value;
		} catch (e) {
			return d.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			u.value = !1;
		}
	}
	async function b() {
		if (h.value) try {
			l.value = await c.getCurrentUser();
		} catch {
			l.value = null, o.clear(), f.value = null;
		}
	}
	async function x() {
		if (!p.value) return m === null && (m = b().finally(() => {
			p.value = !0;
		})), m;
	}
	function S() {
		o.clear(), f.value = null, l.value = null;
	}
	return {
		user: l,
		loading: u,
		error: d,
		isLoggedIn: h,
		isAdmin: g,
		client: c,
		login: v,
		signup: y,
		fetchUser: b,
		init: x,
		logout: S
	};
});
//#endregion
export { s as t };

//# sourceMappingURL=useAuthStore-TsBE0ENb.js.map