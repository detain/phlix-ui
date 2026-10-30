import { l as e, t, y as n } from "./client-pLl-rDdN.js";
import { t as r } from "./cast-cRG0CVKw.js";
import { t as i } from "./useToastStore-Bu-iYU7r.js";
import { n as a } from "./listbox-Dr6NFVBJ.js";
import { t as o } from "./Badge-C6LNO9Kk.js";
import { t as ee } from "./PageHint-BlhPmafC.js";
import { t as s } from "./helpLinks-iarZuNmw.js";
import { t as c } from "./Button-1sKEdGjj.js";
import { t as te } from "./Slider-CjiPl8gE.js";
import { t as l } from "./Skeleton-B2Mt2L00.js";
import { t as u } from "./EmptyState-BjOJ1k_A.js";
import { n as d, t as f } from "./Icon-CIbfiPrs.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as ne, normalizeClass as S, onMounted as re, openBlock as C, ref as w, renderList as T, toDisplayString as E, unref as D, withCtx as O } from "vue";
// src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
var ie = {
	class: "admin-cast",
	"aria-labelledby": "cast-heading"
}, ae = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"onClick"
], oe = ["id", "aria-labelledby"], se = { class: "admin-cast__subtitle" }, ce = {
	key: 0,
	class: "admin-cast__grid",
	"aria-busy": "true"
}, le = {
	key: 3,
	class: "admin-cast__grid",
	role: "list"
}, ue = [
	"aria-pressed",
	"aria-label",
	"onClick"
], de = {
	class: "device-card__icon",
	"aria-hidden": "true"
}, fe = { class: "device-card__info" }, pe = ["title"], me = ["title"], he = {
	key: 4,
	class: "admin-cast__session",
	"aria-labelledby": "transport-heading"
}, ge = {
	key: 0,
	class: "admin-cast__player",
	"aria-live": "polite"
}, _e = {
	key: 1,
	class: "admin-cast__player"
}, ve = {
	key: 2,
	class: "admin-cast__player"
}, ye = { class: "admin-cast__nowplaying" }, be = { class: "admin-cast__media" }, xe = { class: "admin-cast__note" }, Se = { class: "admin-cast__muted" }, Ce = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, k = { class: "admin-cast__time" }, A = { class: "admin-cast__time" }, we = { class: "admin-cast__buttons" }, j = /*#__PURE__*/ d(/* @__PURE__ */ x({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(d) {
		let x = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], j = d, M = ne("apiBase", ""), Te = m(() => typeof M == "string" ? M : M?.value ?? ""), N = new r(j.client ?? new t({
			baseUrl: Te.value,
			tokenStore: new e()
		})), P = i();
		function F(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let I = w("chromecast"), L = w(null), R = w([]), z = w([]), B = w(!0), V = w(!0), H = w(null), U = w(null), W = w(null), G = w(null), K = w(!1), q = w(!1), J = m(() => I.value === "chromecast" ? R.value : z.value), Ee = m(() => I.value === "chromecast" ? B.value : V.value), Y = m(() => I.value === "chromecast" ? H.value : U.value), X = m(() => x.find((e) => e.id === I.value)?.label ?? ""), De = m(() => x.find((e) => e.id === I.value)?.icon ?? "cast"), Oe = m(() => I.value === "chromecast"), ke = m(() => J.value.find((e) => e.device_id === W.value)?.name ?? "");
		async function Z() {
			B.value = !0, H.value = null;
			try {
				R.value = await N.listCastDevices();
			} catch (e) {
				H.value = n(e, "Failed to load Chromecast devices."), P.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		async function Q() {
			V.value = !0, U.value = null;
			try {
				z.value = await N.listAirPlayDevices();
			} catch (e) {
				U.value = n(e, "Failed to load AirPlay devices."), P.error(U.value);
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
				P.error(n(e, "Failed to load playback state."));
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
			let t = x.map((e) => ({
				value: e.id,
				label: e.label
			})), n = x.findIndex((e) => e.id === I.value), r = -1;
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
			r >= 0 && (e.preventDefault(), $(x[r].id), Ne(r));
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
					P.error(n(e, "Play failed."));
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
					P.error(n(e, "Pause failed."));
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
					P.error(n(e, "Stop failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		async function Re(e) {
			let t = W.value;
			if (t && I.value === "chromecast") {
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
					P.error(n(e, "Seek failed."));
				} finally {
					q.value = !1;
				}
			}
		}
		return re(() => {
			Z(), Q();
		}), (e, t) => (C(), _("section", ie, [
			t[8] ||= v("header", { class: "admin-cast__head" }, [v("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			b(ee, {
				links: D(s).cast.links,
				details: D(s).cast.details
			}, {
				default: O(() => [...t[0] ||= [
					y(" See the ", -1),
					v("strong", null, "Chromecast", -1),
					y(" and ", -1),
					v("strong", null, "AirPlay", -1),
					y(" devices Phlix has found on your network and control what they're playing. Switch between the two with the tabs, click a device to select it, then use ", -1),
					v("strong", null, "Play", -1),
					y(", ", -1),
					v("strong", null, "Pause", -1),
					y(", and ", -1),
					v("strong", null, "Stop", -1),
					y(" to control it — for Chromecast you can also drag the position slider to seek. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			v("div", {
				ref_key: "tablistEl",
				ref: L,
				class: "admin-cast__tabs",
				role: "tablist",
				"aria-label": "Device type",
				onKeydown: Pe
			}, [(C(), _(p, null, T(x, (e) => v("button", {
				id: `cast-tab-${e.id}`,
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": I.value === e.id,
				"aria-controls": `panel-${e.id}`,
				tabindex: I.value === e.id ? 0 : -1,
				class: S(["admin-cast__tab", { "admin-cast__tab--active": I.value === e.id }]),
				onClick: (t) => $(e.id)
			}, [b(f, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), y(" " + E(e.label), 1)], 10, ae)), 64))], 544),
			v("div", {
				id: `panel-${I.value}`,
				role: "tabpanel",
				"aria-labelledby": `cast-tab-${I.value}`,
				class: "admin-cast__panel"
			}, [
				v("h2", se, E(X.value) + " Devices", 1),
				Ee.value ? (C(), _("div", ce, [b(l, {
					variant: "rect",
					height: "64px"
				}), b(l, {
					variant: "rect",
					height: "64px"
				})])) : Y.value ? (C(), h(u, {
					key: 1,
					icon: "alert",
					title: `Couldn’t load ${X.value} devices`,
					description: Y.value
				}, {
					actions: O(() => [b(c, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Ae
					}, {
						default: O(() => [...t[1] ||= [y("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : J.value.length === 0 ? (C(), h(u, {
					key: 2,
					icon: "cast",
					title: `No ${X.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (C(), _("ul", le, [(C(!0), _(p, null, T(J.value, (e) => (C(), _("li", { key: e.device_id }, [v("button", {
					type: "button",
					class: S(["device-card", { "device-card--selected": W.value === e.device_id }]),
					"aria-pressed": W.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => Me(e.device_id)
				}, [v("span", de, [b(f, { name: De.value }, null, 8, ["name"])]), v("span", fe, [v("span", {
					class: "device-card__name",
					title: e.name
				}, E(e.name), 9, pe), v("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, E(e.model), 9, me)])], 10, ue)]))), 128))])),
				W.value ? (C(), _("section", he, [t[7] ||= v("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), K.value ? (C(), _("div", ge, [...t[2] ||= [v("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : G.value ? (C(), _("div", ve, [
					v("div", ye, [v("p", be, E(G.value.mediaTitle || "No media"), 1), v("p", xe, [b(o, { tone: G.value.isPlaying ? "success" : "neutral" }, {
						default: O(() => [y(E(G.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), v("span", Se, "on " + E(ke.value), 1)])]),
					Oe.value && G.value.duration !== null ? (C(), _("div", Ce, [
						v("span", k, E(F(G.value.position)), 1),
						b(te, {
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
						v("span", A, E(F(G.value.duration)), 1)
					])) : g("", !0),
					v("div", we, [
						b(c, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: G.value.isPlaying || q.value,
							onClick: Fe
						}, {
							default: O(() => [...t[4] ||= [y(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						b(c, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !G.value.isPlaying || q.value,
							onClick: Ie
						}, {
							default: O(() => [...t[5] ||= [y(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						b(c, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: q.value,
							onClick: Le
						}, {
							default: O(() => [...t[6] ||= [y(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (C(), _("div", _e, [...t[3] ||= [v("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : g("", !0)
			], 8, oe)
		]));
	}
}), [["__scopeId", "data-v-eac12788"]]);
export { j as default };

//# sourceMappingURL=CastDevicesPage-B5Nt8Vm9.js.map