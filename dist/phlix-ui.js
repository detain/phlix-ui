import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createTextVNode as u, createVNode as d, defineComponent as f, inject as p, markRaw as m, nextTick as h, normalizeClass as g, normalizeStyle as _, onBeforeUnmount as v, onMounted as y, openBlock as b, reactive as x, ref as S, renderList as C, renderSlot as w, resolveComponent as T, resolveDynamicComponent as E, toDisplayString as D, toRef as O, unref as k, useId as A, vModelDynamic as j, vModelText as M, vShow as N, watch as P, watchEffect as F, withCtx as I, withDirectives as L, withKeys as R, withModifiers as z } from "vue";
import { createPinia as B, defineStore as V } from "pinia";
import { RouterLink as H, RouterView as U, createRouter as ee, createWebHistory as te, useRoute as W, useRouter as G } from "vue-router";
//#region \0rolldown/runtime.js
var ne = Object.defineProperty, re = (e, t) => {
	let n = {};
	for (var r in e) ne(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || ne(n, Symbol.toStringTag, { value: "Module" }), n;
}, K = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ie = {}, ae = { class: "app-layout" }, oe = { class: "app-header" }, se = { class: "header-inner" }, ce = { class: "logo" }, le = { class: "nav" }, ue = { class: "app-main" }, de = { class: "app-footer" };
function fe(e, t) {
	return b(), c("div", ae, [
		l("header", oe, [l("div", se, [l("div", ce, [w(e.$slots, "logo", {}, () => [t[0] ||= l("span", { class: "logo-text" }, "Phlix", -1)], !0)]), l("nav", le, [w(e.$slots, "nav", {}, void 0, !0)])])]),
		l("main", ue, [w(e.$slots, "default", {}, void 0, !0)]),
		l("footer", de, [w(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var pe = /*#__PURE__*/ K(ie, [["render", fe], ["__scopeId", "data-v-9f6c6d16"]]), me = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function he(e, t) {
	return b(), c("svg", me, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var ge = m({
	name: "lucide-play",
	render: he
}), _e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ve(e, t) {
	return b(), c("svg", _e, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), l("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var ye = m({
	name: "lucide-pause",
	render: ve
}), be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xe(e, t) {
	return b(), c("svg", be, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var Se = m({
	name: "lucide-skip-back",
	render: xe
}), Ce = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function we(e, t) {
	return b(), c("svg", Ce, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var Te = m({
	name: "lucide-skip-forward",
	render: we
}), Ee = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function De(e, t) {
	return b(), c("svg", Ee, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), l("path", { d: "M3 3v5h5" })], -1)]]);
}
var Oe = m({
	name: "lucide-rotate-ccw",
	render: De
}), ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ae(e, t) {
	return b(), c("svg", ke, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), l("path", { d: "M21 3v5h-5" })], -1)]]);
}
var je = m({
	name: "lucide-rotate-cw",
	render: Ae
}), Me = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ne(e, t) {
	return b(), c("svg", Me, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Pe = m({
	name: "lucide-volume-2",
	render: Ne
}), Fe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ie(e, t) {
	return b(), c("svg", Fe, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var Le = m({
	name: "lucide-volume-1",
	render: Ie
}), Re = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ze(e, t) {
	return b(), c("svg", Re, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var Be = m({
	name: "lucide-volume-x",
	render: ze
}), Ve = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function He(e, t) {
	return b(), c("svg", Ve, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), l("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var Ue = m({
	name: "lucide-captions",
	render: He
}), We = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ge(e, t) {
	return b(), c("svg", We, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), l("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var Ke = m({
	name: "lucide-picture-in-picture-2",
	render: Ge
}), qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Je(e, t) {
	return b(), c("svg", qe, [...t[0] ||= [l("rect", {
		width: "20",
		height: "12",
		x: "2",
		y: "6",
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		rx: "2"
	}, null, -1)]]);
}
var Ye = m({
	name: "lucide-rectangle-horizontal",
	render: Je
}), Xe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ze(e, t) {
	return b(), c("svg", Xe, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var Qe = m({
	name: "lucide-maximize",
	render: Ze
}), $e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function et(e, t) {
	return b(), c("svg", $e, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var tt = m({
	name: "lucide-minimize",
	render: et
}), nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rt(e, t) {
	return b(), c("svg", nt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var it = m({
	name: "lucide-maximize-2",
	render: rt
}), at = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ot(e, t) {
	return b(), c("svg", at, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var st = m({
	name: "lucide-cast",
	render: ot
}), ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lt(e, t) {
	return b(), c("svg", ct, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), l("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var ut = m({
	name: "lucide-settings",
	render: lt
}), dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ft(e, t) {
	return b(), c("svg", dt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var pt = m({
	name: "lucide-gauge",
	render: ft
}), mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ht(e, t) {
	return b(), c("svg", mt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), l("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var gt = m({
	name: "lucide-film",
	render: ht
}), _t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vt(e, t) {
	return b(), c("svg", _t, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		l("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		l("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var yt = m({
	name: "lucide-image",
	render: vt
}), bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xt(e, t) {
	return b(), c("svg", bt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("path", { d: "M9 18V5l12-2v13" }),
		l("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		l("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var St = m({
	name: "lucide-music",
	render: xt
}), Ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wt(e, t) {
	return b(), c("svg", Ct, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "m17 2l-5 5l-5-5" }), l("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var Tt = m({
	name: "lucide-tv",
	render: wt
}), Et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dt(e, t) {
	return b(), c("svg", Et, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "m21 21l-4.34-4.34" }), l("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var Ot = m({
	name: "lucide-search",
	render: Dt
}), kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function At(e, t) {
	return b(), c("svg", kt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var jt = m({
	name: "lucide-sliders-horizontal",
	render: At
}), Mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nt(e, t) {
	return b(), c("svg", Mt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("path", { d: "M8 2v4m8-4v4" }),
		l("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		l("path", { d: "M3 10h18" })
	], -1)]]);
}
var Pt = m({
	name: "lucide-calendar",
	render: Nt
}), Ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function It(e, t) {
	return b(), c("svg", Ft, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Lt = m({
	name: "lucide-arrow-up-down",
	render: It
}), Rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zt(e, t) {
	return b(), c("svg", Rt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var Bt = m({
	name: "lucide-star",
	render: zt
}), Vt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ht(e, t) {
	return b(), c("svg", Vt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var Ut = m({
	name: "lucide-list",
	render: Ht
}), Wt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gt(e, t) {
	return b(), c("svg", Wt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var Kt = m({
	name: "lucide-plus",
	render: Gt
}), qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jt(e, t) {
	return b(), c("svg", qt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var Yt = m({
	name: "lucide-info",
	render: Jt
}), Xt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zt(e, t) {
	return b(), c("svg", Xt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Qt = m({
	name: "lucide-x",
	render: Zt
}), $t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function en(e, t) {
	return b(), c("svg", $t, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var tn = m({
	name: "lucide-check",
	render: en
}), nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rn(e, t) {
	return b(), c("svg", nn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var an = m({
	name: "lucide-bookmark",
	render: rn
}), on = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sn(e, t) {
	return b(), c("svg", on, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var cn = m({
	name: "lucide-bookmark-plus",
	render: sn
}), ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function un(e, t) {
	return b(), c("svg", ln, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var dn = m({
	name: "lucide-heart",
	render: un
}), fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pn(e, t) {
	return b(), c("svg", fn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), l("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var mn = m({
	name: "lucide-user",
	render: pn
}), hn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gn(e, t) {
	return b(), c("svg", hn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var _n = m({
	name: "lucide-log-out",
	render: gn
}), vn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yn(e, t) {
	return b(), c("svg", vn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var bn = m({
	name: "lucide-menu",
	render: yn
}), xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sn(e, t) {
	return b(), c("svg", xn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		l("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		l("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var Cn = m({
	name: "lucide-more-horizontal",
	render: Sn
}), wn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tn(e, t) {
	return b(), c("svg", wn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), l("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var En = m({
	name: "lucide-eye",
	render: Tn
}), Dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function On(e, t) {
	return b(), c("svg", Dn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), l("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var kn = m({
	name: "lucide-eye-off",
	render: On
}), An = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jn(e, t) {
	return b(), c("svg", An, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Mn = m({
	name: "lucide-arrow-left",
	render: jn
}), Nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pn(e, t) {
	return b(), c("svg", Nn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Fn = m({
	name: "lucide-arrow-right",
	render: Pn
}), In = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ln(e, t) {
	return b(), c("svg", In, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var Rn = m({
	name: "lucide-arrow-up",
	render: Ln
}), zn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bn(e, t) {
	return b(), c("svg", zn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var Vn = m({
	name: "lucide-arrow-down",
	render: Bn
}), Hn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Un(e, t) {
	return b(), c("svg", Hn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var Wn = m({
	name: "lucide-chevron-down",
	render: Un
}), Gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kn(e, t) {
	return b(), c("svg", Gn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var qn = m({
	name: "lucide-chevron-up",
	render: Kn
}), Jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yn(e, t) {
	return b(), c("svg", Jn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Xn = m({
	name: "lucide-chevron-left",
	render: Yn
}), Zn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qn(e, t) {
	return b(), c("svg", Zn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var $n = m({
	name: "lucide-chevron-right",
	render: Qn
}), er = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tr(e, t) {
	return b(), c("svg", er, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var nr = m({
	name: "lucide-loader-circle",
	render: tr
}), rr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ir(e, t) {
	return b(), c("svg", rr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var ar = m({
	name: "lucide-circle-alert",
	render: ir
}), or = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sr(e, t) {
	return b(), c("svg", or, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var cr = m({
	name: "lucide-circle-check",
	render: sr
}), lr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ur(e, t) {
	return b(), c("svg", lr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var dr = m({
	name: "lucide-circle-x",
	render: ur
}), fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pr(e, t) {
	return b(), c("svg", fr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), l("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var mr = m({
	name: "lucide-sun",
	render: pr
}), hr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gr(e, t) {
	return b(), c("svg", hr, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var _r = m({
	name: "lucide-moon",
	render: gr
}), vr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yr(e, t) {
	return b(), c("svg", vr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), l("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var br = m({
	name: "lucide-monitor",
	render: yr
}), q = /* @__PURE__ */ f({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = {
			play: ge,
			pause: ye,
			"skip-back": Se,
			"skip-forward": Te,
			rewind: Oe,
			forward: je,
			volume: Pe,
			"volume-low": Le,
			mute: Be,
			captions: Ue,
			pip: Ke,
			theater: Ye,
			fullscreen: Qe,
			"fullscreen-exit": tt,
			expand: it,
			cast: st,
			settings: ut,
			speed: pt,
			film: gt,
			image: yt,
			music: St,
			tv: Tt,
			search: Ot,
			filter: jt,
			calendar: Pt,
			sort: Lt,
			star: Bt,
			list: Ut,
			plus: Kt,
			info: Yt,
			x: Qt,
			check: tn,
			bookmark: an,
			"bookmark-plus": cn,
			heart: dn,
			user: mn,
			"log-out": _n,
			menu: bn,
			more: Cn,
			eye: En,
			"eye-off": kn,
			"arrow-left": Mn,
			"arrow-right": Fn,
			"arrow-up": Rn,
			"arrow-down": Vn,
			"chevron-down": Wn,
			"chevron-up": qn,
			"chevron-left": Xn,
			"chevron-right": $n,
			spinner: nr,
			alert: ar,
			success: cr,
			error: dr,
			sun: mr,
			moon: _r,
			monitor: br
		}, n = e, r = i(() => t[n.name]), a = i(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (t, n) => (b(), o(E(r.value), {
			class: "phlix-icon",
			style: _(a.value ? { fontSize: a.value } : void 0),
			"stroke-width": e.strokeWidth,
			role: e.label ? "img" : void 0,
			"aria-label": e.label,
			"aria-hidden": e.label ? void 0 : "true",
			focusable: "false"
		}, null, 8, [
			"style",
			"stroke-width",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
}), xr = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], Sr = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "IconButton",
	props: {
		name: {},
		label: {},
		variant: { default: "ghost" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		pressed: {
			type: Boolean,
			default: void 0
		}
	},
	setup(e) {
		let t = e, n = i(() => t.disabled || t.loading);
		return (t, r) => (b(), c("button", {
			type: e.type,
			class: g(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [d(q, {
			name: e.loading ? "spinner" : e.name,
			class: g({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, xr));
	}
}), [["__scopeId", "data-v-fc0cd545"]]), Cr = { class: "phlix-kbd" }, wr = {
	key: 1,
	class: "phlix-kbd__key"
}, Tr = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Kbd",
	props: { keys: {} },
	setup(t) {
		let n = t, r = i(() => n.keys === void 0 ? [] : Array.isArray(n.keys) ? n.keys : [n.keys]);
		return (t, n) => (b(), c("span", Cr, [r.value.length ? (b(!0), c(e, { key: 0 }, C(r.value, (e, t) => (b(), c("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, D(e), 1))), 128)) : (b(), c("kbd", wr, [w(t.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), Er = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Dr = 0, Or = "";
function kr() {
	Dr === 0 && (Or = document.body.style.overflow, document.body.style.overflow = "hidden"), Dr++;
}
function Ar() {
	Dr !== 0 && (Dr--, Dr === 0 && (document.body.style.overflow = Or));
}
function jr(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(Er)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function s(r) {
		if (!t.value || !e.value) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = o();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let a = i[0], s = i[i.length - 1], c = document.activeElement;
		e.value.contains(c) ? r.shiftKey && c === a ? (r.preventDefault(), s.focus()) : !r.shiftKey && c === s && (r.preventDefault(), a.focus()) : (r.preventDefault(), a.focus());
	}
	function c() {
		i = document.activeElement, r && (kr(), a = !0), document.addEventListener("keydown", s, !0), h(() => {
			(o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		document.removeEventListener("keydown", s, !0), a &&= (Ar(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	P(t, (e) => e ? c() : l(), { immediate: !0 }), v(() => {
		document.removeEventListener("keydown", s, !0), a &&= (Ar(), !1);
	});
}
//#endregion
//#region src/stores/useCommandStore.ts
var Mr = "phlix.cmd.recents", Nr = 8;
function Pr(e, t) {
	let n = e.toLowerCase(), r = t.toLowerCase();
	if (n.length === 0) return 0;
	if (n.length > r.length) return -1;
	let i = 0, a = 0, o = -2, s = 0;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], c = -1;
		for (let e = a; e < r.length; e++) if (r[e] === t) {
			c = e;
			break;
		}
		if (c === -1) return -1;
		i += 1, c === o + 1 ? (s++, i += 5 + s * 2) : s = 0;
		let l = c === 0 ? "" : r[c - 1];
		if ((c === 0 || l === " " || l === "-" || l === "/" || l === ":") && (i += 8), o >= 0) {
			let e = c - o - 1;
			e > 0 && (i -= Math.min(e, 4));
		}
		o = c, a = c + 1;
	}
	return r.startsWith(n) && (i += 15), i;
}
function Fr(e, t) {
	if (!e.trim()) return 0;
	let n = Pr(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, Pr(e, n));
	return t.group && (r = Math.max(r, Pr(e, t.group))), r;
}
function Ir() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(Mr);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, Nr) : [];
	} catch {
		return [];
	}
}
var Lr = V("phlix-commands", () => {
	let e = S(/* @__PURE__ */ new Map()), t = S(!1), n = S(""), r = S(Ir()), a = i(() => Array.from(e.value.values())), o = i(() => {
		let t = n.value.trim(), i = a.value;
		if (t) return i.map((e) => ({
			c: e,
			s: Fr(t, e)
		})).filter((e) => e.s >= 0).sort((e, t) => t.s - e.s || (e.c.priority ?? 0) - (t.c.priority ?? 0) || e.c.title.localeCompare(t.c.title)).map((e) => e.c);
		let o = r.value.map((t) => e.value.get(t)).filter((e) => !!e), s = new Set(o.map((e) => e.id)), c = i.filter((e) => !s.has(e.id)).sort((e, t) => (e.priority ?? 0) - (t.priority ?? 0) || e.title.localeCompare(t.title));
		return [...o, ...c];
	});
	function s(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.set(e.id, e);
		return e.value = r, () => c(n.map((e) => e.id));
	}
	function c(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.delete(e);
		e.value = r;
	}
	function l(e) {
		return r.value.includes(e);
	}
	function u(e) {
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, Nr);
	}
	function d() {
		r.value = [];
	}
	function f(e) {
		n.value = e;
	}
	function p() {
		n.value = "", t.value = !0;
	}
	function m() {
		t.value = !1;
	}
	function h() {
		t.value ? m() : p();
	}
	async function g(t) {
		let n = e.value.get(t);
		n && (u(t), m(), await n.run());
	}
	return P(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Mr, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		registry: e,
		open: t,
		query: n,
		recentIds: r,
		all: a,
		results: o,
		register: s,
		unregister: c,
		isRecent: l,
		pushRecent: u,
		clearRecents: d,
		setQuery: f,
		openPalette: p,
		closePalette: m,
		togglePalette: h,
		runId: g
	};
}), Rr = {
	theme: "nocturne",
	accent: null,
	density: "comfortable",
	cardSize: 180,
	gridDensity: "comfy",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	atmosphere: !0,
	filterPresets: []
};
function zr(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var Br = "phlix.prefs";
function Vr() {
	if (typeof localStorage > "u") return { ...Rr };
	try {
		let e = localStorage.getItem(Br);
		if (!e) return { ...Rr };
		let t = JSON.parse(e);
		return {
			...Rr,
			...t
		};
	} catch {
		return { ...Rr };
	}
}
function Hr() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(Br) !== null;
	} catch {
		return !1;
	}
}
function Ur() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var J = V("phlix-prefs", () => {
	let e = Vr(), t = S(e.theme), n = S(e.accent), r = S(e.density), a = S(e.cardSize), o = S(e.gridDensity), s = S(e.reducedMotion), c = S(e.autoplay), l = S(e.defaultVolume), u = S(e.defaultQuality), d = S(e.defaultSubtitleLang), f = S(e.atmosphere), p = S(e.filterPresets ? [...e.filterPresets] : []), m = S(Ur()), h = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (h = window.matchMedia("(prefers-reduced-motion: reduce)"), h.addEventListener?.("change", (e) => m.value = e.matches));
	let g = i(() => s.value === "on" ? !0 : s.value === "off" ? !1 : m.value);
	function _() {
		return {
			theme: t.value,
			accent: n.value,
			density: r.value,
			cardSize: a.value,
			gridDensity: o.value,
			reducedMotion: s.value,
			autoplay: c.value,
			defaultVolume: l.value,
			defaultQuality: u.value,
			defaultSubtitleLang: d.value,
			atmosphere: f.value,
			filterPresets: p.value
		};
	}
	function v(e, t) {
		let n = {
			id: zr(e),
			name: e.trim(),
			query: t
		}, r = p.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? p.value.splice(r, 1, n) : p.value.push(n), n;
	}
	function y(e) {
		p.value = p.value.filter((t) => t.id !== e);
	}
	P(_, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Br, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = Rr;
		t.value = e.theme, n.value = e.accent, r.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.reducedMotion, c.value = e.autoplay, l.value = e.defaultVolume, u.value = e.defaultQuality, d.value = e.defaultSubtitleLang, f.value = e.atmosphere, p.value = [...e.filterPresets];
	}
	return {
		theme: t,
		accent: n,
		density: r,
		cardSize: a,
		gridDensity: o,
		reducedMotion: s,
		autoplay: c,
		defaultVolume: l,
		defaultQuality: u,
		defaultSubtitleLang: d,
		atmosphere: f,
		filterPresets: p,
		systemReduced: m,
		effectiveReducedMotion: g,
		snapshot: _,
		saveFilterPreset: v,
		removeFilterPreset: y,
		reset: b
	};
}), Wr = { class: "phlix-cmdk__search" }, Gr = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], Kr = ["id"], qr = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, Jr = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], Yr = { class: "phlix-cmdk__option-body" }, Xr = { class: "phlix-cmdk__option-title" }, Zr = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, Qr = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, $r = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "CommandPalette",
	setup(r) {
		let a = Lr(), u = G(), f = J(), m = S(null), h = A(), _ = S(0);
		function x(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => a.runId(e.id)
			};
		}
		function w(e) {
			return {
				id: "__search",
				title: `Search library for “${e}”`,
				icon: "search",
				run: () => {
					a.closePalette(), u.push({
						name: "browse",
						query: { search: e }
					});
				}
			};
		}
		let T = i(() => {
			let e = [], t = [], n = (n) => {
				e.push({
					kind: "option",
					item: n,
					index: t.length
				}), t.push(n);
			}, r = a.query.trim();
			if (r) {
				for (let e of a.results) n(x(e));
				return n(w(r)), {
					rows: e,
					options: t
				};
			}
			let i = a.results.filter((e) => a.isRecent(e.id));
			i.length && (e.push({
				kind: "header",
				label: "Recent"
			}), i.forEach((e) => n(x(e))));
			let o = /* @__PURE__ */ new Map();
			for (let e of a.results) {
				if (a.isRecent(e.id)) continue;
				let t = e.group ?? "Commands", n = o.get(t);
				n ? n.push(e) : o.set(t, [e]);
			}
			for (let [t, r] of o) e.push({
				kind: "header",
				label: t
			}), r.forEach((e) => n(x(e)));
			return {
				rows: e,
				options: t
			};
		}), E = i(() => T.value.options.length), O = i(() => E.value ? `${h}-opt-${_.value}` : void 0);
		P(() => a.query, () => {
			_.value = 0;
		}), P(E, (e) => {
			_.value > e - 1 && (_.value = Math.max(0, e - 1));
		}), P(() => a.open, (e) => {
			e && (_.value = 0);
		});
		function j() {
			typeof document > "u" || document.getElementById(`${h}-opt-${_.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function M(e) {
			let t = E.value;
			t && (_.value = (_.value + e + t) % t, j());
		}
		function N() {
			let e = T.value.options[_.value];
			e && e.run();
		}
		function F(e) {
			e.run();
		}
		function L(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), M(1);
					break;
				case "ArrowUp":
					e.preventDefault(), M(-1);
					break;
				case "Home":
					e.preventDefault(), _.value = 0, j();
					break;
				case "End":
					e.preventDefault(), _.value = Math.max(0, E.value - 1), j();
					break;
				case "Enter":
					e.preventDefault(), N();
					break;
			}
		}
		function R() {
			a.closePalette();
		}
		jr(m, i(() => a.open), { onEscape: () => (a.closePalette(), !0) });
		function B(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), a.togglePalette());
		}
		let V = p("phlixCommands", []), H = [
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
					u.push({ name: "browse" });
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
					u.push({ name: "settings" });
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
					f.theme = "nocturne";
				}
			},
			{
				id: "theme.daylight",
				title: "Theme: Daylight",
				icon: "sun",
				group: "Theme",
				keywords: ["light", "bright"],
				run: () => {
					f.theme = "daylight";
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
					f.theme = "midnight";
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
					f.density = f.density === "compact" ? "comfortable" : "compact";
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
					f.reducedMotion = f.reducedMotion === "off" ? "auto" : "off";
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
					f.atmosphere = !f.atmosphere;
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
				run: () => f.reset()
			}
		], U = null;
		return y(() => {
			U = a.register([...H, ...V]), document.addEventListener("keydown", B);
		}), v(() => {
			U?.(), document.removeEventListener("keydown", B);
		}), (r, i) => (b(), o(t, { to: "body" }, [d(n, { name: "phlix-cmdk" }, {
			default: I(() => [k(a).open ? (b(), c("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: z(R, ["self"])
			}, [l("div", {
				ref_key: "panelEl",
				ref: m,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [l("div", Wr, [
				d(q, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				l("input", {
					value: k(a).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": k(h),
					"aria-activedescendant": O.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: i[0] ||= (e) => k(a).setQuery(e.target.value),
					onKeydown: L
				}, null, 40, Gr),
				d(Tr, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), l("ul", {
				id: k(h),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(b(!0), c(e, null, C(T.value.rows, (t, n) => (b(), c(e, { key: t.kind === "header" ? `h-${t.label}-${n}` : t.item.id }, [t.kind === "header" ? (b(), c("li", qr, D(t.label), 1)) : (b(), c("li", {
				key: 1,
				id: `${k(h)}-opt-${t.index}`,
				class: g(["phlix-cmdk__option", { "is-active": t.index === _.value }]),
				role: "option",
				"aria-selected": t.index === _.value,
				onClick: (e) => F(t.item),
				onPointermove: (e) => _.value = t.index
			}, [
				d(q, {
					name: t.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				l("span", Yr, [l("span", Xr, D(t.item.title), 1), t.item.subtitle ? (b(), c("span", Zr, D(t.item.subtitle), 1)) : s("", !0)]),
				t.item.shortcut ? (b(), o(Tr, {
					key: 0,
					keys: t.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : s("", !0)
			], 42, Jr))], 64))), 128)), E.value ? s("", !0) : (b(), c("li", Qr, " No matching commands "))], 8, Kr)], 512)], 32)) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]);
//#endregion
//#region src/composables/color.ts
function ei(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var ti = (e) => Math.max(0, Math.min(255, Math.round(e))), ni = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => ti(e).toString(16).padStart(2, "0")).join("");
function ri(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function ii(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var ai = ({ r: e, g: t, b: n }, r) => `rgba(${ti(e)}, ${ti(t)}, ${ti(n)}, ${r})`;
function oi({ r: e, g: t, b: n }) {
	let r = [
		e,
		t,
		n
	].map((e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * r[0] + .7152 * r[1] + .0722 * r[2];
}
function si(e) {
	let t = ei(e);
	if (!t) return null;
	let n = oi(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": ni(t),
		"--accent-hover": ni(ri(t, .12)),
		"--accent-active": ni(ii(t, .12)),
		"--accent-soft": ai(t, .14),
		"--accent-ring": ai(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var ci = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function li(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? si(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of ci) n.style.removeProperty(e);
}
function ui(e) {
	let t = Vr();
	e && !Hr() && (t.theme = e), li(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function di() {
	let e = J();
	return F(() => {
		li({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var fi = ["src", "alt"], pi = { class: "brand-wordmark" }, mi = {
	key: 1,
	class: "brand-tagline"
}, hi = { class: "main-nav" }, gi = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "PhlixApp",
	setup(t) {
		di();
		let n = Lr(), r = p("phlixConfig", null), a = i(() => r?.branding ?? {}), f = i(() => a.value.wordmark ?? "Phlix"), m = i(() => r?.menu ?? []), h = i(() => r?.routerBase ?? "/app");
		function g(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (t, r) => (b(), o(pe, null, {
			logo: I(() => [d(k(H), {
				to: h.value,
				class: "brand"
			}, {
				default: I(() => [
					a.value.logoSrc ? (b(), c("img", {
						key: 0,
						src: a.value.logoSrc,
						alt: a.value.logoAlt ?? f.value,
						class: "brand-logo"
					}, null, 8, fi)) : s("", !0),
					l("span", pi, D(f.value), 1),
					a.value.tagline ? (b(), c("span", mi, D(a.value.tagline), 1)) : s("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: I(() => [l("nav", hi, [m.value.length ? (b(!0), c(e, { key: 0 }, C(m.value, (e) => (b(), o(E(e.href ? "a" : k(H)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? g(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: I(() => [e.icon ? (b(), o(q, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : s("", !0), u(" " + D(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (b(), c(e, { key: 1 }, [d(k(H), {
				to: h.value,
				class: "nav-link"
			}, {
				default: I(() => [...r[1] ||= [u("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), d(k(H), {
				to: `${h.value}/settings`,
				class: "nav-link"
			}, {
				default: I(() => [...r[2] ||= [u("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64)), d(Sr, {
				name: "search",
				label: "Open command palette (⌘K)",
				size: "sm",
				class: "nav-cmdk",
				onClick: r[0] ||= (e) => k(n).openPalette()
			})])]),
			default: I(() => [d(k(U)), d($r)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-78cfb9e9"]]), _i = { class: "phlix-placeholder" }, vi = { class: "placeholder-content" }, yi = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (b(), c("div", _i, [l("div", vi, [n[0] ||= l("h1", null, "Shared UI loading...", -1), l("p", null, "Phlix " + D(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), bi = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
};
function xi(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
var Y = class {
	baseUrl;
	tokens;
	doFetch;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? {
			getAccessToken: () => null,
			setAccessToken: () => {},
			getRefreshToken: () => null,
			setRefreshToken: () => {},
			getUser: () => null,
			setUser: () => {},
			clear: () => {}
		}, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis);
	}
	async request(e, t, n = null, r) {
		let i = () => {
			let t = { "Content-Type": "application/json" }, i = this.tokens.getAccessToken();
			i && (t.Authorization = `Bearer ${i}`);
			let a = {
				method: e,
				headers: t,
				credentials: "same-origin"
			};
			return r && (a.signal = r), n !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (a.body = JSON.stringify(n)), a;
		}, a = `${this.baseUrl}${t}`, o = await this.doFetch(a, i());
		return o.status === 401 && await this.refreshToken() && (o = await this.doFetch(a, i())), this.handleResponse(o);
	}
	async handleResponse(e) {
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new bi(this.extractError(t), e.status, t);
		return t;
	}
	extractError(e) {
		if (e && typeof e == "object") {
			let t = e;
			if (typeof t.error == "string") return t.error;
			if (typeof t.message == "string") return t.message;
		}
		return "Request failed";
	}
	async refreshToken() {
		let e = this.tokens.getRefreshToken();
		if (!e) return !1;
		try {
			let t = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({ refresh_token: e })
			});
			if (!t.ok) return !1;
			let n = await t.json();
			return typeof n.access_token == "string" ? (this.tokens.setAccessToken(n.access_token), typeof n.refresh_token == "string" && this.tokens.setRefreshToken(n.refresh_token), !0) : !1;
		} catch {
			return !1;
		}
	}
	async get(e, t, n) {
		let r = t ? "?" + new URLSearchParams(t).toString() : "";
		return this.request("GET", e + r, null, n);
	}
	async post(e, t) {
		return this.request("POST", e, t ?? null);
	}
	async put(e, t) {
		return this.request("PUT", e, t ?? null);
	}
	async patch(e, t) {
		return this.request("PATCH", e, t ?? null);
	}
	async delete(e) {
		return this.request("DELETE", e);
	}
	isLoggedIn() {
		return this.tokens.getAccessToken() !== null;
	}
	async getCurrentUser() {
		let { user: e } = await this.get("/api/v1/auth/me");
		return {
			...e,
			is_admin: xi(e.is_admin)
		};
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
	}
}, X = new Y(), Si = 6e4, Ci = 250;
function wi(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var Ti = V("media", () => {
	let e = S([]), t = S(0), n = S(!1), r = S(null), a = S(""), o = S([]), s = S(void 0), c = S(void 0), l = S([]), u = S([]), d = S("name"), f = S("asc"), p = S(24), m = S(0), h = i(() => e.value.length < t.value), g = i(() => {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = i(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), v = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], y = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function b(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function x(e, t) {
		return `${e}/api/v1/media?${b(t).toString()}`;
	}
	function C(e) {
		return b(e).toString();
	}
	let w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = null, D = null, O;
	function k(e) {
		return !!e && Date.now() - e.ts < Si;
	}
	function A(e, t, n, r) {
		r && (D && n !== E && D.abort(), E = n);
		let i = T.get(n);
		if (i) return r && (D = i.controller), i.promise;
		let a = new AbortController();
		r && (D = a);
		let o = new Y({ baseUrl: e }).get(x(e, t), void 0, a.signal).then((e) => (w.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			T.delete(n);
		});
		return T.set(n, {
			promise: o,
			controller: a
		}), o;
	}
	function j(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total;
	}
	async function M(e, t = !1) {
		let i = { ...g.value }, a = C(i), o = w.get(a);
		if (k(o)) {
			j(o, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await A(e, i, a, !t);
			if (!t && a !== E) return;
			j(n, t);
		} catch (e) {
			if (wi(e)) return;
			(t || a === E) && (r.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === E) && (n.value = !1);
		}
	}
	function N(e, t = Ci) {
		m.value = 0, clearTimeout(O), O = setTimeout(() => M(e, !1), t);
	}
	async function P(t) {
		n.value || !h.value || (m.value = e.value.length, await M(t, !0));
	}
	async function F(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = C(n);
		if (!k(w.get(r))) try {
			await A(e, n, r, !1);
		} catch {}
	}
	function I() {
		w.clear();
	}
	function L() {
		clearTimeout(O);
	}
	function R() {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function z(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function B(e) {
		a.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = z(e.genres), l.value = z(e.ratings), u.value = z(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = i ?? "asc", m.value = 0;
	}
	function V() {
		e.value = [], t.value = 0, m.value = 0, r.value = null;
	}
	function H(e) {
		a.value = e, m.value = 0;
	}
	function U(e) {
		o.value = e, m.value = 0;
	}
	function ee(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function te(e) {
		l.value = e, m.value = 0;
	}
	function W(e) {
		u.value = e, m.value = 0;
	}
	function G(e, t) {
		d.value = e, t && (f.value = t), m.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: r,
		search: a,
		selectedGenres: o,
		yearFrom: s,
		yearTo: c,
		selectedRatings: l,
		selectedTypes: u,
		sort: d,
		order: f,
		limit: p,
		offset: m,
		hasMore: h,
		queryParams: g,
		availableGenres: _,
		availableRatings: v,
		availableTypes: y,
		fetchMedia: M,
		scheduleFetch: N,
		loadMore: P,
		prefetch: F,
		clearCache: I,
		cancelScheduled: L,
		toQuery: R,
		applyQuery: B,
		reset: V,
		setSearch: H,
		setGenres: U,
		setYearRange: ee,
		setRatings: te,
		setTypes: W,
		setSort: G
	};
}), Ei = 30, Di = .95, Oi = 5e3, ki = "phlix.resume";
function Ai() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(ki);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Z = V("phlix-player", () => {
	let e = J(), t = S(null), n = S([]), r = S(!1), a = S(0), o = S(0), s = S(0), c = S(e.defaultVolume), l = S(!1), u = S(1), d = S(e.defaultQuality), f = S(e.defaultSubtitleLang), p = S(!1), m = S(Ai()), h = i(() => o.value > 0 ? a.value / o.value : 0), g = i(() => n.value[0] ?? null), _, v = 0;
	function y(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			v = Date.now();
			try {
				localStorage.setItem(ki, JSON.stringify(m.value));
			} catch {}
		}, n = Date.now() - v;
		clearTimeout(_), e || n >= Oi ? t() : _ = setTimeout(t, Oi - n);
	}
	function b(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function x(e, t, n) {
		b(t, n) ? m.value[e] = Math.floor(t) : delete m.value[e], y();
	}
	function C(e) {
		return e ? m.value[e] ?? null : null;
	}
	function w(e) {
		delete m.value[e], y(!0);
	}
	function T(e, n = {}) {
		t.value = e, n.resetPosition !== !1 && (a.value = 0, o.value = 0, s.value = 0), B(e);
	}
	function E(e, n, r) {
		a.value = e, n !== void 0 && (o.value = n), r !== void 0 && (s.value = r), t.value && x(t.value.id, e, o.value);
	}
	function D() {
		r.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function O() {
		r.value = !1, t.value && x(t.value.id, a.value, o.value), y(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function k(e) {
		c.value = Math.min(1, Math.max(0, e)), c.value > 0 && (l.value = !1);
	}
	function A() {
		l.value = !l.value;
	}
	function j(e) {
		u.value = e;
	}
	function M(e) {
		d.value = e;
	}
	function N(e) {
		f.value = e;
	}
	function P(e) {
		n.value = [...e];
	}
	function F(e) {
		n.value.push(e);
	}
	function I() {
		let e = n.value.shift() ?? null;
		return e && T(e), e;
	}
	function L() {
		p.value = !0;
	}
	function R() {
		p.value = !1;
	}
	function z() {
		t.value && x(t.value.id, a.value, o.value), y(!0), r.value = !1, p.value = !1, t.value = null;
	}
	function B(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function V(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return () => {};
		let t = navigator.mediaSession, n = (e, n) => {
			try {
				t.setActionHandler(e, n);
			} catch {}
		};
		return e.onPlay && n("play", e.onPlay), e.onPause && n("pause", e.onPause), e.onNext && n("nexttrack", e.onNext), e.onPrevious && n("previoustrack", e.onPrevious), e.onSeek && n("seekto", (t) => e.onSeek?.(t.seekTime ?? 0)), () => {
			for (let e of [
				"play",
				"pause",
				"nexttrack",
				"previoustrack",
				"seekto"
			]) n(e, null);
		};
	}
	function H() {
		c.value = e.defaultVolume, d.value = e.defaultQuality, f.value = e.defaultSubtitleLang;
	}
	return {
		current: t,
		queue: n,
		playing: r,
		position: a,
		duration: o,
		buffered: s,
		volume: c,
		muted: l,
		rate: u,
		quality: d,
		subtitleLang: f,
		miniPlayer: p,
		resumeMap: m,
		progress: h,
		upNext: g,
		inResumeBand: b,
		saveResume: x,
		resumePositionFor: C,
		clearResume: w,
		setCurrent: T,
		updateProgress: E,
		play: D,
		pause: O,
		setVolume: k,
		toggleMute: A,
		setRate: j,
		setQuality: M,
		setSubtitle: N,
		setQueue: P,
		enqueue: F,
		next: I,
		showMiniPlayer: L,
		hideMiniPlayer: R,
		closePlayer: z,
		setMediaSessionMetadata: B,
		bindMediaSession: V,
		seedFromPreferences: H
	};
}), ji = V("phlix-toast", () => {
	let e = S([]), t = /* @__PURE__ */ new Map(), n = 0;
	function r(n) {
		let r = t.get(n);
		r && (clearTimeout(r), t.delete(n)), e.value = e.value.filter((e) => e.id !== n);
	}
	function i(i) {
		let a = ++n, o = {
			tone: "neutral",
			duration: 5e3,
			...i,
			id: a
		};
		return e.value.push(o), o.duration > 0 && t.set(a, setTimeout(() => r(a), o.duration)), a;
	}
	function a() {
		t.forEach((e) => clearTimeout(e)), t.clear(), e.value = [];
	}
	return {
		toasts: e,
		show: i,
		dismiss: r,
		clear: a,
		success: (e, t) => i({
			message: e,
			tone: "success",
			...t
		}),
		error: (e, t) => i({
			message: e,
			tone: "error",
			duration: 8e3,
			...t
		}),
		warning: (e, t) => i({
			message: e,
			tone: "warning",
			...t
		}),
		info: (e, t) => i({
			message: e,
			tone: "info",
			...t
		})
	};
}), Mi = { class: "media-card" }, Ni = { class: "media-card__poster" }, Pi = ["href", "aria-label"], Fi = { class: "visually-hidden" }, Ii = ["src", "alt"], Li = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Ri = { class: "media-card__badges" }, zi = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Bi = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Vi = ["aria-valuenow", "aria-label"], Hi = { class: "media-card__overlay" }, Ui = { class: "media-card__title" }, Wi = { class: "media-card__meta" }, Gi = {
	key: 0,
	class: "numeric"
}, Ki = {
	key: 1,
	class: "media-card__dot"
}, qi = {
	key: 2,
	class: "media-card__cert"
}, Ji = {
	key: 3,
	class: "media-card__dot"
}, Yi = {
	key: 4,
	class: "numeric"
}, Xi = {
	key: 0,
	class: "media-card__genres"
}, Zi = { class: "media-card__actions" }, Qi = { class: "media-card__caption" }, $i = ["title"], ea = { class: "media-card__caption-sub numeric" }, ta = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 }
	},
	emits: [
		"play",
		"watchlist",
		"info"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, o = Z(), f = i(() => r.to ?? `/app/player/${r.item.id}`), p = S(!1), m = S(null);
		function h() {
			p.value = !0;
		}
		y(() => {
			m.value?.complete && (p.value = !0);
		});
		let v = i(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), x = i(() => {
			let e = o.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), T = i(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (b(), c("article", Mi, [l("div", Ni, [
			l("a", {
				href: f.value,
				class: "media-card__link",
				"aria-label": t.item.name
			}, [l("span", Fi, D(t.item.name), 1)], 8, Pi),
			t.item.poster_url ? (b(), c("img", {
				key: 0,
				ref_key: "imgEl",
				ref: m,
				class: g(["media-card__img", { "is-loaded": p.value }]),
				src: t.item.poster_url,
				alt: t.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: h
			}, null, 42, Ii)) : (b(), c("div", Li, [d(q, { name: t.item.type === "audio" ? "music" : t.item.type === "image" ? "image" : t.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			l("div", Ri, [
				v.value ? (b(), c("span", zi, "New")) : s("", !0),
				w(n.$slots, "badges", { item: t.item }, void 0, !0),
				t.quality ? (b(), c("span", Bi, D(t.quality), 1)) : s("", !0)
			]),
			x.value > 0 ? (b(), c("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(x.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${t.item.name}`
			}, [l("i", { style: _({ width: `${x.value * 100}%` }) }, null, 4)], 8, Vi)) : s("", !0),
			l("div", Hi, [
				l("h3", Ui, D(t.item.name), 1),
				l("div", Wi, [
					t.item.year ? (b(), c("span", Gi, D(t.item.year), 1)) : s("", !0),
					t.item.year && (t.item.rating || t.item.runtime) ? (b(), c("span", Ki)) : s("", !0),
					t.item.rating ? (b(), c("span", qi, D(t.item.rating), 1)) : s("", !0),
					t.item.rating && t.item.runtime ? (b(), c("span", Ji)) : s("", !0),
					t.item.runtime ? (b(), c("span", Yi, D(t.item.runtime) + "m", 1)) : s("", !0)
				]),
				T.value.length ? (b(), c("div", Xi, [(b(!0), c(e, null, C(T.value, (e) => (b(), c("span", { key: e }, D(e), 1))), 128))])) : s("", !0),
				l("div", Zi, [
					l("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= (e) => a("play", t.item)
					}, [d(q, { name: "play" })]),
					l("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: r[1] ||= (e) => a("watchlist", t.item)
					}, [d(q, { name: "bookmark-plus" })]),
					l("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= (e) => a("info", t.item)
					}, [d(q, { name: "info" })]),
					w(n.$slots, "actions", { item: t.item }, void 0, !0)
				])
			])
		]), l("div", Qi, [l("div", {
			class: "media-card__caption-title",
			title: t.item.name
		}, D(t.item.name), 9, $i), l("div", ea, [
			t.item.year ? (b(), c(e, { key: 0 }, [u(D(t.item.year), 1)], 64)) : s("", !0),
			t.item.year && t.item.runtime ? (b(), c(e, { key: 1 }, [u(" · ")], 64)) : s("", !0),
			t.item.runtime ? (b(), c(e, { key: 2 }, [u(D(t.item.runtime) + "m", 1)], 64)) : s("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), na = 3 / 2;
function ra(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function ia(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function aa(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * na + t + n;
}
function oa(e) {
	let { scrollTop: t, viewportHeight: n, rowHeight: r, columns: i, itemCount: a, overscan: o } = e, s = Math.max(1, i), c = Math.ceil(a / s), l = c * r;
	if (c === 0 || r <= 0) return {
		startRow: 0,
		endRow: c,
		startIndex: 0,
		endIndex: a,
		rowCount: c,
		padTop: 0,
		totalHeight: l
	};
	let u = Math.floor(Math.max(0, t) / r), d = Math.ceil(Math.max(0, n) / r) + 1, f = Math.max(0, u - o), p = Math.min(c, u + d + o);
	return {
		startRow: f,
		endRow: p,
		startIndex: f * s,
		endIndex: Math.min(a, p * s),
		rowCount: c,
		padTop: f * r,
		totalHeight: l
	};
}
//#endregion
//#region src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var sa = { class: "media-grid-root" }, ca = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, la = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, ua = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "MediaGrid",
	props: {
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingMore: {
			type: Boolean,
			default: !1
		},
		hasMore: {
			type: Boolean,
			default: !1
		},
		cardSize: {},
		skeletonCount: { default: 18 },
		overscan: { default: 2 }
	},
	emits: [
		"load-more",
		"play",
		"watchlist",
		"info"
	],
	setup(t, { emit: r }) {
		let a = t, o = r, f = J(), p = i(() => a.cardSize ?? f.cardSize ?? 180), m = S(null), g = S(null), x = S(0), T = S(0), E = S(0);
		function D() {
			let e = m.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (x.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (T.value = n), E.value = Math.max(0, -t.top);
		}
		let O = 0;
		function k() {
			O ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				O = 0, D();
			});
		}
		let A = i(() => ra(x.value, p.value, 20)), j = i(() => aa(ia(x.value, A.value, 20))), M = i(() => x.value > 0 && j.value > 0), N = i(() => oa({
			scrollTop: E.value,
			viewportHeight: T.value,
			rowHeight: j.value,
			columns: A.value,
			itemCount: a.items.length,
			overscan: a.overscan
		})), F = i(() => {
			if (!M.value) return a.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = N.value, n = [];
			for (let r = e; r < t; r++) n.push({
				item: a.items[r],
				index: r
			});
			return n;
		}), L = i(() => ({ gridTemplateColumns: M.value ? `repeat(${A.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${p.value}px, 1fr))` })), R = i(() => M.value ? { height: `${N.value.totalHeight}px` } : {}), z = i(() => M.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${N.value.padTop}px)`
		} : {}), B = i(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${p.value}px, 1fr))` })), V = i(() => M.value && E.value > T.value * 1.5);
		function H() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let U = null;
		function ee() {
			U || typeof IntersectionObserver > "u" || (U = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && a.hasMore && !a.loading && !a.loadingMore && o("load-more");
			}, { rootMargin: "400px 0px" }), g.value && U.observe(g.value));
		}
		function te() {
			U?.disconnect(), U = null;
		}
		P(() => g.value, (e) => {
			te(), e && (ee(), k());
		});
		let W = null;
		function G() {
			W || typeof ResizeObserver > "u" || !m.value || (W = new ResizeObserver(k), W.observe(m.value));
		}
		function ne() {
			W?.disconnect(), W = null;
		}
		return P(() => m.value, (e) => {
			ne(), e && (G(), k());
		}), y(() => {
			D(), typeof window < "u" && (window.addEventListener("scroll", k, { passive: !0 }), window.addEventListener("resize", k, { passive: !0 })), G(), ee();
		}), v(() => {
			typeof window < "u" && (window.removeEventListener("scroll", k), window.removeEventListener("resize", k)), O &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(O) : clearTimeout(O), 0), ne(), te();
		}), P(() => a.items.length, () => h(k)), (r, i) => (b(), c("div", sa, [t.loading && t.items.length === 0 ? (b(), c("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: _(B.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(b(!0), c(e, null, C(t.skeletonCount, (e) => (b(), c("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...i[0] ||= [
			l("div", { class: "skel-poster" }, null, -1),
			l("div", { class: "skel-title" }, null, -1),
			l("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : t.items.length === 0 ? (b(), c("div", ca, [w(r.$slots, "empty", {}, () => [
			d(q, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			i[1] ||= l("p", { class: "media-grid-empty__title" }, "No media found", -1),
			i[2] ||= l("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (b(), c(e, { key: 2 }, [
			l("div", {
				ref_key: "sizerEl",
				ref: m,
				class: "media-grid-sizer",
				style: _(R.value)
			}, [l("div", {
				class: "media-grid",
				style: _([L.value, z.value])
			}, [(b(!0), c(e, null, C(F.value, (e) => w(r.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [d(ta, {
				item: e.item,
				onPlay: (t) => o("play", e.item),
				onWatchlist: (t) => o("watchlist", e.item),
				onInfo: (t) => o("info", e.item)
			}, null, 8, [
				"item",
				"onPlay",
				"onWatchlist",
				"onInfo"
			])], !0)), 128))], 4)], 4),
			t.loadingMore ? (b(), c("div", la, [...i[3] ||= [l("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), u(" Loading more… ", -1)]])) : s("", !0),
			t.hasMore && !t.loadingMore ? (b(), c("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: g,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : s("", !0)
		], 64)), d(n, { name: "media-grid-fade" }, {
			default: I(() => [V.value ? (b(), c("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: H
			}, [d(q, { name: "arrow-up" })])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), da = {
	class: "phlix-empty",
	role: "status"
}, fa = { class: "phlix-empty__icon" }, pa = { class: "phlix-empty__title" }, ma = {
	key: 0,
	class: "phlix-empty__desc"
}, ha = {
	key: 1,
	class: "phlix-empty__actions"
}, ga = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (b(), c("div", da, [
			l("span", fa, [d(q, { name: e.icon }, null, 8, ["name"])]),
			l("h3", pa, D(e.title), 1),
			e.description || t.$slots.default ? (b(), c("p", ma, [w(t.$slots, "default", {}, () => [u(D(e.description), 1)], !0)])) : s("", !0),
			t.$slots.actions ? (b(), c("div", ha, [w(t.$slots, "actions", {}, void 0, !0)])) : s("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]), _a = {
	key: 0,
	class: "phlix-skel-text",
	"aria-hidden": "true"
}, Q = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Skeleton",
	props: {
		variant: { default: "rect" },
		width: {},
		height: {},
		radius: {},
		lines: { default: 1 }
	},
	setup(t) {
		return (n, r) => t.variant === "text" ? (b(), c("div", _a, [(b(!0), c(e, null, C(t.lines, (e) => (b(), c("span", {
			key: e,
			class: "phlix-skel phlix-skel--text",
			style: _({ width: e === t.lines && t.lines > 1 ? "60%" : t.width })
		}, null, 4))), 128))])) : (b(), c("span", {
			key: 1,
			class: g(["phlix-skel", `phlix-skel--${t.variant}`]),
			"aria-hidden": "true",
			style: _({
				width: t.width,
				height: t.height,
				borderRadius: t.radius
			})
		}, null, 6));
	}
}), [["__scopeId", "data-v-c34e4066"]]), va = ["aria-label"], ya = { class: "media-row__head" }, ba = { class: "media-row__title" }, xa = {
	key: 0,
	class: "media-row__count numeric"
}, Sa = { class: "media-row__action" }, Ca = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, wa = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, Ta = { class: "media-row__skel-poster" }, Ea = ["aria-label"], Da = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "MediaRow",
	props: {
		title: {},
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		error: { default: null },
		count: { default: null },
		skeletonCount: { default: 6 },
		emptyText: {},
		hideWhenEmpty: {
			type: Boolean,
			default: !1
		},
		cardTo: {}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"retry"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => !r.loading && !r.error && r.items.length === 0), f = i(() => r.hideWhenEmpty && u.value);
		return (n, r) => f.value ? s("", !0) : (b(), c("section", {
			key: 0,
			class: "media-row",
			"aria-label": t.title
		}, [l("div", ya, [
			l("h2", ba, D(t.title), 1),
			t.count == null ? s("", !0) : (b(), c("span", xa, D(t.count.toLocaleString()), 1)),
			l("div", Sa, [w(n.$slots, "action", {}, void 0, !0)])
		]), t.error ? (b(), c("div", Ca, [l("span", null, D(t.error), 1), l("button", {
			type: "button",
			class: "media-row__retry",
			onClick: r[0] ||= (e) => a("retry")
		}, "Retry")])) : t.loading && t.items.length === 0 ? (b(), c("div", wa, [(b(!0), c(e, null, C(t.skeletonCount, (e) => (b(), c("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [l("div", Ta, [d(Q, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), d(Q, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : u.value ? (b(), o(ga, {
			key: 2,
			title: t.title,
			description: t.emptyText ?? "Nothing here yet."
		}, {
			default: I(() => [w(n.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (b(), c("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": t.title
		}, [(b(!0), c(e, null, C(t.items, (e) => (b(), c("li", {
			key: e.id,
			class: "media-row__cell"
		}, [d(ta, {
			item: e,
			to: t.cardTo ? t.cardTo(e) : void 0,
			onPlay: r[1] ||= (e) => a("play", e),
			onWatchlist: r[2] ||= (e) => a("watchlist", e),
			onInfo: r[3] ||= (e) => a("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, Ea))], 8, va));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function Oa(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres[]", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings[]", e)), e.types?.forEach((e) => t.append("types[]", e)), e.actors?.forEach((e) => t.append("actors[]", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function ka(e, t = {}) {
	return `${e}/api/v1/media?${Oa(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var Aa = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "HomeRow",
	props: {
		row: {},
		apiBase: {},
		limit: { default: 18 }
	},
	emits: [
		"items-loaded",
		"play",
		"watchlist",
		"info",
		"see-all"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = ji(), a = S([]), o = S(null), s = S(!1), u = S(null), f = S(!1), p = S(null), m = null, h = null, g = !1;
		function _(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function x() {
			if (!s.value) {
				s.value = !0, u.value = null, h = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new Y({ baseUrl: n.apiBase }), t = ka(n.apiBase, {
						...n.row.query,
						limit: n.limit,
						offset: 0
					}), i = await e.get(t, void 0, h?.signal);
					if (g) return;
					a.value = i.items ?? [], o.value = typeof i.total == "number" ? i.total : a.value.length, f.value = !0, r("items-loaded", a.value);
				} catch (e) {
					if (g || _(e)) return;
					u.value = e instanceof Error ? e.message : "Failed to load", i.error(`Couldn't load "${n.row.title}"`);
				} finally {
					g || (s.value = !1);
				}
			}
		}
		function C() {
			if (typeof IntersectionObserver > "u" || !p.value) {
				x();
				return;
			}
			m = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (m?.disconnect(), m = null, x());
			}, { rootMargin: "300px" }), m.observe(p.value);
		}
		return y(C), v(() => {
			g = !0, h?.abort(), h = null, m?.disconnect(), m = null;
		}), (t, n) => (b(), c("div", {
			ref_key: "rootEl",
			ref: p
		}, [d(Da, {
			title: e.row.title,
			items: a.value,
			loading: s.value || !f.value && !u.value,
			error: u.value,
			count: o.value,
			"hide-when-empty": "",
			onRetry: x,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, {
			action: I(() => [l("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => r("see-all", e.row)
			}, "See all")]),
			_: 1
		}, 8, [
			"title",
			"items",
			"loading",
			"error",
			"count"
		])], 512));
	}
}), [["__scopeId", "data-v-fb0faca3"]]), ja = ["disabled", "aria-pressed"], Ma = { class: "phlix-chip__label" }, Na = ["disabled", "aria-label"], Pa = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Chip",
	props: {
		selected: {
			type: Boolean,
			default: void 0
		},
		removable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		size: { default: "sm" },
		disabled: {
			type: Boolean,
			default: !1
		},
		removeLabel: { default: "Remove" }
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i() {
			n.disabled || (n.selected !== void 0 && r("update:selected", !n.selected), r("click"));
		}
		return (t, n) => (b(), c("span", { class: g(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [l("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: i
		}, [e.icon ? (b(), o(q, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : s("", !0), l("span", Ma, [w(t.$slots, "default", {}, void 0, !0)])], 8, ja), e.removable ? (b(), c("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [d(q, { name: "x" })], 8, Na)) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]);
//#endregion
//#region src/components/ui/listbox.ts
function Fa(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function $(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function Ia(e, t) {
	return t === "first" ? $(e, -1, 1) : $(e, 0, -1);
}
//#endregion
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var La = { class: "phlix-combobox__field" }, Ra = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], za = ["id", "aria-label"], Ba = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Va = { class: "phlix-combobox__check" }, Ha = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, Ua = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Combobox",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Search…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, f = i(() => Fa(r.options)), p = A(), m = S(!1), _ = S(-1), y = S(""), x = S(!1), w = S(null), T = S(null), E = S(null), O = i(() => f.value.find((e) => e.value === r.modelValue)?.label ?? ""), j = i(() => {
			if (!x.value || y.value.trim() === "") return f.value;
			let e = y.value.toLowerCase();
			return f.value.filter((t) => t.label.toLowerCase().includes(e));
		}), M = i(() => _.value >= 0 ? `${p}-opt-${_.value}` : void 0);
		P(() => r.modelValue, () => {
			m.value || (y.value = O.value);
		}, { immediate: !0 });
		function F() {
			r.disabled || m.value || (m.value = !0, _.value = j.value.findIndex((e) => e.value === r.modelValue), _.value < 0 && (_.value = j.value.findIndex((e) => !e.disabled)), h(B));
		}
		function I() {
			y.value = O.value, x.value = !1, m.value = !1;
		}
		function R(e) {
			let t = j.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (a("update:modelValue", t.value), a("change", t.value)), y.value = t.label, x.value = !1, m.value = !1, T.value?.focus());
		}
		function z(e) {
			j.value.length !== 0 && (_.value = $(j.value, _.value, e), h(B));
		}
		function B() {
			E.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function V(e) {
			y.value = e.target.value, x.value = !0, m.value = !0, _.value = Ia(j.value, "first");
		}
		function H(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), m.value ? z(1) : F();
					break;
				case "ArrowUp":
					e.preventDefault(), m.value ? z(-1) : F();
					break;
				case "Enter":
					m.value && _.value >= 0 && (e.preventDefault(), R(_.value));
					break;
				case "Escape":
					m.value && (e.preventDefault(), I());
					break;
				case "Tab":
					m.value && I();
					break;
			}
		}
		function U(e) {
			m.value && w.value && !w.value.contains(e.target) && I();
		}
		return P(m, (e) => {
			e ? document.addEventListener("pointerdown", U, !0) : document.removeEventListener("pointerdown", U, !0);
		}), v(() => document.removeEventListener("pointerdown", U, !0)), (n, r) => (b(), c("div", {
			ref_key: "rootEl",
			ref: w,
			class: g(["phlix-combobox", {
				"is-open": m.value,
				"is-disabled": t.disabled
			}])
		}, [l("div", La, [
			d(q, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			l("input", {
				ref_key: "inputEl",
				ref: T,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": m.value,
				"aria-controls": m.value ? `${k(p)}-list` : void 0,
				"aria-activedescendant": m.value ? M.value : void 0,
				"aria-label": t.label,
				placeholder: t.placeholder,
				disabled: t.disabled,
				value: y.value,
				onInput: V,
				onFocus: F,
				onKeydown: H
			}, null, 40, Ra),
			d(q, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), L(l("ul", {
			id: `${k(p)}-list`,
			ref_key: "listEl",
			ref: E,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": t.label
		}, [(b(!0), c(e, null, C(j.value, (e, n) => (b(), c("li", {
			id: `${k(p)}-opt-${n}`,
			key: e.value,
			class: g(["phlix-combobox__option", {
				"is-active": n === _.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => R(n),
			onPointermove: (t) => !e.disabled && (_.value = n)
		}, [l("span", Va, [e.value === t.modelValue ? (b(), o(q, {
			key: 0,
			name: "check"
		})) : s("", !0)]), u(" " + D(e.label), 1)], 42, Ba))), 128)), j.value.length === 0 ? (b(), c("li", Ha, "No matches")) : s("", !0)], 8, za), [[N, m.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), Wa = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], Ga = ["id", "aria-label"], Ka = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], qa = { class: "phlix-select__check" }, Ja = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Select",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Select…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, f = i(() => Fa(r.options)), p = A(), m = S(!1), _ = S(-1), y = S(null), x = S(null), w = "", T, E = i(() => f.value.findIndex((e) => e.value === r.modelValue)), O = i(() => f.value[E.value]?.label ?? ""), j = i(() => _.value >= 0 ? `${p}-opt-${_.value}` : void 0);
		function M() {
			r.disabled || m.value || (m.value = !0, _.value = E.value >= 0 ? E.value : Ia(f.value, "first"), h(z));
		}
		function F() {
			m.value = !1;
		}
		function I(e) {
			let t = f.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (a("update:modelValue", t.value), a("change", t.value)), F(), y.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function R(e) {
			_.value = $(f.value, _.value, e), h(z);
		}
		function z() {
			(x.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function B(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), m.value ? R(1) : M();
					break;
				case "ArrowUp":
					e.preventDefault(), m.value ? R(-1) : M();
					break;
				case "Home":
					m.value && (e.preventDefault(), _.value = Ia(f.value, "first"), h(z));
					break;
				case "End":
					m.value && (e.preventDefault(), _.value = Ia(f.value, "last"), h(z));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), m.value && _.value >= 0 ? I(_.value) : M();
					break;
				case "Escape":
					m.value && (e.preventDefault(), F());
					break;
				case "Tab":
					F();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && V(e.key);
			}
		}
		function V(e) {
			m.value || M(), w += e.toLowerCase(), clearTimeout(T), T = setTimeout(() => w = "", 600);
			let t = f.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(w));
			t >= 0 && (_.value = t, h(z));
		}
		function H(e) {
			m.value && y.value && !y.value.contains(e.target) && F();
		}
		return P(m, (e) => {
			e ? document.addEventListener("pointerdown", H, !0) : document.removeEventListener("pointerdown", H, !0);
		}), v(() => {
			document.removeEventListener("pointerdown", H, !0), clearTimeout(T);
		}), (n, r) => (b(), c("div", {
			ref_key: "rootEl",
			ref: y,
			class: g(["phlix-select", {
				"is-open": m.value,
				"is-disabled": t.disabled
			}])
		}, [l("button", {
			type: "button",
			class: "phlix-select__trigger",
			"aria-haspopup": "listbox",
			"aria-expanded": m.value,
			"aria-controls": m.value ? `${k(p)}-list` : void 0,
			"aria-activedescendant": m.value ? j.value : void 0,
			"aria-label": t.label,
			disabled: t.disabled,
			onClick: r[0] ||= (e) => m.value ? F() : M(),
			onKeydown: B
		}, [l("span", { class: g(["phlix-select__value", { "is-placeholder": E.value < 0 }]) }, D(E.value >= 0 ? O.value : t.placeholder), 3), d(q, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, Wa), L(l("ul", {
			id: `${k(p)}-list`,
			ref_key: "listEl",
			ref: x,
			class: "phlix-select__list",
			role: "listbox",
			"aria-label": t.label
		}, [(b(!0), c(e, null, C(f.value, (e, n) => (b(), c("li", {
			id: `${k(p)}-opt-${n}`,
			key: e.value,
			class: g(["phlix-select__option", {
				"is-active": n === _.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => I(n),
			onPointermove: (t) => !e.disabled && (_.value = n)
		}, [l("span", qa, [e.value === t.modelValue ? (b(), o(q, {
			key: 0,
			name: "check"
		})) : s("", !0)]), u(" " + D(e.label), 1)], 42, Ka))), 128))], 8, Ga), [[N, m.value]])], 2));
	}
}), [["__scopeId", "data-v-db34d47a"]]), Ya = ["role", "aria-label"], Xa = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Badge",
	props: {
		tone: { default: "neutral" },
		size: { default: "sm" },
		mono: {
			type: Boolean,
			default: !1
		},
		icon: {},
		label: {}
	},
	setup(e) {
		return (t, n) => (b(), c("span", {
			class: g(["phlix-badge", [
				`phlix-badge--${e.tone}`,
				`phlix-badge--${e.size}`,
				{ "phlix-badge--mono": e.mono }
			]]),
			role: e.label ? "img" : void 0,
			"aria-label": e.label
		}, [e.icon ? (b(), o(q, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : s("", !0), w(t.$slots, "default", {}, void 0, !0)], 10, Ya));
	}
}), [["__scopeId", "data-v-8f8d0fd2"]]), Za = { class: "filterbar__main" }, Qa = { class: "filterbar__search" }, $a = { class: "filterbar__sort" }, eo = ["aria-label"], to = ["aria-expanded"], no = { class: "filterbar__advanced" }, ro = { class: "filterbar__field" }, io = { class: "filterbar__field" }, ao = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, oo = { class: "filterbar__field" }, so = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, co = { class: "filterbar__field" }, lo = { class: "filterbar__years" }, uo = { class: "filterbar__field filterbar__presets" }, fo = { class: "filterbar__chips" }, po = {
	key: 0,
	class: "filterbar__presets-empty"
}, mo = {
	key: 0,
	class: "filterbar__preset-save"
}, ho = ["onKeydown"], go = ["disabled"], _o = { class: "filterbar__active" }, vo = {
	class: "filterbar__count",
	"aria-live": "polite"
}, yo = { class: "filterbar__pills" }, bo = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "FilterBar",
	props: {
		searchDebounce: { default: 250 },
		sticky: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["change"],
	setup(t, { emit: r }) {
		let a = t, f = r, p = Ti(), m = J(), h = [
			{
				value: "name",
				label: "Name"
			},
			{
				value: "year",
				label: "Year"
			},
			{
				value: "rating",
				label: "Rating"
			},
			{
				value: "date_added",
				label: "Date added"
			},
			{
				value: "runtime",
				label: "Runtime"
			}
		], _ = S(p.search), x;
		P(() => p.search, (e) => {
			e !== _.value.trim() && (_.value = e);
		});
		function w() {
			clearTimeout(x), x = setTimeout(() => {
				p.setSearch(_.value.trim()), f("change");
			}, a.searchDebounce);
		}
		function T() {
			_.value = "", p.setSearch(""), f("change");
		}
		let E = S(null), O = S(0), A = i(() => p.availableGenres.filter((e) => !p.selectedGenres.includes(e)));
		function j(e) {
			if (e == null || e === "") return;
			let t = String(e);
			p.selectedGenres.includes(t) || (p.setGenres([...p.selectedGenres, t]), f("change")), E.value = null, O.value++;
		}
		function F(e) {
			let t = p.selectedRatings;
			p.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), f("change");
		}
		function B(e) {
			let t = p.selectedTypes;
			p.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), f("change");
		}
		let V = i(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), H = i(() => {
			let e = [];
			for (let t = V.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function U(e) {
			p.setYearRange(e == null || e === "" ? void 0 : Number(e), p.yearTo), f("change");
		}
		function ee(e) {
			p.setYearRange(p.yearFrom, e == null || e === "" ? void 0 : Number(e)), f("change");
		}
		function te(e) {
			p.setSort(e), f("change");
		}
		function W() {
			p.order = p.order === "asc" ? "desc" : "asc", p.offset = 0, f("change");
		}
		let G = i(() => {
			let e = [];
			return p.search && e.push({
				key: "search",
				label: `“${p.search}”`,
				remove: T
			}), p.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					p.setGenres(p.selectedGenres.filter((e) => e !== t)), f("change");
				}
			})), p.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => F(t)
			})), p.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => B(t)
			})), p.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${p.yearFrom}`,
				remove: () => U(null)
			}), p.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${p.yearTo}`,
				remove: () => ee(null)
			}), e;
		}), ne = i(() => G.value.length > 0), re = i(() => p.selectedGenres.length + p.selectedRatings.length + p.selectedTypes.length + (p.yearFrom === void 0 ? 0 : 1) + (p.yearTo === void 0 ? 0 : 1));
		function K() {
			_.value = "", p.setSearch(""), p.setGenres([]), p.setRatings([]), p.setTypes([]), p.setYearRange(void 0, void 0), f("change");
		}
		let ie = S(!1), ae = i(() => m.filterPresets), oe = S(!1), se = S("");
		function ce() {
			oe.value = !0, se.value = "";
		}
		function le() {
			let e = se.value.trim();
			e && (m.saveFilterPreset(e, p.toQuery()), oe.value = !1, se.value = "");
		}
		function ue(e) {
			p.applyQuery(e.query), _.value = p.search, f("change");
		}
		function de(e) {
			m.removeFilterPreset(e.id);
		}
		let fe = S(!1);
		function pe() {
			typeof window > "u" || (fe.value = window.scrollY > 24);
		}
		return y(() => {
			a.sticky && typeof window < "u" && (window.addEventListener("scroll", pe, { passive: !0 }), pe());
		}), v(() => {
			clearTimeout(x), typeof window < "u" && window.removeEventListener("scroll", pe);
		}), (r, i) => (b(), c("div", { class: g(["filterbar", {
			"is-sticky": t.sticky,
			"is-stuck": t.sticky && fe.value
		}]) }, [
			l("div", Za, [
				l("label", Qa, [
					d(q, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					L(l("input", {
						"onUpdate:modelValue": i[0] ||= (e) => _.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: w
					}, null, 544), [[M, _.value]]),
					_.value ? (b(), c("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: T
					}, [d(q, { name: "x" })])) : s("", !0)
				]),
				l("div", $a, [d(Ja, {
					"model-value": k(p).sort,
					options: h,
					label: "Sort by",
					"onUpdate:modelValue": te
				}, null, 8, ["model-value"]), l("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${k(p).order === "asc" ? "ascending" : "descending"}`,
					onClick: W
				}, [d(q, { name: k(p).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, eo)]),
				l("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": ie.value,
					onClick: i[1] ||= (e) => ie.value = !ie.value
				}, [
					d(q, { name: "filter" }),
					i[4] ||= l("span", null, "Filters", -1),
					re.value ? (b(), o(Xa, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: I(() => [u(D(re.value), 1)]),
						_: 1
					})) : s("", !0),
					d(q, {
						name: ie.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, to)
			]),
			d(n, { name: "filterbar-panel" }, {
				default: I(() => [L(l("div", no, [
					l("div", ro, [i[5] ||= l("span", { class: "filterbar__field-label" }, "Genres", -1), (b(), o(Ua, {
						key: O.value,
						"model-value": E.value,
						options: A.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": j
					}, null, 8, ["model-value", "options"]))]),
					l("div", io, [i[6] ||= l("span", { class: "filterbar__field-label" }, "Rating", -1), l("div", ao, [(b(!0), c(e, null, C(k(p).availableRatings, (e) => (b(), o(Pa, {
						key: e,
						selected: k(p).selectedRatings.includes(e),
						"onUpdate:selected": (t) => F(e)
					}, {
						default: I(() => [u(D(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					l("div", oo, [i[7] ||= l("span", { class: "filterbar__field-label" }, "Type", -1), l("div", so, [(b(!0), c(e, null, C(k(p).availableTypes, (e) => (b(), o(Pa, {
						key: e,
						selected: k(p).selectedTypes.includes(e),
						"onUpdate:selected": (t) => B(e)
					}, {
						default: I(() => [u(D(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					l("div", co, [i[9] ||= l("span", { class: "filterbar__field-label" }, "Year", -1), l("div", lo, [
						d(Ua, {
							"model-value": k(p).yearFrom ?? null,
							options: H.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": U
						}, null, 8, ["model-value", "options"]),
						i[8] ||= l("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						d(Ua, {
							"model-value": k(p).yearTo ?? null,
							options: H.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": ee
						}, null, 8, ["model-value", "options"])
					])]),
					l("div", uo, [
						i[12] ||= l("span", { class: "filterbar__field-label" }, "Presets", -1),
						l("div", fo, [(b(!0), c(e, null, C(ae.value, (e) => (b(), o(Pa, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => ue(e),
							onRemove: (t) => de(e)
						}, {
							default: I(() => [u(D(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ae.value.length ? s("", !0) : (b(), c("span", po, "No saved presets"))]),
						oe.value ? (b(), c("div", mo, [L(l("input", {
							"onUpdate:modelValue": i[2] ||= (e) => se.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [R(z(le, ["prevent"]), ["enter"]), i[3] ||= R((e) => oe.value = !1, ["esc"])]
						}, null, 40, ho), [[M, se.value]]), l("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: le
						}, [d(q, { name: "check" }), i[10] ||= u(" Save ", -1)])])) : (b(), c("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !ne.value,
							onClick: ce
						}, [d(q, { name: "plus" }), i[11] ||= u(" Save current ", -1)], 8, go))
					])
				], 512), [[N, ie.value]])]),
				_: 1
			}),
			l("div", _o, [l("span", vo, [l("b", null, D(k(p).total.toLocaleString()), 1), u(" " + D(k(p).total === 1 ? "title" : "titles"), 1)]), ne.value ? (b(), c(e, { key: 0 }, [l("div", yo, [(b(!0), c(e, null, C(G.value, (e) => (b(), o(Pa, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: I(() => [u(D(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), l("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: K
			}, "Clear all")], 64)) : s("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), xo = { class: "browse-page" }, So = { class: "browse-toolbar" }, Co = { class: "browse-header" }, wo = { class: "browse-count numeric" }, To = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, Eo = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "BrowsePage",
	setup(t) {
		let n = p("apiBase", ""), r = i(() => typeof n == "string" ? n : n?.value ?? ""), a = p("phlixConfig", null), u = i(() => a?.homeRows ?? []), f = Ti(), m = Z(), h = ji(), g = G(), _ = S(null), v = x(/* @__PURE__ */ new Map());
		function T(e) {
			e.forEach((e) => v.set(e.id, e));
		}
		P(() => f.items, (e) => T(e), { immediate: !0 });
		let E = i(() => {
			let e = m.resumeMap;
			return Object.keys(e).map((e) => v.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function O() {
			f.reset(), f.fetchMedia(r.value);
		}
		y(O), P(r, O);
		function A() {
			f.reset(), f.fetchMedia(r.value);
		}
		function j() {
			f.loadMore(r.value);
		}
		function M(e, t) {
			g?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function N(e) {
			M("player", e.id);
		}
		function F(e) {
			h.success(`Added "${e.name}" to your list`);
		}
		function I(e) {
			g?.hasRoute("media") ? M("media", e.id) : h.info(`Details for "${e.name}" are coming soon`);
		}
		function L() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function R(e) {
			f.applyQuery(e.query ?? {}), O(), _.value?.scrollIntoView?.({
				behavior: L() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (t, n) => (b(), c("div", xo, [
			l("div", So, [w(t.$slots, "toolbar-extra", {}, void 0, !0)]),
			E.value.length ? (b(), o(Da, {
				key: 0,
				title: "Continue Watching",
				items: E.value,
				"hide-when-empty": "",
				onPlay: N,
				onWatchlist: F,
				onInfo: I
			}, null, 8, ["items"])) : s("", !0),
			(b(!0), c(e, null, C(u.value, (e) => (b(), o(Aa, {
				key: e.id,
				row: e,
				"api-base": r.value,
				onItemsLoaded: T,
				onSeeAll: R,
				onPlay: N,
				onWatchlist: F,
				onInfo: I
			}, null, 8, ["row", "api-base"]))), 128)),
			l("section", {
				ref_key: "gridSection",
				ref: _,
				class: "browse-library"
			}, [
				l("div", Co, [n[0] ||= l("h1", { class: "browse-title" }, "Browse", -1), l("span", wo, D(k(f).total.toLocaleString()) + " titles", 1)]),
				d(bo, { onChange: A }),
				k(f).error ? (b(), c("div", To, [l("p", null, D(k(f).error), 1), l("button", {
					type: "button",
					class: "browse-retry",
					onClick: O
				}, "Retry")])) : s("", !0),
				d(ua, {
					items: k(f).items,
					loading: k(f).loading && k(f).items.length === 0,
					"loading-more": k(f).loading && k(f).items.length > 0,
					"has-more": k(f).hasMore,
					onLoadMore: j,
					onPlay: N,
					onWatchlist: F,
					onInfo: I
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-214269cb"]]), Do = [
	"type",
	"disabled",
	"aria-busy"
], Oo = {
	key: 0,
	class: "phlix-btn__spinner"
}, ko = { class: "phlix-btn__label" }, Ao = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Button",
	props: {
		variant: { default: "solid" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		block: {
			type: Boolean,
			default: !1
		},
		leftIcon: {},
		rightIcon: {}
	},
	setup(e) {
		let t = e, n = i(() => t.disabled || t.loading);
		return (t, r) => (b(), c("button", {
			type: e.type,
			class: g(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: n.value,
			"aria-busy": e.loading || void 0
		}, [
			e.loading ? (b(), c("span", Oo, [d(q, { name: "spinner" })])) : s("", !0),
			e.leftIcon && !e.loading ? (b(), o(q, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : s("", !0),
			l("span", ko, [w(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (b(), o(q, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : s("", !0)
		], 10, Do));
	}
}), [["__scopeId", "data-v-8cdee95a"]]), jo = { class: "media-detail" }, Mo = { class: "media-detail__bar" }, No = { class: "media-detail__hero" }, Po = { class: "media-detail__poster" }, Fo = ["src", "alt"], Io = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, Lo = { class: "media-detail__info" }, Ro = { class: "media-detail__title" }, zo = { class: "media-detail__meta numeric" }, Bo = {
	key: 0,
	class: "media-detail__meta-item"
}, Vo = {
	key: 1,
	class: "media-detail__cert"
}, Ho = {
	key: 2,
	class: "media-detail__meta-item"
}, Uo = { class: "media-detail__type" }, Wo = {
	key: 0,
	class: "media-detail__genres"
}, Go = { class: "media-detail__overview" }, Ko = { class: "media-detail__actions" }, qo = { class: "media-detail__resume-at numeric" }, Jo = {
	key: 1,
	class: "media-detail__credits"
}, Yo = {
	key: 0,
	class: "media-detail__credit"
}, Xo = {
	key: 1,
	class: "media-detail__credit"
}, Zo = { class: "media-detail__cast" }, Qo = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "MediaDetail",
	props: {
		item: {},
		resumeSeconds: { default: null },
		similar: { default: () => [] },
		similarLoading: {
			type: Boolean,
			default: !1
		},
		showBack: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"back"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, f = i(() => r.item.type === "audio" ? "music" : r.item.type === "image" ? "image" : r.item.type === "series" ? "tv" : "film"), p = i(() => r.item.actors?.slice(0, 8) ?? []), m = i(() => {
			let e = r.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), h = S(!1), v = S(null);
		function x() {
			h.value = !0;
		}
		return y(() => {
			v.value?.complete && (h.value = !0);
		}), (n, r) => (b(), c("article", jo, [
			t.item.poster_url ? (b(), c("div", {
				key: 0,
				class: "media-detail__ambient",
				style: _({ backgroundImage: `url(${t.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : s("", !0),
			l("div", Mo, [t.showBack ? (b(), o(Ao, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => a("back")
			}, {
				default: I(() => [...r[7] ||= [u("Back", -1)]]),
				_: 1
			})) : s("", !0)]),
			l("div", No, [l("div", Po, [t.item.poster_url ? (b(), c("img", {
				key: 0,
				ref_key: "imgEl",
				ref: v,
				class: g(["media-detail__img", { "is-loaded": h.value }]),
				src: t.item.poster_url,
				alt: t.item.name,
				decoding: "async",
				onLoad: x
			}, null, 42, Fo)) : (b(), c("div", Io, [d(q, { name: f.value }, null, 8, ["name"])]))]), l("div", Lo, [
				l("h1", Ro, D(t.item.name), 1),
				l("div", zo, [
					t.item.year ? (b(), c("span", Bo, [d(q, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), u(D(t.item.year), 1)])) : s("", !0),
					t.item.rating ? (b(), c("span", Vo, D(t.item.rating), 1)) : s("", !0),
					t.item.runtime ? (b(), c("span", Ho, D(t.item.runtime) + "m", 1)) : s("", !0),
					l("span", Uo, D(t.item.type), 1)
				]),
				t.item.genres?.length ? (b(), c("div", Wo, [(b(!0), c(e, null, C(t.item.genres, (e) => (b(), o(Pa, {
					key: e,
					size: "sm"
				}, {
					default: I(() => [u(D(e), 1)]),
					_: 2
				}, 1024))), 128))])) : s("", !0),
				l("p", Go, D(t.item.overview || "No overview available."), 1),
				l("div", Ko, [
					d(Ao, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (e) => a("play", t.item)
					}, {
						default: I(() => [...r[8] ||= [u("Play", -1)]]),
						_: 1
					}),
					m.value ? (b(), o(Ao, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (e) => a("resume", t.item)
					}, {
						default: I(() => [r[9] ||= u(" Resume ", -1), l("span", qo, D(m.value), 1)]),
						_: 1
					})) : s("", !0),
					d(Ao, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: r[3] ||= (e) => a("watchlist", t.item)
					}, {
						default: I(() => [...r[10] ||= [u("Watchlist", -1)]]),
						_: 1
					})
				]),
				t.item.director || p.value.length ? (b(), c("dl", Jo, [t.item.director ? (b(), c("div", Yo, [r[11] ||= l("dt", null, "Director", -1), l("dd", null, D(t.item.director), 1)])) : s("", !0), p.value.length ? (b(), c("div", Xo, [r[12] ||= l("dt", null, "Cast", -1), l("dd", Zo, [(b(!0), c(e, null, C(p.value, (e) => (b(), o(Pa, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: I(() => [u(D(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : s("", !0)])) : s("", !0)
			])]),
			t.similarLoading || t.similar.length ? (b(), o(Da, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: t.similar,
				loading: t.similarLoading,
				"hide-when-empty": "",
				onPlay: r[4] ||= (e) => a("play", e),
				onWatchlist: r[5] ||= (e) => a("watchlist", e),
				onInfo: r[6] ||= (e) => a("info", e)
			}, null, 8, ["items", "loading"])) : s("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), $o = { class: "media-detail-page" }, es = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, ts = { class: "media-detail-page__loading-hero" }, ns = { class: "media-detail-page__loading-info" }, rs = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "MediaDetailPage",
	setup(e) {
		let t = p("apiBase", ""), n = i(() => typeof t == "string" ? t : t?.value ?? ""), r = W(), a = G(), f = Z(), m = ji(), h = S(null), g = S([]), _ = S(!0), x = S(!1), C = S(null), w = i(() => String(r.params.id ?? "")), T = i(() => f.resumePositionFor(w.value)), E = null, D = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function k(e, t) {
			let r = t.genres?.[0];
			if (!r) {
				g.value = [];
				return;
			}
			let i = E, a = () => D || i !== E;
			x.value = !0;
			try {
				let o = ka(n.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				g.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || O(e)) return;
				g.value = [];
			} finally {
				a() || (x.value = !1);
			}
		}
		async function A() {
			let e = w.value;
			if (E?.abort(), E = typeof AbortController < "u" ? new AbortController() : null, _.value = !0, C.value = null, g.value = [], !e) {
				C.value = "No media id provided", _.value = !1;
				return;
			}
			try {
				let t = new Y({ baseUrl: n.value }), r = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, E?.signal);
				if (D) return;
				h.value = r, _.value = !1, k(t, r);
			} catch (e) {
				if (D || O(e)) return;
				C.value = e instanceof Error ? e.message : "Failed to load title", _.value = !1;
			}
		}
		y(A), P(w, A), v(() => {
			D = !0, E?.abort(), E = null;
		});
		function j(e, t) {
			a?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function M(e) {
			j("player", e.id);
		}
		function N(e) {
			m.success(`Added "${e.name}" to your list`);
		}
		function F(e) {
			j("media", e.id);
		}
		function L() {
			a?.back();
		}
		return (e, t) => (b(), c("div", $o, [_.value ? (b(), c("div", es, [l("div", ts, [d(Q, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), l("div", ns, [
			d(Q, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			d(Q, {
				variant: "text",
				lines: 4
			}),
			d(Q, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : C.value ? (b(), o(ga, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: C.value
		}, {
			actions: I(() => [d(Ao, {
				variant: "solid",
				onClick: A
			}, {
				default: I(() => [...t[0] ||= [u("Retry", -1)]]),
				_: 1
			}), d(Ao, {
				variant: "ghost",
				onClick: L
			}, {
				default: I(() => [...t[1] ||= [u("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : h.value ? (b(), o(Qo, {
			key: 2,
			item: h.value,
			"resume-seconds": T.value,
			similar: g.value,
			"similar-loading": x.value,
			onPlay: M,
			onResume: M,
			onWatchlist: N,
			onInfo: F,
			onBack: L
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]);
//#endregion
//#region src/components/player/format-time.ts
function is(e) {
	if (!isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
//#endregion
//#region src/components/player/Scrubber.vue?vue&type=script&setup=true&lang.ts
var as = [
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext"
], os = { class: "scrubber__track" }, ss = ["title"], cs = { class: "scrubber__time numeric" }, ls = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Scrubber",
	props: {
		position: {},
		duration: {},
		buffered: { default: 0 },
		chapters: { default: () => [] },
		thumbnailAt: {},
		step: { default: 5 }
	},
	emits: [
		"seek",
		"scrub-start",
		"scrub-end"
	],
	setup(t, { expose: n, emit: r }) {
		let a = t, o = r, u = S(null), d = S(!1), f = S(!1), p = S(0), m = S(0), h = (e) => Math.min(1, Math.max(0, e)), v = i(() => d.value ? p.value : a.duration > 0 ? h(a.position / a.duration) : 0), y = i(() => a.duration > 0 ? h(a.buffered / a.duration) : 0), x = i(() => (d.value || f.value) && a.duration > 0), w = i(() => d.value ? p.value : m.value), T = i(() => w.value * a.duration), E = i(() => x.value ? a.thumbnailAt?.(T.value) ?? null : null), O = i(() => E.value ? `url("${E.value.replace(/[\\"]/g, "\\$&").replace(/[\r\n]/g, "")}")` : "none"), A = i(() => `${Math.min(96, Math.max(4, w.value * 100))}%`), j = i(() => a.duration > 0 ? a.chapters.filter((e) => e.start > 0 && e.start < a.duration).map((e) => ({
			...e,
			ratio: e.start / a.duration
		})) : []);
		function M(e) {
			let t = u.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width <= 0 ? 0 : h((e.clientX - n.left) / n.width);
		}
		function N(e) {
			if (a.duration <= 0) return;
			d.value = !0;
			try {
				u.value?.setPointerCapture?.(e.pointerId);
			} catch {}
			let t = M(e);
			p.value = t, o("scrub-start"), o("seek", t * a.duration), e.preventDefault();
		}
		function P(e) {
			let t = M(e);
			m.value = t, d.value && (p.value = t, o("seek", t * a.duration));
		}
		function F(e) {
			if (d.value) {
				d.value = !1;
				try {
					u.value?.releasePointerCapture?.(e.pointerId);
				} catch {}
				o("scrub-end");
			}
		}
		function I() {
			f.value = !0;
		}
		function L() {
			f.value = !1;
		}
		function R(e) {
			let t = a.duration;
			if (t <= 0) return;
			let n = null;
			switch (e.key) {
				case "ArrowLeft":
					n = Math.max(0, a.position - a.step);
					break;
				case "ArrowRight":
					n = Math.min(t, a.position + a.step);
					break;
				case "Home":
					n = 0;
					break;
				case "End":
					n = t;
					break;
				default: return;
			}
			o("seek", n), e.preventDefault();
		}
		return n({
			playedRatio: v,
			previewActive: x
		}), (n, r) => (b(), c("div", {
			ref_key: "trackEl",
			ref: u,
			class: "scrubber",
			role: "slider",
			tabindex: "0",
			"aria-valuemin": 0,
			"aria-valuemax": Math.round(t.duration),
			"aria-valuenow": Math.round(t.position),
			"aria-valuetext": k(is)(t.position),
			"aria-label": "Seek",
			onPointerdown: N,
			onPointermove: P,
			onPointerup: F,
			onPointercancel: F,
			onPointerenter: I,
			onPointerleave: L,
			onKeydown: R
		}, [l("div", os, [
			l("div", {
				class: "scrubber__buffered",
				style: _({ width: `${y.value * 100}%` })
			}, null, 4),
			l("div", {
				class: "scrubber__played",
				style: _({ width: `${v.value * 100}%` })
			}, null, 4),
			(b(!0), c(e, null, C(j.value, (e, t) => (b(), c("span", {
				key: t,
				class: "scrubber__tick",
				style: _({ left: `${e.ratio * 100}%` }),
				title: e.title
			}, null, 12, ss))), 128)),
			l("div", {
				class: g(["scrubber__head", { "is-dragging": d.value }]),
				style: _({ left: `${v.value * 100}%` })
			}, null, 6)
		]), x.value ? (b(), c("div", {
			key: 0,
			class: "scrubber__preview",
			style: _({ left: A.value }),
			"aria-hidden": "true"
		}, [E.value ? (b(), c("div", {
			key: 0,
			class: "scrubber__thumb",
			style: _({ backgroundImage: O.value })
		}, null, 4)) : s("", !0), l("span", cs, D(k(is)(T.value)), 1)], 4)) : s("", !0)], 40, as));
	}
}), [["__scopeId", "data-v-b2711211"]]), us = [
	{
		id: "playpause",
		keys: ["Space", "K"],
		label: "Play / pause"
	},
	{
		id: "seek5",
		keys: ["ArrowLeft", "ArrowRight"],
		label: "Seek ±5s"
	},
	{
		id: "seek10",
		keys: ["J", "L"],
		label: "Seek ±10s"
	},
	{
		id: "frame",
		keys: [",", "."],
		label: "Frame step (paused)"
	},
	{
		id: "volume",
		keys: ["ArrowUp", "ArrowDown"],
		label: "Volume"
	},
	{
		id: "mute",
		keys: ["M"],
		label: "Mute"
	},
	{
		id: "fullscreen",
		keys: ["F"],
		label: "Fullscreen"
	},
	{
		id: "captions",
		keys: ["C"],
		label: "Captions"
	},
	{
		id: "theater",
		keys: ["T"],
		label: "Theater"
	},
	{
		id: "pip",
		keys: ["I"],
		label: "Picture-in-picture"
	},
	{
		id: "seekpct",
		keys: [
			"0",
			"–",
			"9"
		],
		label: "Seek to %"
	},
	{
		id: "speed",
		keys: ["<", ">"],
		label: "Speed"
	},
	{
		id: "help",
		keys: ["?"],
		label: "This help"
	}
], ds = {
	ArrowLeft: "arrow-left",
	ArrowRight: "arrow-right",
	ArrowUp: "arrow-up",
	ArrowDown: "arrow-down"
}, fs = {
	ArrowLeft: "Left arrow",
	ArrowRight: "Right arrow",
	ArrowUp: "Up arrow",
	ArrowDown: "Down arrow"
};
function ps(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	return n === "button" || n === "a" || t.getAttribute?.("role") === "button";
}
function ms(e) {
	let t = e;
	if (!t || !t.tagName) return !1;
	let n = t.tagName.toLowerCase();
	if (n === "input" || n === "textarea" || n === "select" || t.isContentEditable) return !0;
	let r = t.getAttribute?.("role");
	return r === "textbox" || r === "searchbox";
}
function hs(e, t) {
	switch (e.key) {
		case " ": return ps(e.target) ? !1 : (t.playPause(), !0);
		case "k":
		case "K": return t.playPause(), !0;
		case "ArrowLeft": return t.seekBy(-5), !0;
		case "ArrowRight": return t.seekBy(5), !0;
		case "j":
		case "J": return t.seekBy(-10), !0;
		case "l":
		case "L": return t.seekBy(10), !0;
		case ",": return t.frameStep(-1), !0;
		case ".": return t.frameStep(1), !0;
		case "ArrowUp": return t.volumeBy(.05), !0;
		case "ArrowDown": return t.volumeBy(-.05), !0;
		case "m":
		case "M": return t.toggleMute(), !0;
		case "f":
		case "F": return t.toggleFullscreen(), !0;
		case "c":
		case "C": return t.toggleCaptions(), !0;
		case "t":
		case "T": return t.toggleTheater(), !0;
		case "i":
		case "I": return t.togglePip(), !0;
		case "<": return t.speedStep(-1), !0;
		case ">": return t.speedStep(1), !0;
		case "?": return t.toggleHelp(), !0;
		default: return e.key >= "0" && e.key <= "9" ? (t.seekToPercent(Number(e.key) / 10), !0) : !1;
	}
}
function gs(e, t = {}) {
	function n(n) {
		t.enabled && !t.enabled() || n.ctrlKey || n.metaKey || n.altKey || ms(n.target) || hs(n, e) && n.preventDefault();
	}
	y(() => {
		typeof document < "u" && document.addEventListener("keydown", n);
	}), v(() => {
		typeof document < "u" && document.removeEventListener("keydown", n);
	});
}
//#endregion
//#region src/components/player/ShortcutsHelp.vue?vue&type=script&setup=true&lang.ts
var _s = { class: "shortcuts__head" }, vs = { class: "shortcuts__grid" }, ys = { class: "shortcuts__keys" }, bs = {
	key: 0,
	class: "shortcuts__sep",
	"aria-hidden": "true"
}, xs = {
	key: 1,
	class: "shortcuts__key"
}, Ss = { class: "shortcuts__label" }, Cs = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "ShortcutsHelp",
	props: {
		open: { type: Boolean },
		shortcuts: { default: () => us }
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, i = n, a = S(null);
		return jr(a, O(r, "open"), {
			lockScroll: !1,
			onEscape: () => (i("close"), !0)
		}), (n, r) => t.open ? (b(), c("div", {
			key: 0,
			class: "shortcuts",
			onClick: r[1] ||= z((e) => i("close"), ["self"])
		}, [l("div", {
			ref_key: "panelEl",
			ref: a,
			class: "shortcuts__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Keyboard shortcuts",
			tabindex: "-1"
		}, [l("div", _s, [r[2] ||= l("h3", { class: "shortcuts__title" }, "Keyboard", -1), d(Sr, {
			name: "x",
			label: "Close",
			size: "sm",
			onClick: r[0] ||= (e) => i("close")
		})]), l("ul", vs, [(b(!0), c(e, null, C(t.shortcuts, (t) => (b(), c("li", {
			key: t.id,
			class: "shortcuts__row"
		}, [l("span", ys, [(b(!0), c(e, null, C(t.keys, (t, n) => (b(), c(e, { key: n }, [t === "–" ? (b(), c("span", bs, "–")) : (b(), c("kbd", xs, [k(ds)[t] ? (b(), o(q, {
			key: 0,
			name: k(ds)[t],
			label: k(fs)[t] ?? t
		}, null, 8, ["name", "label"])) : (b(), c(e, { key: 1 }, [u(D(t), 1)], 64))]))], 64))), 128))]), l("span", Ss, D(t.label), 1)]))), 128))])], 512)])) : s("", !0);
	}
}), [["__scopeId", "data-v-5e972c87"]]), ws = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], Ts = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Slider",
	props: {
		modelValue: {},
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		label: {},
		formatValue: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = S(null), o = S(!1), s = i(() => {
			let e = n.max - n.min || 1;
			return Math.min(100, Math.max(0, (n.modelValue - n.min) / e * 100));
		}), u = i(() => n.formatValue ? n.formatValue(n.modelValue) : String(n.modelValue));
		function d(e) {
			let t = Math.min(n.max, Math.max(n.min, e)), r = Math.round((t - n.min) / n.step), i = n.min + r * n.step;
			return Math.round(i * 1e6) / 1e6;
		}
		function f(e, t = !1) {
			let i = d(e);
			i !== n.modelValue && (r("update:modelValue", i), t && r("change", i));
		}
		function p(e) {
			let t = a.value;
			if (!t) return n.modelValue;
			let r = t.getBoundingClientRect(), i = r.width ? (e - r.left) / r.width : 0;
			return n.min + i * (n.max - n.min);
		}
		function m(e) {
			n.disabled || (e.currentTarget.setPointerCapture?.(e.pointerId), o.value = !0, f(p(e.clientX)));
		}
		function h(e) {
			o.value && f(p(e.clientX));
		}
		function v(e) {
			o.value && (o.value = !1, e.currentTarget.releasePointerCapture?.(e.pointerId), r("change", n.modelValue));
		}
		function y(e) {
			if (n.disabled) return;
			let t = (n.max - n.min) / 10, r = !0;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowUp":
					f(n.modelValue + n.step, !0);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					f(n.modelValue - n.step, !0);
					break;
				case "PageUp":
					f(n.modelValue + t, !0);
					break;
				case "PageDown":
					f(n.modelValue - t, !0);
					break;
				case "Home":
					f(n.min, !0);
					break;
				case "End":
					f(n.max, !0);
					break;
				default: r = !1;
			}
			r && e.preventDefault();
		}
		return (t, n) => (b(), c("div", {
			class: g(["phlix-slider", { "is-disabled": e.disabled }]),
			role: "slider",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": e.modelValue,
			"aria-valuetext": u.value,
			"aria-disabled": e.disabled || void 0,
			"aria-orientation": "horizontal",
			onKeydown: y
		}, [l("div", {
			ref_key: "trackEl",
			ref: a,
			class: "phlix-slider__track",
			onPointerdown: m,
			onPointermove: h,
			onPointerup: v
		}, [l("div", {
			class: "phlix-slider__fill",
			style: _({ width: s.value + "%" })
		}, null, 4), l("div", {
			class: "phlix-slider__thumb",
			style: _({ left: s.value + "%" })
		}, null, 4)], 544)], 42, ws));
	}
}), [["__scopeId", "data-v-9ca92975"]]), Es = { class: "volume" }, Ds = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "VolumeControl",
	setup(e) {
		let t = Z(), n = J(), r = i(() => t.muted ? 0 : t.volume), a = i(() => t.muted || t.volume <= 0 ? "mute" : t.volume < .5 ? "volume-low" : "volume");
		function o(e) {
			t.setVolume(e), e <= 0 && !t.muted && t.toggleMute();
		}
		return P(() => t.volume, (e) => {
			n.defaultVolume = e;
		}), (e, n) => (b(), c("div", Es, [d(Sr, {
			name: a.value,
			label: k(t).muted ? "Unmute" : "Mute",
			size: "sm",
			class: "volume__btn",
			onClick: n[0] ||= (e) => k(t).toggleMute()
		}, null, 8, ["name", "label"]), d(Ts, {
			class: "volume__slider",
			"model-value": r.value,
			min: 0,
			max: 1,
			step: .05,
			label: "Volume",
			"format-value": (e) => `${Math.round(e * 100)}%`,
			"onUpdate:modelValue": o
		}, null, 8, ["model-value", "format-value"])]));
	}
}), [["__scopeId", "data-v-2768c5e3"]]), Os = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "SpeedMenu",
	setup(e) {
		let t = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], n = Z(), r = i(() => t.map((e) => ({
			value: e,
			label: `${e}×`
		})));
		function a(e) {
			n.setRate(Number(e));
		}
		return (e, t) => (b(), o(Ja, {
			class: "speed-menu",
			"model-value": k(n).rate,
			options: r.value,
			label: "Playback speed",
			"onUpdate:modelValue": a
		}, null, 8, ["model-value", "options"]));
	}
}), [["__scopeId", "data-v-f161a2e3"]]), ks = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "QualityMenu",
	props: { qualities: { default: () => [] } },
	setup(e) {
		let t = e, n = Z(), r = J(), a = i(() => t.qualities.length > 0);
		function c(e) {
			let t = String(e);
			n.setQuality(t), r.defaultQuality = t;
		}
		return (t, r) => a.value ? (b(), o(Ja, {
			key: 0,
			class: "quality-menu",
			"model-value": k(n).quality,
			options: e.qualities,
			label: "Quality",
			"onUpdate:modelValue": c
		}, null, 8, ["model-value", "options"])) : s("", !0);
	}
}), [["__scopeId", "data-v-49b2c767"]]), As = ["src", "poster"], js = { class: "player__meta" }, Ms = { class: "player__meta-text" }, Ns = { class: "player__title" }, Ps = { class: "player__sub numeric" }, Fs = {
	key: 0,
	class: "player__dot",
	"aria-hidden": "true"
}, Is = { class: "player__center" }, Ls = ["aria-label"], Rs = { class: "player__btnrow" }, zs = ["aria-label"], Bs = { class: "player__time numeric" }, Vs = ["aria-label"], Hs = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {},
		idleTimeout: {},
		chapters: {},
		thumbnailAt: { type: Function },
		qualities: {}
	},
	emits: [
		"back",
		"captions",
		"theater",
		"pip"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, o = Z(), f = [
			.25,
			.5,
			.75,
			1,
			1.25,
			1.5,
			1.75,
			2
		], p = S(null), m = S(null), h = S(!0), _ = S(!1), x = S(!1), w = S(!1), T, E = i(() => {
			let e = [];
			r.media.year && e.push({ text: String(r.media.year) }), r.media.rating && e.push({
				text: r.media.rating,
				cert: !0
			}), r.media.runtime && e.push({ text: `${r.media.runtime}m` });
			let t = r.media.genres?.[0];
			return t && e.push({ text: t }), e;
		});
		function O() {
			let e = p.value;
			e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
		}
		function A(e) {
			try {
				return e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
			} catch {
				return 0;
			}
		}
		function j() {
			o.play();
		}
		function M() {
			o.pause();
		}
		function N() {
			let e = p.value;
			e && o.updateProgress(e.currentTime, e.duration, A(e));
		}
		function F() {
			let e = p.value;
			e && (e.volume = o.volume, e.muted = o.muted, e.playbackRate = o.rate, o.updateProgress(e.currentTime, e.duration, A(e)));
		}
		function I() {
			let e = p.value;
			e && o.updateProgress(e.currentTime, e.duration, A(e));
		}
		function L() {
			let e = p.value;
			e && (Math.abs(e.volume - o.volume) > .001 && o.setVolume(e.volume), e.muted !== o.muted && o.toggleMute());
		}
		function R() {
			let e = p.value;
			e && e.playbackRate !== o.rate && o.setRate(e.playbackRate);
		}
		function B(e) {
			let t = p.value;
			t && o.duration > 0 && (t.currentTime = Math.min(o.duration, Math.max(0, e)));
		}
		function V() {
			x.value = !0, re();
		}
		function H() {
			x.value = !1, re();
		}
		function U(e) {
			let t = f.reduce((e, t, n) => Math.abs(t - o.rate) < Math.abs(f[e] - o.rate) ? n : e, 0), n = f[Math.min(f.length - 1, Math.max(0, t + e))];
			o.setRate(n);
		}
		gs({
			playPause: O,
			seekBy: (e) => B(o.position + e),
			frameStep: (e) => {
				o.playing || B(o.position + e / 30);
			},
			volumeBy: (e) => o.setVolume(o.volume + e),
			toggleMute: ee,
			toggleFullscreen: te,
			toggleCaptions: () => a("captions"),
			toggleTheater: () => a("theater"),
			togglePip: () => a("pip"),
			seekToPercent: (e) => B(e * o.duration),
			speedStep: U,
			toggleHelp: () => {
				w.value = !w.value;
			}
		}, { enabled: () => !w.value });
		function ee() {
			o.toggleMute();
		}
		P(() => o.muted, (e) => {
			let t = p.value;
			t && t.muted !== e && (t.muted = e);
		}), P(() => o.volume, (e) => {
			let t = p.value;
			t && Math.abs(t.volume - e) > .001 && (t.volume = e);
		}), P(() => o.rate, (e) => {
			let t = p.value;
			t && t.playbackRate !== e && (t.playbackRate = e);
		});
		function te() {
			if (typeof document > "u") return;
			let e = m.value;
			e && (document.fullscreenElement ? document.exitFullscreen?.().catch(() => {}) : e.requestFullscreen?.().catch(() => {}));
		}
		function W() {
			_.value = typeof document < "u" && !!document.fullscreenElement;
		}
		function G() {
			T &&= (clearTimeout(T), void 0);
		}
		function ne() {
			G(), !(!o.playing || x.value) && (T = setTimeout(() => {
				o.playing && !x.value && (h.value = !1);
			}, r.idleTimeout ?? 3e3));
		}
		function re() {
			h.value = !0, ne();
		}
		return P(() => o.playing, (e) => {
			e ? ne() : (G(), h.value = !0);
		}), y(() => {
			o.setCurrent(r.media, { resetPosition: !1 }), typeof document < "u" && document.addEventListener("fullscreenchange", W);
		}), P(() => r.media, (e) => o.setCurrent(e, { resetPosition: !1 })), v(() => {
			G(), typeof document < "u" && document.removeEventListener("fullscreenchange", W);
		}), (n, r) => (b(), c("div", {
			ref_key: "containerRef",
			ref: m,
			class: g(["player", { "is-chrome-hidden": !h.value }]),
			onPointermove: re,
			onPointerdown: re,
			onFocusin: re
		}, [
			l("video", {
				ref_key: "videoRef",
				ref: p,
				class: "player__video",
				src: t.streamUrl,
				poster: t.media.poster_url ?? void 0,
				preload: "metadata",
				playsinline: "",
				onPlay: j,
				onPause: M,
				onTimeupdate: N,
				onLoadedmetadata: F,
				onProgress: I,
				onVolumechange: L,
				onRatechange: R,
				onClick: O
			}, null, 40, As),
			r[7] ||= l("div", {
				class: "player__scrim player__scrim--top",
				"aria-hidden": "true"
			}, null, -1),
			r[8] ||= l("div", {
				class: "player__scrim player__scrim--bottom",
				"aria-hidden": "true"
			}, null, -1),
			l("div", js, [l("button", {
				type: "button",
				class: "player__iconbtn player__back",
				"aria-label": "Back",
				onClick: r[0] ||= z((e) => a("back"), ["stop"])
			}, [d(q, { name: "arrow-left" })]), l("div", Ms, [
				r[4] ||= l("p", { class: "player__eyebrow" }, "Now playing", -1),
				l("h2", Ns, D(t.media.name), 1),
				l("div", Ps, [(b(!0), c(e, null, C(E.value, (t, n) => (b(), c(e, { key: n }, [n > 0 && !t.cert ? (b(), c("span", Fs, "·")) : s("", !0), l("span", { class: g({ player__cert: t.cert }) }, D(t.text), 3)], 64))), 128))])
			])]),
			l("div", Is, [l("button", {
				type: "button",
				class: g(["player__bigplay", { "is-playing": k(o).playing }]),
				"aria-label": k(o).playing ? "Pause" : "Play",
				onClick: z(O, ["stop"])
			}, [d(q, { name: k(o).playing ? "pause" : "play" }, null, 8, ["name"])], 10, Ls)]),
			l("div", {
				class: "player__controls",
				onClick: r[2] ||= z(() => {}, ["stop"])
			}, [d(ls, {
				position: k(o).position,
				duration: k(o).duration,
				buffered: k(o).buffered,
				chapters: t.chapters,
				"thumbnail-at": t.thumbnailAt,
				onSeek: B,
				onScrubStart: V,
				onScrubEnd: H
			}, null, 8, [
				"position",
				"duration",
				"buffered",
				"chapters",
				"thumbnail-at"
			]), l("div", Rs, [
				l("button", {
					type: "button",
					class: "player__iconbtn player__iconbtn--lg",
					"aria-label": k(o).playing ? "Pause" : "Play",
					onClick: O
				}, [d(q, { name: k(o).playing ? "pause" : "play" }, null, 8, ["name"])], 8, zs),
				l("span", Bs, [
					u(D(k(is)(k(o).position)), 1),
					r[5] ||= l("span", { class: "player__sep" }, " / ", -1),
					u(D(k(is)(k(o).duration)), 1)
				]),
				r[6] ||= l("span", { class: "player__grow" }, null, -1),
				d(Ds),
				d(Os),
				d(ks, { qualities: t.qualities }, null, 8, ["qualities"]),
				l("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": "Keyboard shortcuts",
					"aria-haspopup": "dialog",
					onClick: r[1] ||= (e) => w.value = !0
				}, [d(q, { name: "info" })]),
				l("button", {
					type: "button",
					class: "player__iconbtn",
					"aria-label": _.value ? "Exit fullscreen" : "Fullscreen",
					onClick: te
				}, [d(q, { name: _.value ? "fullscreen-exit" : "fullscreen" }, null, 8, ["name"])], 8, Vs)
			])]),
			d(Cs, {
				open: w.value,
				onClose: r[3] ||= (e) => w.value = !1
			}, null, 8, ["open"])
		], 34));
	}
}), [["__scopeId", "data-v-a83f0d9d"]]), Us = { class: "player-page" }, Ws = {
	key: 0,
	class: "player-loading"
}, Gs = {
	key: 1,
	class: "player-error"
}, Ks = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "PlayerPage",
	setup(e) {
		let t = p("apiBase", i(() => "")), n = W(), r = S(null), a = S(""), u = S(!0), d = S(null);
		async function f() {
			let e = n.params.id;
			if (!e) {
				d.value = "No media ID provided", u.value = !1;
				return;
			}
			try {
				let n = new Y({ baseUrl: t.value }), [i, o] = await Promise.all([n.get(`/api/v1/media/${e}`), n.get(`/api/v1/media/${e}/playback-info`).catch(() => null)]);
				r.value = i, o?.url ? a.value = o.url : a.value = `${t.value}/media/${e}/stream`;
			} catch (e) {
				d.value = e instanceof Error ? e.message : "Failed to load media";
			} finally {
				u.value = !1;
			}
		}
		return y(f), (e, t) => (b(), c("div", Us, [u.value ? (b(), c("div", Ws, "Loading...")) : d.value ? (b(), c("div", Gs, [l("p", null, D(d.value), 1), l("button", {
			class: "retry-btn",
			onClick: f
		}, "Retry")])) : r.value ? (b(), o(Hs, {
			key: 2,
			media: r.value,
			"stream-url": a.value
		}, null, 8, ["media", "stream-url"])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-d9061b47"]]), qs = "access_token", Js = "refresh_token", Ys = "user", Xs = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(qs);
	}
	setAccessToken(e) {
		this.storage.setItem(qs, e);
	}
	getRefreshToken() {
		return this.storage.getItem(Js);
	}
	setRefreshToken(e) {
		this.storage.setItem(Js, e);
	}
	getUser() {
		let e = this.storage.getItem(Ys);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(Ys, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(qs), this.storage.removeItem(Js), this.storage.removeItem(Ys);
	}
}, Zs = V("auth", () => {
	let e = new Xs(), t = new Y({
		tokenStore: e,
		baseUrl: p("apiBase", "")
	}), n = S(null), r = S(!1), a = S(null), o = S(e.getAccessToken()), s = i(() => o.value !== null), c = i(() => n.value?.is_admin === !0);
	function l(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), o.value = t;
	}
	async function u(e, n) {
		r.value = !0, a.value = null;
		try {
			let r = await t.post("/api/v1/auth/login", {
				email: e,
				password: n
			});
			return l(r.access_token, r.refresh_token), await f(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function d(e, n, i) {
		r.value = !0, a.value = null;
		try {
			let r = await t.post("/api/v1/auth/register", {
				email: e,
				username: n,
				password: i
			});
			return l(r.access_token, r.refresh_token), await f(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function f() {
		if (s.value) try {
			n.value = await t.getCurrentUser();
		} catch {
			n.value = null, e.clear(), o.value = null;
		}
	}
	function m() {
		e.clear(), o.value = null, n.value = null;
	}
	return {
		user: n,
		loading: r,
		error: a,
		isLoggedIn: s,
		isAdmin: c,
		client: t,
		login: u,
		signup: d,
		fetchUser: f,
		logout: m
	};
}), Qs = {
	key: 0,
	class: "form-error"
}, $s = { class: "field" }, ec = { class: "field" }, tc = { class: "password-wrapper" }, nc = ["type"], rc = ["disabled"], ic = { class: "form-footer" }, ac = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Zs(), i = G(), a = S(""), o = S(""), f = S(!1);
		async function p() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = T("router-link");
			return b(), c("form", {
				class: "login-form",
				onSubmit: z(p, ["prevent"])
			}, [
				t[7] ||= l("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				k(r).error ? (b(), c("div", Qs, D(k(r).error), 1)) : s("", !0),
				l("div", $s, [t[3] ||= l("label", {
					for: "email",
					class: "label"
				}, "Email", -1), L(l("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[M, a.value]])]),
				l("div", ec, [t[4] ||= l("label", {
					for: "password",
					class: "label"
				}, "Password", -1), l("div", tc, [L(l("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: f.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, nc), [[j, o.value]]), l("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => f.value = !f.value
				}, D(f.value ? "🙈" : "👁"), 1)])]),
				l("button", {
					type: "submit",
					class: "submit-btn",
					disabled: k(r).loading
				}, D(k(r).loading ? "Signing in..." : "Sign in"), 9, rc),
				l("p", ic, [t[6] ||= u(" Don't have an account? ", -1), d(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: I(() => [...t[5] ||= [u("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), oc = { class: "auth-page" }, sc = { class: "auth-card" }, cc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (b(), c("div", oc, [l("div", sc, [d(ac, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), lc = {
	key: 0,
	class: "form-error"
}, uc = { class: "field" }, dc = { class: "field" }, fc = { class: "field" }, pc = { class: "password-wrapper" }, mc = ["type"], hc = { class: "field" }, gc = ["type"], _c = ["disabled"], vc = { class: "form-footer" }, yc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Zs(), i = G(), a = S(""), o = S(""), f = S(""), p = S(""), m = S(!1), h = S(null);
		async function g() {
			if (h.value = null, f.value.length < 8) {
				h.value = "Password must be at least 8 characters.";
				return;
			}
			if (f.value !== p.value) {
				h.value = "Passwords do not match.";
				return;
			}
			await r.signup(a.value, o.value, f.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = T("router-link");
			return b(), c("form", {
				class: "signup-form",
				onSubmit: z(g, ["prevent"])
			}, [
				t[11] ||= l("h2", { class: "form-title" }, "Create your Phlix account", -1),
				k(r).error || h.value ? (b(), c("div", lc, D(k(r).error || h.value), 1)) : s("", !0),
				l("div", uc, [t[5] ||= l("label", {
					for: "email",
					class: "label"
				}, "Email", -1), L(l("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[M, a.value]])]),
				l("div", dc, [t[6] ||= l("label", {
					for: "username",
					class: "label"
				}, "Username", -1), L(l("input", {
					id: "username",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: "text",
					class: "input",
					placeholder: "Your username",
					required: "",
					autocomplete: "username",
					minlength: "3"
				}, null, 512), [[M, o.value]])]),
				l("div", fc, [t[7] ||= l("label", {
					for: "password",
					class: "label"
				}, "Password", -1), l("div", pc, [L(l("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => f.value = e,
					type: m.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, mc), [[j, f.value]]), l("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => m.value = !m.value
				}, D(m.value ? "🙈" : "👁"), 1)])]),
				l("div", hc, [t[8] ||= l("label", {
					for: "confirm",
					class: "label"
				}, "Confirm password", -1), L(l("input", {
					id: "confirm",
					"onUpdate:modelValue": t[4] ||= (e) => p.value = e,
					type: m.value ? "text" : "password",
					class: "input",
					placeholder: "Repeat your password",
					required: "",
					autocomplete: "new-password"
				}, null, 8, gc), [[j, p.value]])]),
				l("button", {
					type: "submit",
					class: "submit-btn",
					disabled: k(r).loading
				}, D(k(r).loading ? "Creating account..." : "Create account"), 9, _c),
				l("p", vc, [t[10] ||= u(" Already have an account? ", -1), d(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: I(() => [...t[9] ||= [u("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), bc = { class: "auth-page" }, xc = { class: "auth-card" }, Sc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (b(), c("div", bc, [l("div", xc, [d(yc, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), Cc = { class: "settings-form" }, wc = {
	key: 0,
	class: "settings-loading"
}, Tc = {
	key: 1,
	class: "settings-error"
}, Ec = { class: "group-title" }, Dc = ["for"], Oc = { class: "setting-control" }, kc = [
	"id",
	"checked",
	"onChange"
], Ac = [
	"id",
	"value",
	"onChange"
], jc = [
	"id",
	"value",
	"onChange"
], Mc = { class: "settings-actions" }, Nc = {
	key: 0,
	class: "success-msg"
}, Pc = ["disabled"], Fc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = Zs(), u = S({}), d = S(!0), f = S(!1), p = S(null), m = S(null), h = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], g = i(() => r.groups ? h.filter((e) => r.groups.includes(e)) : h);
		async function _() {
			d.value = !0, p.value = null;
			try {
				u.value = await o.client.get("/api/v1/users/me/settings");
			} catch (e) {
				p.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				d.value = !1;
			}
		}
		async function v() {
			f.value = !0, p.value = null, m.value = null;
			try {
				await o.client.put("/api/v1/users/me/settings", u.value), m.value = "Settings saved.", a("saved", u.value), setTimeout(() => {
					m.value = null;
				}, 3e3);
			} catch (e) {
				p.value = e instanceof Error ? e.message : "Failed to save settings";
			} finally {
				f.value = !1;
			}
		}
		function x(e, t) {
			u.value[e] = t;
		}
		y(_);
		let w = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, T = {
			"hwaccel.enabled": {
				label: "Hardware acceleration",
				type: "bool"
			},
			"hwaccel.prefer_hardware": {
				label: "Prefer hardware encoding",
				type: "bool"
			},
			"hwaccel.probe_timeout": {
				label: "HW probe timeout (s)",
				type: "number"
			},
			"tmdb.api_key": {
				label: "TMDB API Key",
				type: "string"
			},
			"marker_detection.similarity_threshold": {
				label: "Intro similarity threshold",
				type: "number"
			},
			"marker_detection.intro_max_duration": {
				label: "Max intro duration (s)",
				type: "number"
			},
			"subtitles.enabled": {
				label: "Enable subtitles",
				type: "bool"
			},
			"subtitles.default_language": {
				label: "Default subtitle language",
				type: "string"
			},
			"subtitles.burn_in_by_default": {
				label: "Burn in subtitles by default",
				type: "bool"
			},
			"discovery.discovery_port": {
				label: "Discovery port",
				type: "number"
			},
			"trickplay.enabled": {
				label: "Enable trickplay",
				type: "bool"
			},
			"trickplay.interval_seconds": {
				label: "Trickplay interval (s)",
				type: "number"
			},
			"newsletter.enabled": {
				label: "Enable newsletter",
				type: "bool"
			},
			"newsletter.send_hour": {
				label: "Newsletter send hour",
				type: "number"
			},
			"port-forward.port_forwarding.upnp_enabled": {
				label: "Enable UPnP",
				type: "bool"
			},
			"trakt.client_id": {
				label: "Trakt client ID",
				type: "string"
			},
			"trakt.client_secret": {
				label: "Trakt client secret",
				type: "string"
			},
			"trakt.redirect_uri": {
				label: "Trakt redirect URI",
				type: "string"
			}
		};
		return (t, n) => (b(), c("div", Cc, [d.value ? (b(), c("div", wc, "Loading settings...")) : p.value ? (b(), c("div", Tc, D(p.value), 1)) : (b(), c(e, { key: 2 }, [(b(!0), c(e, null, C(g.value, (t) => (b(), c("div", {
			key: t,
			class: "settings-group"
		}, [l("h3", Ec, D(w[t]), 1), (b(), c(e, null, C(T, (e, n) => L(l("div", {
			key: n,
			class: "setting-row"
		}, [l("label", {
			for: n,
			class: "setting-label"
		}, D(e.label), 9, Dc), l("div", Oc, [e.type === "bool" ? (b(), c("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!u.value[n],
			onChange: (e) => x(n, e.target.checked)
		}, null, 40, kc)) : e.type === "number" ? (b(), c("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: u.value[n],
			onChange: (e) => x(n, Number(e.target.value))
		}, null, 40, Ac)) : (b(), c("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: u.value[n] ?? "",
			onChange: (e) => x(n, e.target.value)
		}, null, 40, jc))])]), [[N, n.startsWith(t)]])), 64))]))), 128)), l("div", Mc, [m.value ? (b(), c("div", Nc, D(m.value), 1)) : s("", !0), l("button", {
			class: "save-btn",
			disabled: f.value,
			onClick: v
		}, D(f.value ? "Saving..." : "Save settings"), 9, Pc)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), Ic = { class: "settings-page" }, Lc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (b(), c("div", Ic, [t[0] ||= l("div", { class: "settings-header" }, [l("h1", { class: "settings-title" }, "Settings")], -1), d(Fc)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function Rc() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function zc(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: Eo
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: rs
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: Ks
		},
		{
			path: `${t}/login`,
			name: "login",
			component: cc
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: Sc
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: Lc
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: yi,
		props: { appName: e.app }
	}), n;
}
function Bc(e) {
	let t = {
		...Rc(),
		...e
	};
	ui(t.defaultTheme);
	let n = B();
	t.defaultTheme && !Hr() && (J(n).theme = t.defaultTheme);
	let r = ee({
		history: te(t.routerBase || "/app"),
		routes: zc(t)
	}), i = a(gi);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var Vc = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, Hc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "AppBackdrop",
	props: {
		enabled: {
			type: Boolean,
			default: !0
		},
		grain: {
			type: Boolean,
			default: !0
		},
		vignette: {
			type: Boolean,
			default: !0
		},
		ambient: {
			type: Boolean,
			default: !1
		},
		ambientColor: {},
		ambientImage: {},
		intensity: { default: 1 }
	},
	setup(t) {
		let n = t, r = S(!1), a = null, o = null, l = () => r.value = !!(a?.matches || o?.matches);
		y(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (a = window.matchMedia("(prefers-reduced-motion: reduce)"), o = window.matchMedia("(prefers-reduced-data: reduce)"), l(), a.addEventListener?.("change", l), o.addEventListener?.("change", l));
		}), v(() => {
			a?.removeEventListener?.("change", l), o?.removeEventListener?.("change", l);
		});
		let u = i(() => n.enabled && !r.value), d = i(() => u.value && n.ambient && !!(n.ambientColor || n.ambientImage));
		function f(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let p = i(() => n.ambientImage ? {
			backgroundImage: `url("${f(n.ambientImage)}")`,
			opacity: String(.55 * n.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${n.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${n.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * n.intensity)
		}), m = i(() => ({ opacity: `calc(var(--grain-opacity) * ${n.intensity})` }));
		return (n, r) => (b(), c(e, null, [
			d.value ? (b(), c("div", {
				key: 0,
				class: g(["phlix-backdrop__ambient", { "is-image": !!t.ambientImage }]),
				style: _(p.value),
				"aria-hidden": "true"
			}, null, 6)) : s("", !0),
			u.value && t.vignette ? (b(), c("div", Vc)) : s("", !0),
			u.value && t.grain ? (b(), c("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: _(m.value),
				"aria-hidden": "true"
			}, null, 4)) : s("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), Uc = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], Wc = ["id"], Gc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Switch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = A();
		function a() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (b(), c("span", { class: g(["phlix-switch", { "is-disabled": e.disabled }]) }, [l("button", {
			type: "button",
			role: "switch",
			class: g(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? k(i) : void 0,
			disabled: e.disabled,
			onClick: a
		}, [...n[0] ||= [l("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, Uc), e.label ? (b(), c("label", {
			key: 0,
			id: k(i),
			class: "phlix-switch__label",
			onClick: a
		}, D(e.label), 9, Wc)) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-4631a106"]]), Kc = ["aria-labelledby"], qc = {
	key: 0,
	class: "phlix-modal__header"
}, Jc = ["id"], Yc = { class: "phlix-modal__body" }, Xc = {
	key: 1,
	class: "phlix-modal__footer"
}, Zc = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Modal",
	props: {
		modelValue: { type: Boolean },
		title: {},
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" }
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: r }) {
		let i = e, a = r, u = S(i.modelValue);
		P(() => i.modelValue, (e) => u.value = e);
		let f = S(null), p = A();
		function m() {
			a("update:modelValue", !1), a("close");
		}
		function h() {
			i.dismissible && m();
		}
		return jr(f, u, { onEscape: () => i.dismissible ? (m(), !0) : !1 }), (r, i) => (b(), o(t, { to: "body" }, [d(n, { name: "phlix-modal" }, {
			default: I(() => [e.modelValue ? (b(), c("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: z(h, ["self"])
			}, [l("div", {
				ref_key: "panelEl",
				ref: f,
				class: g(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? k(p) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (b(), c("header", qc, [e.title ? (b(), c("h2", {
					key: 0,
					id: k(p),
					class: "phlix-modal__title"
				}, D(e.title), 9, Jc)) : s("", !0), e.hideClose ? s("", !0) : (b(), o(Sr, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					class: "phlix-modal__close",
					onClick: m
				}))])) : s("", !0),
				l("div", Yc, [w(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (b(), c("footer", Xc, [w(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 10, Kc)], 32)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-ad69ec41"]]), Qc = ["aria-labelledby"], $c = {
	key: 0,
	class: "phlix-sheet__header"
}, el = ["id"], tl = { class: "phlix-sheet__body" }, nl = {
	key: 1,
	class: "phlix-sheet__footer"
}, rl = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Sheet",
	props: {
		modelValue: { type: Boolean },
		title: {},
		side: { default: "right" },
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: r }) {
		let i = e, a = r, u = S(i.modelValue);
		P(() => i.modelValue, (e) => u.value = e);
		let f = S(null), p = A();
		function m() {
			a("update:modelValue", !1), a("close");
		}
		function h() {
			i.dismissible && m();
		}
		return jr(f, u, { onEscape: () => i.dismissible ? (m(), !0) : !1 }), (r, i) => (b(), o(t, { to: "body" }, [d(n, { name: `phlix-sheet-${e.side}` }, {
			default: I(() => [e.modelValue ? (b(), c("div", {
				key: 0,
				class: g(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: z(h, ["self"])
			}, [l("aside", {
				ref_key: "panelEl",
				ref: f,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? k(p) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (b(), c("header", $c, [e.title ? (b(), c("h2", {
					key: 0,
					id: k(p),
					class: "phlix-sheet__title"
				}, D(e.title), 9, el)) : s("", !0), e.hideClose ? s("", !0) : (b(), o(Sr, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: m
				}))])) : s("", !0),
				l("div", tl, [w(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (b(), c("footer", nl, [w(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 8, Qc)], 34)) : s("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), il = ["id"], al = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Tooltip",
	props: {
		text: {},
		placement: { default: "top" },
		delay: { default: 300 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, r = A(), i = S(!1), a = S(null), o;
		function l() {
			return a.value?.firstElementChild ?? null;
		}
		function f() {
			t.disabled || (clearTimeout(o), o = setTimeout(() => {
				i.value = !0, l()?.setAttribute("aria-describedby", r);
			}, t.delay));
		}
		function p() {
			clearTimeout(o), i.value = !1, l()?.removeAttribute("aria-describedby");
		}
		return v(() => clearTimeout(o)), (t, o) => (b(), c("span", {
			ref_key: "wrapEl",
			ref: a,
			class: "phlix-tooltip-wrap",
			onMouseenter: f,
			onMouseleave: p,
			onFocusin: f,
			onFocusout: p,
			onKeydown: R(p, ["esc"])
		}, [w(t.$slots, "default", {}, void 0, !0), d(n, { name: "phlix-tooltip" }, {
			default: I(() => [i.value && (e.text || t.$slots.content) ? (b(), c("span", {
				key: 0,
				id: k(r),
				role: "tooltip",
				class: g(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [w(t.$slots, "content", {}, () => [u(D(e.text), 1)], !0)], 10, il)) : s("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), ol = ["role"], sl = { class: "phlix-toast__content" }, cl = {
	key: 0,
	class: "phlix-toast__title"
}, ll = { class: "phlix-toast__message" }, ul = ["onClick"], dl = 0, fl = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(n) {
		let i = ji(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, u = (e) => e.icon ?? a[e.tone];
		return y(() => {
			dl++;
		}), v(() => {
			dl--;
		}), (a, f) => (b(), o(t, { to: "body" }, [l("div", {
			class: g(["phlix-toasts", `phlix-toasts--${n.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [d(r, { name: "phlix-toast" }, {
			default: I(() => [(b(!0), c(e, null, C(k(i).toasts, (e) => (b(), c("div", {
				key: e.id,
				class: g(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				d(q, {
					name: u(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				l("div", sl, [e.title ? (b(), c("p", cl, D(e.title), 1)) : s("", !0), l("p", ll, D(e.message), 1)]),
				e.action ? (b(), c("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), k(i).dismiss(e.id);
					}
				}, D(e.action.label), 9, ul)) : s("", !0),
				d(Sr, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => k(i).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, ol))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), pl = ["aria-label"], ml = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = i(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (b(), c("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: _(n.value ? { fontSize: n.value } : void 0)
		}, [d(q, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, pl));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), hl = { class: "phlix-tabs" }, gl = ["aria-label"], _l = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], vl = ["id", "aria-labelledby"], yl = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: n }) {
		let r = t, a = n, d = A(), f = S(null), p = i(() => r.tabs.findIndex((e) => e.value === r.modelValue)), m = (e) => `${d}-tab-${e}`, h = (e) => `${d}-panel-${e}`, _ = i(() => r.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function v(e) {
			let t = r.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== r.modelValue && a("update:modelValue", e);
		}
		function y(e) {
			f.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function x(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = $(_.value, p.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = $(_.value, p.value, -1);
					break;
				case "Home":
					t = $(_.value, -1, 1);
					break;
				case "End":
					t = $(_.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), v(r.tabs[t].value), y(t));
		}
		return (n, r) => (b(), c("div", hl, [l("div", {
			ref_key: "listEl",
			ref: f,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": t.label,
			onKeydown: x
		}, [(b(!0), c(e, null, C(t.tabs, (e) => (b(), c("button", {
			id: m(e.value),
			key: e.value,
			type: "button",
			role: "tab",
			class: g(["phlix-tabs__tab", { "is-active": e.value === t.modelValue }]),
			"aria-selected": e.value === t.modelValue,
			"aria-controls": h(e.value),
			tabindex: e.value === t.modelValue ? 0 : -1,
			disabled: e.disabled,
			onClick: (t) => v(e.value)
		}, [e.icon ? (b(), o(q, {
			key: 0,
			name: e.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : s("", !0), u(" " + D(e.label), 1)], 10, _l))), 128))], 40, gl), t.modelValue ? (b(), c("div", {
			key: 0,
			id: h(t.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": m(t.modelValue),
			tabindex: "0"
		}, [w(n.$slots, t.modelValue, {}, () => [w(n.$slots, "default", {}, void 0, !0)], !0)], 8, vl)) : s("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), bl = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "Reveal",
	props: {
		tag: { default: "div" },
		delay: { default: 0 },
		y: { default: 12 },
		whenVisible: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = S(null), r = S(!1), i = S(!1), a = null, s = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return y(() => {
			if (s) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), v(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (b(), o(E(e.tag), {
			ref_key: "el",
			ref: n,
			class: g(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: _({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: I(() => [w(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), xl = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, r) => (b(), o(n, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: I(() => [w(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Sl = "__all__", Cl = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async list() {
		let { files: e } = await this.client.get("/api/v1/admin/logs");
		return Array.isArray(e) ? e : [];
	}
	async tail(e, t = 200) {
		let n = await this.client.get("/api/v1/admin/logs/tail", {
			file: e,
			lines: String(t)
		});
		return {
			file: typeof n.file == "string" ? n.file : e,
			lines: Array.isArray(n.lines) ? n.lines : [],
			truncated: n.truncated === !0
		};
	}
	async tailAll(e = 200) {
		let t = await this.client.get("/api/v1/admin/logs/tail-all", { lines: String(e) });
		return {
			files: Array.isArray(t.files) ? t.files : [],
			lines: Array.isArray(t.lines) ? t.lines : [],
			truncated: t.truncated === !0
		};
	}
}, wl = {
	class: "admin-logs",
	"aria-labelledby": "logs-heading"
}, Tl = { class: "admin-logs__controls" }, El = { class: "admin-logs__field" }, Dl = { class: "admin-logs__field" }, Ol = {
	key: 0,
	class: "admin-logs__truncated",
	role: "note"
}, kl = {
	key: 1,
	class: "admin-logs__loading",
	"aria-hidden": "true"
}, Al = 5e3, jl = /*@__PURE__*/ f({
	__name: "LogsPage",
	props: { client: {} },
	setup(e) {
		let t = [
			200,
			500,
			1e3,
			2e3
		], n = e, r = p("apiBase", ""), a = i(() => typeof r == "string" ? r : r?.value ?? ""), o = new Cl(n.client ?? new Y({
			baseUrl: a.value,
			tokenStore: new Xs()
		})), f = ji(), m = S([]), g = S(""), _ = S(200), x = S([]), C = S(!1), w = S(!1), T = S(null), E = null, O = i(() => m.value.length === 0 ? [{
			value: "",
			label: "(no log files)"
		}] : [{
			value: Sl,
			label: "All logs (combined)"
		}, ...m.value.map((e) => ({
			value: e.name,
			label: e.name
		}))]), A = i(() => t.map((e) => ({
			value: e,
			label: String(e)
		})));
		async function j() {
			try {
				let e = await o.list();
				m.value = e, e.length > 0 && g.value === "" && (g.value = e[0].name);
			} catch (e) {
				f.error(e instanceof Error ? e.message : "Failed to list logs.");
			}
		}
		async function M() {
			let e = g.value;
			if (e !== "") {
				w.value = !0;
				try {
					let t = e === "__all__" ? await o.tailAll(_.value) : await o.tail(e, _.value);
					x.value = t.lines, C.value = t.truncated, h(() => {
						T.value && (T.value.scrollTop = T.value.scrollHeight);
					});
				} catch (e) {
					f.error(e instanceof Error ? e.message : "Failed to read log.");
				} finally {
					w.value = !1;
				}
			}
		}
		function N() {
			E !== null && (clearInterval(E), E = null);
		}
		function F() {
			N(), L.value && g.value !== "" && (E = setInterval(() => void M(), Al));
		}
		let L = S(!1);
		return P([g, _], () => void M()), P([
			L,
			g,
			_
		], F), y(j), v(N), (e, t) => (b(), c("section", wl, [
			t[6] ||= l("header", { class: "admin-logs__head" }, [l("h1", {
				id: "logs-heading",
				class: "admin-logs__title"
			}, "Logs")], -1),
			l("div", Tl, [
				l("label", El, [t[3] ||= l("span", { class: "admin-logs__label" }, "File", -1), d(Ja, {
					modelValue: g.value,
					"onUpdate:modelValue": t[0] ||= (e) => g.value = e,
					options: O.value,
					label: "Log file"
				}, null, 8, ["modelValue", "options"])]),
				l("label", Dl, [t[4] ||= l("span", { class: "admin-logs__label" }, "Lines", -1), d(Ja, {
					"model-value": _.value,
					options: A.value,
					label: "Line count",
					"onUpdate:modelValue": t[1] ||= (e) => _.value = Number(e)
				}, null, 8, ["model-value", "options"])]),
				d(Ao, {
					variant: "outline",
					size: "sm",
					loading: w.value,
					disabled: g.value === "",
					onClick: M
				}, {
					default: I(() => [...t[5] ||= [u(" Refresh ", -1)]]),
					_: 1
				}, 8, ["loading", "disabled"]),
				d(Gc, {
					modelValue: L.value,
					"onUpdate:modelValue": t[2] ||= (e) => L.value = e,
					label: "Auto-refresh (5s)",
					class: "admin-logs__toggle"
				}, null, 8, ["modelValue"])
			]),
			C.value ? (b(), c("p", Ol, " Showing the most recent " + D(_.value) + " lines (" + D(g.value === k("__all__") ? "more lines available across files" : "file is larger") + "). ", 1)) : s("", !0),
			w.value && x.value.length === 0 ? (b(), c("div", kl, [d(Q, {
				variant: "text",
				lines: 8
			})])) : (b(), c("pre", {
				key: 2,
				ref_key: "preEl",
				ref: T,
				class: "admin-logs__output",
				"data-testid": "logs-output",
				"aria-live": "polite"
			}, D(x.value.length === 0 ? "(no output)" : x.value.join("\n")), 513))
		]));
	}
}), Ml = /* @__PURE__ */ re({ default: () => Nl }), Nl = /*#__PURE__*/ K(jl, [["__scopeId", "data-v-a9b0d206"]]);
//#endregion
//#region src/app/admin.ts
function Pl(e = "/app") {
	return [{
		path: `${`${e}/admin`}/logs`,
		name: "admin-logs",
		component: () => Promise.resolve().then(() => Ml)
	}];
}
function Fl(e = "/app") {
	return [{
		id: "admin",
		label: "Admin",
		icon: "settings",
		children: [{
			id: "admin-logs",
			label: "Logs",
			icon: "list",
			to: `${`${e}/admin`}/logs`
		}]
	}];
}
//#endregion
//#region src/pages/LibraryScanPage.vue?vue&type=script&setup=true&lang.ts
var Il = { class: "library-scan-page" }, Ll = {
	key: 0,
	class: "loading"
}, Rl = {
	key: 1,
	class: "error"
}, zl = {
	key: 2,
	class: "libraries-list"
}, Bl = { class: "library-info" }, Vl = { class: "library-name" }, Hl = { class: "library-type" }, Ul = { class: "library-paths" }, Wl = { class: "library-meta" }, Gl = { key: 0 }, Kl = {
	key: 0,
	class: "scan-status"
}, ql = { class: "library-actions" }, Jl = ["onClick", "disabled"], Yl = ["onClick", "disabled"], Xl = {
	key: 0,
	class: "empty-state"
}, Zl = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "LibraryScanPage",
	setup(t) {
		let n = S([]), r = S({}), i = S(!0), a = S(null);
		async function o() {
			try {
				n.value = (await X.get("/api/v1/libraries")).libraries || [];
				for (let e of n.value) u(e.id);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to load libraries";
			} finally {
				i.value = !1;
			}
		}
		async function u(e) {
			try {
				let t = await X.get(`/api/v1/libraries/${e}/scan-status`);
				t.job && (r.value[e] = t.job);
			} catch {}
		}
		async function d(e) {
			try {
				await X.post(`/api/v1/libraries/${e}/scan`), await u(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger scan";
			}
		}
		async function f(e) {
			try {
				await X.post(`/api/v1/libraries/${e}/rescan`), await u(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger rescan";
			}
		}
		function p(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function m(e) {
			if (!e) return "";
			switch (e.status) {
				case "queued": return "⏳ Queued";
				case "running": return "🔄 Running";
				case "completed": return "✅ Completed";
				case "failed": return `❌ Failed: ${e.error || "Unknown error"}`;
				default: return e.status;
			}
		}
		return y(() => {
			o();
		}), (t, o) => (b(), c("div", Il, [o[0] ||= l("div", { class: "scan-header" }, [l("h1", { class: "scan-title" }, "Library Scanner"), l("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), i.value ? (b(), c("div", Ll, "Loading libraries...")) : a.value ? (b(), c("div", Rl, D(a.value), 1)) : (b(), c("div", zl, [(b(!0), c(e, null, C(n.value, (e) => (b(), c("div", {
			key: e.id,
			class: "library-card"
		}, [l("div", Bl, [
			l("h3", Vl, D(e.name), 1),
			l("span", Hl, D(e.type), 1),
			l("p", Ul, D(e.paths.join(", ")), 1),
			l("div", Wl, [e.item_count === void 0 ? s("", !0) : (b(), c("span", Gl, D(e.item_count) + " items", 1)), l("span", null, "Last scan: " + D(p(e.last_scan_at)), 1)]),
			r.value[e.id] ? (b(), c("div", Kl, D(m(r.value[e.id])), 1)) : s("", !0)
		]), l("div", ql, [l("button", {
			class: "btn btn-scan",
			onClick: (t) => d(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Scan ", 8, Jl), l("button", {
			class: "btn btn-rescan",
			onClick: (t) => f(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Rescan ", 8, Yl)])]))), 128)), n.value.length === 0 ? (b(), c("div", Xl, " No libraries configured. Add a library to get started. ")) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), Ql = { class: "my-servers-page" }, $l = {
	key: 0,
	class: "loading"
}, eu = {
	key: 1,
	class: "error"
}, tu = {
	key: 2,
	class: "servers-list"
}, nu = { class: "server-info" }, ru = { class: "server-name" }, iu = { class: "server-url" }, au = { class: "server-meta" }, ou = { key: 0 }, su = {
	key: 0,
	class: "empty-state"
}, cu = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "MyServersPage",
	setup(t) {
		let n = S([]), r = S(!0), i = S(null);
		async function a() {
			try {
				n.value = (await X.get("/api/v1/servers")).servers || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load servers";
			} finally {
				r.value = !1;
			}
		}
		function o(e) {
			switch (e) {
				case "online": return "#22c55e";
				case "offline": return "#ef4444";
				case "connecting": return "#eab308";
				default: return "#6b7280";
			}
		}
		function u(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return y(() => {
			a();
		}), (t, a) => (b(), c("div", Ql, [a[2] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "My Servers"), l("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), r.value ? (b(), c("div", $l, "Loading servers...")) : i.value ? (b(), c("div", eu, D(i.value), 1)) : (b(), c("div", tu, [(b(!0), c(e, null, C(n.value, (e) => (b(), c("div", {
			key: e.id,
			class: "server-card"
		}, [
			l("div", {
				class: "server-status",
				style: _({ backgroundColor: o(e.status) })
			}, null, 4),
			l("div", nu, [
				l("h3", ru, D(e.name), 1),
				l("p", iu, D(e.url), 1),
				l("div", au, [
					l("span", null, D(e.owner), 1),
					e.library_count === void 0 ? s("", !0) : (b(), c("span", ou, D(e.library_count) + " libraries", 1)),
					l("span", null, "Last seen: " + D(u(e.last_seen)), 1)
				])
			]),
			a[0] ||= l("div", { class: "server-actions" }, [l("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), n.value.length === 0 ? (b(), c("div", su, [...a[1] ||= [l("p", null, "No servers connected yet.", -1), l("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), lu = { class: "federation-page" }, uu = {
	key: 0,
	class: "loading"
}, du = {
	key: 1,
	class: "error"
}, fu = {
	key: 2,
	class: "federation-content"
}, pu = { class: "peers-section" }, mu = { class: "peers-list" }, hu = { class: "peer-info" }, gu = { class: "peer-name" }, _u = { class: "peer-url" }, vu = { class: "peer-meta" }, yu = { key: 0 }, bu = { class: "peer-actions" }, xu = ["onClick"], Su = {
	key: 1,
	class: "status-badge"
}, Cu = {
	key: 0,
	class: "empty-state"
}, wu = { class: "add-peer-section" }, Tu = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "FederationPage",
	setup(t) {
		let n = S([]), r = S(!0), i = S(null);
		async function a() {
			try {
				n.value = (await X.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load federation peers";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await X.post("/api/v1/federation/connect", { url: e }), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to connect to peer";
			}
		}
		async function u(e) {
			try {
				await X.post(`/api/v1/federation/peers/${e}/disconnect`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to disconnect peer";
			}
		}
		function d(e) {
			switch (e) {
				case "connected": return "#22c55e";
				case "disconnected": return "#ef4444";
				case "pending": return "#eab308";
				default: return "#6b7280";
			}
		}
		function f(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return y(() => {
			a();
		}), (t, a) => (b(), c("div", lu, [a[5] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Federation"), l("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), r.value ? (b(), c("div", uu, "Loading federation peers...")) : i.value ? (b(), c("div", du, D(i.value), 1)) : (b(), c("div", fu, [l("div", pu, [a[2] ||= l("h2", { class: "section-title" }, "Connected Peers", -1), l("div", mu, [(b(!0), c(e, null, C(n.value, (e) => (b(), c("div", {
			key: e.id,
			class: "peer-card"
		}, [
			l("div", {
				class: "peer-status",
				style: _({ backgroundColor: d(e.status) })
			}, null, 4),
			l("div", hu, [
				l("h3", gu, D(e.name), 1),
				l("p", _u, D(e.url), 1),
				l("div", vu, [e.shared_libraries_count === void 0 ? s("", !0) : (b(), c("span", yu, D(e.shared_libraries_count) + " shared libraries", 1)), l("span", null, "Last sync: " + D(f(e.last_sync)), 1)])
			]),
			l("div", bu, [e.status === "connected" ? (b(), c("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => u(e.id)
			}, " Disconnect ", 8, xu)) : e.status === "pending" ? (b(), c("span", Su, "Pending")) : s("", !0)])
		]))), 128)), n.value.length === 0 ? (b(), c("div", Cu, [...a[1] ||= [l("p", null, "No federation peers connected.", -1)]])) : s("", !0)])]), l("div", wu, [a[4] ||= l("h2", { class: "section-title" }, "Add Peer", -1), l("form", {
			class: "add-peer-form",
			onSubmit: a[0] ||= z((e) => o(""), ["prevent"])
		}, [...a[3] ||= [l("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), l("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), Eu = { class: "manage-shares-page" }, Du = {
	key: 0,
	class: "loading"
}, Ou = {
	key: 1,
	class: "error"
}, ku = {
	key: 2,
	class: "shares-list"
}, Au = { class: "share-info" }, ju = { class: "share-library" }, Mu = { class: "share-meta" }, Nu = {
	key: 0,
	class: "expired-badge"
}, Pu = { class: "share-dates" }, Fu = { key: 0 }, Iu = { class: "share-actions" }, Lu = ["onClick"], Ru = {
	key: 0,
	class: "empty-state"
}, zu = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "ManageSharesPage",
	setup(t) {
		let n = S([]), r = S(!0), i = S(null);
		async function a() {
			try {
				n.value = (await X.get("/api/v1/shares")).shares || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load shares";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await X.delete(`/api/v1/shares/${e}`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to revoke share";
			}
		}
		function d(e) {
			return new Date(e).toLocaleString();
		}
		function f(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		return y(() => {
			a();
		}), (t, a) => (b(), c("div", Eu, [a[1] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Manage Shares"), l("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), r.value ? (b(), c("div", Du, "Loading shares...")) : i.value ? (b(), c("div", Ou, D(i.value), 1)) : (b(), c("div", ku, [(b(!0), c(e, null, C(n.value, (e) => (b(), c("div", {
			key: e.id,
			class: "share-card"
		}, [l("div", Au, [
			l("h3", ju, D(e.library_name), 1),
			l("div", Mu, [
				l("span", null, "Shared with: " + D(e.shared_with), 1),
				l("span", { class: g(["permission-badge", e.permissions]) }, D(e.permissions), 3),
				e.expires_at && f(e.expires_at) ? (b(), c("span", Nu, "Expired")) : s("", !0)
			]),
			l("p", Pu, [u(" Created: " + D(d(e.created_at)) + " ", 1), e.expires_at ? (b(), c("span", Fu, " | Expires: " + D(d(e.expires_at)), 1)) : s("", !0)])
		]), l("div", Iu, [l("button", {
			class: "btn btn-danger",
			onClick: (t) => o(e.id)
		}, "Revoke", 8, Lu)])]))), 128)), n.value.length === 0 ? (b(), c("div", Ru, [...a[0] ||= [l("p", null, "No library shares found.", -1)]])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), Bu = { class: "audit-logs-page" }, Vu = {
	key: 0,
	class: "loading"
}, Hu = {
	key: 1,
	class: "error"
}, Uu = {
	key: 2,
	class: "logs-container"
}, Wu = { class: "logs-list" }, Gu = { class: "log-content" }, Ku = { class: "log-header" }, qu = { class: "log-action" }, Ju = { class: "log-actor" }, Yu = { class: "log-time" }, Xu = {
	key: 0,
	class: "log-target"
}, Zu = {
	key: 1,
	class: "log-details"
}, Qu = {
	key: 2,
	class: "log-ip"
}, $u = {
	key: 0,
	class: "empty-state"
}, ed = {
	key: 0,
	class: "pagination"
}, td = ["disabled"], nd = { class: "page-info" }, rd = ["disabled"], id = /*#__PURE__*/ K(/* @__PURE__ */ f({
	__name: "AuditLogsPage",
	setup(t) {
		let n = S([]), r = S(!0), i = S(null), a = S(1), o = S(1);
		async function u(e = 1) {
			try {
				r.value = !0;
				let t = await X.get("/api/v1/audit-logs", { page: String(e) });
				n.value = t.logs || [], a.value = t.page || 1, o.value = t.total_pages || 1;
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load audit logs";
			} finally {
				r.value = !1;
			}
		}
		function d(e) {
			return new Date(e).toLocaleString();
		}
		function f(e) {
			return e.includes("create") || e.includes("add") ? "#22c55e" : e.includes("delete") || e.includes("remove") ? "#ef4444" : e.includes("update") || e.includes("edit") ? "#3b82f6" : e.includes("login") || e.includes("auth") ? "#8b5cf6" : "#6b7280";
		}
		function p(e) {
			return e.includes("create") || e.includes("add") ? "+" : e.includes("delete") || e.includes("remove") ? "-" : e.includes("update") || e.includes("edit") ? "~" : e.includes("login") || e.includes("auth") ? "@" : "#";
		}
		return y(() => {
			u();
		}), (t, m) => (b(), c("div", Bu, [m[3] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Audit Logs"), l("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), r.value ? (b(), c("div", Vu, "Loading audit logs...")) : i.value ? (b(), c("div", Hu, D(i.value), 1)) : (b(), c("div", Uu, [l("div", Wu, [(b(!0), c(e, null, C(n.value, (e) => (b(), c("div", {
			key: e.id,
			class: "log-entry"
		}, [l("div", {
			class: "log-icon",
			style: _({ backgroundColor: f(e.action) })
		}, D(p(e.action)), 5), l("div", Gu, [
			l("div", Ku, [
				l("span", qu, D(e.action), 1),
				l("span", Ju, D(e.actor), 1),
				l("span", Yu, D(d(e.created_at)), 1)
			]),
			e.target ? (b(), c("p", Xu, "Target: " + D(e.target), 1)) : s("", !0),
			e.details ? (b(), c("p", Zu, D(e.details), 1)) : s("", !0),
			e.ip_address ? (b(), c("span", Qu, "IP: " + D(e.ip_address), 1)) : s("", !0)
		])]))), 128)), n.value.length === 0 ? (b(), c("div", $u, [...m[2] ||= [l("p", null, "No audit logs found.", -1)]])) : s("", !0)]), o.value > 1 ? (b(), c("div", ed, [
			l("button", {
				class: "btn btn-secondary",
				disabled: a.value <= 1,
				onClick: m[0] ||= (e) => u(a.value - 1)
			}, " Previous ", 8, td),
			l("span", nd, "Page " + D(a.value) + " of " + D(o.value), 1),
			l("button", {
				class: "btn btn-secondary",
				disabled: a.value >= o.value,
				onClick: m[1] ||= (e) => u(a.value + 1)
			}, " Next ", 8, rd)
		])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function ad(e, t) {
	let n = Ti(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = P(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = P(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
export { Sl as ALL_LOGS, ds as ARROW_ICONS, fs as ARROW_LABELS, Cl as AdminLogsApi, Nl as AdminLogsPage, Y as ApiClient, bi as ApiError, Hc as AppBackdrop, pe as AppLayout, id as AuditLogsPage, Xa as Badge, Eo as BrowsePage, Ao as Button, Pa as Chip, Ua as Combobox, $r as CommandPalette, Rr as DEFAULT_PREFERENCES, ga as EmptyState, Tu as FederationPage, bo as FilterBar, q as Icon, Sr as IconButton, Tr as Kbd, Zl as LibraryScanPage, Xs as LocalStorageTokenStore, ac as LoginForm, cc as LoginPage, zu as ManageSharesPage, ta as MediaCard, Qo as MediaDetail, rs as MediaDetailPage, ua as MediaGrid, Aa as MediaHomeRow, Da as MediaRow, Zc as Modal, cu as MyServersPage, us as PLAYER_SHORTCUTS, xl as PageTransition, gi as PhlixApp, Hs as Player, Ks as PlayerPage, ks as QualityMenu, Di as RESUME_MAX_RATIO, Ei as RESUME_MIN_SECONDS, bl as Reveal, ls as Scrubber, Ja as Select, Fc as SettingsForm, Lc as SettingsPage, rl as Sheet, Cs as ShortcutsHelp, yc as SignupForm, Sc as SignupPage, Q as Skeleton, Ts as Slider, Os as SpeedMenu, ml as Spinner, Gc as Switch, yl as Tabs, fl as ToastHost, al as Tooltip, Ds as VolumeControl, Fl as adminMenu, ui as applyStoredThemeEarly, ad as bindMediaStoreToRouter, Pl as buildAdminRoutes, Oa as buildMediaQuery, ka as buildMediaUrl, Bc as createPhlixApp, si as deriveAccentVars, is as formatTime, Pr as fuzzyScore, hs as handleShortcut, Hr as hasStoredPreferences, ms as isTypingTarget, Fr as matchCommand, Vr as readStoredPreferences, Zs as useAuthStore, Lr as useCommandStore, jr as useFocusTrap, gs as useKeyboardShortcuts, Ti as useMediaStore, Z as usePlayerStore, J as usePreferencesStore, di as useTheme, ji as useToastStore };

//# sourceMappingURL=phlix-ui.js.map