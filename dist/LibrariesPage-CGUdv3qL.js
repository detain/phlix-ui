import { n as e } from "./Icon-CIwTuFLd.js";
import { a as t } from "./plural-DMM7pLFA.js";
import { l as n, t as r, y as i } from "./client-BUSsKK6G.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as te } from "./EmptyState-BAyOxAcK.js";
import { t as a } from "./Button-BuG0GvCa.js";
import { t as o } from "./Badge-A88fI41k.js";
import { t as ne } from "./Switch-ibkXiiN-.js";
import { t as re } from "./Select-Bh_MmT-v.js";
import { t as s } from "./Modal-BDkw7NP1.js";
import { t as ie } from "./Skeleton-rHw-IJtl.js";
import { t as ae } from "./PageHint-BGYg6qRJ.js";
import { t as oe } from "./Menu-Dm56tG4N.js";
import { n as se, t as ce } from "./metadata-sources-BjSBqxoJ.js";
import { n as c, t as le } from "./libraries-BESAWRyW.js";
import { t as ue } from "./helpLinks-B4Y1FteC.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createStaticVNode as de, createTextVNode as h, createVNode as g, defineComponent as _, inject as fe, normalizeStyle as pe, onBeforeUnmount as me, onMounted as he, openBlock as v, ref as y, renderList as b, toDisplayString as x, unref as S, vModelText as ge, watch as _e, withCtx as C, withDirectives as ve, withModifiers as ye } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
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
}, Ye = ["data-testid"], Xe = ["data-testid"], Ze = { class: "admin-libraries__date" }, Qe = { class: "admin-libraries__date" }, $e = 2e3, et = /*#__PURE__*/ e(/* @__PURE__ */ _({
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
		]), et = e, tt = fe("apiBase", ""), nt = u(() => typeof tt == "string" ? tt : tt?.value ?? ""), rt = et.client ?? new r({
			baseUrl: nt.value,
			tokenStore: new n()
		}), w = new le(rt), it = new ce(rt), T = ee(), at = u(() => et.pollIntervalMs ?? $e), ot = u(() => c.map((e) => ({
			value: e,
			label: e
		})));
		function st(e) {
			return e === "completed" || e === "failed";
		}
		function ct(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function lt(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let ut = {
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
		function dt(e) {
			return ut[e] ?? e;
		}
		function E(e) {
			let n = e?.items_failed ?? 0;
			return !Number.isFinite(n) || n <= 0 ? "" : `${t(n, "file", "files")} could not be indexed`;
		}
		function ft(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function pt(e) {
			if (!ft(e) || !e) return 0;
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
		let gt = y([]), _t = y(!0), D = y(null), O = y({}), k = {}, A = /* @__PURE__ */ new Set();
		function vt(e) {
			let t = k[e];
			t !== void 0 && (clearInterval(t), delete k[e]), A.delete(e);
		}
		async function yt(e) {
			try {
				let t = await w.scanStatus(e);
				O.value = {
					...O.value,
					[e]: t
				}, (t === null || st(t.status)) && vt(e);
			} catch {
				vt(e);
			}
		}
		function j(e) {
			k[e] === void 0 && (k[e] = setInterval(() => {
				yt(e);
			}, at.value));
		}
		function bt() {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e], A.add(e);
		}
		function xt() {
			for (let e of A) j(e);
			A.clear();
		}
		function St() {
			document.hidden ? bt() : xt();
		}
		async function M() {
			_t.value = !0, D.value = null;
			try {
				let e = await w.list();
				gt.value = e, Et(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await w.scanStatus(e.id);
						O.value = {
							...O.value,
							[e.id]: t
						}, t !== null && !st(t.status) && j(e.id);
					} catch {}
				}));
			} catch (e) {
				D.value = i(e, "Failed to load libraries."), T.error(D.value);
			} finally {
				_t.value = !1;
			}
		}
		let N = y(!1), P = y(null), F = y(""), I = y(c[0]), L = y(""), R = y(!1), z = y(!0), B = y(!1), Ct = y(!1), wt = u(() => P.value ? "Edit library" : "Add library"), V = y([]), H = y([]), U = y(!1), Tt = y(!1), W = y([]), G = y({}), K = y(!1);
		function Et(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (W.value = t.image_types.available);
		}
		function Dt(e) {
			let t = e?.image_types?.available ?? W.value;
			t.length && (W.value = t);
			let n = e?.image_types?.enabled ?? W.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of W.value) r[e.type] = n.includes(e.type);
			G.value = r, K.value = !1;
		}
		function Ot(e, t) {
			G.value = {
				...G.value,
				[e]: t
			}, K.value = !0;
		}
		let kt = [
			"imdb",
			"tmdb",
			"tvdb"
		], At = u(() => I.value === "music" ? V.value.filter((e) => !kt.includes(e)) : V.value), jt = u(() => H.value.filter((e) => At.value.includes(e)));
		async function Mt() {
			if (!Tt.value) {
				Tt.value = !0;
				try {
					V.value = await it.listSources();
				} catch {
					V.value = [];
				}
			}
		}
		function Nt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[I.value]) ? n[I.value].filter((e) => typeof e == "string") : [];
			H.value = r.length ? r : V.value.slice(), U.value = !1;
		}
		function Pt(e) {
			H.value = e, U.value = !0;
		}
		_e(V, () => {
			N.value && !U.value && H.value.length === 0 && (H.value = V.value.slice());
		});
		function Ft(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function It(e) {
			z.value = !e?.auto_collections || Ft(e.auto_collections.enabled), B.value = !1;
		}
		function Lt(e) {
			z.value = e, B.value = !0;
		}
		function Rt() {
			return L.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function zt() {
			P.value = null, F.value = "", I.value = c[0], L.value = "", R.value = !1, Nt(null), Dt(null), It(null), N.value = !0;
		}
		function Bt(e) {
			P.value = e, F.value = e.name;
			let t = c.find((t) => t === e.type);
			I.value = t ?? c[0], L.value = e.paths?.join("\n") ?? "", R.value = Ft(e.options?.series_per_directory), Nt(e), Dt(e), It(e), N.value = !0;
		}
		function Vt() {
			N.value = !1, P.value = null;
		}
		async function Ht() {
			if (!F.value.trim()) {
				T.error("Name is required.");
				return;
			}
			let e = Rt();
			if (e.length === 0) {
				T.error("Select at least one path.");
				return;
			}
			Ct.value = !0;
			try {
				let t = P.value, n = I.value === "series", r = _.has(I.value);
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
				Vt(), await M();
			} catch (e) {
				T.error(i(e, "Failed to save library."));
			} finally {
				Ct.value = !1;
			}
		}
		let q = y(null);
		async function Ut() {
			let e = q.value;
			if (e) try {
				await w.remove(e.id), T.success("Library deleted."), q.value = null, await M();
			} catch (e) {
				T.error(i(e, "Failed to delete library.")), q.value = null;
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
		async function J(e, t) {
			try {
				let n = await Wt(e, t);
				T.success(n.message || Gt(t, n.job_id));
				let r = O.value[e.id];
				O.value = {
					...O.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, j(e.id), yt(e.id);
			} catch (e) {
				T.error(i(e, "Failed to queue operation."));
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
		}, Y = y(null), X = u(() => Y.value ? Kt[Y.value.op] : null), qt = u(() => Y.value && X.value ? X.value.message.replace("{name}", Y.value.lib.name) : "");
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
		let Q = y(null), $ = y([]), Xt = y(!1), Zt = u(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Qt = u({
			get: () => Q.value !== null,
			set: (e) => {
				e || en();
			}
		});
		async function $t(e) {
			Q.value = e, $.value = [], Xt.value = !0;
			try {
				$.value = await w.scanHistory(e.id);
			} catch (e) {
				T.error(i(e, "Failed to load history."));
			} finally {
				Xt.value = !1;
			}
		}
		function en() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			Mt(), M(), typeof document < "u" && document.addEventListener("visibilitychange", St);
		}), me(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", St);
		}), (e, t) => (v(), p("section", be, [
			m("header", xe, [t[11] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: zt
			}, {
				default: C(() => [...t[10] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			g(ae, {
				links: S(ue).libraries.links,
				details: S(ue).libraries.details
			}, {
				default: C(() => [...t[12] ||= [
					h(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					m("strong", null, "“What do these operations do?”", -1),
					h(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[38] ||= de("<details class=\"admin-libraries__help\" open data-v-134057a8><summary class=\"admin-libraries__help-summary\" data-v-134057a8>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-134057a8><dt data-v-134057a8>Scan</dt><dd data-v-134057a8> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-134057a8>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-134057a8>Match metadata</dt><dd data-v-134057a8> Fetches TMDB/IMDB details and artwork <em data-v-134057a8>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-134057a8>Recheck all metadata</dt><dd data-v-134057a8> Forces a fresh metadata fetch for <em data-v-134057a8>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-134057a8>Rescan</dt><dd data-v-134057a8> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-134057a8>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-134057a8>Prune removed</dt><dd data-v-134057a8> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-134057a8>Regenerate media assets</dt><dd data-v-134057a8> Re-creates the file-based media assets (chapter thumbnails, trickplay sprite, Roku BIF) for the library&#39;s existing items. <strong data-v-134057a8>Idempotent</strong> — firing it while a regeneration is already queued is a no-op success, not an error. </dd><dt data-v-134057a8>Clear metadata</dt><dd data-v-134057a8> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-134057a8>Clear cached artwork</dt><dd data-v-134057a8> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-134057a8>Delete all items</dt><dd data-v-134057a8><strong data-v-134057a8>Destructive.</strong> Removes every item in the library <em data-v-134057a8>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			_t.value ? (v(), p("div", Se, [g(ie, {
				variant: "text",
				lines: 6
			})])) : D.value ? (v(), d(te, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: D.value
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: C(() => [...t[13] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : gt.value.length === 0 ? (v(), d(te, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: zt
				}, {
					default: C(() => [...t[14] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", Ce, [t[20] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(l, null, b(gt.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", null, x(e.type), 1),
				m("td", null, x(e.paths?.length ?? 0) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [
					g(o, { tone: lt(O.value[e.id]) }, {
						default: C(() => [h(x(ct(O.value[e.id])), 1)]),
						_: 2
					}, 1032, ["tone"]),
					O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (v(), p("span", Te, x(O.value[e.id]?.error), 1)) : ft(O.value[e.id]) ? (v(), p("span", {
						key: 1,
						class: "admin-libraries__progress",
						"data-testid": `progress-${e.id}`
					}, [
						m("span", {
							class: "admin-libraries__progress-bar",
							role: "progressbar",
							"aria-valuenow": pt(O.value[e.id]),
							"aria-valuemin": "0",
							"aria-valuemax": "100",
							"aria-label": `Scan progress for ${e.name}`
						}, [m("span", {
							class: "admin-libraries__progress-fill",
							style: pe({ width: pt(O.value[e.id]) + "%" })
						}, null, 4)], 8, De),
						m("span", Oe, x(pt(O.value[e.id])) + "% · " + x(mt(O.value[e.id])), 1),
						ht(O.value[e.id]) ? (v(), p("span", ke, x(ht(O.value[e.id])), 1)) : f("", !0)
					], 8, Ee)) : f("", !0),
					E(O.value[e.id]) ? (v(), p("span", {
						key: 2,
						class: "admin-libraries__failed",
						"data-testid": `failed-${e.id}`,
						role: "status"
					}, [g(o, { tone: "warning" }, {
						default: C(() => [h(x(E(O.value[e.id])), 1)]),
						_: 2
					}, 1024)], 8, Ae)) : f("", !0)
				], 8, we)]),
				m("td", null, [m("div", je, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Bt(e)
					}, {
						default: C(() => [...t[15] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => J(e, "scan")
					}, {
						default: C(() => [...t[16] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => J(e, "metadata")
					}, {
						default: C(() => [...t[17] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(oe, { items: Yt(e) }, {
						default: C(() => [g(a, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: C(() => [...t[18] ||= [h(" More ", -1)]]),
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
						default: C(() => [...t[19] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(s, {
				modelValue: N.value,
				"onUpdate:modelValue": t[4] ||= (e) => N.value = e,
				title: wt.value,
				onClose: Vt
			}, {
				footer: C(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: Vt
				}, {
					default: C(() => [...t[30] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: Ct.value,
					onClick: Ht
				}, {
					default: C(() => [h(x(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: ye(Ht, ["prevent"])
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
						P.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: I.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Pe)) : (v(), d(re, {
							key: 1,
							"model-value": I.value,
							options: ot.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (v(), p("span", Fe, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", Ie, [t[23] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ve(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[ge, L.value]])]),
					I.value === "series" ? (v(), p("div", Le, [g(ne, {
						modelValue: R.value,
						"onUpdate:modelValue": t[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[24] ||= m("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : f("", !0),
					S(_).has(I.value) ? (v(), p("div", Re, [g(ne, {
						"model-value": z.value,
						label: "Automatically generate collections from TMDB box sets",
						"onUpdate:modelValue": Lt
					}, null, 8, ["model-value"]), t[25] ||= m("span", { class: "admin-libraries__hint-text" }, " When on, items that match a TMDB box set (e.g. a trilogy) are grouped into a collection during scanning. Turn it off to skip collection generation for this library. ", -1)])) : f("", !0),
					m("div", ze, [
						t[26] ||= m("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[27] ||= m("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						g(se, {
							"model-value": jt.value,
							available: At.value,
							label: `${I.value} sources`,
							"onUpdate:modelValue": Pt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					W.value.length ? (v(), p("div", Be, [
						t[28] ||= m("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[29] ||= m("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						m("ul", Ve, [(v(!0), p(l, null, b(W.value, (e) => (v(), p("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [m("label", He, [m("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: G.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => Ot(e.type, t.target.checked)
						}, null, 40, Ue), m("span", We, [m("span", Ge, x(e.label), 1), e.providers.length ? (v(), p("span", Ke, x(e.providers.join(", ")), 1)) : f("", !0)])])]))), 128))])
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
				footer: C(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => q.value = null
				}, {
					default: C(() => [...t[33] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "danger",
					size: "sm",
					onClick: Ut
				}, {
					default: C(() => [...t[34] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [m("p", null, [
					t[31] ||= h(" Delete library ", -1),
					m("strong", null, x(q.value?.name), 1),
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
				footer: C(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => Y.value = null
				}, {
					default: C(() => [...t[35] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: X.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Jt
				}, {
					default: C(() => [h(x(X.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: C(() => [m("p", null, x(qt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			g(s, {
				modelValue: Qt.value,
				"onUpdate:modelValue": t[9] ||= (e) => Qt.value = e,
				title: Zt.value,
				size: "lg"
			}, {
				footer: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					onClick: en
				}, {
					default: C(() => [...t[37] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [Xt.value ? (v(), p("div", qe, [g(ie, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (v(), d(te, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", Je, [t[36] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Failed"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(l, null, b($.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", { "data-testid": `history-type-${e.id}` }, x(dt(e.type)), 9, Ye),
					m("td", null, [g(o, { tone: lt(e) }, {
						default: C(() => [h(x(ct(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", { "data-testid": `history-failed-${e.id}` }, [E(e) ? (v(), d(o, {
						key: 0,
						tone: "warning"
					}, {
						default: C(() => [h(x(E(e)), 1)]),
						_: 2
					}, 1024)) : (v(), p(l, { key: 1 }, [h("—")], 64))], 8, Xe),
					m("td", Ze, x(e.queued_at ?? ""), 1),
					m("td", Qe, x(e.completed_at ?? ""), 1),
					m("td", null, x(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-134057a8"]]);
//#endregion
export { et as default };

//# sourceMappingURL=LibrariesPage-CGUdv3qL.js.map