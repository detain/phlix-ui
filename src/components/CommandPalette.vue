<script setup lang="ts">
/**
 * CommandPalette (R1.4) — the ⌘K / Ctrl-K command palette.
 *
 * A Teleported overlay built on `useFocusTrap` (scroll-lock + Esc + focus
 * restore). Implements the WAI-ARIA combobox/listbox pattern: a search input
 * owns `aria-activedescendant` over a `role=listbox` of `role=option` rows, so
 * the whole surface is keyboard-driven (Up/Down/Home/End to move, Enter to run,
 * Esc to close) without ever moving DOM focus off the input.
 *
 * Registers a set of built-in commands (navigation, theme, density/motion/
 * atmosphere, reset) plus any app-injected commands provided under the
 * `phlixCommands` injection key (wired by `createPhlixApp`). When the query is
 * non-empty a synthetic "Search library" item routes to Browse with `?search=`.
 *
 * Mount it once in the app shell; the global ⌘K listener lives here.
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, useId, inject } from 'vue';
import { useRouter } from 'vue-router';
import Icon from './Icon.vue';
import Kbd from './ui/Kbd.vue';
import { useFocusTrap } from './ui/useFocusTrap';
import { useCommandStore, type Command } from '../stores/useCommandStore';
import { usePreferencesStore } from '../stores/usePreferencesStore';

const store = useCommandStore();
const router = useRouter();
const prefs = usePreferencesStore();

const panelEl = ref<HTMLElement | null>(null);
const listId = useId();
const highlight = ref(0);

interface DisplayItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: Command['icon'];
  shortcut?: string[];
  run: () => void | Promise<void>;
}
type Row = { kind: 'header'; label: string } | { kind: 'option'; item: DisplayItem; index: number };

function toDisplay(c: Command): DisplayItem {
  return {
    id: c.id,
    title: c.title,
    subtitle: c.subtitle,
    icon: c.icon,
    shortcut: c.shortcut,
    run: () => store.runId(c.id),
  };
}

function searchItem(q: string): DisplayItem {
  return {
    id: '__search',
    title: `Search library for “${q}”`,
    icon: 'search',
    run: () => {
      store.closePalette();
      void router.push({ name: 'browse', query: { search: q } });
    },
  };
}

/** Flat option list + interleaved section headers, in display order. */
const display = computed<{ rows: Row[]; options: DisplayItem[] }>(() => {
  const rows: Row[] = [];
  const options: DisplayItem[] = [];
  const pushOption = (item: DisplayItem) => {
    rows.push({ kind: 'option', item, index: options.length });
    options.push(item);
  };

  const q = store.query.trim();
  if (q) {
    // Matched commands rank first; the "Search library" fallback sits last so
    // Enter on a command query runs the command, not the search.
    for (const c of store.results) pushOption(toDisplay(c));
    pushOption(searchItem(q));
    return { rows, options };
  }

  const recent = store.results.filter((c) => store.isRecent(c.id));
  if (recent.length) {
    rows.push({ kind: 'header', label: 'Recent' });
    recent.forEach((c) => pushOption(toDisplay(c)));
  }
  const groups = new Map<string, Command[]>();
  for (const c of store.results) {
    if (store.isRecent(c.id)) continue;
    const g = c.group ?? 'Commands';
    const bucket = groups.get(g);
    if (bucket) bucket.push(c);
    else groups.set(g, [c]);
  }
  for (const [label, cmds] of groups) {
    rows.push({ kind: 'header', label });
    cmds.forEach((c) => pushOption(toDisplay(c)));
  }
  return { rows, options };
});

const optionCount = computed(() => display.value.options.length);
const activeId = computed(() =>
  optionCount.value ? `${listId}-opt-${highlight.value}` : undefined,
);

watch(
  () => store.query,
  () => {
    highlight.value = 0;
  },
);
watch(optionCount, (n) => {
  if (highlight.value > n - 1) highlight.value = Math.max(0, n - 1);
});
watch(
  () => store.open,
  (v) => {
    if (v) highlight.value = 0;
  },
);

function scrollHighlightIntoView() {
  if (typeof document === 'undefined') return;
  document.getElementById(`${listId}-opt-${highlight.value}`)?.scrollIntoView?.({ block: 'nearest' });
}

function move(delta: number) {
  const n = optionCount.value;
  if (!n) return;
  highlight.value = (highlight.value + delta + n) % n;
  scrollHighlightIntoView();
}

