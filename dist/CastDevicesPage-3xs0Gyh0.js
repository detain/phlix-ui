import { c as e, d as t, n, t as r, u as i } from "./Button-C4PyCjLX.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as te } from "./Badge-D9Tdn6WP.js";
import { t as ne } from "./Slider-f9S4ziJW.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as a, t as o } from "./EmptyState-BEMIpc2l.js";
import { t as ie } from "./cast-BvFcBEB6.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ae, normalizeClass as g, onMounted as oe, openBlock as _, ref as v, renderList as y, toDisplayString as b, withCtx as x } from "vue";
//#region src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, ce = {
	class: "admin-cast__tabs",
	role: "tablist",
	"aria-label": "Device type"
}, le = [
	"aria-selected",
	"aria-controls",
	"onClick"
], ue = ["id", "aria-label"], S = { class: "admin-cast__subtitle" }, C = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, de = {
	key: 3,
	class: "admin-cast__grid",
	role: "list"
}, fe = [
	"aria-pressed",
	"aria-label",
	"onClick"
], pe = {
	class: "device-card__icon",
	"aria-hidden": "true"
}, me = { class: "device-card__info" }, he = ["title"], ge = ["title"], _e = {
	key: 4,
	class: "admin-cast__session",
	"aria-labelledby": "transport-heading"
}, ve = {
	key: 0,
	class: "admin-cast__player",
	"aria-live": "polite"
}, ye = {
	key: 1,
	class: "admin-cast__player"
}, be = {
	key: 2,
	class: "admin-cast__player"
}, w = { class: "admin-cast__nowplaying" }, T = { class: "admin-cast__media" }, E = { class: "admin-cast__note" }, D = { class: "admin-cast__muted" }, O = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, k = { class: "admin-cast__time" }, A = { class: "admin-cast__time" }, j = { class: "admin-cast__buttons" }, M = /*#__PURE__*/ t(/* @__PURE__ */ h({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(t) {
		let h = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], M = t, N = ae("apiBase", ""), xe = c(() => typeof N == "string" ? N : N?.value ?? ""), P = new ie(M.client ?? new n({
			baseUrl: xe.value,
			tokenStore: new ee()
		})), F = re();
		function I(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let L = v("chromecast"), R = v([]), z = v([]), B = v(!0), V = v(!0), H = v(null), U = v(null), W = v(null), G = v(null), K = v(!1), q = v(!1), J = c(() => L.value === "chromecast" ? R.value : z.value), Se = c(() => L.value === "chromecast" ? B.value : V.value), Y = c(() => L.value === "chromecast" ? H.value : U.value), X = c(() => h.find((e) => e.id === L.value)?.label ?? ""), Ce = c(() => h.find((e) => e.id === L.value)?.icon ?? "cast"), we = c(() => L.value === "chromecast"), Te = c(() => J.value.find((e) => e.device_id === W.value)?.name ?? "");
		async function Z() {
			B.value = !0, H.value = null;
			try {
				R.value = await P.listCastDevices();
			} catch (t) {
				H.value = e(t, "Failed to load Chromecast devices."), F.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		async function Q() {
			V.value = !0, U.value = null;
			try {
				z.value = await P.listAirPlayDevices();
			} catch (t) {
				U.value = e(t, "Failed to load AirPlay devices."), F.error(U.value);
			} finally {
				V.value = !1;
			}
		}
		function Ee() {
			L.value === "chromecast" ? Z() : Q();
		}
		async function $(t, n) {
			K.value = !0, G.value = null;
			try {
				if (t === "chromecast") {
					let e = await P.getCastStatus(n);
					G.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: e.position_seconds,
						duration: e.duration_seconds,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				} else {
					let e = await P.getAirPlayStatus(n);
					G.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: null,
						duration: null,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				}
			} catch (t) {
				F.error(e(t, "Failed to load playback state."));
			} finally {
				K.value = !1;
			}
		}
		function De(e) {
			W.value = e, $(L.value, e);
		}
		function Oe(e) {
			e !== L.value && (L.value = e, W.value = null, G.value = null);
		}
		async function ke() {
			let t = W.value;
			if (t) {
				q.value = !0;
				try {
					let e = L.value === "chromecast" ? await P.castPlay(t) : await P.airPlayPlay(t);
					if (!e.success) {
						F.error(e.message || "Play failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !0
					};
				} catch (t) {
					F.error(e(t, "Play failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Ae() {
			let t = W.value;
			if (t) {
				q.value = !0;
				try {
					let e = L.value === "chromecast" ? await P.castPause(t) : await P.airPlayPause(t);
					if (!e.success) {
						F.error(e.message || "Pause failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !1
					};
				} catch (t) {
					F.error(e(t, "Pause failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function je() {
			let t = W.value;
			if (t) {
				q.value = !0;
				try {
					let e = L.value === "chromecast" ? await P.castStop(t) : await P.airPlayStop(t);
					if (!e.success) {
						F.error(e.message || "Stop failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !1,
						position: null
					};
				} catch (t) {
					F.error(e(t, "Stop failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Me(t) {
			let n = W.value;
			if (!(!n || L.value !== "chromecast")) {
				q.value = !0;
				try {
					let e = await P.castSeek(n, t);
					if (!e.success) {
						F.error(e.message || "Seek failed.");
						return;
					}
					G.value &&= {
						...G.value,
						position: t
					};
				} catch (t) {
					F.error(e(t, "Seek failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		return oe(() => {
			Z(), Q();
		}), (e, t) => (_(), d("section", se, [
			t[7] ||= f("header", { class: "admin-cast__head" }, [f("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			f("div", ce, [(_(), d(s, null, y(h, (e) => f("button", {
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": L.value === e.id,
				"aria-controls": `panel-${e.id}`,
				class: g(["admin-cast__tab", { "admin-cast__tab--active": L.value === e.id }]),
				onClick: (t) => Oe(e.id)
			}, [m(i, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), p(" " + b(e.label), 1)], 10, le)), 64))]),
			f("div", {
				id: `panel-${L.value}`,
				role: "tabpanel",
				"aria-label": `${X.value} devices`,
				class: "admin-cast__panel"
			}, [
				f("h2", S, b(X.value) + " Devices", 1),
				Se.value ? (_(), d("div", C, [m(a, {
					variant: "rect",
					height: "64px"
				}), m(a, {
					variant: "rect",
					height: "64px"
				})])) : Y.value ? (_(), l(o, {
					key: 1,
					icon: "alert",
					title: `Couldn't load ${X.value} devices`,
					description: Y.value
				}, {
					actions: x(() => [m(r, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Ee
					}, {
						default: x(() => [...t[0] ||= [p("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : J.value.length === 0 ? (_(), l(o, {
					key: 2,
					icon: "cast",
					title: `No ${X.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (_(), d("ul", de, [(_(!0), d(s, null, y(J.value, (e) => (_(), d("li", { key: e.device_id }, [f("button", {
					type: "button",
					class: g(["device-card", { "device-card--selected": W.value === e.device_id }]),
					"aria-pressed": W.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => De(e.device_id)
				}, [f("span", pe, [m(i, { name: Ce.value }, null, 8, ["name"])]), f("span", me, [f("span", {
					class: "device-card__name",
					title: e.name
				}, b(e.name), 9, he), f("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, b(e.model), 9, ge)])], 10, fe)]))), 128))])),
				W.value ? (_(), d("section", _e, [t[6] ||= f("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), K.value ? (_(), d("div", ve, [...t[1] ||= [f("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : G.value ? (_(), d("div", be, [
					f("div", w, [f("p", T, b(G.value.mediaTitle || "No media"), 1), f("p", E, [m(te, { tone: G.value.isPlaying ? "success" : "neutral" }, {
						default: x(() => [p(b(G.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), f("span", D, "on " + b(Te.value), 1)])]),
					we.value && G.value.duration !== null ? (_(), d("div", O, [
						f("span", k, b(I(G.value.position)), 1),
						m(ne, {
							"model-value": G.value.position ?? 0,
							min: 0,
							max: G.value.duration ?? 100,
							step: 1,
							disabled: q.value,
							label: "Seek position",
							"format-value": I,
							class: "admin-cast__slider",
							onChange: Me
						}, null, 8, [
							"model-value",
							"max",
							"disabled"
						]),
						f("span", A, b(I(G.value.duration)), 1)
					])) : u("", !0),
					f("div", j, [
						m(r, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: G.value.isPlaying || q.value,
							onClick: ke
						}, {
							default: x(() => [...t[3] ||= [p(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						m(r, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !G.value.isPlaying || q.value,
							onClick: Ae
						}, {
							default: x(() => [...t[4] ||= [p(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						m(r, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: q.value,
							onClick: je
						}, {
							default: x(() => [...t[5] ||= [p(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (_(), d("div", ye, [...t[2] ||= [f("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : u("", !0)
			], 8, ue)
		]));
	}
}), [["__scopeId", "data-v-1d742774"]]);
//#endregion
export { M as default };

//# sourceMappingURL=CastDevicesPage-3xs0Gyh0.js.map