import { a as e, i as t, n, r, t as i, u as a } from "./Button-DFtuAYup.js";
import { t as o } from "./Modal-3-gao3sJ.js";
import { t as ee } from "./EmptyState-DPlVvQLn.js";
import { t as te } from "./Badge-DypgiWDB.js";
import { t as ne } from "./backup-IdY_vzc2.js";
import { Fragment as s, computed as re, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as ie, onMounted as ae, openBlock as h, ref as g, renderList as _, toDisplayString as v, vModelText as y, withCtx as b, withDirectives as x, withModifiers as S } from "vue";
//#region src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
var C = { class: "admin-backup" }, oe = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, se = { class: "admin-backup__head" }, ce = {
	key: 0,
	class: "admin-backup__skel"
}, le = {
	key: 2,
	class: "admin-backup__table",
	"aria-label": "Backups"
}, ue = { key: 0 }, de = {
	key: 1,
	class: "admin-backup__muted"
}, fe = { class: "admin-backup__num" }, pe = { class: "admin-backup__date" }, me = ["title"], he = { class: "admin-backup__actions" }, ge = {
	class: "admin-backup__section",
	"aria-labelledby": "schedule-heading"
}, _e = {
	key: 0,
	class: "admin-backup__skel"
}, ve = {
	key: 1,
	class: "admin-backup__card"
}, ye = { class: "admin-backup__next" }, be = ["title"], xe = {
	key: 0,
	class: "admin-backup__muted"
}, Se = {
	key: 1,
	class: "admin-backup__muted"
}, Ce = { class: "admin-backup__form-row" }, we = { class: "admin-backup__field" }, Te = { class: "admin-backup__field" }, w = { class: "admin-backup__form-actions" }, T = { class: "admin-backup__field" }, E = /*#__PURE__*/ a(/* @__PURE__ */ m({
	__name: "BackupPage",
	props: { client: {} },
	setup(a) {
		let m = a, E = ie("apiBase", ""), D = re(() => typeof E == "string" ? E : E?.value ?? ""), O = new ne(m.client ?? new e({
			baseUrl: D.value,
			tokenStore: new t()
		})), k = r();
		function A(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function Ee(e) {
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
		function De(e) {
			let t = new Date(e), n = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(n / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${i}m ago`;
			let a = Math.floor(i / 60);
			return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
		}
		function Oe(e) {
			if (e === null) return "Not scheduled";
			let t = e - Math.floor(Date.now() / 1e3);
			if (t < 0) return "Overdue";
			let n = Math.floor(t / 86400);
			return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `in ${n} days`;
		}
		let j = g([]), M = g(!0), N = g(null);
		async function P() {
			M.value = !0;
			try {
				j.value = await O.list();
			} catch (e) {
				k.error(A(e, "Failed to load backups."));
			} finally {
				M.value = !1;
			}
		}
		let F = g(!1), I = g(""), L = g(!1);
		function R() {
			I.value = "", F.value = !0;
		}
		function z() {
			F.value = !1, I.value = "";
		}
		async function B() {
			L.value = !0;
			try {
				let e = I.value.trim(), t = await O.create(e ? { label: e } : {});
				k.success(t.message || "Backup created."), z(), await P();
			} catch (e) {
				k.error(A(e, "Failed to create backup."));
			} finally {
				L.value = !1;
			}
		}
		let V = g(null), H = g(!1);
		function U() {
			V.value = null, H.value = !1;
		}
		async function ke() {
			let e = V.value;
			if (e) {
				H.value = !0;
				try {
					let t = await O.restore(e.id);
					k.success(t.message || "Restore completed."), U();
				} catch (e) {
					k.error(A(e, "Restore failed.")), U();
				}
			}
		}
		let W = g(null), G = g(!1);
		function K() {
			W.value = null, G.value = !1;
		}
		async function Ae() {
			let e = W.value;
			if (e) {
				G.value = !0;
				try {
					await O.delete(e.id), k.success("Backup deleted."), K(), await P();
				} catch (e) {
					k.error(A(e, "Failed to delete backup.")), K();
				}
			}
		}
		async function je(e) {
			N.value = e.id;
			try {
				let t = await O.uploadToS3(e.id);
				k.success(t.message || "Uploaded to S3."), await P();
			} catch (e) {
				k.error(A(e, "S3 upload failed."));
			} finally {
				N.value = null;
			}
		}
		let q = g(null), J = g(!0), Y = g(""), X = g(""), Z = g(!1);
		async function Q() {
			J.value = !0;
			try {
				let e = await O.getSchedule();
				q.value = e, Y.value = String(e.auto_backup_interval_days), X.value = String(e.retention_count);
			} catch (e) {
				k.error(A(e, "Failed to load schedule."));
			} finally {
				J.value = !1;
			}
		}
		async function $() {
			let e = parseInt(Y.value, 10), t = parseInt(X.value, 10);
			if (isNaN(e) || e < 0) {
				k.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(t) || t < 1) {
				k.error("Retention count must be at least 1.");
				return;
			}
			Z.value = !0;
			try {
				let n = await O.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: t
				});
				k.success("Schedule saved."), q.value &&= {
					...q.value,
					auto_backup_interval_days: n.auto_backup_interval_days,
					retention_count: n.retention_count
				};
			} catch (e) {
				k.error(A(e, "Failed to save schedule."));
			} finally {
				Z.value = !1;
			}
		}
		return ae(() => {
			P(), Q();
		}), (e, t) => (h(), u("div", C, [
			d("section", oe, [d("header", se, [t[5] ||= d("h1", {
				id: "backups-heading",
				class: "admin-backup__title"
			}, "Backups", -1), p(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: R
			}, {
				default: b(() => [...t[4] ||= [f("Create backup", -1)]]),
				_: 1
			})]), M.value ? (h(), u("div", ce, [p(n, {
				variant: "text",
				lines: 5
			})])) : j.value.length === 0 ? (h(), c(ee, {
				key: 1,
				icon: "film",
				title: "No backups yet",
				description: "Create one to get started."
			}, {
				actions: b(() => [p(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: R
				}, {
					default: b(() => [...t[6] ||= [f("Create backup", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (h(), u("table", le, [t[10] ||= d("thead", null, [d("tr", null, [
				d("th", { scope: "col" }, "Label"),
				d("th", { scope: "col" }, "Size"),
				d("th", { scope: "col" }, "Created"),
				d("th", { scope: "col" }, "Storage"),
				d("th", {
					scope: "col",
					class: "admin-backup__actions-col"
				}, "Actions")
			])], -1), d("tbody", null, [(h(!0), u(s, null, _(j.value, (e) => (h(), u("tr", { key: e.id }, [
				d("td", null, [e.label ? (h(), u("span", ue, v(e.label), 1)) : (h(), u("span", de, "Unnamed"))]),
				d("td", fe, v(Ee(e.size_bytes)), 1),
				d("td", pe, [d("span", { title: e.created_at }, v(De(e.created_at)), 9, me)]),
				d("td", null, [p(te, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: b(() => [f(v(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [d("div", he, [
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Restore ${e.label || e.id}`,
						onClick: (t) => V.value = e
					}, {
						default: b(() => [...t[7] ||= [f(" Restore ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					e.is_s3 ? l("", !0) : (h(), c(i, {
						key: 0,
						variant: "ghost",
						size: "sm",
						loading: N.value === e.id,
						"aria-label": `Upload ${e.label || e.id} to S3`,
						onClick: (t) => je(e)
					}, {
						default: b(() => [...t[8] ||= [f(" Upload to S3 ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])),
					p(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.label || e.id}`,
						onClick: (t) => W.value = e
					}, {
						default: b(() => [...t[9] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			d("section", ge, [t[15] ||= d("header", { class: "admin-backup__head" }, [d("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), J.value ? (h(), u("div", _e, [p(n, {
				variant: "text",
				lines: 3
			})])) : q.value ? (h(), u("div", ve, [d("p", ye, [t[11] ||= d("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), q.value.next_scheduled_backup === null ? (h(), u("span", Se, "Not scheduled")) : (h(), u(s, { key: 0 }, [d("span", { title: q.value.next_scheduled_backup_iso ?? "" }, v(Oe(q.value.next_scheduled_backup)), 9, be), q.value.next_scheduled_backup_iso ? (h(), u("span", xe, " (" + v(q.value.next_scheduled_backup_iso) + ") ", 1)) : l("", !0)], 64))]), d("form", {
				class: "admin-backup__form",
				onSubmit: S($, ["prevent"])
			}, [d("div", Ce, [d("label", we, [t[12] ||= d("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), x(d("input", {
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[y, Y.value]])]), d("label", Te, [t[13] ||= d("span", { class: "admin-backup__label" }, "Retention count", -1), x(d("input", {
				"onUpdate:modelValue": t[1] ||= (e) => X.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[y, X.value]])])]), d("div", w, [p(i, {
				variant: "solid",
				size: "sm",
				loading: Z.value,
				onClick: $
			}, {
				default: b(() => [...t[14] ||= [f(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : l("", !0)]),
			p(o, {
				modelValue: F.value,
				"onUpdate:modelValue": t[3] ||= (e) => F.value = e,
				title: "Create backup",
				onClose: z
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: z
				}, {
					default: b(() => [...t[17] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: L.value,
					onClick: B
				}, {
					default: b(() => [...t[18] ||= [f("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("form", {
					class: "admin-backup__form",
					onSubmit: S(B, ["prevent"])
				}, [d("label", T, [t[16] ||= d("span", { class: "admin-backup__label" }, "Label (optional)", -1), x(d("input", {
					"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[y, I.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			p(o, {
				"model-value": V.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": U
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: U
				}, {
					default: b(() => [...t[19] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: H.value,
					onClick: ke
				}, {
					default: b(() => [...t[20] ||= [f(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [t[21] ||= d("p", null, [f("This will overwrite your current data. "), d("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			p(o, {
				"model-value": W.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": K
			}, {
				footer: b(() => [p(i, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: b(() => [...t[24] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(i, {
					variant: "solid",
					size: "sm",
					loading: G.value,
					onClick: Ae
				}, {
					default: b(() => [...t[25] ||= [f(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: b(() => [d("p", null, [
					t[22] ||= f(" Are you sure you want to delete backup ", -1),
					d("strong", null, v(W.value?.label || W.value?.id), 1),
					t[23] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-b09885f4"]]);
//#endregion
export { E as default };

//# sourceMappingURL=BackupPage-BddgbYeH.js.map