import { n as e } from "./Icon-24ngwBUH.js";
import { c as t, f as n, t as r } from "./client-fw74f3l_.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CInT03Lp.js";
import { t as ee } from "./Badge-DnDrMVUo.js";
import { t as te } from "./Switch-D-Y4B9p8.js";
import { t as ne } from "./Select-DHe4oeCr.js";
import { t as o } from "./Modal-CBoJ1z1N.js";
import { t as s } from "./Skeleton-BUq2D39t.js";
import { t as c } from "./EmptyState-0XgHKEGf.js";
import { t as re } from "./PageHint-DR8OWfto.js";
import { n as ie, t as ae } from "./metadata-sources-DdG90AUs.js";
import { n as l, t as oe } from "./libraries-CXAz_kXs.js";
import { Fragment as se, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ce, normalizeStyle as le, onBeforeUnmount as ue, onMounted as de, openBlock as v, ref as y, renderList as b, toDisplayString as x, vModelText as S, watch as fe, withCtx as C, withDirectives as w, withModifiers as pe } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var me = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, he = { class: "admin-libraries__head" }, ge = {
	key: 0,
	class: "admin-libraries__skel"
}, _e = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, ve = ["data-testid"], ye = {
	key: 0,
	class: "admin-libraries__error"
}, be = ["data-testid"], xe = ["aria-valuenow", "aria-label"], Se = { class: "admin-libraries__progress-meta" }, Ce = {
	key: 0,
	class: "admin-libraries__progress-file"
}, we = { class: "admin-libraries__actions" }, Te = { class: "admin-libraries__field" }, Ee = { class: "admin-libraries__field" }, De = ["value"], Oe = {
	key: 2,
	class: "admin-libraries__hint-text"
}, ke = { class: "admin-libraries__field" }, Ae = {
	key: 0,
	class: "admin-libraries__field"
}, je = { class: "admin-libraries__field" }, Me = {
	key: 0,
	class: "admin-libraries__skel"
}, Ne = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Pe = { class: "admin-libraries__date" }, Fe = { class: "admin-libraries__date" }, Ie = 2e3, T = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let _ = e, T = ce("apiBase", ""), Le = u(() => typeof T == "string" ? T : T?.value ?? ""), Re = _.client ?? new r({
			baseUrl: Le.value,
			tokenStore: new t()
		}), E = new oe(Re), ze = new ae(Re), D = i(), Be = u(() => _.pollIntervalMs ?? Ie), Ve = u(() => l.map((e) => ({
			value: e,
			label: e
		})));
		function He(e) {
			return e === "completed" || e === "failed";
		}
		function Ue(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function We(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function Ge(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function O(e) {
			if (!Ge(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function Ke(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function qe(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let k = y([]), A = y(!0), j = y(null), M = y({}), N = {};
		function P(e) {
			let t = N[e];
			t !== void 0 && (clearInterval(t), delete N[e]);
		}
		async function F(e) {
			try {
				let t = await E.scanStatus(e);
				M.value = {
					...M.value,
					[e]: t
				}, (t === null || He(t.status)) && P(e);
			} catch {
				P(e);
			}
		}
		function I(e) {
			N[e] === void 0 && (N[e] = setInterval(() => {
				F(e);
			}, Be.value));
		}
		async function L() {
			A.value = !0, j.value = null;
			try {
				let e = await E.list();
				k.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await E.scanStatus(e.id);
						M.value = {
							...M.value,
							[e.id]: t
						}, t !== null && !He(t.status) && I(e.id);
					} catch {}
				}));
			} catch (e) {
				j.value = n(e, "Failed to load libraries."), D.error(j.value);
			} finally {
				A.value = !1;
			}
		}
		let R = y(!1), z = y(null), B = y(""), V = y(l[0]), H = y(""), U = y(!1), W = y(!1), Je = u(() => z.value ? "Edit library" : "Add library"), G = y([]), K = y([]), q = y(!1), Ye = y(!1);
		async function Xe() {
			if (!Ye.value) {
				Ye.value = !0;
				try {
					G.value = await ze.listSources();
				} catch {
					G.value = [];
				}
			}
		}
		function Ze(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[V.value]) ? n[V.value].filter((e) => typeof e == "string") : [];
			K.value = r.length ? r : G.value.slice(), q.value = !1;
		}
		function Qe(e) {
			K.value = e, q.value = !0;
		}
		fe(G, () => {
			R.value && !q.value && K.value.length === 0 && (K.value = G.value.slice());
		});
		function $e(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" ? [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase()) : !1;
		}
		function et() {
			return H.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function tt() {
			z.value = null, B.value = "", V.value = l[0], H.value = "", U.value = !1, Ze(null), R.value = !0;
		}
		function nt(e) {
			z.value = e, B.value = e.name, V.value = l.find((t) => t === e.type) ?? l[0], H.value = e.paths.join("\n"), U.value = $e(e.options?.series_per_directory), Ze(e), R.value = !0;
		}
		function J() {
			R.value = !1, z.value = null;
		}
		async function rt() {
			if (!B.value.trim()) {
				D.error("Name is required.");
				return;
			}
			let e = et();
			if (e.length === 0) {
				D.error("Select at least one path.");
				return;
			}
			W.value = !0;
			try {
				let t = z.value, n = V.value === "series";
				if (t) {
					let r = {
						name: B.value,
						paths: e
					};
					n && (r.series_per_directory = U.value), q.value && (r.metadata_priority = K.value.length ? { [V.value]: K.value } : null), await E.update(t.id, r), D.success("Library updated.");
				} else {
					let t = {
						name: B.value,
						type: V.value,
						paths: e
					};
					n && (t.series_per_directory = U.value), q.value && (t.metadata_priority = K.value.length ? { [V.value]: K.value } : null);
					let r = await E.create(t);
					D.success(r.message || "Library created.");
				}
				J(), await L();
			} catch (e) {
				D.error(n(e, "Failed to save library."));
			} finally {
				W.value = !1;
			}
		}
		let Y = y(null);
		async function it() {
			let e = Y.value;
			if (e) try {
				await E.remove(e.id), D.success("Library deleted."), Y.value = null, await L();
			} catch (e) {
				D.error(n(e, "Failed to delete library.")), Y.value = null;
			}
		}
		async function X(e, t) {
			try {
				let n = t === "metadata" ? await E.matchMetadata(e.id) : t === "rescan" ? await E.rescan(e.id) : await E.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				D.success(n.message || r);
				let i = M.value[e.id];
				M.value = {
					...M.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, I(e.id), F(e.id);
			} catch (e) {
				D.error(n(e, "Failed to queue scan."));
			}
		}
		let Z = y(null), Q = y([]), $ = y(!1), at = u(() => Z.value ? `Scan history — ${Z.value.name}` : "Scan history"), ot = u({
			get: () => Z.value !== null,
			set: (e) => {
				e || ct();
			}
		});
		async function st(e) {
			Z.value = e, Q.value = [], $.value = !0;
			try {
				Q.value = await E.scanHistory(e.id);
			} catch (e) {
				D.error(n(e, "Failed to load history."));
			} finally {
				$.value = !1;
			}
		}
		function ct() {
			Z.value = null, Q.value = [];
		}
		return de(() => {
			Xe(), L();
		}), ue(() => {
			for (let e of Object.keys(N)) clearInterval(N[e]), delete N[e];
		}), (e, t) => (v(), p("section", me, [
			m("header", he, [t[9] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: tt
			}, {
				default: C(() => [...t[8] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			g(re, null, {
				default: C(() => [...t[10] ||= [
					m("strong", null, "Scan", -1),
					h(" adds new files and updates changed ones (existing items are kept). ", -1),
					m("strong", null, "Rescan", -1),
					h(" clears the library and rebuilds it from scratch — use it after moving files or to repair bad matches. ", -1),
					m("strong", null, "Match metadata", -1),
					h(" (re)fetches posters and details for items already in the library. A live percentage is shown while any of these run. ", -1)
				]]),
				_: 1
			}),
			A.value ? (v(), p("div", ge, [g(s, {
				variant: "text",
				lines: 6
			})])) : j.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: j.value
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: L
				}, {
					default: C(() => [...t[11] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value.length === 0 ? (v(), d(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: tt
				}, {
					default: C(() => [...t[12] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", _e, [t[19] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(se, null, b(k.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", null, x(e.type), 1),
				m("td", null, x(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [g(ee, { tone: We(M.value[e.id]) }, {
					default: C(() => [h(x(Ue(M.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), M.value[e.id]?.status === "failed" && M.value[e.id]?.error ? (v(), p("span", ye, x(M.value[e.id]?.error), 1)) : Ge(M.value[e.id]) ? (v(), p("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					m("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": O(M.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [m("span", {
						class: "admin-libraries__progress-fill",
						style: le({ width: O(M.value[e.id]) + "%" })
					}, null, 4)], 8, xe),
					m("span", Se, x(O(M.value[e.id])) + "% · " + x(Ke(M.value[e.id])), 1),
					qe(M.value[e.id]) ? (v(), p("span", Ce, x(qe(M.value[e.id])), 1)) : f("", !0)
				], 8, be)) : f("", !0)], 8, ve)]),
				m("td", null, [m("div", we, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => nt(e)
					}, {
						default: C(() => [...t[13] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => X(e, "scan")
					}, {
						default: C(() => [...t[14] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => X(e, "rescan")
					}, {
						default: C(() => [...t[15] ||= [h(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => X(e, "metadata")
					}, {
						default: C(() => [...t[16] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => st(e)
					}, {
						default: C(() => [...t[17] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => Y.value = e
					}, {
						default: C(() => [...t[18] ||= [h(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(o, {
				modelValue: R.value,
				"onUpdate:modelValue": t[4] ||= (e) => R.value = e,
				title: Je.value,
				onClose: J
			}, {
				footer: C(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: J
				}, {
					default: C(() => [...t[26] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: rt
				}, {
					default: C(() => [h(x(z.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: pe(rt, ["prevent"])
				}, [
					m("label", Te, [t[20] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), w(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => B.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[S, B.value]])]),
					m("div", Ee, [
						t[21] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						z.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: V.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, De)) : (v(), d(ne, {
							key: 1,
							"model-value": V.value,
							options: Ve.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => V.value = String(e)
						}, null, 8, ["model-value", "options"])),
						z.value ? (v(), p("span", Oe, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", ke, [t[22] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), w(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => H.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[S, H.value]])]),
					V.value === "series" ? (v(), p("div", Ae, [g(te, {
						modelValue: U.value,
						"onUpdate:modelValue": t[3] ||= (e) => U.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[23] ||= m("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : f("", !0),
					m("div", je, [
						t[24] ||= m("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[25] ||= m("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						g(ie, {
							"model-value": K.value,
							available: G.value,
							label: `${V.value} sources`,
							"onUpdate:modelValue": Qe
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(o, {
				"model-value": Y.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = null
			}, {
				footer: C(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => Y.value = null
				}, {
					default: C(() => [...t[29] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: it
				}, {
					default: C(() => [...t[30] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [m("p", null, [
					t[27] ||= h(" Delete library ", -1),
					m("strong", null, x(Y.value?.name), 1),
					t[28] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(o, {
				modelValue: ot.value,
				"onUpdate:modelValue": t[7] ||= (e) => ot.value = e,
				title: at.value,
				size: "lg"
			}, {
				footer: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					onClick: ct
				}, {
					default: C(() => [...t[32] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [$.value ? (v(), p("div", Me, [g(s, {
					variant: "text",
					lines: 4
				})])) : Q.value.length === 0 ? (v(), d(c, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", Ne, [t[31] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(se, null, b(Q.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, x(e.type), 1),
					m("td", null, [g(ee, { tone: We(e) }, {
						default: C(() => [h(x(Ue(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", Pe, x(e.queued_at ?? ""), 1),
					m("td", Fe, x(e.completed_at ?? ""), 1),
					m("td", null, x(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-a33c8e77"]]);
//#endregion
export { T as default };

//# sourceMappingURL=LibrariesPage-BAes7m0R.js.map