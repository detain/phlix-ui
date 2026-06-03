import { a as e, i as t, l as n, n as r, r as i, t as a, u as o } from "./Button-DFtuAYup.js";
import { t as ee } from "./EmptyState-DPlVvQLn.js";
import { t as te } from "./Badge-DypgiWDB.js";
import { n as ne, t as s } from "./cast-DkPPYmc8.js";
import { Fragment as c, computed as l, createBlock as re, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ie, normalizeClass as g, onMounted as _, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
//#region src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
var ae = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, oe = {
	class: "admin-cast__tabs",
	role: "tablist",
	"aria-label": "Device type"
}, se = [
	"aria-selected",
	"aria-controls",
	"onClick"
], ce = ["id", "aria-label"], le = { class: "admin-cast__subtitle" }, ue = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, de = {
	key: 2,
	class: "admin-cast__grid",
	role: "list"
}, fe = [
	"aria-pressed",
	"aria-label",
	"onClick"
], pe = {
	class: "device-card__icon",
	"aria-hidden": "true"
}, me = { class: "device-card__info" }, he = ["title"], ge = ["title"], C = {
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
}, M = { class: "admin-cast__time" }, N = { class: "admin-cast__time" }, P = { class: "admin-cast__buttons" }, F = /*#__PURE__*/ o(/* @__PURE__ */ h({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(o) {
		let h = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], F = o, I = ie("apiBase", ""), L = l(() => typeof I == "string" ? I : I?.value ?? ""), R = new s(F.client ?? new e({
			baseUrl: L.value,
			tokenStore: new t()
		})), z = i();
		function B(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function V(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let H = y("chromecast"), U = y([]), W = y([]), G = y(!0), K = y(!0), q = y(null), J = y(null), Y = y(!1), X = y(!1), Z = l(() => H.value === "chromecast" ? U.value : W.value), _e = l(() => H.value === "chromecast" ? G.value : K.value), Q = l(() => h.find((e) => e.id === H.value)?.label ?? ""), ve = l(() => h.find((e) => e.id === H.value)?.icon ?? "cast"), ye = l(() => H.value === "chromecast"), be = l(() => Z.value.find((e) => e.device_id === q.value)?.name ?? "");
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
		return _(() => {
			xe(), Se();
		}), (e, t) => (v(), d("section", ae, [
			t[6] ||= f("header", { class: "admin-cast__head" }, [f("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			f("div", oe, [(v(), d(c, null, b(h, (e) => f("button", {
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": H.value === e.id,
				"aria-controls": `panel-${e.id}`,
				class: g(["admin-cast__tab", { "admin-cast__tab--active": H.value === e.id }]),
				onClick: (t) => we(e.id)
			}, [m(n, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), p(" " + x(e.label), 1)], 10, se)), 64))]),
			f("div", {
				id: `panel-${H.value}`,
				role: "tabpanel",
				"aria-label": `${Q.value} devices`,
				class: "admin-cast__panel"
			}, [
				f("h2", le, x(Q.value) + " Devices", 1),
				_e.value ? (v(), d("div", ue, [m(r, {
					variant: "rect",
					height: "64px"
				}), m(r, {
					variant: "rect",
					height: "64px"
				})])) : Z.value.length === 0 ? (v(), re(ee, {
					key: 1,
					icon: "cast",
					title: `No ${Q.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (v(), d("ul", de, [(v(!0), d(c, null, b(Z.value, (e) => (v(), d("li", { key: e.device_id }, [f("button", {
					type: "button",
					class: g(["device-card", { "device-card--selected": q.value === e.device_id }]),
					"aria-pressed": q.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => $(e.device_id)
				}, [f("span", pe, [m(n, { name: ve.value }, null, 8, ["name"])]), f("span", me, [f("span", {
					class: "device-card__name",
					title: e.name
				}, x(e.name), 9, he), f("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, x(e.model), 9, ge)])], 10, fe)]))), 128))])),
				q.value ? (v(), d("section", C, [t[5] ||= f("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), Y.value ? (v(), d("div", w, [...t[0] ||= [f("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : J.value ? (v(), d("div", E, [
					f("div", D, [f("p", O, x(J.value.mediaTitle || "No media"), 1), f("p", k, [m(te, { tone: J.value.isPlaying ? "success" : "neutral" }, {
						default: S(() => [p(x(J.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), f("span", A, "on " + x(be.value), 1)])]),
					ye.value && J.value.duration !== null ? (v(), d("div", j, [
						f("span", M, x(V(J.value.position)), 1),
						m(ne, {
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
						f("span", N, x(V(J.value.duration)), 1)
					])) : u("", !0),
					f("div", P, [
						m(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: J.value.isPlaying || X.value,
							onClick: Te
						}, {
							default: S(() => [...t[2] ||= [p(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						m(a, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !J.value.isPlaying || X.value,
							onClick: Ee
						}, {
							default: S(() => [...t[3] ||= [p(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						m(a, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: X.value,
							onClick: De
						}, {
							default: S(() => [...t[4] ||= [p(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (v(), d("div", T, [...t[1] ||= [f("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : u("", !0)
			], 8, ce)
		]));
	}
}), [["__scopeId", "data-v-8bd5485c"]]);
//#endregion
export { F as default };

//# sourceMappingURL=CastDevicesPage-BRCKuJHb.js.map