import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, t as i } from "./client-BzWwyWKr.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-DWa6Ld_Z.js";
import { t as te } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-Cvp-73pF.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { t as oe } from "./Menu-DRkKveJV.js";
import { n as se, t as ce } from "./metadata-sources-Dxb7NOl7.js";
import { n as s, t as le } from "./libraries-D3CNHYm9.js";
import { t as ue } from "./helpLinks-BI4oN4Or.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createStaticVNode as de, createTextVNode as m, createVNode as h, defineComponent as g, inject as fe, normalizeStyle as pe, onBeforeUnmount as me, onMounted as he, openBlock as _, ref as v, renderList as y, toDisplayString as b, unref as ge, vModelText as _e, watch as ve, withCtx as x, withDirectives as ye, withModifiers as be } from "vue";
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
}, je = { class: "admin-libraries__actions" }, Me = { class: "admin-libraries__field" }, Ne = { class: "admin-libraries__field" }, Pe = ["value"], Fe = {
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
}, Ye = { class: "admin-libraries__date" }, Xe = { class: "admin-libraries__date" }, Ze = 2e3, S = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let g = e, S = fe("apiBase", ""), Qe = l(() => typeof S == "string" ? S : S?.value ?? ""), $e = g.client ?? new i({
			baseUrl: Qe.value,
			tokenStore: new n()
		}), C = new le($e), et = new ce($e), w = ee(), tt = l(() => g.pollIntervalMs ?? Ze), nt = l(() => s.map((e) => ({
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
		function T(e) {
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
		let E = v([]), D = v(!0), O = v(null), k = v({}), A = {}, j = /* @__PURE__ */ new Set();
		function lt(e) {
			let t = A[e];
			t !== void 0 && (clearInterval(t), delete A[e]), j.delete(e);
		}
		async function ut(e) {
			try {
				let t = await C.scanStatus(e);
				k.value = {
					...k.value,
					[e]: t
				}, (t === null || rt(t.status)) && lt(e);
			} catch {
				lt(e);
			}
		}
		function dt(e) {
			A[e] === void 0 && (A[e] = setInterval(() => {
				ut(e);
			}, tt.value));
		}
		function ft() {
			for (let e of Object.keys(A)) clearInterval(A[e]), delete A[e], j.add(e);
		}
		function pt() {
			for (let e of j) dt(e);
			j.clear();
		}
		function mt() {
			document.hidden ? ft() : pt();
		}
		async function M() {
			D.value = !0, O.value = null;
			try {
				let e = await C.list();
				E.value = e, _t(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await C.scanStatus(e.id);
						k.value = {
							...k.value,
							[e.id]: t
						}, t !== null && !rt(t.status) && dt(e.id);
					} catch {}
				}));
			} catch (e) {
				O.value = r(e, "Failed to load libraries."), w.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		let N = v(!1), P = v(null), F = v(""), I = v(s[0]), L = v(""), R = v(!1), z = v(!0), B = v(!1), V = v(!1), ht = l(() => P.value ? "Edit library" : "Add library"), H = v([]), U = v([]), W = v(!1), gt = v(!1), G = v([]), K = v({}), q = v(!1);
		function _t(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (G.value = t.image_types.available);
		}
		function vt(e) {
			let t = e?.image_types?.available ?? G.value;
			t.length && (G.value = t);
			let n = e?.image_types?.enabled ?? G.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of G.value) r[e.type] = n.includes(e.type);
			K.value = r, q.value = !1;
		}
		function yt(e, t) {
			K.value = {
				...K.value,
				[e]: t
			}, q.value = !0;
		}
		let bt = [
			"imdb",
			"tmdb",
			"tvdb"
		], xt = l(() => I.value === "music" ? H.value.filter((e) => !bt.includes(e)) : H.value), St = l(() => U.value.filter((e) => xt.value.includes(e)));
		async function Ct() {
			if (!gt.value) {
				gt.value = !0;
				try {
					H.value = await et.listSources();
				} catch {
					H.value = [];
				}
			}
		}
		function wt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[I.value]) ? n[I.value].filter((e) => typeof e == "string") : [];
			U.value = r.length ? r : H.value.slice(), W.value = !1;
		}
		function Tt(e) {
			U.value = e, W.value = !0;
		}
		ve(H, () => {
			N.value && !W.value && U.value.length === 0 && (U.value = H.value.slice());
		});
		function Et(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function Dt(e) {
			z.value = !e?.auto_collections || Et(e.auto_collections.enabled), B.value = !1;
		}
		function Ot(e) {
			z.value = e, B.value = !0;
		}
		function kt() {
			return L.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function At() {
			P.value = null, F.value = "", I.value = s[0], L.value = "", R.value = !1, wt(null), vt(null), Dt(null), N.value = !0;
		}
		function jt(e) {
			P.value = e, F.value = e.name;
			let t = s.find((t) => t === e.type);
			I.value = t ?? s[0], L.value = e.paths.join("\n"), R.value = Et(e.options?.series_per_directory), wt(e), vt(e), Dt(e), N.value = !0;
		}
		function Mt() {
			N.value = !1, P.value = null;
		}
		async function Nt() {
			if (!F.value.trim()) {
				w.error("Name is required.");
				return;
			}
			let e = kt();
			if (e.length === 0) {
				w.error("Select at least one path.");
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
				Mt(), await M();
			} catch (e) {
				w.error(r(e, "Failed to save library."));
			} finally {
				V.value = !1;
			}
		}
		let J = v(null);
		async function Pt() {
			let e = J.value;
			if (e) try {
				await C.remove(e.id), w.success("Library deleted."), J.value = null, await M();
			} catch (e) {
				w.error(r(e, "Failed to delete library.")), J.value = null;
			}
		}
		function Ft(e, t) {
			switch (t) {
				case "scan": return C.scan(e.id);
				case "rescan": return C.rescan(e.id);
				case "metadata": return C.matchMetadata(e.id);
				case "refresh-metadata": return C.refreshMetadata(e.id);
				case "prune": return C.prune(e.id);
				case "clear-metadata": return C.clearMetadata(e.id);
				case "clear-artwork": return C.clearArtwork(e.id);
				case "delete-all": return C.deleteAll(e.id);
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
				w.success(n.message || It(t, n.job_id));
				let r = k.value[e.id];
				k.value = {
					...k.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, dt(e.id), ut(e.id);
			} catch (e) {
				w.error(r(e, "Failed to queue operation."));
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
		}, X = v(null), Z = l(() => X.value ? Lt[X.value.op] : null), Rt = l(() => X.value && Z.value ? Z.value.message.replace("{name}", X.value.lib.name) : "");
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
		let Q = v(null), $ = v([]), Ht = v(!1), Ut = l(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Wt = l({
			get: () => Q.value !== null,
			set: (e) => {
				e || Kt();
			}
		});
		async function Gt(e) {
			Q.value = e, $.value = [], Ht.value = !0;
			try {
				$.value = await C.scanHistory(e.id);
			} catch (e) {
				w.error(r(e, "Failed to load history."));
			} finally {
				Ht.value = !1;
			}
		}
		function Kt() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			Ct(), M(), typeof document < "u" && document.addEventListener("visibilitychange", mt);
		}), me(() => {
			for (let e of Object.keys(A)) clearInterval(A[e]), delete A[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", mt);
		}), (e, n) => (_(), f("section", xe, [
			p("header", Se, [n[11] ||= p("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: At
			}, {
				default: x(() => [...n[10] ||= [m("Add library", -1)]]),
				_: 1
			})]),
			h(ae, {
				links: ge(ue).libraries.links,
				details: ge(ue).libraries.details
			}, {
				default: x(() => [...n[12] ||= [
					m(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					p("strong", null, "“What do these operations do?”", -1),
					m(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			n[38] ||= de("<details class=\"admin-libraries__help\" open data-v-9de8dc1f><summary class=\"admin-libraries__help-summary\" data-v-9de8dc1f>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-9de8dc1f><dt data-v-9de8dc1f>Scan</dt><dd data-v-9de8dc1f> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-9de8dc1f>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-9de8dc1f>Match metadata</dt><dd data-v-9de8dc1f> Fetches TMDB/IMDB details and artwork <em data-v-9de8dc1f>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-9de8dc1f>Recheck all metadata</dt><dd data-v-9de8dc1f> Forces a fresh metadata fetch for <em data-v-9de8dc1f>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-9de8dc1f>Rescan</dt><dd data-v-9de8dc1f> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-9de8dc1f>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-9de8dc1f>Prune removed</dt><dd data-v-9de8dc1f> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-9de8dc1f>Clear metadata</dt><dd data-v-9de8dc1f> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-9de8dc1f>Clear cached artwork</dt><dd data-v-9de8dc1f> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-9de8dc1f>Delete all items</dt><dd data-v-9de8dc1f><strong data-v-9de8dc1f>Destructive.</strong> Removes every item in the library <em data-v-9de8dc1f>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			D.value ? (_(), f("div", Ce, [h(ie, {
				variant: "text",
				lines: 6
			})])) : O.value ? (_(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: O.value
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: x(() => [...n[13] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value.length === 0 ? (_(), u(o, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: At
				}, {
					default: x(() => [...n[14] ||= [m("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", we, [n[20] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Type"),
				p("th", { scope: "col" }, "Paths"),
				p("th", { scope: "col" }, "Status"),
				p("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(E.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, b(e.name), 1),
				p("td", null, b(e.type), 1),
				p("td", null, b(e.paths.length) + " paths", 1),
				p("td", null, [p("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [h(te, { tone: at(k.value[e.id]) }, {
					default: x(() => [m(b(it(k.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), k.value[e.id]?.status === "failed" && k.value[e.id]?.error ? (_(), f("span", Ee, b(k.value[e.id]?.error), 1)) : ot(k.value[e.id]) ? (_(), f("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					p("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": T(k.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [p("span", {
						class: "admin-libraries__progress-fill",
						style: pe({ width: T(k.value[e.id]) + "%" })
					}, null, 4)], 8, Oe),
					p("span", ke, b(T(k.value[e.id])) + "% · " + b(st(k.value[e.id])), 1),
					ct(k.value[e.id]) ? (_(), f("span", Ae, b(ct(k.value[e.id])), 1)) : d("", !0)
				], 8, De)) : d("", !0)], 8, Te)]),
				p("td", null, [p("div", je, [
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => jt(e)
					}, {
						default: x(() => [...n[15] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: x(() => [...n[16] ||= [m(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: x(() => [...n[17] ||= [m(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(oe, { items: Vt(e) }, {
						default: x(() => [h(a, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: x(() => [...n[18] ||= [m(" More ", -1)]]),
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
						default: x(() => [...n[19] ||= [m(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(t, {
				modelValue: N.value,
				"onUpdate:modelValue": n[4] ||= (e) => N.value = e,
				title: ht.value,
				onClose: Mt
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: Mt
				}, {
					default: x(() => [...n[30] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: Nt
				}, {
					default: x(() => [m(b(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-libraries__form",
					onSubmit: be(Nt, ["prevent"])
				}, [
					p("label", Me, [n[21] ||= p("span", { class: "admin-libraries__label" }, "Name", -1), ye(p("input", {
						"onUpdate:modelValue": n[0] ||= (e) => F.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_e, F.value]])]),
					p("div", Ne, [
						n[22] ||= p("span", { class: "admin-libraries__label" }, "Type", -1),
						P.value ? (_(), f("input", {
							key: 0,
							class: "admin-libraries__input",
							value: I.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Pe)) : (_(), u(re, {
							key: 1,
							"model-value": I.value,
							options: nt.value,
							label: "Type",
							"onUpdate:modelValue": n[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (_(), f("span", Fe, "Type cannot be changed.")) : d("", !0)
					]),
					p("label", Ie, [n[23] ||= p("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ye(p("textarea", {
						"onUpdate:modelValue": n[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[_e, L.value]])]),
					I.value === "series" ? (_(), f("div", Le, [h(ne, {
						modelValue: R.value,
						"onUpdate:modelValue": n[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), n[24] ||= p("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : d("", !0),
					I.value === "movie" ? (_(), f("div", Re, [h(ne, {
						"model-value": z.value,
						label: "Automatically generate collections from TMDB box sets",
						"onUpdate:modelValue": Ot
					}, null, 8, ["model-value"]), n[25] ||= p("span", { class: "admin-libraries__hint-text" }, " When on, movies that belong to a TMDB box set (e.g. a trilogy) are grouped into a collection during scanning. Turn it off to skip collection generation for this library. ", -1)])) : d("", !0),
					p("div", ze, [
						n[26] ||= p("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						n[27] ||= p("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						h(se, {
							"model-value": St.value,
							available: xt.value,
							label: `${I.value} sources`,
							"onUpdate:modelValue": Tt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					G.value.length ? (_(), f("div", Be, [
						n[28] ||= p("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						n[29] ||= p("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						p("ul", Ve, [(_(!0), f(c, null, y(G.value, (e) => (_(), f("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [p("label", He, [p("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: K.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => yt(e.type, t.target.checked)
						}, null, 40, Ue), p("span", We, [p("span", Ge, b(e.label), 1), e.providers.length ? (_(), f("span", Ke, b(e.providers.join(", ")), 1)) : d("", !0)])])]))), 128))])
					])) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(t, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => J.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => J.value = null
				}, {
					default: x(() => [...n[33] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: Pt
				}, {
					default: x(() => [...n[34] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					n[31] ||= m(" Delete library ", -1),
					p("strong", null, b(J.value?.name), 1),
					n[32] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(t, {
				"model-value": X.value !== null,
				title: Z.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": n[8] ||= (e) => X.value = null
			}, {
				footer: x(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[7] ||= (e) => X.value = null
				}, {
					default: x(() => [...n[35] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: Z.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Bt
				}, {
					default: x(() => [m(b(Z.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: x(() => [p("p", null, b(Rt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			h(t, {
				modelValue: Wt.value,
				"onUpdate:modelValue": n[9] ||= (e) => Wt.value = e,
				title: Ut.value,
				size: "lg"
			}, {
				footer: x(() => [h(a, {
					variant: "solid",
					size: "sm",
					onClick: Kt
				}, {
					default: x(() => [...n[37] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: x(() => [Ht.value ? (_(), f("div", qe, [h(ie, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (_(), u(o, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (_(), f("table", Je, [n[36] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Status"),
					p("th", { scope: "col" }, "Queued"),
					p("th", { scope: "col" }, "Completed"),
					p("th", { scope: "col" }, "Error")
				])], -1), p("tbody", null, [(_(!0), f(c, null, y($.value, (e) => (_(), f("tr", { key: e.id }, [
					p("td", null, b(e.type), 1),
					p("td", null, [h(te, { tone: at(e) }, {
						default: x(() => [m(b(it(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					p("td", Ye, b(e.queued_at ?? ""), 1),
					p("td", Xe, b(e.completed_at ?? ""), 1),
					p("td", null, b(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-9de8dc1f"]]);
//#endregion
export { S as default };

//# sourceMappingURL=LibrariesPage-CgeICl_v.js.map