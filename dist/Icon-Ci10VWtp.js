import { computed as e, createBlock as t, createElementBlock as n, createElementVNode as r, defineComponent as i, markRaw as a, normalizeStyle as ee, openBlock as o, resolveDynamicComponent as s } from "vue";
//#region ~icons/lucide/play
var c = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function te(e, t) {
	return o(), n("svg", c, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var ne = a({
	name: "lucide-play",
	render: te
}), l = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function u(e, t) {
	return o(), n("svg", l, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), r("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var d = a({
	name: "lucide-pause",
	render: u
}), f = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function p(e, t) {
	return o(), n("svg", f, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var m = a({
	name: "lucide-skip-back",
	render: p
}), h = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function g(e, t) {
	return o(), n("svg", h, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var _ = a({
	name: "lucide-skip-forward",
	render: g
}), v = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function y(e, t) {
	return o(), n("svg", v, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), r("path", { d: "M3 3v5h5" })], -1)]]);
}
var b = a({
	name: "lucide-rotate-ccw",
	render: y
}), x = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function S(e, t) {
	return o(), n("svg", x, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), r("path", { d: "M21 3v5h-5" })], -1)]]);
}
var C = a({
	name: "lucide-rotate-cw",
	render: S
}), w = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function T(e, t) {
	return o(), n("svg", w, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var E = a({
	name: "lucide-volume-2",
	render: T
}), D = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function O(e, t) {
	return o(), n("svg", D, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var k = a({
	name: "lucide-volume-1",
	render: O
}), A = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function j(e, t) {
	return o(), n("svg", A, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var M = a({
	name: "lucide-volume-x",
	render: j
}), N = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function P(e, t) {
	return o(), n("svg", N, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), r("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var F = a({
	name: "lucide-shuffle",
	render: P
}), I = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function L(e, t) {
	return o(), n("svg", I, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "m17 2l4 4l-4 4" }),
		r("path", { d: "M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4l4-4" }),
		r("path", { d: "M21 13v1a4 4 0 0 1-4 4H3" })
	], -1)]]);
}
var R = a({
	name: "lucide-repeat",
	render: L
}), z = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function B(e, t) {
	return o(), n("svg", z, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "m17 2l4 4l-4 4" }),
		r("path", { d: "M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4l4-4" }),
		r("path", { d: "M21 13v1a4 4 0 0 1-4 4H3m8-8h1v4" })
	], -1)]]);
}
var V = a({
	name: "lucide-repeat-1",
	render: B
}), H = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function U(e, t) {
	return o(), n("svg", H, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M16 5H3m8 7H3m8 7H3m18-3V5" }), r("circle", {
		cx: "18",
		cy: "16",
		r: "3"
	})], -1)]]);
}
var W = a({
	name: "lucide-list-music",
	render: U
}), G = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function K(e, t) {
	return o(), n("svg", G, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), r("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var q = a({
	name: "lucide-captions",
	render: K
}), J = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Y(e, t) {
	return o(), n("svg", J, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var X = a({
	name: "lucide-captions-off",
	render: Y
}), Z = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function re(e, t) {
	return o(), n("svg", Z, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), r("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var ie = a({
	name: "lucide-picture-in-picture-2",
	render: re
}), ae = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oe(e, t) {
	return o(), n("svg", ae, [...t[0] ||= [r("rect", {
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
var se = a({
	name: "lucide-rectangle-horizontal",
	render: oe
}), ce = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function le(e, t) {
	return o(), n("svg", ce, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var ue = a({
	name: "lucide-maximize",
	render: le
}), de = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fe(e, t) {
	return o(), n("svg", de, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var pe = a({
	name: "lucide-minimize",
	render: fe
}), me = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function he(e, t) {
	return o(), n("svg", me, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var ge = a({
	name: "lucide-maximize-2",
	render: he
}), _e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ve(e, t) {
	return o(), n("svg", _e, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var ye = a({
	name: "lucide-cast",
	render: ve
}), be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xe(e, t) {
	return o(), n("svg", be, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), r("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var Se = a({
	name: "lucide-settings",
	render: xe
}), Ce = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function we(e, t) {
	return o(), n("svg", Ce, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Te = a({
	name: "lucide-gauge",
	render: we
}), Ee = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function De(e, t) {
	return o(), n("svg", Ee, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), r("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var Oe = a({
	name: "lucide-film",
	render: De
}), ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ae(e, t) {
	return o(), n("svg", ke, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		r("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		r("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var je = a({
	name: "lucide-image",
	render: Ae
}), Me = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ne(e, t) {
	return o(), n("svg", Me, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "M9 18V5l12-2v13" }),
		r("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		r("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var Pe = a({
	name: "lucide-music",
	render: Ne
}), Fe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ie(e, t) {
	return o(), n("svg", Fe, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m17 2l-5 5l-5-5" }), r("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var Le = a({
	name: "lucide-tv",
	render: Ie
}), Re = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ze(e, t) {
	return o(), n("svg", Re, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m21 21l-4.34-4.34" }), r("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var Be = a({
	name: "lucide-search",
	render: ze
}), Ve = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function He(e, t) {
	return o(), n("svg", Ve, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Ue = a({
	name: "lucide-sliders-horizontal",
	render: He
}), We = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ge(e, t) {
	return o(), n("svg", We, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "M8 2v4m8-4v4" }),
		r("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		r("path", { d: "M3 10h18" })
	], -1)]]);
}
var Ke = a({
	name: "lucide-calendar",
	render: Ge
}), qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Je(e, t) {
	return o(), n("svg", qe, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Ye = a({
	name: "lucide-arrow-up-down",
	render: Je
}), Xe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ze(e, t) {
	return o(), n("svg", Xe, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var Qe = a({
	name: "lucide-star",
	render: Ze
}), $e = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function et(e, t) {
	return o(), n("svg", $e, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var tt = a({
	name: "lucide-list",
	render: et
}), nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rt(e, t) {
	return o(), n("svg", nt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var it = a({
	name: "lucide-plus",
	render: rt
}), at = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ot(e, t) {
	return o(), n("svg", at, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var st = a({
	name: "lucide-info",
	render: ot
}), ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lt(e, t) {
	return o(), n("svg", ct, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Q = a({
	name: "lucide-x",
	render: lt
}), ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dt(e, t) {
	return o(), n("svg", ut, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var ft = a({
	name: "lucide-check",
	render: dt
}), pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mt(e, t) {
	return o(), n("svg", pt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2"
	}), r("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })], -1)]]);
}
var ht = a({
	name: "lucide-lock",
	render: mt
}), gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _t(e, t) {
	return o(), n("svg", gt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var vt = a({
	name: "lucide-bookmark",
	render: _t
}), yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bt(e, t) {
	return o(), n("svg", yt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var xt = a({
	name: "lucide-bookmark-plus",
	render: bt
}), St = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ct(e, t) {
	return o(), n("svg", St, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var wt = a({
	name: "lucide-heart",
	render: Ct
}), Tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Et(e, t) {
	return o(), n("svg", Tt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var Dt = a({
	name: "lucide-thumbs-up",
	render: Et
}), Ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kt(e, t) {
	return o(), n("svg", Ot, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var At = a({
	name: "lucide-thumbs-down",
	render: kt
}), jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mt(e, t) {
	return o(), n("svg", jt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), r("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Nt = a({
	name: "lucide-user",
	render: Mt
}), Pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ft(e, t) {
	return o(), n("svg", Pt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var It = a({
	name: "lucide-log-out",
	render: Ft
}), Lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rt(e, t) {
	return o(), n("svg", Lt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var zt = a({
	name: "lucide-menu",
	render: Rt
}), Bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vt(e, t) {
	return o(), n("svg", Bt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		r("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		r("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var Ht = a({
	name: "lucide-more-horizontal",
	render: Vt
}), Ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wt(e, t) {
	return o(), n("svg", Ut, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), r("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var Gt = a({
	name: "lucide-eye",
	render: Wt
}), Kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qt(e, t) {
	return o(), n("svg", Kt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), r("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Jt = a({
	name: "lucide-eye-off",
	render: qt
}), Yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xt(e, t) {
	return o(), n("svg", Yt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m15.5 7.5l2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4m2-2l-9.6 9.6" }), r("circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5"
	})], -1)]]);
}
var Zt = a({
	name: "lucide-key",
	render: Xt
}), Qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $t(e, t) {
	return o(), n("svg", Qt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var en = a({
	name: "lucide-trash",
	render: $t
}), tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nn(e, t) {
	return o(), n("svg", tn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var rn = a({
	name: "lucide-arrow-left",
	render: nn
}), an = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function on(e, t) {
	return o(), n("svg", an, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var sn = a({
	name: "lucide-arrow-right",
	render: on
}), cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ln(e, t) {
	return o(), n("svg", cn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var un = a({
	name: "lucide-arrow-up",
	render: ln
}), dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fn(e, t) {
	return o(), n("svg", dn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var pn = a({
	name: "lucide-arrow-down",
	render: fn
}), mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hn(e, t) {
	return o(), n("svg", mn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var gn = a({
	name: "lucide-chevron-down",
	render: hn
}), _n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vn(e, t) {
	return o(), n("svg", _n, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var yn = a({
	name: "lucide-chevron-up",
	render: vn
}), bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xn(e, t) {
	return o(), n("svg", bn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Sn = a({
	name: "lucide-chevron-left",
	render: xn
}), Cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wn(e, t) {
	return o(), n("svg", Cn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Tn = a({
	name: "lucide-chevron-right",
	render: wn
}), En = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dn(e, t) {
	return o(), n("svg", En, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var On = a({
	name: "lucide-loader-circle",
	render: Dn
}), kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function An(e, t) {
	return o(), n("svg", kn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var $ = a({
	name: "lucide-circle-alert",
	render: An
}), jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mn(e, t) {
	return o(), n("svg", jn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var Nn = a({
	name: "lucide-circle-check",
	render: Mn
}), Pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fn(e, t) {
	return o(), n("svg", Pn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var In = a({
	name: "lucide-circle-x",
	render: Fn
}), Ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rn(e, t) {
	return o(), n("svg", Ln, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), r("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var zn = a({
	name: "lucide-sun",
	render: Rn
}), Bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vn(e, t) {
	return o(), n("svg", Bn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Hn = a({
	name: "lucide-moon",
	render: Vn
}), Un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wn(e, t) {
	return o(), n("svg", Un, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), r("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var Gn = a({
	name: "lucide-monitor",
	render: Wn
}), Kn = /* @__PURE__ */ i({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(n) {
		let r = {
			play: ne,
			pause: d,
			"skip-back": m,
			"skip-forward": _,
			rewind: b,
			forward: C,
			volume: E,
			"volume-low": k,
			mute: M,
			shuffle: F,
			repeat: R,
			"repeat-1": V,
			"list-music": W,
			captions: q,
			"captions-off": X,
			pip: ie,
			theater: se,
			fullscreen: ue,
			"fullscreen-exit": pe,
			expand: ge,
			cast: ye,
			settings: Se,
			speed: Te,
			film: Oe,
			image: je,
			music: Pe,
			tv: Le,
			search: Be,
			filter: Ue,
			calendar: Ke,
			sort: Ye,
			star: Qe,
			list: tt,
			plus: it,
			info: st,
			x: Q,
			check: ft,
			lock: ht,
			bookmark: vt,
			"bookmark-plus": xt,
			heart: wt,
			"thumbs-up": Dt,
			"thumbs-down": At,
			user: Nt,
			"log-out": It,
			menu: zt,
			more: Ht,
			eye: Gt,
			"eye-off": Jt,
			refresh: C,
			key: Zt,
			trash: en,
			"arrow-left": rn,
			"arrow-right": sn,
			"arrow-up": un,
			"arrow-down": pn,
			"chevron-down": gn,
			"chevron-up": yn,
			"chevron-left": Sn,
			"chevron-right": Tn,
			spinner: On,
			alert: $,
			"alert-circle": $,
			success: Nn,
			error: In,
			sun: zn,
			moon: Hn,
			monitor: Gn
		}, i = n, a = e(() => r[i.name]), c = e(() => i.size === void 0 ? void 0 : typeof i.size == "number" ? `${i.size}px` : i.size);
		return (e, r) => (o(), t(s(a.value), {
			class: "phlix-icon",
			style: ee(c.value ? { fontSize: c.value } : void 0),
			"stroke-width": n.strokeWidth,
			role: n.label ? "img" : void 0,
			"aria-label": n.label,
			"aria-hidden": n.label ? void 0 : "true",
			focusable: "false"
		}, null, 8, [
			"style",
			"stroke-width",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
});
//#endregion
export { Kn as t };

//# sourceMappingURL=Icon-Ci10VWtp.js.map