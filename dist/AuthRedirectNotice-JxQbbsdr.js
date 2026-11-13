import { x as e, y as t } from "./client-Bmlfq3Uy.js";
import { n } from "./Icon-55iG1rR7.js";
import { computed as r, createCommentVNode as i, createElementBlock as a, defineComponent as o, inject as s, normalizeClass as c, openBlock as l, toDisplayString as u } from "vue";
import { useRoute as d } from "vue-router";
// src/utils/redirectEnvelope.ts
var f = {
	internal: "unknown_error",
	password_change_required: "auth.password_change_required"
}, p = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)*$/;
function m(e) {
	let t = Array.isArray(e) ? e[0] : e;
	return typeof t == "string" && t.trim() !== "" ? t : null;
}
function h(n, r) {
	let i = m(n.error), a = m(n.notice), o = i ?? a;
	if (o === null) return null;
	let s = m(n.code), c = s === null && i !== null && p.test(i) ? i : null, l = s ?? c;
	l !== null && !e(l) && f[l] && (l = f[l]);
	let u = c !== null && !e(l) ? null : o;
	return {
		kind: i === null ? "notice" : "error",
		message: t(l, r, u),
		code: l
	};
}
// src/components/auth/AuthRedirectNotice.vue?vue&type=script&setup=true&lang.ts
var g = ["role", "data-code"], _ = /*#__PURE__*/ n(/* @__PURE__ */ o({
	__name: "AuthRedirectNotice",
	setup(e) {
		let t = d(), n = s("phlixConfig", null), o = r(() => h(t.query, n?.locale));
		return (e, t) => o.value ? (l(), a("p", {
			key: 0,
			class: c(["auth-redirect", `auth-redirect--${o.value.kind}`]),
			role: o.value.kind === "error" ? "alert" : "status",
			"data-code": o.value.code ?? void 0
		}, u(o.value.message), 11, g)) : i("", !0);
	}
}), [["__scopeId", "data-v-967789c5"]]);
export { _ as t };

//# sourceMappingURL=AuthRedirectNotice-JxQbbsdr.js.map