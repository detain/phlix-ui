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
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ce, normalizeStyle as le, onBeforeUnmount as ue, onMounted as de, openBlock as v, ref as y, renderList as b, toDisplayString as x, vModelText as fe, watch as pe, withCtx as S, withDirectives as me, withModifiers as he } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var ge = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, _e = { class: "admin-libraries__head" }, ve = {
	key: 0,
	class: "admin-libraries__skel"
}, ye = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, be = ["data-testid"], xe = {
	key: 0,
	class: "admin-libraries__error"
}, Se = ["data-testid"], Ce = ["aria-valuenow", "aria-label"], we = { class: "admin-libraries__progress-meta" }, Te = {
	key: 0,
	class: "admin-libraries__progress-file"
}, Ee = { class: "admin-libraries__actions" }, De = { class: "admin-libraries__field" }, Oe = { class: "admin-libraries__field" }, ke = ["value"], Ae = {
	key: 2,
	class: "admin-libraries__hint-text"
}, je = { class: "admin-libraries__field" }, Me = {
	key: 0,
	class: "admin-libraries__field"
}, Ne = { class: "admin-libraries__field" }, Pe = {
	key: 1,
	class: "admin-libraries__field"
}, Fe = {
	class: "admin-libraries__imagetypes",
	role: "group",
	"aria-label": "Artwork types"
}, Ie = { class: "admin-libraries__checkbox" }, Le = [
	"checked",
	"aria-label",
	"onChange"
], Re = { class: "admin-libraries__checkbox-text" }, ze = { class: "admin-libraries__checkbox-label" }, Be = {
	key: 0,
	class: "admin-libraries__checkbox-providers"
}, Ve = {
	key: 0,
	class: "admin-libraries__skel"
}, He = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Ue = { class: "admin-libraries__date" }, We = { class: "admin-libraries__date" }, Ge = 2e3, C = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let _ = e, C = ce("apiBase", ""), Ke = u(() => typeof C == "string" ? C : C?.value ?? ""), qe = _.client ?? new r({
			baseUrl: Ke.value,
			tokenStore: new t()
		}), w = new se(qe), Je = new oe(qe), T = i(), Ye = u(() => _.pollIntervalMs ?? Ge), Xe = u(() => c.map((e) => ({
			value: e,
			label: e
		})));
		function Ze(e) {
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
		function Qe(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function $e(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function D(e) {
			if (!$e(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function et(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function tt(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let O = y([]), k = y(!0), A = y(null), j = y({}), M = {};
		function nt(e) {
			let t = M[e];
			t !== void 0 && (clearInterval(t), delete M[e]);
		}
		async function rt(e) {
			try {
				let t = await w.scanStatus(e);
				j.value = {
					...j.value,
					[e]: t
				}, (t === null || Ze(t.status)) && nt(e);
			} catch {
				nt(e);
			}
		}
		function it(e) {
			M[e] === void 0 && (M[e] = setInterval(() => {
				rt(e);
			}, Ye.value));
		}
		async function N() {
			k.value = !0, A.value = null;
			try {
				let e = await w.list();
				O.value = e, st(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await w.scanStatus(e.id);
						j.value = {
							...j.value,
							[e.id]: t
						}, t !== null && !Ze(t.status) && it(e.id);
					} catch {}
				}));
			} catch (e) {
				A.value = n(e, "Failed to load libraries."), T.error(A.value);
			} finally {
				k.value = !1;
			}
		}
		let P = y(!1), F = y(null), I = y(""), L = y(c[0]), R = y(""), z = y(!1), B = y(!1), at = u(() => F.value ? "Edit library" : "Add library"), V = y([]), H = y([]), U = y(!1), ot = y(!1), W = y([]), G = y({}), K = y(!1);
		function st(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (W.value = t.image_types.available);
		}
		function ct(e) {
			let t = e?.image_types?.available ?? W.value;
			t.length && (W.value = t);
			let n = e?.image_types?.enabled ?? W.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of W.value) r[e.type] = n.includes(e.type);
			G.value = r, K.value = !1;
		}
		function lt(e, t) {
			G.value = {
				...G.value,
				[e]: t
			}, K.value = !0;
		}
		let ut = [
			"imdb",
			"tmdb",
			"tvdb"
		], dt = u(() => L.value === "music" ? V.value.filter((e) => !ut.includes(e)) : V.value), ft = u(() => H.value.filter((e) => dt.value.includes(e)));
		async function pt() {
			if (!ot.value) {
				ot.value = !0;
				try {
					V.value = await Je.listSources();
				} catch {
					V.value = [];
				}
			}
		}
		function mt(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[L.value]) ? n[L.value].filter((e) => typeof e == "string") : [];
			H.value = r.length ? r : V.value.slice(), U.value = !1;
		}
		function ht(e) {
			H.value = e, U.value = !0;
		}
		pe(V, () => {
			P.value && !U.value && H.value.length === 0 && (H.value = V.value.slice());
		});
		function gt(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" ? [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase()) : !1;
		}
		function _t() {
			return R.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function vt() {
			F.value = null, I.value = "", L.value = c[0], R.value = "", z.value = !1, mt(null), ct(null), P.value = !0;
		}
		function yt(e) {
			F.value = e, I.value = e.name, L.value = c.find((t) => t === e.type) ?? c[0], R.value = e.paths.join("\n"), z.value = gt(e.options?.series_per_directory), mt(e), ct(e), P.value = !0;
		}
		function q() {
			P.value = !1, F.value = null;
		}
		async function bt() {
			if (!I.value.trim()) {
				T.error("Name is required.");
				return;
			}
			let e = _t();
			if (e.length === 0) {
				T.error("Select at least one path.");
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
					n && (r.series_per_directory = z.value), U.value && (r.metadata_priority = H.value.length ? { [L.value]: H.value } : null), K.value && (r.image_types = { ...G.value }), await w.update(t.id, r), T.success("Library updated.");
				} else {
					let t = {
						name: I.value,
						type: L.value,
						paths: e
					};
					n && (t.series_per_directory = z.value), U.value && (t.metadata_priority = H.value.length ? { [L.value]: H.value } : null), K.value && (t.image_types = { ...G.value });
					let r = await w.create(t);
					T.success(r.message || "Library created.");
				}
				q(), await N();
			} catch (e) {
				T.error(n(e, "Failed to save library."));
			} finally {
				B.value = !1;
			}
		}
		let J = y(null);
		async function xt() {
			let e = J.value;
			if (e) try {
				await w.remove(e.id), T.success("Library deleted."), J.value = null, await N();
			} catch (e) {
				T.error(n(e, "Failed to delete library.")), J.value = null;
			}
		}
		async function Y(e, t) {
			try {
				let n = t === "metadata" ? await w.matchMetadata(e.id) : t === "rescan" ? await w.rescan(e.id) : await w.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				T.success(n.message || r);
				let i = j.value[e.id];
				j.value = {
					...j.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, it(e.id), rt(e.id);
			} catch (e) {
				T.error(n(e, "Failed to queue scan."));
			}
		}
		let X = y(null), Z = y([]), Q = y(!1), St = u(() => X.value ? `Scan history — ${X.value.name}` : "Scan history"), Ct = u({
			get: () => X.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function wt(e) {
			X.value = e, Z.value = [], Q.value = !0;
			try {
				Z.value = await w.scanHistory(e.id);
			} catch (e) {
				T.error(n(e, "Failed to load history."));
			} finally {
				Q.value = !1;
			}
		}
		function $() {
			X.value = null, Z.value = [];
		}
		return de(() => {
			pt(), N();
		}), ue(() => {
			for (let e of Object.keys(M)) clearInterval(M[e]), delete M[e];
		}), (e, t) => (v(), p("section", ge, [
			m("header", _e, [t[9] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: vt
			}, {
				default: S(() => [...t[8] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			g(ie, null, {
				default: S(() => [...t[10] ||= [
					m("strong", null, "Scan", -1),
					h(" adds new files and updates changed ones (existing items are kept). ", -1),
					m("strong", null, "Rescan", -1),
					h(" clears the library and rebuilds it from scratch — use it after moving files or to repair bad matches. ", -1),
					m("strong", null, "Match metadata", -1),
					h(" (re)fetches posters and details for items already in the library. A live percentage is shown while any of these run. ", -1)
				]]),
				_: 1
			}),
			k.value ? (v(), p("div", ve, [g(re, {
				variant: "text",
				lines: 6
			})])) : A.value ? (v(), d(s, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: A.value
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: S(() => [...t[11] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : O.value.length === 0 ? (v(), d(s, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: vt
				}, {
					default: S(() => [...t[12] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", ye, [t[19] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(l, null, b(O.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", null, x(e.type), 1),
				m("td", null, x(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [g(ee, { tone: Qe(j.value[e.id]) }, {
					default: S(() => [h(x(E(j.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), j.value[e.id]?.status === "failed" && j.value[e.id]?.error ? (v(), p("span", xe, x(j.value[e.id]?.error), 1)) : $e(j.value[e.id]) ? (v(), p("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					m("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": D(j.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [m("span", {
						class: "admin-libraries__progress-fill",
						style: le({ width: D(j.value[e.id]) + "%" })
					}, null, 4)], 8, Ce),
					m("span", we, x(D(j.value[e.id])) + "% · " + x(et(j.value[e.id])), 1),
					tt(j.value[e.id]) ? (v(), p("span", Te, x(tt(j.value[e.id])), 1)) : f("", !0)
				], 8, Se)) : f("", !0)], 8, be)]),
				m("td", null, [m("div", Ee, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => yt(e)
					}, {
						default: S(() => [...t[13] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: S(() => [...t[14] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: S(() => [...t[15] ||= [h(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: S(() => [...t[16] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => wt(e)
					}, {
						default: S(() => [...t[17] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: S(() => [...t[18] ||= [h(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(o, {
				modelValue: P.value,
				"onUpdate:modelValue": t[4] ||= (e) => P.value = e,
				title: at.value,
				onClose: q
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: S(() => [...t[28] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					loading: B.value,
					onClick: bt
				}, {
					default: S(() => [h(x(F.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: he(bt, ["prevent"])
				}, [
					m("label", De, [t[20] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), me(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => I.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[fe, I.value]])]),
					m("div", Oe, [
						t[21] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						F.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: L.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, ke)) : (v(), d(ne, {
							key: 1,
							"model-value": L.value,
							options: Xe.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => L.value = String(e)
						}, null, 8, ["model-value", "options"])),
						F.value ? (v(), p("span", Ae, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", je, [t[22] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), me(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => R.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[fe, R.value]])]),
					L.value === "series" ? (v(), p("div", Me, [g(te, {
						modelValue: z.value,
						"onUpdate:modelValue": t[3] ||= (e) => z.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[23] ||= m("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : f("", !0),
					m("div", Ne, [
						t[24] ||= m("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						t[25] ||= m("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						g(ae, {
							"model-value": ft.value,
							available: dt.value,
							label: `${L.value} sources`,
							"onUpdate:modelValue": ht
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					W.value.length ? (v(), p("div", Pe, [
						t[26] ||= m("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						t[27] ||= m("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						m("ul", Fe, [(v(!0), p(l, null, b(W.value, (e) => (v(), p("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [m("label", Ie, [m("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: G.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => lt(e.type, t.target.checked)
						}, null, 40, Le), m("span", Re, [m("span", ze, x(e.label), 1), e.providers.length ? (v(), p("span", Be, x(e.providers.join(", ")), 1)) : f("", !0)])])]))), 128))])
					])) : f("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(o, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: S(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: S(() => [...t[31] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
					variant: "solid",
					size: "sm",
					onClick: xt
				}, {
					default: S(() => [...t[32] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [m("p", null, [
					t[29] ||= h(" Delete library ", -1),
					m("strong", null, x(J.value?.name), 1),
					t[30] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(o, {
				modelValue: Ct.value,
				"onUpdate:modelValue": t[7] ||= (e) => Ct.value = e,
				title: St.value,
				size: "lg"
			}, {
				footer: S(() => [g(a, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: S(() => [...t[34] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [Q.value ? (v(), p("div", Ve, [g(re, {
					variant: "text",
					lines: 4
				})])) : Z.value.length === 0 ? (v(), d(s, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", He, [t[33] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(l, null, b(Z.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, x(e.type), 1),
					m("td", null, [g(ee, { tone: Qe(e) }, {
						default: S(() => [h(x(E(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", Ue, x(e.queued_at ?? ""), 1),
					m("td", We, x(e.completed_at ?? ""), 1),
					m("td", null, x(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-cdced808"]]);
//#endregion
export { C as default };

//# sourceMappingURL=LibrariesPage-DXUcr7b3.js.map