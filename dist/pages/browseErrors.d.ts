import type { PhlixErrorLocale } from '../i18n/errors';
export declare function libraryLoadErrorInfo(code: string | null, fallbackDescription: string, locale?: PhlixErrorLocale | null): {
    title: string;
    description: string;
};
