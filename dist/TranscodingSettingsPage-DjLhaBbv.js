import { n as e } from "./Icon-CIwTuFLd.js";
import { t } from "./useMessages-DeBiTaQk.js";
import { g as n, l as ee, t as te, y as ne } from "./client-CRZ_SWB1.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { t as ie } from "./EmptyState-BAyOxAcK.js";
import { t as r } from "./Button-BuG0GvCa.js";
import { t as i } from "./Badge-A88fI41k.js";
import { t as ae } from "./Switch-ibkXiiN-.js";
import { t as a } from "./Select-Djg5MXFL.js";
import { t as o } from "./Skeleton-rHw-IJtl.js";
import { t as oe } from "./PageHint-BgM9gtjL.js";
import { t as s } from "./helpLinks-B4Y1FteC.js";
import { Fragment as c, computed as l, createBlock as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as se, normalizeClass as ce, onMounted as le, openBlock as g, ref as _, renderList as ue, toDisplayString as v, unref as y, withCtx as b, withModifiers as de } from "vue";
//#region src/api/admin/transcoding.ts
var fe = class {
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
}, pe = {
	class: "transcoding-settings",
	"aria-labelledby": "transcoding-heading"
}, me = { class: "transcoding-settings__head" }, he = {
	id: "transcoding-heading",
	class: "transcoding-settings__title"
}, ge = {
	key: 0,
	class: "transcoding-settings__skel"
}, _e = { class: "transcoding-settings__meta" }, ve = { class: "transcoding-settings__fieldset" }, x = { class: "transcoding-settings__legend" }, S = {
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
}, M = { class: "transcoding-settings__actions" }, N = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "TranscodingSettingsPage",
	props: { client: {} },
	setup(e) {
		let h = e, N = se("apiBase", ""), P = l(() => typeof N == "string" ? N : N?.value ?? ""), F = new fe(h.client ?? new te({
			baseUrl: P.value,
			tokenStore: new ee()
		})), I = re(), { t: L } = t(), ye = [
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
		], R = _([]), z = _(""), B = _(null), V = _(!1), H = _("none"), U = _(!0), W = _(!1), G = _(null), K = _(null), q = _(!1), J = _("none"), Y = l(() => B.value !== K.value), X = l(() => V.value !== q.value), Z = l(() => H.value !== J.value), be = l(() => Y.value || X.value || Z.value);
		function Q(e, t, n) {
			K.value = e, q.value = t, J.value = n;
		}
		async function $() {
			U.value = !0, G.value = null;
			try {
				let [e, t] = await Promise.all([F.getAccelerators(), F.getToneMapping()]);
				R.value = e.accelerators, z.value = e.ffmpegVersion, B.value = e.preferredAccelerator, V.value = t.prefer_hdr_output, H.value = t.tone_map_mode, Q(e.preferredAccelerator, t.prefer_hdr_output, t.tone_map_mode);
			} catch (e) {
				G.value = ne(e, "Failed to load transcoding settings."), I.error(G.value);
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
				I.error(e instanceof n ? e.message : "Failed to save transcoding settings.");
			} finally {
				W.value = !1;
			}
		}
		return le($), (e, t) => (g(), d("section", pe, [
			f("header", me, [f("h1", he, v(y(L)("admin.transcoding.title")), 1)]),
			m(oe, {
				links: y(s).transcoding.links,
				details: y(s).transcoding.details
			}, {
				default: b(() => [...t[2] ||= [p(" Configure hardware-accelerated encoding and HDR tone-mapping for transcoding. The server detects available accelerators from FFmpeg on startup. ", -1)]]),
				_: 1
			}, 8, ["links", "details"]),
			U.value ? (g(), d("div", ge, [m(o, {
				variant: "text",
				lines: 8
			})])) : G.value ? (g(), u(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load transcoding settings",
				description: G.value
			}, {
				actions: b(() => [m(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: $
				}, {
					default: b(() => [p(v(y(L)("common.retry")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : (g(), d(c, { key: 2 }, [f("div", _e, [m(i, { tone: "neutral" }, {
				default: b(() => [p("FFmpeg " + v(z.value || "unknown"), 1)]),
				_: 1
			})]), f("form", {
				class: "transcoding-settings__form",
				onSubmit: de(xe, ["prevent"])
			}, [
				f("fieldset", ve, [
					f("legend", x, v(y(L)("admin.transcoding.preferredAccelerator")), 1),
					t[5] ||= f("p", { class: "transcoding-settings__help" }, " Choose which accelerator to prefer when hardware encoding is available. Software (CPU) encoding is always available as a fallback. ", -1),
					R.value.length === 0 ? (g(), d("div", S, " No accelerators detected. ")) : (g(), d("div", C, [(g(!0), d(c, null, ue(R.value, (e) => (g(), d("label", {
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
						f("span", T, [p(v(e.name) + " ", 1), e.isHardware ? (g(), u(i, {
							key: 1,
							tone: "accent"
						}, {
							default: b(() => [...t[4] ||= [p("hardware", -1)]]),
							_: 1
						})) : (g(), u(i, {
							key: 0,
							tone: "neutral"
						}, {
							default: b(() => [...t[3] ||= [p("software", -1)]]),
							_: 1
						}))]),
						f("span", E, v(e.encoders.join(", ")), 1)
					], 2))), 128))]))
				]),
				f("fieldset", D, [
					f("legend", O, v(y(L)("admin.transcoding.hdrOutput")), 1),
					t[7] ||= f("p", { class: "transcoding-settings__help" }, " Control HDR-to-SDR tone mapping for displays that cannot handle native HDR. ", -1),
					f("div", k, [m(ae, {
						"model-value": V.value,
						label: y(L)("admin.transcoding.hdrOutput"),
						"onUpdate:modelValue": t[0] ||= (e) => {
							V.value = e;
						}
					}, null, 8, ["model-value", "label"]), t[6] ||= f("span", { class: "transcoding-settings__toggle-label" }, "Prefer HDR output", -1)]),
					f("div", A, [f("label", j, v(y(L)("admin.transcoding.toneMapMode")), 1), m(a, {
						id: "tone-map-mode",
						"model-value": H.value,
						options: ye,
						label: y(L)("admin.transcoding.toneMapMode"),
						"onUpdate:modelValue": t[1] ||= (e) => {
							H.value = e;
						}
					}, null, 8, ["model-value", "label"])])
				]),
				f("div", M, [m(r, {
					type: "submit",
					variant: "solid",
					size: "sm",
					disabled: !be.value,
					loading: W.value
				}, {
					default: b(() => [...t[8] ||= [p(" Save transcoding settings ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])])
			], 32)], 64))
		]));
	}
}), [["__scopeId", "data-v-118b2a43"]]);
//#endregion
export { N as default };

//# sourceMappingURL=TranscodingSettingsPage-DjLhaBbv.js.map