import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n, u as r } from "./Button-9cUUJmnN.js";
import { t as i } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Switch-CFZhdkXR.js";
import { t as te } from "./Select-DLwgQInL.js";
import { t as o } from "./Modal-I4tEFhoH.js";
import { t as ne } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { n as l, t as re } from "./libraries-CXAz_kXs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as y, ref as b, renderList as x, toDisplayString as S, vModelText as C, withCtx as w, withDirectives as T, withModifiers as se } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var ce = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, le = { class: "admin-libraries__head" }, ue = {
	key: 0,
	class: "admin-libraries__skel"
}, de = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, fe = ["data-testid"], pe = {
	key: 0,
	class: "admin-libraries__error"
}, me = { class: "admin-libraries__actions" }, he = { class: "admin-libraries__field" }, ge = { class: "admin-libraries__field" }, _e = ["value"], ve = {
	key: 2,
	class: "admin-libraries__hint-text"
}, ye = { class: "admin-libraries__field" }, be = {
	key: 0,
	class: "admin-libraries__field"
}, xe = {
	key: 0,
	class: "admin-libraries__skel"
}, Se = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Ce = { class: "admin-libraries__date" }, we = { class: "admin-libraries__date" }, Te = 2e3, E = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let v = e, E = ie("apiBase", ""), Ee = d(() => typeof E == "string" ? E : E?.value ?? ""), D = new re(v.client ?? new t({
			baseUrl: Ee.value,
			tokenStore: new i()
		})), O = ne(), De = d(() => v.pollIntervalMs ?? Te), Oe = d(() => l.map((e) => ({
			value: e,
			label: e
		})));
		function k(e) {
			return e === "completed" || e === "failed";
		}
		function ke(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function Ae(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let A = b([]), j = b(!0), M = b(null), N = b({}), P = {};
		function F(e) {
			let t = P[e];
			t !== void 0 && (clearInterval(t), delete P[e]);
		}
		async function I(e) {
			try {
				let t = await D.scanStatus(e);
				N.value = {
					...N.value,
					[e]: t
				}, (t === null || k(t.status)) && F(e);
			} catch {
				F(e);
			}
		}
		function L(e) {
			P[e] === void 0 && (P[e] = setInterval(() => {
				I(e);
			}, De.value));
		}
		async function R() {
			j.value = !0, M.value = null;
			try {
				let e = await D.list();
				A.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await D.scanStatus(e.id);
						N.value = {
							...N.value,
							[e.id]: t
						}, t !== null && !k(t.status) && L(e.id);
					} catch {}
				}));
			} catch (e) {
				M.value = r(e, "Failed to load libraries."), O.error(M.value);
			} finally {
				j.value = !1;
			}
		}
		let z = b(!1), B = b(null), V = b(""), H = b(l[0]), U = b(""), W = b(!1), G = b(!1), je = d(() => B.value ? "Edit library" : "Add library");
		function Me(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" ? [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase()) : !1;
		}
		function Ne() {
			return U.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function K() {
			B.value = null, V.value = "", H.value = l[0], U.value = "", W.value = !1, z.value = !0;
		}
		function Pe(e) {
			B.value = e, V.value = e.name, H.value = l.find((t) => t === e.type) ?? l[0], U.value = e.paths.join("\n"), W.value = Me(e.options?.series_per_directory), z.value = !0;
		}
		function q() {
			z.value = !1, B.value = null;
		}
		async function J() {
			if (!V.value.trim()) {
				O.error("Name is required.");
				return;
			}
			let e = Ne();
			if (e.length === 0) {
				O.error("Select at least one path.");
				return;
			}
			G.value = !0;
			try {
				let t = B.value, n = H.value === "series";
				if (t) {
					let r = {
						name: V.value,
						paths: e
					};
					n && (r.series_per_directory = W.value), await D.update(t.id, r), O.success("Library updated.");
				} else {
					let t = {
						name: V.value,
						type: H.value,
						paths: e
					};
					n && (t.series_per_directory = W.value);
					let r = await D.create(t);
					O.success(r.message || "Library created.");
				}
				q(), await R();
			} catch (e) {
				O.error(r(e, "Failed to save library."));
			} finally {
				G.value = !1;
			}
		}
		let Y = b(null);
		async function Fe() {
			let e = Y.value;
			if (e) try {
				await D.remove(e.id), O.success("Library deleted."), Y.value = null, await R();
			} catch (e) {
				O.error(r(e, "Failed to delete library.")), Y.value = null;
			}
		}
		async function X(e, t) {
			try {
				let n = t === "metadata" ? await D.matchMetadata(e.id) : t === "rescan" ? await D.rescan(e.id) : await D.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				O.success(n.message || r);
				let i = N.value[e.id];
				N.value = {
					...N.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, L(e.id), I(e.id);
			} catch (e) {
				O.error(r(e, "Failed to queue scan."));
			}
		}
		let Z = b(null), Q = b([]), $ = b(!1), Ie = d(() => Z.value ? `Scan history — ${Z.value.name}` : "Scan history"), Le = d({
			get: () => Z.value !== null,
			set: (e) => {
				e || ze();
			}
		});
		async function Re(e) {
			Z.value = e, Q.value = [], $.value = !0;
			try {
				Q.value = await D.scanHistory(e.id);
			} catch (e) {
				O.error(r(e, "Failed to load history."));
			} finally {
				$.value = !1;
			}
		}
		function ze() {
			Z.value = null, Q.value = [];
		}
		return oe(R), ae(() => {
			for (let e of Object.keys(P)) clearInterval(P[e]), delete P[e];
		}), (e, t) => (y(), m("section", ce, [
			h("header", le, [t[9] ||= h("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), _(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: K
			}, {
				default: w(() => [...t[8] ||= [g("Add library", -1)]]),
				_: 1
			})]),
			t[30] ||= h("p", { class: "admin-libraries__hint" }, " Scan progress is coarse in this release — only the lifecycle (queued / running / completed / failed) is reported, not per-file detail. ", -1),
			j.value ? (y(), m("div", ue, [_(s, {
				variant: "text",
				lines: 6
			})])) : M.value ? (y(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: M.value
			}, {
				actions: w(() => [_(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: R
				}, {
					default: w(() => [...t[10] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : A.value.length === 0 ? (y(), f(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: w(() => [_(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: K
				}, {
					default: w(() => [...t[11] ||= [g("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (y(), m("table", de, [t[18] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "Type"),
				h("th", { scope: "col" }, "Paths"),
				h("th", { scope: "col" }, "Status"),
				h("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(y(!0), m(u, null, x(A.value, (e) => (y(), m("tr", { key: e.id }, [
				h("td", null, S(e.name), 1),
				h("td", null, S(e.type), 1),
				h("td", null, S(e.paths.length) + " paths", 1),
				h("td", null, [h("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [_(a, { tone: Ae(N.value[e.id]) }, {
					default: w(() => [g(S(ke(N.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), N.value[e.id]?.status === "failed" && N.value[e.id]?.error ? (y(), m("span", pe, S(N.value[e.id]?.error), 1)) : p("", !0)], 8, fe)]),
				h("td", null, [h("div", me, [
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: w(() => [...t[12] ||= [g(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => X(e, "scan")
					}, {
						default: w(() => [...t[13] ||= [g(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => X(e, "rescan")
					}, {
						default: w(() => [...t[14] ||= [g(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => X(e, "metadata")
					}, {
						default: w(() => [...t[15] ||= [g(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Re(e)
					}, {
						default: w(() => [...t[16] ||= [g(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => Y.value = e
					}, {
						default: w(() => [...t[17] ||= [g(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			_(o, {
				modelValue: z.value,
				"onUpdate:modelValue": t[4] ||= (e) => z.value = e,
				title: je.value,
				onClose: q
			}, {
				footer: w(() => [_(n, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: w(() => [...t[23] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(n, {
					variant: "solid",
					size: "sm",
					loading: G.value,
					onClick: J
				}, {
					default: w(() => [g(S(B.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [h("form", {
					class: "admin-libraries__form",
					onSubmit: se(J, ["prevent"])
				}, [
					h("label", he, [t[19] ||= h("span", { class: "admin-libraries__label" }, "Name", -1), T(h("input", {
						"onUpdate:modelValue": t[0] ||= (e) => V.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[C, V.value]])]),
					h("div", ge, [
						t[20] ||= h("span", { class: "admin-libraries__label" }, "Type", -1),
						B.value ? (y(), m("input", {
							key: 0,
							class: "admin-libraries__input",
							value: H.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, _e)) : (y(), f(te, {
							key: 1,
							"model-value": H.value,
							options: Oe.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => H.value = String(e)
						}, null, 8, ["model-value", "options"])),
						B.value ? (y(), m("span", ve, "Type cannot be changed.")) : p("", !0)
					]),
					h("label", ye, [t[21] ||= h("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), T(h("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => U.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[C, U.value]])]),
					H.value === "series" ? (y(), m("div", be, [_(ee, {
						modelValue: W.value,
						"onUpdate:modelValue": t[3] ||= (e) => W.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[22] ||= h("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : p("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			_(o, {
				"model-value": Y.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => Y.value = null
			}, {
				footer: w(() => [_(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => Y.value = null
				}, {
					default: w(() => [...t[26] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(n, {
					variant: "solid",
					size: "sm",
					onClick: Fe
				}, {
					default: w(() => [...t[27] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: w(() => [h("p", null, [
					t[24] ||= g(" Delete library ", -1),
					h("strong", null, S(Y.value?.name), 1),
					t[25] ||= g("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(o, {
				modelValue: Le.value,
				"onUpdate:modelValue": t[7] ||= (e) => Le.value = e,
				title: Ie.value,
				size: "lg"
			}, {
				footer: w(() => [_(n, {
					variant: "solid",
					size: "sm",
					onClick: ze
				}, {
					default: w(() => [...t[29] ||= [g("Close", -1)]]),
					_: 1
				})]),
				default: w(() => [$.value ? (y(), m("div", xe, [_(s, {
					variant: "text",
					lines: 4
				})])) : Q.value.length === 0 ? (y(), f(c, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (y(), m("table", Se, [t[28] ||= h("thead", null, [h("tr", null, [
					h("th", { scope: "col" }, "Type"),
					h("th", { scope: "col" }, "Status"),
					h("th", { scope: "col" }, "Queued"),
					h("th", { scope: "col" }, "Completed"),
					h("th", { scope: "col" }, "Error")
				])], -1), h("tbody", null, [(y(!0), m(u, null, x(Q.value, (e) => (y(), m("tr", { key: e.id }, [
					h("td", null, S(e.type), 1),
					h("td", null, [_(a, { tone: Ae(e) }, {
						default: w(() => [g(S(ke(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					h("td", Ce, S(e.queued_at ?? ""), 1),
					h("td", we, S(e.completed_at ?? ""), 1),
					h("td", null, S(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-f1494230"]]);
//#endregion
export { E as default };

//# sourceMappingURL=LibrariesPage-BtGTlDDV.js.map