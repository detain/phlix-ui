<script setup lang="ts">
/**
 * Gallery (R0.7) — dev-only showcase of every primitive × every theme. Served by
 * `vite` (src/dev/gallery.html) for visual QA + Playwright screenshots. Not part
 * of the published bundle.
 */
import { ref } from 'vue';
import Icon from '../components/Icon.vue';
import AppBackdrop from '../components/AppBackdrop.vue';
import {
  Button, IconButton, Badge, Slider, Switch, Chip, Select, Combobox,
  Modal, Sheet, Tooltip, ToastHost, Skeleton, Spinner, EmptyState, Tabs, Kbd, Reveal,
} from '../components/ui';
import { useToastStore } from '../stores/useToastStore';

const themes = ['nocturne', 'daylight', 'midnight'] as const;
const theme = ref<(typeof themes)[number]>('nocturne');
const compact = ref(false);
function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.setAttribute('data-density', compact.value ? 'compact' : 'comfortable');
}
applyTheme();

const toasts = useToastStore();

// demo state
const volume = ref(0.6);
const cardSize = ref(40);
const autoplay = ref(true);
const ratingR = ref(true);
const ratingPg = ref(false);
const sortBy = ref<string | number | null>('year');
const genre = ref<string | number | null>(null);
const tab = ref('overview');
const modalOpen = ref(false);
const sheetOpen = ref(false);

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'year', label: 'Year' },
  { value: 'rating', label: 'Rating' },
  { value: 'date_added', label: 'Date added' },
  { value: 'runtime', label: 'Runtime' },
];
const genreOptions = ['Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Horror', 'Documentary'];
const tabItems = [
  { value: 'overview', label: 'Overview', icon: 'info' as const },
  { value: 'cast', label: 'Cast', icon: 'user' as const },
  { value: 'more', label: 'More like this', icon: 'list' as const },
  { value: 'soon', label: 'Coming soon', disabled: true },
];
const iconNames = [
  'play', 'pause', 'skip-back', 'skip-forward', 'volume', 'mute', 'captions', 'pip', 'theater',
  'fullscreen', 'settings', 'film', 'search', 'filter', 'sort', 'star', 'plus', 'info', 'x', 'check',
  'heart', 'bookmark', 'user', 'menu', 'sun', 'moon', 'spinner', 'alert', 'success', 'error',
] as const;
</script>

