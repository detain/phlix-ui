import { t as e, x as t } from "./client-57OweUrJ.js";
import { n, t as r } from "./libraries-BC5CZMij.js";
import { a as i } from "./plural-B3O2rVPV.js";
import { n as ee, t as te } from "./metadata-sources-D9LOXqs2.js";
import { t as ne } from "./useToastStore-Bu-iYU7r.js";
import { t as a } from "./Badge-C6LNO9Kk.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as re } from "./Menu-BKtnfxz4.js";
import { t as s } from "./Modal-BU4hJGBA.js";
import { t as ie } from "./Select-ChFXd0gU.js";
import { t as ae } from "./Switch-C1Wv5sN2.js";
import { t as oe } from "./Skeleton-B2Mt2L00.js";
import { t as c } from "./EmptyState-BjOJ1k_A.js";
import { t as se } from "./PageHint-BlhPmafC.js";
import { t as ce } from "./helpLinks-iarZuNmw.js";
import { n as le } from "./Icon-CIbfiPrs.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createStaticVNode as ue, createTextVNode as h, createVNode as g, defineComponent as de, inject as fe, normalizeStyle as pe, onBeforeUnmount as me, onMounted as he, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as x, vModelText as ge, watch as _e, withCtx as S, withDirectives as ve, withModifiers as ye } from "vue";
// src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var be = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, xe = { class: "admin-libraries__head" }, Se = {
	key: 0,
	class: "admin-libraries__skel"
}, Ce = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, we = ["data-testid"], Te = {
	key: 0,
	class: "admin-libraries__error"
}, Ee = ["data-testid"], De = ["aria-valuenow", "aria-label"], Oe = { class: "admin-libraries__progress-meta" }, ke = {
	key: 0,
	class: "admin-libraries__progress-file"
}, Ae = ["data-testid"], je = { class: "admin-libraries__actions" }, Me = { class: "admin-libraries__field" }, Ne = { class: "admin-libraries__field" }, Pe = ["value"], Fe = {
	key: 2,
	class: "admin-libraries__hint-text"
}, Ie = { class: "admin-libraries__field" }, Le = {
	key: 0,
	class: "admin-libraries__field"
}, Re = {
	key: 1,
	class: "admin-libraries__field"
}, ze = { class: "admin-libraries__field" }, Be = {
	key: 2,
	class: "admin-libraries__field"
}, Ve = {
	class: "admin-libraries__imagetypes",
	role: "group",
	"aria-label": "Artwork types"
}, He = { class: "admin-libraries__checkbox" }, Ue = [
	"checked",
	"aria-label",
	"onChange"
], We = { class: "admin-libraries__checkbox-text" }, Ge = { class: "admin-libraries__checkbox-label" }, Ke = {
	key: 0,
	class: "admin-libraries__checkbox-providers"
}, qe = {
	key: 0,
	class: "admin-libraries__skel"
}, Je = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Ye = ["data-testid"], Xe = ["data-testid"], Ze = { class: "admin-libraries__date" }, Qe = { class: "admin-libraries__date" }, $e = 2e3, C = /*#__PURE__*/ le(/* @__PURE__ */ de({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(le) {
		let de = /* @__PURE__ */ new Set([
			"movie",
			"series",
			"video",
			"photo",
			"book",
			"audiobook"
		]), C = le, et = fe("apiBase", ""), tt = u(() => typeof et == "string" ? et : et?.value ?? ""), nt = C.client ?? new e({ baseUrl: tt.value }), w = new r(nt), rt = new te(nt), T = ne(), it = u(() => C.pollIntervalMs ?? $e), at = u(() => n.map((e) => ({
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
			delete_all: "Delete all items",
			media_assets: "Media assets"
		};
		function ut(e) {
			return lt[e] ?? e;
		}
		function E(e) {
			let t = e?.items_failed ?? 0;
			return !Number.isFinite(t) || t <= 0 ? "" : `${i(t, "file", "files")} could not be indexed`;
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
		let ht = v([]), gt = v(!0), D = v(null), O = v({}), k = {}, A = /* @__PURE__ */ new Set();
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
				ht.value = e, Tt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await w.scanStatus(e.id);
						O.value = {
							...O.value,
							[e.id]: t
						}, t !== null && !ot(t.status) && j(e.id);
					} catch {}
				}));
			} catch (e) {
				D.value = t(e, "Failed to load libraries."), T.error(D.value);
			} finally {
				gt.value = !1;
			}
		}
		let N = v(!1), P = v(null), F = v(""), I = v(n[0]), L = v(""), R = v(!1), z = v(!0), B = v(!1), St = v(!1), Ct = u(() => P.value ? "Edit library" : "Add library"), V = v([]), H = v([]), U = v(!1), wt = v(!1), W = v([]), G = v({}), K = v(!1);
		function Tt(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (W.value = t.image_types.available);
		}
		function Et(e) {
			let t = e?.image_types?.available ?? W.value;
			t.length && (W.value = t);
			let n = e?.image_types?.enabled ?? W.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of W.value) r[e.type] = n.includes(e.type);
			G.value = r, K.value = !1;
		}
		function Dt(e, t) {
			G.value = {
				...G.value,
				[e]: t
			}, K.value = !0;
		}
		let Ot = [
			"imdb",
			"tmdb",
			"tvdb"
		], kt = u(() => I.value === "music" ? V.value.filter((e) => !Ot.includes(e)) : V.value), At = u(() => H.value.filter((e) => kt.value.includes(e)));
		async function jt() {
			if (!wt.value) {
				wt.value = !0;
				try {
					V.value = await rt.listSources();
				} catch {
					V.value = [];
				}
			}
		}
		function Mt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[I.value]) ? n[I.value].filter((e) => typeof e == "string") : [];
			H.value = r.length ? r : V.value.slice(), U.value = !1;
		}
		function Nt(e) {
			H.value = e, U.value = !0;
		}
		_e(V, () => {
			N.value && !U.value && H.value.length === 0 && (H.value = V.value.slice());
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
			P.value = null, F.value = "", I.value = n[0], L.value = "", R.value = !1, Mt(null), Et(null), Ft(null), N.value = !0;
		}
		function zt(e) {
			P.value = e, F.value = e.name;
			let t = n.find((t) => t === e.type);
			I.value = t ?? n[0], L.value = e.paths?.join("\n") ?? "", R.value = Pt(e.options?.series_per_directory), Mt(e), Et(e), Ft(e), N.value = !0;
		}
		function Bt() {
			N.value = !1, P.value = null;
		}
		async function Vt() {
			if (!F.value.trim()) {
				T.error("Name is required.");
				return;
			}
			let e = Lt();
			if (e.length === 0) T.error("Select at least one path.");
			else {
				St.value = !0;
				try {
					let t = P.value, n = I.value === "series", r = de.has(I.value);
					if (t) {
						let i = {
							name: F.value,
							paths: e
						};
						n && (i.series_per_directory = R.value), U.value && (i.metadata_priority = H.value.length ? { [I.value]: H.value } : null), K.value && (i.image_types = { ...G.value }), r && B.value && (i.autoCollections = z.value), await w.update(t.id, i), T.success("Library updated.");
					} else {
						let t = {
							name: F.value,
							type: I.value,
							paths: e
						};
						n && (t.series_per_directory = R.value), U.value && (t.metadata_priority = H.value.length ? { [I.value]: H.value } : null), K.value && (t.image_types = { ...G.value }), r && B.value && (t.autoCollections = z.value);
						let i = await w.create(t);
						T.success(i.message || "Library created.");
					}
					Bt(), await M();
				} catch (e) {
					T.error(t(e, "Failed to save library."));
				} finally {
					St.value = !1;
				}
			}
		}
		let q = v(null);
		async function Ht() {
			let e = q.value;
			if (e) try {
				await w.remove(e.id), T.success("Library deleted."), q.value = null, await M();
			} catch (e) {
				T.error(t(e, "Failed to delete library.")), q.value = null;
			}
		}
		function Ut(e, t) {
			switch (t) {
				case "scan": return w.scan(e.id);
				case "rescan": return w.rescan(e.id);
				case "metadata": return w.matchMetadata(e.id);
				case "refresh-metadata": return w.refreshMetadata(e.id);
				case "prune": return w.prune(e.id);
				case "clear-metadata": return w.clearMetadata(e.id);
				case "clear-artwork": return w.clearArtwork(e.id);
				case "delete-all": return w.deleteAll(e.id);
				case "regenerate-assets": return w.regenerateAssets(e.id);
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
		async function J(e, n) {
			try {
				let t = await Ut(e, n);
				T.success(t.message || Wt(n, t.job_id));
				let r = O.value[e.id];
				O.value = {
					...O.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, j(e.id), vt(e.id);
			} catch (e) {
				T.error(t(e, "Failed to queue operation."));
			}
		}
		let Gt = {
			prune: {
				title: "Prune removed files",
				confirmLabel: "Prune removed",
				danger: !1,
				message: "Remove every item in “{name}” whose file no longer exists on disk? Their watch progress and metadata go with them. Items that are merely unreadable right now (unmounted drive, permissions) are removed too — re-add the files and rescan to bring them back."
			},
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
		}, Y = v(null), X = u(() => Y.value ? Gt[Y.value.op] : null), Kt = u(() => Y.value && X.value ? X.value.message.replace("{name}", Y.value.lib.name) : "");
		function Z(e, t) {
			Y.value = {
				lib: e,
				op: t
			};
		}
		async function qt() {
			let e = Y.value;
			e && (Y.value = null, await J(e.lib, e.op));
		}
		function Jt(e) {
			return [
				{
					label: "Rescan",
					onClick: () => void J(e, "rescan")
				},
				{
					label: "Recheck all metadata",
					onClick: () => void J(e, "refresh-metadata")
				},
				{
					label: "Prune removed",
					onClick: () => Z(e, "prune")
				},
				{
					label: "Regenerate media assets",
					onClick: () => void J(e, "regenerate-assets")
				},
				{
					label: "Clear metadata",
					onClick: () => Z(e, "clear-metadata")
				},
				{
					label: "Clear cached artwork",
					onClick: () => Z(e, "clear-artwork")
				},
				{
					label: "Delete all items",
					danger: !0,
					onClick: () => Z(e, "delete-all")
				},
				{
					label: "Delete",
					danger: !0,
					onClick: () => {
						q.value = e;
					}
				}
			];
		}
		let Q = v(null), $ = v([]), Yt = v(!1), Xt = u(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Zt = u({
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
				T.error(t(e, "Failed to load history."));
			} finally {
				Yt.value = !1;
			}
		}
		function $t() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			jt(), M(), typeof document < "u" && document.addEventListener("visibilitychange", xt);
		}), me(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", xt);
		}), (e, t) => (_(), p("section", be, [
			m("header", xe, [t[11] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Rt
			}, {
				default: S(() => [...t[10] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			g(se, {
				links: x(ce).libraries.links,
				details: x(ce).libraries.details
			}, {
				default: S(() => [...t[12] ||= [
					h(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					m("strong", null, "“What do these operations do?”", -1),
					h(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[38] ||= ue("<details class=\"admin-libraries__help\" open data-v-e790c6c7><summary class=\"admin-libraries__help-summary\" data-v-e790c6c7>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-e790c6c7><dt data-v-e790c6c7>Scan</dt><dd data-v-e790c6c7> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-e790c6c7>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-e790c6c7>Match metadata</dt><dd data-v-e790c6c7> Fetches TMDB/IMDB details and artwork <em data-v-e790c6c7>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-e790c6c7>Recheck all metadata</dt><dd data-v-e790c6c7> Forces a fresh metadata fetch for <em data-v-e790c6c7>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-e790c6c7>Rescan</dt><dd data-v-e790c6c7> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-e790c6c7>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-e790c6c7>Prune removed</dt><dd data-v-e790c6c7> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-e790c6c7>Regenerate media assets</dt><dd data-v-e790c6c7> Re-creates the file-based media assets (chapter thumbnails, trickplay sprite, Roku BIF) for the library’s existing items. <strong data-v-e790c6c7>Idempotent</strong> — firing it while a regeneration is already queued is a no-op success, not an error. </dd><dt data-v-e790c6c7>Clear metadata</dt><dd data-v-e790c6c7> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-e790c6c7>Clear cached artwork</dt><dd data-v-e790c6c7> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-e790c6c7>Delete all items</dt><dd data-v-e790c6c7><strong data-v-e790c6c7>Destructive.</strong> Removes every item in the library <em data-v-e790c6c7>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			gt.value ? (_(), p("div", Se, [g(oe, {
				variant: "text",
				lines: 6
			})])) : D.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load libraries",
				description: D.value
			}, {
				actions: S(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: S(() => [...t[13] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : ht.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: S(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Rt
				}, {
					default: S(() => [...t[14] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), p("table", Ce, [t[20] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(_(!0), p(l, null, y(ht.value, (e) => (_(), p("tr", { key: e.id }, [
				m("td", null, b(e.name), 1),
				m("td", null, b(e.type), 1),
				m("td", null, b(e.paths?.length ?? 0) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [
					g(a, { tone: ct(O.value[e.id]) }, {
						default: S(() => [h(b(st(O.value[e.id])), 1)]),
						_: 2
					}, 1032, ["tone"]),
					O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (_(), p("span", Te, b(O.value[e.id]?.error), 1)) : dt(O.value[e.id]) ? (_(), p("span", {
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
						}, null, 4)], 8, De),
						m("span", Oe, b(ft(O.value[e.id])) + "% · " + b(pt(O.value[e.id])), 1),
						mt(O.value[e.id]) ? (_(), p("span", ke, b(mt(O.value[e.id])), 1)) : f("", !0)
					], 8, Ee)) : f("", !0),
					E(O.value[e.id]) ? (_(), p("span", {
						key: 2,
						class: "admin-libraries__failed",
						"data-testid": `failed-${e.id}`,
						role: "status"
					}, [g(a, { tone: "warning" }, {
						default: S(() => [h(b(E(O.value[e.id])), 1)]),
						_: 2
					}, 1024)], 8, Ae)) : f("", !0)
				], 8, we)]),
				m("td", null, [m("div", je, [
					g(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => zt(e)
					}, {
						default: S(() => [...t[15] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => J(e, "scan")
					}, {
						default: S(() => [...t[16] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => J(e, "metadata")
					}, {
						default: S(() => [...t[17] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(re, { items: Jt(e) }, {
						default: S(() => [g(o, {
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
					g(o, {
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
				title: Ct.value,
				onClose: Bt
			}, {
				footer: S(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: Bt
				}, {
					default: S(() => [...t[30] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: St.value,
					onClick: Vt
				}, {
					default: S(() => [h(b(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: ye(Vt, ["prevent"])
				}, [
					m("label", Me, [t[21] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), ve(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => F.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[ge, F.value]])]),
					m("div", Ne, [
						t[22] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						P.value ? (_(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: I.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Pe)) : (_(), d(ie, {
							key: 1,
							"model-value": I.value,
							options: at.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (_(), p("span", Fe, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", Ie, [t[23] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ve(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[ge, L.value]])]),
					I.value === "series" ? (_(), p("div", Le, [g(ae, {
						modelValue: R.value,
						"onUpdate:modelValue": t[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[24] ||= m("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : f("", !0),
					x(de).has(I.value) ? (_(), p("div", Re, [g(ae, {
						"model-value": z.value,
						label: "Automatically generate collections from TMDB box sets",
						"onUpdate:modelValue": It
					}, null, 8, ["model-value"]), t[25] ||= m("span", { class: "admin-libraries__hint-text" }, " When on, items that match a TMDB box set (e.g. a trilogy) are grouped into a collection during scanning. Turn it off to skip collection generation for this library. ", -1)])) : f("", !0),
					m("div", ze, [
						t[26] ||= m("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[27] ||= m("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						g(ee, {
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
					W.value.length ? (_(), p("div", Be, [
						t[28] ||= m("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[29] ||= m("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						m("ul", Ve, [(_(!0), p(l, null, y(W.value, (e) => (_(), p("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [m("label", He, [m("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: G.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => Dt(e.type, t.target.checked)
						}, null, 40, Ue), m("span", We, [m("span", Ge, b(e.label), 1), e.providers.length ? (_(), p("span", Ke, b(e.providers.join(", ")), 1)) : f("", !0)])])]))), 128))])
					])) : f("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(s, {
				"model-value": q.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => q.value = null
			}, {
				footer: S(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => q.value = null
				}, {
					default: S(() => [...t[33] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "danger",
					size: "sm",
					onClick: Ht
				}, {
					default: S(() => [...t[34] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					t[31] ||= h(" Delete library ", -1),
					m("strong", null, b(q.value?.name), 1),
					t[32] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(s, {
				"model-value": Y.value !== null,
				title: X.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => Y.value = null
			}, {
				footer: S(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => Y.value = null
				}, {
					default: S(() => [...t[35] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: X.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: qt
				}, {
					default: S(() => [h(b(X.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: S(() => [m("p", null, b(Kt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			g(s, {
				modelValue: Zt.value,
				"onUpdate:modelValue": t[9] ||= (e) => Zt.value = e,
				title: Xt.value,
				size: "lg"
			}, {
				footer: S(() => [g(o, {
					variant: "solid",
					size: "sm",
					onClick: $t
				}, {
					default: S(() => [...t[37] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [Yt.value ? (_(), p("div", qe, [g(oe, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (_(), d(c, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (_(), p("table", Je, [t[36] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Failed"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(_(!0), p(l, null, y($.value, (e) => (_(), p("tr", { key: e.id }, [
					m("td", { "data-testid": `history-type-${e.id}` }, b(ut(e.type)), 9, Ye),
					m("td", null, [g(a, { tone: ct(e) }, {
						default: S(() => [h(b(st(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", { "data-testid": `history-failed-${e.id}` }, [E(e) ? (_(), d(a, {
						key: 0,
						tone: "warning"
					}, {
						default: S(() => [h(b(E(e)), 1)]),
						_: 2
					}, 1024)) : (_(), p(l, { key: 1 }, [h("—")], 64))], 8, Xe),
					m("td", Ze, b(e.queued_at ?? ""), 1),
					m("td", Qe, b(e.completed_at ?? ""), 1),
					m("td", null, b(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-e790c6c7"]]);
export { C as default };

//# sourceMappingURL=LibrariesPage-jXD0UQXj.js.map