import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { effectScope, nextTick, ref } from 'vue';
import {
  setPageTitle,
  formatPageTitle,
  setAppName,
  usePageTitle,
} from './usePageTitle';

// Each test starts from the default "Phlix" suffix + a clean document title.
beforeEach(() => {
  setAppName('Phlix');
  document.title = '';
});
afterEach(() => {
  setAppName('Phlix');
});

describe('formatPageTitle / setPageTitle (U1)', () => {
  it('formats "<title> · Phlix"', () => {
    expect(formatPageTitle('Browse')).toBe('Browse · Phlix');
    expect(formatPageTitle('Assassination Classroom')).toBe('Assassination Classroom · Phlix');
  });

  it('returns just the app name for null/empty/whitespace', () => {
    expect(formatPageTitle(null)).toBe('Phlix');
    expect(formatPageTitle(undefined)).toBe('Phlix');
    expect(formatPageTitle('')).toBe('Phlix');
    expect(formatPageTitle('   ')).toBe('Phlix');
  });

  it('trims the page-specific part', () => {
    expect(formatPageTitle('  Settings  ')).toBe('Settings · Phlix');
  });

  it('setPageTitle writes the formatted string to document.title', () => {
    setPageTitle('Settings');
    expect(document.title).toBe('Settings · Phlix');
    setPageTitle(null);
    expect(document.title).toBe('Phlix');
  });

  it('setAppName overrides the suffix (custom wordmark); blank falls back to Phlix', () => {
    setAppName('MyCinema');
    expect(formatPageTitle('Browse')).toBe('Browse · MyCinema');
    setAppName('   ');
    expect(formatPageTitle('Browse')).toBe('Browse · Phlix');
  });

  it('setPageTitle is a no-op when document is undefined (SSR guard)', () => {
    const orig = globalThis.document;
    // @ts-expect-error — simulate a non-browser environment
    delete globalThis.document;
    try {
      expect(() => setPageTitle('Browse')).not.toThrow();
    } finally {
      globalThis.document = orig;
    }
  });
});

describe('usePageTitle(source) (U1)', () => {
  it('sets the title immediately from the source value', () => {
    const scope = effectScope();
    try {
      scope.run(() => {
        usePageTitle(() => 'Browse');
      });
      expect(document.title).toBe('Browse · Phlix');
    } finally {
      scope.stop();
    }
  });

  it('updates the title when the source ref resolves later (async data)', async () => {
    const name = ref<string | null>(null);
    document.title = 'Browse · Phlix'; // a route default is already showing
    const scope = effectScope();
    try {
      scope.run(() => {
        usePageTitle(name);
      });
      // Null source → leaves the existing default untouched.
      expect(document.title).toBe('Browse · Phlix');

      name.value = 'Assassination Classroom';
      await nextTick();
      expect(document.title).toBe('Assassination Classroom · Phlix');
    } finally {
      scope.stop();
    }
  });

  it('ignores empty/whitespace source values (keeps the route default)', async () => {
    const name = ref<string | null>('   ');
    document.title = 'Library · Phlix';
    const scope = effectScope();
    try {
      scope.run(() => {
        usePageTitle(name);
      });
      expect(document.title).toBe('Library · Phlix');
    } finally {
      scope.stop();
    }
  });
});
