import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as o } from "./Badge-B6MgOwKQ.js";
import { t as ee } from "./Select-CymWKJLs.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as te } from "./PageHint-BoAlFFBN.js";
import { t as ne } from "./dashboard-BTCOCTHQ.js";
import { t as l } from "./helpLinks-BI4oN4Or.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as re, normalizeStyle as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as y, ref as b, renderList as x, resolveComponent as se, toDisplayString as S, unref as ce, watch as le, withCtx as C } from "vue";
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
}, Ge = { class: "admin-dash__activity-user" }, Ke = ["title"], qe = ["datetime", "title"], w = 20, Je = 3e4, T = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "DashboardPage",
	props: { client: {} },
	setup(e) {
		let v = e, T = re("apiBase", ""), Ye = d(() => typeof T == "string" ? T : T?.value ?? ""), E = new ne(v.client ?? new r({
			baseUrl: Ye.value,
			tokenStore: new t()
		})), D = i();
		function O(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function k(e) {
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
		function A(e) {
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
		], j = b(30), M = b([]), N = b([]), P = b([]), F = b([]), I = b([]), L = b(!0), R = b(!0), z = b(!0), B = b(!0), V = b(!0), H = b(!1), U = b(!0), W = b(null), G = b(null), K = b(null), q = b(null), J = b(null), $e = d(() => F.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function et() {
			W.value = null;
			try {
				M.value = await E.getNowPlaying();
			} catch (e) {
				W.value = n(e, "Failed to load now playing."), D.error(W.value);
			} finally {
				L.value = !1;
			}
		}
		async function Y(e) {
			R.value = !0, G.value = null;
			try {
				N.value = await E.getTopUsers(10, e);
			} catch (e) {
				G.value = n(e, "Failed to load top users."), D.error(G.value);
			} finally {
				R.value = !1;
			}
		}
		async function X(e) {
			z.value = !0, K.value = null;
			try {
				P.value = await E.getTopMedia(10, e);
			} catch (e) {
				K.value = n(e, "Failed to load top media."), D.error(K.value);
			} finally {
				z.value = !1;
			}
		}
		async function tt() {
			q.value = null;
			try {
				F.value = await E.getStorage();
			} catch (e) {
				q.value = n(e, "Failed to load storage."), D.error(q.value);
			} finally {
				B.value = !1;
			}
		}
		async function Z(e, t = !1) {
			t ? H.value = !0 : (V.value = !0, J.value = null);
			try {
				let n = await E.getActivity(e);
				t ? I.value = [...I.value, ...n] : I.value = n, U.value = n.length === w;
			} catch (e) {
				let r = n(e, "Failed to load activity.");
				t || (J.value = r), D.error(r);
			} finally {
				V.value = !1, H.value = !1;
			}
		}
		function nt() {
			Z(I.value.length + w, !0);
		}
		let Q = null;
		function rt() {
			Q !== null && (clearInterval(Q), Q = null);
		}
		function it() {
			Q === null && (Q = setInterval(() => {
				E.getNowPlaying().then((e) => {
					M.value = e, W.value = null;
				}).catch(() => {});
			}, Je));
		}
		function $() {
			document.hidden ? rt() : it();
		}
		return le(j, (e) => {
			Y(e), X(e);
		}), oe(() => {
			et(), tt(), Z(w), Y(j.value), X(j.value), it(), typeof document < "u" && document.addEventListener("visibilitychange", $);
		}), ae(() => {
			rt(), typeof document < "u" && document.removeEventListener("visibilitychange", $);
		}), (e, t) => {
			let n = se("RouterLink");
			return y(), m("section", ue, [
				h("header", de, [t[4] ||= h("h1", {
					id: "dash-heading",
					class: "admin-dash__title"
				}, "Dashboard", -1), _(ee, {
					"model-value": j.value,
					options: Qe,
					label: "Date range",
					class: "admin-dash__range",
					"onUpdate:modelValue": t[0] ||= (e) => j.value = Number(e)
				}, null, 8, ["model-value"])]),
				_(te, {
					links: ce(l).dashboard.links,
					details: ce(l).dashboard.details
				}, {
					default: C(() => [...t[5] ||= [
						g(" A live overview of your server. The cards show ", -1),
						h("strong", null, "who's watching right now", -1),
						g(", your ", -1),
						h("strong", null, "top users", -1),
						g(" and ", -1),
						h("strong", null, "most-watched titles", -1),
						g(", current ", -1),
						h("strong", null, "storage use", -1),
						g(", and a feed of ", -1),
						h("strong", null, "recent activity", -1),
						g(". Use the ", -1),
						h("strong", null, "Date range", -1),
						g(" menu to switch the top-users and top-media stats between the last 7, 30, or 90 days. ", -1)
					]]),
					_: 1
				}, 8, ["links", "details"]),
				h("div", fe, [
					h("section", pe, [h("header", me, [t[6] ||= h("h2", {
						id: "np-heading",
						class: "admin-dash__card-title"
					}, "Now Playing", -1), M.value.length > 0 ? (y(), f(o, {
						key: 0,
						tone: "accent",
						label: `${M.value.length} active sessions`
					}, {
						default: C(() => [g(S(M.value.length), 1)]),
						_: 1
					}, 8, ["label"])) : p("", !0)]), L.value ? (y(), m("div", he, [_(s, {
						variant: "text",
						lines: 4
					})])) : W.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load now playing",
						description: W.value
					}, {
						actions: C(() => [_(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: et
						}, {
							default: C(() => [...t[7] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : M.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "play",
						title: "No active sessions"
					})) : (y(), m("ul", ge, [(y(!0), m(u, null, x(M.value, (e) => (y(), m("li", {
						key: e.session_id,
						class: "admin-dash__np-item"
					}, [h("div", _e, [
						h("span", ve, S(e.user_name), 1),
						h("span", {
							class: "admin-dash__np-mtitle",
							title: e.media_title
						}, S(e.media_title), 9, ye),
						_(o, { tone: A(e.media_type) }, {
							default: C(() => [g(S(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])
					]), h("div", be, [h("div", {
						class: "admin-dash__bar",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [h("div", {
						class: "admin-dash__bar-fill",
						style: ie({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, xe), h("span", Se, S(e.progress_percent) + "%", 1)])]))), 128))]))]),
					h("section", Ce, [t[10] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "tu-heading",
						class: "admin-dash__card-title"
					}, "Top Users")], -1), R.value ? (y(), m("div", we, [_(s, {
						variant: "text",
						lines: 4
					})])) : G.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load top users",
						description: G.value
					}, {
						actions: C(() => [_(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[1] ||= (e) => Y(j.value)
						}, {
							default: C(() => [...t[8] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : N.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "user",
						title: "No user data yet"
					})) : (y(), m("table", Te, [t[9] ||= h("thead", null, [h("tr", null, [
						h("th", {
							scope: "col",
							class: "admin-dash__rank"
						}, "#"),
						h("th", { scope: "col" }, "User"),
						h("th", { scope: "col" }, "Watch Time"),
						h("th", { scope: "col" }, "Plays")
					])], -1), h("tbody", null, [(y(!0), m(u, null, x(N.value, (e, t) => (y(), m("tr", { key: e.user_id }, [
						h("td", Ee, S(t + 1), 1),
						h("td", null, S(e.user_name), 1),
						h("td", null, S(O(e.total_watch_time_seconds)), 1),
						h("td", null, S(e.play_count), 1)
					]))), 128))])]))]),
					h("section", De, [t[12] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "tm-heading",
						class: "admin-dash__card-title"
					}, "Top Media")], -1), z.value ? (y(), m("div", Oe, [_(s, {
						variant: "text",
						lines: 4
					})])) : K.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load top media",
						description: K.value
					}, {
						actions: C(() => [_(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[2] ||= (e) => X(j.value)
						}, {
							default: C(() => [...t[11] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : P.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "film",
						title: "No media data yet"
					})) : (y(), m("ol", ke, [(y(!0), m(u, null, x(P.value, (e, t) => (y(), m("li", {
						key: e.media_item_id,
						class: "admin-dash__media-item"
					}, [
						h("span", Ae, S(t + 1), 1),
						e.media_item_id ? (y(), f(n, {
							key: 0,
							to: `/app/media/${e.media_item_id}`,
							class: "admin-dash__media-info admin-dash__media-info--link"
						}, {
							default: C(() => [h("span", {
								class: "admin-dash__media-title",
								title: e.media_title
							}, S(e.media_title), 9, je), _(o, { tone: A(e.media_type) }, {
								default: C(() => [g(S(e.media_type), 1)]),
								_: 2
							}, 1032, ["tone"])]),
							_: 2
						}, 1032, ["to"])) : (y(), m("span", Me, [h("span", {
							class: "admin-dash__media-title",
							title: e.media_title
						}, S(e.media_title), 9, Ne), _(o, { tone: A(e.media_type) }, {
							default: C(() => [g(S(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])])),
						h("div", Pe, [h("span", null, S(e.play_count) + " plays", 1), h("span", null, S(O(e.total_duration_seconds)), 1)])
					]))), 128))]))]),
					h("section", Fe, [t[14] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "st-heading",
						class: "admin-dash__card-title"
					}, "Storage")], -1), B.value ? (y(), m("div", Ie, [_(s, {
						variant: "text",
						lines: 3
					})])) : q.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load storage",
						description: q.value
					}, {
						actions: C(() => [_(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: tt
						}, {
							default: C(() => [...t[13] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : F.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "image",
						title: "No storage data"
					})) : (y(), m(u, { key: 3 }, [h("div", Le, [(y(!0), m(u, null, x(F.value, (e) => (y(), m("div", {
						key: e.media_type,
						class: "admin-dash__storage-card"
					}, [
						_(o, { tone: A(e.media_type) }, {
							default: C(() => [g(S(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						h("div", Re, S(e.item_count.toLocaleString()) + " items", 1),
						h("div", ze, S(k(e.total_bytes)), 1)
					]))), 128))]), $e.value > 0 ? (y(), m("p", Be, " Transcode cache: " + S(k($e.value)), 1)) : p("", !0)], 64))]),
					h("section", Ve, [t[17] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "act-heading",
						class: "admin-dash__card-title"
					}, "Recent Activity")], -1), V.value ? (y(), m("div", He, [_(s, {
						variant: "text",
						lines: 5
					})])) : J.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn't load activity",
						description: J.value
					}, {
						actions: C(() => [_(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[3] ||= (e) => Z(w)
						}, {
							default: C(() => [...t[15] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : I.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "list",
						title: "No recent activity"
					})) : (y(), m("div", Ue, [h("ul", We, [(y(!0), m(u, null, x(I.value, (e) => (y(), m("li", {
						key: e.id,
						class: "admin-dash__activity-item"
					}, [
						_(o, { tone: Ze(e.event_type) }, {
							default: C(() => [g(S(e.event_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						h("span", Ge, S(e.user_name), 1),
						h("span", {
							class: "admin-dash__activity-title",
							title: e.media_title
						}, S(e.media_title), 9, Ke),
						h("time", {
							class: "admin-dash__activity-time",
							datetime: e.created_at,
							title: e.created_at
						}, S(Xe(e.created_at)), 9, qe)
					]))), 128))]), U.value ? (y(), f(a, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: H.value,
						onClick: nt
					}, {
						default: C(() => [...t[16] ||= [g(" Load more ", -1)]]),
						_: 1
					}, 8, ["loading"])) : p("", !0)]))])
				])
			]);
		};
	}
}), [["__scopeId", "data-v-f4582ddd"]]);
//#endregion
export { T as default };

//# sourceMappingURL=DashboardPage-C9KsA0LJ.js.map