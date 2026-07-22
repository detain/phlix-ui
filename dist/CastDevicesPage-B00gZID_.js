import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-CGig46Dx.js";
import { c as n, f as r, t as i } from "./client-BzWwyWKr.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-DWa6Ld_Z.js";
import { t as ee } from "./Badge-B6MgOwKQ.js";
import { t as te } from "./Slider-LnnvB5jy.js";
import { n as s } from "./listbox-htyKA_G5.js";
import { t as c } from "./Skeleton-DhQmxeNg.js";
import { t as l } from "./EmptyState-ZlI5t4KT.js";
import { t as ne } from "./PageHint-BoAlFFBN.js";
import { t as re } from "./cast-BvFcBEB6.js";
import { t as u } from "./helpLinks-BI4oN4Or.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as ie, normalizeClass as b, onMounted as ae, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, withCtx as E } from "vue";
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
}, xe = { class: "admin-cast__nowplaying" }, Se = { class: "admin-cast__media" }, Ce = { class: "admin-cast__note" }, D = { class: "admin-cast__muted" }, O = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, k = { class: "admin-cast__time" }, A = { class: "admin-cast__time" }, we = { class: "admin-cast__buttons" }, j = /*#__PURE__*/ e(/* @__PURE__ */ y({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(e) {
		let y = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], j = e, M = ie("apiBase", ""), Te = f(() => typeof M == "string" ? M : M?.value ?? ""), N = new re(j.client ?? new i({
			baseUrl: Te.value,
			tokenStore: new n()
		})), P = a();
		function F(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let I = S("chromecast"), L = S(null), R = S([]), z = S([]), B = S(!0), V = S(!0), H = S(null), U = S(null), W = S(null), G = S(null), K = S(!1), q = S(!1), J = f(() => I.value === "chromecast" ? R.value : z.value), Ee = f(() => I.value === "chromecast" ? B.value : V.value), Y = f(() => I.value === "chromecast" ? H.value : U.value), X = f(() => y.find((e) => e.id === I.value)?.label ?? ""), De = f(() => y.find((e) => e.id === I.value)?.icon ?? "cast"), Oe = f(() => I.value === "chromecast"), ke = f(() => J.value.find((e) => e.device_id === W.value)?.name ?? "");
		async function Z() {
			B.value = !0, H.value = null;
			try {
				R.value = await N.listCastDevices();
			} catch (e) {
				H.value = r(e, "Failed to load Chromecast devices."), P.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		async function Q() {
			V.value = !0, U.value = null;
			try {
				z.value = await N.listAirPlayDevices();
			} catch (e) {
				U.value = r(e, "Failed to load AirPlay devices."), P.error(U.value);
			} finally {
				V.value = !1;
			}
		}
		function Ae() {
			I.value === "chromecast" ? Z() : Q();
		}
		async function je(e, t) {
			K.value = !0, G.value = null;
			try {
				if (e === "chromecast") {
					let e = await N.getCastStatus(t);
					G.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: e.position_seconds,
						duration: e.duration_seconds,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				} else {
					let e = await N.getAirPlayStatus(t);
					G.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: null,
						duration: null,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				}
			} catch (e) {
				P.error(r(e, "Failed to load playback state."));
			} finally {
				K.value = !1;
			}
		}
		function Me(e) {
			W.value = e, je(I.value, e);
		}
		function $(e) {
			e !== I.value && (I.value = e, W.value = null, G.value = null);
		}
		function Ne(e) {
			L.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function Pe(e) {
			let t = y.map((e) => ({
				value: e.id,
				label: e.label
			})), n = y.findIndex((e) => e.id === I.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = s(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = s(t, n, -1);
					break;
				case "Home":
					r = s(t, -1, 1);
					break;
				case "End":
					r = s(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), $(y[r].id), Ne(r));
		}
		async function Fe() {
			let e = W.value;
			if (e) {
				q.value = !0;
				try {
					let t = I.value === "chromecast" ? await N.castPlay(e) : await N.airPlayPlay(e);
					if (!t.success) {
						P.error(t.message || "Play failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !0
					};
				} catch (e) {
					P.error(r(e, "Play failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Ie() {
			let e = W.value;
			if (e) {
				q.value = !0;
				try {
					let t = I.value === "chromecast" ? await N.castPause(e) : await N.airPlayPause(e);
					if (!t.success) {
						P.error(t.message || "Pause failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !1
					};
				} catch (e) {
					P.error(r(e, "Pause failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Le() {
			let e = W.value;
			if (e) {
				q.value = !0;
				try {
					let t = I.value === "chromecast" ? await N.castStop(e) : await N.airPlayStop(e);
					if (!t.success) {
						P.error(t.message || "Stop failed.");
						return;
					}
					G.value &&= {
						...G.value,
						isPlaying: !1,
						position: null
					};
				} catch (e) {
					P.error(r(e, "Stop failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Re(e) {
			let t = W.value;
			if (!(!t || I.value !== "chromecast")) {
				q.value = !0;
				try {
					let n = await N.castSeek(t, e);
					if (!n.success) {
						P.error(n.message || "Seek failed.");
						return;
					}
					G.value &&= {
						...G.value,
						position: e
					};
				} catch (e) {
					P.error(r(e, "Seek failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		return ae(() => {
			Z(), Q();
		}), (e, n) => (x(), h("section", oe, [
			n[8] ||= g("header", { class: "admin-cast__head" }, [g("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			v(ne, {
				links: T(u).cast.links,
				details: T(u).cast.details
			}, {
				default: E(() => [...n[0] ||= [
					_(" See the ", -1),
					g("strong", null, "Chromecast", -1),
					_(" and ", -1),
					g("strong", null, "AirPlay", -1),
					_(" devices Phlix has found on your network and control what they're playing. Switch between the two with the tabs, click a device to select it, then use ", -1),
					g("strong", null, "Play", -1),
					_(", ", -1),
					g("strong", null, "Pause", -1),
					_(", and ", -1),
					g("strong", null, "Stop", -1),
					_(" to control it — for Chromecast you can also drag the position slider to seek. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			g("div", {
				ref_key: "tablistEl",
				ref: L,
				class: "admin-cast__tabs",
				role: "tablist",
				"aria-label": "Device type",
				onKeydown: Pe
			}, [(x(), h(d, null, C(y, (e) => g("button", {
				id: `cast-tab-${e.id}`,
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": I.value === e.id,
				"aria-controls": `panel-${e.id}`,
				tabindex: I.value === e.id ? 0 : -1,
				class: b(["admin-cast__tab", { "admin-cast__tab--active": I.value === e.id }]),
				onClick: (t) => $(e.id)
			}, [v(t, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), _(" " + w(e.label), 1)], 10, se)), 64))], 544),
			g("div", {
				id: `panel-${I.value}`,
				role: "tabpanel",
				"aria-labelledby": `cast-tab-${I.value}`,
				class: "admin-cast__panel"
			}, [
				g("h2", le, w(X.value) + " Devices", 1),
				Ee.value ? (x(), h("div", ue, [v(c, {
					variant: "rect",
					height: "64px"
				}), v(c, {
					variant: "rect",
					height: "64px"
				})])) : Y.value ? (x(), p(l, {
					key: 1,
					icon: "alert",
					title: `Couldn't load ${X.value} devices`,
					description: Y.value
				}, {
					actions: E(() => [v(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Ae
					}, {
						default: E(() => [...n[1] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : J.value.length === 0 ? (x(), p(l, {
					key: 2,
					icon: "cast",
					title: `No ${X.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (x(), h("ul", de, [(x(!0), h(d, null, C(J.value, (e) => (x(), h("li", { key: e.device_id }, [g("button", {
					type: "button",
					class: b(["device-card", { "device-card--selected": W.value === e.device_id }]),
					"aria-pressed": W.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => Me(e.device_id)
				}, [g("span", pe, [v(t, { name: De.value }, null, 8, ["name"])]), g("span", me, [g("span", {
					class: "device-card__name",
					title: e.name
				}, w(e.name), 9, he), g("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, w(e.model), 9, ge)])], 10, fe)]))), 128))])),
				W.value ? (x(), h("section", _e, [n[7] ||= g("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), K.value ? (x(), h("div", ve, [...n[2] ||= [g("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : G.value ? (x(), h("div", be, [
					g("div", xe, [g("p", Se, w(G.value.mediaTitle || "No media"), 1), g("p", Ce, [v(ee, { tone: G.value.isPlaying ? "success" : "neutral" }, {
						default: E(() => [_(w(G.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), g("span", D, "on " + w(ke.value), 1)])]),
					Oe.value && G.value.duration !== null ? (x(), h("div", O, [
						g("span", k, w(F(G.value.position)), 1),
						v(te, {
							"model-value": G.value.position ?? 0,
							min: 0,
							max: G.value.duration ?? 100,
							step: 1,
							disabled: q.value,
							label: "Seek position",
							"format-value": F,
							class: "admin-cast__slider",
							onChange: Re
						}, null, 8, [
							"model-value",
							"max",
							"disabled"
						]),
						g("span", A, w(F(G.value.duration)), 1)
					])) : m("", !0),
					g("div", we, [
						v(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: G.value.isPlaying || q.value,
							onClick: Fe
						}, {
							default: E(() => [...n[4] ||= [_(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						v(o, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !G.value.isPlaying || q.value,
							onClick: Ie
						}, {
							default: E(() => [...n[5] ||= [_(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						v(o, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: q.value,
							onClick: Le
						}, {
							default: E(() => [...n[6] ||= [_(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (x(), h("div", ye, [...n[3] ||= [g("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : m("", !0)
			], 8, ce)
		]));
	}
}), [["__scopeId", "data-v-18738d95"]]);
//#endregion
export { j as default };

//# sourceMappingURL=CastDevicesPage-B00gZID_.js.map