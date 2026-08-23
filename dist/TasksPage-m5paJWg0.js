import { n as e } from "./Icon-CkTBN_k5.js";
import { l as t, p as n, t as r } from "./client-COHWZ2KC.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Badge-D1_MN41Y.js";
import { t as s } from "./Modal-Cfz25d3h.js";
import { t as ee } from "./Skeleton-C3OpJbf1.js";
import { t as te } from "./EmptyState-CwWtkhEJ.js";
import { t as ne } from "./PageHint-3dL7qb5N.js";
import { t as re } from "./backup-IdY_vzc2.js";
import { t as ie } from "./maintenance-CETCLHzL.js";
import { t as ae } from "./updates-C0lkhPWc.js";
import { t as c } from "./helpLinks-ya0IGJSe.js";
import { Fragment as oe, computed as l, createBlock as se, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ce, normalizeClass as g, onBeforeUnmount as le, onMounted as ue, openBlock as _, reactive as v, ref as y, renderList as de, resolveComponent as fe, toDisplayString as b, unref as x, vModelRadio as S, withCtx as C, withDirectives as w } from "vue";
//#region src/pages/admin/TasksPage.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "admin-tasks" }, me = { class: "admin-tasks__head" }, he = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-library-heading"
}, ge = { class: "admin-tasks__card" }, _e = { class: "admin-tasks__card-head" }, ve = { class: "admin-tasks__card-title" }, ye = { class: "admin-tasks__desc" }, be = { class: "admin-tasks__modes" }, xe = { class: "admin-tasks__mode" }, Se = { class: "admin-tasks__mode" }, Ce = {
	key: 0,
	class: "admin-tasks__armed",
	role: "status"
}, we = {
	key: 1,
	class: "admin-tasks__safe",
	role: "status"
}, Te = { class: "admin-tasks__actions" }, Ee = { class: "admin-tasks__note" }, De = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-stats-heading"
}, T = { class: "admin-tasks__card" }, E = { class: "admin-tasks__card-head" }, Oe = { class: "admin-tasks__card-title" }, ke = { class: "admin-tasks__desc" }, Ae = { class: "admin-tasks__actions" }, je = { class: "admin-tasks__card" }, Me = { class: "admin-tasks__card-head" }, Ne = { class: "admin-tasks__card-title" }, Pe = { class: "admin-tasks__desc" }, Fe = { class: "admin-tasks__actions" }, Ie = { class: "admin-tasks__card" }, Le = {
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
}, ut = { class: "admin-tasks__note" }, dt = 5e3, D = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "TasksPage",
	props: { client: {} },
	setup(e) {
		let h = e, D = ce("apiBase", ""), ft = l(() => typeof D == "string" ? D : D?.value ?? ""), O = h.client ?? new r({
			baseUrl: ft.value,
			tokenStore: new t()
		}), k = new ie(O), pt = new re(O), mt = new ae(O), A = i(), j = [
			"dedupe-paths",
			"storage-snapshot",
			"cleanup-orphaned-stats",
			"reap-scan-jobs",
			"reap-transcode-jobs",
			"backup-create",
			"update-status"
		], M = v(Object.fromEntries(j.map((e) => [e, !1]))), N = v(Object.fromEntries(j.map((e) => [e, null])));
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
		}, I = y([]);
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
		let R = y([]), z = y(!0), B = y(null), V = null;
		function vt() {
			return R.value.some((e) => e.status === "queued" || e.status === "running");
		}
		function H() {
			V !== null && (clearInterval(V), V = null);
		}
		function U() {
			if (vt()) {
				V === null && (V = setInterval(() => {
					W();
				}, dt));
				return;
			}
			H();
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
		let K = y("preview"), q = y(!1), J = l(() => K.value === "apply");
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
			if (J.value) {
				q.value = !0;
				return;
			}
			Y();
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
		let Z = y(!1);
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
		let Q = y(null);
		async function Dt() {
			M["update-status"] = !0;
			try {
				let e = await mt.getStatus();
				Q.value = e, P("update-status", e.updateAvailable ? `Update available: ${e.latestVersion ?? "unknown"} (running ${e.currentVersion}).` : `Up to date on ${e.currentVersion}.`);
			} catch (e) {
				F("update-status", e, "Failed to read the update status.");
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
		return ue(() => {
			_t(), W();
		}), le(H), (e, t) => {
			let n = fe("RouterLink");
			return _(), d("div", pe, [
				f("header", me, [t[8] ||= f("h1", { class: "admin-tasks__title" }, "Tasks", -1), m(a, {
					variant: "ghost",
					size: "sm",
					"left-icon": "refresh",
					loading: z.value,
					onClick: W
				}, {
					default: C(() => [...t[7] ||= [p(" Refresh jobs ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				m(ne, {
					links: x(c).tasks.links,
					details: x(c).tasks.details
				}, {
					default: C(() => [...t[9] ||= [
						p(" Run the server's maintenance work by hand. ", -1),
						f("strong", null, "Sync", -1),
						p(" tasks finish before the button stops spinning and report their numbers here; ", -1),
						f("strong", null, "queued", -1),
						p(" tasks are handed to the maintenance worker and appear in ", -1),
						f("strong", null, "Recent jobs", -1),
						p(" below. Firing a queued task that is already running does not start a second one. ", -1)
					]]),
					_: 1
				}, 8, ["links", "details"]),
				f("section", he, [
					t[18] ||= f("h2", {
						id: "tasks-library-heading",
						class: "admin-tasks__subtitle"
					}, "Library", -1),
					f("div", ge, [
						f("div", _e, [
							f("h3", ve, b(L("dedupe-paths").label), 1),
							m(o, { tone: "info" }, {
								default: C(() => [...t[10] ||= [p("queued", -1)]]),
								_: 1
							}),
							m(o, { tone: "warning" }, {
								default: C(() => [...t[11] ||= [p("destructive", -1)]]),
								_: 1
							})
						]),
						f("p", ye, b(L("dedupe-paths").description), 1),
						f("fieldset", be, [
							t[14] ||= f("legend", { class: "admin-tasks__legend" }, "Mode", -1),
							f("label", xe, [w(f("input", {
								"onUpdate:modelValue": t[0] ||= (e) => K.value = e,
								type: "radio",
								name: "dedupe-mode",
								value: "preview"
							}, null, 512), [[S, K.value]]), t[12] ||= f("span", null, "Dry run — report what would be merged, change nothing", -1)]),
							f("label", Se, [w(f("input", {
								"onUpdate:modelValue": t[1] ||= (e) => K.value = e,
								type: "radio",
								name: "dedupe-mode",
								value: "apply"
							}, null, 512), [[S, K.value]]), t[13] ||= f("span", null, "Apply — permanently merge the duplicate rows", -1)])
						]),
						J.value ? (_(), d("p", Ce, " Apply mode is armed: this run will delete duplicate media rows. ")) : (_(), d("p", we, " Dry-run mode: nothing will be changed. ")),
						f("div", Te, [m(a, {
							variant: J.value ? "danger" : "solid",
							size: "sm",
							loading: M["dedupe-paths"],
							onClick: xt
						}, {
							default: C(() => [p(b(J.value ? "Merge duplicate paths (apply)" : "Merge duplicate paths (dry run)"), 1)]),
							_: 1
						}, 8, ["variant", "loading"])]),
						N["dedupe-paths"] ? (_(), d("p", {
							key: 2,
							class: g(["admin-tasks__feedback", $("dedupe-paths")]),
							role: "status"
						}, b(N["dedupe-paths"]?.text), 3)) : u("", !0)
					]),
					f("p", Ee, [
						t[16] ||= p(" There is no server endpoint that scans every library at once. Scans are started per library on the ", -1),
						m(n, { to: { name: "admin-libraries" } }, {
							default: C(() => [...t[15] ||= [p("Libraries", -1)]]),
							_: 1
						}),
						t[17] ||= p(" page. ", -1)
					])
				]),
				t[56] ||= f("section", {
					class: "admin-tasks__section",
					"aria-labelledby": "tasks-recommendations-heading"
				}, [f("h2", {
					id: "tasks-recommendations-heading",
					class: "admin-tasks__subtitle"
				}, "Recommendations"), f("p", { class: "admin-tasks__note" }, " There is no server endpoint that recomputes similarity across every item. Similarity is computed per item in the background as media is scanned, and recommendations are derived from those scores automatically. ")], -1),
				f("section", De, [
					t[27] ||= f("h2", {
						id: "tasks-stats-heading",
						class: "admin-tasks__subtitle"
					}, "Stats & health", -1),
					f("div", T, [
						f("div", E, [f("h3", Oe, b(L("storage-snapshot").label), 1), m(o, { tone: "info" }, {
							default: C(() => [...t[19] ||= [p("queued", -1)]]),
							_: 1
						})]),
						f("p", ke, b(L("storage-snapshot").description), 1),
						f("div", Ae, [m(a, {
							variant: "solid",
							size: "sm",
							loading: M["storage-snapshot"],
							onClick: X
						}, {
							default: C(() => [...t[20] ||= [p(" Take storage snapshot ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["storage-snapshot"] ? (_(), d("p", {
							key: 0,
							class: g(["admin-tasks__feedback", $("storage-snapshot")]),
							role: "status"
						}, b(N["storage-snapshot"]?.text), 3)) : u("", !0)
					]),
					f("div", je, [
						f("div", Me, [
							f("h3", Ne, b(L("cleanup-orphaned-stats").label), 1),
							m(o, { tone: "neutral" }, {
								default: C(() => [...t[21] ||= [p("sync", -1)]]),
								_: 1
							}),
							m(o, { tone: "warning" }, {
								default: C(() => [...t[22] ||= [p("destructive", -1)]]),
								_: 1
							})
						]),
						f("p", Pe, b(L("cleanup-orphaned-stats").description), 1),
						f("div", Fe, [m(a, {
							variant: "danger",
							size: "sm",
							loading: M["cleanup-orphaned-stats"],
							onClick: t[2] ||= (e) => Z.value = !0
						}, {
							default: C(() => [...t[23] ||= [p(" Clean up orphaned stats ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["cleanup-orphaned-stats"] ? (_(), d("p", {
							key: 0,
							class: g(["admin-tasks__feedback", $("cleanup-orphaned-stats")]),
							role: "status"
						}, b(N["cleanup-orphaned-stats"]?.text), 3)) : u("", !0)
					]),
					f("div", Ie, [t[26] ||= f("div", { class: "admin-tasks__card-head" }, [f("h3", { class: "admin-tasks__card-title" }, "Recent jobs")], -1), z.value ? (_(), d("div", Le, [m(ee, {
						variant: "text",
						lines: 3
					})])) : B.value ? (_(), se(te, {
						key: 1,
						icon: "alert",
						title: "Couldn't load maintenance jobs",
						description: B.value
					}, {
						actions: C(() => [m(a, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: W
						}, {
							default: C(() => [...t[24] ||= [p("Retry jobs", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : R.value.length === 0 ? (_(), d("p", Re, "No maintenance jobs yet.")) : (_(), d("table", ze, [t[25] ||= f("thead", null, [f("tr", null, [
						f("th", { scope: "col" }, "Task"),
						f("th", { scope: "col" }, "Status"),
						f("th", { scope: "col" }, "Queued"),
						f("th", { scope: "col" }, "Finished"),
						f("th", { scope: "col" }, "Error")
					])], -1), f("tbody", null, [(_(!0), d(oe, null, de(R.value, (e) => (_(), d("tr", { key: e.id }, [
						f("td", null, b(e.task), 1),
						f("td", null, [m(o, { tone: Ot(e.status) }, {
							default: C(() => [p(b(e.status), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						f("td", Be, b(e.queued_at ?? "—"), 1),
						f("td", Ve, b(e.completed_at ?? "—"), 1),
						f("td", He, b(e.error ?? ""), 1)
					]))), 128))])]))])
				]),
				f("section", Ue, [t[33] ||= f("h2", {
					id: "tasks-backup-heading",
					class: "admin-tasks__subtitle"
				}, "Backups", -1), f("div", We, [
					f("div", Ge, [t[29] ||= f("h3", { class: "admin-tasks__card-title" }, "Create a backup now", -1), m(o, { tone: "neutral" }, {
						default: C(() => [...t[28] ||= [p("sync", -1)]]),
						_: 1
					})]),
					t[32] ||= f("p", { class: "admin-tasks__desc" }, " Snapshot the database and settings immediately, outside the automatic schedule. ", -1),
					f("div", Ke, [m(a, {
						variant: "solid",
						size: "sm",
						loading: M["backup-create"],
						onClick: Et
					}, {
						default: C(() => [...t[30] ||= [p(" Create backup now ", -1)]]),
						_: 1
					}, 8, ["loading"]), m(n, {
						to: { name: "admin-backup" },
						class: "admin-tasks__link"
					}, {
						default: C(() => [...t[31] ||= [p(" Go to Backup ", -1)]]),
						_: 1
					})]),
					N["backup-create"] ? (_(), d("p", {
						key: 0,
						class: g(["admin-tasks__feedback", $("backup-create")]),
						role: "status"
					}, b(N["backup-create"]?.text), 3)) : u("", !0)
				])]),
				f("section", qe, [
					t[38] ||= f("h2", {
						id: "tasks-reapers-heading",
						class: "admin-tasks__subtitle"
					}, "Reapers", -1),
					f("div", Je, [
						f("div", Ye, [f("h3", Xe, b(L("reap-scan-jobs").label), 1), m(o, { tone: "neutral" }, {
							default: C(() => [...t[34] ||= [p("sync", -1)]]),
							_: 1
						})]),
						f("p", Ze, b(L("reap-scan-jobs").description), 1),
						f("div", Qe, [m(a, {
							variant: "solid",
							size: "sm",
							loading: M["reap-scan-jobs"],
							onClick: wt
						}, {
							default: C(() => [...t[35] ||= [p(" Reap stale scan jobs ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["reap-scan-jobs"] ? (_(), d("p", {
							key: 0,
							class: g(["admin-tasks__feedback", $("reap-scan-jobs")]),
							role: "status"
						}, b(N["reap-scan-jobs"]?.text), 3)) : u("", !0)
					]),
					f("div", $e, [
						f("div", et, [f("h3", tt, b(L("reap-transcode-jobs").label), 1), m(o, { tone: "neutral" }, {
							default: C(() => [...t[36] ||= [p("sync", -1)]]),
							_: 1
						})]),
						f("p", nt, b(L("reap-transcode-jobs").description), 1),
						f("div", rt, [m(a, {
							variant: "solid",
							size: "sm",
							loading: M["reap-transcode-jobs"],
							onClick: Tt
						}, {
							default: C(() => [...t[37] ||= [p(" Reap stale transcode jobs ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						N["reap-transcode-jobs"] ? (_(), d("p", {
							key: 0,
							class: g(["admin-tasks__feedback", $("reap-transcode-jobs")]),
							role: "status"
						}, b(N["reap-transcode-jobs"]?.text), 3)) : u("", !0)
					])
				]),
				f("section", it, [t[42] ||= f("h2", {
					id: "tasks-plugins-heading",
					class: "admin-tasks__subtitle"
				}, "Plugins", -1), f("p", at, [
					t[40] ||= p(" Checking for and applying plugin updates lives on the ", -1),
					m(n, { to: { name: "admin-plugins" } }, {
						default: C(() => [...t[39] ||= [p("Plugins", -1)]]),
						_: 1
					}),
					t[41] ||= p(" page, which already owns the per-plugin update list and the catalogue pin. ", -1)
				])]),
				t[57] ||= f("section", {
					class: "admin-tasks__section",
					"aria-labelledby": "tasks-newsletter-heading"
				}, [f("h2", {
					id: "tasks-newsletter-heading",
					class: "admin-tasks__subtitle"
				}, "Newsletter"), f("p", { class: "admin-tasks__note" }, " There is no server endpoint that sends the newsletter immediately. It is sent on the server's weekly schedule, configured in the server settings. ")], -1),
				f("section", ot, [
					t[49] ||= f("h2", {
						id: "tasks-server-heading",
						class: "admin-tasks__subtitle"
					}, "Server", -1),
					f("div", st, [
						t[44] ||= f("div", { class: "admin-tasks__card-head" }, [f("h3", { class: "admin-tasks__card-title" }, "Update status")], -1),
						t[45] ||= f("p", { class: "admin-tasks__desc" }, " The version check runs in the background on the server; there is no endpoint that forces one. This refetches the result of the last check. ", -1),
						f("div", ct, [m(a, {
							variant: "solid",
							size: "sm",
							loading: M["update-status"],
							onClick: Dt
						}, {
							default: C(() => [...t[43] ||= [p(" Check update status ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						Q.value ? (_(), d("p", lt, " Running " + b(Q.value.currentVersion) + " · latest seen " + b(Q.value.latestVersion ?? "unknown"), 1)) : u("", !0),
						N["update-status"] ? (_(), d("p", {
							key: 1,
							class: g(["admin-tasks__feedback", $("update-status")]),
							role: "status"
						}, b(N["update-status"]?.text), 3)) : u("", !0)
					]),
					f("p", ut, [
						t[47] ||= p(" Restarting the server is on the ", -1),
						m(n, { to: { name: "admin-settings" } }, {
							default: C(() => [...t[46] ||= [p("Settings", -1)]]),
							_: 1
						}),
						t[48] ||= p(" page, which already owns that control. ", -1)
					])
				]),
				m(s, {
					"model-value": Z.value,
					title: "Clean up orphaned stats",
					size: "sm",
					"onUpdate:modelValue": t[4] ||= (e) => Z.value = !1
				}, {
					footer: C(() => [m(a, {
						variant: "ghost",
						size: "sm",
						onClick: t[3] ||= (e) => Z.value = !1
					}, {
						default: C(() => [...t[50] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(a, {
						variant: "danger",
						size: "sm",
						loading: M["cleanup-orphaned-stats"],
						onClick: Ct
					}, {
						default: C(() => [...t[51] ||= [p(" Delete orphaned stats ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					default: C(() => [t[52] ||= f("p", null, [p(" This permanently deletes statistics rows whose media item no longer exists. It cannot be undone. "), f("strong", null, "Continue?")], -1)]),
					_: 1
				}, 8, ["model-value"]),
				m(s, {
					"model-value": q.value,
					title: "Apply duplicate-path merge",
					size: "sm",
					"onUpdate:modelValue": t[6] ||= (e) => q.value = !1
				}, {
					footer: C(() => [m(a, {
						variant: "ghost",
						size: "sm",
						onClick: t[5] ||= (e) => q.value = !1
					}, {
						default: C(() => [...t[53] ||= [p("Cancel", -1)]]),
						_: 1
					}), m(a, {
						variant: "danger",
						size: "sm",
						loading: M["dedupe-paths"],
						onClick: St
					}, {
						default: C(() => [...t[54] ||= [p(" Merge for real ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					default: C(() => [t[55] ||= f("p", null, [p(" Apply mode permanently merges duplicate media rows and deletes the losers. Run a dry run first if you have not. "), f("strong", null, "Continue?")], -1)]),
					_: 1
				}, 8, ["model-value"])
			]);
		};
	}
}), [["__scopeId", "data-v-a62b4c82"]]);
//#endregion
export { D as default };

//# sourceMappingURL=TasksPage-m5paJWg0.js.map