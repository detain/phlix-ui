import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { l as t, p as n, t as r } from "./client-COHWZ2KC.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DuTfRWnu.js";
import { t as ee } from "./Badge-C8wuGrO0.js";
import { t as te } from "./Switch-DyS2L5gX.js";
import { t as ne } from "./Select-D5GWWuWl.js";
import { t as o } from "./Modal-BUR3rht6.js";
import { t as re } from "./Skeleton-DhQmxeNg.js";
import { t as ie } from "./EmptyState-DERkIIRd.js";
import { t as ae } from "./PageHint-DVe81aMu.js";
import { t as oe } from "./Menu-BPCGwEn4.js";
import { n as se, t as ce } from "./metadata-sources-BGNXlELQ.js";
import { n as s, t as le } from "./libraries-D3CNHYm9.js";
import { t as ue } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createStaticVNode as de, createTextVNode as m, createVNode as h, defineComponent as fe, inject as pe, normalizeStyle as me, onBeforeUnmount as he, onMounted as ge, openBlock as g, ref as _, renderList as v, toDisplayString as y, unref as _e, vModelText as ve, watch as ye, withCtx as b, withDirectives as be, withModifiers as xe } from "vue";
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
}, Xe = { class: "admin-libraries__date" }, Ze = { class: "admin-libraries__date" }, Qe = 2e3, x = /*#__PURE__*/ e(/* @__PURE__ */ fe({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let fe = e, x = pe("apiBase", ""), $e = l(() => typeof x == "string" ? x : x?.value ?? ""), et = fe.client ?? new r({
			baseUrl: $e.value,
			tokenStore: new t()
		}), S = new le(et), tt = new ce(et), C = i(), nt = l(() => fe.pollIntervalMs ?? Qe), rt = l(() => s.map((e) => ({
			value: e,
			label: e
		})));
		function it(e) {
			return e === "completed" || e === "failed";
		}
		function at(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function ot(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function st(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function w(e) {
			if (!st(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function ct(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function lt(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let T = _([]), E = _(!0), D = _(null), O = _({}), k = {}, A = /* @__PURE__ */ new Set();
		function ut(e) {
			let t = k[e];
			t !== void 0 && (clearInterval(t), delete k[e]), A.delete(e);
		}
		async function dt(e) {
			try {
				let t = await S.scanStatus(e);
				O.value = {
					...O.value,
					[e]: t
				}, (t === null || it(t.status)) && ut(e);
			} catch {
				ut(e);
			}
		}
		function ft(e) {
			k[e] === void 0 && (k[e] = setInterval(() => {
				dt(e);
			}, nt.value));
		}
		function pt() {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e], A.add(e);
		}
		function mt() {
			for (let e of A) ft(e);
			A.clear();
		}
		function ht() {
			document.hidden ? pt() : mt();
		}
		async function j() {
			E.value = !0, D.value = null;
			try {
				let e = await S.list();
				T.value = e, vt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await S.scanStatus(e.id);
						O.value = {
							...O.value,
							[e.id]: t
						}, t !== null && !it(t.status) && ft(e.id);
					} catch {}
				}));
			} catch (e) {
				D.value = n(e, "Failed to load libraries."), C.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let M = _(!1), N = _(null), P = _(""), F = _(s[0]), I = _(""), L = _(!1), R = _(!0), z = _(!1), B = _(!1), gt = l(() => N.value ? "Edit library" : "Add library"), V = _([]), H = _([]), U = _(!1), _t = _(!1), W = _([]), G = _({}), K = _(!1);
		function vt(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (W.value = t.image_types.available);
		}
		function yt(e) {
			let t = e?.image_types?.available ?? W.value;
			t.length && (W.value = t);
			let n = e?.image_types?.enabled ?? W.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of W.value) r[e.type] = n.includes(e.type);
			G.value = r, K.value = !1;
		}
		function bt(e, t) {
			G.value = {
				...G.value,
				[e]: t
			}, K.value = !0;
		}
		let xt = [
			"imdb",
			"tmdb",
			"tvdb"
		], St = l(() => F.value === "music" ? V.value.filter((e) => !xt.includes(e)) : V.value), Ct = l(() => H.value.filter((e) => St.value.includes(e)));
		async function wt() {
			if (!_t.value) {
				_t.value = !0;
				try {
					V.value = await tt.listSources();
				} catch {
					V.value = [];
				}
			}
		}
		function Tt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[F.value]) ? n[F.value].filter((e) => typeof e == "string") : [];
			H.value = r.length ? r : V.value.slice(), U.value = !1;
		}
		function Et(e) {
			H.value = e, U.value = !0;
		}
		ye(V, () => {
			M.value && !U.value && H.value.length === 0 && (H.value = V.value.slice());
		});
		function Dt(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function Ot(e) {
			R.value = !e?.auto_collections || Dt(e.auto_collections.enabled), z.value = !1;
		}
		function kt(e) {
			R.value = e, z.value = !0;
		}
		function At() {
			return I.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function jt() {
			N.value = null, P.value = "", F.value = s[0], I.value = "", L.value = !1, Tt(null), yt(null), Ot(null), M.value = !0;
		}
		function Mt(e) {
			N.value = e, P.value = e.name;
			let t = s.find((t) => t === e.type);
			F.value = t ?? s[0], I.value = e.paths.join("\n"), L.value = Dt(e.options?.series_per_directory), Tt(e), yt(e), Ot(e), M.value = !0;
		}
		function q() {
			M.value = !1, N.value = null;
		}
		async function Nt() {
			if (!P.value.trim()) {
				C.error("Name is required.");
				return;
			}
			let e = At();
			if (e.length === 0) {
				C.error("Select at least one path.");
				return;
			}
			B.value = !0;
			try {
				let t = N.value, n = F.value === "series", r = F.value === "movie";
				if (t) {
					let i = {
						name: P.value,
						paths: e
					};
					n && (i.series_per_directory = L.value), U.value && (i.metadata_priority = H.value.length ? { [F.value]: H.value } : null), K.value && (i.image_types = { ...G.value }), r && z.value && (i.autoCollections = R.value), await S.update(t.id, i), C.success("Library updated.");
				} else {
					let t = {
						name: P.value,
						type: F.value,
						paths: e
					};
					n && (t.series_per_directory = L.value), U.value && (t.metadata_priority = H.value.length ? { [F.value]: H.value } : null), K.value && (t.image_types = { ...G.value }), r && z.value && (t.autoCollections = R.value);
					let i = await S.create(t);
					C.success(i.message || "Library created.");
				}
				q(), await j();
			} catch (e) {
				C.error(n(e, "Failed to save library."));
			} finally {
				B.value = !1;
			}
		}
		let J = _(null);
		async function Pt() {
			let e = J.value;
			if (e) try {
				await S.remove(e.id), C.success("Library deleted."), J.value = null, await j();
			} catch (e) {
				C.error(n(e, "Failed to delete library.")), J.value = null;
			}
		}
		function Ft(e, t) {
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
		function It(e, t) {
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
				let n = await Ft(e, t);
				C.success(n.message || It(t, n.job_id));
				let r = O.value[e.id];
				O.value = {
					...O.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, ft(e.id), dt(e.id);
			} catch (e) {
				C.error(n(e, "Failed to queue operation."));
			}
		}
		let Lt = {
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
		}, X = _(null), Z = l(() => X.value ? Lt[X.value.op] : null), Rt = l(() => X.value && Z.value ? Z.value.message.replace("{name}", X.value.lib.name) : "");
		function zt(e, t) {
			X.value = {
				lib: e,
				op: t
			};
		}
		async function Bt() {
			let e = X.value;
			e && (X.value = null, await Y(e.lib, e.op));
		}
		function Vt(e) {
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
					onClick: () => zt(e, "clear-metadata")
				},
				{
					label: "Clear cached artwork",
					onClick: () => zt(e, "clear-artwork")
				},
				{
					label: "Delete all items",
					danger: !0,
					onClick: () => zt(e, "delete-all")
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
		let Q = _(null), $ = _([]), Ht = _(!1), Ut = l(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Wt = l({
			get: () => Q.value !== null,
			set: (e) => {
				e || Kt();
			}
		});
		async function Gt(e) {
			Q.value = e, $.value = [], Ht.value = !0;
			try {
				$.value = await S.scanHistory(e.id);
			} catch (e) {
				C.error(n(e, "Failed to load history."));
			} finally {
				Ht.value = !1;
			}
		}
		function Kt() {
			Q.value = null, $.value = [];
		}
		return ge(() => {
			wt(), j(), typeof document < "u" && document.addEventListener("visibilitychange", ht);
		}), he(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", ht);
		}), (e, t) => (g(), f("section", Se, [
			p("header", Ce, [t[11] ||= p("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: jt
			}, {
				default: b(() => [...t[10] ||= [m("Add library", -1)]]),
				_: 1
			})]),
			h(ae, {
				links: _e(ue).libraries.links,
				details: _e(ue).libraries.details
			}, {
				default: b(() => [...t[12] ||= [
					m(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					p("strong", null, "“What do these operations do?”", -1),
					m(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[38] ||= de("<details class=\"admin-libraries__help\" open data-v-9de8dc1f><summary class=\"admin-libraries__help-summary\" data-v-9de8dc1f>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-9de8dc1f><dt data-v-9de8dc1f>Scan</dt><dd data-v-9de8dc1f> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-9de8dc1f>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-9de8dc1f>Match metadata</dt><dd data-v-9de8dc1f> Fetches TMDB/IMDB details and artwork <em data-v-9de8dc1f>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-9de8dc1f>Recheck all metadata</dt><dd data-v-9de8dc1f> Forces a fresh metadata fetch for <em data-v-9de8dc1f>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-9de8dc1f>Rescan</dt><dd data-v-9de8dc1f> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-9de8dc1f>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-9de8dc1f>Prune removed</dt><dd data-v-9de8dc1f> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-9de8dc1f>Clear metadata</dt><dd data-v-9de8dc1f> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-9de8dc1f>Clear cached artwork</dt><dd data-v-9de8dc1f> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-9de8dc1f>Delete all items</dt><dd data-v-9de8dc1f><strong data-v-9de8dc1f>Destructive.</strong> Removes every item in the library <em data-v-9de8dc1f>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			E.value ? (g(), f("div", we, [h(re, {
				variant: "text",
				lines: 6
			})])) : D.value ? (g(), u(ie, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: D.value
			}, {
				actions: b(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: j
				}, {
					default: b(() => [...t[13] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (g(), u(ie, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: b(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: jt
				}, {
					default: b(() => [...t[14] ||= [m("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), f("table", Te, [t[20] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Type"),
				p("th", { scope: "col" }, "Paths"),
				p("th", { scope: "col" }, "Status"),
				p("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(g(!0), f(c, null, v(T.value, (e) => (g(), f("tr", { key: e.id }, [
				p("td", null, y(e.name), 1),
				p("td", null, y(e.type), 1),
				p("td", null, y(e.paths.length) + " paths", 1),
				p("td", null, [p("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [h(ee, { tone: ot(O.value[e.id]) }, {
					default: b(() => [m(y(at(O.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (g(), f("span", De, y(O.value[e.id]?.error), 1)) : st(O.value[e.id]) ? (g(), f("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					p("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": w(O.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [p("span", {
						class: "admin-libraries__progress-fill",
						style: me({ width: w(O.value[e.id]) + "%" })
					}, null, 4)], 8, ke),
					p("span", Ae, y(w(O.value[e.id])) + "% · " + y(ct(O.value[e.id])), 1),
					lt(O.value[e.id]) ? (g(), f("span", je, y(lt(O.value[e.id])), 1)) : d("", !0)
				], 8, Oe)) : d("", !0)], 8, Ee)]),
				p("td", null, [p("div", Me, [
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Mt(e)
					}, {
						default: b(() => [...t[15] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: b(() => [...t[16] ||= [m(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: b(() => [...t[17] ||= [m(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(oe, { items: Vt(e) }, {
						default: b(() => [h(a, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: b(() => [...t[18] ||= [m(" More ", -1)]]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 2
					}, 1032, ["items"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Gt(e)
					}, {
						default: b(() => [...t[19] ||= [m(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(o, {
				modelValue: M.value,
				"onUpdate:modelValue": t[4] ||= (e) => M.value = e,
				title: gt.value,
				onClose: q
			}, {
				footer: b(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: b(() => [...t[30] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: B.value,
					onClick: Nt
				}, {
					default: b(() => [m(y(N.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-libraries__form",
					onSubmit: xe(Nt, ["prevent"])
				}, [
					p("label", Ne, [t[21] ||= p("span", { class: "admin-libraries__label" }, "Name", -1), be(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => P.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[ve, P.value]])]),
					p("div", Pe, [
						t[22] ||= p("span", { class: "admin-libraries__label" }, "Type", -1),
						N.value ? (g(), f("input", {
							key: 0,
							class: "admin-libraries__input",
							value: F.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Fe)) : (g(), u(ne, {
							key: 1,
							"model-value": F.value,
							options: rt.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => F.value = String(e)
						}, null, 8, ["model-value", "options"])),
						N.value ? (g(), f("span", Ie, "Type cannot be changed.")) : d("", !0)
					]),
					p("label", Le, [t[23] ||= p("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), be(p("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[ve, I.value]])]),
					F.value === "series" ? (g(), f("div", Re, [h(te, {
						modelValue: L.value,
						"onUpdate:modelValue": t[3] ||= (e) => L.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[24] ||= p("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : d("", !0),
					F.value === "movie" ? (g(), f("div", ze, [h(te, {
						"model-value": R.value,
						label: "Automatically generate collections from TMDB box sets",
						"onUpdate:modelValue": kt
					}, null, 8, ["model-value"]), t[25] ||= p("span", { class: "admin-libraries__hint-text" }, " When on, movies that belong to a TMDB box set (e.g. a trilogy) are grouped into a collection during scanning. Turn it off to skip collection generation for this library. ", -1)])) : d("", !0),
					p("div", Be, [
						t[26] ||= p("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[27] ||= p("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						h(se, {
							"model-value": Ct.value,
							available: St.value,
							label: `${F.value} sources`,
							"onUpdate:modelValue": Et
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					W.value.length ? (g(), f("div", Ve, [
						t[28] ||= p("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[29] ||= p("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						p("ul", He, [(g(!0), f(c, null, v(W.value, (e) => (g(), f("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [p("label", Ue, [p("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: G.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => bt(e.type, t.target.checked)
						}, null, 40, We), p("span", Ge, [p("span", Ke, y(e.label), 1), e.providers.length ? (g(), f("span", qe, y(e.providers.join(", ")), 1)) : d("", !0)])])]))), 128))])
					])) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(o, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: b(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: b(() => [...t[33] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: Pt
				}, {
					default: b(() => [...t[34] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					t[31] ||= m(" Delete library ", -1),
					p("strong", null, y(J.value?.name), 1),
					t[32] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": X.value !== null,
				title: Z.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => X.value = null
			}, {
				footer: b(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => X.value = null
				}, {
					default: b(() => [...t[35] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: Z.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Bt
				}, {
					default: b(() => [m(y(Z.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: b(() => [p("p", null, y(Rt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			h(o, {
				modelValue: Wt.value,
				"onUpdate:modelValue": t[9] ||= (e) => Wt.value = e,
				title: Ut.value,
				size: "lg"
			}, {
				footer: b(() => [h(a, {
					variant: "solid",
					size: "sm",
					onClick: Kt
				}, {
					default: b(() => [...t[37] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [Ht.value ? (g(), f("div", Je, [h(re, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (g(), u(ie, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (g(), f("table", Ye, [t[36] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Status"),
					p("th", { scope: "col" }, "Queued"),
					p("th", { scope: "col" }, "Completed"),
					p("th", { scope: "col" }, "Error")
				])], -1), p("tbody", null, [(g(!0), f(c, null, v($.value, (e) => (g(), f("tr", { key: e.id }, [
					p("td", null, y(e.type), 1),
					p("td", null, [h(ee, { tone: ot(e) }, {
						default: b(() => [m(y(at(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					p("td", Xe, y(e.queued_at ?? ""), 1),
					p("td", Ze, y(e.completed_at ?? ""), 1),
					p("td", null, y(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-9de8dc1f"]]);
//#endregion
export { x as default };

//# sourceMappingURL=LibrariesPage-1lFp0hYo.js.map