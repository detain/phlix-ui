import { a as e, i as t, n, r, t as i, u as a } from "./tokenStore-DfQvvLGI.js";
import { t as o } from "./EmptyState-Oymq15Ey.js";
import { t as ee } from "./Select-B0YIBPe2.js";
import { t as s } from "./Badge-Cmz5FPqw.js";
import { t as te } from "./dashboard-BTCOCTHQ.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ne, normalizeStyle as re, onBeforeUnmount as ie, onMounted as ae, openBlock as _, ref as v, renderList as y, toDisplayString as b, watch as oe, withCtx as x } from "vue";
//#region src/pages/admin/DashboardPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, ce = { class: "admin-dash__head" }, le = { class: "admin-dash__grid" }, ue = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, de = { class: "admin-dash__card-head" }, fe = {
	key: 0,
	class: "admin-dash__skel"
}, pe = {
	key: 2,
	class: "admin-dash__np-list",
	role: "list"
}, me = { class: "admin-dash__np-info" }, he = { class: "admin-dash__np-user" }, ge = ["title"], _e = { class: "admin-dash__np-progress" }, ve = ["aria-valuenow"], ye = { class: "admin-dash__np-pct" }, be = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, xe = {
	key: 0,
	class: "admin-dash__skel"
}, Se = {
	key: 2,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, Ce = { class: "admin-dash__rank" }, we = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, Te = {
	key: 0,
	class: "admin-dash__skel"
}, Ee = {
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
}, Fe = { class: "admin-dash__activity-user" }, O = ["title"], Ie = ["datetime", "title"], k = 20, Le = 3e4, A = /*#__PURE__*/ a(/* @__PURE__ */ g({
	__name: "DashboardPage",
	props: { client: {} },
	setup(a) {
		let g = a, A = ne("apiBase", ""), Re = l(() => typeof A == "string" ? A : A?.value ?? ""), j = new te(g.client ?? new e({
			baseUrl: Re.value,
			tokenStore: new i()
		})), M = t();
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
		], I = v(30), L = v([]), R = v([]), z = v([]), B = v([]), V = v([]), H = v(!0), U = v(!0), W = v(!0), G = v(!0), K = v(!0), q = v(!1), J = v(!0), Y = l(() => B.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
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
		return oe(I, (e) => {
			X(e), Z(e);
		}), ae(() => {
			He(), Ue(), Q(k), X(I.value), Z(I.value), $ = setInterval(() => {
				j.getNowPlaying().then((e) => {
					L.value = e;
				}).catch(() => {});
			}, Le);
		}), ie(() => {
			$ !== null && (clearInterval($), $ = null);
		}), (e, t) => (_(), f("section", se, [p("header", ce, [t[1] ||= p("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), h(ee, {
			"model-value": I.value,
			options: Ve,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => I.value = Number(e)
		}, null, 8, ["model-value"])]), p("div", le, [
			p("section", ue, [p("header", de, [t[2] ||= p("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), L.value.length > 0 ? (_(), u(s, {
				key: 0,
				tone: "accent",
				label: `${L.value.length} active sessions`
			}, {
				default: x(() => [m(b(L.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : d("", !0)]), H.value ? (_(), f("div", fe, [h(r, {
				variant: "text",
				lines: 4
			})])) : L.value.length === 0 ? (_(), u(o, {
				key: 1,
				icon: "play",
				title: "No active sessions"
			})) : (_(), f("ul", pe, [(_(!0), f(c, null, y(L.value, (e) => (_(), f("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [p("div", me, [
				p("span", he, b(e.user_name), 1),
				p("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, b(e.media_title), 9, ge),
				h(s, { tone: F(e.media_type) }, {
					default: x(() => [m(b(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), p("div", _e, [p("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [p("div", {
				class: "admin-dash__bar-fill",
				style: re({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, ve), p("span", ye, b(e.progress_percent) + "%", 1)])]))), 128))]))]),
			p("section", be, [t[4] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), U.value ? (_(), f("div", xe, [h(r, {
				variant: "text",
				lines: 4
			})])) : R.value.length === 0 ? (_(), u(o, {
				key: 1,
				icon: "user",
				title: "No user data yet"
			})) : (_(), f("table", Se, [t[3] ||= p("thead", null, [p("tr", null, [
				p("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				p("th", { scope: "col" }, "User"),
				p("th", { scope: "col" }, "Watch Time"),
				p("th", { scope: "col" }, "Plays")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(R.value, (e, t) => (_(), f("tr", { key: e.user_id }, [
				p("td", Ce, b(t + 1), 1),
				p("td", null, b(e.user_name), 1),
				p("td", null, b(N(e.total_watch_time_seconds)), 1),
				p("td", null, b(e.play_count), 1)
			]))), 128))])]))]),
			p("section", we, [t[5] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), W.value ? (_(), f("div", Te, [h(r, {
				variant: "text",
				lines: 4
			})])) : z.value.length === 0 ? (_(), u(o, {
				key: 1,
				icon: "film",
				title: "No media data yet"
			})) : (_(), f("ol", Ee, [(_(!0), f(c, null, y(z.value, (e, t) => (_(), f("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				p("span", S, b(t + 1), 1),
				p("div", C, [p("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, b(e.media_title), 9, w), h(s, { tone: F(e.media_type) }, {
					default: x(() => [m(b(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("div", T, [p("span", null, b(e.play_count) + " plays", 1), p("span", null, b(N(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			p("section", E, [t[6] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), G.value ? (_(), f("div", D, [h(r, {
				variant: "text",
				lines: 3
			})])) : B.value.length === 0 ? (_(), u(o, {
				key: 1,
				icon: "image",
				title: "No storage data"
			})) : (_(), f(c, { key: 2 }, [p("div", De, [(_(!0), f(c, null, y(B.value, (e) => (_(), f("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				h(s, { tone: F(e.media_type) }, {
					default: x(() => [m(b(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				p("div", Oe, b(e.item_count.toLocaleString()) + " items", 1),
				p("div", ke, b(P(e.total_bytes)), 1)
			]))), 128))]), Y.value > 0 ? (_(), f("p", Ae, " Transcode cache: " + b(P(Y.value)), 1)) : d("", !0)], 64))]),
			p("section", je, [t[8] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), K.value ? (_(), f("div", Me, [h(r, {
				variant: "text",
				lines: 5
			})])) : V.value.length === 0 ? (_(), u(o, {
				key: 1,
				icon: "list",
				title: "No recent activity"
			})) : (_(), f("div", Ne, [p("ul", Pe, [(_(!0), f(c, null, y(V.value, (e) => (_(), f("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				h(s, { tone: Be(e.event_type) }, {
					default: x(() => [m(b(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				p("span", Fe, b(e.user_name), 1),
				p("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, b(e.media_title), 9, O),
				p("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, b(ze(e.created_at)), 9, Ie)
			]))), 128))]), J.value ? (_(), u(n, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: q.value,
				onClick: We
			}, {
				default: x(() => [...t[7] ||= [m(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : d("", !0)]))])
		])]));
	}
}), [["__scopeId", "data-v-71c5a6ca"]]);
//#endregion
export { A as default };

//# sourceMappingURL=DashboardPage-hDOg_Ffz.js.map