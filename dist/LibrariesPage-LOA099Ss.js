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
import { n as s, t as le } from "./libraries-hKYggP3R.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createStaticVNode as ue, createTextVNode as m, createVNode as h, defineComponent as g, inject as de, normalizeStyle as fe, onBeforeUnmount as pe, onMounted as me, openBlock as _, ref as v, renderList as y, toDisplayString as b, vModelText as he, watch as ge, withCtx as x, withDirectives as _e, withModifiers as ve } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var ye = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, be = { class: "admin-libraries__head" }, xe = {
	key: 0,
	class: "admin-libraries__skel"
}, Se = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, Ce = ["data-testid"], we = {
	key: 0,
	class: "admin-libraries__error"
}, Te = ["data-testid"], Ee = ["aria-valuenow", "aria-label"], De = { class: "admin-libraries__progress-meta" }, Oe = {
	key: 0,
	class: "admin-libraries__progress-file"
}, ke = { class: "admin-libraries__actions" }, Ae = { class: "admin-libraries__field" }, je = { class: "admin-libraries__field" }, Me = ["value"], Ne = {
	key: 2,
	class: "admin-libraries__hint-text"
}, Pe = { class: "admin-libraries__field" }, Fe = {
	key: 0,
	class: "admin-libraries__field"
}, Ie = { class: "admin-libraries__field" }, Le = {
	key: 1,
	class: "admin-libraries__field"
}, Re = {
	class: "admin-libraries__imagetypes",
	role: "group",
	"aria-label": "Artwork types"
}, ze = { class: "admin-libraries__checkbox" }, Be = [
	"checked",
	"aria-label",
	"onChange"
], Ve = { class: "admin-libraries__checkbox-text" }, He = { class: "admin-libraries__checkbox-label" }, Ue = {
	key: 0,
	class: "admin-libraries__checkbox-providers"
}, We = {
	key: 0,
	class: "admin-libraries__skel"
}, Ge = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Ke = { class: "admin-libraries__date" }, qe = { class: "admin-libraries__date" }, Je = 2e3, S = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let g = e, S = de("apiBase", ""), Ye = l(() => typeof S == "string" ? S : S?.value ?? ""), Xe = g.client ?? new r({
			baseUrl: Ye.value,
			tokenStore: new t()
		}), C = new le(Xe), Ze = new ce(Xe), w = ee(), Qe = l(() => g.pollIntervalMs ?? Je), $e = l(() => s.map((e) => ({
			value: e,
			label: e
		})));
		function et(e) {
			return e === "completed" || e === "failed";
		}
		function tt(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function nt(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function rt(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function T(e) {
			if (!rt(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function it(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function at(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let E = v([]), D = v(!0), O = v(null), k = v({}), A = {}, j = /* @__PURE__ */ new Set();
		function ot(e) {
			let t = A[e];
			t !== void 0 && (clearInterval(t), delete A[e]), j.delete(e);
		}
		async function st(e) {
			try {
				let t = await C.scanStatus(e);
				k.value = {
					...k.value,
					[e]: t
				}, (t === null || et(t.status)) && ot(e);
			} catch {
				ot(e);
			}
		}
		function M(e) {
			A[e] === void 0 && (A[e] = setInterval(() => {
				st(e);
			}, Qe.value));
		}
		function ct() {
			for (let e of Object.keys(A)) clearInterval(A[e]), delete A[e], j.add(e);
		}
		function lt() {
			for (let e of j) M(e);
			j.clear();
		}
		function ut() {
			document.hidden ? ct() : lt();
		}
		async function N() {
			D.value = !0, O.value = null;
			try {
				let e = await C.list();
				E.value = e, pt(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await C.scanStatus(e.id);
						k.value = {
							...k.value,
							[e.id]: t
						}, t !== null && !et(t.status) && M(e.id);
					} catch {}
				}));
			} catch (e) {
				O.value = n(e, "Failed to load libraries."), w.error(O.value);
			} finally {
				D.value = !1;
			}
		}
		let P = v(!1), F = v(null), I = v(""), L = v(s[0]), R = v(""), z = v(!1), B = v(!1), dt = l(() => F.value ? "Edit library" : "Add library"), V = v([]), H = v([]), U = v(!1), ft = v(!1), W = v([]), G = v({}), K = v(!1);
		function pt(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (W.value = t.image_types.available);
		}
		function mt(e) {
			let t = e?.image_types?.available ?? W.value;
			t.length && (W.value = t);
			let n = e?.image_types?.enabled ?? W.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of W.value) r[e.type] = n.includes(e.type);
			G.value = r, K.value = !1;
		}
		function ht(e, t) {
			G.value = {
				...G.value,
				[e]: t
			}, K.value = !0;
		}
		let gt = [
			"imdb",
			"tmdb",
			"tvdb"
		], _t = l(() => L.value === "music" ? V.value.filter((e) => !gt.includes(e)) : V.value), vt = l(() => H.value.filter((e) => _t.value.includes(e)));
		async function yt() {
			if (!ft.value) {
				ft.value = !0;
				try {
					V.value = await Ze.listSources();
				} catch {
					V.value = [];
				}
			}
		}
		function bt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[L.value]) ? n[L.value].filter((e) => typeof e == "string") : [];
			H.value = r.length ? r : V.value.slice(), U.value = !1;
		}
		function xt(e) {
			H.value = e, U.value = !0;
		}
		ge(V, () => {
			P.value && !U.value && H.value.length === 0 && (H.value = V.value.slice());
		});
		function St(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" && [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase());
		}
		function Ct() {
			return R.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function wt() {
			F.value = null, I.value = "", L.value = s[0], R.value = "", z.value = !1, bt(null), mt(null), P.value = !0;
		}
		function Tt(e) {
			F.value = e, I.value = e.name;
			let t = s.find((t) => t === e.type);
			L.value = t ?? s[0], R.value = e.paths.join("\n"), z.value = St(e.options?.series_per_directory), bt(e), mt(e), P.value = !0;
		}
		function q() {
			P.value = !1, F.value = null;
		}
		async function Et() {
			if (!I.value.trim()) {
				w.error("Name is required.");
				return;
			}
			let e = Ct();
			if (e.length === 0) {
				w.error("Select at least one path.");
				return;
			}
			B.value = !0;
			try {
				let t = F.value, n = L.value === "series";
				if (t) {
					let r = {
						name: I.value,
						paths: e
					};
					n && (r.series_per_directory = z.value), U.value && (r.metadata_priority = H.value.length ? { [L.value]: H.value } : null), K.value && (r.image_types = { ...G.value }), await C.update(t.id, r), w.success("Library updated.");
				} else {
					let t = {
						name: I.value,
						type: L.value,
						paths: e
					};
					n && (t.series_per_directory = z.value), U.value && (t.metadata_priority = H.value.length ? { [L.value]: H.value } : null), K.value && (t.image_types = { ...G.value });
					let r = await C.create(t);
					w.success(r.message || "Library created.");
				}
				q(), await N();
			} catch (e) {
				w.error(n(e, "Failed to save library."));
			} finally {
				B.value = !1;
			}
		}
		let J = v(null);
		async function Dt() {
			let e = J.value;
			if (e) try {
				await C.remove(e.id), w.success("Library deleted."), J.value = null, await N();
			} catch (e) {
				w.error(n(e, "Failed to delete library.")), J.value = null;
			}
		}
		function Ot(e, t) {
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
		function kt(e, t) {
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
				let n = await Ot(e, t);
				w.success(n.message || kt(t, n.job_id));
				let r = k.value[e.id];
				k.value = {
					...k.value,
					[e.id]: r ? {
						...r,
						status: "queued"
					} : null
				}, M(e.id), st(e.id);
			} catch (e) {
				w.error(n(e, "Failed to queue operation."));
			}
		}
		let At = {
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
		}, X = v(null), Z = l(() => X.value ? At[X.value.op] : null), jt = l(() => X.value && Z.value ? Z.value.message.replace("{name}", X.value.lib.name) : "");
		function Mt(e, t) {
			X.value = {
				lib: e,
				op: t
			};
		}
		async function Nt() {
			let e = X.value;
			e && (X.value = null, await Y(e.lib, e.op));
		}
		function Pt(e) {
			return [
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
					onClick: () => Mt(e, "clear-metadata")
				},
				{
					label: "Clear cached artwork",
					onClick: () => Mt(e, "clear-artwork")
				},
				{
					label: "Delete all items",
					danger: !0,
					onClick: () => Mt(e, "delete-all")
				}
			];
		}
		let Q = v(null), $ = v([]), Ft = v(!1), It = l(() => Q.value ? `Scan history — ${Q.value.name}` : "Scan history"), Lt = l({
			get: () => Q.value !== null,
			set: (e) => {
				e || zt();
			}
		});
		async function Rt(e) {
			Q.value = e, $.value = [], Ft.value = !0;
			try {
				$.value = await C.scanHistory(e.id);
			} catch (e) {
				w.error(n(e, "Failed to load history."));
			} finally {
				Ft.value = !1;
			}
		}
		function zt() {
			Q.value = null, $.value = [];
		}
		return me(() => {
			yt(), N(), typeof document < "u" && document.addEventListener("visibilitychange", ut);
		}), pe(() => {
			for (let e of Object.keys(A)) clearInterval(A[e]), delete A[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", ut);
		}), (e, t) => (_(), f("section", ye, [
			p("header", be, [t[11] ||= p("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: wt
			}, {
				default: x(() => [...t[10] ||= [m("Add library", -1)]]),
				_: 1
			})]),
			h(ae, null, {
				default: x(() => [...t[12] ||= [
					m(" Each library has a set of operations for keeping it in sync with disk and with online metadata. A live percentage is shown while any of them run. Expand ", -1),
					p("strong", null, "“What do these operations do?”", -1),
					m(" below for when to use each. ", -1)
				]]),
				_: 1
			}),
			t[39] ||= ue("<details class=\"admin-libraries__help\" data-v-e608d70f><summary class=\"admin-libraries__help-summary\" data-v-e608d70f>What do these operations do?</summary><dl class=\"admin-libraries__help-list\" data-v-e608d70f><dt data-v-e608d70f>Scan</dt><dd data-v-e608d70f> Imports new and changed files from disk, keeping every existing item along with its posters, watch progress and favorites. Does <em data-v-e608d70f>not</em> contact TMDB/IMDB. Run it after you add, rename or remove media. </dd><dt data-v-e608d70f>Match metadata</dt><dd data-v-e608d70f> Fetches TMDB/IMDB details and artwork <em data-v-e608d70f>only</em> for items that don’t have metadata yet — already-matched items are skipped. Run it after a Scan to fill in the new items. </dd><dt data-v-e608d70f>Recheck all metadata</dt><dd data-v-e608d70f> Forces a fresh metadata fetch for <em data-v-e608d70f>every</em> item: updates existing entries and backfills newly-tracked fields (episode stills, trailers, logos, certifications). Use it after a metadata feature update or to refresh stale data. </dd><dt data-v-e608d70f>Rescan</dt><dd data-v-e608d70f> Re-scans from disk and prunes only the items whose files are truly gone. <strong data-v-e608d70f>Non-destructive</strong> — surviving items keep their watch progress, favorites and metadata, and an unmounted drive won’t wipe the library. Use it to repair a library that has drifted out of sync. </dd><dt data-v-e608d70f>Prune removed</dt><dd data-v-e608d70f> Removes only the items whose files no longer exist, without a full rescan. </dd><dt data-v-e608d70f>Clear metadata</dt><dd data-v-e608d70f> Resets items to filesystem basics (the items and your watch data are kept) so a later Match metadata can re-fetch cleanly. </dd><dt data-v-e608d70f>Clear cached artwork</dt><dd data-v-e608d70f> Deletes locally cached images to free disk space; they are re-downloaded on the next metadata match. </dd><dt class=\"admin-libraries__help-danger\" data-v-e608d70f>Delete all items</dt><dd data-v-e608d70f><strong data-v-e608d70f>Destructive.</strong> Removes every item in the library <em data-v-e608d70f>and</em> its watch progress, favorites and ratings. Only use this for a full reset. </dd></dl></details>", 1),
			D.value ? (_(), f("div", xe, [h(ie, {
				variant: "text",
				lines: 6
			})])) : O.value ? (_(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: O.value
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: x(() => [...t[13] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : E.value.length === 0 ? (_(), u(o, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: wt
				}, {
					default: x(() => [...t[14] ||= [m("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", Se, [t[22] ||= p("thead", null, [p("tr", null, [
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
				}, [h(te, { tone: nt(k.value[e.id]) }, {
					default: x(() => [m(b(tt(k.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), k.value[e.id]?.status === "failed" && k.value[e.id]?.error ? (_(), f("span", we, b(k.value[e.id]?.error), 1)) : rt(k.value[e.id]) ? (_(), f("span", {
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
						style: fe({ width: T(k.value[e.id]) + "%" })
					}, null, 4)], 8, Ee),
					p("span", De, b(T(k.value[e.id])) + "% · " + b(it(k.value[e.id])), 1),
					at(k.value[e.id]) ? (_(), f("span", Oe, b(at(k.value[e.id])), 1)) : d("", !0)
				], 8, Te)) : d("", !0)], 8, Ce)]),
				p("td", null, [p("div", ke, [
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Tt(e)
					}, {
						default: x(() => [...t[15] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: x(() => [...t[16] ||= [m(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: x(() => [...t[17] ||= [m(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: x(() => [...t[18] ||= [m(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(oe, { items: Pt(e) }, {
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
						onClick: (t) => Rt(e)
					}, {
						default: x(() => [...t[20] ||= [m(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: x(() => [...t[21] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(a, {
				modelValue: P.value,
				"onUpdate:modelValue": t[4] ||= (e) => P.value = e,
				title: dt.value,
				onClose: q
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: x(() => [...t[31] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: B.value,
					onClick: Et
				}, {
					default: x(() => [m(b(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [p("form", {
					class: "admin-libraries__form",
					onSubmit: ve(Et, ["prevent"])
				}, [
					p("label", Ae, [t[23] ||= p("span", { class: "admin-libraries__label" }, "Name", -1), _e(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[he, I.value]])]),
					p("div", je, [
						t[24] ||= p("span", { class: "admin-libraries__label" }, "Type", -1),
						F.value ? (_(), f("input", {
							key: 0,
							class: "admin-libraries__input",
							value: L.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Me)) : (_(), u(re, {
							key: 1,
							"model-value": L.value,
							options: $e.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => L.value = String(e)
						}, null, 8, ["model-value", "options"])),
						F.value ? (_(), f("span", Ne, "Type cannot be changed.")) : d("", !0)
					]),
					p("label", Pe, [t[25] ||= p("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), _e(p("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => R.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[he, R.value]])]),
					L.value === "series" ? (_(), f("div", Fe, [h(ne, {
						modelValue: z.value,
						"onUpdate:modelValue": t[3] ||= (e) => z.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[26] ||= p("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : d("", !0),
					p("div", Ie, [
						t[27] ||= p("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[28] ||= p("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						h(se, {
							"model-value": vt.value,
							available: _t.value,
							label: `${L.value} sources`,
							"onUpdate:modelValue": xt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					W.value.length ? (_(), f("div", Le, [
						t[29] ||= p("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[30] ||= p("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						p("ul", Re, [(_(!0), f(c, null, y(W.value, (e) => (_(), f("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [p("label", ze, [p("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: G.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => ht(e.type, t.target.checked)
						}, null, 40, Be), p("span", Ve, [p("span", He, b(e.label), 1), e.providers.length ? (_(), f("span", Ue, b(e.providers.join(", ")), 1)) : d("", !0)])])]))), 128))])
					])) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(a, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: x(() => [...t[34] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					onClick: Dt
				}, {
					default: x(() => [...t[35] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [p("p", null, [
					t[32] ||= m(" Delete library ", -1),
					p("strong", null, b(J.value?.name), 1),
					t[33] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(a, {
				"model-value": X.value !== null,
				title: Z.value?.title ?? "",
				size: "sm",
				"onUpdate:modelValue": t[8] ||= (e) => X.value = null
			}, {
				footer: x(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: t[7] ||= (e) => X.value = null
				}, {
					default: x(() => [...t[36] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: Z.value?.danger ? "danger" : "solid",
					size: "sm",
					onClick: Nt
				}, {
					default: x(() => [m(b(Z.value?.confirmLabel ?? "Confirm"), 1)]),
					_: 1
				}, 8, ["variant"])]),
				default: x(() => [p("p", null, b(jt.value), 1)]),
				_: 1
			}, 8, ["model-value", "title"]),
			h(a, {
				modelValue: Lt.value,
				"onUpdate:modelValue": t[9] ||= (e) => Lt.value = e,
				title: It.value,
				size: "lg"
			}, {
				footer: x(() => [h(i, {
					variant: "solid",
					size: "sm",
					onClick: zt
				}, {
					default: x(() => [...t[38] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: x(() => [Ft.value ? (_(), f("div", We, [h(ie, {
					variant: "text",
					lines: 4
				})])) : $.value.length === 0 ? (_(), u(o, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (_(), f("table", Ge, [t[37] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Status"),
					p("th", { scope: "col" }, "Queued"),
					p("th", { scope: "col" }, "Completed"),
					p("th", { scope: "col" }, "Error")
				])], -1), p("tbody", null, [(_(!0), f(c, null, y($.value, (e) => (_(), f("tr", { key: e.id }, [
					p("td", null, b(e.type), 1),
					p("td", null, [h(te, { tone: nt(e) }, {
						default: x(() => [m(b(tt(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					p("td", Ke, b(e.queued_at ?? ""), 1),
					p("td", qe, b(e.completed_at ?? ""), 1),
					p("td", null, b(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-e608d70f"]]);
//#endregion
export { S as default };

//# sourceMappingURL=LibrariesPage-LOA099Ss.js.map