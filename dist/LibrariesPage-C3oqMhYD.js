import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, t as ee } from "./client-BzWwyWKr.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as ne } from "./Badge-B6MgOwKQ.js";
import { t as re } from "./Switch-DyS2L5gX.js";
import { t as ie } from "./Select-Cvp-73pF.js";
import { t as ae } from "./Skeleton-DhQmxeNg.js";
import { t as a } from "./EmptyState-ZlI5t4KT.js";
import { t as oe } from "./PageHint-BoAlFFBN.js";
import { t as se } from "./Menu-DRkKveJV.js";
import { n as ce, t as le } from "./metadata-sources-Dxb7NOl7.js";
import { n as o, t as ue } from "./libraries-D3CNHYm9.js";
import { t as de } from "./helpLinks-BI4oN4Or.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createStaticVNode as fe, createTextVNode as p, createVNode as m, defineComponent as h, inject as pe, normalizeStyle as me, onBeforeUnmount as he, onMounted as ge, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as _e, vModelText as ve, watch as ye, withCtx as b, withDirectives as be, withModifiers as xe } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var Se = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, Ce = { class: "admin-libraries__head" }, we = {
	key: 0,
	class: "admin-libraries__skel"
}, Te = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, Ee = ["data-testid"], De = {
	key: 0,
	class: "admin-libraries__error"
}, Oe = ["data-testid"], ke = ["aria-valuenow", "aria-label"], Ae = { class: "admin-libraries__progress-meta" }, je = {
	key: 0,
	class: "admin-libraries__progress-file"
}, Me = { class: "admin-libraries__actions" }, Ne = { class: "admin-libraries__field" }, Pe = { class: "admin-libraries__field" }, Fe = ["value"], Ie = {
	key: 2,
	class: "admin-libraries__hint-text"
}, Le = { class: "admin-libraries__field" }, Re = {
	key: 0,
	class: "admin-libraries__field"
}, ze = { class: "admin-libraries__field" }, Be = {
	key: 1,
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
}, Ye = { class: "admin-libraries__date" }, Xe = { class: "admin-libraries__date" }, Ze = 2e3, x = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let h = e, x = pe("apiBase", ""), Qe = c(() => typeof x == "string" ? x : x?.value ?? ""), $e = h.client ?? new ee({
			baseUrl: Qe.value,
			tokenStore: new n()
		}), S = new ue($e), et = new le($e), C = te(), tt = c(() => h.pollIntervalMs ?? Ze), nt = c(() => o.map((e) => ({
			value: e,
			label: e
		})));
		function rt(e) {
			return e === "completed" || e === "failed";
		}
		function it(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function at(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function ot(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function w(e) {
			if (!ot(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function st(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function ct(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let T = _([]), E = _(!0), D = _(null), O = _({}), k = {}, A = /* @__PURE__ */ new Set();
		function lt(e) {
			let t = k[e];
			t !== void 0 && (clearInterval(t), delete k[e]), A.delete(e);
		}
		async function ut(e) {
			try {
				let t = await S.scanStatus(e);
				O.value = {
					...O.value,
					[e]: t
				}, (t === null || rt(t.status)) && lt(e);
			} catch {
				lt(e);
			}
		}
		function j(e) {
			k[e] === void 0 && (k[e] = setInterval(() => {
				ut(e);
			}, tt.value));
		}
		function dt() {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e], A.add(e);
		}
		function ft() {
			for (let e of A) j(e);
			A.clear();
		}
		function pt() {
			document.hidden ? dt() : ft();
		}
		async function M() {
			E.value = !0, D.value = null;
			try {
				let e = await S.list();
				T.value = e, gt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await S.scanStatus(e.id);
						O.value = {
							...O.value,
							[e.id]: t
						}, t !== null && !rt(t.status) && j(e.id);
					} catch {}
				}));
			} catch (e) {
				D.value = r(e, "Failed to load libraries."), C.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let N = _(!1), P = _(null), F = _(""), I = _(o[0]), L = _(""), R = _(!1), z = _(!1), mt = c(() => P.value ? "Edit library" : "Add library"), B = _([]), V = _([]), H = _(!1), ht = _(!1), U = _([]), W = _({}), G = _(!1);
		function gt(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (U.value = t.image_types.available);
		}
		function _t(e) {
			let t = e?.image_types?.available ?? U.value;
			t.length && (U.value = t);
			let n = e?.image_types?.enabled ?? U.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of U.value) r[e.type] = n.includes(e.type);
			W.value = r, G.value = !1;
		}
		function vt(e, t) {
			W.value = {
				...W.value,
				[e]: t
			}, G.value = !0;
		}
		let yt = [
			"imdb",
			"tmdb",
			"tvdb"
		], bt = c(() => I.value === "music" ? B.value.filter((e) => !yt.includes(e)) : B.value), xt = c(() => V.value.filter((e) => bt.value.includes(e)));
		async function St() {
			if (!ht.value) {
				ht.value = !0;
				try {
					B.value = await et.listSources();
				} catch {
					B.value = [];
				}
			}
		}
		function Ct(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[I.value]) ? n[I.value].filter((e) => typeof e == "string") : [];
			V.value = r.length ? r : B.value.slice(), H.value = !1;
		}
		function wt(e) {
			V.value = e, H.value = !0;
		}
		ye(B, () => {
			N.value && !H.value && V.value.length === 0 && (V.value = B.value.slice());
		});
		function Tt(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function Et() {
			return L.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function Dt() {
			P.value = null, F.value = "", I.value = o[0], L.value = "", R.value = !1, Ct(null), _t(null), N.value = !0;
		}
		function Ot(e) {
			P.value = e, F.value = e.name;
			let t = o.find((t) => t === e.type);
			I.value = t ?? o[0], L.value = e.paths.join("\n"), R.value = Tt(e.options?.series_per_directory), Ct(e), _t(e), N.value = !0;
		}
		function K() {
			N.value = !1, P.value = null;
		}
		async function kt() {
			if (!F.value.trim()) {
				C.error("Name is required.");
				return;
			}
			let e = Et();
			if (e.length === 0) {
				C.error("Select at least one path.");
				return;
			}
			z.value = !0;
			try {
				let t = P.value, n = I.value === "series";
				if (t) {
					let r = {
						name: F.value,
						paths: e
					};
					n && (r.series_per_directory = R.value), H.value && (r.metadata_priority = V.value.length ? { [I.value]: V.value } : null), G.value && (r.image_types = { ...W.value }), await S.update(t.id, r), C.success("Library updated.");
				} else {
					let t = {
						name: F.value,
						type: I.value,
						paths: e
					};
					n && (t.series_per_directory = R.value), H.value && (t.metadata_priority = V.value.length ? { [I.value]: V.value } : null), G.value && (t.image_types = { ...W.value });
					let r = await S.create(t);
					C.success(r.message || "Library created.");
				}
				K(), await M();
			} catch (e) {
				C.error(r(e, "Failed to save library."));
			} finally {
				z.value = !1;
			}
		}
		let q = _(null);
		async function At() {
			let e = q.value;
			if (e) try {
				await S.remove(e.id), C.success("Library deleted."), q.value = null, await M();
			} catch (e) {
				C.error(r(e, "Failed to delete library.")), q.value = null;
			}
		}
		function jt(e, t) {
			switch (t) {
				case "scan": return S.scan(e.id);
				case "rescan": return S.rescan(e.id);
				case "metadata": return S.matchMetadata(e.id);
				case "refresh-metadata": return S.refreshMetadata(e.id);
				case "prune": return S.prune(e.id);
				case "clear-metadata": return S.clearMetadata(e.id);
				case "clear-artwork": return S.clearArtwork(e.id);
				case "delete-all": return S.deleteAll(e.id);
			}
		}
		function Mt(e, t) {
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
		async function J(e, t) {
			try {
				let n = await jt(e, t);
				C.success(n.message || Mt(t, n.job_id));
				let r = O.value[e.id];
				O.value = {
					...O.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, j(e.id), ut(e.id);
			} catch (e) {
				C.error(r(e, "Failed to queue operation."));
			}
		}
		let Nt = {
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
		}, Y = _(null), X = c(() => Y.value ? Nt[Y.value.op] : null), Pt = c(() => Y.value && X.value ? X.value.message.replace("{name}", Y.value.lib.name) : "");
		function Z(e, t) {
			Y.value = {
				lib: e,
				op: t
			};
		}
		async function Ft() {
			let e = Y.value;
			e && (Y.value = null, await J(e.lib, e.op));
		}
		function It(e) {
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
					onClick: () => void J(e, "prune")
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
		let Q = _(null), $ = _([]), Lt = _(!1), Rt = c(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), zt = c({
			get: () => Q.value !== null,
			set: (e) => {
				e || Vt();
			}
		});
		async function Bt(e) {
			Q.value = e, $.value = [], Lt.value = !0;
			try {
				$.value = await S.scanHistory(e.id);
			} catch (e) {
				C.error(r(e, "Failed to load history."));
			} finally {
				Lt.value = !1;
			}
		}
		function Vt() {
			Q.value = null, $.value = [];
		}
		return ge(() => {
			St(), M(), typeof document < "u" && document.addEventListener("visibilitychange", pt);
		}), he(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", pt);
		}), (e, n) => (g(), d("section", Se, [
			f("header", Ce, [n[11] ||= f("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Dt
			}, {
				default: b(() => [...n[10] ||= [p("Add library", -1)]]),
				_: 1
			})]),
			m(oe, {
				links: _e(de).libraries.links,
				details: _e(de).libraries.details
			}, {
				default: b(() => [...n[12] ||= [
					p(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					f("strong", null, "“What do these operations do?”", -1),
					p(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			n[37] ||= fe("<details class=\"admin-libraries__help\" open data-v-8dfe5768><summary class=\"admin-libraries__help-summary\" data-v-8dfe5768>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-8dfe5768><dt data-v-8dfe5768>Scan</dt><dd data-v-8dfe5768> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-8dfe5768>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-8dfe5768>Match metadata</dt><dd data-v-8dfe5768> Fetches TMDB/IMDB details and artwork <em data-v-8dfe5768>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-8dfe5768>Recheck all metadata</dt><dd data-v-8dfe5768> Forces a fresh metadata fetch for <em data-v-8dfe5768>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-8dfe5768>Rescan</dt><dd data-v-8dfe5768> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-8dfe5768>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-8dfe5768>Prune removed</dt><dd data-v-8dfe5768> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-8dfe5768>Clear metadata</dt><dd data-v-8dfe5768> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-8dfe5768>Clear cached artwork</dt><dd data-v-8dfe5768> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-8dfe5768>Delete all items</dt><dd data-v-8dfe5768><strong data-v-8dfe5768>Destructive.</strong> Removes every item in the library <em data-v-8dfe5768>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			E.value ? (g(), d("div", we, [m(ae, {
				variant: "text",
				lines: 6
			})])) : D.value ? (g(), l(a, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: D.value
			}, {
				actions: b(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: b(() => [...n[13] ||= [p("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (g(), l(a, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: b(() => [m(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Dt
				}, {
					default: b(() => [...n[14] ||= [p("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", Te, [n[20] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Name"),
				f("th", { scope: "col" }, "Type"),
				f("th", { scope: "col" }, "Paths"),
				f("th", { scope: "col" }, "Status"),
				f("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(s, null, v(T.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, y(e.name), 1),
				f("td", null, y(e.type), 1),
				f("td", null, y(e.paths.length) + " paths", 1),
				f("td", null, [f("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [m(ne, { tone: at(O.value[e.id]) }, {
					default: b(() => [p(y(it(O.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (g(), d("span", De, y(O.value[e.id]?.error), 1)) : ot(O.value[e.id]) ? (g(), d("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					f("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": w(O.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [f("span", {
						class: "admin-libraries__progress-fill",
						style: me({ width: w(O.value[e.id]) + "%" })
					}, null, 4)], 8, ke),
					f("span", Ae, y(w(O.value[e.id])) + "% · " + y(st(O.value[e.id])), 1),
					ct(O.value[e.id]) ? (g(), d("span", je, y(ct(O.value[e.id])), 1)) : u("", !0)
				], 8, Oe)) : u("", !0)], 8, Ee)]),
				f("td", null, [f("div", Me, [
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ot(e)
					}, {
						default: b(() => [...n[15] ||= [p(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => J(e, "scan")
					}, {
						default: b(() => [...n[16] ||= [p(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => J(e, "metadata")
					}, {
						default: b(() => [...n[17] ||= [p(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(se, { items: It(e) }, {
						default: b(() => [m(i, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: b(() => [...n[18] ||= [p(" More ", -1)]]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 2
					}, 1032, ["items"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Bt(e)
					}, {
						default: b(() => [...n[19] ||= [p(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(t, {
				modelValue: N.value,
				"onUpdate:modelValue": n[4] ||= (e) => N.value = e,
				title: mt.value,
				onClose: K
			}, {
				footer: b(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: b(() => [...n[29] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: z.value,
					onClick: kt
				}, {
					default: b(() => [p(y(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-libraries__form",
					onSubmit: xe(kt, ["prevent"])
				}, [
					f("label", Ne, [n[21] ||= f("span", { class: "admin-libraries__label" }, "Name", -1), be(f("input", {
						"onUpdate:modelValue": n[0] ||= (e) => F.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[ve, F.value]])]),
					f("div", Pe, [
						n[22] ||= f("span", { class: "admin-libraries__label" }, "Type", -1),
						P.value ? (g(), d("input", {
							key: 0,
							class: "admin-libraries__input",
							value: I.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Fe)) : (g(), l(ie, {
							key: 1,
							"model-value": I.value,
							options: nt.value,
							label: "Type",
							"onUpdate:modelValue": n[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (g(), d("span", Ie, "Type cannot be changed.")) : u("", !0)
					]),
					f("label", Le, [n[23] ||= f("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), be(f("textarea", {
						"onUpdate:modelValue": n[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[ve, L.value]])]),
					I.value === "series" ? (g(), d("div", Re, [m(re, {
						modelValue: R.value,
						"onUpdate:modelValue": n[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), n[24] ||= f("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : u("", !0),
					f("div", ze, [
						n[25] ||= f("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						n[26] ||= f("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						m(ce, {
							"model-value": xt.value,
							available: bt.value,
							label: `${I.value} sources`,
							"onUpdate:modelValue": wt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					U.value.length ? (g(), d("div", Be, [
						n[27] ||= f("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						n[28] ||= f("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						f("ul", Ve, [(g(!0), d(s, null, v(U.value, (e) => (g(), d("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [f("label", He, [f("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: W.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => vt(e.type, t.target.checked)
						}, null, 40, Ue), f("span", We, [f("span", Ge, y(e.label), 1), e.providers.length ? (g(), d("span", Ke, y(e.providers.join(", ")), 1)) : u("", !0)])])]))), 128))])
					])) : u("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			m(t, {
				"model-value": q.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => q.value = null
			}, {
				footer: b(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => q.value = null
				}, {
					default: b(() => [...n[32] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: At
				}, {
					default: b(() => [...n[33] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					n[30] ||= p(" Delete library ", -1),
					f("strong", null, y(q.value?.name), 1),
					n[31] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			m(t, {
				"model-value": Y.value !== null,
				title: X.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": n[8] ||= (e) => Y.value = null
			}, {
				footer: b(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: n[7] ||= (e) => Y.value = null
				}, {
					default: b(() => [...n[34] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: X.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Ft
				}, {
					default: b(() => [p(y(X.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: b(() => [f("p", null, y(Pt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(t, {
				modelValue: zt.value,
				"onUpdate:modelValue": n[9] ||= (e) => zt.value = e,
				title: Rt.value,
				size: "lg"
			}, {
				footer: b(() => [m(i, {
					variant: "solid",
					size: "sm",
					onClick: Vt
				}, {
					default: b(() => [...n[36] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [Lt.value ? (g(), d("div", qe, [m(ae, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (g(), l(a, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (g(), d("table", Je, [n[35] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Status"),
					f("th", { scope: "col" }, "Queued"),
					f("th", { scope: "col" }, "Completed"),
					f("th", { scope: "col" }, "Error")
				])], -1), f("tbody", null, [(g(!0), d(s, null, v($.value, (e) => (g(), d("tr", { key: e.id }, [
					f("td", null, y(e.type), 1),
					f("td", null, [m(ne, { tone: at(e) }, {
						default: b(() => [p(y(it(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					f("td", Ye, y(e.queued_at ?? ""), 1),
					f("td", Xe, y(e.completed_at ?? ""), 1),
					f("td", null, y(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-8dfe5768"]]);
//#endregion
export { x as default };

//# sourceMappingURL=LibrariesPage-C3oqMhYD.js.map