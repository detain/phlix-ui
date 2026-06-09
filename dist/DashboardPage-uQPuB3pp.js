import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, n, t as r } from "./Button-BwQkyEkr.js";
import { t as i } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Select-Ia95mIJq.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Skeleton-DkSoWF3C.js";
import { t as s } from "./EmptyState-B2QnGIQT.js";
import { t as ne } from "./dashboard-BTCOCTHQ.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as re, normalizeStyle as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as _, ref as v, renderList as y, toDisplayString as b, watch as se, withCtx as x } from "vue";
//#region src/pages/admin/DashboardPage.vue?vue&type=script&setup=true&lang.ts
var ce = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, le = { class: "admin-dash__head" }, ue = { class: "admin-dash__grid" }, de = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, fe = { class: "admin-dash__card-head" }, pe = {
	key: 0,
	class: "admin-dash__skel"
}, me = {
	key: 3,
	class: "admin-dash__np-list",
	role: "list"
}, he = { class: "admin-dash__np-info" }, ge = { class: "admin-dash__np-user" }, _e = ["title"], ve = { class: "admin-dash__np-progress" }, ye = ["aria-valuenow"], be = { class: "admin-dash__np-pct" }, xe = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, Se = {
	key: 0,
	class: "admin-dash__skel"
}, Ce = {
	key: 3,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, we = { class: "admin-dash__rank" }, Te = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, Ee = {
	key: 0,
	class: "admin-dash__skel"
}, De = {
	key: 3,
	class: "admin-dash__media-list",
	role: "list"
}, Oe = { class: "admin-dash__media-rank" }, ke = { class: "admin-dash__media-info" }, Ae = ["title"], je = { class: "admin-dash__media-stats" }, Me = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, Ne = {
	key: 0,
	class: "admin-dash__skel"
}, Pe = { class: "admin-dash__storage-grid" }, Fe = { class: "admin-dash__storage-count" }, Ie = { class: "admin-dash__storage-size" }, Le = {
	key: 0,
	class: "admin-dash__storage-note"
}, Re = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, ze = {
	key: 0,
	class: "admin-dash__skel"
}, Be = {
	key: 3,
	class: "admin-dash__activity"
}, Ve = {
	class: "admin-dash__activity-list",
	role: "list"
}, He = { class: "admin-dash__activity-user" }, Ue = ["title"], We = ["datetime", "title"], S = 20, Ge = 3e4, C = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "DashboardPage",
	props: { client: {} },
	setup(e) {
		let g = e, C = re("apiBase", ""), Ke = l(() => typeof C == "string" ? C : C?.value ?? ""), w = new ne(g.client ?? new n({
			baseUrl: Ke.value,
			tokenStore: new i()
		})), T = te();
		function E(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function D(e) {
			if (e === 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = Math.min(Math.floor(Math.log(e) / Math.log(1024)), t.length - 1);
			return `${(e / 1024 ** n).toFixed(1)} ${t[n]}`;
		}
		function qe(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		function O(e) {
			switch ((e ?? "").toLowerCase()) {
				case "movie": return "accent";
				case "series": return "success";
				case "photo": return "warning";
				case "audiobook": return "info";
				default: return "neutral";
			}
		}
		function Je(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let Ye = [
			{
				value: 7,
				label: "Last 7 days"
			},
			{
				value: 30,
				label: "Last 30 days"
			},
			{
				value: 90,
				label: "Last 90 days"
			}
		], k = v(30), A = v([]), j = v([]), M = v([]), N = v([]), P = v([]), F = v(!0), I = v(!0), L = v(!0), R = v(!0), z = v(!0), B = v(!1), V = v(!0), H = v(null), U = v(null), W = v(null), G = v(null), K = v(null), q = l(() => N.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function J() {
			H.value = null;
			try {
				A.value = await w.getNowPlaying();
			} catch (e) {
				H.value = t(e, "Failed to load now playing."), T.error(H.value);
			} finally {
				F.value = !1;
			}
		}
		async function Y(e) {
			I.value = !0, U.value = null;
			try {
				j.value = await w.getTopUsers(10, e);
			} catch (e) {
				U.value = t(e, "Failed to load top users."), T.error(U.value);
			} finally {
				I.value = !1;
			}
		}
		async function X(e) {
			L.value = !0, W.value = null;
			try {
				M.value = await w.getTopMedia(10, e);
			} catch (e) {
				W.value = t(e, "Failed to load top media."), T.error(W.value);
			} finally {
				L.value = !1;
			}
		}
		async function Z() {
			G.value = null;
			try {
				N.value = await w.getStorage();
			} catch (e) {
				G.value = t(e, "Failed to load storage."), T.error(G.value);
			} finally {
				R.value = !1;
			}
		}
		async function Q(e, n = !1) {
			n ? B.value = !0 : (z.value = !0, K.value = null);
			try {
				let t = await w.getActivity(e);
				n ? P.value = [...P.value, ...t] : P.value = t, V.value = t.length === S;
			} catch (e) {
				let r = t(e, "Failed to load activity.");
				n || (K.value = r), T.error(r);
			} finally {
				z.value = !1, B.value = !1;
			}
		}
		function Xe() {
			Q(P.value.length + S, !0);
		}
		let $ = null;
		return se(k, (e) => {
			Y(e), X(e);
		}), oe(() => {
			J(), Z(), Q(S), Y(k.value), X(k.value), $ = setInterval(() => {
				w.getNowPlaying().then((e) => {
					A.value = e, H.value = null;
				}).catch(() => {});
			}, Ge);
		}), ae(() => {
			$ !== null && (clearInterval($), $ = null);
		}), (e, t) => (_(), f("section", ce, [p("header", le, [t[4] ||= p("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), h(ee, {
			"model-value": k.value,
			options: Ye,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => k.value = Number(e)
		}, null, 8, ["model-value"])]), p("div", ue, [
			p("section", de, [p("header", fe, [t[5] ||= p("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), A.value.length > 0 ? (_(), u(a, {
				key: 0,
				tone: "accent",
				label: `${A.value.length} active sessions`
			}, {
				default: x(() => [m(b(A.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : d("", !0)]), F.value ? (_(), f("div", pe, [h(o, {
				variant: "text",
				lines: 4
			})])) : H.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load now playing",
				description: H.value
			}, {
				actions: x(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: x(() => [...t[6] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "play",
				title: "No active sessions"
			})) : (_(), f("ul", me, [(_(!0), f(c, null, y(A.value, (e) => (_(), f("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [p("div", he, [
				p("span", ge, b(e.user_name), 1),
				p("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, b(e.media_title), 9, _e),
				h(a, { tone: O(e.media_type) }, {
					default: x(() => [m(b(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), p("div", ve, [p("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [p("div", {
				class: "admin-dash__bar-fill",
				style: ie({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, ye), p("span", be, b(e.progress_percent) + "%", 1)])]))), 128))]))]),
			p("section", xe, [t[9] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), I.value ? (_(), f("div", Se, [h(o, {
				variant: "text",
				lines: 4
			})])) : U.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load top users",
				description: U.value
			}, {
				actions: x(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[1] ||= (e) => Y(k.value)
				}, {
					default: x(() => [...t[7] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "user",
				title: "No user data yet"
			})) : (_(), f("table", Ce, [t[8] ||= p("thead", null, [p("tr", null, [
				p("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				p("th", { scope: "col" }, "User"),
				p("th", { scope: "col" }, "Watch Time"),
				p("th", { scope: "col" }, "Plays")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(j.value, (e, t) => (_(), f("tr", { key: e.user_id }, [
				p("td", we, b(t + 1), 1),
				p("td", null, b(e.user_name), 1),
				p("td", null, b(E(e.total_watch_time_seconds)), 1),
				p("td", null, b(e.play_count), 1)
			]))), 128))])]))]),
			p("section", Te, [t[11] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), L.value ? (_(), f("div", Ee, [h(o, {
				variant: "text",
				lines: 4
			})])) : W.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load top media",
				description: W.value
			}, {
				actions: x(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => X(k.value)
				}, {
					default: x(() => [...t[10] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "film",
				title: "No media data yet"
			})) : (_(), f("ol", De, [(_(!0), f(c, null, y(M.value, (e, t) => (_(), f("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				p("span", Oe, b(t + 1), 1),
				p("div", ke, [p("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, b(e.media_title), 9, Ae), h(a, { tone: O(e.media_type) }, {
					default: x(() => [m(b(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("div", je, [p("span", null, b(e.play_count) + " plays", 1), p("span", null, b(E(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			p("section", Me, [t[13] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), R.value ? (_(), f("div", Ne, [h(o, {
				variant: "text",
				lines: 3
			})])) : G.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load storage",
				description: G.value
			}, {
				actions: x(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: x(() => [...t[12] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "image",
				title: "No storage data"
			})) : (_(), f(c, { key: 3 }, [p("div", Pe, [(_(!0), f(c, null, y(N.value, (e) => (_(), f("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				h(a, { tone: O(e.media_type) }, {
					default: x(() => [m(b(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				p("div", Fe, b(e.item_count.toLocaleString()) + " items", 1),
				p("div", Ie, b(D(e.total_bytes)), 1)
			]))), 128))]), q.value > 0 ? (_(), f("p", Le, " Transcode cache: " + b(D(q.value)), 1)) : d("", !0)], 64))]),
			p("section", Re, [t[16] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), z.value ? (_(), f("div", ze, [h(o, {
				variant: "text",
				lines: 5
			})])) : K.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load activity",
				description: K.value
			}, {
				actions: x(() => [h(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[3] ||= (e) => Q(S)
				}, {
					default: x(() => [...t[14] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "list",
				title: "No recent activity"
			})) : (_(), f("div", Be, [p("ul", Ve, [(_(!0), f(c, null, y(P.value, (e) => (_(), f("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				h(a, { tone: Je(e.event_type) }, {
					default: x(() => [m(b(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				p("span", He, b(e.user_name), 1),
				p("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, b(e.media_title), 9, Ue),
				p("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, b(qe(e.created_at)), 9, We)
			]))), 128))]), V.value ? (_(), u(r, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: B.value,
				onClick: Xe
			}, {
				default: x(() => [...t[15] ||= [m(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : d("", !0)]))])
		])]));
	}
}), [["__scopeId", "data-v-3e991b7c"]]);
//#endregion
export { C as default };

//# sourceMappingURL=DashboardPage-uQPuB3pp.js.map