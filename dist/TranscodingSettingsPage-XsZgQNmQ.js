import { C as e, t, v as n, x as r } from "./client-57OweUrJ.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as te } from "./useMessages-DrceiftD.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as ne } from "./PageHint-BlhPmafC.js";
import { t as a } from "./helpLinks-iarZuNmw.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as re } from "./Select-ChFXd0gU.js";
import { t as ie } from "./Switch-C1Wv5sN2.js";
import { t as ae } from "./Skeleton-B2Mt2L00.js";
import { t as s } from "./EmptyState-BjOJ1k_A.js";
import { n as c } from "./Icon-CIbfiPrs.js";
import { Fragment as l, computed as u, createBlock as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as _, normalizeClass as oe, onMounted as se, openBlock as v, ref as y, renderList as ce, toDisplayString as b, unref as x, withCtx as S, withModifiers as le } from "vue";
// src/api/admin/transcoding.ts
var ue = class {
	constructor(t) {
		e(this, "client", void 0), this.client = t;
	}
	async getAccelerators() {
		let e = await this.client.get("/api/v1/admin/transcoding/accelerators");
		return {
			accelerators: Array.isArray(e.data?.accelerators) ? e.data.accelerators : [],
			ffmpegVersion: typeof e.data?.ffmpegVersion == "string" ? e.data.ffmpegVersion : "",
			preferredAccelerator: e.data?.preferredAccelerator ?? null
		};
	}
	async setPreferredAccelerator(e) {
		await this.client.put("/api/v1/admin/transcoding/accelerators", { name: e });
	}
	async getToneMapping() {
		let e = await this.client.get("/api/v1/admin/transcoding/tone-mapping");
		return {
			prefer_hdr_output: e.data?.prefer_hdr_output === !0,
			tone_map_mode: e.data?.tone_map_mode ?? "none"
		};
	}
	async setToneMapping(e) {
		await this.client.put("/api/v1/admin/transcoding/tone-mapping", e);
	}
}, de = {
	class: "transcoding-settings",
	"aria-labelledby": "transcoding-heading"
}, fe = { class: "transcoding-settings__head" }, pe = {
	id: "transcoding-heading",
	class: "transcoding-settings__title"
}, me = {
	key: 0,
	class: "transcoding-settings__skel"
}, he = { class: "transcoding-settings__meta" }, ge = { class: "transcoding-settings__fieldset" }, C = { class: "transcoding-settings__legend" }, _e = {
	key: 0,
	class: "transcoding-settings__empty-accel"
}, w = {
	key: 1,
	class: "transcoding-settings__accelerators"
}, T = [
	"value",
	"checked",
	"onChange"
], E = { class: "transcoding-settings__accel-name" }, D = { class: "transcoding-settings__accel-encoders" }, O = { class: "transcoding-settings__fieldset" }, k = { class: "transcoding-settings__legend" }, A = { class: "transcoding-settings__row" }, j = { class: "transcoding-settings__field" }, M = {
	class: "transcoding-settings__label",
	for: "tone-map-mode"
}, N = { class: "transcoding-settings__actions" }, P = /*#__PURE__*/ c(/* @__PURE__ */ g({
	__name: "TranscodingSettingsPage",
	props: { client: {} },
	setup(e) {
		let c = e, g = _("apiBase", ""), P = u(() => typeof g == "string" ? g : g?.value ?? ""), F = new ue(c.client ?? new t({ baseUrl: P.value })), I = ee(), { t: L } = te(), ve = [
			{
				value: "none",
				label: "None — passthrough, no tone mapping"
			},
			{
				value: "zscale",
				label: "Zscale — lightweight filmic tone mapping"
			},
			{
				value: "libplacebo",
				label: "Libplacebo — high-quality HDR → SDR mapping"
			}
		], R = y([]), z = y(""), B = y(null), V = y(!1), H = y("none"), U = y(!0), W = y(!1), G = y(null), K = y(null), q = y(!1), J = y("none"), Y = u(() => B.value !== K.value), X = u(() => V.value !== q.value), Z = u(() => H.value !== J.value), ye = u(() => Y.value || X.value || Z.value);
		function Q(e, t, n) {
			K.value = e, q.value = t, J.value = n;
		}
		async function $() {
			U.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([F.getAccelerators(), F.getToneMapping()]);
				R.value = e.accelerators, z.value = e.ffmpegVersion, B.value = e.preferredAccelerator, V.value = t.prefer_hdr_output, H.value = t.tone_map_mode, Q(e.preferredAccelerator, t.prefer_hdr_output, t.tone_map_mode);
			} catch (e) {
				G.value = r(e, "Failed to load transcoding settings."), I.error(G.value);
			} finally {
				U.value = !1;
			}
		}
		async function be() {
			W.value = !0;
			try {
				Y.value && B.value !== null && await F.setPreferredAccelerator(B.value), (X.value || Z.value) && await F.setToneMapping({
					prefer_hdr_output: V.value,
					tone_map_mode: H.value
				}), I.success("Transcoding settings saved."), Q(B.value, V.value, H.value);
			} catch (e) {
				I.error(e instanceof n ? e.message : "Failed to save transcoding settings.");
			} finally {
				W.value = !1;
			}
		}
		return se($), (e, t) => (v(), f("section", de, [
			p("header", fe, [p("h1", pe, b(x(L)("admin.transcoding.title")), 1)]),
			h(ne, {
				links: x(a).transcoding.links,
				details: x(a).transcoding.details
			}, {
				default: S(() => [...t[2] ||= [m(" Configure hardware-accelerated encoding and HDR tone-mapping for transcoding. The server detects available accelerators from FFmpeg on startup. ", -1)]]),
				_: 1
			}, 8, ["links", "details"]),
			U.value ? (v(), f("div", me, [h(ae, {
				variant: "text",
				lines: 8
			})])) : G.value ? (v(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load transcoding settings",
				description: G.value
			}, {
				actions: S(() => [h(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: S(() => [m(b(x(L)("common.retry")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (v(), f(l, { key: 2 }, [p("div", he, [h(i, { tone: "neutral" }, {
				default: S(() => [m("FFmpeg " + b(z.value || "unknown"), 1)]),
				_: 1
			})]), p("form", {
				class: "transcoding-settings__form",
				onSubmit: le(be, ["prevent"])
			}, [
				p("fieldset", ge, [
					p("legend", C, b(x(L)("admin.transcoding.preferredAccelerator")), 1),
					t[5] ||= p("p", { class: "transcoding-settings__help" }, " Choose which accelerator to prefer when hardware encoding is available. Software (CPU) encoding is always available as a fallback. ", -1),
					R.value.length === 0 ? (v(), f("div", _e, " No accelerators detected. ")) : (v(), f("div", w, [(v(!0), f(l, null, ce(R.value, (e) => (v(), f("label", {
						key: e.name,
						class: oe(["transcoding-settings__accel", { "transcoding-settings__accel--selected": B.value === e.name }])
					}, [
						p("input", {
							type: "radio",
							name: "accelerator",
							value: e.name,
							checked: B.value === e.name,
							class: "transcoding-settings__radio",
							onChange: (t) => B.value = e.name
						}, null, 40, T),
						p("span", E, [m(b(e.name) + " ", 1), e.isHardware ? (v(), d(i, {
							key: 1,
							tone: "accent"
						}, {
							default: S(() => [...t[4] ||= [m("hardware", -1)]]),
							_: 1
						})) : (v(), d(i, {
							key: 0,
							tone: "neutral"
						}, {
							default: S(() => [...t[3] ||= [m("software", -1)]]),
							_: 1
						}))]),
						p("span", D, b(e.encoders.join(", ")), 1)
					], 2))), 128))]))
				]),
				p("fieldset", O, [
					p("legend", k, b(x(L)("admin.transcoding.hdrOutput")), 1),
					t[7] ||= p("p", { class: "transcoding-settings__help" }, " Control HDR-to-SDR tone mapping for displays that cannot handle native HDR. ", -1),
					p("div", A, [h(ie, {
						"model-value": V.value,
						label: x(L)("admin.transcoding.hdrOutput"),
						"onUpdate:modelValue": t[0] ||= (e) => {
							V.value = e;
						}
					}, null, 8, ["model-value", "label"]), t[6] ||= p("span", { class: "transcoding-settings__toggle-label" }, "Prefer HDR output", -1)]),
					p("div", j, [p("label", M, b(x(L)("admin.transcoding.toneMapMode")), 1), h(re, {
						id: "tone-map-mode",
						"model-value": H.value,
						options: ve,
						label: x(L)("admin.transcoding.toneMapMode"),
						"onUpdate:modelValue": t[1] ||= (e) => {
							H.value = e;
						}
					}, null, 8, ["model-value", "label"])])
				]),
				p("div", N, [h(o, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !ye.value,
					loading: W.value
				}, {
					default: S(() => [...t[8] ||= [m(" Save transcoding settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])
			], 32)], 64))
		]));
	}
}), [["__scopeId", "data-v-5bc41d62"]]);
export { P as default };

//# sourceMappingURL=TranscodingSettingsPage-XsZgQNmQ.js.map