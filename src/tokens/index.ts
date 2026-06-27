// Design tokens are now sourced from the standalone @phlix/tokens package (single
// source of truth). This side-effect import pulls the byte-identical token CSS into
// phlix-ui's built bundle (vite lib mode emits it into dist/style.css), exactly as
// the old local `./index.css` re-export did. No named exports — `export * from
// './tokens'` in src/index.ts continues to resolve and export nothing, as before.
import '@phlix/tokens/style.css';
// TV mode (10-foot UI) overrides, scoped under [data-tv]. A side-effect import so
// vite lib mode folds it into dist/style.css alongside the @phlix/tokens CSS above.
import './tv.css';
