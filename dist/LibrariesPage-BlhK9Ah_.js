import { a as e, f as t, h as n, i as r, n as i, o as ee, r as te, t as a } from "./Button-C86XulWV.js";
import { t as o } from "./Modal-DaapuyD8.js";
import { t as ne } from "./Select-CjbYOZGH.js";
import { t as s } from "./Badge-BiYXL5Nz.js";
import { n as c, t as re } from "./libraries-CXAz_kXs.js";
import { Fragment as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as v, ref as y, renderList as b, toDisplayString as x, vModelText as S, withCtx as C, withDirectives as w, withModifiers as se } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var ce = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, le = { class: "admin-libraries__head" }, ue = {
	key: 0,
	class: "admin-libraries__skel"
}, de = {
	key: 2,
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
	class: "admin-libraries__skel"
}, xe = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Se = { class: "admin-libraries__date" }, Ce = { class: "admin-libraries__date" }, we = 2e3, T = /*#__PURE__*/ n(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(n) {
		let _ = n, T = ie("apiBase", ""), Te = u(() => typeof T == "string" ? T : T?.value ?? ""), E = new re(_.client ?? new ee({
			baseUrl: Te.value,
			tokenStore: new e()
		})), D = r(), Ee = u(() => _.pollIntervalMs ?? we), De = u(() => c.map((e) => ({
			value: e,
			label: e
		})));
		function O(e) {
			return e === "completed" || e === "failed";
		}
		function k(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function A(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let j = y([]), M = y(!0), N = y({}), P = {};
		function F(e) {
			let t = P[e];
			t !== void 0 && (clearInterval(t), delete P[e]);
		}
		async function I(e) {
			try {
				let t = await E.scanStatus(e);
				N.value = {
					...N.value,
					[e]: t
				}, (t === null || O(t.status)) && F(e);
			} catch {
				F(e);
			}
		}
		function L(e) {
			P[e] === void 0 && (P[e] = setInterval(() => {
				I(e);
			}, Ee.value));
		}
		async function R() {
			M.value = !0;
			try {
				let e = await E.list();
				j.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await E.scanStatus(e.id);
						N.value = {
							...N.value,
							[e.id]: t
						}, t !== null && !O(t.status) && L(e.id);
					} catch {}
				}));
			} catch (e) {
				D.error(t(e, "Failed to load libraries."));
			} finally {
				M.value = !1;
			}
		}
		let z = y(!1), B = y(null), V = y(""), H = y(c[0]), U = y(""), W = y(!1), Oe = u(() => B.value ? "Edit library" : "Add library");
		function ke() {
			return U.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function G() {
			B.value = null, V.value = "", H.value = c[0], U.value = "", z.value = !0;
		}
		function Ae(e) {
			B.value = e, V.value = e.name, H.value = c.find((t) => t === e.type) ?? c[0], U.value = e.paths.join("\n"), z.value = !0;
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
				D.error(t(e, "Failed to save library."));
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
				D.error(t(e, "Failed to delete library.")), J.value = null;
			}
		}
		async function Y(e, n) {
			try {
				let t = n === "metadata" ? await E.matchMetadata(e.id) : n === "rescan" ? await E.rescan(e.id) : await E.scan(e.id), r = n === "metadata" ? `Metadata match queued (job ${t.job_id}).` : `Scan queued (job ${t.job_id}).`;
				D.success(t.message || r);
				let i = N.value[e.id];
				N.value = {
					...N.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, L(e.id), I(e.id);
			} catch (e) {
				D.error(t(e, "Failed to queue scan."));
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
				D.error(t(e, "Failed to load history."));
			} finally {
				Q.value = !1;
			}
		}
		function $() {
			X.value = null, Z.value = [];
		}
		return oe(R), ae(() => {
			for (let e of Object.keys(P)) clearInterval(P[e]), delete P[e];
		}), (e, t) => (v(), p("section", ce, [
			m("header", le, [t[8] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: C(() => [...t[7] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			t[27] ||= m("p", { class: "admin-libraries__hint" }, " Scan progress is coarse in this release — only the lifecycle (queued / running / completed / failed) is reported, not per-file detail. ", -1),
			M.value ? (v(), p("div", ue, [g(i, {
				variant: "text",
				lines: 6
			})])) : j.value.length === 0 ? (v(), d(te, {
				key: 1,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: C(() => [...t[9] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", de, [t[16] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(l, null, b(j.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", null, x(e.type), 1),
				m("td", null, x(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [g(s, { tone: A(N.value[e.id]) }, {
					default: C(() => [h(x(k(N.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), N.value[e.id]?.status === "failed" && N.value[e.id]?.error ? (v(), p("span", pe, x(N.value[e.id]?.error), 1)) : f("", !0)], 8, fe)]),
				m("td", null, [m("div", me, [
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ae(e)
					}, {
						default: C(() => [...t[10] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: C(() => [...t[11] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: C(() => [...t[12] ||= [h(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: C(() => [...t[13] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: C(() => [...t[14] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(a, {
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
				footer: C(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: C(() => [...t[20] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
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
					onSubmit: se(q, ["prevent"])
				}, [
					m("label", he, [t[17] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), w(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => V.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[S, V.value]])]),
					m("div", ge, [
						t[18] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						B.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: H.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, _e)) : (v(), d(ne, {
							key: 1,
							"model-value": H.value,
							options: De.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => H.value = String(e)
						}, null, 8, ["model-value", "options"])),
						B.value ? (v(), p("span", ve, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", ye, [t[19] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), w(m("textarea", {
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
				footer: C(() => [g(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[4] ||= (e) => J.value = null
				}, {
					default: C(() => [...t[23] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(a, {
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
				footer: C(() => [g(a, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: C(() => [...t[26] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [Q.value ? (v(), p("div", be, [g(i, {
					variant: "text",
					lines: 4
				})])) : Z.value.length === 0 ? (v(), d(te, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", xe, [t[25] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(l, null, b(Z.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, x(e.type), 1),
					m("td", null, [g(s, { tone: A(e) }, {
						default: C(() => [h(x(k(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", Se, x(e.queued_at ?? ""), 1),
					m("td", Ce, x(e.completed_at ?? ""), 1),
					m("td", null, x(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-42b164f5"]]);
//#endregion
export { T as default };

//# sourceMappingURL=LibrariesPage-BlhK9Ah_.js.map