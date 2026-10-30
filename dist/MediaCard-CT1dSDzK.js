import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-M5VcrfIX.js";
import { i, t as ee, y as a } from "./client-DdVqCKVh.js";
import { n as te } from "./useApiBase-CV_r-Kk4.js";
import { t as ne } from "./useAuthStore-Bi1-VYV4.js";
import { t as o } from "./useImageSrc-KnN1T9Ga.js";
import { i as s } from "./usePlayerStore-D8A_gb_c.js";
import { t as re } from "./useToastStore-BDoKlU6N.js";
import { n as ie, t as c } from "./ThumbRating-B5EFc49E.js";
import { t as l } from "./Tooltip-D_txjC1i.js";
import { t as u } from "./Spinner-CcXHI0nh.js";
import { t as d } from "./safeHref-C9H0Sqte.js";
import { t as f } from "./EmptyState-BAyOxAcK.js";
import { t as p } from "./Button-BuG0GvCa.js";
import { t as ae } from "./Combobox-DmL52a_p.js";
import { t as m } from "./Modal-9IqluoNm.js";
import { t as h } from "./Menu-Dm56tG4N.js";
import { t as g } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as _, computed as v, createBlock as y, createCommentVNode as b, createElementBlock as x, createElementVNode as S, createTextVNode as C, createVNode as w, defineComponent as T, inject as E, normalizeClass as D, normalizeStyle as O, onMounted as k, openBlock as A, ref as j, renderList as M, renderSlot as N, toDisplayString as P, unref as F, vModelText as oe, watch as I, withCtx as L, withDirectives as R, withKeys as se, withModifiers as z } from "vue";
import { RouterLink as ce, routerKey as B, useRouter as V } from "vue-router";
//#region src/composables/usePrefetch.ts
function H() {
	let e = E(B, null), t = /* @__PURE__ */ new WeakSet();
	function n(n) {
		if (!e) return;
		let r;
		try {
			r = e.resolve(n).matched;
		} catch {
			return;
		}
		for (let e of r) {
			let n = e.components;
			if (n) {
				for (let e of Object.values(n)) if (!(typeof e != "function" || t.has(e))) {
					t.add(e);
					try {
						let t = e();
						t && typeof t.then == "function" && t.catch(() => {});
					} catch {}
				}
			}
		}
	}
	return { prefetch: n };
}
//#endregion
//#region src/components/media-poster.ts
var U = "(max-width: 600px) 45vw, 200px";
function W(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function G(e) {
	return Number(e.toFixed(3)).toString();
}
function le(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${G(e.density)}x` : t;
}
function ue(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = le(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function de(e, t) {
	let n = ue(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : W(n) ? {
		srcset: n,
		sizes: U
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var K = {
	addToPlaylist: "Add to playlist",
	markPlayed: "Mark played",
	markUnplayed: "Mark unplayed",
	download: "Download",
	missingEpisodes: "View missing episodes",
	shuffle: "Shuffle",
	matchMetadata: "Match metadata",
	editMetadata: "Edit metadata",
	editImages: "Edit images",
	exploreData: "Explore item data",
	remove: "Remove"
};
function fe(e, t) {
	let n = K, r = [
		{ label: n.addToPlaylist },
		{ label: t.isWatched ? n.markUnplayed : n.markPlayed },
		{ label: n.download }
	];
	return t.isSeriesOrSeason && r.push({ label: n.missingEpisodes }), r.push({ label: n.shuffle }), t.isAdmin && (r.push({ label: n.matchMetadata }), r.push({ label: n.editMetadata }), t.canChoosePoster && r.push({ label: n.editImages }), r.push({ label: n.exploreData }), e.canDelete && r.push({
		label: n.remove,
		danger: !0
	})), r;
}
//#endregion
//#region src/utils/playlistPermissions.ts
function q(e, t, n) {
	return n ? !0 : t === null || e === null ? !1 : e === t;
}
//#endregion
//#region src/components/PlaylistPickerModal.vue?vue&type=script&setup=true&lang.ts
var pe = { class: "playlist-picker" }, me = {
	key: 0,
	class: "playlist-picker__target"
}, J = {
	class: "playlist-picker__tabs",
	role: "tablist",
	"aria-label": "Playlist choice"
}, Y = ["aria-selected"], he = ["aria-selected"], X = {
	key: 1,
	class: "playlist-picker__panel"
}, Z = {
	key: 1,
	class: "playlist-picker__error",
	role: "alert"
}, Q = {
	key: 2,
	class: "playlist-picker__panel"
}, ge = {
	key: 0,
	class: "playlist-picker__error",
	role: "alert"
}, _e = {
	key: 1,
	class: "playlist-picker__field"
}, ve = /*#__PURE__*/ e(/* @__PURE__ */ T({
	__name: "PlaylistPickerModal",
	props: {
		modelValue: { type: Boolean },
		item: {},
		client: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = te(), o = re(), s = ne(), ie = V();
		function c(e) {
			return q(e.created_by, s.user?.id ?? null, s.isAdmin);
		}
		let l = v(() => ie?.hasRoute("playlists") === !0);
		function d() {
			return n.client ? n.client : new ee({ baseUrl: i.value });
		}
		let h = j("existing"), g = j([]), _ = j(!1), T = j(null), E = j(null), O = j(""), k = j(!1), M = v(() => typeof n.item?.library_id == "string" && n.item.library_id.trim() !== ""), N = v(() => g.value.map((e) => ({
			value: e.id,
			label: c(e) ? e.name : `${e.name} (shared — read-only)`,
			disabled: !c(e)
		}))), z = v(() => k.value || !n.item ? !1 : h.value === "existing" ? E.value !== null : M.value && O.value.trim() !== "");
		I(() => n.modelValue, (e) => {
			e && (h.value = "existing", E.value = null, O.value = "", B());
		}, { immediate: !0 });
		async function B() {
			_.value = !0, T.value = null;
			try {
				g.value = await d().getPlaylists(), E.value = g.value.find((e) => c(e))?.id ?? null;
			} catch (e) {
				T.value = a(e, "Failed to load playlists.");
			} finally {
				_.value = !1;
			}
		}
		function H() {
			r("update:modelValue", !1);
		}
		async function U() {
			let e = n.item;
			if (!(!e || k.value)) {
				k.value = !0;
				try {
					h.value === "existing" ? await W(e, E.value) : await G(e, O.value.trim());
				} finally {
					k.value = !1;
				}
			}
		}
		async function W(e, t) {
			if (!t) return;
			let n = g.value.find((e) => e.id === t);
			if (!(!n || !c(n))) try {
				await d().addToPlaylist(t, e.id), o.success(`Added to playlist “${n.name}”`), H();
			} catch (e) {
				o.error("Failed to add to playlist", { message: a(e) });
			}
		}
		async function G(e, t) {
			if (!M.value || t === "") return;
			let n = d(), r;
			try {
				r = await n.createPlaylist(t, e.library_id);
			} catch (e) {
				o.error("Failed to create playlist", { message: a(e) });
				return;
			}
			try {
				await n.addToPlaylist(r.id, e.id), o.success(`Added to playlist “${r.name}”`), H();
			} catch (e) {
				let t = a(e);
				o.error("Playlist created, but adding the item failed.", {
					message: t,
					duration: 1e4,
					action: {
						label: "Delete empty playlist",
						onClick: () => {
							n.deletePlaylist(r.id).then(() => o.success("Empty playlist deleted")).catch((e) => o.error("Failed to delete the empty playlist.", { message: a(e) }));
						}
					}
				}), H();
			}
		}
		return (t, n) => (A(), y(m, {
			"model-value": e.modelValue,
			title: "Add to playlist",
			size: "sm",
			"onUpdate:modelValue": n[5] ||= (e) => r("update:modelValue", e),
			onClose: H
		}, {
			footer: L(() => [
				l.value ? (A(), y(F(ce), {
					key: 0,
					class: "playlist-picker__manage",
					to: { name: "playlists" },
					"data-testid": "picker-manage-playlists",
					onClick: n[4] ||= (e) => H()
				}, {
					default: L(() => [...n[7] ||= [C(" Manage playlists → ", -1)]]),
					_: 1
				})) : b("", !0),
				w(p, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: L(() => [...n[8] ||= [C("Cancel", -1)]]),
					_: 1
				}),
				w(p, {
					variant: "solid",
					size: "sm",
					disabled: !z.value,
					loading: k.value,
					onClick: U
				}, {
					default: L(() => [...n[9] ||= [C(" Add ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])
			]),
			default: L(() => [S("div", pe, [
				e.item ? (A(), x("p", me, P(e.item.name), 1)) : b("", !0),
				S("div", J, [S("button", {
					type: "button",
					role: "tab",
					class: D(["playlist-picker__tab", { "playlist-picker__tab--active": h.value === "existing" }]),
					"aria-selected": h.value === "existing",
					onClick: n[0] ||= (e) => h.value = "existing"
				}, " Existing playlist ", 10, Y), S("button", {
					type: "button",
					role: "tab",
					class: D(["playlist-picker__tab", { "playlist-picker__tab--active": h.value === "new" }]),
					"aria-selected": h.value === "new",
					onClick: n[1] ||= (e) => h.value = "new"
				}, " New playlist ", 10, he)]),
				h.value === "existing" ? (A(), x("div", X, [_.value ? (A(), y(u, {
					key: 0,
					label: "Loading playlists…"
				})) : T.value ? (A(), x("p", Z, P(T.value), 1)) : g.value.length === 0 ? (A(), y(f, {
					key: 2,
					icon: "list",
					title: "No playlists yet",
					description: "Switch to “New playlist” to create your first one."
				})) : (A(), y(ae, {
					key: 3,
					modelValue: E.value,
					"onUpdate:modelValue": n[2] ||= (e) => E.value = e,
					options: N.value,
					label: "Playlist",
					placeholder: "Select a playlist…"
				}, null, 8, ["modelValue", "options"]))])) : (A(), x("div", Q, [M.value ? (A(), x("label", _e, [n[6] ||= S("span", { class: "playlist-picker__label" }, "Playlist name", -1), R(S("input", {
					"onUpdate:modelValue": n[3] ||= (e) => O.value = e,
					type: "text",
					class: "playlist-picker__input",
					placeholder: "My playlist",
					autocomplete: "off",
					onKeyup: se(U, ["enter"])
				}, null, 544), [[oe, O.value]])])) : (A(), x("p", ge, " This item has no owning library id, so a new playlist cannot be created for it. "))]))
			])]),
			_: 1
		}, 8, ["model-value"]));
	}
}), [["__scopeId", "data-v-e2d21b25"]]), ye = { class: "media-card__poster" }, be = [
	"href",
	"aria-label",
	"onClick"
], xe = { class: "visually-hidden" }, Se = ["href", "aria-label"], Ce = { class: "visually-hidden" }, we = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"loading",
	"fetchpriority"
], Te = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Ee = { class: "media-card__badges" }, De = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Oe = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, ke = ["aria-valuenow", "aria-label"], Ae = { class: "media-card__overlay" }, je = { class: "media-card__title" }, Me = { class: "media-card__meta" }, Ne = {
	key: 0,
	class: "numeric"
}, Pe = {
	key: 1,
	class: "media-card__dot"
}, Fe = {
	key: 2,
	class: "media-card__cert"
}, Ie = {
	key: 3,
	class: "media-card__dot"
}, Le = {
	key: 4,
	class: "numeric"
}, Re = {
	key: 0,
	class: "media-card__genres"
}, ze = {
	key: 1,
	class: "media-card__actions"
}, Be = ["aria-label", "aria-pressed"], Ve = ["aria-label", "aria-pressed"], He = ["aria-expanded", "onClick"], Ue = {
	key: 0,
	class: "media-card__caption"
}, We = ["title"], Ge = { class: "media-card__caption-sub numeric" }, Ke = /*#__PURE__*/ e(/* @__PURE__ */ T({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 },
		posterSrcset: {},
		posterSizes: {},
		fetchPriority: {},
		canMatch: {
			type: Boolean,
			default: !1
		},
		hideActions: {
			type: Boolean,
			default: !1
		},
		playOnly: {
			type: Boolean,
			default: !1
		},
		subtitle: { default: null },
		hideCaption: {
			type: Boolean,
			default: !1
		},
		lazy: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"match",
		"mark-watched",
		"refresh",
		"choose-poster",
		"remove",
		"edit-metadata",
		"explore-data"
	],
	setup(e, { emit: ee }) {
		let { imgSrc: a, imgSrcset: te } = o(), u = e, f = ee, p = s(), ae = ne(), m = ie(), T = E("phlixConfig", null), oe = E(B, null), { t: I } = r(), R = v(() => m.isFavorite(u.item.id)), se = v(() => m.likeLevel(u.item.id)), V = v(() => ae.isAdmin), U = v(() => m.isWatched(u.item.id)), W = j(!1), G = j(!1), le = v(() => u.item.type === "series" || u.item.type === "season"), ue = v(() => (V.value, W.value ? fe(u.item, {
			isAdmin: V.value,
			isWatched: U.value,
			isSeriesOrSeason: le.value,
			canChoosePoster: V.value
		}) : []));
		function q(e) {
			let t = K, r = re();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					J();
					break;
				case t.addToPlaylist:
					G.value = !0;
					break;
				case t.download:
					r.info("Preparing download…"), i.getDownloadUrl(u.item.id).then(({ url: e }) => {
						let t = d(e);
						if (!t) {
							r.error("Download blocked — unsafe link");
							return;
						}
						window.open(t, "_blank", "noopener"), r.success("Download started");
					}).catch((e) => {
						r.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					r.info("Loading…"), i.getMissingEpisodes(u.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? r.success("No missing episodes") : r.warning(`${n(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						r.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					i.shufflePlay(u.item.id).then(() => r.success("Shuffle play started")).catch((e) => {
						r.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					f("edit-metadata", u.item);
					break;
				case t.exploreData:
					f("explore-data", u.item);
					break;
				case t.matchMetadata:
					f("refresh", u.item);
					break;
				case t.editImages:
					f("choose-poster", u.item);
					break;
				case t.remove:
					f("remove", u.item);
					break;
				default: r.info(`${e.label} isn't available yet`);
			}
		}
		function pe(e) {
			m.setLike(u.item.id, e, T?.apiBase ?? "");
		}
		function me() {
			m.toggleFavorite(u.item.id, T?.apiBase ?? ""), f("watchlist", u.item);
		}
		function J() {
			m.toggleWatched(u.item.id, T?.apiBase ?? ""), f("mark-watched", u.item);
		}
		let Y = v(() => u.to ?? `/app/media/${u.item.id}`), { prefetch: he } = H();
		function X() {
			he(Y.value);
		}
		let Z = j(!1), Q = j(!1), ge = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, _e = v(() => !u.hideActions && (Z.value || Q.value || ge));
		function Ke() {
			Z.value = !0, X();
		}
		function qe() {
			Z.value = !1;
		}
		function Je() {
			Q.value = !0, X();
		}
		function Ye(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (Q.value = !1);
		}
		let $ = j(!1), Xe = j(null);
		function Ze() {
			$.value = !0;
		}
		k(() => {
			Xe.value?.complete && ($.value = !0);
		});
		let Qe = v(() => de(u.posterSrcset ?? u.item.poster_srcset, u.posterSizes)), $e = v(() => {
			let e = u.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= u.newWithinDays * 24 * 60 * 60 * 1e3;
		}), et = v(() => {
			let e = p.resumePositionFor(u.item.id), t = u.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), tt = v(() => u.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (A(), x("article", {
			class: "media-card",
			onPointerenter: Ke,
			onPointerleave: qe,
			onFocusin: Je,
			onFocusout: Ye
		}, [
			S("div", ye, [
				F(oe) ? (A(), y(F(ce), {
					key: 0,
					to: Y.value,
					custom: ""
				}, {
					default: L(({ navigate: t }) => [S("a", {
						href: Y.value,
						class: "media-card__link",
						"aria-label": e.item.name,
						onClick: t
					}, [S("span", xe, P(e.item.name), 1)], 8, be)]),
					_: 1
				}, 8, ["to"])) : (A(), x("a", {
					key: 1,
					href: Y.value,
					class: "media-card__link",
					"aria-label": e.item.name
				}, [S("span", Ce, P(e.item.name), 1)], 8, Se)),
				e.item.poster_url ? (A(), x("img", {
					key: 2,
					ref_key: "imgEl",
					ref: Xe,
					class: D(["media-card__img", { "is-loaded": $.value }]),
					src: F(a)(e.item.poster_url),
					srcset: F(te)(Qe.value.srcset),
					sizes: Qe.value.sizes,
					alt: e.item.name,
					loading: e.lazy ? "lazy" : void 0,
					decoding: "async",
					fetchpriority: e.fetchPriority,
					onLoad: Ze
				}, null, 42, we)) : (A(), x("div", Te, [w(t, { name: F(g)(e.item.type) }, null, 8, ["name"])])),
				S("div", Ee, [
					$e.value ? (A(), x("span", De, "New")) : b("", !0),
					N(n.$slots, "badges", { item: e.item }, void 0, !0),
					e.quality ? (A(), x("span", Oe, P(e.quality), 1)) : b("", !0)
				]),
				et.value > 0 ? (A(), x("div", {
					key: 4,
					class: "media-card__progress",
					role: "progressbar",
					"aria-valuenow": Math.round(et.value * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": `Resume ${e.item.name}`
				}, [S("i", { style: O({ width: `${et.value * 100}%` }) }, null, 4)], 8, ke)) : b("", !0),
				S("div", Ae, [e.hideCaption ? b("", !0) : (A(), x(_, { key: 0 }, [
					S("h3", je, P(e.item.name), 1),
					S("div", Me, [
						e.item.year ? (A(), x("span", Ne, P(e.item.year), 1)) : b("", !0),
						e.item.year && (e.item.rating || e.item.runtime) ? (A(), x("span", Pe)) : b("", !0),
						e.item.rating ? (A(), x("span", Fe, P(e.item.rating), 1)) : b("", !0),
						e.item.rating && e.item.runtime ? (A(), x("span", Ie)) : b("", !0),
						e.item.runtime ? (A(), x("span", Le, P(e.item.runtime) + "m", 1)) : b("", !0)
					]),
					tt.value.length ? (A(), x("div", Re, [(A(!0), x(_, null, M(tt.value, (e) => (A(), x("span", { key: e }, P(e), 1))), 128))])) : b("", !0)
				], 64)), _e.value ? (A(), x("div", ze, [w(l, { text: "Play" }, {
					default: L(() => [S("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= z((t) => f("play", e.item), ["stop", "prevent"])
					}, [w(t, { name: "play" })])]),
					_: 1
				}), e.playOnly ? b("", !0) : (A(), x(_, { key: 0 }, [
					w(c, {
						level: se.value,
						onCycle: pe,
						onClick: r[1] ||= z(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					w(l, { text: R.value ? F(I)("itemActions.removeFavorite") : F(I)("itemActions.addFavorite") }, {
						default: L(() => [S("button", {
							type: "button",
							class: D(["media-card__iconbtn", { "is-active": R.value }]),
							"aria-label": R.value ? F(I)("itemActions.removeFavorite") : F(I)("itemActions.addFavorite"),
							"aria-pressed": R.value ? "true" : "false",
							onClick: z(me, ["stop", "prevent"])
						}, [w(t, { name: R.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Be)]),
						_: 1
					}, 8, ["text"]),
					w(l, { text: U.value ? "Mark as unwatched" : "Mark as watched" }, {
						default: L(() => [S("button", {
							type: "button",
							class: D(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": U.value }]),
							"aria-label": U.value ? "Mark as unwatched" : "Mark as watched",
							"aria-pressed": U.value ? "true" : "false",
							onClick: z(J, ["stop", "prevent"])
						}, [w(t, { name: U.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Ve)]),
						_: 1
					}, 8, ["text"]),
					w(l, { text: "More info" }, {
						default: L(() => [S("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More info",
							onClick: r[2] ||= z((t) => f("info", e.item), ["stop", "prevent"])
						}, [w(t, { name: "info" })])]),
						_: 1
					}),
					w(h, {
						open: W.value,
						"onUpdate:open": r[3] ||= (e) => W.value = e,
						items: ue.value,
						onSelect: q
					}, {
						default: L(({ toggle: e }) => [w(l, { text: "More actions" }, {
							default: L(() => [S("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": "More actions",
								"aria-expanded": W.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: z(e, ["stop", "prevent"])
							}, [w(t, { name: "more" })], 8, He)]),
							_: 2
						}, 1024)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (A(), y(l, {
						key: 0,
						text: "Match metadata"
					}, {
						default: L(() => [S("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "Match metadata",
							onClick: r[4] ||= z((t) => f("match", e.item), ["stop", "prevent"])
						}, [w(t, { name: "search" })])]),
						_: 1
					})) : b("", !0),
					N(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : b("", !0)])
			]),
			e.hideCaption ? b("", !0) : (A(), x("div", Ue, [S("div", {
				class: "media-card__caption-title",
				title: e.item.name
			}, P(e.item.name), 9, We), S("div", Ge, [e.subtitle == null ? (A(), x(_, { key: 1 }, [
				e.item.year ? (A(), x(_, { key: 0 }, [C(P(e.item.year), 1)], 64)) : b("", !0),
				e.item.year && e.item.runtime ? (A(), x(_, { key: 1 }, [C(" · ")], 64)) : b("", !0),
				e.item.runtime ? (A(), x(_, { key: 2 }, [C(P(e.item.runtime) + "m", 1)], 64)) : b("", !0)
			], 64)) : (A(), x(_, { key: 0 }, [C(P(e.subtitle), 1)], 64))])])),
			G.value ? (A(), y(ve, {
				key: 1,
				"model-value": !0,
				item: e.item,
				client: F(i),
				"onUpdate:modelValue": r[5] ||= (e) => G.value = !1
			}, null, 8, ["item", "client"])) : b("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-d779fa09"]]);
//#endregion
export { fe as a, K as i, ve as n, H as o, q as r, Ke as t };

//# sourceMappingURL=MediaCard-CT1dSDzK.js.map