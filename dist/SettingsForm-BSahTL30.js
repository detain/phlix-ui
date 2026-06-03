import { n as e, t } from "./Icon-ax5k7_G2.js";
import { i as n, t as r } from "./Button-BFaMKqH5.js";
import { t as i } from "./useAuthStore-M0VE53Rh.js";
import { t as a } from "./Switch-CFZhdkXR.js";
import { r as o } from "./Select-bu72i41G.js";
import { t as s } from "./useToastStore-BDoKlU6N.js";
import { n as c, t as l } from "./EmptyState-Ds4WcVdG.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, normalizeClass as y, onMounted as b, openBlock as x, ref as S, renderList as C, renderSlot as w, toDisplayString as T, useId as E, withCtx as D } from "vue";
//#region src/components/ui/Tabs.vue?vue&type=script&setup=true&lang.ts
var O = { class: "phlix-tabs" }, k = ["aria-label"], A = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], j = ["id", "aria-labelledby"], M = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: n }) {
		let r = e, i = n, a = E(), s = S(null), c = d(() => r.tabs.findIndex((e) => e.value === r.modelValue)), l = (e) => `${a}-tab-${e}`, _ = (e) => `${a}-panel-${e}`, v = d(() => r.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function b(e) {
			let t = r.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== r.modelValue && i("update:modelValue", e);
		}
		function D(e) {
			s.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function M(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = o(v.value, c.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = o(v.value, c.value, -1);
					break;
				case "Home":
					t = o(v.value, -1, 1);
					break;
				case "End":
					t = o(v.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), b(r.tabs[t].value), D(t));
		}
		return (n, r) => (x(), m("div", O, [h("div", {
			ref_key: "listEl",
			ref: s,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": e.label,
			onKeydown: M
		}, [(x(!0), m(u, null, C(e.tabs, (n) => (x(), m("button", {
			id: l(n.value),
			key: n.value,
			type: "button",
			role: "tab",
			class: y(["phlix-tabs__tab", { "is-active": n.value === e.modelValue }]),
			"aria-selected": n.value === e.modelValue,
			"aria-controls": _(n.value),
			tabindex: n.value === e.modelValue ? 0 : -1,
			disabled: n.disabled,
			onClick: (e) => b(n.value)
		}, [n.icon ? (x(), f(t, {
			key: 0,
			name: n.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : p("", !0), g(" " + T(n.label), 1)], 10, A))), 128))], 40, k), e.modelValue ? (x(), m("div", {
			key: 0,
			id: _(e.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": l(e.modelValue),
			tabindex: "0"
		}, [w(n.$slots, e.modelValue, {}, () => [w(n.$slots, "default", {}, void 0, !0)], !0)], 8, j)) : p("", !0)]));
	}
}), [["__scopeId", "data-v-56f713f7"]]), N = { class: "setform" }, P = {
	key: 0,
	class: "setform__loading"
}, F = { class: "setform__head" }, I = { class: "setform__title" }, L = {
	key: 0,
	class: "setform__dirty"
}, R = ["for"], z = [
	"id",
	"type",
	"value",
	"onInput"
], B = { class: "setform__actions" }, V = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: t }) {
		let o = e, v = t, w = i(), E = s(), O = S({}), k = S({}), A = S(!0), j = S(null), M = S(null), V = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], H = d(() => o.groups ? V.filter((e) => o.groups.includes(e)) : V), U = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, W = {
			"hwaccel.enabled": {
				label: "Hardware acceleration",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.prefer_hardware": {
				label: "Prefer hardware encoding",
				type: "bool",
				group: "transcoding"
			},
			"hwaccel.probe_timeout": {
				label: "HW probe timeout (s)",
				type: "number",
				group: "transcoding"
			},
			"tmdb.api_key": {
				label: "TMDB API Key",
				type: "string",
				group: "metadata"
			},
			"marker_detection.similarity_threshold": {
				label: "Intro similarity threshold",
				type: "number",
				group: "markers"
			},
			"marker_detection.intro_max_duration": {
				label: "Max intro duration (s)",
				type: "number",
				group: "markers"
			},
			"subtitles.enabled": {
				label: "Enable subtitles",
				type: "bool",
				group: "subtitles"
			},
			"subtitles.default_language": {
				label: "Default subtitle language",
				type: "string",
				group: "subtitles"
			},
			"subtitles.burn_in_by_default": {
				label: "Burn in subtitles by default",
				type: "bool",
				group: "subtitles"
			},
			"discovery.discovery_port": {
				label: "Discovery port",
				type: "number",
				group: "discovery"
			},
			"trickplay.enabled": {
				label: "Enable trickplay",
				type: "bool",
				group: "trickplay"
			},
			"trickplay.interval_seconds": {
				label: "Trickplay interval (s)",
				type: "number",
				group: "trickplay"
			},
			"newsletter.enabled": {
				label: "Enable newsletter",
				type: "bool",
				group: "newsletter"
			},
			"newsletter.send_hour": {
				label: "Newsletter send hour",
				type: "number",
				group: "newsletter"
			},
			"port-forward.port_forwarding.upnp_enabled": {
				label: "Enable UPnP",
				type: "bool",
				group: "port-forward"
			},
			"trakt.client_id": {
				label: "Trakt client ID",
				type: "string",
				group: "scrobblers"
			},
			"trakt.client_secret": {
				label: "Trakt client secret",
				type: "string",
				group: "scrobblers"
			},
			"trakt.redirect_uri": {
				label: "Trakt redirect URI",
				type: "string",
				group: "scrobblers"
			}
		};
		function G(e) {
			return Object.keys(W).filter((t) => W[t].group === e);
		}
		function K(e, t) {
			let n = t.target.value;
			if (n === "") return Z(e, 0);
			let r = Number(n);
			Number.isFinite(r) && Z(e, r);
		}
		function q(e, t) {
			return t === "bool" ? n(e) : t === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function J() {
			A.value = !0, j.value = null;
			try {
				let e = await w.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(W)) t[n] = q(e[n], r.type);
				O.value = t, k.value = structuredClone(t);
			} catch (e) {
				j.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				A.value = !1;
			}
		}
		function Y(e) {
			return G(e).some((e) => O.value[e] !== k.value[e]);
		}
		async function X(e) {
			M.value = e;
			try {
				let t = {};
				for (let n of G(e)) t[n] = O.value[n];
				await w.client.put("/api/v1/users/me/settings", t);
				for (let t of G(e)) k.value[t] = O.value[t];
				E.success(`${U[e]} settings saved.`), v("saved", O.value);
			} catch (t) {
				E.error(t instanceof Error ? t.message : `Failed to save ${U[e]} settings`);
			} finally {
				M.value = null;
			}
		}
		function Z(e, t) {
			O.value[e] = t;
		}
		return b(J), (e, t) => (x(), m("div", N, [A.value ? (x(), m("div", P, [(x(), m(u, null, C(3, (e) => _(c, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : j.value ? (x(), f(l, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: j.value
		}, {
			actions: D(() => [_(r, {
				"left-icon": "rewind",
				onClick: J
			}, {
				default: D(() => [...t[0] ||= [g("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (x(!0), m(u, { key: 2 }, C(H.value, (e) => (x(), m("section", {
			key: e,
			class: "setform__group"
		}, [
			h("header", F, [h("h3", I, T(U[e]), 1), Y(e) ? (x(), m("span", L, "Unsaved")) : p("", !0)]),
			(x(!0), m(u, null, C(G(e), (e) => (x(), m("div", {
				key: e,
				class: y(["setform__row", { "setform__row--switch": W[e].type === "bool" }])
			}, [W[e].type === "bool" ? (x(), f(a, {
				key: 0,
				"model-value": !!O.value[e],
				label: W[e].label,
				"onUpdate:modelValue": (t) => Z(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (x(), m(u, { key: 1 }, [h("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, T(W[e].label), 9, R), h("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: W[e].type === "number" ? "number" : "text",
				value: O.value[e] ?? "",
				onInput: (t) => W[e].type === "number" ? K(e, t) : Z(e, t.target.value)
			}, null, 40, z)], 64))], 2))), 128)),
			h("div", B, [_(r, {
				variant: "solid",
				size: "sm",
				disabled: !Y(e),
				loading: M.value === e,
				onClick: (t) => X(e)
			}, {
				default: D(() => [g(" Save " + T(U[e]), 1)]),
				_: 2
			}, 1032, [
				"disabled",
				"loading",
				"onClick"
			])])
		]))), 128))]));
	}
}), [["__scopeId", "data-v-eea8b5b5"]]);
//#endregion
export { M as n, V as t };

//# sourceMappingURL=SettingsForm-BSahTL30.js.map