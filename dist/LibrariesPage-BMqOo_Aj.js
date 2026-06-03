import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, n, t as r } from "./Button-BFaMKqH5.js";
import { t as i } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Select-bu72i41G.js";
import { t as o } from "./Modal-DWJvE4oJ.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { n as s, t as c } from "./EmptyState-Ds4WcVdG.js";
import { n as l, t as ne } from "./libraries-CXAz_kXs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as re, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ie, onBeforeUnmount as ae, onMounted as oe, openBlock as v, ref as y, renderList as b, toDisplayString as x, vModelText as S, withCtx as C, withDirectives as w, withModifiers as se } from "vue";
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
	class: "admin-libraries__skel"
}, xe = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, Se = { class: "admin-libraries__date" }, Ce = { class: "admin-libraries__date" }, we = 2e3, T = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let _ = e, T = ie("apiBase", ""), Te = d(() => typeof T == "string" ? T : T?.value ?? ""), E = new ne(_.client ?? new n({
			baseUrl: Te.value,
			tokenStore: new i()
		})), D = te(), Ee = d(() => _.pollIntervalMs ?? we), De = d(() => l.map((e) => ({
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
		let j = y([]), M = y(!0), N = y(null), P = y({}), F = {};
		function I(e) {
			let t = F[e];
			t !== void 0 && (clearInterval(t), delete F[e]);
		}
		async function L(e) {
			try {
				let t = await E.scanStatus(e);
				P.value = {
					...P.value,
					[e]: t
				}, (t === null || O(t.status)) && I(e);
			} catch {
				I(e);
			}
		}
		function R(e) {
			F[e] === void 0 && (F[e] = setInterval(() => {
				L(e);
			}, Ee.value));
		}
		async function z() {
			M.value = !0, N.value = null;
			try {
				let e = await E.list();
				j.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await E.scanStatus(e.id);
						P.value = {
							...P.value,
							[e.id]: t
						}, t !== null && !O(t.status) && R(e.id);
					} catch {}
				}));
			} catch (e) {
				N.value = t(e, "Failed to load libraries."), D.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let B = y(!1), V = y(null), H = y(""), U = y(l[0]), W = y(""), G = y(!1), Oe = d(() => V.value ? "Edit library" : "Add library");
		function ke() {
			return W.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function K() {
			V.value = null, H.value = "", U.value = l[0], W.value = "", B.value = !0;
		}
		function Ae(e) {
			V.value = e, H.value = e.name, U.value = l.find((t) => t === e.type) ?? l[0], W.value = e.paths.join("\n"), B.value = !0;
		}
		function q() {
			B.value = !1, V.value = null;
		}
		async function J() {
			if (!H.value.trim()) {
				D.error("Name is required.");
				return;
			}
			let e = ke();
			if (e.length === 0) {
				D.error("Select at least one path.");
				return;
			}
			G.value = !0;
			try {
				let t = V.value;
				if (t) await E.update(t.id, {
					name: H.value,
					paths: e
				}), D.success("Library updated.");
				else {
					let t = await E.create({
						name: H.value,
						type: U.value,
						paths: e
					});
					D.success(t.message || "Library created.");
				}
				q(), await z();
			} catch (e) {
				D.error(t(e, "Failed to save library."));
			} finally {
				G.value = !1;
			}
		}
		let Y = y(null);
		async function je() {
			let e = Y.value;
			if (e) try {
				await E.remove(e.id), D.success("Library deleted."), Y.value = null, await z();
			} catch (e) {
				D.error(t(e, "Failed to delete library.")), Y.value = null;
			}
		}
		async function X(e, n) {
			try {
				let t = n === "metadata" ? await E.matchMetadata(e.id) : n === "rescan" ? await E.rescan(e.id) : await E.scan(e.id), r = n === "metadata" ? `Metadata match queued (job ${t.job_id}).` : `Scan queued (job ${t.job_id}).`;
				D.success(t.message || r);
				let i = P.value[e.id];
				P.value = {
					...P.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, R(e.id), L(e.id);
			} catch (e) {
				D.error(t(e, "Failed to queue scan."));
			}
		}
		let Z = y(null), Q = y([]), $ = y(!1), Me = d(() => Z.value ? `Scan history — ${Z.value.name}` : "Scan history"), Ne = d({
			get: () => Z.value !== null,
			set: (e) => {
				e || Fe();
			}
		});
		async function Pe(e) {
			Z.value = e, Q.value = [], $.value = !0;
			try {
				Q.value = await E.scanHistory(e.id);
			} catch (e) {
				D.error(t(e, "Failed to load history."));
			} finally {
				$.value = !1;
			}
		}
		function Fe() {
			Z.value = null, Q.value = [];
		}
		return oe(z), ae(() => {
			for (let e of Object.keys(F)) clearInterval(F[e]), delete F[e];
		}), (e, t) => (v(), p("section", ce, [
			m("header", le, [t[8] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: K
			}, {
				default: C(() => [...t[7] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			t[28] ||= m("p", { class: "admin-libraries__hint" }, " Scan progress is coarse in this release — only the lifecycle (queued / running / completed / failed) is reported, not per-file detail. ", -1),
			M.value ? (v(), p("div", ue, [g(s, {
				variant: "text",
				lines: 6
			})])) : N.value ? (v(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: N.value
			}, {
				actions: C(() => [g(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: z
				}, {
					default: C(() => [...t[9] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (v(), f(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: C(() => [g(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: K
				}, {
					default: C(() => [...t[10] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", de, [t[17] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(u, null, b(j.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, x(e.name), 1),
				m("td", null, x(e.type), 1),
				m("td", null, x(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [g(a, { tone: A(P.value[e.id]) }, {
					default: C(() => [h(x(k(P.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), P.value[e.id]?.status === "failed" && P.value[e.id]?.error ? (v(), p("span", pe, x(P.value[e.id]?.error), 1)) : re("", !0)], 8, fe)]),
				m("td", null, [m("div", me, [
					g(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ae(e)
					}, {
						default: C(() => [...t[11] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => X(e, "scan")
					}, {
						default: C(() => [...t[12] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => X(e, "rescan")
					}, {
						default: C(() => [...t[13] ||= [h(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => X(e, "metadata")
					}, {
						default: C(() => [...t[14] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: C(() => [...t[15] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => Y.value = e
					}, {
						default: C(() => [...t[16] ||= [h(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(o, {
				modelValue: B.value,
				"onUpdate:modelValue": t[3] ||= (e) => B.value = e,
				title: Oe.value,
				onClose: q
			}, {
				footer: C(() => [g(r, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: C(() => [...t[21] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(r, {
					variant: "solid",
					size: "sm",
					loading: G.value,
					onClick: J
				}, {
					default: C(() => [h(x(V.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: se(J, ["prevent"])
				}, [
					m("label", he, [t[18] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), w(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[S, H.value]])]),
					m("div", ge, [
						t[19] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						V.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: U.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, _e)) : (v(), f(ee, {
							key: 1,
							"model-value": U.value,
							options: De.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => U.value = String(e)
						}, null, 8, ["model-value", "options"])),
						V.value ? (v(), p("span", ve, "Type cannot be changed.")) : re("", !0)
					]),
					m("label", ye, [t[20] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), w(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => W.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[S, W.value]])])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(o, {
				"model-value": Y.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[5] ||= (e) => Y.value = null
			}, {
				footer: C(() => [g(r, {
					variant: "ghost",
					size: "sm",
					onClick: t[4] ||= (e) => Y.value = null
				}, {
					default: C(() => [...t[24] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(r, {
					variant: "solid",
					size: "sm",
					onClick: je
				}, {
					default: C(() => [...t[25] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [m("p", null, [
					t[22] ||= h(" Delete library ", -1),
					m("strong", null, x(Y.value?.name), 1),
					t[23] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(o, {
				modelValue: Ne.value,
				"onUpdate:modelValue": t[6] ||= (e) => Ne.value = e,
				title: Me.value,
				size: "lg"
			}, {
				footer: C(() => [g(r, {
					variant: "solid",
					size: "sm",
					onClick: Fe
				}, {
					default: C(() => [...t[27] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [$.value ? (v(), p("div", be, [g(s, {
					variant: "text",
					lines: 4
				})])) : Q.value.length === 0 ? (v(), f(c, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", xe, [t[26] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(u, null, b(Q.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, x(e.type), 1),
					m("td", null, [g(a, { tone: A(e) }, {
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
}), [["__scopeId", "data-v-59e9c359"]]);
//#endregion
export { T as default };

//# sourceMappingURL=LibrariesPage-BMqOo_Aj.js.map