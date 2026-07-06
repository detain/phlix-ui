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
import { Fragment as l, computed as re, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as ie, normalizeStyle as ae, onBeforeUnmount as oe, onMounted as se, openBlock as _, ref as v, renderList as y, resolveComponent as ce, toDisplayString as b, watch as le, withCtx as x } from "vue";
//#region src/pages/admin/DashboardPage.vue?vue&type=script&setup=true&lang.ts
var ue = {
	class: "admin-dash",
	"aria-labelledby": "dash-heading"
}, de = { class: "admin-dash__head" }, fe = { class: "admin-dash__grid" }, pe = {
	class: "admin-dash__card",
	"aria-labelledby": "np-heading"
}, me = { class: "admin-dash__card-head" }, he = {
	key: 0,
	class: "admin-dash__skel"
}, ge = {
	key: 3,
	class: "admin-dash__np-list",
	role: "list"
}, _e = { class: "admin-dash__np-info" }, ve = { class: "admin-dash__np-user" }, ye = ["title"], be = { class: "admin-dash__np-progress" }, xe = ["aria-valuenow"], Se = { class: "admin-dash__np-pct" }, Ce = {
	class: "admin-dash__card",
	"aria-labelledby": "tu-heading"
}, we = {
	key: 0,
	class: "admin-dash__skel"
}, Te = {
	key: 3,
	class: "admin-dash__table",
	"aria-label": "Top users leaderboard"
}, Ee = { class: "admin-dash__rank" }, De = {
	class: "admin-dash__card",
	"aria-labelledby": "tm-heading"
}, Oe = {
	key: 0,
	class: "admin-dash__skel"
}, ke = {
	key: 3,
	class: "admin-dash__media-list",
	role: "list"
}, Ae = { class: "admin-dash__media-rank" }, je = ["title"], Me = {
	key: 1,
	class: "admin-dash__media-info"
}, Ne = ["title"], Pe = { class: "admin-dash__media-stats" }, Fe = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, Ie = {
	key: 0,
	class: "admin-dash__skel"
}, Le = { class: "admin-dash__storage-grid" }, Re = { class: "admin-dash__storage-count" }, ze = { class: "admin-dash__storage-size" }, Be = {
	key: 0,
	class: "admin-dash__storage-note"
}, Ve = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, He = {
	key: 0,
	class: "admin-dash__skel"
}, Ue = {
	key: 3,
	class: "admin-dash__activity"
}, We = {
	class: "admin-dash__activity-list",
	role: "list"
}, Ge = { class: "admin-dash__activity-user" }, Ke = ["title"], qe = ["datetime", "title"], S = 20, Je = 3e4, C = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "DashboardPage",
	props: { client: {} },
	setup(e) {
		let g = e, C = ie("apiBase", ""), Ye = re(() => typeof C == "string" ? C : C?.value ?? ""), w = new ne(g.client ?? new r({
			baseUrl: Ye.value,
			tokenStore: new t()
		})), T = i();
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
		function Xe(e) {
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
		function Ze(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let Qe = [
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
		], k = v(30), A = v([]), j = v([]), M = v([]), N = v([]), P = v([]), F = v(!0), I = v(!0), L = v(!0), R = v(!0), z = v(!0), B = v(!1), V = v(!0), H = v(null), U = v(null), W = v(null), G = v(null), K = v(null), q = re(() => N.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function J() {
			H.value = null;
			try {
				A.value = await w.getNowPlaying();
			} catch (e) {
				H.value = n(e, "Failed to load now playing."), T.error(H.value);
			} finally {
				F.value = !1;
			}
		}
		async function Y(e) {
			I.value = !0, U.value = null;
			try {
				j.value = await w.getTopUsers(10, e);
			} catch (e) {
				U.value = n(e, "Failed to load top users."), T.error(U.value);
			} finally {
				I.value = !1;
			}
		}
		async function X(e) {
			L.value = !0, W.value = null;
			try {
				M.value = await w.getTopMedia(10, e);
			} catch (e) {
				W.value = n(e, "Failed to load top media."), T.error(W.value);
			} finally {
				L.value = !1;
			}
		}
		async function $e() {
			G.value = null;
			try {
				N.value = await w.getStorage();
			} catch (e) {
				G.value = n(e, "Failed to load storage."), T.error(G.value);
			} finally {
				R.value = !1;
			}
		}
		async function Z(e, t = !1) {
			t ? B.value = !0 : (z.value = !0, K.value = null);
			try {
				let n = await w.getActivity(e);
				t ? P.value = [...P.value, ...n] : P.value = n, V.value = n.length === S;
			} catch (e) {
				let r = n(e, "Failed to load activity.");
				t || (K.value = r), T.error(r);
			} finally {
				z.value = !1, B.value = !1;
			}
		}
		function et() {
			Z(P.value.length + S, !0);
		}
		let Q = null;
		function tt() {
			Q !== null && (clearInterval(Q), Q = null);
		}
		function nt() {
			Q === null && (Q = setInterval(() => {
				w.getNowPlaying().then((e) => {
					A.value = e, H.value = null;
				}).catch(() => {});
			}, Je));
		}
		function $() {
			document.hidden ? tt() : nt();
		}
		return le(k, (e) => {
			Y(e), X(e);
		}), se(() => {
			J(), $e(), Z(S), Y(k.value), X(k.value), nt(), typeof document < "u" && document.addEventListener("visibilitychange", $);
		}), oe(() => {
			tt(), typeof document < "u" && document.removeEventListener("visibilitychange", $);
		}), (e, t) => {
			let n = ce("RouterLink");
			return _(), f("section", ue, [
				p("header", de, [t[4] ||= p("h1", {
					id: "dash-heading",
					class: "admin-dash__title"
				}, "Dashboard", -1), h(ee, {
					"model-value": k.value,
					options: Qe,
					label: "Date range",
					class: "admin-dash__range",
					"onUpdate:modelValue": t[0] ||= (e) => k.value = Number(e)
				}, null, 8, ["model-value"])]),
				h(te, null, {
					default: x(() => [...t[5] ||= [
						m(" A live overview of your server. The cards show ", -1),
						p("strong", null, "who's watching right now", -1),
						m(", your ", -1),
						p("strong", null, "top users", -1),
						m(" and ", -1),
						p("strong", null, "most-watched titles", -1),
						m(", current ", -1),
						p("strong", null, "storage use", -1),
						m(", and a feed of ", -1),
						p("strong", null, "recent activity", -1),
						m(". Use the ", -1),
						p("strong", null, "Date range", -1),
						m(" menu to switch the top-users and top-media stats between the last 7, 30, or 90 days. ", -1)
					]]),
					_: 1
				}),
				p("div", fe, [
					p("section", pe, [p("header", me, [t[6] ||= p("h2", {
						id: "np-heading",
						class: "admin-dash__card-title"
					}, "Now Playing", -1), A.value.length > 0 ? (_(), u(o, {
						key: 0,
						tone: "accent",
						label: `${A.value.length} active sessions`
					}, {
						default: x(() => [m(b(A.value.length), 1)]),
						_: 1
					}, 8, ["label"])) : d("", !0)]), F.value ? (_(), f("div", he, [h(s, {
						variant: "text",
						lines: 4
					})])) : H.value ? (_(), u(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load now playing",
						description: H.value
					}, {
						actions: x(() => [h(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: J
						}, {
							default: x(() => [...t[7] ||= [m("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : A.value.length === 0 ? (_(), u(c, {
						key: 2,
						icon: "play",
						title: "No active sessions"
					})) : (_(), f("ul", ge, [(_(!0), f(l, null, y(A.value, (e) => (_(), f("li", {
						key: e.session_id,
						class: "admin-dash__np-item"
					}, [p("div", _e, [
						p("span", ve, b(e.user_name), 1),
						p("span", {
							class: "admin-dash__np-mtitle",
							title: e.media_title
						}, b(e.media_title), 9, ye),
						h(o, { tone: O(e.media_type) }, {
							default: x(() => [m(b(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])
					]), p("div", be, [p("div", {
						class: "admin-dash__bar",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [p("div", {
						class: "admin-dash__bar-fill",
						style: ae({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, xe), p("span", Se, b(e.progress_percent) + "%", 1)])]))), 128))]))]),
					p("section", Ce, [t[10] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
						id: "tu-heading",
						class: "admin-dash__card-title"
					}, "Top Users")], -1), I.value ? (_(), f("div", we, [h(s, {
						variant: "text",
						lines: 4
					})])) : U.value ? (_(), u(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load top users",
						description: U.value
					}, {
						actions: x(() => [h(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[1] ||= (e) => Y(k.value)
						}, {
							default: x(() => [...t[8] ||= [m("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : j.value.length === 0 ? (_(), u(c, {
						key: 2,
						icon: "user",
						title: "No user data yet"
					})) : (_(), f("table", Te, [t[9] ||= p("thead", null, [p("tr", null, [
						p("th", {
							scope: "col",
							class: "admin-dash__rank"
						}, "#"),
						p("th", { scope: "col" }, "User"),
						p("th", { scope: "col" }, "Watch Time"),
						p("th", { scope: "col" }, "Plays")
					])], -1), p("tbody", null, [(_(!0), f(l, null, y(j.value, (e, t) => (_(), f("tr", { key: e.user_id }, [
						p("td", Ee, b(t + 1), 1),
						p("td", null, b(e.user_name), 1),
						p("td", null, b(E(e.total_watch_time_seconds)), 1),
						p("td", null, b(e.play_count), 1)
					]))), 128))])]))]),
					p("section", De, [t[12] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
						id: "tm-heading",
						class: "admin-dash__card-title"
					}, "Top Media")], -1), L.value ? (_(), f("div", Oe, [h(s, {
						variant: "text",
						lines: 4
					})])) : W.value ? (_(), u(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load top media",
						description: W.value
					}, {
						actions: x(() => [h(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[2] ||= (e) => X(k.value)
						}, {
							default: x(() => [...t[11] ||= [m("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : M.value.length === 0 ? (_(), u(c, {
						key: 2,
						icon: "film",
						title: "No media data yet"
					})) : (_(), f("ol", ke, [(_(!0), f(l, null, y(M.value, (e, t) => (_(), f("li", {
						key: e.media_item_id,
						class: "admin-dash__media-item"
					}, [
						p("span", Ae, b(t + 1), 1),
						e.media_item_id ? (_(), u(n, {
							key: 0,
							to: `/app/media/${e.media_item_id}`,
							class: "admin-dash__media-info admin-dash__media-info--link"
						}, {
							default: x(() => [p("span", {
								class: "admin-dash__media-title",
								title: e.media_title
							}, b(e.media_title), 9, je), h(o, { tone: O(e.media_type) }, {
								default: x(() => [m(b(e.media_type), 1)]),
								_: 2
							}, 1032, ["tone"])]),
							_: 2
						}, 1032, ["to"])) : (_(), f("span", Me, [p("span", {
							class: "admin-dash__media-title",
							title: e.media_title
						}, b(e.media_title), 9, Ne), h(o, { tone: O(e.media_type) }, {
							default: x(() => [m(b(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])])),
						p("div", Pe, [p("span", null, b(e.play_count) + " plays", 1), p("span", null, b(E(e.total_duration_seconds)), 1)])
					]))), 128))]))]),
					p("section", Fe, [t[14] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
						id: "st-heading",
						class: "admin-dash__card-title"
					}, "Storage")], -1), R.value ? (_(), f("div", Ie, [h(s, {
						variant: "text",
						lines: 3
					})])) : G.value ? (_(), u(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load storage",
						description: G.value
					}, {
						actions: x(() => [h(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: $e
						}, {
							default: x(() => [...t[13] ||= [m("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : N.value.length === 0 ? (_(), u(c, {
						key: 2,
						icon: "image",
						title: "No storage data"
					})) : (_(), f(l, { key: 3 }, [p("div", Le, [(_(!0), f(l, null, y(N.value, (e) => (_(), f("div", {
						key: e.media_type,
						class: "admin-dash__storage-card"
					}, [
						h(o, { tone: O(e.media_type) }, {
							default: x(() => [m(b(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						p("div", Re, b(e.item_count.toLocaleString()) + " items", 1),
						p("div", ze, b(D(e.total_bytes)), 1)
					]))), 128))]), q.value > 0 ? (_(), f("p", Be, " Transcode cache: " + b(D(q.value)), 1)) : d("", !0)], 64))]),
					p("section", Ve, [t[17] ||= p("header", { class: "admin-dash__card-head" }, [p("h2", {
						id: "act-heading",
						class: "admin-dash__card-title"
					}, "Recent Activity")], -1), z.value ? (_(), f("div", He, [h(s, {
						variant: "text",
						lines: 5
					})])) : K.value ? (_(), u(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load activity",
						description: K.value
					}, {
						actions: x(() => [h(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[3] ||= (e) => Z(S)
						}, {
							default: x(() => [...t[15] ||= [m("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : P.value.length === 0 ? (_(), u(c, {
						key: 2,
						icon: "list",
						title: "No recent activity"
					})) : (_(), f("div", Ue, [p("ul", We, [(_(!0), f(l, null, y(P.value, (e) => (_(), f("li", {
						key: e.id,
						class: "admin-dash__activity-item"
					}, [
						h(o, { tone: Ze(e.event_type) }, {
							default: x(() => [m(b(e.event_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						p("span", Ge, b(e.user_name), 1),
						p("span", {
							class: "admin-dash__activity-title",
							title: e.media_title
						}, b(e.media_title), 9, Ke),
						p("time", {
							class: "admin-dash__activity-time",
							datetime: e.created_at,
							title: e.created_at
						}, b(Xe(e.created_at)), 9, qe)
					]))), 128))]), V.value ? (_(), u(a, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: B.value,
						onClick: et
					}, {
						default: x(() => [...t[16] ||= [m(" Load more ", -1)]]),
						_: 1
					}, 8, ["loading"])) : d("", !0)]))])
				])
			]);
		};
	}
}), [["__scopeId", "data-v-37f5478b"]]);
//#endregion
export { C as default };

//# sourceMappingURL=DashboardPage-DEMsbFyN.js.map