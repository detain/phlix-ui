import { t as e, x as t } from "./client-57OweUrJ.js";
import { t as n } from "./backup-gSnQTFiQ.js";
import { t as r } from "./useToastStore-Bu-iYU7r.js";
import { t as i } from "./Badge-C6LNO9Kk.js";
import { t as a } from "./PageHint-BlhPmafC.js";
import { t as ee } from "./helpLinks-iarZuNmw.js";
import { t as o } from "./Button-1sKEdGjj.js";
import { t as s } from "./Modal-BU4hJGBA.js";
import { t as c } from "./Skeleton-B2Mt2L00.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { n as u } from "./Icon-CIbfiPrs.js";
import { Fragment as d, computed as te, createBlock as f, createCommentVNode as p, createElementBlock as m, createElementVNode as h, createTextVNode as g, createVNode as _, defineComponent as v, inject as ne, onMounted as re, openBlock as y, ref as b, renderList as ie, toDisplayString as x, unref as S, vModelText as C, withCtx as w, withDirectives as T, withModifiers as E } from "vue";
// src/pages/admin/BackupPage.vue?vue&type=script&setup=true&lang.ts
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
}, Ce = { class: "admin-backup__form-row" }, we = { class: "admin-backup__field" }, Te = { class: "admin-backup__field" }, Ee = { class: "admin-backup__form-actions" }, De = { class: "admin-backup__field" }, D = /*#__PURE__*/ u(/* @__PURE__ */ v({
	__name: "BackupPage",
	props: { client: {} },
	setup(u) {
		let v = u, D = ne("apiBase", ""), Oe = te(() => typeof D == "string" ? D : D?.value ?? ""), O = new n(v.client ?? new e({ baseUrl: Oe.value })), k = r();
		function ke(e) {
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
		function Ae(e) {
			let t = new Date(e), n = (/* @__PURE__ */ new Date()).getTime() - t.getTime(), r = Math.floor(n / 1e3);
			if (r < 60) return "just now";
			let i = Math.floor(r / 60);
			if (i < 60) return `${i}m ago`;
			let a = Math.floor(i / 60);
			return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
		}
		function je(e) {
			if (e === null) return "Not scheduled";
			let t = e - Math.floor(Date.now() / 1e3);
			if (t < 0) return "Overdue";
			let n = Math.floor(t / 86400);
			return n === 0 ? "Today" : n === 1 ? "Tomorrow" : `in ${n} days`;
		}
		let A = b([]), j = b(!0), M = b(null), N = b(null);
		async function P() {
			j.value = !0, M.value = null;
			try {
				A.value = await O.list();
			} catch (e) {
				M.value = t(e, "Failed to load backups."), k.error(M.value);
			} finally {
				j.value = !1;
			}
		}
		let F = b(!1), I = b(""), L = b(!1);
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
				k.error(t(e, "Failed to create backup."));
			} finally {
				L.value = !1;
			}
		}
		let V = b(null), H = b(!1);
		function U() {
			V.value = null, H.value = !1;
		}
		async function Me() {
			let e = V.value;
			if (e) {
				H.value = !0;
				try {
					let t = await O.restore(e.id);
					k.success(t.message || "Restore completed."), U();
				} catch (e) {
					k.error(t(e, "Restore failed.")), U();
				}
			}
		}
		let W = b(null), G = b(!1);
		function K() {
			W.value = null, G.value = !1;
		}
		async function Ne() {
			let e = W.value;
			if (e) {
				G.value = !0;
				try {
					await O.delete(e.id), k.success("Backup deleted."), K(), await P();
				} catch (e) {
					k.error(t(e, "Failed to delete backup.")), K();
				}
			}
		}
		async function Pe(e) {
			N.value = e.id;
			try {
				let t = await O.uploadToS3(e.id);
				k.success(t.message || "Uploaded to S3."), await P();
			} catch (e) {
				k.error(t(e, "S3 upload failed."));
			} finally {
				N.value = null;
			}
		}
		let q = b(null), J = b(!0), Y = b(null), X = b(""), Z = b(""), Q = b(!1);
		async function Fe() {
			J.value = !0, Y.value = null;
			try {
				let e = await O.getSchedule();
				q.value = e, X.value = String(e.auto_backup_interval_days), Z.value = String(e.retention_count);
			} catch (e) {
				Y.value = t(e, "Failed to load schedule."), k.error(Y.value);
			} finally {
				J.value = !1;
			}
		}
		async function $() {
			let e = parseInt(X.value, 10), n = parseInt(Z.value, 10);
			if (isNaN(e) || e < 0) k.error("Backup interval must be a non-negative number.");
			else if (isNaN(n) || n < 1) k.error("Retention count must be at least 1.");
			else {
				Q.value = !0;
				try {
					let t = await O.updateSchedule({
						auto_backup_interval_days: e,
						retention_count: n
					});
					k.success("Schedule saved."), q.value &&= {
						...q.value,
						auto_backup_interval_days: t.auto_backup_interval_days,
						retention_count: t.retention_count
					};
				} catch (e) {
					k.error(t(e, "Failed to save schedule."));
				} finally {
					Q.value = !1;
				}
			}
		}
		return re(() => {
			P(), Fe();
		}), (e, t) => (y(), m("div", ae, [
			h("section", oe, [
				h("header", se, [t[5] ||= h("h1", {
					id: "backups-heading",
					class: "admin-backup__title"
				}, "Backups", -1), _(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: R
				}, {
					default: w(() => [...t[4] ||= [g("Create backup", -1)]]),
					_: 1
				})]),
				_(a, {
					links: S(ee).backup.links,
					details: S(ee).backup.details
				}, {
					default: w(() => [...t[6] ||= [
						g(" Save and restore snapshots of your server's database and settings. ", -1),
						h("strong", null, "Create backup", -1),
						g(" makes a new snapshot (with an optional label); ", -1),
						h("strong", null, "Restore", -1),
						g(" rolls the server back to a chosen one, and ", -1),
						h("strong", null, "Delete", -1),
						g(" removes it. ", -1),
						h("strong", null, "Upload to S3", -1),
						g(" copies a local backup to cloud storage. Under ", -1),
						h("strong", null, "Scheduled backups", -1),
						g(", set the ", -1),
						h("strong", null, "interval", -1),
						g(" (days between automatic backups) and ", -1),
						h("strong", null, "retention count", -1),
						g(" (how many to keep), then ", -1),
						h("strong", null, "Save schedule", -1),
						g(". ", -1)
					]]),
					_: 1
				}, 8, ["links", "details"]),
				j.value ? (y(), m("div", ce, [_(c, {
					variant: "text",
					lines: 5
				})])) : M.value ? (y(), f(l, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load backups",
					description: M.value
				}, {
					actions: w(() => [_(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: P
					}, {
						default: w(() => [...t[7] ||= [g("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : A.value.length === 0 ? (y(), f(l, {
					key: 2,
					icon: "film",
					title: "No backups yet",
					description: "Create one to get started."
				}, {
					actions: w(() => [_(o, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						onClick: R
					}, {
						default: w(() => [...t[8] ||= [g("Create backup", -1)]]),
						_: 1
					})]),
					_: 1
				})) : (y(), m("table", le, [t[12] ||= h("thead", null, [h("tr", null, [
					h("th", { scope: "col" }, "Label"),
					h("th", { scope: "col" }, "Size"),
					h("th", { scope: "col" }, "Created"),
					h("th", { scope: "col" }, "Storage"),
					h("th", {
						scope: "col",
						class: "admin-backup__actions-col"
					}, "Actions")
				])], -1), h("tbody", null, [(y(!0), m(d, null, ie(A.value, (e) => (y(), m("tr", { key: e.id }, [
					h("td", null, [e.label ? (y(), m("span", ue, x(e.label), 1)) : (y(), m("span", de, "Unnamed"))]),
					h("td", fe, x(ke(e.size_bytes)), 1),
					h("td", pe, [h("span", { title: e.created_at }, x(Ae(e.created_at)), 9, me)]),
					h("td", null, [_(i, { tone: e.is_s3 ? "success" : "neutral" }, {
						default: w(() => [g(x(e.is_s3 ? "S3" : "Local"), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					h("td", null, [h("div", he, [
						_(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Restore ${e.label || e.id}`,
							onClick: (t) => V.value = e
						}, {
							default: w(() => [...t[9] ||= [g(" Restore ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						e.is_s3 ? p("", !0) : (y(), f(o, {
							key: 0,
							variant: "ghost",
							size: "sm",
							loading: N.value === e.id,
							"aria-label": `Upload ${e.label || e.id} to S3`,
							onClick: (t) => Pe(e)
						}, {
							default: w(() => [...t[10] ||= [g(" Upload to S3 ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])),
						_(o, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Delete ${e.label || e.id}`,
							onClick: (t) => W.value = e
						}, {
							default: w(() => [...t[11] ||= [g(" Delete ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])]))
			]),
			h("section", ge, [t[18] ||= h("header", { class: "admin-backup__head" }, [h("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), J.value ? (y(), m("div", _e, [_(c, {
				variant: "text",
				lines: 3
			})])) : Y.value ? (y(), f(l, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load schedule",
				description: Y.value
			}, {
				actions: w(() => [_(o, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Fe
				}, {
					default: w(() => [...t[13] ||= [g("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : q.value ? (y(), m("div", ve, [h("p", ye, [t[14] ||= h("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), q.value.next_scheduled_backup === null ? (y(), m("span", Se, "Not scheduled")) : (y(), m(d, { key: 0 }, [h("span", { title: q.value.next_scheduled_backup_iso ?? "" }, x(je(q.value.next_scheduled_backup)), 9, be), q.value.next_scheduled_backup_iso ? (y(), m("span", xe, " (" + x(q.value.next_scheduled_backup_iso) + ") ", 1)) : p("", !0)], 64))]), h("form", {
				class: "admin-backup__form",
				onSubmit: E($, ["prevent"])
			}, [h("div", Ce, [h("label", we, [t[15] ||= h("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), T(h("input", {
				"onUpdate:modelValue": t[0] ||= (e) => X.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[C, X.value]])]), h("label", Te, [t[16] ||= h("span", { class: "admin-backup__label" }, "Retention count", -1), T(h("input", {
				"onUpdate:modelValue": t[1] ||= (e) => Z.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[C, Z.value]])])]), h("div", Ee, [_(o, {
				variant: "solid",
				size: "sm",
				loading: Q.value,
				onClick: $
			}, {
				default: w(() => [...t[17] ||= [g(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : p("", !0)]),
			_(s, {
				modelValue: F.value,
				"onUpdate:modelValue": t[3] ||= (e) => F.value = e,
				title: "Create backup",
				onClose: z
			}, {
				footer: w(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: z
				}, {
					default: w(() => [...t[20] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "solid",
					size: "sm",
					loading: L.value,
					onClick: B
				}, {
					default: w(() => [...t[21] ||= [g("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [h("form", {
					class: "admin-backup__form",
					onSubmit: E(B, ["prevent"])
				}, [h("label", De, [t[19] ||= h("span", { class: "admin-backup__label" }, "Label (optional)", -1), T(h("input", {
					"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[C, I.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			_(s, {
				"model-value": V.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": U
			}, {
				footer: w(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: U
				}, {
					default: w(() => [...t[22] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "danger",
					size: "sm",
					loading: H.value,
					onClick: Me
				}, {
					default: w(() => [...t[23] ||= [g(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [t[24] ||= h("p", null, [g("This will overwrite your current data. "), h("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			_(s, {
				"model-value": W.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": K
			}, {
				footer: w(() => [_(o, {
					variant: "ghost",
					size: "sm",
					onClick: K
				}, {
					default: w(() => [...t[27] ||= [g("Cancel", -1)]]),
					_: 1
				}), _(o, {
					variant: "danger",
					size: "sm",
					loading: G.value,
					onClick: Ne
				}, {
					default: w(() => [...t[28] ||= [g(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: w(() => [h("p", null, [
					t[25] ||= g(" Are you sure you want to delete backup ", -1),
					h("strong", null, x(W.value?.label || W.value?.id), 1),
					t[26] ||= g("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-6be98872"]]);
export { D as default };

//# sourceMappingURL=BackupPage-B8qI8dBU.js.map