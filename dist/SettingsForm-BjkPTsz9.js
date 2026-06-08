import { n as e } from "./Icon-ax5k7_G2.js";
import { t } from "./useMessages-D7StdIzu.js";
import { i as n, t as r } from "./Button-BwQkyEkr.js";
import { t as i } from "./useAuthStore-DdW4mkuI.js";
import { t as a } from "./Switch-CFZhdkXR.js";
import { t as o } from "./useToastStore-BDoKlU6N.js";
import { t as ee } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, normalizeClass as _, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, unref as C, withCtx as w } from "vue";
//#region src/components/SettingsForm.vue?vue&type=script&setup=true&lang.ts
var T = { class: "setform" }, E = {
	key: 0,
	class: "setform__loading"
}, D = { class: "setform__head" }, O = { class: "setform__title" }, k = {
	key: 0,
	class: "setform__dirty"
}, A = ["for"], j = [
	"id",
	"type",
	"value",
	"onInput"
], M = { class: "setform__actions" }, N = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: g }) {
		let N = e, P = g, F = i(), I = o(), { t: L } = t(), R = b({}), z = b({}), B = b(!0), V = b(null), H = b(null), U = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], W = l(() => N.groups ? U.filter((e) => N.groups.includes(e)) : U), G = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, K = {
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
		function q(e) {
			return Object.keys(K).filter((t) => K[t].group === e);
		}
		function J(e, t) {
			let n = t.target.value;
			if (n === "") return $(e, 0);
			let r = Number(n);
			Number.isFinite(r) && $(e, r);
		}
		function Y(e, t) {
			return t === "bool" ? n(e) : t === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function X() {
			B.value = !0, V.value = null;
			try {
				let e = await F.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(K)) t[n] = Y(e[n], r.type);
				R.value = t, z.value = structuredClone(t);
			} catch (e) {
				V.value = e instanceof Error ? e.message : L("settings.loadFailed");
			} finally {
				B.value = !1;
			}
		}
		function Z(e) {
			return q(e).some((e) => R.value[e] !== z.value[e]);
		}
		async function Q(e) {
			H.value = e;
			try {
				let t = {};
				for (let n of q(e)) t[n] = R.value[n];
				await F.client.put("/api/v1/users/me/settings", t);
				for (let t of q(e)) z.value[t] = R.value[t];
				I.success(L("settings.groupSaved", { name: G[e] })), P("saved", R.value);
			} catch (t) {
				I.error(t instanceof Error ? t.message : L("settings.groupSaveError", { name: G[e] }));
			} finally {
				H.value = null;
			}
		}
		function $(e, t) {
			R.value[e] = t;
		}
		return v(X), (e, t) => (y(), f("div", T, [B.value ? (y(), f("div", E, [(y(), f(c, null, x(3, (e) => h(ee, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : V.value ? (y(), u(s, {
			key: 1,
			icon: "alert",
			title: C(L)("settings.loadErrorTitle"),
			description: V.value
		}, {
			actions: w(() => [h(r, {
				"left-icon": "rewind",
				onClick: X
			}, {
				default: w(() => [m(S(C(L)("common.retry")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : (y(!0), f(c, { key: 2 }, x(W.value, (e) => (y(), f("section", {
			key: e,
			class: "setform__group"
		}, [
			p("header", D, [p("h3", O, S(G[e]), 1), Z(e) ? (y(), f("span", k, S(C(L)("settings.unsaved")), 1)) : d("", !0)]),
			(y(!0), f(c, null, x(q(e), (e) => (y(), f("div", {
				key: e,
				class: _(["setform__row", { "setform__row--switch": K[e].type === "bool" }])
			}, [K[e].type === "bool" ? (y(), u(a, {
				key: 0,
				"model-value": !!R.value[e],
				label: K[e].label,
				"onUpdate:modelValue": (t) => $(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (y(), f(c, { key: 1 }, [p("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, S(K[e].label), 9, A), p("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: K[e].type === "number" ? "number" : "text",
				value: R.value[e] ?? "",
				onInput: (t) => K[e].type === "number" ? J(e, t) : $(e, t.target.value)
			}, null, 40, j)], 64))], 2))), 128)),
			p("div", M, [h(r, {
				variant: "solid",
				size: "sm",
				disabled: !Z(e),
				loading: H.value === e,
				onClick: (t) => Q(e)
			}, {
				default: w(() => [m(S(C(L)("settings.saveGroup", { name: G[e] })), 1)]),
				_: 2
			}, 1032, [
				"disabled",
				"loading",
				"onClick"
			])])
		]))), 128))]));
	}
}), [["__scopeId", "data-v-710c87d1"]]);
//#endregion
export { N as t };

//# sourceMappingURL=SettingsForm-BjkPTsz9.js.map