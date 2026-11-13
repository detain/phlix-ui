/**
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */
import { describe, it, expect } from 'vitest';
import { resolveRedirectEnvelope } from './redirectEnvelope';

describe('resolveRedirectEnvelope', () => {
  it('returns null with no envelope', () => {
    expect(resolveRedirectEnvelope({})).toBeNull();
  });
  it('prefers the localized catalog text for a registered code', () => {
    const r = resolveRedirectEnvelope({ error: 'Invalid credentials', code: 'auth.invalid_credentials' });
    expect(r).toMatchObject({ kind: 'error', code: 'auth.invalid_credentials' });
    expect(r?.message).toBe('The credentials you entered are not correct.');
  });
  it('localizes per locale', () => {
    const r = resolveRedirectEnvelope({ error: 'x', code: 'provider_unavailable' }, 'es');
    expect(r?.message).toBe('El proveedor de autenticación no está disponible. Inténtalo de nuevo más tarde.');
  });
  it('falls back to human text for an unknown code or no code', () => {
    expect(resolveRedirectEnvelope({ error: 'Username taken', code: 'zzz.unknown' })?.message).toBe('Username taken');
    expect(resolveRedirectEnvelope({ error: 'Passwords do not match' })?.message).toBe('Passwords do not match');
  });
  it('treats a bare OAuth code in error as the machine code', () => {
    const r = resolveRedirectEnvelope({ error: 'password_change_required' });
    expect(r?.code).toBe('auth.password_change_required');
    expect(r?.message).toBe('You must change your password before continuing.');
    expect(resolveRedirectEnvelope({ error: 'internal' })?.message).toBe('An unexpected error occurred.');
  });
  it('does not echo an unknown bare code as text', () => {
    expect(resolveRedirectEnvelope({ error: 'access_denied' })?.message).toBe('Something went wrong.');
  });
  it('renders notice kind', () => {
    expect(resolveRedirectEnvelope({ notice: 'Account pending approval' })).toMatchObject({
      kind: 'notice', message: 'Account pending approval',
    });
  });
});
