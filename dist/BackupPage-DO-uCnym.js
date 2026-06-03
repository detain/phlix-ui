import { a as e, f as t, h as n, i as r, n as i, o as a, r as o, t as s } from "./Button-C86XulWV.js";
import { t as c } from "./Modal-DaapuyD8.js";
import { t as ee } from "./Badge-BiYXL5Nz.js";
import { t as te } from "./backup-IdY_vzc2.js";
import { Fragment as l, computed as ne, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as re, onMounted as ie, openBlock as _, ref as v, renderList as y, toDisplayString as b, vModelText as x, withCtx as S, withDirectives as C, withModifiers as w } from "vue";
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
}, Ce = { class: "admin-backup__form-row" }, we = { class: "admin-backup__field" }, T = { class: "admin-backup__field" }, E = { class: "admin-backup__form-actions" }, D = { class: "admin-backup__field" }, O = /*#__PURE__*/ n(/* @__PURE__ */ g({
	__name: "BackupPage",
	props: { client: {} },
	setup(n) {
		let g = n, O = re("apiBase", ""), k = ne(() => typeof O == "string" ? O : O?.value ?? ""), A = new te(g.client ?? new a({
			baseUrl: k.value,
			tokenStore: new e()
		})), j = r();
		function Te(e) {
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
		let M = v([]), N = v(!0), P = v(null);
		async function F() {
			N.value = !0;
			try {
				M.value = await A.list();
			} catch (e) {
				j.error(t(e, "Failed to load backups."));
			} finally {
				N.value = !1;
			}
		}
		let I = v(!1), L = v(""), R = v(!1);
		function z() {
			L.value = "", I.value = !0;
		}
		function B() {
			I.value = !1, L.value = "";
		}
		async function V() {
			R.value = !0;
			try {
				let e = L.value.trim(), t = await A.create(e ? { label: e } : {});
				j.success(t.message || "Backup created."), B(), await F();
			} catch (e) {
				j.error(t(e, "Failed to create backup."));
			} finally {
				R.value = !1;
			}
		}
		let H = v(null), U = v(!1);
		function W() {
			H.value = null, U.value = !1;
		}
		async function Oe() {
			let e = H.value;
			if (e) {
				U.value = !0;
				try {
					let t = await A.restore(e.id);
					j.success(t.message || "Restore completed."), W();
				} catch (e) {
					j.error(t(e, "Restore failed.")), W();
				}
			}
		}
		let G = v(null), K = v(!1);
		function q() {
			G.value = null, K.value = !1;
		}
		async function ke() {
			let e = G.value;
			if (e) {
				K.value = !0;
				try {
					await A.delete(e.id), j.success("Backup deleted."), q(), await F();
				} catch (e) {
					j.error(t(e, "Failed to delete backup.")), q();
				}
			}
		}
		async function Ae(e) {
			P.value = e.id;
			try {
				let t = await A.uploadToS3(e.id);
				j.success(t.message || "Uploaded to S3."), await F();
			} catch (e) {
				j.error(t(e, "S3 upload failed."));
			} finally {
				P.value = null;
			}
		}
		let J = v(null), Y = v(!0), X = v(""), Z = v(""), Q = v(!1);
		async function je() {
			Y.value = !0;
			try {
				let e = await A.getSchedule();
				J.value = e, X.value = String(e.auto_backup_interval_days), Z.value = String(e.retention_count);
			} catch (e) {
				j.error(t(e, "Failed to load schedule."));
			} finally {
				Y.value = !1;
			}
		}
		async function $() {
			let e = parseInt(X.value, 10), n = parseInt(Z.value, 10);
			if (isNaN(e) || e < 0) {
				j.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(n) || n < 1) {
				j.error("Retention count must be at least 1.");
				return;
			}
			Q.value = !0;
			try {
				let t = await A.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: n
				});
				j.success("Schedule saved."), J.value &&= {
					...J.value,
					auto_backup_interval_days: t.auto_backup_interval_days,
					retention_count: t.retention_count
				};
			} catch (e) {
				j.error(t(e, "Failed to save schedule."));
			} finally {
				Q.value = !1;
			}
		}
		return ie(() => {
			F(), je();
		}), (e, t) => (_(), f("div", ae, [
			p("section", oe, [p("header", se, [t[5] ||= p("h1", {
				id: "backups-heading",
				class: "admin-backup__title"
			}, "Backups", -1), h(s, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: z
			}, {
				default: S(() => [...t[4] ||= [m("Create backup", -1)]]),
				_: 1
			})]), N.value ? (_(), f("div", ce, [h(i, {
				variant: "text",
				lines: 5
			})])) : M.value.length === 0 ? (_(), u(o, {
				key: 1,
				icon: "film",
				title: "No backups yet",
				description: "Create one to get started."
			}, {
				actions: S(() => [h(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: z
				}, {
					default: S(() => [...t[6] ||= [m("Create backup", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (_(), f("table", le, [t[10] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Label"),
				p("th", { scope: "col" }, "Size"),
				p("th", { scope: "col" }, "Created"),
				p("th", { scope: "col" }, "Storage"),
				p("th", {
					scope: "col",
					class: "admin-backup__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(_(!0), f(l, null, y(M.value, (e) => (_(), f("tr", { key: e.id }, [
				p("td", null, [e.label ? (_(), f("span", ue, b(e.label), 1)) : (_(), f("span", de, "Unnamed"))]),
				p("td", fe, b(Te(e.size_bytes)), 1),
				p("td", pe, [p("span", { title: e.created_at }, b(Ee(e.created_at)), 9, me)]),
				p("td", null, [h(ee, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: S(() => [m(b(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", null, [p("div", he, [
					h(s, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Restore ${e.label || e.id}`,
						onClick: (t) => H.value = e
					}, {
						default: S(() => [...t[7] ||= [m(" Restore ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					e.is_s3 ? d("", !0) : (_(), u(s, {
						key: 0,
						variant: "ghost",
						size: "sm",
						loading: P.value === e.id,
						"aria-label": `Upload ${e.label || e.id} to S3`,
						onClick: (t) => Ae(e)
					}, {
						default: S(() => [...t[8] ||= [m(" Upload to S3 ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])),
					h(s, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.label || e.id}`,
						onClick: (t) => G.value = e
					}, {
						default: S(() => [...t[9] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			p("section", ge, [t[15] ||= p("header", { class: "admin-backup__head" }, [p("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), Y.value ? (_(), f("div", _e, [h(i, {
				variant: "text",
				lines: 3
			})])) : J.value ? (_(), f("div", ve, [p("p", ye, [t[11] ||= p("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), J.value.next_scheduled_backup === null ? (_(), f("span", Se, "Not scheduled")) : (_(), f(l, { key: 0 }, [p("span", { title: J.value.next_scheduled_backup_iso ?? "" }, b(De(J.value.next_scheduled_backup)), 9, be), J.value.next_scheduled_backup_iso ? (_(), f("span", xe, " (" + b(J.value.next_scheduled_backup_iso) + ") ", 1)) : d("", !0)], 64))]), p("form", {
				class: "admin-backup__form",
				onSubmit: w($, ["prevent"])
			}, [p("div", Ce, [p("label", we, [t[12] ||= p("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), C(p("input", {
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[x, X.value]])]), p("label", T, [t[13] ||= p("span", { class: "admin-backup__label" }, "Retention count", -1), C(p("input", {
				"onUpdate:modelValue": t[1] ||= (e) => Z.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[x, Z.value]])])]), p("div", E, [h(s, {
				variant: "solid",
				size: "sm",
				loading: Q.value,
				onClick: $
			}, {
				default: S(() => [...t[14] ||= [m(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : d("", !0)]),
			h(c, {
				modelValue: I.value,
				"onUpdate:modelValue": t[3] ||= (e) => I.value = e,
				title: "Create backup",
				onClose: B
			}, {
				footer: S(() => [h(s, {
					variant: "ghost",
					size: "sm",
					onClick: B
				}, {
					default: S(() => [...t[17] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(s, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: V
				}, {
					default: S(() => [...t[18] ||= [m("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [p("form", {
					class: "admin-backup__form",
					onSubmit: w(V, ["prevent"])
				}, [p("label", D, [t[16] ||= p("span", { class: "admin-backup__label" }, "Label (optional)", -1), C(p("input", {
					"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[x, L.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(c, {
				"model-value": H.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": W
			}, {
				footer: S(() => [h(s, {
					variant: "ghost",
					size: "sm",
					onClick: W
				}, {
					default: S(() => [...t[19] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(s, {
					variant: "solid",
					size: "sm",
					loading: U.value,
					onClick: Oe
				}, {
					default: S(() => [...t[20] ||= [m(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [t[21] ||= p("p", null, [m("This will overwrite your current data. "), p("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			h(c, {
				"model-value": G.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": q
			}, {
				footer: S(() => [h(s, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: S(() => [...t[24] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(s, {
					variant: "solid",
					size: "sm",
					loading: K.value,
					onClick: ke
				}, {
					default: S(() => [...t[25] ||= [m(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [p("p", null, [
					t[22] ||= m(" Are you sure you want to delete backup ", -1),
					p("strong", null, b(G.value?.label || G.value?.id), 1),
					t[23] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-ccf04aa7"]]);
//#endregion
export { O as default };

//# sourceMappingURL=BackupPage-DO-uCnym.js.map