import { t as e } from "./useMessages-CtPA8i1l.js";
import { g as t, l as n, t as r } from "./client-BoMeMmx0.js";
import { t as i } from "./useApiBase-CV_r-Kk4.js";
import { computed as a, inject as o, ref as s, watch as c } from "vue";
import { defineStore as l } from "pinia";
//#region src/stores/useAuthStore.ts
function u(e) {
	return typeof e == "string" ? e : e?.value ?? "/login";
}
function d(e) {
	return !(e instanceof t) || !e.body || typeof e.body != "object" || !("code" in e.body) ? null : String(e.body.code ?? "") || null;
}
var f = l("auth", () => {
	let t = new n(), l = i(), { t: f } = e(), p = o("loginPath", "/login"), m = a(() => u(p)), h = new r({
		tokenStore: t,
		baseUrl: l.value,
		loginPath: m.value
	});
	c(l, (e) => h.setBaseUrl(e));
	let g = s(null), _ = s(!1), v = s(null), y = s(null), b = s(t.getAccessToken()), x = s(!1), S = null, C = a(() => b.value !== null), w = a(() => g.value?.is_admin === !0);
	function T(e, n) {
		t.setAccessToken(e), t.setRefreshToken(n), b.value = e;
	}
	async function E(e, t) {
		_.value = !0, v.value = null, y.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await h.post("/api/v1/auth/login", n);
			return T(r.access_token, r.refresh_token), await O(), C.value;
		} catch (e) {
			return v.value = e instanceof Error ? e.message : f("auth.signInFailed"), y.value = d(e), !1;
		} finally {
			_.value = !1;
		}
	}
	async function D(e, t, n) {
		_.value = !0, v.value = null, y.value = null;
		try {
			let r = await h.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return T(r.access_token, r.refresh_token), await O(), C.value;
		} catch (e) {
			return v.value = e instanceof Error ? e.message : f("auth.signupFailed"), y.value = d(e), !1;
		} finally {
			_.value = !1;
		}
	}
	async function O() {
		if (C.value) {
			y.value = null;
			try {
				g.value = await h.getCurrentUser();
			} catch (e) {
				y.value = d(e), g.value = null, t.clear(), b.value = null;
			}
		}
	}
	async function k() {
		if (!x.value) return S === null && (S = O().finally(() => {
			x.value = !0;
		})), S;
	}
	function A() {
		h.logout(!1), b.value = null, g.value = null, typeof window < "u" && (window.location.href = m.value);
	}
	async function j(e) {
		_.value = !0, v.value = null, y.value = null;
		try {
			let t = await h.uploadAvatar(e);
			g.value && (g.value.avatar_url = t.avatar_url);
		} catch (e) {
			throw v.value = e instanceof Error ? e.message : "Avatar upload failed", y.value = d(e), e;
		} finally {
			_.value = !1;
		}
	}
	async function M() {
		_.value = !0, v.value = null, y.value = null;
		try {
			await h.deleteAvatar(), g.value && (g.value.avatar_url = null);
		} catch (e) {
			throw v.value = e instanceof Error ? e.message : "Avatar deletion failed", y.value = d(e), e;
		} finally {
			_.value = !1;
		}
	}
	return {
		user: g,
		loading: _,
		error: v,
		errorCode: y,
		isLoggedIn: C,
		isAdmin: w,
		client: h,
		login: E,
		signup: D,
		setTokens: T,
		fetchUser: O,
		init: k,
		logout: A,
		uploadAvatar: j,
		deleteAvatar: M
	};
});
//#endregion
export { f as t };

//# sourceMappingURL=useAuthStore-9fn4zAD6.js.map