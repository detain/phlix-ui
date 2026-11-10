import { T as e, t } from "./client-CdNyEcUJ.js";
import { n, t as r } from "./libraries-7ba94Q3b.js";
import { a as i } from "./plural-B3O2rVPV.js";
import { n as ee, t as te } from "./metadata-sources-DAal3kyA.js";
import { t as ne } from "./useToastStore-CxO_ppM8.js";
import { t as a } from "./Badge-D7vacFbh.js";
import { t as o } from "./Button-Dfl4y6vO.js";
import { t as re } from "./Menu-D1MRZDZu.js";
import { t as s } from "./Modal-DZDXQwbG.js";
import { t as ie } from "./Select-r5PX08M4.js";
import { t as ae } from "./Switch-C607L4Vu.js";
import { t as oe } from "./Skeleton-DDhrDRE7.js";
import { t as c } from "./EmptyState-DjfWh3kt.js";
import { t as se } from "./PageHint-C2jY1TZi.js";
import { t as ce } from "./helpLinks-3xhEuW25.js";
import { n as le } from "./Icon-55iG1rR7.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createStaticVNode as ue, createTextVNode as h, createVNode as g, defineComponent as de, inject as fe, normalizeStyle as pe, onBeforeUnmount as me, onMounted as he, openBlock as _, ref as v, renderList as ge, toDisplayString as y, unref as b, vModelText as _e, watch as ve, withCtx as x, withDirectives as ye, withModifiers as be } from "vue";
// src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
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
}, Xe = ["data-testid"], Ze = ["data-testid"], Qe = { class: "admin-libraries__date" }, $e = { class: "admin-libraries__date" }, et = 2e3, S = /*#__PURE__*/ le(/* @__PURE__ */ de({
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
		]), S = le, C = fe("apiBase", ""), tt = u(() => typeof C == "string" ? C : C?.value ?? ""), nt = S.client ?? new t({ baseUrl: tt.value }), w = new r(nt), rt = new te(nt), T = ne(), it = u(() => S.pollIntervalMs ?? et), at = u(() => n.map((e) => ({
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
			} catch (t) {
				D.value = e(t, "Failed to load libraries."), T.error(D.value);
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
		ve(V, () => {
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
			let t = Lt();
			if (t.length === 0) T.error("Select at least one path.");
			else {
				St.value = !0;
				try {
					let e = P.value, n = I.value === "series", r = de.has(I.value);
					if (e) {
						let i = {
							name: F.value,
							paths: t
						};
						n && (i.series_per_directory = R.value), U.value && (i.metadata_priority = H.value.length ? { [I.value]: H.value } : null), K.value && (i.image_types = { ...G.value }), r && B.value && (i.autoCollections = z.value), await w.update(e.id, i), T.success("Library updated.");
					} else {
						let e = {
							name: F.value,
							type: I.value,
							paths: t
						};
						n && (e.series_per_directory = R.value), U.value && (e.metadata_priority = H.value.length ? { [I.value]: H.value } : null), K.value && (e.image_types = { ...G.value }), r && B.value && (e.autoCollections = z.value);
						let i = await w.create(e);
						T.success(i.message || "Library created.");
					}
					Bt(), await M();
				} catch (t) {
					T.error(e(t, "Failed to save library."));
				} finally {
					St.value = !1;
				}
			}
		}
		let q = v(null), Ht = u(() => {
			let e = q.value?.item_count;
			return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
		});
		async function Ut() {
			let t = q.value;
			if (t) try {
				await w.remove(t.id), T.success("Library deleted."), q.value = null, await M();
			} catch (t) {
				T.error(e(t, "Failed to delete library.")), q.value = null;
			}
		}
		function Wt(e, t) {
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
		function Gt(e, t) {
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
		async function J(t, n) {
			try {
				let e = await Wt(t, n);
				T.success(e.message || Gt(n, e.job_id));
				let r = O.value[t.id];
				O.value = {
					...O.value,
					[t.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, j(t.id), vt(t.id);
			} catch (t) {
				T.error(e(t, "Failed to queue operation."));
			}
		}
		let Kt = {
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
		}, Y = v(null), X = u(() => Y.value ? Kt[Y.value.op] : null), qt = u(() => Y.value && X.value ? X.value.message.replace("{name}", Y.value.lib.name) : "");
		function Z(e, t) {
			Y.value = {
				lib: e,
				op: t
			};
		}
		async function Jt() {
			let e = Y.value;
			e && (Y.value = null, await J(e.lib, e.op));
		}
		function Yt(e) {
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
		let Q = v(null), $ = v([]), Xt = v(!1), Zt = u(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Qt = u({
			get: () => Q.value !== null,
			set: (e) => {
				e || en();
			}
		});
		async function $t(t) {
			Q.value = t, $.value = [], Xt.value = !0;
			try {
				$.value = await w.scanHistory(t.id);
			} catch (t) {
				T.error(e(t, "Failed to load history."));
			} finally {
				Xt.value = !1;
			}
		}
		function en() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			jt(), M(), typeof document < "u" && document.addEventListener("visibilitychange", xt);
		}), me(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", xt);
		}), (e, t) => (_(), p("section", xe, [
			m("header", Se, [t[11] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Rt
			}, {
				default: x(() => [...t[10] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			g(se, {
				links: b(ce).libraries.links,
				details: b(ce).libraries.details
			}, {
				default: x(() => [...t[12] ||= [
					h(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					m("strong", null, "“What do these operations do?”", -1),
					h(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[39] ||= ue("<details class=\"admin-libraries__help\" open data-v-c998b860><summary class=\"admin-libraries__help-summary\" data-v-c998b860>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-c998b860><dt data-v-c998b860>Scan</dt><dd data-v-c998b860> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-c998b860>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-c998b860>Match metadata</dt><dd data-v-c998b860> Fetches TMDB/IMDB details and artwork <em data-v-c998b860>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-c998b860>Recheck all metadata</dt><dd data-v-c998b860> Forces a fresh metadata fetch for <em data-v-c998b860>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-c998b860>Rescan</dt><dd data-v-c998b860> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-c998b860>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-c998b860>Prune removed</dt><dd data-v-c998b860> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-c998b860>Regenerate media assets</dt><dd data-v-c998b860> Re-creates the file-based media assets (chapter thumbnails, trickplay sprite, Roku BIF) for the library’s existing items. <strong data-v-c998b860>Idempotent</strong> — firing it while a regeneration is already queued is a no-op success, not an error. </dd><dt data-v-c998b860>Clear metadata</dt><dd data-v-c998b860> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-c998b860>Clear cached artwork</dt><dd data-v-c998b860> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-c998b860>Delete all items</dt><dd data-v-c998b860><strong data-v-c998b860>Destructive.</strong> Removes every item in the library <em data-v-c998b860>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			gt.value ? (_(), p("div", Ce, [g(oe, {
				variant: "text",
				lines: 6
			})])) : D.value ? (_(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load libraries",
				description: D.value
			}, {
				actions: x(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: x(() => [...t[13] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : ht.value.length === 0 ? (_(), d(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: x(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Rt
				}, {
					default: x(() => [...t[14] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), p("table", we, [t[20] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(_(!0), p(l, null, ge(ht.value, (e) => (_(), p("tr", { key: e.id }, [
				m("td", null, y(e.name), 1),
				m("td", null, y(e.type), 1),
				m("td", null, y(e.paths?.length ?? 0) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [
					g(a, { tone: ct(O.value[e.id]) }, {
						default: x(() => [h(y(st(O.value[e.id])), 1)]),
						_: 2
					}, 1032, ["tone"]),
					O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (_(), p("span", Ee, y(O.value[e.id]?.error), 1)) : dt(O.value[e.id]) ? (_(), p("span", {
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
						m("span", ke, y(ft(O.value[e.id])) + "% · " + y(pt(O.value[e.id])), 1),
						mt(O.value[e.id]) ? (_(), p("span", Ae, y(mt(O.value[e.id])), 1)) : f("", !0)
					], 8, De)) : f("", !0),
					E(O.value[e.id]) ? (_(), p("span", {
						key: 2,
						class: "admin-libraries__failed",
						"data-testid": `failed-${e.id}`,
						role: "status"
					}, [g(a, { tone: "warning" }, {
						default: x(() => [h(y(E(O.value[e.id])), 1)]),
						_: 2
					}, 1024)], 8, je)) : f("", !0)
				], 8, Te)]),
				m("td", null, [m("div", Me, [
					g(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => zt(e)
					}, {
						default: x(() => [...t[15] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => J(e, "scan")
					}, {
						default: x(() => [...t[16] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => J(e, "metadata")
					}, {
						default: x(() => [...t[17] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(re, { items: Yt(e) }, {
						default: x(() => [g(o, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: x(() => [...t[18] ||= [h(" More ", -1)]]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 2
					}, 1032, ["items"]),
					g(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => $t(e)
					}, {
						default: x(() => [...t[19] ||= [h(" History ", -1)]]),
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
				footer: x(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: Bt
				}, {
					default: x(() => [...t[30] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: St.value,
					onClick: Vt
				}, {
					default: x(() => [h(y(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [m("form", {
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
						P.value ? (_(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: I.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Fe)) : (_(), d(ie, {
							key: 1,
							"model-value": I.value,
							options: at.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (_(), p("span", Ie, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", Le, [t[23] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ye(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[_e, L.value]])]),
					I.value === "series" ? (_(), p("div", Re, [g(ae, {
						modelValue: R.value,
						"onUpdate:modelValue": t[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[24] ||= m("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : f("", !0),
					b(de).has(I.value) ? (_(), p("div", ze, [g(ae, {
						"model-value": z.value,
						label: "Automatically generate collections from TMDB box sets",
						"onUpdate:modelValue": It
					}, null, 8, ["model-value"]), t[25] ||= m("span", { class: "admin-libraries__hint-text" }, " When on, items that match a TMDB box set (e.g. a trilogy) are grouped into a collection during scanning. Turn it off to skip collection generation for this library. ", -1)])) : f("", !0),
					m("div", Be, [
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
					W.value.length ? (_(), p("div", Ve, [
						t[28] ||= m("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[29] ||= m("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						m("ul", He, [(_(!0), p(l, null, ge(W.value, (e) => (_(), p("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [m("label", Ue, [m("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: G.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => Dt(e.type, t.target.checked)
						}, null, 40, We), m("span", Ge, [m("span", Ke, y(e.label), 1), e.providers.length ? (_(), p("span", qe, y(e.providers.join(", ")), 1)) : f("", !0)])])]))), 128))])
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
				footer: x(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => q.value = null
				}, {
					default: x(() => [...t[34] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "danger",
					size: "sm",
					onClick: Ut
				}, {
					default: x(() => [...t[35] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [m("p", null, [
					t[31] ||= h(" Delete library ", -1),
					m("strong", null, y(q.value?.name), 1),
					t[32] ||= h(),
					Ht.value === null ? (_(), p(l, { key: 1 }, [h("and every item it contains")], 64)) : (_(), p(l, { key: 0 }, [h("and all " + y(Ht.value?.toLocaleString()) + " of its items", 1)], 64)),
					t[33] ||= h(" — including all watch progress, favorites and ratings? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(s, {
				"model-value": Y.value !== null,
				title: X.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => Y.value = null
			}, {
				footer: x(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => Y.value = null
				}, {
					default: x(() => [...t[36] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: X.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Jt
				}, {
					default: x(() => [h(y(X.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: x(() => [m("p", null, y(qt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			g(s, {
				modelValue: Qt.value,
				"onUpdate:modelValue": t[9] ||= (e) => Qt.value = e,
				title: Zt.value,
				size: "lg"
			}, {
				footer: x(() => [g(o, {
					variant: "solid",
					size: "sm",
					onClick: en
				}, {
					default: x(() => [...t[38] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: x(() => [Xt.value ? (_(), p("div", Je, [g(oe, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (_(), d(c, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (_(), p("table", Ye, [t[37] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Failed"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(_(!0), p(l, null, ge($.value, (e) => (_(), p("tr", { key: e.id }, [
					m("td", { "data-testid": `history-type-${e.id}` }, y(ut(e.type)), 9, Xe),
					m("td", null, [g(a, { tone: ct(e) }, {
						default: x(() => [h(y(st(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", { "data-testid": `history-failed-${e.id}` }, [E(e) ? (_(), d(a, {
						key: 0,
						tone: "warning"
					}, {
						default: x(() => [h(y(E(e)), 1)]),
						_: 2
					}, 1024)) : (_(), p(l, { key: 1 }, [h("—")], 64))], 8, Ze),
					m("td", Qe, y(e.queued_at ?? ""), 1),
					m("td", $e, y(e.completed_at ?? ""), 1),
					m("td", null, y(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-c998b860"]]);
export { S as default };

//# sourceMappingURL=LibrariesPage-BOpOWl98.js.map