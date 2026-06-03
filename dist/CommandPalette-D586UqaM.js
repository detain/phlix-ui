import { n as e, t } from "./Icon-ax5k7_G2.js";
import { t as n } from "./useFocusTrap-0JaLH3tF.js";
import { a as r } from "./usePreferencesStore-BFFMWKZp.js";
import { i, t as a } from "./Kbd-CSMm1T0l.js";
import { Fragment as o, Teleport as s, Transition as c, computed as l, createBlock as u, createCommentVNode as d, createElementBlock as f, createElementVNode as p, createVNode as m, defineComponent as h, inject as g, normalizeClass as _, onBeforeUnmount as v, onMounted as y, openBlock as b, ref as x, renderList as S, toDisplayString as C, unref as w, useId as T, watch as E, withCtx as D, withModifiers as O } from "vue";
import { useRouter as k } from "vue-router";
//#region src/components/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var ee = { class: "phlix-cmdk__search" }, A = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], j = ["id"], M = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, N = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], P = { class: "phlix-cmdk__option-body" }, F = { class: "phlix-cmdk__option-title" }, I = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, L = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, R = /*#__PURE__*/ e(/* @__PURE__ */ h({
	__name: "CommandPalette",
	setup(e) {
		let h = i(), R = k(), z = r(), B = x(null), V = T(), H = x(0);
		function U(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => h.runId(e.id)
			};
		}
		function W(e) {
			return {
				id: "__search",
				title: `Search library for “${e}”`,
				icon: "search",
				run: () => {
					h.closePalette(), R.push({
						name: "browse",
						query: { search: e }
					});
				}
			};
		}
		let G = l(() => {
			let e = [], t = [], n = (n) => {
				e.push({
					kind: "option",
					item: n,
					index: t.length
				}), t.push(n);
			}, r = h.query.trim();
			if (r) {
				for (let e of h.results) n(U(e));
				return n(W(r)), {
					rows: e,
					options: t
				};
			}
			let i = h.results.filter((e) => h.isRecent(e.id));
			i.length && (e.push({
				kind: "header",
				label: "Recent"
			}), i.forEach((e) => n(U(e))));
			let a = /* @__PURE__ */ new Map();
			for (let e of h.results) {
				if (h.isRecent(e.id)) continue;
				let t = e.group ?? "Commands", n = a.get(t);
				n ? n.push(e) : a.set(t, [e]);
			}
			for (let [t, r] of a) e.push({
				kind: "header",
				label: t
			}), r.forEach((e) => n(U(e)));
			return {
				rows: e,
				options: t
			};
		}), K = l(() => G.value.options.length), q = l(() => K.value ? `${V}-opt-${H.value}` : void 0);
		E(() => h.query, () => {
			H.value = 0;
		}), E(K, (e) => {
			H.value > e - 1 && (H.value = Math.max(0, e - 1));
		}), E(() => h.open, (e) => {
			e && (H.value = 0);
		});
		function J() {
			typeof document > "u" || document.getElementById(`${V}-opt-${H.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function Y(e) {
			let t = K.value;
			t && (H.value = (H.value + e + t) % t, J());
		}
		function X() {
			let e = G.value.options[H.value];
			e && e.run();
		}
		function Z(e) {
			e.run();
		}
		function Q(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), Y(1);
					break;
				case "ArrowUp":
					e.preventDefault(), Y(-1);
					break;
				case "Home":
					e.preventDefault(), H.value = 0, J();
					break;
				case "End":
					e.preventDefault(), H.value = Math.max(0, K.value - 1), J();
					break;
				case "Enter":
					e.preventDefault(), X();
					break;
			}
		}
		function te() {
			h.closePalette();
		}
		n(B, l(() => h.open), { onEscape: () => (h.closePalette(), !0) });
		let ne = g("phlixCommands", []), re = [
			{
				id: "nav.browse",
				title: "Go to Browse",
				icon: "film",
				group: "Navigation",
				keywords: [
					"home",
					"library",
					"media"
				],
				priority: 0,
				run: () => {
					R.push({ name: "browse" });
				}
			},
			{
				id: "nav.settings",
				title: "Go to Settings",
				icon: "settings",
				group: "Navigation",
				keywords: [
					"preferences",
					"config",
					"options"
				],
				priority: 1,
				run: () => {
					R.push({ name: "settings" });
				}
			},
			{
				id: "theme.nocturne",
				title: "Theme: Nocturne",
				icon: "moon",
				group: "Theme",
				keywords: [
					"dark",
					"amber",
					"cinema"
				],
				run: () => {
					z.theme = "nocturne";
				}
			},
			{
				id: "theme.daylight",
				title: "Theme: Daylight",
				icon: "sun",
				group: "Theme",
				keywords: ["light", "bright"],
				run: () => {
					z.theme = "daylight";
				}
			},
			{
				id: "theme.midnight",
				title: "Theme: Midnight",
				icon: "monitor",
				group: "Theme",
				keywords: [
					"oled",
					"black",
					"contrast"
				],
				run: () => {
					z.theme = "midnight";
				}
			},
			{
				id: "pref.density",
				title: "Toggle density",
				icon: "list",
				group: "Preferences",
				keywords: [
					"compact",
					"comfortable",
					"spacing"
				],
				run: () => {
					z.density = z.density === "compact" ? "comfortable" : "compact";
				}
			},
			{
				id: "pref.motion",
				title: "Toggle reduced motion",
				icon: "speed",
				group: "Preferences",
				keywords: [
					"animation",
					"accessibility",
					"a11y"
				],
				run: () => {
					z.reducedMotion = z.reducedMotion === "off" ? "auto" : "off";
				}
			},
			{
				id: "pref.atmosphere",
				title: "Toggle atmosphere",
				icon: "star",
				group: "Preferences",
				keywords: [
					"grain",
					"vignette",
					"glow",
					"ambient"
				],
				run: () => {
					z.atmosphere = !z.atmosphere;
				}
			},
			{
				id: "pref.reset",
				title: "Reset preferences",
				icon: "rewind",
				group: "Preferences",
				keywords: [
					"default",
					"clear",
					"restore"
				],
				run: () => z.reset()
			}
		], $ = null;
		return y(() => {
			$ = h.register([...re, ...ne]);
		}), v(() => {
			$?.();
		}), (e, n) => (b(), u(s, { to: "body" }, [m(c, { name: "phlix-cmdk" }, {
			default: D(() => [w(h).open ? (b(), f("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: O(te, ["self"])
			}, [p("div", {
				ref_key: "panelEl",
				ref: B,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [p("div", ee, [
				m(t, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				p("input", {
					value: w(h).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": w(V),
					"aria-activedescendant": q.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: n[0] ||= (e) => w(h).setQuery(e.target.value),
					onKeydown: Q
				}, null, 40, A),
				m(a, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), p("ul", {
				id: w(V),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(b(!0), f(o, null, S(G.value.rows, (e, n) => (b(), f(o, { key: e.kind === "header" ? `h-${e.label}-${n}` : e.item.id }, [e.kind === "header" ? (b(), f("li", M, C(e.label), 1)) : (b(), f("li", {
				key: 1,
				id: `${w(V)}-opt-${e.index}`,
				class: _(["phlix-cmdk__option", { "is-active": e.index === H.value }]),
				role: "option",
				"aria-selected": e.index === H.value,
				onClick: (t) => Z(e.item),
				onPointermove: (t) => H.value = e.index
			}, [
				m(t, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				p("span", P, [p("span", F, C(e.item.title), 1), e.item.subtitle ? (b(), f("span", I, C(e.item.subtitle), 1)) : d("", !0)]),
				e.item.shortcut ? (b(), u(a, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : d("", !0)
			], 42, N))], 64))), 128)), K.value ? d("", !0) : (b(), f("li", L, " No matching commands "))], 8, j)], 512)], 32)) : d("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b8b947de"]]);
//#endregion
export { R as default };

//# sourceMappingURL=CommandPalette-D586UqaM.js.map