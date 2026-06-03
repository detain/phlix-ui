import { a as e, i as t, n, r, t as i, u as a } from "./tokenStore-DfQvvLGI.js";
import { t as o } from "./Modal-CoXJKJI4.js";
import { t as ee } from "./EmptyState-Oymq15Ey.js";
import { t as te } from "./Badge-Cmz5FPqw.js";
import { t as ne } from "./backup-IdY_vzc2.js";
import { Fragment as s, computed as c, createBlock as l, createCommentVNode as u, createElementBlock as d, createElementVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, inject as re, onMounted as ie, openBlock as g, ref as _, renderList as v, toDisplayString as y, vModelText as b, withCtx as x, withDirectives as S, withModifiers as C } from "vue";
//#region src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
var ae = { class: "admin-backup" }, oe = {
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
}, Ce = { class: "admin-backup__form-row" }, we = { class: "admin-backup__field" }, Te = { class: "admin-backup__field" }, w = { class: "admin-backup__form-actions" }, T = { class: "admin-backup__field" }, E = /*#__PURE__*/ a(/* @__PURE__ */ h({
	__name: "BackupPage",
	props: { client: {} },
	setup(a) {
		let h = a, E = re("apiBase", ""), D = c(() => typeof E == "string" ? E : E?.value ?? ""), O = new ne(h.client ?? new e({
			baseUrl: D.value,
			tokenStore: new i()
		})), k = t();
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
		let j = _([]), M = _(!0), N = _(null);
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
		let F = _(!1), I = _(""), L = _(!1);
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
		let V = _(null), H = _(!1);
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
		let W = _(null), G = _(!1);
		function K() {
			W.value = null, G.value = !1;
		}
		async function q() {
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
		async function Ae(e) {
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
		let J = _(null), Y = _(!0), X = _(""), Z = _(""), Q = _(!1);
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
		return ie(() => {
			P(), je();
		}), (e, t) => (g(), d("div", ae, [
			f("section", oe, [f("header", se, [t[5] ||= f("h1", {
				id: "backups-heading",
				class: "admin-backup__title"
			}, "Backups", -1), m(n, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: R
			}, {
				default: x(() => [...t[4] ||= [p("Create backup", -1)]]),
				_: 1
			})]), M.value ? (g(), d("div", ce, [m(r, {
				variant: "text",
				lines: 5
			})])) : j.value.length === 0 ? (g(), l(ee, {
				key: 1,
				icon: "film",
				title: "No backups yet",
				description: "Create one to get started."
			}, {
				actions: x(() => [m(n, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: R
				}, {
					default: x(() => [...t[6] ||= [p("Create backup", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (g(), d("table", le, [t[10] ||= f("thead", null, [f("tr", null, [
				f("th", { scope: "col" }, "Label"),
				f("th", { scope: "col" }, "Size"),
				f("th", { scope: "col" }, "Created"),
				f("th", { scope: "col" }, "Storage"),
				f("th", {
					scope: "col",
					class: "admin-backup__actions-col"
				}, "Actions")
			])], -1), f("tbody", null, [(g(!0), d(s, null, v(j.value, (e) => (g(), d("tr", { key: e.id }, [
				f("td", null, [e.label ? (g(), d("span", ue, y(e.label), 1)) : (g(), d("span", de, "Unnamed"))]),
				f("td", fe, y(Ee(e.size_bytes)), 1),
				f("td", pe, [f("span", { title: e.created_at }, y(De(e.created_at)), 9, me)]),
				f("td", null, [m(te, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: x(() => [p(y(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				f("td", null, [f("div", he, [
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Restore ${e.label || e.id}`,
						onClick: (t) => V.value = e
					}, {
						default: x(() => [...t[7] ||= [p(" Restore ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					e.is_s3 ? u("", !0) : (g(), l(n, {
						key: 0,
						variant: "ghost",
						size: "sm",
						loading: N.value === e.id,
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
					m(n, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.label || e.id}`,
						onClick: (t) => W.value = e
					}, {
						default: x(() => [...t[9] ||= [p(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			f("section", ge, [t[15] ||= f("header", { class: "admin-backup__head" }, [f("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), Y.value ? (g(), d("div", _e, [m(r, {
				variant: "text",
				lines: 3
			})])) : J.value ? (g(), d("div", ve, [f("p", ye, [t[11] ||= f("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), J.value.next_scheduled_backup === null ? (g(), d("span", Se, "Not scheduled")) : (g(), d(s, { key: 0 }, [f("span", { title: J.value.next_scheduled_backup_iso ?? "" }, y(Oe(J.value.next_scheduled_backup)), 9, be), J.value.next_scheduled_backup_iso ? (g(), d("span", xe, " (" + y(J.value.next_scheduled_backup_iso) + ") ", 1)) : u("", !0)], 64))]), f("form", {
				class: "admin-backup__form",
				onSubmit: C($, ["prevent"])
			}, [f("div", Ce, [f("label", we, [t[12] ||= f("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), S(f("input", {
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[b, X.value]])]), f("label", Te, [t[13] ||= f("span", { class: "admin-backup__label" }, "Retention count", -1), S(f("input", {
				"onUpdate:modelValue": t[1] ||= (e) => Z.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[b, Z.value]])])]), f("div", w, [m(n, {
				variant: "solid",
				size: "sm",
				loading: Q.value,
				onClick: $
			}, {
				default: x(() => [...t[14] ||= [p(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : u("", !0)]),
			m(o, {
				modelValue: F.value,
				"onUpdate:modelValue": t[3] ||= (e) => F.value = e,
				title: "Create backup",
				onClose: z
			}, {
				footer: x(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: z
				}, {
					default: x(() => [...t[17] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					loading: L.value,
					onClick: B
				}, {
					default: x(() => [...t[18] ||= [p("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("form", {
					class: "admin-backup__form",
					onSubmit: C(B, ["prevent"])
				}, [f("label", T, [t[16] ||= f("span", { class: "admin-backup__label" }, "Label (optional)", -1), S(f("input", {
					"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[b, I.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			m(o, {
				"model-value": V.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": U
			}, {
				footer: x(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: U
				}, {
					default: x(() => [...t[19] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					loading: H.value,
					onClick: ke
				}, {
					default: x(() => [...t[20] ||= [p(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [t[21] ||= f("p", null, [p("This will overwrite your current data. "), f("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			m(o, {
				"model-value": W.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": K
			}, {
				footer: x(() => [m(n, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: x(() => [...t[24] ||= [p("Cancel", -1)]]),
					_: 1
				}), m(n, {
					variant: "solid",
					size: "sm",
					loading: G.value,
					onClick: q
				}, {
					default: x(() => [...t[25] ||= [p(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: x(() => [f("p", null, [
					t[22] ||= p(" Are you sure you want to delete backup ", -1),
					f("strong", null, y(W.value?.label || W.value?.id), 1),
					t[23] ||= p("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-b09885f4"]]);
//#endregion
export { E as default };

//# sourceMappingURL=BackupPage-Dm-GxF24.js.map