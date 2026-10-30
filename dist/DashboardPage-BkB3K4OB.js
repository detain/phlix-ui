import { l as e, t, y as n } from "./client-pLl-rDdN.js";
import { t as r } from "./dashboard-aQHunbIB.js";
import { t as i } from "./useToastStore-Bu-iYU7r.js";
import { t as a } from "./Badge-C6LNO9Kk.js";
import { t as ee } from "./PageHint-BlhPmafC.js";
import { t as o } from "./helpLinks-iarZuNmw.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as te } from "./Select-CvK9Rhql.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { Fragment as d, computed as f, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as ne, normalizeStyle as re, onBeforeUnmount as ie, onMounted as ae, openBlock as b, ref as x, renderList as S, resolveComponent as oe, toDisplayString as C, unref as se, watch as ce, withCtx as w } from "vue";
// src/pages/admin/DashboardPage.vue?vue&type=script&setup=true&lang.ts
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
}, We = { class: "admin-dash__activity-user" }, Ge = ["title"], Ke = ["datetime", "title"], T = 20, qe = 3e4, E = /*#__PURE__*/ u(/* @__PURE__ */ y({
	__name: "DashboardPage",
	props: { client: {} },
	setup(u) {
		let y = u, E = ne("apiBase", ""), Je = f(() => typeof E == "string" ? E : E?.value ?? ""), D = new r(y.client ?? new t({
			baseUrl: Je.value,
			tokenStore: new e()
		})), O = i();
		function Ye(e) {
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
		], j = x(30), M = x([]), N = x([]), P = x([]), F = x([]), I = x([]), L = x(!0), R = x(!0), z = x(!0), B = x(!0), V = x(!0), H = x(!1), U = x(!0), W = x(null), G = x(null), K = x(null), q = x(null), J = x(null), $e = f(() => F.value.reduce((e, t) => e + t.transcode_cache_bytes, 0));
		async function et() {
			W.value = null;
			try {
				M.value = await D.getNowPlaying();
			} catch (e) {
				W.value = n(e, "Failed to load now playing."), O.error(W.value);
			} finally {
				L.value = !1;
			}
		}
		async function Y(e) {
			R.value = !0, G.value = null;
			try {
				N.value = await D.getTopUsers(10, e);
			} catch (e) {
				G.value = n(e, "Failed to load top users."), O.error(G.value);
			} finally {
				R.value = !1;
			}
		}
		async function X(e) {
			z.value = !0, K.value = null;
			try {
				P.value = await D.getTopMedia(10, e);
			} catch (e) {
				K.value = n(e, "Failed to load top media."), O.error(K.value);
			} finally {
				z.value = !1;
			}
		}
		async function tt() {
			q.value = null;
			try {
				F.value = await D.getStorage();
			} catch (e) {
				q.value = n(e, "Failed to load storage."), O.error(q.value);
			} finally {
				B.value = !1;
			}
		}
		async function Z(e, t = !1) {
			t ? H.value = !0 : (V.value = !0, J.value = null);
			try {
				let n = await D.getActivity(e);
				t ? I.value = [...I.value, ...n] : I.value = n, U.value = n.length === T;
			} catch (e) {
				let r = n(e, "Failed to load activity.");
				t || (J.value = r), O.error(r);
			} finally {
				V.value = !1, H.value = !1;
			}
		}
		function nt() {
			Z(I.value.length + T, !0);
		}
		let Q = null;
		function rt() {
			Q !== null && (clearInterval(Q), Q = null);
		}
		function it() {
			Q === null && (Q = setInterval(() => {
				D.getNowPlaying().then((e) => {
					M.value = e, W.value = null;
				}).catch(() => {});
			}, qe));
		}
		function $() {
			document.hidden ? rt() : it();
		}
		return ce(j, (e) => {
			Y(e), X(e);
		}), ae(() => {
			et(), tt(), Z(T), Y(j.value), X(j.value), it(), typeof document < "u" && document.addEventListener("visibilitychange", $);
		}), ie(() => {
			rt(), typeof document < "u" && document.removeEventListener("visibilitychange", $);
		}), (e, t) => {
			let n = oe("RouterLink");
			return b(), h("section", le, [
				g("header", ue, [t[4] ||= g("h1", {
					id: "dash-heading",
					class: "admin-dash__title"
				}, "Dashboard", -1), v(te, {
					"model-value": j.value,
					options: Qe,
					label: "Date range",
					class: "admin-dash__range",
					"onUpdate:modelValue": t[0] ||= (e) => j.value = Number(e)
				}, null, 8, ["model-value"])]),
				v(ee, {
					links: se(o).dashboard.links,
					details: se(o).dashboard.details
				}, {
					default: w(() => [...t[5] ||= [
						_(" A live overview of your server. The cards show ", -1),
						g("strong", null, "who's watching right now", -1),
						_(", your ", -1),
						g("strong", null, "top users", -1),
						_(" and ", -1),
						g("strong", null, "most-watched titles", -1),
						_(", current ", -1),
						g("strong", null, "storage use", -1),
						_(", and a feed of ", -1),
						g("strong", null, "recent activity", -1),
						_(". Use the ", -1),
						g("strong", null, "Date range", -1),
						_(" menu to switch the top-users and top-media stats between the last 7, 30, or 90 days. ", -1)
					]]),
					_: 1
				}, 8, ["links", "details"]),
				g("div", de, [
					g("section", fe, [g("header", pe, [t[6] ||= g("h2", {
						id: "np-heading",
						class: "admin-dash__card-title"
					}, "Now playing", -1), M.value.length > 0 ? (b(), p(a, {
						key: 0,
						tone: "accent",
						label: `${M.value.length} active sessions`
					}, {
						default: w(() => [_(C(M.value.length), 1)]),
						_: 1
					}, 8, ["label"])) : m("", !0)]), L.value ? (b(), h("div", me, [v(c, {
						variant: "text",
						lines: 4
					})])) : W.value ? (b(), p(l, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load now playing",
						description: W.value
					}, {
						actions: w(() => [v(s, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: et
						}, {
							default: w(() => [...t[7] ||= [_("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : M.value.length === 0 ? (b(), p(l, {
						key: 2,
						icon: "play",
						title: "No active sessions"
					})) : (b(), h("ul", he, [(b(!0), h(d, null, S(M.value, (e) => (b(), h("li", {
						key: e.session_id,
						class: "admin-dash__np-item"
					}, [g("div", ge, [
						g("span", _e, C(e.user_name), 1),
						g("span", {
							class: "admin-dash__np-mtitle",
							title: e.media_title
						}, C(e.media_title), 9, ve),
						v(a, { tone: A(e.media_type) }, {
							default: w(() => [_(C(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])
					]), g("div", ye, [g("div", {
						class: "admin-dash__bar",
						role: "progressbar",
						"aria-valuenow": e.progress_percent,
						"aria-valuemin": 0,
						"aria-valuemax": 100
					}, [g("div", {
						class: "admin-dash__bar-fill",
						style: re({ width: `${e.progress_percent}%` })
					}, null, 4)], 8, be), g("span", xe, C(e.progress_percent) + "%", 1)])]))), 128))]))]),
					g("section", Se, [t[10] ||= g("header", { class: "admin-dash__card-head" }, [g("h2", {
						id: "tu-heading",
						class: "admin-dash__card-title"
					}, "Top Users")], -1), R.value ? (b(), h("div", Ce, [v(c, {
						variant: "text",
						lines: 4
					})])) : G.value ? (b(), p(l, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load top users",
						description: G.value
					}, {
						actions: w(() => [v(s, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[1] ||= (e) => Y(j.value)
						}, {
							default: w(() => [...t[8] ||= [_("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : N.value.length === 0 ? (b(), p(l, {
						key: 2,
						icon: "user",
						title: "No user data yet"
					})) : (b(), h("table", we, [t[9] ||= g("thead", null, [g("tr", null, [
						g("th", {
							scope: "col",
							class: "admin-dash__rank"
						}, "#"),
						g("th", { scope: "col" }, "User"),
						g("th", { scope: "col" }, "Watch Time"),
						g("th", { scope: "col" }, "Plays")
					])], -1), g("tbody", null, [(b(!0), h(d, null, S(N.value, (e, t) => (b(), h("tr", { key: e.user_id }, [
						g("td", Te, C(t + 1), 1),
						g("td", null, C(e.user_name), 1),
						g("td", null, C(Ye(e.total_watch_time_seconds)), 1),
						g("td", null, C(e.play_count), 1)
					]))), 128))])]))]),
					g("section", Ee, [t[12] ||= g("header", { class: "admin-dash__card-head" }, [g("h2", {
						id: "tm-heading",
						class: "admin-dash__card-title"
					}, "Top Media")], -1), z.value ? (b(), h("div", De, [v(c, {
						variant: "text",
						lines: 4
					})])) : K.value ? (b(), p(l, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load top media",
						description: K.value
					}, {
						actions: w(() => [v(s, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[2] ||= (e) => X(j.value)
						}, {
							default: w(() => [...t[11] ||= [_("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : P.value.length === 0 ? (b(), p(l, {
						key: 2,
						icon: "film",
						title: "No media data yet"
					})) : (b(), h("ol", Oe, [(b(!0), h(d, null, S(P.value, (e, t) => (b(), h("li", {
						key: e.media_item_id,
						class: "admin-dash__media-item"
					}, [
						g("span", ke, C(t + 1), 1),
						e.media_item_id ? (b(), p(n, {
							key: 0,
							to: `/app/media/${e.media_item_id}`,
							class: "admin-dash__media-info admin-dash__media-info--link"
						}, {
							default: w(() => [g("span", {
								class: "admin-dash__media-title",
								title: e.media_title
							}, C(e.media_title), 9, Ae), v(a, { tone: A(e.media_type) }, {
								default: w(() => [_(C(e.media_type), 1)]),
								_: 2
							}, 1032, ["tone"])]),
							_: 2
						}, 1032, ["to"])) : (b(), h("span", je, [g("span", {
							class: "admin-dash__media-title",
							title: e.media_title
						}, C(e.media_title), 9, Me), v(a, { tone: A(e.media_type) }, {
							default: w(() => [_(C(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"])])),
						g("div", Ne, [g("span", null, C(e.play_count) + " plays", 1), g("span", null, C(Ye(e.total_duration_seconds)), 1)])
					]))), 128))]))]),
					g("section", Pe, [t[14] ||= g("header", { class: "admin-dash__card-head" }, [g("h2", {
						id: "st-heading",
						class: "admin-dash__card-title"
					}, "Storage")], -1), B.value ? (b(), h("div", Fe, [v(c, {
						variant: "text",
						lines: 3
					})])) : q.value ? (b(), p(l, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load storage",
						description: q.value
					}, {
						actions: w(() => [v(s, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: tt
						}, {
							default: w(() => [...t[13] ||= [_("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : F.value.length === 0 ? (b(), p(l, {
						key: 2,
						icon: "image",
						title: "No storage data"
					})) : (b(), h(d, { key: 3 }, [g("div", Ie, [(b(!0), h(d, null, S(F.value, (e) => (b(), h("div", {
						key: e.media_type,
						class: "admin-dash__storage-card"
					}, [
						v(a, { tone: A(e.media_type) }, {
							default: w(() => [_(C(e.media_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						g("div", Le, C(e.item_count.toLocaleString()) + " items", 1),
						g("div", Re, C(k(e.total_bytes)), 1)
					]))), 128))]), $e.value > 0 ? (b(), h("p", ze, " Transcode cache: " + C(k($e.value)), 1)) : m("", !0)], 64))]),
					g("section", Be, [t[17] ||= g("header", { class: "admin-dash__card-head" }, [g("h2", {
						id: "act-heading",
						class: "admin-dash__card-title"
					}, "Recent Activity")], -1), V.value ? (b(), h("div", Ve, [v(c, {
						variant: "text",
						lines: 5
					})])) : J.value ? (b(), p(l, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load activity",
						description: J.value
					}, {
						actions: w(() => [v(s, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: t[3] ||= (e) => Z(T)
						}, {
							default: w(() => [...t[15] ||= [_("Retry", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : I.value.length === 0 ? (b(), p(l, {
						key: 2,
						icon: "list",
						title: "No recent activity"
					})) : (b(), h("div", He, [g("ul", Ue, [(b(!0), h(d, null, S(I.value, (e) => (b(), h("li", {
						key: e.id,
						class: "admin-dash__activity-item"
					}, [
						v(a, { tone: Ze(e.event_type) }, {
							default: w(() => [_(C(e.event_type), 1)]),
							_: 2
						}, 1032, ["tone"]),
						g("span", We, C(e.user_name), 1),
						g("span", {
							class: "admin-dash__activity-title",
							title: e.media_title
						}, C(e.media_title), 9, Ge),
						g("time", {
							class: "admin-dash__activity-time",
							datetime: e.created_at,
							title: e.created_at
						}, C(Xe(e.created_at)), 9, Ke)
					]))), 128))]), U.value ? (b(), p(s, {
						key: 0,
						variant: "outline",
						size: "sm",
						loading: H.value,
						onClick: nt
					}, {
						default: w(() => [...t[16] ||= [_(" Load more ", -1)]]),
						_: 1
					}, 8, ["loading"])) : m("", !0)]))])
				])
			]);
		};
	}
}), [["__scopeId", "data-v-84f4f0b6"]]);
export { E as default };

//# sourceMappingURL=DashboardPage-BkB3K4OB.js.map