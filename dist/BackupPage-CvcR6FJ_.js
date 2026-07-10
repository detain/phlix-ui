import { n as e } from "./Icon-Bd1lZf6E.js";
import { t } from "./Modal-BXA8fOR4.js";
import { c as n, f as r, t as i } from "./client-CGSA6iT0.js";
import { t as a } from "./useToastStore-BDoKlU6N.js";
import { t as o } from "./Button-CnyfCnhY.js";
import { t as ee } from "./Badge-Dq-pYhrz.js";
import { t as s } from "./Skeleton-CzU_l53W.js";
import { t as c } from "./EmptyState-588Z_81C.js";
import { t as te } from "./PageHint-7Giwob0l.js";
import { t as l } from "./backup-IdY_vzc2.js";
import { Fragment as u, computed as ne, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createTextVNode as h, createVNode as g, defineComponent as _, inject as re, onMounted as ie, openBlock as v, ref as y, renderList as ae, toDisplayString as b, vModelText as x, withCtx as S, withDirectives as C, withModifiers as w } from "vue";
//#region src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
var oe = { class: "admin-backup" }, se = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, ce = { class: "admin-backup__head" }, le = {
	key: 0,
	class: "admin-backup__skel"
}, ue = {
	key: 3,
	class: "admin-backup__table",
	"aria-label": "Backups"
}, de = { key: 0 }, fe = {
	key: 1,
	class: "admin-backup__muted"
}, pe = { class: "admin-backup__num" }, me = { class: "admin-backup__date" }, he = ["title"], ge = { class: "admin-backup__actions" }, _e = {
	class: "admin-backup__section",
	"aria-labelledby": "schedule-heading"
}, ve = {
	key: 0,
	class: "admin-backup__skel"
}, ye = {
	key: 2,
	class: "admin-backup__card"
}, be = { class: "admin-backup__next" }, xe = ["title"], Se = {
	key: 0,
	class: "admin-backup__muted"
}, Ce = {
	key: 1,
	class: "admin-backup__muted"
}, we = { class: "admin-backup__form-row" }, Te = { class: "admin-backup__field" }, Ee = { class: "admin-backup__field" }, De = { class: "admin-backup__form-actions" }, Oe = { class: "admin-backup__field" }, T = /*#__PURE__*/ e(/* @__PURE__ */ _({
	__name: "BackupPage",
	props: { client: {} },
	setup(e) {
		let _ = e, T = re("apiBase", ""), ke = ne(() => typeof T == "string" ? T : T?.value ?? ""), E = new l(_.client ?? new i({
			baseUrl: ke.value,
			tokenStore: new n()
		})), D = a();
		function Ae(e) {
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
		function je(e) {
			let t = new Date(e), n = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(n / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${i}m ago`;
			let a = Math.floor(i / 60);
			return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
		}
		function O(e) {
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
				k.value = await E.list();
			} catch (e) {
				j.value = r(e, "Failed to load backups."), D.error(j.value);
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
				let e = F.value.trim(), t = await E.create(e ? { label: e } : {});
				D.success(t.message || "Backup created."), R(), await N();
			} catch (e) {
				D.error(r(e, "Failed to create backup."));
			} finally {
				I.value = !1;
			}
		}
		let B = y(null), V = y(!1);
		function H() {
			B.value = null, V.value = !1;
		}
		async function Me() {
			let e = B.value;
			if (e) {
				V.value = !0;
				try {
					let t = await E.restore(e.id);
					D.success(t.message || "Restore completed."), H();
				} catch (e) {
					D.error(r(e, "Restore failed.")), H();
				}
			}
		}
		let U = y(null), W = y(!1);
		function G() {
			U.value = null, W.value = !1;
		}
		async function Ne() {
			let e = U.value;
			if (e) {
				W.value = !0;
				try {
					await E.delete(e.id), D.success("Backup deleted."), G(), await N();
				} catch (e) {
					D.error(r(e, "Failed to delete backup.")), G();
				}
			}
		}
		async function Pe(e) {
			M.value = e.id;
			try {
				let t = await E.uploadToS3(e.id);
				D.success(t.message || "Uploaded to S3."), await N();
			} catch (e) {
				D.error(r(e, "S3 upload failed."));
			} finally {
				M.value = null;
			}
		}
		let K = y(null), q = y(!0), J = y(null), Y = y(""), X = y(""), Z = y(!1);
		async function Q() {
			q.value = !0, J.value = null;
			try {
				let e = await E.getSchedule();
				K.value = e, Y.value = String(e.auto_backup_interval_days), X.value = String(e.retention_count);
			} catch (e) {
				J.value = r(e, "Failed to load schedule."), D.error(J.value);
			} finally {
				q.value = !1;
			}
		}
		async function $() {
			let e = parseInt(Y.value, 10), t = parseInt(X.value, 10);
			if (isNaN(e) || e < 0) {
				D.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(t) || t < 1) {
				D.error("Retention count must be at least 1.");
				return;
			}
			Z.value = !0;
			try {
				let n = await E.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: t
				});
				D.success("Schedule saved."), K.value &&= {
					...K.value,
					auto_backup_interval_days: n.auto_backup_interval_days,
					retention_count: n.retention_count
				};
			} catch (e) {
				D.error(r(e, "Failed to save schedule."));
			} finally {
				Z.value = !1;
			}
		}
		return ie(() => {
			N(), Q();
		}), (e, n) => (v(), p("div", oe, [
			m("section", se, [
				m("header", ce, [n[5] ||= m("h1", {
					id: "backups-heading",
					class: "admin-backup__title"
				}, "Backups", -1), g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: L
				}, {
					default: S(() => [...n[4] ||= [h("Create backup", -1)]]),
					_: 1
				})]),
				g(te, null, {
					default: S(() => [...n[6] ||= [
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
				}),
				A.value ? (v(), p("div", le, [g(s, {
					variant: "text",
					lines: 5
				})])) : j.value ? (v(), d(c, {
					key: 1,
					icon: "alert",
					title: "Couldn't load backups",
					description: j.value
				}, {
					actions: S(() => [g(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: N
					}, {
						default: S(() => [...n[7] ||= [h("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : k.value.length === 0 ? (v(), d(c, {
					key: 2,
					icon: "film",
					title: "No backups yet",
					description: "Create one to get started."
				}, {
					actions: S(() => [g(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						onClick: L
					}, {
						default: S(() => [...n[8] ||= [h("Create backup", -1)]]),
						_: 1
					})]),
					_: 1
				})) : (v(), p("table", ue, [n[12] ||= m("thead", null, [m("tr", null, [
					m("th", { scope: "col" }, "Label"),
					m("th", { scope: "col" }, "Size"),
					m("th", { scope: "col" }, "Created"),
					m("th", { scope: "col" }, "Storage"),
					m("th", {
						scope: "col",
						class: "admin-backup__actions-col"
					}, "Actions")
				])], -1), m("tbody", null, [(v(!0), p(u, null, ae(k.value, (e) => (v(), p("tr", { key: e.id }, [
					m("td", null, [e.label ? (v(), p("span", de, b(e.label), 1)) : (v(), p("span", fe, "Unnamed"))]),
					m("td", pe, b(Ae(e.size_bytes)), 1),
					m("td", me, [m("span", { title: e.created_at }, b(je(e.created_at)), 9, he)]),
					m("td", null, [g(ee, { tone: e.is_s3 ? "success" : "neutral" }, {
						default: S(() => [h(b(e.is_s3 ? "S3" : "Local"), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					m("td", null, [m("div", ge, [
						g(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Restore ${e.label || e.id}`,
							onClick: (t) => B.value = e
						}, {
							default: S(() => [...n[9] ||= [h(" Restore ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						e.is_s3 ? f("", !0) : (v(), d(o, {
							key: 0,
							variant: "ghost",
							size: "sm",
							loading: M.value === e.id,
							"aria-label": `Upload ${e.label || e.id} to S3`,
							onClick: (t) => Pe(e)
						}, {
							default: S(() => [...n[10] ||= [h(" Upload to S3 ", -1)]]),
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
							default: S(() => [...n[11] ||= [h(" Delete ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])]))
			]),
			m("section", _e, [n[18] ||= m("header", { class: "admin-backup__head" }, [m("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), q.value ? (v(), p("div", ve, [g(s, {
				variant: "text",
				lines: 3
			})])) : J.value ? (v(), d(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load schedule",
				description: J.value
			}, {
				actions: S(() => [g(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: S(() => [...n[13] ||= [h("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value ? (v(), p("div", ye, [m("p", be, [n[14] ||= m("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), K.value.next_scheduled_backup === null ? (v(), p("span", Ce, "Not scheduled")) : (v(), p(u, { key: 0 }, [m("span", { title: K.value.next_scheduled_backup_iso ?? "" }, b(O(K.value.next_scheduled_backup)), 9, xe), K.value.next_scheduled_backup_iso ? (v(), p("span", Se, " (" + b(K.value.next_scheduled_backup_iso) + ") ", 1)) : f("", !0)], 64))]), m("form", {
				class: "admin-backup__form",
				onSubmit: w($, ["prevent"])
			}, [m("div", we, [m("label", Te, [n[15] ||= m("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), C(m("input", {
				"onUpdate:modelValue": n[0] ||= (e) => Y.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[x, Y.value]])]), m("label", Ee, [n[16] ||= m("span", { class: "admin-backup__label" }, "Retention count", -1), C(m("input", {
				"onUpdate:modelValue": n[1] ||= (e) => X.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[x, X.value]])])]), m("div", De, [g(o, {
				variant: "solid",
				size: "sm",
				loading: Z.value,
				onClick: $
			}, {
				default: S(() => [...n[17] ||= [h(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : f("", !0)]),
			g(t, {
				modelValue: P.value,
				"onUpdate:modelValue": n[3] ||= (e) => P.value = e,
				title: "Create backup",
				onClose: R
			}, {
				footer: S(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: R
				}, {
					default: S(() => [...n[20] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: I.value,
					onClick: z
				}, {
					default: S(() => [...n[21] ||= [h("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("form", {
					class: "admin-backup__form",
					onSubmit: w(z, ["prevent"])
				}, [m("label", Oe, [n[19] ||= m("span", { class: "admin-backup__label" }, "Label (optional)", -1), C(m("input", {
					"onUpdate:modelValue": n[2] ||= (e) => F.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[x, F.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			g(t, {
				"model-value": B.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": H
			}, {
				footer: S(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: S(() => [...n[22] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: Me
				}, {
					default: S(() => [...n[23] ||= [h(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [n[24] ||= m("p", null, [h("This will overwrite your current data. "), m("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			g(t, {
				"model-value": U.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": G
			}, {
				footer: S(() => [g(o, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: S(() => [...n[27] ||= [h("Cancel", -1)]]),
					_: 1
				}), g(o, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: Ne
				}, {
					default: S(() => [...n[28] ||= [h(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [m("p", null, [
					n[25] ||= h(" Are you sure you want to delete backup ", -1),
					m("strong", null, b(U.value?.label || U.value?.id), 1),
					n[26] ||= h("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-df9c5034"]]);
//#endregion
export { T as default };

//# sourceMappingURL=BackupPage-CvcR6FJ_.js.map