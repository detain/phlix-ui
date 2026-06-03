import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createVNode as o, defineComponent as s, markRaw as c, normalizeClass as l, normalizeStyle as u, openBlock as d, ref as ee, renderList as te, renderSlot as ne, resolveDynamicComponent as re } from "vue";
import { defineStore as ie } from "pinia";
//#region \0plugin-vue:export-helper
var f = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ae = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oe(e, t) {
	return d(), i("svg", ae, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var se = c({
	name: "lucide-play",
	render: oe
}), ce = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function le(e, t) {
	return d(), i("svg", ce, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), a("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var ue = c({
	name: "lucide-pause",
	render: le
}), de = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function p(e, t) {
	return d(), i("svg", de, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var m = c({
	name: "lucide-skip-back",
	render: p
}), h = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function g(e, t) {
	return d(), i("svg", h, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var _ = c({
	name: "lucide-skip-forward",
	render: g
}), v = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function y(e, t) {
	return d(), i("svg", v, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), a("path", { d: "M3 3v5h5" })], -1)]]);
}
var b = c({
	name: "lucide-rotate-ccw",
	render: y
}), x = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function S(e, t) {
	return d(), i("svg", x, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), a("path", { d: "M21 3v5h-5" })], -1)]]);
}
var C = c({
	name: "lucide-rotate-cw",
	render: S
}), w = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function T(e, t) {
	return d(), i("svg", w, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var E = c({
	name: "lucide-volume-2",
	render: T
}), D = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function O(e, t) {
	return d(), i("svg", D, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var k = c({
	name: "lucide-volume-1",
	render: O
}), A = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function j(e, t) {
	return d(), i("svg", A, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var M = c({
	name: "lucide-volume-x",
	render: j
}), N = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function P(e, t) {
	return d(), i("svg", N, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), a("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var F = c({
	name: "lucide-captions",
	render: P
}), I = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function L(e, t) {
	return d(), i("svg", I, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var R = c({
	name: "lucide-captions-off",
	render: L
}), z = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function B(e, t) {
	return d(), i("svg", z, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), a("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var V = c({
	name: "lucide-picture-in-picture-2",
	render: B
}), H = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fe(e, t) {
	return d(), i("svg", H, [...t[0] ||= [a("rect", {
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
var pe = c({
	name: "lucide-rectangle-horizontal",
	render: fe
}), me = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function he(e, t) {
	return d(), i("svg", me, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var ge = c({
	name: "lucide-maximize",
	render: he
}), _e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ve(e, t) {
	return d(), i("svg", _e, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var ye = c({
	name: "lucide-minimize",
	render: ve
}), be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xe(e, t) {
	return d(), i("svg", be, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var Se = c({
	name: "lucide-maximize-2",
	render: xe
}), Ce = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function we(e, t) {
	return d(), i("svg", Ce, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var Te = c({
	name: "lucide-cast",
	render: we
}), Ee = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function De(e, t) {
	return d(), i("svg", Ee, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), a("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var Oe = c({
	name: "lucide-settings",
	render: De
}), ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ae(e, t) {
	return d(), i("svg", ke, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var je = c({
	name: "lucide-gauge",
	render: Ae
}), Me = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ne(e, t) {
	return d(), i("svg", Me, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), a("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var Pe = c({
	name: "lucide-film",
	render: Ne
}), Fe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ie(e, t) {
	return d(), i("svg", Fe, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		a("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		a("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		a("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var Le = c({
	name: "lucide-image",
	render: Ie
}), Re = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ze(e, t) {
	return d(), i("svg", Re, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		a("path", { d: "M9 18V5l12-2v13" }),
		a("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		a("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var Be = c({
	name: "lucide-music",
	render: ze
}), Ve = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function He(e, t) {
	return d(), i("svg", Ve, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "m17 2l-5 5l-5-5" }), a("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var Ue = c({
	name: "lucide-tv",
	render: He
}), We = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ge(e, t) {
	return d(), i("svg", We, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "m21 21l-4.34-4.34" }), a("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var Ke = c({
	name: "lucide-search",
	render: Ge
}), qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Je(e, t) {
	return d(), i("svg", qe, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Ye = c({
	name: "lucide-sliders-horizontal",
	render: Je
}), Xe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ze(e, t) {
	return d(), i("svg", Xe, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		a("path", { d: "M8 2v4m8-4v4" }),
		a("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		a("path", { d: "M3 10h18" })
	], -1)]]);
}
var Qe = c({
	name: "lucide-calendar",
	render: Ze
}), $e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function et(e, t) {
	return d(), i("svg", $e, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var tt = c({
	name: "lucide-arrow-up-down",
	render: et
}), nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rt(e, t) {
	return d(), i("svg", nt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var it = c({
	name: "lucide-star",
	render: rt
}), at = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ot(e, t) {
	return d(), i("svg", at, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var st = c({
	name: "lucide-list",
	render: ot
}), ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lt(e, t) {
	return d(), i("svg", ct, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var ut = c({
	name: "lucide-plus",
	render: lt
}), dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ft(e, t) {
	return d(), i("svg", dt, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), a("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var pt = c({
	name: "lucide-info",
	render: ft
}), mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ht(e, t) {
	return d(), i("svg", mt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var gt = c({
	name: "lucide-x",
	render: ht
}), _t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vt(e, t) {
	return d(), i("svg", _t, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var U = c({
	name: "lucide-check",
	render: vt
}), yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bt(e, t) {
	return d(), i("svg", yt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var xt = c({
	name: "lucide-bookmark",
	render: bt
}), St = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ct(e, t) {
	return d(), i("svg", St, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var wt = c({
	name: "lucide-bookmark-plus",
	render: Ct
}), Tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Et(e, t) {
	return d(), i("svg", Tt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Dt = c({
	name: "lucide-heart",
	render: Et
}), Ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kt(e, t) {
	return d(), i("svg", Ot, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), a("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var At = c({
	name: "lucide-user",
	render: kt
}), jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mt(e, t) {
	return d(), i("svg", jt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Nt = c({
	name: "lucide-log-out",
	render: Mt
}), Pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ft(e, t) {
	return d(), i("svg", Pt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var It = c({
	name: "lucide-menu",
	render: Ft
}), Lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rt(e, t) {
	return d(), i("svg", Lt, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		a("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		a("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		a("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var zt = c({
	name: "lucide-more-horizontal",
	render: Rt
}), Bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vt(e, t) {
	return d(), i("svg", Bt, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), a("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var Ht = c({
	name: "lucide-eye",
	render: Vt
}), Ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wt(e, t) {
	return d(), i("svg", Ut, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), a("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Gt = c({
	name: "lucide-eye-off",
	render: Wt
}), Kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qt(e, t) {
	return d(), i("svg", Kt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Jt = c({
	name: "lucide-arrow-left",
	render: qt
}), Yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xt(e, t) {
	return d(), i("svg", Yt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Zt = c({
	name: "lucide-arrow-right",
	render: Xt
}), Qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $t(e, t) {
	return d(), i("svg", Qt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var en = c({
	name: "lucide-arrow-up",
	render: $t
}), tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nn(e, t) {
	return d(), i("svg", tn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var rn = c({
	name: "lucide-arrow-down",
	render: nn
}), an = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function on(e, t) {
	return d(), i("svg", an, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var sn = c({
	name: "lucide-chevron-down",
	render: on
}), cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ln(e, t) {
	return d(), i("svg", cn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var un = c({
	name: "lucide-chevron-up",
	render: ln
}), dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fn(e, t) {
	return d(), i("svg", dn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var pn = c({
	name: "lucide-chevron-left",
	render: fn
}), mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hn(e, t) {
	return d(), i("svg", mn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var gn = c({
	name: "lucide-chevron-right",
	render: hn
}), _n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vn(e, t) {
	return d(), i("svg", _n, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var yn = c({
	name: "lucide-loader-circle",
	render: vn
}), bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xn(e, t) {
	return d(), i("svg", bn, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), a("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var Sn = c({
	name: "lucide-circle-alert",
	render: xn
}), Cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wn(e, t) {
	return d(), i("svg", Cn, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), a("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var Tn = c({
	name: "lucide-circle-check",
	render: wn
}), En = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dn(e, t) {
	return d(), i("svg", En, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), a("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var On = c({
	name: "lucide-circle-x",
	render: Dn
}), kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function An(e, t) {
	return d(), i("svg", kn, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), a("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var jn = c({
	name: "lucide-sun",
	render: An
}), Mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nn(e, t) {
	return d(), i("svg", Mn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Pn = c({
	name: "lucide-moon",
	render: Nn
}), Fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function In(e, t) {
	return d(), i("svg", Fn, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), a("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var Ln = c({
	name: "lucide-monitor",
	render: In
}), W = /* @__PURE__ */ s({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let r = {
			play: se,
			pause: ue,
			"skip-back": m,
			"skip-forward": _,
			rewind: b,
			forward: C,
			volume: E,
			"volume-low": k,
			mute: M,
			captions: F,
			"captions-off": R,
			pip: V,
			theater: pe,
			fullscreen: ge,
			"fullscreen-exit": ye,
			expand: Se,
			cast: Te,
			settings: Oe,
			speed: je,
			film: Pe,
			image: Le,
			music: Be,
			tv: Ue,
			search: Ke,
			filter: Ye,
			calendar: Qe,
			sort: tt,
			star: it,
			list: st,
			plus: ut,
			info: pt,
			x: gt,
			check: U,
			bookmark: xt,
			"bookmark-plus": wt,
			heart: Dt,
			user: At,
			"log-out": Nt,
			menu: It,
			more: zt,
			eye: Ht,
			"eye-off": Gt,
			"arrow-left": Jt,
			"arrow-right": Zt,
			"arrow-up": en,
			"arrow-down": rn,
			"chevron-down": sn,
			"chevron-up": un,
			"chevron-left": pn,
			"chevron-right": gn,
			spinner: yn,
			alert: Sn,
			success: Tn,
			error: On,
			sun: jn,
			moon: Pn,
			monitor: Ln
		}, i = e, a = t(() => r[i.name]), o = t(() => i.size === void 0 ? void 0 : typeof i.size == "number" ? `${i.size}px` : i.size);
		return (t, r) => (d(), n(re(a.value), {
			class: "phlix-icon",
			style: u(o.value ? { fontSize: o.value } : void 0),
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
}), G = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, K = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, q = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function Rn(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function J() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region src/api/client.ts
var zn = 15e3;
function Y(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
var X = class {
	baseUrl;
	tokens;
	doFetch;
	timeoutMs;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? {
			getAccessToken: () => null,
			setAccessToken: () => {},
			getRefreshToken: () => null,
			setRefreshToken: () => {},
			getUser: () => null,
			setUser: () => {},
			clear: () => {}
		}, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? zn;
	}
	async request(e, t, n = null, r) {
		let i = (t) => {
			let r = { "Content-Type": "application/json" }, i = this.tokens.getAccessToken();
			i && (r.Authorization = `Bearer ${i}`);
			let a = {
				method: e,
				headers: r,
				credentials: "same-origin",
				signal: t
			};
			return n !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (a.body = JSON.stringify(n)), a;
		}, a = `${this.baseUrl}${t}`, o = new AbortController(), s = !1, c = setTimeout(() => {
			s = !0, o.abort();
		}, this.timeoutMs), l = () => o.abort();
		r && (r.aborted ? o.abort() : r.addEventListener("abort", l, { once: !0 }));
		try {
			let e = await this.doFetch(a, i(o.signal));
			return e.status === 401 && await this.refreshToken() && (e = await this.doFetch(a, i(o.signal))), await this.handleResponse(e);
		} catch (e) {
			throw s ? new q() : r?.aborted || e instanceof G ? e : e instanceof TypeError || J() ? new K() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new G(this.extractError(t), e.status, t);
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
			is_admin: Y(e.is_admin)
		};
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
	}
}, Bn = new X(), Z = "access_token", Q = "refresh_token", $ = "user", Vn = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(Z);
	}
	setAccessToken(e) {
		this.storage.setItem(Z, e);
	}
	getRefreshToken() {
		return this.storage.getItem(Q);
	}
	setRefreshToken(e) {
		this.storage.setItem(Q, e);
	}
	getUser() {
		let e = this.storage.getItem($);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem($, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(Z), this.storage.removeItem(Q), this.storage.removeItem($);
	}
}, Hn = ie("phlix-toast", () => {
	let e = ee([]), t = /* @__PURE__ */ new Map(), n = 0;
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
}), Un = {
	key: 0,
	class: "phlix-skel-text",
	"aria-hidden": "true"
}, Wn = /*#__PURE__*/ f(/* @__PURE__ */ s({
	__name: "Skeleton",
	props: {
		variant: { default: "rect" },
		width: {},
		height: {},
		radius: {},
		lines: { default: 1 }
	},
	setup(t) {
		return (n, r) => t.variant === "text" ? (d(), i("div", Un, [(d(!0), i(e, null, te(t.lines, (e) => (d(), i("span", {
			key: e,
			class: "phlix-skel phlix-skel--text",
			style: u({ width: e === t.lines && t.lines > 1 ? "60%" : t.width })
		}, null, 4))), 128))])) : (d(), i("span", {
			key: 1,
			class: l(["phlix-skel", `phlix-skel--${t.variant}`]),
			"aria-hidden": "true",
			style: u({
				width: t.width,
				height: t.height,
				borderRadius: t.radius
			})
		}, null, 6));
	}
}), [["__scopeId", "data-v-c34e4066"]]), Gn = [
	"type",
	"disabled",
	"aria-busy"
], Kn = {
	key: 0,
	class: "phlix-btn__spinner"
}, qn = { class: "phlix-btn__label" }, Jn = /*#__PURE__*/ f(/* @__PURE__ */ s({
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
		let s = e, c = t(() => s.disabled || s.loading);
		return (t, s) => (d(), i("button", {
			type: e.type,
			class: l(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: c.value,
			"aria-busy": e.loading || void 0
		}, [
			e.loading ? (d(), i("span", Kn, [o(W, { name: "spinner" })])) : r("", !0),
			e.leftIcon && !e.loading ? (d(), n(W, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : r("", !0),
			a("span", qn, [ne(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (d(), n(W, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : r("", !0)
		], 10, Gn));
	}
}), [["__scopeId", "data-v-8cdee95a"]]);
//#endregion
export { X as a, G as c, Rn as d, J as f, Vn as i, K as l, f as m, Wn as n, Bn as o, W as p, Hn as r, Y as s, Jn as t, q as u };

//# sourceMappingURL=Button-DjEQ9y17.js.map