function runHighlighted() {
  const item = display.value.options[highlight.value];
  if (item) void item.run();
}

function runItem(item: DisplayItem) {
  void item.run();
}

function onInputKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      move(1);
      break;
    case 'ArrowUp':
      e.preventDefault();
      move(-1);
      break;
    case 'Home':
      e.preventDefault();
      highlight.value = 0;
      scrollHighlightIntoView();
      break;
    case 'End':
      e.preventDefault();
      highlight.value = Math.max(0, optionCount.value - 1);
      scrollHighlightIntoView();
      break;
    case 'Enter':
      e.preventDefault();
      runHighlighted();
      break;
  }
}

function onBackdrop() {
  store.closePalette();
}

useFocusTrap(panelEl, computed(() => store.open), {
  onEscape: () => {
    store.closePalette();
    return true;
  },
});

// --- Global ⌘K / Ctrl-K toggle -------------------------------------------------
function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && !e.altKey && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    store.togglePalette();
  }
}

// --- Built-in + injected commands ---------------------------------------------
const injected = inject<Command[]>('phlixCommands', []);

const builtins: Command[] = [
  { id: 'nav.browse', title: 'Go to Browse', icon: 'film', group: 'Navigation', keywords: ['home', 'library', 'media'], priority: 0, run: () => { void router.push({ name: 'browse' }); } },
  { id: 'nav.settings', title: 'Go to Settings', icon: 'settings', group: 'Navigation', keywords: ['preferences', 'config', 'options'], priority: 1, run: () => { void router.push({ name: 'settings' }); } },
  { id: 'theme.nocturne', title: 'Theme: Nocturne', icon: 'moon', group: 'Theme', keywords: ['dark', 'amber', 'cinema'], run: () => { prefs.theme = 'nocturne'; } },
  { id: 'theme.daylight', title: 'Theme: Daylight', icon: 'sun', group: 'Theme', keywords: ['light', 'bright'], run: () => { prefs.theme = 'daylight'; } },
  { id: 'theme.midnight', title: 'Theme: Midnight', icon: 'monitor', group: 'Theme', keywords: ['oled', 'black', 'contrast'], run: () => { prefs.theme = 'midnight'; } },
  { id: 'pref.density', title: 'Toggle density', icon: 'list', group: 'Preferences', keywords: ['compact', 'comfortable', 'spacing'], run: () => { prefs.density = prefs.density === 'compact' ? 'comfortable' : 'compact'; } },
  { id: 'pref.motion', title: 'Toggle reduced motion', icon: 'speed', group: 'Preferences', keywords: ['animation', 'accessibility', 'a11y'], run: () => { prefs.reducedMotion = prefs.reducedMotion === 'off' ? 'auto' : 'off'; } },
  { id: 'pref.atmosphere', title: 'Toggle atmosphere', icon: 'star', group: 'Preferences', keywords: ['grain', 'vignette', 'glow', 'ambient'], run: () => { prefs.atmosphere = !prefs.atmosphere; } },
  { id: 'pref.reset', title: 'Reset preferences', icon: 'rewind', group: 'Preferences', keywords: ['default', 'clear', 'restore'], run: () => prefs.reset() },
];

let dispose: (() => void) | null = null;

onMounted(() => {
  dispose = store.register([...builtins, ...injected]);
  document.addEventListener('keydown', onGlobalKey);
});

