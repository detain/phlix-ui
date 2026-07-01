import { n as e, t } from "./Icon-24ngwBUH.js";
import { c as n, f as r, t as i } from "./client-fw74f3l_.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as te } from "./Badge-DnDrMVUo.js";
import { t as ne } from "./Slider-CaOjV5mW.js";
import { n as o } from "./listbox-htyKA_G5.js";
import { t as s } from "./Skeleton-BUq2D39t.js";
import { t as c } from "./EmptyState-0XgHKEGf.js";
import { t as re } from "./PageHint-DR8OWfto.js";
import { t as l } from "./cast-BvFcBEB6.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ie, normalizeClass as y, onMounted as ae, openBlock as b, ref as x, renderList as S, toDisplayString as C, withCtx as w } from "vue";
//#region src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
var oe = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, se = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], ce = ["id", "aria-labelledby"], le = { class: "admin-cast__subtitle" }, ue = {
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
}, xe = { class: "admin-cast__nowplaying" }, Se = { class: "admin-cast__media" }, Ce = { class: "admin-cast__note" }, T = { class: "admin-cast__muted" }, E = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, D = { class: "admin-cast__time" }, O = { class: "admin-cast__time" }, k = { class: "admin-cast__buttons" }, A = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(e) {
		let v = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], A = e, j = ie("apiBase", ""), we = d(() => typeof j == "string" ? j : j?.value ?? ""), M = new l(A.client ?? new i({
			baseUrl: we.value,
			tokenStore: new n()
		})), N = ee();
		function P(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let F = x("chromecast"), I = x(null), L = x([]), R = x([]), z = x(!0), B = x(!0), V = x(null), H = x(null), U = x(null), W = x(null), G = x(!1), K = x(!1), q = d(() => F.value === "chromecast" ? L.value : R.value), Te = d(() => F.value === "chromecast" ? z.value : B.value), J = d(() => F.value === "chromecast" ? V.value : H.value), Y = d(() => v.find((e) => e.id === F.value)?.label ?? ""), Ee = d(() => v.find((e) => e.id === F.value)?.icon ?? "cast"), De = d(() => F.value === "chromecast"), Oe = d(() => q.value.find((e) => e.device_id === U.value)?.name ?? "");
		async function X() {
			z.value = !0, V.value = null;
			try {
				L.value = await M.listCastDevices();
			} catch (e) {
				V.value = r(e, "Failed to load Chromecast devices."), N.error(V.value);
			} finally {
				z.value = !1;
			}
		}
		async function Z() {
			B.value = !0, H.value = null;
			try {
				R.value = await M.listAirPlayDevices();
			} catch (e) {
				H.value = r(e, "Failed to load AirPlay devices."), N.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		function Q() {
			F.value === "chromecast" ? X() : Z();
		}
		async function ke(e, t) {
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
				N.error(r(e, "Failed to load playback state."));
			} finally {
				G.value = !1;
			}
		}
		function Ae(e) {
			U.value = e, ke(F.value, e);
		}
		function $(e) {
			e !== F.value && (F.value = e, U.value = null, W.value = null);
		}
		function je(e) {
			I.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function Me(e) {
			let t = v.map((e) => ({
				value: e.id,
				label: e.label
			})), n = v.findIndex((e) => e.id === F.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = o(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = o(t, n, -1);
					break;
				case "Home":
					r = o(t, -1, 1);
					break;
				case "End":
					r = o(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), $(v[r].id), je(r));
		}
		async function Ne() {
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
					N.error(r(e, "Play failed."));
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
					N.error(r(e, "Pause failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Fe() {
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
					N.error(r(e, "Stop failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Ie(e) {
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
					N.error(r(e, "Seek failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		return ae(() => {
			X(), Z();
		}), (e, n) => (b(), m("section", oe, [
			n[8] ||= h("header", { class: "admin-cast__head" }, [h("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			_(re, null, {
				default: w(() => [...n[0] ||= [
					g(" See the ", -1),
					h("strong", null, "Chromecast", -1),
					g(" and ", -1),
					h("strong", null, "AirPlay", -1),
					g(" devices Phlix has found on your network and control what they're playing. Switch between the two with the tabs, click a device to select it, then use ", -1),
					h("strong", null, "Play", -1),
					g(", ", -1),
					h("strong", null, "Pause", -1),
					g(", and ", -1),
					h("strong", null, "Stop", -1),
					g(" to control it — for Chromecast you can also drag the position slider to seek. ", -1)
				]]),
				_: 1
			}),
			h("div", {
				ref_key: "tablistEl",
				ref: I,
				class: "admin-cast__tabs",
				role: "tablist",
				"aria-label": "Device type",
				onKeydown: Me
			}, [(b(), m(u, null, S(v, (e) => h("button", {
				id: `cast-tab-${e.id}`,
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": F.value === e.id,
				"aria-controls": `panel-${e.id}`,
				tabindex: F.value === e.id ? 0 : -1,
				class: y(["admin-cast__tab", { "admin-cast__tab--active": F.value === e.id }]),
				onClick: (t) => $(e.id)
			}, [_(t, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), g(" " + C(e.label), 1)], 10, se)), 64))], 544),
			h("div", {
				id: `panel-${F.value}`,
				role: "tabpanel",
				"aria-labelledby": `cast-tab-${F.value}`,
				class: "admin-cast__panel"
			}, [
				h("h2", le, C(Y.value) + " Devices", 1),
				Te.value ? (b(), m("div", ue, [_(s, {
					variant: "rect",
					height: "64px"
				}), _(s, {
					variant: "rect",
					height: "64px"
				})])) : J.value ? (b(), f(c, {
					key: 1,
					icon: "alert",
					title: `Couldn't load ${Y.value} devices`,
					description: J.value
				}, {
					actions: w(() => [_(a, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Q
					}, {
						default: w(() => [...n[1] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : q.value.length === 0 ? (b(), f(c, {
					key: 2,
					icon: "cast",
					title: `No ${Y.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (b(), m("ul", de, [(b(!0), m(u, null, S(q.value, (e) => (b(), m("li", { key: e.device_id }, [h("button", {
					type: "button",
					class: y(["device-card", { "device-card--selected": U.value === e.device_id }]),
					"aria-pressed": U.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => Ae(e.device_id)
				}, [h("span", pe, [_(t, { name: Ee.value }, null, 8, ["name"])]), h("span", me, [h("span", {
					class: "device-card__name",
					title: e.name
				}, C(e.name), 9, he), h("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, C(e.model), 9, ge)])], 10, fe)]))), 128))])),
				U.value ? (b(), m("section", _e, [n[7] ||= h("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), G.value ? (b(), m("div", ve, [...n[2] ||= [h("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : W.value ? (b(), m("div", be, [
					h("div", xe, [h("p", Se, C(W.value.mediaTitle || "No media"), 1), h("p", Ce, [_(te, { tone: W.value.isPlaying ? "success" : "neutral" }, {
						default: w(() => [g(C(W.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), h("span", T, "on " + C(Oe.value), 1)])]),
					De.value && W.value.duration !== null ? (b(), m("div", E, [
						h("span", D, C(P(W.value.position)), 1),
						_(ne, {
							"model-value": W.value.position ?? 0,
							min: 0,
							max: W.value.duration ?? 100,
							step: 1,
							disabled: K.value,
							label: "Seek position",
							"format-value": P,
							class: "admin-cast__slider",
							onChange: Ie
						}, null, 8, [
							"model-value",
							"max",
							"disabled"
						]),
						h("span", O, C(P(W.value.duration)), 1)
					])) : p("", !0),
					h("div", k, [
						_(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: W.value.isPlaying || K.value,
							onClick: Ne
						}, {
							default: w(() => [...n[4] ||= [g(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						_(a, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !W.value.isPlaying || K.value,
							onClick: Pe
						}, {
							default: w(() => [...n[5] ||= [g(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						_(a, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: K.value,
							onClick: Fe
						}, {
							default: w(() => [...n[6] ||= [g(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (b(), m("div", ye, [...n[3] ||= [h("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : p("", !0)
			], 8, ce)
		]));
	}
}), [["__scopeId", "data-v-c2ae61d2"]]);
//#endregion
export { A as default };

//# sourceMappingURL=CastDevicesPage-CQORQFRn.js.map