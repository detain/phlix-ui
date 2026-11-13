import { D as e, t, y as n } from "./client-Bmlfq3Uy.js";
import { t as ee } from "./useToastStore-CxO_ppM8.js";
import { t as te } from "./useMessages-B96K7XS0.js";
import { r as ne, t as re } from "./wireErrors-DDkkTtfw.js";
import { t as r } from "./Badge-D7vacFbh.js";
import { t as ie } from "./PageHint-C2jY1TZi.js";
import { t as i } from "./helpLinks-3xhEuW25.js";
import { t as a } from "./Button-Dfl4y6vO.js";
import { t as o } from "./Select-CtieJ2Ym.js";
import { t as ae } from "./Switch-C607L4Vu.js";
import { t as oe } from "./Skeleton-DDhrDRE7.js";
import { t as se } from "./EmptyState-DjfWh3kt.js";
import { n as s } from "./Icon-55iG1rR7.js";
import { Fragment as c, computed as l, createBlock as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, normalizeClass as ce, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, withCtx as C, withModifiers as le } from "vue";
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
}, he = { class: "transcoding-settings__meta" }, ge = { class: "transcoding-settings__fieldset" }, _e = { class: "transcoding-settings__legend" }, ve = {
	key: 0,
	class: "transcoding-settings__empty-accel"
}, ye = {
	key: 1,
	class: "transcoding-settings__accelerators"
}, w = [
	"value",
	"checked",
	"onChange"
], T = { class: "transcoding-settings__accel-name" }, E = { class: "transcoding-settings__accel-encoders" }, D = { class: "transcoding-settings__fieldset" }, O = { class: "transcoding-settings__legend" }, k = { class: "transcoding-settings__row" }, A = { class: "transcoding-settings__field" }, j = {
	class: "transcoding-settings__label",
	for: "tone-map-mode"
}, M = { class: "transcoding-settings__actions" }, N = /*#__PURE__*/ s(/* @__PURE__ */ h({
	__name: "TranscodingSettingsPage",
	props: { client: {} },
	setup(e) {
		let s = e, h = g("apiBase", ""), N = l(() => typeof h == "string" ? h : h?.value ?? ""), P = new ue(s.client ?? new t({ baseUrl: N.value })), F = ee(), { t: I } = te(), L = g("phlixConfig", null), be = [
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
		], R = y([]), z = y(""), B = y(null), V = y(!1), H = y("none"), U = y(!0), W = y(!1), G = y(null), K = y(null), q = y(!1), J = y("none"), Y = l(() => B.value !== K.value), X = l(() => V.value !== q.value), Z = l(() => H.value !== J.value), xe = l(() => Y.value || X.value || Z.value);
		function Q(e, t, n) {
			K.value = e, q.value = t, J.value = n;
		}
		async function $() {
			U.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([P.getAccelerators(), P.getToneMapping()]);
				R.value = e.accelerators, z.value = e.ffmpegVersion, B.value = e.preferredAccelerator, V.value = t.prefer_hdr_output, H.value = t.tone_map_mode, Q(e.preferredAccelerator, t.prefer_hdr_output, t.tone_map_mode);
			} catch (e) {
				G.value = ne(e, "Failed to load transcoding settings.", L?.locale), F.error(G.value);
			} finally {
				U.value = !1;
			}
		}
		async function Se() {
			W.value = !0;
			try {
				Y.value && B.value !== null && await P.setPreferredAccelerator(B.value), (X.value || Z.value) && await P.setToneMapping({
					prefer_hdr_output: V.value,
					tone_map_mode: H.value
				}), F.success("Transcoding settings saved."), Q(B.value, V.value, H.value);
			} catch (e) {
				F.error(n(re(e), L?.locale, "Failed to save transcoding settings."));
			} finally {
				W.value = !1;
			}
		}
		return _($), (e, t) => (v(), d("section", de, [
			f("header", fe, [f("h1", pe, x(S(I)("admin.transcoding.title")), 1)]),
			m(ie, {
				links: S(i).transcoding.links,
				details: S(i).transcoding.details
			}, {
				default: C(() => [...t[2] ||= [p(" Configure hardware-accelerated encoding and HDR tone-mapping for transcoding. The server detects available accelerators from FFmpeg on startup. ", -1)]]),
				_: 1
			}, 8, ["links", "details"]),
			U.value ? (v(), d("div", me, [m(oe, {
				variant: "text",
				lines: 8
			})])) : G.value ? (v(), u(se, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load transcoding settings",
				description: G.value
			}, {
				actions: C(() => [m(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: C(() => [p(x(S(I)("common.retry")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (v(), d(c, { key: 2 }, [f("div", he, [m(r, { tone: "neutral" }, {
				default: C(() => [p("FFmpeg " + x(z.value || "unknown"), 1)]),
				_: 1
			})]), f("form", {
				class: "transcoding-settings__form",
				onSubmit: le(Se, ["prevent"])
			}, [
				f("fieldset", ge, [
					f("legend", _e, x(S(I)("admin.transcoding.preferredAccelerator")), 1),
					t[5] ||= f("p", { class: "transcoding-settings__help" }, " Choose which accelerator to prefer when hardware encoding is available. Software (CPU) encoding is always available as a fallback. ", -1),
					R.value.length === 0 ? (v(), d("div", ve, " No accelerators detected. ")) : (v(), d("div", ye, [(v(!0), d(c, null, b(R.value, (e) => (v(), d("label", {
						key: e.name,
						class: ce(["transcoding-settings__accel", { "transcoding-settings__accel--selected": B.value === e.name }])
					}, [
						f("input", {
							type: "radio",
							name: "accelerator",
							value: e.name,
							checked: B.value === e.name,
							class: "transcoding-settings__radio",
							onChange: (t) => B.value = e.name
						}, null, 40, w),
						f("span", T, [p(x(e.name) + " ", 1), e.isHardware ? (v(), u(r, {
							key: 1,
							tone: "accent"
						}, {
							default: C(() => [...t[4] ||= [p("hardware", -1)]]),
							_: 1
						})) : (v(), u(r, {
							key: 0,
							tone: "neutral"
						}, {
							default: C(() => [...t[3] ||= [p("software", -1)]]),
							_: 1
						}))]),
						f("span", E, x(e.encoders.join(", ")), 1)
					], 2))), 128))]))
				]),
				f("fieldset", D, [
					f("legend", O, x(S(I)("admin.transcoding.hdrOutput")), 1),
					t[7] ||= f("p", { class: "transcoding-settings__help" }, " Control HDR-to-SDR tone mapping for displays that cannot handle native HDR. ", -1),
					f("div", k, [m(ae, {
						"model-value": V.value,
						label: S(I)("admin.transcoding.hdrOutput"),
						"onUpdate:modelValue": t[0] ||= (e) => {
							V.value = e;
						}
					}, null, 8, ["model-value", "label"]), t[6] ||= f("span", { class: "transcoding-settings__toggle-label" }, "Prefer HDR output", -1)]),
					f("div", A, [f("label", j, x(S(I)("admin.transcoding.toneMapMode")), 1), m(o, {
						id: "tone-map-mode",
						"model-value": H.value,
						options: be,
						label: S(I)("admin.transcoding.toneMapMode"),
						"onUpdate:modelValue": t[1] ||= (e) => {
							H.value = e;
						}
					}, null, 8, ["model-value", "label"])])
				]),
				f("div", M, [m(a, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !xe.value,
					loading: W.value
				}, {
					default: C(() => [...t[8] ||= [p(" Save transcoding settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])
			], 32)], 64))
		]));
	}
}), [["__scopeId", "data-v-47698133"]]);
export { N as default };

//# sourceMappingURL=TranscodingSettingsPage-QX5Il_dz.js.map