onBeforeUnmount(() => {
  dispose?.();
  document.removeEventListener('keydown', onGlobalKey);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="phlix-cmdk">
      <div v-if="store.open" class="phlix-cmdk" @pointerdown.self="onBackdrop">
        <div
          ref="panelEl"
          class="phlix-cmdk__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div class="phlix-cmdk__search">
            <Icon name="search" class="phlix-cmdk__search-icon" />
            <input
              :value="store.query"
              class="phlix-cmdk__input"
              type="text"
              role="combobox"
              aria-expanded="true"
              :aria-controls="listId"
              :aria-activedescendant="activeId"
              aria-autocomplete="list"
              placeholder="Type a command or search…"
              autocomplete="off"
              spellcheck="false"
              @input="store.setQuery(($event.target as HTMLInputElement).value)"
              @keydown="onInputKeydown"
            />
            <Kbd keys="Esc" class="phlix-cmdk__hint" />
          </div>

          <ul :id="listId" class="phlix-cmdk__list" role="listbox" aria-label="Commands">
            <template v-for="(row, i) in display.rows" :key="row.kind === 'header' ? `h-${row.label}-${i}` : row.item.id">
              <li v-if="row.kind === 'header'" class="phlix-cmdk__group" role="presentation">
                {{ row.label }}
              </li>
              <li
                v-else
                :id="`${listId}-opt-${row.index}`"
                class="phlix-cmdk__option"
                :class="{ 'is-active': row.index === highlight }"
                role="option"
                :aria-selected="row.index === highlight"
                @click="runItem(row.item)"
                @pointermove="highlight = row.index"
              >
                <Icon :name="row.item.icon ?? 'list'" class="phlix-cmdk__option-icon" />
                <span class="phlix-cmdk__option-body">
                  <span class="phlix-cmdk__option-title">{{ row.item.title }}</span>
                  <span v-if="row.item.subtitle" class="phlix-cmdk__option-subtitle">{{ row.item.subtitle }}</span>
                </span>
                <Kbd v-if="row.item.shortcut" :keys="row.item.shortcut" class="phlix-cmdk__option-kbd" />
              </li>
            </template>
            <li v-if="!optionCount" class="phlix-cmdk__empty" role="status" aria-live="polite">
              No matching commands
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.phlix-cmdk {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: clamp(var(--space-6), 12vh, 12rem) var(--space-6) var(--space-6);
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
}
.phlix-cmdk__panel {
  width: 100%;
  max-width: 40rem;
  max-height: min(32rem, 70vh);
  display: flex;
  flex-direction: column;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-4);
  overflow: hidden;
  outline: none;
}
.phlix-cmdk__search {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border-subtle);
}
.phlix-cmdk__search-icon {
  font-size: var(--text-lg);
  color: var(--text-muted);
}
.phlix-cmdk__input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: var(--text-md);
}
.phlix-cmdk__input::placeholder {
  color: var(--text-faint, var(--text-muted));
}
.phlix-cmdk__hint {
  flex-shrink: 0;
  opacity: 0.7;
}
.phlix-cmdk__list {
  flex: 1;
  margin: 0;
  padding: var(--space-2);
  list-style: none;
  overflow-y: auto;
}
.phlix-cmdk__group {
  padding: var(--space-3) var(--space-3) var(--space-1);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-muted);
}
.phlix-cmdk__option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--text);
}
.phlix-cmdk__option.is-active {
  background: var(--surface-3, var(--accent-soft, rgba(255, 255, 255, 0.06)));
}
.phlix-cmdk__option.is-active .phlix-cmdk__option-icon {
  color: var(--accent);
}
.phlix-cmdk__option-icon {
  font-size: var(--text-lg);
  color: var(--text-muted);
}
.phlix-cmdk__option-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.phlix-cmdk__option-title {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.phlix-cmdk__option-subtitle {
  font-size: var(--text-xs);
  color: var(--text-muted);
}
.phlix-cmdk__option-kbd {
  flex-shrink: 0;
}
.phlix-cmdk__empty {
  padding: var(--space-6);
  text-align: center;
  color: var(--text-muted);
  font-size: var(--text-sm);
}

.phlix-cmdk-enter-active,
.phlix-cmdk-leave-active {
  transition: opacity var(--dur-base) var(--ease-out);
}
.phlix-cmdk-enter-active .phlix-cmdk__panel,
.phlix-cmdk-leave-active .phlix-cmdk__panel {
  transition: transform var(--dur-slow) var(--ease-spring), opacity var(--dur-base) var(--ease-out);
}
.phlix-cmdk-enter-from,
.phlix-cmdk-leave-to {
  opacity: 0;
}
.phlix-cmdk-enter-from .phlix-cmdk__panel,
.phlix-cmdk-leave-to .phlix-cmdk__panel {
  transform: translateY(-12px) scale(0.98);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .phlix-cmdk-enter-active,
  .phlix-cmdk-leave-active,
  .phlix-cmdk-enter-active .phlix-cmdk__panel,
  .phlix-cmdk-leave-active .phlix-cmdk__panel {
    transition: none;
  }
  .phlix-cmdk-enter-from .phlix-cmdk__panel,
  .phlix-cmdk-leave-to .phlix-cmdk__panel {
    transform: none;
  }
}
</style>
