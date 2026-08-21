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
import { n as c, t as le } from "./libraries-DYTX2VKZ.js";
import { t as ue } from "./helpLinks-ya0IGJSe.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createStaticVNode as de, createTextVNode as h, createVNode as g, defineComponent as _, inject as fe, normalizeStyle as pe, onBeforeUnmount as me, onMounted as he, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as ge, vModelText as _e, watch as ve, withCtx as S, withDirectives as ye, withModifiers as be } from "vue";
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
}, Xe = ["data-testid"], Ze = ["data-testid"], Qe = { class: "admin-libraries__date" }, $e = { class: "admin-libraries__date" }, et = 2e3, C = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let _ = e, C = fe("apiBase", ""), tt = u(() => typeof C == "string" ? C : C?.value ?? ""), nt = _.client ?? new i({
			baseUrl: tt.value,
			tokenStore: new n()
		}), w = new le(nt), rt = new ce(nt), T = ee(), it = u(() => _.pollIntervalMs ?? et), at = u(() => c.map((e) => ({
			value: e,
			label: e
		})));
		function ot(e) {
			return e === "completed" || e === "failed";
		}
		function st(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function ct(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let lt = {
			scan: "Scan",
			rescan: "Rescan",
			metadata: "Metadata match",
			metadata_refresh: "Metadata refresh",
			prune: "Prune missing files",
			clear_metadata: "Clear metadata",
			clear_artwork: "Clear artwork",
			delete_all: "Delete all items"
		};
		function ut(e) {
			return lt[e] ?? e;
		}
		function E(e) {
			let n = e?.items_failed ?? 0;
			return !Number.isFinite(n) || n <= 0 ? "" : `${t(n, "file", "files")} could not be indexed`;
		}
		function dt(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function ft(e) {
			if (!dt(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function pt(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function mt(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let ht = y([]), gt = y(!0), D = y(null), O = y({}), k = {}, A = /* @__PURE__ */ new Set();
		function _t(e) {
			let t = k[e];
			t !== void 0 && (clearInterval(t), delete k[e]), A.delete(e);
		}
		async function vt(e) {
			try {
				let t = await w.scanStatus(e);
				O.value = {
					...O.value,
					[e]: t
				}, (t === null || ot(t.status)) && _t(e);
			} catch {
				_t(e);
			}
		}
		function j(e) {
			k[e] === void 0 && (k[e] = setInterval(() => {
				vt(e);
			}, it.value));
		}
		function yt() {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e], A.add(e);
		}
		function bt() {
			for (let e of A) j(e);
			A.clear();
		}
		function xt() {
			document.hidden ? yt() : bt();
		}
		async function M() {
			gt.value = !0, D.value = null;
			try {
				let e = await w.list();
				ht.value = e, wt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await w.scanStatus(e.id);
						O.value = {
							...O.value,
							[e.id]: t
						}, t !== null && !ot(t.status) && j(e.id);
					} catch {}
				}));
			} catch (e) {
				D.value = r(e, "Failed to load libraries."), T.error(D.value);
			} finally {
				gt.value = !1;
			}
		}
		let N = y(!1), P = y(null), F = y(""), I = y(c[0]), L = y(""), R = y(!1), z = y(!0), B = y(!1), V = y(!1), St = u(() => P.value ? "Edit library" : "Add library"), H = y([]), U = y([]), W = y(!1), Ct = y(!1), G = y([]), K = y({}), q = y(!1);
		function wt(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (G.value = t.image_types.available);
		}
		function Tt(e) {
			let t = e?.image_types?.available ?? G.value;
			t.length && (G.value = t);
			let n = e?.image_types?.enabled ?? G.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of G.value) r[e.type] = n.includes(e.type);
			K.value = r, q.value = !1;
		}
		function Et(e, t) {
			K.value = {
				...K.value,
				[e]: t
			}, q.value = !0;
		}
		let Dt = [
			"imdb",
			"tmdb",
			"tvdb"
		], Ot = u(() => I.value === "music" ? H.value.filter((e) => !Dt.includes(e)) : H.value), kt = u(() => U.value.filter((e) => Ot.value.includes(e)));
		async function At() {
			if (!Ct.value) {
				Ct.value = !0;
				try {
					H.value = await rt.listSources();
				} catch {
					H.value = [];
				}
			}
		}
		function jt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[I.value]) ? n[I.value].filter((e) => typeof e == "string") : [];
			U.value = r.length ? r : H.value.slice(), W.value = !1;
		}
		function Mt(e) {
			U.value = e, W.value = !0;
		}
		ve(H, () => {
			N.value && !W.value && U.value.length === 0 && (U.value = H.value.slice());
		});
		function Nt(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function Pt(e) {
			z.value = !e?.auto_collections || Nt(e.auto_collections.enabled), B.value = !1;
		}
		function Ft(e) {
			z.value = e, B.value = !0;
		}
		function It() {
			return L.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function Lt() {
			P.value = null, F.value = "", I.value = c[0], L.value = "", R.value = !1, jt(null), Tt(null), Pt(null), N.value = !0;
		}
		function Rt(e) {
			P.value = e, F.value = e.name;
			let t = c.find((t) => t === e.type);
			I.value = t ?? c[0], L.value = e.paths.join("\n"), R.value = Nt(e.options?.series_per_directory), jt(e), Tt(e), Pt(e), N.value = !0;
		}
		function zt() {
			N.value = !1, P.value = null;
		}
		async function Bt() {
			if (!F.value.trim()) {
				T.error("Name is required.");
				return;
			}
			let e = It();
			if (e.length === 0) {
				T.error("Select at least one path.");
				return;
			}
			V.value = !0;
			try {
				let t = P.value, n = I.value === "series", r = I.value === "movie";
				if (t) {
					let i = {
						name: F.value,
						paths: e
					};
					n && (i.series_per_directory = R.value), W.value && (i.metadata_priority = U.value.length ? { [I.value]: U.value } : null), q.value && (i.image_types = { ...K.value }), r && B.value && (i.autoCollections = z.value), await w.update(t.id, i), T.success("Library updated.");
				} else {
					let t = {
						name: F.value,
						type: I.value,
						paths: e
					};
					n && (t.series_per_directory = R.value), W.value && (t.metadata_priority = U.value.length ? { [I.value]: U.value } : null), q.value && (t.image_types = { ...K.value }), r && B.value && (t.autoCollections = z.value);
					let i = await w.create(t);
					T.success(i.message || "Library created.");
				}
				zt(), await M();
			} catch (e) {
				T.error(r(e, "Failed to save library."));
			} finally {
				V.value = !1;
			}
		}
		let J = y(null);
		async function Vt() {
			let e = J.value;
			if (e) try {
				await w.remove(e.id), T.success("Library deleted."), J.value = null, await M();
			} catch (e) {
				T.error(r(e, "Failed to delete library.")), J.value = null;
			}
		}
		function Ht(e, t) {
			switch (t) {
				case "scan": return w.scan(e.id);
				case "rescan": return w.rescan(e.id);
				case "metadata": return w.matchMetadata(e.id);
				case "refresh-metadata": return w.refreshMetadata(e.id);
				case "prune": return w.prune(e.id);
				case "clear-metadata": return w.clearMetadata(e.id);
				case "clear-artwork": return w.clearArtwork(e.id);
				case "delete-all": return w.deleteAll(e.id);
			}
		}
		function Ut(e, t) {
			switch (e) {
				case "metadata":
				case "refresh-metadata":
				case "clear-metadata": return `Metadata job queued (job ${t}).`;
				case "clear-artwork": return `Artwork job queued (job ${t}).`;
				case "prune":
				case "delete-all": return `Cleanup queued (job ${t}).`;
				default: return `Scan queued (job ${t}).`;
			}
		}
		async function Y(e, t) {
			try {
				let n = await Ht(e, t);
				T.success(n.message || Ut(t, n.job_id));
				let r = O.value[e.id];
				O.value = {
					...O.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, j(e.id), vt(e.id);
			} catch (e) {
				T.error(r(e, "Failed to queue operation."));
			}
		}
		let Wt = {
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
		}, X = y(null), Z = u(() => X.value ? Wt[X.value.op] : null), Gt = u(() => X.value && Z.value ? Z.value.message.replace("{name}", X.value.lib.name) : "");
		function Kt(e, t) {
			X.value = {
				lib: e,
				op: t
			};
		}
		async function qt() {
			let e = X.value;
			e && (X.value = null, await Y(e.lib, e.op));
		}
		function Jt(e) {
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
					label: "Clear metadata",
					onClick: () => Kt(e, "clear-metadata")
				},
				{
					label: "Clear cached artwork",
					onClick: () => Kt(e, "clear-artwork")
				},
				{
					label: "Delete all items",
					danger: !0,
					onClick: () => Kt(e, "delete-all")
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
		let Q = y(null), $ = y([]), Yt = y(!1), Xt = u(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Zt = u({
			get: () => Q.value !== null,
			set: (e) => {
				e || $t();
			}
		});
		async function Qt(e) {
			Q.value = e, $.value = [], Yt.value = !0;
			try {
				$.value = await w.scanHistory(e.id);
			} catch (e) {
				T.error(r(e, "Failed to load history."));
			} finally {
				Yt.value = !1;
			}
		}
		function $t() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			At(), M(), typeof document < "u" && document.addEventListener("visibilitychange", xt);
		}), me(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", xt);
		}), (e, t) => (v(), p("section", xe, [
			m("header", Se, [t[11] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Lt
			}, {
				default: S(() => [...t[10] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			g(ae, {
				links: ge(ue).libraries.links,
				details: ge(ue).libraries.details
			}, {
				default: S(() => [...t[12] ||= [
					h(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					m("strong", null, "“What do these operations do?”", -1),
					h(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[38] ||= de("<details class=\"admin-libraries__help\" open data-v-60865d22><summary class=\"admin-libraries__help-summary\" data-v-60865d22>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-60865d22><dt data-v-60865d22>Scan</dt><dd data-v-60865d22> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-60865d22>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-60865d22>Match metadata</dt><dd data-v-60865d22> Fetches TMDB/IMDB details and artwork <em data-v-60865d22>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-60865d22>Recheck all metadata</dt><dd data-v-60865d22> Forces a fresh metadata fetch for <em data-v-60865d22>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-60865d22>Rescan</dt><dd data-v-60865d22> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-60865d22>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-60865d22>Prune removed</dt><dd data-v-60865d22> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-60865d22>Clear metadata</dt><dd data-v-60865d22> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-60865d22>Clear cached artwork</dt><dd data-v-60865d22> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-60865d22>Delete all items</dt><dd data-v-60865d22><strong data-v-60865d22>Destructive.</strong> Removes every item in the library <em data-v-60865d22>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			gt.value ? (v(), p("div", Ce, [g(re, {
				variant: "text",
				lines: 6
			})])) : D.value ? (v(), d(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: D.value
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
			}, 8, ["description"])) : ht.value.length === 0 ? (v(), d(ie, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Lt
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
			])], -1), m("tbody", null, [(v(!0), p(l, null, b(ht.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", null, x(e.type), 1),
				m("td", null, x(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [
					g(o, { tone: ct(O.value[e.id]) }, {
						default: S(() => [h(x(st(O.value[e.id])), 1)]),
						_: 2
					}, 1032, ["tone"]),
					O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (v(), p("span", Ee, x(O.value[e.id]?.error), 1)) : dt(O.value[e.id]) ? (v(), p("span", {
						key: 1,
						class: "admin-libraries__progress",
						"data-testid": `progress-${e.id}`
					}, [
						m("span", {
							class: "admin-libraries__progress-bar",
							role: "progressbar",
							"aria-valuenow": ft(O.value[e.id]),
							"aria-valuemin": "0",
							"aria-valuemax": "100",
							"aria-label": `Scan progress for ${e.name}`
						}, [m("span", {
							class: "admin-libraries__progress-fill",
							style: pe({ width: ft(O.value[e.id]) + "%" })
						}, null, 4)], 8, Oe),
						m("span", ke, x(ft(O.value[e.id])) + "% · " + x(pt(O.value[e.id])), 1),
						mt(O.value[e.id]) ? (v(), p("span", Ae, x(mt(O.value[e.id])), 1)) : f("", !0)
					], 8, De)) : f("", !0),
					E(O.value[e.id]) ? (v(), p("span", {
						key: 2,
						class: "admin-libraries__failed",
						"data-testid": `failed-${e.id}`,
						role: "status"
					}, [g(o, { tone: "warning" }, {
						default: S(() => [h(x(E(O.value[e.id])), 1)]),
						_: 2
					}, 1024)], 8, je)) : f("", !0)
				], 8, Te)]),
				m("td", null, [m("div", Me, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Rt(e)
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
					g(oe, { items: Jt(e) }, {
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
						onClick: (t) => Qt(e)
					}, {
						default: S(() => [...t[19] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(s, {
				modelValue: N.value,
				"onUpdate:modelValue": t[4] ||= (e) => N.value = e,
				title: St.value,
				onClose: zt
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: zt
				}, {
					default: S(() => [...t[30] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: Bt
				}, {
					default: S(() => [h(x(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: be(Bt, ["prevent"])
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
							options: at.value,
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
					I.value === "movie" ? (v(), p("div", ze, [g(te, {
						"model-value": z.value,
						label: "Automatically generate collections from TMDB box sets",
						"onUpdate:modelValue": Ft
					}, null, 8, ["model-value"]), t[25] ||= m("span", { class: "admin-libraries__hint-text" }, " When on, movies that belong to a TMDB box set (e.g. a trilogy) are grouped into a collection during scanning. Turn it off to skip collection generation for this library. ", -1)])) : f("", !0),
					m("div", Be, [
						t[26] ||= m("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[27] ||= m("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						g(se, {
							"model-value": kt.value,
							available: Ot.value,
							label: `${I.value} sources`,
							"onUpdate:modelValue": Mt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					G.value.length ? (v(), p("div", Ve, [
						t[28] ||= m("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[29] ||= m("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						m("ul", He, [(v(!0), p(l, null, b(G.value, (e) => (v(), p("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [m("label", Ue, [m("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: K.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => Et(e.type, t.target.checked)
						}, null, 40, We), m("span", Ge, [m("span", Ke, x(e.label), 1), e.providers.length ? (v(), p("span", qe, x(e.providers.join(", ")), 1)) : f("", !0)])])]))), 128))])
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
					onClick: Vt
				}, {
					default: S(() => [...t[34] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					t[31] ||= h(" Delete library ", -1),
					m("strong", null, x(J.value?.name), 1),
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
					onClick: qt
				}, {
					default: S(() => [h(x(Z.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: S(() => [m("p", null, x(Gt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			g(s, {
				modelValue: Zt.value,
				"onUpdate:modelValue": t[9] ||= (e) => Zt.value = e,
				title: Xt.value,
				size: "lg"
			}, {
				footer: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					onClick: $t
				}, {
					default: S(() => [...t[37] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [Yt.value ? (v(), p("div", Je, [g(re, {
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
				])], -1), m("tbody", null, [(v(!0), p(l, null, b($.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", { "data-testid": `history-type-${e.id}` }, x(ut(e.type)), 9, Xe),
					m("td", null, [g(o, { tone: ct(e) }, {
						default: S(() => [h(x(st(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", { "data-testid": `history-failed-${e.id}` }, [E(e) ? (v(), d(o, {
						key: 0,
						tone: "warning"
					}, {
						default: S(() => [h(x(E(e)), 1)]),
						_: 2
					}, 1024)) : (v(), p(l, { key: 1 }, [h("—")], 64))], 8, Ze),
					m("td", Qe, x(e.queued_at ?? ""), 1),
					m("td", $e, x(e.completed_at ?? ""), 1),
					m("td", null, x(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-60865d22"]]);
//#endregion
export { C as default };

//# sourceMappingURL=LibrariesPage-BOYtAuad.js.map