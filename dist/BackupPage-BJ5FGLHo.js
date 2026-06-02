import { a as e, i as t, l as n, n as r, r as i, t as a } from "./tokenStore-SjxKwmod.js";
import { t as o } from "./Modal-D0ntqq7y.js";
import { t as ee } from "./EmptyState-sJb64K4c.js";
import { t as te } from "./Badge-wMoO7SFO.js";
import { t as ne } from "./backup-IdY_vzc2.js";
import { Fragment as s, computed as re, createBlock as c, createCommentVNode as l, createElementBlock as u, createElementVNode as d, createTextVNode as f, createVNode as p, defineComponent as m, inject as ie, onMounted as ae, openBlock as h, ref as g, renderList as oe, toDisplayString as _, vModelText as v, withCtx as y, withDirectives as b, withModifiers as x } from "vue";
//#region src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
var se = { class: "admin-backup" }, ce = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, S = { class: "admin-backup__head" }, C = {
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
}, Ce = { class: "admin-backup__form-row" }, we = { class: "admin-backup__field" }, Te = { class: "admin-backup__field" }, w = { class: "admin-backup__form-actions" }, T = { class: "admin-backup__field" }, E = /*#__PURE__*/ n(/* @__PURE__ */ m({
	__name: "BackupPage",
	props: { client: {} },
	setup(n) {
		let m = n, E = ie("apiBase", ""), D = re(() => typeof E == "string" ? E : E?.value ?? ""), O = new ne(m.client ?? new e({
			baseUrl: D.value,
			tokenStore: new a()
		})), k = t();
		function A(e, t) {
			return e instanceof Error && e.message ? e.message : t;
		}
		function j(e) {
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
		function Ee(e) {
			let t = new Date(e), n = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(n / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${i}m ago`;
			let a = Math.floor(i / 60);
			return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
		}
		function De(e) {
			if (e === null) return "Not scheduled";
			let t = e - Math.floor(Date.now() / 1e3);
			if (t < 0) return "Overdue";
			let n = Math.floor(t / 86400);
			return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `in ${n} days`;
		}
		let M = g([]), N = g(!0), P = g(null);
		async function F() {
			N.value = !0;
			try {
				M.value = await O.list();
			} catch (e) {
				k.error(A(e, "Failed to load backups."));
			} finally {
				N.value = !1;
			}
		}
		let I = g(!1), L = g(""), R = g(!1);
		function z() {
			L.value = "", I.value = !0;
		}
		function B() {
			I.value = !1, L.value = "";
		}
		async function V() {
			R.value = !0;
			try {
				let e = L.value.trim(), t = await O.create(e ? { label: e } : {});
				k.success(t.message || "Backup created."), B(), await F();
			} catch (e) {
				k.error(A(e, "Failed to create backup."));
			} finally {
				R.value = !1;
			}
		}
		let H = g(null), U = g(!1);
		function W() {
			H.value = null, U.value = !1;
		}
		async function Oe() {
			let e = H.value;
			if (e) {
				U.value = !0;
				try {
					let t = await O.restore(e.id);
					k.success(t.message || "Restore completed."), W();
				} catch (e) {
					k.error(A(e, "Restore failed.")), W();
				}
			}
		}
		let G = g(null), K = g(!1);
		function q() {
			G.value = null, K.value = !1;
		}
		async function ke() {
			let e = G.value;
			if (e) {
				K.value = !0;
				try {
					await O.delete(e.id), k.success("Backup deleted."), q(), await F();
				} catch (e) {
					k.error(A(e, "Failed to delete backup.")), q();
				}
			}
		}
		async function Ae(e) {
			P.value = e.id;
			try {
				let t = await O.uploadToS3(e.id);
				k.success(t.message || "Uploaded to S3."), await F();
			} catch (e) {
				k.error(A(e, "S3 upload failed."));
			} finally {
				P.value = null;
			}
		}
		let J = g(null), Y = g(!0), X = g(""), Z = g(""), Q = g(!1);
		async function je() {
			Y.value = !0;
			try {
				let e = await O.getSchedule();
				J.value = e, X.value = String(e.auto_backup_interval_days), Z.value = String(e.retention_count);
			} catch (e) {
				k.error(A(e, "Failed to load schedule."));
			} finally {
				Y.value = !1;
			}
		}
		async function $() {
			let e = parseInt(X.value, 10), t = parseInt(Z.value, 10);
			if (isNaN(e) || e < 0) {
				k.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(t) || t < 1) {
				k.error("Retention count must be at least 1.");
				return;
			}
			Q.value = !0;
			try {
				let n = await O.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: t
				});
				k.success("Schedule saved."), J.value &&= {
					...J.value,
					auto_backup_interval_days: n.auto_backup_interval_days,
					retention_count: n.retention_count
				};
			} catch (e) {
				k.error(A(e, "Failed to save schedule."));
			} finally {
				Q.value = !1;
			}
		}
		return ae(() => {
			F(), je();
		}), (e, t) => (h(), u("div", se, [
			d("section", ce, [d("header", S, [t[5] ||= d("h1", {
				id: "backups-heading",
				class: "admin-backup__title"
			}, "Backups", -1), p(r, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: z
			}, {
				default: y(() => [...t[4] ||= [f("Create backup", -1)]]),
				_: 1
			})]), N.value ? (h(), u("div", C, [p(i, {
				variant: "text",
				lines: 5
			})])) : M.value.length === 0 ? (h(), c(ee, {
				key: 1,
				icon: "film",
				title: "No backups yet",
				description: "Create one to get started."
			}, {
				actions: y(() => [p(r, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: z
				}, {
					default: y(() => [...t[6] ||= [f("Create backup", -1)]]),
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
			])], -1), d("tbody", null, [(h(!0), u(s, null, oe(M.value, (e) => (h(), u("tr", { key: e.id }, [
				d("td", null, [e.label ? (h(), u("span", ue, _(e.label), 1)) : (h(), u("span", de, "Unnamed"))]),
				d("td", fe, _(j(e.size_bytes)), 1),
				d("td", pe, [d("span", { title: e.created_at }, _(Ee(e.created_at)), 9, me)]),
				d("td", null, [p(te, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: y(() => [f(_(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				d("td", null, [d("div", he, [
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Restore ${e.label || e.id}`,
						onClick: (t) => H.value = e
					}, {
						default: y(() => [...t[7] ||= [f(" Restore ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					e.is_s3 ? l("", !0) : (h(), c(r, {
						key: 0,
						variant: "ghost",
						size: "sm",
						loading: P.value === e.id,
						"aria-label": `Upload ${e.label || e.id} to S3`,
						onClick: (t) => Ae(e)
					}, {
						default: y(() => [...t[8] ||= [f(" Upload to S3 ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])),
					p(r, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.label || e.id}`,
						onClick: (t) => G.value = e
					}, {
						default: y(() => [...t[9] ||= [f(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			d("section", ge, [t[15] ||= d("header", { class: "admin-backup__head" }, [d("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), Y.value ? (h(), u("div", _e, [p(i, {
				variant: "text",
				lines: 3
			})])) : J.value ? (h(), u("div", ve, [d("p", ye, [t[11] ||= d("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), J.value.next_scheduled_backup === null ? (h(), u("span", Se, "Not scheduled")) : (h(), u(s, { key: 0 }, [d("span", { title: J.value.next_scheduled_backup_iso ?? "" }, _(De(J.value.next_scheduled_backup)), 9, be), J.value.next_scheduled_backup_iso ? (h(), u("span", xe, " (" + _(J.value.next_scheduled_backup_iso) + ") ", 1)) : l("", !0)], 64))]), d("form", {
				class: "admin-backup__form",
				onSubmit: x($, ["prevent"])
			}, [d("div", Ce, [d("label", we, [t[12] ||= d("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), b(d("input", {
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[v, X.value]])]), d("label", Te, [t[13] ||= d("span", { class: "admin-backup__label" }, "Retention count", -1), b(d("input", {
				"onUpdate:modelValue": t[1] ||= (e) => Z.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[v, Z.value]])])]), d("div", w, [p(r, {
				variant: "solid",
				size: "sm",
				loading: Q.value,
				onClick: $
			}, {
				default: y(() => [...t[14] ||= [f(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : l("", !0)]),
			p(o, {
				modelValue: I.value,
				"onUpdate:modelValue": t[3] ||= (e) => I.value = e,
				title: "Create backup",
				onClose: B
			}, {
				footer: y(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: B
				}, {
					default: y(() => [...t[17] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: V
				}, {
					default: y(() => [...t[18] ||= [f("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [d("form", {
					class: "admin-backup__form",
					onSubmit: x(V, ["prevent"])
				}, [d("label", T, [t[16] ||= d("span", { class: "admin-backup__label" }, "Label (optional)", -1), b(d("input", {
					"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[v, L.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			p(o, {
				"model-value": H.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": W
			}, {
				footer: y(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: W
				}, {
					default: y(() => [...t[19] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: Oe
				}, {
					default: y(() => [...t[20] ||= [f(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [t[21] ||= d("p", null, [f("This will overwrite your current data. "), d("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			p(o, {
				"model-value": G.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": q
			}, {
				footer: y(() => [p(r, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: y(() => [...t[24] ||= [f("Cancel", -1)]]),
					_: 1
				}), p(r, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: ke
				}, {
					default: y(() => [...t[25] ||= [f(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: y(() => [d("p", null, [
					t[22] ||= f(" Are you sure you want to delete backup ", -1),
					d("strong", null, _(G.value?.label || G.value?.id), 1),
					t[23] ||= f("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-b09885f4"]]);
//#endregion
export { E as default };

//# sourceMappingURL=BackupPage-BJ5FGLHo.js.map