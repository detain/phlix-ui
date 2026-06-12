import { n as e } from "./Icon-ax5k7_G2.js";
import { n as t, t as n, u as r } from "./Button-9cUUJmnN.js";
import { t as i } from "./tokenStore-CGMYSpg6.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Select-DLwgQInL.js";
import { t as o } from "./Modal-I4tEFhoH.js";
import { t as te } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { n as l, t as ne } from "./libraries-CXAz_kXs.js";
import { Fragment as u, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as re, onBeforeUnmount as ie, onMounted as ae, openBlock as y, ref as b, renderList as x, toDisplayString as S, vModelText as C, withCtx as w, withDirectives as T, withModifiers as oe } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var se = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, ce = { class: "admin-libraries__head" }, le = {
	key: 0,
	class: "admin-libraries__skel"
}, ue = {
	key: 3,
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
}, xe = { class: "admin-libraries__date" }, Se = { class: "admin-libraries__date" }, Ce = 2e3, E = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let v = e, E = re("apiBase", ""), we = d(() => typeof E == "string" ? E : E?.value ?? ""), D = new ne(v.client ?? new t({
			baseUrl: we.value,
			tokenStore: new i()
		})), O = te(), Te = d(() => v.pollIntervalMs ?? Ce), Ee = d(() => l.map((e) => ({
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
		function De(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		let j = b([]), M = b(!0), N = b(null), P = b({}), F = {};
		function I(e) {
			let t = F[e];
			t !== void 0 && (clearInterval(t), delete F[e]);
		}
		async function L(e) {
			try {
				let t = await D.scanStatus(e);
				P.value = {
					...P.value,
					[e]: t
				}, (t === null || k(t.status)) && I(e);
			} catch {
				I(e);
			}
		}
		function R(e) {
			F[e] === void 0 && (F[e] = setInterval(() => {
				L(e);
			}, Te.value));
		}
		async function z() {
			M.value = !0, N.value = null;
			try {
				let e = await D.list();
				j.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await D.scanStatus(e.id);
						P.value = {
							...P.value,
							[e.id]: t
						}, t !== null && !k(t.status) && R(e.id);
					} catch {}
				}));
			} catch (e) {
				N.value = r(e, "Failed to load libraries."), O.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let B = b(!1), V = b(null), H = b(""), U = b(l[0]), W = b(""), G = b(!1), Oe = d(() => V.value ? "Edit library" : "Add library");
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
				O.error("Name is required.");
				return;
			}
			let e = ke();
			if (e.length === 0) {
				O.error("Select at least one path.");
				return;
			}
			G.value = !0;
			try {
				let t = V.value;
				if (t) await D.update(t.id, {
					name: H.value,
					paths: e
				}), O.success("Library updated.");
				else {
					let t = await D.create({
						name: H.value,
						type: U.value,
						paths: e
					});
					O.success(t.message || "Library created.");
				}
				q(), await z();
			} catch (e) {
				O.error(r(e, "Failed to save library."));
			} finally {
				G.value = !1;
			}
		}
		let Y = b(null);
		async function je() {
			let e = Y.value;
			if (e) try {
				await D.remove(e.id), O.success("Library deleted."), Y.value = null, await z();
			} catch (e) {
				O.error(r(e, "Failed to delete library.")), Y.value = null;
			}
		}
		async function X(e, t) {
			try {
				let n = t === "metadata" ? await D.matchMetadata(e.id) : t === "rescan" ? await D.rescan(e.id) : await D.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				O.success(n.message || r);
				let i = P.value[e.id];
				P.value = {
					...P.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, R(e.id), L(e.id);
			} catch (e) {
				O.error(r(e, "Failed to queue scan."));
			}
		}
		let Z = b(null), Q = b([]), $ = b(!1), Me = d(() => Z.value ? `Scan history — ${Z.value.name}` : "Scan history"), Ne = d({
			get: () => Z.value !== null,
			set: (e) => {
				e || Fe();
			}
		});
		async function Pe(e) {
			Z.value = e, Q.value = [], $.value = !0;
			try {
				Q.value = await D.scanHistory(e.id);
			} catch (e) {
				O.error(r(e, "Failed to load history."));
			} finally {
				$.value = !1;
			}
		}
		function Fe() {
			Z.value = null, Q.value = [];
		}
		return ae(z), ie(() => {
			for (let e of Object.keys(F)) clearInterval(F[e]), delete F[e];
		}), (e, t) => (y(), m("section", se, [
			h("header", ce, [t[8] ||= h("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), _(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: K
			}, {
				default: w(() => [...t[7] ||= [g("Add library", -1)]]),
				_: 1
			})]),
			t[28] ||= h("p", { class: "admin-libraries__hint" }, " Scan progress is coarse in this release — only the lifecycle (queued / running / completed / failed) is reported, not per-file detail. ", -1),
			M.value ? (y(), m("div", le, [_(s, {
				variant: "text",
				lines: 6
			})])) : N.value ? (y(), f(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: N.value
			}, {
				actions: w(() => [_(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: z
				}, {
					default: w(() => [...t[9] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : j.value.length === 0 ? (y(), f(c, {
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
					default: w(() => [...t[10] ||= [g("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (y(), m("table", ue, [t[17] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "Type"),
				h("th", { scope: "col" }, "Paths"),
				h("th", { scope: "col" }, "Status"),
				h("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(y(!0), m(u, null, x(j.value, (e) => (y(), m("tr", { key: e.id }, [
				h("td", null, S(e.name), 1),
				h("td", null, S(e.type), 1),
				h("td", null, S(e.paths.length) + " paths", 1),
				h("td", null, [h("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [_(a, { tone: De(P.value[e.id]) }, {
					default: w(() => [g(S(A(P.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), P.value[e.id]?.status === "failed" && P.value[e.id]?.error ? (y(), m("span", fe, S(P.value[e.id]?.error), 1)) : p("", !0)], 8, de)]),
				h("td", null, [h("div", pe, [
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ae(e)
					}, {
						default: w(() => [...t[11] ||= [g(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => X(e, "scan")
					}, {
						default: w(() => [...t[12] ||= [g(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => X(e, "rescan")
					}, {
						default: w(() => [...t[13] ||= [g(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => X(e, "metadata")
					}, {
						default: w(() => [...t[14] ||= [g(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Pe(e)
					}, {
						default: w(() => [...t[15] ||= [g(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => Y.value = e
					}, {
						default: w(() => [...t[16] ||= [g(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			_(o, {
				modelValue: B.value,
				"onUpdate:modelValue": t[3] ||= (e) => B.value = e,
				title: Oe.value,
				onClose: q
			}, {
				footer: w(() => [_(n, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: w(() => [...t[21] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(n, {
					variant: "solid",
					size: "sm",
					loading: G.value,
					onClick: J
				}, {
					default: w(() => [g(S(V.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [h("form", {
					class: "admin-libraries__form",
					onSubmit: oe(J, ["prevent"])
				}, [
					h("label", me, [t[18] ||= h("span", { class: "admin-libraries__label" }, "Name", -1), T(h("input", {
						"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[C, H.value]])]),
					h("div", he, [
						t[19] ||= h("span", { class: "admin-libraries__label" }, "Type", -1),
						V.value ? (y(), m("input", {
							key: 0,
							class: "admin-libraries__input",
							value: U.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, ge)) : (y(), f(ee, {
							key: 1,
							"model-value": U.value,
							options: Ee.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => U.value = String(e)
						}, null, 8, ["model-value", "options"])),
						V.value ? (y(), m("span", _e, "Type cannot be changed.")) : p("", !0)
					]),
					h("label", ve, [t[20] ||= h("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), T(h("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => W.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[C, W.value]])])
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			_(o, {
				"model-value": Y.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[5] ||= (e) => Y.value = null
			}, {
				footer: w(() => [_(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[4] ||= (e) => Y.value = null
				}, {
					default: w(() => [...t[24] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(n, {
					variant: "solid",
					size: "sm",
					onClick: je
				}, {
					default: w(() => [...t[25] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: w(() => [h("p", null, [
					t[22] ||= g(" Delete library ", -1),
					h("strong", null, S(Y.value?.name), 1),
					t[23] ||= g("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(o, {
				modelValue: Ne.value,
				"onUpdate:modelValue": t[6] ||= (e) => Ne.value = e,
				title: Me.value,
				size: "lg"
			}, {
				footer: w(() => [_(n, {
					variant: "solid",
					size: "sm",
					onClick: Fe
				}, {
					default: w(() => [...t[27] ||= [g("Close", -1)]]),
					_: 1
				})]),
				default: w(() => [$.value ? (y(), m("div", ye, [_(s, {
					variant: "text",
					lines: 4
				})])) : Q.value.length === 0 ? (y(), f(c, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (y(), m("table", be, [t[26] ||= h("thead", null, [h("tr", null, [
					h("th", { scope: "col" }, "Type"),
					h("th", { scope: "col" }, "Status"),
					h("th", { scope: "col" }, "Queued"),
					h("th", { scope: "col" }, "Completed"),
					h("th", { scope: "col" }, "Error")
				])], -1), h("tbody", null, [(y(!0), m(u, null, x(Q.value, (e) => (y(), m("tr", { key: e.id }, [
					h("td", null, S(e.type), 1),
					h("td", null, [_(a, { tone: De(e) }, {
						default: w(() => [g(S(A(e)), 1)]),
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
}), [["__scopeId", "data-v-59e9c359"]]);
//#endregion
export { E as default };

//# sourceMappingURL=LibrariesPage-CIvMVgox.js.map