import { t as e, y as t } from "./client-CSOeqVlU.js";
import { t as n } from "./useApiBase-CV_r-Kk4.js";
import { t as r } from "./useAuthStore-D_bFae0K.js";
import { t as i } from "./users-D9IGQJNM.js";
import { computed as a, ref as o, watch as s } from "vue";
import { defineStore as c } from "pinia";
//#region src/stores/useProfileStore.ts
var l = "phlix.active_profile", u = l;
function d(e) {
	return `${l}.${e}`;
}
function f(e) {
	if (typeof localStorage > "u" || e === null) return null;
	let t = localStorage.getItem(d(e));
	return typeof t == "string" && t !== "" ? t : null;
}
function p(e, t) {
	if (typeof localStorage > "u" || e === null) return;
	let n = d(e);
	t === null ? localStorage.removeItem(n) : localStorage.setItem(n, t);
}
function m() {
	typeof localStorage > "u" || localStorage.removeItem(u);
}
var h = c("profile", () => {
	let c = r(), l = n();
	function u() {
		let e = c.user?.id;
		return typeof e == "string" && e !== "" ? e : null;
	}
	let d = u();
	m();
	let h = o([]), g = o(!1), _ = o(!1), v = o(null), y = o(f(d)), b = o(null), x = o(!1), S = o(!1), C = o(0), w = null;
	function T(t) {
		return w ? w.setBaseUrl(t) : w = new e({ baseUrl: t }), new i(w);
	}
	let E = a(() => h.value.length > 1), D = a(() => h.value.find((e) => e.id === y.value) ?? null), O = a(() => _.value && h.value.length > 1 && !x.value), k = a(() => y.value ?? "account");
	async function A(e = !1) {
		if (!g.value && !(_.value && !e)) {
			g.value = !0, v.value = null;
			try {
				let e = await T(l.value).listOwnProfiles();
				h.value = e, _.value = !0;
				let t = e.find((e) => e.is_active)?.id ?? null;
				t !== null && t !== y.value && (y.value = t, p(d, t));
			} catch (e) {
				v.value = t(e, "Could not load your profiles.");
			} finally {
				g.value = !1;
			}
		}
	}
	function j() {
		return _.value = !1, A();
	}
	async function M(e) {
		if (e === "") return v.value = "Cannot switch to an unknown profile.", !1;
		if (e === y.value) return x.value = !0, S.value = !1, !0;
		b.value = e, v.value = null;
		try {
			let t = await T(l.value).switchProfile(e);
			return c.setTokens(t.access_token, t.refresh_token), t.user && typeof t.user == "object" && (c.user = t.user), y.value = t.profile_id ?? e, p(d, y.value), x.value = !0, S.value = !1, h.value = h.value.map((e) => ({
				...e,
				is_active: e.id === y.value
			})), !0;
		} catch (e) {
			return v.value = t(e, "Could not switch profiles."), !1;
		} finally {
			b.value = null;
		}
	}
	function N() {
		x.value = !0, S.value = !1;
	}
	function P() {
		x.value = !1, S.value = !0, !_.value && !g.value && j();
	}
	async function F(e) {
		v.value = null;
		try {
			return await T(l.value).createOwnProfile({ name: e }), await A(!0), !0;
		} catch (e) {
			return v.value = t(e, "Could not create the profile."), !1;
		}
	}
	async function I(e, n) {
		v.value = null;
		try {
			return await T(l.value).updateOwnProfile(e, { name: n }), await A(!0), !0;
		} catch (e) {
			return v.value = t(e, "Could not rename the profile."), !1;
		}
	}
	async function L(e) {
		v.value = null;
		try {
			await T(l.value).removeOwnProfile(e);
			let t = e === y.value;
			return t && (y.value = null, p(d, null)), await A(!0), t && y.value !== null && (C.value += 1), !0;
		} catch (e) {
			return v.value = t(e, "Could not delete the profile."), !1;
		}
	}
	function R() {
		h.value = [], g.value = !1, _.value = !1, v.value = null, b.value = null, x.value = !1, S.value = !1, y.value = null, p(d, null);
	}
	return s(y, (e, t) => {
		t !== null && e !== t && (C.value += 1);
	}), s(() => c.isLoggedIn, (e) => {
		e || R();
	}), s(u, (e, t) => {
		e !== null && e !== t && (d = e, y.value === null && (y.value = f(e)));
	}), {
		profiles: h,
		loading: g,
		loaded: _,
		error: v,
		activeProfileId: y,
		switchingId: b,
		choiceMade: x,
		arming: S,
		epoch: C,
		hasMultipleProfiles: E,
		activeProfile: D,
		gateOpen: O,
		scopeKey: k,
		load: A,
		retry: j,
		switchTo: M,
		createProfile: F,
		rename: I,
		removeProfile: L,
		acknowledgeChoice: N,
		openGate: P,
		reset: R
	};
});
//#endregion
export { d as n, h as r, l as t };

//# sourceMappingURL=useProfileStore-BphhtRWe.js.map