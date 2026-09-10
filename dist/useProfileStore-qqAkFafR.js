import { p as e, t } from "./client-DA-5QZXw.js";
import { t as n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-BDRS4qlY.js";
import { t as i } from "./users-BVx6liqw.js";
import { computed as a, ref as o, watch as s } from "vue";
import { defineStore as c } from "pinia";
//#region src/stores/useProfileStore.ts
var l = "phlix.active_profile";
function u() {
	if (typeof localStorage > "u") return null;
	let e = localStorage.getItem(l);
	return typeof e == "string" && e !== "" ? e : null;
}
function d(e) {
	typeof localStorage > "u" || (e === null ? localStorage.removeItem(l) : localStorage.setItem(l, e));
}
var f = c("profile", () => {
	let c = r(), l = n(), f = o([]), p = o(!1), m = o(!1), h = o(null), g = o(u()), _ = o(null), v = o(!1), y = o(!1), b = o(0), x = null;
	function S(e) {
		return x ? x.setBaseUrl(e) : x = new t({ baseUrl: e }), new i(x);
	}
	let C = a(() => f.value.length > 1), w = a(() => f.value.find((e) => e.id === g.value) ?? null), T = a(() => m.value && f.value.length > 1 && !v.value), E = a(() => g.value ?? "account");
	async function D(t = !1) {
		if (!p.value && !(m.value && !t)) {
			p.value = !0, h.value = null;
			try {
				let e = await S(l.value).listOwnProfiles();
				f.value = e, m.value = !0;
				let t = e.find((e) => e.is_active)?.id ?? null;
				t !== null && t !== g.value && (g.value = t, d(t));
			} catch (t) {
				h.value = e(t, "Could not load your profiles.");
			} finally {
				p.value = !1;
			}
		}
	}
	function O() {
		return m.value = !1, D();
	}
	async function k(t) {
		if (t === "") return h.value = "Cannot switch to an unknown profile.", !1;
		if (t === g.value) return v.value = !0, y.value = !1, !0;
		_.value = t, h.value = null;
		try {
			let e = await S(l.value).switchProfile(t);
			return c.setTokens(e.access_token, e.refresh_token), e.user && typeof e.user == "object" && (c.user = e.user), g.value = e.profile_id ?? t, d(g.value), v.value = !0, y.value = !1, f.value = f.value.map((e) => ({
				...e,
				is_active: e.id === g.value
			})), !0;
		} catch (t) {
			return h.value = e(t, "Could not switch profiles."), !1;
		} finally {
			_.value = null;
		}
	}
	function A() {
		v.value = !0, y.value = !1;
	}
	function j() {
		v.value = !1, y.value = !0, !m.value && !p.value && O();
	}
	async function M(t) {
		h.value = null;
		try {
			return await S(l.value).createOwnProfile({ name: t }), await D(!0), !0;
		} catch (t) {
			return h.value = e(t, "Could not create the profile."), !1;
		}
	}
	async function N(t, n) {
		h.value = null;
		try {
			return await S(l.value).updateOwnProfile(t, { name: n }), await D(!0), !0;
		} catch (t) {
			return h.value = e(t, "Could not rename the profile."), !1;
		}
	}
	async function P(t) {
		h.value = null;
		try {
			return await S(l.value).removeOwnProfile(t), t === g.value && (g.value = null, d(null)), await D(!0), !0;
		} catch (t) {
			return h.value = e(t, "Could not delete the profile."), !1;
		}
	}
	function F() {
		f.value = [], p.value = !1, m.value = !1, h.value = null, _.value = null, v.value = !1, y.value = !1, g.value = null, d(null);
	}
	return s(g, (e, t) => {
		t !== null && e !== t && (b.value += 1);
	}), s(() => c.isLoggedIn, (e) => {
		e || F();
	}), {
		profiles: f,
		loading: p,
		loaded: m,
		error: h,
		activeProfileId: g,
		switchingId: _,
		choiceMade: v,
		arming: y,
		epoch: b,
		hasMultipleProfiles: C,
		activeProfile: w,
		gateOpen: T,
		scopeKey: E,
		load: D,
		retry: O,
		switchTo: k,
		createProfile: M,
		rename: N,
		removeProfile: P,
		acknowledgeChoice: A,
		openGate: j,
		reset: F
	};
});
//#endregion
export { f as n, l as t };

//# sourceMappingURL=useProfileStore-qqAkFafR.js.map