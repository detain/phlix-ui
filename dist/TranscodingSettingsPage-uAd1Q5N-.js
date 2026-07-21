import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./useMessages-DvTTvQB1.js";
import { c as n, f as ee, l as r, t as te } from "./client-D80As4Gx.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as a } from "./Badge-B6MgOwKQ.js";
import { t as re } from "./Switch-DyS2L5gX.js";
import { t as o } from "./Select-CymWKJLs.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as s } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { t as c } from "./helpLinks-BI4oN4Or.js";
import { Fragment as l, computed as u, createBlock as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as oe, normalizeClass as se, onMounted as ce, openBlock as _, ref as v, renderList as le, toDisplayString as y, unref as b, withCtx as x, withModifiers as ue } from "vue";
//#region src/api/admin/transcoding.ts
var de = class {
	client;
	constructor(e) {
		this.client = e;
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
}, fe = {
	class: "transcoding-settings",
	"aria-labelledby": "transcoding-heading"
}, pe = { class: "transcoding-settings__head" }, me = {
	id: "transcoding-heading",
	class: "transcoding-settings__title"
}, he = {
	key: 0,
	class: "transcoding-settings__skel"
}, ge = { class: "transcoding-settings__meta" }, _e = { class: "transcoding-settings__fieldset" }, ve = { class: "transcoding-settings__legend" }, S = {
	key: 0,
	class: "transcoding-settings__empty-accel"
}, C = {
	key: 1,
	class: "transcoding-settings__accelerators"
}, w = [
	"value",
	"checked",
	"onChange"
], T = { class: "transcoding-settings__accel-name" }, E = { class: "transcoding-settings__accel-encoders" }, D = { class: "transcoding-settings__fieldset" }, O = { class: "transcoding-settings__legend" }, k = { class: "transcoding-settings__row" }, A = { class: "transcoding-settings__field" }, j = {
	class: "transcoding-settings__label",
	for: "tone-map-mode"
}, M = { class: "transcoding-settings__actions" }, N = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "TranscodingSettingsPage",
	props: { client: {} },
	setup(e) {
		let g = e, N = oe("apiBase", ""), P = u(() => typeof N == "string" ? N : N?.value ?? ""), F = new de(g.client ?? new te({
			baseUrl: P.value,
			tokenStore: new n()
		})), I = ne(), { t: L } = t(), ye = [
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
		], R = v([]), z = v(""), B = v(null), V = v(!1), H = v("none"), U = v(!0), W = v(!1), G = v(null), K = v(null), q = v(!1), J = v("none"), Y = u(() => B.value !== K.value), X = u(() => V.value !== q.value), Z = u(() => H.value !== J.value), be = u(() => Y.value || X.value || Z.value);
		function Q(e, t, n) {
			K.value = e, q.value = t, J.value = n;
		}
		async function $() {
			U.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([F.getAccelerators(), F.getToneMapping()]);
				R.value = e.accelerators, z.value = e.ffmpegVersion, B.value = e.preferredAccelerator, V.value = t.prefer_hdr_output, H.value = t.tone_map_mode, Q(e.preferredAccelerator, t.prefer_hdr_output, t.tone_map_mode);
			} catch (e) {
				G.value = ee(e, "Failed to load transcoding settings."), I.error(G.value);
			} finally {
				U.value = !1;
			}
		}
		async function xe() {
			W.value = !0;
			try {
				Y.value && B.value !== null && await F.setPreferredAccelerator(B.value), (X.value || Z.value) && await F.setToneMapping({
					prefer_hdr_output: V.value,
					tone_map_mode: H.value
				}), I.success("Transcoding settings saved."), Q(B.value, V.value, H.value);
			} catch (e) {
				I.error(e instanceof r ? e.message : "Failed to save transcoding settings.");
			} finally {
				W.value = !1;
			}
		}
		return ce($), (e, t) => (_(), f("section", fe, [
			p("header", pe, [p("h1", me, y(b(L)("admin.transcoding.title")), 1)]),
			h(ae, {
				links: b(c).transcoding.links,
				details: b(c).transcoding.details
			}, {
				default: x(() => [...t[2] ||= [m(" Configure hardware-accelerated encoding and HDR tone-mapping for transcoding. The server detects available accelerators from FFmpeg on startup. ", -1)]]),
				_: 1
			}, 8, ["links", "details"]),
			U.value ? (_(), f("div", he, [h(ie, {
				variant: "text",
				lines: 8
			})])) : G.value ? (_(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load transcoding settings",
				description: G.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: x(() => [m(y(b(L)("common.retry")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (_(), f(l, { key: 2 }, [p("div", ge, [h(a, { tone: "neutral" }, {
				default: x(() => [m("FFmpeg " + y(z.value || "unknown"), 1)]),
				_: 1
			})]), p("form", {
				class: "transcoding-settings__form",
				onSubmit: ue(xe, ["prevent"])
			}, [
				p("fieldset", _e, [
					p("legend", ve, y(b(L)("admin.transcoding.preferredAccelerator")), 1),
					t[5] ||= p("p", { class: "transcoding-settings__help" }, " Choose which accelerator to prefer when hardware encoding is available. Software (CPU) encoding is always available as a fallback. ", -1),
					R.value.length === 0 ? (_(), f("div", S, " No accelerators detected. ")) : (_(), f("div", C, [(_(!0), f(l, null, le(R.value, (e) => (_(), f("label", {
						key: e.name,
						class: se(["transcoding-settings__accel", { "transcoding-settings__accel--selected": B.value === e.name }])
					}, [
						p("input", {
							type: "radio",
							name: "accelerator",
							value: e.name,
							checked: B.value === e.name,
							class: "transcoding-settings__radio",
							onChange: (t) => B.value = e.name
						}, null, 40, w),
						p("span", T, [m(y(e.name) + " ", 1), e.isHardware ? (_(), d(a, {
							key: 1,
							tone: "accent"
						}, {
							default: x(() => [...t[4] ||= [m("hardware", -1)]]),
							_: 1
						})) : (_(), d(a, {
							key: 0,
							tone: "neutral"
						}, {
							default: x(() => [...t[3] ||= [m("software", -1)]]),
							_: 1
						}))]),
						p("span", E, y(e.encoders.join(", ")), 1)
					], 2))), 128))]))
				]),
				p("fieldset", D, [
					p("legend", O, y(b(L)("admin.transcoding.hdrOutput")), 1),
					t[7] ||= p("p", { class: "transcoding-settings__help" }, " Control HDR-to-SDR tone mapping for displays that cannot handle native HDR. ", -1),
					p("div", k, [h(re, {
						"model-value": V.value,
						label: b(L)("admin.transcoding.hdrOutput"),
						"onUpdate:modelValue": t[0] ||= (e) => {
							V.value = e;
						}
					}, null, 8, ["model-value", "label"]), t[6] ||= p("span", { class: "transcoding-settings__toggle-label" }, "Prefer HDR output", -1)]),
					p("div", A, [p("label", j, y(b(L)("admin.transcoding.toneMapMode")), 1), h(o, {
						id: "tone-map-mode",
						"model-value": H.value,
						options: ye,
						label: b(L)("admin.transcoding.toneMapMode"),
						"onUpdate:modelValue": t[1] ||= (e) => {
							H.value = e;
						}
					}, null, 8, ["model-value", "label"])])
				]),
				p("div", M, [h(i, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !be.value,
					loading: W.value
				}, {
					default: x(() => [...t[8] ||= [m(" Save transcoding settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])
			], 32)], 64))
		]));
	}
}), [["__scopeId", "data-v-118b2a43"]]);
//#endregion
export { N as default };

//# sourceMappingURL=TranscodingSettingsPage-uAd1Q5N-.js.map