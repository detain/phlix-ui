import { n as e } from "./Icon-CkTBN_k5.js";
import { a as t } from "./plural-DMM7pLFA.js";
import { l as n, p as r, t as i } from "./client-COHWZ2KC.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-Cw8Wl4QR.js";
import { t as o } from "./Badge-D1_MN41Y.js";
import { t as te } from "./Switch-H74PI5Oy.js";
import { t as ne } from "./Select-R1FOrNRB.js";
import { t as s } from "./Modal-Cfz25d3h.js";
import { t as re } from "./Skeleton-C3OpJbf1.js";
import { t as ie } from "./EmptyState-CwWtkhEJ.js";
import { t as ae } from "./PageHint-3dL7qb5N.js";
import { t as oe } from "./Menu-CcVQWgwT.js";
import { n as se, t as ce } from "./metadata-sources-BJ3Q2NZ0.js";
import { n as c, t as le } from "./libraries-BESAWRyW.js";
import { t as ue } from "./helpLinks-ya0IGJSe.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createStaticVNode as de, createTextVNode as h, createVNode as g, defineComponent as _, inject as fe, normalizeStyle as pe, onBeforeUnmount as me, onMounted as he, openBlock as v, ref as y, renderList as ge, toDisplayString as b, unref as x, vModelText as _e, watch as ve, withCtx as S, withDirectives as ye, withModifiers as be } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var xe = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, Se = { class: "admin-libraries__head" }, Ce = {
	key: 0,
	class: "admin-libraries__skel"
}, we = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, Te = ["data-testid"], Ee = {
	key: 0,
	class: "admin-libraries__error"
}, De = ["data-testid"], Oe = ["aria-valuenow", "aria-label"], ke = { class: "admin-libraries__progress-meta" }, Ae = {
	key: 0,
	class: "admin-libraries__progress-file"
}, je = ["data-testid"], Me = { class: "admin-libraries__actions" }, Ne = { class: "admin-libraries__field" }, Pe = { class: "admin-libraries__field" }, Fe = ["value"], Ie = {
	key: 2,
	class: "admin-libraries__hint-text"
}, Le = { class: "admin-libraries__field" }, Re = {
	key: 0,
	class: "admin-libraries__field"
}, ze = {
	key: 1,
	class: "admin-libraries__field"
}, Be = { class: "admin-libraries__field" }, Ve = {
	key: 2,
	class: "admin-libraries__field"
}, He = {
	class: "admin-libraries__imagetypes",
	role: "group",
	"aria-label": "Artwork types"
}, Ue = { class: "admin-libraries__checkbox" }, We = [
	"checked",
	"aria-label",
	"onChange"
], Ge = { class: "admin-libraries__checkbox-text" }, Ke = { class: "admin-libraries__checkbox-label" }, qe = {
	key: 0,
	class: "admin-libraries__checkbox-providers"
}, Je = {
	key: 0,
	class: "admin-libraries__skel"
}, Ye = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Xe = ["data-testid"], Ze = ["data-testid"], Qe = { class: "admin-libraries__date" }, $e = { class: "admin-libraries__date" }, et = 2e3, tt = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let _ = /* @__PURE__ */ new Set([
			"movie",
			"series",
			"video",
			"photo",
			"book",
			"audiobook"
		]), tt = e, nt = fe("apiBase", ""), rt = u(() => typeof nt == "string" ? nt : nt?.value ?? ""), it = tt.client ?? new i({
			baseUrl: rt.value,
			tokenStore: new n()
		}), C = new le(it), at = new ce(it), w = ee(), ot = u(() => tt.pollIntervalMs ?? et), st = u(() => c.map((e) => ({
			value: e,
			label: e
		})));
		function ct(e) {
			return e === "completed" || e === "failed";
		}
		function lt(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function ut(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let dt = {
			scan: "Scan",
			rescan: "Rescan",
			metadata: "Metadata match",
			metadata_refresh: "Metadata refresh",
			prune: "Prune missing files",
			clear_metadata: "Clear metadata",
			clear_artwork: "Clear artwork",
			delete_all: "Delete all items",
			media_assets: "Media assets"
		};
		function ft(e) {
			return dt[e] ?? e;
		}
		function T(e) {
			let n = e?.items_failed ?? 0;
			return !Number.isFinite(n) || n <= 0 ? "" : `${t(n, "file", "files")} could not be indexed`;
		}
		function pt(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function E(e) {
			if (!pt(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function mt(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function ht(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let gt = y([]), D = y(!0), O = y(null), k = y({}), A = {}, j = /* @__PURE__ */ new Set();
		function _t(e) {
			let t = A[e];
			t !== void 0 && (clearInterval(t), delete A[e]), j.delete(e);
		}
		async function vt(e) {
			try {
				let t = await C.scanStatus(e);
				k.value = {
					...k.value,
					[e]: t
				}, (t === null || ct(t.status)) && _t(e);
			} catch {
				_t(e);
			}
		}
		function yt(e) {
			A[e] === void 0 && (A[e] = setInterval(() => {
				vt(e);
			}, ot.value));
		}
		function bt() {
			for (let e of Object.keys(A)) clearInterval(A[e]), delete A[e], j.add(e);
		}
		function xt() {
			for (let e of j) yt(e);
			j.clear();
		}
		function St() {
			document.hidden ? bt() : xt();
		}
		async function M() {
			D.value = !0, O.value = null;
			try {
				let e = await C.list();
				gt.value = e, Tt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await C.scanStatus(e.id);
						k.value = {
							...k.value,
							[e.id]: t
						}, t !== null && !ct(t.status) && yt(e.id);
					} catch {}
				}));
			} catch (e) {
				O.value = r(e, "Failed to load libraries."), w.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		let N = y(!1), P = y(null), F = y(""), I = y(c[0]), L = y(""), R = y(!1), z = y(!0), B = y(!1), V = y(!1), Ct = u(() => P.value ? "Edit library" : "Add library"), H = y([]), U = y([]), W = y(!1), wt = y(!1), G = y([]), K = y({}), q = y(!1);
		function Tt(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (G.value = t.image_types.available);
		}
		function Et(e) {
			let t = e?.image_types?.available ?? G.value;
			t.length && (G.value = t);
			let n = e?.image_types?.enabled ?? G.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of G.value) r[e.type] = n.includes(e.type);
			K.value = r, q.value = !1;
		}
		function Dt(e, t) {
			K.value = {
				...K.value,
				[e]: t
			}, q.value = !0;
		}
		let Ot = [
			"imdb",
			"tmdb",
			"tvdb"
		], kt = u(() => I.value === "music" ? H.value.filter((e) => !Ot.includes(e)) : H.value), At = u(() => U.value.filter((e) => kt.value.includes(e)));
		async function jt() {
			if (!wt.value) {
				wt.value = !0;
				try {
					H.value = await at.listSources();
				} catch {
					H.value = [];
				}
			}
		}
		function Mt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[I.value]) ? n[I.value].filter((e) => typeof e == "string") : [];
			U.value = r.length ? r : H.value.slice(), W.value = !1;
		}
		function Nt(e) {
			U.value = e, W.value = !0;
		}
		ve(H, () => {
			N.value && !W.value && U.value.length === 0 && (U.value = H.value.slice());
		});
		function Pt(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function Ft(e) {
			z.value = !e?.auto_collections || Pt(e.auto_collections.enabled), B.value = !1;
		}
		function It(e) {
			z.value = e, B.value = !0;
		}
		function Lt() {
			return L.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function Rt() {
			P.value = null, F.value = "", I.value = c[0], L.value = "", R.value = !1, Mt(null), Et(null), Ft(null), N.value = !0;
		}
		function zt(e) {
			P.value = e, F.value = e.name;
			let t = c.find((t) => t === e.type);
			I.value = t ?? c[0], L.value = e.paths.join("\n"), R.value = Pt(e.options?.series_per_directory), Mt(e), Et(e), Ft(e), N.value = !0;
		}
		function Bt() {
			N.value = !1, P.value = null;
		}
		async function Vt() {
			if (!F.value.trim()) {
				w.error("Name is required.");
				return;
			}
			let e = Lt();
			if (e.length === 0) {
				w.error("Select at least one path.");
				return;
			}
			V.value = !0;
			try {
				let t = P.value, n = I.value === "series", r = _.has(I.value);
				if (t) {
					let i = {
						name: F.value,
						paths: e
					};
					n && (i.series_per_directory = R.value), W.value && (i.metadata_priority = U.value.length ? { [I.value]: U.value } : null), q.value && (i.image_types = { ...K.value }), r && B.value && (i.autoCollections = z.value), await C.update(t.id, i), w.success("Library updated.");
				} else {
					let t = {
						name: F.value,
						type: I.value,
						paths: e
					};
					n && (t.series_per_directory = R.value), W.value && (t.metadata_priority = U.value.length ? { [I.value]: U.value } : null), q.value && (t.image_types = { ...K.value }), r && B.value && (t.autoCollections = z.value);
					let i = await C.create(t);
					w.success(i.message || "Library created.");
				}
				Bt(), await M();
			} catch (e) {
				w.error(r(e, "Failed to save library."));
			} finally {
				V.value = !1;
			}
		}
		let J = y(null);
		async function Ht() {
			let e = J.value;
			if (e) try {
				await C.remove(e.id), w.success("Library deleted."), J.value = null, await M();
			} catch (e) {
				w.error(r(e, "Failed to delete library.")), J.value = null;
			}
		}
		function Ut(e, t) {
			switch (t) {
				case "scan": return C.scan(e.id);
				case "rescan": return C.rescan(e.id);
				case "metadata": return C.matchMetadata(e.id);
				case "refresh-metadata": return C.refreshMetadata(e.id);
				case "prune": return C.prune(e.id);
				case "clear-metadata": return C.clearMetadata(e.id);
				case "clear-artwork": return C.clearArtwork(e.id);
				case "delete-all": return C.deleteAll(e.id);
				case "regenerate-assets": return C.regenerateAssets(e.id);
			}
		}
		function Wt(e, t) {
			switch (e) {
				case "metadata":
				case "refresh-metadata":
				case "clear-metadata": return `Metadata job queued (job ${t}).`;
				case "clear-artwork": return `Artwork job queued (job ${t}).`;
				case "prune":
				case "delete-all": return `Cleanup queued (job ${t}).`;
				case "regenerate-assets": return `Media-asset regeneration queued (job ${t}).`;
				default: return `Scan queued (job ${t}).`;
			}
		}
		async function Y(e, t) {
			try {
				let n = await Ut(e, t);
				w.success(n.message || Wt(t, n.job_id));
				let r = k.value[e.id];
				k.value = {
					...k.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, yt(e.id), vt(e.id);
			} catch (e) {
				w.error(r(e, "Failed to queue operation."));
			}
		}
		let Gt = {
			"clear-metadata": {
				title: "Clear metadata",
				confirmLabel: "Clear metadata",
				danger: !1,
				message: "Reset every item in “{name}” to filesystem basics? The items and your watch progress / favorites are kept — run Match metadata afterwards to re-fetch details."
			},
			"clear-artwork": {
				title: "Clear cached artwork",
				confirmLabel: "Clear artwork",
				danger: !1,
				message: "Delete the locally cached images for “{name}” to free disk space? Artwork is re-downloaded on the next metadata match."
			},
			"delete-all": {
				title: "Delete all items",
				confirmLabel: "Delete all items",
				danger: !0,
				message: "Permanently remove EVERY item in “{name}”, including all watch progress, favorites and ratings? This cannot be undone."
			}
		}, X = y(null), Z = u(() => X.value ? Gt[X.value.op] : null), Kt = u(() => X.value && Z.value ? Z.value.message.replace("{name}", X.value.lib.name) : "");
		function qt(e, t) {
			X.value = {
				lib: e,
				op: t
			};
		}
		async function Jt() {
			let e = X.value;
			e && (X.value = null, await Y(e.lib, e.op));
		}
		function Yt(e) {
			return [
				{
					label: "Rescan",
					onClick: () => void Y(e, "rescan")
				},
				{
					label: "Recheck all metadata",
					onClick: () => void Y(e, "refresh-metadata")
				},
				{
					label: "Prune removed",
					onClick: () => void Y(e, "prune")
				},
				{
					label: "Regenerate media assets",
					onClick: () => void Y(e, "regenerate-assets")
				},
				{
					label: "Clear metadata",
					onClick: () => qt(e, "clear-metadata")
				},
				{
					label: "Clear cached artwork",
					onClick: () => qt(e, "clear-artwork")
				},
				{
					label: "Delete all items",
					danger: !0,
					onClick: () => qt(e, "delete-all")
				},
				{
					label: "Delete",
					danger: !0,
					onClick: () => {
						J.value = e;
					}
				}
			];
		}
		let Q = y(null), $ = y([]), Xt = y(!1), Zt = u(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Qt = u({
			get: () => Q.value !== null,
			set: (e) => {
				e || en();
			}
		});
		async function $t(e) {
			Q.value = e, $.value = [], Xt.value = !0;
			try {
				$.value = await C.scanHistory(e.id);
			} catch (e) {
				w.error(r(e, "Failed to load history."));
			} finally {
				Xt.value = !1;
			}
		}
		function en() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			jt(), M(), typeof document < "u" && document.addEventListener("visibilitychange", St);
		}), me(() => {
			for (let e of Object.keys(A)) clearInterval(A[e]), delete A[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", St);
		}), (e, t) => (v(), p("section", xe, [
			m("header", Se, [t[11] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Rt
			}, {
				default: S(() => [...t[10] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			g(ae, {
				links: x(ue).libraries.links,
				details: x(ue).libraries.details
			}, {
				default: S(() => [...t[12] ||= [
					h(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					m("strong", null, "“What do these operations do?”", -1),
					h(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[38] ||= de("<details class=\"admin-libraries__help\" open data-v-21e26071><summary class=\"admin-libraries__help-summary\" data-v-21e26071>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-21e26071><dt data-v-21e26071>Scan</dt><dd data-v-21e26071> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-21e26071>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-21e26071>Match metadata</dt><dd data-v-21e26071> Fetches TMDB/IMDB details and artwork <em data-v-21e26071>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-21e26071>Recheck all metadata</dt><dd data-v-21e26071> Forces a fresh metadata fetch for <em data-v-21e26071>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-21e26071>Rescan</dt><dd data-v-21e26071> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-21e26071>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-21e26071>Prune removed</dt><dd data-v-21e26071> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-21e26071>Regenerate media assets</dt><dd data-v-21e26071> Re-creates the file-based media assets (chapter thumbnails, trickplay sprite, Roku BIF) for the library&#39;s existing items. <strong data-v-21e26071>Idempotent</strong> — firing it while a regeneration is already queued is a no-op success, not an error. </dd><dt data-v-21e26071>Clear metadata</dt><dd data-v-21e26071> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-21e26071>Clear cached artwork</dt><dd data-v-21e26071> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-21e26071>Delete all items</dt><dd data-v-21e26071><strong data-v-21e26071>Destructive.</strong> Removes every item in the library <em data-v-21e26071>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			D.value ? (v(), p("div", Ce, [g(re, {
				variant: "text",
				lines: 6
			})])) : O.value ? (v(), d(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: O.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: S(() => [...t[13] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : gt.value.length === 0 ? (v(), d(ie, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Rt
				}, {
					default: S(() => [...t[14] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", we, [t[20] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(l, null, ge(gt.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, b(e.name), 1),
				m("td", null, b(e.type), 1),
				m("td", null, b(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [
					g(o, { tone: ut(k.value[e.id]) }, {
						default: S(() => [h(b(lt(k.value[e.id])), 1)]),
						_: 2
					}, 1032, ["tone"]),
					k.value[e.id]?.status === "failed" && k.value[e.id]?.error ? (v(), p("span", Ee, b(k.value[e.id]?.error), 1)) : pt(k.value[e.id]) ? (v(), p("span", {
						key: 1,
						class: "admin-libraries__progress",
						"data-testid": `progress-${e.id}`
					}, [
						m("span", {
							class: "admin-libraries__progress-bar",
							role: "progressbar",
							"aria-valuenow": E(k.value[e.id]),
							"aria-valuemin": "0",
							"aria-valuemax": "100",
							"aria-label": `Scan progress for ${e.name}`
						}, [m("span", {
							class: "admin-libraries__progress-fill",
							style: pe({ width: E(k.value[e.id]) + "%" })
						}, null, 4)], 8, Oe),
						m("span", ke, b(E(k.value[e.id])) + "% · " + b(mt(k.value[e.id])), 1),
						ht(k.value[e.id]) ? (v(), p("span", Ae, b(ht(k.value[e.id])), 1)) : f("", !0)
					], 8, De)) : f("", !0),
					T(k.value[e.id]) ? (v(), p("span", {
						key: 2,
						class: "admin-libraries__failed",
						"data-testid": `failed-${e.id}`,
						role: "status"
					}, [g(o, { tone: "warning" }, {
						default: S(() => [h(b(T(k.value[e.id])), 1)]),
						_: 2
					}, 1024)], 8, je)) : f("", !0)
				], 8, Te)]),
				m("td", null, [m("div", Me, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => zt(e)
					}, {
						default: S(() => [...t[15] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: S(() => [...t[16] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: S(() => [...t[17] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(oe, { items: Yt(e) }, {
						default: S(() => [g(a, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: S(() => [...t[18] ||= [h(" More ", -1)]]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 2
					}, 1032, ["items"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => $t(e)
					}, {
						default: S(() => [...t[19] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(s, {
				modelValue: N.value,
				"onUpdate:modelValue": t[4] ||= (e) => N.value = e,
				title: Ct.value,
				onClose: Bt
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: Bt
				}, {
					default: S(() => [...t[30] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: Vt
				}, {
					default: S(() => [h(b(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: be(Vt, ["prevent"])
				}, [
					m("label", Ne, [t[21] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), ye(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => F.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_e, F.value]])]),
					m("div", Pe, [
						t[22] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						P.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: I.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Fe)) : (v(), d(ne, {
							key: 1,
							"model-value": I.value,
							options: st.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (v(), p("span", Ie, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", Le, [t[23] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ye(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[_e, L.value]])]),
					I.value === "series" ? (v(), p("div", Re, [g(te, {
						modelValue: R.value,
						"onUpdate:modelValue": t[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[24] ||= m("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : f("", !0),
					x(_).has(I.value) ? (v(), p("div", ze, [g(te, {
						"model-value": z.value,
						label: "Automatically generate collections from TMDB box sets",
						"onUpdate:modelValue": It
					}, null, 8, ["model-value"]), t[25] ||= m("span", { class: "admin-libraries__hint-text" }, " When on, movies that belong to a TMDB box set (e.g. a trilogy) are grouped into a collection during scanning. Turn it off to skip collection generation for this library. ", -1)])) : f("", !0),
					m("div", Be, [
						t[26] ||= m("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[27] ||= m("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						g(se, {
							"model-value": At.value,
							available: kt.value,
							label: `${I.value} sources`,
							"onUpdate:modelValue": Nt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					G.value.length ? (v(), p("div", Ve, [
						t[28] ||= m("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[29] ||= m("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						m("ul", He, [(v(!0), p(l, null, ge(G.value, (e) => (v(), p("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [m("label", Ue, [m("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: K.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => Dt(e.type, t.target.checked)
						}, null, 40, We), m("span", Ge, [m("span", Ke, b(e.label), 1), e.providers.length ? (v(), p("span", qe, b(e.providers.join(", ")), 1)) : f("", !0)])])]))), 128))])
					])) : f("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(s, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: S(() => [...t[33] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: Ht
				}, {
					default: S(() => [...t[34] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					t[31] ||= h(" Delete library ", -1),
					m("strong", null, b(J.value?.name), 1),
					t[32] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(s, {
				"model-value": X.value !== null,
				title: Z.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => X.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => X.value = null
				}, {
					default: S(() => [...t[35] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: Z.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Jt
				}, {
					default: S(() => [h(b(Z.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: S(() => [m("p", null, b(Kt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			g(s, {
				modelValue: Qt.value,
				"onUpdate:modelValue": t[9] ||= (e) => Qt.value = e,
				title: Zt.value,
				size: "lg"
			}, {
				footer: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					onClick: en
				}, {
					default: S(() => [...t[37] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [Xt.value ? (v(), p("div", Je, [g(re, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (v(), d(ie, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", Ye, [t[36] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Failed"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(l, null, ge($.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", { "data-testid": `history-type-${e.id}` }, b(ft(e.type)), 9, Xe),
					m("td", null, [g(o, { tone: ut(e) }, {
						default: S(() => [h(b(lt(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", { "data-testid": `history-failed-${e.id}` }, [T(e) ? (v(), d(o, {
						key: 0,
						tone: "warning"
					}, {
						default: S(() => [h(b(T(e)), 1)]),
						_: 2
					}, 1024)) : (v(), p(l, { key: 1 }, [h("—")], 64))], 8, Ze),
					m("td", Qe, b(e.queued_at ?? ""), 1),
					m("td", $e, b(e.completed_at ?? ""), 1),
					m("td", null, b(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-21e26071"]]);
//#endregion
export { tt as default };

//# sourceMappingURL=LibrariesPage-BGIFgvcO.js.map