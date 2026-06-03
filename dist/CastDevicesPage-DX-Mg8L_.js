import { a as e, i as t, l as n, n as r, r as i, t as ee, u as a } from "./tokenStore-DfQvvLGI.js";
import { t as te } from "./EmptyState-Oymq15Ey.js";
import { t as o } from "./Badge-Cmz5FPqw.js";
import { n as ne, t as re } from "./cast-CEG1z1w3.js";
import { Fragment as s, computed as c, createBlock as ie, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as h, normalizeClass as g, onMounted as ae, openBlock as _, ref as v, renderList as y, toDisplayString as b, withCtx as x } from "vue";
//#region src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
var oe = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, se = {
	class: "admin-cast__tabs",
	role: "tablist",
	"aria-label": "Device type"
}, ce = [
	"aria-selected",
	"aria-controls",
	"onClick"
], le = ["id", "aria-label"], ue = { class: "admin-cast__subtitle" }, de = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, fe = {
	key: 2,
	class: "admin-cast__grid",
	role: "list"
}, pe = [
	"aria-pressed",
	"aria-label",
	"onClick"
], me = {
	class: "device-card__icon",
	"aria-hidden": "true"
}, he = { class: "device-card__info" }, ge = ["title"], S = ["title"], C = {
	key: 3,
	class: "admin-cast__session",
	"aria-labelledby": "transport-heading"
}, w = {
	key: 0,
	class: "admin-cast__player",
	"aria-live": "polite"
}, T = {
	key: 1,
	class: "admin-cast__player"
}, E = {
	key: 2,
	class: "admin-cast__player"
}, D = { class: "admin-cast__nowplaying" }, O = { class: "admin-cast__media" }, k = { class: "admin-cast__note" }, A = { class: "admin-cast__muted" }, j = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, M = { class: "admin-cast__time" }, N = { class: "admin-cast__time" }, P = { class: "admin-cast__buttons" }, F = /*#__PURE__*/ a(/* @__PURE__ */ m({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(a) {
		let m = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], F = a, I = h("apiBase", ""), L = c(() => typeof I == "string" ? I : I?.value ?? ""), R = new re(F.client ?? new e({
			baseUrl: L.value,
			tokenStore: new ee()
		})), z = t();
		function B(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function V(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let H = v("chromecast"), U = v([]), W = v([]), G = v(!0), K = v(!0), q = v(null), J = v(null), Y = v(!1), X = v(!1), Z = c(() => H.value === "chromecast" ? U.value : W.value), _e = c(() => H.value === "chromecast" ? G.value : K.value), Q = c(() => m.find((e) => e.id === H.value)?.label ?? ""), ve = c(() => m.find((e) => e.id === H.value)?.icon ?? "cast"), ye = c(() => H.value === "chromecast"), be = c(() => Z.value.find((e) => e.device_id === q.value)?.name ?? "");
		async function xe() {
			G.value = !0;
			try {
				U.value = await R.listCastDevices();
			} catch (e) {
				z.error(B(e, "Failed to load Chromecast devices."));
			} finally {
				G.value = !1;
			}
		}
		async function Se() {
			K.value = !0;
			try {
				W.value = await R.listAirPlayDevices();
			} catch (e) {
				z.error(B(e, "Failed to load AirPlay devices."));
			} finally {
				K.value = !1;
			}
		}
		async function Ce(e, t) {
			Y.value = !0, J.value = null;
			try {
				if (e === "chromecast") {
					let e = await R.getCastStatus(t);
					J.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: e.position_seconds,
						duration: e.duration_seconds,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				} else {
					let e = await R.getAirPlayStatus(t);
					J.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: null,
						duration: null,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				}
			} catch (e) {
				z.error(B(e, "Failed to load playback state."));
			} finally {
				Y.value = !1;
			}
		}
		function $(e) {
			q.value = e, Ce(H.value, e);
		}
		function we(e) {
			e !== H.value && (H.value = e, q.value = null, J.value = null);
		}
		async function Te() {
			let e = q.value;
			if (e) {
				X.value = !0;
				try {
					let t = H.value === "chromecast" ? await R.castPlay(e) : await R.airPlayPlay(e);
					if (!t.success) {
						z.error(t.message || "Play failed.");
						return;
					}
					J.value &&= {
						...J.value,
						isPlaying: !0
					};
				} catch (e) {
					z.error(B(e, "Play failed."));
				} finally {
					X.value = !1;
				}
			}
		}
		async function Ee() {
			let e = q.value;
			if (e) {
				X.value = !0;
				try {
					let t = H.value === "chromecast" ? await R.castPause(e) : await R.airPlayPause(e);
					if (!t.success) {
						z.error(t.message || "Pause failed.");
						return;
					}
					J.value &&= {
						...J.value,
						isPlaying: !1
					};
				} catch (e) {
					z.error(B(e, "Pause failed."));
				} finally {
					X.value = !1;
				}
			}
		}
		async function De() {
			let e = q.value;
			if (e) {
				X.value = !0;
				try {
					let t = H.value === "chromecast" ? await R.castStop(e) : await R.airPlayStop(e);
					if (!t.success) {
						z.error(t.message || "Stop failed.");
						return;
					}
					J.value &&= {
						...J.value,
						isPlaying: !1,
						position: null
					};
				} catch (e) {
					z.error(B(e, "Stop failed."));
				} finally {
					X.value = !1;
				}
			}
		}
		async function Oe(e) {
			let t = q.value;
			if (!(!t || H.value !== "chromecast")) {
				X.value = !0;
				try {
					let n = await R.castSeek(t, e);
					if (!n.success) {
						z.error(n.message || "Seek failed.");
						return;
					}
					J.value &&= {
						...J.value,
						position: e
					};
				} catch (e) {
					z.error(B(e, "Seek failed."));
				} finally {
					X.value = !1;
				}
			}
		}
		return ae(() => {
			xe(), Se();
		}), (e, t) => (_(), u("section", oe, [
			t[6] ||= d("header", { class: "admin-cast__head" }, [d("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			d("div", se, [(_(), u(s, null, y(m, (e) => d("button", {
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": H.value === e.id,
				"aria-controls": `panel-${e.id}`,
				class: g(["admin-cast__tab", { "admin-cast__tab--active": H.value === e.id }]),
				onClick: (t) => we(e.id)
			}, [p(n, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), f(" " + b(e.label), 1)], 10, ce)), 64))]),
			d("div", {
				id: `panel-${H.value}`,
				role: "tabpanel",
				"aria-label": `${Q.value} devices`,
				class: "admin-cast__panel"
			}, [
				d("h2", ue, b(Q.value) + " Devices", 1),
				_e.value ? (_(), u("div", de, [p(i, {
					variant: "rect",
					height: "64px"
				}), p(i, {
					variant: "rect",
					height: "64px"
				})])) : Z.value.length === 0 ? (_(), ie(te, {
					key: 1,
					icon: "cast",
					title: `No ${Q.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (_(), u("ul", fe, [(_(!0), u(s, null, y(Z.value, (e) => (_(), u("li", { key: e.device_id }, [d("button", {
					type: "button",
					class: g(["device-card", { "device-card--selected": q.value === e.device_id }]),
					"aria-pressed": q.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => $(e.device_id)
				}, [d("span", me, [p(n, { name: ve.value }, null, 8, ["name"])]), d("span", he, [d("span", {
					class: "device-card__name",
					title: e.name
				}, b(e.name), 9, ge), d("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, b(e.model), 9, S)])], 10, pe)]))), 128))])),
				q.value ? (_(), u("section", C, [t[5] ||= d("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), Y.value ? (_(), u("div", w, [...t[0] ||= [d("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : J.value ? (_(), u("div", E, [
					d("div", D, [d("p", O, b(J.value.mediaTitle || "No media"), 1), d("p", k, [p(o, { tone: J.value.isPlaying ? "success" : "neutral" }, {
						default: x(() => [f(b(J.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), d("span", A, "on " + b(be.value), 1)])]),
					ye.value && J.value.duration !== null ? (_(), u("div", j, [
						d("span", M, b(V(J.value.position)), 1),
						p(ne, {
							"model-value": J.value.position ?? 0,
							min: 0,
							max: J.value.duration ?? 100,
							step: 1,
							disabled: X.value,
							label: "Seek position",
							"format-value": V,
							class: "admin-cast__slider",
							onChange: Oe
						}, null, 8, [
							"model-value",
							"max",
							"disabled"
						]),
						d("span", N, b(V(J.value.duration)), 1)
					])) : l("", !0),
					d("div", P, [
						p(r, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: J.value.isPlaying || X.value,
							onClick: Te
						}, {
							default: x(() => [...t[2] ||= [f(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						p(r, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !J.value.isPlaying || X.value,
							onClick: Ee
						}, {
							default: x(() => [...t[3] ||= [f(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						p(r, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: X.value,
							onClick: De
						}, {
							default: x(() => [...t[4] ||= [f(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (_(), u("div", T, [...t[1] ||= [d("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : l("", !0)
			], 8, le)
		]));
	}
}), [["__scopeId", "data-v-8bd5485c"]]);
//#endregion
export { F as default };

//# sourceMappingURL=CastDevicesPage-DX-Mg8L_.js.map