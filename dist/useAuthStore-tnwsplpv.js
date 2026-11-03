import { a as e, t, v as n } from "./client-qTKcYNBQ.js";
import { t as r } from "./useApiBase-DXTBY90j.js";
import { t as i } from "./useMessages-DE1anlvL.js";
import { computed as a, inject as o, ref as s, watch as c } from "vue";
import { defineStore as l } from "pinia";
// src/stores/useAuthStore.ts
function u(e) {
	return typeof e == "string" ? e : e?.value ?? "/login";
}
function d(e) {
	return !(e instanceof n) || !e.body || typeof e.body != "object" || !("code" in e.body) ? null : String(e.body.code ?? "") || null;
}
var f = l("auth", () => {
	let l = e(), f = r(), { t: p } = i(), m = o("loginPath", "/login"), h = a(() => u(m)), g = new t({
		tokenStore: l,
		baseUrl: f.value,
		loginPath: h.value
	});
	c(f, (e) => g.setBaseUrl(e));
	let _ = s(null), v = s(!1), y = s(null), b = s(null), x = s(l.getAccessToken()), S = s(!1), C = null, w = a(() => x.value !== null), T = a(() => _.value?.is_admin === !0);
	typeof window < "u" && window.addEventListener("phlix:auth-expired", () => {
		x.value = null, _.value = null;
	});
	function E(e, t) {
		l.setAccessToken(e), l.setRefreshToken(t), x.value = e;
	}
	async function D(e, t) {
		v.value = !0, y.value = null, b.value = null;
		try {
			let n = {
				username: e,
				password: t
			};
			e.includes("@") && (n.email = e);
			let r = await g.post("/api/v1/auth/login", n);
			return E(r.access_token, r.refresh_token), await k(), w.value;
		} catch (e) {
			return y.value = e instanceof Error ? e.message : p("auth.signInFailed"), b.value = d(e), !1;
		} finally {
			v.value = !1;
		}
	}
	async function O(e, t, n) {
		v.value = !0, y.value = null, b.value = null;
		try {
			let r = await g.post("/api/v1/auth/register", {
				email: e,
				username: t,
				password: n
			});
			return E(r.access_token, r.refresh_token), await k(), w.value;
		} catch (e) {
			return y.value = e instanceof Error ? e.message : p("auth.signupFailed"), b.value = d(e), !1;
		} finally {
			v.value = !1;
		}
	}
	async function k() {
		if (!w.value) return "valid";
		b.value = null;
		try {
			return _.value = await g.getCurrentUser(), "valid";
		} catch (e) {
			return b.value = d(e), _.value = null, e instanceof n ? (l.clear(), x.value = null, "invalid") : (y.value = e instanceof Error ? e.message : p("auth.serverUnreachable"), "unreachable");
		}
	}
	async function A() {
		if (!S.value) return C === null && (C = k().then((e) => {
			e === "unreachable" ? C = null : S.value = !0;
		})), C;
	}
	function j() {
		g.logout(!1), x.value = null, _.value = null, typeof window < "u" && (window.location.href = h.value);
	}
	async function M(e) {
		v.value = !0, y.value = null, b.value = null;
		try {
			let t = await g.uploadAvatar(e);
			_.value && (_.value.avatar_url = t.avatar_url);
		} catch (e) {
			throw y.value = e instanceof Error ? e.message : "Avatar upload failed", b.value = d(e), e;
		} finally {
			v.value = !1;
		}
	}
	async function N() {
		v.value = !0, y.value = null, b.value = null;
		try {
			await g.deleteAvatar(), _.value && (_.value.avatar_url = null);
		} catch (e) {
			throw y.value = e instanceof Error ? e.message : "Avatar deletion failed", b.value = d(e), e;
		} finally {
			v.value = !1;
		}
	}
	return {
		user: _,
		loading: v,
		error: y,
		errorCode: b,
		isLoggedIn: w,
		isAdmin: T,
		client: g,
		login: D,
		signup: O,
		setTokens: E,
		fetchUser: k,
		init: A,
		logout: j,
		uploadAvatar: M,
		deleteAvatar: N
	};
});
export { f as t };

//# sourceMappingURL=useAuthStore-tnwsplpv.js.map