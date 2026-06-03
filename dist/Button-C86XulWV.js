import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, markRaw as l, normalizeClass as u, normalizeStyle as d, openBlock as f, ref as ee, renderList as te, renderSlot as p, resolveDynamicComponent as ne, toDisplayString as m } from "vue";
import { defineStore as re } from "pinia";
//#region \0plugin-vue:export-helper
var h = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ie = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ae(e, t) {
	return f(), i("svg", ie, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var oe = l({
	name: "lucide-play",
	render: ae
}), se = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ce(e, t) {
	return f(), i("svg", se, [...t[0] ||= [a("g", {
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
var le = l({
	name: "lucide-pause",
	render: ce
}), ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function de(e, t) {
	return f(), i("svg", ue, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var g = l({
	name: "lucide-skip-back",
	render: de
}), _ = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function v(e, t) {
	return f(), i("svg", _, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var y = l({
	name: "lucide-skip-forward",
	render: v
}), b = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function x(e, t) {
	return f(), i("svg", b, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), a("path", { d: "M3 3v5h5" })], -1)]]);
}
var S = l({
	name: "lucide-rotate-ccw",
	render: x
}), C = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function w(e, t) {
	return f(), i("svg", C, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), a("path", { d: "M21 3v5h-5" })], -1)]]);
}
var T = l({
	name: "lucide-rotate-cw",
	render: w
}), E = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function D(e, t) {
	return f(), i("svg", E, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var O = l({
	name: "lucide-volume-2",
	render: D
}), k = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function A(e, t) {
	return f(), i("svg", k, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var j = l({
	name: "lucide-volume-1",
	render: A
}), M = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function N(e, t) {
	return f(), i("svg", M, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var P = l({
	name: "lucide-volume-x",
	render: N
}), F = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function I(e, t) {
	return f(), i("svg", F, [...t[0] ||= [a("g", {
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
var L = l({
	name: "lucide-captions",
	render: I
}), R = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function z(e, t) {
	return f(), i("svg", R, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var B = l({
	name: "lucide-captions-off",
	render: z
}), V = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function H(e, t) {
	return f(), i("svg", V, [...t[0] ||= [a("g", {
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
var fe = l({
	name: "lucide-picture-in-picture-2",
	render: H
}), pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function me(e, t) {
	return f(), i("svg", pe, [...t[0] ||= [a("rect", {
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
var he = l({
	name: "lucide-rectangle-horizontal",
	render: me
}), ge = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _e(e, t) {
	return f(), i("svg", ge, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var ve = l({
	name: "lucide-maximize",
	render: _e
}), ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function be(e, t) {
	return f(), i("svg", ye, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var xe = l({
	name: "lucide-minimize",
	render: be
}), Se = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ce(e, t) {
	return f(), i("svg", Se, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var we = l({
	name: "lucide-maximize-2",
	render: Ce
}), Te = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ee(e, t) {
	return f(), i("svg", Te, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var De = l({
	name: "lucide-cast",
	render: Ee
}), Oe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ke(e, t) {
	return f(), i("svg", Oe, [...t[0] ||= [a("g", {
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
var Ae = l({
	name: "lucide-settings",
	render: ke
}), je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Me(e, t) {
	return f(), i("svg", je, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Ne = l({
	name: "lucide-gauge",
	render: Me
}), Pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fe(e, t) {
	return f(), i("svg", Pe, [...t[0] ||= [a("g", {
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
var Ie = l({
	name: "lucide-film",
	render: Fe
}), Le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Re(e, t) {
	return f(), i("svg", Le, [...t[0] ||= [a("g", {
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
var ze = l({
	name: "lucide-image",
	render: Re
}), Be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ve(e, t) {
	return f(), i("svg", Be, [...t[0] ||= [a("g", {
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
var He = l({
	name: "lucide-music",
	render: Ve
}), Ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function We(e, t) {
	return f(), i("svg", Ue, [...t[0] ||= [a("g", {
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
var Ge = l({
	name: "lucide-tv",
	render: We
}), Ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qe(e, t) {
	return f(), i("svg", Ke, [...t[0] ||= [a("g", {
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
var Je = l({
	name: "lucide-search",
	render: qe
}), Ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xe(e, t) {
	return f(), i("svg", Ye, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Ze = l({
	name: "lucide-sliders-horizontal",
	render: Xe
}), Qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $e(e, t) {
	return f(), i("svg", Qe, [...t[0] ||= [a("g", {
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
var et = l({
	name: "lucide-calendar",
	render: $e
}), tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nt(e, t) {
	return f(), i("svg", tt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var rt = l({
	name: "lucide-arrow-up-down",
	render: nt
}), it = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function at(e, t) {
	return f(), i("svg", it, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var ot = l({
	name: "lucide-star",
	render: at
}), st = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ct(e, t) {
	return f(), i("svg", st, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var lt = l({
	name: "lucide-list",
	render: ct
}), ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dt(e, t) {
	return f(), i("svg", ut, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var ft = l({
	name: "lucide-plus",
	render: dt
}), pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mt(e, t) {
	return f(), i("svg", pt, [...t[0] ||= [a("g", {
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
var ht = l({
	name: "lucide-info",
	render: mt
}), gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _t(e, t) {
	return f(), i("svg", gt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var vt = l({
	name: "lucide-x",
	render: _t
}), yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bt(e, t) {
	return f(), i("svg", yt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var xt = l({
	name: "lucide-check",
	render: bt
}), St = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ct(e, t) {
	return f(), i("svg", St, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var wt = l({
	name: "lucide-bookmark",
	render: Ct
}), Tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Et(e, t) {
	return f(), i("svg", Tt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Dt = l({
	name: "lucide-bookmark-plus",
	render: Et
}), Ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kt(e, t) {
	return f(), i("svg", Ot, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var At = l({
	name: "lucide-heart",
	render: kt
}), jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mt(e, t) {
	return f(), i("svg", jt, [...t[0] ||= [a("g", {
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
var Nt = l({
	name: "lucide-user",
	render: Mt
}), Pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ft(e, t) {
	return f(), i("svg", Pt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var It = l({
	name: "lucide-log-out",
	render: Ft
}), Lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rt(e, t) {
	return f(), i("svg", Lt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var zt = l({
	name: "lucide-menu",
	render: Rt
}), Bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vt(e, t) {
	return f(), i("svg", Bt, [...t[0] ||= [a("g", {
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
var Ht = l({
	name: "lucide-more-horizontal",
	render: Vt
}), Ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wt(e, t) {
	return f(), i("svg", Ut, [...t[0] ||= [a("g", {
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
var Gt = l({
	name: "lucide-eye",
	render: Wt
}), Kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qt(e, t) {
	return f(), i("svg", Kt, [...t[0] ||= [a("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [a("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), a("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Jt = l({
	name: "lucide-eye-off",
	render: qt
}), Yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xt(e, t) {
	return f(), i("svg", Yt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Zt = l({
	name: "lucide-arrow-left",
	render: Xt
}), Qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $t(e, t) {
	return f(), i("svg", Qt, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var en = l({
	name: "lucide-arrow-right",
	render: $t
}), tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nn(e, t) {
	return f(), i("svg", tn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var rn = l({
	name: "lucide-arrow-up",
	render: nn
}), an = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function on(e, t) {
	return f(), i("svg", an, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var sn = l({
	name: "lucide-arrow-down",
	render: on
}), cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ln(e, t) {
	return f(), i("svg", cn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var un = l({
	name: "lucide-chevron-down",
	render: ln
}), dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function fn(e, t) {
	return f(), i("svg", dn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var pn = l({
	name: "lucide-chevron-up",
	render: fn
}), mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function hn(e, t) {
	return f(), i("svg", mn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var gn = l({
	name: "lucide-chevron-left",
	render: hn
}), _n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vn(e, t) {
	return f(), i("svg", _n, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var yn = l({
	name: "lucide-chevron-right",
	render: vn
}), bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xn(e, t) {
	return f(), i("svg", bn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Sn = l({
	name: "lucide-loader-circle",
	render: xn
}), Cn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wn(e, t) {
	return f(), i("svg", Cn, [...t[0] ||= [a("g", {
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
var Tn = l({
	name: "lucide-circle-alert",
	render: wn
}), En = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dn(e, t) {
	return f(), i("svg", En, [...t[0] ||= [a("g", {
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
var On = l({
	name: "lucide-circle-check",
	render: Dn
}), kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function An(e, t) {
	return f(), i("svg", kn, [...t[0] ||= [a("g", {
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
var jn = l({
	name: "lucide-circle-x",
	render: An
}), Mn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nn(e, t) {
	return f(), i("svg", Mn, [...t[0] ||= [a("g", {
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
var Pn = l({
	name: "lucide-sun",
	render: Nn
}), Fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function In(e, t) {
	return f(), i("svg", Fn, [...t[0] ||= [a("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var Ln = l({
	name: "lucide-moon",
	render: In
}), Rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zn(e, t) {
	return f(), i("svg", Rn, [...t[0] ||= [a("g", {
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
var Bn = l({
	name: "lucide-monitor",
	render: zn
}), U = /* @__PURE__ */ c({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let r = {
			play: oe,
			pause: le,
			"skip-back": g,
			"skip-forward": y,
			rewind: S,
			forward: T,
			volume: O,
			"volume-low": j,
			mute: P,
			captions: L,
			"captions-off": B,
			pip: fe,
			theater: he,
			fullscreen: ve,
			"fullscreen-exit": xe,
			expand: we,
			cast: De,
			settings: Ae,
			speed: Ne,
			film: Ie,
			image: ze,
			music: He,
			tv: Ge,
			search: Je,
			filter: Ze,
			calendar: et,
			sort: rt,
			star: ot,
			list: lt,
			plus: ft,
			info: ht,
			x: vt,
			check: xt,
			bookmark: wt,
			"bookmark-plus": Dt,
			heart: At,
			user: Nt,
			"log-out": It,
			menu: zt,
			more: Ht,
			eye: Gt,
			"eye-off": Jt,
			"arrow-left": Zt,
			"arrow-right": en,
			"arrow-up": rn,
			"arrow-down": sn,
			"chevron-down": un,
			"chevron-up": pn,
			"chevron-left": gn,
			"chevron-right": yn,
			spinner: Sn,
			alert: Tn,
			success: On,
			error: jn,
			sun: Pn,
			moon: Ln,
			monitor: Bn
		}, i = e, a = t(() => r[i.name]), o = t(() => i.size === void 0 ? void 0 : typeof i.size == "number" ? `${i.size}px` : i.size);
		return (t, r) => (f(), n(ne(a.value), {
			class: "phlix-icon",
			style: d(o.value ? { fontSize: o.value } : void 0),
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
}), W = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
}, G = class extends Error {
	constructor(e = "You appear to be offline. Check your connection and try again.") {
		super(e), this.name = "NetworkError";
	}
}, K = class extends Error {
	constructor(e = "The request timed out. Please try again.") {
		super(e), this.name = "TimeoutError";
	}
};
function Vn(e, t = "Something went wrong.") {
	return e instanceof Error && e.message ? e.message : t;
}
function q() {
	return typeof navigator < "u" && navigator.onLine === !1;
}
//#endregion
//#region src/api/client.ts
var Hn = 15e3;
function J(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
var Y = class {
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
		}, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis), this.timeoutMs = e.timeoutMs ?? Hn;
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
			throw s ? new K() : r?.aborted || e instanceof W ? e : e instanceof TypeError || q() ? new G() : e;
		} finally {
			clearTimeout(c), r && r.removeEventListener("abort", l);
		}
	}
	async handleResponse(e) {
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new W(this.extractError(t), e.status, t);
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
			is_admin: J(e.is_admin)
		};
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
	}
}, Un = new Y(), X = "access_token", Z = "refresh_token", Q = "user", Wn = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(X);
	}
	setAccessToken(e) {
		this.storage.setItem(X, e);
	}
	getRefreshToken() {
		return this.storage.getItem(Z);
	}
	setRefreshToken(e) {
		this.storage.setItem(Z, e);
	}
	getUser() {
		let e = this.storage.getItem(Q);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(Q, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(X), this.storage.removeItem(Z), this.storage.removeItem(Q);
	}
}, Gn = re("phlix-toast", () => {
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
}), Kn = {
	class: "phlix-empty",
	role: "status"
}, qn = { class: "phlix-empty__icon" }, Jn = { class: "phlix-empty__title" }, Yn = {
	key: 0,
	class: "phlix-empty__desc"
}, $ = {
	key: 1,
	class: "phlix-empty__actions"
}, Xn = /*#__PURE__*/ h(/* @__PURE__ */ c({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (f(), i("div", Kn, [
			a("span", qn, [s(U, { name: e.icon }, null, 8, ["name"])]),
			a("h3", Jn, m(e.title), 1),
			e.description || t.$slots.default ? (f(), i("p", Yn, [p(t.$slots, "default", {}, () => [o(m(e.description), 1)], !0)])) : r("", !0),
			t.$slots.actions ? (f(), i("div", $, [p(t.$slots, "actions", {}, void 0, !0)])) : r("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]), Zn = {
	key: 0,
	class: "phlix-skel-text",
	"aria-hidden": "true"
}, Qn = /*#__PURE__*/ h(/* @__PURE__ */ c({
	__name: "Skeleton",
	props: {
		variant: { default: "rect" },
		width: {},
		height: {},
		radius: {},
		lines: { default: 1 }
	},
	setup(t) {
		return (n, r) => t.variant === "text" ? (f(), i("div", Zn, [(f(!0), i(e, null, te(t.lines, (e) => (f(), i("span", {
			key: e,
			class: "phlix-skel phlix-skel--text",
			style: d({ width: e === t.lines && t.lines > 1 ? "60%" : t.width })
		}, null, 4))), 128))])) : (f(), i("span", {
			key: 1,
			class: u(["phlix-skel", `phlix-skel--${t.variant}`]),
			"aria-hidden": "true",
			style: d({
				width: t.width,
				height: t.height,
				borderRadius: t.radius
			})
		}, null, 6));
	}
}), [["__scopeId", "data-v-c34e4066"]]), $n = [
	"type",
	"disabled",
	"aria-busy"
], er = {
	key: 0,
	class: "phlix-btn__spinner"
}, tr = { class: "phlix-btn__label" }, nr = /*#__PURE__*/ h(/* @__PURE__ */ c({
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
		let o = e, c = t(() => o.disabled || o.loading);
		return (t, o) => (f(), i("button", {
			type: e.type,
			class: u(["phlix-btn", [
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
			e.loading ? (f(), i("span", er, [s(U, { name: "spinner" })])) : r("", !0),
			e.leftIcon && !e.loading ? (f(), n(U, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : r("", !0),
			a("span", tr, [p(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (f(), n(U, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : r("", !0)
		], 10, $n));
	}
}), [["__scopeId", "data-v-8cdee95a"]]);
//#endregion
export { Wn as a, J as c, K as d, Vn as f, h, Gn as i, W as l, U as m, Qn as n, Y as o, q as p, Xn as r, Un as s, nr as t, G as u };

//# sourceMappingURL=Button-C86XulWV.js.map