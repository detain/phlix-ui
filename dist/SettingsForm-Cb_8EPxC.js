import { n as e } from "./Icon-ax5k7_G2.js";
import { i as t, t as n } from "./Button-BFaMKqH5.js";
import { t as r } from "./useAuthStore-M0VE53Rh.js";
import { t as i } from "./Switch-CFZhdkXR.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { n as o, t as s } from "./EmptyState-Ds4WcVdG.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, normalizeClass as _, onMounted as v, openBlock as y, ref as b, renderList as x, toDisplayString as S, withCtx as C } from "vue";
//#region src/components/SettingsForm.vue?vue&type=script&setup=true&lang.ts
var w = { class: "setform" }, T = {
	key: 0,
	class: "setform__loading"
}, E = { class: "setform__head" }, D = { class: "setform__title" }, O = {
	key: 0,
	class: "setform__dirty"
}, k = ["for"], A = [
	"id",
	"type",
	"value",
	"onInput"
], j = { class: "setform__actions" }, M = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(e, { emit: g }) {
		let M = e, N = g, P = r(), F = a(), I = b({}), L = b({}), R = b(!0), z = b(null), B = b(null), V = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], H = l(() => M.groups ? V.filter((e) => M.groups.includes(e)) : V), U = {
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
		function q(e, n) {
			return n === "bool" ? t(e) : n === "number" ? e == null || e === "" ? 0 : Number(e) : e == null ? "" : String(e);
		}
		async function J() {
			R.value = !0, z.value = null;
			try {
				let e = await P.client.get("/api/v1/users/me/settings"), t = { ...e };
				for (let [n, r] of Object.entries(W)) t[n] = q(e[n], r.type);
				I.value = t, L.value = structuredClone(t);
			} catch (e) {
				z.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				R.value = !1;
			}
		}
		function Y(e) {
			return G(e).some((e) => I.value[e] !== L.value[e]);
		}
		async function X(e) {
			B.value = e;
			try {
				let t = {};
				for (let n of G(e)) t[n] = I.value[n];
				await P.client.put("/api/v1/users/me/settings", t);
				for (let t of G(e)) L.value[t] = I.value[t];
				F.success(`${U[e]} settings saved.`), N("saved", I.value);
			} catch (t) {
				F.error(t instanceof Error ? t.message : `Failed to save ${U[e]} settings`);
			} finally {
				B.value = null;
			}
		}
		function Z(e, t) {
			I.value[e] = t;
		}
		return v(J), (e, t) => (y(), f("div", w, [R.value ? (y(), f("div", T, [(y(), f(c, null, x(3, (e) => h(o, {
			key: e,
			height: "6.5rem",
			radius: "var(--radius-lg)"
		})), 64))])) : z.value ? (y(), u(s, {
			key: 1,
			icon: "alert",
			title: "Couldn't load settings",
			description: z.value
		}, {
			actions: C(() => [h(n, {
				"left-icon": "rewind",
				onClick: J
			}, {
				default: C(() => [...t[0] ||= [m("Retry", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : (y(!0), f(c, { key: 2 }, x(H.value, (e) => (y(), f("section", {
			key: e,
			class: "setform__group"
		}, [
			p("header", E, [p("h3", D, S(U[e]), 1), Y(e) ? (y(), f("span", O, "Unsaved")) : d("", !0)]),
			(y(!0), f(c, null, x(G(e), (e) => (y(), f("div", {
				key: e,
				class: _(["setform__row", { "setform__row--switch": W[e].type === "bool" }])
			}, [W[e].type === "bool" ? (y(), u(i, {
				key: 0,
				"model-value": !!I.value[e],
				label: W[e].label,
				"onUpdate:modelValue": (t) => Z(e, t)
			}, null, 8, [
				"model-value",
				"label",
				"onUpdate:modelValue"
			])) : (y(), f(c, { key: 1 }, [p("label", {
				for: `set-${e}`,
				class: "setform__label"
			}, S(W[e].label), 9, k), p("input", {
				id: `set-${e}`,
				class: "setform__input",
				type: W[e].type === "number" ? "number" : "text",
				value: I.value[e] ?? "",
				onInput: (t) => W[e].type === "number" ? K(e, t) : Z(e, t.target.value)
			}, null, 40, A)], 64))], 2))), 128)),
			p("div", j, [h(n, {
				variant: "solid",
				size: "sm",
				disabled: !Y(e),
				loading: B.value === e,
				onClick: (t) => X(e)
			}, {
				default: C(() => [m(" Save " + S(U[e]), 1)]),
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
export { M as t };

//# sourceMappingURL=SettingsForm-Cb_8EPxC.js.map