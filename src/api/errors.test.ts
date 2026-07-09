/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, expect, it, vi } from 'vitest';
import { ApiError, NetworkError, TimeoutError, errMessage, isOffline } from './errors';

describe('errors (R5.3a)', () => {
  describe('error classes', () => {
    it('ApiError carries message/status/body and a stable name', () => {
      const e = new ApiError('Forbidden', 403, { code: 'auth.not_admin' });
      expect(e).toBeInstanceOf(Error);
      expect(e.name).toBe('ApiError');
      expect(e.message).toBe('Forbidden');
      expect(e.status).toBe(403);
      expect(e.body).toEqual({ code: 'auth.not_admin' });
    });

    it('ApiError defaults body to null', () => {
      expect(new ApiError('x', 500).body).toBeNull();
    });

    it('NetworkError has a friendly default message + stable name', () => {
      const e = new NetworkError();
      expect(e).toBeInstanceOf(Error);
      expect(e.name).toBe('NetworkError');
      expect(e.message).toMatch(/offline/i);
    });

    it('TimeoutError has a friendly default message + stable name', () => {
      const e = new TimeoutError();
      expect(e).toBeInstanceOf(Error);
      expect(e.name).toBe('TimeoutError');
      expect(e.message).toMatch(/timed out/i);
    });

    it('NetworkError/TimeoutError accept a custom message', () => {
      expect(new NetworkError('custom net').message).toBe('custom net');
      expect(new TimeoutError('custom to').message).toBe('custom to');
    });
  });

  describe('errMessage', () => {
    it('returns the Error message when present', () => {
      expect(errMessage(new Error('boom'), 'fallback')).toBe('boom');
    });

    it('returns the server text for an ApiError', () => {
      expect(errMessage(new ApiError('Forbidden', 403), 'fallback')).toBe('Forbidden');
    });

    it('surfaces the friendly NetworkError/TimeoutError copy', () => {
      expect(errMessage(new NetworkError())).toMatch(/offline/i);
      expect(errMessage(new TimeoutError())).toMatch(/timed out/i);
    });

    it('falls back when the value is not an Error', () => {
      expect(errMessage('a string', 'fb')).toBe('fb');
      expect(errMessage(null, 'fb')).toBe('fb');
      expect(errMessage(undefined, 'fb')).toBe('fb');
      expect(errMessage({ message: 'nope' }, 'fb')).toBe('fb');
    });

    it('falls back when the Error has an empty message', () => {
      expect(errMessage(new Error(''), 'fb')).toBe('fb');
    });

    it('uses the default fallback when none is given', () => {
      expect(errMessage(123)).toBe('Something went wrong.');
    });
  });

  describe('isOffline', () => {
    it('is false when navigator reports online (jsdom default)', () => {
      expect(isOffline()).toBe(false);
    });

    it('is true when navigator reports offline', () => {
      const orig = Object.getOwnPropertyDescriptor(navigator, 'onLine');
      Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => false });
      try {
        expect(isOffline()).toBe(true);
      } finally {
        if (orig) Object.defineProperty(navigator, 'onLine', orig);
        else Object.defineProperty(navigator, 'onLine', { configurable: true, value: true });
      }
    });

    it('defaults to online when navigator is unavailable (SSR)', () => {
      vi.stubGlobal('navigator', undefined);
      try {
        expect(isOffline()).toBe(false);
      } finally {
        vi.unstubAllGlobals();
      }
    });
  });
});
