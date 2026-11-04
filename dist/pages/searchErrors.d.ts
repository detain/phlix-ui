import type { PhlixErrorLocale } from '../i18n/errors';
export { wireErrorCode as searchErrorCode } from '../utils/wireErrors';
export declare function searchErrorInfo(code: string | null, fallbackDescription: string, locale?: PhlixErrorLocale | null): {
    title: string;
    description: string;
};
