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
import { Fragment as ie, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ae, normalizeStyle as oe, onBeforeUnmount as se, onMounted as ce, openBlock as v, ref as y, renderList as le, toDisplayString as b, vModelText as ue, withCtx as x, withDirectives as S, withModifiers as de } from "vue";
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
}, je = { class: "admin-libraries__date" }, Me = { class: "admin-libraries__date" }, Ne = 2e3, C = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let _ = e, C = ae("apiBase", ""), Pe = u(() => typeof C == "string" ? C : C?.value ?? ""), w = new re(_.client ?? new t({
			baseUrl: Pe.value,
			tokenStore: new i()
		})), T = ne(), Fe = u(() => _.pollIntervalMs ?? Ne), Ie = u(() => l.map((e) => ({
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
		let M = y([]), N = y(!0), P = y(null), F = y({}), I = {};
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
				P.value = r(e, "Failed to load libraries."), T.error(P.value);
			} finally {
				N.value = !1;
			}
		}
		let B = y(!1), V = y(null), H = y(""), U = y(l[0]), W = y(""), G = y(!1), K = y(!1), ze = u(() => V.value ? "Edit library" : "Add library");
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
			V.value = null, H.value = "", U.value = l[0], W.value = "", G.value = !1, B.value = !0;
		}
		function Ue(e) {
			V.value = e, H.value = e.name, U.value = l.find((t) => t === e.type) ?? l[0], W.value = e.paths.join("\n"), G.value = Be(e.options?.series_per_directory), B.value = !0;
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
				T.error(r(e, "Failed to save library."));
			} finally {
				K.value = !1;
			}
		}
		let J = y(null);
		async function Ge() {
			let e = J.value;
			if (e) try {
				await w.remove(e.id), T.success("Library deleted."), J.value = null, await z();
			} catch (e) {
				T.error(r(e, "Failed to delete library.")), J.value = null;
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
				T.error(r(e, "Failed to queue scan."));
			}
		}
		let X = y(null), Z = y([]), Q = y(!1), Ke = u(() => X.value ? `Scan history — ${X.value.name}` : "Scan history"), qe = u({
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
				T.error(r(e, "Failed to load history."));
			} finally {
				Q.value = !1;
			}
		}
		function $() {
			X.value = null, Z.value = [];
		}
		return ce(z), se(() => {
			for (let e of Object.keys(I)) clearInterval(I[e]), delete I[e];
		}), (e, t) => (v(), p("section", fe, [
			m("header", pe, [t[9] ||= m("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), g(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: He
			}, {
				default: x(() => [...t[8] ||= [h("Add library", -1)]]),
				_: 1
			})]),
			t[30] ||= m("p", { class: "admin-libraries__hint" }, [
				m("strong", null, "Scan"),
				h(" adds new files and updates changed ones (existing items are kept). "),
				m("strong", null, "Rescan"),
				h(" clears the library and rebuilds it from scratch — use it after moving files or to repair bad matches. "),
				m("strong", null, "Match metadata"),
				h(" (re)fetches posters and details for items already in the library. A live percentage is shown while any of these run. ")
			], -1),
			N.value ? (v(), p("div", me, [g(s, {
				variant: "text",
				lines: 6
			})])) : P.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: P.value
			}, {
				actions: x(() => [g(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: z
				}, {
					default: x(() => [...t[10] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : M.value.length === 0 ? (v(), d(c, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: x(() => [g(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: He
				}, {
					default: x(() => [...t[11] ||= [h("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), p("table", he, [t[18] ||= m("thead", null, [m("tr", null, [
				m("th", { scope: "col" }, "Name"),
				m("th", { scope: "col" }, "Type"),
				m("th", { scope: "col" }, "Paths"),
				m("th", { scope: "col" }, "Status"),
				m("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), m("tbody", null, [(v(!0), p(ie, null, le(M.value, (e) => (v(), p("tr", { key: e.id }, [
				m("td", null, b(e.name), 1),
				m("td", null, b(e.type), 1),
				m("td", null, b(e.paths.length) + " paths", 1),
				m("td", null, [m("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [g(a, { tone: O(F.value[e.id]) }, {
					default: x(() => [h(b(D(F.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), F.value[e.id]?.status === "failed" && F.value[e.id]?.error ? (v(), p("span", _e, b(F.value[e.id]?.error), 1)) : k(F.value[e.id]) ? (v(), p("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					m("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": A(F.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [m("span", {
						class: "admin-libraries__progress-fill",
						style: oe({ width: A(F.value[e.id]) + "%" })
					}, null, 4)], 8, ye),
					m("span", be, b(A(F.value[e.id])) + "% · " + b(Le(F.value[e.id])), 1),
					j(F.value[e.id]) ? (v(), p("span", xe, b(j(F.value[e.id])), 1)) : f("", !0)
				], 8, ve)) : f("", !0)], 8, ge)]),
				m("td", null, [m("div", Se, [
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => Ue(e)
					}, {
						default: x(() => [...t[12] ||= [h(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => Y(e, "scan")
					}, {
						default: x(() => [...t[13] ||= [h(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => Y(e, "rescan")
					}, {
						default: x(() => [...t[14] ||= [h(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => Y(e, "metadata")
					}, {
						default: x(() => [...t[15] ||= [h(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Je(e)
					}, {
						default: x(() => [...t[16] ||= [h(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					g(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => J.value = e
					}, {
						default: x(() => [...t[17] ||= [h(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			g(o, {
				modelValue: B.value,
				"onUpdate:modelValue": t[4] ||= (e) => B.value = e,
				title: ze.value,
				onClose: q
			}, {
				footer: x(() => [g(n, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: x(() => [...t[23] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(n, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: We
				}, {
					default: x(() => [h(b(V.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [m("form", {
					class: "admin-libraries__form",
					onSubmit: de(We, ["prevent"])
				}, [
					m("label", Ce, [t[19] ||= m("span", { class: "admin-libraries__label" }, "Name", -1), S(m("input", {
						"onUpdate:modelValue": t[0] ||= (e) => H.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[ue, H.value]])]),
					m("div", we, [
						t[20] ||= m("span", { class: "admin-libraries__label" }, "Type", -1),
						V.value ? (v(), p("input", {
							key: 0,
							class: "admin-libraries__input",
							value: U.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, Te)) : (v(), d(te, {
							key: 1,
							"model-value": U.value,
							options: Ie.value,
							label: "Type",
							"onUpdate:modelValue": t[1] ||= (e) => U.value = String(e)
						}, null, 8, ["model-value", "options"])),
						V.value ? (v(), p("span", Ee, "Type cannot be changed.")) : f("", !0)
					]),
					m("label", De, [t[21] ||= m("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), S(m("textarea", {
						"onUpdate:modelValue": t[2] ||= (e) => W.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[ue, W.value]])]),
					U.value === "series" ? (v(), p("div", Oe, [g(ee, {
						modelValue: G.value,
						"onUpdate:modelValue": t[3] ||= (e) => G.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), t[22] ||= m("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : f("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			g(o, {
				"model-value": J.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": t[6] ||= (e) => J.value = null
			}, {
				footer: x(() => [g(n, {
					variant: "ghost",
					size: "sm",
					onClick: t[5] ||= (e) => J.value = null
				}, {
					default: x(() => [...t[26] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(n, {
					variant: "solid",
					size: "sm",
					onClick: Ge
				}, {
					default: x(() => [...t[27] ||= [h("Delete", -1)]]),
					_: 1
				})]),
				default: x(() => [m("p", null, [
					t[24] ||= h(" Delete library ", -1),
					m("strong", null, b(J.value?.name), 1),
					t[25] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			g(o, {
				modelValue: qe.value,
				"onUpdate:modelValue": t[7] ||= (e) => qe.value = e,
				title: Ke.value,
				size: "lg"
			}, {
				footer: x(() => [g(n, {
					variant: "solid",
					size: "sm",
					onClick: $
				}, {
					default: x(() => [...t[29] ||= [h("Close", -1)]]),
					_: 1
				})]),
				default: x(() => [Q.value ? (v(), p("div", ke, [g(s, {
					variant: "text",
					lines: 4
				})])) : Z.value.length === 0 ? (v(), d(c, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (v(), p("table", Ae, [t[28] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Type"),
					m("th", { scope: "col" }, "Status"),
					m("th", { scope: "col" }, "Queued"),
					m("th", { scope: "col" }, "Completed"),
					m("th", { scope: "col" }, "Error")
				])], -1), m("tbody", null, [(v(!0), p(ie, null, le(Z.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, b(e.type), 1),
					m("td", null, [g(a, { tone: O(e) }, {
						default: x(() => [h(b(D(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", je, b(e.queued_at ?? ""), 1),
					m("td", Me, b(e.completed_at ?? ""), 1),
					m("td", null, b(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-76adb27d"]]);
//#endregion
export { C as default };

//# sourceMappingURL=LibrariesPage-Bj4YtdP-.js.map