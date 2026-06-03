import { a as e, i as t, m as n, n as r, r as i, t as a } from "./Button-DjEQ9y17.js";
import { t as o } from "./Modal-BkSAbwHm.js";
import { t as s } from "./EmptyState-bbKd8GNA.js";
import { t as ee } from "./Select-BPlN5xaU.js";
import { t as c } from "./Badge-DobVc76J.js";
import { n as l, t as te } from "./libraries-CXAz_kXs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ne, onBeforeUnmount as re, onMounted as ie, openBlock as y, ref as b, renderList as x, toDisplayString as S, vModelText as ae, withCtx as C, withDirectives as w, withModifiers as oe } from "vue";
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
}, xe = { class: "admin-libraries__date" }, Se = { class: "admin-libraries__date" }, Ce = 2e3, T = /*#__PURE__*/ n(/* @__PURE__ */ v({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(n) {
		let v = n, T = ne("apiBase", ""), we = d(() => typeof T == "string" ? T : T?.value ?? ""), E = new te(v.client ?? new e({
			baseUrl: we.value,
			tokenStore: new t()
		})), D = i(), Te = d(() => v.pollIntervalMs ?? Ce);
		function O(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		let Ee = d(() => l.map((e) => ({
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
		let M = b([]), N = b(!0), P = b({}), F = {};
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
				}, (t === null || k(t.status)) && I(e);
			} catch {
				I(e);
			}
		}
		function De(e) {
			F[e] === void 0 && (F[e] = setInterval(() => {
				L(e);
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
						}, t !== null && !k(t.status) && De(e.id);
					} catch {}
				}));
			} catch (e) {
				D.error(O(e, "Failed to load libraries."));
			} finally {
				N.value = !1;
			}
		}
		let z = b(!1), B = b(null), V = b(""), H = b(l[0]), U = b(""), W = b(!1), Oe = d(() => B.value ? "Edit library" : "Add library");
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
		let J = b(null);
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
				}, De(e.id), L(e.id);
			} catch (e) {
				D.error(O(e, "Failed to queue scan."));
			}
		}
		let X = b(null), Z = b([]), Q = b(!1), Me = d(() => X.value ? `Scan history — ${X.value.name}` : "Scan history"), Ne = d({
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
		return ie(R), re(() => {
			for (let e of Object.keys(F)) clearInterval(F[e]), delete F[e];
		}), (e, t) => (y(), m("section", se, [
			h("header", ce, [t[8] ||= h("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), _(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: G
			}, {
				default: C(() => [...t[7] ||= [g("Add library", -1)]]),
				_: 1
			})]),
			t[27] ||= h("p", { class: "admin-libraries__hint" }, " Scan progress is coarse in this release — only the lifecycle (queued / running / completed / failed) is reported, not per-file detail. ", -1),
			N.value ? (y(), m("div", le, [_(r, {
				variant: "text",
				lines: 6
			})])) : M.value.length === 0 ? (y(), f(s, {
				key: 1,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: C(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: G
				}, {
					default: C(() => [...t[9] ||= [g("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (y(), m("table", ue, [t[16] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "Type"),
				h("th", { scope: "col" }, "Paths"),
				h("th", { scope: "col" }, "Status"),
				h("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(y(!0), m(u, null, x(M.value, (e) => (y(), m("tr", { key: e.id }, [
				h("td", null, S(e.name), 1),
				h("td", null, S(e.type), 1),
				h("td", null, S(e.paths.length) + " paths", 1),
				h("td", null, [h("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [_(c, { tone: j(P.value[e.id]) }, {
					default: C(() => [g(S(A(P.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), P.value[e.id]?.status === "failed" && P.value[e.id]?.error ? (y(), m("span", fe, S(P.value[e.id]?.error), 1)) : p("", !0)], 8, de)]),
				h("td", null, [h("div", pe, [
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ae(e)
					}, {
						default: C(() => [...t[10] ||= [g(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: C(() => [...t[11] ||= [g(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: C(() => [...t[12] ||= [g(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: C(() => [...t[13] ||= [g(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: C(() => [...t[14] ||= [g(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: C(() => [...t[15] ||= [g(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			_(o, {
				modelValue: z.value,
				"onUpdate:modelValue": t[3] ||= (e) => z.value = e,
				title: Oe.value,
				onClose: K
			}, {
				footer: C(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: C(() => [...t[20] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: q
				}, {
					default: C(() => [g(S(B.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [h("form", {
					class: "admin-libraries__form",
					onSubmit: oe(q, ["prevent"])
				}, [
					h("label", me, [t[17] ||= h("span", { class: "admin-libraries__label" }, "Name", -1), w(h("input", {
						"onUpdate:modelValue": t[0] ||= (e) => V.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[ae, V.value]])]),
					h("div", he, [
						t[18] ||= h("span", { class: "admin-libraries__label" }, "Type", -1),
						B.value ? (y(), m("input", {
							key: 0,
							class: "admin-libraries__input",
							value: H.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, ge)) : (y(), f(ee, {
							key: 1,
							"model-value": H.value,
							options: Ee.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => H.value = String(e)
						}, null, 8, ["model-value", "options"])),
						B.value ? (y(), m("span", _e, "Type cannot be changed.")) : p("", !0)
					]),
					h("label", ve, [t[19] ||= h("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), w(h("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => U.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[ae, U.value]])])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			_(o, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[5] ||= (e) => J.value = null
			}, {
				footer: C(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[4] ||= (e) => J.value = null
				}, {
					default: C(() => [...t[23] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					onClick: je
				}, {
					default: C(() => [...t[24] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: C(() => [h("p", null, [
					t[21] ||= g(" Delete library ", -1),
					h("strong", null, S(J.value?.name), 1),
					t[22] ||= g("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(o, {
				modelValue: Ne.value,
				"onUpdate:modelValue": t[6] ||= (e) => Ne.value = e,
				title: Me.value,
				size: "lg"
			}, {
				footer: C(() => [_(a, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: C(() => [...t[26] ||= [g("Close", -1)]]),
					_: 1
				})]),
				default: C(() => [Q.value ? (y(), m("div", ye, [_(r, {
					variant: "text",
					lines: 4
				})])) : Z.value.length === 0 ? (y(), f(s, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (y(), m("table", be, [t[25] ||= h("thead", null, [h("tr", null, [
					h("th", { scope: "col" }, "Type"),
					h("th", { scope: "col" }, "Status"),
					h("th", { scope: "col" }, "Queued"),
					h("th", { scope: "col" }, "Completed"),
					h("th", { scope: "col" }, "Error")
				])], -1), h("tbody", null, [(y(!0), m(u, null, x(Z.value, (e) => (y(), m("tr", { key: e.id }, [
					h("td", null, S(e.type), 1),
					h("td", null, [_(c, { tone: j(e) }, {
						default: C(() => [g(S(A(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					h("td", xe, S(e.queued_at ?? ""), 1),
					h("td", Se, S(e.completed_at ?? ""), 1),
					h("td", null, S(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-b6d52441"]]);
//#endregion
export { T as default };

//# sourceMappingURL=LibrariesPage-B2NOdaMq.js.map