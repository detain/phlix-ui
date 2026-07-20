<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * HelpText — renders a help paragraph with optional external reference links (R0.4).
 *
 *   <HelpText text="Some explanation here" :links="[{text:'Learn more',url:'https://…'}]" />
 *
 * The text is rendered as plain escaped content — any literal <strong> in the
 * source string is displayed as text, not HTML. Links render below the paragraph
 * with an external-link icon and proper security attributes.
 */
import Icon from '../Icon.vue';

export interface HelpLink {
  text: string;
  url: string;
}

withDefaults(
  defineProps<{
    /** The help paragraph text. Rendered as escaped plain text. */
    text: string;
    /** Optional inline reference links rendered below the text. */
    links?: readonly HelpLink[];
  }>(),
  { links: undefined },
);
</script>

<template>
  <div class="phlix-help-text">
    <p class="phlix-help-text__paragraph">{{ text }}</p>
    <ul v-if="links && links.length" class="phlix-help-text__links">
      <li v-for="link in links" :key="link.url">
        <a
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="phlix-help-text__link"
        >
          {{ link.text }}
          <Icon name="external-link" :size="0.85" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.phlix-help-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.phlix-help-text__paragraph {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: 1.6;
}

.phlix-help-text__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1) var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.phlix-help-text__link {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--space-1) * 0.5);
  font-size: var(--text-xs);
  color: var(--accent-text);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color var(--dur-fast) var(--ease-out);
}

.phlix-help-text__link:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

.phlix-help-text__link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-ring);
}

@media (prefers-reduced-motion: reduce) {
  .phlix-help-text__link {
    transition: none;
  }
}
</style>
