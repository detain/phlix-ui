<script setup lang="ts">
/**
 * Menu — accessible dropdown menu primitive (Wave 2 / Step 11.1).
 *
 *   <Menu v-model:open="menuOpen" :items="items">
 *     <IconButton name="more-vertical" label="Actions" />
 *   </Menu>
 *
 * Trigger slot: the element that opens the menu.
 * items: MenuItem[] — label, disabled?, danger?, onClick?
 *
 * Keyboard: Arrow Up/Down/Home/End/Enter/Space/Escape/Tab.
 * Roving tabindex (only active item has tabindex=0).
 * Click outside / Escape / select all close.
 * Teleported to <body> so overflow:hidden ancestors don't clip it.
 * Flips at viewport edges.
 * Reduced-motion aware.
 */
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';

function nextMenuIndex(items: readonly { disabled?: boolean }[], from: number, dir: 1 | -1): number {
  const n = items.length;
  if (n === 0) return -1;
  let i = from;
  for (let step = 0; step < n; step++) {
    i = (i + dir + n) % n;
    if (!items[i]?.disabled) return i;
  }
  return from;
}

function edgeMenuIndex(items: readonly { disabled?: boolean }[], edge: 'first' | 'last'): number {
  if (edge === 'first') return nextMenuIndex(items, -1, 1);
  return nextMenuIndex(items, 0, -1);
}

export interface MenuItem {
  label: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

const props = withDefaults(
  defineProps<{
    items: readonly MenuItem[];
    open?: boolean;
  }>(),
  { open: false },
);

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void;
  (e: 'select', item: MenuItem, index: number): void;
}>();

const baseId = crypto.randomUUID();
const menuId = computed(() => `${baseId}-menu`);

const isOpen = ref(props.open);
watch(() => props.open, (v) => (isOpen.value = v));
watch(isOpen, (v) => emit('update:open', v));

const triggerEl = ref<HTMLElement | null>(null);
const menuEl = ref<HTMLElement | null>(null);
const activeIndex = ref(-1);
const flipped = ref(false);
/**
 * Inline position for the teleported list. The list is `position: fixed` and
 * teleported to <body>, so it CANNOT be positioned with `top: 100%` relative to
 * the trigger (that resolves to 100vh — off-screen). {@see updatePosition}
 * measures the trigger and anchors the list right at it.
 */
const menuStyle = ref<Record<string, string>>({});

function openMenu() {
  if (isOpen.value) return;
  isOpen.value = true;
      activeIndex.value = edgeMenuIndex(props.items, 'first');
  nextTick(() => {
    updatePosition();
    menuEl.value?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  });
}

function closeMenu() {
  isOpen.value = false;
  activeIndex.value = -1;
  triggerEl.value?.querySelector<HTMLElement>('button,[contenteditable]')?.focus?.();
}

function toggleMenu() {
  isOpen.value ? closeMenu() : openMenu();
}

function navigate(dir: 1 | -1) {
  activeIndex.value = nextMenuIndex(props.items, activeIndex.value, dir);
  nextTick(() => {
    menuEl.value?.querySelector<HTMLElement>('[tabindex="0"]')?.scrollIntoView?.({ block: 'nearest' });
  });
}

function selectItem(index: number) {
  const item = props.items[index];
  if (!item || item.disabled) return;
  emit('select', item, index);
  item.onClick?.();
  closeMenu();
}

/**
 * Anchor the teleported list to the trigger. Measures the trigger + the rendered
 * list and sets explicit `top`/`left` (clamped to the viewport), flipping above
 * the trigger when there isn't room below. Called in `nextTick` after the list
 * mounts so `menuEl` dimensions are available.
 */
function updatePosition() {
  if (!triggerEl.value) return;
  const r = triggerEl.value.getBoundingClientRect();
  const gap = 4;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const menuW = menuEl.value?.offsetWidth ?? 200;
  const menuH = menuEl.value?.offsetHeight ?? 280;

  const spaceBelow = vh - r.bottom;
  flipped.value = spaceBelow < menuH + gap && r.top > spaceBelow;

  // Align the list's left edge with the trigger, clamped into the viewport.
  let left = r.left;
  if (left + menuW > vw - 8) left = vw - menuW - 8;
  if (left < 8) left = 8;

  const top = flipped.value ? Math.max(8, r.top - menuH - gap) : r.bottom + gap;
  menuStyle.value = { left: `${Math.round(left)}px`, top: `${Math.round(top)}px` };
}

function openMenuAtEdge(edge: 'first' | 'last') {
  if (isOpen.value) return;
  isOpen.value = true;
  activeIndex.value = edgeMenuIndex(props.items, edge);
  nextTick(() => {
    updatePosition();
    menuEl.value?.querySelector<HTMLElement>('[tabindex="0"]')?.focus();
  });
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (!isOpen.value) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openMenuAtEdge('first');
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      openMenuAtEdge('last');
      return;
    }
    return;
  }
  onMenuKeydown(e);
}

function onMenuKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      navigate(1);
      break;
    case 'ArrowUp':
      e.preventDefault();
      navigate(-1);
      break;
    case 'Home':
      e.preventDefault();
  activeIndex.value = edgeMenuIndex(props.items, 'first');
      nextTick(() => menuEl.value?.querySelector<HTMLElement>('[tabindex="0"]')?.scrollIntoView?.({ block: 'nearest' }));
      break;
    case 'End':
      e.preventDefault();
      activeIndex.value = edgeMenuIndex(props.items, 'last');
      nextTick(() => menuEl.value?.querySelector<HTMLElement>('[tabindex="0"]')?.scrollIntoView?.({ block: 'nearest' }));
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (activeIndex.value >= 0) selectItem(activeIndex.value);
      break;
    case 'Escape':
      e.preventDefault();
      closeMenu();
      break;
    case 'Tab':
      e.preventDefault();
      closeMenu();
      break;
  }
}

function onDocPointer(e: PointerEvent) {
  if (
    isOpen.value &&
    triggerEl.value &&
    menuEl.value &&
    !triggerEl.value.contains(e.target as Node) &&
    !menuEl.value.contains(e.target as Node)
  ) {
    closeMenu();
  }
}

watch(isOpen, (v) => {
  if (v) {
    document.addEventListener('pointerdown', onDocPointer, true);
  } else {
    document.removeEventListener('pointerdown', onDocPointer, true);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocPointer, true);
});
</script>

<template>
  <div ref="triggerEl" class="phlix-menu" @click="toggleMenu" @keydown="onTriggerKeydown">
    <slot :open="isOpen" :toggle="toggleMenu" :open-menu="openMenu" />

    <Teleport to="body">
      <Transition name="phlix-menu">
        <div
          v-if="isOpen"
          :id="menuId"
          ref="menuEl"
          class="phlix-menu__list"
          :class="{ 'is-flipped': flipped }"
          :style="menuStyle"
          role="menu"
          @keydown="onMenuKeydown"
        >
          <button
            v-for="(item, i) in items"
            :key="i"
            type="button"
            class="phlix-menu__item"
            :class="{
              'is-active': i === activeIndex,
              'is-danger': item.danger,
              'is-disabled': item.disabled,
            }"
            role="menuitem"
            :tabindex="i === activeIndex ? 0 : -1"
            :aria-disabled="item.disabled || undefined"
            :aria-label="item.danger ? item.label + ' (danger)' : item.label"
            @click="selectItem(i)"
            @pointermove="!item.disabled && (activeIndex = i)"
          >
            <slot name="item" :item="item" :index="i">
              {{ item.label }}
            </slot>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.phlix-menu {
  position: relative;
  display: inline-block;
}

.phlix-menu__list {
  /* Teleported to <body>; `top`/`left` are set inline from the trigger rect by
     updatePosition() (a static `top: 100%` would resolve to 100vh here). */
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  min-width: 160px;
  /* Grow to fit every item with no scrollbar; only scroll once the list would
     exceed the viewport. `updatePosition()` clamps the list ≥8px from each edge,
     so cap the height at the viewport minus that gutter (dvh tracks mobile URL
     bars). No small fixed cap → no premature scrollbar when there's room. */
  max-height: calc(100dvh - 16px);
  overflow-y: auto;
  padding: var(--space-1);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-3);
}

.phlix-menu__item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
}

.phlix-menu__item.is-active {
  background: var(--surface-3);
  color: var(--text);
}

.phlix-menu__item.is-danger {
  color: var(--red-400, #f87171);
}

.phlix-menu__item.is-danger.is-active {
  background: rgba(239, 68, 68, 0.12);
  color: var(--red-400, #f87171);
}

.phlix-menu__item.is-disabled,
.phlix-menu__item:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.phlix-menu__item:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}

/* Transition */
.phlix-menu-enter-active,
.phlix-menu-leave-active {
  transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.phlix-menu-enter-from,
.phlix-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
.phlix-menu.is-flipped .phlix-menu-enter-from,
.phlix-menu.is-flipped .phlix-menu-leave-to {
  transform: translateY(4px);
}

@media (prefers-reduced-motion: reduce) {
  .phlix-menu-enter-active,
  .phlix-menu-leave-active,
  .phlix-menu-enter-active .phlix-menu__list,
  .phlix-menu-leave-active .phlix-menu__list {
    transition: none;
  }
  .phlix-menu-enter-from,
  .phlix-menu-leave-to {
    transform: none;
  }
  .phlix-menu.is-flipped .phlix-menu-enter-from,
  .phlix-menu.is-flipped .phlix-menu-leave-to {
    transform: none;
  }
}
</style>
