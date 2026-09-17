/**
 * TN-6 subs bench worker (W114 S533, dev-only).
 *
 * Proves the worker-side variant of the main-thread cost we are pricing: the
 * ASS document arrives as text, the parse runs off the main thread, and only
 * the serialised structure comes back. Same pure `parseAss` as the main mode —
 * the bench must compare scheduling, not two different parsers.
 */
import { parseAss } from './subsBench';

interface ParseRequest {
  ass: string;
}

const ctx = self as unknown as {
  onmessage: ((event: MessageEvent<ParseRequest>) => void) | null;
  postMessage: (message: unknown) => void;
};

ctx.onmessage = (event: MessageEvent<ParseRequest>) => {
  const startedAt = Date.now();
  const doc = parseAss(event.data.ass);
  ctx.postMessage({ doc, parsedAt: Date.now(), startedAt });
};
