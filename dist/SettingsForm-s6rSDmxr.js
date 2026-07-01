import { n as e } from "./Icon-24ngwBUH.js";
import { t } from "./useMessages-CLrAkqxK.js";
import { o as n } from "./client-fw74f3l_.js";
import { t as r } from "./useAuthStore-CUoTkm_k.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as o } from "./Switch-D-Y4B9p8.js";
import { t as s } from "./Skeleton-BUq2D39t.js";
import { t as c } from "./EmptyState-0XgHKEGf.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, normalizeClass as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, withCtx as T } from "vue";
//#region src/utils/safeClone.ts
function E(e) {
	return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
//#endregion
//#region src/components/SettingsForm.vue?vue&type=script&setup=true&lang.ts
var D = { class: "setform" }, O = {
	key: 0,
	class: "setform__loading"
}, k = { class: "setform__head" }, A = { class: "setform__title" }, j = {
	key: 0,
	class: "setform__dirty"
}, M = ["for"], N = [
	"id",
	"type",
	"value",
	"onInput"
], ee = { class: "setform__actions" }, P = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: _ }) {
		let P = e, F = _, I = r(), L = i(), { t: R } = t(), z = x({}), B = x({}), V = x(!0), H = x(null), U = x(null), W = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], G = u(() => P.groups ? W.filter((e) => P.groups.includes(e)) : W), K = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, q = {
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
		function J(e) {
			return Object.keys(q).filter((t) => q[t].group === e);
		}
		function Y(e, t) {
			let n = t.target.value;
			if (n === "") return $(e, 0);
			let r = Number(n);
			Number.isFinite(r) && $(e, r);
		}
		function X(e, t) {
			return t === "bool" ? n(e) : t === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function Z() {
			V.value = !0, H.value = null;
			try {
				let e = await I.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(q)) t[n] = X(e[n], r.type);
				z.value = t, B.value = E(t);
			} catch (e) {
				H.value = e instanceof Error ? e.message : R("settings.loadFailed");
			} finally {
				V.value = !1;
			}
		}
		function Q(e) {
			return J(e).some((e) => z.value[e] !== B.value[e]);
		}
		async function te(e) {
			U.value = e;
			try {
				let t = {};
				for (let n of J(e)) t[n] = z.value[n];
				await I.client.put("/api/v1/users/me/settings", t);
				for (let t of J(e)) B.value[t] = z.value[t];
				L.success(R("settings.groupSaved", { name: K[e] })), F("saved", z.value);
			} catch (t) {
				L.error(t instanceof Error ? t.message : R("settings.groupSaveError", { name: K[e] }));
			} finally {
				U.value = null;
			}
		}
		function $(e, t) {
			z.value[e] = t;
		}
		return y(Z), (e, t) => (b(), p("div", D, [V.value ? (b(), p("div", O, [(b(), p(l, null, S(3, (e) => g(s, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : H.value ? (b(), d(c, {
			key: 1,
			icon: "alert",
			title: w(R)("settings.loadErrorTitle"),
			description: H.value
		}, {
			actions: T(() => [g(a, {
				"left-icon": "rewind",
				onClick: Z
			}, {
				default: T(() => [h(C(w(R)("common.retry")), 1)]),
				_: 1
			})]),
			_: 1
		}, 8, ["title", "description"])) : (b(!0), p(l, { key: 2 }, S(G.value, (e) => (b(), p("section", {
			key: e,
			class: "setform__group"
		}, [
			m("header", k, [m("h3", A, C(K[e]), 1), Q(e) ? (b(), p("span", j, C(w(R)("settings.unsaved")), 1)) : f("", !0)]),
			(b(!0), p(l, null, S(J(e), (e) => (b(), p("div", {
				key: e,
				class: v(["setform__row", { "setform__row--switch": q[e].type === "bool" }])
			}, [q[e].type === "bool" ? (b(), d(o, {
				key: 0,
				"model-value": !!z.value[e],
				label: q[e].label,
				"onUpdate:modelValue": (t) => $(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (b(), p(l, { key: 1 }, [m("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, C(q[e].label), 9, M), m("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: q[e].type === "number" ? "number" : "text",
				value: z.value[e] ?? "",
				onInput: (t) => q[e].type === "number" ? Y(e, t) : $(e, t.target.value)
			}, null, 40, N)], 64))], 2))), 128)),
			m("div", ee, [g(a, {
				variant: "solid",
				size: "sm",
				disabled: !Q(e),
				loading: U.value === e,
				onClick: (t) => te(e)
			}, {
				default: T(() => [h(C(w(R)("settings.saveGroup", { name: K[e] })), 1)]),
				_: 2
			}, 1032, [
				"disabled",
				"loading",
				"onClick"
			])])
		]))), 128))]));
	}
}), [["__scopeId", "data-v-5000a6bb"]]);
//#endregion
export { P as t };

//# sourceMappingURL=SettingsForm-s6rSDmxr.js.map