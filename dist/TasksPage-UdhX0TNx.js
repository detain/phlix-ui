import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./maintenance-q_vV6U1S.js";
import { t as r } from "./backup-gSnQTFiQ.js";
import { t as i } from "./updates-DsFRbFJI.js";
import { t as ee } from "./useToastStore-Bu-iYU7r.js";
import { t as a } from "./Badge-C6LNO9Kk.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as s } from "./Modal-BU4hJGBA.js";
import { t as te } from "./Skeleton-B2Mt2L00.js";
import { t as ne } from "./EmptyState-BjOJ1k_A.js";
import { t as re } from "./PageHint-BlhPmafC.js";
import { t as c } from "./helpLinks-iarZuNmw.js";
import { n as l } from "./Icon-CIbfiPrs.js";
import { Fragment as ie, computed as u, createBlock as ae, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as oe, normalizeClass as _, onBeforeUnmount as se, onMounted as ce, openBlock as v, reactive as y, ref as b, renderList as le, resolveComponent as ue, toDisplayString as x, unref as S, vModelRadio as C, withCtx as w, withDirectives as T } from "vue";
// src/pages/admin/TasksPage.vue?vue&type=script&setup=true&lang.ts
var de = { class: "admin-tasks" }, fe = { class: "admin-tasks__head" }, pe = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-library-heading"
}, me = { class: "admin-tasks__card" }, he = { class: "admin-tasks__card-head" }, ge = { class: "admin-tasks__card-title" }, _e = { class: "admin-tasks__desc" }, ve = { class: "admin-tasks__modes" }, ye = { class: "admin-tasks__mode" }, be = { class: "admin-tasks__mode" }, xe = {
	key: 0,
	class: "admin-tasks__armed",
	role: "status"
}, Se = {
	key: 1,
	class: "admin-tasks__safe",
	role: "status"
}, Ce = { class: "admin-tasks__actions" }, we = { class: "admin-tasks__note" }, Te = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-stats-heading"
}, Ee = { class: "admin-tasks__card" }, De = { class: "admin-tasks__card-head" }, E = { class: "admin-tasks__card-title" }, Oe = { class: "admin-tasks__desc" }, ke = { class: "admin-tasks__actions" }, Ae = { class: "admin-tasks__card" }, je = { class: "admin-tasks__card-head" }, Me = { class: "admin-tasks__card-title" }, Ne = { class: "admin-tasks__desc" }, Pe = { class: "admin-tasks__actions" }, Fe = { class: "admin-tasks__card" }, Ie = {
	key: 0,
	class: "admin-tasks__skel"
}, Le = {
	key: 2,
	class: "admin-tasks__desc"
}, Re = {
	key: 3,
	class: "admin-tasks__table",
	"aria-label": "Recent maintenance jobs"
}, ze = { class: "admin-tasks__date" }, Be = { class: "admin-tasks__date" }, Ve = { class: "admin-tasks__err" }, He = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-backup-heading"
}, Ue = { class: "admin-tasks__card" }, We = { class: "admin-tasks__card-head" }, Ge = { class: "admin-tasks__actions" }, Ke = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-reapers-heading"
}, qe = { class: "admin-tasks__card" }, Je = { class: "admin-tasks__card-head" }, Ye = { class: "admin-tasks__card-title" }, Xe = { class: "admin-tasks__desc" }, Ze = { class: "admin-tasks__actions" }, Qe = { class: "admin-tasks__card" }, $e = { class: "admin-tasks__card-head" }, et = { class: "admin-tasks__card-title" }, tt = { class: "admin-tasks__desc" }, nt = { class: "admin-tasks__actions" }, rt = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-plugins-heading"
}, it = { class: "admin-tasks__note" }, at = {
	class: "admin-tasks__section",
	"aria-labelledby": "tasks-server-heading"
}, ot = { class: "admin-tasks__card" }, st = { class: "admin-tasks__actions" }, ct = {
	key: 0,
	class: "admin-tasks__desc"
}, lt = { class: "admin-tasks__note" }, D = 5e3, O = /*#__PURE__*/ l(/* @__PURE__ */ g({
	__name: "TasksPage",
	props: { client: {} },
	setup(l) {
		let g = l, O = oe("apiBase", ""), ut = u(() => typeof O == "string" ? O : O?.value ?? ""), k = g.client ?? new e({ baseUrl: ut.value }), A = new n(k), dt = new r(k), ft = new i(k), j = ee(), M = [
			"dedupe-paths",
			"storage-snapshot",
			"cleanup-orphaned-stats",
			"reap-scan-jobs",
			"reap-transcode-jobs",
			"backup-create",
			"update-status"
		], N = y(Object.fromEntries(M.map((e) => [e, !1]))), P = y(Object.fromEntries(M.map((e) => [e, null])));
		function F(e, t) {
			P[e] = {
				tone: "success",
				text: t
			}, j.success(t);
		}
		function pt(e, t) {
			P[e] = {
				tone: "warning",
				text: t
			}, j.info(t);
		}
		function I(e, n, r) {
			let i = t(n, r);
			P[e] = {
				tone: "error",
				text: i
			}, j.error(i);
		}
		let mt = {
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
		}, L = b([]);
		function R(e) {
			return L.value.find((t) => t.task === e) ?? mt[e];
		}
		async function ht() {
			try {
				L.value = await A.listTasks();
			} catch {
				L.value = [];
			}
		}
		let z = b([]), B = b(!0), V = b(null), H = null;
		function gt() {
			return z.value.some((e) => e.status === "queued" || e.status === "running");
		}
		function U() {
			H !== null && (clearInterval(H), H = null);
		}
		function W() {
			gt() ? H === null && (H = setInterval(() => {
				G();
			}, D)) : U();
		}
		async function G() {
			V.value = null;
			try {
				z.value = await A.listJobs({ limit: 20 });
			} catch (e) {
				V.value = t(e, "Failed to load maintenance jobs.");
			} finally {
				B.value = !1, W();
			}
		}
		function _t(e) {
			e && (z.value = [e, ...z.value.filter((t) => t.id !== e.id)], W());
		}
		function vt(e, t) {
			let n = e.job?.id ?? "unknown";
			return e.created ? {
				fresh: !0,
				text: `${t}: queued a new run (job ${n}).`
			} : {
				fresh: !1,
				text: `${t}: already running — showing the existing job (${n}).`
			};
		}
		function K(e, t, n) {
			let r = vt(t, n);
			_t(t.job), r.fresh ? F(e, r.text) : pt(e, r.text);
		}
		let q = b("preview"), J = b(!1), Y = u(() => q.value === "apply");
		async function X() {
			N["dedupe-paths"] = !0;
			let e = Y.value;
			try {
				K("dedupe-paths", await A.dedupePaths({ apply: e }), e ? "Merge duplicate paths (APPLY)" : "Merge duplicate paths (dry run)");
			} catch (e) {
				I("dedupe-paths", e, "Failed to start the duplicate-path merge.");
			} finally {
				N["dedupe-paths"] = !1;
			}
		}
		function yt() {
			Y.value ? J.value = !0 : X();
		}
		function bt() {
			J.value = !1, X();
		}
		async function xt() {
			N["storage-snapshot"] = !0;
			try {
				K("storage-snapshot", await A.storageSnapshot(), "Storage snapshot");
			} catch (e) {
				I("storage-snapshot", e, "Failed to start the storage snapshot.");
			} finally {
				N["storage-snapshot"] = !1;
			}
		}
		let Z = b(!1);
		async function St() {
			Z.value = !1, N["cleanup-orphaned-stats"] = !0;
			try {
				let { data: e } = await A.cleanupOrphanedStats(), t = e.truncated ? ` The per-table cap of ${e.limit} was reached — run it again to continue.` : "";
				F("cleanup-orphaned-stats", `Deleted ${e.total} orphaned statistics rows.${t}`);
			} catch (e) {
				I("cleanup-orphaned-stats", e, "Failed to clean up orphaned statistics.");
			} finally {
				N["cleanup-orphaned-stats"] = !1;
			}
		}
		async function Ct() {
			N["reap-scan-jobs"] = !0;
			try {
				let { data: e } = await A.reapScanJobs(), t = e.floor_applied ? ` The requested age of ${e.requested_older_than_seconds}s was raised to the ${e.older_than_seconds}s minimum.` : "";
				F("reap-scan-jobs", `Reaped ${e.reaped} stale scan jobs.${t}`);
			} catch (e) {
				I("reap-scan-jobs", e, "Failed to reap stale scan jobs.");
			} finally {
				N["reap-scan-jobs"] = !1;
			}
		}
		async function wt() {
			N["reap-transcode-jobs"] = !0;
			try {
				let { data: e } = await A.reapTranscodeJobs();
				F("reap-transcode-jobs", `Reaped ${e.reaped} stale transcode jobs.`);
			} catch (e) {
				I("reap-transcode-jobs", e, "Failed to reap stale transcode jobs.");
			} finally {
				N["reap-transcode-jobs"] = !1;
			}
		}
		async function Tt() {
			N["backup-create"] = !0;
			try {
				F("backup-create", (await dt.create({})).message || "Backup created.");
			} catch (e) {
				I("backup-create", e, "Failed to create a backup.");
			} finally {
				N["backup-create"] = !1;
			}
		}
		let Q = b(null);
		async function Et() {
			N["update-status"] = !0;
			try {
				let e = await ft.check();
				Q.value = e, F("update-status", e.updateAvailable ? `Check dispatched. Update available: ${e.latestVersion ?? "unknown"} (running ${e.currentVersion}).` : `Check dispatched. Up to date on ${e.currentVersion}.`);
			} catch (e) {
				I("update-status", e, "Failed to trigger the update check.");
			} finally {
				N["update-status"] = !1;
			}
		}
		function $(e) {
			let t = P[e];
			return t === null ? "" : `admin-tasks__feedback--${t.tone}`;
		}
		function Dt(e) {
			return e === "completed" ? "success" : e === "failed" ? "error" : e === "running" ? "info" : "neutral";
		}
		return ce(() => {
			ht(), G();
		}), se(U), (e, t) => {
			let n = ue("RouterLink");
			return v(), f("div", de, [
				p("header", fe, [t[8] ||= p("h1", { class: "admin-tasks__title" }, "Tasks", -1), h(o, {
					variant: "ghost",
					size: "sm",
					"left-icon": "refresh",
					loading: B.value,
					onClick: G
				}, {
					default: w(() => [...t[7] ||= [m(" Refresh jobs ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				h(re, {
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
				p("section", pe, [
					t[18] ||= p("h2", {
						id: "tasks-library-heading",
						class: "admin-tasks__subtitle"
					}, "Library", -1),
					p("div", me, [
						p("div", he, [
							p("h3", ge, x(R("dedupe-paths").label), 1),
							h(a, { tone: "info" }, {
								default: w(() => [...t[10] ||= [m("queued", -1)]]),
								_: 1
							}),
							h(a, { tone: "warning" }, {
								default: w(() => [...t[11] ||= [m("destructive", -1)]]),
								_: 1
							})
						]),
						p("p", _e, x(R("dedupe-paths").description), 1),
						p("fieldset", ve, [
							t[14] ||= p("legend", { class: "admin-tasks__legend" }, "Mode", -1),
							p("label", ye, [T(p("input", {
								"onUpdate:modelValue": t[0] ||= (e) => q.value = e,
								type: "radio",
								name: "dedupe-mode",
								value: "preview"
							}, null, 512), [[C, q.value]]), t[12] ||= p("span", null, "Dry run — report what would be merged, change nothing", -1)]),
							p("label", be, [T(p("input", {
								"onUpdate:modelValue": t[1] ||= (e) => q.value = e,
								type: "radio",
								name: "dedupe-mode",
								value: "apply"
							}, null, 512), [[C, q.value]]), t[13] ||= p("span", null, "Apply — permanently merge the duplicate rows", -1)])
						]),
						Y.value ? (v(), f("p", xe, " Apply mode is armed: this run will delete duplicate media rows. ")) : (v(), f("p", Se, " Dry-run mode: nothing will be changed. ")),
						p("div", Ce, [h(o, {
							variant: Y.value ? "danger" : "solid",
							size: "sm",
							loading: N["dedupe-paths"],
							onClick: yt
						}, {
							default: w(() => [m(x(Y.value ? "Merge duplicate paths (apply)" : "Merge duplicate paths (dry run)"), 1)]),
							_: 1
						}, 8, ["variant", "loading"])]),
						P["dedupe-paths"] ? (v(), f("p", {
							key: 2,
							class: _(["admin-tasks__feedback", $("dedupe-paths")]),
							role: "status"
						}, x(P["dedupe-paths"]?.text), 3)) : d("", !0)
					]),
					p("p", we, [
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
				p("section", Te, [
					t[27] ||= p("h2", {
						id: "tasks-stats-heading",
						class: "admin-tasks__subtitle"
					}, "Stats & health", -1),
					p("div", Ee, [
						p("div", De, [p("h3", E, x(R("storage-snapshot").label), 1), h(a, { tone: "info" }, {
							default: w(() => [...t[19] ||= [m("queued", -1)]]),
							_: 1
						})]),
						p("p", Oe, x(R("storage-snapshot").description), 1),
						p("div", ke, [h(o, {
							variant: "solid",
							size: "sm",
							loading: N["storage-snapshot"],
							onClick: xt
						}, {
							default: w(() => [...t[20] ||= [m(" Take storage snapshot ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						P["storage-snapshot"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("storage-snapshot")]),
							role: "status"
						}, x(P["storage-snapshot"]?.text), 3)) : d("", !0)
					]),
					p("div", Ae, [
						p("div", je, [
							p("h3", Me, x(R("cleanup-orphaned-stats").label), 1),
							h(a, { tone: "neutral" }, {
								default: w(() => [...t[21] ||= [m("sync", -1)]]),
								_: 1
							}),
							h(a, { tone: "warning" }, {
								default: w(() => [...t[22] ||= [m("destructive", -1)]]),
								_: 1
							})
						]),
						p("p", Ne, x(R("cleanup-orphaned-stats").description), 1),
						p("div", Pe, [h(o, {
							variant: "danger",
							size: "sm",
							loading: N["cleanup-orphaned-stats"],
							onClick: t[2] ||= (e) => Z.value = !0
						}, {
							default: w(() => [...t[23] ||= [m(" Clean up orphaned stats ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						P["cleanup-orphaned-stats"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("cleanup-orphaned-stats")]),
							role: "status"
						}, x(P["cleanup-orphaned-stats"]?.text), 3)) : d("", !0)
					]),
					p("div", Fe, [t[26] ||= p("div", { class: "admin-tasks__card-head" }, [p("h3", { class: "admin-tasks__card-title" }, "Recent jobs")], -1), B.value ? (v(), f("div", Ie, [h(te, {
						variant: "text",
						lines: 3
					})])) : V.value ? (v(), ae(ne, {
						key: 1,
						icon: "alert",
						title: "Couldn’t load maintenance jobs",
						description: V.value
					}, {
						actions: w(() => [h(o, {
							variant: "solid",
							size: "sm",
							"left-icon": "rewind",
							onClick: G
						}, {
							default: w(() => [...t[24] ||= [m("Retry jobs", -1)]]),
							_: 1
						})]),
						_: 1
					}, 8, ["description"])) : z.value.length === 0 ? (v(), f("p", Le, "No maintenance jobs yet.")) : (v(), f("table", Re, [t[25] ||= p("thead", null, [p("tr", null, [
						p("th", { scope: "col" }, "Task"),
						p("th", { scope: "col" }, "Status"),
						p("th", { scope: "col" }, "Queued"),
						p("th", { scope: "col" }, "Finished"),
						p("th", { scope: "col" }, "Error")
					])], -1), p("tbody", null, [(v(!0), f(ie, null, le(z.value, (e) => (v(), f("tr", { key: e.id }, [
						p("td", null, x(e.task), 1),
						p("td", null, [h(a, { tone: Dt(e.status) }, {
							default: w(() => [m(x(e.status), 1)]),
							_: 2
						}, 1032, ["tone"])]),
						p("td", ze, x(e.queued_at ?? "—"), 1),
						p("td", Be, x(e.completed_at ?? "—"), 1),
						p("td", Ve, x(e.error ?? ""), 1)
					]))), 128))])]))])
				]),
				p("section", He, [t[33] ||= p("h2", {
					id: "tasks-backup-heading",
					class: "admin-tasks__subtitle"
				}, "Backups", -1), p("div", Ue, [
					p("div", We, [t[29] ||= p("h3", { class: "admin-tasks__card-title" }, "Create a backup now", -1), h(a, { tone: "neutral" }, {
						default: w(() => [...t[28] ||= [m("sync", -1)]]),
						_: 1
					})]),
					t[32] ||= p("p", { class: "admin-tasks__desc" }, " Snapshot the database and settings immediately, outside the automatic schedule. ", -1),
					p("div", Ge, [h(o, {
						variant: "solid",
						size: "sm",
						loading: N["backup-create"],
						onClick: Tt
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
					P["backup-create"] ? (v(), f("p", {
						key: 0,
						class: _(["admin-tasks__feedback", $("backup-create")]),
						role: "status"
					}, x(P["backup-create"]?.text), 3)) : d("", !0)
				])]),
				p("section", Ke, [
					t[38] ||= p("h2", {
						id: "tasks-reapers-heading",
						class: "admin-tasks__subtitle"
					}, "Reapers", -1),
					p("div", qe, [
						p("div", Je, [p("h3", Ye, x(R("reap-scan-jobs").label), 1), h(a, { tone: "neutral" }, {
							default: w(() => [...t[34] ||= [m("sync", -1)]]),
							_: 1
						})]),
						p("p", Xe, x(R("reap-scan-jobs").description), 1),
						p("div", Ze, [h(o, {
							variant: "solid",
							size: "sm",
							loading: N["reap-scan-jobs"],
							onClick: Ct
						}, {
							default: w(() => [...t[35] ||= [m(" Reap stale scan jobs ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						P["reap-scan-jobs"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("reap-scan-jobs")]),
							role: "status"
						}, x(P["reap-scan-jobs"]?.text), 3)) : d("", !0)
					]),
					p("div", Qe, [
						p("div", $e, [p("h3", et, x(R("reap-transcode-jobs").label), 1), h(a, { tone: "neutral" }, {
							default: w(() => [...t[36] ||= [m("sync", -1)]]),
							_: 1
						})]),
						p("p", tt, x(R("reap-transcode-jobs").description), 1),
						p("div", nt, [h(o, {
							variant: "solid",
							size: "sm",
							loading: N["reap-transcode-jobs"],
							onClick: wt
						}, {
							default: w(() => [...t[37] ||= [m(" Reap stale transcode jobs ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						P["reap-transcode-jobs"] ? (v(), f("p", {
							key: 0,
							class: _(["admin-tasks__feedback", $("reap-transcode-jobs")]),
							role: "status"
						}, x(P["reap-transcode-jobs"]?.text), 3)) : d("", !0)
					])
				]),
				p("section", rt, [t[42] ||= p("h2", {
					id: "tasks-plugins-heading",
					class: "admin-tasks__subtitle"
				}, "Plugins", -1), p("p", it, [
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
				p("section", at, [
					t[49] ||= p("h2", {
						id: "tasks-server-heading",
						class: "admin-tasks__subtitle"
					}, "Server", -1),
					p("div", ot, [
						t[44] ||= p("div", { class: "admin-tasks__card-head" }, [p("h3", { class: "admin-tasks__card-title" }, "Update status")], -1),
						t[45] ||= p("p", { class: "admin-tasks__desc" }, " The version check also runs in the background on the server. This triggers one check now; the reply carries the status persisted at response time, so an async transport's own result lands on the next trigger or the background poll. ", -1),
						p("div", st, [h(o, {
							variant: "solid",
							size: "sm",
							loading: N["update-status"],
							onClick: Et
						}, {
							default: w(() => [...t[43] ||= [m(" Check for updates now ", -1)]]),
							_: 1
						}, 8, ["loading"])]),
						Q.value ? (v(), f("p", ct, " Running " + x(Q.value.currentVersion) + " · latest seen " + x(Q.value.latestVersion ?? "unknown"), 1)) : d("", !0),
						P["update-status"] ? (v(), f("p", {
							key: 1,
							class: _(["admin-tasks__feedback", $("update-status")]),
							role: "status"
						}, x(P["update-status"]?.text), 3)) : d("", !0)
					]),
					p("p", lt, [
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
						loading: N["cleanup-orphaned-stats"],
						onClick: St
					}, {
						default: w(() => [...t[51] ||= [m(" Delete orphaned stats ", -1)]]),
						_: 1
					}, 8, ["loading"])]),
					default: w(() => [t[52] ||= p("p", null, [m(" This permanently deletes statistics rows whose media item no longer exists. It cannot be undone. "), p("strong", null, "Continue?")], -1)]),
					_: 1
				}, 8, ["model-value"]),
				h(s, {
					"model-value": J.value,
					title: "Apply duplicate-path merge",
					size: "sm",
					"onUpdate:modelValue": t[6] ||= (e) => J.value = !1
				}, {
					footer: w(() => [h(o, {
						variant: "ghost",
						size: "sm",
						onClick: t[5] ||= (e) => J.value = !1
					}, {
						default: w(() => [...t[53] ||= [m("Cancel", -1)]]),
						_: 1
					}), h(o, {
						variant: "danger",
						size: "sm",
						loading: N["dedupe-paths"],
						onClick: bt
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
}), [["__scopeId", "data-v-46b9543b"]]);
export { O as default };

//# sourceMappingURL=TasksPage-UdhX0TNx.js.map