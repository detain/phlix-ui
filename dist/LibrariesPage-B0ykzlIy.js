import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-BkHcWnO5.js";
import { c as n, f as r, t as ee } from "./client-D80As4Gx.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-AW4z0vv0.js";
import { t as ne } from "./Badge-BxQOsARS.js";
import { t as re } from "./Switch-DyS2L5gX.js";
import { t as ie } from "./Select-nIPW0HYh.js";
import { t as ae } from "./Skeleton-DhQmxeNg.js";
import { t as a } from "./EmptyState-CLDEIm6E.js";
import { t as oe } from "./PageHint-0P_Y-_RL.js";
import { t as se } from "./Menu-DRkKveJV.js";
import { n as ce, t as le } from "./metadata-sources-CMR4vck_.js";
import { n as o, t as ue } from "./libraries-hKYggP3R.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createStaticVNode as de, createTextVNode as p, createVNode as m, defineComponent as h, inject as fe, normalizeStyle as pe, onBeforeUnmount as me, onMounted as he, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelText as ge, watch as _e, withCtx as b, withDirectives as ve, withModifiers as ye } from "vue";
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
}, Ae = { class: "admin-libraries__actions" }, je = { class: "admin-libraries__field" }, Me = { class: "admin-libraries__field" }, Ne = ["value"], Pe = {
	key: 2,
	class: "admin-libraries__hint-text"
}, Fe = { class: "admin-libraries__field" }, Ie = {
	key: 0,
	class: "admin-libraries__field"
}, Le = { class: "admin-libraries__field" }, Re = {
	key: 1,
	class: "admin-libraries__field"
}, ze = {
	class: "admin-libraries__imagetypes",
	role: "group",
	"aria-label": "Artwork types"
}, Be = { class: "admin-libraries__checkbox" }, Ve = [
	"checked",
	"aria-label",
	"onChange"
], He = { class: "admin-libraries__checkbox-text" }, Ue = { class: "admin-libraries__checkbox-label" }, We = {
	key: 0,
	class: "admin-libraries__checkbox-providers"
}, Ge = {
	key: 0,
	class: "admin-libraries__skel"
}, Ke = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, qe = { class: "admin-libraries__date" }, Je = { class: "admin-libraries__date" }, Ye = 2e3, x = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let h = e, x = fe("apiBase", ""), Xe = c(() => typeof x == "string" ? x : x?.value ?? ""), Ze = h.client ?? new ee({
			baseUrl: Xe.value,
			tokenStore: new n()
		}), S = new ue(Ze), Qe = new le(Ze), C = te(), $e = c(() => h.pollIntervalMs ?? Ye), et = c(() => o.map((e) => ({
			value: e,
			label: e
		})));
		function tt(e) {
			return e === "completed" || e === "failed";
		}
		function nt(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function rt(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function it(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function w(e) {
			if (!it(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function at(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function ot(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let T = _([]), E = _(!0), D = _(null), O = _({}), k = {}, A = /* @__PURE__ */ new Set();
		function st(e) {
			let t = k[e];
			t !== void 0 && (clearInterval(t), delete k[e]), A.delete(e);
		}
		async function ct(e) {
			try {
				let t = await S.scanStatus(e);
				O.value = {
					...O.value,
					[e]: t
				}, (t === null || tt(t.status)) && st(e);
			} catch {
				st(e);
			}
		}
		function j(e) {
			k[e] === void 0 && (k[e] = setInterval(() => {
				ct(e);
			}, $e.value));
		}
		function lt() {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e], A.add(e);
		}
		function ut() {
			for (let e of A) j(e);
			A.clear();
		}
		function dt() {
			document.hidden ? lt() : ut();
		}
		async function M() {
			E.value = !0, D.value = null;
			try {
				let e = await S.list();
				T.value = e, mt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await S.scanStatus(e.id);
						O.value = {
							...O.value,
							[e.id]: t
						}, t !== null && !tt(t.status) && j(e.id);
					} catch {}
				}));
			} catch (e) {
				D.value = r(e, "Failed to load libraries."), C.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let N = _(!1), P = _(null), F = _(""), I = _(o[0]), L = _(""), R = _(!1), z = _(!1), ft = c(() => P.value ? "Edit library" : "Add library"), B = _([]), V = _([]), H = _(!1), pt = _(!1), U = _([]), W = _({}), G = _(!1);
		function mt(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (U.value = t.image_types.available);
		}
		function ht(e) {
			let t = e?.image_types?.available ?? U.value;
			t.length && (U.value = t);
			let n = e?.image_types?.enabled ?? U.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of U.value) r[e.type] = n.includes(e.type);
			W.value = r, G.value = !1;
		}
		function gt(e, t) {
			W.value = {
				...W.value,
				[e]: t
			}, G.value = !0;
		}
		let _t = [
			"imdb",
			"tmdb",
			"tvdb"
		], vt = c(() => I.value === "music" ? B.value.filter((e) => !_t.includes(e)) : B.value), yt = c(() => V.value.filter((e) => vt.value.includes(e)));
		async function bt() {
			if (!pt.value) {
				pt.value = !0;
				try {
					B.value = await Qe.listSources();
				} catch {
					B.value = [];
				}
			}
		}
		function xt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[I.value]) ? n[I.value].filter((e) => typeof e == "string") : [];
			V.value = r.length ? r : B.value.slice(), H.value = !1;
		}
		function St(e) {
			V.value = e, H.value = !0;
		}
		_e(B, () => {
			N.value && !H.value && V.value.length === 0 && (V.value = B.value.slice());
		});
		function Ct(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function wt() {
			return L.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function Tt() {
			P.value = null, F.value = "", I.value = o[0], L.value = "", R.value = !1, xt(null), ht(null), N.value = !0;
		}
		function Et(e) {
			P.value = e, F.value = e.name;
			let t = o.find((t) => t === e.type);
			I.value = t ?? o[0], L.value = e.paths.join("\n"), R.value = Ct(e.options?.series_per_directory), xt(e), ht(e), N.value = !0;
		}
		function K() {
			N.value = !1, P.value = null;
		}
		async function Dt() {
			if (!F.value.trim()) {
				C.error("Name is required.");
				return;
			}
			let e = wt();
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
		async function Ot() {
			let e = q.value;
			if (e) try {
				await S.remove(e.id), C.success("Library deleted."), q.value = null, await M();
			} catch (e) {
				C.error(r(e, "Failed to delete library.")), q.value = null;
			}
		}
		function kt(e, t) {
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
		function At(e, t) {
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
				let n = await kt(e, t);
				C.success(n.message || At(t, n.job_id));
				let r = O.value[e.id];
				O.value = {
					...O.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, j(e.id), ct(e.id);
			} catch (e) {
				C.error(r(e, "Failed to queue operation."));
			}
		}
		let jt = {
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
		}, Y = _(null), X = c(() => Y.value ? jt[Y.value.op] : null), Mt = c(() => Y.value && X.value ? X.value.message.replace("{name}", Y.value.lib.name) : "");
		function Z(e, t) {
			Y.value = {
				lib: e,
				op: t
			};
		}
		async function Nt() {
			let e = Y.value;
			e && (Y.value = null, await J(e.lib, e.op));
		}
		function Pt(e) {
			return [
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
				}
			];
		}
		let Q = _(null), $ = _([]), Ft = _(!1), It = c(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Lt = c({
			get: () => Q.value !== null,
			set: (e) => {
				e || zt();
			}
		});
		async function Rt(e) {
			Q.value = e, $.value = [], Ft.value = !0;
			try {
				$.value = await S.scanHistory(e.id);
			} catch (e) {
				C.error(r(e, "Failed to load history."));
			} finally {
				Ft.value = !1;
			}
		}
		function zt() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			bt(), M(), typeof document < "u" && document.addEventListener("visibilitychange", dt);
		}), me(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", dt);
		}), (e, n) => (g(), d("section", be, [
			f("header", xe, [n[11] ||= f("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), m(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Tt
			}, {
				default: b(() => [...n[10] ||= [p("Add library", -1)]]),
				_: 1
			})]),
			m(oe, null, {
				default: b(() => [...n[12] ||= [
					p(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					f("strong", null, "“What do these operations do?”", -1),
					p(" below for when to use each. ", -1)
				]]),
				_: 1
			}),
			n[39] ||= de("<details class=\"admin-libraries__help\" data-v-e608d70f><summary class=\"admin-libraries__help-summary\" data-v-e608d70f>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-e608d70f><dt data-v-e608d70f>Scan</dt><dd data-v-e608d70f> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-e608d70f>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-e608d70f>Match metadata</dt><dd data-v-e608d70f> Fetches TMDB/IMDB details and artwork <em data-v-e608d70f>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-e608d70f>Recheck all metadata</dt><dd data-v-e608d70f> Forces a fresh metadata fetch for <em data-v-e608d70f>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-e608d70f>Rescan</dt><dd data-v-e608d70f> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-e608d70f>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-e608d70f>Prune removed</dt><dd data-v-e608d70f> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-e608d70f>Clear metadata</dt><dd data-v-e608d70f> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-e608d70f>Clear cached artwork</dt><dd data-v-e608d70f> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-e608d70f>Delete all items</dt><dd data-v-e608d70f><strong data-v-e608d70f>Destructive.</strong> Removes every item in the library <em data-v-e608d70f>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			E.value ? (g(), d("div", Se, [m(ae, {
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
					onClick: Tt
				}, {
					default: b(() => [...n[14] ||= [p("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", Ce, [n[22] ||= f("thead", null, [f("tr", null, [
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
				}, [m(ne, { tone: rt(O.value[e.id]) }, {
					default: b(() => [p(y(nt(O.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (g(), d("span", Te, y(O.value[e.id]?.error), 1)) : it(O.value[e.id]) ? (g(), d("span", {
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
						style: pe({ width: w(O.value[e.id]) + "%" })
					}, null, 4)], 8, De),
					f("span", Oe, y(w(O.value[e.id])) + "% · " + y(at(O.value[e.id])), 1),
					ot(O.value[e.id]) ? (g(), d("span", ke, y(ot(O.value[e.id])), 1)) : u("", !0)
				], 8, Ee)) : u("", !0)], 8, we)]),
				f("td", null, [f("div", Ae, [
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Et(e)
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
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => J(e, "rescan")
					}, {
						default: b(() => [...n[17] ||= [p(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => J(e, "metadata")
					}, {
						default: b(() => [...n[18] ||= [p(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(se, { items: Pt(e) }, {
						default: b(() => [m(i, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: b(() => [...n[19] ||= [p(" More ", -1)]]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 2
					}, 1032, ["items"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Rt(e)
					}, {
						default: b(() => [...n[20] ||= [p(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					m(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => q.value = e
					}, {
						default: b(() => [...n[21] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			m(t, {
				modelValue: N.value,
				"onUpdate:modelValue": n[4] ||= (e) => N.value = e,
				title: ft.value,
				onClose: K
			}, {
				footer: b(() => [m(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: b(() => [...n[31] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					loading: z.value,
					onClick: Dt
				}, {
					default: b(() => [p(y(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [f("form", {
					class: "admin-libraries__form",
					onSubmit: ye(Dt, ["prevent"])
				}, [
					f("label", je, [n[23] ||= f("span", { class: "admin-libraries__label" }, "Name", -1), ve(f("input", {
						"onUpdate:modelValue": n[0] ||= (e) => F.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[ge, F.value]])]),
					f("div", Me, [
						n[24] ||= f("span", { class: "admin-libraries__label" }, "Type", -1),
						P.value ? (g(), d("input", {
							key: 0,
							class: "admin-libraries__input",
							value: I.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Ne)) : (g(), l(ie, {
							key: 1,
							"model-value": I.value,
							options: et.value,
							label: "Type",
							"onUpdate:modelValue": n[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (g(), d("span", Pe, "Type cannot be changed.")) : u("", !0)
					]),
					f("label", Fe, [n[25] ||= f("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ve(f("textarea", {
						"onUpdate:modelValue": n[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[ge, L.value]])]),
					I.value === "series" ? (g(), d("div", Ie, [m(re, {
						modelValue: R.value,
						"onUpdate:modelValue": n[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), n[26] ||= f("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : u("", !0),
					f("div", Le, [
						n[27] ||= f("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						n[28] ||= f("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						m(ce, {
							"model-value": yt.value,
							available: vt.value,
							label: `${I.value} sources`,
							"onUpdate:modelValue": St
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					U.value.length ? (g(), d("div", Re, [
						n[29] ||= f("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						n[30] ||= f("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						f("ul", ze, [(g(!0), d(s, null, v(U.value, (e) => (g(), d("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [f("label", Be, [f("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: W.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => gt(e.type, t.target.checked)
						}, null, 40, Ve), f("span", He, [f("span", Ue, y(e.label), 1), e.providers.length ? (g(), d("span", We, y(e.providers.join(", ")), 1)) : u("", !0)])])]))), 128))])
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
					default: b(() => [...n[34] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: "solid",
					size: "sm",
					onClick: Ot
				}, {
					default: b(() => [...n[35] ||= [p("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [f("p", null, [
					n[32] ||= p(" Delete library ", -1),
					f("strong", null, y(q.value?.name), 1),
					n[33] ||= p("? This cannot be undone. ", -1)
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
					default: b(() => [...n[36] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(i, {
					variant: X.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Nt
				}, {
					default: b(() => [p(y(X.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: b(() => [f("p", null, y(Mt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			m(t, {
				modelValue: Lt.value,
				"onUpdate:modelValue": n[9] ||= (e) => Lt.value = e,
				title: It.value,
				size: "lg"
			}, {
				footer: b(() => [m(i, {
					variant: "solid",
					size: "sm",
					onClick: zt
				}, {
					default: b(() => [...n[38] ||= [p("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [Ft.value ? (g(), d("div", Ge, [m(ae, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (g(), l(a, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (g(), d("table", Ke, [n[37] ||= f("thead", null, [f("tr", null, [
					f("th", { scope: "col" }, "Type"),
					f("th", { scope: "col" }, "Status"),
					f("th", { scope: "col" }, "Queued"),
					f("th", { scope: "col" }, "Completed"),
					f("th", { scope: "col" }, "Error")
				])], -1), f("tbody", null, [(g(!0), d(s, null, v($.value, (e) => (g(), d("tr", { key: e.id }, [
					f("td", null, y(e.type), 1),
					f("td", null, [m(ne, { tone: rt(e) }, {
						default: b(() => [p(y(nt(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					f("td", qe, y(e.queued_at ?? ""), 1),
					f("td", Je, y(e.completed_at ?? ""), 1),
					f("td", null, y(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-e608d70f"]]);
//#endregion
export { x as default };

//# sourceMappingURL=LibrariesPage-B0ykzlIy.js.map