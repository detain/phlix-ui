import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./cast-Eci9-HXu.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { n as i } from "./listbox-Dr6NFVBJ.js";
import { t as ee } from "./Badge-C6LNO9Kk.js";
import { t as te } from "./PageHint-BlhPmafC.js";
import { t as a } from "./helpLinks-iarZuNmw.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as ne } from "./Slider-CjiPl8gE.js";
import { t as s } from "./Skeleton-B2Mt2L00.js";
import { t as c } from "./EmptyState-BjOJ1k_A.js";
import { n as l, t as u } from "./Icon-CIbfiPrs.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as re, normalizeClass as b, onMounted as ie, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, withCtx as E } from "vue";
// src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
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
}, be = { class: "admin-cast__nowplaying" }, xe = { class: "admin-cast__media" }, Se = { class: "admin-cast__note" }, Ce = { class: "admin-cast__muted" }, we = {
	key: 0,
	class: "admin-cast__seek",
	role: "group",
	"aria-label": "Seek"
}, D = { class: "admin-cast__time" }, O = { class: "admin-cast__time" }, k = { class: "admin-cast__buttons" }, A = /*#__PURE__*/ l(/* @__PURE__ */ y({
	__name: "CastDevicesPage",
	props: { client: {} },
	setup(l) {
		let y = [{
			id: "chromecast",
			label: "Chromecast",
			icon: "cast"
		}, {
			id: "airplay",
			label: "AirPlay",
			icon: "tv"
		}], A = l, j = re("apiBase", ""), Te = f(() => typeof j == "string" ? j : j?.value ?? ""), M = new n(A.client ?? new e({ baseUrl: Te.value })), N = r();
		function P(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let F = S("chromecast"), I = S(null), L = S([]), R = S([]), z = S(!0), B = S(!0), V = S(null), H = S(null), U = S(null), W = S(null), G = S(!1), K = S(!1), q = f(() => F.value === "chromecast" ? L.value : R.value), Ee = f(() => F.value === "chromecast" ? z.value : B.value), J = f(() => F.value === "chromecast" ? V.value : H.value), Y = f(() => y.find((e) => e.id === F.value)?.label ?? ""), De = f(() => y.find((e) => e.id === F.value)?.icon ?? "cast"), Oe = f(() => F.value === "chromecast"), ke = f(() => q.value.find((e) => e.device_id === U.value)?.name ?? "");
		async function X() {
			z.value = !0, V.value = null;
			try {
				L.value = await M.listCastDevices();
			} catch (e) {
				V.value = t(e, "Failed to load Chromecast devices."), N.error(V.value);
			} finally {
				z.value = !1;
			}
		}
		async function Z() {
			B.value = !0, H.value = null;
			try {
				R.value = await M.listAirPlayDevices();
			} catch (e) {
				H.value = t(e, "Failed to load AirPlay devices."), N.error(H.value);
			} finally {
				B.value = !1;
			}
		}
		function Ae() {
			F.value === "chromecast" ? X() : Z();
		}
		async function je(e, n) {
			G.value = !0, W.value = null;
			try {
				if (e === "chromecast") {
					let e = await M.getCastStatus(n);
					W.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: e.position_seconds,
						duration: e.duration_seconds,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				} else {
					let e = await M.getAirPlayStatus(n);
					W.value = {
						isPlaying: e.transport_state === "PLAYING",
						position: null,
						duration: null,
						mediaTitle: e.media_title,
						deviceId: e.device_id
					};
				}
			} catch (e) {
				N.error(t(e, "Failed to load playback state."));
			} finally {
				G.value = !1;
			}
		}
		function Q(e) {
			U.value = e, je(F.value, e);
		}
		function $(e) {
			e !== F.value && (F.value = e, U.value = null, W.value = null);
		}
		function Me(e) {
			I.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function Ne(e) {
			let t = y.map((e) => ({
				value: e.id,
				label: e.label
			})), n = y.findIndex((e) => e.id === F.value), r = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					r = i(t, n, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					r = i(t, n, -1);
					break;
				case "Home":
					r = i(t, -1, 1);
					break;
				case "End":
					r = i(t, 0, -1);
					break;
				default: return;
			}
			r >= 0 && (e.preventDefault(), $(y[r].id), Me(r));
		}
		async function Pe() {
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
					N.error(t(e, "Play failed."));
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
					N.error(t(e, "Pause failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Ie() {
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
					N.error(t(e, "Stop failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		async function Le(e) {
			let n = U.value;
			if (n && F.value === "chromecast") {
				K.value = !0;
				try {
					let t = await M.castSeek(n, e);
					if (!t.success) {
						N.error(t.message || "Seek failed.");
						return;
					}
					W.value &&= {
						...W.value,
						position: e
					};
				} catch (e) {
					N.error(t(e, "Seek failed."));
				} finally {
					K.value = !1;
				}
			}
		}
		return ie(() => {
			X(), Z();
		}), (e, t) => (x(), h("section", ae, [
			t[8] ||= g("header", { class: "admin-cast__head" }, [g("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			v(te, {
				links: T(a).cast.links,
				details: T(a).cast.details
			}, {
				default: E(() => [...t[0] ||= [
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
				ref: I,
				class: "admin-cast__tabs",
				role: "tablist",
				"aria-label": "Device type",
				onKeydown: Ne
			}, [(x(), h(d, null, C(y, (e) => g("button", {
				id: `cast-tab-${e.id}`,
				key: e.id,
				type: "button",
				role: "tab",
				"aria-selected": F.value === e.id,
				"aria-controls": `panel-${e.id}`,
				tabindex: F.value === e.id ? 0 : -1,
				class: b(["admin-cast__tab", { "admin-cast__tab--active": F.value === e.id }]),
				onClick: (t) => $(e.id)
			}, [v(u, {
				name: e.icon,
				class: "admin-cast__tab-icon"
			}, null, 8, ["name"]), _(" " + w(e.label), 1)], 10, oe)), 64))], 544),
			g("div", {
				id: `panel-${F.value}`,
				role: "tabpanel",
				"aria-labelledby": `cast-tab-${F.value}`,
				class: "admin-cast__panel"
			}, [
				g("h2", ce, w(Y.value) + " Devices", 1),
				Ee.value ? (x(), h("div", le, [v(s, {
					variant: "rect",
					height: "64px"
				}), v(s, {
					variant: "rect",
					height: "64px"
				})])) : J.value ? (x(), p(c, {
					key: 1,
					icon: "alert",
					title: `Couldn’t load ${Y.value} devices`,
					description: J.value
				}, {
					actions: E(() => [v(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Ae
					}, {
						default: E(() => [...t[1] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : q.value.length === 0 ? (x(), p(c, {
					key: 2,
					icon: "cast",
					title: `No ${Y.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (x(), h("ul", ue, [(x(!0), h(d, null, C(q.value, (e) => (x(), h("li", { key: e.device_id }, [g("button", {
					type: "button",
					class: b(["device-card", { "device-card--selected": U.value === e.device_id }]),
					"aria-pressed": U.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => Q(e.device_id)
				}, [g("span", fe, [v(u, { name: De.value }, null, 8, ["name"])]), g("span", pe, [g("span", {
					class: "device-card__name",
					title: e.name
				}, w(e.name), 9, me), g("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, w(e.model), 9, he)])], 10, de)]))), 128))])),
				U.value ? (x(), h("section", ge, [t[7] ||= g("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), G.value ? (x(), h("div", _e, [...t[2] ||= [g("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : W.value ? (x(), h("div", ye, [
					g("div", be, [g("p", xe, w(W.value.mediaTitle || "No media"), 1), g("p", Se, [v(ee, { tone: W.value.isPlaying ? "success" : "neutral" }, {
						default: E(() => [_(w(W.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), g("span", Ce, "on " + w(ke.value), 1)])]),
					Oe.value && W.value.duration !== null ? (x(), h("div", we, [
						g("span", D, w(P(W.value.position)), 1),
						v(ne, {
							"model-value": W.value.position ?? 0,
							min: 0,
							max: W.value.duration ?? 100,
							step: 1,
							disabled: K.value,
							label: "Seek position",
							"format-value": P,
							class: "admin-cast__slider",
							onChange: Le
						}, null, 8, [
							"model-value",
							"max",
							"disabled"
						]),
						g("span", O, w(P(W.value.duration)), 1)
					])) : m("", !0),
					g("div", k, [
						v(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: W.value.isPlaying || K.value,
							onClick: Pe
						}, {
							default: E(() => [...t[4] ||= [_(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						v(o, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !W.value.isPlaying || K.value,
							onClick: Fe
						}, {
							default: E(() => [...t[5] ||= [_(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						v(o, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: K.value,
							onClick: Ie
						}, {
							default: E(() => [...t[6] ||= [_(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (x(), h("div", ve, [...t[3] ||= [g("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : m("", !0)
			], 8, se)
		]));
	}
}), [["__scopeId", "data-v-1343a789"]]);
export { A as default };

//# sourceMappingURL=CastDevicesPage-mi8HTld2.js.map