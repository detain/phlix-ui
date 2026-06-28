import { computed as e, ref as t } from "vue";
import { defineStore as n } from "pinia";
//#region src/stores/useConnectionStore.ts
var r = "phlix.connection.apiBase";
function i(e) {
	if (typeof window > "u") return null;
	try {
		return window.localStorage.getItem(e);
	} catch {
		return null;
	}
}
function a(e, t) {
	if (!(typeof window > "u")) try {
		t === null ? window.localStorage.removeItem(e) : window.localStorage.setItem(e, t);
	} catch {}
}
function o(e) {
	return e.trim().replace(/\/+$/, "");
}
function s(e) {
	let t = e.trim();
	return t === "" || /^https?:\/\//i.test(t) ? t : `${/^(localhost|127\.0\.0\.1|\[?::1\]?|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/|$)/i.test(t) || /:\d+(\/|$)/.test(t) ? "http" : "https"}://${t}`;
}
async function c(e, t = fetch, n = 6e3) {
	let r = o(e);
	if (!r) return !1;
	let i = new AbortController(), a = setTimeout(() => i.abort(), n);
	try {
		let e = await t(`${r}/health`, { signal: i.signal });
		if (!e.ok) return !1;
		let n = await e.json().catch(() => null);
		return !!n && (n.status === "ok" || n.version !== void 0);
	} catch {
		return !1;
	} finally {
		clearTimeout(a);
	}
}
var l = n("connection", () => {
	let n = t(i(r)), s = null, c = e(() => !!n.value);
	function l(e) {
		s = e;
	}
	function u(e) {
		n.value = o(e) || null, a(r, n.value), s?.(n.value);
	}
	function d() {
		n.value = null, a(r, null), s?.(null);
	}
	return {
		apiBase: n,
		isConnected: c,
		configure: l,
		setApiBase: u,
		clear: d
	};
});
//#endregion
export { s as a, l as i, o as n, c as r, r as t };

//# sourceMappingURL=useConnectionStore-93rGJB21.js.map