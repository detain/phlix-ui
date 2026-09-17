/**
 * W114 S533 — dev-shell boot for the TN-6 subtitle bench (DEV-ONLY, never
 * bundled). Kept separate from `subsBench.ts` on purpose: that module is the
 * PURE parsing/measurement core and is also imported by `subsBench.worker.ts`,
 * where the hoisted CSS-injection below would crash on `document`.
 */
import '../../assets/fonts/fonts.css';
import '@phlix/tokens/style.css';

async function mountBench(): Promise<void> {
  const [{ createApp }, harness] = await Promise.all([import('vue'), import('./SubsBenchHarness.vue')]);
  createApp(harness.default).mount('#app');
}

if (typeof document !== 'undefined' && document.getElementById('app')) {
  void mountBench();
}
