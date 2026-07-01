import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as r } from "./client-fw74f3l_.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as o } from "./Badge-DnDrMVUo.js";
import { t as ee } from "./Select-C7fVtNk5.js";
import { t as s } from "./Skeleton-BUq2D39t.js";
import { t as c } from "./EmptyState-0XgHKEGf.js";
import { t as te } from "./PageHint-DR8OWfto.js";
import { t as ne } from "./dashboard-BTCOCTHQ.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as re, normalizeStyle as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as v, ref as y, renderList as b, resolveComponent as se, toDisplayString as x, watch as ce, withCtx as S } from "vue";
//#region src/pages/admin/DashboardPage.vue?vue&type=script&setup=true&lang.ts
var le = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, ue = { class: "admin-dash__head" }, de = { class: "admin-dash__grid" }, fe = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, pe = { class: "admin-dash__card-head" }, me = {
	key: 0,
	class: "admin-dash__skel"
}, he = {
	key: 3,
	class: "admin-dash__np-list",
	role: "list"
}, ge = { class: "admin-dash__np-info" }, _e = { class: "admin-dash__np-user" }, ve = ["title"], ye = { class: "admin-dash__np-progress" }, be = ["aria-valuenow"], xe = { class: "admin-dash__np-pct" }, Se = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, Ce = {
	key: 0,
	class: "admin-dash__skel"
}, we = {
	key: 3,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, Te = { class: "admin-dash__rank" }, Ee = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, De = {
	key: 0,
	class: "admin-dash__skel"
}, Oe = {
	key: 3,
	class: "admin-dash__media-list",
	role: "list"
}, ke = { class: "admin-dash__media-rank" }, Ae = ["title"], je = {
	key: 1,
	class: "admin-dash__media-info"
}, Me = ["title"], Ne = { class: "admin-dash__media-stats" }, Pe = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, Fe = {
	key: 0,
	class: "admin-dash__skel"
}, Ie = { class: "admin-dash__storage-grid" }, Le = { class: "admin-dash__storage-count" }, Re = { class: "admin-dash__storage-size" }, ze = {
	key: 0,
	class: "admin-dash__storage-note"
}, Be = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, Ve = {
	key: 0,
	class: "admin-dash__skel"
}, He = {
	key: 3,
	class: "admin-dash__activity"
}, Ue = {
	class: "admin-dash__activity-list",
	role: "list"
}, We = { class: "admin-dash__activity-user" }, Ge = ["title"], Ke = ["datetime", "title"], C = 20, qe = 3e4, w = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "DashboardPage",
	props: { client: {} },
	setup(e) {
		let _ = e, w = re("apiBase", ""), Je = u(() => typeof w == "string" ? w : w?.value ?? ""), T = new ne(_.client ?? new r({
			baseUrl: Je.value,
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
		function Ye(e) {
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
		function Xe(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let Ze = [
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
		], A = y(30), j = y([]), M = y([]), N = y([]), P = y([]), F = y([]), I = y(!0), L = y(!0), R = y(!0), z = y(!0), B = y(!0), V = y(!1), H = y(!0), U = y(null), W = y(null), G = y(null), K = y(null), q = y(null), J = u(() => P.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function Y() {
			U.value = null;
			try {
				j.value = await T.getNowPlaying();
			} catch (e) {
				U.value = n(e, "Failed to load now playing."), E.error(U.value);
			} finally {
				I.value = !1;
			}
		}
		async function X(e) {
			L.value = !0, W.value = null;
			try {
				M.value = await T.getTopUsers(10, e);
			} catch (e) {
				W.value = n(e, "Failed to load top users."), E.error(W.value);
			} finally {
				L.value = !1;
			}
		}
		async function Z(e) {
			R.value = !0, G.value = null;
			try {
				N.value = await T.getTopMedia(10, e);
			} catch (e) {
				G.value = n(e, "Failed to load top media."), E.error(G.value);
			} finally {
				R.value = !1;
			}
		}
		async function Qe() {
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
		function $e() {
			Q(F.value.length + C, !0);
		}
		let $ = null;
		return ce(A, (e) => {
			X(e), Z(e);
		}), oe(() => {
			Y(), Qe(), Q(C), X(A.value), Z(A.value), $ = setInterval(() => {
				T.getNowPlaying().then((e) => {
					j.value = e, U.value = null;
				}).catch(() => {});
			}, qe);
		}), ae(() => {
			$ !== null && (clearInterval($), $ = null);
		}), (e, t) => {
			let n = se("RouterLink");
			return v(), p("section", le, [
				m("header", ue, [t[4] ||= m("h1", {
					id: "dash-heading",
					class: "admin-dash__title"
				}, "Dashboard", -1), g(ee, {
					"model-value": A.value,
					options: Ze,
					label: "Date range",
					class: "admin-dash__range",
					"onUpdate:modelValue": t[0] ||= (e) => A.value = Number(e)
				}, null, 8, ["model-value"])]),
				g(te, null, {
					default: S(() => [...t[5] ||= [
						h(" A live overview of your server. The cards show ", -1),
						m("strong", null, "who's watching right now", -1),
						h(", your ", -1),
						m("strong", null, "top users", -1),
						h(" and ", -1),
						m("strong", null, "most-watched titles", -1),
						h(", current ", -1),
						m("strong", null, "storage use", -1),
						h(", and a feed of ", -1),
						m("strong", null, "recent activity", -1),
						h(". Use the ", -1),
						m("strong", null, "Date range", -1),
						h(" menu to switch the top-users and top-media stats between the last 7, 30, or 90 days. ", -1)
					]]),
					_: 1
				}),
				m("div", de, [
					m("section", fe, [m("header", pe, [t[6] ||= m("h2", {
						id: "np-heading",
						class: "admin-dash__card-title"
					}, "Now Playing", -1), j.value.length > 0 ? (v(), d(o, {
						key: 0,
						tone: "accent",
						label: `${j.value.length} active sessions`
					}, {
						default: S(() => [h(x(j.value.length), 1)]),
						_: 1
					}, 8, ["label"])) : f("", !0)]), I.value ? (v(), p("div", me, [g(s, {
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
							onClick: Y
						}, {
							default: S(() => [...t[7] ||= [h("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : j.value.length === 0 ? (v(), d(c, {
						key: 2,
						icon: "play",
						title: "No active sessions"
					})) : (v(), p("ul", he, [(v(!0), p(l, null, b(j.value, (e) => (v(), p("li", {
						key: e.session_id,
						class: "admin-dash__np-item"
					}, [m("div", ge, [
						m("span", _e, x(e.user_name), 1),
						m("span", {
							class: "admin-dash__np-mtitle",
							title: e.media_title
						}, x(e.media_title), 9, ve),
						g(o, { tone: k(e.media_type) }, {
							default: S(() => [h(x(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])
					]), m("div", ye, [m("div", {
						class: "admin-dash__bar",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [m("div", {
						class: "admin-dash__bar-fill",
						style: ie({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, be), m("span", xe, x(e.progress_percent) + "%", 1)])]))), 128))]))]),
					m("section", Se, [t[10] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
						id: "tu-heading",
						class: "admin-dash__card-title"
					}, "Top Users")], -1), L.value ? (v(), p("div", Ce, [g(s, {
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
							onClick: t[1] ||= (e) => X(A.value)
						}, {
							default: S(() => [...t[8] ||= [h("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : M.value.length === 0 ? (v(), d(c, {
						key: 2,
						icon: "user",
						title: "No user data yet"
					})) : (v(), p("table", we, [t[9] ||= m("thead", null, [m("tr", null, [
						m("th", {
							scope: "col",
							class: "admin-dash__rank"
						}, "#"),
						m("th", { scope: "col" }, "User"),
						m("th", { scope: "col" }, "Watch Time"),
						m("th", { scope: "col" }, "Plays")
					])], -1), m("tbody", null, [(v(!0), p(l, null, b(M.value, (e, t) => (v(), p("tr", { key: e.user_id }, [
						m("td", Te, x(t + 1), 1),
						m("td", null, x(e.user_name), 1),
						m("td", null, x(D(e.total_watch_time_seconds)), 1),
						m("td", null, x(e.play_count), 1)
					]))), 128))])]))]),
					m("section", Ee, [t[12] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
						id: "tm-heading",
						class: "admin-dash__card-title"
					}, "Top Media")], -1), R.value ? (v(), p("div", De, [g(s, {
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
							onClick: t[2] ||= (e) => Z(A.value)
						}, {
							default: S(() => [...t[11] ||= [h("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : N.value.length === 0 ? (v(), d(c, {
						key: 2,
						icon: "film",
						title: "No media data yet"
					})) : (v(), p("ol", Oe, [(v(!0), p(l, null, b(N.value, (e, t) => (v(), p("li", {
						key: e.media_item_id,
						class: "admin-dash__media-item"
					}, [
						m("span", ke, x(t + 1), 1),
						e.media_item_id ? (v(), d(n, {
							key: 0,
							to: `/app/media/${e.media_item_id}`,
							class: "admin-dash__media-info admin-dash__media-info--link"
						}, {
							default: S(() => [m("span", {
								class: "admin-dash__media-title",
								title: e.media_title
							}, x(e.media_title), 9, Ae), g(o, { tone: k(e.media_type) }, {
								default: S(() => [h(x(e.media_type), 1)]),
								_: 2
							}, 1032, ["tone"])]),
							_: 2
						}, 1032, ["to"])) : (v(), p("span", je, [m("span", {
							class: "admin-dash__media-title",
							title: e.media_title
						}, x(e.media_title), 9, Me), g(o, { tone: k(e.media_type) }, {
							default: S(() => [h(x(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])])),
						m("div", Ne, [m("span", null, x(e.play_count) + " plays", 1), m("span", null, x(D(e.total_duration_seconds)), 1)])
					]))), 128))]))]),
					m("section", Pe, [t[14] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
						id: "st-heading",
						class: "admin-dash__card-title"
					}, "Storage")], -1), z.value ? (v(), p("div", Fe, [g(s, {
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
							onClick: Qe
						}, {
							default: S(() => [...t[13] ||= [h("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : P.value.length === 0 ? (v(), d(c, {
						key: 2,
						icon: "image",
						title: "No storage data"
					})) : (v(), p(l, { key: 3 }, [m("div", Ie, [(v(!0), p(l, null, b(P.value, (e) => (v(), p("div", {
						key: e.media_type,
						class: "admin-dash__storage-card"
					}, [
						g(o, { tone: k(e.media_type) }, {
							default: S(() => [h(x(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						m("div", Le, x(e.item_count.toLocaleString()) + " items", 1),
						m("div", Re, x(O(e.total_bytes)), 1)
					]))), 128))]), J.value > 0 ? (v(), p("p", ze, " Transcode cache: " + x(O(J.value)), 1)) : f("", !0)], 64))]),
					m("section", Be, [t[17] ||= m("header", { class: "admin-dash__card-head" }, [m("h2", {
						id: "act-heading",
						class: "admin-dash__card-title"
					}, "Recent Activity")], -1), B.value ? (v(), p("div", Ve, [g(s, {
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
							default: S(() => [...t[15] ||= [h("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : F.value.length === 0 ? (v(), d(c, {
						key: 2,
						icon: "list",
						title: "No recent activity"
					})) : (v(), p("div", He, [m("ul", Ue, [(v(!0), p(l, null, b(F.value, (e) => (v(), p("li", {
						key: e.id,
						class: "admin-dash__activity-item"
					}, [
						g(o, { tone: Xe(e.event_type) }, {
							default: S(() => [h(x(e.event_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						m("span", We, x(e.user_name), 1),
						m("span", {
							class: "admin-dash__activity-title",
							title: e.media_title
						}, x(e.media_title), 9, Ge),
						m("time", {
							class: "admin-dash__activity-time",
							datetime: e.created_at,
							title: e.created_at
						}, x(Ye(e.created_at)), 9, Ke)
					]))), 128))]), H.value ? (v(), d(a, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: V.value,
						onClick: $e
					}, {
						default: S(() => [...t[16] ||= [h(" Load more ", -1)]]),
						_: 1
					}, 8, ["loading"])) : f("", !0)]))])
				])
			]);
		};
	}
}), [["__scopeId", "data-v-2858f9c4"]]);
//#endregion
export { w as default };

//# sourceMappingURL=DashboardPage-BPO2x-gS.js.map