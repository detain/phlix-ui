import { a as e, f as t, h as n, i as r, m as i, n as a, o as ee, r as te, t as o } from "./Button-C86XulWV.js";
import { t as s } from "./Badge-BiYXL5Nz.js";
import { n as ne, t as re } from "./cast-BeWXdpE9.js";
import { Fragment as c, computed as l, createBlock as ie, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as g, normalizeClass as _, onMounted as ae, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
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
}, he = { class: "device-card__info" }, C = ["title"], w = ["title"], T = {
	key: 3,
	class: "admin-cast__session",
	"aria-labelledby": "transport-heading"
}, E = {
	key: 0,
	class: "admin-cast__player",
	"aria-live": "polite"
}, D = {
	key: 1,
	class: "admin-cast__player"
}, O = {
	key: 2,
	class: "admin-cast__player"
}, k = { class: "admin-cast__nowplaying" }, A = { class: "admin-cast__media" }, j = { class: "admin-cast__note" }, M = { class: "admin-cast__muted" }, N = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, P = { class: "admin-cast__time" }, F = { class: "admin-cast__time" }, I = { class: "admin-cast__buttons" }, L = /*#__PURE__*/ n(/* @__PURE__ */ h({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(n) {
		let h = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], L = n, R = g("apiBase", ""), ge = l(() => typeof R == "string" ? R : R?.value ?? ""), z = new re(L.client ?? new ee({
			baseUrl: ge.value,
			tokenStore: new e()
		})), B = r();
		function V(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let H = y("chromecast"), U = y([]), W = y([]), G = y(!0), K = y(!0), q = y(null), J = y(null), Y = y(!1), X = y(!1), Z = l(() => H.value === "chromecast" ? U.value : W.value), _e = l(() => H.value === "chromecast" ? G.value : K.value), Q = l(() => h.find((e) => e.id === H.value)?.label ?? ""), ve = l(() => h.find((e) => e.id === H.value)?.icon ?? "cast"), ye = l(() => H.value === "chromecast"), be = l(() => Z.value.find((e) => e.device_id === q.value)?.name ?? "");
		async function xe() {
			G.value = !0;
			try {
				U.value = await z.listCastDevices();
			} catch (e) {
				B.error(t(e, "Failed to load Chromecast devices."));
			} finally {
				G.value = !1;
			}
		}
		async function Se() {
			K.value = !0;
			try {
				W.value = await z.listAirPlayDevices();
			} catch (e) {
				B.error(t(e, "Failed to load AirPlay devices."));
			} finally {
				K.value = !1;
			}
		}
		async function Ce(e, n) {
			Y.value = !0, J.value = null;
			try {
				if (e === "chromecast") {
					let e = await z.getCastStatus(n);
					J.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: e.position_seconds,
						duration: e.duration_seconds,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				} else {
					let e = await z.getAirPlayStatus(n);
					J.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: null,
						duration: null,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				}
			} catch (e) {
				B.error(t(e, "Failed to load playback state."));
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
					let t = H.value === "chromecast" ? await z.castPlay(e) : await z.airPlayPlay(e);
					if (!t.success) {
						B.error(t.message || "Play failed.");
						return;
					}
					J.value &&= {
						...J.value,
						isPlaying: !0
					};
				} catch (e) {
					B.error(t(e, "Play failed."));
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
					let t = H.value === "chromecast" ? await z.castPause(e) : await z.airPlayPause(e);
					if (!t.success) {
						B.error(t.message || "Pause failed.");
						return;
					}
					J.value &&= {
						...J.value,
						isPlaying: !1
					};
				} catch (e) {
					B.error(t(e, "Pause failed."));
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
					let t = H.value === "chromecast" ? await z.castStop(e) : await z.airPlayStop(e);
					if (!t.success) {
						B.error(t.message || "Stop failed.");
						return;
					}
					J.value &&= {
						...J.value,
						isPlaying: !1,
						position: null
					};
				} catch (e) {
					B.error(t(e, "Stop failed."));
				} finally {
					X.value = !1;
				}
			}
		}
		async function Oe(e) {
			let n = q.value;
			if (!(!n || H.value !== "chromecast")) {
				X.value = !0;
				try {
					let t = await z.castSeek(n, e);
					if (!t.success) {
						B.error(t.message || "Seek failed.");
						return;
					}
					J.value &&= {
						...J.value,
						position: e
					};
				} catch (e) {
					B.error(t(e, "Seek failed."));
				} finally {
					X.value = !1;
				}
			}
		}
		return ae(() => {
			xe(), Se();
		}), (e, t) => (v(), d("section", oe, [
			t[6] ||= f("header", { class: "admin-cast__head" }, [f("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			f("div", se, [(v(), d(c, null, b(h, (e) => f("button", {
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": H.value === e.id,
				"aria-controls": `panel-${e.id}`,
				class: _(["admin-cast__tab", { "admin-cast__tab--active": H.value === e.id }]),
				onClick: (t) => we(e.id)
			}, [m(i, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), p(" " + x(e.label), 1)], 10, ce)), 64))]),
			f("div", {
				id: `panel-${H.value}`,
				role: "tabpanel",
				"aria-label": `${Q.value} devices`,
				class: "admin-cast__panel"
			}, [
				f("h2", ue, x(Q.value) + " Devices", 1),
				_e.value ? (v(), d("div", de, [m(a, {
					variant: "rect",
					height: "64px"
				}), m(a, {
					variant: "rect",
					height: "64px"
				})])) : Z.value.length === 0 ? (v(), ie(te, {
					key: 1,
					icon: "cast",
					title: `No ${Q.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (v(), d("ul", fe, [(v(!0), d(c, null, b(Z.value, (e) => (v(), d("li", { key: e.device_id }, [f("button", {
					type: "button",
					class: _(["device-card", { "device-card--selected": q.value === e.device_id }]),
					"aria-pressed": q.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => $(e.device_id)
				}, [f("span", me, [m(i, { name: ve.value }, null, 8, ["name"])]), f("span", he, [f("span", {
					class: "device-card__name",
					title: e.name
				}, x(e.name), 9, C), f("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, x(e.model), 9, w)])], 10, pe)]))), 128))])),
				q.value ? (v(), d("section", T, [t[5] ||= f("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), Y.value ? (v(), d("div", E, [...t[0] ||= [f("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : J.value ? (v(), d("div", O, [
					f("div", k, [f("p", A, x(J.value.mediaTitle || "No media"), 1), f("p", j, [m(s, { tone: J.value.isPlaying ? "success" : "neutral" }, {
						default: S(() => [p(x(J.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), f("span", M, "on " + x(be.value), 1)])]),
					ye.value && J.value.duration !== null ? (v(), d("div", N, [
						f("span", P, x(V(J.value.position)), 1),
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
						f("span", F, x(V(J.value.duration)), 1)
					])) : u("", !0),
					f("div", I, [
						m(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: J.value.isPlaying || X.value,
							onClick: Te
						}, {
							default: S(() => [...t[2] ||= [p(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						m(o, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !J.value.isPlaying || X.value,
							onClick: Ee
						}, {
							default: S(() => [...t[3] ||= [p(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						m(o, {
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
				])) : (v(), d("div", D, [...t[1] ||= [f("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : u("", !0)
			], 8, le)
		]));
	}
}), [["__scopeId", "data-v-a80762cc"]]);
//#endregion
export { L as default };

//# sourceMappingURL=CastDevicesPage-TWaBKBZF.js.map