<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
-->

<script setup lang="ts">
/**
 * AuthCard (R4.1) — the cinematic glass "ticket-stub" shell shared by the login
 * and signup forms ("The Box Office, after dark").
 *
 * Renders the branded header lockup (eyebrow -> wordmark from config branding +
 * amber projector dot -> title -> subtitle), two decorative signatures (a
 * projector-beam top hairline + a film-sprocket perforation rail, both
 * reduced-motion / aria-hidden friendly), the default slot for the form body,
 * and an optional `#footer` slot (cross-links). Branding comes from
 * `phlixConfig.branding` only — never `if (app === …)`.
 */
import { computed, inject } from 'vue';
import type { PhlixAppConfig, BrandingConfig } from '../../app/types';

defineProps<{
  /** Small uppercase eyebrow above the wordmark (e.g. "Member access"). */
  eyebrow?: string;
  /** The card heading (e.g. "Welcome back"). */
  title: string;
  /** Supporting line under the title. */
  subtitle?: string;
}>();

const config = inject<PhlixAppConfig | null>('phlixConfig', null);
const branding = computed<BrandingConfig>(() => config?.branding ?? {});
const wordmark = computed(() => branding.value.wordmark ?? 'Phlix');
</script>

<template>
  <section class="authcard">
    <div class="authcard__body">
      <header class="authcard__head">
        <p v-if="eyebrow" class="authcard__eyebrow">{{ eyebrow }}</p>
        <div class="authcard__brand">
          <img
            v-if="branding.logoSrc"
            :src="branding.logoSrc"
            :alt="branding.logoAlt ?? wordmark"
            class="authcard__logo"
          />
          <span class="authcard__wordmark">{{ wordmark }}<span class="authcard__dot">.</span></span>
        </div>
        <h1 class="authcard__title">{{ title }}</h1>
        <p v-if="subtitle" class="authcard__sub">{{ subtitle }}</p>
      </header>

      <slot />

      <div v-if="$slots.footer" class="authcard__foot"><slot name="footer" /></div>
    </div>
  </section>
</template>

<style scoped>
.authcard {
  position: relative;
  isolation: isolate;
  width: 400px;
  max-width: 100%;
  padding: var(--space-10) var(--space-8) var(--space-8) calc(var(--space-8) + 14px);
  border-radius: var(--radius-xl);
  background: var(--surface-glass-strong);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);
  backdrop-filter: blur(20px) saturate(1.2);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-4), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  overflow: hidden;
  animation: authcard-rise var(--dur-slower) var(--ease-out) backwards;
}

/* Signature 1 — projector-beam amber hairline raking the top edge. */
.authcard::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent) 18%,
    var(--amber-200) 50%,
    var(--accent) 82%,
    transparent
  );
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  animation: authcard-beam 6s var(--ease-standard) infinite;
  pointer-events: none;
}

/* Signature 2 — film-sprocket perforation rail down the left edge. */
.authcard::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 14px;
  background:
    linear-gradient(180deg, var(--accent-soft), transparent 30%),
    repeating-linear-gradient(
      180deg,
      transparent 0 12px,
      color-mix(in srgb, var(--bg) 80%, #000) 12px 20px,
      transparent 20px 32px
    );
  border-right: 1px solid var(--border-subtle);
  -webkit-mask-image: radial-gradient(circle at 7px 16px, transparent 3px, #000 3.5px);
  -webkit-mask-size: 14px 32px;
  -webkit-mask-repeat: repeat-y;
  mask-image: radial-gradient(circle at 7px 16px, transparent 3px, #000 3.5px);
  mask-size: 14px 32px;
  mask-repeat: repeat-y;
  opacity: 0.7;
  pointer-events: none;
}

/* Orchestrated load — header children stagger in. */
.authcard__head > * {
  animation: authcard-rise var(--dur-slow) var(--ease-out) backwards;
}
.authcard__head > *:nth-child(1) { animation-delay: 60ms; }
.authcard__head > *:nth-child(2) { animation-delay: 110ms; }
.authcard__head > *:nth-child(3) { animation-delay: 160ms; }
.authcard__head > *:nth-child(4) { animation-delay: 210ms; }

.authcard__eyebrow {
  margin-bottom: var(--space-3);
  font-size: var(--text-2xs);
  font-weight: var(--fw-semibold, 600);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.authcard__brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.authcard__logo {
  height: 1.6rem;
  width: auto;
}
.authcard__wordmark {
  font-family: var(--font-display);
  font-weight: var(--fw-semibold, 600);
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  color: var(--text);
}
.authcard__dot {
  color: var(--accent-text);
}
.authcard__title {
  margin-top: var(--space-4);
  font-family: var(--font-display);
  font-weight: var(--fw-medium, 500);
  font-size: var(--text-lg);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.authcard__sub {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.authcard__body {
  position: relative;
  z-index: 1;
}
.authcard__foot {
  margin-top: var(--space-6);
  text-align: center;
  font-size: var(--text-sm);
  color: var(--text-muted);
}

@keyframes authcard-rise {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}
@keyframes authcard-beam {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .authcard,
  .authcard::before,
  .authcard__head > * {
    animation: none;
  }
}
</style>
