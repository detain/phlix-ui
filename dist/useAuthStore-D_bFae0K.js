import { g as e, l as t, t as n } from "./client-CSOeqVlU.js";
import { t as r } from "./useApiBase-CV_r-Kk4.js";
import { computed as i, inject as a, ref as o, watch as s } from "vue";
import { defineStore as c } from "pinia";
//#region src/stores/useAuthStore.ts
function l(e) {
	return typeof e == "string" ? e : e?.value ?? "/login";
}
function u(t) {
	return !(t instanceof e) || !t.body || typeof t.body != "object" || !("code" in t.body) ? null : String(t.body.code ?? "") || null;
}
var d = c("auth", () => {
	let e = new t(), c = r(), d = a("loginPath", "/login"), f = i(() => l(d)), p = new n({
		tokenStore: e,
		baseUrl: c.value,
		loginPath: f.value
	});
	s(c, (e) => p.setBaseUrl(e));
	let m = o(null), h = o(!1), g = o(null), _ = o(null), v = o(e.getAccessToken()), y = o(!1), b = null, x = i(() => v.value !== null), S = i(() => m.value?.is_admin === !0);
	function C(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), v.value = t;
	}
	async function w(e, t) {
		h.value = !0, g.value = null, _.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await p.post("/api/v1/auth/login", n);
			return C(r.access_token, r.refresh_token), await E(), x.value;
		} catch (e) {
			return g.value = e instanceof Error ? e.message : "Login failed", _.value = u(e), !1;
		} finally {
			h.value = !1;
		}
	}
	async function T(e, t, n) {
		h.value = !0, g.value = null, _.value = null;
		try {
			let r = await p.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return C(r.access_token, r.refresh_token), await E(), x.value;
		} catch (e) {
			return g.value = e instanceof Error ? e.message : "Registration failed", _.value = u(e), !1;
		} finally {
			h.value = !1;
		}
	}
	async function E() {
		if (x.value) {
			_.value = null;
			try {
				m.value = await p.getCurrentUser();
			} catch (t) {
				_.value = u(t), m.value = null, e.clear(), v.value = null;
			}
		}
	}
	async function D() {
		if (!y.value) return b === null && (b = E().finally(() => {
			y.value = !0;
		})), b;
	}
	function O() {
		p.logout(!1), v.value = null, m.value = null, typeof window < "u" && (window.location.href = f.value);
	}
	async function k(e) {
		h.value = !0, g.value = null, _.value = null;
		try {
			let t = await p.uploadAvatar(e);
			m.value && (m.value.avatar_url = t.avatar_url);
		} catch (e) {
			throw g.value = e instanceof Error ? e.message : "Avatar upload failed", _.value = u(e), e;
		} finally {
			h.value = !1;
		}
	}
	async function A() {
		h.value = !0, g.value = null, _.value = null;
		try {
			await p.deleteAvatar(), m.value && (m.value.avatar_url = null);
		} catch (e) {
			throw g.value = e instanceof Error ? e.message : "Avatar deletion failed", _.value = u(e), e;
		} finally {
			h.value = !1;
		}
	}
	return {
		user: m,
		loading: h,
		error: g,
		errorCode: _,
		isLoggedIn: x,
		isAdmin: S,
		client: p,
		login: w,
		signup: T,
		setTokens: C,
		fetchUser: E,
		init: D,
		logout: O,
		uploadAvatar: k,
		deleteAvatar: A
	};
});
//#endregion
export { d as t };

//# sourceMappingURL=useAuthStore-D_bFae0K.js.map