import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { Fragment as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, openBlock as l, ref as u, renderList as d, toDisplayString as f, watch as p } from "vue";
import { defineStore as m } from "pinia";
//#region src/components/ui/HelpText.vue?vue&type=script&setup=true&lang.ts
var h = { class: "phlix-help-text" }, g = { class: "phlix-help-text__paragraph" }, _ = {
	key: 0,
	class: "phlix-help-text__links"
}, v = ["href"], y = /*#__PURE__*/ e(/* @__PURE__ */ c({
	__name: "HelpText",
	props: {
		text: {},
		links: { default: void 0 }
	},
	setup(e) {
		return (c, u) => (l(), i("div", h, [a("p", g, f(e.text), 1), e.links && e.links.length ? (l(), i("ul", _, [(l(!0), i(n, null, d(e.links, (e) => (l(), i("li", { key: e.url }, [a("a", {
			href: e.url,
			target: "_blank",
			rel: "noopener noreferrer",
			class: "phlix-help-text__link"
		}, [o(f(e.text) + " ", 1), s(t, {
			name: "external-link",
			size: .85,
			"aria-hidden": "true"
		})], 8, v)]))), 128))])) : r("", !0)]));
	}
}), [["__scopeId", "data-v-46906a06"]]), b = "phlix-settings-prefs", x = { advancedMode: !1 };
function S() {
	if (typeof localStorage > "u") return { ...x };
	try {
		let e = localStorage.getItem(b);
		if (!e) return { ...x };
		let t = JSON.parse(e);
		return {
			...x,
			...t
		};
	} catch {
		return { ...x };
	}
}
var C = m("phlix-settings-prefs", () => {
	let e = u(S().advancedMode);
	function t(t) {
		e.value = t;
	}
	function n() {
		e.value = !e.value;
	}
	function r() {
		return { advancedMode: e.value };
	}
	return p(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(b, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		advancedMode: e,
		setAdvancedMode: t,
		toggleAdvancedMode: n
	};
});
//#endregion
export { y as n, C as t };

//# sourceMappingURL=useSettingsPrefs-CCSyOWj_.js.map