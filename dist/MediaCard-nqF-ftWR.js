import { n as e, t } from "./Icon-CIwTuFLd.js";
import { a as n } from "./plural-DMM7pLFA.js";
import { t as r } from "./useMessages-UXduf5_a.js";
import { t as ee, y as i } from "./client-BoMeMmx0.js";
import { n as te } from "./useApiBase-CV_r-Kk4.js";
import { t as ne } from "./useAuthStore-Cj_Gp0xO.js";
import { t as re } from "./useImageSrc-KnN1T9Ga.js";
import { i as a } from "./usePlayerStore-D8A_gb_c.js";
import { t as ie } from "./useToastStore-DIWpaCOl.js";
import { n as o, t as ae } from "./ThumbRating-K7VmEs6I.js";
import { t as s } from "./Tooltip-D_txjC1i.js";
import { t as oe } from "./Spinner-DNkdcdz-.js";
import { t as se } from "./safeHref-C9H0Sqte.js";
import { t as ce } from "./EmptyState-BAyOxAcK.js";
import { t as c } from "./Button-BuG0GvCa.js";
import { t as l } from "./Combobox-D72RKH-3.js";
import { t as le } from "./Modal-CyrT3xhg.js";
import { t as u } from "./Menu-Dm56tG4N.js";
import { t as d } from "./mediaTypeIcon-Bde251Qi.js";
import { Fragment as f, computed as p, createBlock as m, createCommentVNode as h, createElementBlock as g, createElementVNode as _, createTextVNode as v, createVNode as y, defineComponent as b, inject as x, normalizeClass as S, normalizeStyle as C, onMounted as w, openBlock as T, ref as E, renderList as D, renderSlot as O, toDisplayString as k, unref as A, vModelText as j, watch as M, withCtx as N, withDirectives as P, withKeys as F, withModifiers as I } from "vue";
import { RouterLink as ue, routerKey as L, useRouter as de } from "vue-router";
//#region src/composables/usePrefetch.ts
function R() {
	let e = x(L, null), t = /* @__PURE__ */ new WeakSet();
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
var z = "(max-width: 600px) 45vw, 200px";
function B(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function V(e) {
	return Number(e.toFixed(3)).toString();
}
function H(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${V(e.density)}x` : t;
}
function U(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = H(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function fe(e, t) {
	let n = U(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : B(n) ? {
		srcset: n,
		sizes: z
	} : { srcset: n };
}
//#endregion
//#region src/components/mediaItemMenu.ts
var W = {
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
function pe(e, t) {
	let n = W, r = [
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
function G(e, t, n) {
	return n ? !0 : t === null || e === null ? !1 : e === t;
}
//#endregion
//#region src/components/PlaylistPickerModal.vue?vue&type=script&setup=true&lang.ts
var K = { class: "playlist-picker" }, me = {
	key: 0,
	class: "playlist-picker__target"
}, he = ["aria-checked", "tabindex"], ge = ["aria-checked", "tabindex"], _e = {
	key: 1,
	class: "playlist-picker__panel"
}, ve = {
	key: 1,
	class: "playlist-picker__error",
	role: "alert"
}, q = {
	key: 2,
	class: "playlist-picker__panel"
}, J = {
	key: 0,
	class: "playlist-picker__error",
	role: "alert"
}, ye = {
	key: 1,
	class: "playlist-picker__field"
}, be = /*#__PURE__*/ e(/* @__PURE__ */ b({
	__name: "PlaylistPickerModal",
	props: {
		modelValue: { type: Boolean },
		item: {},
		client: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, re = te(), a = ie(), o = ne(), ae = de();
		function s(e) {
			return G(e.created_by, o.user?.id ?? null, o.isAdmin);
		}
		let se = p(() => ae?.hasRoute("playlists") === !0);
		function u() {
			return n.client ? n.client : new ee({ baseUrl: re.value });
		}
		let d = E("existing"), f = E(null), b = E(null);
		function x(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), d.value = "existing", f.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), d.value = "new", b.value?.focus();
			}
		}
		let C = E([]), w = E(!1), D = E(null), O = E(null), I = E(""), L = E(!1), R = p(() => typeof n.item?.library_id == "string" && n.item.library_id.trim() !== ""), z = p(() => C.value.map((e) => ({
			value: e.id,
			label: s(e) ? e.name : `${e.name} (shared — read-only)`,
			disabled: !s(e)
		}))), B = p(() => L.value || !n.item ? !1 : d.value === "existing" ? O.value !== null : R.value && I.value.trim() !== "");
		M(() => n.modelValue, (e) => {
			e && (d.value = "existing", O.value = null, I.value = "", V());
		}, { immediate: !0 });
		async function V() {
			w.value = !0, D.value = null;
			try {
				C.value = await u().getPlaylists(), O.value = C.value.find((e) => s(e))?.id ?? null;
			} catch (e) {
				D.value = i(e, "Failed to load playlists.");
			} finally {
				w.value = !1;
			}
		}
		function H() {
			r("update:modelValue", !1);
		}
		async function U() {
			let e = n.item;
			if (!(!e || L.value)) {
				L.value = !0;
				try {
					d.value === "existing" ? await fe(e, O.value) : await W(e, I.value.trim());
				} finally {
					L.value = !1;
				}
			}
		}
		async function fe(e, t) {
			if (!t) return;
			let n = C.value.find((e) => e.id === t);
			if (!(!n || !s(n))) try {
				await u().addToPlaylist(t, e.id), a.success(`Added to playlist “${n.name}”`), H();
			} catch (e) {
				a.error("Failed to add to playlist", { message: i(e) });
			}
		}
		async function W(e, t) {
			if (!R.value || t === "") return;
			let n = u(), r;
			try {
				r = await n.createPlaylist(t, e.library_id);
			} catch (e) {
				a.error("Failed to create playlist", { message: i(e) });
				return;
			}
			try {
				await n.addToPlaylist(r.id, e.id), a.success(`Added to playlist “${r.name}”`), H();
			} catch (e) {
				let t = i(e);
				a.error("Playlist created, but adding the item failed.", {
					message: t,
					duration: 1e4,
					action: {
						label: "Delete empty playlist",
						onClick: () => {
							n.deletePlaylist(r.id).then(() => a.success("Empty playlist deleted")).catch((e) => a.error("Failed to delete the empty playlist.", { message: i(e) }));
						}
					}
				}), H();
			}
		}
		return (t, n) => (T(), m(le, {
			"model-value": e.modelValue,
			title: "Add to playlist",
			size: "sm",
			"onUpdate:modelValue": n[5] ||= (e) => r("update:modelValue", e),
			onClose: H
		}, {
			footer: N(() => [
				se.value ? (T(), m(A(ue), {
					key: 0,
					class: "playlist-picker__manage",
					to: { name: "playlists" },
					"data-testid": "picker-manage-playlists",
					onClick: n[4] ||= (e) => H()
				}, {
					default: N(() => [...n[7] ||= [v(" Manage playlists → ", -1)]]),
					_: 1
				})) : h("", !0),
				y(c, {
					variant: "ghost",
					size: "sm",
					onClick: H
				}, {
					default: N(() => [...n[8] ||= [v("Cancel", -1)]]),
					_: 1
				}),
				y(c, {
					variant: "solid",
					size: "sm",
					disabled: !B.value,
					loading: L.value,
					onClick: U
				}, {
					default: N(() => [...n[9] ||= [v(" Add ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])
			]),
			default: N(() => [_("div", K, [
				e.item ? (T(), g("p", me, k(e.item.name), 1)) : h("", !0),
				_("div", {
					class: "playlist-picker__tabs",
					role: "radiogroup",
					"aria-label": "Playlist choice",
					onKeydown: x
				}, [_("button", {
					ref_key: "existingOptionEl",
					ref: f,
					type: "button",
					role: "radio",
					class: S(["playlist-picker__tab", { "playlist-picker__tab--active": d.value === "existing" }]),
					"aria-checked": d.value === "existing",
					tabindex: d.value === "existing" ? 0 : -1,
					onClick: n[0] ||= (e) => d.value = "existing"
				}, " Existing playlist ", 10, he), _("button", {
					ref_key: "newOptionEl",
					ref: b,
					type: "button",
					role: "radio",
					class: S(["playlist-picker__tab", { "playlist-picker__tab--active": d.value === "new" }]),
					"aria-checked": d.value === "new",
					tabindex: d.value === "new" ? 0 : -1,
					onClick: n[1] ||= (e) => d.value = "new"
				}, " New playlist ", 10, ge)], 32),
				d.value === "existing" ? (T(), g("div", _e, [w.value ? (T(), m(oe, {
					key: 0,
					label: "Loading playlists…"
				})) : D.value ? (T(), g("p", ve, k(D.value), 1)) : C.value.length === 0 ? (T(), m(ce, {
					key: 2,
					icon: "list",
					title: "No playlists yet",
					description: "Switch to “New playlist” to create your first one."
				})) : (T(), m(l, {
					key: 3,
					modelValue: O.value,
					"onUpdate:modelValue": n[2] ||= (e) => O.value = e,
					options: z.value,
					label: "Playlist",
					placeholder: "Select a playlist…"
				}, null, 8, ["modelValue", "options"]))])) : (T(), g("div", q, [R.value ? (T(), g("label", ye, [n[6] ||= _("span", { class: "playlist-picker__label" }, "Playlist name", -1), P(_("input", {
					"onUpdate:modelValue": n[3] ||= (e) => I.value = e,
					type: "text",
					class: "playlist-picker__input",
					placeholder: "My playlist",
					autocomplete: "off",
					onKeyup: F(U, ["enter"])
				}, null, 544), [[j, I.value]])])) : (T(), g("p", J, " This item has no owning library id, so a new playlist cannot be created for it. "))]))
			])]),
			_: 1
		}, 8, ["model-value"]));
	}
}), [["__scopeId", "data-v-e0de9aab"]]), xe = { class: "media-card__poster" }, Se = [
	"href",
	"aria-label",
	"onClick"
], Ce = { class: "visually-hidden" }, we = ["href", "aria-label"], Te = { class: "visually-hidden" }, Ee = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"loading",
	"fetchpriority"
], De = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Oe = { class: "media-card__badges" }, ke = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Ae = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, je = ["aria-valuenow", "aria-label"], Me = { class: "media-card__overlay" }, Ne = { class: "media-card__title" }, Pe = { class: "media-card__meta" }, Fe = {
	key: 0,
	class: "numeric"
}, Ie = {
	key: 1,
	class: "media-card__dot"
}, Le = {
	key: 2,
	class: "media-card__cert"
}, Re = {
	key: 3,
	class: "media-card__dot"
}, ze = {
	key: 4,
	class: "numeric"
}, Be = {
	key: 0,
	class: "media-card__genres"
}, Ve = {
	key: 1,
	class: "media-card__actions"
}, He = ["aria-label", "aria-pressed"], Ue = ["aria-label", "aria-pressed"], We = ["aria-expanded", "onClick"], Ge = {
	key: 0,
	class: "media-card__caption"
}, Ke = ["title"], qe = { class: "media-card__caption-sub numeric" }, Y = /*#__PURE__*/ e(/* @__PURE__ */ b({
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
	setup(e, { emit: i }) {
		let { imgSrc: oe, imgSrcset: ce } = re(), c = e, l = i, le = a(), b = ne(), j = o(), M = te(), P = null;
		function F() {
			return P ? P.setBaseUrl(M.value) : P = new ee({ baseUrl: M.value }), P;
		}
		let de = x(L, null), { t: z } = r(), B = p(() => j.isFavorite(c.item.id)), V = p(() => j.likeLevel(c.item.id)), H = p(() => b.isAdmin), U = p(() => j.isWatched(c.item.id)), G = E(!1), K = E(!1), me = p(() => c.item.type === "series" || c.item.type === "season"), he = p(() => (H.value, G.value ? pe(c.item, {
			isAdmin: H.value,
			isWatched: U.value,
			isSeriesOrSeason: me.value,
			canChoosePoster: H.value
		}) : []));
		function ge(e) {
			let t = W, r = ie();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					q();
					break;
				case t.addToPlaylist:
					K.value = !0;
					break;
				case t.download:
					r.info("Preparing download…"), F().getDownloadUrl(c.item.id).then(({ url: e }) => {
						let t = se(e);
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
					r.info("Loading…"), F().getMissingEpisodes(c.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? r.success("No missing episodes") : r.warning(`${n(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						r.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					F().shufflePlay(c.item.id).then(() => r.success("Shuffle play started")).catch((e) => {
						r.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					l("edit-metadata", c.item);
					break;
				case t.exploreData:
					l("explore-data", c.item);
					break;
				case t.matchMetadata:
					l("refresh", c.item);
					break;
				case t.editImages:
					l("choose-poster", c.item);
					break;
				case t.remove:
					l("remove", c.item);
					break;
				default: r.info(`${e.label} isn’t available yet`);
			}
		}
		function _e(e) {
			j.setLike(c.item.id, e, M.value);
		}
		function ve() {
			j.toggleFavorite(c.item.id, M.value), l("watchlist", c.item);
		}
		function q() {
			j.toggleWatched(c.item.id, M.value), l("mark-watched", c.item);
		}
		let J = p(() => c.to ?? `/app/media/${c.item.id}`), { prefetch: ye } = R();
		function Y() {
			ye(J.value);
		}
		let X = E(!1), Z = E(!1), Je = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, Ye = p(() => !c.hideActions && (X.value || Z.value || Je));
		function Xe() {
			X.value = !0, Y();
		}
		function Ze() {
			X.value = !1;
		}
		function Qe() {
			Z.value = !0, Y();
		}
		function $e(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			(!t || !n || !n.contains(t)) && (Z.value = !1);
		}
		let Q = E(!1), et = E(null);
		function tt() {
			Q.value = !0;
		}
		w(() => {
			et.value?.complete && (Q.value = !0);
		});
		let nt = p(() => fe(c.posterSrcset ?? c.item.poster_srcset, c.posterSizes)), rt = p(() => {
			let e = c.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= c.newWithinDays * 24 * 60 * 60 * 1e3;
		}), $ = p(() => {
			let e = le.resumePositionFor(c.item.id), t = c.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), it = p(() => c.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (T(), g("article", {
			class: "media-card",
			onPointerenter: Xe,
			onPointerleave: Ze,
			onFocusin: Qe,
			onFocusout: $e
		}, [
			_("div", xe, [
				A(de) ? (T(), m(A(ue), {
					key: 0,
					to: J.value,
					custom: ""
				}, {
					default: N(({ navigate: t }) => [_("a", {
						href: J.value,
						class: "media-card__link",
						"aria-label": e.item.name,
						onClick: t
					}, [_("span", Ce, k(e.item.name), 1)], 8, Se)]),
					_: 1
				}, 8, ["to"])) : (T(), g("a", {
					key: 1,
					href: J.value,
					class: "media-card__link",
					"aria-label": e.item.name
				}, [_("span", Te, k(e.item.name), 1)], 8, we)),
				e.item.poster_url ? (T(), g("img", {
					key: 2,
					ref_key: "imgEl",
					ref: et,
					class: S(["media-card__img", { "is-loaded": Q.value }]),
					src: A(oe)(e.item.poster_url),
					srcset: A(ce)(nt.value.srcset),
					sizes: nt.value.sizes,
					alt: e.item.name,
					loading: e.lazy ? "lazy" : void 0,
					decoding: "async",
					fetchpriority: e.fetchPriority,
					onLoad: tt
				}, null, 42, Ee)) : (T(), g("div", De, [y(t, { name: A(d)(e.item.type) }, null, 8, ["name"])])),
				_("div", Oe, [
					rt.value ? (T(), g("span", ke, "New")) : h("", !0),
					O(n.$slots, "badges", { item: e.item }, void 0, !0),
					e.quality ? (T(), g("span", Ae, k(e.quality), 1)) : h("", !0)
				]),
				$.value > 0 ? (T(), g("div", {
					key: 4,
					class: "media-card__progress",
					role: "progressbar",
					"aria-valuenow": Math.round($.value * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": `Resume ${e.item.name}`
				}, [_("i", { style: C({ width: `${$.value * 100}%` }) }, null, 4)], 8, je)) : h("", !0),
				_("div", Me, [e.hideCaption ? h("", !0) : (T(), g(f, { key: 0 }, [
					_("h3", Ne, k(e.item.name), 1),
					_("div", Pe, [
						e.item.year ? (T(), g("span", Fe, k(e.item.year), 1)) : h("", !0),
						e.item.year && (e.item.rating || e.item.runtime) ? (T(), g("span", Ie)) : h("", !0),
						e.item.rating ? (T(), g("span", Le, k(e.item.rating), 1)) : h("", !0),
						e.item.rating && e.item.runtime ? (T(), g("span", Re)) : h("", !0),
						e.item.runtime ? (T(), g("span", ze, k(e.item.runtime) + "m", 1)) : h("", !0)
					]),
					it.value.length ? (T(), g("div", Be, [(T(!0), g(f, null, D(it.value, (e) => (T(), g("span", { key: e }, k(e), 1))), 128))])) : h("", !0)
				], 64)), Ye.value ? (T(), g("div", Ve, [y(s, { text: "Play" }, {
					default: N(() => [_("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= I((t) => l("play", e.item), ["stop", "prevent"])
					}, [y(t, { name: "play" })])]),
					_: 1
				}), e.playOnly ? h("", !0) : (T(), g(f, { key: 0 }, [
					y(ae, {
						level: V.value,
						onCycle: _e,
						onClick: r[1] ||= I(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					y(s, { text: B.value ? A(z)("itemActions.removeFavorite") : A(z)("itemActions.addFavorite") }, {
						default: N(() => [_("button", {
							type: "button",
							class: S(["media-card__iconbtn", { "is-active": B.value }]),
							"aria-label": B.value ? A(z)("itemActions.removeFavorite") : A(z)("itemActions.addFavorite"),
							"aria-pressed": B.value ? "true" : "false",
							onClick: I(ve, ["stop", "prevent"])
						}, [y(t, { name: B.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, He)]),
						_: 1
					}, 8, ["text"]),
					y(s, { text: U.value ? "Mark as unwatched" : "Mark as watched" }, {
						default: N(() => [_("button", {
							type: "button",
							class: S(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": U.value }]),
							"aria-label": U.value ? "Mark as unwatched" : "Mark as watched",
							"aria-pressed": U.value ? "true" : "false",
							onClick: I(q, ["stop", "prevent"])
						}, [y(t, { name: U.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, Ue)]),
						_: 1
					}, 8, ["text"]),
					y(s, { text: "More info" }, {
						default: N(() => [_("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More info",
							onClick: r[2] ||= I((t) => l("info", e.item), ["stop", "prevent"])
						}, [y(t, { name: "info" })])]),
						_: 1
					}),
					y(u, {
						open: G.value,
						"onUpdate:open": r[3] ||= (e) => G.value = e,
						items: he.value,
						onSelect: ge
					}, {
						default: N(({ toggle: e }) => [y(s, { text: "More actions" }, {
							default: N(() => [_("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": "More actions",
								"aria-expanded": G.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: I(e, ["stop", "prevent"])
							}, [y(t, { name: "more" })], 8, We)]),
							_: 2
						}, 1024)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (T(), m(s, {
						key: 0,
						text: "Match metadata"
					}, {
						default: N(() => [_("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "Match metadata",
							onClick: r[4] ||= I((t) => l("match", e.item), ["stop", "prevent"])
						}, [y(t, { name: "search" })])]),
						_: 1
					})) : h("", !0),
					O(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : h("", !0)])
			]),
			e.hideCaption ? h("", !0) : (T(), g("div", Ge, [_("div", {
				class: "media-card__caption-title",
				title: e.item.name
			}, k(e.item.name), 9, Ke), _("div", qe, [e.subtitle == null ? (T(), g(f, { key: 1 }, [
				e.item.year ? (T(), g(f, { key: 0 }, [v(k(e.item.year), 1)], 64)) : h("", !0),
				e.item.year && e.item.runtime ? (T(), g(f, { key: 1 }, [v(" · ")], 64)) : h("", !0),
				e.item.runtime ? (T(), g(f, { key: 2 }, [v(k(e.item.runtime) + "m", 1)], 64)) : h("", !0)
			], 64)) : (T(), g(f, { key: 0 }, [v(k(e.subtitle), 1)], 64))])])),
			K.value ? (T(), m(be, {
				key: 1,
				"model-value": !0,
				item: e.item,
				"onUpdate:modelValue": r[5] ||= (e) => K.value = !1
			}, null, 8, ["item"])) : h("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-92bc54e6"]]);
//#endregion
export { pe as a, W as i, be as n, R as o, G as r, Y as t };

//# sourceMappingURL=MediaCard-nqF-ftWR.js.map