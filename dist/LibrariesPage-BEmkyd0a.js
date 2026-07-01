import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as r } from "./client-fw74f3l_.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as ee } from "./Badge-DnDrMVUo.js";
import { t as te } from "./Switch-D-Y4B9p8.js";
import { t as ne } from "./Select-C7fVtNk5.js";
import { t as o } from "./Modal-Cf28TADR.js";
import { t as re } from "./Skeleton-BUq2D39t.js";
import { t as s } from "./EmptyState-0XgHKEGf.js";
import { t as ie } from "./PageHint-DR8OWfto.js";
import { n as ae, t as oe } from "./metadata-sources-BgtO98Lh.js";
import { n as c, t as se } from "./libraries-CXAz_kXs.js";
import { Fragment as ce, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as le, normalizeStyle as ue, onBeforeUnmount as de, onMounted as fe, openBlock as _, ref as v, renderList as pe, toDisplayString as y, vModelText as me, watch as he, withCtx as b, withDirectives as ge, withModifiers as _e } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var ve = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, ye = { class: "admin-libraries__head" }, be = {
	key: 0,
	class: "admin-libraries__skel"
}, xe = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, Se = ["data-testid"], Ce = {
	key: 0,
	class: "admin-libraries__error"
}, we = ["data-testid"], Te = ["aria-valuenow", "aria-label"], Ee = { class: "admin-libraries__progress-meta" }, De = {
	key: 0,
	class: "admin-libraries__progress-file"
}, Oe = { class: "admin-libraries__actions" }, ke = { class: "admin-libraries__field" }, Ae = { class: "admin-libraries__field" }, je = ["value"], Me = {
	key: 2,
	class: "admin-libraries__hint-text"
}, Ne = { class: "admin-libraries__field" }, Pe = {
	key: 0,
	class: "admin-libraries__field"
}, Fe = { class: "admin-libraries__field" }, Ie = {
	key: 0,
	class: "admin-libraries__skel"
}, Le = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Re = { class: "admin-libraries__date" }, ze = { class: "admin-libraries__date" }, Be = 2e3, x = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let g = e, x = le("apiBase", ""), Ve = l(() => typeof x == "string" ? x : x?.value ?? ""), S = g.client ?? new r({
			baseUrl: Ve.value,
			tokenStore: new t()
		}), C = new se(S), He = new oe(S), w = i(), Ue = l(() => g.pollIntervalMs ?? Be), We = l(() => c.map((e) => ({
			value: e,
			label: e
		})));
		function T(e) {
			return e === "completed" || e === "failed";
		}
		function E(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function D(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function O(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function k(e) {
			if (!O(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function Ge(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function Ke(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let A = v([]), j = v(!0), M = v(null), N = v({}), P = {};
		function qe(e) {
			let t = P[e];
			t !== void 0 && (clearInterval(t), delete P[e]);
		}
		async function Je(e) {
			try {
				let t = await C.scanStatus(e);
				N.value = {
					...N.value,
					[e]: t
				}, (t === null || T(t.status)) && qe(e);
			} catch {
				qe(e);
			}
		}
		function Ye(e) {
			P[e] === void 0 && (P[e] = setInterval(() => {
				Je(e);
			}, Ue.value));
		}
		async function F() {
			j.value = !0, M.value = null;
			try {
				let e = await C.list();
				A.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await C.scanStatus(e.id);
						N.value = {
							...N.value,
							[e.id]: t
						}, t !== null && !T(t.status) && Ye(e.id);
					} catch {}
				}));
			} catch (e) {
				M.value = n(e, "Failed to load libraries."), w.error(M.value);
			} finally {
				j.value = !1;
			}
		}
		let I = v(!1), L = v(null), R = v(""), z = v(c[0]), B = v(""), V = v(!1), H = v(!1), Xe = l(() => L.value ? "Edit library" : "Add library"), U = v([]), W = v([]), G = v(!1), Ze = v(!1), Qe = [
			"imdb",
			"tmdb",
			"tvdb"
		], $e = l(() => z.value === "music" ? U.value.filter((e) => !Qe.includes(e)) : U.value), et = l(() => W.value.filter((e) => $e.value.includes(e)));
		async function tt() {
			if (!Ze.value) {
				Ze.value = !0;
				try {
					U.value = await He.listSources();
				} catch {
					U.value = [];
				}
			}
		}
		function nt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[z.value]) ? n[z.value].filter((e) => typeof e == "string") : [];
			W.value = r.length ? r : U.value.slice(), G.value = !1;
		}
		function rt(e) {
			W.value = e, G.value = !0;
		}
		he(U, () => {
			I.value && !G.value && W.value.length === 0 && (W.value = U.value.slice());
		});
		function it(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" ? [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase()) : !1;
		}
		function at() {
			return B.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function ot() {
			L.value = null, R.value = "", z.value = c[0], B.value = "", V.value = !1, nt(null), I.value = !0;
		}
		function st(e) {
			L.value = e, R.value = e.name, z.value = c.find((t) => t === e.type) ?? c[0], B.value = e.paths.join("\n"), V.value = it(e.options?.series_per_directory), nt(e), I.value = !0;
		}
		function K() {
			I.value = !1, L.value = null;
		}
		async function q() {
			if (!R.value.trim()) {
				w.error("Name is required.");
				return;
			}
			let e = at();
			if (e.length === 0) {
				w.error("Select at least one path.");
				return;
			}
			H.value = !0;
			try {
				let t = L.value, n = z.value === "series";
				if (t) {
					let r = {
						name: R.value,
						paths: e
					};
					n && (r.series_per_directory = V.value), G.value && (r.metadata_priority = W.value.length ? { [z.value]: W.value } : null), await C.update(t.id, r), w.success("Library updated.");
				} else {
					let t = {
						name: R.value,
						type: z.value,
						paths: e
					};
					n && (t.series_per_directory = V.value), G.value && (t.metadata_priority = W.value.length ? { [z.value]: W.value } : null);
					let r = await C.create(t);
					w.success(r.message || "Library created.");
				}
				K(), await F();
			} catch (e) {
				w.error(n(e, "Failed to save library."));
			} finally {
				H.value = !1;
			}
		}
		let J = v(null);
		async function ct() {
			let e = J.value;
			if (e) try {
				await C.remove(e.id), w.success("Library deleted."), J.value = null, await F();
			} catch (e) {
				w.error(n(e, "Failed to delete library.")), J.value = null;
			}
		}
		async function Y(e, t) {
			try {
				let n = t === "metadata" ? await C.matchMetadata(e.id) : t === "rescan" ? await C.rescan(e.id) : await C.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				w.success(n.message || r);
				let i = N.value[e.id];
				N.value = {
					...N.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, Ye(e.id), Je(e.id);
			} catch (e) {
				w.error(n(e, "Failed to queue scan."));
			}
		}
		let X = v(null), Z = v([]), Q = v(!1), lt = l(() => X.value ? `Scan history — ${X.value.name}` : "Scan history"), ut = l({
			get: () => X.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function dt(e) {
			X.value = e, Z.value = [], Q.value = !0;
			try {
				Z.value = await C.scanHistory(e.id);
			} catch (e) {
				w.error(n(e, "Failed to load history."));
			} finally {
				Q.value = !1;
			}
		}
		function $() {
			X.value = null, Z.value = [];
		}
		return fe(() => {
			tt(), F();
		}), de(() => {
			for (let e of Object.keys(P)) clearInterval(P[e]), delete P[e];
		}), (e, t) => (_(), f("section", ve, [
			p("header", ye, [t[9] ||= p("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: ot
			}, {
				default: b(() => [...t[8] ||= [m("Add library", -1)]]),
				_: 1
			})]),
			h(ie, null, {
				default: b(() => [...t[10] ||= [
					p("strong", null, "Scan", -1),
					m(" adds new files and updates changed ones (existing items are kept). ", -1),
					p("strong", null, "Rescan", -1),
					m(" clears the library and rebuilds it from scratch — use it after moving files or to repair bad matches. ", -1),
					p("strong", null, "Match metadata", -1),
					m(" (re)fetches posters and details for items already in the library. A live percentage is shown while any of these run. ", -1)
				]]),
				_: 1
			}),
			j.value ? (_(), f("div", be, [h(re, {
				variant: "text",
				lines: 6
			})])) : M.value ? (_(), u(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: M.value
			}, {
				actions: b(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: F
				}, {
					default: b(() => [...t[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (_(), u(s, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: b(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: ot
				}, {
					default: b(() => [...t[12] ||= [m("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", xe, [t[19] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Type"),
				p("th", { scope: "col" }, "Paths"),
				p("th", { scope: "col" }, "Status"),
				p("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(ce, null, pe(A.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, y(e.name), 1),
				p("td", null, y(e.type), 1),
				p("td", null, y(e.paths.length) + " paths", 1),
				p("td", null, [p("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [h(ee, { tone: D(N.value[e.id]) }, {
					default: b(() => [m(y(E(N.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), N.value[e.id]?.status === "failed" && N.value[e.id]?.error ? (_(), f("span", Ce, y(N.value[e.id]?.error), 1)) : O(N.value[e.id]) ? (_(), f("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					p("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": k(N.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [p("span", {
						class: "admin-libraries__progress-fill",
						style: ue({ width: k(N.value[e.id]) + "%" })
					}, null, 4)], 8, Te),
					p("span", Ee, y(k(N.value[e.id])) + "% · " + y(Ge(N.value[e.id])), 1),
					Ke(N.value[e.id]) ? (_(), f("span", De, y(Ke(N.value[e.id])), 1)) : d("", !0)
				], 8, we)) : d("", !0)], 8, Se)]),
				p("td", null, [p("div", Oe, [
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => st(e)
					}, {
						default: b(() => [...t[13] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: b(() => [...t[14] ||= [m(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: b(() => [...t[15] ||= [m(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: b(() => [...t[16] ||= [m(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => dt(e)
					}, {
						default: b(() => [...t[17] ||= [m(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: b(() => [...t[18] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(o, {
				modelValue: I.value,
				"onUpdate:modelValue": t[4] ||= (e) => I.value = e,
				title: Xe.value,
				onClose: K
			}, {
				footer: b(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: b(() => [...t[26] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: H.value,
					onClick: q
				}, {
					default: b(() => [m(y(L.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [p("form", {
					class: "admin-libraries__form",
					onSubmit: _e(q, ["prevent"])
				}, [
					p("label", ke, [t[20] ||= p("span", { class: "admin-libraries__label" }, "Name", -1), ge(p("input", {
						"onUpdate:modelValue": t[0] ||= (e) => R.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[me, R.value]])]),
					p("div", Ae, [
						t[21] ||= p("span", { class: "admin-libraries__label" }, "Type", -1),
						L.value ? (_(), f("input", {
							key: 0,
							class: "admin-libraries__input",
							value: z.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, je)) : (_(), u(ne, {
							key: 1,
							"model-value": z.value,
							options: We.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => z.value = String(e)
						}, null, 8, ["model-value", "options"])),
						L.value ? (_(), f("span", Me, "Type cannot be changed.")) : d("", !0)
					]),
					p("label", Ne, [t[22] ||= p("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ge(p("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => B.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[me, B.value]])]),
					z.value === "series" ? (_(), f("div", Pe, [h(te, {
						modelValue: V.value,
						"onUpdate:modelValue": t[3] ||= (e) => V.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[23] ||= p("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : d("", !0),
					p("div", Fe, [
						t[24] ||= p("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[25] ||= p("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						h(ae, {
							"model-value": et.value,
							available: $e.value,
							label: `${z.value} sources`,
							"onUpdate:modelValue": rt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					])
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
					default: b(() => [...t[29] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: ct
				}, {
					default: b(() => [...t[30] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: b(() => [p("p", null, [
					t[27] ||= m(" Delete library ", -1),
					p("strong", null, y(J.value?.name), 1),
					t[28] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				modelValue: ut.value,
				"onUpdate:modelValue": t[7] ||= (e) => ut.value = e,
				title: lt.value,
				size: "lg"
			}, {
				footer: b(() => [h(a, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: b(() => [...t[32] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: b(() => [Q.value ? (_(), f("div", Ie, [h(re, {
					variant: "text",
					lines: 4
				})])) : Z.value.length === 0 ? (_(), u(s, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (_(), f("table", Le, [t[31] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Status"),
					p("th", { scope: "col" }, "Queued"),
					p("th", { scope: "col" }, "Completed"),
					p("th", { scope: "col" }, "Error")
				])], -1), p("tbody", null, [(_(!0), f(ce, null, pe(Z.value, (e) => (_(), f("tr", { key: e.id }, [
					p("td", null, y(e.type), 1),
					p("td", null, [h(ee, { tone: D(e) }, {
						default: b(() => [m(y(E(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					p("td", Re, y(e.queued_at ?? ""), 1),
					p("td", ze, y(e.completed_at ?? ""), 1),
					p("td", null, y(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-1923c94b"]]);
//#endregion
export { x as default };

//# sourceMappingURL=LibrariesPage-BEmkyd0a.js.map