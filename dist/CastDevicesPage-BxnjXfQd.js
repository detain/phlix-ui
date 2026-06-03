import { a as e, f as t, h as n, i as r, m as i, n as a, o as ee, r as o, t as s } from "./Button-C86XulWV.js";
import { t as te } from "./Badge-BiYXL5Nz.js";
import { n as ne, t as re } from "./cast-BeWXdpE9.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ie, normalizeClass as _, onMounted as ae, openBlock as v, ref as y, renderList as b, toDisplayString as x, withCtx as S } from "vue";
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
], le = ["id", "aria-label"], ue = { class: "admin-cast__subtitle" }, C = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, w = {
	key: 3,
	class: "admin-cast__grid",
	role: "list"
}, de = [
	"aria-pressed",
	"aria-label",
	"onClick"
], fe = {
	class: "device-card__icon",
	"aria-hidden": "true"
}, pe = { class: "device-card__info" }, me = ["title"], he = ["title"], ge = {
	key: 4,
	class: "admin-cast__session",
	"aria-labelledby": "transport-heading"
}, _e = {
	key: 0,
	class: "admin-cast__player",
	"aria-live": "polite"
}, ve = {
	key: 1,
	class: "admin-cast__player"
}, ye = {
	key: 2,
	class: "admin-cast__player"
}, be = { class: "admin-cast__nowplaying" }, T = { class: "admin-cast__media" }, E = { class: "admin-cast__note" }, D = { class: "admin-cast__muted" }, O = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, k = { class: "admin-cast__time" }, A = { class: "admin-cast__time" }, j = { class: "admin-cast__buttons" }, M = /*#__PURE__*/ n(/* @__PURE__ */ g({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(n) {
		let g = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], M = n, N = ie("apiBase", ""), xe = l(() => typeof N == "string" ? N : N?.value ?? ""), P = new re(M.client ?? new ee({
			baseUrl: xe.value,
			tokenStore: new e()
		})), F = r();
		function I(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let L = y("chromecast"), R = y([]), z = y([]), B = y(!0), V = y(!0), H = y(null), U = y(null), W = y(null), G = y(null), K = y(!1), q = y(!1), J = l(() => L.value === "chromecast" ? R.value : z.value), Se = l(() => L.value === "chromecast" ? B.value : V.value), Y = l(() => L.value === "chromecast" ? H.value : U.value), X = l(() => g.find((e) => e.id === L.value)?.label ?? ""), Z = l(() => g.find((e) => e.id === L.value)?.icon ?? "cast"), Ce = l(() => L.value === "chromecast"), we = l(() => J.value.find((e) => e.device_id === W.value)?.name ?? "");
		async function Q() {
			B.value = !0, H.value = null;
			try {
				R.value = await P.listCastDevices();
			} catch (e) {
				H.value = t(e, "Failed to load Chromecast devices."), F.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		async function $() {
			V.value = !0, U.value = null;
			try {
				z.value = await P.listAirPlayDevices();
			} catch (e) {
				U.value = t(e, "Failed to load AirPlay devices."), F.error(U.value);
			} finally {
				V.value = !1;
			}
		}
		function Te() {
			L.value === "chromecast" ? Q() : $();
		}
		async function Ee(e, n) {
			K.value = !0, G.value = null;
			try {
				if (e === "chromecast") {
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
			} catch (e) {
				F.error(t(e, "Failed to load playback state."));
			} finally {
				K.value = !1;
			}
		}
		function De(e) {
			W.value = e, Ee(L.value, e);
		}
		function Oe(e) {
			e !== L.value && (L.value = e, W.value = null, G.value = null);
		}
		async function ke() {
			let e = W.value;
			if (e) {
				q.value = !0;
				try {
					let t = L.value === "chromecast" ? await P.castPlay(e) : await P.airPlayPlay(e);
					if (!t.success) {
						F.error(t.message || "Play failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !0
					};
				} catch (e) {
					F.error(t(e, "Play failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Ae() {
			let e = W.value;
			if (e) {
				q.value = !0;
				try {
					let t = L.value === "chromecast" ? await P.castPause(e) : await P.airPlayPause(e);
					if (!t.success) {
						F.error(t.message || "Pause failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !1
					};
				} catch (e) {
					F.error(t(e, "Pause failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function je() {
			let e = W.value;
			if (e) {
				q.value = !0;
				try {
					let t = L.value === "chromecast" ? await P.castStop(e) : await P.airPlayStop(e);
					if (!t.success) {
						F.error(t.message || "Stop failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !1,
						position: null
					};
				} catch (e) {
					F.error(t(e, "Stop failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Me(e) {
			let n = W.value;
			if (!(!n || L.value !== "chromecast")) {
				q.value = !0;
				try {
					let t = await P.castSeek(n, e);
					if (!t.success) {
						F.error(t.message || "Seek failed.");
						return;
					}
					G.value &&= {
						...G.value,
						position: e
					};
				} catch (e) {
					F.error(t(e, "Seek failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		return ae(() => {
			Q(), $();
		}), (e, t) => (v(), f("section", oe, [
			t[7] ||= p("header", { class: "admin-cast__head" }, [p("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			p("div", se, [(v(), f(c, null, b(g, (e) => p("button", {
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": L.value === e.id,
				"aria-controls": `panel-${e.id}`,
				class: _(["admin-cast__tab", { "admin-cast__tab--active": L.value === e.id }]),
				onClick: (t) => Oe(e.id)
			}, [h(i, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), m(" " + x(e.label), 1)], 10, ce)), 64))]),
			p("div", {
				id: `panel-${L.value}`,
				role: "tabpanel",
				"aria-label": `${X.value} devices`,
				class: "admin-cast__panel"
			}, [
				p("h2", ue, x(X.value) + " Devices", 1),
				Se.value ? (v(), f("div", C, [h(a, {
					variant: "rect",
					height: "64px"
				}), h(a, {
					variant: "rect",
					height: "64px"
				})])) : Y.value ? (v(), u(o, {
					key: 1,
					icon: "alert",
					title: `Couldn't load ${X.value} devices`,
					description: Y.value
				}, {
					actions: S(() => [h(s, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Te
					}, {
						default: S(() => [...t[0] ||= [m("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : J.value.length === 0 ? (v(), u(o, {
					key: 2,
					icon: "cast",
					title: `No ${X.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (v(), f("ul", w, [(v(!0), f(c, null, b(J.value, (e) => (v(), f("li", { key: e.device_id }, [p("button", {
					type: "button",
					class: _(["device-card", { "device-card--selected": W.value === e.device_id }]),
					"aria-pressed": W.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => De(e.device_id)
				}, [p("span", fe, [h(i, { name: Z.value }, null, 8, ["name"])]), p("span", pe, [p("span", {
					class: "device-card__name",
					title: e.name
				}, x(e.name), 9, me), p("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, x(e.model), 9, he)])], 10, de)]))), 128))])),
				W.value ? (v(), f("section", ge, [t[6] ||= p("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), K.value ? (v(), f("div", _e, [...t[1] ||= [p("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : G.value ? (v(), f("div", ye, [
					p("div", be, [p("p", T, x(G.value.mediaTitle || "No media"), 1), p("p", E, [h(te, { tone: G.value.isPlaying ? "success" : "neutral" }, {
						default: S(() => [m(x(G.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), p("span", D, "on " + x(we.value), 1)])]),
					Ce.value && G.value.duration !== null ? (v(), f("div", O, [
						p("span", k, x(I(G.value.position)), 1),
						h(ne, {
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
						p("span", A, x(I(G.value.duration)), 1)
					])) : d("", !0),
					p("div", j, [
						h(s, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: G.value.isPlaying || q.value,
							onClick: ke
						}, {
							default: S(() => [...t[3] ||= [m(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						h(s, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !G.value.isPlaying || q.value,
							onClick: Ae
						}, {
							default: S(() => [...t[4] ||= [m(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						h(s, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: q.value,
							onClick: je
						}, {
							default: S(() => [...t[5] ||= [m(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (v(), f("div", ve, [...t[2] ||= [p("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : d("", !0)
			], 8, le)
		]));
	}
}), [["__scopeId", "data-v-1d742774"]]);
//#endregion
export { M as default };

//# sourceMappingURL=CastDevicesPage-BxnjXfQd.js.map