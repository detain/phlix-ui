import { computed as e, createBlock as t, createCommentVNode as n, createElementBlock as r, createElementVNode as i, createVNode as a, defineComponent as o, markRaw as s, normalizeClass as c, normalizeStyle as l, openBlock as u, renderSlot as ee, resolveDynamicComponent as te } from "vue";
//#region \0plugin-vue:export-helper
var d = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ne = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function re(e, t) {
	return u(), r("svg", ne, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var ie = s({
	name: "lucide-play",
	render: re
}), ae = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function oe(e, t) {
	return u(), r("svg", ae, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), i("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var se = s({
	name: "lucide-pause",
	render: oe
}), ce = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function f(e, t) {
	return u(), r("svg", ce, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var p = s({
	name: "lucide-skip-back",
	render: f
}), m = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function h(e, t) {
	return u(), r("svg", m, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var g = s({
	name: "lucide-skip-forward",
	render: h
}), _ = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function v(e, t) {
	return u(), r("svg", _, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), i("path", { d: "M3 3v5h5" })], -1)]]);
}
var y = s({
	name: "lucide-rotate-ccw",
	render: v
}), b = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function x(e, t) {
	return u(), r("svg", b, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), i("path", { d: "M21 3v5h-5" })], -1)]]);
}
var S = s({
	name: "lucide-rotate-cw",
	render: x
}), C = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function w(e, t) {
	return u(), r("svg", C, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var T = s({
	name: "lucide-volume-2",
	render: w
}), E = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function D(e, t) {
	return u(), r("svg", E, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var O = s({
	name: "lucide-volume-1",
	render: D
}), k = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function A(e, t) {
	return u(), r("svg", k, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var j = s({
	name: "lucide-volume-x",
	render: A
}), M = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function N(e, t) {
	return u(), r("svg", M, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), i("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var P = s({
	name: "lucide-captions",
	render: N
}), F = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function I(e, t) {
	return u(), r("svg", F, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var L = s({
	name: "lucide-captions-off",
	render: I
}), R = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function z(e, t) {
	return u(), r("svg", R, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), i("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var B = s({
	name: "lucide-picture-in-picture-2",
	render: z
}), V = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function H(e, t) {
	return u(), r("svg", V, [...t[0] ||= [i("rect", {
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
var U = s({
	name: "lucide-rectangle-horizontal",
	render: H
}), W = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function G(e, t) {
	return u(), r("svg", W, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var le = s({
	name: "lucide-maximize",
	render: G
}), ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function de(e, t) {
	return u(), r("svg", ue, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var fe = s({
	name: "lucide-minimize",
	render: de
}), pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function me(e, t) {
	return u(), r("svg", pe, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var he = s({
	name: "lucide-maximize-2",
	render: me
}), ge = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _e(e, t) {
	return u(), r("svg", ge, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var ve = s({
	name: "lucide-cast",
	render: _e
}), ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function be(e, t) {
	return u(), r("svg", ye, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), i("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var xe = s({
	name: "lucide-settings",
	render: be
}), Se = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ce(e, t) {
	return u(), r("svg", Se, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var we = s({
	name: "lucide-gauge",
	render: Ce
}), Te = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ee(e, t) {
	return u(), r("svg", Te, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), i("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var De = s({
	name: "lucide-film",
	render: Ee
}), Oe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ke(e, t) {
	return u(), r("svg", Oe, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		i("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		i("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		i("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var Ae = s({
	name: "lucide-image",
	render: ke
}), je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Me(e, t) {
	return u(), r("svg", je, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		i("path", { d: "M9 18V5l12-2v13" }),
		i("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		i("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var Ne = s({
	name: "lucide-music",
	render: Me
}), Pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fe(e, t) {
	return u(), r("svg", Pe, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "m17 2l-5 5l-5-5" }), i("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var Ie = s({
	name: "lucide-tv",
	render: Fe
}), Le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Re(e, t) {
	return u(), r("svg", Le, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "m21 21l-4.34-4.34" }), i("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var ze = s({
	name: "lucide-search",
	render: Re
}), Be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ve(e, t) {
	return u(), r("svg", Be, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var He = s({
	name: "lucide-sliders-horizontal",
	render: Ve
}), Ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function We(e, t) {
	return u(), r("svg", Ue, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		i("path", { d: "M8 2v4m8-4v4" }),
		i("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		i("path", { d: "M3 10h18" })
	], -1)]]);
}
var Ge = s({
	name: "lucide-calendar",
	render: We
}), Ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qe(e, t) {
	return u(), r("svg", Ke, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Je = s({
	name: "lucide-arrow-up-down",
	render: qe
}), Ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xe(e, t) {
	return u(), r("svg", Ye, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var Ze = s({
	name: "lucide-star",
	render: Xe
}), Qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $e(e, t) {
	return u(), r("svg", Qe, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var et = s({
	name: "lucide-list",
	render: $e
}), tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nt(e, t) {
	return u(), r("svg", tt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var rt = s({
	name: "lucide-plus",
	render: nt
}), it = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function at(e, t) {
	return u(), r("svg", it, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), i("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var ot = s({
	name: "lucide-info",
	render: at
}), st = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function K(e, t) {
	return u(), r("svg", st, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var ct = s({
	name: "lucide-x",
	render: K
}), lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ut(e, t) {
	return u(), r("svg", lt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var dt = s({
	name: "lucide-check",
	render: ut
}), ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pt(e, t) {
	return u(), r("svg", ft, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var mt = s({
	name: "lucide-bookmark",
	render: pt
}), ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gt(e, t) {
	return u(), r("svg", ht, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var _t = s({
	name: "lucide-bookmark-plus",
	render: gt
}), vt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yt(e, t) {
	return u(), r("svg", vt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var bt = s({
	name: "lucide-heart",
	render: yt
}), xt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function St(e, t) {
	return u(), r("svg", xt, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), i("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Ct = s({
	name: "lucide-user",
	render: St
}), wt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tt(e, t) {
	return u(), r("svg", wt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Et = s({
	name: "lucide-log-out",
	render: Tt
}), Dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ot(e, t) {
	return u(), r("svg", Dt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var kt = s({
	name: "lucide-menu",
	render: Ot
}), At = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jt(e, t) {
	return u(), r("svg", At, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		i("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		i("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		i("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var Mt = s({
	name: "lucide-more-horizontal",
	render: jt
}), Nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pt(e, t) {
	return u(), r("svg", Nt, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), i("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var Ft = s({
	name: "lucide-eye",
	render: Pt
}), It = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Lt(e, t) {
	return u(), r("svg", It, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), i("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Rt = s({
	name: "lucide-eye-off",
	render: Lt
}), zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bt(e, t) {
	return u(), r("svg", zt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Vt = s({
	name: "lucide-arrow-left",
	render: Bt
}), Ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ut(e, t) {
	return u(), r("svg", Ht, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Wt = s({
	name: "lucide-arrow-right",
	render: Ut
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return u(), r("svg", Gt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var qt = s({
	name: "lucide-arrow-up",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return u(), r("svg", Jt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var Xt = s({
	name: "lucide-arrow-down",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qt(e, t) {
	return u(), r("svg", Zt, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var $t = s({
	name: "lucide-chevron-down",
	render: Qt
}), en = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tn(e, t) {
	return u(), r("svg", en, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var nn = s({
	name: "lucide-chevron-up",
	render: tn
}), rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function an(e, t) {
	return u(), r("svg", rn, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var on = s({
	name: "lucide-chevron-left",
	render: an
}), sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cn(e, t) {
	return u(), r("svg", sn, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var ln = s({
	name: "lucide-chevron-right",
	render: cn
}), un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dn(e, t) {
	return u(), r("svg", un, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var fn = s({
	name: "lucide-loader-circle",
	render: dn
}), pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mn(e, t) {
	return u(), r("svg", pn, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), i("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var hn = s({
	name: "lucide-circle-alert",
	render: mn
}), gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _n(e, t) {
	return u(), r("svg", gn, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), i("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var vn = s({
	name: "lucide-circle-check",
	render: _n
}), yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bn(e, t) {
	return u(), r("svg", yn, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), i("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var xn = s({
	name: "lucide-circle-x",
	render: bn
}), Sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cn(e, t) {
	return u(), r("svg", Sn, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), i("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var wn = s({
	name: "lucide-sun",
	render: Cn
}), Tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function En(e, t) {
	return u(), r("svg", Tn, [...t[0] ||= [i("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Dn = s({
	name: "lucide-moon",
	render: En
}), On = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kn(e, t) {
	return u(), r("svg", On, [...t[0] ||= [i("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [i("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), i("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var An = s({
	name: "lucide-monitor",
	render: kn
}), q = /* @__PURE__ */ o({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(n) {
		let r = {
			play: ie,
			pause: se,
			"skip-back": p,
			"skip-forward": g,
			rewind: y,
			forward: S,
			volume: T,
			"volume-low": O,
			mute: j,
			captions: P,
			"captions-off": L,
			pip: B,
			theater: U,
			fullscreen: le,
			"fullscreen-exit": fe,
			expand: he,
			cast: ve,
			settings: xe,
			speed: we,
			film: De,
			image: Ae,
			music: Ne,
			tv: Ie,
			search: ze,
			filter: He,
			calendar: Ge,
			sort: Je,
			star: Ze,
			list: et,
			plus: rt,
			info: ot,
			x: ct,
			check: dt,
			bookmark: mt,
			"bookmark-plus": _t,
			heart: bt,
			user: Ct,
			"log-out": Et,
			menu: kt,
			more: Mt,
			eye: Ft,
			"eye-off": Rt,
			"arrow-left": Vt,
			"arrow-right": Wt,
			"arrow-up": qt,
			"arrow-down": Xt,
			"chevron-down": $t,
			"chevron-up": nn,
			"chevron-left": on,
			"chevron-right": ln,
			spinner: fn,
			alert: hn,
			success: vn,
			error: xn,
			sun: wn,
			moon: Dn,
			monitor: An
		}, i = n, a = e(() => r[i.name]), o = e(() => i.size === void 0 ? void 0 : typeof i.size == "number" ? `${i.size}px` : i.size);
		return (e, r) => (u(), t(te(a.value), {
			class: "phlix-icon",
			style: l(o.value ? { fontSize: o.value } : void 0),
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
}), J = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, Y = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, X = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function jn(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function Z() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region src/api/client.ts
var Mn = 15e3;
function Q(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
var $ = class {
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
		}, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? Mn;
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
			throw s ? new X() : r?.aborted || e instanceof J ? e : e instanceof TypeError || Z() ? new Y() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new J(this.extractError(t), e.status, t);
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
			is_admin: Q(e.is_admin)
		};
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
	}
}, Nn = new $(), Pn = [
	"type",
	"disabled",
	"aria-busy"
], Fn = {
	key: 0,
	class: "phlix-btn__spinner"
}, In = { class: "phlix-btn__label" }, Ln = /*#__PURE__*/ d(/* @__PURE__ */ o({
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
	setup(o) {
		let s = o, l = e(() => s.disabled || s.loading);
		return (e, s) => (u(), r("button", {
			type: o.type,
			class: c(["phlix-btn", [
				`phlix-btn--${o.variant}`,
				`phlix-btn--${o.size}`,
				{
					"phlix-btn--block": o.block,
					"is-loading": o.loading
				}
			]]),
			disabled: l.value,
			"aria-busy": o.loading || void 0
		}, [
			o.loading ? (u(), r("span", Fn, [a(q, { name: "spinner" })])) : n("", !0),
			o.leftIcon && !o.loading ? (u(), t(q, {
				key: 1,
				name: o.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : n("", !0),
			i("span", In, [ee(e.$slots, "default", {}, void 0, !0)]),
			o.rightIcon ? (u(), t(q, {
				key: 2,
				name: o.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : n("", !0)
		], 10, Pn));
	}
}), [["__scopeId", "data-v-8cdee95a"]]);
//#endregion
export { J as a, jn as c, d, Q as i, Z as l, $ as n, Y as o, Nn as r, X as s, Ln as t, q as u };

//# sourceMappingURL=Button-C4PyCjLX.js.map