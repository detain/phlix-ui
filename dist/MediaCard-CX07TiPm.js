import { n as e, t } from "./Icon-CIbfiPrs.js";
import { n, t as r } from "./ThumbRating-BUadWtms.js";
import { t as ee } from "./Menu-BKtnfxz4.js";
import { t as i } from "./Tooltip-Biea-2FR.js";
import { i as a } from "./usePlayerStore-B7mnqLe3.js";
import { t as te } from "./useMessages-B2u5b6BQ.js";
import { n as ne } from "./useApiBase-DXTBY90j.js";
import { t as re } from "./useAuthStore-593BscZf.js";
import { t as ie } from "./useToastStore-Bu-iYU7r.js";
import { t as o } from "./mediaTypeIcon-CNNqtg-w.js";
import { t as ae } from "./Modal-CqHpm-F4.js";
import { t as s } from "./Button-1sKEdGjj.js";
import { t as oe } from "./Combobox-_rB1CcGg.js";
import { t as c } from "./Spinner-BYaiRNqs.js";
import { t as l } from "./EmptyState-BjOJ1k_A.js";
import { t as se, y as u } from "./client-pLl-rDdN.js";
import { a as ce } from "./plural-B3O2rVPV.js";
import { t as d } from "./safeHref-CxjNgvYf.js";
import { t as f } from "./useImageSrc-CSM61b-l.js";
import { Fragment as p, computed as m, createBlock as h, createCommentVNode as g, createElementBlock as _, createElementVNode as v, createTextVNode as y, createVNode as b, defineComponent as x, inject as S, normalizeClass as C, normalizeStyle as w, onMounted as T, openBlock as E, ref as D, renderList as O, renderSlot as k, toDisplayString as A, unref as j, vModelText as M, watch as N, withCtx as P, withDirectives as F, withKeys as I, withModifiers as L } from "vue";
import { RouterLink as le, routerKey as R, useRouter as ue } from "vue-router";
// src/composables/usePrefetch.ts
function z() {
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
var B = "(max-width: 600px) 45vw, 200px";
function V(e) {
	return /(?:^|,)\s*\S+\s+\d+w(?=\s*(?:,|$))/.test(e);
}
function H(e) {
	return Number(e.toFixed(3)).toString();
}
function U(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	let t = typeof e.url == "string" ? e.url.trim() : "";
	if (t) return typeof e.width == "number" && Number.isFinite(e.width) && e.width > 0 ? `${t} ${Math.round(e.width)}w` : typeof e.density == "number" && Number.isFinite(e.density) && e.density > 0 ? `${t} ${H(e.density)}x` : t;
}
function W(e) {
	if (e == null) return;
	if (typeof e == "string") {
		let t = e.trim();
		return t.length ? t : void 0;
	}
	if (!Array.isArray(e)) return;
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = U(r);
		e && !n.has(e) && (n.add(e), t.push(e));
	}
	return t.length ? t.join(", ") : void 0;
}
function de(e, t) {
	let n = W(e);
	if (!n) return {};
	let r = typeof t == "string" ? t.trim() : "";
	return r ? {
		srcset: n,
		sizes: r
	} : V(n) ? {
		srcset: n,
		sizes: B
	} : { srcset: n };
}
// src/components/mediaItemMenu.ts
var G = {
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
	let n = G, r = [
		{ label: n.addToPlaylist },
		{ label: t.isWatched ? n.markUnplayed : n.markPlayed },
		{ label: n.download }
	];
	return t.isSeriesOrSeason && r.push({ label: n.missingEpisodes }), r.push({ label: n.shuffle }), t.isAdmin && (r.push({ label: n.matchMetadata }), r.push({ label: n.editMetadata }), t.canChoosePoster && r.push({ label: n.editImages }), r.push({ label: n.exploreData }), e.canDelete && r.push({
		label: n.remove,
		danger: !0
	})), r;
}
// src/utils/playlistPermissions.ts
function K(e, t, n) {
	return n ? !0 : t === null || e === null ? !1 : e === t;
}
// src/components/PlaylistPickerModal.vue?vue&type=script&setup=true&lang.ts
var q = { class: "playlist-picker" }, pe = {
	key: 0,
	class: "playlist-picker__target"
}, me = ["aria-checked", "tabindex"], he = ["aria-checked", "tabindex"], ge = {
	key: 1,
	class: "playlist-picker__panel"
}, _e = {
	key: 1,
	class: "playlist-picker__error",
	role: "alert"
}, J = {
	key: 2,
	class: "playlist-picker__panel"
}, Y = {
	key: 0,
	class: "playlist-picker__error",
	role: "alert"
}, ve = {
	key: 1,
	class: "playlist-picker__field"
}, ye = /*#__PURE__*/ e(/* @__PURE__ */ x({
	__name: "PlaylistPickerModal",
	props: {
		modelValue: { type: Boolean },
		item: {},
		client: {}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, ee = ne(), i = ie(), a = re(), te = ue();
		function o(e) {
			return K(e.created_by, a.user?.id ?? null, a.isAdmin);
		}
		let ce = m(() => te?.hasRoute("playlists") === !0);
		function d() {
			return n.client ? n.client : new se({ baseUrl: ee.value });
		}
		let f = D("existing"), p = D(null), x = D(null);
		function S(e) {
			switch (e.key) {
				case "ArrowLeft":
				case "ArrowUp":
					e.preventDefault(), f.value = "existing", p.value?.focus();
					break;
				case "ArrowRight":
				case "ArrowDown": e.preventDefault(), f.value = "new", x.value?.focus();
			}
		}
		let w = D([]), T = D(!1), O = D(null), k = D(null), L = D(""), R = D(!1), z = m(() => typeof n.item?.library_id == "string" && n.item.library_id.trim() !== ""), B = m(() => w.value.map((e) => ({
			value: e.id,
			label: o(e) ? e.name : `${e.name} (shared — read-only)`,
			disabled: !o(e)
		}))), V = m(() => R.value || !n.item ? !1 : f.value === "existing" ? k.value !== null : z.value && L.value.trim() !== "");
		N(() => n.modelValue, (e) => {
			e && (f.value = "existing", k.value = null, L.value = "", H());
		}, { immediate: !0 });
		async function H() {
			T.value = !0, O.value = null;
			try {
				w.value = await d().getPlaylists(), k.value = w.value.find((e) => o(e))?.id ?? null;
			} catch (e) {
				O.value = u(e, "Failed to load playlists.");
			} finally {
				T.value = !1;
			}
		}
		function U() {
			r("update:modelValue", !1);
		}
		async function W() {
			let e = n.item;
			if (e && !R.value) {
				R.value = !0;
				try {
					f.value === "existing" ? await de(e, k.value) : await G(e, L.value.trim());
				} finally {
					R.value = !1;
				}
			}
		}
		async function de(e, t) {
			if (!t) return;
			let n = w.value.find((e) => e.id === t);
			if (n && o(n)) try {
				await d().addToPlaylist(t, e.id), i.success(`Added to playlist “${n.name}”`), U();
			} catch (e) {
				i.error("Failed to add to playlist", { message: u(e) });
			}
		}
		async function G(e, t) {
			if (!z.value || t === "") return;
			let n = d(), r;
			try {
				r = await n.createPlaylist(t, e.library_id);
			} catch (e) {
				i.error("Failed to create playlist", { message: u(e) });
				return;
			}
			try {
				await n.addToPlaylist(r.id, e.id), i.success(`Added to playlist “${r.name}”`), U();
			} catch (e) {
				let t = u(e);
				i.error("Playlist created, but adding the item failed.", {
					message: t,
					duration: 1e4,
					action: {
						label: "Delete empty playlist",
						onClick: () => {
							n.deletePlaylist(r.id).then(() => i.success("Empty playlist deleted")).catch((e) => i.error("Failed to delete the empty playlist.", { message: u(e) }));
						}
					}
				}), U();
			}
		}
		return (t, n) => (E(), h(ae, {
			"model-value": e.modelValue,
			title: "Add to playlist",
			size: "sm",
			"onUpdate:modelValue": n[5] ||= (e) => r("update:modelValue", e),
			onClose: U
		}, {
			footer: P(() => [
				ce.value ? (E(), h(j(le), {
					key: 0,
					class: "playlist-picker__manage",
					to: { name: "playlists" },
					"data-testid": "picker-manage-playlists",
					onClick: n[4] ||= (e) => U()
				}, {
					default: P(() => [...n[7] ||= [y(" Manage playlists → ", -1)]]),
					_: 1
				})) : g("", !0),
				b(s, {
					variant: "ghost",
					size: "sm",
					onClick: U
				}, {
					default: P(() => [...n[8] ||= [y("Cancel", -1)]]),
					_: 1
				}),
				b(s, {
					variant: "solid",
					size: "sm",
					disabled: !V.value,
					loading: R.value,
					onClick: W
				}, {
					default: P(() => [...n[9] ||= [y(" Add ", -1)]]),
					_: 1
				}, 8, ["disabled", "loading"])
			]),
			default: P(() => [v("div", q, [
				e.item ? (E(), _("p", pe, A(e.item.name), 1)) : g("", !0),
				v("div", {
					class: "playlist-picker__tabs",
					role: "radiogroup",
					"aria-label": "Playlist choice",
					onKeydown: S
				}, [v("button", {
					ref_key: "existingOptionEl",
					ref: p,
					type: "button",
					role: "radio",
					class: C(["playlist-picker__tab", { "playlist-picker__tab--active": f.value === "existing" }]),
					"aria-checked": f.value === "existing",
					tabindex: f.value === "existing" ? 0 : -1,
					onClick: n[0] ||= (e) => f.value = "existing"
				}, " Existing playlist ", 10, me), v("button", {
					ref_key: "newOptionEl",
					ref: x,
					type: "button",
					role: "radio",
					class: C(["playlist-picker__tab", { "playlist-picker__tab--active": f.value === "new" }]),
					"aria-checked": f.value === "new",
					tabindex: f.value === "new" ? 0 : -1,
					onClick: n[1] ||= (e) => f.value = "new"
				}, " New playlist ", 10, he)], 32),
				f.value === "existing" ? (E(), _("div", ge, [T.value ? (E(), h(c, {
					key: 0,
					label: "Loading playlists…"
				})) : O.value ? (E(), _("p", _e, A(O.value), 1)) : w.value.length === 0 ? (E(), h(l, {
					key: 2,
					icon: "list",
					title: "No playlists yet",
					description: "Switch to “New playlist” to create your first one."
				})) : (E(), h(oe, {
					key: 3,
					modelValue: k.value,
					"onUpdate:modelValue": n[2] ||= (e) => k.value = e,
					options: B.value,
					label: "Playlist",
					placeholder: "Select a playlist…"
				}, null, 8, ["modelValue", "options"]))])) : (E(), _("div", J, [z.value ? (E(), _("label", ve, [n[6] ||= v("span", { class: "playlist-picker__label" }, "Playlist name", -1), F(v("input", {
					"onUpdate:modelValue": n[3] ||= (e) => L.value = e,
					type: "text",
					class: "playlist-picker__input",
					placeholder: "My playlist",
					autocomplete: "off",
					onKeyup: I(W, ["enter"])
				}, null, 544), [[M, L.value]])])) : (E(), _("p", Y, " This item has no owning library id, so a new playlist cannot be created for it. "))]))
			])]),
			_: 1
		}, 8, ["model-value"]));
	}
}), [["__scopeId", "data-v-e0de9aab"]]), be = { class: "media-card__poster" }, xe = [
	"href",
	"aria-label",
	"onClick"
], Se = { class: "visually-hidden" }, Ce = ["href", "aria-label"], we = { class: "visually-hidden" }, Te = [
	"src",
	"srcset",
	"sizes",
	"alt",
	"loading",
	"fetchpriority"
], Ee = {
	key: 3,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, De = { class: "media-card__badges" }, Oe = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, ke = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Ae = ["aria-valuenow", "aria-label"], je = { class: "media-card__overlay" }, Me = { class: "media-card__title" }, Ne = { class: "media-card__meta" }, Pe = {
	key: 0,
	class: "numeric"
}, Fe = {
	key: 1,
	class: "media-card__dot"
}, Ie = {
	key: 2,
	class: "media-card__cert"
}, Le = {
	key: 3,
	class: "media-card__dot"
}, Re = {
	key: 4,
	class: "numeric"
}, ze = {
	key: 0,
	class: "media-card__genres"
}, Be = {
	key: 1,
	class: "media-card__actions"
}, Ve = ["aria-label", "aria-pressed"], He = ["aria-label", "aria-pressed"], Ue = ["aria-expanded", "onClick"], We = {
	key: 0,
	class: "media-card__caption"
}, Ge = ["title"], Ke = { class: "media-card__caption-sub numeric" }, X = /*#__PURE__*/ e(/* @__PURE__ */ x({
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
	setup(e, { emit: ae }) {
		let { imgSrc: s, imgSrcset: oe } = f(), c = e, l = ae, u = a(), x = re(), M = n(), N = ne(), F = null;
		function I() {
			return F ? F.setBaseUrl(N.value) : F = new se({ baseUrl: N.value }), F;
		}
		let ue = S(R, null), { t: B } = te(), V = m(() => M.isFavorite(c.item.id)), H = m(() => M.likeLevel(c.item.id)), U = m(() => x.isAdmin), W = m(() => M.isWatched(c.item.id)), K = D(!1), q = D(!1), pe = m(() => c.item.type === "series" || c.item.type === "season"), me = m(() => (U.value, K.value ? fe(c.item, {
			isAdmin: U.value,
			isWatched: W.value,
			isSeriesOrSeason: pe.value,
			canChoosePoster: U.value
		}) : []));
		function he(e) {
			let t = G, n = ie();
			switch (e.label) {
				case t.markPlayed:
				case t.markUnplayed:
					J();
					break;
				case t.addToPlaylist:
					q.value = !0;
					break;
				case t.download:
					n.info("Preparing download…"), I().getDownloadUrl(c.item.id).then(({ url: e }) => {
						let t = d(e);
						t ? (window.open(t, "_blank", "noopener"), n.success("Download started")) : n.error("Download blocked — unsafe link");
					}).catch((e) => {
						n.error("Download failed", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.missingEpisodes:
					n.info("Loading…"), I().getMissingEpisodes(c.item.id).then((e) => {
						let t = e.missing_episodes.length;
						t === 0 ? n.success("No missing episodes") : n.warning(`${ce(t, "episode", "episodes")} missing`);
					}).catch((e) => {
						n.error("Failed to load missing episodes", { message: e instanceof Error ? e.message : String(e) });
					});
					break;
				case t.shuffle:
					I().shufflePlay(c.item.id).then(() => n.success("Shuffle play started")).catch((e) => {
						n.error("Shuffle play failed", { message: e instanceof Error ? e.message : String(e) });
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
				default: n.info(`${e.label} isn’t available yet`);
			}
		}
		function ge(e) {
			M.setLike(c.item.id, e, N.value);
		}
		function _e() {
			M.toggleFavorite(c.item.id, N.value), l("watchlist", c.item);
		}
		function J() {
			M.toggleWatched(c.item.id, N.value), l("mark-watched", c.item);
		}
		let Y = m(() => c.to ?? `/app/media/${c.item.id}`), { prefetch: ve } = z();
		function X() {
			ve(Y.value);
		}
		let Z = D(!1), Q = D(!1), qe = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(hover: none)").matches, Je = m(() => !c.hideActions && (Z.value || Q.value || qe));
		function Ye() {
			Z.value = !0, X();
		}
		function Xe() {
			Z.value = !1;
		}
		function Ze() {
			Q.value = !0, X();
		}
		function Qe(e) {
			let t = e.relatedTarget, n = e.currentTarget;
			t && n && n.contains(t) || (Q.value = !1);
		}
		let $ = D(!1), $e = D(null);
		function et() {
			$.value = !0;
		}
		T(() => {
			$e.value?.complete && ($.value = !0);
		});
		let tt = m(() => de(c.posterSrcset ?? c.item.poster_srcset, c.posterSizes)), nt = m(() => {
			let e = c.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return !Number.isNaN(t) && Date.now() - t <= c.newWithinDays * 24 * 60 * 60 * 1e3;
		}), rt = m(() => {
			let e = u.resumePositionFor(c.item.id), t = c.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), it = m(() => c.item.genres?.slice(0, 3) ?? []);
		return (n, a) => (E(), _("article", {
			class: "media-card",
			onPointerenter: Ye,
			onPointerleave: Xe,
			onFocusin: Ze,
			onFocusout: Qe
		}, [
			v("div", be, [
				j(ue) ? (E(), h(j(le), {
					key: 0,
					to: Y.value,
					custom: ""
				}, {
					default: P(({ navigate: t }) => [v("a", {
						href: Y.value,
						class: "media-card__link",
						"aria-label": e.item.name,
						onClick: t
					}, [v("span", Se, A(e.item.name), 1)], 8, xe)]),
					_: 1
				}, 8, ["to"])) : (E(), _("a", {
					key: 1,
					href: Y.value,
					class: "media-card__link",
					"aria-label": e.item.name
				}, [v("span", we, A(e.item.name), 1)], 8, Ce)),
				e.item.poster_url ? (E(), _("img", {
					key: 2,
					ref_key: "imgEl",
					ref: $e,
					class: C(["media-card__img", { "is-loaded": $.value }]),
					src: j(s)(e.item.poster_url),
					srcset: j(oe)(tt.value.srcset),
					sizes: tt.value.sizes,
					alt: e.item.name,
					loading: e.lazy ? "lazy" : void 0,
					decoding: "async",
					fetchpriority: e.fetchPriority,
					onLoad: et
				}, null, 42, Te)) : (E(), _("div", Ee, [b(t, { name: j(o)(e.item.type) }, null, 8, ["name"])])),
				v("div", De, [
					nt.value ? (E(), _("span", Oe, "New")) : g("", !0),
					k(n.$slots, "badges", { item: e.item }, void 0, !0),
					e.quality ? (E(), _("span", ke, A(e.quality), 1)) : g("", !0)
				]),
				rt.value > 0 ? (E(), _("div", {
					key: 4,
					class: "media-card__progress",
					role: "progressbar",
					"aria-valuenow": Math.round(rt.value * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": `Resume ${e.item.name}`
				}, [v("i", { style: w({ width: `${rt.value * 100}%` }) }, null, 4)], 8, Ae)) : g("", !0),
				v("div", je, [e.hideCaption ? g("", !0) : (E(), _(p, { key: 0 }, [
					v("h3", Me, A(e.item.name), 1),
					v("div", Ne, [
						e.item.year ? (E(), _("span", Pe, A(e.item.year), 1)) : g("", !0),
						e.item.year && (e.item.rating || e.item.runtime) ? (E(), _("span", Fe)) : g("", !0),
						e.item.rating ? (E(), _("span", Ie, A(e.item.rating), 1)) : g("", !0),
						e.item.rating && e.item.runtime ? (E(), _("span", Le)) : g("", !0),
						e.item.runtime ? (E(), _("span", Re, A(e.item.runtime) + "m", 1)) : g("", !0)
					]),
					it.value.length ? (E(), _("div", ze, [(E(!0), _(p, null, O(it.value, (e) => (E(), _("span", { key: e }, A(e), 1))), 128))])) : g("", !0)
				], 64)), Je.value ? (E(), _("div", Be, [b(i, { text: "Play" }, {
					default: P(() => [v("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: a[0] ||= L((t) => l("play", e.item), ["stop", "prevent"])
					}, [b(t, { name: "play" })])]),
					_: 1
				}), e.playOnly ? g("", !0) : (E(), _(p, { key: 0 }, [
					b(r, {
						level: H.value,
						onCycle: ge,
						onClick: a[1] ||= L(() => {}, ["stop", "prevent"])
					}, null, 8, ["level"]),
					b(i, { text: V.value ? j(B)("itemActions.removeFavorite") : j(B)("itemActions.addFavorite") }, {
						default: P(() => [v("button", {
							type: "button",
							class: C(["media-card__iconbtn", { "is-active": V.value }]),
							"aria-label": V.value ? j(B)("itemActions.removeFavorite") : j(B)("itemActions.addFavorite"),
							"aria-pressed": V.value ? "true" : "false",
							onClick: L(_e, ["stop", "prevent"])
						}, [b(t, { name: V.value ? "bookmark" : "bookmark-plus" }, null, 8, ["name"])], 10, Ve)]),
						_: 1
					}, 8, ["text"]),
					b(i, { text: W.value ? "Mark as unwatched" : "Mark as watched" }, {
						default: P(() => [v("button", {
							type: "button",
							class: C(["media-card__iconbtn media-card__iconbtn--watched", { "is-active": W.value }]),
							"aria-label": W.value ? "Mark as unwatched" : "Mark as watched",
							"aria-pressed": W.value ? "true" : "false",
							onClick: L(J, ["stop", "prevent"])
						}, [b(t, { name: W.value ? "eye" : "eye-off" }, null, 8, ["name"])], 10, He)]),
						_: 1
					}, 8, ["text"]),
					b(i, { text: "More info" }, {
						default: P(() => [v("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "More info",
							onClick: a[2] ||= L((t) => l("info", e.item), ["stop", "prevent"])
						}, [b(t, { name: "info" })])]),
						_: 1
					}),
					b(ee, {
						open: K.value,
						"onUpdate:open": a[3] ||= (e) => K.value = e,
						items: me.value,
						onSelect: he
					}, {
						default: P(({ toggle: e }) => [b(i, { text: "More actions" }, {
							default: P(() => [v("button", {
								type: "button",
								class: "media-card__iconbtn",
								"aria-label": "More actions",
								"aria-expanded": K.value ? "true" : "false",
								"aria-haspopup": "menu",
								onClick: L(e, ["stop", "prevent"])
							}, [b(t, { name: "more" })], 8, Ue)]),
							_: 2
						}, 1024)]),
						_: 1
					}, 8, ["open", "items"]),
					e.canMatch ? (E(), h(i, {
						key: 0,
						text: "Match metadata"
					}, {
						default: P(() => [v("button", {
							type: "button",
							class: "media-card__iconbtn",
							"aria-label": "Match metadata",
							onClick: a[4] ||= L((t) => l("match", e.item), ["stop", "prevent"])
						}, [b(t, { name: "search" })])]),
						_: 1
					})) : g("", !0),
					k(n.$slots, "actions", { item: e.item }, void 0, !0)
				], 64))])) : g("", !0)])
			]),
			e.hideCaption ? g("", !0) : (E(), _("div", We, [v("div", {
				class: "media-card__caption-title",
				title: e.item.name
			}, A(e.item.name), 9, Ge), v("div", Ke, [e.subtitle == null ? (E(), _(p, { key: 1 }, [
				e.item.year ? (E(), _(p, { key: 0 }, [y(A(e.item.year), 1)], 64)) : g("", !0),
				e.item.year && e.item.runtime ? (E(), _(p, { key: 1 }, [y(" · ")], 64)) : g("", !0),
				e.item.runtime ? (E(), _(p, { key: 2 }, [y(A(e.item.runtime) + "m", 1)], 64)) : g("", !0)
			], 64)) : (E(), _(p, { key: 0 }, [y(A(e.subtitle), 1)], 64))])])),
			q.value ? (E(), h(ye, {
				key: 1,
				"model-value": !0,
				item: e.item,
				"onUpdate:modelValue": a[5] ||= (e) => q.value = !1
			}, null, 8, ["item"])) : g("", !0)
		], 32));
	}
}), [["__scopeId", "data-v-92bc54e6"]]);
export { fe as a, G as i, ye as n, z as o, K as r, X as t };

//# sourceMappingURL=MediaCard-CX07TiPm.js.map