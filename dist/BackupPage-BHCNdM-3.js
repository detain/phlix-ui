import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Modal-CqhoiLRk.js";
import { c as n, f as r, t as i } from "./client-BzWwyWKr.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-DWa6Ld_Z.js";
import { t as ee } from "./Badge-B6MgOwKQ.js";
import { t as s } from "./Skeleton-DhQmxeNg.js";
import { t as c } from "./EmptyState-ZlI5t4KT.js";
import { t as te } from "./PageHint-BoAlFFBN.js";
import { t as ne } from "./backup-IdY_vzc2.js";
import { t as l } from "./helpLinks-BI4oN4Or.js";
import { Fragment as u, computed as re, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as ie, onMounted as ae, openBlock as v, ref as y, renderList as oe, toDisplayString as b, unref as x, vModelText as S, withCtx as C, withDirectives as w, withModifiers as T } from "vue";
//#region src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
var se = { class: "admin-backup" }, ce = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, le = { class: "admin-backup__head" }, ue = {
	key: 0,
	class: "admin-backup__skel"
}, de = {
	key: 3,
	class: "admin-backup__table",
	"aria-label": "Backups"
}, fe = { key: 0 }, pe = {
	key: 1,
	class: "admin-backup__muted"
}, me = { class: "admin-backup__num" }, he = { class: "admin-backup__date" }, ge = ["title"], _e = { class: "admin-backup__actions" }, ve = {
	class: "admin-backup__section",
	"aria-labelledby": "schedule-heading"
}, ye = {
	key: 0,
	class: "admin-backup__skel"
}, be = {
	key: 2,
	class: "admin-backup__card"
}, xe = { class: "admin-backup__next" }, Se = ["title"], Ce = {
	key: 0,
	class: "admin-backup__muted"
}, we = {
	key: 1,
	class: "admin-backup__muted"
}, Te = { class: "admin-backup__form-row" }, Ee = { class: "admin-backup__field" }, De = { class: "admin-backup__field" }, Oe = { class: "admin-backup__form-actions" }, ke = { class: "admin-backup__field" }, E = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "BackupPage",
	props: { client: {} },
	setup(e) {
		let _ = e, E = ie("apiBase", ""), Ae = re(() => typeof E == "string" ? E : E?.value ?? ""), D = new ne(_.client ?? new i({
			baseUrl: Ae.value,
			tokenStore: new n()
		})), O = a();
		function je(e) {
			if (e === 0) return "0 B";
			let t = 1024, n = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], r = Math.floor(Math.log(e) / Math.log(t));
			return `${parseFloat((e / t ** r).toFixed(1))} ${n[r]}`;
		}
		function Me(e) {
			let t = new Date(e), n = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(n / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${i}m ago`;
			let a = Math.floor(i / 60);
			return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
		}
		function Ne(e) {
			if (e === null) return "Not scheduled";
			let t = e - Math.floor(Date.now() / 1e3);
			if (t < 0) return "Overdue";
			let n = Math.floor(t / 86400);
			return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `in ${n} days`;
		}
		let k = y([]), A = y(!0), j = y(null), M = y(null);
		async function N() {
			A.value = !0, j.value = null;
			try {
				k.value = await D.list();
			} catch (e) {
				j.value = r(e, "Failed to load backups."), O.error(j.value);
			} finally {
				A.value = !1;
			}
		}
		let P = y(!1), F = y(""), I = y(!1);
		function L() {
			F.value = "", P.value = !0;
		}
		function R() {
			P.value = !1, F.value = "";
		}
		async function z() {
			I.value = !0;
			try {
				let e = F.value.trim(), t = await D.create(e ? { label: e } : {});
				O.success(t.message || "Backup created."), R(), await N();
			} catch (e) {
				O.error(r(e, "Failed to create backup."));
			} finally {
				I.value = !1;
			}
		}
		let B = y(null), V = y(!1);
		function H() {
			B.value = null, V.value = !1;
		}
		async function Pe() {
			let e = B.value;
			if (e) {
				V.value = !0;
				try {
					let t = await D.restore(e.id);
					O.success(t.message || "Restore completed."), H();
				} catch (e) {
					O.error(r(e, "Restore failed.")), H();
				}
			}
		}
		let U = y(null), W = y(!1);
		function G() {
			U.value = null, W.value = !1;
		}
		async function Fe() {
			let e = U.value;
			if (e) {
				W.value = !0;
				try {
					await D.delete(e.id), O.success("Backup deleted."), G(), await N();
				} catch (e) {
					O.error(r(e, "Failed to delete backup.")), G();
				}
			}
		}
		async function Ie(e) {
			M.value = e.id;
			try {
				let t = await D.uploadToS3(e.id);
				O.success(t.message || "Uploaded to S3."), await N();
			} catch (e) {
				O.error(r(e, "S3 upload failed."));
			} finally {
				M.value = null;
			}
		}
		let K = y(null), q = y(!0), J = y(null), Y = y(""), X = y(""), Z = y(!1);
		async function Q() {
			q.value = !0, J.value = null;
			try {
				let e = await D.getSchedule();
				K.value = e, Y.value = String(e.auto_backup_interval_days), X.value = String(e.retention_count);
			} catch (e) {
				J.value = r(e, "Failed to load schedule."), O.error(J.value);
			} finally {
				q.value = !1;
			}
		}
		async function $() {
			let e = parseInt(Y.value, 10), t = parseInt(X.value, 10);
			if (isNaN(e) || e < 0) {
				O.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(t) || t < 1) {
				O.error("Retention count must be at least 1.");
				return;
			}
			Z.value = !0;
			try {
				let n = await D.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: t
				});
				O.success("Schedule saved."), K.value &&= {
					...K.value,
					auto_backup_interval_days: n.auto_backup_interval_days,
					retention_count: n.retention_count
				};
			} catch (e) {
				O.error(r(e, "Failed to save schedule."));
			} finally {
				Z.value = !1;
			}
		}
		return ae(() => {
			N(), Q();
		}), (e, n) => (v(), p("div", se, [
			m("section", ce, [
				m("header", le, [n[5] ||= m("h1", {
					id: "backups-heading",
					class: "admin-backup__title"
				}, "Backups", -1), g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: L
				}, {
					default: C(() => [...n[4] ||= [h("Create backup", -1)]]),
					_: 1
				})]),
				g(te, {
					links: x(l).backup.links,
					details: x(l).backup.details
				}, {
					default: C(() => [...n[6] ||= [
						h(" Save and restore snapshots of your server's database and settings. ", -1),
						m("strong", null, "Create backup", -1),
						h(" makes a new snapshot (with an optional label); ", -1),
						m("strong", null, "Restore", -1),
						h(" rolls the server back to a chosen one, and ", -1),
						m("strong", null, "Delete", -1),
						h(" removes it. ", -1),
						m("strong", null, "Upload to S3", -1),
						h(" copies a local backup to cloud storage. Under ", -1),
						m("strong", null, "Scheduled backups", -1),
						h(", set the ", -1),
						m("strong", null, "interval", -1),
						h(" (days between automatic backups) and ", -1),
						m("strong", null, "retention count", -1),
						h(" (how many to keep), then ", -1),
						m("strong", null, "Save schedule", -1),
						h(". ", -1)
					]]),
					_: 1
				}, 8, ["links", "details"]),
				A.value ? (v(), p("div", ue, [g(s, {
					variant: "text",
					lines: 5
				})])) : j.value ? (v(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load backups",
					description: j.value
				}, {
					actions: C(() => [g(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: N
					}, {
						default: C(() => [...n[7] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : k.value.length === 0 ? (v(), d(c, {
					key: 2,
					icon: "film",
					title: "No backups yet",
					description: "Create one to get started."
				}, {
					actions: C(() => [g(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						onClick: L
					}, {
						default: C(() => [...n[8] ||= [h("Create backup", -1)]]),
						_: 1
					})]),
					_: 1
				})) : (v(), p("table", de, [n[12] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Label"),
					m("th", { scope: "col" }, "Size"),
					m("th", { scope: "col" }, "Created"),
					m("th", { scope: "col" }, "Storage"),
					m("th", {
						scope: "col",
						class: "admin-backup__actions-col"
					}, "Actions")
				])], -1), m("tbody", null, [(v(!0), p(u, null, oe(k.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, [e.label ? (v(), p("span", fe, b(e.label), 1)) : (v(), p("span", pe, "Unnamed"))]),
					m("td", me, b(je(e.size_bytes)), 1),
					m("td", he, [m("span", { title: e.created_at }, b(Me(e.created_at)), 9, ge)]),
					m("td", null, [g(ee, { tone: e.is_s3 ? "success" : "neutral" }, {
						default: C(() => [h(b(e.is_s3 ? "S3" : "Local"), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", null, [m("div", _e, [
						g(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Restore ${e.label || e.id}`,
							onClick: (t) => B.value = e
						}, {
							default: C(() => [...n[9] ||= [h(" Restore ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						e.is_s3 ? f("", !0) : (v(), d(o, {
							key: 0,
							variant: "ghost",
							size: "sm",
							loading: M.value === e.id,
							"aria-label": `Upload ${e.label || e.id} to S3`,
							onClick: (t) => Ie(e)
						}, {
							default: C(() => [...n[10] ||= [h(" Upload to S3 ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])),
						g(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Delete ${e.label || e.id}`,
							onClick: (t) => U.value = e
						}, {
							default: C(() => [...n[11] ||= [h(" Delete ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])]))
			]),
			m("section", ve, [n[18] ||= m("header", { class: "admin-backup__head" }, [m("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), q.value ? (v(), p("div", ye, [g(s, {
				variant: "text",
				lines: 3
			})])) : J.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load schedule",
				description: J.value
			}, {
				actions: C(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: C(() => [...n[13] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value ? (v(), p("div", be, [m("p", xe, [n[14] ||= m("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), K.value.next_scheduled_backup === null ? (v(), p("span", we, "Not scheduled")) : (v(), p(u, { key: 0 }, [m("span", { title: K.value.next_scheduled_backup_iso ?? "" }, b(Ne(K.value.next_scheduled_backup)), 9, Se), K.value.next_scheduled_backup_iso ? (v(), p("span", Ce, " (" + b(K.value.next_scheduled_backup_iso) + ") ", 1)) : f("", !0)], 64))]), m("form", {
				class: "admin-backup__form",
				onSubmit: T($, ["prevent"])
			}, [m("div", Te, [m("label", Ee, [n[15] ||= m("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), w(m("input", {
				"onUpdate:modelValue": n[0] ||= (e) => Y.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[S, Y.value]])]), m("label", De, [n[16] ||= m("span", { class: "admin-backup__label" }, "Retention count", -1), w(m("input", {
				"onUpdate:modelValue": n[1] ||= (e) => X.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[S, X.value]])])]), m("div", Oe, [g(o, {
				variant: "solid",
				size: "sm",
				loading: Z.value,
				onClick: $
			}, {
				default: C(() => [...n[17] ||= [h(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : f("", !0)]),
			g(t, {
				modelValue: P.value,
				"onUpdate:modelValue": n[3] ||= (e) => P.value = e,
				title: "Create backup",
				onClose: R
			}, {
				footer: C(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: R
				}, {
					default: C(() => [...n[20] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: I.value,
					onClick: z
				}, {
					default: C(() => [...n[21] ||= [h("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [m("form", {
					class: "admin-backup__form",
					onSubmit: T(z, ["prevent"])
				}, [m("label", ke, [n[19] ||= m("span", { class: "admin-backup__label" }, "Label (optional)", -1), w(m("input", {
					"onUpdate:modelValue": n[2] ||= (e) => F.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[S, F.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(t, {
				"model-value": B.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": H
			}, {
				footer: C(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: C(() => [...n[22] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: Pe
				}, {
					default: C(() => [...n[23] ||= [h(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [n[24] ||= m("p", null, [h("This will overwrite your current data. "), m("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			g(t, {
				"model-value": U.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": G
			}, {
				footer: C(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: C(() => [...n[27] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: Fe
				}, {
					default: C(() => [...n[28] ||= [h(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: C(() => [m("p", null, [
					n[25] ||= h(" Are you sure you want to delete backup ", -1),
					m("strong", null, b(U.value?.label || U.value?.id), 1),
					n[26] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-b487a76f"]]);
//#endregion
export { E as default };

//# sourceMappingURL=BackupPage-BHCNdM-3.js.map