import { a as e, i as t, n, r, t as i, u as a } from "./tokenStore-DfQvvLGI.js";
import { t as o } from "./Modal-CoXJKJI4.js";
import { t as s } from "./EmptyState-Oymq15Ey.js";
import { t as ee } from "./Select-B0YIBPe2.js";
import { t as c } from "./Badge-Cmz5FPqw.js";
import { n as l, t as te } from "./libraries-CXAz_kXs.js";
import { Fragment as ne, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as re, onBeforeUnmount as ie, onMounted as ae, openBlock as v, ref as y, renderList as b, toDisplayString as x, vModelText as S, withCtx as C, withDirectives as w, withModifiers as oe } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, ce = { class: "admin-libraries__head" }, le = {
	key: 0,
	class: "admin-libraries__skel"
}, ue = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, de = ["data-testid"], fe = {
	key: 0,
	class: "admin-libraries__error"
}, pe = { class: "admin-libraries__actions" }, me = { class: "admin-libraries__field" }, he = { class: "admin-libraries__field" }, ge = ["value"], _e = {
	key: 2,
	class: "admin-libraries__hint-text"
}, ve = { class: "admin-libraries__field" }, ye = {
	key: 0,
	class: "admin-libraries__skel"
}, be = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, xe = { class: "admin-libraries__date" }, Se = { class: "admin-libraries__date" }, Ce = 2e3, T = /*#__PURE__*/ a(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(a) {
		let _ = a, T = re("apiBase", ""), we = u(() => typeof T == "string" ? T : T?.value ?? ""), E = new te(_.client ?? new e({
			baseUrl: we.value,
			tokenStore: new i()
		})), D = t(), Te = u(() => _.pollIntervalMs ?? Ce);
		function O(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let Ee = u(() => l.map((e) => ({
			value: e,
			label: e
		})));
		function k(e) {
			return e === "completed" || e === "failed";
		}
		function A(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function j(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let M = y([]), N = y(!0), P = y({}), F = {};
		function I(e) {
			let t = F[e];
			t !== void 0 && (clearInterval(t), delete F[e]);
		}
		async function De(e) {
			try {
				let t = await E.scanStatus(e);
				P.value = {
					...P.value,
					[e]: t
				}, (t === null || k(t.status)) && I(e);
			} catch {
				I(e);
			}
		}
		function L(e) {
			F[e] === void 0 && (F[e] = setInterval(() => {
				De(e);
			}, Te.value));
		}
		async function R() {
			N.value = !0;
			try {
				let e = await E.list();
				M.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await E.scanStatus(e.id);
						P.value = {
							...P.value,
							[e.id]: t
						}, t !== null && !k(t.status) && L(e.id);
					} catch {}
				}));
			} catch (e) {
				D.error(O(e, "Failed to load libraries."));
			} finally {
				N.value = !1;
			}
		}
		let z = y(!1), B = y(null), V = y(""), H = y(l[0]), U = y(""), W = y(!1), Oe = u(() => B.value ? "Edit library" : "Add library");
		function ke() {
			return U.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function G() {
			B.value = null, V.value = "", H.value = l[0], U.value = "", z.value = !0;
		}
		function Ae(e) {
			B.value = e, V.value = e.name, H.value = l.find((t) => t === e.type) ?? l[0], U.value = e.paths.join("\n"), z.value = !0;
		}
		function K() {
			z.value = !1, B.value = null;
		}
		async function q() {
			if (!V.value.trim()) {
				D.error("Name is required.");
				return;
			}
			let e = ke();
			if (e.length === 0) {
				D.error("Select at least one path.");
				return;
			}
			W.value = !0;
			try {
				let t = B.value;
				if (t) await E.update(t.id, {
					name: V.value,
					paths: e
				}), D.success("Library updated.");
				else {
					let t = await E.create({
						name: V.value,
						type: H.value,
						paths: e
					});
					D.success(t.message || "Library created.");
				}
				K(), await R();
			} catch (e) {
				D.error(O(e, "Failed to save library."));
			} finally {
				W.value = !1;
			}
		}
		let J = y(null);
		async function je() {
			let e = J.value;
			if (e) try {
				await E.remove(e.id), D.success("Library deleted."), J.value = null, await R();
			} catch (e) {
				D.error(O(e, "Failed to delete library.")), J.value = null;
			}
		}
		async function Y(e, t) {
			try {
				let n = t === "metadata" ? await E.matchMetadata(e.id) : t === "rescan" ? await E.rescan(e.id) : await E.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				D.success(n.message || r);
				let i = P.value[e.id];
				P.value = {
					...P.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, L(e.id), De(e.id);
			} catch (e) {
				D.error(O(e, "Failed to queue scan."));
			}
		}
		let X = y(null), Z = y([]), Q = y(!1), Me = u(() => X.value ? `Scan history — ${X.value.name}` : "Scan history"), Ne = u({
			get: () => X.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Pe(e) {
			X.value = e, Z.value = [], Q.value = !0;
			try {
				Z.value = await E.scanHistory(e.id);
			} catch (e) {
				D.error(O(e, "Failed to load history."));
			} finally {
				Q.value = !1;
			}
		}
		function $() {
			X.value = null, Z.value = [];
		}
		return ae(R), ie(() => {
			for (let e of Object.keys(F)) clearInterval(F[e]), delete F[e];
		}), (e, t) => (v(), p("section", se, [
			m("header", ce, [t[8] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: C(() => [...t[7] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			t[27] ||= m("p", { class: "admin-libraries__hint" }, " Scan progress is coarse in this release — only the lifecycle (queued / running / completed / failed) is reported, not per-file detail. ", -1),
			N.value ? (v(), p("div", le, [g(r, {
				variant: "text",
				lines: 6
			})])) : M.value.length === 0 ? (v(), d(s, {
				key: 1,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: C(() => [g(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: C(() => [...t[9] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", ue, [t[16] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(ne, null, b(M.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", null, x(e.type), 1),
				m("td", null, x(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [g(c, { tone: j(P.value[e.id]) }, {
					default: C(() => [h(x(A(P.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), P.value[e.id]?.status === "failed" && P.value[e.id]?.error ? (v(), p("span", fe, x(P.value[e.id]?.error), 1)) : f("", !0)], 8, de)]),
				m("td", null, [m("div", pe, [
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ae(e)
					}, {
						default: C(() => [...t[10] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: C(() => [...t[11] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: C(() => [...t[12] ||= [h(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: C(() => [...t[13] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: C(() => [...t[14] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: C(() => [...t[15] ||= [h(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(o, {
				modelValue: z.value,
				"onUpdate:modelValue": t[3] ||= (e) => z.value = e,
				title: Oe.value,
				onClose: K
			}, {
				footer: C(() => [g(n, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: C(() => [...t[20] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(n, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: C(() => [h(x(B.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: oe(q, ["prevent"])
				}, [
					m("label", me, [t[17] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), w(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => V.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[S, V.value]])]),
					m("div", he, [
						t[18] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						B.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: H.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, ge)) : (v(), d(ee, {
							key: 1,
							"model-value": H.value,
							options: Ee.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => H.value = String(e)
						}, null, 8, ["model-value", "options"])),
						B.value ? (v(), p("span", _e, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", ve, [t[19] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), w(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => U.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[S, U.value]])])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(o, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[5] ||= (e) => J.value = null
			}, {
				footer: C(() => [g(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[4] ||= (e) => J.value = null
				}, {
					default: C(() => [...t[23] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(n, {
					variant: "solid",
					size: "sm",
					onClick: je
				}, {
					default: C(() => [...t[24] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [m("p", null, [
					t[21] ||= h(" Delete library ", -1),
					m("strong", null, x(J.value?.name), 1),
					t[22] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(o, {
				modelValue: Ne.value,
				"onUpdate:modelValue": t[6] ||= (e) => Ne.value = e,
				title: Me.value,
				size: "lg"
			}, {
				footer: C(() => [g(n, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: C(() => [...t[26] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [Q.value ? (v(), p("div", ye, [g(r, {
					variant: "text",
					lines: 4
				})])) : Z.value.length === 0 ? (v(), d(s, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", be, [t[25] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(ne, null, b(Z.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, x(e.type), 1),
					m("td", null, [g(c, { tone: j(e) }, {
						default: C(() => [h(x(A(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", xe, x(e.queued_at ?? ""), 1),
					m("td", Se, x(e.completed_at ?? ""), 1),
					m("td", null, x(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-b6d52441"]]);
//#endregion
export { T as default };

//# sourceMappingURL=LibrariesPage-4q2Pgjvf.js.map