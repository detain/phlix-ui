import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./Modal-DnGvbsI9.js";
import { c as n, f as r, t as i } from "./client-DH50wjeq.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as a } from "./Button-CnyfCnhY.js";
import { t as te } from "./Badge-Dq-pYhrz.js";
import { t as ne } from "./Switch-B9lejr6_.js";
import { t as re } from "./Select-Jxt3ozRc.js";
import { t as ie } from "./Skeleton-CzU_l53W.js";
import { t as o } from "./EmptyState-588Z_81C.js";
import { t as ae } from "./PageHint-7Giwob0l.js";
import { n as oe, t as se } from "./metadata-sources-bxLQT4lm.js";
import { n as s, t as ce } from "./libraries-CXAz_kXs.js";
import { Fragment as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as le, normalizeStyle as ue, onBeforeUnmount as de, onMounted as fe, openBlock as _, ref as v, renderList as y, toDisplayString as b, vModelText as x, watch as pe, withCtx as S, withDirectives as me, withModifiers as he } from "vue";
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
}, Ue = { class: "admin-libraries__date" }, We = { class: "admin-libraries__date" }, Ge = 2e3, C = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "LibrariesPage",
	props: {
		client: {},
		pollIntervalMs: {}
	},
	setup(e) {
		let g = e, C = le("apiBase", ""), Ke = l(() => typeof C == "string" ? C : C?.value ?? ""), qe = g.client ?? new i({
			baseUrl: Ke.value,
			tokenStore: new n()
		}), w = new ce(qe), Je = new se(qe), T = ee(), Ye = l(() => g.pollIntervalMs ?? Ge), Xe = l(() => s.map((e) => ({
			value: e,
			label: e
		})));
		function Ze(e) {
			return e === "completed" || e === "failed";
		}
		function Qe(e) {
			if (!e) return "Idle";
			switch (e.status) {
				case "queued": return "Queued";
				case "running": return "Running";
				case "completed": return "Completed";
				case "failed": return "Failed";
				default: return e.status;
			}
		}
		function $e(e) {
			if (!e) return "neutral";
			switch (e.status) {
				case "queued":
				case "running": return "info";
				case "completed": return "success";
				case "failed": return "error";
				default: return "neutral";
			}
		}
		function et(e) {
			return !!e && e.status === "running" && (e.items_found ?? 0) > 0;
		}
		function E(e) {
			if (!et(e) || !e) return 0;
			let t = e.items_updated / e.items_found * 100;
			return Math.max(0, Math.min(100, Math.round(t)));
		}
		function tt(e) {
			return e ? `${e.items_updated} / ${e.items_found}` : "";
		}
		function nt(e) {
			let t = e?.current_path;
			if (!t) return "";
			let n = t.split("/");
			return n[n.length - 1] || t;
		}
		let D = v([]), O = v(!0), k = v(null), A = v({}), j = {}, M = /* @__PURE__ */ new Set();
		function rt(e) {
			let t = j[e];
			t !== void 0 && (clearInterval(t), delete j[e]), M.delete(e);
		}
		async function it(e) {
			try {
				let t = await w.scanStatus(e);
				A.value = {
					...A.value,
					[e]: t
				}, (t === null || Ze(t.status)) && rt(e);
			} catch {
				rt(e);
			}
		}
		function N(e) {
			j[e] === void 0 && (j[e] = setInterval(() => {
				it(e);
			}, Ye.value));
		}
		function at() {
			for (let e of Object.keys(j)) clearInterval(j[e]), delete j[e], M.add(e);
		}
		function ot() {
			for (let e of M) N(e);
			M.clear();
		}
		function st() {
			document.hidden ? at() : ot();
		}
		async function P() {
			O.value = !0, k.value = null;
			try {
				let e = await w.list();
				D.value = e, ut(e), await Promise.all(e.map(async (e) => {
					try {
						let t = await w.scanStatus(e.id);
						A.value = {
							...A.value,
							[e.id]: t
						}, t !== null && !Ze(t.status) && N(e.id);
					} catch {}
				}));
			} catch (e) {
				k.value = r(e, "Failed to load libraries."), T.error(k.value);
			} finally {
				O.value = !1;
			}
		}
		let F = v(!1), I = v(null), L = v(""), R = v(s[0]), z = v(""), B = v(!1), V = v(!1), ct = l(() => I.value ? "Edit library" : "Add library"), H = v([]), U = v([]), W = v(!1), lt = v(!1), G = v([]), K = v({}), q = v(!1);
		function ut(e) {
			let t = e.find((e) => Array.isArray(e.image_types?.available) && e.image_types.available.length > 0);
			t?.image_types?.available && (G.value = t.image_types.available);
		}
		function dt(e) {
			let t = e?.image_types?.available ?? G.value;
			t.length && (G.value = t);
			let n = e?.image_types?.enabled ?? G.value.filter((e) => e.default).map((e) => e.type), r = {};
			for (let e of G.value) r[e.type] = n.includes(e.type);
			K.value = r, q.value = !1;
		}
		function ft(e, t) {
			K.value = {
				...K.value,
				[e]: t
			}, q.value = !0;
		}
		let pt = [
			"imdb",
			"tmdb",
			"tvdb"
		], mt = l(() => R.value === "music" ? H.value.filter((e) => !pt.includes(e)) : H.value), ht = l(() => U.value.filter((e) => mt.value.includes(e)));
		async function gt() {
			if (!lt.value) {
				lt.value = !0;
				try {
					H.value = await Je.listSources();
				} catch {
					H.value = [];
				}
			}
		}
		function _t(e) {
			let t = e?.options?.metadata_priority, n = t && typeof t == "object" && !Array.isArray(t) ? t : {}, r = Array.isArray(n[R.value]) ? n[R.value].filter((e) => typeof e == "string") : [];
			U.value = r.length ? r : H.value.slice(), W.value = !1;
		}
		function vt(e) {
			U.value = e, W.value = !0;
		}
		pe(H, () => {
			F.value && !W.value && U.value.length === 0 && (U.value = H.value.slice());
		});
		function yt(e) {
			return typeof e == "boolean" ? e : typeof e == "number" ? e === 1 : typeof e == "string" ? [
				"1",
				"true",
				"yes",
				"on"
			].includes(e.trim().toLowerCase()) : !1;
		}
		function bt() {
			return z.value.split("\n").map((e) => e.trim()).filter((e) => e.length > 0);
		}
		function xt() {
			I.value = null, L.value = "", R.value = s[0], z.value = "", B.value = !1, _t(null), dt(null), F.value = !0;
		}
		function St(e) {
			I.value = e, L.value = e.name, R.value = s.find((t) => t === e.type) ?? s[0], z.value = e.paths.join("\n"), B.value = yt(e.options?.series_per_directory), _t(e), dt(e), F.value = !0;
		}
		function J() {
			F.value = !1, I.value = null;
		}
		async function Ct() {
			if (!L.value.trim()) {
				T.error("Name is required.");
				return;
			}
			let e = bt();
			if (e.length === 0) {
				T.error("Select at least one path.");
				return;
			}
			V.value = !0;
			try {
				let t = I.value, n = R.value === "series";
				if (t) {
					let r = {
						name: L.value,
						paths: e
					};
					n && (r.series_per_directory = B.value), W.value && (r.metadata_priority = U.value.length ? { [R.value]: U.value } : null), q.value && (r.image_types = { ...K.value }), await w.update(t.id, r), T.success("Library updated.");
				} else {
					let t = {
						name: L.value,
						type: R.value,
						paths: e
					};
					n && (t.series_per_directory = B.value), W.value && (t.metadata_priority = U.value.length ? { [R.value]: U.value } : null), q.value && (t.image_types = { ...K.value });
					let r = await w.create(t);
					T.success(r.message || "Library created.");
				}
				J(), await P();
			} catch (e) {
				T.error(r(e, "Failed to save library."));
			} finally {
				V.value = !1;
			}
		}
		let Y = v(null);
		async function wt() {
			let e = Y.value;
			if (e) try {
				await w.remove(e.id), T.success("Library deleted."), Y.value = null, await P();
			} catch (e) {
				T.error(r(e, "Failed to delete library.")), Y.value = null;
			}
		}
		async function X(e, t) {
			try {
				let n = t === "metadata" ? await w.matchMetadata(e.id) : t === "rescan" ? await w.rescan(e.id) : await w.scan(e.id), r = t === "metadata" ? `Metadata match queued (job ${n.job_id}).` : `Scan queued (job ${n.job_id}).`;
				T.success(n.message || r);
				let i = A.value[e.id];
				A.value = {
					...A.value,
					[e.id]: i ? {
						...i,
						status: "queued"
					} : null
				}, N(e.id), it(e.id);
			} catch (e) {
				T.error(r(e, "Failed to queue scan."));
			}
		}
		let Z = v(null), Q = v([]), $ = v(!1), Tt = l(() => Z.value ? `Scan history — ${Z.value.name}` : "Scan history"), Et = l({
			get: () => Z.value !== null,
			set: (e) => {
				e || Ot();
			}
		});
		async function Dt(e) {
			Z.value = e, Q.value = [], $.value = !0;
			try {
				Q.value = await w.scanHistory(e.id);
			} catch (e) {
				T.error(r(e, "Failed to load history."));
			} finally {
				$.value = !1;
			}
		}
		function Ot() {
			Z.value = null, Q.value = [];
		}
		return fe(() => {
			gt(), P(), typeof document < "u" && document.addEventListener("visibilitychange", st);
		}), de(() => {
			for (let e of Object.keys(j)) clearInterval(j[e]), delete j[e];
			typeof document < "u" && document.removeEventListener("visibilitychange", st);
		}), (e, n) => (_(), f("section", ge, [
			p("header", _e, [n[9] ||= p("h1", {
				id: "libraries-heading",
				class: "admin-libraries__title"
			}, "Libraries", -1), h(a, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: xt
			}, {
				default: S(() => [...n[8] ||= [m("Add library", -1)]]),
				_: 1
			})]),
			h(ae, null, {
				default: S(() => [...n[10] ||= [
					p("strong", null, "Scan", -1),
					m(" adds new files and updates changed ones (existing items are kept). ", -1),
					p("strong", null, "Rescan", -1),
					m(" clears the library and rebuilds it from scratch — use it after moving files or to repair bad matches. ", -1),
					p("strong", null, "Match metadata", -1),
					m(" (re)fetches posters and details for items already in the library. A live percentage is shown while any of these run. ", -1)
				]]),
				_: 1
			}),
			O.value ? (_(), f("div", ve, [h(ie, {
				variant: "text",
				lines: 6
			})])) : k.value ? (_(), u(o, {
				key: 1,
				icon: "alert",
				title: "Couldn't load libraries",
				description: k.value
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: P
				}, {
					default: S(() => [...n[11] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : D.value.length === 0 ? (_(), u(o, {
				key: 2,
				icon: "film",
				title: "No libraries yet",
				description: "Add one to get started."
			}, {
				actions: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: xt
				}, {
					default: S(() => [...n[12] ||= [m("Add library", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", ye, [n[19] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Name"),
				p("th", { scope: "col" }, "Type"),
				p("th", { scope: "col" }, "Paths"),
				p("th", { scope: "col" }, "Status"),
				p("th", {
					scope: "col",
					class: "admin-libraries__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(c, null, y(D.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, b(e.name), 1),
				p("td", null, b(e.type), 1),
				p("td", null, b(e.paths.length) + " paths", 1),
				p("td", null, [p("span", {
					class: "admin-libraries__status",
					"data-testid": `status-${e.id}`
				}, [h(te, { tone: $e(A.value[e.id]) }, {
					default: S(() => [m(b(Qe(A.value[e.id])), 1)]),
					_: 2
				}, 1032, ["tone"]), A.value[e.id]?.status === "failed" && A.value[e.id]?.error ? (_(), f("span", xe, b(A.value[e.id]?.error), 1)) : et(A.value[e.id]) ? (_(), f("span", {
					key: 1,
					class: "admin-libraries__progress",
					"data-testid": `progress-${e.id}`
				}, [
					p("span", {
						class: "admin-libraries__progress-bar",
						role: "progressbar",
						"aria-valuenow": E(A.value[e.id]),
						"aria-valuemin": "0",
						"aria-valuemax": "100",
						"aria-label": `Scan progress for ${e.name}`
					}, [p("span", {
						class: "admin-libraries__progress-fill",
						style: ue({ width: E(A.value[e.id]) + "%" })
					}, null, 4)], 8, Ce),
					p("span", we, b(E(A.value[e.id])) + "% · " + b(tt(A.value[e.id])), 1),
					nt(A.value[e.id]) ? (_(), f("span", Te, b(nt(A.value[e.id])), 1)) : d("", !0)
				], 8, Se)) : d("", !0)], 8, be)]),
				p("td", null, [p("div", Ee, [
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Edit ${e.name}`,
						onClick: (t) => St(e)
					}, {
						default: S(() => [...n[13] ||= [m(" Edit ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Scan ${e.name}`,
						onClick: (t) => X(e, "scan")
					}, {
						default: S(() => [...n[14] ||= [m(" Scan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Rescan ${e.name}`,
						onClick: (t) => X(e, "rescan")
					}, {
						default: S(() => [...n[15] ||= [m(" Rescan ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Match metadata for ${e.name}`,
						onClick: (t) => X(e, "metadata")
					}, {
						default: S(() => [...n[16] ||= [m(" Match metadata ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `History for ${e.name}`,
						onClick: (t) => Dt(e)
					}, {
						default: S(() => [...n[17] ||= [m(" History ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					h(a, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.name}`,
						onClick: (t) => Y.value = e
					}, {
						default: S(() => [...n[18] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])])),
			h(t, {
				modelValue: F.value,
				"onUpdate:modelValue": n[4] ||= (e) => F.value = e,
				title: ct.value,
				onClose: J
			}, {
				footer: S(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: J
				}, {
					default: S(() => [...n[28] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: Ct
				}, {
					default: S(() => [m(b(I.value ? "Save" : "Create"), 1)]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [p("form", {
					class: "admin-libraries__form",
					onSubmit: he(Ct, ["prevent"])
				}, [
					p("label", De, [n[20] ||= p("span", { class: "admin-libraries__label" }, "Name", -1), me(p("input", {
						"onUpdate:modelValue": n[0] ||= (e) => L.value = e,
						type: "text",
						class: "admin-libraries__input",
						autocomplete: "off",
						required: ""
					}, null, 512), [[x, L.value]])]),
					p("div", Oe, [
						n[21] ||= p("span", { class: "admin-libraries__label" }, "Type", -1),
						I.value ? (_(), f("input", {
							key: 0,
							class: "admin-libraries__input",
							value: R.value,
							readonly: "",
							"aria-readonly": "true",
							"aria-label": "Type"
						}, null, 8, ke)) : (_(), u(re, {
							key: 1,
							"model-value": R.value,
							options: Xe.value,
							label: "Type",
							"onUpdate:modelValue": n[1] ||= (e) => R.value = String(e)
						}, null, 8, ["model-value", "options"])),
						I.value ? (_(), f("span", Ae, "Type cannot be changed.")) : d("", !0)
					]),
					p("label", je, [n[22] ||= p("span", { class: "admin-libraries__label" }, "Paths (one per line)", -1), me(p("textarea", {
						"onUpdate:modelValue": n[2] ||= (e) => z.value = e,
						class: "admin-libraries__textarea",
						rows: "4",
						autocomplete: "off",
						placeholder: "/media/movies"
					}, null, 512), [[x, z.value]])]),
					R.value === "series" ? (_(), f("div", Me, [h(ne, {
						modelValue: B.value,
						"onUpdate:modelValue": n[3] ||= (e) => B.value = e,
						label: "Each series is in its own folder"
					}, null, 8, ["modelValue"]), n[23] ||= p("span", { class: "admin-libraries__hint-text" }, " Use each top-level folder name as the series title to improve metadata matching. ", -1)])) : d("", !0),
					p("div", Ne, [
						n[24] ||= p("span", { class: "admin-libraries__label" }, "Metadata source priority", -1),
						n[25] ||= p("p", { class: "admin-libraries__hint-text" }, " The order metadata sources are tried for this library. The first source with a value for a field wins. Leave as the default to use the server-wide order, or reorder / remove sources to override it just for this library. ", -1),
						h(oe, {
							"model-value": ht.value,
							available: mt.value,
							label: `${R.value} sources`,
							"onUpdate:modelValue": vt
						}, null, 8, [
							"model-value",
							"available",
							"label"
						])
					]),
					G.value.length ? (_(), f("div", Pe, [
						n[26] ||= p("span", { class: "admin-libraries__label" }, "Artwork types", -1),
						n[27] ||= p("p", { class: "admin-libraries__hint-text" }, " Which artwork types this library downloads and stores during scan and metadata matching. Unchecked types are skipped. Leave as-is to use the defaults. ", -1),
						p("ul", Fe, [(_(!0), f(c, null, y(G.value, (e) => (_(), f("li", {
							key: e.type,
							class: "admin-libraries__imagetype"
						}, [p("label", Ie, [p("input", {
							type: "checkbox",
							class: "admin-libraries__checkbox-input",
							checked: K.value[e.type] ?? !1,
							"aria-label": e.label,
							onChange: (t) => ft(e.type, t.target.checked)
						}, null, 40, Le), p("span", Re, [p("span", ze, b(e.label), 1), e.providers.length ? (_(), f("span", Be, b(e.providers.join(", ")), 1)) : d("", !0)])])]))), 128))])
					])) : d("", !0)
				], 32)]),
				_: 1
			}, 8, ["modelValue", "title"]),
			h(t, {
				"model-value": Y.value !== null,
				title: "Delete library",
				size: "sm",
				"onUpdate:modelValue": n[6] ||= (e) => Y.value = null
			}, {
				footer: S(() => [h(a, {
					variant: "ghost",
					size: "sm",
					onClick: n[5] ||= (e) => Y.value = null
				}, {
					default: S(() => [...n[31] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(a, {
					variant: "solid",
					size: "sm",
					onClick: wt
				}, {
					default: S(() => [...n[32] ||= [m("Delete", -1)]]),
					_: 1
				})]),
				default: S(() => [p("p", null, [
					n[29] ||= m(" Delete library ", -1),
					p("strong", null, b(Y.value?.name), 1),
					n[30] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"]),
			h(t, {
				modelValue: Et.value,
				"onUpdate:modelValue": n[7] ||= (e) => Et.value = e,
				title: Tt.value,
				size: "lg"
			}, {
				footer: S(() => [h(a, {
					variant: "solid",
					size: "sm",
					onClick: Ot
				}, {
					default: S(() => [...n[34] ||= [m("Close", -1)]]),
					_: 1
				})]),
				default: S(() => [$.value ? (_(), f("div", Ve, [h(ie, {
					variant: "text",
					lines: 4
				})])) : Q.value.length === 0 ? (_(), u(o, {
					key: 1,
					icon: "list",
					title: "No scans yet"
				})) : (_(), f("table", He, [n[33] ||= p("thead", null, [p("tr", null, [
					p("th", { scope: "col" }, "Type"),
					p("th", { scope: "col" }, "Status"),
					p("th", { scope: "col" }, "Queued"),
					p("th", { scope: "col" }, "Completed"),
					p("th", { scope: "col" }, "Error")
				])], -1), p("tbody", null, [(_(!0), f(c, null, y(Q.value, (e) => (_(), f("tr", { key: e.id }, [
					p("td", null, b(e.type), 1),
					p("td", null, [h(te, { tone: $e(e) }, {
						default: S(() => [m(b(Qe(e)), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					p("td", Ue, b(e.queued_at ?? ""), 1),
					p("td", We, b(e.completed_at ?? ""), 1),
					p("td", null, b(e.error ?? ""), 1)
				]))), 128))])]))]),
				_: 1
			}, 8, ["modelValue", "title"])
		]));
	}
}), [["__scopeId", "data-v-b015fe19"]]);
//#endregion
export { C as default };

//# sourceMappingURL=LibrariesPage-IiEWha4h.js.map