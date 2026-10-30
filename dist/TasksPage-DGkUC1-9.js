import { l as e, t, y as n } from "./client-CW4dUyY-.js";
import { t as r } from "./maintenance-Bkw7ItEm.js";
import { t as i } from "./backup-D-HrJzix.js";
import { t as ee } from "./updates-RNlhRRSw.js";
import { t as te } from "./useToastStore-Bu-iYU7r.js";
import { t as a } from "./Badge-C6LNO9Kk.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as s } from "./Modal-BU4hJGBA.js";
import { t as ne } from "./Skeleton-B2Mt2L00.js";
import { t as re } from "./EmptyState-BjOJ1k_A.js";
import { t as ie } from "./PageHint-BlhPmafC.js";
import { t as c } from "./helpLinks-iarZuNmw.js";
import { n as l } from "./Icon-CIbfiPrs.js";
import { Fragment as ae, computed as u, createBlock as oe, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as se, normalizeClass as _, onBeforeUnmount as ce, onMounted as le, openBlock as v, reactive as y, ref as b, renderList as ue, resolveComponent as de, toDisplayString as x, unref as S, vModelRadio as C, withCtx as w, withDirectives as T } from "vue";
// src/pages/admin/TasksPage.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "admin-tasks" }, pe = { class: "admin-tasks__head" }, me = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-library-heading"
}, he = { class: "admin-tasks__card" }, ge = { class: "admin-tasks__card-head" }, _e = { class: "admin-tasks__card-title" }, ve = { class: "admin-tasks__desc" }, ye = { class: "admin-tasks__modes" }, be = { class: "admin-tasks__mode" }, xe = { class: "admin-tasks__mode" }, Se = {
	key: 0,
	class: "admin-tasks__armed",
	role: "status"
}, Ce = {
	key: 1,
	class: "admin-tasks__safe",
	role: "status"
}, we = { class: "admin-tasks__actions" }, Te = { class: "admin-tasks__note" }, Ee = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-stats-heading"
}, De = { class: "admin-tasks__card" }, E = { class: "admin-tasks__card-head" }, Oe = { class: "admin-tasks__card-title" }, ke = { class: "admin-tasks__desc" }, Ae = { class: "admin-tasks__actions" }, je = { class: "admin-tasks__card" }, Me = { class: "admin-tasks__card-head" }, Ne = { class: "admin-tasks__card-title" }, Pe = { class: "admin-tasks__desc" }, Fe = { class: "admin-tasks__actions" }, Ie = { class: "admin-tasks__card" }, Le = {
	key: 0,
	class: "admin-tasks__skel"
}, Re = {
	key: 2,
	class: "admin-tasks__desc"
}, ze = {
	key: 3,
	class: "admin-tasks__table",
	"aria-label": "Recent maintenance jobs"
}, Be = { class: "admin-tasks__date" }, Ve = { class: "admin-tasks__date" }, He = { class: "admin-tasks__err" }, Ue = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-backup-heading"
}, We = { class: "admin-tasks__card" }, Ge = { class: "admin-tasks__card-head" }, Ke = { class: "admin-tasks__actions" }, qe = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-reapers-heading"
}, Je = { class: "admin-tasks__card" }, Ye = { class: "admin-tasks__card-head" }, Xe = { class: "admin-tasks__card-title" }, Ze = { class: "admin-tasks__desc" }, Qe = { class: "admin-tasks__actions" }, $e = { class: "admin-tasks__card" }, et = { class: "admin-tasks__card-head" }, tt = { class: "admin-tasks__card-title" }, nt = { class: "admin-tasks__desc" }, rt = { class: "admin-tasks__actions" }, it = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-plugins-heading"
}, at = { class: "admin-tasks__note" }, ot = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-server-heading"
}, st = { class: "admin-tasks__card" }, ct = { class: "admin-tasks__actions" }, lt = {
	key: 0,
	class: "admin-tasks__desc"
}, ut = { class: "admin-tasks__note" }, dt = 5e3, D = /*#__PURE__*/ l(/* @__PURE__ */ g({
	__name: "TasksPage",
	props: { client: {} },
	setup(l) {
		let g = l, D = se("apiBase", ""), ft = u(() => typeof D == "string" ? D : D?.value ?? ""), O = g.client ?? new t({
			baseUrl: ft.value,
			tokenStore: new e()
		}), k = new r(O), pt = new i(O), mt = new ee(O), A = te(), j = [
			"dedupe-paths",
			"storage-snapshot",
			"cleanup-orphaned-stats",
			"reap-scan-jobs",
			"reap-transcode-jobs",
			"backup-create",
			"update-status"
		], M = y(Object.fromEntries(j.map((e) => [e, !1]))), N = y(Object.fromEntries(j.map((e) => [e, null])));
		function P(e, t) {
			N[e] = {
				tone: "success",
				text: t
			}, A.success(t);
		}
		function ht(e, t) {
			N[e] = {
				tone: "warning",
				text: t
			}, A.info(t);
		}
		function F(e, t, r) {
			let i = n(t, r);
			N[e] = {
				tone: "error",
				text: i
			}, A.error(i);
		}
		let gt = {
			"storage-snapshot": {
				mode: "queued",
				label: "Storage snapshot",
				description: "Recompute per-bucket storage usage. Walks the vault, so it runs on the queue.",
				destructive: !1
			},
			"reap-scan-jobs": {
				mode: "sync",
				label: "Reap stale scan jobs",
				description: "Fail library-scan rows stuck in \"running\". Minimum age is six hours.",
				destructive: !1
			},
			"reap-transcode-jobs": {
				mode: "sync",
				label: "Reap stale transcode jobs",
				description: "Fail transcode jobs whose worker went away.",
				destructive: !1
			},
			"cleanup-orphaned-stats": {
				mode: "sync",
				label: "Clean up orphaned stats",
				description: "Delete statistics rows whose media item no longer exists.",
				destructive: !0
			},
			"dedupe-paths": {
				mode: "queued",
				label: "Merge duplicate paths",
				description: "Find media rows that share a file path and merge them onto one row.",
				destructive: !0
			}
		}, I = b([]);
		function L(e) {
			return I.value.find((t) => t.task === e) ?? gt[e];
		}
		async function _t() {
			try {
				I.value = await k.listTasks();
			} catch {
				I.value = [];
			}
		}
		let R = b([]), z = b(!0), B = b(null), V = null;
		function vt() {
			return R.value.some((e) => e.status === "queued" || e.status === "running");
		}
		function H() {
			V !== null && (clearInterval(V), V = null);
		}
		function U() {
			vt() ? V === null && (V = setInterval(() => {
				W();
			}, dt)) : H();
		}
		async function W() {
			B.value = null;
			try {
				R.value = await k.listJobs({ limit: 20 });
			} catch (e) {
				B.value = n(e, "Failed to load maintenance jobs.");
			} finally {
				z.value = !1, U();
			}
		}
		function yt(e) {
			e && (R.value = [e, ...R.value.filter((t) => t.id !== e.id)], U());
		}
		function bt(e, t) {
			let n = e.job?.id ?? "unknown";
			return e.created ? {
				fresh: !0,
				text: `${t}: queued a new run (job ${n}).`
			} : {
				fresh: !1,
				text: `${t}: already running — showing the existing job (${n}).`
			};
		}
		function G(e, t, n) {
			let r = bt(t, n);
			yt(t.job), r.fresh ? P(e, r.text) : ht(e, r.text);
		}
		let K = b("preview"), q = b(!1), J = u(() => K.value === "apply");
		async function Y() {
			M["dedupe-paths"] = !0;
			let e = J.value;
			try {
				G("dedupe-paths", await k.dedupePaths({ apply: e }), e ? "Merge duplicate paths (APPLY)" : "Merge duplicate paths (dry run)");
			} catch (e) {
				F("dedupe-paths", e, "Failed to start the duplicate-path merge.");
			} finally {
				M["dedupe-paths"] = !1;
			}
		}
		function xt() {
			J.value ? q.value = !0 : Y();
		}
		function St() {
			q.value = !1, Y();
		}
		async function X() {
			M["storage-snapshot"] = !0;
			try {
				G("storage-snapshot", await k.storageSnapshot(), "Storage snapshot");
			} catch (e) {
				F("storage-snapshot", e, "Failed to start the storage snapshot.");
			} finally {
				M["storage-snapshot"] = !1;
			}
		}
		let Z = b(!1);
		async function Ct() {
			Z.value = !1, M["cleanup-orphaned-stats"] = !0;
			try {
				let { data: e } = await k.cleanupOrphanedStats(), t = e.truncated ? ` The per-table cap of ${e.limit} was reached — run it again to continue.` : "";
				P("cleanup-orphaned-stats", `Deleted ${e.total} orphaned statistics rows.${t}`);
			} catch (e) {
				F("cleanup-orphaned-stats", e, "Failed to clean up orphaned statistics.");
			} finally {
				M["cleanup-orphaned-stats"] = !1;
			}
		}
		async function wt() {
			M["reap-scan-jobs"] = !0;
			try {
				let { data: e } = await k.reapScanJobs(), t = e.floor_applied ? ` The requested age of ${e.requested_older_than_seconds}s was raised to the ${e.older_than_seconds}s minimum.` : "";
				P("reap-scan-jobs", `Reaped ${e.reaped} stale scan jobs.${t}`);
			} catch (e) {
				F("reap-scan-jobs", e, "Failed to reap stale scan jobs.");
			} finally {
				M["reap-scan-jobs"] = !1;
			}
		}
		async function Tt() {
			M["reap-transcode-jobs"] = !0;
			try {
				let { data: e } = await k.reapTranscodeJobs();
				P("reap-transcode-jobs", `Reaped ${e.reaped} stale transcode jobs.`);
			} catch (e) {
				F("reap-transcode-jobs", e, "Failed to reap stale transcode jobs.");
			} finally {
				M["reap-transcode-jobs"] = !1;
			}
		}
		async function Et() {
			M["backup-create"] = !0;
			try {
				P("backup-create", (await pt.create({})).message || "Backup created.");
			} catch (e) {
				F("backup-create", e, "Failed to create a backup.");
			} finally {
				M["backup-create"] = !1;
			}
		}
		let Q = b(null);
		async function Dt() {
			M["update-status"] = !0;
			try {
				let e = await mt.check();
				Q.value = e, P("update-status", e.updateAvailable ? `Check dispatched. Update available: ${e.latestVersion ?? "unknown"} (running ${e.currentVersion}).` : `Check dispatched. Up to date on ${e.currentVersion}.`);
			} catch (e) {
				F("update-status", e, "Failed to trigger the update check.");
			} finally {
				M["update-status"] = !1;
			}
		}
		function $(e) {
			let t = N[e];
			return t === null ? "" : `admin-tasks__feedback--${t.tone}`;
		}
		function Ot(e) {
			return e === "completed" ? "success" : e === "failed" ? "error" : e === "running" ? "info" : "neutral";
		}
		return le(() => {
			_t(), W();
		}), ce(H), (e, t) => {
			let n = de("RouterLink");
			return v(), f("div", fe, [
				p("header", pe, [t[8] ||= p("h1", { class: "admin-tasks__title" }, "Tasks", -1), h(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "refresh",
					loading: z.value,
					onClick: W
				}, {
					default: w(() => [...t[7] ||= [m(" Refresh jobs ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				h(ie, {
					links: S(c).tasks.links,
					details: S(c).tasks.details
				}, {
					default: w(() => [...t[9] ||= [
						m(" Run the server’s maintenance work by hand. ", -1),
						p("strong", null, "Sync", -1),
						m(" tasks finish before the button stops spinning and report their numbers here; ", -1),
						p("strong", null, "queued", -1),
						m(" tasks are handed to the maintenance worker and appear in ", -1),
						p("strong", null, "Recent jobs", -1),
						m(" below. Firing a queued task that is already running does not start a second one. ", -1)
					]]),
					_: 1
				}, 8, ["links", "details"]),
				p("section", me, [
					t[18] ||= p("h2", {
						id: "tasks-library-heading",
						class: "admin-tasks__subtitle"
					}, "Library", -1),
					p("div", he, [
						p("div", ge, [
							p("h3", _e, x(L("dedupe-paths").label), 1),
							h(a, { tone: "info" }, {
								default: w(() => [...t[10] ||= [m("queued", -1)]]),
								_: 1
							}),
							h(a, { tone: "warning" }, {
								default: w(() => [...t[11] ||= [m("destructive", -1)]]),
								_: 1
							})
						]),
						p("p", ve, x(L("dedupe-paths").description), 1),
						p("fieldset", ye, [
							t[14] ||= p("legend", { class: "admin-tasks__legend" }, "Mode", -1),
							p("label", be, [T(p("input", {
								"onUpdate:modelValue": t[0] ||= (e) => K.value = e,
								type: "radio",
								name: "dedupe-mode",
								value: "preview"
							}, null, 512), [[C, K.value]]), t[12] ||= p("span", null, "Dry run — report what would be merged, change nothing", -1)]),
							p("label", xe, [T(p("input", {
								"onUpdate:modelValue": t[1] ||= (e) => K.value = e,
								type: "radio",
								name: "dedupe-mode",
								value: "apply"
							}, null, 512), [[C, K.value]]), t[13] ||= p("span", null, "Apply — permanently merge the duplicate rows", -1)])
						]),
						J.value ? (v(), f("p", Se, " Apply mode is armed: this run will delete duplicate media rows. ")) : (v(), f("p", Ce, " Dry-run mode: nothing will be changed. ")),
						p("div", we, [h(o, {
							variant: J.value ? "danger" : "solid",
							size: "sm",
							loading: M["dedupe-paths"],
							onClick: xt
						}, {
							default: w(() => [m(x(J.value ? "Merge duplicate paths (apply)" : "Merge duplicate paths (dry run)"), 1)]),
							_: 1
						}, 8, ["variant", "loading"])]),
						N["dedupe-paths"] ? (v(), f("p", {
							key: 2,
							class: _(["admin-tasks__feedback", $("dedupe-paths")]),
							role: "status"
						}, x(N["dedupe-paths"]?.text), 3)) : d("", !0)
					]),
					p("p", Te, [
						t[16] ||= m(" There is no server endpoint that scans every library at once. Scans are started per library on the ", -1),
						h(n, { to: { name: "admin-libraries" } }, {
							default: w(() => [...t[15] ||= [m("Libraries", -1)]]),
							_: 1
						}),
						t[17] ||= m(" page. ", -1)
					])
				]),
				t[56] ||= p("section", {
					class: "admin-tasks__section",
					"aria-labelledby": "tasks-recommendations-heading"
				}, [p("h2", {
					id: "tasks-recommendations-heading",
					class: "admin-tasks__subtitle"
				}, "Recommendations"), p("p", { class: "admin-tasks__note" }, " There is no server endpoint that recomputes similarity across every item. Similarity is computed per item in the background as media is scanned, and recommendations are derived from those scores automatically. ")], -1),
				p("section", Ee, [
					t[27] ||= p("h2", {
						id: "tasks-stats-heading",
						class: "admin-tasks__subtitle"
					}, "Stats & health", -1),
					p("div", De, [
						p("div", E, [p("h3", Oe, x(L("storage-snapshot").label), 1), h(a, { tone: "info" }, {
							default: w(() => [...t[19] ||= [m("queued", -1)]]),
							_: 1
						})]),
						p("p", ke, x(L("storage-snapshot").description), 1),
						p("div", Ae, [h(o, {
							variant: "solid",
							size: "sm",
							loading: M["storage-snapshot"],
							onClick: X
						}, {
							default: w(() => [...t[20] ||= [m(" Take storage snapshot ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["storage-snapshot"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("storage-snapshot")]),
							role: "status"
						}, x(N["storage-snapshot"]?.text), 3)) : d("", !0)
					]),
					p("div", je, [
						p("div", Me, [
							p("h3", Ne, x(L("cleanup-orphaned-stats").label), 1),
							h(a, { tone: "neutral" }, {
								default: w(() => [...t[21] ||= [m("sync", -1)]]),
								_: 1
							}),
							h(a, { tone: "warning" }, {
								default: w(() => [...t[22] ||= [m("destructive", -1)]]),
								_: 1
							})
						]),
						p("p", Pe, x(L("cleanup-orphaned-stats").description), 1),
						p("div", Fe, [h(o, {
							variant: "danger",
							size: "sm",
							loading: M["cleanup-orphaned-stats"],
							onClick: t[2] ||= (e) => Z.value = !0
						}, {
							default: w(() => [...t[23] ||= [m(" Clean up orphaned stats ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["cleanup-orphaned-stats"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("cleanup-orphaned-stats")]),
							role: "status"
						}, x(N["cleanup-orphaned-stats"]?.text), 3)) : d("", !0)
					]),
					p("div", Ie, [t[26] ||= p("div", { class: "admin-tasks__card-head" }, [p("h3", { class: "admin-tasks__card-title" }, "Recent jobs")], -1), z.value ? (v(), f("div", Le, [h(ne, {
						variant: "text",
						lines: 3
					})])) : B.value ? (v(), oe(re, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load maintenance jobs",
						description: B.value
					}, {
						actions: w(() => [h(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: W
						}, {
							default: w(() => [...t[24] ||= [m("Retry jobs", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : R.value.length === 0 ? (v(), f("p", Re, "No maintenance jobs yet.")) : (v(), f("table", ze, [t[25] ||= p("thead", null, [p("tr", null, [
						p("th", { scope: "col" }, "Task"),
						p("th", { scope: "col" }, "Status"),
						p("th", { scope: "col" }, "Queued"),
						p("th", { scope: "col" }, "Finished"),
						p("th", { scope: "col" }, "Error")
					])], -1), p("tbody", null, [(v(!0), f(ae, null, ue(R.value, (e) => (v(), f("tr", { key: e.id }, [
						p("td", null, x(e.task), 1),
						p("td", null, [h(a, { tone: Ot(e.status) }, {
							default: w(() => [m(x(e.status), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						p("td", Be, x(e.queued_at ?? "—"), 1),
						p("td", Ve, x(e.completed_at ?? "—"), 1),
						p("td", He, x(e.error ?? ""), 1)
					]))), 128))])]))])
				]),
				p("section", Ue, [t[33] ||= p("h2", {
					id: "tasks-backup-heading",
					class: "admin-tasks__subtitle"
				}, "Backups", -1), p("div", We, [
					p("div", Ge, [t[29] ||= p("h3", { class: "admin-tasks__card-title" }, "Create a backup now", -1), h(a, { tone: "neutral" }, {
						default: w(() => [...t[28] ||= [m("sync", -1)]]),
						_: 1
					})]),
					t[32] ||= p("p", { class: "admin-tasks__desc" }, " Snapshot the database and settings immediately, outside the automatic schedule. ", -1),
					p("div", Ke, [h(o, {
						variant: "solid",
						size: "sm",
						loading: M["backup-create"],
						onClick: Et
					}, {
						default: w(() => [...t[30] ||= [m(" Create backup now ", -1)]]),
						_: 1
					}, 8, ["loading"]), h(n, {
						to: { name: "admin-backup" },
						class: "admin-tasks__link"
					}, {
						default: w(() => [...t[31] ||= [m(" Go to Backup ", -1)]]),
						_: 1
					})]),
					N["backup-create"] ? (v(), f("p", {
						key: 0,
						class: _(["admin-tasks__feedback", $("backup-create")]),
						role: "status"
					}, x(N["backup-create"]?.text), 3)) : d("", !0)
				])]),
				p("section", qe, [
					t[38] ||= p("h2", {
						id: "tasks-reapers-heading",
						class: "admin-tasks__subtitle"
					}, "Reapers", -1),
					p("div", Je, [
						p("div", Ye, [p("h3", Xe, x(L("reap-scan-jobs").label), 1), h(a, { tone: "neutral" }, {
							default: w(() => [...t[34] ||= [m("sync", -1)]]),
							_: 1
						})]),
						p("p", Ze, x(L("reap-scan-jobs").description), 1),
						p("div", Qe, [h(o, {
							variant: "solid",
							size: "sm",
							loading: M["reap-scan-jobs"],
							onClick: wt
						}, {
							default: w(() => [...t[35] ||= [m(" Reap stale scan jobs ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["reap-scan-jobs"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("reap-scan-jobs")]),
							role: "status"
						}, x(N["reap-scan-jobs"]?.text), 3)) : d("", !0)
					]),
					p("div", $e, [
						p("div", et, [p("h3", tt, x(L("reap-transcode-jobs").label), 1), h(a, { tone: "neutral" }, {
							default: w(() => [...t[36] ||= [m("sync", -1)]]),
							_: 1
						})]),
						p("p", nt, x(L("reap-transcode-jobs").description), 1),
						p("div", rt, [h(o, {
							variant: "solid",
							size: "sm",
							loading: M["reap-transcode-jobs"],
							onClick: Tt
						}, {
							default: w(() => [...t[37] ||= [m(" Reap stale transcode jobs ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["reap-transcode-jobs"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("reap-transcode-jobs")]),
							role: "status"
						}, x(N["reap-transcode-jobs"]?.text), 3)) : d("", !0)
					])
				]),
				p("section", it, [t[42] ||= p("h2", {
					id: "tasks-plugins-heading",
					class: "admin-tasks__subtitle"
				}, "Plugins", -1), p("p", at, [
					t[40] ||= m(" Checking for and applying plugin updates lives on the ", -1),
					h(n, { to: { name: "admin-plugins" } }, {
						default: w(() => [...t[39] ||= [m("Plugins", -1)]]),
						_: 1
					}),
					t[41] ||= m(" page, which already owns the per-plugin update list and the catalogue pin. ", -1)
				])]),
				t[57] ||= p("section", {
					class: "admin-tasks__section",
					"aria-labelledby": "tasks-newsletter-heading"
				}, [p("h2", {
					id: "tasks-newsletter-heading",
					class: "admin-tasks__subtitle"
				}, "Newsletter"), p("p", { class: "admin-tasks__note" }, " There is no server endpoint that sends the newsletter immediately. It is sent on the server's weekly schedule, configured in the server settings. ")], -1),
				p("section", ot, [
					t[49] ||= p("h2", {
						id: "tasks-server-heading",
						class: "admin-tasks__subtitle"
					}, "Server", -1),
					p("div", st, [
						t[44] ||= p("div", { class: "admin-tasks__card-head" }, [p("h3", { class: "admin-tasks__card-title" }, "Update status")], -1),
						t[45] ||= p("p", { class: "admin-tasks__desc" }, " The version check also runs in the background on the server. This triggers one check now; the reply carries the status persisted at response time, so an async transport's own result lands on the next trigger or the background poll. ", -1),
						p("div", ct, [h(o, {
							variant: "solid",
							size: "sm",
							loading: M["update-status"],
							onClick: Dt
						}, {
							default: w(() => [...t[43] ||= [m(" Check for updates now ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						Q.value ? (v(), f("p", lt, " Running " + x(Q.value.currentVersion) + " · latest seen " + x(Q.value.latestVersion ?? "unknown"), 1)) : d("", !0),
						N["update-status"] ? (v(), f("p", {
							key: 1,
							class: _(["admin-tasks__feedback", $("update-status")]),
							role: "status"
						}, x(N["update-status"]?.text), 3)) : d("", !0)
					]),
					p("p", ut, [
						t[47] ||= m(" Restarting the server is on the ", -1),
						h(n, { to: { name: "admin-settings" } }, {
							default: w(() => [...t[46] ||= [m("Settings", -1)]]),
							_: 1
						}),
						t[48] ||= m(" page, which already owns that control. ", -1)
					])
				]),
				h(s, {
					"model-value": Z.value,
					title: "Clean up orphaned stats",
					size: "sm",
					"onUpdate:modelValue": t[4] ||= (e) => Z.value = !1
				}, {
					footer: w(() => [h(o, {
						variant: "ghost",
						size: "sm",
						onClick: t[3] ||= (e) => Z.value = !1
					}, {
						default: w(() => [...t[50] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(o, {
						variant: "danger",
						size: "sm",
						loading: M["cleanup-orphaned-stats"],
						onClick: Ct
					}, {
						default: w(() => [...t[51] ||= [m(" Delete orphaned stats ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					default: w(() => [t[52] ||= p("p", null, [m(" This permanently deletes statistics rows whose media item no longer exists. It cannot be undone. "), p("strong", null, "Continue?")], -1)]),
					_: 1
				}, 8, ["model-value"]),
				h(s, {
					"model-value": q.value,
					title: "Apply duplicate-path merge",
					size: "sm",
					"onUpdate:modelValue": t[6] ||= (e) => q.value = !1
				}, {
					footer: w(() => [h(o, {
						variant: "ghost",
						size: "sm",
						onClick: t[5] ||= (e) => q.value = !1
					}, {
						default: w(() => [...t[53] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(o, {
						variant: "danger",
						size: "sm",
						loading: M["dedupe-paths"],
						onClick: St
					}, {
						default: w(() => [...t[54] ||= [m(" Merge for real ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					default: w(() => [t[55] ||= p("p", null, [m(" Apply mode permanently merges duplicate media rows and deletes the losers. Run a dry run first if you have not. "), p("strong", null, "Continue?")], -1)]),
					_: 1
				}, 8, ["model-value"])
			]);
		};
	}
}), [["__scopeId", "data-v-487ca990"]]);
export { D as default };

//# sourceMappingURL=TasksPage-DGkUC1-9.js.map