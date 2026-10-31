import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./dashboard-CWK2kU28.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as ee } from "./PageHint-BlhPmafC.js";
import { t as a } from "./helpLinks-iarZuNmw.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as te } from "./Select-ChFXd0gU.js";
import { t as s } from "./Skeleton-B2Mt2L00.js";
import { t as c } from "./EmptyState-BjOJ1k_A.js";
import { n as l } from "./Icon-CIbfiPrs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ne, normalizeStyle as re, onBeforeUnmount as ie, onMounted as ae, openBlock as y, ref as b, renderList as x, resolveComponent as oe, toDisplayString as S, unref as C, watch as se, withCtx as w } from "vue";
// src/pages/admin/DashboardPage.vue?vue&type=script&setup=true&lang.ts
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
}, Oe = { class: "admin-dash__media-rank" }, ke = ["title"], Ae = {
	key: 1,
	class: "admin-dash__media-info"
}, je = ["title"], Me = { class: "admin-dash__media-stats" }, Ne = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "st-heading"
}, Pe = {
	key: 0,
	class: "admin-dash__skel"
}, Fe = { class: "admin-dash__storage-grid" }, Ie = { class: "admin-dash__storage-count" }, Le = { class: "admin-dash__storage-size" }, Re = {
	key: 0,
	class: "admin-dash__storage-note"
}, ze = {
	class: "admin-dash__card admin-dash__card--full",
	"aria-labelledby": "act-heading"
}, Be = {
	key: 0,
	class: "admin-dash__skel"
}, Ve = {
	key: 3,
	class: "admin-dash__activity"
}, He = {
	class: "admin-dash__activity-list",
	role: "list"
}, Ue = { class: "admin-dash__activity-user" }, We = ["title"], Ge = ["datetime", "title"], T = 20, Ke = 3e4, E = /*#__PURE__*/ l(/* @__PURE__ */ v({
	__name: "DashboardPage",
	props: { client: {} },
	setup(l) {
		let v = l, E = ne("apiBase", ""), qe = d(() => typeof E == "string" ? E : E?.value ?? ""), D = new n(v.client ?? new e({ baseUrl: qe.value })), O = r();
		function k(e) {
			if (e === 0) return "—";
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60);
			return t > 0 ? `${t}h ${n}m` : `${n}m`;
		}
		function A(e) {
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
		function Je(e) {
			let t = new Date(e).getTime();
			if (!Number.isFinite(t)) return "";
			let n = Math.floor((Date.now() - t) / 1e3);
			if (n < 60) return `${n}s ago`;
			let r = Math.floor(n / 60);
			if (r < 60) return `${r}m ago`;
			let i = Math.floor(r / 60);
			return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
		}
		function j(e) {
			switch ((e ?? "").toLowerCase()) {
				case "movie": return "accent";
				case "series": return "success";
				case "photo": return "warning";
				case "audiobook": return "info";
				default: return "neutral";
			}
		}
		function Ye(e) {
			switch ((e ?? "").toLowerCase()) {
				case "playback": return "accent";
				case "library": return "success";
				default: return "neutral";
			}
		}
		let Xe = [
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
		], M = b(30), N = b([]), P = b([]), F = b([]), I = b([]), L = b([]), R = b(!0), z = b(!0), B = b(!0), Ze = b(!0), V = b(!0), H = b(!1), Qe = b(!0), U = b(null), W = b(null), G = b(null), K = b(null), q = b(null), $e = d(() => I.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function et() {
			U.value = null;
			try {
				N.value = await D.getNowPlaying();
			} catch (e) {
				U.value = t(e, "Failed to load now playing."), O.error(U.value);
			} finally {
				R.value = !1;
			}
		}
		async function J(e) {
			z.value = !0, W.value = null;
			try {
				P.value = await D.getTopUsers(10, e);
			} catch (e) {
				W.value = t(e, "Failed to load top users."), O.error(W.value);
			} finally {
				z.value = !1;
			}
		}
		async function Y(e) {
			B.value = !0, G.value = null;
			try {
				F.value = await D.getTopMedia(10, e);
			} catch (e) {
				G.value = t(e, "Failed to load top media."), O.error(G.value);
			} finally {
				B.value = !1;
			}
		}
		async function X() {
			K.value = null;
			try {
				I.value = await D.getStorage();
			} catch (e) {
				K.value = t(e, "Failed to load storage."), O.error(K.value);
			} finally {
				Ze.value = !1;
			}
		}
		async function Z(e, n = !1) {
			n ? H.value = !0 : (V.value = !0, q.value = null);
			try {
				let t = await D.getActivity(e);
				n ? L.value = [...L.value, ...t] : L.value = t, Qe.value = t.length === T;
			} catch (e) {
				let r = t(e, "Failed to load activity.");
				n || (q.value = r), O.error(r);
			} finally {
				V.value = !1, H.value = !1;
			}
		}
		function tt() {
			Z(L.value.length + T, !0);
		}
		let Q = null;
		function nt() {
			Q !== null && (clearInterval(Q), Q = null);
		}
		function rt() {
			Q === null && (Q = setInterval(() => {
				D.getNowPlaying().then((e) => {
					N.value = e, U.value = null;
				}).catch(() => {});
			}, Ke));
		}
		function $() {
			document.hidden ? nt() : rt();
		}
		return se(M, (e) => {
			J(e), Y(e);
		}), ae(() => {
			et(), X(), Z(T), J(M.value), Y(M.value), rt(), typeof document < "u" && document.addEventListener("visibilitychange", $);
		}), ie(() => {
			nt(), typeof document < "u" && document.removeEventListener("visibilitychange", $);
		}), (e, t) => {
			let n = oe("RouterLink");
			return y(), m("section", ce, [
				h("header", le, [t[4] ||= h("h1", {
					id: "dash-heading",
					class: "admin-dash__title"
				}, "Dashboard", -1), _(te, {
					"model-value": M.value,
					options: Xe,
					label: "Date range",
					class: "admin-dash__range",
					"onUpdate:modelValue": t[0] ||= (e) => M.value = Number(e)
				}, null, 8, ["model-value"])]),
				_(ee, {
					links: C(a).dashboard.links,
					details: C(a).dashboard.details
				}, {
					default: w(() => [...t[5] ||= [
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
				h("div", ue, [
					h("section", de, [h("header", fe, [t[6] ||= h("h2", {
						id: "np-heading",
						class: "admin-dash__card-title"
					}, "Now playing", -1), N.value.length > 0 ? (y(), f(i, {
						key: 0,
						tone: "accent",
						label: `${N.value.length} active sessions`
					}, {
						default: w(() => [g(S(N.value.length), 1)]),
						_: 1
					}, 8, ["label"])) : p("", !0)]), R.value ? (y(), m("div", pe, [_(s, {
						variant: "text",
						lines: 4
					})])) : U.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load now playing",
						description: U.value
					}, {
						actions: w(() => [_(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: et
						}, {
							default: w(() => [...t[7] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : N.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "play",
						title: "No active sessions"
					})) : (y(), m("ul", me, [(y(!0), m(u, null, x(N.value, (e) => (y(), m("li", {
						key: e.session_id,
						class: "admin-dash__np-item"
					}, [h("div", he, [
						h("span", ge, S(e.user_name), 1),
						h("span", {
							class: "admin-dash__np-mtitle",
							title: e.media_title
						}, S(e.media_title), 9, _e),
						_(i, { tone: j(e.media_type) }, {
							default: w(() => [g(S(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])
					]), h("div", ve, [h("div", {
						class: "admin-dash__bar",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [h("div", {
						class: "admin-dash__bar-fill",
						style: re({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, ye), h("span", be, S(e.progress_percent) + "%", 1)])]))), 128))]))]),
					h("section", xe, [t[10] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "tu-heading",
						class: "admin-dash__card-title"
					}, "Top Users")], -1), z.value ? (y(), m("div", Se, [_(s, {
						variant: "text",
						lines: 4
					})])) : W.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load top users",
						description: W.value
					}, {
						actions: w(() => [_(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[1] ||= (e) => J(M.value)
						}, {
							default: w(() => [...t[8] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : P.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "user",
						title: "No user data yet"
					})) : (y(), m("table", Ce, [t[9] ||= h("thead", null, [h("tr", null, [
						h("th", {
							scope: "col",
							class: "admin-dash__rank"
						}, "#"),
						h("th", { scope: "col" }, "User"),
						h("th", { scope: "col" }, "Watch Time"),
						h("th", { scope: "col" }, "Plays")
					])], -1), h("tbody", null, [(y(!0), m(u, null, x(P.value, (e, t) => (y(), m("tr", { key: e.user_id }, [
						h("td", we, S(t + 1), 1),
						h("td", null, S(e.user_name), 1),
						h("td", null, S(k(e.total_watch_time_seconds)), 1),
						h("td", null, S(e.play_count), 1)
					]))), 128))])]))]),
					h("section", Te, [t[12] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "tm-heading",
						class: "admin-dash__card-title"
					}, "Top Media")], -1), B.value ? (y(), m("div", Ee, [_(s, {
						variant: "text",
						lines: 4
					})])) : G.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load top media",
						description: G.value
					}, {
						actions: w(() => [_(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[2] ||= (e) => Y(M.value)
						}, {
							default: w(() => [...t[11] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : F.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "film",
						title: "No media data yet"
					})) : (y(), m("ol", De, [(y(!0), m(u, null, x(F.value, (e, t) => (y(), m("li", {
						key: e.media_item_id,
						class: "admin-dash__media-item"
					}, [
						h("span", Oe, S(t + 1), 1),
						e.media_item_id ? (y(), f(n, {
							key: 0,
							to: `/app/media/${e.media_item_id}`,
							class: "admin-dash__media-info admin-dash__media-info--link"
						}, {
							default: w(() => [h("span", {
								class: "admin-dash__media-title",
								title: e.media_title
							}, S(e.media_title), 9, ke), _(i, { tone: j(e.media_type) }, {
								default: w(() => [g(S(e.media_type), 1)]),
								_: 2
							}, 1032, ["tone"])]),
							_: 2
						}, 1032, ["to"])) : (y(), m("span", Ae, [h("span", {
							class: "admin-dash__media-title",
							title: e.media_title
						}, S(e.media_title), 9, je), _(i, { tone: j(e.media_type) }, {
							default: w(() => [g(S(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])])),
						h("div", Me, [h("span", null, S(e.play_count) + " plays", 1), h("span", null, S(k(e.total_duration_seconds)), 1)])
					]))), 128))]))]),
					h("section", Ne, [t[14] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "st-heading",
						class: "admin-dash__card-title"
					}, "Storage")], -1), Ze.value ? (y(), m("div", Pe, [_(s, {
						variant: "text",
						lines: 3
					})])) : K.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load storage",
						description: K.value
					}, {
						actions: w(() => [_(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: X
						}, {
							default: w(() => [...t[13] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : I.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "image",
						title: "No storage data"
					})) : (y(), m(u, { key: 3 }, [h("div", Fe, [(y(!0), m(u, null, x(I.value, (e) => (y(), m("div", {
						key: e.media_type,
						class: "admin-dash__storage-card"
					}, [
						_(i, { tone: j(e.media_type) }, {
							default: w(() => [g(S(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						h("div", Ie, S(e.item_count.toLocaleString()) + " items", 1),
						h("div", Le, S(A(e.total_bytes)), 1)
					]))), 128))]), $e.value > 0 ? (y(), m("p", Re, " Transcode cache: " + S(A($e.value)), 1)) : p("", !0)], 64))]),
					h("section", ze, [t[17] ||= h("header", { class: "admin-dash__card-head" }, [h("h2", {
						id: "act-heading",
						class: "admin-dash__card-title"
					}, "Recent Activity")], -1), V.value ? (y(), m("div", Be, [_(s, {
						variant: "text",
						lines: 5
					})])) : q.value ? (y(), f(c, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load activity",
						description: q.value
					}, {
						actions: w(() => [_(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[3] ||= (e) => Z(T)
						}, {
							default: w(() => [...t[15] ||= [g("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : L.value.length === 0 ? (y(), f(c, {
						key: 2,
						icon: "list",
						title: "No recent activity"
					})) : (y(), m("div", Ve, [h("ul", He, [(y(!0), m(u, null, x(L.value, (e) => (y(), m("li", {
						key: e.id,
						class: "admin-dash__activity-item"
					}, [
						_(i, { tone: Ye(e.event_type) }, {
							default: w(() => [g(S(e.event_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						h("span", Ue, S(e.user_name), 1),
						h("span", {
							class: "admin-dash__activity-title",
							title: e.media_title
						}, S(e.media_title), 9, We),
						h("time", {
							class: "admin-dash__activity-time",
							datetime: e.created_at,
							title: e.created_at
						}, S(Je(e.created_at)), 9, Ge)
					]))), 128))]), Qe.value ? (y(), f(o, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: H.value,
						onClick: tt
					}, {
						default: w(() => [...t[16] ||= [g(" Load more ", -1)]]),
						_: 1
					}, 8, ["loading"])) : p("", !0)]))])
				])
			]);
		};
	}
}), [["__scopeId", "data-v-88a10ce1"]]);
export { E as default };

//# sourceMappingURL=DashboardPage-BRDI5IQr.js.map