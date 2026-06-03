import { mountVisual } from './harness';
import { usePlayerStore } from '../../stores/usePlayerStore';
import BrowseHarness from './BrowseHarness.vue';
import { RESUME_SEED } from './mock-data';

mountVisual(BrowseHarness, {
  setup({ pinia }) {
    // Seed resume positions so a few Continue-Watching cards show a progress bar.
    Object.assign(usePlayerStore(pinia).resumeMap, RESUME_SEED);
  },
});
