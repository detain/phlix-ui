import { a as e, i as t, m as n, n as r, r as i, t as ee } from "./Button-DjEQ9y17.js";
import { t as a } from "./EmptyState-bbKd8GNA.js";
import { t as te } from "./Select-BPlN5xaU.js";
import { t as o } from "./Badge-DobVc76J.js";
import { t as ne } from "./dashboard-BTCOCTHQ.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as re, normalizeStyle as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as g, ref as _, renderList as v, toDisplayString as y, watch as se, withCtx as b } from "vue";
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
	key: 2,
	class: "admin-dash__np-list",
	role: "list"
}, he = { class: "admin-dash__np-info" }, ge = { class: "admin-dash__np-user" }, _e = ["title"], ve = { class: "admin-dash__np-progress" }, ye = ["aria-valuenow"], be = { class: "admin-dash__np-pct" }, xe = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, Se = {
	key: 0,
	class: "admin-dash__skel"
}, Ce = {
	key: 2,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, we = { class: "admin-dash__rank" }, Te = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, Ee = {
	key: 0,
	class: "admin-dash__skel"
}, x = {
	key: 2,
	class: "admin-dash__media-list",
	role: "list"
}, S = { class: "admin-dash__media-rank" }, C = { class: "admin-dash__media-info" }, w = ["title"], T = { class: "admin-dash__media-stats" }, E = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, D = {
	key: 0,
	class: "admin-dash__skel"
}, De = { class: "admin-dash__storage-grid" }, Oe = { class: "admin-dash__storage-count" }, ke = { class: "admin-dash__storage-size" }, Ae = {
	key: 0,
	class: "admin-dash__storage-note"
}, je = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, Me = {
	key: 0,
	class: "admin-dash__skel"
}, Ne = {
	key: 2,
	class: "admin-dash__activity"
}, Pe = {
	class: "admin-dash__activity-list",
	role: "list"
}, Fe = { class: "admin-dash__activity-user" }, O = ["title"], Ie = ["datetime", "title"], k = 20, Le = 3e4, A = /*#__PURE__*/ n(/* @__PURE__ */ h({
	__name: "DashboardPage",
	props: { client: {} },
	setup(n) {
		let h = n, A = re("apiBase", ""), Re = c(() => typeof A == "string" ? A : A?.value ?? ""), j = new ne(h.client ?? new e({
			baseUrl: Re.value,
			tokenStore: new t()
		})), M = i();
		function N(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function P(e) {
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
		function ze(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		function F(e) {
			switch ((e ?? "").toLowerCase()) {
				case "movie": return "accent";
				case "series": return "success";
				case "photo": return "warning";
				case "audiobook": return "info";
				default: return "neutral";
			}
		}
		function Be(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let Ve = [
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
		], I = _(30), L = _([]), R = _([]), z = _([]), B = _([]), V = _([]), H = _(!0), U = _(!0), W = _(!0), G = _(!0), K = _(!0), q = _(!1), J = _(!0), Y = c(() => B.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function He() {
			try {
				L.value = await j.getNowPlaying();
			} catch {
				M.error("Failed to load now playing.");
			} finally {
				H.value = !1;
			}
		}
		async function X(e) {
			U.value = !0;
			try {
				R.value = await j.getTopUsers(10, e);
			} catch {
				M.error("Failed to load top users.");
			} finally {
				U.value = !1;
			}
		}
		async function Z(e) {
			W.value = !0;
			try {
				z.value = await j.getTopMedia(10, e);
			} catch {
				M.error("Failed to load top media.");
			} finally {
				W.value = !1;
			}
		}
		async function Ue() {
			try {
				B.value = await j.getStorage();
			} catch {
				M.error("Failed to load storage.");
			} finally {
				G.value = !1;
			}
		}
		async function Q(e, t = !1) {
			t ? q.value = !0 : K.value = !0;
			try {
				let n = await j.getActivity(e);
				t ? V.value = [...V.value, ...n] : V.value = n, J.value = n.length === k;
			} catch {
				M.error("Failed to load activity.");
			} finally {
				K.value = !1, q.value = !1;
			}
		}
		function We() {
			Q(V.value.length + k, !0);
		}
		let $ = null;
		return se(I, (e) => {
			X(e), Z(e);
		}), oe(() => {
			He(), Ue(), Q(k), X(I.value), Z(I.value), $ = setInterval(() => {
				j.getNowPlaying().then((e) => {
					L.value = e;
				}).catch(() => {});
			}, Le);
		}), ae(() => {
			$ !== null && (clearInterval($), $ = null);
		}), (e, t) => (g(), d("section", ce, [f("header", le, [t[1] ||= f("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), m(te, {
			"model-value": I.value,
			options: Ve,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => I.value = Number(e)
		}, null, 8, ["model-value"])]), f("div", ue, [
			f("section", de, [f("header", fe, [t[2] ||= f("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), L.value.length > 0 ? (g(), l(o, {
				key: 0,
				tone: "accent",
				label: `${L.value.length} active sessions`
			}, {
				default: b(() => [p(y(L.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : u("", !0)]), H.value ? (g(), d("div", pe, [m(r, {
				variant: "text",
				lines: 4
			})])) : L.value.length === 0 ? (g(), l(a, {
				key: 1,
				icon: "play",
				title: "No active sessions"
			})) : (g(), d("ul", me, [(g(!0), d(s, null, v(L.value, (e) => (g(), d("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [f("div", he, [
				f("span", ge, y(e.user_name), 1),
				f("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, y(e.media_title), 9, _e),
				m(o, { tone: F(e.media_type) }, {
					default: b(() => [p(y(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), f("div", ve, [f("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [f("div", {
				class: "admin-dash__bar-fill",
				style: ie({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, ye), f("span", be, y(e.progress_percent) + "%", 1)])]))), 128))]))]),
			f("section", xe, [t[4] ||= f("header", { class: "admin-dash__card-head" }, [f("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), U.value ? (g(), d("div", Se, [m(r, {
				variant: "text",
				lines: 4
			})])) : R.value.length === 0 ? (g(), l(a, {
				key: 1,
				icon: "user",
				title: "No user data yet"
			})) : (g(), d("table", Ce, [t[3] ||= f("thead", null, [f("tr", null, [
				f("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				f("th", { scope: "col" }, "User"),
				f("th", { scope: "col" }, "Watch Time"),
				f("th", { scope: "col" }, "Plays")
			])], -1), f("tbody", null, [(g(!0), d(s, null, v(R.value, (e, t) => (g(), d("tr", { key: e.user_id }, [
				f("td", we, y(t + 1), 1),
				f("td", null, y(e.user_name), 1),
				f("td", null, y(N(e.total_watch_time_seconds)), 1),
				f("td", null, y(e.play_count), 1)
			]))), 128))])]))]),
			f("section", Te, [t[5] ||= f("header", { class: "admin-dash__card-head" }, [f("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), W.value ? (g(), d("div", Ee, [m(r, {
				variant: "text",
				lines: 4
			})])) : z.value.length === 0 ? (g(), l(a, {
				key: 1,
				icon: "film",
				title: "No media data yet"
			})) : (g(), d("ol", x, [(g(!0), d(s, null, v(z.value, (e, t) => (g(), d("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				f("span", S, y(t + 1), 1),
				f("div", C, [f("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, y(e.media_title), 9, w), m(o, { tone: F(e.media_type) }, {
					default: b(() => [p(y(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("div", T, [f("span", null, y(e.play_count) + " plays", 1), f("span", null, y(N(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			f("section", E, [t[6] ||= f("header", { class: "admin-dash__card-head" }, [f("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), G.value ? (g(), d("div", D, [m(r, {
				variant: "text",
				lines: 3
			})])) : B.value.length === 0 ? (g(), l(a, {
				key: 1,
				icon: "image",
				title: "No storage data"
			})) : (g(), d(s, { key: 2 }, [f("div", De, [(g(!0), d(s, null, v(B.value, (e) => (g(), d("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				m(o, { tone: F(e.media_type) }, {
					default: b(() => [p(y(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				f("div", Oe, y(e.item_count.toLocaleString()) + " items", 1),
				f("div", ke, y(P(e.total_bytes)), 1)
			]))), 128))]), Y.value > 0 ? (g(), d("p", Ae, " Transcode cache: " + y(P(Y.value)), 1)) : u("", !0)], 64))]),
			f("section", je, [t[8] ||= f("header", { class: "admin-dash__card-head" }, [f("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), K.value ? (g(), d("div", Me, [m(r, {
				variant: "text",
				lines: 5
			})])) : V.value.length === 0 ? (g(), l(a, {
				key: 1,
				icon: "list",
				title: "No recent activity"
			})) : (g(), d("div", Ne, [f("ul", Pe, [(g(!0), d(s, null, v(V.value, (e) => (g(), d("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				m(o, { tone: Be(e.event_type) }, {
					default: b(() => [p(y(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				f("span", Fe, y(e.user_name), 1),
				f("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, y(e.media_title), 9, O),
				f("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, y(ze(e.created_at)), 9, Ie)
			]))), 128))]), J.value ? (g(), l(ee, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: q.value,
				onClick: We
			}, {
				default: b(() => [...t[7] ||= [p(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : u("", !0)]))])
		])]));
	}
}), [["__scopeId", "data-v-71c5a6ca"]]);
//#endregion
export { A as default };

//# sourceMappingURL=DashboardPage-DF2xGBse.js.map