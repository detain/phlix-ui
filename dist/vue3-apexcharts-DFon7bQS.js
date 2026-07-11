import { createElementBlock as e, defineComponent as t, getCurrentInstance as n, h as r, nextTick as i, normalizeClass as a, onBeforeMount as o, onBeforeUnmount as s, onMounted as c, onServerPrefetch as l, openBlock as u, ref as d, toRefs as f, watch as p } from "vue";
import m from "apexcharts";
//#region node_modules/vue3-apexcharts/dist/vue3-apexcharts.js
var h = [
	"animationEnd",
	"beforeMount",
	"mounted",
	"updated",
	"click",
	"mouseMove",
	"mouseLeave",
	"legendClick",
	"markerClick",
	"selection",
	"dataPointSelection",
	"dataPointMouseEnter",
	"dataPointMouseLeave",
	"beforeZoom",
	"beforeResetZoom",
	"zoomed",
	"scrolled",
	"brushScrolled"
], g = t({
	name: "apexchart",
	props: {
		options: { type: Object },
		type: { type: String },
		series: {
			type: Array,
			required: !0
		},
		width: { default: "100%" },
		height: { default: "auto" }
	},
	emits: h,
	setup(e, { emit: t }) {
		let r = d(null), a = d(null), l = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, u = (e, t) => {
			typeof Object.assign != "function" && function() {
				Object.assign = function(e) {
					if (e == null) throw TypeError("Cannot convert undefined or null to object");
					let t = Object(e);
					for (let e = 1; e < arguments.length; e++) {
						let n = arguments[e];
						if (n != null) for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
					}
					return t;
				};
			}();
			let n = Object.assign({}, e);
			return l(e) && l(t) && Object.keys(t).forEach((r) => {
				l(t[r]) && r in e ? n[r] = u(e[r], t[r]) : Object.assign(n, { [r]: t[r] });
			}), n;
		}, g = (e) => JSON.parse(JSON.stringify(e)), _ = async () => {
			if (await i(), a.value) return;
			let n = {
				chart: {
					type: e.type || e.options.chart && e.options.chart.type || "line",
					height: e.height,
					width: e.width,
					events: {}
				},
				series: g(e.series)
			}, o = e.options.chart ? e.options.chart.events : null;
			h.forEach((e) => {
				let r = (...n) => t(e, ...n);
				n.chart.events[e] = (...t) => {
					r(...t), o && o.hasOwnProperty(e) && o[e](...t);
				};
			});
			let s = u(e.options, n);
			return a.value = new m(r.value, s), a.value.render();
		}, v = () => (y(), _()), y = () => {
			a.value.destroy(), a.value = null;
		}, b = (e, t) => a.value.updateSeries(e, t), x = (e, t, n, r) => a.value.updateOptions(e, t, n, r), S = (e) => a.value.toggleSeries(e), C = (e) => {
			a.value.showSeries(e);
		}, w = (e) => {
			a.value.hideSeries(e);
		}, T = (e, t) => a.value.appendSeries(e, t), E = () => {
			a.value.resetSeries();
		}, D = (e, t) => {
			a.value.toggleDataPointSelection(e, t);
		}, O = (e) => a.value.appendData(e), k = (e, t) => a.value.zoomX(e, t), A = (e) => a.value.dataURI(e), j = (e) => a.value.setLocale(e), M = (e, t) => {
			a.value.addXaxisAnnotation(e, t);
		}, N = (e, t) => {
			a.value.addYaxisAnnotation(e, t);
		}, P = (e, t) => {
			a.value.addPointAnnotation(e, t);
		}, F = (e, t) => {
			a.value.removeAnnotation(e, t);
		}, I = () => {
			a.value.clearAnnotations();
		};
		o(() => {
			window.ApexCharts = m;
		}), c(() => {
			r.value = n().proxy.$el, _();
		}), s(() => {
			a.value && y();
		});
		let L = f(e), R = null, z = (t) => {
			R || (R = {
				options: !1,
				series: !1
			}, i(() => {
				let t = R;
				if (R = null, !a.value) {
					_();
					return;
				}
				if (t.options && t.series) {
					let t = g(e.options);
					t.series = g(e.series), a.value.updateOptions(t);
				} else t.options ? a.value.updateOptions(g(e.options)) : t.series && a.value.updateSeries(g(e.series));
			})), R[t] = !0;
		};
		return p(L.options, () => {
			z("options");
		}), p(L.series, () => {
			z("series");
		}, { deep: !0 }), p(L.type, () => {
			v();
		}), p(L.width, () => {
			v();
		}), p(L.height, () => {
			v();
		}), {
			chart: a,
			init: _,
			refresh: v,
			destroy: y,
			updateOptions: x,
			updateSeries: b,
			toggleSeries: S,
			showSeries: C,
			hideSeries: w,
			resetSeries: E,
			zoomX: k,
			toggleDataPointSelection: D,
			appendData: O,
			appendSeries: T,
			addXaxisAnnotation: M,
			addYaxisAnnotation: N,
			addPointAnnotation: P,
			removeAnnotation: F,
			clearAnnotations: I,
			setLocale: j,
			dataURI: A
		};
	},
	render() {
		return r("div", { class: "vue-apexcharts" });
	}
}), _ = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, v = t({
	name: "apexchart-server",
	props: {
		type: {
			type: String,
			default: "line"
		},
		width: {
			type: [Number, String],
			default: 400
		},
		height: {
			type: [Number, String],
			default: 300
		},
		series: {
			type: Array,
			default: () => []
		},
		options: {
			type: Object,
			default: () => ({})
		},
		className: {
			type: String,
			default: ""
		}
	},
	setup(e) {
		let t = d("");
		return l(async () => {
			try {
				let { default: n } = await import("./apexcharts.ssr.esm-fe46cd2d-BhujGxHE.js"), r = Object.assign({}, e.options, {
					chart: Object.assign({}, e.options.chart, {
						type: e.type,
						width: e.width,
						height: e.height
					}),
					series: e.series
				});
				t.value = await n.renderToHTML(r, {
					width: e.width,
					height: e.height
				});
			} catch (e) {
				console.error("Failed to render ApexChart on server:", e);
			}
		}), { chartHTML: t };
	}
}), y = ["innerHTML"];
function b(t, n, r, i, o, s) {
	return u(), e("div", {
		innerHTML: t.chartHTML,
		class: a(t.className)
	}, null, 10, y);
}
var x = /* @__PURE__ */ _(v, [["render", b]]), S = t({
	name: "apexchart-hydrate",
	props: {
		clientOptions: {
			type: Object,
			default: () => ({})
		},
		selector: {
			type: String,
			default: "[data-apexcharts-hydrate]"
		}
	},
	setup(e) {
		let t = [];
		c(async () => {
			try {
				let { default: n } = await import("./apexcharts.ssr.esm-fe46cd2d-BhujGxHE.js");
				t = n.hydrateAll(e.selector, e.clientOptions);
			} catch (e) {
				console.error("Failed to hydrate ApexCharts:", e);
			}
		}), s(() => {
			t.forEach((e) => {
				e && e.destroy && e.destroy();
			}), t = [];
		});
	},
	render() {
		return null;
	}
});
g.install = (e) => {
	e.component(g.name, g), e.component(x.name, x), e.component(S.name, S);
};
//#endregion
export { S as ApexChartsHydrate, x as ApexChartsServer, g as default };

//# sourceMappingURL=vue3-apexcharts-DFon7bQS.js.map