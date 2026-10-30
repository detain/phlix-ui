import { l as e, t, y as n } from "./client-pLl-rDdN.js";
import { t as r } from "./backup-Yn8iu4T0.js";
import { t as i } from "./useToastStore-Bu-iYU7r.js";
import { t as a } from "./Badge-C6LNO9Kk.js";
import { t as ee } from "./PageHint-BlhPmafC.js";
import { t as o } from "./helpLinks-iarZuNmw.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as c } from "./Modal-DZssaRh7.js";
import { t as l } from "./Skeleton-B2Mt2L00.js";
import { t as u } from "./EmptyState-BjOJ1k_A.js";
import { n as d } from "./Icon-CIbfiPrs.js";
import { Fragment as f, computed as te, createBlock as p, createCommentVNode as m, createElementBlock as h, createElementVNode as g, createTextVNode as _, createVNode as v, defineComponent as y, inject as ne, onMounted as re, openBlock as b, ref as x, renderList as ie, toDisplayString as S, unref as C, vModelText as w, withCtx as T, withDirectives as E, withModifiers as D } from "vue";
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
}, Ce = { class: "admin-backup__form-row" }, we = { class: "admin-backup__field" }, Te = { class: "admin-backup__field" }, Ee = { class: "admin-backup__form-actions" }, De = { class: "admin-backup__field" }, O = /*#__PURE__*/ d(/* @__PURE__ */ y({
	__name: "BackupPage",
	props: { client: {} },
	setup(d) {
		let y = d, O = ne("apiBase", ""), Oe = te(() => typeof O == "string" ? O : O?.value ?? ""), k = new r(y.client ?? new t({
			baseUrl: Oe.value,
			tokenStore: new e()
		})), A = i();
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
		let j = x([]), M = x(!0), N = x(null), P = x(null);
		async function F() {
			M.value = !0, N.value = null;
			try {
				j.value = await k.list();
			} catch (e) {
				N.value = n(e, "Failed to load backups."), A.error(N.value);
			} finally {
				M.value = !1;
			}
		}
		let I = x(!1), L = x(""), R = x(!1);
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
				A.error(n(e, "Failed to create backup."));
			} finally {
				R.value = !1;
			}
		}
		let H = x(null), U = x(!1);
		function W() {
			H.value = null, U.value = !1;
		}
		async function Me() {
			let e = H.value;
			if (e) {
				U.value = !0;
				try {
					let t = await k.restore(e.id);
					A.success(t.message || "Restore completed."), W();
				} catch (e) {
					A.error(n(e, "Restore failed.")), W();
				}
			}
		}
		let G = x(null), K = x(!1);
		function q() {
			G.value = null, K.value = !1;
		}
		async function Ne() {
			let e = G.value;
			if (e) {
				K.value = !0;
				try {
					await k.delete(e.id), A.success("Backup deleted."), q(), await F();
				} catch (e) {
					A.error(n(e, "Failed to delete backup.")), q();
				}
			}
		}
		async function Pe(e) {
			P.value = e.id;
			try {
				let t = await k.uploadToS3(e.id);
				A.success(t.message || "Uploaded to S3."), await F();
			} catch (e) {
				A.error(n(e, "S3 upload failed."));
			} finally {
				P.value = null;
			}
		}
		let J = x(null), Y = x(!0), X = x(null), Z = x(""), Q = x(""), $ = x(!1);
		async function Fe() {
			Y.value = !0, X.value = null;
			try {
				let e = await k.getSchedule();
				J.value = e, Z.value = String(e.auto_backup_interval_days), Q.value = String(e.retention_count);
			} catch (e) {
				X.value = n(e, "Failed to load schedule."), A.error(X.value);
			} finally {
				Y.value = !1;
			}
		}
		async function Ie() {
			let e = parseInt(Z.value, 10), t = parseInt(Q.value, 10);
			if (isNaN(e) || e < 0) A.error("Backup interval must be a non-negative number.");
			else if (isNaN(t) || t < 1) A.error("Retention count must be at least 1.");
			else {
				$.value = !0;
				try {
					let n = await k.updateSchedule({
						auto_backup_interval_days: e,
						retention_count: t
					});
					A.success("Schedule saved."), J.value &&= {
						...J.value,
						auto_backup_interval_days: n.auto_backup_interval_days,
						retention_count: n.retention_count
					};
				} catch (e) {
					A.error(n(e, "Failed to save schedule."));
				} finally {
					$.value = !1;
				}
			}
		}
		return re(() => {
			F(), Fe();
		}), (e, t) => (b(), h("div", ae, [
			g("section", oe, [
				g("header", se, [t[5] ||= g("h1", {
					id: "backups-heading",
					class: "admin-backup__title"
				}, "Backups", -1), v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "plus",
					onClick: z
				}, {
					default: T(() => [...t[4] ||= [_("Create backup", -1)]]),
					_: 1
				})]),
				v(ee, {
					links: C(o).backup.links,
					details: C(o).backup.details
				}, {
					default: T(() => [...t[6] ||= [
						_(" Save and restore snapshots of your server's database and settings. ", -1),
						g("strong", null, "Create backup", -1),
						_(" makes a new snapshot (with an optional label); ", -1),
						g("strong", null, "Restore", -1),
						_(" rolls the server back to a chosen one, and ", -1),
						g("strong", null, "Delete", -1),
						_(" removes it. ", -1),
						g("strong", null, "Upload to S3", -1),
						_(" copies a local backup to cloud storage. Under ", -1),
						g("strong", null, "Scheduled backups", -1),
						_(", set the ", -1),
						g("strong", null, "interval", -1),
						_(" (days between automatic backups) and ", -1),
						g("strong", null, "retention count", -1),
						_(" (how many to keep), then ", -1),
						g("strong", null, "Save schedule", -1),
						_(". ", -1)
					]]),
					_: 1
				}, 8, ["links", "details"]),
				M.value ? (b(), h("div", ce, [v(l, {
					variant: "text",
					lines: 5
				})])) : N.value ? (b(), p(u, {
					key: 1,
					icon: "alert",
					title: "Couldn’t load backups",
					description: N.value
				}, {
					actions: T(() => [v(s, {
						variant: "solid",
						size: "sm",
						"left-icon": "rewind",
						onClick: F
					}, {
						default: T(() => [...t[7] ||= [_("Retry", -1)]]),
						_: 1
					})]),
					_: 1
				}, 8, ["description"])) : j.value.length === 0 ? (b(), p(u, {
					key: 2,
					icon: "film",
					title: "No backups yet",
					description: "Create one to get started."
				}, {
					actions: T(() => [v(s, {
						variant: "solid",
						size: "sm",
						"left-icon": "plus",
						onClick: z
					}, {
						default: T(() => [...t[8] ||= [_("Create backup", -1)]]),
						_: 1
					})]),
					_: 1
				})) : (b(), h("table", le, [t[12] ||= g("thead", null, [g("tr", null, [
					g("th", { scope: "col" }, "Label"),
					g("th", { scope: "col" }, "Size"),
					g("th", { scope: "col" }, "Created"),
					g("th", { scope: "col" }, "Storage"),
					g("th", {
						scope: "col",
						class: "admin-backup__actions-col"
					}, "Actions")
				])], -1), g("tbody", null, [(b(!0), h(f, null, ie(j.value, (e) => (b(), h("tr", { key: e.id }, [
					g("td", null, [e.label ? (b(), h("span", ue, S(e.label), 1)) : (b(), h("span", de, "Unnamed"))]),
					g("td", fe, S(ke(e.size_bytes)), 1),
					g("td", pe, [g("span", { title: e.created_at }, S(Ae(e.created_at)), 9, me)]),
					g("td", null, [v(a, { tone: e.is_s3 ? "success" : "neutral" }, {
						default: T(() => [_(S(e.is_s3 ? "S3" : "Local"), 1)]),
						_: 2
					}, 1032, ["tone"])]),
					g("td", null, [g("div", he, [
						v(s, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Restore ${e.label || e.id}`,
							onClick: (t) => H.value = e
						}, {
							default: T(() => [...t[9] ||= [_(" Restore ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"]),
						e.is_s3 ? m("", !0) : (b(), p(s, {
							key: 0,
							variant: "ghost",
							size: "sm",
							loading: P.value === e.id,
							"aria-label": `Upload ${e.label || e.id} to S3`,
							onClick: (t) => Pe(e)
						}, {
							default: T(() => [...t[10] ||= [_(" Upload to S3 ", -1)]]),
							_: 1
						}, 8, [
							"loading",
							"aria-label",
							"onClick"
						])),
						v(s, {
							variant: "ghost",
							size: "sm",
							"aria-label": `Delete ${e.label || e.id}`,
							onClick: (t) => G.value = e
						}, {
							default: T(() => [...t[11] ||= [_(" Delete ", -1)]]),
							_: 1
						}, 8, ["aria-label", "onClick"])
					])])
				]))), 128))])]))
			]),
			g("section", ge, [t[18] ||= g("header", { class: "admin-backup__head" }, [g("h2", {
				id: "schedule-heading",
				class: "admin-backup__subtitle"
			}, "Scheduled backups")], -1), Y.value ? (b(), h("div", _e, [v(l, {
				variant: "text",
				lines: 3
			})])) : X.value ? (b(), p(u, {
				key: 1,
				icon: "alert",
				title: "Couldn’t load schedule",
				description: X.value
			}, {
				actions: T(() => [v(s, {
					variant: "solid",
					size: "sm",
					"left-icon": "rewind",
					onClick: Fe
				}, {
					default: T(() => [...t[13] ||= [_("Retry", -1)]]),
					_: 1
				})]),
				_: 1
			}, 8, ["description"])) : J.value ? (b(), h("div", ve, [g("p", ye, [t[14] ||= g("span", { class: "admin-backup__next-label" }, "Next scheduled backup:", -1), J.value.next_scheduled_backup === null ? (b(), h("span", Se, "Not scheduled")) : (b(), h(f, { key: 0 }, [g("span", { title: J.value.next_scheduled_backup_iso ?? "" }, S(je(J.value.next_scheduled_backup)), 9, be), J.value.next_scheduled_backup_iso ? (b(), h("span", xe, " (" + S(J.value.next_scheduled_backup_iso) + ") ", 1)) : m("", !0)], 64))]), g("form", {
				class: "admin-backup__form",
				onSubmit: D(Ie, ["prevent"])
			}, [g("div", Ce, [g("label", we, [t[15] ||= g("span", { class: "admin-backup__label" }, "Backup interval (days)", -1), E(g("input", {
				"onUpdate:modelValue": t[0] ||= (e) => Z.value = e,
				type: "number",
				min: "0",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[w, Z.value]])]), g("label", Te, [t[16] ||= g("span", { class: "admin-backup__label" }, "Retention count", -1), E(g("input", {
				"onUpdate:modelValue": t[1] ||= (e) => Q.value = e,
				type: "number",
				min: "1",
				class: "admin-backup__input",
				required: ""
			}, null, 512), [[w, Q.value]])])]), g("div", Ee, [v(s, {
				variant: "solid",
				size: "sm",
				loading: $.value,
				onClick: Ie
			}, {
				default: T(() => [...t[17] ||= [_(" Save schedule ", -1)]]),
				_: 1
			}, 8, ["loading"])])], 32)])) : m("", !0)]),
			v(c, {
				modelValue: I.value,
				"onUpdate:modelValue": t[3] ||= (e) => I.value = e,
				title: "Create backup",
				onClose: B
			}, {
				footer: T(() => [v(s, {
					variant: "ghost",
					size: "sm",
					onClick: B
				}, {
					default: T(() => [...t[20] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(s, {
					variant: "solid",
					size: "sm",
					loading: R.value,
					onClick: V
				}, {
					default: T(() => [...t[21] ||= [_("Create", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [g("form", {
					class: "admin-backup__form",
					onSubmit: D(V, ["prevent"])
				}, [g("label", De, [t[19] ||= g("span", { class: "admin-backup__label" }, "Label (optional)", -1), E(g("input", {
					"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
					type: "text",
					class: "admin-backup__input",
					autocomplete: "off",
					placeholder: "e.g. Weekly backup"
				}, null, 512), [[w, L.value]])])], 32)]),
				_: 1
			}, 8, ["modelValue"]),
			v(c, {
				"model-value": H.value !== null,
				title: "Restore backup",
				size: "sm",
				"onUpdate:modelValue": W
			}, {
				footer: T(() => [v(s, {
					variant: "ghost",
					size: "sm",
					onClick: W
				}, {
					default: T(() => [...t[22] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(s, {
					variant: "danger",
					size: "sm",
					loading: U.value,
					onClick: Me
				}, {
					default: T(() => [...t[23] ||= [_(" Restore ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [t[24] ||= g("p", null, [_("This will overwrite your current data. "), g("strong", null, "Continue?")], -1)]),
				_: 1
			}, 8, ["model-value"]),
			v(c, {
				"model-value": G.value !== null,
				title: "Delete backup",
				size: "sm",
				"onUpdate:modelValue": q
			}, {
				footer: T(() => [v(s, {
					variant: "ghost",
					size: "sm",
					onClick: q
				}, {
					default: T(() => [...t[27] ||= [_("Cancel", -1)]]),
					_: 1
				}), v(s, {
					variant: "danger",
					size: "sm",
					loading: K.value,
					onClick: Ne
				}, {
					default: T(() => [...t[28] ||= [_(" Delete ", -1)]]),
					_: 1
				}, 8, ["loading"])]),
				default: T(() => [g("p", null, [
					t[25] ||= _(" Are you sure you want to delete backup ", -1),
					g("strong", null, S(G.value?.label || G.value?.id), 1),
					t[26] ||= _("? This cannot be undone. ", -1)
				])]),
				_: 1
			}, 8, ["model-value"])
		]));
	}
}), [["__scopeId", "data-v-f268dc6d"]]);
export { O as default };

//# sourceMappingURL=BackupPage-FefGUM1M.js.map