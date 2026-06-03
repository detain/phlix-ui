import { n as e, t } from "./Icon-ax5k7_G2.js";
import { c as n, n as r, t as i } from "./Button-BwQkyEkr.js";
import { t as ee } from "./tokenStore-CGMYSpg6.js";
import { t as te } from "./Badge-ArWL5-WE.js";
import { t as ne } from "./Slider-BMn_Lp_q.js";
import { n as a } from "./listbox-htyKA_G5.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as o, t as s } from "./EmptyState-Ds4WcVdG.js";
import { t as c } from "./cast-BvFcBEB6.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ie, normalizeClass as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, withCtx as w } from "vue";
//#region src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
var ae = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, oe = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], se = ["id", "aria-labelledby"], ce = { class: "admin-cast__subtitle" }, le = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, ue = {
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
}, be = { class: "admin-cast__nowplaying" }, xe = { class: "admin-cast__media" }, Se = { class: "admin-cast__note" }, T = { class: "admin-cast__muted" }, E = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, D = { class: "admin-cast__time" }, O = { class: "admin-cast__time" }, k = { class: "admin-cast__buttons" }, A = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(e) {
		let _ = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], A = e, j = ie("apiBase", ""), Ce = u(() => typeof j == "string" ? j : j?.value ?? ""), M = new c(A.client ?? new r({
			baseUrl: Ce.value,
			tokenStore: new ee()
		})), N = re();
		function P(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let F = x("chromecast"), I = x(null), L = x([]), R = x([]), z = x(!0), B = x(!0), V = x(null), H = x(null), U = x(null), W = x(null), G = x(!1), K = x(!1), q = u(() => F.value === "chromecast" ? L.value : R.value), we = u(() => F.value === "chromecast" ? z.value : B.value), J = u(() => F.value === "chromecast" ? V.value : H.value), Y = u(() => _.find((e) => e.id === F.value)?.label ?? ""), Te = u(() => _.find((e) => e.id === F.value)?.icon ?? "cast"), Ee = u(() => F.value === "chromecast"), De = u(() => q.value.find((e) => e.device_id === U.value)?.name ?? "");
		async function X() {
			z.value = !0, V.value = null;
			try {
				L.value = await M.listCastDevices();
			} catch (e) {
				V.value = n(e, "Failed to load Chromecast devices."), N.error(V.value);
			} finally {
				z.value = !1;
			}
		}
		async function Z() {
			B.value = !0, H.value = null;
			try {
				R.value = await M.listAirPlayDevices();
			} catch (e) {
				H.value = n(e, "Failed to load AirPlay devices."), N.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		function Oe() {
			F.value === "chromecast" ? X() : Z();
		}
		async function Q(e, t) {
			G.value = !0, W.value = null;
			try {
				if (e === "chromecast") {
					let e = await M.getCastStatus(t);
					W.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: e.position_seconds,
						duration: e.duration_seconds,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				} else {
					let e = await M.getAirPlayStatus(t);
					W.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: null,
						duration: null,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				}
			} catch (e) {
				N.error(n(e, "Failed to load playback state."));
			} finally {
				G.value = !1;
			}
		}
		function ke(e) {
			U.value = e, Q(F.value, e);
		}
		function $(e) {
			e !== F.value && (F.value = e, U.value = null, W.value = null);
		}
		function Ae(e) {
			I.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function je(e) {
			let t = _.map((e) => ({
				value: e.id,
				label: e.label
			})), n = _.findIndex((e) => e.id === F.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = a(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = a(t, n, -1);
					break;
				case "Home":
					r = a(t, -1, 1);
					break;
				case "End":
					r = a(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), $(_[r].id), Ae(r));
		}
		async function Me() {
			let e = U.value;
			if (e) {
				K.value = !0;
				try {
					let t = F.value === "chromecast" ? await M.castPlay(e) : await M.airPlayPlay(e);
					if (!t.success) {
						N.error(t.message || "Play failed.");
						return;
					}
					W.value &&= {
						...W.value,
						isPlaying: !0
					};
				} catch (e) {
					N.error(n(e, "Play failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Ne() {
			let e = U.value;
			if (e) {
				K.value = !0;
				try {
					let t = F.value === "chromecast" ? await M.castPause(e) : await M.airPlayPause(e);
					if (!t.success) {
						N.error(t.message || "Pause failed.");
						return;
					}
					W.value &&= {
						...W.value,
						isPlaying: !1
					};
				} catch (e) {
					N.error(n(e, "Pause failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Pe() {
			let e = U.value;
			if (e) {
				K.value = !0;
				try {
					let t = F.value === "chromecast" ? await M.castStop(e) : await M.airPlayStop(e);
					if (!t.success) {
						N.error(t.message || "Stop failed.");
						return;
					}
					W.value &&= {
						...W.value,
						isPlaying: !1,
						position: null
					};
				} catch (e) {
					N.error(n(e, "Stop failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Fe(e) {
			let t = U.value;
			if (!(!t || F.value !== "chromecast")) {
				K.value = !0;
				try {
					let n = await M.castSeek(t, e);
					if (!n.success) {
						N.error(n.message || "Seek failed.");
						return;
					}
					W.value &&= {
						...W.value,
						position: e
					};
				} catch (e) {
					N.error(n(e, "Seek failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		return y(() => {
			X(), Z();
		}), (e, n) => (b(), p("section", ae, [
			n[7] ||= m("header", { class: "admin-cast__head" }, [m("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			m("div", {
				ref_key: "tablistEl",
				ref: I,
				class: "admin-cast__tabs",
				role: "tablist",
				"aria-label": "Device type",
				onKeydown: je
			}, [(b(), p(l, null, S(_, (e) => m("button", {
				id: `cast-tab-${e.id}`,
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": F.value === e.id,
				"aria-controls": `panel-${e.id}`,
				tabindex: F.value === e.id ? 0 : -1,
				class: v(["admin-cast__tab", { "admin-cast__tab--active": F.value === e.id }]),
				onClick: (t) => $(e.id)
			}, [g(t, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), h(" " + C(e.label), 1)], 10, oe)), 64))], 544),
			m("div", {
				id: `panel-${F.value}`,
				role: "tabpanel",
				"aria-labelledby": `cast-tab-${F.value}`,
				class: "admin-cast__panel"
			}, [
				m("h2", ce, C(Y.value) + " Devices", 1),
				we.value ? (b(), p("div", le, [g(o, {
					variant: "rect",
					height: "64px"
				}), g(o, {
					variant: "rect",
					height: "64px"
				})])) : J.value ? (b(), d(s, {
					key: 1,
					icon: "alert",
					title: `Couldn't load ${Y.value} devices`,
					description: J.value
				}, {
					actions: w(() => [g(i, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Oe
					}, {
						default: w(() => [...n[0] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : q.value.length === 0 ? (b(), d(s, {
					key: 2,
					icon: "cast",
					title: `No ${Y.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (b(), p("ul", ue, [(b(!0), p(l, null, S(q.value, (e) => (b(), p("li", { key: e.device_id }, [m("button", {
					type: "button",
					class: v(["device-card", { "device-card--selected": U.value === e.device_id }]),
					"aria-pressed": U.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => ke(e.device_id)
				}, [m("span", fe, [g(t, { name: Te.value }, null, 8, ["name"])]), m("span", pe, [m("span", {
					class: "device-card__name",
					title: e.name
				}, C(e.name), 9, me), m("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, C(e.model), 9, he)])], 10, de)]))), 128))])),
				U.value ? (b(), p("section", ge, [n[6] ||= m("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), G.value ? (b(), p("div", _e, [...n[1] ||= [m("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : W.value ? (b(), p("div", ye, [
					m("div", be, [m("p", xe, C(W.value.mediaTitle || "No media"), 1), m("p", Se, [g(te, { tone: W.value.isPlaying ? "success" : "neutral" }, {
						default: w(() => [h(C(W.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), m("span", T, "on " + C(De.value), 1)])]),
					Ee.value && W.value.duration !== null ? (b(), p("div", E, [
						m("span", D, C(P(W.value.position)), 1),
						g(ne, {
							"model-value": W.value.position ?? 0,
							min: 0,
							max: W.value.duration ?? 100,
							step: 1,
							disabled: K.value,
							label: "Seek position",
							"format-value": P,
							class: "admin-cast__slider",
							onChange: Fe
						}, null, 8, [
							"model-value",
							"max",
							"disabled"
						]),
						m("span", O, C(P(W.value.duration)), 1)
					])) : f("", !0),
					m("div", k, [
						g(i, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: W.value.isPlaying || K.value,
							onClick: Me
						}, {
							default: w(() => [...n[3] ||= [h(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						g(i, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !W.value.isPlaying || K.value,
							onClick: Ne
						}, {
							default: w(() => [...n[4] ||= [h(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						g(i, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: K.value,
							onClick: Pe
						}, {
							default: w(() => [...n[5] ||= [h(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (b(), p("div", ve, [...n[2] ||= [m("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : f("", !0)
			], 8, se)
		]));
	}
}), [["__scopeId", "data-v-2b791676"]]);
//#endregion
export { A as default };

//# sourceMappingURL=CastDevicesPage-DentGPYn.js.map