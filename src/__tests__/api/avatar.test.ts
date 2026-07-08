/**
 * Source file.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

import { describe, expect, it } from 'vitest';
import { ApiClient } from '../../api/client';
import { MemoryTokenStore, makeFetch } from '../../api/test/memoryTokenStore';

describe('avatar upload/delete (step 12.6)', () => {
    describe('ApiClient.postFormData', () => {
        it('sends FormData as body (not JSON stringified)', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { avatar_url: 'https://cdn.example.com/avatar.jpg' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const formData = new FormData();
            formData.append('avatar', new File(['hello'], 'test.png', { type: 'image/png' }));

            await client.postFormData('/api/v1/users/me/avatar', formData);

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/users/me/avatar');
            expect(calls[0]!.init!.method).toBe('POST');
            // Body must be the FormData instance itself, NOT JSON.stringify of it
            expect(calls[0]!.init!.body).toBe(formData);
        });

        it('does NOT set Content-Type header when body is FormData (browser sets multipart/form-data with boundary)', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { avatar_url: 'https://cdn.example.com/avatar.jpg' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const formData = new FormData();
            formData.append('avatar', new File(['hello'], 'test.png', { type: 'image/png' }));

            await client.postFormData('/api/v1/users/me/avatar', formData);

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            // Content-Type must NOT be set — browser auto-sets multipart/form-data with boundary
            expect(headers['Content-Type']).toBeUndefined();
            // But Authorization should still be present
            expect(headers['Authorization']).toBe('Bearer tok-123');
        });

        it('throws Error on non-2xx response', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch } = makeFetch([{ status: 500, body: { error: 'Server error' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const formData = new FormData();
            formData.append('avatar', new File(['hello'], 'test.png', { type: 'image/png' }));

            await expect(client.postFormData('/api/v1/users/me/avatar', formData)).rejects.toThrow('HTTP 500');
        });
    });

    describe('ApiClient.uploadAvatar', () => {
        it('POSTs to /api/v1/users/me/avatar with FormData containing avatar key', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { avatar_url: 'https://cdn.example.com/avatar.jpg' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const file = new File(['hello'], 'profile.png', { type: 'image/png' });
            const result = await client.uploadAvatar(file);

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/users/me/avatar');
            expect(calls[0]!.init!.method).toBe('POST');
            // Verify the body is FormData
            expect(calls[0]!.init!.body).toBeInstanceOf(FormData);
            const sentFormData = calls[0]!.init!.body as FormData;
            expect(sentFormData.get('avatar')).toBe(file);
            expect(result.avatar_url).toBe('https://cdn.example.com/avatar.jpg');
        });

        it('does NOT set Content-Type header (browser must set multipart/form-data with boundary)', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { avatar_url: 'https://cdn.example.com/avatar.jpg' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const file = new File(['hello'], 'profile.png', { type: 'image/png' });
            await client.uploadAvatar(file);

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(headers['Content-Type']).toBeUndefined();
        });

        it('attaches the bearer token', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-abc' });
            const { fetch, calls } = makeFetch([{ status: 200, body: { avatar_url: 'https://cdn.example.com/avatar.jpg' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const file = new File(['hello'], 'profile.png', { type: 'image/png' });
            await client.uploadAvatar(file);

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(headers['Authorization']).toBe('Bearer tok-abc');
        });

        it('throws Error when server returns non-2xx', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch } = makeFetch([{ status: 422, body: { error: 'Invalid image format' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            const file = new File(['hello'], 'bad.exe', { type: 'application/octet-stream' });
            await expect(client.uploadAvatar(file)).rejects.toThrow('HTTP 422');
        });
    });

    describe('ApiClient.deleteAvatar', () => {
        it('DELETEs to /api/v1/users/me/avatar', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.deleteAvatar();

            expect(calls).toHaveLength(1);
            expect(calls[0]!.url).toBe('https://h/api/v1/users/me/avatar');
            expect(calls[0]!.init!.method).toBe('DELETE');
            expect(calls[0]!.init!.body).toBeUndefined();
        });

        it('attaches the bearer token', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-abc' });
            const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.deleteAvatar();

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(headers['Authorization']).toBe('Bearer tok-abc');
        });

        it('throws Error when server returns non-2xx', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch } = makeFetch([{ status: 401, body: { error: 'Unauthorized' } }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await expect(client.deleteAvatar()).rejects.toThrow('HTTP 401');
        });

        it('does NOT send Content-Type: application/json', async () => {
            const tokens = new MemoryTokenStore({ access: 'tok-123' });
            const { fetch, calls } = makeFetch([{ status: 200, body: {} }]);
            const client = new ApiClient({ baseUrl: 'https://h', tokenStore: tokens, fetchImpl: fetch });

            await client.deleteAvatar();

            const headers = (calls[0]!.init!.headers ?? {}) as Record<string, string>;
            expect(headers['Content-Type']).toBeUndefined();
        });
    });
});
