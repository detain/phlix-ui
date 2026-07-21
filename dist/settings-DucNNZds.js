import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { t as n } from "./IconButton-BBHxcjCo.js";
import { t as r } from "./useFocusTrap-DZxA3ZEr.js";
import { t as i } from "./useMessages-DvTTvQB1.js";
import { n as a } from "./useSettingsPrefs-CCSyOWj_.js";
import { Teleport as o, Transition as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createVNode as p, defineComponent as m, nextTick as h, normalizeStyle as g, onBeforeUnmount as _, openBlock as v, ref as y, toDisplayString as b, unref as x, useId as S, watch as C, withCtx as w } from "vue";
//#region src/components/ui/HelpPopover.vue?vue&type=script&setup=true&lang.ts
var T = { class: "phlix-help-popover" }, E = [
	"aria-expanded",
	"aria-controls",
	"aria-label"
], D = { class: "phlix-help-popover__header" }, O = { class: "phlix-help-popover__title" }, k = { class: "phlix-help-popover__body" }, A = /*#__PURE__*/ e(/* @__PURE__ */ m({
	__name: "HelpPopover",
	props: {
		helpText: {},
		helpLinks: { default: void 0 },
		title: { default: void 0 },
		fieldLabel: { default: void 0 }
	},
	setup(e) {
		let { t: m } = i(), A = e, j = `phlix-help-popover-${S()}`, M = c(() => A.fieldLabel ? `Help for ${A.fieldLabel}` : "Help"), N = y(!1), P = y(null), F = y(null), I = y({});
		function L() {
			N.value || (N.value = !0, h(() => {
				B(), F.value?.querySelector("button,[contenteditable]")?.focus?.();
			}));
		}
		function R() {
			N.value = !1, P.value?.focus();
		}
		function z() {
			N.value ? R() : L();
		}
		function B() {
			if (!P.value) return;
			let e = P.value.getBoundingClientRect(), t = window.innerWidth, n = window.innerHeight, r = F.value?.offsetWidth ?? 320, i = F.value?.offsetHeight ?? 200, a = n - e.bottom, o = a < i + 6 && e.top > a, s = e.left;
			s + r > t - 8 && (s = t - r - 8), s < 8 && (s = 8);
			let c = o ? Math.max(8, e.top - i - 6) : e.bottom + 6;
			I.value = {
				left: `${Math.round(s)}px`,
				top: `${Math.round(c)}px`
			};
		}
		function V(e) {
			N.value && P.value && F.value && !P.value.contains(e.target) && !F.value.contains(e.target) && R();
		}
		return C(N, (e) => {
			e ? document.addEventListener("pointerdown", V, !0) : document.removeEventListener("pointerdown", V, !0);
		}), _(() => {
			document.removeEventListener("pointerdown", V, !0);
		}), r(F, N, { onEscape: () => (R(), !0) }), (r, i) => (v(), d("span", T, [f("button", {
			ref_key: "triggerEl",
			ref: P,
			type: "button",
			class: "phlix-help-popover__trigger",
			"aria-expanded": N.value,
			"aria-controls": N.value ? j : void 0,
			"aria-label": M.value,
			onClick: z
		}, [p(t, {
			name: "info",
			size: .9
		}), i[0] ||= f("span", { class: "phlix-help-popover__badge" }, "?", -1)], 8, E), (v(), l(o, { to: "body" }, [p(s, { name: "phlix-help-popover" }, {
			default: w(() => [N.value ? (v(), d("div", {
				key: 0,
				id: j,
				ref_key: "panelEl",
				ref: F,
				class: "phlix-help-popover__panel",
				style: g(I.value),
				role: "dialog",
				"aria-modal": "false"
			}, [f("header", D, [f("span", O, b(e.title ?? "Help"), 1), p(n, {
				name: "x",
				label: x(m)("common.close"),
				size: "sm",
				class: "phlix-help-popover__close",
				onClick: R
			}, null, 8, ["label"])]), f("div", k, [p(a, {
				text: e.helpText,
				links: e.helpLinks
			}, null, 8, ["text", "links"])])], 4)) : u("", !0)]),
			_: 1
		})]))]));
	}
}), [["__scopeId", "data-v-d48e7fa2"]]), j = "***", M = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async get() {
		let { data: e } = await this.client.get("/api/v1/admin/settings");
		return {
			settings: N(e?.settings) ? e.settings : {},
			overridden: Array.isArray(e?.overridden) ? e.overridden : [],
			types: N(e?.types) ? e.types : {},
			meta: N(e?.meta) ? e.meta : {},
			secretStatus: P(e?.secretStatus)
		};
	}
	async save(e) {
		let { data: t } = await this.client.put("/api/v1/admin/settings", { settings: e });
		return {
			settings: N(t?.settings) ? t.settings : {},
			overridden: Array.isArray(t?.overridden) ? t.overridden : []
		};
	}
	async restartServer() {
		let { data: e } = await this.client.post("/api/v1/admin/restart", {});
		return { message: e?.message ?? "Restart signal sent" };
	}
};
function N(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function P(e) {
	if (!N(e)) return {};
	let t = {};
	for (let [n, r] of Object.entries(e)) N(r) && (t[n] = {
		set: r.set === !0,
		length: typeof r.length == "number" && Number.isFinite(r.length) ? r.length : 0
	});
	return t;
}
//#endregion
export { j as n, A as r, M as t };

//# sourceMappingURL=settings-DucNNZds.js.map