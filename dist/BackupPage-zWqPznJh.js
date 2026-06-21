import { n as e } from "./Icon-ax5k7_G2.js";
import { d as t, n, s as r, t as i } from "./Button-5ZSsUmsI.js";
import { t as a } from "./Badge-ArWL5-WE.js";
import { t as o } from "./Modal-I4tEFhoH.js";
import { t as ee } from "./useToastStore-BDoKlU6N.js";
import { t as s } from "./Skeleton-DkSoWF3C.js";
import { t as c } from "./EmptyState-B2QnGIQT.js";
import { t as te } from "./backup-IdY_vzc2.js";
import { Fragment as l, computed as ne, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createTextVNode as m, createVNode as h, defineComponent as g, inject as re, onMounted as _, openBlock as v, ref as y, renderList as ie, toDisplayString as b, vModelText as x, withCtx as S, withDirectives as C, withModifiers as w } from "vue";
//#region src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
var ae = { class: "admin-backup" }, oe = {
	class: "admin-backup__section",
	"aria-labelledby": "backups-heading"
}, se = { class: "admin-backup__head" }, ce = {
	key: 0,
	class: "admin-backup__skel"
}, le = {
	key: 3,
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
	key: 2,
	class: "admin-backup__card"
}, ye = { class: "admin-backup__next" }, be = ["title"], xe = {
	key: 0,
	class: "admin-backup__muted"
}, Se = {
	key: 1,
	class: "admin-backup__muted"
}, Ce = { class: "admin-backup__form-row" }, we = { class: "admin-backup__field" }, Te = { class: "admin-backup__field" }, Ee = { class: "admin-backup__form-actions" }, De = { class: "admin-backup__field" }, T = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "BackupPage",
	props: { client: {} },
	setup(e) {
		let g = e, T = re("apiBase", ""), E = ne(() => typeof T == "string" ? T : T?.value ?? ""), D = new te(g.client ?? new n({
			baseUrl: E.value,
			tokenStore: new r()
		})), O = ee();
		function Oe(e) {
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
		function ke(e) {
			let t = new Date(e), n = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(n / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${i}m ago`;
			let a = Math.floor(i / 60);
			return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
		}
		function Ae(e) {
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
				j.value = t(e, "Failed to load backups."), O.error(j.value);
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
				O.error(t(e, "Failed to create backup."));
			} finally {
				I.value = !1;
			}
		}
		let B = y(null), V = y(!1);
		function H() {
			B.value = null, V.value = !1;
		}
		async function je() {
			let e = B.value;
			if (e) {
				V.value = !0;
				try {
					let t = await D.restore(e.id);
					O.success(t.message || "Restore completed."), H();
				} catch (e) {
					O.error(t(e, "Restore failed.")), H();
				}
			}
		}
		let U = y(null), W = y(!1);
		function G() {
			U.value = null, W.value = !1;
		}
		async function Me() {
			let e = U.value;
			if (e) {
				W.value = !0;
				try {
					await D.delete(e.id), O.success("Backup deleted."), G(), await N();
				} catch (e) {
					O.error(t(e, "Failed to delete backup.")), G();
				}
			}
		}
		async function Ne(e) {
			M.value = e.id;
			try {
				let t = await D.uploadToS3(e.id);
				O.success(t.message || "Uploaded to S3."), await N();
			} catch (e) {
				O.error(t(e, "S3 upload failed."));
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
				J.value = t(e, "Failed to load schedule."), O.error(J.value);
			} finally {
				q.value = !1;
			}
		}
		async function $() {
			let e = parseInt(Y.value, 10), n = parseInt(X.value, 10);
			if (isNaN(e) || e < 0) {
				O.error("Backup interval must be a non-negative number.");
				return;
			}
			if (isNaN(n) || n < 1) {
				O.error("Retention count must be at least 1.");
				return;
			}
			Z.value = !0;
			try {
				let t = await D.updateSchedule({
					auto_backup_interval_days: e,
					retention_count: n
				});
				O.success("Schedule saved."), K.value &&= {
					...K.value,
					auto_backup_interval_days: t.auto_backup_interval_days,
					retention_count: t.retention_count
				};
			} catch (e) {
				O.error(t(e, "Failed to save schedule."));
			} finally {
				Z.value = !1;
			}
		}
		return _(() => {
			N(), Q();
		}), (e, t) => (v(), f("div", ae, [
			p("section", oe, [p("header", se, [t[5] ||= p("h1", {
				id: "backups-heading",
				class: "admin-backup__title"
			}, "Backups", -1), h(i, {
				variant: "solid",
				size: "sm",
				"left-icon": "plus",
				onClick: L
			}, {
				default: S(() => [...t[4] ||= [m("Create backup", -1)]]),
				_: 1
			})]), A.value ? (v(), f("div", ce, [h(s, {
				variant: "text",
				lines: 5
			})])) : j.value ? (v(), u(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load backups",
				description: j.value
			}, {
				actions: S(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: N
				}, {
					default: S(() => [...t[6] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : k.value.length === 0 ? (v(), u(c, {
				key: 2,
				icon: "film",
				title: "No backups yet",
				description: "Create one to get started."
			}, {
				actions: S(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: L
				}, {
					default: S(() => [...t[7] ||= [m("Create backup", -1)]]),
					_: 1
				})]),
				_: 1
			})) : (v(), f("table", le, [t[11] ||= p("thead", null, [p("tr", null, [
				p("th", { scope: "col" }, "Label"),
				p("th", { scope: "col" }, "Size"),
				p("th", { scope: "col" }, "Created"),
				p("th", { scope: "col" }, "Storage"),
				p("th", {
					scope: "col",
					class: "admin-backup__actions-col"
				}, "Actions")
			])], -1), p("tbody", null, [(v(!0), f(l, null, ie(k.value, (e) => (v(), f("tr", { key: e.id }, [
				p("td", null, [e.label ? (v(), f("span", ue, b(e.label), 1)) : (v(), f("span", de, "Unnamed"))]),
				p("td", fe, b(Oe(e.size_bytes)), 1),
				p("td", pe, [p("span", { title: e.created_at }, b(ke(e.created_at)), 9, me)]),
				p("td", null, [h(a, { tone: e.is_s3 ? "success" : "neutral" }, {
					default: S(() => [m(b(e.is_s3 ? "S3" : "Local"), 1)]),
					_: 2
				}, 1032, ["tone"])]),
				p("td", null, [p("div", he, [
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Restore ${e.label || e.id}`,
						onClick: (t) => B.value = e
					}, {
						default: S(() => [...t[8] ||= [m(" Restore ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"]),
					e.is_s3 ? d("", !0) : (v(), u(i, {
						key: 0,
						variant: "ghost",
						size: "sm",
						loading: M.value === e.id,
						"aria-label": `Upload ${e.label || e.id} to S3`,
						onClick: (t) => Ne(e)
					}, {
						default: S(() => [...t[9] ||= [m(" Upload to S3 ", -1)]]),
						_: 1
					}, 8, [
						"loading",
						"aria-label",
						"onClick"
					])),
					h(i, {
						variant: "ghost",
						size: "sm",
						"aria-label": `Delete ${e.label || e.id}`,
						onClick: (t) => U.value = e
					}, {
						default: S(() => [...t[10] ||= [m(" Delete ", -1)]]),
						_: 1
					}, 8, ["aria-label", "onClick"])
				])])
			]))), 128))])]))]),
			p("section", ge, [t[17] ||= p("header", { class: "admin-backup__head" }, [p("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), q.value ? (v(), f("div", _e, [h(s, {
				variant: "text",
				lines: 3
			})])) : J.value ? (v(), u(c, {
				key: 1,
				icon: "alert",
				title: "Couldn't load schedule",
				description: J.value
			}, {
				actions: S(() => [h(i, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Q
				}, {
					default: S(() => [...t[12] ||= [m("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : K.value ? (v(), f("div", ve, [p("p", ye, [t[13] ||= p("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), K.value.next_scheduled_backup === null ? (v(), f("span", Se, "Not scheduled")) : (v(), f(l, { key: 0 }, [p("span", { title: K.value.next_scheduled_backup_iso ?? "" }, b(Ae(K.value.next_scheduled_backup)), 9, be), K.value.next_scheduled_backup_iso ? (v(), f("span", xe, " (" + b(K.value.next_scheduled_backup_iso) + ") ", 1)) : d("", !0)], 64))]), p("form", {
				class: "admin-backup__form",
				onSubmit: w($, ["prevent"])
			}, [p("div", Ce, [p("label", we, [t[14] ||= p("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), C(p("input", {
				"onUpdate:modelValue": t[0] ||= (e) => Y.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[x, Y.value]])]), p("label", Te, [t[15] ||= p("span", { class: "admin-backup__label" }, "Retention count", -1), C(p("input", {
				"onUpdate:modelValue": t[1] ||= (e) => X.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[x, X.value]])])]), p("div", Ee, [h(i, {
				variant: "solid",
				size: "sm",
				loading: Z.value,
				onClick: $
			}, {
				default: S(() => [...t[16] ||= [m(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : d("", !0)]),
			h(o, {
				modelValue: P.value,
				"onUpdate:modelValue": t[3] ||= (e) => P.value = e,
				title: "Create backup",
				onClose: R
			}, {
				footer: S(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: R
				}, {
					default: S(() => [...t[19] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: I.value,
					onClick: z
				}, {
					default: S(() => [...t[20] ||= [m("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [p("form", {
					class: "admin-backup__form",
					onSubmit: w(z, ["prevent"])
				}, [p("label", De, [t[18] ||= p("span", { class: "admin-backup__label" }, "Label (optional)", -1), C(p("input", {
					"onUpdate:modelValue": t[2] ||= (e) => F.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[x, F.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			h(o, {
				"model-value": B.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": H
			}, {
				footer: S(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: S(() => [...t[21] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: V.value,
					onClick: je
				}, {
					default: S(() => [...t[22] ||= [m(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [t[23] ||= p("p", null, [m("This will overwrite your current data. "), p("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			h(o, {
				"model-value": U.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": G
			}, {
				footer: S(() => [h(i, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: S(() => [...t[26] ||= [m("Cancel", -1)]]),
					_: 1
				}), h(i, {
					variant: "solid",
					size: "sm",
					loading: W.value,
					onClick: Me
				}, {
					default: S(() => [...t[27] ||= [m(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: S(() => [p("p", null, [
					t[24] ||= m(" Are you sure you want to delete backup ", -1),
					p("strong", null, b(U.value?.label || U.value?.id), 1),
					t[25] ||= m("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-8d1d0a90"]]);
//#endregion
export { T as default };

//# sourceMappingURL=BackupPage-zWqPznJh.js.map