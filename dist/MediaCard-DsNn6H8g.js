import { n as e, t } from "./Icon-55iG1rR7.js";
import { n, t as r } from "./ThumbRating-COapE1hP.js";
import { t as i } from "./Menu-BPcPxcL5.js";
import { t as a } from "./Tooltip-CaS-pDMB.js";
import { i as o } from "./usePlayerStore-BpohCwDP.js";
import { n as s, t as ee } from "./useMessages-DA8YXaVD.js";
import { n as te } from "./useApiBase-DXTBY90j.js";
import { t as ne } from "./useAuthStore-BzhZjWgj.js";
import { t as re } from "./useToastStore-CxO_ppM8.js";
import { t as ie } from "./mediaTypeIcon-CNNqtg-w.js";
import { t as ae } from "./Modal-W6IcTJlW.js";
import { t as c } from "./Button-Dfl4y6vO.js";
import { t as l } from "./Combobox-CPpyfOzC.js";
import { t as u } from "./Spinner-wzYyEuC4.js";
import { t as oe } from "./EmptyState-DjfWh3kt.js";
import { T as d, t as se } from "./client-Bmlfq3Uy.js";
import { t as f } from "./safeHref-Be5nFpx7.js";
import { t as ce } from "./useImageSrc-CSM61b-l.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, normalizeClass as C, normalizeStyle as w, onBeforeUnmount as le, onMounted as T, openBlock as E, ref as D, renderList as O, renderSlot as k, toDisplayString as A, unref as j, vModelText as M, watch as N, withCtx as P, withDirectives as F, withKeys as I, withModifiers as L } from "vue";
import { RouterLink as ue, routerKey as R, useRouter as z } from "vue-router";
// src/composables/usePrefetch.ts
function B() {
	let e = S(R, null), t = /* @__PURE__ */ new WeakSet();
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
// src/components/media-poster.ts
var V = "(max-width: 600px) 45vw, 200px";
function H(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function U(e) {
	return Number(e.toFixed(3)).toString();
}
function W(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${U(e.density)}x` : t;
}
function G(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = W(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function K(e, t) {
	let n = G(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : H(n) ? {
		srcset: n,
		sizes: V
	} : { srcset: n };
}
// src/components/mediaItemMenu.ts
var q = {
	addToPlaylist: "addToPlaylist",
	markWatched: "markWatched",
	markUnwatched: "markUnwatched",
	download: "download",
	missingEpisodes: "missingEpisodes",
	shuffle: "shuffle",
	matchMetadata: "matchMetadata",
	editMetadata: "editMetadata",
	editImages: "editImages",
	exploreData: "exploreData",
	remove: "remove"
};
s.itemActions.addToPlaylist, s.itemActions.markWatched, s.itemActions.markUnwatched, s.itemActions.download, s.itemActions.missingEpisodes, s.player.shuffle, s.itemActions.matchMetadata, s.itemActions.editMetadata, s.itemActions.editImages, s.itemActions.exploreData, s.itemActions.remove;
function de(e, t, n) {
	let r = q, i = {
		addToPlaylist: n("itemActions.addToPlaylist"),
		markWatched: n("itemActions.markWatched"),
		markUnwatched: n("itemActions.markUnwatched"),
		download: n("itemActions.download"),
		missingEpisodes: n("itemActions.missingEpisodes"),
		shuffle: n("player.shuffle"),
		matchMetadata: n("itemActions.matchMetadata"),
		editMetadata: n("itemActions.editMetadata"),
		editImages: n("itemActions.editImages"),
		exploreData: n("itemActions.exploreData"),
		remove: n("itemActions.remove")
	}, a = (e, t = {}) => ({
		key: e,
		label: i[e],
		...t
	}), o = [
		a(r.addToPlaylist),
		a(t.isWatched ? r.markUnwatched : r.markWatched),
		a(r.download)
	];
	return t.isSeriesOrSeason && o.push(a(r.missingEpisodes)), o.push(a(r.shuffle)), t.isAdmin && (o.push(a(r.matchMetadata)), o.push(a(r.editMetadata)), t.canChoosePoster && o.push(a(r.editImages)), o.push(a(r.exploreData)), e.canDelete && o.push(a(r.remove, { danger: !0 }))), o;
}
// src/utils/playlistPermissions.ts
function J(e, t, n) {
	return n ? !0 : t === null || e === null ? !1 : e === t;
}
// src/components/PlaylistPickerModal.vue?vue&type=script&setup=true&lang.ts
var fe = { class: "playlist-picker" }, pe = {
	key: 0,
	class: "playlist-picker__target"
}, me = ["aria-label"], he = ["aria-checked", "tabindex"], ge = ["aria-checked", "tabindex"], _e = {
	key: 1,
	class: "playlist-picker__panel"
}, Y = {
	key: 1,
	class: "playlist-picker__error",
	role: "alert"
}, ve = {
	key: 2,
	class: "playlist-picker__panel"
}, ye = {
	key: 0,
	class: "playlist-picker__error",
	role: "alert"
}, X = {
	key: 1,
	class: "playlist-picker__field"
}, Z = { class: "playlist-picker__label" }, Q = ["placeholder"], be = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "PlaylistPickerModal",
	props: {
		modelValue: { type: Boolean },
		item: {},
		client: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = te(), a = re(), { t: o } = ee(), s = ne(), ie = z();
		function f(e) {
			return J(e.created_by, s.user?.id ?? null, s.isAdmin);
		}
		let ce = m(() => ie?.hasRoute("playlists") === !0);
		function p() {
			return n.client ? n.client : new se({ baseUrl: i.value });
		}
		let x = D("existing"), S = D(null), w = D(null);
		function le(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), x.value = "existing", S.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), x.value = "new", w.value?.focus();
			}
		}
		let T = D([]), O = D(!1), k = D(null), L = D(null), R = D(""), B = D(!1), V = m(() => typeof n.item?.library_id == "string" && n.item.library_id.trim() !== ""), H = m(() => T.value.map((e) => ({
			value: e.id,
			label: f(e) ? e.name : o("playlist.sharedReadOnly", { name: e.name }),
			disabled: !f(e)
		}))), U = m(() => B.value || !n.item ? !1 : x.value === "existing" ? L.value !== null : V.value && R.value.trim() !== "");
		N(() => n.modelValue, (e) => {
			e && (x.value = "existing", L.value = null, R.value = "", W());
		}, { immediate: !0 });
		async function W() {
			O.value = !0, k.value = null;
			try {
				T.value = await p().getPlaylists(), L.value = T.value.find((e) => f(e))?.id ?? null;
			} catch (e) {
				k.value = d(e, o("playlist.loadListFailed"));
			} finally {
				O.value = !1;
			}
		}
		function G() {
			r("update:modelValue", !1);
		}
		async function K() {
			let e = n.item;
			if (e && !B.value) {
				B.value = !0;
				try {
					x.value === "existing" ? await q(e, L.value) : await de(e, R.value.trim());
				} finally {
					B.value = !1;
				}
			}
		}
		async function q(e, t) {
			if (!t) return;
			let n = T.value.find((e) => e.id === t);
			if (n && f(n)) try {
				await p().addToPlaylist(t, e.id), a.success(o("playlist.addedTo", { name: n.name })), G();
			} catch (e) {
				a.error(o("playlist.addFailed"), { message: d(e) });
			}
		}
		async function de(e, t) {
			if (!V.value || t === "") return;
			let n = p(), r;
			try {
				r = await n.createPlaylist(t, e.library_id);
			} catch (e) {
				a.error(o("playlist.createFailed"), { message: d(e) });
				return;
			}
			try {
				await n.addToPlaylist(r.id, e.id), a.success(o("playlist.addedTo", { name: r.name })), G();
			} catch (e) {
				let t = d(e);
				a.error(o("playlist.createdAddFailed"), {
					message: t,
					duration: 1e4,
					action: {
						label: o("playlist.deleteEmpty"),
						onClick: () => {
							n.deletePlaylist(r.id).then(() => a.success(o("playlist.emptyDeleted"))).catch((e) => a.error(o("playlist.emptyDeleteFailed"), { message: d(e) }));
						}
					}
				}), G();
			}
		}
		return (t, n) => (E(), h(ae, {
			"model-value": e.modelValue,
			title: j(o)("itemActions.addToPlaylist"),
			size: "sm",
			"onUpdate:modelValue": n[5] ||= (e) => r("update:modelValue", e),
			onClose: G
		}, {
			footer: P(() => [
				ce.value ? (E(), h(j(ue), {
					key: 0,
					class: "playlist-picker__manage",
					to: { name: "playlists" },
					"data-testid": "picker-manage-playlists",
					onClick: n[4] ||= (e) => G()
				}, {
					default: P(() => [y(A(j(o)("playlist.manage")), 1)]),
					_: 1
				})) : g("", !0),
				b(c, {
					variant: "ghost",
					size: "sm",
					onClick: G
				}, {
					default: P(() => [y(A(j(o)("confirm.cancel")), 1)]),
					_: 1
				}),
				b(c, {
					variant: "solid",
					size: "sm",
					disabled: !U.value,
					loading: B.value,
					onClick: K
				}, {
					default: P(() => [y(A(j(o)("playlist.add")), 1)]),
					_: 1
				}, 8, ["disabled", "loading"])
			]),
			default: P(() => [v("div", fe, [
				e.item ? (E(), _("p", pe, A(e.item.name), 1)) : g("", !0),
				v("div", {
					class: "playlist-picker__tabs",
					role: "radiogroup",
					"aria-label": j(o)("playlist.pickerChoice"),
					onKeydown: le
				}, [v("button", {
					ref_key: "existingOptionEl",
					ref: S,
					type: "button",
					role: "radio",
					class: C(["playlist-picker__tab", { "playlist-picker__tab--active": x.value === "existing" }]),
					"aria-checked": x.value === "existing",
					tabindex: x.value === "existing" ? 0 : -1,
					onClick: n[0] ||= (e) => x.value = "existing"
				}, A(j(o)("playlist.existingTab")), 11, he), v("button", {
					ref_key: "newOptionEl",
					ref: w,
					type: "button",
					role: "radio",
					class: C(["playlist-picker__tab", { "playlist-picker__tab--active": x.value === "new" }]),
					"aria-checked": x.value === "new",
					tabindex: x.value === "new" ? 0 : -1,
					onClick: n[1] ||= (e) => x.value = "new"
				}, A(j(o)("playlist.newTab")), 11, ge)], 40, me),
				x.value === "existing" ? (E(), _("div", _e, [O.value ? (E(), h(u, {
					key: 0,
					label: j(o)("playlist.loadingPlaylists")
				}, null, 8, ["label"])) : k.value ? (E(), _("p", Y, A(k.value), 1)) : T.value.length === 0 ? (E(), h(oe, {
					key: 2,
					icon: "list",
					title: j(o)("playlist.noPlaylistsTitle"),
					description: j(o)("playlist.noPlaylistsHint")
				}, null, 8, ["title", "description"])) : (E(), h(l, {
					key: 3,
					modelValue: L.value,
					"onUpdate:modelValue": n[2] ||= (e) => L.value = e,
					options: H.value,
					label: j(o)("playlist.selectLabel"),
					placeholder: j(o)("playlist.selectPlaceholder")
				}, null, 8, [
					"modelValue",
					"options",
					"label",
					"placeholder"
				]))])) : (E(), _("div", ve, [V.value ? (E(), _("label", X, [v("span", Z, A(j(o)("playlist.nameLabel")), 1), F(v("input", {
					"onUpdate:modelValue": n[3] ||= (e) => R.value = e,
					type: "text",
					class: "playlist-picker__input",
					placeholder: j(o)("playlist.namePlaceholder"),
					autocomplete: "off",
					onKeyup: I(K, ["enter"])
				}, null, 40, Q), [[M, R.value]])])) : (E(), _("p", ye, A(j(o)("playlist.noLibraryId")), 1))]))
			])]),
			_: 1
		}, 8, ["model-value", "title"]));
	}
}), [["__scopeId", "data-v-24e65215"]]), xe = { class: "media-card__poster" }, Se = [
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
}, He = ["aria-label"], Ue = ["aria-label", "aria-pressed"], We = ["aria-label", "aria-pressed"], Ge = ["aria-label"], Ke = [
	"aria-label",
	"aria-expanded",
	"onClick"
], qe = ["aria-label"], Je = {
	key: 0,
	class: "media-card__caption"
}, Ye = ["title"], Xe = { class: "media-card__caption-sub numeric" }, $ = /*#__PURE__*/ e(/* @__PURE__ */ x({
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
	setup(e, { emit: s }) {
		let { imgSrc: ae, imgSrcset: c } = ce(), l = e, u = s, oe = o(), d = ne(), x = n(), M = te(), N = null;
		function F() {
			return N ? N.setBaseUrl(M.value) : N = new se({ baseUrl: M.value }), N;
		}
		let I = S(R, null), { t: z } = ee(), V = m(() => x.isFavorite(l.item.id)), H = m(() => x.likeLevel(l.item.id)), U = m(() => d.isAdmin), W = m(() => x.isWatched(l.item.id)), G = D(!1), J = D(!1), fe = m(() => l.item.type === "series" || l.item.type === "season"), pe = m(() => (U.value, G.value ? de(l.item, {
			isAdmin: U.value,
			isWatched: W.value,
			isSeriesOrSeason: fe.value,
			canChoosePoster: U.value
		}, z) : []));
		function me(e) {
			let t = q, n = re();
			switch (e.key) {
				case t.markWatched:
				case t.markUnwatched:
					_e();
					break;
				case t.addToPlaylist:
					J.value = !0;
					break;
				case t.download:
					n.info(z("itemActions.downloadPreparing")), F().getDownloadUrl(l.item.id).then(({ url: e }) => {
						let t = f(e);
						t ? (window.open(t, "_blank", "noopener"), n.success(z("itemActions.downloadStarted"))) : n.error(z("itemActions.downloadUnsafe"));
					}).catch((e) => {
						n.error(z("itemActions.downloadFailed"), { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info(z("itemActions.missingLoading")), F().getMissingEpisodes(l.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success(z("itemActions.noMissingEpisodes")) : n.warning(z("itemActions.missingEpisodesCount", { count: t }));
					}).catch((e) => {
						n.error(z("itemActions.missingEpisodesFailed"), { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					F().shufflePlay(l.item.id).then((e) => {
						let t = Array.isArray(e?.shuffled_ids) ? e.shuffled_ids[0] : void 0;
						t ? I?.hasRoute("player") ? I.push({
							name: "player",
							params: { id: t }
						}).catch(() => {}) : n.success(z("itemActions.shuffleQueued")) : n.info(z("itemActions.shuffleNothing"));
					}).catch((e) => {
						n.error(z("itemActions.shuffleFailed"), { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.editMetadata:
					u("edit-metadata", l.item);
					break;
				case t.exploreData:
					u("explore-data", l.item);
					break;
				case t.matchMetadata:
					u("refresh", l.item);
					break;
				case t.editImages:
					u("choose-poster", l.item);
					break;
				case t.remove:
					u("remove", l.item);
					break;
				default: n.info(`${e.label} isn’t available yet.`);
			}
		}
		function he(e) {
			x.setLike(l.item.id, e, M.value);
		}
		function ge() {
			x.toggleFavorite(l.item.id, M.value), u("watchlist", l.item);
		}
		function _e() {
			x.toggleWatched(l.item.id, M.value), u("mark-watched", l.item);
		}
		let Y = m(() => l.to ?? `/app/media/${l.item.id}`), { prefetch: ve } = B();
		function ye() {
			ve(Y.value);
		}
		let X = D(!1), Z = D(!1), Q = typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(hover: none)") : null, $ = D(Q?.matches ?? !1);
		function Ze(e) {
			$.value = e.matches;
		}
		T(() => {
			Q && ($.value = Q.matches, Q.addEventListener?.("change", Ze));
		}), le(() => {
			Q?.removeEventListener?.("change", Ze);
		});
		let Qe = m(() => !l.hideActions && (X.value || Z.value || $.value));
		function $e() {
			X.value = !0, ye();
		}
		function et() {
			X.value = !1;
		}
		function tt() {
			Z.value = !0, ye();
		}
		function nt(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			t && n && n.contains(t) || (Z.value = !1);
		}
		let rt = D(!1), it = D(null);
		function at() {
			rt.value = !0;
		}
		T(() => {
			it.value?.complete && (rt.value = !0);
		});
		let ot = m(() => K(l.posterSrcset ?? l.item.poster_srcset, l.posterSizes)), st = m(() => {
			let e = l.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= l.newWithinDays * 24 * 60 * 60 * 1e3;
		}), ct = m(() => {
			let e = oe.resumePositionFor(l.item.id), t = l.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), lt = m(() => l.item.genres?.slice(0, 3) ?? []);
		return (n, o) => (E(), _("article", {
			class: "media-card",
			onPointerenter: $e,
			onPointerleave: et,
			onFocusin: tt,
			onFocusout: nt
		}, [
			v("div", xe, [
				j(I) ? (E(), h(j(ue), {
					key: 0,
					to: Y.value,
					custom: ""
				}, {
					default: P(({ navigate: t }) => [v("a", {
						href: Y.value,
						class: "media-card__link",
						"aria-label": e.item.name,
						onClick: t
					}, [v("span", Ce, A(e.item.name), 1)], 8, Se)]),
					_: 1
				}, 8, ["to"])) : (E(), _("a", {
					key: 1,
					href: Y.value,
					class: "media-card__link",
					"aria-label": e.item.name
				}, [v("span", Te, A(e.item.name), 1)], 8, we)),
				e.item.poster_url ? (E(), _("img", {
					key: 2,
					ref_key: "imgEl",
					ref: it,
					class: C(["media-card__img", { "is-loaded": rt.value }]),
					src: j(ae)(e.item.poster_url),
					srcset: j(c)(ot.value.srcset),
					sizes: ot.value.sizes,
					alt: e.item.name,
					loading: e.lazy ? "lazy" : void 0,
					decoding: "async",
					fetchpriority: e.fetchPriority,
					onLoad: at
				}, null, 42, Ee)) : (E(), _("div", De, [b(t, { name: j(ie)(e.item.type) }, null, 8, ["name"])])),
				v("div", Oe, [
					st.value ? (E(), _("span", ke, "New")) : g("", !0),
					k(n.$slots, "badges", { item: e.item }, void 0, !0),
					e.quality ? (E(), _("span", Ae, A(e.quality), 1)) : g("", !0)
				]),
				ct.value > 0 ? (E(), _("div", {
					key: 4,
					class: "media-card__progress",
					role: "progressbar",
					"aria-valuenow": Math.round(ct.value * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": j(z)("itemActions.resumeProgress", { name: e.item.name })
				}, [v("i", { style: w({ width: `${ct.value * 100}%` }) }, null, 4)], 8, je)) : g("", !0),
				v("div", Me, [e.hideCaption ? g("", !0) : (E(), _(p, { key: 0 }, [
					v("h3", Ne, A(e.item.name), 1),
					v("div", Pe, [
						e.item.year ? (E(), _("span", Fe, A(e.item.year), 1)) : g("", !0),
						e.item.year && (e.item.rating || e.item.runtime) ? (E(), _("span", Ie)) : g("", !0),
						e.item.rating ? (E(), _("span", Le, A(e.item.rating), 1)) : g("", !0),
						e.item.rating && e.item.runtime ? (E(), _("span", Re)) : g("", !0),
						e.item.runtime ? (E(), _("span", ze, A(e.item.runtime) + "m", 1)) : g("", !0)
					]),
					lt.value.length ? (E(), _("div", Be, [(E(!0), _(p, null, O(lt.value, (e) => (E(), _("span", { key: e }, A(e), 1))), 128))])) : g("", !0)
				], 64)), Qe.value ? (E(), _("div", Ve, [b(a, { text: j(z)("player.play") }, {
					default: P(() => [v("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": j(z)("player.play"),
						onClick: o[0] ||= L((t) => u("play", e.item), ["stop", "prevent"])
					}, [b(t, { name: "play" })], 8, He)]),
					_: 1
				}, 8, ["text"]), e.playOnly ? g("", !0) : (E(), _(p, { key: 0 }, [
					b(r, {
						level: H.value,
						onCycle: he,
						onClick: o[1] ||= L(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					b(a, { text: V.value ? j(z)("itemActions.removeFavorite") : j(z)("itemActions.addFavorite") }, {
						default: P(() => [v("button", {
							type: "button",
							class: C(["media-card__iconbtn", { "is-active": V.value }]),
							"aria-label": V.value ? j(z)("itemActions.removeFavorite") : j(z)("itemActions.addFavorite"),
							"aria-pressed": V.value ? "true" : "false",
							onClick: L(ge, ["stop", "prevent"])
						}, [b(t, { name: V.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ue)]),
						_: 1
					}, 8, ["text"]),
					b(a, { text: W.value ? j(z)("itemActions.markUnwatchedAria") : j(z)("itemActions.markWatchedAria") }, {
						default: P(() => [v("button", {
							type: "button",
							class: C(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": W.value }]),
							"aria-label": W.value ? j(z)("itemActions.markUnwatchedAria") : j(z)("itemActions.markWatchedAria"),
							"aria-pressed": W.value ? "true" : "false",
							onClick: L(_e, ["stop", "prevent"])
						}, [b(t, { name: W.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, We)]),
						_: 1
					}, 8, ["text"]),
					b(a, { text: j(z)("itemActions.moreInfo") }, {
						default: P(() => [v("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": j(z)("itemActions.moreInfo"),
							onClick: o[2] ||= L((t) => u("info", e.item), ["stop", "prevent"])
						}, [b(t, { name: "info" })], 8, Ge)]),
						_: 1
					}, 8, ["text"]),
					b(i, {
						open: G.value,
						"onUpdate:open": o[3] ||= (e) => G.value = e,
						items: pe.value,
						onSelect: me
					}, {
						default: P(({ toggle: e }) => [b(a, { text: j(z)("itemActions.moreActions") }, {
							default: P(() => [v("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": j(z)("itemActions.moreActions"),
								"aria-expanded": G.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: L(e, ["stop", "prevent"])
							}, [b(t, { name: "more" })], 8, Ke)]),
							_: 2
						}, 1032, ["text"])]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (E(), h(a, {
						key: 0,
						text: j(z)("itemActions.matchMetadata")
					}, {
						default: P(() => [v("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": j(z)("itemActions.matchMetadata"),
							onClick: o[4] ||= L((t) => u("match", e.item), ["stop", "prevent"])
						}, [b(t, { name: "search" })], 8, qe)]),
						_: 1
					}, 8, ["text"])) : g("", !0),
					k(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : g("", !0)])
			]),
			e.hideCaption ? g("", !0) : (E(), _("div", Je, [v("div", {
				class: "media-card__caption-title",
				title: e.item.name
			}, A(e.item.name), 9, Ye), v("div", Xe, [e.subtitle == null ? (E(), _(p, { key: 1 }, [
				e.item.year ? (E(), _(p, { key: 0 }, [y(A(e.item.year), 1)], 64)) : g("", !0),
				e.item.year && e.item.runtime ? (E(), _(p, { key: 1 }, [y(" · ")], 64)) : g("", !0),
				e.item.runtime ? (E(), _(p, { key: 2 }, [y(A(e.item.runtime) + "m", 1)], 64)) : g("", !0)
			], 64)) : (E(), _(p, { key: 0 }, [y(A(e.subtitle), 1)], 64))])])),
			J.value ? (E(), h(be, {
				key: 1,
				"model-value": !0,
				item: e.item,
				"onUpdate:modelValue": o[5] ||= (e) => J.value = !1
			}, null, 8, ["item"])) : g("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-fc00112a"]]);
export { de as a, q as i, be as n, B as o, J as r, $ as t };

//# sourceMappingURL=MediaCard-DsNn6H8g.js.map