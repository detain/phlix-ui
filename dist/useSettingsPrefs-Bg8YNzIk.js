import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./IconButton-BBHxcjCo.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { t as i } from "./useMessages-DvTTvQB1.js";
import { Fragment as a, Teleport as o, Transition as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, nextTick as g, normalizeStyle as _, onBeforeUnmount as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, useId as w, watch as T, withCtx as E } from "vue";
import { defineStore as D } from "pinia";
//#region src/components/ui/HelpText.vue?vue&type=script&setup=true&lang.ts
var O = { class: "phlix-help-text" }, k = { class: "phlix-help-text__paragraph" }, A = {
	key: 0,
	class: "phlix-help-text__links"
}, j = ["href"], M = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "HelpText",
	props: {
		text: {},
		links: { default: void 0 }
	},
	setup(e) {
		return (n, r) => (y(), d("div", O, [f("p", k, S(e.text), 1), e.links && e.links.length ? (y(), d("ul", A, [(y(!0), d(a, null, x(e.links, (e) => (y(), d("li", { key: e.url }, [f("a", {
			href: e.url,
			target: "_blank",
			rel: "noopener noreferrer",
			class: "phlix-help-text__link"
		}, [p(S(e.text) + " ", 1), m(t, {
			name: "external-link",
			size: .85,
			"aria-hidden": "true"
		})], 8, j)]))), 128))])) : u("", !0)]));
	}
}), [["__scopeId", "data-v-46906a06"]]), N = { class: "phlix-help-popover" }, P = [
	"aria-expanded",
	"aria-controls",
	"aria-label"
], F = { class: "phlix-help-popover__header" }, I = { class: "phlix-help-popover__title" }, L = { class: "phlix-help-popover__body" }, R = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "HelpPopover",
	props: {
		helpText: {},
		helpLinks: { default: void 0 },
		title: { default: void 0 },
		fieldLabel: { default: void 0 }
	},
	setup(e) {
		let { t: a } = i(), p = e, h = `phlix-help-popover-${w()}`, x = c(() => p.fieldLabel ? `Help for ${p.fieldLabel}` : "Help"), D = b(!1), O = b(null), k = b(null), A = b({});
		function j() {
			D.value || (D.value = !0, g(() => {
				B(), k.value?.querySelector("button,[contenteditable]")?.focus?.();
			}));
		}
		function R() {
			D.value = !1, O.value?.focus();
		}
		function z() {
			D.value ? R() : j();
		}
		function B() {
			if (!O.value) return;
			let e = O.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = k.value?.offsetWidth ?? 320, i = k.value?.offsetHeight ?? 200, a = n - e.bottom, o = a < i + 6 && e.top > a, s = e.left;
			s + r > t - 8 && (s = t - r - 8), s < 8 && (s = 8);
			let c = o ? Math.max(8, e.top - i - 6) : e.bottom + 6;
			A.value = {
				left: `${Math.round(s)}px`,
				top: `${Math.round(c)}px`
			};
		}
		function V(e) {
			D.value && O.value && k.value && !O.value.contains(e.target) && !k.value.contains(e.target) && R();
		}
		return T(D, (e) => {
			e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", V, !0);
		}), r(k, D, { onEscape: () => (R(), !0) }), (r, i) => (y(), d("span", N, [f("button", {
			ref_key: "triggerEl",
			ref: O,
			type: "button",
			class: "phlix-help-popover__trigger",
			"aria-expanded": D.value,
			"aria-controls": D.value ? h : void 0,
			"aria-label": x.value,
			onClick: z
		}, [m(t, {
			name: "info",
			size: .9
		}), i[0] ||= f("span", { class: "phlix-help-popover__badge" }, "?", -1)], 8, P), (y(), l(o, { to: "body" }, [m(s, { name: "phlix-help-popover" }, {
			default: E(() => [D.value ? (y(), d("div", {
				key: 0,
				id: h,
				ref_key: "panelEl",
				ref: k,
				class: "phlix-help-popover__panel",
				style: _(A.value),
				role: "dialog",
				"aria-modal": "false"
			}, [f("header", F, [f("span", I, S(e.title ?? "Help"), 1), m(n, {
				name: "x",
				label: C(a)("common.close"),
				size: "sm",
				class: "phlix-help-popover__close",
				onClick: R
			}, null, 8, ["label"])]), f("div", L, [m(M, {
				text: e.helpText,
				links: e.helpLinks
			}, null, 8, ["text", "links"])])], 4)) : u("", !0)]),
			_: 1
		})]))]));
	}
}), [["__scopeId", "data-v-d48e7fa2"]]), z = "***", B = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async get() {
		let { data: e } = await this.client.get("/api/v1/admin/settings");
		return {
			settings: V(e?.settings) ? e.settings : {},
			overridden: Array.isArray(e?.overridden) ? e.overridden : [],
			types: V(e?.types) ? e.types : {},
			meta: V(e?.meta) ? e.meta : {},
			secretStatus: H(e?.secretStatus)
		};
	}
	async save(e) {
		let { data: t } = await this.client.put("/api/v1/admin/settings", { settings: e });
		return {
			settings: V(t?.settings) ? t.settings : {},
			overridden: Array.isArray(t?.overridden) ? t.overridden : []
		};
	}
	async restartServer() {
		let { data: e } = await this.client.post("/api/v1/admin/restart", {});
		return { message: e?.message ?? "Restart signal sent" };
	}
};
function V(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function H(e) {
	if (!V(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) V(r) && (t[n] = {
		set: r.set === !0,
		length: typeof r.length == "number" && Number.isFinite(r.length) ? r.length : 0
	});
	return t;
}
//#endregion
//#region src/stores/useSettingsPrefs.ts
var U = "phlix-settings-prefs", W = { advancedMode: !1 };
function G() {
	if (typeof localStorage > "u") return { ...W };
	try {
		let e = localStorage.getItem(U);
		if (!e) return { ...W };
		let t = JSON.parse(e);
		return {
			...W,
			...t
		};
	} catch {
		return { ...W };
	}
}
var K = D("phlix-settings-prefs", () => {
	let e = b(G().advancedMode);
	function t(t) {
		e.value = t;
	}
	function n() {
		e.value = !e.value;
	}
	function r() {
		return { advancedMode: e.value };
	}
	return T(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(U, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		advancedMode: e,
		setAdvancedMode: t,
		toggleAdvancedMode: n
	};
});
//#endregion
export { M as a, R as i, B as n, z as r, K as t };

//# sourceMappingURL=useSettingsPrefs-Bg8YNzIk.js.map