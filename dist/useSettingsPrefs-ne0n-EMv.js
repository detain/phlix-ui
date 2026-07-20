import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./IconButton-BBHxcjCo.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { t as i } from "./useMessages-CMPz9FmM.js";
import { Fragment as a, Teleport as o, Transition as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, nextTick as g, normalizeStyle as _, onBeforeUnmount as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, watch as w, withCtx as T } from "vue";
import { defineStore as E } from "pinia";
//#region src/components/ui/HelpText.vue?vue&type=script&setup=true&lang.ts
var D = { class: "phlix-help-text" }, O = { class: "phlix-help-text__paragraph" }, k = {
	key: 0,
	class: "phlix-help-text__links"
}, A = ["href"], j = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "HelpText",
	props: {
		text: {},
		links: { default: void 0 }
	},
	setup(e) {
		return (n, r) => (y(), d("div", D, [f("p", O, S(e.text), 1), e.links && e.links.length ? (y(), d("ul", k, [(y(!0), d(a, null, x(e.links, (e) => (y(), d("li", { key: e.url }, [f("a", {
			href: e.url,
			target: "_blank",
			rel: "noopener noreferrer",
			class: "phlix-help-text__link"
		}, [p(S(e.text) + " ", 1), m(t, {
			name: "external-link",
			size: .85,
			"aria-hidden": "true"
		})], 8, A)]))), 128))])) : u("", !0)]));
	}
}), [["__scopeId", "data-v-46906a06"]]), M = { class: "phlix-help-popover" }, N = ["aria-expanded", "aria-controls"], P = ["id"], F = {
	key: 0,
	class: "phlix-help-popover__header"
}, I = { class: "phlix-help-popover__title" }, L = { class: "phlix-help-popover__body" }, R = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "HelpPopover",
	props: {
		helpText: {},
		helpLinks: { default: void 0 },
		title: { default: void 0 }
	},
	setup(e) {
		let { t: a } = i(), p = c(() => `phlix-help-popover-${Math.random().toString(36).slice(2)}`), h = b(!1), x = b(null), E = b(null), D = b({});
		function O() {
			h.value || (h.value = !0, g(() => {
				R(), E.value?.querySelector("button,[contenteditable]")?.focus?.();
			}));
		}
		function k() {
			h.value = !1, x.value?.focus();
		}
		function A() {
			h.value ? k() : O();
		}
		function R() {
			if (!x.value) return;
			let e = x.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = E.value?.offsetWidth ?? 320, i = E.value?.offsetHeight ?? 200, a = n - e.bottom, o = a < i + 6 && e.top > a, s = e.left;
			s + r > t - 8 && (s = t - r - 8), s < 8 && (s = 8);
			let c = o ? Math.max(8, e.top - i - 6) : e.bottom + 6;
			D.value = {
				left: `${Math.round(s)}px`,
				top: `${Math.round(c)}px`
			};
		}
		function z(e) {
			h.value && x.value && E.value && !x.value.contains(e.target) && !E.value.contains(e.target) && k();
		}
		return w(h, (e) => {
			e ? document.addEventListener("pointerdown", z, !0) : document.removeEventListener("pointerdown", z, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", z, !0);
		}), r(E, h, { onEscape: () => (k(), !0) }), (r, i) => (y(), d("span", M, [f("button", {
			ref_key: "triggerEl",
			ref: x,
			type: "button",
			class: "phlix-help-popover__trigger",
			"aria-expanded": h.value,
			"aria-controls": h.value ? p.value : void 0,
			"aria-label": "Help",
			onClick: A
		}, [m(t, {
			name: "info",
			size: .9
		}), i[0] ||= f("span", { class: "phlix-help-popover__badge" }, "?", -1)], 8, N), (y(), l(o, { to: "body" }, [m(s, { name: "phlix-help-popover" }, {
			default: T(() => [h.value ? (y(), d("div", {
				key: 0,
				id: p.value,
				ref_key: "panelEl",
				ref: E,
				class: "phlix-help-popover__panel",
				style: _(D.value),
				role: "dialog",
				"aria-modal": "false"
			}, [(e.title, y(), d("header", F, [f("span", I, S(e.title ?? "Help"), 1), m(n, {
				name: "x",
				label: C(a)("common.close"),
				size: "sm",
				class: "phlix-help-popover__close",
				onClick: k
			}, null, 8, ["label"])])), f("div", L, [m(j, {
				text: e.helpText,
				links: e.helpLinks
			}, null, 8, ["text", "links"])])], 12, P)) : u("", !0)]),
			_: 1
		})]))]));
	}
}), [["__scopeId", "data-v-40bbd270"]]), z = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async get() {
		let { data: e } = await this.client.get("/api/v1/admin/settings");
		return {
			settings: B(e?.settings) ? e.settings : {},
			overridden: Array.isArray(e?.overridden) ? e.overridden : [],
			types: B(e?.types) ? e.types : {},
			meta: B(e?.meta) ? e.meta : {}
		};
	}
	async save(e) {
		let { data: t } = await this.client.put("/api/v1/admin/settings", { settings: e });
		return {
			settings: B(t?.settings) ? t.settings : {},
			overridden: Array.isArray(t?.overridden) ? t.overridden : []
		};
	}
	async restartServer() {
		let { data: e } = await this.client.post("/api/v1/admin/restart", {});
		return { message: e?.message ?? "Restart signal sent" };
	}
};
function B(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
//#endregion
//#region src/stores/useSettingsPrefs.ts
var V = "phlix-settings-prefs", H = { advancedMode: !1 };
function U() {
	if (typeof localStorage > "u") return { ...H };
	try {
		let e = localStorage.getItem(V);
		if (!e) return { ...H };
		let t = JSON.parse(e);
		return {
			...H,
			...t
		};
	} catch {
		return { ...H };
	}
}
var W = E("phlix-settings-prefs", () => {
	let e = b(U().advancedMode);
	function t(t) {
		e.value = t;
	}
	function n() {
		e.value = !e.value;
	}
	function r() {
		return { advancedMode: e.value };
	}
	return w(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(V, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		advancedMode: e,
		setAdvancedMode: t,
		toggleAdvancedMode: n
	};
});
//#endregion
export { j as i, z as n, R as r, W as t };

//# sourceMappingURL=useSettingsPrefs-ne0n-EMv.js.map