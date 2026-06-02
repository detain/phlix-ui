import { l as e } from "./tokenStore-SjxKwmod.js";
import { computed as t, createElementBlock as n, createElementVNode as r, defineComponent as i, normalizeClass as a, normalizeStyle as o, openBlock as s, ref as c } from "vue";
//#region src/components/ui/Slider.vue?vue&type=script&setup=true&lang.ts
var l = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], u = /*#__PURE__*/ e(/* @__PURE__ */ i({
	__name: "Slider",
	props: {
		modelValue: {},
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		label: {},
		formatValue: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: i }) {
		let u = e, d = i, f = c(null), p = c(!1), m = t(() => {
			let e = u.max - u.min || 1;
			return Math.min(100, Math.max(0, (u.modelValue - u.min) / e * 100));
		}), h = t(() => u.formatValue ? u.formatValue(u.modelValue) : String(u.modelValue));
		function g(e) {
			let t = Math.min(u.max, Math.max(u.min, e)), n = Math.round((t - u.min) / u.step), r = u.min + n * u.step;
			return Math.round(r * 1e6) / 1e6;
		}
		function _(e, t = !1) {
			let n = g(e);
			n !== u.modelValue && (d("update:modelValue", n), t && d("change", n));
		}
		function v(e) {
			let t = f.value;
			if (!t) return u.modelValue;
			let n = t.getBoundingClientRect(), r = n.width ? (e - n.left) / n.width : 0;
			return u.min + r * (u.max - u.min);
		}
		function y(e) {
			u.disabled || (e.currentTarget.setPointerCapture?.(e.pointerId), p.value = !0, _(v(e.clientX)));
		}
		function b(e) {
			p.value && _(v(e.clientX));
		}
		function x(e) {
			p.value && (p.value = !1, e.currentTarget.releasePointerCapture?.(e.pointerId), d("change", u.modelValue));
		}
		function S(e) {
			if (u.disabled) return;
			let t = (u.max - u.min) / 10, n = !0;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowUp":
					_(u.modelValue + u.step, !0);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					_(u.modelValue - u.step, !0);
					break;
				case "PageUp":
					_(u.modelValue + t, !0);
					break;
				case "PageDown":
					_(u.modelValue - t, !0);
					break;
				case "Home":
					_(u.min, !0);
					break;
				case "End":
					_(u.max, !0);
					break;
				default: n = !1;
			}
			n && e.preventDefault();
		}
		return (t, i) => (s(), n("div", {
			class: a(["phlix-slider", { "is-disabled": e.disabled }]),
			role: "slider",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": e.modelValue,
			"aria-valuetext": h.value,
			"aria-disabled": e.disabled || void 0,
			"aria-orientation": "horizontal",
			onKeydown: S
		}, [r("div", {
			ref_key: "trackEl",
			ref: f,
			class: "phlix-slider__track",
			onPointerdown: y,
			onPointermove: b,
			onPointerup: x
		}, [r("div", {
			class: "phlix-slider__fill",
			style: o({ width: m.value + "%" })
		}, null, 4), r("div", {
			class: "phlix-slider__thumb",
			style: o({ left: m.value + "%" })
		}, null, 4)], 544)], 42, l));
	}
}), [["__scopeId", "data-v-9ca92975"]]);
//#endregion
//#region src/api/admin/cast.ts
function d(e) {
	return typeof e == "string" ? e : "";
}
function f(e) {
	return typeof e == "number" && Number.isFinite(e) ? e : 0;
}
function p(e, t) {
	let n = typeof e.media_status == "object" && e.media_status !== null ? e.media_status : {}, r = d(e.transport_state ?? e.state) || (e.active === !0 ? "PLAYING" : "STOPPED");
	return {
		device_id: d(e.device_id) || t,
		media_title: d(e.media_title ?? n.media_title ?? n.title),
		media_item_id: typeof e.media_item_id == "string" ? e.media_item_id : null,
		transport_state: r,
		volume_level: f(e.volume_level ?? n.volume_level),
		muted: e.muted === !0,
		position_seconds: f(e.position_seconds ?? n.position_seconds ?? n.current_time),
		duration_seconds: f(e.duration_seconds ?? n.duration_seconds ?? n.duration)
	};
}
function m(e, t) {
	return {
		device_id: d(e.device_id) || t,
		media_title: d(e.media_title),
		media_item_id: typeof e.media_item_id == "string" ? e.media_item_id : null,
		transport_state: d(e.transport_state ?? e.state) || (e.active === !0 ? "PLAYING" : "STOPPED"),
		volume_level: f(e.volume_level),
		muted: e.muted === !0
	};
}
var h = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async listCastDevices() {
		let e = await this.client.get("/api/v1/cast/devices"), t = e.devices ?? e.data;
		return Array.isArray(t) ? t : [];
	}
	async getCastStatus(e) {
		return p(await this.client.get(`/api/v1/cast/devices/${encodeURIComponent(e)}/status`), e);
	}
	async castPlay(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/play`)
		};
	}
	async castPause(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/pause`)
		};
	}
	async castStop(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/stop`)
		};
	}
	async castSeek(e, t) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/cast/devices/${encodeURIComponent(e)}/seek`, { position_ms: Math.round(t * 1e3) })
		};
	}
	async listAirPlayDevices() {
		let e = await this.client.get("/api/v1/airplay/devices"), t = e.devices ?? e.data;
		return Array.isArray(t) ? t : [];
	}
	async getAirPlayStatus(e) {
		return m(await this.client.get(`/api/v1/airplay/devices/${encodeURIComponent(e)}/status`), e);
	}
	async airPlayPlay(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/airplay/devices/${encodeURIComponent(e)}/resume`)
		};
	}
	async airPlayPause(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/airplay/devices/${encodeURIComponent(e)}/pause`)
		};
	}
	async airPlayStop(e) {
		return {
			success: !0,
			...await this.client.post(`/api/v1/airplay/devices/${encodeURIComponent(e)}/stop`)
		};
	}
};
//#endregion
export { u as n, h as t };

//# sourceMappingURL=cast-BZACqu1l.js.map