<template>
  <AppBackdrop ambient ambient-color="#f5a524" />
  <ToastHost />

  <div class="g-shell">
    <header class="g-bar">
      <h1>@phlix/ui · Gallery</h1>
      <div class="g-controls">
        <button
          v-for="t in themes"
          :key="t"
          class="g-themebtn"
          :class="{ active: theme === t }"
          @click="theme = t; applyTheme()"
        >{{ t }}</button>
        <label class="g-density"><input type="checkbox" v-model="compact" @change="applyTheme()" /> compact</label>
      </div>
    </header>

    <section class="g-sec"><h2>Buttons</h2>
      <div class="g-row">
        <Button>Solid</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="subtle">Subtle</Button>
        <Button left-icon="play">Play</Button>
        <Button right-icon="chevron-down" variant="outline">Menu</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button size="sm">sm</Button>
        <Button size="lg">lg</Button>
      </div>
    </section>

    <section class="g-sec"><h2>IconButtons</h2>
      <div class="g-row">
        <IconButton name="play" label="Play" variant="solid" />
        <IconButton name="heart" label="Like" />
        <IconButton name="settings" label="Settings" variant="outline" />
        <IconButton name="plus" label="Add" variant="subtle" />
        <IconButton name="volume" label="Mute" :pressed="false" />
        <IconButton name="mute" label="Unmute" :pressed="true" />
        <IconButton name="search" label="Search" loading />
      </div>
    </section>

    <section class="g-sec"><h2>Badges</h2>
      <div class="g-row">
        <Badge tone="accent">New</Badge>
        <Badge mono>4K · HDR</Badge>
        <Badge tone="success" icon="check">Ready</Badge>
        <Badge tone="warning">Beta</Badge>
        <Badge tone="error">Down</Badge>
        <Badge tone="info">Info</Badge>
        <Badge>Neutral</Badge>
      </div>
    </section>

    <section class="g-sec"><h2>Chips</h2>
      <div class="g-row">
        <Chip :selected="ratingPg" @update:selected="ratingPg = $event">PG</Chip>
        <Chip :selected="ratingR" @update:selected="ratingR = $event">R</Chip>
        <Chip icon="star">Top rated</Chip>
        <Chip removable @remove="() => {}">Sci-Fi</Chip>
        <Chip removable @remove="() => {}">PG-13</Chip>
      </div>
    </section>

    <section class="g-sec"><h2>Slider &amp; Switch</h2>
      <div class="g-col" style="max-width: 320px">
        <Slider v-model="volume" :min="0" :max="1" :step="0.05" label="Volume" :format-value="(v) => `${Math.round(v * 100)}%`" />
        <Slider v-model="cardSize" :min="20" :max="60" label="Card size" />
        <Switch v-model="autoplay" label="Autoplay next" />
      </div>
    </section>

    <section class="g-sec"><h2>Select &amp; Combobox</h2>
      <div class="g-row">
        <Select v-model="sortBy" :options="sortOptions" label="Sort" />
        <Combobox v-model="genre" :options="genreOptions" placeholder="Add a genre…" label="Genre" />
      </div>
    </section>

    <section class="g-sec"><h2>Tabs</h2>
      <Tabs v-model="tab" :tabs="tabItems" label="Detail tabs">
        <template #overview><p class="g-muted">A cinematic sci-fi epic. Overview panel content.</p></template>
        <template #cast><p class="g-muted">Cast list panel content.</p></template>
        <template #more><p class="g-muted">More like this panel content.</p></template>
      </Tabs>
    </section>

    <section class="g-sec"><h2>Overlays &amp; Tooltip</h2>
      <div class="g-row">
        <Button @click="modalOpen = true">Open Modal</Button>
        <Button variant="outline" @click="sheetOpen = true">Open Sheet</Button>
        <Tooltip text="Add to watchlist"><IconButton name="plus" label="Add" variant="outline" /></Tooltip>
        <Button variant="subtle" @click="toasts.success('Saved to your library', { action: { label: 'Undo', onClick: () => {} } })">Toast: success</Button>
        <Button variant="subtle" @click="toasts.error('Failed to load library')">Toast: error</Button>
      </div>
      <Modal v-model="modalOpen" title="Confirm deletion">
        <p class="g-muted">This removes the item from your library. This cannot be undone.</p>
        <template #footer>
          <Button variant="ghost" @click="modalOpen = false">Cancel</Button>
          <Button @click="modalOpen = false">Delete</Button>
        </template>
      </Modal>
      <Sheet v-model="sheetOpen" side="right" title="Filters">
        <div class="g-col">
          <Combobox v-model="genre" :options="genreOptions" placeholder="Genre…" />
          <Switch v-model="autoplay" label="Only unwatched" />
        </div>
      </Sheet>
    </section>

    <section class="g-sec"><h2>Skeleton · Spinner · EmptyState</h2>
      <div class="g-row" style="align-items: flex-start">
        <div style="width: 160px"><Skeleton variant="rect" height="220px" radius="14px" /><Skeleton variant="text" :lines="2" /></div>
        <Skeleton variant="circle" />
        <Spinner />
        <Spinner :size="32" />
        <div style="flex: 1; min-width: 260px; border: 1px solid var(--border); border-radius: 14px">
          <EmptyState icon="search" title="No results" description="Try a different search or clear your filters.">
            <template #actions><Button size="sm" variant="outline">Clear filters</Button></template>
          </EmptyState>
        </div>
      </div>
    </section>

    <section class="g-sec"><h2>Kbd &amp; Reveal</h2>
      <div class="g-row">
        <span class="g-muted">Play/pause</span> <Kbd keys="Space" /> <Kbd>K</Kbd>
        <span class="g-muted">Command</span> <Kbd :keys="['Ctrl', 'K']" />
      </div>
      <div class="g-row" style="margin-top: 12px">
        <Reveal v-for="(n, i) in 5" :key="n" :delay="i * 80">
          <Badge tone="accent">Reveal {{ n }}</Badge>
        </Reveal>
      </div>
    </section>

    <section class="g-sec"><h2>Icons</h2>
      <div class="g-icons">
        <span v-for="n in iconNames" :key="n" class="g-icon"><Icon :name="n" /><small>{{ n }}</small></span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.g-shell { position: relative; z-index: 1; max-width: 980px; margin: 0 auto; padding: var(--space-8); }
.g-bar {
  position: sticky; top: 0; z-index: 5; display: flex; align-items: center; gap: var(--space-4);
  padding: var(--space-4) 0; margin-bottom: var(--space-6);
  background: var(--surface-glass); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border-subtle);
}
.g-bar h1 { font-family: var(--font-display); font-weight: 600; font-size: var(--text-lg); letter-spacing: var(--tracking-tight); }
.g-controls { margin-left: auto; display: flex; align-items: center; gap: var(--space-2); }
.g-themebtn {
  font-size: var(--text-sm); font-weight: 600; padding: 6px 12px; border-radius: var(--radius-full);
  border: 1px solid var(--border); background: var(--surface); color: var(--text-muted); cursor: pointer;
}
.g-themebtn.active { background: var(--accent-soft); color: var(--accent); border-color: var(--accent-ring); }
.g-density { font-size: var(--text-sm); color: var(--text-muted); display: inline-flex; gap: 4px; align-items: center; }
.g-sec { padding: var(--space-6) 0; border-top: 1px solid var(--border-subtle); }
.g-sec h2 { font-family: var(--font-display); font-weight: 600; font-size: var(--text-md); margin-bottom: var(--space-4); }
.g-row { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; }
.g-col { display: flex; flex-direction: column; gap: var(--space-4); }
.g-muted { color: var(--text-muted); font-size: var(--text-sm); }
.g-icons { display: grid; grid-template-columns: repeat(auto-fill, minmax(74px, 1fr)); gap: var(--space-3); }
.g-icon { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: var(--space-3);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--text); font-size: 1.3rem; }
.g-icon small { font-size: 10px; color: var(--text-subtle); font-family: var(--font-mono); }
</style>
