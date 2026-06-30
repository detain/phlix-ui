import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as r } from "./client-CZc6ehUa.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Select-Bjsgj4BN.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as te } from "./dashboard-BTCOCTHQ.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ne, normalizeStyle as re, onBeforeUnmount as ie, onMounted as ae, openBlock as v, ref as y, renderList as b, toDisplayString as x, watch as oe, withCtx as S } from "vue";
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
	key: 3,
	class: "admin-dash__np-list",
	role: "list"
}, me = { class: "admin-dash__np-info" }, he = { class: "admin-dash__np-user" }, ge = ["title"], _e = { class: "admin-dash__np-progress" }, ve = ["aria-valuenow"], ye = { class: "admin-dash__np-pct" }, be = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, xe = {
	key: 0,
	class: "admin-dash__skel"
}, Se = {
	key: 3,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, Ce = { class: "admin-dash__rank" }, we = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, Te = {
	key: 0,
	class: "admin-dash__skel"
}, Ee = {
	key: 3,
	class: "admin-dash__media-list",
	role: "list"
}, De = { class: "admin-dash__media-rank" }, Oe = { class: "admin-dash__media-info" }, ke = ["title"], Ae = { class: "admin-dash__media-stats" }, je = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, Me = {
	key: 0,
	class: "admin-dash__skel"
}, Ne = { class: "admin-dash__storage-grid" }, Pe = { class: "admin-dash__storage-count" }, Fe = { class: "admin-dash__storage-size" }, Ie = {
	key: 0,
	class: "admin-dash__storage-note"
}, Le = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, Re = {
	key: 0,
	class: "admin-dash__skel"
}, ze = {
	key: 3,
	class: "admin-dash__activity"
}, Be = {
	class: "admin-dash__activity-list",
	role: "list"
}, Ve = { class: "admin-dash__activity-user" }, He = ["title"], Ue = ["datetime", "title"], C = 20, We = 3e4, w = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "DashboardPage",
	props: { client: {} },
	setup(e) {
		let _ = e, w = ne("apiBase", ""), Ge = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new te(_.client ?? new r({
			baseUrl: Ge.value,
			tokenStore: new t()
		})), E = i();
		function D(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function O(e) {
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
		function Ke(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		function k(e) {
			switch ((e ?? "").toLowerCase()) {
				case "movie": return "accent";
				case "series": return "success";
				case "photo": return "warning";
				case "audiobook": return "info";
				default: return "neutral";
			}
		}
		function qe(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let Je = [
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
		], A = y(30), j = y([]), M = y([]), N = y([]), P = y([]), F = y([]), I = y(!0), L = y(!0), R = y(!0), z = y(!0), B = y(!0), V = y(!1), H = y(!0), U = y(null), W = y(null), G = y(null), K = y(null), q = y(null), Ye = u(() => P.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function J() {
			U.value = null;
			try {
				j.value = await T.getNowPlaying();
			} catch (e) {
				U.value = n(e, "Failed to load now playing."), E.error(U.value);
			} finally {
				I.value = !1;
			}
		}
		async function Y(e) {
			L.value = !0, W.value = null;
			try {
				M.value = await T.getTopUsers(10, e);
			} catch (e) {
				W.value = n(e, "Failed to load top users."), E.error(W.value);
			} finally {
				L.value = !1;
			}
		}
		async function X(e) {
			R.value = !0, G.value = null;
			try {
				N.value = await T.getTopMedia(10, e);
			} catch (e) {
				G.value = n(e, "Failed to load top media."), E.error(G.value);
			} finally {
				R.value = !1;
			}
		}
		async function Z() {
			K.value = null;
			try {
				P.value = await T.getStorage();
			} catch (e) {
				K.value = n(e, "Failed to load storage."), E.error(K.value);
			} finally {
				z.value = !1;
			}
		}
		async function Q(e, t = !1) {
			t ? V.value = !0 : (B.value = !0, q.value = null);
			try {
				let n = await T.getActivity(e);
				t ? F.value = [...F.value, ...n] : F.value = n, H.value = n.length === C;
			} catch (e) {
				let r = n(e, "Failed to load activity.");
				t || (q.value = r), E.error(r);
			} finally {
				B.value = !1, V.value = !1;
			}
		}
		function Xe() {
			Q(F.value.length + C, !0);
		}
		let $ = null;
		return oe(A, (e) => {
			Y(e), X(e);
		}), ae(() => {
			J(), Z(), Q(C), Y(A.value), X(A.value), $ = setInterval(() => {
				T.getNowPlaying().then((e) => {
					j.value = e, U.value = null;
				}).catch(() => {});
			}, We);
		}), ie(() => {
			$ !== null && (clearInterval($), $ = null);
		}), (e, t) => (v(), p("section", se, [m("header", ce, [t[4] ||= m("h1", {
			id: "dash-heading",
			class: "admin-dash__title"
		}, "Dashboard", -1), g(ee, {
			"model-value": A.value,
			options: Je,
			label: "Date range",
			class: "admin-dash__range",
			"onUpdate:modelValue": t[0] ||= (e) => A.value = Number(e)
		}, null, 8, ["model-value"])]), m("div", le, [
			m("section", ue, [m("header", de, [t[5] ||= m("h2", {
				id: "np-heading",
				class: "admin-dash__card-title"
			}, "Now Playing", -1), j.value.length > 0 ? (v(), d(o, {
				key: 0,
				tone: "accent",
				label: `${j.value.length} active sessions`
			}, {
				default: S(() => [h(x(j.value.length), 1)]),
				_: 1
			}, 8, ["label"])) : f("", !0)]), I.value ? (v(), p("div", fe, [g(s, {
				variant: "text",
				lines: 4
			})])) : U.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load now playing",
				description: U.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: J
				}, {
					default: S(() => [...t[6] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (v(), d(c, {
				key: 2,
				icon: "play",
				title: "No active sessions"
			})) : (v(), p("ul", pe, [(v(!0), p(l, null, b(j.value, (e) => (v(), p("li", {
				key: e.session_id,
				class: "admin-dash__np-item"
			}, [m("div", me, [
				m("span", he, x(e.user_name), 1),
				m("span", {
					class: "admin-dash__np-mtitle",
					title: e.media_title
				}, x(e.media_title), 9, ge),
				g(o, { tone: k(e.media_type) }, {
					default: S(() => [h(x(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])
			]), m("div", _e, [m("div", {
				class: "admin-dash__bar",
				role: "progressbar",
				"aria-valuenow": e.progress_percent,
				"aria-valuemin": 0,
				"aria-valuemax": 100
			}, [m("div", {
				class: "admin-dash__bar-fill",
				style: re({ width: `${e.progress_percent}%` })
			}, null, 4)], 8, ve), m("span", ye, x(e.progress_percent) + "%", 1)])]))), 128))]))]),
			m("section", be, [t[9] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
				id: "tu-heading",
				class: "admin-dash__card-title"
			}, "Top Users")], -1), L.value ? (v(), p("div", xe, [g(s, {
				variant: "text",
				lines: 4
			})])) : W.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load top users",
				description: W.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[1] ||= (e) => Y(A.value)
				}, {
					default: S(() => [...t[7] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (v(), d(c, {
				key: 2,
				icon: "user",
				title: "No user data yet"
			})) : (v(), p("table", Se, [t[8] ||= m("thead", null, [m("tr", null, [
				m("th", {
					scope: "col",
					class: "admin-dash__rank"
				}, "#"),
				m("th", { scope: "col" }, "User"),
				m("th", { scope: "col" }, "Watch Time"),
				m("th", { scope: "col" }, "Plays")
			])], -1), m("tbody", null, [(v(!0), p(l, null, b(M.value, (e, t) => (v(), p("tr", { key: e.user_id }, [
				m("td", Ce, x(t + 1), 1),
				m("td", null, x(e.user_name), 1),
				m("td", null, x(D(e.total_watch_time_seconds)), 1),
				m("td", null, x(e.play_count), 1)
			]))), 128))])]))]),
			m("section", we, [t[11] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
				id: "tm-heading",
				class: "admin-dash__card-title"
			}, "Top Media")], -1), R.value ? (v(), p("div", Te, [g(s, {
				variant: "text",
				lines: 4
			})])) : G.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load top media",
				description: G.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[2] ||= (e) => X(A.value)
				}, {
					default: S(() => [...t[10] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : N.value.length === 0 ? (v(), d(c, {
				key: 2,
				icon: "film",
				title: "No media data yet"
			})) : (v(), p("ol", Ee, [(v(!0), p(l, null, b(N.value, (e, t) => (v(), p("li", {
				key: e.media_item_id,
				class: "admin-dash__media-item"
			}, [
				m("span", De, x(t + 1), 1),
				m("div", Oe, [m("span", {
					class: "admin-dash__media-title",
					title: e.media_title
				}, x(e.media_title), 9, ke), g(o, { tone: k(e.media_type) }, {
					default: S(() => [h(x(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				m("div", Ae, [m("span", null, x(e.play_count) + " plays", 1), m("span", null, x(D(e.total_duration_seconds)), 1)])
			]))), 128))]))]),
			m("section", je, [t[13] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
				id: "st-heading",
				class: "admin-dash__card-title"
			}, "Storage")], -1), z.value ? (v(), p("div", Me, [g(s, {
				variant: "text",
				lines: 3
			})])) : K.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load storage",
				description: K.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Z
				}, {
					default: S(() => [...t[12] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : P.value.length === 0 ? (v(), d(c, {
				key: 2,
				icon: "image",
				title: "No storage data"
			})) : (v(), p(l, { key: 3 }, [m("div", Ne, [(v(!0), p(l, null, b(P.value, (e) => (v(), p("div", {
				key: e.media_type,
				class: "admin-dash__storage-card"
			}, [
				g(o, { tone: k(e.media_type) }, {
					default: S(() => [h(x(e.media_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				m("div", Pe, x(e.item_count.toLocaleString()) + " items", 1),
				m("div", Fe, x(O(e.total_bytes)), 1)
			]))), 128))]), Ye.value > 0 ? (v(), p("p", Ie, " Transcode cache: " + x(O(Ye.value)), 1)) : f("", !0)], 64))]),
			m("section", Le, [t[16] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
				id: "act-heading",
				class: "admin-dash__card-title"
			}, "Recent Activity")], -1), B.value ? (v(), p("div", Re, [g(s, {
				variant: "text",
				lines: 5
			})])) : q.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load activity",
				description: q.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: t[3] ||= (e) => Q(C)
				}, {
					default: S(() => [...t[14] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : F.value.length === 0 ? (v(), d(c, {
				key: 2,
				icon: "list",
				title: "No recent activity"
			})) : (v(), p("div", ze, [m("ul", Be, [(v(!0), p(l, null, b(F.value, (e) => (v(), p("li", {
				key: e.id,
				class: "admin-dash__activity-item"
			}, [
				g(o, { tone: qe(e.event_type) }, {
					default: S(() => [h(x(e.event_type), 1)]),
					_: 2
				}, 1032, ["tone"]),
				m("span", Ve, x(e.user_name), 1),
				m("span", {
					class: "admin-dash__activity-title",
					title: e.media_title
				}, x(e.media_title), 9, He),
				m("time", {
					class: "admin-dash__activity-time",
					datetime: e.created_at,
					title: e.created_at
				}, x(Ke(e.created_at)), 9, Ue)
			]))), 128))]), H.value ? (v(), d(a, {
				key: 0,
				variant: "outline",
				size: "sm",
				loading: V.value,
				onClick: Xe
			}, {
				default: S(() => [...t[15] ||= [h(" Load more ", -1)]]),
				_: 1
			}, 8, ["loading"])) : f("", !0)]))])
		])]));
	}
}), [["__scopeId", "data-v-3e991b7c"]]);
//#endregion
export { w as default };

//# sourceMappingURL=DashboardPage-R3vaPjGY.js.map