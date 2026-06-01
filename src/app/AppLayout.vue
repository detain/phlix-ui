<template>
    <div class="app-layout">
        <header class="app-header">
            <div class="header-inner">
                <div class="logo">
                    <slot name="logo">
                        <span class="logo-text">Phlix</span>
                    </slot>
                </div>
                <nav class="nav">
                    <slot name="nav" />
                </nav>
            </div>
        </header>
        <main class="app-main">
            <slot />
        </main>
        <footer class="app-footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.app-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: var(--color-surface, #141420);
    border-bottom: 1px solid var(--color-border, #27272a);
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
}

.logo-text {
    font-size: var(--text-xl, 1.25rem);
    font-weight: var(--font-bold, 700);
    color: var(--color-primary, #6366f1);
}

.nav {
    display: flex;
    align-items: center;
    gap: var(--space-4, 1rem);
}

.app-main {
    flex: 1;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: var(--space-6, 1.5rem) var(--space-4, 1rem);
}

.app-footer {
    padding: var(--space-4, 1rem);
    text-align: center;
    color: var(--color-text-muted, #a1a1aa);
    font-size: var(--text-sm, 0.875rem);
    border-top: 1px solid var(--color-border, #27272a);
}
</style>
