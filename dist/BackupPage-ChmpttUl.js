import { a as e, d as t, i as n, m as r, n as i, r as a, t as o } from "./Button-DjEQ9y17.js";
import { t as s } from "./Modal-BkSAbwHm.js";
import { t as ee } from "./EmptyState-bbKd8GNA.js";
import { t as te } from "./Badge-DobVc76J.js";
import { t as ne } from "./backup-IdY_vzc2.js";
import { Fragment as c, computed as re, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as ie, onMounted as ae, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelText as b, withCtx as x, withDirectives as S, withModifiers as C } from "vue";
//#region src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
var oe = { class: "admin-backup" }, se = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, ce = { class: "admin-backup__head" }, le = {
	key: 0,
	class: "admin-backup__skel"
}, ue = {
	key: 2,
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
	key: 1,
	class: "admin-backup__card"
}, be = { class: "admin-backup__next" }, xe = ["title"], Se = {
	key: 0,
	class: "admin-backup__muted"
}, Ce = {
	key: 1,
	class: "admin-backup__muted"
}, we = { class: "admin-backup__form-row" }, Te = { class: "admin-backup__field" }, w = { class: "admin-backup__field" }, T = { class: "admin-backup__form-actions" }, E = { class: "admin-backup__field" }, D = /*#__PURE__*/ r(/* @__PURE__ */ h({
	__name: "BackupPage",
	props: { client: {} },
	setup(r) {
		let h = r, D = ie("apiBase", ""), O = re(() => typeof D == "string" ? D : D?.value ?? ""), k = new ne(h.client ?? new e({
			baseUrl: O.value,
			tokenStore: new n()
		})), A = a();
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
		function j(e) {
			if (e === null) return "Not scheduled";
			let t = e - Math.floor(Date.now() / 1e3);
			if (t < 0) return "Overdue";
			let n = Math.floor(t / 86400);
			return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `in ${n} days`;
		}
		let M = _([]), N = _(!0), P = _(null);
		async function F() {
			N.value = !0;
			try {
				M.value = await k.list();
			} catch (e) {
				A.error(t(e, "Failed to load backups."));
			} finally {
				N.value = !1;
			}
		}
		let I = _(!1), L = _(""), R = _(!1);
		function z() {
			L.value = "", I.value = !0;
		}
		function B() {
			I.value = !1, L.value = "";
		}
		async function V() {
			R.value = !0;
			try {
				let e = L.value.trim(), t = await k.create(e ? { label: e } : {});
				A.success(t.message || "Backup created."), B(), await F();
			} catch (e) {
				A.error(t(e, "Failed to create backup."));
			} finally {
				R.value = !1;
			}
		}
		let H = _(null), U = _(!1);
		function W() {
			H.value = null, U.value = !1;
		}
		async function Oe() {
			let e = H.value;
			if (e) {
				U.value = !0;
				try {
					let t = await k.restore(e.id);
					A.success(t.message || "Restore completed."), W();
				} catch (e) {
					A.error(t(e, "Restore failed.")), W();
				}
			}
		}
		let G = _(null), K = _(!1);
		function q() {
			G.value = null, K.value = !1;
		}
		async function ke() {
			let e = G.value;
			if (e) {
				K.value = !0;
				try {
					await k.delete(e.id), A.success("Backup deleted."), q(), await F();
				} catch (e) {
					A.error(t(e, "Failed to delete backup.")), q();
				}
			}
		}
		async function Ae(e) {
			P.value = e.id;
			try {
				let t = await k.uploadToS3(e.id);
				A.success(t.message || "Uploaded to S3."), await F();
			} catch (e) {
				A.error(t(e, "S3 upload failed."));
			} finally {
				P.value = null;
			}
		}
		let J = _(null), Y = _(!0), X = _(""), Z = _(""), Q = _(!1);
		async function je() {
			Y.value = !0;
			try {
				let e = await k.getSchedule();
				J.value = e, X.value = String(e.auto_backup_interval_days), Z.value = String(e.retention_count);
			} catch (e) {
				A.error(t(e, "Failed to load schedule."));
			} finally {
				Y.value = !1;
			}
		}
		async function $() {
			let e = parseInt(X.value, 10), n = parseInt(Z.value, 10);
			if (isNaN(e) || e < 0) {
				A.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(n) || n < 1) {
				A.error("Retention count must be at least 1.");
				return;
			}
			Q.value = !0;
			try {
				let t = await k.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: n
				});
				A.success("Schedule saved."), J.value &&= {
					...J.value,
					auto_backup_interval_days: t.auto_backup_interval_days,
					retention_count: t.retention_count
				};
			} catch (e) {
				A.error(t(e, "Failed to save schedule."));
			} finally {
				Q.value = !1;
			}
		}
		return ae(() => {
			F(), je();
		}), (e, t) => (g(), d("div", oe, [
			f("section", se, [f("header", ce, [t[5] ||= f("h1", {
				id: "backups-heading",
				class: "admin-backup__title"
			}, "Backups", -1), m(o, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: z
			}, {
				default: x(() => [...t[4] ||= [p("Create backup", -1)]]),
				_: 1
			})]), N.value ? (g(), d("div", le, [m(i, {
				variant: "text",
				lines: 5
			})])) : M.value.length === 0 ? (g(), l(ee, {
				key: 1,
				icon: "film",
				title: "No backups yet",
				description: "Create one to get started."
			}, {
				actions: x(() => [m(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: z
				}, {
					default: x(() => [...t[6] ||= [p("Create backup", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", ue, [t[10] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Label"),
				f("th", { scope: "col" }, "Size"),
				f("th", { scope: "col" }, "Created"),
				f("th", { scope: "col" }, "Storage"),
				f("th", {
					scope: "col",
					class: "admin-backup__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(c, null, v(M.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, [e.label ? (g(), d("span", de, y(e.label), 1)) : (g(), d("span", fe, "Unnamed"))]),
				f("td", pe, y(Ee(e.size_bytes)), 1),
				f("td", me, [f("span", { title: e.created_at }, y(De(e.created_at)), 9, he)]),
				f("td", null, [m(te, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: x(() => [p(y(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [f("div", ge, [
					m(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Restore ${e.label || e.id}`,
						onClick: (t) => H.value = e
					}, {
						default: x(() => [...t[7] ||= [p(" Restore ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					e.is_s3 ? u("", !0) : (g(), l(o, {
						key: 0,
						variant: "ghost",
						size: "sm",
						loading: P.value === e.id,
						"aria-label": `Upload ${e.label || e.id} to S3`,
						onClick: (t) => Ae(e)
					}, {
						default: x(() => [...t[8] ||= [p(" Upload to S3 ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])),
					m(o, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.label || e.id}`,
						onClick: (t) => G.value = e
					}, {
						default: x(() => [...t[9] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			f("section", _e, [t[15] ||= f("header", { class: "admin-backup__head" }, [f("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), Y.value ? (g(), d("div", ve, [m(i, {
				variant: "text",
				lines: 3
			})])) : J.value ? (g(), d("div", ye, [f("p", be, [t[11] ||= f("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), J.value.next_scheduled_backup === null ? (g(), d("span", Ce, "Not scheduled")) : (g(), d(c, { key: 0 }, [f("span", { title: J.value.next_scheduled_backup_iso ?? "" }, y(j(J.value.next_scheduled_backup)), 9, xe), J.value.next_scheduled_backup_iso ? (g(), d("span", Se, " (" + y(J.value.next_scheduled_backup_iso) + ") ", 1)) : u("", !0)], 64))]), f("form", {
				class: "admin-backup__form",
				onSubmit: C($, ["prevent"])
			}, [f("div", we, [f("label", Te, [t[12] ||= f("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), S(f("input", {
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[b, X.value]])]), f("label", w, [t[13] ||= f("span", { class: "admin-backup__label" }, "Retention count", -1), S(f("input", {
				"onUpdate:modelValue": t[1] ||= (e) => Z.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[b, Z.value]])])]), f("div", T, [m(o, {
				variant: "solid",
				size: "sm",
				loading: Q.value,
				onClick: $
			}, {
				default: x(() => [...t[14] ||= [p(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : u("", !0)]),
			m(s, {
				modelValue: I.value,
				"onUpdate:modelValue": t[3] ||= (e) => I.value = e,
				title: "Create backup",
				onClose: B
			}, {
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: B
				}, {
					default: x(() => [...t[17] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: V
				}, {
					default: x(() => [...t[18] ||= [p("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-backup__form",
					onSubmit: C(V, ["prevent"])
				}, [f("label", E, [t[16] ||= f("span", { class: "admin-backup__label" }, "Label (optional)", -1), S(f("input", {
					"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[b, L.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(s, {
				"model-value": H.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": W
			}, {
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: W
				}, {
					default: x(() => [...t[19] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: Oe
				}, {
					default: x(() => [...t[20] ||= [p(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [t[21] ||= f("p", null, [p("This will overwrite your current data. "), f("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			m(s, {
				"model-value": G.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": q
			}, {
				footer: x(() => [m(o, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: x(() => [...t[24] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(o, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: ke
				}, {
					default: x(() => [...t[25] ||= [p(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("p", null, [
					t[22] ||= p(" Are you sure you want to delete backup ", -1),
					f("strong", null, y(G.value?.label || G.value?.id), 1),
					t[23] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-ccf04aa7"]]);
//#endregion
export { D as default };

//# sourceMappingURL=BackupPage-ChmpttUl.js.map