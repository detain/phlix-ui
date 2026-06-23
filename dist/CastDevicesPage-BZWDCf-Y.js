import { n as e, t } from "./Icon-ax5k7_G2.js";
import { d as n, n as r, s as i, t as a } from "./Button-C1kpaQyo.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Slider-BMn_Lp_q.js";
import { n as s } from "./listbox-htyKA_G5.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { t as ne } from "./cast-BvFcBEB6.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as re, normalizeClass as y, onMounted as b, openBlock as x, ref as S, renderList as C, toDisplayString as w, withCtx as T } from "vue";
//#region src/pages/admin/CastDevicesPage.vue?vue&type=script&setup=true&lang.ts
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
}, ye = { class: "admin-cast__nowplaying" }, be = { class: "admin-cast__media" }, xe = { class: "admin-cast__note" }, Se = { class: "admin-cast__muted" }, E = {
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
		}], A = e, j = re("apiBase", ""), Ce = d(() => typeof j == "string" ? j : j?.value ?? ""), M = new ne(A.client ?? new r({
			baseUrl: Ce.value,
			tokenStore: new i()
		})), N = te();
		function P(e) {
			if (e === null) return "--:--";
			let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
			return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
		}
		let F = S("chromecast"), I = S(null), L = S([]), R = S([]), z = S(!0), B = S(!0), V = S(null), H = S(null), U = S(null), W = S(null), G = S(!1), K = S(!1), q = d(() => F.value === "chromecast" ? L.value : R.value), we = d(() => F.value === "chromecast" ? z.value : B.value), J = d(() => F.value === "chromecast" ? V.value : H.value), Y = d(() => v.find((e) => e.id === F.value)?.label ?? ""), Te = d(() => v.find((e) => e.id === F.value)?.icon ?? "cast"), Ee = d(() => F.value === "chromecast"), De = d(() => q.value.find((e) => e.device_id === U.value)?.name ?? "");
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
			let t = v.map((e) => ({
				value: e.id,
				label: e.label
			})), n = v.findIndex((e) => e.id === F.value), r = -1;
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
			r >= 0 && (e.preventDefault(), $(v[r].id), Ae(r));
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
		return b(() => {
			X(), Z();
		}), (e, n) => (x(), m("section", ie, [
			n[7] ||= h("header", { class: "admin-cast__head" }, [h("h1", {
				id: "cast-heading",
				class: "admin-cast__title"
			}, "Cast Devices")], -1),
			h("div", {
				ref_key: "tablistEl",
				ref: I,
				class: "admin-cast__tabs",
				role: "tablist",
				"aria-label": "Device type",
				onKeydown: je
			}, [(x(), m(u, null, C(v, (e) => h("button", {
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
			}, null, 8, ["name"]), g(" " + w(e.label), 1)], 10, ae)), 64))], 544),
			h("div", {
				id: `panel-${F.value}`,
				role: "tabpanel",
				"aria-labelledby": `cast-tab-${F.value}`,
				class: "admin-cast__panel"
			}, [
				h("h2", se, w(Y.value) + " Devices", 1),
				we.value ? (x(), m("div", ce, [_(c, {
					variant: "rect",
					height: "64px"
				}), _(c, {
					variant: "rect",
					height: "64px"
				})])) : J.value ? (x(), f(l, {
					key: 1,
					icon: "alert",
					title: `Couldn't load ${Y.value} devices`,
					description: J.value
				}, {
					actions: T(() => [_(a, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: Oe
					}, {
						default: T(() => [...n[0] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["title", "description"])) : q.value.length === 0 ? (x(), f(l, {
					key: 2,
					icon: "cast",
					title: `No ${Y.value} devices discovered`,
					description: "Devices appear here once they are discovered on your network."
				}, null, 8, ["title"])) : (x(), m("ul", le, [(x(!0), m(u, null, C(q.value, (e) => (x(), m("li", { key: e.device_id }, [h("button", {
					type: "button",
					class: y(["device-card", { "device-card--selected": U.value === e.device_id }]),
					"aria-pressed": U.value === e.device_id,
					"aria-label": `Select ${e.name}`,
					onClick: (t) => ke(e.device_id)
				}, [h("span", de, [_(t, { name: Te.value }, null, 8, ["name"])]), h("span", fe, [h("span", {
					class: "device-card__name",
					title: e.name
				}, w(e.name), 9, pe), h("span", {
					class: "device-card__model",
					title: `${e.model} - ${e.host}`
				}, w(e.model), 9, me)])], 10, ue)]))), 128))])),
				U.value ? (x(), m("section", he, [n[6] ||= h("h2", {
					id: "transport-heading",
					class: "admin-cast__subtitle"
				}, "Playback Controls", -1), G.value ? (x(), m("div", ge, [...n[1] ||= [h("p", {
					role: "status",
					class: "admin-cast__muted"
				}, "Loading playback state.", -1)]])) : W.value ? (x(), m("div", ve, [
					h("div", ye, [h("p", be, w(W.value.mediaTitle || "No media"), 1), h("p", xe, [_(o, { tone: W.value.isPlaying ? "success" : "neutral" }, {
						default: T(() => [g(w(W.value.isPlaying ? "Playing" : "Paused"), 1)]),
						_: 1
					}, 8, ["tone"]), h("span", Se, "on " + w(De.value), 1)])]),
					Ee.value && W.value.duration !== null ? (x(), m("div", E, [
						h("span", D, w(P(W.value.position)), 1),
						_(ee, {
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
						h("span", O, w(P(W.value.duration)), 1)
					])) : p("", !0),
					h("div", k, [
						_(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "play",
							disabled: W.value.isPlaying || K.value,
							onClick: Me
						}, {
							default: T(() => [...n[3] ||= [g(" Play ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						_(a, {
							variant: "outline",
							size: "sm",
							"left-icon": "pause",
							disabled: !W.value.isPlaying || K.value,
							onClick: Ne
						}, {
							default: T(() => [...n[4] ||= [g(" Pause ", -1)]]),
							_: 1
						}, 8, ["disabled"]),
						_(a, {
							variant: "outline",
							size: "sm",
							"left-icon": "x",
							disabled: K.value,
							onClick: Pe
						}, {
							default: T(() => [...n[5] ||= [g(" Stop ", -1)]]),
							_: 1
						}, 8, ["disabled"])
					])
				])) : (x(), m("div", _e, [...n[2] ||= [h("p", { class: "admin-cast__muted" }, "Select a device to view playback controls.", -1)]]))])) : p("", !0)
			], 8, oe)
		]));
	}
}), [["__scopeId", "data-v-2b791676"]]);
//#endregion
export { A as default };

//# sourceMappingURL=CastDevicesPage-BZWDCf-Y.js.map