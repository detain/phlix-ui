import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { c as t, f as n, t as r } from "./client-D80As4Gx.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as i } from "./Button-DWa6Ld_Z.js";
import { t as te } from "./Badge-B6MgOwKQ.js";
import { t as ne } from "./Switch-DyS2L5gX.js";
import { t as re } from "./Select-CymWKJLs.js";
import { t as a } from "./Modal-BgLqRZQi.js";
import { t as ie } from "./Skeleton-DhQmxeNg.js";
import { t as o } from "./EmptyState-ZlI5t4KT.js";
import { t as ae } from "./PageHint-BoAlFFBN.js";
import { t as oe } from "./Menu-DRkKveJV.js";
import { n as se, t as ce } from "./metadata-sources-CGydsEuE.js";
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
}, Re = { class: "admin-libraries__field" }, ze = {
	key: 1,
	class: "admin-libraries__field"
}, Be = {
	class: "admin-libraries__imagetypes",
	role: "group",
	"aria-label": "Artwork types"
}, Ve = { class: "admin-libraries__checkbox" }, He = [
	"checked",
	"aria-label",
	"onChange"
], Ue = { class: "admin-libraries__checkbox-text" }, We = { class: "admin-libraries__checkbox-label" }, Ge = {
	key: 0,
	class: "admin-libraries__checkbox-providers"
}, Ke = {
	key: 0,
	class: "admin-libraries__skel"
}, qe = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Je = { class: "admin-libraries__date" }, Ye = { class: "admin-libraries__date" }, Xe = 2e3, S = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let g = e, S = fe("apiBase", ""), Ze = l(() => typeof S == "string" ? S : S?.value ?? ""), Qe = g.client ?? new r({
			baseUrl: Ze.value,
			tokenStore: new t()
		}), C = new le(Qe), $e = new ce(Qe), w = ee(), et = l(() => g.pollIntervalMs ?? Xe), tt = l(() => s.map((e) => ({
			value: e,
			label: e
		})));
		function nt(e) {
			return e === "completed" || e === "failed";
		}
		function rt(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function it(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function at(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function ot(e) {
			if (!at(e) || !e) return 0;
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
		let T = v([]), E = v(!0), D = v(null), O = v({}), k = {}, A = /* @__PURE__ */ new Set();
		function lt(e) {
			let t = k[e];
			t !== void 0 && (clearInterval(t), delete k[e]), A.delete(e);
		}
		async function ut(e) {
			try {
				let t = await C.scanStatus(e);
				O.value = {
					...O.value,
					[e]: t
				}, (t === null || nt(t.status)) && lt(e);
			} catch {
				lt(e);
			}
		}
		function j(e) {
			k[e] === void 0 && (k[e] = setInterval(() => {
				ut(e);
			}, et.value));
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
				let e = await C.list();
				T.value = e, gt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await C.scanStatus(e.id);
						O.value = {
							...O.value,
							[e.id]: t
						}, t !== null && !nt(t.status) && j(e.id);
					} catch {}
				}));
			} catch (e) {
				D.value = n(e, "Failed to load libraries."), w.error(D.value);
			} finally {
				E.value = !1;
			}
		}
		let N = v(!1), P = v(null), F = v(""), I = v(s[0]), L = v(""), R = v(!1), z = v(!1), mt = l(() => P.value ? "Edit library" : "Add library"), B = v([]), V = v([]), H = v(!1), ht = v(!1), U = v([]), W = v({}), G = v(!1);
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
		], bt = l(() => I.value === "music" ? B.value.filter((e) => !yt.includes(e)) : B.value), xt = l(() => V.value.filter((e) => bt.value.includes(e)));
		async function St() {
			if (!ht.value) {
				ht.value = !0;
				try {
					B.value = await $e.listSources();
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
		ve(B, () => {
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
			P.value = null, F.value = "", I.value = s[0], L.value = "", R.value = !1, Ct(null), _t(null), N.value = !0;
		}
		function Ot(e) {
			P.value = e, F.value = e.name;
			let t = s.find((t) => t === e.type);
			I.value = t ?? s[0], L.value = e.paths.join("\n"), R.value = Tt(e.options?.series_per_directory), Ct(e), _t(e), N.value = !0;
		}
		function K() {
			N.value = !1, P.value = null;
		}
		async function kt() {
			if (!F.value.trim()) {
				w.error("Name is required.");
				return;
			}
			let e = Et();
			if (e.length === 0) {
				w.error("Select at least one path.");
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
					n && (r.series_per_directory = R.value), H.value && (r.metadata_priority = V.value.length ? { [I.value]: V.value } : null), G.value && (r.image_types = { ...W.value }), await C.update(t.id, r), w.success("Library updated.");
				} else {
					let t = {
						name: F.value,
						type: I.value,
						paths: e
					};
					n && (t.series_per_directory = R.value), H.value && (t.metadata_priority = V.value.length ? { [I.value]: V.value } : null), G.value && (t.image_types = { ...W.value });
					let r = await C.create(t);
					w.success(r.message || "Library created.");
				}
				K(), await M();
			} catch (e) {
				w.error(n(e, "Failed to save library."));
			} finally {
				z.value = !1;
			}
		}
		let q = v(null);
		async function At() {
			let e = q.value;
			if (e) try {
				await C.remove(e.id), w.success("Library deleted."), q.value = null, await M();
			} catch (e) {
				w.error(n(e, "Failed to delete library.")), q.value = null;
			}
		}
		function jt(e, t) {
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
				w.success(n.message || Mt(t, n.job_id));
				let r = O.value[e.id];
				O.value = {
					...O.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, j(e.id), ut(e.id);
			} catch (e) {
				w.error(n(e, "Failed to queue operation."));
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
		}, Y = v(null), X = l(() => Y.value ? Nt[Y.value.op] : null), Pt = l(() => Y.value && X.value ? X.value.message.replace("{name}", Y.value.lib.name) : "");
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
		let Q = v(null), $ = v([]), Lt = v(!1), Rt = l(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), zt = l({
			get: () => Q.value !== null,
			set: (e) => {
				e || Vt();
			}
		});
		async function Bt(e) {
			Q.value = e, $.value = [], Lt.value = !0;
			try {
				$.value = await C.scanHistory(e.id);
			} catch (e) {
				w.error(n(e, "Failed to load history."));
			} finally {
				Lt.value = !1;
			}
		}
		function Vt() {
			Q.value = null, $.value = [];
		}
		return he(() => {
			St(), M(), typeof document < "u" && document.addEventListener("visibilitychange", pt);
		}), me(() => {
			for (let e of Object.keys(k)) clearInterval(k[e]), delete k[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", pt);
		}), (e, t) => (_(), f("section", xe, [
			p("header", Se, [t[11] ||= p("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: Dt
			}, {
				default: x(() => [...t[10] ||= [m("Add library", -1)]]),
				_: 1
			})]),
			h(ae, {
				links: ge(ue).libraries.links,
				details: ge(ue).libraries.details
			}, {
				default: x(() => [...t[12] ||= [
					m(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					p("strong", null, "“What do these operations do?”", -1),
					m(" below for when to use each. ", -1)
				]]),
				_: 1
			}, 8, ["links", "details"]),
			t[39] ||= de("<details class=\"admin-libraries__help\" data-v-1bc83361><summary class=\"admin-libraries__help-summary\" data-v-1bc83361>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-1bc83361><dt data-v-1bc83361>Scan</dt><dd data-v-1bc83361> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-1bc83361>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-1bc83361>Match metadata</dt><dd data-v-1bc83361> Fetches TMDB/IMDB details and artwork <em data-v-1bc83361>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-1bc83361>Recheck all metadata</dt><dd data-v-1bc83361> Forces a fresh metadata fetch for <em data-v-1bc83361>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-1bc83361>Rescan</dt><dd data-v-1bc83361> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-1bc83361>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-1bc83361>Prune removed</dt><dd data-v-1bc83361> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-1bc83361>Clear metadata</dt><dd data-v-1bc83361> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-1bc83361>Clear cached artwork</dt><dd data-v-1bc83361> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-1bc83361>Delete all items</dt><dd data-v-1bc83361><strong data-v-1bc83361>Destructive.</strong> Removes every item in the library <em data-v-1bc83361>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			E.value ? (_(), f("div", Ce, [h(ie, {
				variant: "text",
				lines: 6
			})])) : D.value ? (_(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: D.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: M
				}, {
					default: x(() => [...t[13] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : T.value.length === 0 ? (_(), u(o, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: Dt
				}, {
					default: x(() => [...t[14] ||= [m("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", we, [t[22] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Type"),
				p("th", { scope: "col" }, "Paths"),
				p("th", { scope: "col" }, "Status"),
				p("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(T.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, b(e.name), 1),
				p("td", null, b(e.type), 1),
				p("td", null, b(e.paths.length) + " paths", 1),
				p("td", null, [p("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [h(te, { tone: it(O.value[e.id]) }, {
					default: x(() => [m(b(rt(O.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), O.value[e.id]?.status === "failed" && O.value[e.id]?.error ? (_(), f("span", Ee, b(O.value[e.id]?.error), 1)) : at(O.value[e.id]) ? (_(), f("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					p("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": ot(O.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [p("span", {
						class: "admin-libraries__progress-fill",
						style: pe({ width: ot(O.value[e.id]) + "%" })
					}, null, 4)], 8, Oe),
					p("span", ke, b(ot(O.value[e.id])) + "% · " + b(st(O.value[e.id])), 1),
					ct(O.value[e.id]) ? (_(), f("span", Ae, b(ct(O.value[e.id])), 1)) : d("", !0)
				], 8, De)) : d("", !0)], 8, Te)]),
				p("td", null, [p("div", je, [
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ot(e)
					}, {
						default: x(() => [...t[15] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => J(e, "scan")
					}, {
						default: x(() => [...t[16] ||= [m(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => J(e, "rescan")
					}, {
						default: x(() => [...t[17] ||= [m(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => J(e, "metadata")
					}, {
						default: x(() => [...t[18] ||= [m(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(oe, { items: It(e) }, {
						default: x(() => [h(i, {
							variant: "ghost",
							size: "sm",
							"right-icon": "chevron-down",
							"aria-label": `More actions for ${e.name}`
						}, {
							default: x(() => [...t[19] ||= [m(" More ", -1)]]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 2
					}, 1032, ["items"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Bt(e)
					}, {
						default: x(() => [...t[20] ||= [m(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => q.value = e
					}, {
						default: x(() => [...t[21] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(a, {
				modelValue: N.value,
				"onUpdate:modelValue": t[4] ||= (e) => N.value = e,
				title: mt.value,
				onClose: K
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: x(() => [...t[31] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: z.value,
					onClick: kt
				}, {
					default: x(() => [m(b(P.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-libraries__form",
					onSubmit: be(kt, ["prevent"])
				}, [
					p("label", Me, [t[23] ||= p("span", { class: "admin-libraries__label" }, "Name", -1), ye(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => F.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[_e, F.value]])]),
					p("div", Ne, [
						t[24] ||= p("span", { class: "admin-libraries__label" }, "Type", -1),
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
							options: tt.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => I.value = String(e)
						}, null, 8, ["model-value", "options"])),
						P.value ? (_(), f("span", Fe, "Type cannot be changed.")) : d("", !0)
					]),
					p("label", Ie, [t[25] ||= p("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ye(p("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[_e, L.value]])]),
					I.value === "series" ? (_(), f("div", Le, [h(ne, {
						modelValue: R.value,
						"onUpdate:modelValue": t[3] ||= (e) => R.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[26] ||= p("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : d("", !0),
					p("div", Re, [
						t[27] ||= p("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[28] ||= p("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						h(se, {
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
					U.value.length ? (_(), f("div", ze, [
						t[29] ||= p("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[30] ||= p("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						p("ul", Be, [(_(!0), f(c, null, y(U.value, (e) => (_(), f("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [p("label", Ve, [p("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: W.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => vt(e.type, t.target.checked)
						}, null, 40, He), p("span", Ue, [p("span", We, b(e.label), 1), e.providers.length ? (_(), f("span", Ge, b(e.providers.join(", ")), 1)) : d("", !0)])])]))), 128))])
					])) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(a, {
				"model-value": q.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => q.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => q.value = null
				}, {
					default: x(() => [...t[34] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: At
				}, {
					default: x(() => [...t[35] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[32] ||= m(" Delete library ", -1),
					p("strong", null, b(q.value?.name), 1),
					t[33] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(a, {
				"model-value": Y.value !== null,
				title: X.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => Y.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => Y.value = null
				}, {
					default: x(() => [...t[36] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: X.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Ft
				}, {
					default: x(() => [m(b(X.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: x(() => [p("p", null, b(Pt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			h(a, {
				modelValue: zt.value,
				"onUpdate:modelValue": t[9] ||= (e) => zt.value = e,
				title: Rt.value,
				size: "lg"
			}, {
				footer: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					onClick: Vt
				}, {
					default: x(() => [...t[38] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: x(() => [Lt.value ? (_(), f("div", Ke, [h(ie, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (_(), u(o, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (_(), f("table", qe, [t[37] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Status"),
					p("th", { scope: "col" }, "Queued"),
					p("th", { scope: "col" }, "Completed"),
					p("th", { scope: "col" }, "Error")
				])], -1), p("tbody", null, [(_(!0), f(c, null, y($.value, (e) => (_(), f("tr", { key: e.id }, [
					p("td", null, b(e.type), 1),
					p("td", null, [h(te, { tone: it(e) }, {
						default: x(() => [m(b(rt(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					p("td", Je, b(e.queued_at ?? ""), 1),
					p("td", Ye, b(e.completed_at ?? ""), 1),
					p("td", null, b(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-1bc83361"]]);
//#endregion
export { S as default };

//# sourceMappingURL=LibrariesPage-Cfv7qVO0.js.map