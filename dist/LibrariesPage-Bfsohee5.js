import { n as e } from "./Icon-ax5k7_G2.js";
import { c as t, f as n, t as r } from "./client-cUL8r-1I.js";
import { t as i } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-k7aQagzg.js";
import { t as o } from "./Badge-ArWL5-WE.js";
import { t as ee } from "./Switch-CFZhdkXR.js";
import { t as te } from "./Select-BR5EXV0L.js";
import { t as s } from "./Modal-CWarEzTU.js";
import { t as c } from "./Skeleton-DkSoWF3C.js";
import { t as l } from "./EmptyState-B2QnGIQT.js";
import { n as u, t as ne } from "./libraries-CXAz_kXs.js";
import { Fragment as re, computed as d, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ie, normalizeStyle as ae, onBeforeUnmount as oe, onMounted as se, openBlock as y, ref as b, renderList as ce, toDisplayString as x, vModelText as le, withCtx as S, withDirectives as ue, withModifiers as de } from "vue";
//#region src/pages/admin/LibrariesPage.vue?vue&type=script&setup=true&lang.ts
var fe = {
	class: "admin-libraries",
	"aria-labelledby": "libraries-heading"
}, pe = { class: "admin-libraries__head" }, me = {
	key: 0,
	class: "admin-libraries__skel"
}, he = {
	key: 3,
	class: "admin-libraries__table",
	"aria-label": "Libraries"
}, ge = ["data-testid"], _e = {
	key: 0,
	class: "admin-libraries__error"
}, ve = ["data-testid"], ye = ["aria-valuenow", "aria-label"], be = { class: "admin-libraries__progress-meta" }, xe = {
	key: 0,
	class: "admin-libraries__progress-file"
}, Se = { class: "admin-libraries__actions" }, Ce = { class: "admin-libraries__field" }, we = { class: "admin-libraries__field" }, Te = ["value"], Ee = {
	key: 2,
	class: "admin-libraries__hint-text"
}, De = { class: "admin-libraries__field" }, Oe = {
	key: 0,
	class: "admin-libraries__field"
}, ke = {
	key: 0,
	class: "admin-libraries__skel"
}, Ae = {
	key: 2,
	class: "admin-libraries__table",
	"aria-label": "Scan history"
}, je = { class: "admin-libraries__date" }, Me = { class: "admin-libraries__date" }, Ne = 2e3, C = /*#__PURE__*/ e(/* @__PURE__ */ v({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let v = e, C = ie("apiBase", ""), Pe = d(() => typeof C == "string" ? C : C?.value ?? ""), w = new ne(v.client ?? new r({
			baseUrl: Pe.value,
			tokenStore: new t()
		})), T = i(), Fe = d(() => v.pollIntervalMs ?? Ne), Ie = d(() => u.map((e) => ({
			value: e,
			label: e
		})));
		function E(e) {
			return e === "completed" || e === "failed";
		}
		function D(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function O(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function k(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function A(e) {
			if (!k(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function Le(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function j(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let M = b([]), N = b(!0), P = b(null), F = b({}), I = {};
		function L(e) {
			let t = I[e];
			t !== void 0 && (clearInterval(t), delete I[e]);
		}
		async function R(e) {
			try {
				let t = await w.scanStatus(e);
				F.value = {
					...F.value,
					[e]: t
				}, (t === null || E(t.status)) && L(e);
			} catch {
				L(e);
			}
		}
		function Re(e) {
			I[e] === void 0 && (I[e] = setInterval(() => {
				R(e);
			}, Fe.value));
		}
		async function z() {
			N.value = !0, P.value = null;
			try {
				let e = await w.list();
				M.value = e, await Promise.all(e.map(async (e) => {
					try {
						let t = await w.scanStatus(e.id);
						F.value = {
							...F.value,
							[e.id]: t
						}, t !== null && !E(t.status) && Re(e.id);
					} catch {}
				}));
			} catch (e) {
				P.value = n(e, "Failed to load libraries."), T.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		let B = b(!1), V = b(null), H = b(""), U = b(u[0]), W = b(""), G = b(!1), K = b(!1), ze = d(() => V.value ? "Edit library" : "Add library");
		function Be(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" ? [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase()) : !1;
		}
		function Ve() {
			return W.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function He() {
			V.value = null, H.value = "", U.value = u[0], W.value = "", G.value = !1, B.value = !0;
		}
		function Ue(e) {
			V.value = e, H.value = e.name, U.value = u.find((t) => t === e.type) ?? u[0], W.value = e.paths.join("\n"), G.value = Be(e.options?.series_per_directory), B.value = !0;
		}
		function q() {
			B.value = !1, V.value = null;
		}
		async function We() {
			if (!H.value.trim()) {
				T.error("Name is required.");
				return;
			}
			let e = Ve();
			if (e.length === 0) {
				T.error("Select at least one path.");
				return;
			}
			K.value = !0;
			try {
				let t = V.value, n = U.value === "series";
				if (t) {
					let r = {
						name: H.value,
						paths: e
					};
					n && (r.series_per_directory = G.value), await w.update(t.id, r), T.success("Library updated.");
				} else {
					let t = {
						name: H.value,
						type: U.value,
						paths: e
					};
					n && (t.series_per_directory = G.value);
					let r = await w.create(t);
					T.success(r.message || "Library created.");
				}
				q(), await z();
			} catch (e) {
				T.error(n(e, "Failed to save library."));
			} finally {
				K.value = !1;
			}
		}
		let J = b(null);
		async function Ge() {
			let e = J.value;
			if (e) try {
				await w.remove(e.id), T.success("Library deleted."), J.value = null, await z();
			} catch (e) {
				T.error(n(e, "Failed to delete library.")), J.value = null;
			}
		}
		async function Y(e, t) {
			try {
				let n = t === "metadata" ? await w.matchMetadata(e.id) : t === "rescan" ? await w.rescan(e.id) : await w.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				T.success(n.message || r);
				let i = F.value[e.id];
				F.value = {
					...F.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, Re(e.id), R(e.id);
			} catch (e) {
				T.error(n(e, "Failed to queue scan."));
			}
		}
		let X = b(null), Z = b([]), Q = b(!1), Ke = d(() => X.value ? `Scan history — ${X.value.name}` : "Scan history"), qe = d({
			get: () => X.value !== null,
			set: (e) => {
				e || $();
			}
		});
		async function Je(e) {
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
		return se(z), oe(() => {
			for (let e of Object.keys(I)) clearInterval(I[e]), delete I[e];
		}), (e, t) => (y(), m("section", fe, [
			h("header", pe, [t[9] ||= h("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), _(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: He
			}, {
				default: S(() => [...t[8] ||= [g("Add library", -1)]]),
				_: 1
			})]),
			t[30] ||= h("p", { class: "admin-libraries__hint" }, [
				h("strong", null, "Scan"),
				g(" adds new files and updates changed ones (existing items are kept). "),
				h("strong", null, "Rescan"),
				g(" clears the library and rebuilds it from scratch — use it after moving files or to repair bad matches. "),
				h("strong", null, "Match metadata"),
				g(" (re)fetches posters and details for items already in the library. A live percentage is shown while any of these run. ")
			], -1),
			N.value ? (y(), m("div", me, [_(c, {
				variant: "text",
				lines: 6
			})])) : P.value ? (y(), f(l, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: P.value
			}, {
				actions: S(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: z
				}, {
					default: S(() => [...t[10] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (y(), f(l, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: S(() => [_(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: He
				}, {
					default: S(() => [...t[11] ||= [g("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (y(), m("table", he, [t[18] ||= h("thead", null, [h("tr", null, [
				h("th", { scope: "col" }, "Name"),
				h("th", { scope: "col" }, "Type"),
				h("th", { scope: "col" }, "Paths"),
				h("th", { scope: "col" }, "Status"),
				h("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), h("tbody", null, [(y(!0), m(re, null, ce(M.value, (e) => (y(), m("tr", { key: e.id }, [
				h("td", null, x(e.name), 1),
				h("td", null, x(e.type), 1),
				h("td", null, x(e.paths.length) + " paths", 1),
				h("td", null, [h("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [_(o, { tone: O(F.value[e.id]) }, {
					default: S(() => [g(x(D(F.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), F.value[e.id]?.status === "failed" && F.value[e.id]?.error ? (y(), m("span", _e, x(F.value[e.id]?.error), 1)) : k(F.value[e.id]) ? (y(), m("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					h("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": A(F.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [h("span", {
						class: "admin-libraries__progress-fill",
						style: ae({ width: A(F.value[e.id]) + "%" })
					}, null, 4)], 8, ye),
					h("span", be, x(A(F.value[e.id])) + "% · " + x(Le(F.value[e.id])), 1),
					j(F.value[e.id]) ? (y(), m("span", xe, x(j(F.value[e.id])), 1)) : p("", !0)
				], 8, ve)) : p("", !0)], 8, ge)]),
				h("td", null, [h("div", Se, [
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ue(e)
					}, {
						default: S(() => [...t[12] ||= [g(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: S(() => [...t[13] ||= [g(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: S(() => [...t[14] ||= [g(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: S(() => [...t[15] ||= [g(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Je(e)
					}, {
						default: S(() => [...t[16] ||= [g(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					_(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: S(() => [...t[17] ||= [g(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			_(s, {
				modelValue: B.value,
				"onUpdate:modelValue": t[4] ||= (e) => B.value = e,
				title: ze.value,
				onClose: q
			}, {
				footer: S(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: S(() => [...t[23] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: We
				}, {
					default: S(() => [g(x(V.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [h("form", {
					class: "admin-libraries__form",
					onSubmit: de(We, ["prevent"])
				}, [
					h("label", Ce, [t[19] ||= h("span", { class: "admin-libraries__label" }, "Name", -1), ue(h("input", {
						"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[le, H.value]])]),
					h("div", we, [
						t[20] ||= h("span", { class: "admin-libraries__label" }, "Type", -1),
						V.value ? (y(), m("input", {
							key: 0,
							class: "admin-libraries__input",
							value: U.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Te)) : (y(), f(te, {
							key: 1,
							"model-value": U.value,
							options: Ie.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => U.value = String(e)
						}, null, 8, ["model-value", "options"])),
						V.value ? (y(), m("span", Ee, "Type cannot be changed.")) : p("", !0)
					]),
					h("label", De, [t[21] ||= h("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), ue(h("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => W.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[le, W.value]])]),
					U.value === "series" ? (y(), m("div", Oe, [_(ee, {
						modelValue: G.value,
						"onUpdate:modelValue": t[3] ||= (e) => G.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[22] ||= h("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : p("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			_(s, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: S(() => [_(a, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: S(() => [...t[26] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(a, {
					variant: "solid",
					size: "sm",
					onClick: Ge
				}, {
					default: S(() => [...t[27] ||= [g("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [h("p", null, [
					t[24] ||= g(" Delete library ", -1),
					h("strong", null, x(J.value?.name), 1),
					t[25] ||= g("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			_(s, {
				modelValue: qe.value,
				"onUpdate:modelValue": t[7] ||= (e) => qe.value = e,
				title: Ke.value,
				size: "lg"
			}, {
				footer: S(() => [_(a, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: S(() => [...t[29] ||= [g("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [Q.value ? (y(), m("div", ke, [_(c, {
					variant: "text",
					lines: 4
				})])) : Z.value.length === 0 ? (y(), f(l, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (y(), m("table", Ae, [t[28] ||= h("thead", null, [h("tr", null, [
					h("th", { scope: "col" }, "Type"),
					h("th", { scope: "col" }, "Status"),
					h("th", { scope: "col" }, "Queued"),
					h("th", { scope: "col" }, "Completed"),
					h("th", { scope: "col" }, "Error")
				])], -1), h("tbody", null, [(y(!0), m(re, null, ce(Z.value, (e) => (y(), m("tr", { key: e.id }, [
					h("td", null, x(e.type), 1),
					h("td", null, [_(o, { tone: O(e) }, {
						default: S(() => [g(x(D(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					h("td", je, x(e.queued_at ?? ""), 1),
					h("td", Me, x(e.completed_at ?? ""), 1),
					h("td", null, x(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-76adb27d"]]);
//#endregion
export { C as default };

//# sourceMappingURL=LibrariesPage-Bfsohee5.js.map